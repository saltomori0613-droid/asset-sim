import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleShell from '@/components/site/ArticleShell';
import { getGuide } from '@/lib/guides';
import { runBacktest } from '@/lib/simulation';
import { SimulationInput, AssetAllocation } from '@/lib/types';

const g = getGuide('portfolio-comparison')!;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: '/guide/portfolio-comparison' },
};

interface Portfolio {
  name: string;
  note: string;
  allocation: AssetAllocation[];
}

// 代表的なポートフォリオ（攻め→守りの順）
const PORTFOLIOS: Portfolio[] = [
  {
    name: '米国株100%（S&P500）',
    note: '米国の主要500社にまるごと投資',
    allocation: [{ assetId: 'sp500', weight: 100 }],
  },
  {
    name: '全世界株100%',
    note: '世界中の株式に分散',
    allocation: [{ assetId: 'allWorld', weight: 100 }],
  },
  {
    name: '株60% / 債券40%',
    note: '伝統的な王道バランス',
    allocation: [
      { assetId: 'sp500', weight: 60 },
      { assetId: 'usBonds', weight: 40 },
    ],
  },
  {
    name: 'ゴールデン・バタフライ型',
    note: '株40・債券40・金20',
    allocation: [
      { assetId: 'sp500', weight: 40 },
      { assetId: 'usBonds', weight: 40 },
      { assetId: 'gold', weight: 20 },
    ],
  },
  {
    name: '4資産均等（株・債・金・REIT）',
    note: '値動きの異なる4資産を25%ずつ',
    allocation: [
      { assetId: 'allWorld', weight: 25 },
      { assetId: 'usBonds', weight: 25 },
      { assetId: 'gold', weight: 25 },
      { assetId: 'usreit', weight: 25 },
    ],
  },
  {
    name: 'GPIF型（株・債を国内外で25%ずつ）',
    note: '日本の公的年金に近い配分',
    allocation: [
      { assetId: 'topix', weight: 25 },
      { assetId: 'globalStocks', weight: 25 },
      { assetId: 'jpBonds', weight: 25 },
      { assetId: 'usBonds', weight: 25 },
    ],
  },
];

interface Result {
  name: string;
  note: string;
  finalValue: number;
  cagr: number;
  totalReturn: number;
  maxDD: number;
}

// ビルド時に当サイトのバックテスト計算エンジンで実際に計算する（1990〜2024、年1回リバランス、一括100万円）
function evaluate(p: Portfolio): Result {
  const input: SimulationInput = {
    initialAssets: 100,
    flowType: 'accumulate',
    monthlyAmount: 0,
    contributionMode: 'monthly',
    allocation: p.allocation,
    simMode: 'backtest',
    monteCarloMethod: 'bootstrap',
    years: 35,
    rebalanceFrequency: 1,
    backtestStartYear: 1990,
    currencyMode: 'jpy',
  };
  const r = runBacktest(input);

  let peak = -Infinity;
  let maxDD = 0;
  for (const point of r.series) {
    if (point.value > peak) peak = point.value;
    if (peak > 0) {
      const dd = (peak - point.value) / peak;
      if (dd > maxDD) maxDD = dd;
    }
  }

  return {
    name: p.name,
    note: p.note,
    finalValue: Math.round(r.finalValue),
    cagr: r.cagr,
    totalReturn: r.totalReturn,
    maxDD: maxDD * 100,
  };
}

