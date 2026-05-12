'use client';

import { useState } from 'react';
import { SimMode, MonteCarloMethod } from '@/lib/types';
import { Locale } from '@/locales/ja';

interface Props {
  t: Locale;
  simMode: SimMode;
  monteCarloMethod: MonteCarloMethod;
}

interface InfoBlockProps {
  title: string;
  body: string;
  accent?: boolean;
}

function InfoBlock({ title, body, accent }: InfoBlockProps) {
  return (
    <div className={`rounded-lg p-4 ${accent ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
      <h4 className={`text-sm font-semibold mb-1 ${accent ? 'text-blue-800' : 'text-gray-700'}`}>{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}

export default function MethodInfo({ t, simMode, monteCarloMethod }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-sm">{t.methodInfoTitle}</h2>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          {open ? t.methodInfoClose : t.methodInfoToggle}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          {simMode === 'backtest' && (
            <InfoBlock title={t.backtestInfoTitle} body={t.backtestInfoBody} />
          )}
          {simMode === 'montecarlo' && monteCarloMethod === 'bootstrap' && (
            <InfoBlock title={t.bootstrapInfoTitle} body={t.bootstrapInfoBody} accent />
          )}
          {simMode === 'montecarlo' && monteCarloMethod === 'parametric' && (
            <InfoBlock title={t.parametricInfoTitle} body={t.parametricInfoBody} />
          )}
          <InfoBlock title={t.dataInfoTitle} body={t.dataInfoBody} />
        </div>
      )}
    </section>
  );
}
