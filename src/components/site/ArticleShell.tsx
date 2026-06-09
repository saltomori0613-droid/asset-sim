import Link from 'next/link';
import ContentHeader from './ContentHeader';
import SiteFooter from './SiteFooter';
import { GUIDES, getGuide } from '@/lib/guides';

interface Props {
  slug: string;
  lead: string;
  published?: string;
  updated?: string;
  sources?: string[];
  children: React.ReactNode;
}

// ガイド記事共通レイアウト：ヘッダー＋パンくず＋著者情報＋本文＋出典＋CTA＋関連記事＋フッター
export default function ArticleShell({
  slug,
  lead,
  published = '2025年5月',
  updated = '2026年6月',
  sources,
  children,
}: Props) {
  const meta = getGuide(slug);
  const related = GUIDES.filter((g) => g.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader active="/guide" />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-500 mb-4 flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-gray-800 transition-colors">ホーム</Link>
          <span className="text-gray-300">›</span>
          <Link href="/guide" className="hover:text-gray-800 transition-colors">入門ガイド</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-700">{meta?.title}</span>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <header className="space-y-3 border-b border-gray-100 pb-5 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">{meta?.title}</h1>
            <p className="text-gray-600 leading-relaxed">{lead}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
              <span>
                運営：
                <Link href="/about" className="text-gray-500 hover:text-blue-600 underline underline-offset-2">
                  アセットアロケーション シミュレーター運営者
                </Link>
              </span>
              <span aria-hidden="true">・</span>
              <span>公開: {published}</span>
              <span aria-hidden="true">・</span>
              <span>更新: {updated}</span>
            </div>
          </header>

          <div className="article-body">{children}</div>

          {/* 出典・編集方針・免責（E-E-A-T） */}
          <footer className="mt-10 pt-5 border-t border-gray-100 space-y-3 text-xs text-gray-500 leading-relaxed">
            {sources && sources.length > 0 && (
              <div>
                <p className="font-semibold text-gray-600 mb-1">参考・出典</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {sources.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              本記事は教育目的の一般的な情報であり、特定の金融商品の勧誘や投資助言ではありません。
              シミュレーションの前提データや計算方法は
              <Link href="/methodology" className="text-blue-600 hover:underline">データと計算方法</Link>
              に、運営方針・免責は
              <Link href="/about" className="text-blue-600 hover:underline">運営者情報・編集方針</Link>
              にまとめています。投資の最終判断はご自身の責任で行ってください。
            </p>
          </footer>

          <div className="bg-blue-600 rounded-xl p-6 text-center mt-10">
            <p className="text-white font-semibold mb-3">実際にシミュレーションしてみましょう</p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              シミュレーターを使う →
            </Link>
          </div>
        </article>

        {/* 関連記事 */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">関連記事</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="block bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="text-xl mb-1">{g.emoji}</div>
                <div className="text-sm font-medium text-gray-800">{g.title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">{g.description}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
