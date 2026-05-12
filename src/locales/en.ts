import { Locale } from './ja';

const en: Locale = {
  title: 'Asset Allocation Simulator',
  subtitle: 'Long-term simulation for wealth accumulation & decumulation',

  initialAssets: 'Current Assets',
  unit: '¥10k',
  flowType: 'Strategy',
  accumulate: 'Accumulate (Build Wealth)',
  withdraw: 'Decumulate (Draw Down)',
  monthlyAmount: 'Amount',
  annualLump: 'Annual Lump Sum',
  contributionMode: 'Contribution Timing',
  monthly: 'Monthly',
  annualLumpDesc: 'Annual lump sum at year start',

  allocation: 'Asset Allocation',
  total: 'Total',
  allocationWarning: 'Total must equal 100%',

  simSettings: 'Simulation Settings',
  simMode: 'Mode',
  backtest: 'Backtest (Historical)',
  montecarlo: 'Monte Carlo (Probabilistic)',
  years: 'Simulation Period',
  yearsUnit: 'years',
  backtestStartYear: 'Start Year',
  numSimulations: 'Simulations',
  currencyMode: 'Currency',
  jpyBase: 'JPY Based',
  localBase: 'Local Currency',
  rebalanceFreq: 'Rebalance Frequency',
  rebalanceOnce: 'Annually',
  rebalanceTwice: 'Semi-annually',
  rebalanceQuarterly: 'Quarterly',
  rebalanceBimonthly: 'Bi-monthly',
  rebalanceMonthly: 'Monthly',

  runSimulation: 'Run Simulation',
  calculating: 'Calculating...',

  basicSettings: 'Basic Settings',
  contributionAmount: 'Contribution Amount',
  withdrawalAmount: 'Withdrawal Amount',
  backtestRange: '({min}–{max})',
  emptyState: 'Set parameters on the left and click "Run Simulation"',

  results: 'Results',
  finalValue: 'Final Portfolio Value',
  finalValueLabel: 'Final',
  totalReturn: 'Total Return',
  cagr: 'CAGR',
  ruinProbability: 'Ruin Probability',
  p5: '5th Percentile (Pessimistic)',
  p25: '25th Percentile',
  p50: 'Median',
  p75: '75th Percentile',
  p95: '95th Percentile (Optimistic)',

  chartTitle: 'Portfolio Projection',
  xAxisLabel: 'Years Elapsed',
  yAxisLabel: 'Portfolio Value (¥10k)',
  principal: 'Principal',
  yearsElapsed: '{n} yrs elapsed',

  oku: 'B',
  senman: 'M',
  man: 'K',

  // Monte Carlo method
  mcMethod: 'Monte Carlo Method',
  bootstrapMethod: 'Historical Bootstrap (Recommended)',
  parametricMethod: 'Parametric (Normal Distribution)',

  // Method info section
  methodInfoTitle: 'About Calculation Methods',
  methodInfoToggle: 'Learn more',
  methodInfoClose: 'Close',

  backtestInfoTitle: 'Backtest',
  backtestInfoBody: 'Uses actual annual return data from 1990–2024 to replay portfolio performance year by year from the chosen start year. Real crashes like the 2000 dot-com bust and 2008 financial crisis are faithfully reflected. However, scenarios that have never occurred historically cannot be captured.',

  bootstrapInfoTitle: 'Historical Bootstrap (Recommended)',
  bootstrapInfoBody: 'Randomly resamples (with replacement) from 35 years of actual annual returns (1990–2024), one year at a time, to generate thousands of scenarios. Because no normal-distribution assumption is made, extreme crashes like 2008 (fat tails) appear naturally. Bundling all 12 months of a sampled year together also preserves real cross-asset correlations (e.g., years when stocks fell and bonds rose). 1,000 scenarios are generated and displayed as 5th–95th percentile bands.',

  parametricInfoTitle: 'Parametric (Normal Distribution)',
  parametricInfoBody: 'Computes a covariance matrix from each asset\'s expected return, volatility, and correlation coefficients, then uses Cholesky decomposition to generate correlated random variables. Monthly returns are assumed to follow a normal distribution, which produces stable results but tends to underestimate severe crash risk (fat tails) observed in real markets.',

  dataInfoTitle: 'About the Data',
  dataInfoBody: 'Return data used in this tool are approximations. S&P 500, NASDAQ 100, Japanese equities, and others are set as JPY-based total returns (dividends included, FX-adjusted) on an annual basis from 1990–2024. Figures may differ from actual fund or index performance. Please use this tool for educational purposes only.',

  disclaimer: '* For educational purposes only. Not financial advice. Past performance does not guarantee future results.',
};

export default en;
