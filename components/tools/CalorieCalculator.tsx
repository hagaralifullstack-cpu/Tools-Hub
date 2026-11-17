'use client';

import React, { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

const ACTIVITY_LEVELS = [
  { id: 'sedentary', factor: 1.2, ar: 'خامل (عمل مكتبي)', en: 'Sedentary (Desk job)' },
  { id: 'light', factor: 1.375, ar: 'نشاط خفيف (1–3 أيام/أسبوع)', en: 'Light (1–3 days/wk)' },
  { id: 'moderate', factor: 1.55, ar: 'نشاط متوسط (3–5 أيام/أسبوع)', en: 'Moderate (3–5 days/wk)' },
  { id: 'active', factor: 1.725, ar: 'نشيط جداً (6–7 أيام/أسبوع)', en: 'Very Active (6–7 days/wk)' },
  { id: 'athlete', factor: 1.9, ar: 'رياضي محترف', en: 'Athlete (2x daily)' },
];

export function CalorieCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(74);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');

  const calc = useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    const bmr = sex === 'male' ? base + 5 : base - 161;
    const tdee = bmr * activity;
    const target =
      goal === 'lose' ? Math.max(1200, tdee - 500) : goal === 'gain' ? tdee + 400 : tdee;

    // Macro split: 30% Protein, 40% Carbs, 30% Fat
    const proteinGrams = Math.round((target * 0.3) / 4);
    const carbsGrams = Math.round((target * 0.4) / 4);
    const fatGrams = Math.round((target * 0.3) / 9);

    return { bmr, tdee, target, proteinGrams, carbsGrams, fatGrams };
  }, [sex, age, height, weight, activity, goal]);

  const r = 50;
  const circ = 2 * Math.PI * r;
  const pLen = circ * 0.3;
  const cLen = circ * 0.4;
  const fLen = circ * 0.3;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'الجنس' : 'Sex'}
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05]">
            <button
              type="button"
              onClick={() => setSex('male')}
              className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                sex === 'male' ? 'bg-teal-500 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {isAr ? 'ذكر' : 'Male'}
            </button>
            <button
              type="button"
              onClick={() => setSex('female')}
              className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                sex === 'female' ? 'bg-teal-500 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {isAr ? 'أنثى' : 'Female'}
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            <span>{isAr ? 'العمر' : 'Age'}</span>
            <span className="text-teal-500 font-tabular">{formatNumber(age)}</span>
          </div>
          <input
            type="range"
            min={15}
            max={80}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-teal-500 mt-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            <span>{isAr ? 'الطول (سم)' : 'Height (cm)'}</span>
            <span className="text-teal-500 font-tabular">{formatNumber(height)}</span>
          </div>
          <input
            type="range"
            min={130}
            max={220}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-teal-500 mt-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            <span>{isAr ? 'الوزن (كجم)' : 'Weight (kg)'}</span>
            <span className="text-teal-500 font-tabular">{formatNumber(weight)}</span>
          </div>
          <input
            type="range"
            min={35}
            max={180}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-teal-500 mt-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'مستوى النشاط البدني' : 'Activity Level'}
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
          >
            {ACTIVITY_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.factor}>
                {isAr ? lvl.ar : lvl.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'الهدف' : 'Goal'}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05]">
            {(
              [
                { id: 'lose', ar: 'خسارة وزن', en: 'Lose' },
                { id: 'maintain', ar: 'تثبيت', en: 'Maintain' },
                { id: 'gain', ar: 'زيادة وزن', en: 'Gain' },
              ] as const
            ).map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(g.id)}
                className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${
                  goal === g.id ? 'bg-orange-500 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {isAr ? g.ar : g.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results & Macro Donut */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">BMR</p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              <AnimatedNumber value={calc.bmr} />
            </p>
            <p className="text-[11px] text-slate-400">{isAr ? 'سعرة/يوم' : 'kcal/day'}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">TDEE</p>
            <p className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
              <AnimatedNumber value={calc.tdee} />
            </p>
            <p className="text-[11px] text-slate-400">{isAr ? 'سعرة/يوم' : 'kcal/day'}</p>
          </div>
          <div className="rounded-2xl border border-orange-500/35 bg-orange-500/10 p-4 text-center">
            <p className="text-xs font-semibold text-orange-600 dark:text-orange-300">
              {isAr ? 'السعرات المقترحة' : 'Target Calories'}
            </p>
            <p className="text-2xl font-extrabold text-orange-600 dark:text-orange-400 mt-1">
              <AnimatedNumber value={calc.target} />
            </p>
            <p className="text-[11px] text-orange-500">{isAr ? 'سعرة/يوم' : 'kcal/day'}</p>
          </div>
        </div>

        <div className="md:col-span-5 rounded-2xl border border-teal-500/25 bg-teal-500/5 p-5 flex items-center gap-5">
          <svg viewBox="0 0 120 120" className="w-28 h-28 shrink-0 -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="#14B8A6"
              strokeWidth="14"
              strokeDasharray={`${pLen} ${circ}`}
            />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="#FB923C"
              strokeWidth="14"
              strokeDasharray={`${cLen} ${circ}`}
              strokeDashoffset={-pLen}
            />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="#F5B942"
              strokeWidth="14"
              strokeDasharray={`${fLen} ${circ}`}
              strokeDashoffset={-(pLen + cLen)}
            />
          </svg>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span>
                {isAr ? 'بروتين' : 'Protein'}:{' '}
                <strong className="font-tabular">{formatNumber(calc.proteinGrams)}g</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span>
                {isAr ? 'كربوهيدرات' : 'Carbs'}:{' '}
                <strong className="font-tabular">{formatNumber(calc.carbsGrams)}g</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>
                {isAr ? 'دهون' : 'Fat'}:{' '}
                <strong className="font-tabular">{formatNumber(calc.fatGrams)}g</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {isAr
          ? 'تنبيه صحي: هذه الحسابات تقديرية استرشادية ولا تغني عن استشارة الطبيب أو أخصائي التغذية.'
          : 'Health Notice: Estimates are educational only and do not replace professional medical or dietary advice.'}
      </p>
    </div>
  );
}
