import type { Metadata } from 'next';
import Link from 'next/link';
import ContentHeader from '@/components/site/ContentHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { GUIDES } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'アセットアロケーション入門ガイド',
  description:
    '資産配分の基礎から、年代別ポートフォリオ、新NISA活用、リバランス、FIRE・取り崩し戦略まで。長期投資に必要な知識をやさしく解説するガイド記事の一覧です。',
  alternates: { canonical: '/guide' },
};

export default function GuideIndex() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader active="/guide" />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">入門ガイド</h1>
          <p className="text-gray-600 leading-relaxed">
            アセットアロケーション（資産配分）について、基礎から実践までをやさしく解説する記事をまとめました。
            投資を始めたばかりの方も、配分を見直したい方も、気になるテーマから読んでみてください。
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="block bg-white rounded-xl shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all border border-transparent hover:border-blue-200"
            >
              <div className="text-2xl mb-2">{g.emoji}</div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">{g.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{g.description}</p>
              <span className="inline-block mt-3 text-xs font-medium text-blue-600">続きを読む →</span>
            </Link>
          ))}
        </div>

        <section className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">学んだら、実際に試してみよう</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            記事で学んだ資産配分の考え方は、本サイトのシミュレーターですぐに検証できます。
            過去の暴落でどれくらい下落したか（バックテスト）、将来どのような資産分布になりそうか
            （モンテカルロ）を、グラフで確認しながら自分に合った配分を見つけましょう。
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            シミュレーターを使う →
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
