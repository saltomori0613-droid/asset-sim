import type { Metadata } from 'next';
import ArticleShell from '@/components/site/ArticleShell';
import { getGuide } from '@/lib/guides';

const g = getGuide('nisa')!;

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: '/guide/nisa' },
};

export default function Page() {
  return (
    <ArticleShell
      slug="nisa"
      lead="2024年から始まった新NISAは、運用益が非課税になる強力な制度です。アセットアロケーションの観点から、限られた非課税枠をどう使うかを整理します。"
    >
      <h2>新NISAの基本</h2>
      <p>
        2024年にスタートした新NISAは、投資で得た利益（値上がり益・配当）にかかる
        約20%の税金が非課税になる制度です。主なポイントは次のとおりです。
      </p>
      <ul>
        <li><strong>つみたて投資枠</strong>：年間120万円まで。長期・積立向けの投資信託が対象</li>
        <li><strong>成長投資枠</strong>：年間240万円まで。投資信託に加え個別株・ETFなども対象</li>
        <li><strong>生涯の非課税限度額</strong>：合計1,800万円（うち成長投資枠は最大1,200万円）</li>
        <li><strong>非課税期間は無期限</strong>。売却すれば、その分の枠は翌年以降に復活する</li>
      </ul>

      <h2>アセットアロケーションの観点で考える</h2>
      <p>
        非課税のメリットを最大化するなら、「<strong>期待リターンが高く、長く持ち続ける資産</strong>」を
        優先してNISAに入れるのが基本です。利益が大きいほど、非課税で浮く税金も大きくなるからです。
        この観点では、長期で最も成長が期待できる株式（全世界株式やS&amp;P500のインデックスファンドなど）が
        NISAの主役になりやすいと言えます。
      </p>

      <h2>債券・金はNISAで持つべき？</h2>
      <p>
        債券や金など、期待リターンが株式より低めの資産は、非課税の恩恵も相対的に小さくなります。
        資産全体（NISA＋課税口座＋預金）でアセットアロケーションを考えたうえで、
        次のような整理が一案です。
      </p>
      <ul>
        <li><strong>NISA</strong>：値上がり益が大きい株式中心に</li>
        <li><strong>預金・課税口座</strong>：生活防衛資金や、安定資産（債券・現金）を中心に</li>
      </ul>
      <p>
        ただし、口座をまたいで管理するのが煩雑な場合は、
        NISAの中でバランスファンド（株式・債券などをまとめた商品）を持つのもシンプルで有効です。
        大切なのは口座単位ではなく、<strong>資産全体での配分</strong>がリスク許容度に合っていることです。
      </p>

      <h2>注意しておきたいこと</h2>
      <ul>
        <li><strong>損益通算ができない</strong>：NISA内の損失は、課税口座の利益と相殺できない</li>
        <li><strong>枠の復活は翌年</strong>：売ってもその年のうちに同じ枠は使えない</li>
        <li><strong>狼狽売りに注意</strong>：非課税でも、暴落で売ってしまえば意味がない。長期保有が前提</li>
      </ul>

      <h2>シミュレーターで「積立」を試す</h2>
      <p>
        本ツールの「積み立て（資産形成）」モードを使えば、毎月の積立額と資産配分を設定して、
        新NISAでコツコツ積み立てた場合の将来像をシミュレーションできます。
        全世界株式100%の場合と、債券・金を混ぜた場合とで、
        リターンと下落幅がどう変わるかを比べてみてください。
      </p>
      <p className="text-xs text-gray-400">
        ※制度の詳細は変更される場合があります。最新の内容は金融庁や金融機関の公式情報をご確認ください。本記事は税務・投資の助言ではありません。
      </p>
    </ArticleShell>
  );
}
