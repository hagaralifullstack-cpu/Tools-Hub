'use client';

import React, { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';

type CurrencyChoice = 'egp' | 'sar' | 'aed' | 'usd' | 'none';

const ONES_M = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
const ONES_F = ['', 'واحدة', 'اثنتان', 'ثلاث', 'أربع', 'خمس', 'ست', 'سبع', 'ثمان', 'تسع'];
const TENS = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const HUNDREDS = [
  '',
  'مائة',
  'مائتان',
  'ثلاثمائة',
  'أربعمائة',
  'خمسمائة',
  'ستمائة',
  'سبعمائة',
  'ثمانمائة',
  'تسعمائة',
];

function convertBelow1000Ar(n: number, feminine = false): string {
  if (n === 0) return '';
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const rem = n % 100;
  if (h > 0) parts.push(HUNDREDS[h]);

  if (rem > 0) {
    if (rem === 10) parts.push(feminine ? 'عشر' : 'عشرة');
    else if (rem === 11) parts.push(feminine ? 'إحدى عشرة' : 'أحد عشر');
    else if (rem === 12) parts.push(feminine ? 'اثنتا عشرة' : 'اثنا عشر');
    else if (rem > 12 && rem < 20) {
      const unit = rem % 10;
      parts.push(`${(feminine ? ONES_F : ONES_M)[unit]} ${feminine ? 'عشرة' : 'عشر'}`);
    } else {
      const u = rem % 10;
      const t = Math.floor(rem / 10);
      const onesArr = feminine ? ONES_F : ONES_M;
      if (u > 0 && t > 0) parts.push(`${onesArr[u]} و${TENS[t]}`);
      else if (u > 0) parts.push(onesArr[u]);
      else if (t > 0) parts.push(TENS[t]);
    }
  }
  return parts.join(' و');
}

function integerToArabicWords(num: number): string {
  if (num === 0) return 'صفر';
  const scales = [
    { val: 1_000_000_000, singular: 'مليار', dual: 'ملياران', plural: 'مليارات' },
    { val: 1_000_000, singular: 'مليون', dual: 'مليونان', plural: 'ملايين' },
    { val: 1_000, singular: 'ألف', dual: 'ألفان', plural: 'آلاف' },
  ];

  let remaining = Math.floor(num);
  const segments: string[] = [];

  for (const s of scales) {
    const count = Math.floor(remaining / s.val);
    if (count > 0) {
      remaining %= s.val;
      if (count === 1) segments.push(s.singular);
      else if (count === 2) segments.push(s.dual);
      else if (count >= 3 && count <= 10) segments.push(`${convertBelow1000Ar(count, false)} ${s.plural}`);
      else segments.push(`${convertBelow1000Ar(count, false)} ${s.singular}`);
    }
  }

  if (remaining > 0) {
    segments.push(convertBelow1000Ar(remaining, false));
  }

  return segments.join(' و');
}

function pickCurrencyUnitAr(
  count: number,
  forms: { s: string; d: string; p: string; acc: string }
): string {
  const mod100 = count % 100;
  if (count === 1) return forms.s;
  if (count === 2) return forms.d;
  if (mod100 >= 3 && mod100 <= 10) return forms.p;
  return forms.acc;
}

const EN_ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
];
const EN_TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function below1000En(n: number): string {
  const parts: string[] = [];
  if (n >= 100) {
    parts.push(`${EN_ONES[Math.floor(n / 100)]} Hundred`);
    n %= 100;
  }
  if (n >= 20) {
    const t = EN_TENS[Math.floor(n / 10)];
    const o = EN_ONES[n % 10];
    parts.push(o ? `${t}-${o}` : t);
  } else if (n > 0) {
    parts.push(EN_ONES[n]);
  }
  return parts.join(' ');
}

function integerToEnglishWords(num: number): string {
  if (num === 0) return 'Zero';
  const scales = [
    { val: 1_000_000_000, name: 'Billion' },
    { val: 1_000_000, name: 'Million' },
    { val: 1_000, name: 'Thousand' },
  ];
  let rem = Math.floor(num);
  const out: string[] = [];
  for (const s of scales) {
    const q = Math.floor(rem / s.val);
    if (q > 0) {
      rem %= s.val;
      out.push(`${below1000En(q)} ${s.name}`);
    }
  }
  if (rem > 0) out.push(below1000En(rem));
  return out.join(' ');
}

