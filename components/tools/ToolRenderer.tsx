'use client';

import React from 'react';
import type { Locale } from '@/lib/i18n';
import { AgeCalculator } from './AgeCalculator';
import { HijriConverter } from './HijriConverter';
import { ZakatCalculator } from './ZakatCalculator';
import { PercentageCalculator } from './PercentageCalculator';
import { EgyptSalaryCalculator } from './EgyptSalaryCalculator';
import { ImageCompressor } from './ImageCompressor';
import { ImagesToPdf } from './ImagesToPdf';
import { MergePdf } from './MergePdf';
import { WordCounter } from './WordCounter';
import { PasswordGenerator } from './PasswordGenerator';
import { QrCodeGenerator } from './QrCodeGenerator';
import { UnitConverter } from './UnitConverter';
import { CurrencyConverter } from './CurrencyConverter';
import { PregnancyDueDate } from './PregnancyDueDate';
import { CalorieCalculator } from './CalorieCalculator';
import { BmiCalculator } from './BmiCalculator';
import { LoanCalculator } from './LoanCalculator';
import { DateDifference } from './DateDifference';
import { NumberToWords } from './NumberToWords';
import { ImageConverter } from './ImageConverter';
import { ArabicTextDecorator } from './ArabicTextDecorator';

export function ToolRenderer({ slug, locale }: { slug: string; locale: Locale }) {
  switch (slug) {
    case 'age-calculator':
      return <AgeCalculator locale={locale} />;
    case 'hijri-converter':
      return <HijriConverter locale={locale} />;
    case 'zakat-calculator':
      return <ZakatCalculator locale={locale} />;
    case 'percentage-calculator':
      return <PercentageCalculator locale={locale} />;
    case 'egypt-salary-calculator':
      return <EgyptSalaryCalculator locale={locale} />;
    case 'image-compressor':
      return <ImageCompressor locale={locale} />;
    case 'images-to-pdf':
      return <ImagesToPdf locale={locale} />;
    case 'merge-pdf':
      return <MergePdf locale={locale} />;
    case 'word-counter':
      return <WordCounter locale={locale} />;
    case 'password-generator':
      return <PasswordGenerator locale={locale} />;
    case 'qr-code-generator':
      return <QrCodeGenerator locale={locale} />;
    case 'unit-converter':
      return <UnitConverter locale={locale} />;
    case 'currency-converter':
      return <CurrencyConverter locale={locale} />;
    case 'pregnancy-due-date':
      return <PregnancyDueDate locale={locale} />;
    case 'calorie-calculator':
      return <CalorieCalculator locale={locale} />;
    case 'bmi-calculator':
      return <BmiCalculator locale={locale} />;
    case 'loan-calculator':
      return <LoanCalculator locale={locale} />;
    case 'date-difference':
      return <DateDifference locale={locale} />;
    case 'number-to-words':
      return <NumberToWords locale={locale} />;
    case 'image-converter':
      return <ImageConverter locale={locale} />;
    case 'arabic-text-decorator':
      return <ArabicTextDecorator locale={locale} />;
    default:
      return null;
  }
}
