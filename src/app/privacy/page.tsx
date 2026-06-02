import type { Metadata } from "next";
import ContentHeader from "@/components/site/ContentHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "プライバシーポリシー / Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentHeader />

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">

        {/* 日本語 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">プライバシーポリシー</h1>
          <p className="text-xs text-gray-500">最終更新: 2025年5月</p>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">1. 運営者</h2>
              <p>本サービス「アセットアロケーション シミュレーター」（以下「本ツール」）は個人が運営しています。</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">2. 収集する情報</h2>
              <p>本ツール自体はユーザーの個人情報を収集・保存しません。ただし、下記のサードパーティサービスがアクセスログ・Cookie等を収集する場合があります。</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">3. Google Analytics</h2>
              <p>
                本ツールはアクセス状況の分析のためGoogle Analytics（Google LLC）を使用しています。
                Google AnalyticsはCookieを使用してデータを収集します。
                収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。
                ブラウザの設定でCookieを無効にすることで収集を拒否できます。
              </p>
              <p className="mt-1">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Googleのプライバシーポリシー
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">4. 広告（Google AdSense）</h2>
              <p>
                本ツールはGoogle AdSense（Google LLC）による広告を掲載する場合があります。
                広告配信にあたりGoogleはCookieを使用して、ユーザーの興味に基づく広告を表示することがあります。
                Google広告設定ページにてパーソナライズ広告を無効にできます。
              </p>
              <p className="mt-1">
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google広告設定
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">5. 免責事項</h2>
              <p>本ツールは教育目的のシミュレーションであり、投資助言ではありません。シミュレーション結果に基づく投資判断はご自身の責任で行ってください。</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">6. お問い合わせ</h2>
              <p>
                プライバシーポリシーに関するお問い合わせは下記のメールアドレスまでご連絡ください。
              </p>
              <p className="mt-1">
                <a href="mailto:saltomori0613@gmail.com" className="text-blue-600 hover:underline">
                  saltomori0613@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* English */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Last updated: May 2025</p>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">1. Operator</h2>
              <p>This service &quot;Asset Allocation Simulator&quot; (the &quot;Tool&quot;) is operated by an individual.</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">2. Information We Collect</h2>
              <p>The Tool itself does not collect or store any personal information. However, third-party services listed below may collect access logs, cookies, and similar data.</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">3. Google Analytics</h2>
              <p>
                The Tool uses Google Analytics (Google LLC) to analyze traffic. Google Analytics uses cookies to collect data, which is managed under Google&apos;s Privacy Policy.
                You can opt out by disabling cookies in your browser settings.
              </p>
              <p className="mt-1">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Privacy Policy
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">4. Advertising (Google AdSense)</h2>
              <p>
                The Tool may display advertisements through Google AdSense (Google LLC).
                Google may use cookies to show ads based on your interests.
                You can opt out of personalized ads via Google Ad Settings.
              </p>
              <p className="mt-1">
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Ad Settings
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">5. Disclaimer</h2>
              <p>The Tool is for educational simulation purposes only and does not constitute financial advice. Any investment decisions made based on simulation results are solely your own responsibility.</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-1">6. Contact</h2>
              <p>For inquiries regarding this Privacy Policy, please contact:</p>
              <p className="mt-1">
                <a href="mailto:saltomori0613@gmail.com" className="text-blue-600 hover:underline">
                  saltomori0613@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
