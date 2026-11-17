export interface HijriDateParts {
  year: number;
  month: number;
  day: number;
}

export const HIJRI_MONTHS_AR = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

export const HIJRI_MONTHS_EN = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Ula',
  'Jumada al-Akhirah',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qadah',
  'Dhu al-Hijjah',
];

export const GREGORIAN_MONTHS_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const GREGORIAN_MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const COPTIC_MONTHS_AR = [
  'توت',
  'بابة',
  'هاتور',
  'كيهك',
  'طوبة',
  'أمشير',
  'برمهات',
  'برمودة',
  'بشنس',
  'بؤونة',
  'أبيب',
  'مسرى',
  'نسيء',
];

export const COPTIC_MONTHS_EN = [
  'Tout',
  'Baba',
  'Hator',
  'Kiahk',
  'Toba',
  'Amshir',
  'Baramhat',
  'Baramoudah',
  'Bashans',
  'Paona',
  'Epip',
  'Mesra',
  'Nasie',
];

export function gregorianToHijri(date: Date, offsetDays = 0): HijriDateParts {
  const adjusted = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + offsetDays, 12, 0, 0)
  );
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    const parts = formatter.formatToParts(adjusted);
    const day = Number(parts.find((p) => p.type === 'day')?.value || 1);
    const month = Number(parts.find((p) => p.type === 'month')?.value || 1);
    const year = Number(parts.find((p) => p.type === 'year')?.value || 1448);
    return { year, month, day };
  } catch {
    // Fallback arithmetic approximation if runtime lacks islamic-umalqura
    const jd = Math.floor(adjusted.getTime() / 86400000) + 2440588;
    let l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    const j =
      Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
      Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l =
      l -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    const month = Math.floor((24 * l) / 709);
    const day = l - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;
    return { year, month, day };
  }
}

export function hijriToGregorian(hijri: HijriDateParts, offsetDays = 0): Date {
  // Initial estimate using average lunar year (354.367 days)
  const approxDaysFromEpoch =
    Math.floor((hijri.year - 1) * 354.367 + (hijri.month - 1) * 29.53 + hijri.day) -
    492148;
  let candidate = new Date(Date.UTC(1970, 0, 1 + approxDaysFromEpoch, 12, 0, 0));

  // Refine iteratively against Intl Umm al-Qura calendar (converges in 2-4 steps)
  const targetOrdinal = hijri.year * 400 + hijri.month * 32 + hijri.day;
  for (let i = 0; i < 40; i++) {
    const current = gregorianToHijri(
      new Date(candidate.getUTCFullYear(), candidate.getUTCMonth(), candidate.getUTCDate()),
      0
    );
    const currentOrdinal = current.year * 400 + current.month * 32 + current.day;
    if (currentOrdinal === targetOrdinal) {
      break;
    }
    const diffDays =
      (hijri.year - current.year) * 354 +
      (hijri.month - current.month) * 29 +
      (hijri.day - current.day);
    const step = diffDays === 0 ? (targetOrdinal > currentOrdinal ? 1 : -1) : diffDays;
    candidate = new Date(candidate.getTime() + step * 86400000);
  }

  // Fine ±3 day scan to guarantee exact match
  for (let delta = -3; delta <= 3; delta++) {
    const test = new Date(candidate.getTime() + delta * 86400000);
    const check = gregorianToHijri(
      new Date(test.getUTCFullYear(), test.getUTCMonth(), test.getUTCDate()),
      0
    );
    if (
      check.year === hijri.year &&
      check.month === hijri.month &&
      check.day === hijri.day
    ) {
      return new Date(
        test.getUTCFullYear(),
        test.getUTCMonth(),
        test.getUTCDate() + offsetDays
      );
    }
  }

  return new Date(
    candidate.getUTCFullYear(),
    candidate.getUTCMonth(),
    candidate.getUTCDate() + offsetDays
  );
}

export function getCopticInfo(date: Date): { monthIndex: number; day: number; year: number } {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-coptic-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const day = Number(parts.find((p) => p.type === 'day')?.value || 1);
    const month = Number(parts.find((p) => p.type === 'month')?.value || 1);
    const year = Number(parts.find((p) => p.type === 'year')?.value || 1743);
    return { monthIndex: Math.max(0, Math.min(12, month - 1)), day, year };
  } catch {
    return { monthIndex: 0, day: 1, year: 1743 };
  }
}
