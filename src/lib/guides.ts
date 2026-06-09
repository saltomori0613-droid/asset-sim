// ガイド記事のメタ情報を一元管理（ハブ一覧・パンくず・関連記事・sitemapで共有）

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  emoji: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: 'basics',
    title: 'アセットアロケーション入門',
    description: '資産配分とは何か、なぜ分散投資が大切なのか。長期投資で最初に知っておきたい基本の考え方をやさしくまとめました。',
    emoji: '📚',
  },
  {
    slug: 'asset-classes',
    title: '主要な資産クラス徹底解説',
    description: '株式・債券・金・REIT・現金。それぞれのリスクとリターンの特徴、ポートフォリオの中で果たす役割を解説します。',
    emoji: '🧩',
  },
  {
    slug: 'portfolio-by-age',
    title: '年代別ポートフォリオの作り方',
    description: '20代から60代以降まで。年齢とリスク許容度に応じた資産配分の考え方と、年代別モデルポートフォリオの例を紹介します。',
    emoji: '🎯',
  },
  {
    slug: 'nisa',
    title: '新NISAとアセットアロケーション',
    description: '2024年に始まった新NISA。つみたて投資枠・成長投資枠を、資産配分の観点からどう使い分けるかを整理します。',
    emoji: '🇯🇵',
  },
  {
    slug: 'rebalancing',
    title: 'リバランスの方法と最適な頻度',
    description: '時間とともに崩れた資産配分を元に戻すリバランス。具体的なやり方、推奨頻度、コストを抑えるコツを解説します。',
    emoji: '⚖️',
  },
  {
    slug: 'fire-4-percent',
    title: 'FIREと4%ルール：取り崩し戦略',
    description: '貯めた資産を取り崩して暮らすフェーズの考え方。4%ルールの根拠と落とし穴、シミュレーターでの検証方法を解説します。',
    emoji: '🔥',
  },
  {
    slug: 'monte-carlo-vs-backtest',
    title: 'モンテカルロ法とバックテストの読み方',
    description: '本ツールの2つの予測手法の違いと、中央値・パーセンタイル・資産枯渇確率といった結果の正しい見方を、具体的に解説します。',
    emoji: '📊',
  },
  {
    slug: 'dca-vs-lump-sum',
    title: '積立投資と一括投資はどちらが有利か',
    description: '毎月コツコツ買う積立（ドルコスト平均法）と、まとめて投資する一括。仕組み・期待値・向き不向きを、データの考え方とともに整理します。',
    emoji: '💰',
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
