'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Cake, Calendar, Clock, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';
import { HIJRI_MONTHS_AR, HIJRI_MONTHS_EN, hijriToGregorian } from '@/lib/hijri';
import { triggerCelebration } from '@/lib/confetti';

function getZodiacSign(month: number, day: number, locale: Locale): string {
  const signs = [
    { m: 1, d: 20, ar: 'الجدي', en: 'Capricorn' },
    { m: 2, d: 19, ar: 'الدلو', en: 'Aquarius' },
    { m: 3, d: 20, ar: 'الحوت', en: 'Pisces' },
    { m: 4, d: 20, ar: 'الحمل', en: 'Aries' },
    { m: 5, d: 21, ar: 'الثور', en: 'Taurus' },
    { m: 6, d: 21, ar: 'الجوزاء', en: 'Gemini' },
    { m: 7, d: 22, ar: 'السرطان', en: 'Cancer' },
    { m: 8, d: 23, ar: 'الأسد', en: 'Leo' },
    { m: 9, d: 23, ar: 'العذراء', en: 'Virgo' },
    { m: 10, d: 23, ar: 'الميزان', en: 'Libra' },
    { m: 11, d: 22, ar: 'العقرب', en: 'Scorpio' },
    { m: 12, d: 22, ar: 'القوس', en: 'Sagittarius' },
  ];
  const idx = month - 1;
  const current = signs[idx];
  const chosen = day < current.d ? current : signs[(idx + 1) % 12];
  return locale === 'ar' ? chosen.ar : chosen.en;
}

