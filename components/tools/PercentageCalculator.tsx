'use client';

import React, { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

type PctMode = 'percentOf' | 'whatPercent' | 'change' | 'addSubtract';

export function PercentageCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [mode, setMode] = useState<PctMode>('percentOf');
  const [valA, setValA] = useState(20);
  const [valB, setValB] = useState(500);
  const [op, setOp] = useState<'add' | 'sub'>('sub');

  const tabs: Array<{ id: PctMode; labelAr: string; labelEn: string }> = [
    { id: 'percentOf', labelAr: 'X% من Y', labelEn: 'X% of Y' },
    { id: 'whatPercent', labelAr: 'X كم % من Y', labelEn: 'X is what % of Y' },
    { id: 'change', labelAr: 'نسبة الزيادة / النقص', labelEn: '% Change' },
    { id: 'addSubtract', labelAr: 'إضافة / خصم %', labelEn: 'Add / Subtract %' },
  ];

  const calc = useMemo(() => {
    if (mode === 'percentOf') {
      const res = (valA / 100) * valB;
      const pct = Math.min(100, Math.max(0, valA));
      return {
        primary: res,
        suffix: '',
        donutPct: pct,
        steps: isAr
          ? `(${formatNumber(valA)} ÷ 100) × ${formatNumber(valB)} = ${formatNumber(
              Number(res.toFixed(4))
            )}`
          : `(${valA} ÷ 100) × ${valB} = ${Number(res.toFixed(4))}`,
      };
    }

    if (mode === 'whatPercent') {
      if (valB === 0) {
        return {
          error: isAr ? 'لا يمكن القسمة على صفر' : 'Cannot divide by zero',
        };
      }
      const res = (valA / valB) * 100;
      return {
        primary: res,
        suffix: '%',
        donutPct: Math.min(100, Math.max(0, res)),
        steps: isAr
          ? `(${formatNumber(valA)} ÷ ${formatNumber(valB)}) × 100 = ${formatNumber(
              Number(res.toFixed(2))
            )}%`
          : `(${valA} ÷ ${valB}) × 100 = ${Number(res.toFixed(2))}%`,
      };
    }

    if (mode === 'change') {
      if (valA === 0) {
        return {
          error: isAr ? 'القيمة الابتدائية لا يمكن أن تكون صفراً' : 'Initial value cannot be zero',
        };
      }
      const diff = valB - valA;
      const pct = (diff / valA) * 100;
      return {
        primary: pct,
        suffix: '%',
        donutPct: Math.min(100, Math.abs(pct)),
        steps: isAr
          ? `((${formatNumber(valB)} - ${formatNumber(valA)}) ÷ ${formatNumber(
              valA
            )}) × 100 = ${formatNumber(Number(pct.toFixed(2)))}%`
          : `((${valB} - ${valA}) ÷ ${valA}) × 100 = ${Number(pct.toFixed(2))}%`,
      };
    }

    const delta = valA * (valB / 100);
    const finalVal = op === 'add' ? valA + delta : valA - delta;
    return {
      primary: finalVal,
      suffix: '',
      donutPct: Math.min(100, Math.max(0, valB)),
      steps:
        op === 'add'
          ? `${formatNumber(valA)} + (${formatNumber(valA)} × ${formatNumber(valB)}%) = ${formatNumber(
              Number(finalVal.toFixed(2))
            )}`
          : `${formatNumber(valA)} - (${formatNumber(valA)} × ${formatNumber(valB)}%) = ${formatNumber(
              Number(finalVal.toFixed(2))
            )}`,
    };
  }, [mode, valA, valB, op, isAr, formatNumber]);

  const circumference = 2 * Math.PI * 52;
  const donutPct = 'donutPct' in calc && typeof calc.donutPct === 'number' ? calc.donutPct : 0;
  const strokeOffset = circumference - (donutPct / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              mode === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isAr ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Inputs + Donut Output */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-4">
          {mode === 'addSubtract' && (
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06]">
              <button
                type="button"
                onClick={() => setOp('sub')}
                className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                  op === 'sub' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {isAr ? 'خصم (-)' : 'Discount (-)'}
              </button>
              <button
                type="button"
                onClick={() => setOp('add')}
                className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                  op === 'add' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {isAr ? 'إضافة (+)' : 'Markup (+)'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {mode === 'percentOf'
                  ? isAr
                    ? 'النسبة المئوية (%)'
                    : 'Percentage (%)'
                  : mode === 'whatPercent'
                  ? isAr
                    ? 'القيمة الجزئية (X)'
                    : 'Part Value (X)'
                  : mode === 'change'
                  ? isAr
                    ? 'القيمة القديمة'
                    : 'Initial Value'
                  : isAr
                  ? 'المبلغ الأصلي'
                  : 'Original Amount'}
              </label>
              <input
                type="number"
                step="any"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-base font-tabular text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {mode === 'percentOf'
                  ? isAr
                    ? 'من المبلغ / الرقم (Y)'
                    : 'Of Total (Y)'
                  : mode === 'whatPercent'
                  ? isAr
                    ? 'من الإجمالي (Y)'
                    : 'Of Whole (Y)'
                  : mode === 'change'
                  ? isAr
                    ? 'القيمة الجديدة'
                    : 'New Value'
                  : isAr
                  ? 'النسبة المئوية (%)'
                  : 'Percentage (%)'}
              </label>
              <input
                type="number"
                step="any"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-base font-tabular text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {'steps' in calc && (
            <div className="rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 p-3.5">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {isAr ? 'طريقة الحل:' : 'Step-by-step Formula:'}
              </p>
              <p className="text-sm font-mono-tabular text-slate-800 dark:text-slate-200" dir="ltr">
                {calc.steps}
              </p>
            </div>
          )}
        </div>

        {/* SVG Donut Result */}
        <div className="md:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/5 p-6">
          {'error' in calc ? (
            <p className="text-sm font-semibold text-rose-500">{calc.error}</p>
          ) : (
            <>
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-200 dark:text-white/10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isAr ? 'النتيجة' : 'Result'}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-cyan-400 font-tabular">
                    <AnimatedNumber value={calc.primary} decimals={2} suffix={calc.suffix} />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
