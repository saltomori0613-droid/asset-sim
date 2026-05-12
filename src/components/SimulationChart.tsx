'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine, Legend,
} from 'recharts';
import { SimulationResult, MonthlyDataPoint, AssetId } from '@/lib/types';
import { formatValue } from '@/lib/simulation';
import { ASSET_MAP } from '@/lib/assetData';
import { Locale } from '@/locales/ja';

interface Props {
  result: SimulationResult;
  initialAssets: number;
  t: Locale;
  lang: 'ja' | 'en';
}

type TabId = 'portfolio' | 'breakdown' | 'index';

function sampleSeries(series: MonthlyDataPoint[], step = 6) {
  return series.filter(p => p.month % step === 0).map(p => ({
    year: (p.month / 12).toFixed(1),
    value: Math.round(p.value),
  }));
}

function makeFormatYAxis(t: Locale) {
  return (value: number): string => {
    if (value >= 10000) return `${(value / 10000).toFixed(0)}${t.oku}`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}${t.senman}`;
    return `${value}${t.man}`;
  };
}

function makeTooltip(t: Locale) {
  return function CustomTooltip({ active, payload, label }: {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: string;
  }) {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border rounded shadow-lg p-3 text-xs max-w-[200px]">
        <p className="font-medium mb-1">{t.yearsElapsed.replace('{n}', label ?? '')}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }} className="truncate">
            {p.name}: {formatValue(p.value)}
          </p>
        ))}
      </div>
    );
  };
}

// ===== ポートフォリオ合計チャート =====
function PortfolioChart({ result, initialAssets, t }: { result: SimulationResult; initialAssets: number; t: Locale }) {
  const formatYAxis = makeFormatYAxis(t);
  const CustomTooltip = makeTooltip(t);
  const step = result.mode === 'backtest' ? 6 : (result.percentiles.p50.length > 300 ? 12 : 6);

  if (result.mode === 'backtest') {
    const data = sampleSeries(result.series, step);
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-gray-500">{t.finalValue}: <strong className="text-blue-700">{formatValue(result.finalValue)}</strong></span>
          <span className="text-gray-500">{t.totalReturn}: <strong className={result.totalReturn >= 0 ? 'text-green-600' : 'text-red-500'}>{result.totalReturn.toFixed(1)}%</strong></span>
          <span className="text-gray-500">{t.cagr}: <strong className={result.cagr >= 0 ? 'text-green-600' : 'text-red-500'}>{result.cagr.toFixed(2)}%</strong></span>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" label={{ value: t.xAxisLabel, position: 'insideBottomRight', offset: -10 }} />
            <YAxis tickFormatter={formatYAxis} width={65} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={initialAssets} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: t.principal, position: 'right', fontSize: 11 }} />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} dot={false} name={t.chartTitle} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const { percentiles, ruinProbability } = result;
  const data = percentiles.p50.filter(p => p.month % step === 0).map(p => ({
    year: (p.month / 12).toFixed(1),
    p5: Math.round(percentiles.p5[p.month]?.value ?? 0),
    p25: Math.round(percentiles.p25[p.month]?.value ?? 0),
    p50: Math.round(p.value),
    p75: Math.round(percentiles.p75[p.month]?.value ?? 0),
    p95: Math.round(percentiles.p95[p.month]?.value ?? 0),
  }));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-gray-500">{t.p50} ({t.finalValueLabel}): <strong className="text-blue-700">{formatValue(percentiles.p50[percentiles.p50.length - 1]?.value ?? 0)}</strong></span>
        <span className="text-gray-500">{t.ruinProbability}: <strong className={ruinProbability < 5 ? 'text-green-600' : ruinProbability < 20 ? 'text-yellow-600' : 'text-red-500'}>{ruinProbability.toFixed(1)}%</strong></span>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" label={{ value: t.xAxisLabel, position: 'insideBottomRight', offset: -10 }} />
          <YAxis tickFormatter={formatYAxis} width={65} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={initialAssets} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: t.principal, position: 'right', fontSize: 11 }} />
          <Area type="monotone" dataKey="p95" stroke="none" fill="#dbeafe" fillOpacity={0.5} name="95%" />
          <Area type="monotone" dataKey="p5" stroke="none" fill="#ffffff" fillOpacity={1} name="5%" />
          <Area type="monotone" dataKey="p75" stroke="none" fill="#93c5fd" fillOpacity={0.5} name="75%" />
          <Area type="monotone" dataKey="p25" stroke="none" fill="#ffffff" fillOpacity={1} name="25%" />
          <Line type="monotone" dataKey="p50" stroke="#2563eb" strokeWidth={2.5} dot={false} name={t.p50} />
          <Line type="monotone" dataKey="p95" stroke="#93c5fd" strokeWidth={1} dot={false} strokeDasharray="4 2" name={t.p95} />
          <Line type="monotone" dataKey="p5" stroke="#fca5a5" strokeWidth={1} dot={false} strokeDasharray="4 2" name={t.p5} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-5 gap-2 text-xs text-center">
        {(['p5','p25','p50','p75','p95'] as const).map((key, i) => (
          <div key={key} className="bg-gray-50 rounded p-2">
            <div className="font-medium" style={{ color: ['#fca5a5','#93c5fd','#2563eb','#93c5fd','#93c5fd'][i] }}>
              {formatValue(percentiles[key][percentiles[key].length - 1]?.value ?? 0)}
            </div>
            <div className="text-gray-500 mt-1">{['5%','25%','50%','75%','95%'][i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 資産内訳チャート（バックテスト: 各資産の金額推移）=====
function BreakdownChart({ result, t, lang }: { result: SimulationResult; t: Locale; lang: 'ja' | 'en' }) {
  const formatYAxis = makeFormatYAxis(t);
  const CustomTooltip = makeTooltip(t);

  if (result.mode === 'backtest') {
    const ids = Object.keys(result.assetSeries) as AssetId[];
    const step = 6;
    const months = result.series.filter(p => p.month % step === 0).map(p => p.month);

    const data = months.map(m => {
      const point: Record<string, number | string> = { year: (m / 12).toFixed(1) };
      ids.forEach(id => {
        point[id] = Math.round(result.assetSeries[id]?.find(p => p.month === m)?.value ?? 0);
      });
      return point;
    });

    return (
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" label={{ value: t.xAxisLabel, position: 'insideBottomRight', offset: -10 }} />
          <YAxis tickFormatter={formatYAxis} width={65} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {ids.map(id => {
            const meta = ASSET_MAP[id];
            return (
              <Area
                key={id}
                type="monotone"
                dataKey={id}
                name={lang === 'en' ? meta.labelEn : meta.labelJa}
                stroke={meta.color}
                fill={meta.color}
                fillOpacity={0.6}
                stackId="1"
                dot={false}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // モンテカルロモードでは目標配分の円グラフ的な説明テキストを表示
  return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      {lang === 'ja'
        ? 'バックテストモードで資産内訳を確認できます'
        : 'Switch to Backtest mode to see asset breakdown'}
    </div>
  );
}

// ===== インデックス比較チャート（100万円を各資産に投資した場合）=====
function IndexChart({ result, t, lang }: { result: SimulationResult; t: Locale; lang: 'ja' | 'en' }) {
  const CustomTooltip = makeTooltip(t);
  const ids = Object.keys(result.indexSeries) as AssetId[];
  const isBacktest = result.mode === 'backtest';
  const totalMonths = isBacktest
    ? (result.series[result.series.length - 1]?.month ?? 0)
    : (result.indexSeries[ids[0]]?.length ?? 1) - 1;
  const step = totalMonths > 300 ? 12 : 6;

  const months = Array.from({ length: Math.floor(totalMonths / step) + 1 }, (_, i) => i * step);

  const data = months.map(m => {
    const point: Record<string, number | string> = { year: (m / 12).toFixed(1) };
    ids.forEach(id => {
      const series = result.indexSeries[id];
      if (series) {
        const found = series.find(p => p.month === m);
        point[id] = Math.round(found?.value ?? series[Math.min(m, series.length - 1)]?.value ?? 100);
      }
    });
    return point;
  });

  const formatYAxis = (v: number) => `${v}${t.man}`;

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">
        {lang === 'ja'
          ? '※ 各資産に100万円を一括投資した場合の純粋な価格変動（拠出・リバランスなし）'
          : '※ Growth of ¥1M invested entirely in each asset (no contributions, no rebalancing)'}
      </p>
      <p className="text-xs text-gray-400">
        {isBacktest
          ? (lang === 'ja' ? '実績データ使用' : 'Using historical data')
          : (lang === 'ja' ? '期待リターンによる予測値' : 'Based on expected returns')}
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" label={{ value: t.xAxisLabel, position: 'insideBottomRight', offset: -10 }} />
          <YAxis tickFormatter={formatYAxis} width={65} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: t.principal, position: 'right', fontSize: 11 }} />
          <Legend />
          {ids.map(id => {
            const meta = ASSET_MAP[id];
            return (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                name={lang === 'en' ? meta.labelEn : meta.labelJa}
                stroke={meta.color}
                strokeWidth={2}
                dot={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ===== メインコンポーネント =====
export default function SimulationChart({ result, initialAssets, t, lang }: Props) {
  const [tab, setTab] = useState<TabId>('portfolio');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'portfolio',  label: lang === 'ja' ? '資産総額' : 'Portfolio' },
    { id: 'breakdown',  label: lang === 'ja' ? '資産内訳' : 'Breakdown' },
    { id: 'index',      label: lang === 'ja' ? 'インデックス比較' : 'Index Comparison' },
  ];

  return (
    <div className="space-y-4">
      {/* タブ */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab_ => (
          <button
            key={tab_.id}
            onClick={() => setTab(tab_.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === tab_.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab_.label}
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      {tab === 'portfolio' && <PortfolioChart result={result} initialAssets={initialAssets} t={t} />}
      {tab === 'breakdown' && <BreakdownChart result={result} t={t} lang={lang} />}
      {tab === 'index' && <IndexChart result={result} t={t} lang={lang} />}
    </div>
  );
}
