import type { Metadata } from 'next';
import Link from 'next/link';
import ContentHeader from '@/components/site/ContentHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { AssetId } from '@/lib/types';
import {
  ASSETS,
  CORRELATION_MATRIX,
  HISTORICAL_RETURNS,
  BACKTEST_MIN_YEAR,
  BACKTEST_MAX_YEAR,
} from '@/lib/assetData';

export const metadata: Metadata = {
  title: 'データと計算方法（前提条件・出典）',
  description:
    '本シミュレーターで使用する14資産の期待リターン・リスク（標準偏差）・相関係数・1990〜2024年の実績リターンと、バックテスト/モンテカルロの計算手法を公開します。前提とデータの出典を明らかにした透明性ページです。',
  alternates: { canonical: '/methodology' },
};

// ワイドな表向けの短縮ラベル
const SHORT: Record<AssetId, string> = {
  sp500: 'S&P500',
  nasdaq100: 'NDQ100',
  globalStocks: '先進国',
  allWorld: '全世界',
  emerging: '新興国',
  nk225: '日経225',
  topix: 'TOPIX',
  jpBonds: '日本債',
  usBonds: '米国債',
  gold: '金',
  jreit: 'J-REIT',
  usreit: '米REIT',
  jpyCash: '円現金',
  usdCash: 'ドル現金',
};

function pct(v: number, digits = 0): string {
  return `${(v * 100).toFixed(digits)}%`;
}

function ReturnCell({ v }: { v: number }) {
  const color = v > 0 ? '#16a34a' : v < 0 ? '#dc2626' : '#6b7280';
  return (
    <td className="px-2 py-1 text-right tabular-nums" style={{ color }}>
      {v > 0 ? '+' : ''}
      {Math.round(v * 100)}
    </td>
  );
}