export function AgeCalculator({ locale }: { locale: Locale }) {
  const { formatNumber } = usePreferences();
  const isAr = locale === 'ar';

  const [calendarMode, setCalendarMode] = useState<'gregorian' | 'hijri'>('gregorian');
  const [birthDateStr, setBirthDateStr] = useState('1996-05-15');
  const [hijriYear, setHijriYear] = useState(1417);
  const [hijriMonth, setHijriMonth] = useState(1);
  const [hijriDay, setHijriDay] = useState(1);

  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const [targetDateStr, setTargetDateStr] = useState(todayStr);
  const [liveSecondsOffset, setLiveSecondsOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSecondsOffset((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const result = useMemo(() => {
    let birthDate: Date;
    if (calendarMode === 'gregorian') {
      if (!birthDateStr) return { error: isAr ? 'يرجى إدخال تاريخ الميلاد' : 'Please enter a birth date' };
      const [y, m, d] = birthDateStr.split('-').map(Number);
      birthDate = new Date(y, m - 1, d);
    } else {
      birthDate = hijriToGregorian({ year: hijriYear, month: hijriMonth, day: hijriDay });
    }

    if (!targetDateStr) {
      return { error: isAr ? 'يرجى إدخال تاريخ الحساب المستهدف' : 'Please enter a target date' };
    }
    const [ty, tm, td] = targetDateStr.split('-').map(Number);
    const targetDate = new Date(ty, tm - 1, td);

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
      return { error: isAr ? 'التاريخ غير صالح' : 'Invalid date entered' };
    }
    if (birthDate > targetDate) {
      return {
        error: isAr
          ? 'تاريخ الميلاد يجب أن يكون قبل تاريخ الحساب'
          : 'Birth date must be earlier than the target date',
      };
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthDays = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
      days += prevMonthDays;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = targetDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60 + liveSecondsOffset;

    const nextBirthday = new Date(
      targetDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    const isBirthdayToday =
      targetDate.getMonth() === birthDate.getMonth() &&
      targetDate.getDate() === birthDate.getDate();

    if (nextBirthday < targetDate) {
      nextBirthday.setFullYear(targetDate.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.round(
      (nextBirthday.getTime() - targetDate.getTime()) / 86400000
    );

    const weekday = new Intl.DateTimeFormat(isAr ? 'ar-EG' : 'en-US', {
      weekday: 'long',
    }).format(birthDate);

    const zodiac = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate(), locale);

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalSeconds,
      daysUntilBirthday,
      isBirthdayToday,
      weekday,
      zodiac,
      gregorianIso: birthDate.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  }, [calendarMode, birthDateStr, hijriYear, hijriMonth, hijriDay, targetDateStr, liveSecondsOffset, isAr, locale]);

  useEffect(() => {
    if ('isBirthdayToday' in result && result.isBirthdayToday) {
      triggerCelebration('birthday-today');
    }
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => setCalendarMode('gregorian')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              calendarMode === 'gregorian'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isAr ? 'تاريخ ميلادي' : 'Gregorian Date'}
          </button>
          <button
            type="button"
            onClick={() => setCalendarMode('hijri')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              calendarMode === 'hijri'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isAr ? 'تاريخ هجري (أم القرى)' : 'Hijri Date (Umm al-Qura)'}
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calendarMode === 'gregorian' ? (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
            </label>
            <input
              type="date"
              value={birthDateStr}
              onChange={(e) => setBirthDateStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              {isAr ? 'تاريخ الميلاد الهجري' : 'Hijri Birth Date'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                aria-label={isAr ? 'اليوم الهجري' : 'Hijri Day'}
                value={hijriDay}
                onChange={(e) => setHijriDay(Number(e.target.value))}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {formatNumber(d)}
                  </option>
                ))}
              </select>
              <select
                aria-label={isAr ? 'الشهر الهجري' : 'Hijri Month'}
                value={hijriMonth}
                onChange={(e) => setHijriMonth(Number(e.target.value))}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                {(isAr ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN).map((name, idx) => (
                  <option key={name} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                aria-label={isAr ? 'السنة الهجرية' : 'Hijri Year'}
                min={1300}
                max={1500}
                value={hijriYear}
                onChange={(e) => setHijriYear(Number(e.target.value) || 1400)}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            {isAr ? 'الحساب حتى تاريخ' : 'Calculate Age On'}
          </label>
          <input
            type="date"
            value={targetDateStr}
            onChange={(e) => setTargetDateStr(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Results or Error */}
      {'error' in result ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-300">
          {result.error}
        </div>
      ) : (
        <div className="space-y-5">
          {result.isBirthdayToday && (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-400/20 to-indigo-500/20 border border-amber-400/40 p-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isAr
                  ? 'كل عام وأنت بخير! اليوم هو يوم عيد ميلادك!'
                  : 'Happy Birthday! Today marks another wonderful year!'}
              </p>
            </div>
          )}

          {/* Primary Age Breakdown */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/25 p-4 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                <AnimatedNumber value={result.years} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                {isAr ? 'سنة' : 'Years'}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/25 p-4 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400">
                <AnimatedNumber value={result.months} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                {isAr ? 'شهر' : 'Months'}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border border-cyan-500/25 p-4 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">
                <AnimatedNumber value={result.days} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                {isAr ? 'يوم' : 'Days'}
              </div>
            </div>
          </div>

          {/* Secondary stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'إجمالي الأيام' : 'Total Days'}
              </span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-tabular">
                {formatNumber(result.totalDays)}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'إجمالي الأسابيع' : 'Total Weeks'}
              </span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-tabular">
                {formatNumber(result.totalWeeks)}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'إجمالي الساعات' : 'Total Hours'}
              </span>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-tabular">
                {formatNumber(result.totalHours)}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4">
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {isAr ? 'عداد الثواني الحي' : 'Live Seconds'}
              </span>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-1 font-mono-tabular">
                {formatNumber(result.totalSeconds)}
              </div>
            </div>
          </div>

          {/* Extras: Birthday countdown, Weekday, Zodiac */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 flex items-center gap-3">
              <Cake className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'المتبقي لعيد الميلاد القادم' : 'Next Birthday In'}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white font-tabular">
                  {result.isBirthdayToday
                    ? isAr
                      ? 'اليوم!'
                      : 'Today!'
                    : `${formatNumber(result.daysUntilBirthday)} ${
                        isAr ? 'يوم' : 'days'
                      }`}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'يوم الميلاد' : 'Born On'}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {result.weekday}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'البرج الفلكي' : 'Zodiac Sign'}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {result.zodiac}
                </p>
              </div>
            </div>
          </div>

          {calendarMode === 'hijri' && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'الموافق بالميلادي: ' : 'Corresponding Gregorian date: '}
              <strong className="text-slate-800 dark:text-slate-200">
                {result.gregorianIso}
              </strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
