import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://asset-sim-beta.vercel.app";
const GA_ID = "G-0CQ4WTHVP3";

export const metadata: Metadata = {
  title: {
    default: "アセットアロケーション シミュレーター | Asset Allocation Simulator",
    template: "%s | アセットアロケーション シミュレーター",
  },
  description:
    "株・債券・金などの資産配分をシミュレーション。モンテカルロ法・バックテスト対応。資産形成・取り崩し両対応の無料ツール。",
  keywords: [
    "アセットアロケーション",
    "シミュレーター",
    "モンテカルロ",
    "バックテスト",
    "資産形成",
    "FIRE",
    "インデックス投資",
    "asset allocation simulator",
    "monte carlo simulation",
  ],
  authors: [{ name: "asset-sim" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "アセットアロケーション シミュレーター",
    title: "アセットアロケーション シミュレーター",
    description:
      "株・債券・金などの資産配分をシミュレーション。モンテカルロ法・バックテスト対応。資産形成・取り崩し両対応の無料ツール。",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "アセットアロケーション シミュレーター",
    description:
      "株・債券・金の資産配分をシミュレーション。モンテカルロ法・バックテスト対応。無料ツール。",
  },
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* Google AdSense（審査通過後にコメントアウトを外してpublisher IDを設定） */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className="min-h-full flex flex-col">
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
