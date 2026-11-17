export type Locale = 'ar' | 'en';

export type CategoryId =
  | 'date-religion'
  | 'finance'
  | 'images-pdf'
  | 'text'
  | 'health'
  | 'general';

export interface CategoryMeta {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  accentHex: string;
  secondaryHex: string;
  badgeClass: string;
  glowClass: string;
  borderHoverClass: string;
  gradientClass: string;
  textAccentClass: string;
}

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  'date-religion': {
    id: 'date-religion',
    nameAr: 'التاريخ والدين',
    nameEn: 'Date & Islamic',
    descriptionAr: 'حساب العمر، التحويل الهجري الميلادي، الفروقات الزمنية، وحاسبة الزكاة.',
    descriptionEn: 'Age calculations, Hijri conversions, date spans, and Zakat calculators.',
    accentHex: '#10B981',
    secondaryHex: '#F5B942',
    badgeClass: 'text-emerald-600 dark:text-emerald-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(16,185,129,0.35)]',
    borderHoverClass: 'hover:border-emerald-500/40',
    gradientClass: 'from-emerald-500 to-amber-400',
    textAccentClass: 'text-emerald-500 dark:text-emerald-400',
  },
  finance: {
    id: 'finance',
    nameAr: 'الحاسبات المالية',
    nameEn: 'Finance & Tax',
    descriptionAr: 'الرواتب والضرائب، العملات الحية، القروض والأقساط، والنسب المئوية.',
    descriptionEn: 'Payroll taxes, live currency rates, loan amortization, and percentages.',
    accentHex: '#3B82F6',
    secondaryHex: '#22D3EE',
    badgeClass: 'text-blue-600 dark:text-blue-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(59,130,246,0.35)]',
    borderHoverClass: 'hover:border-blue-500/40',
    gradientClass: 'from-blue-500 to-cyan-400',
    textAccentClass: 'text-blue-500 dark:text-blue-400',
  },
  'images-pdf': {
    id: 'images-pdf',
    nameAr: 'الصور و PDF',
    nameEn: 'Images & PDF',
    descriptionAr: 'ضغط الصور، تحويل الصيغ، إنشاء PDF من الصور، ودمج ملفات PDF بأمان.',
    descriptionEn: 'Compress images, convert formats, build PDFs from photos, and merge PDFs.',
    accentHex: '#F43F5E',
    secondaryHex: '#FB923C',
    badgeClass: 'text-rose-600 dark:text-rose-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(244,63,94,0.35)]',
    borderHoverClass: 'hover:border-rose-500/40',
    gradientClass: 'from-rose-500 to-orange-400',
    textAccentClass: 'text-rose-500 dark:text-rose-400',
  },
  text: {
    id: 'text',
    nameAr: 'أدوات النصوص',
    nameEn: 'Text & Writing',
    descriptionAr: 'عدّاد الكلمات والحروف، تفقيط الأرقام، وزخرفة الأسماء والنصوص.',
    descriptionEn: 'Word counters, number-to-words check writers, and stylish text decorators.',
    accentHex: '#8B5CF6',
    secondaryHex: '#C084FC',
    badgeClass: 'text-violet-600 dark:text-violet-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(139,92,246,0.35)]',
    borderHoverClass: 'hover:border-violet-500/40',
    gradientClass: 'from-violet-500 to-fuchsia-400',
    textAccentClass: 'text-violet-500 dark:text-violet-400',
  },
  health: {
    id: 'health',
    nameAr: 'الصحة واللياقة',
    nameEn: 'Health & Wellness',
    descriptionAr: 'موعد الولادة المتوقع، السعرات الحرارية والماكروز، ومؤشر كتلة الجسم.',
    descriptionEn: 'Pregnancy due dates, daily calorie & macro targets, and BMI gauges.',
    accentHex: '#14B8A6',
    secondaryHex: '#2DD4BF',
    badgeClass: 'text-teal-600 dark:text-teal-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(20,184,166,0.35)]',
    borderHoverClass: 'hover:border-teal-500/40',
    gradientClass: 'from-teal-500 to-emerald-400',
    textAccentClass: 'text-teal-500 dark:text-teal-400',
  },
  general: {
    id: 'general',
    nameAr: 'أدوات عامة',
    nameEn: 'General Utilities',
    descriptionAr: 'توليد كلمات مرور قوية، رموز QR فورية، وتحويل الوحدات القياسية.',
    descriptionEn: 'Cryptographic password generators, custom QR codes, and unit converters.',
    accentHex: '#F59E0B',
    secondaryHex: '#FBBF24',
    badgeClass: 'text-amber-600 dark:text-amber-400',
    glowClass: 'group-hover:shadow-[0_12px_36px_-10px_rgba(245,158,11,0.35)]',
    borderHoverClass: 'hover:border-amber-500/40',
    gradientClass: 'from-amber-500 to-yellow-400',
    textAccentClass: 'text-amber-500 dark:text-amber-400',
  },
};

