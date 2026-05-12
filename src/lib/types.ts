export type AssetId =
  | 'sp500'
  | 'nasdaq100'
  | 'globalStocks'
  | 'allWorld'
  | 'emerging'
  | 'nk225'
  | 'topix'
  | 'jpBonds'
  | 'usBonds'
  | 'gold'
  | 'jreit'
  | 'usreit'
  | 'jpyCash'
  | 'usdCash';

export type AssetCategory = 'equity' | 'bond' | 'realAsset' | 'cash';

export type ContributionMode = 'monthly' | 'annual-lump';
export type FlowType = 'accumulate' | 'withdraw';
export type SimMode = 'backtest' | 'montecarlo';
export type CurrencyMode = 'jpy' | 'local';

export interface AssetAllocation {
  assetId: AssetId;
  weight: number; // 0-100 (%)
}

export type MonteCarloMethod = 'bootstrap' | 'parametric';

export interface SimulationInput {
  initialAssets: number;
  flowType: FlowType;
  monthlyAmount: number;
  contributionMode: ContributionMode;
  allocation: AssetAllocation[];
  simMode: SimMode;
  monteCarloMethod: MonteCarloMethod;
  years: number;
  rebalanceFrequency: 1 | 2 | 4 | 6 | 12;
  backtestStartYear?: number;
  numSimulations?: number;
  currencyMode: CurrencyMode;
}

export interface MonthlyDataPoint {
  month: number;
  year: number;
  value: number;
}

export interface BacktestResult {
  mode: 'backtest';
  series: MonthlyDataPoint[];
  assetSeries: Partial<Record<AssetId, MonthlyDataPoint[]>>;
  indexSeries: Partial<Record<AssetId, MonthlyDataPoint[]>>;
  finalValue: number;
  totalReturn: number;
  cagr: number;
}

export interface MonteCarloResult {
  mode: 'montecarlo';
  percentiles: {
    p5: MonthlyDataPoint[];
    p25: MonthlyDataPoint[];
    p50: MonthlyDataPoint[];
    p75: MonthlyDataPoint[];
    p95: MonthlyDataPoint[];
  };
  indexSeries: Partial<Record<AssetId, MonthlyDataPoint[]>>;
  ruinProbability: number;
}

export type SimulationResult = BacktestResult | MonteCarloResult;
