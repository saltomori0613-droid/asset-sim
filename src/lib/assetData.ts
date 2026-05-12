import { AssetId, AssetCategory } from './types';

export interface AssetMeta {
  id: AssetId;
  category: AssetCategory;
  labelJa: string;
  labelEn: string;
  color: string;
  meanReturn: number;   // 年率期待リターン（小数）
  stdDev: number;       // 年率標準偏差
}

export const ASSETS: AssetMeta[] = [
  // ===== 株式インデックス =====
  { id: 'sp500',        category: 'equity',    labelJa: 'S&P 500',       labelEn: 'S&P 500',         color: '#2563eb', meanReturn: 0.085, stdDev: 0.19 },
  { id: 'nasdaq100',    category: 'equity',    labelJa: 'NASDAQ 100',    labelEn: 'NASDAQ 100',      color: '#7c3aed', meanReturn: 0.120, stdDev: 0.28 },
  { id: 'globalStocks', category: 'equity',    labelJa: '先進国株式',    labelEn: 'Developed Mkts',  color: '#0891b2', meanReturn: 0.075, stdDev: 0.18 },
  { id: 'allWorld',     category: 'equity',    labelJa: '全世界株式',    labelEn: 'All World',       color: '#0d9488', meanReturn: 0.070, stdDev: 0.17 },
  { id: 'emerging',     category: 'equity',    labelJa: '新興国株式',    labelEn: 'Emerging Mkts',   color: '#059669', meanReturn: 0.065, stdDev: 0.25 },
  { id: 'nk225',        category: 'equity',    labelJa: '日経225',       labelEn: 'Nikkei 225',      color: '#dc2626', meanReturn: 0.055, stdDev: 0.22 },
  { id: 'topix',        category: 'equity',    labelJa: 'TOPIX',         labelEn: 'TOPIX',           color: '#ea580c', meanReturn: 0.050, stdDev: 0.20 },
  // ===== 債券 =====
  { id: 'jpBonds',      category: 'bond',      labelJa: '日本国債',      labelEn: 'Japan Bonds',     color: '#65a30d', meanReturn: 0.008, stdDev: 0.03 },
  { id: 'usBonds',      category: 'bond',      labelJa: '米国債',        labelEn: 'US Bonds',        color: '#d97706', meanReturn: 0.025, stdDev: 0.08 },
  // ===== コモディティ・実物資産 =====
  { id: 'gold',         category: 'realAsset', labelJa: '金',            labelEn: 'Gold',            color: '#ca8a04', meanReturn: 0.050, stdDev: 0.15 },
  { id: 'jreit',        category: 'realAsset', labelJa: 'J-REIT',        labelEn: 'J-REIT',          color: '#be185d', meanReturn: 0.040, stdDev: 0.20 },
  { id: 'usreit',       category: 'realAsset', labelJa: '米国REIT',      labelEn: 'US REIT',         color: '#9333ea', meanReturn: 0.065, stdDev: 0.22 },
  // ===== キャッシュ =====
  { id: 'jpyCash',      category: 'cash',      labelJa: '円キャッシュ',  labelEn: 'JPY Cash',        color: '#475569', meanReturn: 0.001, stdDev: 0.005 },
  { id: 'usdCash',      category: 'cash',      labelJa: 'ドルキャッシュ', labelEn: 'USD Cash',       color: '#0f766e', meanReturn: 0.020, stdDev: 0.08 },
];

export const ASSET_MAP = Object.fromEntries(ASSETS.map(a => [a.id, a])) as Record<AssetId, AssetMeta>;

export const ASSET_CATEGORIES: { id: AssetCategory; labelJa: string; labelEn: string }[] = [
  { id: 'equity',    labelJa: '株式',       labelEn: 'Equities' },
  { id: 'bond',      labelJa: '債券',       labelEn: 'Bonds' },
  { id: 'realAsset', labelJa: 'コモディティ・REIT', labelEn: 'Commodities & REIT' },
  { id: 'cash',      labelJa: 'キャッシュ', labelEn: 'Cash' },
];

