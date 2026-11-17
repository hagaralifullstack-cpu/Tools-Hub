'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ShieldCheck, RefreshCw, Copy, Check } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { RippleButton } from '@/components/MotionPrimitives';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';
const SIMILAR_REGEX = /[0O1lI]/g;

function secureRandomInt(max: number): number {
  const arr = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / max) * max;
  let val = 0;
  do {
    crypto.getRandomValues(arr);
    val = arr[0];
  } while (val >= limit);
  return val % max;
}

export function PasswordGenerator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let pool = '';
    const guaranteed: string[] = [];

    const clean = (str: string) => (excludeSimilar ? str.replace(SIMILAR_REGEX, '') : str);

    if (useUpper) {
      const s = clean(UPPER);
      pool += s;
      if (s.length) guaranteed.push(s[secureRandomInt(s.length)]);
    }
    if (useLower) {
      const s = clean(LOWER);
      pool += s;
      if (s.length) guaranteed.push(s[secureRandomInt(s.length)]);
    }
    if (useDigits) {
      const s = clean(DIGITS);
      pool += s;
      if (s.length) guaranteed.push(s[secureRandomInt(s.length)]);
    }
    if (useSymbols) {
      pool += SYMBOLS;
      guaranteed.push(SYMBOLS[secureRandomInt(SYMBOLS.length)]);
    }

    if (!pool) {
      const fallback = clean(LOWER);
      pool = fallback;
      guaranteed.push(fallback[secureRandomInt(fallback.length)]);
    }

    const chars = [...guaranteed];
    while (chars.length < length) {
      chars.push(pool[secureRandomInt(pool.length)]);
    }

    // Fisher-Yates cryptographic shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    const finalPwd = chars.slice(0, length).join('');
    setPassword(finalPwd);
    setHistory((prev) => [finalPwd, ...prev.filter((p) => p !== finalPwd)].slice(0, 5));

    // Brief scramble effect
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      let tick = 0;
      const timer = setInterval(() => {
        tick++;
        if (tick >= 5) {
          clearInterval(timer);
          setDisplayPassword(finalPwd);
        } else {
          setDisplayPassword(
            finalPwd
              .split('')
              .map((_, idx) =>
                idx < Math.floor((tick / 5) * finalPwd.length)
                  ? finalPwd[idx]
                  : pool[secureRandomInt(pool.length)]
              )
              .join('')
          );
        }
      }, 35);
    } else {
      setDisplayPassword(finalPwd);
    }
  }, [length, useUpper, useLower, useDigits, useSymbols, excludeSimilar]);

  useEffect(() => {
    Promise.resolve().then(() => {
      generatePassword();
    });
  }, [generatePassword]);

  const poolSize =
    (useUpper ? 26 : 0) +
    (useLower ? 26 : 0) +
    (useDigits ? 10 : 0) +
    (useSymbols ? SYMBOLS.length : 0);
  const entropyBits = Math.round(length * Math.log2(Math.max(2, poolSize)));

  const strength =
    entropyBits >= 85
      ? { label: isAr ? 'قوية جداً' : 'Very Strong', pct: 100, color: 'bg-emerald-500' }
      : entropyBits >= 60
      ? { label: isAr ? 'قوية' : 'Strong', pct: 75, color: 'bg-cyan-500' }
      : entropyBits >= 40
      ? { label: isAr ? 'متوسطة' : 'Moderate', pct: 50, color: 'bg-amber-500' }
      : { label: isAr ? 'ضعيفة' : 'Weak', pct: 25, color: 'bg-rose-500' };

  const crackTimeLabel =
    entropyBits >= 95
      ? isAr
        ? 'ملايين السنين'
        : 'Millions of years'
      : entropyBits >= 72
      ? isAr
        ? 'قرون طويلة'
        : 'Centuries'
      : entropyBits >= 55
      ? isAr
        ? 'عدة سنوات'
        : 'Several years'
      : isAr
      ? 'ساعات إلى أيام'
      : 'Hours to days';

  const copyPwd = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Security Output Box */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0B1020] to-[#172140] p-5 text-white space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'مُشفّرة بـ Web Crypto API' : 'Web Crypto Generated'}</span>
          </span>
          <span className="text-xs text-slate-300 font-tabular">
            {formatNumber(entropyBits)} bits · {crackTimeLabel}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div
            dir="ltr"
            className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 font-mono text-base sm:text-lg tracking-wider text-amber-300 break-all select-all"
          >
            {displayPassword || password}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <RippleButton
              onClick={() => copyPwd(password)}
              className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ' : 'Copy'}</span>
            </RippleButton>
            <button
              type="button"
              onClick={generatePassword}
              aria-label={isAr ? 'توليد جديد' : 'Regenerate'}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated strength bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">{isAr ? 'قوة كلمة المرور:' : 'Strength:'}</span>
            <span className="font-bold text-white">{strength.label}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            <span>{isAr ? 'طول كلمة المرور' : 'Password Length'}</span>
            <span className="font-tabular text-amber-500">{formatNumber(length)}</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              checked: useUpper,
              onChange: setUseUpper,
              label: isAr ? 'أحرف كبيرة (A-Z)' : 'Uppercase (A-Z)',
            },
            {
              checked: useLower,
              onChange: setUseLower,
              label: isAr ? 'أحرف صغيرة (a-z)' : 'Lowercase (a-z)',
            },
            {
              checked: useDigits,
              onChange: setUseDigits,
              label: isAr ? 'أرقام (0-9)' : 'Numbers (0-9)',
            },
            {
              checked: useSymbols,
              onChange: setUseSymbols,
              label: isAr ? 'رموز خاصة (!@#$)' : 'Symbols (!@#$)',
            },
            {
              checked: excludeSimilar,
              onChange: setExcludeSimilar,
              label: isAr ? 'استبعاد المتشابهة (0O1lI)' : 'Exclude Ambiguous (0O1lI)',
            },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1020]/60 px-3.5 py-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.onChange(e.target.checked)}
                className="w-4 h-4 accent-amber-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Session-only history */}
      {history.length > 1 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isAr
              ? 'آخر كلمات المرور في هذه الجلسة (تُمحى عند الإغلاق):'
              : 'Session History (cleared when tab closes):'}
          </p>
          <div className="space-y-1.5">
            {history.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs font-mono"
              >
                <span dir="ltr" className="truncate text-slate-700 dark:text-slate-300">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => copyPwd(item)}
                  className="text-amber-500 hover:underline shrink-0 cursor-pointer"
                >
                  {isAr ? 'نسخ' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