export default function Page() {
  const results = PORTFOLIOS.map(evaluate);
  const best = results.reduce((a, b) => (b.cagr > a.cagr ? b : a));
  const safest = results.reduce((a, b) => (b.maxDD < a.maxDD ? b : a));

  return (
    <ArticleShell
      slug="portfolio-comparison"
      published="2026年6月"
      lead="「どの資産配分が良いのか」は、言葉で語るより数字で見るのが一番です。このページでは有名な6つのポートフォリオを、当サイトのバックテスト計算エンジンで1990〜2024年（35年間）にわたって実際に検証し、リターンとリスク（最大下落率）を比較します。"
      sources={[
        '当サイトのバックテスト計算エンジンによる試算（1990〜2024年・年1回リバランス・一括投資・配当込みの概算データ）',
        '前提データ・計算方法の詳細：本サイト「データと計算方法」ページ',
      ]}
    >
      <h2>検証の条件</h2>
      <p>
        すべて同じ条件でそろえて比較しています。数値は、当サイトが
        <Link href="/methodology" className="text-blue-600 hover:underline">公開している前提データ</Link>
        を用いて、ページ表示時に実際に計算したものです。
      </p>
      <ul>
        <li>期間：1990年〜2024年（35年間）</li>
        <li>投資方法：100万円を一括投資し、その後は積立・取り崩しなし</li>
        <li>リバランス：年1回</li>
        <li>通貨：円ベース（外国資産は為替変動込み・配当込みの概算）</li>
      </ul>

      <h2>比較結果（35年バックテスト）</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ポートフォリオ</th>
              <th style={{ textAlign: 'right' }}>100万円→</th>
              <th style={{ textAlign: 'right' }}>年率(CAGR)</th>
              <th style={{ textAlign: 'right' }}>累計リターン</th>
              <th style={{ textAlign: 'right' }}>最大下落率</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.name}>
                <td>
                  <strong>{r.name}</strong>
                  <br />
                  <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{r.note}</span>
                </td>
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {r.finalValue.toLocaleString()}万円
                </td>
                <td style={{ textAlign: 'right' }}>{r.cagr.toFixed(1)}%</td>
                <td style={{ textAlign: 'right' }}>+{Math.round(r.totalReturn).toLocaleString()}%</td>
                <td style={{ textAlign: 'right', color: '#dc2626' }}>-{r.maxDD.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">
        ※最大下落率（マックスドローダウン）は、期間中に資産が天井からどれだけ落ち込んだかの最大値。数字が小さいほど暴落時の精神的負担が軽い。
      </p>

      <h2>データから読み取れること</h2>
      <h3>リターンが一番高いのは「株式100%」</h3>
      <p>
        35年トータルで最も資産を増やしたのは「{best.name}」で、年率約{best.cagr.toFixed(1)}%。
        長期では株式の比率が高いほどリターンが伸びる、という教科書どおりの結果です。
        ただし——表の右端を見てください。
      </p>
      <h3>その代償が「最大下落率」</h3>
      <p>
        リターンが高い株式100%系は、途中で資産が半分近くまで落ち込む局面（最大下落率）も最大です。
        これはリーマンショック（2008年）などで実際に起きた下落で、
        「含み損が数年続いても売らずに持ち続けられるか」が問われます。
        多くの人が暴落時に売ってしまい、この高いリターンを取り逃します。
      </p>
      <h3>分散は「リターンを少し諦めて、下落を大きく抑える」</h3>
      <p>
        債券や金、REITを混ぜたポートフォリオ（60/40・4資産均等・GPIF型など）は、
        株式100%よりリターンこそ控えめですが、最大下落率が大きく改善します。
        とくに最も下落が小さかったのは「{safest.name}」（最大下落率 約{safest.maxDD.toFixed(0)}%）。
        「夜ぐっすり眠れる」ことの価値は、長く投資を続けるうえで数字以上に大きいといえます。
      </p>

      <h2>結論：正解は一つではない</h2>
      <p>
        この比較が示すのは「どれが一番か」ではなく、<strong>リターンとリスクは必ずトレードオフになる</strong>という事実です。
        高いリターンには大きな下落がつきもので、下落を抑えれば期待リターンは下がります。
        大切なのは、自分が<strong>受け入れられる下落の範囲</strong>を知り、その中で続けられる配分を選ぶことです。
      </p>
      <p>
        過去データはあくまで過去であり、将来を保証しません。だからこそ、
        ここで紹介した配分を
        <Link href="/" className="text-blue-600 hover:underline">シミュレーター</Link>
        に入力して、自分の積立額・期間で試したり、将来予測（モンテカルロ）で
        悲観シナリオを確認したりして、納得できる配分を見つけてください。
        各手法の見方は
        <Link href="/guide/monte-carlo-vs-backtest" className="text-blue-600 hover:underline">こちらの記事</Link>
        で解説しています。
      </p>
    </ArticleShell>
  );
}
