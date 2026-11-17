export type NumeralMode = 'western' | 'arabic';

const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toEasternDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => EASTERN_ARABIC_DIGITS[Number(d)]);
}

export function toWesternDigits(input: string): string {
  return input
    .replace(/[٠-٩]/g, (d) => String(EASTERN_ARABIC_DIGITS.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));
}

export function formatNumeral(
  value: string | number,
  mode: NumeralMode = 'western',
  options?: Intl.NumberFormatOptions
): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return '0';
    const formatted = new Intl.NumberFormat('en-US', options).format(value);
    return mode === 'arabic' ? toEasternDigits(formatted) : formatted;
  }
  return mode === 'arabic' ? toEasternDigits(value) : value;
}
