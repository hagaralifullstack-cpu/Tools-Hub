'use client';

import React, { useMemo, useState } from 'react';
import { Baby, Calendar, HeartPulse } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';

const MILESTONES = [
  { week: 4, ar: 'بذرة خشخاش', en: 'Poppy Seed', mm: '2 mm', color: '#F472B6' },
  { week: 8, ar: 'حبة توت', en: 'Raspberry', mm: '1.6 cm', color: '#FB7185' },
  { week: 12, ar: 'حبة برقوق', en: 'Plum', mm: '5.4 cm', color: '#A855F7' },
  { week: 16, ar: 'حبة أفوكادو', en: 'Avocado', mm: '11.6 cm', color: '#10B981' },
  { week: 20, ar: 'ثمرة موز', en: 'Banana', mm: '16.4 cm', color: '#FBBF24' },
  { week: 24, ar: 'كوز ذرة', en: 'Ear of Corn', mm: '30 cm', color: '#F59E0B' },
  { week: 28, ar: 'ثمرة باذنجان', en: 'Eggplant', mm: '37.6 cm', color: '#8B5CF6' },
  { week: 32, ar: 'حبة أناناس', en: 'Pineapple', mm: '42.4 cm', color: '#EAB308' },
  { week: 36, ar: 'حبة شمام', en: 'Honeydew Melon', mm: '47.4 cm', color: '#34D399' },
  { week: 40, ar: 'ثمرة بطيخ', en: 'Watermelon', mm: '51 cm', color: '#14B8A6' },
];

export function PregnancyDueDate({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const defaultLmp = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 84); // ~12 weeks ago as initial demo
    return d.toISOString().split('T')[0];
  }, []);

  const [lmpStr, setLmpStr] = useState(defaultLmp);
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const info = useMemo(() => {
    if (!lmpStr) return null;
    const [y, m, d] = lmpStr.split('-').map(Number);
    const lmp = new Date(y, m - 1, d);
    if (isNaN(lmp.getTime())) return null;

    // Naegele's rule adjusted for cycle length
    const adjustment = cycleLength - 28;
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280 + adjustment);

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const elapsedDays = Math.floor((todayStart.getTime() - lmp.getTime()) / 86400000);
    const clampedDays = Math.max(0, Math.min(294, elapsedDays));

    const weeks = Math.floor(clampedDays / 7);
    const days = clampedDays % 7;
    const daysLeft = Math.max(
      0,
      Math.ceil((dueDate.getTime() - todayStart.getTime()) / 86400000)
    );
    const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
    const progressPct = Math.min(100, Math.max(0, (clampedDays / 280) * 100));

    return {
      dueDateFormatted: dueDate.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      weeks,
      days,
      daysLeft,
      trimester,
      progressPct,
    };
  }, [lmpStr, cycleLength, isAr]);

  const activeMilestone = useMemo(() => {
    const targetWeek = selectedWeek ?? (info ? Math.max(4, Math.min(40, info.weeks)) : 12);
    return (
      MILESTONES.reduce((prev, curr) =>
        Math.abs(curr.week - targetWeek) < Math.abs(prev.week - targetWeek) ? curr : prev
      ) || MILESTONES[2]
    );
  }, [selectedWeek, info]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'تاريخ أول يوم في آخر دورة شهرية' : 'First Day of Last Menstrual Period (LMP)'}
          </label>
          <input
            type="date"
            value={lmpStr}
            onChange={(e) => setLmpStr(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            <span>{isAr ? 'متوسط طول الدورة الشهرية' : 'Average Cycle Length'}</span>
            <span className="text-teal-500 font-tabular">
              {formatNumber(cycleLength)} {isAr ? 'يوماً' : 'days'}
            </span>
          </div>
          <input
            type="range"
            min={21}
            max={35}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full accent-teal-500 mt-2 cursor-pointer"
          />
        </div>
      </div>

      {info && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-teal-500/15 to-pink-500/10 border border-teal-500/30 p-5">
              <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-300 font-semibold">
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'موعد الولادة المتوقع' : 'Estimated Due Date'}</span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-2">
                {info.dueDateFormatted}
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-pink-500/15 to-teal-500/10 border border-pink-500/30 p-5">
              <div className="flex items-center gap-2 text-xs text-pink-600 dark:text-pink-300 font-semibold">
                <Baby className="w-4 h-4" />
                <span>{isAr ? 'عمر الحمل الحالي' : 'Current Gestational Age'}</span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-2 font-tabular">
                {formatNumber(info.weeks)} {isAr ? 'أسبوع' : 'wks'} ·{' '}
                {formatNumber(info.days)} {isAr ? 'أيام' : 'days'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <HeartPulse className="w-4 h-4 text-teal-500" />
                <span>{isAr ? 'الثلث الحملي والمتبقي' : 'Trimester & Remaining'}</span>
              </div>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-2 font-tabular">
                {isAr ? `الثلث ${formatNumber(info.trimester)}` : `Trimester ${info.trimester}`} ·{' '}
                {formatNumber(info.daysLeft)} {isAr ? 'يوم' : 'days left'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-tabular">
              <span>{isAr ? 'تقدم الحمل (40 أسبوعاً)' : 'Pregnancy Progress (40 Weeks)'}</span>
              <span>{formatNumber(Math.round(info.progressPct))}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-pink-400 transition-all duration-300"
                style={{ width: `${info.progressPct}%` }}
              />
            </div>
          </div>

          {/* 40-Week Interactive Fetal Size Timeline */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" fill={activeMilestone.color} fillOpacity="0.18" />
                  <circle cx="24" cy="26" r="12" fill={activeMilestone.color} />
                  <path d="M24 14c0-4 4-6 7-5-1 3-3 5-7 5Z" fill="#10B981" />
                </svg>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr
                      ? `الأسبوع ${formatNumber(activeMilestone.week)} — حجم الجنين التقريبي`
                      : `Week ${activeMilestone.week} — Approximate Baby Size`}
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {isAr ? activeMilestone.ar : activeMilestone.en} ({activeMilestone.mm})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {MILESTONES.map((ms) => (
                <button
                  key={ms.week}
                  type="button"
                  onClick={() => setSelectedWeek(ms.week)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-tabular transition-all cursor-pointer ${
                    activeMilestone.week === ms.week
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 hover:bg-teal-500/15'
                  }`}
                >
                  {isAr ? `أسبوع ${formatNumber(ms.week)}` : `Wk ${ms.week}`}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {isAr
          ? 'تنبيه طبي: هذه الحاسبة تقدم موعداً تقديرياً بناءً على قاعدة نيجل وليست استشارة طبية؛ تابعي مع طبيبك المختص والفحوصات الدورية.'
          : 'Medical Disclaimer: This calculator provides an approximate estimate only and is not a substitute for clinical prenatal care or ultrasound dating.'}
      </p>
    </div>
  );
}
