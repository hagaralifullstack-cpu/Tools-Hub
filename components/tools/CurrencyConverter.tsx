'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeftRight, RefreshCw, AlertTriangle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

interface CurrencyInfo {
  code: string;
  ar: string;
  en: string;
  colors: [string, string, string];
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', ar: 'الدولار الأمريكي', en: 'US Dollar', colors: ['#1D4ED8', '#FFFFFF', '#DC2626'] },
  { code: 'EGP', ar: 'الجنيه المصري', en: 'Egyptian Pound', colors: ['#CE1126', '#FFFFFF', '#0F172A'] },
  { code: 'SAR', ar: 'الريال السعودي', en: 'Saudi Riyal', colors: ['#006C35', '#FFFFFF', '#006C35'] },
  { code: 'AED', ar: 'الدرهم الإماراتي', en: 'UAE Dirham', colors: ['#00732F', '#FFFFFF', '#EF4444'] },
  { code: 'EUR', ar: 'اليورو الأوروبي', en: 'Euro', colors: ['#1E3A8A', '#FACC15', '#1E3A8A'] },
  { code: 'GBP', ar: 'الجنيه الإسترليني', en: 'British Pound', colors: ['#1E3A8A', '#FFFFFF', '#DC2626'] },
  { code: 'KWD', ar: 'الدينار الكويتي', en: 'Kuwaiti Dinar', colors: ['#007A3D', '#FFFFFF', '#CE1126'] },
  { code: 'QAR', ar: 'الريال القطري', en: 'Qatari Riyal', colors: ['#8D1B3D', '#FFFFFF', '#8D1B3D'] },
  { code: 'JOD', ar: 'الدينار الأردني', en: 'Jordanian Dinar', colors: ['#0F172A', '#FFFFFF', '#007A3D'] },
  { code: 'TRY', ar: 'الليرة التركية', en: 'Turkish Lira', colors: ['#E30A17', '#FFFFFF', '#E30A17'] },
];

const FALLBACK_RATES_USD: Record<string, number> = {
  USD: 1,
  EGP: 49.5,
  SAR: 3.75,
  AED: 3.6725,
  EUR: 0.92,
  GBP: 0.79,
  KWD: 0.307,
  QAR: 3.64,
  JOD: 0.709,
  TRY: 34.4,
};

const CACHE_KEY = 'toolshub_currency_rates_v1';
const ONE_HOUR_MS = 3600 * 1000;

function CurrencyFlagSvg({ colors }: { colors: [string, string, string] }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 rounded-full shrink-0 border border-white/20" aria-hidden="true">
      <rect width="24" height="8" y="0" fill={colors[0]} />
      <rect width="24" height="8" y="8" fill={colors[1]} />
      <rect width="24" height="8" y="16" fill={colors[2]} />
    </svg>
  );
}

export function CurrencyConverter({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [amount, setAmount] = useState(100);
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EGP');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_USD);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const fetchRates = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    try {
      if (!forceRefresh) {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < ONE_HOUR_MS && cached.rates) {
            setRates(cached.rates);
            setUpdatedAt(cached.timeLabel || '');
            setIsFallback(false);
            setLoading(false);
            return;
          }
        }
      }

      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      if (data && data.rates) {
        const label = data.time_last_update_utc
          ? new Date(data.time_last_update_utc).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')
          : new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US');
        setRates(data.rates);
        setUpdatedAt(label);
        setIsFallback(false);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            rates: data.rates,
            timestamp: Date.now(),
            timeLabel: label,
          })
        );
      } else {
        throw new Error('Malformed payload');
      }
    } catch {
      setRates(FALLBACK_RATES_USD);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, [isAr]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchRates(false);
    });
  }, [fetchRates]);

  const fromRate = rates[fromCode] || 1;
  const toRate = rates[toCode] || 1;
  const unitRate = toRate / fromRate;
  const converted = Math.max(0, amount) * unitRate;

  const fromMeta = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
  const toMeta = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1];

  return (
    <div className="space-y-6">
      {isFallback && (
        <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm text-amber-700 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {isAr
              ? 'تعذر الاتصال بخدمة الأسعار الحية؛ تُعرض حالياً أسعار تقريبية احتياطية.'
              : 'Live rate feed unreachable; displaying approximate offline fallback rates.'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        <div className="md:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CurrencyFlagSvg colors={fromMeta.colors} />
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {isAr ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            min={0}
            step="any"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-4 py-3 text-xl font-bold font-tabular text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setFromCode(toCode);
              setToCode(fromCode);
            }}
            aria-label={isAr ? 'تبديل العملتين' : 'Swap currencies'}
            className="p-3 rounded-full bg-blue-500/15 text-blue-500 hover:bg-blue-500 hover:text-white transition-all hover:rotate-180 duration-300 cursor-pointer"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        <div className="md:col-span-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CurrencyFlagSvg colors={toMeta.colors} />
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {isAr ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border border-blue-500/25 bg-white dark:bg-[#0B1020] px-4 py-3 text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-cyan-400">
            <AnimatedNumber value={converted} decimals={2} suffix={` ${toCode}`} />
          </div>
        </div>
      </div>

      {/* Exchange Rate Footer Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
        <span className="font-tabular">
          1 {fromCode} = <strong>{formatNumber(Number(unitRate.toFixed(4)))}</strong> {toCode}
        </span>
        <div className="flex items-center gap-3">
          {updatedAt && (
            <span className="text-slate-400">
              {isAr ? 'آخر تحديث: ' : 'Updated: '}
              {updatedAt}
            </span>
          )}
          <button
            type="button"
            onClick={() => fetchRates(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-blue-500 hover:underline font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{isAr ? 'تحديث الأسعار' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
