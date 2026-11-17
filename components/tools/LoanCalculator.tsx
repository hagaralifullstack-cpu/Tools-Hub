'use client';

import React, { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { AnimatedNumber, RippleButton } from '@/components/MotionPrimitives';

interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function LoanCalculator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [amount, setAmount] = useState(250000);
  const [annualRate, setAnnualRate] = useState(18);
  const [rateType, setRateType] = useState<'reducing' | 'flat'>('reducing');
  const [termValue, setTermValue] = useState(36);
  const [termUnit, setTermUnit] = useState<'months' | 'years'>('months');
  const [showAllRows, setShowAllRows] = useState(false);

  const calc = useMemo(() => {
    const P = Math.max(0, amount);
    const months = Math.max(1, Math.min(360, termUnit === 'years' ? termValue * 12 : termValue));
    const r = Math.max(0, annualRate) / 100 / 12;

    const schedule: ScheduleRow[] = [];
    let monthlyPayment = 0;
    let totalInterest = 0;

    if (rateType === 'reducing') {
      if (r === 0) {
        monthlyPayment = P / months;
      } else {
        const pow = Math.pow(1 + r, months);
        monthlyPayment = (P * (r * pow)) / (pow - 1);
      }

      let balance = P;
      for (let m = 1; m <= months; m++) {
        const interest = balance * r;
        const principal = Math.min(balance, monthlyPayment - interest);
        balance = Math.max(0, balance - principal);
        totalInterest += interest;
        schedule.push({
          month: m,
          payment: principal + interest,
          principal,
          interest,
          balance,
        });
      }
    } else {
      const years = months / 12;
      totalInterest = P * (Math.max(0, annualRate) / 100) * years;
      const totalPay = P + totalInterest;
      monthlyPayment = totalPay / months;
      const monthlyPrincipal = P / months;
      const monthlyInt = totalInterest / months;
      let balance = P;
      for (let m = 1; m <= months; m++) {
        balance = Math.max(0, balance - monthlyPrincipal);
        schedule.push({
          month: m,
          payment: monthlyPayment,
          principal: monthlyPrincipal,
          interest: monthlyInt,
          balance,
        });
      }
    }

    const totalPaid = P + totalInterest;
    const principalShare = totalPaid > 0 ? (P / totalPaid) * 100 : 100;

    return {
      months,
      monthlyPayment,
      totalInterest,
      totalPaid,
      principalShare,
      schedule,
    };
  }, [amount, annualRate, rateType, termValue, termUnit]);

  const exportCsv = () => {
    const headers = isAr
      ? ['الشهر', 'القسط الشهري', 'الأصل', 'الفائدة', 'الرصيد المتبقي']
      : ['Month', 'Monthly Payment', 'Principal', 'Interest', 'Remaining Balance'];

    const lines = [
      headers.join(','),
      ...calc.schedule.map((row) =>
        [
          row.month,
          row.payment.toFixed(2),
          row.principal.toFixed(2),
          row.interest.toFixed(2),
          row.balance.toFixed(2),
        ].join(',')
      ),
    ];

    const blob = new Blob(['\uFEFF' + lines.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan-amortization-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Build SVG balance decline line path
  const linePoints = useMemo(() => {
    const pts = calc.schedule;
    if (pts.length === 0 || amount <= 0) return '0,90 280,90';
    const maxW = 280;
    const maxH = 85;
    const start = `0,5`;
    const rest = pts.map((p, idx) => {
      const x = ((idx + 1) / pts.length) * maxW;
      const y = 5 + (1 - p.balance / amount) * maxH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return [start, ...rest].join(' ');
  }, [calc.schedule, amount]);

  const r = 46;
  const circ = 2 * Math.PI * r;
  const principalDash = (calc.principalShare / 100) * circ;

  const visibleRows = showAllRows ? calc.schedule : calc.schedule.slice(0, 12);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'مبلغ القرض' : 'Loan Amount'}
          </label>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3.5 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'الفائدة السنوية (%)' : 'Annual Rate (%)'}
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3.5 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'نوع الفائدة' : 'Interest Method'}
          </label>
          <select
            value={rateType}
            onChange={(e) => setRateType(e.target.value as 'reducing' | 'flat')}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
          >
            <option value="reducing">{isAr ? 'متناقصة (Amortized)' : 'Reducing Balance'}</option>
            <option value="flat">{isAr ? 'ثابتة (Flat Rate)' : 'Flat Rate'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'المدة' : 'Term'}
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              min={1}
              max={termUnit === 'years' ? 30 : 360}
              value={termValue}
              onChange={(e) => setTermValue(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm font-tabular text-slate-900 dark:text-white"
            />
            <select
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value as 'months' | 'years')}
              className="rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-2.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="months">{isAr ? 'شهر' : 'Mo'}</option>
              <option value="years">{isAr ? 'سنة' : 'Yr'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600/15 to-cyan-500/10 border border-blue-500/30 p-5">
          <p className="text-xs text-blue-600 dark:text-cyan-300 font-semibold">
            {isAr ? 'القسط الشهري' : 'Monthly Installment'}
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-cyan-400 mt-1">
            <AnimatedNumber value={calc.monthlyPayment} decimals={2} />
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {isAr ? 'إجمالي الفوائد' : 'Total Interest'}
          </p>
          <p className="text-2xl font-extrabold text-amber-500 mt-1">
            <AnimatedNumber value={calc.totalInterest} decimals={0} />
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {isAr ? 'الإجمالي المدفوع' : 'Total Repayment'}
          </p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            <AnimatedNumber value={calc.totalPaid} decimals={0} />
          </p>
        </div>
      </div>

      {/* Dual Charts: Donut + Balance Decline Curve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-center gap-5">
          <svg viewBox="0 0 110 110" className="w-24 h-24 shrink-0 -rotate-90">
            <circle cx="55" cy="55" r={r} fill="none" stroke="#F59E0B" strokeWidth="12" />
            <circle
              cx="55"
              cy="55"
              r={r}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="12"
              strokeDasharray={`${principalDash} ${circ}`}
            />
          </svg>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>
                {isAr ? 'أصل القرض' : 'Principal'}:{' '}
                <strong className="font-tabular">
                  {formatNumber(Number(calc.principalShare.toFixed(1)))}%
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>
                {isAr ? 'الفوائد' : 'Interest'}:{' '}
                <strong className="font-tabular">
                  {formatNumber(Number((100 - calc.principalShare).toFixed(1)))}%
                </strong>
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-2">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {isAr ? 'منحنى تناقص الرصيد المتبقي' : 'Remaining Balance Over Time'}
          </p>
          <svg viewBox="0 0 280 95" className="w-full h-24 overflow-visible">
            <polyline
              fill="none"
              stroke="#22D3EE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints}
            />
          </svg>
        </div>
      </div>

      {/* Schedule Header + CSV Export */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {isAr
            ? `جدول السداد الشهري (${formatNumber(calc.months)} شهراً)`
            : `Amortization Schedule (${calc.months} Months)`}
        </h3>
        <RippleButton
          onClick={exportCsv}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
        </RippleButton>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-3 text-start">#</th>
              <th className="p-3 text-end">{isAr ? 'القسط' : 'Payment'}</th>
              <th className="p-3 text-end">{isAr ? 'الأصل' : 'Principal'}</th>
              <th className="p-3 text-end">{isAr ? 'الفائدة' : 'Interest'}</th>
              <th className="p-3 text-end">{isAr ? 'المتبقي' : 'Balance'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06] font-tabular">
            {visibleRows.map((row) => (
              <tr key={row.month}>
                <td className="p-3 text-start">{formatNumber(row.month)}</td>
                <td className="p-3 text-end font-semibold">{formatNumber(Math.round(row.payment))}</td>
                <td className="p-3 text-end text-blue-600 dark:text-blue-400">
                  {formatNumber(Math.round(row.principal))}
                </td>
                <td className="p-3 text-end text-amber-500">
                  {formatNumber(Math.round(row.interest))}
                </td>
                <td className="p-3 text-end text-slate-600 dark:text-slate-300">
                  {formatNumber(Math.round(row.balance))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {calc.schedule.length > 12 && (
        <button
          type="button"
          onClick={() => setShowAllRows((v) => !v)}
          className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer"
        >
          {showAllRows
            ? isAr
              ? 'عرض أول 12 شهراً فقط'
              : 'Show first 12 months only'
            : isAr
            ? `عرض جميع الأشهر (${formatNumber(calc.schedule.length)})`
            : `Show all ${calc.schedule.length} months`}
        </button>
      )}
    </div>
  );
}
