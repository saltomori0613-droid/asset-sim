import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アセットアロケーション入門 | 資産配分の基礎知識",
  description: "アセットアロケーション（資産配分）の基本を解説。株・債券・金・REITの特徴、分散投資の効果、リバランスの重要性など、長期投資に必要な知識をまとめました。",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
            アセットアロケーション シミュレーター
          </Link>
          <nav className="flex gap-4 text-sm text-gray-600">
            <Link href="/guide" className="text-blue-600 font-medium">入門ガイド</Link>
            <Link href="/about" className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">アセットアロケーション入門</h1>
            <p className="text-sm text-gray-500">長期投資の基礎：資産配分の考え方</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">アセットアロケーションとは？</h2>
            <p className="text-gray-700 leading-relaxed">
              アセットアロケーションとは、資産をどの種類の投資対象にどの割合で配分するかを決めることです。
              「株式に70%、債券に20%、金に10%」といった形で、複数の資産クラスに分散して投資します。
            </p>
            <p className="text-gray-700 leading-relaxed">
              投資の世界では「卵を一つのかごに盛るな」という格言があります。一つの資産だけに集中投資すると、
              その資産が暴落したときに大きな損失を被ります。複数の資産に分散することで、
              リスクを抑えながら安定したリターンを目指すことができます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">主要な資産クラスとその特徴</h2>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">株式（エクイティ）</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  企業の所有権の一部を購入する投資。長期的には最も高いリターンが期待できますが、
                  価格変動（ボラティリティ）も大きいです。SP500やNASDAQ100などのインデックスファンドが人気です。
                  歴史的に米国株は年平均7〜10%のリターンを記録しています（円ベース、配当込み）。
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">債券（ボンド）</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  国や企業が発行する借用証書。株式より低リターンですが安定しており、
                  株式が下落するときに価値が上がる傾向があります（逆相関）。
                  日本国債は低リターンですが元本保全性が高く、ポートフォリオの安定材料になります。
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">金（ゴールド）</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  インフレや通貨危機に強い実物資産。株式・債券との相関が低く、
                  ポートフォリオの分散効果を高めます。リーマンショック時など、
                  株式が暴落する局面でも価値を保ちやすい特性があります。
                  配当・利子はありませんが、長期的にはインフレ率を上回るリターンを記録しています。
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">REIT（不動産投資信託）</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  不動産に間接投資できる金融商品。オフィスビルや商業施設などの賃料収入が配当として分配されます。
                  高い配当利回りが魅力ですが、金利上昇局面では価格が下落しやすい特性があります。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">なぜ分散投資が重要なのか</h2>
            <p className="text-gray-700 leading-relaxed">
              異なる資産クラスは、経済環境に対して異なる反応を示します。
              株式が下落するとき、債券や金は上昇することがあります。
              この「相関の低さ」を利用することで、ポートフォリオ全体の変動を抑えながら、
              それぞれの資産の成長恩恵を受けることができます。
            </p>
            <p className="text-gray-700 leading-relaxed">
              例えば、2008年のリーマンショックでは、SP500が約50%下落しましたが、
              米国国債は上昇し、金も比較的安定していました。
              株式100%のポートフォリオは壊滅的な損失を被りますが、
              株60%・債券30%・金10%のポートフォリオであれば損失を大幅に軽減できます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">リバランスの重要性</h2>
            <p className="text-gray-700 leading-relaxed">
              時間が経つと、各資産の値上がり・値下がりによって当初の配分比率がずれていきます。
              例えば株式が大きく上昇すると、当初「株60%・債券40%」だったポートフォリオが
              「株75%・債券25%」になってしまうことがあります。
            </p>
            <p className="text-gray-700 leading-relaxed">
              リバランスとは、定期的に資産を売買して当初の配分比率に戻す作業です。
              値上がりした資産を売り、値下がりした資産を買い増すことで、
              「高く売って安く買う」という投資の基本を自動的に実践できます。
              一般的に年1〜4回程度のリバランスが推奨されています。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">年齢とリスク許容度</h2>
            <p className="text-gray-700 leading-relaxed">
              一般的な原則として、若い人ほど株式の比率を高め、年齢を重ねるにつれて
              債券などの安定資産の比率を増やすことが推奨されます。
              これは、若いうちは暴落があっても回復を待てる時間的余裕があるからです。
            </p>
            <p className="text-gray-700 leading-relaxed">
              「100マイナス年齢」ルールでは、30歳なら株式70%・安定資産30%、
              60歳なら株式40%・安定資産60%という目安が使われます。
              ただしこれはあくまで目安であり、個人のリスク許容度や資産状況によって異なります。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">シミュレーターの使い方</h2>
            <p className="text-gray-700 leading-relaxed">
              本サイトのシミュレーターを使えば、様々な資産配分パターンで過去の実績を検証したり、
              将来のシナリオを確率的に予測したりできます。
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>複数の資産配分パターンを試して比較する</li>
              <li>バックテストで2008年のリーマンショック時の影響を確認する</li>
              <li>モンテカルロシミュレーションで資産枯渇リスクを把握する</li>
              <li>リバランス頻度を変えてリターンへの影響を検証する</li>
              <li>取り崩し期のシミュレーションで老後資金の持続性を確認する</li>
            </ul>
          </section>

          <div className="bg-blue-600 rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-3">実際にシミュレーションしてみましょう</p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              シミュレーターを使う →
            </Link>
          </div>
        </article>
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
