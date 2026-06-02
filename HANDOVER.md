# 引き継ぎ書（asset-sim / アセットアロケーション シミュレーター）

> 他のAIエージェント／開発者がこのリポジトリで作業する際は、まずこの文書を読むこと。

## プロジェクト概要
- 株・債券・金・REITなど**14資産**の配分を、**モンテカルロ法／バックテスト**でシミュレートする日英対応の無料Webツール。
- 本番URL: https://asset-sim-beta.vercel.app
- リポジトリ: https://github.com/saltomori0613-droid/asset-sim （public, `main`ブランチ）
- デプロイ: **`main` へ push すると Vercel が自動デプロイ**。push の認証は Git Credential Manager（初回はブラウザでGitHubログイン）。

## ⚠️ 最重要: スタックの注意
- **Next.js 16系（Turbopack, App Router）**。訓練データのNext.jsとAPI/規約が異なる場合がある。コードを書く前に `node_modules/next/dist/docs/` の該当ガイドを確認すること（`AGENTS.md` 参照）。
- React 19 / recharts 3 / **Tailwind CSS v4**（`globals.css` の `@import "tailwindcss"` ＋ `postcss.config.mjs` の `@tailwindcss/postcss`。`tailwind.config` は無し＝v4の自動コンテンツ検出）/ ESLint flat config（`eslint.config.mjs`）。
- `next-intl` は `package.json` に**入っているが未配線（未使用）**。i18nは下記の自前方式。**中途半端にnext-intlを導入し直さないこと。**

## 構成・主要ファイル
- `src/app/` … App Router
  - `page.tsx` … ツール本体（クライアントコンポーネント、状態管理＋シミュレーション実行）
  - `layout.tsx` … メタデータ／Google AdSense／GAタグ
  - `guide/page.tsx` … 入門ガイドのハブ（記事一覧）、`guide/<slug>/page.tsx` … 各記事
  - `about/` `terms/`（免責・利用規約）`contact/`（問い合わせ）`privacy/`
  - `robots.ts` / `sitemap.ts`（`sitemap`は`lib/guides.ts`から自動生成）
- `src/components/`
  - `AllocationEditor` / `SimulationChart`（recharts）/ `MethodInfo`
  - `HomeContent` … トップ下部の解説・使い方・FAQ（FAQPage構造化データ含む）
  - `site/` … `ContentHeader` `SiteFooter` `ArticleShell`（コンテンツページ共通レイアウト）
- `src/lib/`
  - `simulation.ts` … 計算ロジック（バックテスト／ヒストリカルブートストラップMC／パラメトリックMC＝Cholesky分解＋Box-Muller）
  - `assetData.ts` … 14資産のメタ・相関行列・1990〜2024年の実績リターン
  - `types.ts` / `guides.ts`（ガイド記事メタの一元管理）
- `src/locales/` … `ja.ts`（型`Locale`の定義元）/ `en.ts`
- `public/ads.txt` … AdSense

## i18n（自前方式）
- `page.tsx` が `lang` を `useState<'ja'|'en'>` で保持し、`ja`/`en` オブジェクトを切替。型は `Locale = typeof ja`。
- 文言追加時は **`ja.ts` にキー追加 → `en.ts` にも同キー追加**（型エラーで漏れを検知）。
- `/guide` 配下の記事・`terms`・`contact` は**日本語のみ**（既存方針に合わせる）。

## ガイド記事の追加手順
1. `src/lib/guides.ts` の `GUIDES` 配列に `{ slug, title, description, emoji }` を追加。
2. `src/app/guide/<slug>/page.tsx` を作成し、`ArticleShell`（`slug`, `lead`）でラップ。本文は `.article-body` 配下にセマンティックHTML（`h2/h3/p/ul/ol/table` など）で記述すれば、`globals.css` の `@layer components` のproseスタイルで自動整形される。各要素にTailwindクラスを付ければそちらが優先。
3. sitemap・ハブ一覧・関連記事リンクは `guides.ts` から自動反映されるので追記不要。

## 開発・ビルド・デプロイ
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド検証（全ページ静的生成・型/lintチェック込み）
```
- `main` への push で Vercel 本番デプロイ。デプロイ反映は数分。

## ハマりどころ・運用上の注意
- 過去に `C:\VScode\asset-sim` 等の**古いローカルコピー**（Next15・設定ファイル欠落・git未接続）が並存し混乱を招いた。**このgit接続済みリポジトリが唯一の正本**。古いコピーからpushしないこと。
- Windows環境のため改行コードはCRLF（`core.autocrlf=true` で正規化）。
- 本ツールは**教育目的**。投資助言ではない旨の免責表示を各ページ・フッターに維持すること。
- Google AdSense審査対応中。トップやガイドの**文章コンテンツの質・量**が審査に影響するため、薄いページの量産ではなくオリジナルで有用な記事を心がける。

## 直近の作業履歴
- 2026-06: AdSense「有用性の低いコンテンツ」対策。トップに解説/使い方/FAQ（構造化データ）、入門ガイドのハブ化＋記事6本（入門/資産クラス/年代別/新NISA/リバランス/FIRE・4%ルール）、`terms`・`contact` 新設、`robots.ts`・`sitemap`全ページ化・`ads.txt` 追加、全ページ共通ヘッダー/フッターで内部リンク整備（commit `debb6b6`）。