export default function MethodologyPage() {
  const years = Object.keys(HISTORICAL_RETURNS)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-500 mb-4 flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-gray-800 transition-colors">ホーム</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-700">データと計算方法</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <header className="space-y-3 border-b border-gray-100 pb-5 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">データと計算方法</h1>
            <p className="text-gray-600 leading-relaxed">
              シミュレーション結果は、入力した資産配分と「どんなデータ・前提・計算方法を使うか」で大きく変わります。
              本ページでは、当ツールが使用するすべての前提データと計算ロジックを公開します。
              数字の根拠を確認したうえで、結果を一つの目安として活用してください。
            </p>
            <p className="text-xs text-gray-400">最終更新: 2026年6月</p>
          </header>

          <div className="article-body">
            <h2>1. 各資産の期待リターンとリスク</h2>
            <p>
              「将来予測（モンテカルロ）」のうちパラメトリック法では、各資産に以下の年率期待リターンと
              リスク（標準偏差＝1年あたりの値動きのブレ幅の目安）を仮定しています。
              いずれも円ベース・配当込みを想定した教育用の概算値です。
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>資産クラス</th>
                    <th style={{ textAlign: 'right' }}>期待リターン（年率）</th>
                    <th style={{ textAlign: 'right' }}>リスク（標準偏差）</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSETS.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle"
                          style={{ backgroundColor: a.color }}
                        />
                        {a.labelJa}
                      </td>
                      <td style={{ textAlign: 'right' }}>{pct(a.meanReturn, 1)}</td>
                      <td style={{ textAlign: 'right' }}>{pct(a.stdDev, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400">
              ※期待リターンが高い資産ほどリスク（ブレ）も大きい傾向が、数値からも読み取れます。
            </p>

            <h2>2. 資産どうしの相関係数</h2>
            <p>
              分散投資の効果は「相関」で決まります。相関係数は -1〜+1 の値をとり、
              +1に近いほど同じ方向に動き、0に近いほど無関係、マイナスは逆方向に動くことを意味します。
              当ツールはパラメトリック法で、以下の相関行列をコレスキー分解して、
              相関を持つ乱数（各資産が連動して動くシナリオ）を生成しています。
            </p>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr>
                    <th></th>
                    {ASSETS.map((a) => (
                      <th key={a.id} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {SHORT[a.id]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ASSETS.map((a, i) => (
                    <tr key={a.id}>
                      <th style={{ whiteSpace: 'nowrap' }}>{SHORT[a.id]}</th>
                      {ASSETS.map((b, j) => {
                        const v = CORRELATION_MATRIX[i][j];
                        return (
                          <td
                            key={b.id}
                            className="text-center tabular-nums"
                            style={{ color: v < 0 ? '#dc2626' : i === j ? '#111827' : '#374151' }}
                          >
                            {v.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400">
              ※例：株式（S&amp;P500）と日本債券はマイナスの相関で、株が下がる局面で債券が支えになりやすいことを示します。
            </p>

            <h2>3. ヒストリカルデータ（1990〜2024年の実績リターン）</h2>
            <p>
              「バックテスト」と「ヒストリカルブートストラップ」では、{BACKTEST_MIN_YEAR}〜{BACKTEST_MAX_YEAR}年の
              年次リターン（円ベース・配当込みの概算、単位は%）を使用します。
              ITバブル崩壊（2000〜2002年）やリーマンショック（2008年）など、実際の暴落が数字に表れています。
            </p>
            <div className="overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr>
                    <th style={{ whiteSpace: 'nowrap' }}>年</th>
                    {ASSETS.map((a) => (
                      <th key={a.id} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {SHORT[a.id]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {years.map((y) => (
                    <tr key={y}>
                      <th style={{ whiteSpace: 'nowrap' }}>{y}</th>
                      {ASSETS.map((a) => (
                        <ReturnCell key={a.id} v={HISTORICAL_RETURNS[y][a.id] ?? 0} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400">数値は年次リターン（%）。緑＝プラス、赤＝マイナス。</p>

            <h2>4. 3つの計算手法</h2>
            <h3>バックテスト（過去実績の再現）</h3>
            <p>
              指定した開始年から、上記の実績リターンを年ごとに順番に適用してポートフォリオを再現します。
              毎月の積立・取り崩しのフロー按分と、指定頻度でのリバランスも反映します。
              過去に実際に起きた相場を忠実になぞれる一方、過去に起きていないシナリオは扱えません。
            </p>
            <h3>ヒストリカルブートストラップ（推奨）</h3>
            <p>
              {BACKTEST_MIN_YEAR}〜{BACKTEST_MAX_YEAR}年の実績から1年単位でランダムに抽出（復元抽出）し、
              1000通りのシナリオを生成します。正規分布を仮定しないため、リーマンショック級の暴落（ファットテール）が
              自然に含まれ、同じ年のデータをまとめて使うことで資産間の相関構造も実績ベースで反映されます。
            </p>
            <h3>パラメトリック（正規分布仮定）</h3>
            <p>
              上記の期待リターン・標準偏差・相関行列から共分散行列を作り、コレスキー分解で相関を持つ乱数を生成します
              （乱数はBox-Muller法による正規乱数）。計算は安定しますが、現実の急激な暴落を過小評価しやすい傾向があります。
            </p>

            <h2>5. データの前提・出典・免責</h2>
            <ul>
              <li>
                リターン・リスク・相関の各数値は、公表されている主要株価指数・債券指数・コモディティ価格などの
                長期的な傾向をもとにした<strong>教育目的の概算値</strong>であり、特定のファンドや指数の実績そのものではありません。
              </li>
              <li>
                外国資産は円換算（為替変動込み）を想定しています。実際の商品の成績とは差異が生じます。
              </li>
              <li>
                計算はすべて閲覧者のブラウザ内で完結し、入力値が外部に送信されることはありません。
              </li>
              <li>
                本ページの内容は将来の運用成果を保証するものではなく、投資助言でもありません。
              </li>
            </ul>
            <p>
              計算ロジックの全体像は
              <Link href="/guide/monte-carlo-vs-backtest" className="text-blue-600 hover:underline">
                「モンテカルロ法とバックテストの読み方」
              </Link>
              でも、結果の解釈とあわせて解説しています。
            </p>
          </div>

          <div className="bg-blue-600 rounded-xl p-6 text-center mt-10">
            <p className="text-white font-semibold mb-3">前提を理解したら、実際に試してみましょう</p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              シミュレーターを使う →
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
