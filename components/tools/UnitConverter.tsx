'use client';

import React, { useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';

type UnitCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'data'
  | 'time';

interface UnitDef {
  id: string;
  ar: string;
  en: string;
  factor: number; // relative to base unit (ignored for temperature)
}

const UNIT_DATA: Record<
  UnitCategory,
  { ar: string; en: string; units: UnitDef[] }
> = {
  length: {
    ar: 'الطول',
    en: 'Length',
    units: [
      { id: 'm', ar: 'متر (m)', en: 'Meter (m)', factor: 1 },
      { id: 'km', ar: 'كيلومتر (km)', en: 'Kilometer (km)', factor: 1000 },
      { id: 'cm', ar: 'سنتيمتر (cm)', en: 'Centimeter (cm)', factor: 0.01 },
      { id: 'mm', ar: 'ملليمتر (mm)', en: 'Millimeter (mm)', factor: 0.001 },
      { id: 'mi', ar: 'ميل (mi)', en: 'Mile (mi)', factor: 1609.344 },
      { id: 'yd', ar: 'ياردة (yd)', en: 'Yard (yd)', factor: 0.9144 },
      { id: 'ft', ar: 'قدم (ft)', en: 'Foot (ft)', factor: 0.3048 },
      { id: 'in', ar: 'بوصة (in)', en: 'Inch (in)', factor: 0.0254 },
    ],
  },
  weight: {
    ar: 'الوزن',
    en: 'Weight',
    units: [
      { id: 'kg', ar: 'كيلوجرام (kg)', en: 'Kilogram (kg)', factor: 1 },
      { id: 'g', ar: 'جرام (g)', en: 'Gram (g)', factor: 0.001 },
      { id: 'mg', ar: 'ملليجرام (mg)', en: 'Milligram (mg)', factor: 0.000001 },
      { id: 't', ar: 'طن متري (t)', en: 'Metric Ton (t)', factor: 1000 },
      { id: 'lb', ar: 'باوند / رطل (lb)', en: 'Pound (lb)', factor: 0.45359237 },
      { id: 'oz', ar: 'أوقية / أونصة (oz)', en: 'Ounce (oz)', factor: 0.0283495231 },
    ],
  },
  temperature: {
    ar: 'الحرارة',
    en: 'Temperature',
    units: [
      { id: 'c', ar: 'مئوية (°C)', en: 'Celsius (°C)', factor: 1 },
      { id: 'f', ar: 'فهرنهايت (°F)', en: 'Fahrenheit (°F)', factor: 1 },
      { id: 'k', ar: 'كلفن (K)', en: 'Kelvin (K)', factor: 1 },
    ],
  },
  area: {
    ar: 'المساحة',
    en: 'Area',
    units: [
      { id: 'm2', ar: 'متر مربع (m²)', en: 'Square Meter (m²)', factor: 1 },
      { id: 'km2', ar: 'كيلومتر مربع (km²)', en: 'Square Kilometer (km²)', factor: 1_000_000 },
      { id: 'cm2', ar: 'سنتيمتر مربع (cm²)', en: 'Square Centimeter (cm²)', factor: 0.0001 },
      { id: 'ha', ar: 'هكتار (ha)', en: 'Hectare (ha)', factor: 10000 },
      { id: 'acre', ar: 'فدان إنجليزي / أكر', en: 'Acre', factor: 4046.8564 },
      { id: 'ft2', ar: 'قدم مربع (ft²)', en: 'Square Foot (ft²)', factor: 0.09290304 },
    ],
  },
  volume: {
    ar: 'الحجم',
    en: 'Volume',
    units: [
      { id: 'l', ar: 'لتر (L)', en: 'Liter (L)', factor: 1 },
      { id: 'ml', ar: 'ملليلتر (mL)', en: 'Milliliter (mL)', factor: 0.001 },
      { id: 'm3', ar: 'متر مكعب (m³)', en: 'Cubic Meter (m³)', factor: 1000 },
      { id: 'gal', ar: 'جالون أمريكي (gal)', en: 'US Gallon (gal)', factor: 3.78541178 },
      { id: 'cup', ar: 'كوب قياسي (cup)', en: 'Cup', factor: 0.236588236 },
    ],
  },
  speed: {
    ar: 'السرعة',
    en: 'Speed',
    units: [
      { id: 'kmh', ar: 'كم/ساعة (km/h)', en: 'km/h', factor: 1 / 3.6 },
      { id: 'ms', ar: 'متر/ثانية (m/s)', en: 'm/s', factor: 1 },
      { id: 'mph', ar: 'ميل/ساعة (mph)', en: 'mph', factor: 0.44704 },
      { id: 'knot', ar: 'عقدة (knot)', en: 'Knot', factor: 0.514444 },
    ],
  },
  data: {
    ar: 'البيانات',
    en: 'Data',
    units: [
      { id: 'mb', ar: 'ميجابايت (MB)', en: 'Megabyte (MB)', factor: 1024 * 1024 },
      { id: 'gb', ar: 'جيجابايت (GB)', en: 'Gigabyte (GB)', factor: 1024 * 1024 * 1024 },
      { id: 'tb', ar: 'تيرابايت (TB)', en: 'Terabyte (TB)', factor: 1024 ** 4 },
      { id: 'kb', ar: 'كيلوبايت (KB)', en: 'Kilobyte (KB)', factor: 1024 },
      { id: 'b', ar: 'بايت (B)', en: 'Byte (B)', factor: 1 },
    ],
  },
  time: {
    ar: 'الوقت',
    en: 'Time',
    units: [
      { id: 'hr', ar: 'ساعة', en: 'Hour', factor: 3600 },
      { id: 'min', ar: 'دقيقة', en: 'Minute', factor: 60 },
      { id: 'sec', ar: 'ثانية', en: 'Second', factor: 1 },
      { id: 'day', ar: 'يوم', en: 'Day', factor: 86400 },
      { id: 'wk', ar: 'أسبوع', en: 'Week', factor: 604800 },
    ],
  },
};

function convertValue(
  category: UnitCategory,
  val: number,
  fromId: string,
  toId: string
): number {
  if (!Number.isFinite(val)) return 0;
  if (fromId === toId) return val;

  if (category === 'temperature') {
    let celsius = val;
    if (fromId === 'f') celsius = (val - 32) * (5 / 9);
    else if (fromId === 'k') celsius = val - 273.15;

    if (toId === 'c') return celsius;
    if (toId === 'f') return celsius * (9 / 5) + 32;
    return celsius + 273.15;
  }

  const units = UNIT_DATA[category].units;
  const fromUnit = units.find((u) => u.id === fromId);
  const toUnit = units.find((u) => u.id === toId);
  if (!fromUnit || !toUnit) return val;
  const baseVal = val * fromUnit.factor;
  return baseVal / toUnit.factor;
}

export function UnitConverter({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('km');
  const [toUnit, setToUnit] = useState('mi');
  const [fromVal, setFromVal] = useState('10');

  const handleCategoryChange = (nextCat: UnitCategory) => {
    setCategory(nextCat);
    const list = UNIT_DATA[nextCat].units;
    setFromUnit(list[0].id);
    setToUnit(list[1]?.id || list[0].id);
    setFromVal('1');
  };

  const numericFrom = parseFloat(fromVal);
  const numericTo = useMemo(
    () =>
      Number.isFinite(numericFrom)
        ? convertValue(category, numericFrom, fromUnit, toUnit)
        : 0,
    [category, numericFrom, fromUnit, toUnit]
  );

  const handleToChange = (valStr: string) => {
    const num = parseFloat(valStr);
    if (!Number.isFinite(num)) {
      setFromVal('');
      return;
    }
    const rev = convertValue(category, num, toUnit, fromUnit);
    setFromVal(String(Number(rev.toPrecision(8))));
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const currentUnits = UNIT_DATA[category].units;
  const quickValues = [1, 5, 10, 50, 100];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
        {(Object.keys(UNIT_DATA) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            type="button"
            onClick={() => handleCategoryChange(catKey)}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              category === catKey
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isAr ? UNIT_DATA[catKey].ar : UNIT_DATA[catKey].en}
          </button>
        ))}
      </div>

      {/* Bidirectional Converter */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        <div className="md:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4 space-y-3">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white"
          >
            {currentUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {isAr ? u.ar : u.en}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            value={fromVal}
            onChange={(e) => setFromVal(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-4 py-3 text-xl font-bold font-tabular text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            aria-label={isAr ? 'تبديل الوحدتين' : 'Swap units'}
            className="p-3 rounded-full bg-amber-500/15 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all hover:rotate-180 duration-300 cursor-pointer"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        <div className="md:col-span-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white"
          >
            {currentUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {isAr ? u.ar : u.en}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            value={Number.isFinite(numericFrom) ? Number(numericTo.toPrecision(8)) : ''}
            onChange={(e) => handleToChange(e.target.value)}
            className="w-full rounded-xl border border-amber-500/30 bg-white dark:bg-[#0B1020] px-4 py-3 text-xl font-bold font-tabular text-amber-600 dark:text-amber-400 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Common Conversions Reference Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200">
          {isAr ? 'جدول التحويلات السريعة' : 'Quick Reference Conversions'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-white/[0.06] rtl:divide-x-reverse">
          {quickValues.map((v) => {
            const converted = convertValue(category, v, fromUnit, toUnit);
            return (
              <div key={v} className="p-3 text-center text-xs font-tabular">
                <span className="text-slate-500 dark:text-slate-400">
                  {formatNumber(v)} {fromUnit.toUpperCase()}
                </span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatNumber(Number(converted.toPrecision(5)))} {toUnit.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
