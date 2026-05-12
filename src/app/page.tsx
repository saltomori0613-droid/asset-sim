'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { SimulationInput, SimulationResult, AssetAllocation, FlowType, ContributionMode, SimMode, CurrencyMode, MonteCarloMethod } from '@/lib/types';
import { runSimulation, BACKTEST_MIN_YEAR, BACKTEST_MAX_YEAR } from '@/lib/simulation';
import AllocationEditor from '@/components/AllocationEditor';
import SimulationChart from '@/components/SimulationChart';
import MethodInfo from '@/components/MethodInfo';
import ja from '@/locales/ja';
import en from '@/locales/en';
import { Locale } from '@/locales/ja';

const DEFAULT_ALLOCATION: AssetAllocation[] = [
  { assetId: 'sp500',   weight: 60 },
  { assetId: 'jpBonds', weight: 20 },
  { assetId: 'gold',    weight: 20 },
];

export default function Home() {
  const [lang, setLang] = useState<'ja' | 'en'>('ja');
  const t: Locale = lang === 'ja' ? ja : en;

  const [initialAssets, setInitialAssets] = useState(1000);
  const [flowType, setFlowType] = useState<FlowType>('accumulate');
  const [monthlyAmount, setMonthlyAmount] = useState(10);
  const [contributionMode, setContributionMode] = useState<ContributionMode>('monthly');
  const [allocation, setAllocation] = useState<AssetAllocation[]>(DEFAULT_ALLOCATION);
  const [simMode, setSimMode] = useState<SimMode>('montecarlo');
  const [years, setYears] = useState(30);
  const [backtestStartYear, setBacktestStartYear] = useState(1990);
  const [numSimulations] = useState(1000);
  const [monteCarloMethod, setMonteCarloMethod] = useState<MonteCarloMethod>('bootstrap');
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('jpy');
  const [rebalanceFrequency, setRebalanceFrequency] = useState<1|2|4|6|12>(1);

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalWeight = allocation.reduce((sum, a) => sum + a.weight, 0);
  const isAllocationValid = Math.abs(totalWeight - 100) < 0.01;

  const handleRun = useCallback(() => {
    if (!isAllocationValid) {
      setError(t.allocationWarning);
      return;
    }
    setError(null);
    setRunning(true);

    setTimeout(() => {
      try {
        const input: SimulationInput = {
          initialAssets,
          flowType,
          monthlyAmount,
          contributionMode,
          allocation,
          simMode,
          monteCarloMethod,
          years,
          rebalanceFrequency,
          backtestStartYear,
          numSimulations,
          currencyMode,
        };
        setResult(runSimulation(input));
      } catch (e) {
        setError(String(e));
      } finally {
        setRunning(false);
      }
    }, 10);
  }, [initialAssets, flowType, monthlyAmount, contributionMode, allocation, simMode, monteCarloMethod, years, rebalanceFrequency, backtestStartYear, numSimulations, currencyMode, isAllocationValid, t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{t.title}</h1>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(l => l === 'ja' ? 'en' : 'ja')}
            className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50 transition-colors"
          >
            {lang === 'ja' ? 'English' : '日本語'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* 左パネル：入力 */}
        <div className="space-y-4">
          <section className="bg-white rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">{t.basicSettings}</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.initialAssets}</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={initialAssets}
                  onChange={e => setInitialAssets(Number(e.target.value))}
                  className="flex-1 border rounded-lg px-3 py-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-sm text-gray-500">{t.unit}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.flowType}</label>
              <div className="grid grid-cols-2 gap-2">
                {(['accumulate', 'withdraw'] as FlowType[]).map(ft => (
                  <button
                    key={ft}
                    onClick={() => setFlowType(ft)}
                    className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                      flowType === ft ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {ft === 'accumulate' ? t.accumulate : t.withdraw}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {flowType === 'accumulate' ? t.contributionAmount : t.withdrawalAmount}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={monthlyAmount}
                  onChange={e => setMonthlyAmount(Number(e.target.value))}
                  className="flex-1 border rounded-lg px-3 py-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-sm text-gray-500">{t.unit}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.contributionMode}</label>
              <div className="grid grid-cols-2 gap-2">
                {(['monthly', 'annual-lump'] as ContributionMode[]).map(cm => (
                  <button
                    key={cm}
                    onClick={() => setContributionMode(cm)}
                    className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                      contributionMode === cm ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {cm === 'monthly' ? t.monthly : t.annualLumpDesc}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-5">
            <AllocationEditor allocation={allocation} onChange={setAllocation} t={t} lang={lang} />
          </section>

          <section className="bg-white rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">{t.simSettings}</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.simMode}</label>
              <div className="grid grid-cols-2 gap-2">
                {(['montecarlo', 'backtest'] as SimMode[]).map(sm => (
                  <button
                    key={sm}
                    onClick={() => setSimMode(sm)}
                    className={`py-2 px-2 rounded-lg text-xs border transition-colors ${
                      simMode === sm ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {sm === 'montecarlo' ? t.montecarlo : t.backtest}
                  </button>
                ))}
              </div>
            </div>

            {simMode === 'montecarlo' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.mcMethod}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['bootstrap', 'parametric'] as MonteCarloMethod[]).map(m => (
                    <button
                      key={m}
                      onClick={() => setMonteCarloMethod(m)}
                      className={`py-2 px-2 rounded-lg text-xs border transition-colors text-left leading-tight ${
                        monteCarloMethod === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {m === 'bootstrap' ? t.bootstrapMethod : t.parametricMethod}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {simMode === 'backtest' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.backtestStartYear}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={BACKTEST_MIN_YEAR}
                    max={BACKTEST_MAX_YEAR}
                    value={backtestStartYear}
                    onChange={e => setBacktestStartYear(Number(e.target.value))}
                    className="w-24 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="text-xs text-gray-500">{t.backtestRange.replace('{min}', String(BACKTEST_MIN_YEAR)).replace('{max}', String(BACKTEST_MAX_YEAR))}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.years}</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={simMode === 'backtest' ? Math.min(50, BACKTEST_MAX_YEAR - backtestStartYear + 1) : 50}
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <span className="text-sm font-medium w-16">{years}{t.yearsUnit}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.rebalanceFreq}</label>
              <div className="grid grid-cols-5 gap-1">
                {([1, 2, 4, 6, 12] as const).map(freq => {
                  const labels: Record<number, string> = { 1: t.rebalanceOnce, 2: t.rebalanceTwice, 4: t.rebalanceQuarterly, 6: t.rebalanceBimonthly, 12: t.rebalanceMonthly };
                  return (
                    <button
                      key={freq}
                      onClick={() => setRebalanceFrequency(freq)}
                      className={`py-1.5 px-1 rounded-lg text-xs border transition-colors text-center leading-tight ${
                        rebalanceFrequency === freq ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {labels[freq]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.currencyMode}</label>
              <div className="grid grid-cols-2 gap-2">
                {(['jpy', 'local'] as CurrencyMode[]).map(cm => (
                  <button
                    key={cm}
                    onClick={() => setCurrencyMode(cm)}
                    className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                      currencyMode === cm ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {cm === 'jpy' ? t.jpyBase : t.localBase}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}
          <button
            onClick={handleRun}
            disabled={running || !isAllocationValid}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {running ? t.calculating : t.runSimulation}
          </button>
        </div>

        {/* 右パネル：グラフ */}
        <div className="space-y-4">
          {result ? (
            <section className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">{t.chartTitle}</h2>
              <SimulationChart result={result} initialAssets={initialAssets} t={t} lang={lang} />
            </section>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <p className="text-sm">{t.emptyState}</p>
              </div>
            </div>
          )}
          <MethodInfo t={t} simMode={simMode} monteCarloMethod={monteCarloMethod} />
          <p className="text-xs text-gray-400 px-1">{t.disclaimer}</p>
        </div>
      </main>
      <footer className="border-t bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-400">
          <span>© 2025 アセットアロケーション シミュレーター</span>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">
            {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
          </Link>
        </div>
      </footer>
    </div>
  );
}
