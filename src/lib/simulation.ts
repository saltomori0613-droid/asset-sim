import { SimulationInput, SimulationResult, MonthlyDataPoint, BacktestResult, MonteCarloResult, AssetId } from './types';
import { ASSETS, HISTORICAL_RETURNS, CORRELATION_MATRIX, BACKTEST_MAX_YEAR, BACKTEST_MIN_YEAR } from './assetData';

// ===== Cholesky分解（パラメトリックMC用）=====
function cholesky(matrix: number[][]): number[][] {
  const n = matrix.length;
  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
      L[i][j] = i === j
        ? Math.sqrt(Math.max(0, matrix[i][i] - sum))
        : (L[j][j] > 0 ? (matrix[i][j] - sum) / L[j][j] : 0);
    }
  }
  return L;
}

function boxMuller(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function correlatedNormals(L: number[][]): number[] {
  const z = Array.from({ length: L.length }, () => boxMuller());
  return L.map(row => row.reduce((s, l, k) => s + l * z[k], 0));
}

function getMonthlyFlow(input: SimulationInput, month: number): number {
  const sign = input.flowType === 'accumulate' ? 1 : -1;
  if (input.contributionMode === 'monthly') return sign * input.monthlyAmount;
  return month % 12 === 0 ? sign * input.monthlyAmount * 12 : 0;
}

function rebalance(assetValues: Partial<Record<AssetId, number>>, targetWeights: Partial<Record<AssetId, number>>) {
  const total = Object.values(assetValues).reduce((s, v) => s + (v ?? 0), 0);
  if (total <= 0) return;
  for (const id in assetValues) {
    assetValues[id as AssetId] = total * (targetWeights[id as AssetId] ?? 0);
  }
}

// ===== バックテスト =====
export function runBacktest(input: SimulationInput): BacktestResult {
  const startYear = input.backtestStartYear ?? BACKTEST_MIN_YEAR;
  const endYear = Math.min(startYear + input.years - 1, BACKTEST_MAX_YEAR);
  const rebalanceEvery = Math.round(12 / input.rebalanceFrequency);

  const selectedIds = input.allocation.map(a => a.assetId);
  const targetWeights: Partial<Record<AssetId, number>> = {};
  input.allocation.forEach(a => { targetWeights[a.assetId] = a.weight / 100; });

  const assetValues: Partial<Record<AssetId, number>> = {};
  selectedIds.forEach(id => { assetValues[id] = input.initialAssets * (targetWeights[id] ?? 0); });

  const indexValues: Partial<Record<AssetId, number>> = {};
  selectedIds.forEach(id => { indexValues[id] = 100; });

  const portfolioStart = input.initialAssets;
  const series: MonthlyDataPoint[] = [{ month: 0, year: startYear, value: portfolioStart }];
  const assetSeries: Partial<Record<AssetId, MonthlyDataPoint[]>> = {};
  const indexSeries: Partial<Record<AssetId, MonthlyDataPoint[]>> = {};
  selectedIds.forEach(id => {
    assetSeries[id] = [{ month: 0, year: startYear, value: assetValues[id]! }];
    indexSeries[id] = [{ month: 0, year: startYear, value: 100 }];
  });

  let month = 0;

  for (let year = startYear; year <= endYear; year++) {
    const yearData = HISTORICAL_RETURNS[year];
    if (!yearData) continue;

    const monthlyR: Partial<Record<AssetId, number>> = {};
    ASSETS.forEach(a => { monthlyR[a.id] = Math.pow(1 + (yearData[a.id] ?? 0), 1 / 12) - 1; });

    for (let m = 0; m < 12; m++) {
      month++;
      const flow = getMonthlyFlow(input, month - 1);

      selectedIds.forEach(id => {
        assetValues[id] = (assetValues[id] ?? 0) * (1 + (monthlyR[id] ?? 0));
      });
      if (flow !== 0) {
        selectedIds.forEach(id => {
          assetValues[id] = Math.max(0, (assetValues[id] ?? 0) + flow * (targetWeights[id] ?? 0));
        });
      }
      if (month % rebalanceEvery === 0) rebalance(assetValues, targetWeights);

      const portfolioValue = selectedIds.reduce((s, id) => s + (assetValues[id] ?? 0), 0);
      series.push({ month, year, value: portfolioValue });
      selectedIds.forEach(id => {
        assetSeries[id]!.push({ month, year, value: assetValues[id] ?? 0 });
        indexValues[id] = (indexValues[id] ?? 100) * (1 + (monthlyR[id] ?? 0));
        indexSeries[id]!.push({ month, year, value: indexValues[id]! });
      });
    }
  }

  const finalValue = selectedIds.reduce((s, id) => s + (assetValues[id] ?? 0), 0);
  const totalReturn = portfolioStart > 0 ? (finalValue / portfolioStart - 1) * 100 : 0;
  const totalYears = month / 12;
  const cagr = totalYears > 0 && portfolioStart > 0
    ? (Math.pow(finalValue / portfolioStart, 1 / totalYears) - 1) * 100 : 0;

  return { mode: 'backtest', series, assetSeries, indexSeries, finalValue, totalReturn, cagr };
}

// ===== モンテカルロ共通：パーセンタイル計算 =====
function computePercentiles(
  allSeries: number[][],
  totalMonths: number,
  startYear: number
): MonteCarloResult['percentiles'] {
  const pctFns: [keyof MonteCarloResult['percentiles'], number][] = [
    ['p5', 0.05], ['p25', 0.25], ['p50', 0.50], ['p75', 0.75], ['p95', 0.95],
  ];
  const percentiles = {} as MonteCarloResult['percentiles'];
  for (const [key, pct] of pctFns) {
    percentiles[key] = Array.from({ length: totalMonths + 1 }, (_, month) => {
      const vals = allSeries.map(s => s[month]).sort((a, b) => a - b);
      return { month, year: startYear + Math.floor(month / 12), value: vals[Math.floor(pct * (vals.length - 1))] };
    });
  }
  return percentiles;
}

// ===== モンテカルロ共通：インデックス系列（期待リターンベース）=====
function computeIndexSeries(
  input: SimulationInput,
  totalMonths: number,
  startYear: number
): Partial<Record<AssetId, MonthlyDataPoint[]>> {
  const indexSeries: Partial<Record<AssetId, MonthlyDataPoint[]>> = {};
  input.allocation.forEach(({ assetId: id }) => {
    const asset = ASSETS.find(a => a.id === id)!;
    const mean = asset.meanReturn / 12;
    let v = 100;
    const series: MonthlyDataPoint[] = [{ month: 0, year: startYear, value: 100 }];
    for (let m = 0; m < totalMonths; m++) {
      v *= (1 + mean);
      series.push({ month: m + 1, year: startYear + Math.floor((m + 1) / 12), value: v });
    }
    indexSeries[id] = series;
  });
  return indexSeries;
}

// ===== ヒストリカルブートストラップ =====
// 1990〜2024の実績年次リターンをランダムに抽出してシナリオを生成。
// 正規分布を仮定しないため、実際の暴落（2008年等）や相関構造が反映される。
export function runBootstrapMonteCarlo(input: SimulationInput): MonteCarloResult {
  const numSims = input.numSimulations ?? 1000;
  const totalMonths = input.years * 12;
  const rebalanceEvery = Math.round(12 / input.rebalanceFrequency);
  const selectedIds = input.allocation.map(a => a.assetId);
  const targetWeights: Partial<Record<AssetId, number>> = {};
  input.allocation.forEach(a => { targetWeights[a.assetId] = a.weight / 100; });

  // 使用可能な歴史的年のリスト
  const historicalYears = Object.keys(HISTORICAL_RETURNS).map(Number);
  const nHistYears = historicalYears.length;

  const allSeries: number[][] = [];
  let ruinCount = 0;

  for (let sim = 0; sim < numSims; sim++) {
    const assetValues: Partial<Record<AssetId, number>> = {};
    selectedIds.forEach(id => { assetValues[id] = input.initialAssets * (targetWeights[id] ?? 0); });

    const values: number[] = [input.initialAssets];
    let ruined = false;
    let month = 0;
    const totalSimYears = Math.ceil(totalMonths / 12);

    for (let yr = 0; yr < totalSimYears; yr++) {
      // 歴史的な年をランダム抽出（復元抽出）
      const sampledYear = historicalYears[Math.floor(Math.random() * nHistYears)];
      const yearData = HISTORICAL_RETURNS[sampledYear];

      // 年次リターンを月次に変換（各月は均等分配）
      const monthlyR: Partial<Record<AssetId, number>> = {};
      selectedIds.forEach(id => {
        monthlyR[id] = Math.pow(1 + (yearData[id] ?? 0), 1 / 12) - 1;
      });

      const monthsThisYear = Math.min(12, totalMonths - yr * 12);
      for (let m = 0; m < monthsThisYear; m++) {
        month++;
        // 各資産にリターンを適用
        selectedIds.forEach(id => {
          assetValues[id] = (assetValues[id] ?? 0) * (1 + (monthlyR[id] ?? 0));
        });
        // フロー按分
        const flow = getMonthlyFlow(input, month - 1);
        if (flow !== 0) {
          selectedIds.forEach(id => {
            assetValues[id] = Math.max(0, (assetValues[id] ?? 0) + flow * (targetWeights[id] ?? 0));
          });
        }
        // リバランス
        if (month % rebalanceEvery === 0) rebalance(assetValues, targetWeights);

        const portfolioValue = selectedIds.reduce((s, id) => s + (assetValues[id] ?? 0), 0);
        if (portfolioValue <= 0) ruined = true;
        values.push(Math.max(0, portfolioValue));
      }
    }

    if (ruined) ruinCount++;
    allSeries.push(values);
  }

  const startYear = new Date().getFullYear();
  return {
    mode: 'montecarlo',
    percentiles: computePercentiles(allSeries, totalMonths, startYear),
    indexSeries: computeIndexSeries(input, totalMonths, startYear),
    ruinProbability: (ruinCount / numSims) * 100,
  };
}

// ===== パラメトリックモンテカルロ（正規分布仮定）=====
export function runParametricMonteCarlo(input: SimulationInput): MonteCarloResult {
  const numSims = input.numSimulations ?? 1000;
  const totalMonths = input.years * 12;
  const rebalanceEvery = Math.round(12 / input.rebalanceFrequency);
  const selectedIds = input.allocation.map(a => a.assetId);
  const targetWeights: Partial<Record<AssetId, number>> = {};
  input.allocation.forEach(a => { targetWeights[a.assetId] = a.weight / 100; });

  const assetIndices: Partial<Record<AssetId, number>> = {};
  selectedIds.forEach(id => { assetIndices[id] = ASSETS.findIndex(a => a.id === id); });

  const monthlyMeans = ASSETS.map(a => a.meanReturn / 12);
  const monthlyStds = ASSETS.map(a => a.stdDev / Math.sqrt(12));
  const cov = CORRELATION_MATRIX.map((row, i) =>
    row.map((corr, j) => corr * monthlyStds[i] * monthlyStds[j])
  );
  const L = cholesky(cov);

  const allSeries: number[][] = [];
  let ruinCount = 0;

  for (let sim = 0; sim < numSims; sim++) {
    const assetValues: Partial<Record<AssetId, number>> = {};
    selectedIds.forEach(id => { assetValues[id] = input.initialAssets * (targetWeights[id] ?? 0); });

    const values: number[] = [input.initialAssets];
    let ruined = false;

    for (let month = 0; month < totalMonths; month++) {
      const noise = correlatedNormals(L);
      selectedIds.forEach(id => {
        const idx = assetIndices[id]!;
        assetValues[id] = (assetValues[id] ?? 0) * (1 + monthlyMeans[idx] + noise[idx]);
      });
      const flow = getMonthlyFlow(input, month);
      if (flow !== 0) {
        selectedIds.forEach(id => {
          assetValues[id] = Math.max(0, (assetValues[id] ?? 0) + flow * (targetWeights[id] ?? 0));
        });
      }
      if ((month + 1) % rebalanceEvery === 0) rebalance(assetValues, targetWeights);

      const portfolioValue = selectedIds.reduce((s, id) => s + (assetValues[id] ?? 0), 0);
      if (portfolioValue <= 0) ruined = true;
      values.push(Math.max(0, portfolioValue));
    }

    if (ruined) ruinCount++;
    allSeries.push(values);
  }

  const startYear = new Date().getFullYear();
  return {
    mode: 'montecarlo',
    percentiles: computePercentiles(allSeries, totalMonths, startYear),
    indexSeries: computeIndexSeries(input, totalMonths, startYear),
    ruinProbability: (ruinCount / numSims) * 100,
  };
}

export function runSimulation(input: SimulationInput): SimulationResult {
  if (input.simMode === 'backtest') return runBacktest(input);
  return input.monteCarloMethod === 'bootstrap'
    ? runBootstrapMonteCarlo(input)
    : runParametricMonteCarlo(input);
}

export function formatValue(value: number): string {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}億円`;
  return `${value.toFixed(0)}万円`;
}

export { BACKTEST_MIN_YEAR, BACKTEST_MAX_YEAR };
