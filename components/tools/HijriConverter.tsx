'use client';

import React, { useMemo, useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import {
  COPTIC_MONTHS_AR,
  COPTIC_MONTHS_EN,
  GREGORIAN_MONTHS_AR,
  GREGORIAN_MONTHS_EN,
  HIJRI_MONTHS_AR,
  HIJRI_MONTHS_EN,
  getCopticInfo,
  gregorianToHijri,
  hijriToGregorian,
} from '@/lib/hijri';

export function HijriConverter({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const now = useMemo(() => new Date(), []);
  const initialHijri = useMemo(() => gregorianToHijri(now, 0), [now]);

  const [direction, setDirection] = useState<'g2h' | 'h2g'>('g2h');
  const [moonOffset, setMoonOffset] = useState<-1 | 0 | 1>(0);
  const [copied, setCopied] = useState(false);

  const [gDateStr, setGDateStr] = useState(() => {
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });

  const [hYear, setHYear] = useState(initialHijri.year);
  const [hMonth, setHMonth] = useState(initialHijri.month);
  const [hDay, setHDay] = useState(initialHijri.day);

  const conversion = useMemo(() => {
    if (direction === 'g2h') {
      const [y, m, d] = gDateStr.split('-').map(Number);
      const gDate = new Date(y, m - 1, d);
      if (isNaN(gDate.getTime())) return null;
      const hijri = gregorianToHijri(gDate, moonOffset);
      const coptic = getCopticInfo(gDate);
      return { gDate, hijri, coptic };
    } else {
      const gDate = hijriToGregorian({ year: hYear, month: hMonth, day: hDay }, moonOffset);
      const hijri = { year: hYear, month: hMonth, day: hDay };
      const coptic = getCopticInfo(gDate);
      return { gDate, hijri, coptic };
    }
  }, [direction, gDateStr, hYear, hMonth, hDay, moonOffset]);

  const handleSwap = () => {
    if (conversion) {
      if (direction === 'g2h') {
        setHYear(conversion.hijri.year);
        setHMonth(conversion.hijri.month);
        setHDay(conversion.hijri.day);
        setDirection('h2g');
      } else {
        const y = conversion.gDate.getFullYear();
        const m = String(conversion.gDate.getMonth() + 1).padStart(2, '0');
        const d = String(conversion.gDate.getDate()).padStart(2, '0');
        setGDateStr(`${y}-${m}-${d}`);
        setDirection('g2h');
      }
    } else {
      setDirection((prev) => (prev === 'g2h' ? 'h2g' : 'g2h'));
    }
  };

  const weekdayName = conversion
    ? new Intl.DateTimeFormat(isAr ? 'ar-EG' : 'en-US', { weekday: 'long' }).format(
        conversion.gDate
      )
    : '';

  const hijriWritten = conversion
    ? isAr
      ? `${weekdayName} ${formatNumber(conversion.hijri.day)} ${
          HIJRI_MONTHS_AR[conversion.hijri.month - 1]
        } ${formatNumber(conversion.hijri.year)} هـ`
      : `${weekdayName}, ${conversion.hijri.day} ${
          HIJRI_MONTHS_EN[conversion.hijri.month - 1]
        } ${conversion.hijri.year} AH`
    : '';

  const gregorianWritten = conversion
    ? isAr
      ? `${weekdayName} ${formatNumber(conversion.gDate.getDate())} ${
          GREGORIAN_MONTHS_AR[conversion.gDate.getMonth()]
        } ${formatNumber(conversion.gDate.getFullYear())} م`
      : `${weekdayName}, ${
          GREGORIAN_MONTHS_EN[conversion.gDate.getMonth()]
        } ${conversion.gDate.getDate()}, ${conversion.gDate.getFullYear()}`
    : '';

  const copyResult = async () => {
    if (!conversion) return;
    const text = direction === 'g2h' ? hijriWritten : gregorianWritten;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Night sky Crescent & Stars visual header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1020] via-[#10252E] to-[#0D2B24] p-6 text-white border border-emerald-500/25">
        <svg
          aria-hidden="true"
          viewBox="0 0 400 120"
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
        >
          <circle cx="48" cy="28" r="1.5" fill="#F5B942" />
          <circle cx="110" cy="18" r="2" fill="#FFFFFF" />
          <circle cx="180" cy="36" r="1.3" fill="#22D3EE" />
          <circle cx="245" cy="22" r="1.8" fill="#F5B942" />
          <circle cx="310" cy="42" r="1.5" fill="#FFFFFF" />
          <circle cx="355" cy="25" r="2" fill="#F5B942" />
          <path
            d="M342 38a24 24 0 1 0 21 35 19 19 0 0 1-21-35Z"
            fill="#F5B942"
            opacity="0.85"
          />
        </svg>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-emerald-300 mb-1">
              {direction === 'g2h'
                ? isAr
                  ? 'التحويل من الميلادي إلى الهجري'
                  : 'Gregorian → Hijri Conversion'
                : isAr
                ? 'التحويل من الهجري إلى الميلادي'
                : 'Hijri → Gregorian Conversion'}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {direction === 'g2h' ? hijriWritten : gregorianWritten}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer self-start sm:self-center shrink-0"
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'عكس التحويل' : 'Swap Calendars'}</span>
          </button>
        </div>
      </div>

      {/* Moon sighting ±1 adjustment */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          {isAr ? 'تعديل الرؤية الشرعية (±1 يوم):' : 'Moon Sighting Offset (±1 day):'}
        </span>
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
          {([-1, 0, 1] as const).map((offset) => (
            <button
              key={offset}
              type="button"
              onClick={() => setMoonOffset(offset)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-tabular transition-all cursor-pointer ${
                moonOffset === offset
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {offset > 0 ? `+${formatNumber(offset)}` : formatNumber(offset)}
            </button>
          ))}
        </div>
      </div>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {direction === 'g2h'
              ? isAr
                ? 'التاريخ الميلادي (الإدخال)'
                : 'Gregorian Date (Input)'
              : isAr
              ? 'التاريخ الهجري (الإدخال)'
              : 'Hijri Date (Input)'}
          </h3>

          {direction === 'g2h' ? (
            <input
              type="date"
              value={gDateStr}
              onChange={(e) => setGDateStr(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
            />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <select
                value={hDay}
                onChange={(e) => setHDay(Number(e.target.value))}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {formatNumber(d)}
                  </option>
                ))}
              </select>
              <select
                value={hMonth}
                onChange={(e) => setHMonth(Number(e.target.value))}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              >
                {(isAr ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN).map((mName, idx) => (
                  <option key={mName} value={idx + 1}>
                    {mName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1200}
                max={1600}
                value={hYear}
                onChange={(e) => setHYear(Number(e.target.value) || 1448)}
                className="rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Output Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              {direction === 'g2h'
                ? isAr
                  ? 'التاريخ الهجري (أم القرى)'
                  : 'Hijri Result (Umm al-Qura)'
                : isAr
                ? 'التاريخ الميلادي الناتج'
                : 'Gregorian Result'}
            </h3>
            <button
              type="button"
              onClick={copyResult}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ' : 'Copy'}</span>
            </button>
          </div>

          {conversion ? (
            <div className="space-y-2">
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                {direction === 'g2h' ? hijriWritten : gregorianWritten}
              </p>
              <p className="text-sm font-mono-tabular text-slate-600 dark:text-slate-300">
                {direction === 'g2h'
                  ? `${formatNumber(conversion.hijri.year)}/${String(
                      conversion.hijri.month
                    ).padStart(2, '0')}/${String(conversion.hijri.day).padStart(2, '0')}`
                  : `${formatNumber(conversion.gDate.getFullYear())}-${String(
                      conversion.gDate.getMonth() + 1
                    ).padStart(2, '0')}-${String(conversion.gDate.getDate()).padStart(2, '0')}`}
              </p>
            </div>
          ) : (
            <p className="text-sm text-rose-500">
              {isAr ? 'تاريخ غير صالح' : 'Invalid date'}
            </p>
          )}
        </div>
      </div>

      {/* Coptic + Month Reference Strip */}
      {conversion && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 p-3.5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'الشهر الهجري' : 'Hijri Month'}
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {isAr
                ? HIJRI_MONTHS_AR[conversion.hijri.month - 1]
                : HIJRI_MONTHS_EN[conversion.hijri.month - 1]}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 p-3.5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'الشهر الميلادي' : 'Gregorian Month'}
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {isAr
                ? GREGORIAN_MONTHS_AR[conversion.gDate.getMonth()]
                : GREGORIAN_MONTHS_EN[conversion.gDate.getMonth()]}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 p-3.5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'التقويم القبطي الموافق' : 'Coptic Calendar'}
            </p>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {formatNumber(conversion.coptic.day)}{' '}
              {isAr
                ? COPTIC_MONTHS_AR[conversion.coptic.monthIndex]
                : COPTIC_MONTHS_EN[conversion.coptic.monthIndex]}{' '}
              {formatNumber(conversion.coptic.year)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
