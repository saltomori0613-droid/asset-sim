import type { Metadata } from 'next';
import ContentHeader from '@/components/site/ContentHeader';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: '免責事項・利用規約',
  description:
    'アセットアロケーション シミュレーターの利用規約および免責事項。本サービスは教育目的のシミュレーションツールであり、投資助言ではありません。',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
          <header className="space-y-2 border-b border-gray-100 pb-5">
            <h1 className="text-2xl font-bold text-gray-900">免責事項・利用規約</h1>
            <p className="text-xs text-gray-400">最終更新: 2025年5月</p>
          </header>

          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">1. サービスの目的</h2>
              <p>
                本サービス「アセットアロケーション シミュレーター」（以下「本ツール」）は、
                資産配分に関する理解を深めるための<strong>教育目的のシミュレーションツール</strong>です。
                特定の金融商品の購入・売却・保有を推奨するものではありません。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">2. 投資助言ではないこと</h2>
              <p>
                本ツールが提供する一切の情報・計算結果・記事は、投資助言、投資勧誘、
                税務・法務に関する助言を構成するものではありません。
                投資には元本割れのリスクがあります。実際の投資判断は、必要に応じて
                ファイナンシャル・プランナーや税理士などの専門家にご相談のうえ、
                ご自身の責任と判断で行ってください。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">3. データの正確性について</h2>
              <p>
                本ツールで使用するリターンデータや相関係数などは、教育目的のための概算値・近似値であり、
                実際の指数やファンドの成績とは異なる場合があります。
                シミュレーション結果は過去のデータや一定の仮定に基づく試算であり、
                <strong>将来の運用成果を予測・保証するものではありません</strong>。
                掲載情報の正確性・完全性・有用性について、運営者は保証いたしません。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">4. 免責</h2>
              <p>
                本ツールの利用、または利用できなかったことによって生じたいかなる損害についても、
                運営者は一切の責任を負いません。
                本ツールは予告なく内容の変更・中断・終了を行う場合があります。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">5. 知的財産権</h2>
              <p>
                本ツールに掲載されている記事・デザイン・プログラム等の著作権は、
                原則として運営者または正当な権利者に帰属します。
                無断での複製・転載・再配布はご遠慮ください。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">6. 広告について</h2>
              <p>
                本ツールは、運営費用をまかなうため第三者配信の広告サービス（Google AdSense 等）を
                利用する場合があります。広告配信事業者によるCookieの利用等については、
                <a href="/privacy" className="text-blue-600 hover:underline">プライバシーポリシー</a>
                をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">7. 規約の変更</h2>
              <p>
                本規約は予告なく変更されることがあります。変更後の規約は、
                本ページに掲載された時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-1">8. お問い合わせ</h2>
              <p>
                本規約に関するお問い合わせは
                <a href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</a>
                よりお願いいたします。
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
