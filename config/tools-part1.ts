import type { ToolConfig } from './tools-types';

export const TOOLS_PART_1: ToolConfig[] = [
  {
    slug: 'age-calculator',
    category: 'date-religion',
    icon: 'cake',
    popular: true,
    relatedSlugs: ['hijri-converter', 'date-difference', 'pregnancy-due-date'],
    ar: {
      name: 'حاسبة العمر',
      shortDesc: 'احسب عمرك بدقة بالسنوات والشهور والأيام والثواني مع دعم الهجري والميلادي.',
      h1: 'حاسبة العمر الدقيقة بالهجري والميلادي',
      seoTitle: 'حاسبة العمر الدقيقة بالهجري والميلادي | مركز الأدوات',
      seoDescription:
        'احسب عمرك بالضبط بالسنوات والشهور والأيام والساعات والثواني، واعرف يوم ميلادك وبرجك والعد التنازلي لعيد ميلادك القادم مجاناً.',
      keywords: ['حاسبة العمر', 'حساب العمر بالميلادي', 'حساب العمر بالهجري', 'كم عمري'],
      whatIs: [
        'حاسبة العمر هي أداة فورية تتيح لك معرفة عمرك الحقيقي بدقة متناهية انطلاقاً من تاريخ ميلادك سواء بالتقويم الميلادي أو الهجري، مع إمكانية مقارنة العمر عند أي تاريخ مستقبلي أو ماضٍ تختاره بنفسك بدلاً من تاريخ اليوم فقط.',
        'لا تقتصر الأداة على إظهار عدد السنوات فحسب، بل تفصّل العمر إلى شهور وأيام، وتحسب إجمالي ما عشته بالأسابيع والأيام والساعات والدقائق، مع عدّاد ثوانٍ حي يتحدث لحظياً أمام عينيك داخل المتصفح دون إرسال أي بيانات شخصية.',
        'كما تكشف لك الأداة عن يوم الأسبوع الذي وُلدت فيه، وبرجك الفلكي، وعدد الأيام المتبقية على عيد ميلادك المقبل، مع احتفال بصري لطيف إذا صادف اليوم ذكرى ميلادك.',
      ],
      howToSteps: [
        'اختر نوع التقويم الذي تفضله لإدخال تاريخ الميلاد: ميلادي أو هجري (أم القرى).',
        'حدّد يوم وشهر وسنة ميلادك بدقة، ويمكنك تعديل تاريخ الحساب المستهدف إذا أردت معرفة عمرك في سنة قادمة.',
        'تظهر النتائج فوراً مقسمة إلى بطاقات واضحة تشمل العمر التفصيلي وإجمالي الأيام والأسابيع ويوم الميلاد والعد التنازلي القادم.',
      ],
      benefits: [
        'دقة حسابية تراعي عدد أيام كل شهر والسنوات الكبيسة وتقويم أم القرى.',
        'تبديل سلس وفوري بين إدخال التاريخ الميلادي والهجري دون مغادرة الصفحة.',
        'خصوصية كاملة حيث لا يتم تخزين تاريخ ميلادك على أي خادم خارجي.',
        'عرض تفصيلي لليوم والبرج الفلكي والعد التنازلي لعيد الميلاد القادم.',
      ],
      faqs: [
        {
          q: 'كيف يتم حساب العمر بالهجري في هذه الأداة؟',
          a: 'تعتمد الأداة على تقويم أم القرى المعتمد عبر واجهة Intl.DateTimeFormat في المتصفح لتحويل تاريخ الميلاد الهجري إلى نظيره الميلادي وحساب الفارق الزمني بدقة.',
        },
        {
          q: 'هل تأخذ حاسبة العمر السنوات الكبيسة في الاعتبار؟',
          a: 'نعم، تأخذ الحاسبة طول كل شهر فعلياً (28 أو 29 أو 30 أو 31 يوماً) وتحتسب السنوات الكبيسة عند حساب إجمالي الأيام والساعات.',
        },
        {
          q: 'هل يمكنني حساب عمري في تاريخ محدد في المستقبل؟',
          a: 'بالتأكيد، يمكنك تغيير حقل "الحساب حتى تاريخ" إلى أي تاريخ مستقبلي أو ماضٍ لمعرفة عمرك في ذلك اليوم تحديداً.',
        },
        {
          q: 'هل تُحفظ بيانات تاريخ ميلادي على الإنترنت؟',
          a: 'لا على الإطلاق، تتم جميع الحسابات محلياً داخل ذاكرة متصفحك ولا تغادر جهازك.',
        },
      ],
    },
    en: {
      name: 'Age Calculator',
      shortDesc: 'Calculate exact age in years, months, days, and live seconds for Gregorian & Hijri dates.',
      h1: 'Exact Age Calculator (Gregorian & Hijri)',
      seoTitle: 'Exact Age Calculator in Years, Months & Days | Tools Hub',
      seoDescription:
        'Calculate your exact chronological age in years, months, days, hours, and live seconds. Supports Gregorian and Hijri birth dates with next-birthday countdown.',
      keywords: ['age calculator', 'exact age', 'hijri age calculator', 'birthday countdown'],
      whatIs: [
        'Our Exact Age Calculator determines your precise chronological age down to years, months, days, and ticking live seconds. Whether you know your birth date in the Gregorian or Islamic Hijri calendar, you can switch seamlessly and get instant results.',
        'Beyond standard years-and-months math, the tool breaks your lifespan down into total weeks, days, hours, and minutes, reveals the exact weekday you were born, displays your zodiac sign, and counts down to your upcoming birthday.',
        'You can also customize the target comparison date to find out how old you were on a historic milestone or how old you will be on a future event date—all computed locally in your browser.',
      ],
      howToSteps: [
        'Choose your birth calendar mode: Gregorian or Hijri (Umm al-Qura).',
        'Enter your birth day, month, and year, and optionally adjust the target date if you want to calculate age for a past or future date.',
        'Review your instant breakdown across colorful stat cards, including a live seconds counter and next birthday countdown.',
      ],
      benefits: [
        'Accounts accurately for leap years and varying month lengths.',
        'Supports both Gregorian and Hijri birth date inputs natively.',
        '100% browser-based with zero personal data transmitted or logged.',
        'Includes weekday of birth, zodiac sign, and birthday countdown.',
      ],
      faqs: [
        {
          q: 'Does the calculator account for leap years?',
          a: 'Yes. It uses exact calendar month lengths and leap-year rules when computing both the years/months/days breakdown and total elapsed days.',
        },
        {
          q: 'Can I calculate my age using a Hijri birth date?',
          a: 'Yes, toggle to Hijri mode, select your Hijri birth day, month, and year, and the tool converts it using the Umm al-Qura calendar standard.',
        },
        {
          q: 'Can I check how old I will be on a future date?',
          a: 'Yes, simply change the target date field from today to any future date you want to inspect.',
        },
        {
          q: 'Is my birth date stored anywhere?',
          a: 'No. Everything runs locally in JavaScript inside your browser tab.',
        },
      ],
    },
  },
  {
    slug: 'hijri-converter',
    category: 'date-religion',
    icon: 'moon',
    popular: true,
    relatedSlugs: ['age-calculator', 'date-difference', 'zakat-calculator'],
    ar: {
      name: 'تحويل التاريخ هجري ميلادي',
      shortDesc: 'حوّل التواريخ بين الهجري والميلادي بدقة أم القرى مع أسماء الشهور القبطية.',
      h1: 'محول التاريخ الهجري والميلادي (أم القرى)',
      seoTitle: 'تحويل التاريخ من هجري إلى ميلادي والعكس | مركز الأدوات',
      seoDescription:
        'حوّل التاريخ بين الهجري والميلادي في الاتجاهين وفق تقويم أم القرى مع خيار تعديل الرؤية ±1 يوم وعرض أسماء الشهور الهجرية والميلادية والقبطية.',
      keywords: ['تحويل التاريخ', 'هجري لميلادي', 'ميلادي لهجري', 'تقويم أم القرى'],
      whatIs: [
        'محول التاريخ الهجري والميلادي هو أداة متخصصة تتيح لك التحويل الدقيق في الاتجاهين بين التقويم الهجري القمري (تقويم أم القرى) والتقويم الميلادي الشمسي مباشرة من متصفحك.',
        'ونظراً لاختلاف رؤية الهلال من بلد إلى آخر أحياناً بفارق يوم واحد، توفر الأداة مفتاح تعديل مرن (±1 يوم) لضبط النتيجة وفق الرؤية الشرعية المحلية في بلدك بضغطة زر.',
        'تعرض الأداة التاريخ الناتج بالأرقام والحروف الكاملة مع اسم اليوم، كما تضيف اسم الشهر القبطي المقابل للتاريخ الميلادي لما له من أهمية لدى المستخدمين في مصر والمجالات الزراعية والموسمية.',
      ],
      howToSteps: [
        'اختر اتجاه التحويل: من ميلادي إلى هجري أو من هجري إلى ميلادي باستخدام زر التبديل الدوّار.',
        'أدخل التاريخ المطلوب تحويله عبر القوائم السريعة لليوم والشهر والسنة.',
        'اضبط خيار تعديل الرؤية (±1 يوم) إذا دعت الحاجة، ثم انسخ الصيغة الرقمية أو النصية الجاهزة.',
      ],
      benefits: [
        'تحويل فوري ثنائي الاتجاه اعتماداً على تقويم أم القرى المدمج بالمتصفح.',
        'إمكانية تعديل النتيجة ±1 يوم لمطابقة رؤية الهلال في مختلف الدول.',
        'عرض التاريخ بصيغ متعددة: رقمية، وحرفية كاملة، وبالتقويم القبطي.',
        'واجهة ليلية أنيقة سهلة القراءة على الهواتف والأجهزة اللوحية.',
      ],
      faqs: [
        {
          q: 'ما المعيار المستخدم في تحويل التاريخ الهجري؟',
          a: 'تعتمد الأداة على تقويم أم القرى القياسي عبر واجهة Intl.DateTimeFormat (islamic-umalqura) لضمان تطابق عالٍ مع التقاويم الرسمية.',
        },
        {
          q: 'لماذا يوجد خيار تعديل ±1 يوم؟',
          a: 'لأن بداية الأشهر القمرية قد تختلف بيوم واحد بين دولة وأخرى حسب ثبوت رؤية الهلال بالعين أو المراصد، وهذا الخيار يتيح لك مطابقة تقويم بلدك.',
        },
        {
          q: 'هل تدعم الأداة التواريخ القديمة والمستقبلية؟',
          a: 'نعم، تدعم الأداة التحويل عبر مدى واسع من السنوات الهجرية والميلادية في الماضي والمستقبل.',
        },
        {
          q: 'ما فائدة عرض الشهر القبطي مع النتيجة؟',
          a: 'التقويم القبطي لا يزال مستخدماً بكثرة في مصر لمتابعة فصول السنة والمواسم الزراعية والطقس مثل أمشير وطوبة وبرمهات.',
        },
      ],
    },
    en: {
      name: 'Hijri Converter',
      shortDesc: 'Convert dates between Hijri (Umm al-Qura) and Gregorian with ±1 day moon-sighting offset.',
      h1: 'Hijri to Gregorian Date Converter',
      seoTitle: 'Hijri to Gregorian & Gregorian to Hijri Converter | Tools Hub',
      seoDescription:
        'Convert dates accurately in both directions between Islamic Hijri (Umm al-Qura) and Gregorian calendars, with ±1 day moon-sighting adjustment and Coptic month names.',
      keywords: ['hijri converter', 'islamic date converter', 'gregorian to hijri', 'umm al-qura'],
      whatIs: [
        'Our bidirectional Hijri Converter translates any date seamlessly between the Gregorian solar calendar and the Islamic Hijri lunar calendar using the official Umm al-Qura algorithm built into modern browsers.',
        'Because lunar month beginnings can vary by one day depending on regional moon sighting, the tool includes a convenient ±1 day offset toggle so you can match local announcements effortlessly.',
        'Each conversion displays both numeric and full written formats, the exact day of the week, and the corresponding Coptic month name widely referenced for seasonal tracking in Egypt and the Levant.',
      ],
      howToSteps: [
        'Choose your conversion direction (Gregorian → Hijri or Hijri → Gregorian) with the swap button.',
        'Select the day, month, and year you want to convert.',
        'Optionally apply a -1, 0, or +1 day moon-sighting adjustment and copy the formatted result.',
      ],
      benefits: [
        'Accurate Umm al-Qura calendar math running natively in your browser.',
        'Built-in ±1 day lunar sighting offset control.',
        'Displays Hijri, Gregorian, and Coptic month equivalents simultaneously.',
        'Clean two-card layout with instant one-click copying.',
      ],
      faqs: [
        {
          q: 'Which Hijri calendar standard does this tool use?',
          a: 'It uses the Umm al-Qura (islamic-umalqura) calendar standard via Intl.DateTimeFormat and deterministic calendar matching.',
        },
        {
          q: 'Why is there a ±1 day adjustment button?',
          a: 'Official crescent moon sightings can differ by one day across countries; the offset lets you align the output to your local calendar.',
        },
        {
          q: 'Does it work offline in the browser?',
          a: 'Yes, all date conversions execute locally in JavaScript with zero server requests.',
        },
        {
          q: 'Why is the Coptic month shown as well?',
          a: 'The Coptic solar calendar remains popular across Egypt for tracking agricultural seasons and traditional weather periods.',
        },
      ],
    },
  },
  {
    slug: 'zakat-calculator',
    category: 'date-religion',
    icon: 'coins',
    popular: true,
    relatedSlugs: ['currency-converter', 'percentage-calculator', 'hijri-converter'],
    ar: {
      name: 'حاسبة الزكاة',
      shortDesc: 'احسب زكاة المال والذهب والفضة والتجارة بدقة مع مقارنة النصاب التلقائية.',
      h1: 'حاسبة زكاة المال والذهب الشاملة',
      seoTitle: 'حاسبة زكاة المال والذهب (النصاب 85 جرام ذهب) | مركز الأدوات',
      seoDescription:
        'احسب زكاة مالك من النقد والذهب (عيار 24 و21 و18) والفضة وعروض التجارة والديون، وتأكد من بلوغ النصاب ومقدار الزكاة الواجبة بنسبة 2.5%.',
      keywords: ['حاسبة الزكاة', 'زكاة المال', 'حساب زكاة الذهب', 'نصاب الزكاة'],
      whatIs: [
        'حاسبة الزكاة هي أداة استرشادية دقيقة تساعدك على تقدير مقدار الزكاة الواجبة في أموالك النقدية والمدخرات البنكية والذهب والفضة وعروض التجارة، مع خصم الديون المستحقة عليك وإضافة الديون المرجو سدادها لك.',
        'تحتسب الأداة قيمة النصاب الشرعي تلقائياً استناداً إلى سعر جرام الذهب عيار 24 الذي تدخله وفق سعر السوق في بلدك (85 جراماً من الذهب الخالص)، وتحول أي ذهب من عيار 21 أو 18 إلى مكافئه من عيار 24 بدقة.',
        'يظهر لك شريط تقدم واضح يبيّن نسبة اقتراب صافي ثروتك الزكوية من حد النصاب، وإذا بلغت النصاب وحال عليها الحول الهجري تحسب الأداة نسبة 2.5% فوراً مع ملخص تفصيلي لكل بند.',
      ],
      howToSteps: [
        'أدخل سعر جرام الذهب عيار 24 الحالي بعملتك المحلية لحساب قيمة النصاب (85 جرام ذهب).',
        'املأ قيم النقد والرصيد البنكي، وأوزان الذهب حسب العيار (24، 21، 18)، والفضة، وقيمة بضائع التجارة المعدة للبيع.',
        'أضف الديون المرجوة لك واطرح الديون المستحقة عليك، ثم راجع النتيجة لمعرفة هل بلغ مالك النصاب ومقدار الزكاة المستحقة.',
      ],
      benefits: [
        'تحويل تلقائي لأوزان الذهب عيار 21 و18 إلى قيمة عيار 24 الخالص.',
        'مؤشر مرئي واضح يوضح بلوغ النصاب الشرعي من عدمه.',
        'إمكانية إدراج الديون المستحقة وعروض التجارة والفضة في حساب موحد.',
        'خصوصية مالية تامة؛ جميع الأرقام تبقى على جهازك ولا تُرسل لأي جهة.',
      ],
      faqs: [
        {
          q: 'كيف تحسب الحاسبة قيمة النصاب؟',
          a: 'تعتمد الحاسبة نصاب الذهب وهو 85 جراماً من الذهب الخالص عيار 24 مضروباً في سعر الجرام الذي تدخله.',
        },
        {
          q: 'ما هي نسبة الزكاة المطبقة في الحاسبة؟',
          a: 'النسبة القياسية لزكاة النقود والذهب والفضة وعروض التجارة هي 2.5% (ربع العشر) عند بلوغ النصاب ومرور حول هجري كامل.',
        },
        {
          q: 'هل يجب إخراج زكاة على ذهب الزينة الشخصي؟',
          a: 'تختلف آراء الفقهاء في حلي المرأة المعد للزينة فقط؛ لذا نذكّر دائماً بأن هذه الحاسبة استرشادية ويُنصح بسؤال أهل العلم في المسائل التفصيلية.',
        },
        {
          q: 'لماذا أكتب سعر جرام الذهب بنفسي؟',
          a: 'لأن أسعار الذهب تختلف من دولة لأخرى وتتغير يومياً؛ وإدخالك للسعر المحلي يضمن حساب النصاب بعملتك بدقة.',
        },
      ],
    },
    en: {
      name: 'Zakat Calculator',
      shortDesc: 'Calculate Zakat on cash, 24K/21K/18K gold, silver, trade goods, and debts against Nisab.',
      h1: 'Comprehensive Zakat Calculator (Gold Nisab)',
      seoTitle: 'Zakat Calculator for Cash, Gold, Silver & Business | Tools Hub',
      seoDescription:
        'Calculate your annual 2.5% Zakat on cash savings, 24K/21K/18K gold, silver, inventory, and receivables minus eligible debts, with live Nisab progress tracking.',
      keywords: ['zakat calculator', 'gold nisab calculator', 'islamic zakat', '2.5% zakat'],
      whatIs: [
        'Our Zakat Calculator helps you estimate your annual 2.5% Zakat obligation across cash holdings, bank balances, gold jewelry or bullion (automatically adjusted for 24K, 21K, and 18K purity), silver, and commercial trade inventory.',
        'It automatically computes the Nisab threshold using the 85-gram 24K gold standard based on the local gold price you enter, and lets you account for recoverable receivables as well as deductible short-term liabilities.',
        'A visual Nisab progress bar shows immediately whether your net zakatable wealth meets the threshold, accompanied by a clear itemized breakdown. Note that this tool is an informational guide and does not replace qualified scholarly advice.',
      ],
      howToSteps: [
        'Enter the current price per gram of 24K gold in your local currency to establish the 85g Nisab threshold.',
        'Input your cash, bank savings, gold weights by karat, silver value, and net trade inventory.',
        'Add recoverable debts owed to you and subtract immediate debts you owe to view your net zakatable total and 2.5% Zakat due.',
      ],
      benefits: [
        'Automatic purity conversion for 24K, 21K, and 18K gold.',
        'Visual progress meter showing proximity to the Nisab threshold.',
        'Complete financial privacy with zero data stored or transmitted.',
        'Itemized summary across every asset and liability category.',
      ],
      faqs: [
        {
          q: 'How is the Nisab threshold determined?',
          a: 'The calculator uses the standard 85 grams of pure 24K gold multiplied by the current gold price per gram you provide.',
        },
        {
          q: 'What Zakat rate is applied?',
          a: 'The standard 2.5% rate is applied once net zakatable wealth equals or exceeds the Nisab threshold for one full lunar year (Hawl).',
        },
        {
          q: 'Are personal debts deducted?',
          a: 'Yes, debts currently due can be entered in the liabilities field and are subtracted before checking the Nisab threshold.',
        },
        {
          q: 'Is this calculator a religious ruling (Fatwa)?',
          a: 'No, it is an educational estimation tool. Please consult a knowledgeable scholar for personal or complex rulings such as worn jewelry.',
        },
      ],
    },
  },
  {
    slug: 'percentage-calculator',
    category: 'finance',
    icon: 'percent',
    popular: true,
    relatedSlugs: ['egypt-salary-calculator', 'loan-calculator', 'zakat-calculator'],
    ar: {
      name: 'حاسبة النسبة المئوية',
      shortDesc: 'احسب النسبة المئوية والزيادة والخصم والفرق بين رقمين مع شرح الخطوات ورسم بياني.',
      h1: 'حاسبة النسبة المئوية الشاملة مع شرح الخطوات',
      seoTitle: 'حاسبة النسبة المئوية الفورية (خصم، زيادة، نسبة من رقم) | مركز الأدوات',
      seoDescription:
        'احسب النسبة المئوية بأربع طرق: كم يساوي X% من Y، نسبة رقم من آخر، نسبة الزيادة أو النقص، وإضافة أو خصم نسبة مئوية مع رسم بياني.',
      keywords: ['حاسبة النسبة المئوية', 'حساب الخصم', 'نسبة الزيادة', 'كم بالمئة'],
      whatIs: [
        'حاسبة النسبة المئوية أداة يومية سريعة تغطي كل حسابات النسب التي تحتاجها في التسوق والخصومات، والمحاسبة، والدراسة، وتحليل الأرباح والخسائر دون الحاجة إلى معادلات يدوية.',
        'تضم الأداة أربعة أوضاع متكاملة في تبويبات واضحة: حساب قيمة نسبة معينة من مبلغ، ومعرفة كم يمثل رقم من رقم آخر كنسبة مئوية، وحساب نسبة التغير (الزيادة أو النقصان) بين قيمتين، وأخيراً إضافة أو خصم نسبة مئوية مباشرة من السعر الأصلي.',
        'مع كل رقم تكتبه، تتحدث النتيجة فوراً وتظهر المعادلة الحسابية خطوة بخطوة إلى جانب رسم دائري (Donut) يوضح النسبة بصرياً.',
      ],
      howToSteps: [
        'اختر وضع الحساب المطلوب من التبويبات الأربعة أعلى الأداة.',
        'أدخل القيم الرقمية في الخانات المخصصة؛ ولا حاجة للضغط على أي زر لأن النتيجة فورية.',
        'اطّلع على القيمة النهائية وشرح المعادلة الرياضية والرسم الدائري المرافق، وانسخ النتيجة بضغطة واحدة.',
      ],
      benefits: [
        'أربع حاسبات نسب مئوية متكاملة في صفحة واحدة سريعة.',
        'عرض صيغة الحل الرياضية لتفهم كيف تم استخراج النتيجة.',
        'مخطط دائري متحرك يترجم النسبة المئوية إلى تمثيل بصري واضح.',
        'دقة عالية مع دعم الكسور العشرية والأرقام الكبيرة.',
      ],
      faqs: [
        {
          q: 'كيف أحسب سعر منتج بعد خصم 25% مثلاً؟',
          a: 'اختر تبويب "إضافة أو خصم نسبة"، أدخل السعر الأصلي وحدد العملية على "خصم (-)" ثم اكتب 25 لتحصل على السعر النهائي ومقدار التوفير.',
        },
        {
          q: 'كيف أعرف نسبة الزيادة بين راتبي القديم والجديد؟',
          a: 'انتقل إلى تبويب "نسبة الزيادة أو النقص"، وأدخل الراتب القديم كقيمة أولى والجديد كقيمة ثانية لتظهر لك النسبة المئوية للتغير.',
        },
        {
          q: 'هل تتعامل الأداة مع الأرقام العشرية؟',
          a: 'نعم، تدعم جميع الحقول الأرقام العشرية بدقة مع تقريب أنيق للنتائج.',
        },
        {
          q: 'هل يمكنني التبديل بين الأرقام العربية والإنجليزية؟',
          a: 'نعم، من زر إعدادات الأرقام في الشريط العلوي يمكنك اختيار عرض الأرقام بالشكل الذي تفضله.',
        },
      ],
    },
    en: {
      name: 'Percentage Calculator',
      shortDesc: 'Solve 4 percentage modes instantly: % of number, share %, % change, and discounts.',
      h1: '4-in-1 Percentage Calculator with Step-by-Step Math',
      seoTitle: 'Percentage Calculator: Discounts, % Change & Ratio | Tools Hub',
      seoDescription:
        'Calculate X% of Y, find what percent one number is of another, compute percentage increase/decrease, and apply markups or discounts with a live donut visual.',
      keywords: ['percentage calculator', 'discount calculator', 'percent change', 'percentage math'],
      whatIs: [
        'Our 4-in-1 Percentage Calculator handles every everyday percentage calculation cleanly—whether you are checking a retail discount, comparing revenue growth, grading test scores, or computing tax markups.',
        'Switch between four dedicated tabs: find X% of Y, discover what percentage X represents of Y, calculate percentage increase or decrease between two values, or add/subtract a percentage directly from a base price.',
        'Every keystroke updates the result immediately alongside a transparent formula breakdown and an animated SVG donut visualization.',
      ],
      howToSteps: [
        'Select one of the four percentage modes from the segmented tabs.',
        'Enter your numbers into the labeled fields; results calculate live as you type.',
        'Inspect the step-by-step formula and donut ring, then copy the final number with one click.',
      ],
      benefits: [
        'Four essential percentage workflows unified in one clean interface.',
        'Step-by-step equation explanation for full calculation transparency.',
        'Animated SVG donut gauge illustrating the proportion clearly.',
        'Supports decimals, large values, and instant copy.',
      ],
      faqs: [
        {
          q: 'How do I calculate a sale price after a 20% discount?',
          a: 'Pick the "Add / Subtract %" tab, enter the original price, select Subtract (-), and enter 20 to see both the final price and savings.',
        },
        {
          q: 'How do I calculate percentage growth between two months?',
          a: 'Open the "% Increase / Decrease" tab, enter the starting value and the new value, and the exact percentage change appears automatically.',
        },
        {
          q: 'Does it support decimal inputs?',
          a: 'Yes, decimals are supported across all inputs and formatted cleanly in the output.',
        },
        {
          q: 'Can I copy just the calculated result?',
          a: 'Yes, click the copy button beside the primary output to copy it to your clipboard.',
        },
      ],
    },
  },
  {
    slug: 'egypt-salary-calculator',
    category: 'finance',
    icon: 'wallet',
    popular: true,
    relatedSlugs: ['percentage-calculator', 'loan-calculator', 'currency-converter'],
    ar: {
      name: 'حاسبة الراتب والضرائب (مصر)',
      shortDesc: 'احسب صافي الراتب في مصر بعد خصم التأمينات الاجتماعية وضريبة كسب العمل.',
      h1: 'حاسبة صافي الراتب وضريبة كسب العمل في مصر',
      seoTitle: 'حاسبة الراتب والضرائب والتأمينات في مصر | مركز الأدوات',
      seoDescription:
        'احسب صافي راتبك الشهري والسنوي في مصر بعد خصم التأمينات الاجتماعية (11%) وضريبة كسب العمل وفق الشرائح التصاعدية والإعفاء الشخصي.',
      keywords: ['حاسبة الراتب مصر', 'ضريبة كسب العمل', 'حساب التأمينات الاجتماعية', 'صافي المرتب'],
      whatIs: [
        'تساعدك حاسبة الراتب والضرائب في مصر على معرفة صافي الدخل الذي تتقاضاه فعلياً كل شهر وكل عام انطلاقاً من الراتب الإجمالي والبدلات، بعد احتساب استقطاعات التأمينات الاجتماعية وضريبة كسب العمل التصاعدية.',
        'تراعي الأداة الحد الأدنى والأقصى لأجر الاشتراك التأميني وحصة الموظف (11%)، كما تطبق الإعفاء الشخصي السنوي للموظفين وتخصم حصة التأمينات من الوعاء الضريبي قبل توزيع الدخل على الشرائح الضريبية المعفاة والتصاعدية.',
        'تظهر النتائج على هيئة أرقام شهرية وسنوية واضحة مع مخطط دائري يوضح نسبة صافي الراتب مقارنة بالتأمينات والضرائب، مع جدول تفصيلي لكل شريحة ضريبية. تنويه: النتائج تقديرية واسترشادية وقد تختلف باختلاف سياسات الموارد البشرية أو التعديلات القانونية.',
      ],
      howToSteps: [
        'أدخل راتبك الإجمالي الشهري بالجنيه المصري في الحقل المخصص.',
        'أضف قيمة البدلات الشهرية إن وجدت، وحدد ما إذا كنت تستفيد من الإعفاء الشخصي للموظفين.',
        'راجع صافي الراتب الشهري والسنوي وقيمة التأمينات والضريبة والمخطط البياني التفصيلي.',
      ],
      benefits: [
        'حساب فوري لصافي الراتب الشهري والسنوي في مصر.',
        'تقسيم واضح لاستقطاعات التأمينات الاجتماعية وشرائح ضريبة كسب العمل.',
        'مخطط دائري يوضح توزيع الراتب بين الصافي والضرائب والتأمينات.',
        'ملف إعدادات شرائح منفصل ومرن يسهل تحديثه مع أي تعديل تشريعي.',
      ],
      faqs: [
        {
          q: 'كيف تُحسب التأمينات الاجتماعية للموظف في مصر؟',
          a: 'تُحسب حصة الموظف بنسبة 11% من أجر الاشتراك التأميني المحصور بين الحد الأدنى والأقصى المقررين سنوياً في نظام التأمينات.',
        },
        {
          q: 'هل تُخصم التأمينات والإعفاء الشخصي قبل حساب الضريبة؟',
          a: 'نعم، وفق قواعد ضريبة كسب العمل يتم خصم اشتراك التأمينات الاجتماعية والإعفاء الشخصي السنوي للوصول إلى صافي الوعاء الخاضع للضريبة.',
        },
        {
          q: 'هل تشمل الحاسبة الضريبة التضامنية أو خصومات خاصة بالشركات؟',
          a: 'تحسب الأداة التأمينات وضريبة كسب العمل القياسية؛ أما الخصومات الإدارية أو التأمين الطبي الخاص أو المساهمة التكافلية فتختلف من شركة لأخرى.',
        },
        {
          q: 'هل هذه الأرقام نهائية ومعتمدة للمحاسبة؟',
          a: 'لا، النتائج تقديرية بغرض التخطيط الشخصي فقط، ويُنصح بمراجعة إدارة الموارد البشرية أو محاسب قانوني وفق أحدث تشريع سارٍ.',
        },
      ],
    },
    en: {
      name: 'Egypt Salary & Tax Calculator',
      shortDesc: 'Estimate monthly & annual net take-home pay in Egypt after social insurance and income tax.',
      h1: 'Egypt Net Salary, Income Tax & Social Insurance Calculator',
      seoTitle: 'Egypt Salary & Income Tax Calculator (Net Pay) | Tools Hub',
      seoDescription:
        'Estimate your Egyptian monthly and annual take-home salary after 11% social insurance caps, personal tax exemption, and progressive income tax brackets.',
      keywords: ['egypt salary calculator', 'egypt income tax', 'egypt net pay', 'social insurance egypt'],
      whatIs: [
        'The Egypt Salary & Tax Calculator estimates your monthly and annual net take-home pay in Egyptian Pounds (EGP) from your gross salary and allowances, factoring in social insurance deductions and progressive income tax brackets.',
        'It applies the employee social insurance share (11% bounded by the statutory minimum and maximum insurable wage thresholds), subtracts social insurance and the annual personal exemption from taxable income, and breaks down tax liability tier by tier.',
        'An interactive donut chart and bracket breakdown show exactly where every pound goes. Please treat outputs as indicative estimates and confirm final payroll figures against current Egyptian tax and NOSI regulations.',
      ],
      howToSteps: [
        'Enter your monthly gross salary in EGP.',
        'Optionally enter monthly allowances and choose whether the employee personal exemption applies.',
        'Review your monthly and annual net pay, social insurance deduction, income tax, and bracket breakdown.',
      ],
      benefits: [
        'Calculates both monthly and annual take-home pay instantly.',
        'Applies social insurance min/max insurable wage thresholds.',
        'Interactive visual chart comparing net pay, tax, and insurance.',
        'Powered by a standalone editable rates file for easy statutory updates.',
      ],
      faqs: [
        {
          q: 'How is employee social insurance calculated in Egypt?',
          a: 'Employees contribute 11% of their insurable salary, capped between the statutory minimum and maximum monthly insurable wage limits.',
        },
        {
          q: 'Are social insurance and personal exemptions deducted before tax?',
          a: 'Yes, both the annual employee social insurance contribution and the annual personal exemption are deducted before applying progressive brackets.',
        },
        {
          q: 'Does this cover private company deductions like medical insurance?',
          a: 'No, private benefit deductions or company-specific loans are excluded since they vary by employer.',
        },
        {
          q: 'Are the calculated tax figures legally binding?',
          a: 'They are indicative estimates based on standard statutory brackets; verify final payroll numbers with your HR department or tax advisor.',
        },
      ],
    },
  },
  {
    slug: 'image-compressor',
    category: 'images-pdf',
    icon: 'image-down',
    popular: true,
    relatedSlugs: ['image-converter', 'images-to-pdf', 'merge-pdf'],
    ar: {
      name: 'ضغط الصور',
      shortDesc: 'قلّل حجم صور JPG وPNG وWebP داخل متصفحك مع معاينة قبل وبعد وتحميل ZIP.',
      h1: 'أداة ضغط وتقليل حجم الصور أونلاين بدون فقدان الجودة',
      seoTitle: 'ضغط الصور أونلاين بدون رفع للسيرفر (JPG, PNG, WebP) | مركز الأدوات',
      seoDescription:
        'اضغط صورك وقلّل حجمها حتى 80% داخل المتصفح مباشرة بدون رفعها لأي خادم. يدعم ضغط عدة صور مع مقارنة قبل/بعد وتحميل ZIP.',
      keywords: ['ضغط الصور', 'تصغير حجم الصور', 'تقليل حجم الصورة', 'ضغط webp'],
      whatIs: [
        'أداة ضغط الصور تتيح لك تصغير حجم صورك الرقمية بشكل كبير لتسريع موقعك الإلكتروني أو تسهيل إرسالها عبر البريد والواتساب، مع الحفاظ على وضوح الصورة وتفاصيلها البصرية.',
        'تتم عملية الضغط بالكامل داخل متصفحك باستخدام تقنية HTML5 Canvas، ما يعني أن صورك الشخصية أو مستنداتك المصورة لا تغادر جهازك أبداً ولا تمر عبر أي سيرفر خارجي.',
        'يمكنك رفع عدة صور دفعة واحدة، والتحكم في درجة الجودة وأقصى عرض مطلوب، واختيار صيغة الإخراج المناسبة مثل WebP أو JPG، ومقارنة النتيجة بمؤشر تمرير تفاعلي قبل وبعد قبل تنزيلها منفردة أو في ملف ZIP واحد.',
      ],
      howToSteps: [
        'اسحب الصور وأفلتها داخل منطقة الرفع أو اضغط لاختيار ملفات من جهازك.',
        'اضبط شريط الجودة (مثل 75% إلى 85%) وحدد أقصى عرض وصيغة الإخراج المطلوبة.',
        'عاين فرق الحجم ومقارنة قبل/بعد، ثم حمّل كل صورة على حدة أو حمّل جميع الصور في ملف ZIP.',
      ],
      benefits: [
        'معالجة محلية 100% تحمي خصوصية صورك الشخصية والعائلية.',
        'معاينة تفاعلية بمؤشر سحب لمقارنة الجودة قبل وبعد الضغط.',
        'دعم المعالجة الدفعية لعدة صور مع شريط تقدم لكل صورة.',
        'تنزيل مباشر أو مجمع بصيغة ZIP بدون حدود أو علامات مائية.',
      ],
      faqs: [
        {
          q: 'هل يتم رفع صوري إلى الإنترنت أثناء الضغط؟',
          a: 'لا نهائياً، تتم إعادة ترميز الصور داخل متصفحك عبر Canvas API ولا يُرسل أي ملف إلى خوادم خارجية.',
        },
        {
          q: 'ما أفضل صيغة لتقليل حجم الصور مع جودة ممتازة؟',
          a: 'صيغة WebP تمنح عادةً أصغر حجم ملف مع وضوح ممتاز، تليها صيغة JPG للصور الفوتوغرافية.',
        },
        {
          q: 'كم عدد الصور التي يمكنني ضغطها في المرة الواحدة؟',
          a: 'يمكنك اختيار عدة صور في وقت واحد حسب قدرة ذاكرة جهازك، وستُعالج واحدة تلو الأخرى بسلاسة.',
        },
        {
          q: 'لماذا قد لا ينخفض حجم بعض ملفات PNG؟',
          a: 'لأن صيغة PNG غير مضغوطة بفقدان؛ لتحقيق توفير كبير مع الصور الفوتوغرافية يُفضل التحويل إلى WebP أو JPG عند الضغط.',
        },
      ],
    },
    en: {
      name: 'Image Compressor',
      shortDesc: 'Shrink JPG, PNG & WebP file sizes locally in your browser with before/after slider & ZIP.',
      h1: 'Private Browser Image Compressor (Zero Uploads)',
      seoTitle: 'Compress Images Online Without Uploading (JPG, PNG, WebP) | Tools Hub',
      seoDescription:
        'Reduce image file sizes up to 80% directly inside your browser using Canvas API. Batch compress photos, compare before/after with an interactive slider, and download as ZIP.',
      keywords: ['image compressor', 'reduce image size', 'compress jpg', 'webp compressor'],
      whatIs: [
        'Our Image Compressor shrinks oversized photos and web graphics for faster page loads, email attachments, and messaging—while keeping sharp visual clarity.',
        'Because compression runs 100% locally via the browser HTML5 Canvas API, your private photos and scanned documents never leave your device or touch any external server.',
        'Drop multiple images at once, tune target quality and maximum width, choose JPG, PNG, or WebP output, inspect visual quality with an interactive before/after comparison slider, and download individually or bundled as a single ZIP archive.',
      ],
      howToSteps: [
        'Drag and drop one or multiple images into the dropzone or click to browse files.',
        'Adjust the compression quality slider, optional max width, and desired output format.',
        'Inspect file size savings and compare before/after previews, then download individual files or a combined ZIP.',
      ],
      benefits: [
        'Zero server uploads—your images stay strictly on your device.',
        'Interactive split-slider preview to verify visual sharpness.',
        'Batch compression with per-image progress indicators.',
        'One-click ZIP archive export for multi-file workflows.',
      ],
      faqs: [
        {
          q: 'Are my photos uploaded to a server?',
          a: 'No. All resizing and re-encoding run locally inside your browser using the HTML5 Canvas API.',
        },
        {
          q: 'Which output format achieves the smallest size?',
          a: 'WebP typically yields the smallest file size for the same visual quality, followed closely by JPEG for photographs.',
        },
        {
          q: 'Why does PNG sometimes stay large?',
          a: 'PNG is lossless, so quality sliders do not shrink photographic PNGs dramatically; switching output to WebP or JPG yields major savings.',
        },
        {
          q: 'Is there a daily file limit?',
          a: 'No limits and no watermarks—compress as many images as your device memory supports.',
        },
      ],
    },
  },
  {
    slug: 'images-to-pdf',
    category: 'images-pdf',
    icon: 'file-image',
    relatedSlugs: ['merge-pdf', 'image-compressor', 'image-converter'],
    ar: {
      name: 'تحويل الصور إلى PDF',
      shortDesc: 'اجمع صورك في ملف PDF مرتب مع التدوير وإعادة الترتيب واختيار مقاس الصفحة.',
      h1: 'تحويل الصور إلى ملف PDF واحد بسهولة وأمان',
      seoTitle: 'تحويل الصور إلى PDF مجاناً وبدون رفع للسيرفر | مركز الأدوات',
      seoDescription:
        'حوّل صور JPG وPNG وWebP إلى ملف PDF منظم في متصفحك. رتّب الصفحات بالسحب، دوّر الصور، واختر مقاس A4 أو Letter مع هوامش مخصصة.',
      keywords: ['تحويل الصور إلى pdf', 'صور الى pdf', 'دمج صور pdf', 'صانع pdf'],
      whatIs: [
        'تتيح لك أداة تحويل الصور إلى PDF تجميع الفواتير المصورة، والمستندات الممسوحة، والبطاقات، والصور التعليمية في ملف PDF احترافي واحد جاهز للطباعة أو الإرسال الرسمي.',
        'بفضل مكتبة pdf-lib التي تعمل بالكامل داخل المتصفح، يمكنك إضافة صور بصيغ مختلفة وترتيب تسلسلها بالسحب والإفلات أو الأزرار، وتدوير أي صورة مائلة بزاوية 90 درجة، والتحكم في مقاس الورق (A4 أو Letter أو حسب أبعاد الصورة) واتجاه الصفحة والهوامش.',
        'لا تُرفع مستنداتك الحساسة أبداً إلى أي خادم خارجي، مما يجعل الأداة مثالية لتجهيز أوراق السفر والهويات والعقود بأمان كامل.',
      ],
      howToSteps: [
        'أضف الصور التي ترغب في تحويلها عبر السحب والإفلات أو زر اختيار الملفات.',
        'رتّب الصور بالترتيب الذي تريده ودوّر أي صورة تحتاج إلى تعديل الاتجاه.',
        'اختر مقاس الصفحة والهوامش والاتجاه، ثم اضغط "إنشاء وتحميل PDF" لتحصل على ملفك فوراً.',
      ],
      benefits: [
        'حماية تامة للمستندات والهويات لأن التحويل يتم داخل المتصفح فقط.',
        'إمكانية التدوير وإعادة الترتيب بالسحب قبل التصدير.',
        'خيارات مرنة لمقاسات A4 وLetter والهوامش والاتجاه العمودي أو الأفقي.',
        'يدعم صور JPG وPNG وWebP مع تحويل تلقائي للصيغ بسلاسة.',
      ],
      faqs: [
        {
          q: 'هل يمكنني تغيير ترتيب الصور قبل إنشاء الـ PDF؟',
          a: 'نعم، يمكنك سحب البطاقات أو استخدام أزرار التقديم والتأخير لضبط ترتيب الصفحات بدقة.',
        },
        {
          q: 'ما صيغ الصور المدعومة؟',
          a: 'تدعم الأداة صور JPG وPNG وWebP وأي صيغة صور حديثة يدعمها متصفحك.',
        },
        {
          q: 'ما الفرق بين خيار "A4" وخيار "حسب مقاس الصورة"؟',
          a: 'خيار A4 يضع كل صورة داخل صفحة طباعة قياسية بهوامش مرتبة، بينما "حسب مقاس الصورة" يجعل أبعاد كل صفحة PDF مطابقة تماماً لأبعاد الصورة نفسها.',
        },
        {
          q: 'هل يُضاف شعار أو علامة مائية على ملف الـ PDF؟',
          a: 'لا، يصدر الملف نظيفاً تماماً بدون أي علامات مائية أو قيود.',
        },
      ],
    },
    en: {
      name: 'Images to PDF',
      shortDesc: 'Combine multiple photos into a clean PDF with drag reorder, rotation, and page sizing.',
      h1: 'Convert Images to PDF Privately in Your Browser',
      seoTitle: 'Convert Images to PDF Free & Private (JPG, PNG, WebP) | Tools Hub',
      seoDescription:
        'Turn JPG, PNG, and WebP photos into a clean multi-page PDF locally. Drag to reorder pages, rotate photos, pick A4/Letter/Fit sizing, and download instantly.',
      keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'create pdf from photos'],
      whatIs: [
        'Our Images to PDF converter turns scanned receipts, ID documents, lecture slides, and photos into a single print-ready PDF document without uploading a single byte to the internet.',
        'Powered client-side by pdf-lib, you can import mixed image formats, reorder pages by dragging or clicking arrows, rotate sideways scans in 90-degree increments, and pick A4, US Letter, or exact Fit-to-Image dimensions with custom margins.',
        'Everything runs inside your browser tab, keeping sensitive contracts, invoices, and personal paperwork strictly on your device.',
      ],
      howToSteps: [
        'Upload one or more JPG, PNG, or WebP images via drag-and-drop or file picker.',
        'Reorder the image thumbnails and rotate any sideways pages as needed.',
        'Select page size, orientation, and margin spacing, then click Create & Download PDF.',
      ],
      benefits: [
        '100% private client-side PDF assembly—ideal for sensitive documents.',
        'Supports drag-and-drop page reordering and 90° per-image rotation.',
        'Flexible A4, Letter, and Fit-to-Image page options.',
        'Zero watermarks and instant download.',
      ],
      faqs: [
        {
          q: 'Can I rearrange pages before generating the PDF?',
          a: 'Yes, drag thumbnails into your preferred sequence or use the quick move buttons on each card.',
        },
        {
          q: 'Which image formats are accepted?',
          a: 'JPG, PNG, WebP, and other standard browser-supported image formats work seamlessly.',
        },
        {
          q: 'When should I choose Fit-to-Image vs A4?',
          a: 'Choose A4 or Letter when printing standard sheets; choose Fit-to-Image for digital viewing with zero margins.',
        },
        {
          q: 'Is there a watermark on the generated PDF?',
          a: 'No, your exported PDF is completely clean and unbranded.',
        },
      ],
    },
  },
  {
    slug: 'merge-pdf',
    category: 'images-pdf',
    icon: 'files',
    popular: true,
    relatedSlugs: ['images-to-pdf', 'image-compressor', 'image-converter'],
    ar: {
      name: 'دمج ملفات PDF',
      shortDesc: 'ادمج عدة ملفات PDF في ملف واحد مع عرض عدد الصفحات وإعادة الترتيب بأمان تام.',
      h1: 'دمج ملفات PDF أونلاين في ملف واحد بأمان كامل',
      seoTitle: 'دمج ملفات PDF مجاناً وبدون رفع للسيرفر | مركز الأدوات',
      seoDescription:
        'ادمج عدة ملفات PDF في مستند واحد داخل متصفحك دون رفع الملفات لأي خادم. رتّب الملفات، اعرف عدد صفحات كل ملف، وحمّل النتيجة فوراً.',
      keywords: ['دمج pdf', 'تجميع ملفات pdf', 'دمج ملفين pdf', 'ربط pdf'],
      whatIs: [
        'تمنحك أداة دمج ملفات PDF طريقة سريعة وموثوقة لتجميع عدة مستندات PDF في ملف واحد مرتب، سواء كنت تجمع فصول كتاب أو مستندات تقديم لوظيفة أو فواتير شهرية.',
        'تقرأ الأداة كل ملف داخل المتصفح مباشرة عبر مكتبة pdf-lib وتعرض لك فوراً عدد صفحات كل ملف وحجمه الفعلي، مع إمكانية سحب الملفات لإعادة ترتيبها أو حذف أي ملف قبل الدمج.',
        'بما أن الملفات لا تغادر جهازك إطلاقاً، تبقى عقودك وبياناتك البنكية والشخصية في أمان تام مقارنة بالمواقع التي تطلب رفع الملفات لخوادمها.',
      ],
      howToSteps: [
        'ارفع ملفين أو أكثر بصيغة PDF عبر السحب والإفلات أو اختيار الملفات.',
        'رتّب الملفات بالتسلسل المطلوب وتأكد من عدد الصفحات الإجمالي.',
        'اضغط على زر "دمج الملفات الآن" ليتم تجميع المستند وتنزيله مباشرة على جهازك.',
      ],
      benefits: [
        'خصوصية قصوى؛ لا يتم إرسال أي مستند PDF عبر الشبكة.',
        'عرض عدد الصفحات والحجم لكل ملف فور إضافته.',
        'إعادة ترتيب سهلة بالسحب أو أزرار التحريك.',
        'جودة أصلية للنصوص والروابط داخل الصفحات المدمجة.',
      ],
      faqs: [
        {
          q: 'هل يؤثر الدمج على جودة النصوص والصور داخل الـ PDF؟',
          a: 'لا، تنسخ الأداة الصفحات الأصلية كما هي بدون إعادة ضغط أو تحويل إلى صور، فتبقى النصوص قابلة للتحديد والبحث.',
        },
        {
          q: 'ماذا لو كان أحد ملفات الـ PDF محمياً بكلمة مرور؟',
          a: 'الملفات المشفرة بكلمة فتح لا يمكن قراءة صفحاتها دون فك تشفيرها أولاً، وتظهر لك رسالة تنبيه واضحة في هذه الحالة.',
        },
        {
          q: 'هل هناك حد أقصى لعدد الملفات المدمجة؟',
          a: 'لا يوجد حد مصطنع؛ يمكنك دمج العديد من الملفات طالما تسمح ذاكرة المتصفح بحجمها الإجمالي.',
        },
        {
          q: 'هل تُحفظ نسخة من الملف المدمج على الموقع؟',
          a: 'لا على الإطلاق، بمجرد إغلاق التبويب تختفي الملفات من ذاكرة المتصفح.',
        },
      ],
    },
    en: {
      name: 'Merge PDF',
      shortDesc: 'Combine multiple PDF documents into one ordered file locally with page counts.',
      h1: 'Merge PDF Files Privately in Your Browser',
      seoTitle: 'Merge PDF Files Online Free & Private | Tools Hub',
      seoDescription:
        'Combine multiple PDF documents into a single file directly in your browser without uploading. View page counts, reorder files, and download instantly.',
      keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'client side pdf merger'],
      whatIs: [
        'Our Merge PDF tool lets you combine contracts, reports, resumes, and scanned documents into a single sequential PDF without uploading confidential files to third-party servers.',
        'Using pdf-lib natively in the browser, each uploaded PDF is inspected immediately to show its exact page count and file size. You can drag files to reorder them or remove any document before merging.',
        'Pages are copied natively rather than rasterized, preserving crisp vector text, selectable paragraphs, and original document fidelity.',
      ],
      howToSteps: [
        'Drop two or more PDF files into the upload zone or click to browse.',
        'Reorder your PDFs into the exact sequence you want using drag-and-drop or move arrows.',
        'Click Merge PDFs to assemble and download your combined document immediately.',
      ],
      benefits: [
        'Zero server uploads—confidential PDFs stay on your device.',
        'Instant page-count and file-size inspection per document.',
        'Preserves sharp selectable text and vector graphics.',
        'Fast progress feedback and one-click download.',
      ],
      faqs: [
        {
          q: 'Does merging reduce PDF text or image quality?',
          a: 'No. Pages are copied directly at their original vector and image resolution.',
        },
        {
          q: 'Can it merge password-protected PDFs?',
          a: 'Encrypted PDFs that require a password to open cannot be merged in-browser unless decrypted first; the tool notifies you clearly if one is encrypted.',
        },
        {
          q: 'How many files can I merge at once?',
          a: 'There is no artificial cap—combine as many PDFs as your browser memory comfortably handles.',
        },
        {
          q: 'Are merged documents saved anywhere?',
          a: 'Never. All buffers live only in your active browser tab.',
        },
      ],
    },
  },
  {
    slug: 'word-counter',
    category: 'text',
    icon: 'file-text',
    popular: true,
    relatedSlugs: ['number-to-words', 'arabic-text-decorator', 'password-generator'],
    ar: {
      name: 'عداد الكلمات والحروف',
      shortDesc: 'احسب الكلمات والحروف والجمل ووقت القراءة وأكثر الكلمات تكراراً وتنظيف النص.',
      h1: 'عداد الكلمات والحروف وتحليل النصوص العربية',
      seoTitle: 'عداد الكلمات والحروف ووقت القراءة وأكثر الكلمات تكراراً | مركز الأدوات',
      seoDescription:
        'احسب عدد الكلمات والحروف بمسافات وبدونها والجمل والفقرات ووقت القراءة والكلام، مع تنظيف المسافات وإزالة التكرار وتحليل الكلمات الأكثر تكراراً.',
      keywords: ['عداد الكلمات', 'حساب عدد الحروف', 'تحليل النص', 'وقت القراءة'],
      whatIs: [
        'عداد الكلمات والحروف هو محرر نصوص ذكي ونظيف مصمم للكتّاب والطلاب وصنّاع المحتوى ومسؤولي السيو (SEO) لمتابعة طول مقالاتهم وتغريداتهم ورسائلهم الأكاديمية لحظة بلحظة.',
        'تعد الأداة الكلمات، والحروف بالمسافات وبدون مسافات، والجمل، والفقرات، وتقدر وقت القراءة الصامتة ووقت الإلقاء الصوتي، كما تستخرج قائمة بأكثر الكلمات تكراراً مع استبعاد ذكي لحروف الجر وكلمات الوقف العربية الشائعة مثل (في، من، على، هذا، التي).',
        'وتوفر الأداة أزرار معالجة سريعة لتنظيف النص بنقرة واحدة: إزالة المسافات الزائدة، حذف الأسطر المكررة، تحويل الأرقام بين العربية والإنجليزية، والنسخ الفوري.',
      ],
      howToSteps: [
        'اكتب نصك أو الصقه في مساحة التحرير الكبيرة.',
        'راقب العدادات الفورية أعلى المحرر وقائمة الكلمات الأكثر تكراراً على الجانب.',
        'استخدم أدوات التنسيق السريعة لتنظيف المسافات أو إزالة الأسطر المكررة أو تحويل الأرقام ثم انسخ النص.',
      ],
      benefits: [
        'تحليل فوري دقيق يدعم علامات الترقيم والتشكيل العربي.',
        'استبعاد ذكي لكلمات الوقف العربية والإنجليزية عند حساب التكرار.',
        'أدوات تنظيف نصوص مدمجة (إزالة المسافات الزائدة والتكرار).',
        'واجهة هادئة خالية من المشتتات ومناسبة للكتابة الطويلة.',
      ],
      faqs: [
        {
          q: 'كيف يتم حساب وقت القراءة المتوقع؟',
          a: 'يُحتسب وقت القراءة بناءً على متوسط سرعة القراءة الطبيعية (نحو 200 كلمة في الدقيقة) ووقت الكلام بنحو 130 كلمة في الدقيقة.',
        },
        {
          q: 'هل يُحتسب التشكيل العربي كحروف مستقلة؟',
          a: 'نعم في العد الحرفي الدقيق، بينما تحسب الكلمات بناءً على الكلمات الفعلية المفصولة بمسافات أو علامات ترقيم.',
        },
        {
          q: 'لماذا لا تظهر كلمات مثل "في" و"من" في الأكثر تكراراً؟',
          a: 'تقوم الأداة بتصفية كلمات الوقف الشائعة تلقائياً لتبرز لك الكلمات المفتاحية والموضوعية الحقيقية في نصك.',
        },
        {
          q: 'هل يتم حفظ مقالاتي أو نصوصي على الإنترنت؟',
          a: 'لا، تبقى جميع النصوص في متصفحك فقط ولا تُرسل إلى أي خادم.',
        },
      ],
    },
    en: {
      name: 'Word & Character Counter',
      shortDesc: 'Count words, characters, sentences, reading time, top keywords, and clean text.',
      h1: 'Real-Time Word Counter, Reading Time & Text Cleaner',
      seoTitle: 'Word & Character Counter with Keyword Density & Cleanup | Tools Hub',
      seoDescription:
        'Count words, characters with and without spaces, sentences, paragraphs, reading/speaking time, and top keywords—plus strip extra spaces and duplicate lines.',
      keywords: ['word counter', 'character count', 'reading time calculator', 'text cleaner'],
      whatIs: [
        'Our Word & Character Counter gives writers, students, editors, and SEO specialists instant visibility into text length and structure inside a calm, distraction-free editor.',
        'As you type or paste, it tracks total words, characters (with and without spaces), sentences, paragraphs, estimated reading and speaking times, and top recurring keywords while smartly filtering out common English and Arabic stop words.',
        'Built-in cleanup buttons let you strip extra whitespace, remove duplicate lines, convert numerals, copy clean text, or clear the pad in one tap.',
      ],
      howToSteps: [
        'Type or paste your draft into the main editor area.',
        'Watch live counts, reading time estimates, and top keyword frequency update automatically.',
        'Use the quick-action buttons to remove extra spaces, deduplicate lines, or copy your polished text.',
      ],
      benefits: [
        'Instant zero-lag metrics across words, chars, sentences, and paragraphs.',
        'Smart stop-word filtering for meaningful keyword frequency.',
        'One-click text normalization tools built right into the toolbar.',
        '100% private—drafts never leave your browser.',
      ],
      faqs: [
        {
          q: 'What reading speed is used for reading time?',
          a: 'Reading time assumes an average pace of 200 words per minute, and speaking time assumes 130 words per minute.',
        },
        {
          q: 'Does it work cleanly with both Arabic and English text?',
          a: 'Yes, it handles bilingual text, Unicode punctuation, and both Arabic and English stop-word lists.',
        },
        {
          q: 'What does "Remove Duplicate Lines" do?',
          a: 'It keeps the first occurrence of each non-empty line and strips repeated lines cleanly.',
        },
        {
          q: 'Is my text uploaded for analysis?',
          a: 'No. Every counter and cleanup action runs locally in JavaScript.',
        },
      ],
    },
  },
  {
    slug: 'password-generator',
    category: 'general',
    icon: 'shield-check',
    popular: true,
    relatedSlugs: ['qr-code-generator', 'word-counter', 'unit-converter'],
    ar: {
      name: 'مولد كلمات مرور قوية',
      shortDesc: 'أنشئ كلمات مرور عشوائية وآمنة عبر Web Crypto API مع مؤشر قوة وزمن الاختراق.',
      h1: 'مولد كلمات مرور قوية وعشوائية بتشفير المتصفح',
      seoTitle: 'مولد كلمات مرور قوية وآمنة (Web Crypto API) | مركز الأدوات',
      seoDescription:
        'أنشئ كلمات مرور قوية من 8 إلى 64 حرفاً باستخدام crypto.getRandomValues، مع مؤشر قوة، تقدير زمن الاختراق، واستبعاد الأحرف المتشابهة.',
      keywords: ['مولد كلمات مرور', 'كلمة سر قوية', 'انشاء باسورد قوي', 'password generator'],
      whatIs: [
        'مولد كلمات المرور القوية يبتكر لك كلمات سر عالية الأمان غير قابلة للتخمين لحماية حساباتك البنكية وبريدك الإلكتروني ومنصات التواصل، من دون الاعتماد على أي دوال عشوائية تقليدية ضعيفة.',
        'تعتمد الأداة حصرياً على واجهة التشفير الآمنة في المتصفح (crypto.getRandomValues) لضمان عشوائية حقيقية عالية الإنتروبيا، مع تحكم كامل في الطول من 8 إلى 64 حرفاً وتحديد أنواع المحارف (حروف كبيرة، صغيرة، أرقام، رموز، واستبعاد المحارف المتشابهة مثل 0 وO و1 وl).',
        'تعرض الأداة مقياس قوة ملوناً، وتقديراً تقريبياً للزمن اللازم لاختراق الكلمة بالقوة الغاشمة، وسجلاً مؤقتاً لآخر 5 كلمات تم توليدها خلال جلستك الحالية فقط دون حفظها على القرص.',
      ],
      howToSteps: [
        'حدد طول كلمة المرور المطلوب عبر المنزلق (يُنصح بـ 16 حرفاً فأكثر).',
        'فعّل أو عطّل مجموعات الأحرف والأرقام والرموز وخيار استبعاد الأحرف المتشابهة.',
        'اضغط "توليد جديد" ثم استخدم زر "نسخ" لحفظ كلمة المرور في مدير كلمات المرور الخاص بك.',
      ],
      benefits: [
        'توليد آمن عبر crypto.getRandomValues وليس Math.random.',
        'تقدير فوري للإنتروبيا والزمن التقريبي لكسر كلمة المرور.',
        'خيار استبعاد المحارف المربكة (O/0 و I/l/1) لسهولة القراءة اليدوية.',
        'سجل جلسة مؤقت في الذاكرة فقط يمسح تماماً عند إغلاق الصفحة.',
      ],
      faqs: [
        {
          q: 'ما الفرق بين crypto.getRandomValues و Math.random؟',
          a: 'دالة Math.random غير مخصصة للأمن ويمكن التنبؤ بتسلسلها، أما crypto.getRandomValues فتستخدم مولد أرقام عشوائية آمناً تشفيرياً على مستوى نظام التشغيل.',
        },
        {
          q: 'ما الطول المثالي لكلمة مرور قوية؟',
          a: 'يوصي خبراء الأمن السيبراني بـ 14 إلى 20 حرفاً على الأقل تضم مزيجاً من الحروف الكبيرة والصغيرة والأرقام والرموز.',
        },
        {
          q: 'هل يتم حفظ كلمات المرور التي أولّدها؟',
          a: 'لا تُرسل لأي سيرفر ولا تُخزن في localStorage؛ السجل الصغير الموجود يبقى في ذاكرة الجلسة المؤقتة ويمحى بمجرد تحديث الصفحة.',
        },
        {
          q: 'لماذا قد أختار استبعاد الأحرف المتشابهة؟',
          a: 'عند كتابة كلمة المرور يدوياً على هاتف أو جهاز تلفاز ذكي، يسهل الخلط بين حرف O والرقم 0 أو بين l و 1؛ استبعادها يمنع الأخطاء.',
        },
      ],
    },
    en: {
      name: 'Password Generator',
      shortDesc: 'Generate cryptographically random passwords with entropy meter and crack-time estimate.',
      h1: 'Cryptographic Strong Password Generator',
      seoTitle: 'Strong Password Generator (Web Crypto API) | Tools Hub',
      seoDescription:
        'Create unbreakable random passwords (8–64 characters) using crypto.getRandomValues, complete with strength meter, crack-time estimate, and similar-character exclusion.',
      keywords: ['password generator', 'strong password', 'random password', 'web crypto password'],
      whatIs: [
        'Our Strong Password Generator produces high-entropy passwords engineered to resist brute-force and dictionary attacks across your banking, email, and cloud accounts.',
        'Unlike naive generators that rely on predictable Math.random(), this tool exclusively uses the browser Web Crypto API (crypto.getRandomValues) with unbiased rejection sampling. Customize lengths from 8 to 64 characters and toggle uppercase, lowercase, digits, symbols, or exclude lookalike characters like 0/O and 1/l/I.',
        'You get an animated strength bar, estimated crack time based on bit entropy, and a session-only memory history of your last five generated passwords.',
      ],
      howToSteps: [
        'Slide to select your desired password length (16+ characters recommended).',
        'Toggle character sets (uppercase, lowercase, numbers, symbols) and optional ambiguous-character exclusion.',
        'Click Generate to scramble a fresh password, then Copy it straight into your password manager.',
      ],
      benefits: [
        'True cryptographic randomness via window.crypto.getRandomValues.',
        'Live entropy and brute-force crack-time estimation.',
        'Option to exclude confusing lookalike characters.',
        'Zero persistence—session history clears as soon as you close the tab.',
      ],
      faqs: [
        {
          q: 'Why does Web Crypto matter for passwords?',
          a: 'Math.random() is a pseudo-random generator unfit for security, whereas crypto.getRandomValues draws from the OS cryptographic entropy pool.',
        },
        {
          q: 'How long should my password be?',
          a: 'At least 16 characters mixing uppercase, lowercase, digits, and symbols provides strong defense against modern GPU cracking.',
        },
        {
          q: 'Are generated passwords saved in localStorage?',
          a: 'No. Your last 5 passwords stay strictly in temporary React state for the current session and vanish on refresh.',
        },
        {
          q: 'Does it work offline?',
          a: 'Yes, password generation requires zero network connectivity.',
        },
      ],
    },
  },
  {
    slug: 'qr-code-generator',
    category: 'general',
    icon: 'qr-code',
    popular: true,
    relatedSlugs: ['password-generator', 'arabic-text-decorator', 'unit-converter'],
    ar: {
      name: 'مولد QR Code',
      shortDesc: 'أنشئ رموز QR مخصصة للروابط والواي فاي والواتساب مع تنزيل PNG وSVG.',
      h1: 'مولد رمز الاستجابة السريعة QR Code المخصص',
      seoTitle: 'مولد QR Code مجاني للروابط والواي فاي والواتساب (PNG و SVG) | مركز الأدوات',
      seoDescription:
        'أنشئ رمز QR Code احترافياً للروابط، شبكات الواي فاي WiFi، رسائل واتساب، البريد، أو الهاتف، مع تخصيص الألوان والحجم وتحميل PNG وSVG.',
      keywords: ['مولد qr', 'صنع باركود', 'qr code واي فاي', 'qr واتساب'],
      whatIs: [
        'مولد QR Code هو أداة تصميم فورية تتيح لك تحويل الروابط، وبيانات شبكات الواي فاي، وأرقام الواتساب مع رسالة جاهزة، والبريد الإلكتروني، وأرقام الهواتف إلى رمز استجابة سريعة قابل للمسح بأي كاميرا هاتف.',
        'توفر الأداة تخصيصاً كاملاً لشكل الرمز: يمكنك اختيار لون الرمز ولون الخلفية وتحديد الدقة المطلوبة، مع معاينة حية تتحدث فوراً مع كل تعديل تدخله.',
        'وعند الانتهاء يمكنك تنزيل الرمز بصيغة PNG عالية الدقة للنشر الرقمي، أو بصيغة SVG المتجهية المثالية للطباعة على الكروت واللوحات الإعلانية بأي حجم دون تشويش.',
      ],
      howToSteps: [
        'اختر نوع رمز QR من التبويبات: رابط، نص، واي فاي، واتساب، بريد، أو رقم هاتف.',
        'أدخل البيانات المطلوبة (مثل اسم الشبكة وكلمة المرور للواي فاي، أو رقم الواتساب والرسالة).',
        'خصّص اللونين والحجم حسب هويتك البصرية، ثم حمّل الرمز بصيغة PNG أو SVG.',
      ],
      benefits: [
        '6 قوالب جاهزة تشمل ربط الواي فاي التلقائي ومحادثة واتساب المباشرة.',
        'تصدير مزدوج بصيغتي PNG عالية الجودة وSVG المتجهية للطباعة.',
        'معاينة فورية متحركة مع تخصيص كامل للألوان والأبعاد.',
        'توليد محلي آمن لا يمرر كلمات مرور الواي فاي لأي سيرفر.',
      ],
      faqs: [
        {
          q: 'كيف يعمل رمز QR الخاص بشبكة الواي فاي؟',
          a: 'تنشئ الأداة نصاً قياسياً بصيغة WIFI:T:WPA;S:...;P:...;;، وبمجرد توجيه كاميرا أي هاتف حديث إليه يتصل بالشبكة تلقائياً دون كتابة كلمة المرور.',
        },
        {
          q: 'أيهما أفضل للطباعة: PNG أم SVG؟',
          a: 'صيغة SVG هي الأفضل للطباعة لأنها رسوم متجهية لا تفقد حدتها مهما تم تكبيرها على البنرات أو الكروت.',
        },
        {
          q: 'هل يجب الحفاظ على تباين بين لون الرمز والخلفية؟',
          a: 'نعم، يُنصح دائماً بأن يكون لون الرمز داكناً والخلفية فاتحة لضمان قراءة سريعة من جميع الكاميرات.',
        },
        {
          q: 'هل تنتهي صلاحية رمز الـ QR بعد فترة؟',
          a: 'لا، الرمز يحتوي بياناتك مباشرة بشكل ثابت (Static QR) ولا يعتمد على روابط إعادة توجيه خارجية، لذلك يعمل للأبد.',
        },
      ],
    },
    en: {
      name: 'QR Code Generator',
      shortDesc: 'Create custom QR codes for URLs, Wi-Fi, WhatsApp, email, and phone in PNG & SVG.',
      h1: 'Custom QR Code Generator (URL, Wi-Fi, WhatsApp)',
      seoTitle: 'Free Custom QR Code Generator (PNG & SVG) | Tools Hub',
      seoDescription:
        'Generate instant, static QR codes for links, Wi-Fi login, WhatsApp pre-filled chats, email, and phone numbers. Customize colors and export PNG or crisp vector SVG.',
      keywords: ['qr code generator', 'wifi qr code', 'whatsapp qr code', 'svg qr generator'],
      whatIs: [
        'Our QR Code Generator creates crisp, scannable QR codes for website links, plain text, one-tap Wi-Fi login credentials, WhatsApp direct messages, email links, and phone numbers.',
        'Tailor the foreground color, background color, and export resolution inside a live glassmorphic preview frame that refreshes instantaneously as you type.',
        'Download ready-to-share PNG graphics for social media or infinitely scalable SVG vector files for business cards, menus, and signage—with zero tracking redirects or expiration dates.',
      ],
      howToSteps: [
        'Pick a payload type: URL, Text, Wi-Fi, WhatsApp, Email, or Phone.',
        'Fill in the corresponding details (such as Wi-Fi SSID & password or WhatsApp number & message).',
        'Customize colors and size, then export as PNG or vector SVG.',
      ],
      benefits: [
        'Supports 6 practical templates including Wi-Fi and WhatsApp.',
        'Dual export in high-res PNG and scalable vector SVG.',
        'Static QR payload—never expires and never routes through trackers.',
        'Local generation keeps Wi-Fi passwords completely private.',
      ],
      faqs: [
        {
          q: 'Do these QR codes ever expire?',
          a: 'No. Your data is encoded directly into the QR matrix with no third-party shorteners, so it works permanently.',
        },
        {
          q: 'Should I download PNG or SVG for print?',
          a: 'Choose SVG for print materials (flyers, menus, signage) because vector paths scale cleanly to any physical size.',
        },
        {
          q: 'Is my Wi-Fi password sent to a server?',
          a: 'No. The QR matrix is rendered entirely inside your browser.',
        },
        {
          q: 'Why won’t my camera scan very light colors?',
          a: 'QR scanners rely on strong contrast—keep the foreground dark and the background light for reliable scanning.',
        },
      ],
    },
  },
];
