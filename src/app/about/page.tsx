import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "このサービスについて | アセットアロケーション シミュレーター",
  description: "アセットアロケーション シミュレーターは、株・債券・金などの資産配分をシミュレーションできる無料ツールです。モンテカルロ法とバックテストに対応しています。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
            アセットアロケーション シミュレーター
          </Link>
          <nav className="flex gap-4 text-sm text-gray-600">
            <Link href="/guide" className="hover:text-gray-900">入門ガイド</Link>
            <Link href="/about" className="text-blue-600 font-medium">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">このサービスについて</h1>
            <p className="text-sm text-gray-500">アセットアロケーション シミュレーターとは</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">サービス概要</h2>
            <p className="text-gray-700 leading-relaxed">
              アセットアロケーション シミュレーターは、株式・債券・金・REITなど14種類の資産の配分を自由に設定し、
              長期的な資産推移をシミュレーションできる無料ツールです。
              資産形成（積み立て）フェーズと資産取り崩し（リタイア後）フェーズの両方に対応しています。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">主な機能</h2>
            <ul className="space-y-3">
              {[
                { title: "14種類の資産クラス", desc: "SP500、NASDAQ100、全世界株、新興国株、日経225、TOPIX、日本国債、米国債、金、J-REIT、US-REIT、円、ドルから自由に組み合わせ" },
                { title: "ヒストリカルブートストラップ", desc: "1990〜2024年の実際の年次リターンをランダム抽出して1000通りのシナリオを生成。リーマンショックのような大暴落が自然に含まれる現実的なシミュレーション" },
                { title: "バックテスト", desc: "1990〜2024年の実際のデータを使って過去の運用実績を再現。ITバブル崩壊やリーマンショックなど実際の暴落の影響を確認できる" },
                { title: "積み立て・取り崩し両対応", desc: "毎月の積立投資シミュレーションだけでなく、老後の定額取り崩しシミュレーションにも対応" },
                { title: "リバランス頻度の選択", desc: "年1回・年2回・年4回・年6回・毎月からリバランス頻度を選択可能" },
                { title: "資産枯渇確率の計算", desc: "モンテカルロシミュレーションにより、老後資金が尽きる確率を数値で把握できる" },
              ].map(({ title, desc }) => (
                <li key={title} className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">✓</span>
                  <div>
                    <span className="font-medium text-gray-800">{title}</span>
                    <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">なぜ作ったか</h2>
            <p className="text-gray-700 leading-relaxed">
              日本語でここまで細かく設定できる無料のアセットアロケーションシミュレーターがなかったからです。
            </p>
            <p className="text-gray-700 leading-relaxed">
              英語圏には優れたツール（Portfolio Visualizer、cFIREsimなど）がありますが、
              日本の資産（J-REIT、日本国債、TOPIX）が含まれていなかったり、
              円ベースのリターンで計算できなかったりします。
              また、英語が読めない方にとってはそもそも使いにくい問題もあります。
            </p>
            <p className="text-gray-700 leading-relaxed">
              このツールは完全無料・登録不要で使えます。
              投資判断の参考情報として、多くの方に活用していただけることを願っています。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">データについて</h2>
            <p className="text-gray-700 leading-relaxed">
              シミュレーションに使用しているリターンデータは、各資産の1990〜2024年の年次リターンの概算値です。
              SP500・NASDAQ100などは円ベースのトータルリターン（配当込み・為替変動込み）を使用しています。
              実際のファンドや指数とは差異がある場合があります。
            </p>
            <p className="text-gray-700 leading-relaxed">
              あくまで教育目的のシミュレーションツールです。
              実際の投資判断は、ご自身の責任でファイナンシャルアドバイザー等にご相談のうえ行ってください。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">お問い合わせ</h2>
            <p className="text-gray-700">
              ご意見・バグ報告などは下記メールアドレスまでお気軽にどうぞ。
            </p>
            <a href="mailto:saltomori0613@gmail.com" className="text-blue-600 hover:underline">
              saltomori0613@gmail.com
            </a>
          </section>

          <div className="bg-blue-600 rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-3">シミュレーターを使ってみる</p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              今すぐ試す →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white mt-8">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-400">
          <span>© 2025 アセットアロケーション シミュレーター</span>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  );
}
