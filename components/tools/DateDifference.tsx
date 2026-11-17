'use client';

import React, { useMemo, useState } from 'react';
import { CalendarRange } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

export function DateDifference({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const nextMonthIso = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  }, []);

  const [tab, setTab] = useState<'diff' | 'add'>('diff');
  const [startStr, setStartStr] = useState(todayIso);
  const [endStr, setEndStr] = useState(nextMonthIso);
  const [weekend, setWeekend] = useState<'fri-sat' | 'sat-sun'>('fri-sat');

  const [baseDateStr, setBaseDateStr] = useState(todayIso);
  const [op, setOp] = useState<'add' | 'sub'>('add');
  const [deltaVal, setDeltaVal] = useState(30);
  const [deltaUnit, setDeltaUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');

  const diffResult = useMemo(() => {
    const [y1, m1, d1] = startStr.split('-').map(Number);
    const [y2, m2, d2] = endStr.split('-').map(Number);
    const a = new Date(y1, m1 - 1, d1);
    const b = new Date(y2, m2 - 1, d2);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;

    const start = a <= b ? a : b;
    const end = a <= b ? b : a;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);

    // Count business days accurately
    let businessDays = 0;
    const weekendDays = weekend === 'fri-sat' ? [5, 6] : [0, 6];
    const cursor = new Date(start);
    for (let i = 0; i < totalDays && i < 20000; i++) {
      if (!weekendDays.includes(cursor.getDay())) businessDays++;
      cursor.setDate(cursor.getDate() + 1);
    }

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      businessDays,
      startLabel: start.toLocaleDateString(isAr ? 'ar-EG' : 'en-US'),
      endLabel: end.toLocaleDateString(isAr ? 'ar-EG' : 'en-US'),
    };
  }, [startStr, endStr, weekend, isAr]);

  const addResult = useMemo(() => {
    const [y, m, d] = baseDateStr.split('-').map(Number);
    const base = new Date(y, m - 1, d);
    if (isNaN(base.getTime())) return null;
    const sign = op === 'add' ? 1 : -1;
    const target = new Date(base);

    if (deltaUnit === 'days') target.setDate(target.getDate() + sign * deltaVal);
    else if (deltaUnit === 'weeks') target.setDate(target.getDate() + sign * deltaVal * 7);
    else if (deltaUnit === 'months') target.setMonth(target.getMonth() + sign * deltaVal);
    else target.setFullYear(target.getFullYear() + sign * deltaVal);

    return {
      formatted: target.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      iso: target.toISOString().split('T')[0],
    };
  }, [baseDateStr, op, deltaVal, deltaUnit, isAr]);

  return (
    <div className="space-y-6">
      <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
        <button
          type="button"
          onClick={() => setTab('diff')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer ${
            tab === 'diff' ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAr ? 'الفرق بين تاريخين' : 'Between Two Dates'}
        </button>
        <button
          type="button"
          onClick={() => setTab('add')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer ${
            tab === 'add' ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAr ? 'إضافة / طرح أيام' : 'Add / Subtract Time'}
        </button>
      </div>

      {tab === 'diff' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {isAr ? 'تاريخ البداية' : 'Start Date'}
              </label>
              <input
                type="date"
                value={startStr}
                onChange={(e) => setStartStr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3.5 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {isAr ? 'تاريخ النهاية' : 'End Date'}
              </label>
              <input
                type="date"
                value={endStr}
                onChange={(e) => setEndStr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3.5 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {isAr ? 'عطلة نهاية الأسبوع' : 'Weekend Days'}
              </label>
              <select
                value={weekend}
                onChange={(e) => setWeekend(e.target.value as 'fri-sat' | 'sat-sun')}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                <option value="fri-sat">{isAr ? 'الجمعة والسبت' : 'Fri & Sat'}</option>
                <option value="sat-sun">{isAr ? 'السبت والأحد' : 'Sat & Sun'}</option>
              </select>
            </div>
          </div>

          {diffResult && (
            <>
              {/* Animated Horizontal Timeline */}
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                  <span>{diffResult.startLabel}</span>
                  <span className="font-tabular">
                    {formatNumber(diffResult.totalDays)} {isAr ? 'يوماً' : 'days'}
                  </span>
                  <span>{diffResult.endLabel}</span>
                </div>
                <div className="relative h-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'المدة المفصلة' : 'Exact Span'}
                  </p>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-tabular">
                    {formatNumber(diffResult.years)}{isAr ? 'س ' : 'y '}
                    {formatNumber(diffResult.months)}{isAr ? 'ش ' : 'm '}
                    {formatNumber(diffResult.days)}{isAr ? 'ي' : 'd'}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'إجمالي الأيام' : 'Total Days'}
                  </p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    <AnimatedNumber value={diffResult.totalDays} />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'الأسابيع' : 'Total Weeks'}
                  </p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    <AnimatedNumber value={diffResult.totalWeeks} />
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'أيام العمل' : 'Business Days'}
                  </p>
                  <p className="text-xl font-extrabold text-amber-500 mt-1">
                    <AnimatedNumber value={diffResult.businessDays} />
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'التاريخ الأساسي' : 'Base Date'}
              </label>
              <input
                type="date"
                value={baseDateStr}
                onChange={(e) => setBaseDateStr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'العملية' : 'Operation'}
              </label>
              <select
                value={op}
                onChange={(e) => setOp(e.target.value as 'add' | 'sub')}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                <option value="add">{isAr ? 'إضافة (+)' : 'Add (+)'}</option>
                <option value="sub">{isAr ? 'طرح (-)' : 'Subtract (-)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'العدد' : 'Amount'}
              </label>
              <input
                type="number"
                min={0}
                value={deltaVal}
                onChange={(e) => setDeltaVal(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'الوحدة' : 'Unit'}
              </label>
              <select
                value={deltaUnit}
                onChange={(e) =>
                  setDeltaUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years')
                }
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                <option value="days">{isAr ? 'أيام' : 'Days'}</option>
                <option value="weeks">{isAr ? 'أسابيع' : 'Weeks'}</option>
                <option value="months">{isAr ? 'شهور' : 'Months'}</option>
                <option value="years">{isAr ? 'سنوات' : 'Years'}</option>
              </select>
            </div>
          </div>

          {addResult && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex items-center gap-4">
              <CalendarRange className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                  {isAr ? 'التاريخ الناتج' : 'Resulting Date'}
                </p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {addResult.formatted}
                </p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                  {addResult.iso}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
