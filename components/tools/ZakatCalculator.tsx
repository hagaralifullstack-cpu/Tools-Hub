'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';
import { triggerCelebration } from '@/lib/confetti';

function ZakatInputField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        min={0}
        step="any"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3.5 py-2.5 text-sm font-tabular text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
      />
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

export function ZakatCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [goldPrice24, setGoldPrice24] = useState(4200);
  const [cash, setCash] = useState(150000);
  const [gold24Grams, setGold24Grams] = useState(0);
  const [gold21Grams, setGold21Grams] = useState(20);
  const [gold18Grams, setGold18Grams] = useState(0);
  const [silverGrams, setSilverGrams] = useState(0);
  const [silverPrice, setSilverPrice] = useState(55);
  const [tradeGoods, setTradeGoods] = useState(50000);
  const [receivables, setReceivables] = useState(0);
  const [debtsOwed, setDebtsOwed] = useState(10000);

  const summary = useMemo(() => {
    const safeGoldPrice = Math.max(0, goldPrice24);
    const nisabValue = safeGoldPrice * 85;

    const pureGoldGrams =
      Math.max(0, gold24Grams) +
      Math.max(0, gold21Grams) * (21 / 24) +
      Math.max(0, gold18Grams) * (18 / 24);
    const goldValue = pureGoldGrams * safeGoldPrice;
    const silverValue = Math.max(0, silverGrams) * Math.max(0, silverPrice);

    const totalAssets =
      Math.max(0, cash) +
      goldValue +
      silverValue +
      Math.max(0, tradeGoods) +
      Math.max(0, receivables);

    const netWealth = Math.max(0, totalAssets - Math.max(0, debtsOwed));
    const eligible = safeGoldPrice > 0 && netWealth >= nisabValue;
    const zakatDue = eligible ? netWealth * 0.025 : 0;
    const progressPct = nisabValue > 0 ? Math.min(100, (netWealth / nisabValue) * 100) : 0;

    return {
      nisabValue,
      pureGoldGrams,
      goldValue,
      silverValue,
      totalAssets,
      netWealth,
      eligible,
      zakatDue,
      progressPct,
    };
  }, [
    goldPrice24,
    cash,
    gold24Grams,
    gold21Grams,
    gold18Grams,
    silverGrams,
    silverPrice,
    tradeGoods,
    receivables,
    debtsOwed,
  ]);

  useEffect(() => {
    if (summary.eligible && summary.zakatDue > 0) {
      triggerCelebration('zakat-calculated');
    }
  }, [summary.eligible, summary.zakatDue]);

  return (
    <div className="space-y-6">
      {/* Islamic Geometric Ornamental Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-amber-950/80 p-5 text-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="absolute end-3 top-1/2 -translate-y-1/2 w-24 h-24 opacity-20 pointer-events-none"
        >
          <polygon
            points="60,8 73,42 108,42 80,64 90,98 60,78 30,98 40,64 12,42 47,42"
            stroke="#F5B942"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="60" cy="60" r="26" stroke="#10B981" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-amber-300 font-semibold">
              {isAr ? 'قيمة النصاب (85 جرام ذهب عيار 24)' : 'Nisab Threshold (85g of 24K Gold)'}
            </p>
            <p className="text-2xl font-extrabold font-tabular mt-0.5">
              <AnimatedNumber value={summary.nisabValue} decimals={0} />
            </p>
          </div>
          <div className="sm:text-end">
            <p className="text-xs text-emerald-200">
              {isAr ? 'مقدار الزكاة المستحقة (2.5%)' : 'Annual Zakat Due (2.5%)'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-tabular mt-0.5">
              <AnimatedNumber value={summary.zakatDue} decimals={2} />
            </p>
          </div>
        </div>

        {/* Nisab Progress Meter */}
        <div className="relative z-10 mt-4">
          <div className="flex items-center justify-between text-xs text-emerald-100 mb-1.5">
            <span>
              {isAr ? 'نسبة الاقتراب من النصاب' : 'Progress toward Nisab'}
            </span>
            <span className="font-tabular">{formatNumber(Math.round(summary.progressPct))}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-black/35 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
              style={{ width: `${summary.progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ZakatInputField
          label={isAr ? 'سعر جرام الذهب عيار 24 (بـ عملتك)' : '24K Gold Price / Gram'}
          value={goldPrice24}
          onChange={setGoldPrice24}
          hint={isAr ? 'أساس حساب النصاب الشرعي' : 'Used to compute the 85g Nisab'}
        />
        <ZakatInputField
          label={isAr ? 'النقد والودائع البنكية' : 'Cash & Bank Savings'}
          value={cash}
          onChange={setCash}
        />
        <ZakatInputField
          label={isAr ? 'عروض التجارة (البضائع المعدة للبيع)' : 'Business Trade Inventory'}
          value={tradeGoods}
          onChange={setTradeGoods}
        />
        <ZakatInputField
          label={isAr ? 'ذهب عيار 24 (جرام)' : '24K Gold (grams)'}
          value={gold24Grams}
          onChange={setGold24Grams}
        />
        <ZakatInputField
          label={isAr ? 'ذهب عيار 21 (جرام)' : '21K Gold (grams)'}
          value={gold21Grams}
          onChange={setGold21Grams}
        />
        <ZakatInputField
          label={isAr ? 'ذهب عيار 18 (جرام)' : '18K Gold (grams)'}
          value={gold18Grams}
          onChange={setGold18Grams}
        />
        <ZakatInputField
          label={isAr ? 'الفضة (جرام)' : 'Silver (grams)'}
          value={silverGrams}
          onChange={setSilverGrams}
        />
        <ZakatInputField
          label={isAr ? 'سعر جرام الفضة' : 'Silver Price / Gram'}
          value={silverPrice}
          onChange={setSilverPrice}
        />
        <ZakatInputField
          label={isAr ? 'ديون مرجوة لك عند الغير' : 'Recoverable Receivables'}
          value={receivables}
          onChange={setReceivables}
        />
        <ZakatInputField
          label={isAr ? 'ديون مستحقة عليك (تُخصم)' : 'Immediate Debts Owed (Deducted)'}
          value={debtsOwed}
          onChange={setDebtsOwed}
        />
      </div>

      {/* Verdict & Itemized Breakdown */}
      <div
        className={`rounded-2xl border p-5 flex items-start gap-3 ${
          summary.eligible
            ? 'border-emerald-500/35 bg-emerald-500/10'
            : 'border-amber-500/35 bg-amber-500/10'
        }`}
      >
        {summary.eligible ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        )}
        <div className="space-y-2 flex-1">
          <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            {summary.eligible
              ? isAr
                ? 'بلغ مالك النصاب الشرعي، وتجب فيه الزكاة عند تمام الحول الهجري.'
                : 'Your net wealth meets or exceeds the Nisab threshold (2.5% Zakat applies upon completing one lunar year).'
              : isAr
              ? 'صافي مالك لم يبلغ حد النصاب بعد، فلا زكاة واجبة عليه حالياً.'
              : 'Your net wealth is currently below the 85g gold Nisab threshold.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                {isAr ? 'قيمة الذهب الصافي:' : 'Gold Value:'}
              </span>
              <p className="font-bold text-slate-900 dark:text-white font-tabular">
                {formatNumber(Math.round(summary.goldValue))}
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                {isAr ? 'قيمة الفضة:' : 'Silver Value:'}
              </span>
              <p className="font-bold text-slate-900 dark:text-white font-tabular">
                {formatNumber(Math.round(summary.silverValue))}
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                {isAr ? 'إجمالي الأصول:' : 'Gross Assets:'}
              </span>
              <p className="font-bold text-slate-900 dark:text-white font-tabular">
                {formatNumber(Math.round(summary.totalAssets))}
              </p>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                {isAr ? 'صافي وعاء الزكاة:' : 'Net Zakatable:'}
              </span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 font-tabular">
                {formatNumber(Math.round(summary.netWealth))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarly Disclaimer */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        {isAr
          ? 'تنبيه شرعي: هذه الحاسبة استرشادية لتقريب الحساب، وتختلف بعض التفاصيل الفقهية (مثل زكاة الحلي الملبوس والأسهم والزروع) حسب المذاهب والحالات؛ لذا يُنصح بسؤال أهل العلم عند الحاجة.'
          : 'Note: This calculator provides an informational estimate. Specific rulings (such as personal worn jewelry, stocks, or agricultural assets) vary—please consult a qualified Islamic scholar for personal cases.'}
      </p>
    </div>
  );
}