export function NumberToWords({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [inputStr, setInputStr] = useState('1235.50');
  const [currency, setCurrency] = useState<CurrencyChoice>('egp');
  const [includeOnly, setIncludeOnly] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const num = parseFloat(inputStr);
    if (!Number.isFinite(num) || num < 0 || num > 999_999_999_999.99) {
      return {
        error: isAr
          ? 'يرجى إدخال رقم صحيح أو عشري بين 0 و 999 ملياراً'
          : 'Please enter a valid number between 0 and 999 billion',
      };
    }

    const intPart = Math.floor(num);
    const fracPart = Math.round((num - intPart) * 100);

    if (isAr) {
      const currencyMap = {
        egp: {
          main: { s: 'جنيه مصري', d: 'جنيهان مصريان', p: 'جنيهات مصرية', acc: 'جنيهاً مصرياً' },
          sub: { s: 'قرش', d: 'قرشان', p: 'قروش', acc: 'قرشاً' },
        },
        sar: {
          main: { s: 'ريال سعودي', d: 'ريالان سعوديان', p: 'ريالات سعودية', acc: 'ريالاً سعودياً' },
          sub: { s: 'هللة', d: 'هللتان', p: 'هللات', acc: 'هللة' },
        },
        aed: {
          main: { s: 'درهم إماراتي', d: 'درهمان إماراتيان', p: 'دراهم إماراتية', acc: 'درهماً إماراتياً' },
          sub: { s: 'فلس', d: 'فلسان', p: 'فلوس', acc: 'فلساً' },
        },
        usd: {
          main: { s: 'دولار أمريكي', d: 'دولاران أمريكيان', p: 'دولارات أمريكية', acc: 'دولاراً أمريكياً' },
          sub: { s: 'سنت', d: 'سنتان', p: 'سنتات', acc: 'سنتاً' },
        },
      };

      const intWords = integerToArabicWords(intPart);
      if (currency === 'none') {
        const res = fracPart > 0 ? `${intWords} فاصلة ${integerToArabicWords(fracPart)}` : intWords;
        return { text: res };
      }

      const cDef = currencyMap[currency];
      const mainStr =
        intPart > 0 ? `${intWords} ${pickCurrencyUnitAr(intPart, cDef.main)}` : '';
      const subStr =
        fracPart > 0
          ? `${integerToArabicWords(fracPart)} ${pickCurrencyUnitAr(fracPart, cDef.sub)}`
          : '';

      const combined = [mainStr, subStr].filter(Boolean).join(' و') || `صفر ${cDef.main.acc}`;
      return { text: includeOnly ? `فقط ${combined} لا غير` : combined };
    } else {
      const enCurr = {
        egp: { main: 'Egyptian Pounds', sub: 'Piasters' },
        sar: { main: 'Saudi Riyals', sub: 'Halalas' },
        aed: { main: 'UAE Dirhams', sub: 'Fils' },
        usd: { main: 'US Dollars', sub: 'Cents' },
      };
      const intWords = integerToEnglishWords(intPart);
      if (currency === 'none') {
        const res = fracPart > 0 ? `${intWords} Point ${integerToEnglishWords(fracPart)}` : intWords;
        return { text: res };
      }
      const c = enCurr[currency];
      const mainStr = `${intWords} ${c.main}`;
      const subStr = fracPart > 0 ? ` and ${integerToEnglishWords(fracPart)} ${c.sub}` : '';
      const combined = `${mainStr}${subStr}`;
      return { text: includeOnly ? `${combined} Only` : combined };
    }
  }, [inputStr, currency, includeOnly, isAr]);

  const handleCopy = async () => {
    if (!('text' in output) || !output.text) return;
    try {
      await navigator.clipboard.writeText(output.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'أدخل الرقم أو المبلغ' : 'Enter Number or Amount'}
          </label>
          <input
            type="number"
            step="0.01"
            min={0}
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-lg font-bold font-tabular text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'العملة' : 'Currency'}
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyChoice)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-3 text-sm text-slate-900 dark:text-white"
          >
            <option value="egp">{isAr ? 'جنيه مصري (قرش)' : 'Egyptian Pound (EGP)'}</option>
            <option value="sar">{isAr ? 'ريال سعودي (هللة)' : 'Saudi Riyal (SAR)'}</option>
            <option value="aed">{isAr ? 'درهم إماراتي (فلس)' : 'UAE Dirham (AED)'}</option>
            <option value="usd">{isAr ? 'دولار أمريكي (سنت)' : 'US Dollar (USD)'}</option>
            <option value="none">{isAr ? 'رقم مجرد بدون عملة' : 'Plain Number'}</option>
          </select>
        </div>
      </div>

      {currency !== 'none' && (
        <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={includeOnly}
            onChange={(e) => setIncludeOnly(e.target.checked)}
            className="w-4 h-4 accent-violet-600"
          />
          <span>
            {isAr ? 'إضافة عبارة "فقط ... لا غير"' : 'Append formal "Only" suffix'}
          </span>
        </label>
      )}

      {/* Elegant Bank Check Voucher Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/[0.08] via-white dark:via-[#121A33] to-indigo-500/[0.08] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-dashed border-slate-300 dark:border-white/15 pb-3">
          <span>{isAr ? 'صيغة الشيك / العقد' : 'Check Voucher Preview'}</span>
          <span className="font-mono-tabular font-bold text-violet-600 dark:text-violet-300">
            #{formatNumber(inputStr || '0')}
          </span>
        </div>

        {'error' in output ? (
          <p className="text-sm text-rose-500">{output.error}</p>
        ) : (
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-900 dark:text-white">
              {output.text}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : isAr ? 'نسخ النص' : 'Copy Text'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
