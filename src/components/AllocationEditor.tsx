'use client';

import { useState } from 'react';
import { AssetAllocation, AssetId, AssetCategory } from '@/lib/types';
import { ASSETS, ASSET_CATEGORIES } from '@/lib/assetData';
import { Locale } from '@/locales/ja';

interface Props {
  allocation: AssetAllocation[];
  onChange: (allocation: AssetAllocation[]) => void;
  t: Locale;
  lang: 'ja' | 'en';
}

export default function AllocationEditor({ allocation, onChange, t, lang }: Props) {
  const [openCategories, setOpenCategories] = useState<Set<AssetCategory>>(new Set(['equity', 'bond', 'realAsset', 'cash']));

  const total = allocation.reduce((sum, a) => sum + a.weight, 0);
  const isValid = Math.abs(total - 100) < 0.01;

  const updateWeight = (id: AssetId, value: number) => {
    onChange(allocation.map(a => a.assetId === id ? { ...a, weight: Math.min(100, Math.max(0, value)) } : a));
  };

  const toggleAsset = (id: AssetId) => {
    if (allocation.find(a => a.assetId === id)) {
      onChange(allocation.filter(a => a.assetId !== id));
    } else {
      onChange([...allocation, { assetId: id, weight: 0 }]);
    }
  };

  const toggleCategory = (cat: AssetCategory) => {
    const next = new Set(openCategories);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    setOpenCategories(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{t.allocation}</label>
        <span className={`text-sm font-bold ${isValid ? 'text-green-600' : 'text-red-500'}`}>
          {t.total}: {total.toFixed(1)}%
        </span>
      </div>
      {!isValid && <p className="text-xs text-red-500">{t.allocationWarning}</p>}

      {ASSET_CATEGORIES.map(cat => {
        const catAssets = ASSETS.filter(a => a.category === cat.id);
        const isOpen = openCategories.has(cat.id);

        return (
          <div key={cat.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700"
            >
              <span>{lang === 'en' ? cat.labelEn : cat.labelJa}</span>
              <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className="px-3 py-2 space-y-2">
                {catAssets.map(asset => {
                  const alloc = allocation.find(a => a.assetId === asset.id);
                  const checked = !!alloc;
                  const weight = alloc?.weight ?? 0;

                  return (
                    <div key={asset.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAsset(asset.id)}
                        className="w-4 h-4 rounded flex-shrink-0"
                      />
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: asset.color }} />
                      <span className="text-xs w-24 flex-shrink-0 truncate">
                        {lang === 'en' ? asset.labelEn : asset.labelJa}
                      </span>
                      <input
                        type="range"
                        min={0} max={100} step={1}
                        value={weight}
                        disabled={!checked}
                        onChange={e => updateWeight(asset.id, Number(e.target.value))}
                        className="flex-1 h-2 accent-blue-600 disabled:opacity-30"
                      />
                      <div className="flex items-center gap-1 w-16 flex-shrink-0">
                        <input
                          type="number"
                          min={0} max={100} step={1}
                          value={weight}
                          disabled={!checked}
                          onChange={e => updateWeight(asset.id, Number(e.target.value))}
                          className="w-11 text-right border rounded px-1 py-0.5 text-xs disabled:opacity-30"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
