import type { Metadata } from 'next';
import ContentHeader from '@/components/site/ContentHeader';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'アセットアロケーション シミュレーターへのお問い合わせ窓口。ご意見・ご要望・不具合のご報告はこちらのメールアドレスまでお気軽にご連絡ください。',
  alternates: { canonical: '/contact' },
};

const EMAIL = 'saltomori0613@gmail.com';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
          <header className="space-y-2 border-b border-gray-100 pb-5">
            <h1 className="text-2xl font-bold text-gray-900">お問い合わせ</h1>
            <p className="text-gray-600 leading-relaxed">
              本サービスに関するご意見・ご要望、不具合のご報告、その他のお問い合わせは、
              下記のメールアドレスまでお気軽にご連絡ください。
            </p>
          </header>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-2">メールでのお問い合わせ</h2>
              <p className="mb-3">以下のアドレス宛にメールをお送りください。</p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('【アセットシミュレーター】お問い合わせ')}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {EMAIL} にメールする
              </a>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-2">お問い合わせ時のお願い</h2>
              <p>スムーズに対応するため、可能な範囲で以下をお知らせいただけると助かります。</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>お問い合わせの種類（ご意見／ご要望／不具合報告 など）</li>
                <li>不具合の場合：発生した操作の手順、お使いの端末・ブラウザ</li>
                <li>具体的な内容（どの画面・どの機能についてか）</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-2">ご返信について</h2>
              <p>
                個人で運営しているため、ご返信までお時間をいただく場合や、
                内容によってはご返信を差し控える場合がございます。あらかじめご了承ください。
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-800 text-base mb-2">ご注意</h2>
              <p>
                本サービスは教育目的のシミュレーションツールであり、個別の投資相談・助言には
                お応えできません。投資判断はご自身の責任で行っていただきますようお願いいたします。
                詳しくは<a href="/terms" className="text-blue-600 hover:underline">免責事項・利用規約</a>をご覧ください。
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