// 相関行列（ASSETSの順番通り: sp500,nasdaq100,globalStocks,allWorld,emerging,nk225,topix,jpBonds,usBonds,gold,jreit,usreit,jpyCash,usdCash）
export const CORRELATION_MATRIX: number[][] = [
  //sp500 nasd  glob  allW  emrg  nk225 topix jpBnd usBnd gold  jreit usrei jpyCsh usdCsh
  [ 1.00, 0.90, 0.90, 0.88, 0.65, 0.55, 0.55,-0.10,-0.15, 0.05, 0.60, 0.65, 0.00, 0.05 ], // sp500
  [ 0.90, 1.00, 0.82, 0.80, 0.60, 0.50, 0.50,-0.08,-0.12, 0.02, 0.55, 0.60, 0.00, 0.05 ], // nasdaq100
  [ 0.90, 0.82, 1.00, 0.98, 0.75, 0.60, 0.60,-0.08,-0.12, 0.05, 0.60, 0.65, 0.00, 0.05 ], // globalStocks
  [ 0.88, 0.80, 0.98, 1.00, 0.80, 0.60, 0.60,-0.08,-0.12, 0.05, 0.60, 0.65, 0.00, 0.05 ], // allWorld
  [ 0.65, 0.60, 0.75, 0.80, 1.00, 0.45, 0.45,-0.05,-0.10, 0.10, 0.45, 0.50, 0.00, 0.05 ], // emerging
  [ 0.55, 0.50, 0.60, 0.60, 0.45, 1.00, 0.95,-0.10,-0.08, 0.08, 0.50, 0.45, 0.00, 0.05 ], // nk225
  [ 0.55, 0.50, 0.60, 0.60, 0.45, 0.95, 1.00,-0.10,-0.08, 0.08, 0.50, 0.45, 0.00, 0.05 ], // topix
  [-0.10,-0.08,-0.08,-0.08,-0.05,-0.10,-0.10, 1.00, 0.50, 0.00, 0.10, 0.00, 0.05, 0.00 ], // jpBonds
  [-0.15,-0.12,-0.12,-0.12,-0.10,-0.08,-0.08, 0.50, 1.00, 0.05, 0.05, 0.10, 0.00, 0.05 ], // usBonds
  [ 0.05, 0.02, 0.05, 0.05, 0.10, 0.08, 0.08, 0.00, 0.05, 1.00, 0.05, 0.05, 0.00, 0.05 ], // gold
  [ 0.60, 0.55, 0.60, 0.60, 0.45, 0.50, 0.50, 0.10, 0.05, 0.05, 1.00, 0.55, 0.05, 0.00 ], // jreit
  [ 0.65, 0.60, 0.65, 0.65, 0.50, 0.45, 0.45, 0.00, 0.10, 0.05, 0.55, 1.00, 0.00, 0.05 ], // usreit
  [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.05, 0.00, 0.00, 0.05, 0.00, 1.00, 0.00 ], // jpyCash
  [ 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.00, 0.05, 0.05, 0.00, 0.05, 0.00, 1.00 ], // usdCash
];

// バックテスト用：円建て年次リターン（1990〜2024）
// 注: 外国資産はJPYベース（為替変動含む）の近似値。教育目的の概算。
export type YearlyReturns = Record<AssetId, number>;