export const CATEGORY_LIST: CategoryMeta[] = Object.values(CATEGORIES);

export const DICTIONARY = {
  ar: {
    siteName: 'مركز الأدوات',
    siteTagline: '21 أداة ذكية تعمل في متصفحك بخصوصية 100%',
    nav: {
      home: 'الرئيسية',
      tools: 'الأدوات',
      categories: 'الفئات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      searchPlaceholder: 'ابحث عن أداة... (مثال: زكاة، PDF، عمر)',
      searchShortcut: 'Ctrl+K',
      searchEmpty: 'لم نجد أداة مطابقة لبحثك. جرّب كلمة أخرى.',
      themeDark: 'الوضع الداكن',
      themeLight: 'الوضع الفاتح',
      numeralsLabel: 'الأرقام',
      numeralsWestern: '123 إنجليزية',
      numeralsArabic: '١٢٣ عربية',
      switchLang: 'EN',
      switchLangLabel: 'Switch to English',
    },
    hero: {
      headlinePrefix: 'كل ما تحتاجه من',
      rotatingWords: ['حاسبات دقيقة', 'أدوات صور وPDF', 'محولات فورية', 'أدوات نصوص'],
      headlineSuffix: 'في مكان واحد',
      subtitle:
        'منصة أدوات عربية مجانية تعمل بالكامل داخل متصفحك بدون رفع ملفاتك لأي خادم. سرعة فائقة، دقة عالية، وخصوصية كاملة.',
      privacyGuarantee: 'ملفاتك لا تغادر جهازك أبداً — المعالجة تتم محلياً 100% داخل المتصفح',
      stats: [
        { value: 21, suffix: '', label: 'أداة مجانية متكاملة' },
        { value: 100, suffix: '%', label: 'معالجة محلية وآمنة' },
        { value: 0, suffix: '', label: 'تسجيل أو اشتراك مطلوب' },
      ],
    },
    home: {
      allCategories: 'الكل',
      toolsCountLabel: 'أداة',
      mostUsedTitle: 'الأكثر استخداماً',
      mostUsedSubtitle: 'الأدوات التي يعتمد عليها الزوار يومياً لإنجاز مهامهم بسرعة.',
      recentlyUsedTitle: 'آخر ما استخدمته',
      recentlyUsedSubtitle: 'عُد سريعاً إلى الأدوات التي فتحتها مؤخراً على هذا الجهاز.',
      allToolsTitle: 'تصفح جميع الأدوات',
      allToolsSubtitle: 'اختر الفئة أو ابحث مباشرة للوصول إلى الأداة المناسبة.',
      whyUsTitle: 'لماذا يختار المستخدمون مركز الأدوات؟',
      whyUsItems: [
        {
          title: 'خصوصية مطلقة',
          description:
            'صورك وملفاتك الحساسة لا تُرفع إلى أي سيرفر خارجي؛ جميع العمليات تتم داخل ذاكرة متصفحك.',
        },
        {
          title: 'سرعة فورية بلا انتظار',
          description:
            'تبدأ الأدوات بالعمل فور فتح الصفحة بدون تحميل مزعج أو حسابات أو قيود يومية.',
        },
        {
          title: 'دعم كامل للجوال',
          description:
            'تصميم متجاوب مريح للمس على الهواتف والأجهزة اللوحية وشاشات الكمبيوتر.',
        },
        {
          title: 'مجاني 100% دائماً',
          description:
            'جميع الحاسبات والمحولات متاحة مجاناً بدون علامات مائية أو باقات مدفوعة.',
        },
      ],
      faqTitle: 'أسئلة شائعة حول المنصة',
      faqs: [
        {
          q: 'هل يتم رفع صوري أو ملفات PDF إلى خوادم الموقع؟',
          a: 'لا نهائياً. تعتمد جميع أدوات الصور وPDF لدينا على تقنيات المتصفح الحديثة (Canvas API و WebAssembly / pdf-lib) لمعالجة الملفات محلياً على جهازك دون إرسال بايت واحد عبر الإنترنت.',
        },
        {
          q: 'هل أحتاج إلى إنشاء حساب أو دفع اشتراك؟',
          a: 'لا، جميع الأدوات الـ 21 مجانية تماماً ومتاحة للاستخدام الفوري بدون تسجيل دخول أو قيود على عدد الاستخدامات.',
        },
        {
          q: 'كيف يتم حفظ سجل آخر الأدوات التي استخدمتها؟',
          a: 'يتم حفظ تفضيلات المظهر (الداكن/الفاتح) ونوع الأرقام وآخر الأدوات المستخدمة محلياً في مساحة التخزين الخاصة بمتصفحك (localStorage) فقط، ويمكنك مسحها في أي وقت.',
        },
        {
          q: 'هل النتائج في الحاسبات الطبية والمالية والشرعية معتمدة رسمياً؟',
          a: 'تُبنى الحاسبات على المعادلات القياسية المعتمدة، ومع ذلك فهي أدوات استرشادية وتقديرية ولا تغني عن استشارة الطبيب أو المحاسب القانوني أو أهل العلم في الحالات الخاصة.',
        },
      ],
    },
    toolPage: {
      breadcrumbHome: 'الرئيسية',
      adLabel: 'إعلان',
      localBadge: 'ملفاتك لا تغادر جهازك · معالجة محلية 100%',
      shareTitle: 'شارك الأداة',
      shareWhatsapp: 'واتساب',
      shareFacebook: 'فيسبوك',
      copyLink: 'نسخ الرابط',
      copiedLink: 'تم نسخ الرابط!',
      whatIsTitle: 'ما هي هذه الأداة؟',
      howToTitle: 'كيفية الاستخدام خطوة بخطوة',
      benefitsTitle: 'أبرز المزايا',
      faqTitle: 'الأسئلة الشائعة',
      relatedTitle: 'أدوات ذات صلة قد تهمك',
      useToolCta: 'افتح الأداة',
    },
    footer: {
      brandDesc:
        'مجموعة أدوات ويب مجانية وسريعة باللغتين العربية والإنجليزية، صُممت لتعمل بالكامل داخل المتصفح مع الحفاظ التام على خصوصية ملفاتك.',
      categoriesHeading: 'أقسام الأدوات',
      legalHeading: 'روابط هامة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      about: 'من نحن',
      contact: 'اتصل بنا',
      copyright: 'جميع الحقوق محفوظة',
    },
    cookie: {
      message:
        'نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك وعرض إعلانات ملائمة عبر Google AdSense، مع حفظ تفضيلات المظهر محلياً.',
      accept: 'موافق',
      decline: 'الضرورية فقط',
      learnMore: 'سياسة الخصوصية',
    },
    notFound: {
      code: '404',
      title: 'عذراً، الصفحة غير موجودة',
      description:
        'يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله. يمكنك العودة للرئيسية أو البحث عن الأداة التي تحتاجها.',
      backHome: 'العودة إلى الرئيسية',
    },
  },
  en: {
    siteName: 'Tools Hub',
    siteTagline: '21 fast browser utilities with 100% client-side privacy',
    nav: {
      home: 'Home',
      tools: 'Tools',
      categories: 'Categories',
      about: 'About',
      contact: 'Contact',
      searchPlaceholder: 'Search tools... (e.g., Zakat, PDF, Age)',
      searchShortcut: 'Ctrl+K',
      searchEmpty: 'No matching tools found. Try a different keyword.',
      themeDark: 'Dark Mode',
      themeLight: 'Light Mode',
      numeralsLabel: 'Numerals',
      numeralsWestern: '123 Western',
      numeralsArabic: '١٢٣ Arabic',
      switchLang: 'عربي',
      switchLangLabel: 'التحويل إلى العربية',
    },
    hero: {
      headlinePrefix: 'Essential',
      rotatingWords: ['Smart Calculators', 'Image & PDF Tools', 'Instant Converters', 'Text Utilities'],
      headlineSuffix: 'in One Place',
      subtitle:
        'A fast, free suite of 21 everyday utilities running completely inside your browser. Zero server uploads, zero sign-ups, and total privacy.',
      privacyGuarantee: 'Your files never leave your device — 100% local browser processing',
      stats: [
        { value: 21, suffix: '', label: 'Free Built-In Tools' },
        { value: 100, suffix: '%', label: 'Client-Side Privacy' },
        { value: 0, suffix: '', label: 'Accounts Required' },
      ],
    },
    home: {
      allCategories: 'All',
      toolsCountLabel: 'tools',
      mostUsedTitle: 'Most Popular Tools',
      mostUsedSubtitle: 'Everyday utilities trusted for fast calculations and file workflows.',
      recentlyUsedTitle: 'Recently Used',
      recentlyUsedSubtitle: 'Jump right back into the tools you opened recently on this device.',
      allToolsTitle: 'Explore All Utilities',
      allToolsSubtitle: 'Filter by category or search to launch any tool instantaneously.',
      whyUsTitle: 'Why Choose Tools Hub?',
      whyUsItems: [
        {
          title: 'Zero-Upload Privacy',
          description:
            'Your photos and PDF documents stay strictly inside your browser memory and are never transmitted to any remote server.',
        },
        {
          title: 'Instant Execution',
          description:
            'Every calculator and converter runs natively in your browser with zero queues, paywalls, or daily limits.',
        },
        {
          title: 'Mobile-First Ergonomics',
          description:
            'Touch-friendly sliders, clean typography, and responsive layouts tailored for phones, tablets, and desktops.',
        },
        {
          title: '100% Free Forever',
          description:
            'No watermarks, no locked exports, and no registration barriers on any of our 21 utilities.',
        },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'Are my photos or PDF files uploaded to a server?',
          a: 'Never. All image compression, format conversion, and PDF merging happens locally on your device using HTML5 Canvas and pdf-lib inside your browser.',
        },
        {
          q: 'Do I need to create an account or pay for exports?',
          a: 'No. Every tool on Tools Hub is completely free with unlimited usage and zero watermarks.',
        },
        {
          q: 'What data is saved in my browser?',
          a: 'Only your UI preferences (dark/light theme, numeral style, and recently visited tools) are saved locally via localStorage. No personal files or inputs are stored.',
        },
        {
          q: 'Are financial, health, and Zakat calculators legally or medically binding?',
          a: 'They implement standard formulas and published brackets for guidance, but should always be verified with a licensed physician, CPA, or religious scholar for official decisions.',
        },
      ],
    },
    toolPage: {
      breadcrumbHome: 'Home',
      adLabel: 'Advertisement',
      localBadge: 'Your files never leave your device · 100% local processing',
      shareTitle: 'Share this tool',
      shareWhatsapp: 'WhatsApp',
      shareFacebook: 'Facebook',
      copyLink: 'Copy Link',
      copiedLink: 'Link Copied!',
      whatIsTitle: 'What Is This Tool?',
      howToTitle: 'How to Use It Step by Step',
      benefitsTitle: 'Key Highlights',
      faqTitle: 'Frequently Asked Questions',
      relatedTitle: 'Related Tools',
      useToolCta: 'Open Tool',
    },
    footer: {
      brandDesc:
        'A bilingual suite of 21 fast, privacy-first browser utilities built to run entirely client-side without uploading your files.',
      categoriesHeading: 'Categories',
      legalHeading: 'Legal & Info',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      about: 'About Us',
      contact: 'Contact',
      copyright: 'All rights reserved',
    },
    cookie: {
      message:
        'We use cookies to improve your browsing experience and serve relevant ads via Google AdSense, while saving your theme preferences locally.',
      accept: 'Accept All',
      decline: 'Essential Only',
      learnMore: 'Privacy Policy',
    },
    notFound: {
      code: '404',
      title: 'Page Not Found',
      description:
        'The page you are looking for does not exist or may have moved. Return home or browse our 21 free browser tools.',
      backHome: 'Back to Home',
    },
  },
} as const;
