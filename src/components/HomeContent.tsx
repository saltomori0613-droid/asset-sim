import Link from 'next/link';

interface FAQ {
  q: string;
  a: string;
}

interface Content {
  introTitle: string;
  introBody: string[];
  featuresTitle: string;
  features: { title: string; desc: string }[];
  howToTitle: string;
  steps: { title: string; desc: string }[];
  faqTitle: string;
  faqs: FAQ[];
  guideTitle: string;
  guideBody: string;
  guideLink: string;
}

const CONTENT: Record<'ja' | 'en', Content> = {
  ja: {
    introTitle: 'アセットアロケーション シミュレーターとは',
    introBody: [
      'アセットアロケーション シミュレーターは、株式・債券・金・REITなど14種類の資産の配分を自由に設定し、長期的な資産の推移を無料でシミュレーションできるツールです。資産形成（積み立て）と資産活用（取り崩し）の両方に対応しています。',
      'アセットアロケーション（資産配分）は、長期投資の成果を大きく左右する重要な意思決定です。本ツールを使えば、過去の実際のデータでの検証（バックテスト）と、確率的な将来予測（モンテカルロ・シミュレーション）の両面から、自分に合った資産配分を数字とグラフで確認できます。',
    ],
    featuresTitle: 'このシミュレーターでできること',
    features: [
      { title: '14資産の自由な組み合わせ', desc: 'S&P500・NASDAQ100・全世界株・新興国株・日経225・TOPIX・日本国債・米国債・金・J-REIT・米国REIT・現金などを自由に配分。' },
      { title: 'ヒストリカルブートストラップ', desc: '1990〜2024年の実際の年次リターンをランダム抽出し、1000通りの将来シナリオを生成。暴落（ファットテール）も自然に反映。' },
      { title: 'バックテスト', desc: '過去の実データで運用を再現。ITバブル崩壊やリーマンショックなど、実際の暴落の影響を確認できます。' },
      { title: '積み立て・取り崩し両対応', desc: '毎月の積立投資はもちろん、リタイア後の定額取り崩しもシミュレーション可能。' },
      { title: 'リバランス頻度の比較', desc: '年1回〜毎月までリバランス頻度を変えて、リターンやブレへの影響を検証できます。' },
      { title: '資産枯渇確率の表示', desc: 'モンテカルロ法により、老後資金が尽きる確率を数値で把握。取り崩しプランの安全性を判断できます。' },
    ],
    howToTitle: '使い方（かんたん3ステップ）',
    steps: [
      { title: '基本設定を入力', desc: '現在の資産額と、毎月の積立額または取り崩し額を入力します。' },
      { title: '資産配分を決める', desc: '株式・債券・金などの比率を、合計100%になるように設定します。' },
      { title: 'シミュレーション実行', desc: 'モード（将来予測 or 過去検証）と期間を選び、ボタンを押すと結果がグラフで表示されます。' },
    ],
    faqTitle: 'よくある質問',
    faqs: [
      { q: 'このシミュレーターは無料で使えますか？', a: 'はい、完全無料・登録不要でご利用いただけます。すべての機能をそのままお使いいただけます。' },
      { q: 'バックテストとモンテカルロの違いは何ですか？', a: 'バックテストは1990〜2024年の実際のデータを順番に再現する「過去の検証」です。モンテカルロは過去データをもとに多数の将来シナリオを生成する「確率的な予測」で、結果の幅（5〜95パーセンタイル）で示されます。' },
      { q: '「資産枯渇確率」とは何ですか？', a: '取り崩しモードのモンテカルロ・シミュレーションで、設定した取り崩しを続けた場合に、期間内で資産がゼロになってしまうシナリオの割合です。この数値が低いほど、その取り崩しプランは安全と考えられます。' },
      { q: '使われているリターンデータは正確ですか？', a: '掲載しているリターンデータは教育目的のための概算値です。円ベースのトータルリターン（配当・為替込み）を年次で設定しており、実際の指数やファンドとは差異がある場合があります。' },
      { q: '入力したデータは保存・送信されますか？', a: '計算はすべてお使いのブラウザ内で完結します。入力した金額や配分がサーバーに送信・保存されることはありません。' },
      { q: '投資のアドバイスとして使えますか？', a: 'いいえ。本ツールは教育目的のシミュレーションであり、投資助言ではありません。実際の投資判断はご自身の責任で行ってください。' },
    ],
    guideTitle: 'もっと詳しく学びたい方へ',
    guideBody: 'アセットアロケーションの基礎、年代別ポートフォリオの作り方、新NISAの活用、リバランス、FIRE・取り崩し戦略まで、入門ガイドでやさしく解説しています。',
    guideLink: '入門ガイドを読む →',
  },
  en: {
    introTitle: 'What is the Asset Allocation Simulator?',
    introBody: [
      'The Asset Allocation Simulator is a free tool that lets you freely set the allocation across 14 asset classes—stocks, bonds, gold, REITs and more—and simulate how your portfolio could evolve over the long term. It supports both wealth accumulation and decumulation (drawdown).',
      'Asset allocation is one of the most important decisions affecting long-term investment outcomes. This tool lets you examine your allocation from two angles—historical backtesting and probabilistic Monte Carlo forecasting—so you can see the numbers and charts behind your choices.',
    ],
    featuresTitle: 'What you can do',
    features: [
      { title: '14 asset classes', desc: 'Mix S&P 500, NASDAQ 100, world & emerging equities, Nikkei 225, TOPIX, JP & US bonds, gold, J-REIT, US REIT, cash and more.' },
      { title: 'Historical bootstrap', desc: 'Resamples actual annual returns from 1990–2024 to generate 1,000 future scenarios, naturally including crashes (fat tails).' },
      { title: 'Backtest', desc: 'Replays real historical data so you can see the impact of crashes like the dot-com bust and the 2008 crisis.' },
      { title: 'Accumulation & drawdown', desc: 'Simulate monthly contributions, or fixed withdrawals during retirement.' },
      { title: 'Rebalance comparison', desc: 'Change rebalancing frequency from annual to monthly and see the effect on returns and volatility.' },
      { title: 'Ruin probability', desc: 'Monte Carlo simulation shows the probability of running out of money—useful for judging a drawdown plan.' },
    ],
    howToTitle: 'How to use it (3 easy steps)',
    steps: [
      { title: 'Enter basic settings', desc: 'Input your current assets and your monthly contribution or withdrawal amount.' },
      { title: 'Set your allocation', desc: 'Adjust the weights of stocks, bonds, gold, etc. so they total 100%.' },
      { title: 'Run the simulation', desc: 'Pick a mode (forecast or backtest) and period, then press the button to see the chart.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this simulator free?', a: 'Yes. It is completely free and requires no registration. All features are available as-is.' },
      { q: 'What is the difference between backtest and Monte Carlo?', a: 'Backtest replays actual data from 1990–2024 in order (a historical check). Monte Carlo generates many future scenarios based on past data (a probabilistic forecast), shown as a 5th–95th percentile range.' },
      { q: 'What is "ruin probability"?', a: 'In drawdown Monte Carlo mode, it is the share of scenarios in which your assets reach zero within the period. The lower it is, the safer your drawdown plan.' },
      { q: 'Is the return data accurate?', a: 'The return data are approximations for educational purposes, set as JPY-based total returns (dividends and FX included). They may differ from actual indices or funds.' },
      { q: 'Is my input saved or sent anywhere?', a: 'All calculations run entirely in your browser. The amounts and allocations you enter are never sent to or stored on a server.' },
      { q: 'Can I use this as investment advice?', a: 'No. This tool is an educational simulation, not investment advice. Make your own investment decisions at your own responsibility.' },
    ],
    guideTitle: 'Want to learn more?',
    guideBody: 'Our guide covers the basics of asset allocation, building a portfolio by age, using Japan\'s NISA, rebalancing, and FIRE / drawdown strategies.',
    guideLink: 'Read the guide →',
  },
};

