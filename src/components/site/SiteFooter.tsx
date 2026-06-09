import Link from 'next/link';

// 全ページ共通のフッター（内部リンク＋免責）
export default function SiteFooter() {
  const links: [string, string][] = [
    ['/', 'ホーム'],
    ['/guide', '入門ガイド'],
    ['/methodology', 'データと計算方法'],
    ['/about', '運営者情報'],
    ['/terms', '免責事項・利用規約'],
    ['/contact', 'お問い合わせ'],
    ['/privacy', 'プライバシーポリシー'],
  ];

  return (
    <footer className="border-t bg-white mt-8">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-3">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-gray-800 transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-400 leading-relaxed">
          ※本サイトは教育目的のシミュレーションツールです。投資助言ではありません。掲載情報の正確性・完全性を保証するものではなく、過去の実績は将来の成果を保証しません。投資の最終判断はご自身の責任で行ってください。
        </p>
        <p className="text-xs text-gray-400">© 2025 アセットアロケーション シミュレーター</p>
      </div>
    </footer>
  );
}
