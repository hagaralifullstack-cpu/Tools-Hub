'use client';

import React, { useMemo, useState } from 'react';
import { EGYPT_PAYROLL_RATES } from '@/config/rates';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber } from '@/components/MotionPrimitives';

export function EgyptSalaryCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [grossMonthly, setGrossMonthly] = useState(15000);
  const [allowancesMonthly, setAllowancesMonthly] = useState(1000);
  const [applyExemption, setApplyExemption] = useState(true);

  const calc = useMemo(() => {
    const gross = Math.max(0, grossMonthly);
    const allowances = Math.max(0, allowancesMonthly);
    const totalMonthlyPackage = gross + allowances;

    const { socialInsurance, annualPersonalExemption, standardBrackets } =
      EGYPT_PAYROLL_RATES;

    // Insurable wage capped between statutory floor and ceiling
    const insurableBase =
      gross > 0
        ? Math.min(
            socialInsurance.maxMonthlyInsurableWage,
            Math.max(socialInsurance.minMonthlyInsurableWage, gross)
          )
        : 0;

    const monthlyInsurance = insurableBase * socialInsurance.employeeRate;
    const annualInsurance = monthlyInsurance * 12;

    const annualGross = totalMonthlyPackage * 12;
    const personalExemption = applyExemption ? annualPersonalExemption : 0;
    const taxableAnnual = Math.max(0, annualGross - annualInsurance - personalExemption);

    let remaining = taxableAnnual;
    let prevCap = 0;
    let annualTax = 0;
    const bracketRows: Array<{
      label: string;
      taxableAmount: number;
      taxAmount: number;
      rate: number;
    }> = [];

    for (const b of standardBrackets) {
      const span = b.upTo === null ? Infinity : b.upTo - prevCap;
      const inBracket = Math.max(0, Math.min(remaining, span));
      const taxInBracket = inBracket * b.rate;
      remaining -= inBracket;
      annualTax += taxInBracket;
      if (b.upTo !== null) prevCap = b.upTo;
      bracketRows.push({
        label: isAr ? b.labelAr : b.labelEn,
        taxableAmount: inBracket,
        taxAmount: taxInBracket,
        rate: b.rate,
      });
    }

    const monthlyTax = annualTax / 12;
    const monthlyNet = Math.max(0, totalMonthlyPackage - monthlyInsurance - monthlyTax);
    const annualNet = monthlyNet * 12;

    const netPct = totalMonthlyPackage > 0 ? (monthlyNet / totalMonthlyPackage) * 100 : 100;
    const taxPct = totalMonthlyPackage > 0 ? (monthlyTax / totalMonthlyPackage) * 100 : 0;
    const insPct = totalMonthlyPackage > 0 ? (monthlyInsurance / totalMonthlyPackage) * 100 : 0;

    return {
      totalMonthlyPackage,
      monthlyInsurance,
      annualInsurance,
      monthlyTax,
      annualTax,
      monthlyNet,
      annualNet,
      taxableAnnual,
      netPct,
      taxPct,
      insPct,
      bracketRows,
    };
  }, [grossMonthly, allowancesMonthly, applyExemption, isAr]);

  const currencyLabel = isAr ? ' ج.م' : ' EGP';

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'الراتب الأساسي الشهري (ج.م)' : 'Monthly Base Salary (EGP)'}
          </label>
          <input
            type="number"
            min={0}
            value={grossMonthly}
            onChange={(e) => setGrossMonthly(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'بدلات وحوافز شهرية (ج.م)' : 'Monthly Allowances (EGP)'}
          </label>
          <input
            type="number"
            min={0}
            value={allowancesMonthly}
            onChange={(e) => setAllowancesMonthly(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm font-tabular text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={applyExemption}
            onChange={(e) => setApplyExemption(e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
            {isAr ? 'تطبيق الإعفاء الشخصي السنوي' : 'Apply Personal Exemption'}
          </span>
        </label>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 p-5">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
            {isAr ? 'صافي الراتب الشهري' : 'Monthly Net Pay'}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            <AnimatedNumber value={calc.monthlyNet} decimals={0} suffix={currencyLabel} />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-tabular">
            {isAr ? 'سنوياً: ' : 'Annual: '}
            {formatNumber(Math.round(calc.annualNet))} {currencyLabel}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/30 p-5">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {isAr ? 'التأمينات الاجتماعية (11%)' : 'Social Insurance (11%)'}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            <AnimatedNumber value={calc.monthlyInsurance} decimals={0} suffix={currencyLabel} />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-tabular">
            {isAr ? 'سنوياً: ' : 'Annual: '}
            {formatNumber(Math.round(calc.annualInsurance))} {currencyLabel}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/30 p-5">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
            {isAr ? 'ضريبة كسب العمل الشهرية' : 'Monthly Income Tax'}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            <AnimatedNumber value={calc.monthlyTax} decimals={0} suffix={currencyLabel} />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-tabular">
            {isAr ? 'سنوياً: ' : 'Annual: '}
            {formatNumber(Math.round(calc.annualTax))} {currencyLabel}
          </p>
        </div>
      </div>

      {/* Animated Bar Distribution */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700 dark:text-slate-200">
            {isAr ? 'توزيع الراتب الإجمالي' : 'Gross Package Breakdown'}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-tabular">
            {formatNumber(Math.round(calc.totalMonthlyPackage))} {currencyLabel}
          </span>
        </div>
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-white/10">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${calc.netPct}%` }}
            title={isAr ? 'الصافي' : 'Net'}
          />
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${calc.insPct}%` }}
            title={isAr ? 'التأمينات' : 'Insurance'}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${calc.taxPct}%` }}
            title={isAr ? 'الضريبة' : 'Tax'}
          />
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300 font-tabular">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            {isAr ? 'صافي' : 'Net'}: {formatNumber(Number(calc.netPct.toFixed(1)))}%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            {isAr ? 'تأمينات' : 'Insurance'}: {formatNumber(Number(calc.insPct.toFixed(1)))}%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            {isAr ? 'ضريبة' : 'Tax'}: {formatNumber(Number(calc.taxPct.toFixed(1)))}%
          </span>
        </div>
      </div>

      {/* Bracket Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
        <table className="w-full text-xs sm:text-sm text-start">
          <thead className="bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-3 text-start font-semibold">
                {isAr ? 'الشريحة الضريبية السنوية' : 'Annual Tax Bracket'}
              </th>
              <th className="p-3 text-end font-semibold">
                {isAr ? 'المبلغ الخاضع' : 'Taxable Portion'}
              </th>
              <th className="p-3 text-end font-semibold">
                {isAr ? 'الضريبة السنوية' : 'Annual Tax'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
            {calc.bracketRows
              .filter((r) => r.taxableAmount > 0 || r.rate === 0)
              .map((row) => (
                <tr key={row.label}>
                  <td className="p-3 text-slate-800 dark:text-slate-200">{row.label}</td>
                  <td className="p-3 text-end font-tabular text-slate-600 dark:text-slate-300">
                    {formatNumber(Math.round(row.taxableAmount))}
                  </td>
                  <td className="p-3 text-end font-tabular font-semibold text-slate-900 dark:text-white">
                    {formatNumber(Math.round(row.taxAmount))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {isAr
          ? 'تنبيه هام: هذه النتائج تقديرية استرشادية وفق الشرائح والحدود التأمينية القابلة للتحديث سنوياً؛ يُرجى مراجعة إدارة الموارد البشرية أو القانون الضريبي الساري للاعتماد الرسمي.'
          : 'Disclaimer: Calculations are indicative estimates using configurable statutory thresholds; always verify official payroll deductions against current Egyptian tax and NOSI law.'}
      </p>
    </div>
  );
}
