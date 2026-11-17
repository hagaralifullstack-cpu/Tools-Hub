'use client';

import React, { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

export function BmiCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [cm, setCm] = useState(172);
  const [kg, setKg] = useState(70);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(8);
  const [lbs, setLbs] = useState(154);

  const calc = useMemo(() => {
    const heightM =
      unit === 'metric' ? cm / 100 : (feet * 12 + inches) * 0.0254;
    const weightKg = unit === 'metric' ? kg : lbs * 0.45359237;

    if (heightM <= 0 || weightKg <= 0) return null;

    const bmi = weightKg / (heightM * heightM);
    const minHealthyKg = 18.5 * heightM * heightM;
    const maxHealthyKg = 24.9 * heightM * heightM;

    const category =
      bmi < 18.5
        ? { ar: 'نقص في الوزن', en: 'Underweight', color: '#3B82F6' }
        : bmi < 25
        ? { ar: 'وزن صحي طبيعي', en: 'Normal Weight', color: '#10B981' }
        : bmi < 30
        ? { ar: 'زيادة في الوزن', en: 'Overweight', color: '#F59E0B' }
        : { ar: 'سمنة', en: 'Obese', color: '#EF4444' };

    // Gauge needle angle from -90 deg (BMI 12) to +90 deg (BMI 40)
    const clampedBmi = Math.max(12, Math.min(40, bmi));
    const angle = -90 + ((clampedBmi - 12) / (40 - 12)) * 180;

    return {
      bmi,
      minHealthy: unit === 'metric' ? minHealthyKg : minHealthyKg / 0.45359237,
      maxHealthy: unit === 'metric' ? maxHealthyKg : maxHealthyKg / 0.45359237,
      category,
      angle,
    };
  }, [unit, cm, kg, feet, inches, lbs]);

  return (
    <div className="space-y-6">
      <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
        <button
          type="button"
          onClick={() => setUnit('metric')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer ${
            unit === 'metric' ? 'bg-teal-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAr ? 'متري (سم / كجم)' : 'Metric (cm / kg)'}
        </button>
        <button
          type="button"
          onClick={() => setUnit('imperial')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer ${
            unit === 'imperial' ? 'bg-teal-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAr ? 'إمبراطوري (قدم / باوند)' : 'Imperial (ft / lbs)'}
        </button>
      </div>

      {unit === 'metric' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
              <span>{isAr ? 'الطول (سم)' : 'Height (cm)'}</span>
              <span className="text-teal-500 font-tabular">{formatNumber(cm)} cm</span>
            </div>
            <input
              type="range"
              min={120}
              max={225}
              value={cm}
              onChange={(e) => setCm(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
              <span>{isAr ? 'الوزن (كجم)' : 'Weight (kg)'}</span>
              <span className="text-teal-500 font-tabular">{formatNumber(kg)} kg</span>
            </div>
            <input
              type="range"
              min={30}
              max={190}
              value={kg}
              onChange={(e) => setKg(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
              {isAr ? 'القدم (ft)' : 'Feet (ft)'}
            </label>
            <input
              type="number"
              min={3}
              max={8}
              value={feet}
              onChange={(e) => setFeet(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
              {isAr ? 'البوصة (in)' : 'Inches (in)'}
            </label>
            <input
              type="number"
              min={0}
              max={11}
              value={inches}
              onChange={(e) => setInches(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
              {isAr ? 'الوزن (باوند lbs)' : 'Weight (lbs)'}
            </label>
            <input
              type="number"
              min={60}
              max={450}
              value={lbs}
              onChange={(e) => setLbs(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {calc && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] p-6 flex flex-col items-center text-center space-y-4">
          {/* Semicircular SVG Gauge */}
          <div className="relative w-64 h-36">
            <svg viewBox="0 0 220 125" className="w-full h-full">
              <defs>
                <linearGradient id="bmiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="32%" stopColor="#10B981" />
                  <stop offset="65%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
              <path
                d="M 20 110 A 90 90 0 0 1 200 110"
                fill="none"
                stroke="url(#bmiGrad)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Animated Needle */}
              <g
                style={{
                  transform: `rotate(${calc.angle}deg)`,
                  transformOrigin: '110px 110px',
                  transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <line
                  x1="110"
                  y1="110"
                  x2="110"
                  y2="34"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="text-slate-900 dark:text-white"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="7"
                  fill="currentColor"
                  className="text-slate-900 dark:text-white"
                />
              </g>
            </svg>
          </div>

          <div>
            <div className="text-4xl font-extrabold" style={{ color: calc.category.color }}>
              <AnimatedNumber value={calc.bmi} decimals={1} />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {isAr ? calc.category.ar : calc.category.en}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-tabular">
              {isAr ? 'الوزن الصحي التقريبي لطولك: ' : 'Healthy weight range for your height: '}
              <strong className="text-slate-900 dark:text-white">
                {formatNumber(Math.round(calc.minHealthy))} –{' '}
                {formatNumber(Math.round(calc.maxHealthy))}{' '}
                {unit === 'metric' ? (isAr ? 'كجم' : 'kg') : 'lbs'}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