export default function HomeContent({ lang }: { lang: 'ja' | 'en' }) {
  const c = CONTENT[lang];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="space-y-6 mt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* イントロ */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">{c.introTitle}</h2>
        {c.introBody.map((p, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed mb-3 last:mb-0">{p}</p>
        ))}
      </section>

      {/* できること */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{c.featuresTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.features.map((f) => (
            <div key={f.title} className="flex gap-3">
              <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">✓</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 使い方 */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{c.howToTitle}</h2>
        <ol className="space-y-3">
          {c.steps.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{c.faqTitle}</h2>
        <div className="space-y-4">
          {c.faqs.map((f) => (
            <div key={f.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-800 mb-1">Q. {f.q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">A. {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 注目記事（独自データ・実データ検証） */}
      <section className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-400">
        <p className="text-xs font-semibold text-amber-600 mb-1">注目記事・実データ検証</p>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          代表的なポートフォリオ6種を1990〜2024年で徹底比較
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          全世界株100%・株60/債40・GPIF型など有名な資産配分を、当サイトの計算エンジンが
          実データでバックテスト。年率リターンと最大下落率を数字で比較しています。
        </p>
        <Link
          href="/guide/portfolio-comparison"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          比較を見る →
        </Link>
      </section>

      {/* ガイド誘導 */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{c.guideTitle}</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{c.guideBody}</p>
        <Link
          href="/guide"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          {c.guideLink}
        </Link>
      </section>
    </div>
  );
}
