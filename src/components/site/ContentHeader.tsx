import Link from 'next/link';

// コンテンツページ（ガイド・About・規約など）共通のヘッダー
export default function ContentHeader({ active }: { active?: string }) {
  const navClass = (href: string) =>
    active === href ? 'text-blue-600 font-medium' : 'hover:text-gray-900 transition-colors';

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-base sm:text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          アセットアロケーション シミュレーター
        </Link>
        <nav className="flex gap-4 text-sm text-gray-600">
          <Link href="/guide" className={navClass('/guide')}>入門ガイド</Link>
          <Link href="/about" className={navClass('/about')}>About</Link>
        </nav>
      </div>
    </header>
  );
}
