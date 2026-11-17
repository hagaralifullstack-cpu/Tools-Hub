/**
 * ============================================================================
 * إعدادات ضريبة كسب العمل والتأمينات الاجتماعية في مصر
 * Egypt Income Tax Brackets & Social Insurance Configuration
 * ============================================================================
 *
 * تنبيه هام: يجب مراجعة هذه الشرائح والحدود التأمينية مع أحدث التعديلات
 * التشريعية لقانون الضريبة على الدخل (قانون رقم 91 لسنة 2005 وتعديلاته)
 * وقانون التأمينات الاجتماعية والمعاشات (قانون رقم 148 لسنة 2019) والقرارات
 * السنوية للهيئة القومية للتأمين الاجتماعي قبل الاعتماد الرسمي.
 *
 * IMPORTANT: Review these tax brackets and social insurance caps against the
 * latest Egyptian Income Tax Law amendments and National Organization for
 * Social Insurance (NOSI) annual thresholds before official payroll use.
 */

export interface TaxBracket {
  /** الحد الأقصى السنوي للشريحة بالجنيه المصري (null للشريحة المفتوحة) */
  upTo: number | null;
  /** نسبة الضريبة (مثال: 0.10 تعني 10%) */
  rate: number;
  /** وصف الشريحة بالعربية */
  labelAr: string;
  /** Bracket description in English */
  labelEn: string;
}

export const EGYPT_PAYROLL_RATES = {
  /** سنة الأساس الاسترشادية */
  referenceYear: 2026,

  /** الإعفاء الشخصي السنوي للموظفين بالجنيه المصري */
  annualPersonalExemption: 20000,

  /**
   * التأمينات الاجتماعية - حصة الموظف والحدود التأمينية الشهرية
   * ترتفع حدود أجر الاشتراك التأميني سنوياً في يناير بنسبة تقارب 15%
   */
  socialInsurance: {
    employeeRate: 0.11, // 11% حصة العامل
    employerRate: 0.1875, // 18.75% حصة صاحب العمل (للمعلومية)
    minMonthlyInsurableWage: 2700, // الحد الأدنى لأجر الاشتراك التأميني الشهري
    maxMonthlyInsurableWage: 16700, // الحد الأقصى لأجر الاشتراك التأميني الشهري
  },

  /**
   * شرائح ضريبة الدخل السنوية (الشريحة الأساسية لمن لا يتجاوز دخله 600,000 جنيه)
   * ملاحظة: تبدأ الشريحة المعفاة من 40,000 جنيه بعد التعديلات الأخيرة
   */
  standardBrackets: [
    {
      upTo: 40000,
      rate: 0,
      labelAr: 'حتى 40,000 ج.م (معفاة)',
      labelEn: 'Up to 40,000 EGP (Exempt)',
    },
    {
      upTo: 55000,
      rate: 0.1,
      labelAr: 'من 40,001 إلى 55,000 ج.م (10%)',
      labelEn: '40,001 to 55,000 EGP (10%)',
    },
    {
      upTo: 70000,
      rate: 0.15,
      labelAr: 'من 55,001 إلى 70,000 ج.م (15%)',
      labelEn: '55,001 to 70,000 EGP (15%)',
    },
    {
      upTo: 200000,
      rate: 0.2,
      labelAr: 'من 70,001 إلى 200,000 ج.م (20%)',
      labelEn: '70,001 to 200,000 EGP (20%)',
    },
    {
      upTo: 400000,
      rate: 0.225,
      labelAr: 'من 200,001 إلى 400,000 ج.م (22.5%)',
      labelEn: '200,001 to 400,000 EGP (22.5%)',
    },
    {
      upTo: 1200000,
      rate: 0.25,
      labelAr: 'من 400,001 إلى 1,200,000 ج.م (25%)',
      labelEn: '400,001 to 1,200,000 EGP (25%)',
    },
    {
      upTo: null,
      rate: 0.275,
      labelAr: 'أكثر من 1,200,000 ج.م (27.5%)',
      labelEn: 'Above 1,200,000 EGP (27.5%)',
    },
  ] as TaxBracket[],

  /**
   * مساهمة تكافلية (للمقارنة أو الإشارة: 0.0025 من إجمالي الدخل في بعض المنشآت، غير مخصومة افتراضياً من الموظف)
   */
  exemptAllowanceCapRatio: 0.3, // الحد الأقصى للبدلات المعفاة تأمينياً (30% من أجر الاشتراك)
};
