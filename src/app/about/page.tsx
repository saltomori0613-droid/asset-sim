import type { Metadata } from "next";
import Link from "next/link";
import ContentHeader from "@/components/site/ContentHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "運営者情報・このサービスについて",
  description:
    "アセットアロケーション シミュレーターの運営者情報・編集方針・データの出典。株・債券・金などの資産配分をシミュレーションできる無料ツールの運営方針を公開しています。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader active="/about" />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">運営者情報・このサービスについて</h1>
            <p className="text-sm text-gray-500">運営方針・編集方針・データの出典</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">サービス概要</h2>
            <p className="text-gray-700 leading-relaxed">
              アセットアロケーション シミュレーターは、株式・債券・金・REITなど14種類の資産の配分を自由に設定し、
              長期的な資産推移をシミュレーションできる無料ツールです。
              資産形成（積み立て）フェーズと資産取り崩し（リタイア後）フェーズの両方に対応しています。
              登録不要・完全無料でご利用いただけます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">運営者について</h2>
            <p className="text-gray-700 leading-relaxed">
              本サイトは、個人で運営しています。運営者は金融機関に属さない一個人であり、
              インデックス投資・長期分散投資に関心を持つ立場から、
              「日本語で細かく検証できる、信頼できる無料の資産配分ツールが欲しい」という思いで本ツールを開発・運営しています。
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>重要：</strong>運営者は、投資助言・代理業の登録を受けた金融の専門家ではありません。
                本サイトの情報・記事・シミュレーション結果は、すべて教育目的の一般的な情報提供であり、
                特定の銘柄や商品の購入・売却を推奨するものではありません。投資判断は必ずご自身の責任で行ってください。
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ご連絡は<Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>から承っています。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">編集方針</h2>
            <p className="text-gray-700 leading-relaxed">
              ガイド記事やツールの解説は、次の方針で作成・運営しています。
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">・</span><span><strong>正確性を重視</strong>：一般に広く受け入れられている投資理論・公的制度（新NISA等）にもとづき、事実関係を確認して記載します。</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">・</span><span><strong>中立性</strong>：特定の金融機関・商品の宣伝を目的とせず、メリットだけでなくリスクや注意点も併記します。</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">・</span><span><strong>透明性</strong>：シミュレーションの前提データ・計算方法を<Link href="/methodology" className="text-blue-600 hover:underline">データと計算方法</Link>のページで全公開しています。</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">・</span><span><strong>更新</strong>：制度変更や誤りに気づいた場合は、随時加筆・修正します。各記事に更新日を表示しています。</span></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">主な機能</h2>
            <ul className="space-y-3">
              {[
                { title: "14種類の資産クラス", desc: "SP500、NASDAQ100、全世界株、新興国株、日経225、TOPIX、日本国債、米国債、金、J-REIT、US-REIT、円、ドルから自由に組み合わせ" },
                { title: "ヒストリカルブートストラップ", desc: "1990〜2024年の実際の年次リターンをランダム抽出して1000通りのシナリオを生成。リーマンショックのような大暴落が自然に含まれる現実的なシミュレーション" },
                { title: "バックテスト", desc: "1990〜2024年の実際のデータを使って過去の運用実績を再現。ITバブル崩壊やリーマンショックなど実際の暴落の影響を確認できる" },
                { title: "積み立て・取り崩し両対応", desc: "毎月の積立投資シミュレーションだけでなく、老後の定額取り崩しシミュレーションにも対応" },
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
            <h2 className="text-xl font-semibold text-gray-800">データの出典について</h2>
            <p className="text-gray-700 leading-relaxed">
              シミュレーションに使用しているリターン・リスク・相関の各数値は、
              公表されている主要な株価指数・債券指数・コモディティ価格などの長期的な傾向をもとにした
              1990〜2024年の年次データの概算値です。SP500・NASDAQ100などは円ベースのトータルリターン
              （配当込み・為替変動込み）を使用しています。実際のファンドや指数とは差異がある場合があります。
            </p>
            <p className="text-gray-700 leading-relaxed">
              使用しているすべての前提データ（期待リターン・標準偏差・相関行列・1990〜2024年の実績リターン）と
              計算ロジックは、<Link href="/methodology" className="text-blue-600 hover:underline">データと計算方法</Link>のページで公開しています。
              あくまで教育目的のシミュレーションツールとしてご利用ください。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">なぜ作ったか</h2>
            <p className="text-gray-700 leading-relaxed">
              日本語でここまで細かく設定できる無料のアセットアロケーションシミュレーターが見当たらなかったためです。
              英語圏には優れたツール（Portfolio Visualizer、cFIREsimなど）がありますが、
              日本の資産（J-REIT、日本国債、TOPIX）が含まれていなかったり、円ベースのリターンで計算できなかったりします。
              また、英語が読めない方にとっては使いにくいという課題もあります。
              このツールが、投資判断の参考情報として多くの方の役に立つことを願っています。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">お問い合わせ</h2>
            <p className="text-gray-700">
              ご意見・ご要望・バグ報告などは、
              <Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>
              またはメール（
              <a href="mailto:saltomori0613@gmail.com" className="text-blue-600 hover:underline">saltomori0613@gmail.com</a>
              ）までお気軽にどうぞ。
            </p>
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

      <SiteFooter />
    </div>
  );
}
