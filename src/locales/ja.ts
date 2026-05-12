const ja = {
  title: 'アセットアロケーション シミュレーター',
  subtitle: '資産形成・取り崩しの長期シミュレーション',

  // 入力セクション
  initialAssets: '現在の資産',
  unit: '万円',
  flowType: '運用方法',
  accumulate: '積み立て（資産形成）',
  withdraw: '取り崩し（資産活用）',
  monthlyAmount: '月額',
  annualLump: '年初一括',
  contributionMode: '投資タイミング',
  monthly: '毎月',
  annualLumpDesc: '年初一括投資',

  // 資産配分
  allocation: '資産配分',
  total: '合計',
  allocationWarning: '合計が100%になるよう設定してください',

  // シミュレーション設定
  simSettings: 'シミュレーション設定',
  simMode: 'モード',
  backtest: 'バックテスト（過去実績）',
  montecarlo: '将来予測（モンテカルロ）',
  years: 'シミュレーション期間',
  yearsUnit: '年',
  backtestStartYear: '開始年',
  numSimulations: 'シミュレーション回数',
  currencyMode: '通貨表示',
  jpyBase: '円ベース',
  localBase: '現地通貨ベース',
  rebalanceFreq: 'リバランス頻度',
  rebalanceOnce: '年1回',
  rebalanceTwice: '年2回',
  rebalanceQuarterly: '年4回（四半期）',
  rebalanceBimonthly: '年6回（隔月）',
  rebalanceMonthly: '毎月',

  // ボタン
  runSimulation: 'シミュレーション実行',
  calculating: '計算中...',

  // 基本設定ラベル
  basicSettings: '基本設定',
  contributionAmount: '積立額',
  withdrawalAmount: '取り崩し額',
  backtestRange: '（{min}〜{max}年）',
  emptyState: '左の設定を入力して「シミュレーション実行」を押してください',

  // 結果
  results: '結果',
  finalValue: '最終資産額',
  finalValueLabel: '最終',
  totalReturn: '累計リターン',
  cagr: '年平均成長率（CAGR）',
  ruinProbability: '資産枯渇確率',
  p5: '5パーセンタイル（悲観）',
  p25: '25パーセンタイル',
  p50: '中央値',
  p75: '75パーセンタイル',
  p95: '95パーセンタイル（楽観）',

  // グラフ
  chartTitle: '資産推移',
  xAxisLabel: '経過年数',
  yAxisLabel: '資産額（万円）',
  principal: '元本',
  yearsElapsed: '{n}年経過',

  // 単位
  oku: '億',
  senman: '千万',
  man: '万',

  // モンテカルロ手法
  mcMethod: 'モンテカルロ手法',
  bootstrapMethod: 'ヒストリカルブートストラップ（推奨）',
  parametricMethod: 'パラメトリック（正規分布仮定）',

  // 計算方法の説明
  methodInfoTitle: '計算方法について',
  methodInfoToggle: '詳しく見る',
  methodInfoClose: '閉じる',

  backtestInfoTitle: 'バックテスト',
  backtestInfoBody: '1990〜2024年の実際の年次リターンデータを使い、指定した開始年から順番にポートフォリオを再現します。過去の相場を忠実になぞるため、2000年のITバブル崩壊・2008年のリーマンショックなど実際の暴落が反映されます。ただし、過去に起きていないシナリオは考慮できません。',

  bootstrapInfoTitle: 'ヒストリカルブートストラップ（推奨）',
  bootstrapInfoBody: '1990〜2024年の35年分の実績年次リターンから、1年単位でランダムに抽出（復元抽出）してシナリオを生成します。正規分布を仮定しないため、リーマンショックのような大暴落（ファットテール）が自然に含まれます。また、同じ年のデータをまとめて使うことで資産間の相関構造（株が下がった年は債券が上がる、など）も実績に基づいて反映されます。1000通りのシナリオを生成し、5〜95パーセンタイルで分布を示します。',

  parametricInfoTitle: 'パラメトリック（正規分布仮定）',
  parametricInfoBody: '各資産の期待リターン・標準偏差・相関係数から共分散行列を計算し、コレスキー分解を使って相関を持つ乱数を生成します。毎月の価格変動が正規分布に従うと仮定するため、計算が安定していますが、現実の市場で観察されるような急激な暴落（ファットテール）を過小評価する傾向があります。',

  dataInfoTitle: 'データについて',
  dataInfoBody: '使用しているリターンデータは概算値です。SP500・NASDAQ100・日本株などは円ベースのトータルリターン（配当込み、為替変動込み）を1990〜2024年の年次で設定しています。実際のファンドや指数とは差異がある場合があります。あくまで教育目的のシミュレーションとしてご利用ください。',

  // 注意書き
  disclaimer: '※本ツールは教育目的のシミュレーションです。投資助言ではありません。過去の実績は将来を保証するものではありません。',
};

export default ja;
export type Locale = typeof ja;