export const HISTORICAL_RETURNS: Record<number, YearlyReturns> = {
  //         sp500   nasd    glob    allW    emrg    nk225   topix   jpBnd   usBnd   gold    jreit   usreit  jpyCsh  usdCsh
  1990: { sp500:-0.14, nasdaq100:-0.14, globalStocks:-0.15, allWorld:-0.16, emerging:-0.15, nk225:-0.39, topix:-0.38, jpBonds: 0.07, usBonds: 0.10, gold:-0.02, jreit:-0.08, usreit:-0.22, jpyCash:0.006, usdCash:-0.08 },
  1991: { sp500: 0.24, nasdaq100: 0.46, globalStocks: 0.15, allWorld: 0.13, emerging: 0.50, nk225:-0.04, topix:-0.03, jpBonds: 0.06, usBonds: 0.14, gold:-0.08, jreit:-0.05, usreit: 0.27, jpyCash:0.005, usdCash:-0.10 },
  1992: { sp500: 0.01, nasdaq100: 0.18, globalStocks:-0.05, allWorld:-0.05, emerging: 0.05, nk225:-0.26, topix:-0.26, jpBonds: 0.06, usBonds: 0.12, gold:-0.06, jreit:-0.03, usreit: 0.25, jpyCash:0.004, usdCash:-0.18 },
  1993: { sp500: 0.21, nasdaq100: 0.00, globalStocks: 0.20, allWorld: 0.20, emerging: 0.70, nk225: 0.09, topix: 0.10, jpBonds: 0.07, usBonds: 0.19, gold: 0.18, jreit: 0.05, usreit: 0.04, jpyCash:0.002, usdCash: 0.16 },
  1994: { sp500: 0.07, nasdaq100:-0.17, globalStocks: 0.05, allWorld: 0.04, emerging:-0.15, nk225: 0.13, topix: 0.13, jpBonds: 0.05, usBonds:-0.02, gold:-0.02, jreit: 0.02, usreit:-0.08, jpyCash:0.002, usdCash:-0.06 },
  1995: { sp500: 0.51, nasdaq100: 0.49, globalStocks: 0.20, allWorld: 0.18, emerging:-0.05, nk225:-0.01, topix: 0.00, jpBonds: 0.13, usBonds: 0.27, gold: 0.01, jreit: 0.02, usreit: 0.22, jpyCash:0.001, usdCash: 0.12 },
  1996: { sp500: 0.34, nasdaq100: 0.59, globalStocks: 0.15, allWorld: 0.14, emerging: 0.05, nk225:-0.02, topix:-0.02, jpBonds: 0.04, usBonds: 0.08, gold:-0.05, jreit: 0.05, usreit: 0.50, jpyCash:0.001, usdCash: 0.12 },
  1997: { sp500: 0.54, nasdaq100: 0.37, globalStocks: 0.25, allWorld: 0.22, emerging:-0.25, nk225:-0.21, topix:-0.24, jpBonds: 0.05, usBonds: 0.17, gold:-0.22, jreit: 0.03, usreit: 0.36, jpyCash:0.001, usdCash: 0.14 },
  1998: { sp500: 0.26, nasdaq100: 0.63, globalStocks: 0.15, allWorld: 0.12, emerging:-0.30, nk225:-0.09, topix:-0.07, jpBonds: 0.12, usBonds: 0.18, gold:-0.01, jreit:-0.05, usreit:-0.27, jpyCash:0.001, usdCash:-0.07 },
  1999: { sp500: 0.11, nasdaq100: 0.80, globalStocks: 0.25, allWorld: 0.27, emerging: 0.60, nk225: 0.37, topix: 0.59, jpBonds: 0.02, usBonds:-0.04, gold: 0.01, jreit: 0.05, usreit:-0.15, jpyCash:0.001, usdCash:-0.10 },
  2000: { sp500:-0.12, nasdaq100:-0.29, globalStocks:-0.12, allWorld:-0.15, emerging:-0.30, nk225:-0.27, topix:-0.26, jpBonds: 0.03, usBonds: 0.08, gold:-0.06, jreit: 0.08, usreit: 0.42, jpyCash:0.001, usdCash: 0.07 },
  2001: { sp500:-0.19, nasdaq100:-0.23, globalStocks:-0.17, allWorld:-0.17, emerging:-0.05, nk225:-0.24, topix:-0.20, jpBonds: 0.04, usBonds: 0.10, gold: 0.02, jreit:-0.05, usreit: 0.31, jpyCash:0.001, usdCash:-0.10 },
  2002: { sp500:-0.32, nasdaq100:-0.43, globalStocks:-0.28, allWorld:-0.28, emerging:-0.10, nk225:-0.19, topix:-0.18, jpBonds: 0.04, usBonds: 0.14, gold: 0.25, jreit: 0.30, usreit:-0.05, jpyCash:0.001, usdCash:-0.12 },
  2003: { sp500: 0.20, nasdaq100: 0.35, globalStocks: 0.30, allWorld: 0.31, emerging: 0.50, nk225: 0.24, topix: 0.24, jpBonds: 0.01, usBonds: 0.02, gold: 0.20, jreit: 0.40, usreit: 0.24, jpyCash:0.001, usdCash:-0.11 },
  2004: { sp500: 0.07, nasdaq100: 0.07, globalStocks: 0.12, allWorld: 0.13, emerging: 0.25, nk225: 0.07, topix: 0.10, jpBonds: 0.01, usBonds: 0.03, gold: 0.06, jreit: 0.30, usreit: 0.25, jpyCash:0.001, usdCash:-0.04 },
  2005: { sp500: 0.08, nasdaq100: 0.17, globalStocks: 0.20, allWorld: 0.22, emerging: 0.35, nk225: 0.40, topix: 0.43, jpBonds: 0.00, usBonds:-0.01, gold: 0.10, jreit: 0.70, usreit: 0.29, jpyCash:0.001, usdCash: 0.14 },
  2006: { sp500: 0.19, nasdaq100: 0.07, globalStocks: 0.20, allWorld: 0.21, emerging: 0.35, nk225: 0.06, topix: 0.03, jpBonds: 0.00, usBonds:-0.02, gold: 0.23, jreit: 0.30, usreit: 0.35, jpyCash:0.001, usdCash: 0.01 },
  2007: { sp500:-0.10, nasdaq100: 0.13, globalStocks: 0.05, allWorld: 0.04, emerging: 0.25, nk225:-0.11, topix:-0.12, jpBonds: 0.02, usBonds: 0.07, gold: 0.31, jreit:-0.20, usreit:-0.21, jpyCash:0.001, usdCash:-0.07 },
  2008: { sp500:-0.44, nasdaq100:-0.54, globalStocks:-0.42, allWorld:-0.43, emerging:-0.55, nk225:-0.42, topix:-0.42, jpBonds: 0.05, usBonds: 0.01, gold: 0.01, jreit:-0.50, usreit:-0.50, jpyCash:0.001, usdCash:-0.19 },
  2009: { sp500: 0.18, nasdaq100: 0.58, globalStocks: 0.25, allWorld: 0.27, emerging: 0.75, nk225: 0.19, topix: 0.07, jpBonds: 0.01, usBonds: 0.04, gold: 0.24, jreit: 0.80, usreit: 0.31, jpyCash:0.001, usdCash:-0.03 },
  2010: { sp500: 0.05, nasdaq100: 0.07, globalStocks: 0.08, allWorld: 0.09, emerging: 0.25, nk225: 0.03, topix: 0.01, jpBonds: 0.02, usBonds: 0.07, gold: 0.13, jreit: 0.15, usreit: 0.14, jpyCash:0.001, usdCash:-0.13 },
  2011: { sp500:-0.08, nasdaq100:-0.03, globalStocks:-0.10, allWorld:-0.10, emerging:-0.15, nk225:-0.17, topix:-0.18, jpBonds: 0.03, usBonds: 0.17, gold: 0.10, jreit:-0.10, usreit: 0.02, jpyCash:0.001, usdCash:-0.08 },
  2012: { sp500: 0.28, nasdaq100: 0.30, globalStocks: 0.25, allWorld: 0.23, emerging: 0.18, nk225: 0.23, topix: 0.20, jpBonds: 0.02, usBonds: 0.07, gold: 0.02, jreit: 0.40, usreit: 0.31, jpyCash:0.001, usdCash: 0.13 },
  2013: { sp500: 0.55, nasdaq100: 0.67, globalStocks: 0.50, allWorld: 0.47, emerging: 0.05, nk225: 0.57, topix: 0.52, jpBonds: 0.01, usBonds:-0.09, gold:-0.16, jreit: 0.55, usreit: 0.26, jpyCash:0.001, usdCash: 0.21 },
  2014: { sp500: 0.27, nasdaq100: 0.36, globalStocks: 0.20, allWorld: 0.18, emerging: 0.03, nk225: 0.07, topix: 0.08, jpBonds: 0.02, usBonds: 0.13, gold:-0.04, jreit: 0.30, usreit: 0.46, jpyCash:0.001, usdCash: 0.14 },
  2015: { sp500: 0.02, nasdaq100: 0.09, globalStocks: 0.05, allWorld: 0.04, emerging:-0.15, nk225: 0.09, topix: 0.10, jpBonds: 0.01, usBonds:-0.02, gold:-0.12, jreit:-0.10, usreit: 0.02, jpyCash:0.001, usdCash: 0.00 },
  2016: { sp500: 0.19, nasdaq100: 0.05, globalStocks: 0.08, allWorld: 0.08, emerging: 0.10, nk225: 0.00, topix: 0.00, jpBonds: 0.01, usBonds: 0.01, gold: 0.10, jreit: 0.10, usreit: 0.06, jpyCash:0.001, usdCash: 0.03 },
  2017: { sp500: 0.15, nasdaq100: 0.28, globalStocks: 0.15, allWorld: 0.17, emerging: 0.35, nk225: 0.19, topix: 0.22, jpBonds: 0.01, usBonds:-0.01, gold: 0.06, jreit: 0.10, usreit: 0.05, jpyCash:0.001, usdCash:-0.04 },
  2018: { sp500:-0.08, nasdaq100:-0.04, globalStocks:-0.10, allWorld:-0.10, emerging:-0.15, nk225:-0.12, topix:-0.18, jpBonds: 0.01, usBonds:-0.02, gold:-0.04, jreit:-0.10, usreit:-0.08, jpyCash:0.001, usdCash: 0.03 },
  2019: { sp500: 0.39, nasdaq100: 0.38, globalStocks: 0.30, allWorld: 0.28, emerging: 0.15, nk225: 0.18, topix: 0.15, jpBonds: 0.01, usBonds: 0.09, gold: 0.19, jreit: 0.20, usreit: 0.27, jpyCash:0.001, usdCash:-0.01 },
  2020: { sp500: 0.20, nasdaq100: 0.40, globalStocks: 0.15, allWorld: 0.14, emerging: 0.20, nk225: 0.16, topix: 0.07, jpBonds: 0.01, usBonds: 0.10, gold: 0.25, jreit:-0.25, usreit:-0.11, jpyCash:0.001, usdCash:-0.05 },
  2021: { sp500: 0.43, nasdaq100: 0.42, globalStocks: 0.38, allWorld: 0.35, emerging: 0.02, nk225: 0.05, topix: 0.10, jpBonds: 0.00, usBonds:-0.04, gold:-0.07, jreit: 0.15, usreit: 0.58, jpyCash:0.001, usdCash: 0.12 },
  2022: { sp500:-0.08, nasdaq100:-0.23, globalStocks:-0.15, allWorld:-0.16, emerging:-0.20, nk225:-0.09, topix:-0.05, jpBonds:-0.01, usBonds:-0.12, gold: 0.07, jreit:-0.15, usreit:-0.14, jpyCash:0.001, usdCash: 0.15 },
  2023: { sp500: 0.43, nasdaq100: 0.66, globalStocks: 0.35, allWorld: 0.33, emerging: 0.15, nk225: 0.28, topix: 0.25, jpBonds: 0.00, usBonds: 0.04, gold: 0.22, jreit: 0.10, usreit: 0.20, jpyCash:0.001, usdCash: 0.03 },
  2024: { sp500: 0.30, nasdaq100: 0.38, globalStocks: 0.25, allWorld: 0.23, emerging: 0.05, nk225: 0.20, topix: 0.15, jpBonds: 0.00, usBonds: 0.01, gold: 0.36, jreit:-0.05, usreit: 0.16, jpyCash:0.002, usdCash:-0.02 },
};

export const BACKTEST_MIN_YEAR = 1990;
export const BACKTEST_MAX_YEAR = 2024;
