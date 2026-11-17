import type { ToolConfig } from './tools-types';

export const TOOLS_PART_2: ToolConfig[] = [
  {
    slug: 'unit-converter',
    category: 'general',
    icon: 'ruler',
    relatedSlugs: ['currency-converter', 'percentage-calculator', 'bmi-calculator'],
    ar: {
      name: 'تحويل الوحدات',
      shortDesc: 'حوّل بين وحدات الطول والوزن والحرارة والمساحة والحجم والسرعة والبيانات والوقت.',
      h1: 'محول الوحدات الشامل لـ 8 فئات قياس',
      seoTitle: 'محول الوحدات القياسية (طول، وزن، حرارة، مساحة، بيانات) | مركز الأدوات',
      seoDescription:
        'حوّل بسهولة بين وحدات الطول والوزن ودرجات الحرارة والمساحة والحجم والسرعة وسعة التخزين والوقت لحظياً مع جدول تحويلات شائعة.',
      keywords: ['تحويل الوحدات', 'تحويل المتر للقدم', 'تحويل الكيلو للباوند', 'محول قياس'],
      whatIs: [
        'محول الوحدات الشامل هو مرجع يومي سريع يجمع ثماني فئات قياسية متكاملة: الطول، والوزن (الكتلة)، ودرجة الحرارة، والمساحة، والحجم، والسرعة، وسعة البيانات الرقمية، والزمن.',
        'بدلاً من البحث في مواقع متفرقة عن معامل التحويل بين الميل والكيلومتر أو الفهرنهايت والمئوية أو الجيجابايت والميجابايت، تضع الأداة أمامك حقلين متقابلين يتحولان لحظياً مع كل رقم تكتبه وزر تبديل دوّار لعكس الاتجاه فوراً.',
        'كما تعرض الأداة أسفل المحول جدول تحويلات سريعة لأشهر القيم المرتبطة بالوحدة المختارة لتسهيل المقارنة في لمحة واحدة.',
      ],
      howToSteps: [
        'اختر فئة القياس من التبويبات الثمانية أعلى الأداة (طول، وزن، حرارة، مساحة...).',
        'اكتب القيمة في الخانة الأولى واختر وحدة المصدر ووحدة الهدف.',
        'اقرأ النتيجة الفورية في الخانة المقابلة أو اضغط زر التبديل لعكس التحويل.',
      ],
      benefits: [
        'تغطية شاملة لـ 8 فئات وأكثر من 50 وحدة قياس شائعة.',
        'تحويل لحظي ثنائي الاتجاه يمكنك الكتابة في أي من الخانتين.',
        'معادلات دقيقة خاصة بدرجات الحرارة (سيلسيوس، فهرنهايت، كلفن).',
        'جدول قيم مرجعية سريعة يتحدث تلقائياً حسب اختيارك.',
      ],
      faqs: [
        {
          q: 'كيف يتم التحويل بين الكيلوبايت والميجابايت في فئة البيانات؟',
          a: 'تستخدم الأداة المعيار الثنائي القياسي في الحوسبة (1024 بايت = 1 كيلوبايت) مع عرض البت والبايت والجيجابايت والتيرابايت.',
        },
        {
          q: 'هل يمكنني الكتابة في حقل النتيجة للتحويل العكسي؟',
          a: 'نعم، يدعم الحقلان التحرير المباشر بحيث تتحدث القيمة الأخرى فوراً عند تعديل أي خانة.',
        },
        {
          q: 'ما وحدات المساحة المتوفرة في المحول؟',
          a: 'تشمل المتر المربع، الكيلومتر المربع، السنتيمتر المربع، الهكتار، الفدان (الأكر)، والقدم المربع.',
        },
        {
          q: 'هل الدقة مناسبة للاستخدام الهندسي والعلمي؟',
          a: 'نعم، تستخدم الأداة معاملات تحويل قياسية دولية بدقة عشرية عالية.',
        },
      ],
    },
    en: {
      name: 'Unit Converter',
      shortDesc: 'Convert Length, Weight, Temperature, Area, Volume, Speed, Data, and Time instantly.',
      h1: 'All-in-One Unit Converter (8 Measurement Categories)',
      seoTitle: 'Online Unit Converter: Length, Weight, Temp, Data & More | Tools Hub',
      seoDescription:
        'Convert instantly across 8 categories: Length, Weight, Temperature, Area, Volume, Speed, Digital Data, and Time—with bidirectional inputs and quick reference tables.',
      keywords: ['unit converter', 'metric to imperial', 'temperature converter', 'data converter'],
      whatIs: [
        'Our All-in-One Unit Converter unifies eight everyday measurement categories—Length, Weight, Temperature, Area, Volume, Speed, Digital Data, and Time—into one fast workspace.',
        'Type into either the source or target field and see instant bidirectional conversion with a rotating swap button and a dynamic reference table displaying common benchmarks.',
        'Built with exact international SI conversion constants and nonlinear temperature formulas (Celsius, Fahrenheit, Kelvin), it delivers reliable figures for students, engineers, travelers, and home cooks.',
      ],
      howToSteps: [
        'Pick a measurement category tab at the top of the converter.',
        'Select your source and target units and type a value into either input field.',
        'View the live conversion and scan the quick-reference table below for common values.',
      ],
      benefits: [
        'Eight complete categories covering over 50 standard units.',
        'Bidirectional live editing in either field.',
        'Exact nonlinear math for Celsius, Fahrenheit, and Kelvin.',
        'Dynamic quick-reference table tailored to your selected units.',
      ],
      faqs: [
        {
          q: 'Does the Data category use 1024 or 1000?',
          a: 'It uses standard binary multiples (1 KB = 1024 Bytes, 1 MB = 1024 KB) common across operating systems and memory tools.',
        },
        {
          q: 'Can I edit the second field to convert backwards?',
          a: 'Yes, both input boxes are live and immediately recalculate the opposite field.',
        },
        {
          q: 'Which area units are supported?',
          a: 'Square meters, square kilometers, square centimeters, hectares, acres, and square feet.',
        },
        {
          q: 'Does it work offline?',
          a: 'Yes, all conversion factors are bundled client-side.',
        },
      ],
    },
  },
  {
    slug: 'currency-converter',
    category: 'finance',
    icon: 'arrow-left-right',
    popular: true,
    relatedSlugs: ['zakat-calculator', 'egypt-salary-calculator', 'loan-calculator'],
    ar: {
      name: 'محول العملات',
      shortDesc: 'حوّل بين الجنيه المصري والدولار واليورو والريال والدرهم بأسعار صرف محدثة.',
      h1: 'محول العملات المباشر (الجنيه، الدولار، الريال، اليورو)',
      seoTitle: 'محول العملات وأسعار الصرف اليوم (دولار، جنيه، ريال، يورو) | مركز الأدوات',
      seoDescription:
        'حوّل بين الجنيه المصري والدولار الأمريكي والريال السعودي والدرهم الإماراتي واليورو بأسعار صرف محدثة مع ذاكرة مؤقتة لساعة وأسعار احتياطية.',
      keywords: ['محول العملات', 'سعر الدولار', 'تحويل العملات', 'الدولار مقابل الجنيه'],
      whatIs: [
        'محول العملات هو أداة مالية سريعة تتيح لك مقارنة وتحويل القيم بين أبرز العملات العربية والعالمية، وعلى رأسها الجنيه المصري (EGP)، والدولار الأمريكي (USD)، واليورو (EUR)، والريال السعودي (SAR)، والدرهم الإماراتي (AED)، والدينار الكويتي (KWD)، والجنيه الإسترليني (GBP).',
        'تجلب الأداة أسعار الصرف مباشرة من واجهة مجانية مفتوحة بدون مفتاح (open.er-api.com) مع تخزين مؤقت في متصفحك لمدة ساعة واحدة لتسريع التحويل وعدم إهدار البيانات.',
        'وفي حال تعذر الاتصال بالشبكة، تنتقل الأداة تلقائياً إلى جدول أسعار احتياطي مدمج مع إظهار تنبيه واضح للمستخدم بأن الأسعار المعروضة تقريبية.',
      ],
      howToSteps: [
        'أدخل المبلغ المراد تحويله في خانة القيمة.',
        'اختر العملة الأصلية والعملة المستهدفة، أو استخدم زر التبديل لعكس العملتين.',
        'اطلع على قيمة التحويل وسعر الصرف للوحدة الواحدة وتاريخ آخر تحديث.',
      ],
      benefits: [
        'جلب مباشر لأسعار الصرف مع كاش محلي لمدة ساعة لأداء فائق.',
        'دعم العملات العربية الرئيسية مع أعلام مرسومة بدقة SVG.',
        'يعمل حتى عند انقطاع الإنترنت بأسعار مرجعية احتياطية وتنبيه واضح.',
        'إمكانية تحديث الأسعار يدوياً بضغطة زر متى شئت.',
      ],
      faqs: [
        {
          q: 'ما مصدر أسعار الصرف المستخدمة؟',
          a: 'تُجلب الأسعار مباشرة من واجهة open.er-api.com المجانية التي توفر أسعار صرف دولية محدثة يومياً.',
        },
        {
          q: 'هل الأسعار مطابقة تماماً لسعر الصرافة أو البنك المحلي؟',
          a: 'الأسعار المعروضة هي أسعار السوق المتوسطة العالمية (Mid-market rates)، وقد تختلف قليلاً عن سعر البيع والشراء في البنوك المحلية.',
        },
        {
          q: 'ماذا يحدث إذا انقطع الإنترنت؟',
          a: 'تستخدم الأداة تلقائياً آخر أسعار مخزنة أو الأسعار الاحتياطية المدمجة وتنبهك بوضوح بأنها أسعار تقريبية.',
        },
        {
          q: 'كم مرة يتم تحديث الأسعار تلقائياً؟',
          a: 'يُحتفظ بالسعر محلياً لمدة ساعة واحدة لتقليل الطلبات، ويمكنك الضغط على زر التحديث في أي وقت.',
        },
      ],
    },
    en: {
      name: 'Currency Converter',
      shortDesc: 'Convert EGP, USD, EUR, SAR, AED, GBP and more with live rates and offline fallback.',
      h1: 'Live Currency Converter (USD, EGP, SAR, EUR, AED)',
      seoTitle: 'Live Currency Converter & Exchange Rates | Tools Hub',
      seoDescription:
        'Convert between USD, EUR, EGP, SAR, AED, KWD, GBP, and major world currencies with live mid-market rates, 1-hour smart caching, and automatic offline fallback.',
      keywords: ['currency converter', 'exchange rate calculator', 'usd to egp', 'sar to usd'],
      whatIs: [
        'Our Currency Converter provides instant conversions across major global and Middle Eastern currencies including US Dollar (USD), Euro (EUR), Egyptian Pound (EGP), Saudi Riyal (SAR), UAE Dirham (AED), Kuwaiti Dinar (KWD), British Pound (GBP), and more.',
        'Rates are fetched directly in your browser from a free public exchange-rate endpoint (open.er-api.com) and cached locally for 1 hour so repeat conversions load instantaneously.',
        'If you are offline or the upstream API is temporarily unreachable, the tool gracefully switches to built-in fallback rates and displays a transparent "Approximate offline rates" notice.',
      ],
      howToSteps: [
        'Enter the amount you want to convert.',
        'Pick your source currency and target currency, or click the swap icon to reverse the pair.',
        'Read the converted amount, unit exchange rate, and last-updated timestamp.',
      ],
      benefits: [
        'Live mid-market exchange rates fetched without API keys.',
        '1-hour browser cache plus instant manual refresh button.',
        'Clean inline SVG currency badges for quick visual scanning.',
        'Reliable offline fallback with explicit approximate-rate notice.',
      ],
      faqs: [
        {
          q: 'Where do the exchange rates come from?',
          a: 'Rates are retrieved directly in the browser from open.er-api.com, a free public mid-market exchange feed.',
        },
        {
          q: 'Why might my local bank quote a slightly different rate?',
          a: 'Commercial banks and money changers add buy/sell spreads on top of mid-market reference rates.',
        },
        {
          q: 'Does it still work without internet access?',
          a: 'Yes, it falls back to cached or built-in reference rates and marks them clearly as approximate.',
        },
        {
          q: 'How long are fetched rates cached?',
          a: 'Rates are cached in your browser for 60 minutes, with a refresh button available anytime.',
        },
      ],
    },
  },
  {
    slug: 'pregnancy-due-date',
    category: 'health',
    icon: 'baby',
    relatedSlugs: ['age-calculator', 'calorie-calculator', 'bmi-calculator'],
    ar: {
      name: 'حاسبة موعد الولادة',
      shortDesc: 'احسبي موعد الولادة المتوقع وعمر الحمل بالأسابيع وحجم الجنين على تايم لاين 40 أسبوعاً.',
      h1: 'حاسبة موعد الولادة المتوقع ومتابعة الحمل بالأسابيع',
      seoTitle: 'حاسبة موعد الولادة المتوقع وعمر الحمل بالأسابيع | مركز الأدوات',
      seoDescription:
        'احسبي تاريخ الولادة المتوقع بقاعدة نيجل وعمر الحمل الحالي بالأسابيع والأيام والثلث الحالي، وتابعي نمو الجنين أسبوعياً بتشبيهات الفواكه.',
      keywords: ['حاسبة الحمل', 'موعد الولادة المتوقع', 'عمر الحمل بالأسابيع', 'متابعة الحمل'],
      whatIs: [
        'تساعد حاسبة موعد الولادة الأمهات الحوامل على تقدير التاريخ المتوقع للوضع وحساب عمر الحمل الحالي بالأسابيع والأيام انطلاقاً من تاريخ أول يوم في آخر دورة شهرية وطول الدورة المعتاد.',
        'تعتمد الأداة على قاعدة نيجل الطبية القياسية (+280 يوماً أو 40 أسبوعاً مع ضبط الفارق عن متوسط دورة الـ 28 يوماً)، وتوضح لك الثلث الحملي الحالي (الأول أو الثاني أو الثالث) وعدد الأيام المتبقية على الولادة.',
        'ولجعل التجربة ممتعة ومطمئنة، تضم الصفحة خطاً زمنياً تفاعلياً للأسابيع الأربعين يعرض تطور حجم الجنين أسبوعاً بأسبوع بتشبيهات لطيفة ورسومات SVG بسيطة. تنبيه: الحسابات استرشادية ولا تغني عن متابعة طبيب النساء والتوليد.',
      ],
      howToSteps: [
        'اختاري تاريخ أول يوم في آخر دورة شهرية.',
        'حددي متوسط طول دورتك الشهرية بالأيام (الافتراضي 28 يوماً).',
        'استعرضي موعد الولادة المتوقع وعمر الحمل الحالي وتصفحي تايم لاين الأسابيع الـ 40.',
      ],
      benefits: [
        'حساب دقيق وفق قاعدة نيجل المعدّلة لطول الدورة الشهرية.',
        'تحديد عمر الحمل الحالي بالأسابيع والأيام والثلث الحملي.',
        'تايم لاين تفاعلي لمتابعة مراحل نمو الجنين من الأسبوع 4 إلى 40.',
        'تصميم دافئ وهادئ وسهل الاستخدام على الجوال.',
      ],
      faqs: [
        {
          q: 'ما هي قاعدة نيجل المستخدمة لحساب موعد الولادة؟',
          a: 'هي القاعدة الطبية القياسية التي تضيف 280 يوماً (40 أسبوعاً) إلى أول يوم من آخر دورة شهرية مع تعديل الفارق إذا كانت الدورة أقصر أو أطول من 28 يوماً.',
        },
        {
          q: 'هل تلد كل الأمهات في الموعد المحسوب تماماً؟',
          a: 'لا، الولادة الطبيعية غالباً ما تحدث في نطاق أسبوعين قبل الموعد أو بعده؛ والموعد المحسوب هو تاريخ تقديري ببلوغ الأسبوع الأربعين.',
        },
        {
          q: 'أيهما أدق: حساب الدورة أم السونار؟',
          a: 'يظل فحص السونار في الثلث الأول لدى الطبيب هو الأدق خاصة لمن لديهن دورة غير منتظمة.',
        },
        {
          q: 'هل هذه الأداة بديل عن الاستشارة الطبية؟',
          a: 'لا مطلقاً، هي أداة معلوماتية مساعدة ولا تغني عن المتابعة الدورية مع الطبيب المختص.',
        },
      ],
    },
    en: {
      name: 'Pregnancy Due Date Calculator',
      shortDesc: 'Estimate due date, gestational weeks, trimester, and explore a 40-week fetal size timeline.',
      h1: 'Pregnancy Due Date & 40-Week Gestational Timeline',
      seoTitle: 'Pregnancy Due Date Calculator & Week-by-Week Size Guide | Tools Hub',
      seoDescription:
        'Estimate your expected due date using Naegele’s rule adjusted for cycle length, see current gestational weeks and trimester, and explore a 40-week size timeline.',
      keywords: ['pregnancy due date calculator', 'gestational age', 'naegele rule', 'pregnancy weeks'],
      whatIs: [
        'Our Pregnancy Due Date Calculator estimates your expected delivery date, current gestational age in weeks and days, current trimester, and remaining countdown based on the first day of your last menstrual period (LMP) and average cycle length.',
        'It applies the standard Naegele’s rule (+280 days from LMP, adjusted automatically for cycles shorter or longer than 28 days).',
        'An interactive 40-week timeline pairs each milestone with familiar fruit-size comparisons and crisp inline SVG visuals. Always note that estimated dates are informational only and do not replace prenatal care or ultrasound dating from your OB/GYN.',
      ],
      howToSteps: [
        'Select the first day of your last menstrual period (LMP).',
        'Adjust your average menstrual cycle length in days (default 28 days).',
        'View your estimated due date, gestational age, trimester progress, and explore any week on the 40-week timeline.',
      ],
      benefits: [
        'Cycle-adjusted Naegele’s rule calculation.',
        'Shows gestational weeks, days, trimester, and days remaining.',
        'Interactive 40-week milestone explorer with fruit size comparisons.',
        '100% private—all dates remain strictly in your browser.',
      ],
      faqs: [
        {
          q: 'How accurate is an LMP-based due date?',
          a: 'Only about 4–5% of babies arrive on their exact due date; most full-term deliveries occur between weeks 37 and 42.',
        },
        {
          q: 'Why does cycle length matter?',
          a: 'Ovulation shifts earlier or later in shorter or longer cycles, so adjusting away from the 28-day baseline improves accuracy.',
        },
        {
          q: 'What if my ultrasound date differs?',
          a: 'A first-trimester ultrasound measurement performed by your doctor is generally considered the clinical gold standard.',
        },
        {
          q: 'Is this medical advice?',
          a: 'No. Always consult your physician or midwife for prenatal guidance and official dating.',
        },
      ],
    },
  },
  {
    slug: 'calorie-calculator',
    category: 'health',
    icon: 'flame',
    popular: true,
    relatedSlugs: ['bmi-calculator', 'pregnancy-due-date', 'percentage-calculator'],
    ar: {
      name: 'حاسبة السعرات والاحتياج اليومي',
      shortDesc: 'احسب معدل الأيض BMR والسعرات اليومية TDEE وتوزيع البروتين والكربوهيدرات والدهون.',
      h1: 'حاسبة السعرات الحرارية والماكروز اليومية (Mifflin-St Jeor)',
      seoTitle: 'حاسبة السعرات الحرارية والاحتياج اليومي والماكروز | مركز الأدوات',
      seoDescription:
        'احسب احتياجك اليومي من السعرات الحرارية (BMR وTDEE) وتوزيع البروتين والكربوهيدرات والدهون لخسارة الوزن أو التثبيت أو التضخيم العضلي.',
      keywords: ['حاسبة السعرات', 'حساب الاحتياج اليومي', 'حاسبة الماكروز', 'tdee'],
      whatIs: [
        'حاسبة السعرات الحرارية والاحتياج اليومي تساعدك على وضع خطة غذائية واضحة من خلال حساب معدل الأيض الأساسي (BMR) وإجمالي الطاقة المستهلكة يومياً (TDEE) بدقة علمية.',
        'تعتمد الأداة على معادلة ميفلين-سانت جوير (Mifflin-St Jeor) التي تُعد من أدق المعادلات الحديثة، وتجمعها مع مستوى نشاطك البدني الأسبوعي وهدفك الشخصي سواء كان تثبيت الوزن أو خسارته تدريجياً أو زيادته وبناء العضلات.',
        'وبالإضافة إلى السعرات المستهدفة، ترسم لك الأداة مخططاً دائرياً (Donut) يوزع سعراتك اليومية إلى جرامات من البروتين والكربوهيدرات والدهون الصحية. تنبيه: النتائج تقديرية ويُفضل مراجعة أخصائي تغذية أو طبيب قبل الأنظمة الصارمة.',
      ],
      howToSteps: [
        'اختر الجنس وأدخل العمر والطول بالسنتيمتر والوزن بالكيلوجرام.',
        'حدد مستوى نشاطك البدني الأسبوعي بدقة من خامل حتى رياضي جداً.',
        'اختر هدفك (تثبيت، خسارة وزن، أو زيادة وزن) لتظهر لك السعرات وجرامات الماكروز فوراً.',
      ],
      benefits: [
        'تطبيق دقيق لمعادلة Mifflin-St Jeor المعتمدة عالمياً.',
        'حساب BMR وTDEE والسعرات الموصى بها لهدفك في شاشة واحدة.',
        'توزيع عملي للماكروز بالجرامات والنسب في رسم بياني واضح.',
        'منزلقات تفاعلية سهلة التعديل على شاشات الهاتف.',
      ],
      faqs: [
        {
          q: 'ما الفرق بين BMR و TDEE؟',
          a: 'معدل BMR هو السعرات التي يحرقها جسمك في الراحة التامة للوظائف الحيوية فقط، بينما TDEE يشمل أيضاً حرقك اليومي من الحركة والعمل والتمارين.',
        },
        {
          q: 'كم سعرة حرارية تطرحها الحاسبة لخسارة الوزن؟',
          a: 'تطرح الحاسبة عجزاً معتدلاً وآمناً بنحو 500 سعرة يومياً من TDEE (أو ترفع 400 سعرة للزيادة الصحية) مع مراعاة عدم الهبوط دون الحدود الدنيا الآمنة.',
        },
        {
          q: 'كيف يتم حساب توزيع البروتين والكارب والدهون؟',
          a: 'تُوزع الماكروز بنسب متوازنة (نحو 30% بروتين، 40% كربوهيدرات، 30% دهون في حالات التثبيت وخسارة الوزن) مع تحويل السعرات إلى جرامات.',
        },
        {
          q: 'هل تناسب الحاسبة الحوامل أو الحالات المرضية؟',
          a: 'هذه المعادلة مخصصة للبالغين الأصحاء؛ الحالات الصحية الخاصة والحمل والرضاعة تتطلب متابعة طبية مباشرة.',
        },
      ],
    },
    en: {
      name: 'Calorie & Macro Calculator',
      shortDesc: 'Calculate BMR, TDEE, daily calorie targets, and Protein/Carb/Fat macros.',
      h1: 'Daily Calorie, TDEE & Macro Calculator (Mifflin-St Jeor)',
      seoTitle: 'Daily Calorie, BMR, TDEE & Macro Calculator | Tools Hub',
      seoDescription:
        'Calculate your BMR, daily TDEE calorie burn, and customized Protein, Carb, and Fat macro targets for weight loss, maintenance, or lean muscle gain.',
      keywords: ['calorie calculator', 'tdee calculator', 'macro calculator', 'mifflin st jeor'],
      whatIs: [
        'Our Calorie & Macro Calculator estimates both your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) so you can plan nutrition around concrete numbers rather than guesswork.',
        'Using the clinically validated Mifflin-St Jeor equation combined with five realistic activity tiers, it outputs tailored daily calorie targets whether your goal is steady fat loss, weight maintenance, or muscle gain.',
        'An animated SVG macro donut translates your daily target into exact grams of protein, carbohydrates, and dietary fats. Please treat these numbers as educational estimates and consult a physician or registered dietitian for medical nutrition plans.',
      ],
      howToSteps: [
        'Select biological sex and enter your age, height (cm), and weight (kg).',
        'Choose your weekly activity level from sedentary to extra active.',
        'Pick your goal (Maintain, Lose Weight, or Gain Weight) to inspect calories and macro grams.',
      ],
      benefits: [
        'Built on the gold-standard Mifflin-St Jeor metabolic equation.',
        'Displays BMR, TDEE, and goal-adjusted calories together.',
        'Animated macro donut showing grams and calorie shares.',
        'Smooth touch sliders designed for mobile ergonomics.',
      ],
      faqs: [
        {
          q: 'What is the difference between BMR and TDEE?',
          a: 'BMR is the energy your body burns purely at rest to sustain vital organs, whereas TDEE adds calories burned through daily movement and exercise.',
        },
        {
          q: 'How big is the calorie deficit for weight loss?',
          a: 'It uses a sustainable 500 kcal daily deficit below TDEE (with sensible floor guards), targeting roughly 0.45 kg of loss per week.',
        },
        {
          q: 'How are macro grams calculated?',
          a: 'Calories are split across protein (4 kcal/g), carbohydrates (4 kcal/g), and fats (9 kcal/g) according to your selected fitness goal.',
        },
        {
          q: 'Is this suitable during pregnancy or illness?',
          a: 'Standard adult formulas do not account for pregnancy, lactation, or clinical conditions—please consult a healthcare professional.',
        },
      ],
    },
  },
  {
    slug: 'bmi-calculator',
    category: 'health',
    icon: 'activity',
    relatedSlugs: ['calorie-calculator', 'pregnancy-due-date', 'unit-converter'],
    ar: {
      name: 'حاسبة كتلة الجسم BMI',
      shortDesc: 'احسب مؤشر كتلة الجسم والوزن الصحي التقريبي على مقياس نصف دائري تفاعلي.',
      h1: 'حاسبة مؤشر كتلة الجسم (BMI) والوزن المثالي',
      seoTitle: 'حاسبة كتلة الجسم BMI والوزن المثالي | مركز الأدوات',
      seoDescription:
        'احسب مؤشر كتلة الجسم (BMI) بالنظام المتري أو الإمبراطوري مع مقياس نصف دائري ملون، وتعرف على تصنيف وزنك والنطاق الصحي الموصى به لطولك.',
      keywords: ['حاسبة bmi', 'مؤشر كتلة الجسم', 'الوزن المثالي', 'حساب الوزن المناسب'],
      whatIs: [
        'حاسبة مؤشر كتلة الجسم (Body Mass Index - BMI) هي أداة صحية سريعة تقيس العلاقة بين وزنك وطولك لتعطيك مؤشراً أولياً حول ما إذا كان وزنك ضمن النطاق الصحي أو يميل إلى النحافة أو الزيادة.',
        'تدعم الأداة التبديل بين النظام المتري (السنتيمتر والكيلوجرام) والنظام الإمبراطوري (القدم والبوصة والباوند)، وتُظهر النتيجة عبر مقياس نصف دائري (Gauge) بإبرة متحركة تشير إلى منطقتك اللونية من الأزرق إلى الأخضر والأصفر والأحمر.',
        'كما تحسب الأداة نطاق الوزن الصحي التقريبي المناسب لطولك وفق معايير منظمة الصحة العالمية (BMI بين 18.5 و24.9). تنبيه: لا يفرق مؤشر BMI بين الكتلة العضلية والدهون، لذا فهو مقياس عام وليس تشخيصاً طبياً.',
      ],
      howToSteps: [
        'اختر نظام القياس المناسب لك: متري (سم / كجم) أو إمبراطوري (قدم / باوند).',
        'أدخل طولك ووزنك باستخدام الخانات أو المنزلقات التفاعلية.',
        'راقب حركة إبرة المقياس النصف دائري واقرأ التصنيف ونطاق الوزن الصحي لطولك.',
      ],
      benefits: [
        'مقياس Gauge نصف دائري بصري مع إبرة متحركة ناعمة.',
        'دعم كامل للنظام المتري والإمبراطوري في شاشة واحدة.',
        'حساب تلقائي لنطاق الوزن الصحي التقريبي بناءً على طولك.',
        'تنويه طبي واضح يوضح حدود المؤشر للرياضيين.',
      ],
      faqs: [
        {
          q: 'ما هي معادلة حساب مؤشر كتلة الجسم BMI؟',
          a: 'يُحسب بقسمة الوزن بالكيلوجرام على مربع الطول بالمتر (الوزن ÷ الطول²).',
        },
        {
          q: 'ما النطاق الطبيعي لمؤشر كتلة الجسم؟',
          a: 'تُصنف منظمة الصحة العالمية القيم من 18.5 إلى 24.9 كوزن صحي طبيعي للبالغين.',
        },
        {
          q: 'هل ينطبق مؤشر BMI على لاعبي كمال الأجسام والأطفال؟',
          a: 'لا بدقة؛ لأن العضلات أثقل من الدهون فقد يظهر الرياضي بمؤشر مرتفع رغم انخفاض دهونه، كما أن للأطفال والمراهقين منحنيات نمو خاصة بالعمر.',
        },
        {
          q: 'كيف يُحسب نطاق الوزن الصحي لطولي؟',
          a: 'بضرب مربع طولك بالمتر في الحد الأدنى الطبيعي (18.5) والحد الأقصى الطبيعي (24.9).',
        },
      ],
    },
    en: {
      name: 'BMI Calculator',
      shortDesc: 'Measure Body Mass Index in Metric or Imperial units with an animated needle gauge.',
      h1: 'Body Mass Index (BMI) & Healthy Weight Range Calculator',
      seoTitle: 'BMI Calculator with Animated Gauge & Ideal Range | Tools Hub',
      seoDescription:
        'Calculate your Body Mass Index (BMI) in Metric or Imperial units on an interactive semicircular needle gauge and discover your WHO healthy weight range.',
      keywords: ['bmi calculator', 'body mass index', 'healthy weight calculator', 'ideal weight'],
      whatIs: [
        'Our BMI Calculator measures your Body Mass Index from height and weight to provide a quick screening snapshot against World Health Organization (WHO) adult categories.',
        'Toggle effortlessly between Metric (cm / kg) and Imperial (ft + in / lbs) units. As values change, a semicircular SVG gauge smoothly sweeps its needle across Underweight, Normal, Overweight, and Obese color zones.',
        'Alongside your score, the tool displays the healthy weight range tailored to your exact height. Remember that BMI is a general screening indicator and does not distinguish muscle mass from body fat.',
      ],
      howToSteps: [
        'Select Metric (cm/kg) or Imperial (ft/in/lbs) units.',
        'Adjust your height and weight using the numeric inputs or sliders.',
        'Read your BMI score, WHO category, needle position, and recommended healthy weight span.',
      ],
      benefits: [
        'Animated semicircular SVG gauge with smooth needle tracking.',
        'Instant Metric and Imperial unit switching.',
        'Calculates personalized healthy weight bounds for your height.',
        'Clear clinical context for athletes and general users.',
      ],
      faqs: [
        {
          q: 'What is the standard BMI formula?',
          a: 'BMI equals weight in kilograms divided by height in meters squared (kg / m²).',
        },
        {
          q: 'What is considered a normal adult BMI?',
          a: 'The World Health Organization defines 18.5 to 24.9 as the normal healthy adult range.',
        },
        {
          q: 'Why can BMI overestimate fat in athletes?',
          a: 'Muscle tissue is denser than fat, so muscular individuals may score above 25 despite having low body fat.',
        },
        {
          q: 'Does this apply to children and teens?',
          a: 'Adult BMI categories do not apply to children or teenagers, who require age- and sex-specific growth percentiles.',
        },
      ],
    },
  },
  {
    slug: 'loan-calculator',
    category: 'finance',
    icon: 'landmark',
    popular: true,
    relatedSlugs: ['egypt-salary-calculator', 'percentage-calculator', 'currency-converter'],
    ar: {
      name: 'حاسبة القروض والأقساط',
      shortDesc: 'احسب القسط الشهري وإجمالي الفوائد وجدول السداد الكامل القابل للتصدير CSV.',
      h1: 'حاسبة القروض والتمويل وجدول السداد الشهري',
      seoTitle: 'حاسبة القروض والأقساط الشهرية وجدول السداد CSV | مركز الأدوات',
      seoDescription:
        'احسب القسط الشهري وإجمالي الفائدة المتناقصة أو الثابتة للقروض والتمويل، مع مخطط دائري وبياني وتصدير جدول السداد الكامل بصيغة CSV.',
      keywords: ['حاسبة القروض', 'حساب القسط الشهري', 'فائدة متناقصة وثابتة', 'جدول سداد القرض'],
      whatIs: [
        'حاسبة القروض والأقساط أداة مالية متقدمة تمنحك رؤية شفافة للتكلفة الحقيقية لأي قرض شخصي أو تمويل عقاري أو قسط سيارة قبل التوقيع مع البنك أو جهة التمويل.',
        'تدعم الأداة نظامي الفائدة الشائعين: الفائدة المتناقصة (Amortized Reducing Balance) والفائدة الثابتة (Flat Rate)، مع إمكانية إدخال مدة التمويل بالسنوات أو الشهور لتظهر لك قيمة القسط الشهري، وإجمالي الفوائد المدفوعة، والمبلغ الكلي.',
        'تعرض الأداة رسمين بيانيين: مخطط دائري يوضح نسبة أصل القرض إلى الفوائد، ومنحنى خطي يبيّن تناقص الرصيد المتبقي شهراً بشهر، إلى جانب جدول سداد تفصيلي كامل يمكنك تنزيله بضغطة زر كملف CSV لفتحه في Excel.',
      ],
      howToSteps: [
        'أدخل مبلغ القرض أو التمويل المطلوب.',
        'حدد معدل الفائدة السنوية واختر نوع الفائدة (متناقصة أو ثابتة).',
        'اختر مدة السداد بالشهور أو السنوات لمشاهدة القسط الشهري والرسوم البيانية وجدول السداد القابل للتصدير.',
      ],
      benefits: [
        'دعم حساب الفائدة المتناقصة والفائدة الثابتة بدقة مصرفية.',
        'رسم بياني دائري لتوزيع الأصل والفوائد ومنحنى لتناقص الرصيد.',
        'جدول سداد شهري تفصيلي يوضح حصة الأصل والفائدة في كل قسط.',
        'تصدير جدول السداد الكامل كملف CSV جاهز لبرنامج Excel.',
      ],
      faqs: [
        {
          q: 'ما الفرق بين الفائدة المتناقصة والفائدة الثابتة؟',
          a: 'الفائدة المتناقصة تُحسب على الرصيد المتبقي فقط بعد كل قسط شهري، بينما الثابتة تُحسب على كامل أصل القرض طوال المدة فتكون تكلفتها الفعلية أعلى بنحو الضعف تقريباً.',
        },
        {
          q: 'كيف أفتح جدول السداد المُصدّر بصيغة CSV؟',
          a: 'اضغط "تصدير CSV" ثم افتح الملف في Microsoft Excel أو Google Sheets حيث يتم ترميزه بـ UTF-8 لدعم النصوص العربية بسلاسة.',
        },
        {
          q: 'هل تشمل الحاسبة المصاريف الإدارية للبنوك؟',
          a: 'تحسب الأداة أصل القرض والفائدة الأساسية؛ والمصاريف الإدارية أو التأمين قد تضيفها بعض البنوك بشكل منفصل.',
        },
        {
          q: 'هل البيانات المالية التي أدخلها آمنة؟',
          a: 'نعم، تتم جميع العمليات الحسابية وتوليد ملف الـ CSV محلياً داخل متصفحك بالكامل.',
        },
      ],
    },
    en: {
      name: 'Loan & EMI Calculator',
      shortDesc: 'Compute monthly installments, total interest, balance charts, and export CSV schedules.',
      h1: 'Loan Payment & Amortization Schedule Calculator',
      seoTitle: 'Loan & EMI Calculator with Charts & CSV Amortization Export | Tools Hub',
      seoDescription:
        'Calculate monthly loan payments, total interest (reducing or flat rate), principal-vs-interest donut charts, balance decline curves, and download full CSV amortization schedules.',
      keywords: ['loan calculator', 'emi calculator', 'amortization schedule', 'reducing vs flat interest'],
      whatIs: [
        'Our Loan & EMI Calculator gives borrowers clear insight into the true cost of personal loans, auto financing, or mortgages before committing to a lender.',
        'Switch between standard Reducing Balance amortization and Flat Rate interest, enter your term in months or years, and instantly inspect your monthly installment, total interest paid, and total repayment.',
        'Visualizations include a Principal-vs-Interest donut chart, a remaining-balance curve over time, and a month-by-month amortization ledger ready for one-click CSV export.',
      ],
      howToSteps: [
        'Enter the principal loan amount.',
        'Specify the annual interest rate (%) and choose Reducing Balance or Flat Rate.',
        'Set the duration in months or years to inspect payments, charts, and download the full CSV schedule.',
      ],
      benefits: [
        'Supports both Reducing (amortized) and Flat interest methods.',
        'Dual SVG charts: Principal vs. Interest donut and balance decline curve.',
        'Full monthly amortization table showing principal and interest split.',
        'One-click UTF-8 CSV export compatible with Excel and Google Sheets.',
      ],
      faqs: [
        {
          q: 'What is the difference between reducing and flat interest?',
          a: 'Reducing balance charges interest only on the remaining unpaid principal each month, while flat rate charges interest on the original principal for the entire term.',
        },
        {
          q: 'Does the CSV export work in Excel?',
          a: 'Yes, it exports cleanly with UTF-8 BOM encoding so numbers and headers open properly in Excel and Google Sheets.',
        },
        {
          q: 'Are bank origination fees included?',
          a: 'The calculation covers principal and interest; lender processing fees or insurance premiums vary by bank.',
        },
        {
          q: 'Is my loan data sent anywhere?',
          a: 'No, every amortization calculation and CSV file is generated locally inside your browser.',
        },
      ],
    },
  },
  {
    slug: 'date-difference',
    category: 'date-religion',
    icon: 'calendar-range',
    relatedSlugs: ['age-calculator', 'hijri-converter', 'pregnancy-due-date'],
    ar: {
      name: 'حاسبة الفرق بين تاريخين',
      shortDesc: 'احسب المدة بين تاريخين بالأيام وأيام العمل، أو أضف واطرح أياماً من أي تاريخ.',
      h1: 'حاسبة الفرق بين تاريخين وإضافة وطرح الأيام',
      seoTitle: 'حاسبة الفرق بين تاريخين وأيام العمل وإضافة أيام لتاريخ | مركز الأدوات',
      seoDescription:
        'احسب المدة الدقيقة بين تاريخين بالسنوات والشهور والأيام وأيام العمل الفعلية، مع أداة لإضافة أو طرح أيام وأسابيع من أي تاريخ.',
      keywords: ['الفرق بين تاريخين', 'حساب الايام بين تاريخين', 'اضافة ايام لتاريخ', 'ايام العمل'],
      whatIs: [
        'حاسبة الفرق بين تاريخين هي أداة تنظيم زمني دقيقة تتيح لك معرفة المدة الفاصلة بين أي تاريخين بالسنوات والشهور والأيام، إضافة إلى إجمالي عدد الأيام والأسابيع وعدد أيام العمل الفعلية بعد استثناء عطلة نهاية الأسبوع.',
        'سواء كنت تخطط لموعد تسليم مشروع، أو تحسب مدة عقد إيجار أو إجازة، أو تتابع فترة ضمان، تعرض الأداة النتيجة على خط زمني أفقي واضح بين نقطة البداية ونقطة النهاية.',
        'وتشتمل الأداة أيضاً على وضع مدمج لإضافة أو طرح عدد محدد من الأيام أو الأسابيع أو الشهور من أي تاريخ لمعرفة التاريخ المستقبلي أو الماضي الناتج فوراً.',
      ],
      howToSteps: [
        'اختر وضع الحساب: "الفرق بين تاريخين" أو "إضافة / طرح مدة من تاريخ".',
        'حدّد تاريخ البداية وتاريخ النهاية (مع اختيار نظام العطلة الأسبوعية لحساب أيام العمل).',
        'استعرض النتيجة الدقيقة والخط الزمني التفاعلي وإجمالي الأيام وأيام العمل.',
      ],
      benefits: [
        'حساب مزدوج: الفرق الدقيق بين تاريخين وإضافة/طرح الأيام.',
        'استثناء ذكي لعطلة نهاية الأسبوع (الجمعة والسبت أو السبت والأحد).',
        'خط زمني بصري أنيق يوضح المدى الزمني وتفاصيل الأيام.',
        'دقة كاملة مع الشهور المختلفة والسنوات الكبيسة.',
      ],
      faqs: [
        {
          q: 'كيف يتم حساب أيام العمل بين تاريخين؟',
          a: 'تقوم الأداة بالمرور على نطاق الأيام واستبعاد أيام العطلة الأسبوعية التي تختارها (الجمعة والسبت في معظم الدول العربية، أو السبت والأحد).',
        },
        {
          q: 'هل يشمل الحساب يوم البداية أو يوم النهاية؟',
          a: 'يُحسب الفارق الزمني القياسي بين التاريخين، كما يظهر لك خيار استعراض إجمالي الأيام شاملة نقطة البداية بوضوح.',
        },
        {
          q: 'هل يمكنني معرفة التاريخ بعد 90 يوماً من اليوم؟',
          a: 'نعم، اختر تبويب "إضافة / طرح مدة"، وأدخل تاريخ البداية ثم 90 يوماً لتظهر لك النتيجة واسم اليوم فوراً.',
        },
        {
          q: 'هل تعمل الأداة مع تواريخ قديمة جداً؟',
          a: 'نعم، تتعامل الأداة بسلاسة مع التواريخ عبر قرون متعددة.',
        },
      ],
    },
    en: {
      name: 'Date Difference Calculator',
      shortDesc: 'Compute spans in years, days, business days, or add/subtract days from any date.',
      h1: 'Date Difference & Date Arithmetic Calculator',
      seoTitle: 'Date Difference, Business Days & Add/Subtract Days | Tools Hub',
      seoDescription:
        'Calculate exact duration between two dates in years, months, days, weeks, and working days—or add/subtract days, weeks, and months from any date.',
      keywords: ['date difference', 'days between dates', 'business days calculator', 'add days to date'],
      whatIs: [
        'Our Date Difference Calculator measures the exact duration between any two calendar dates in years, months, and days alongside total elapsed days, weeks, and configurable business days.',
        'Whether you are calculating contract durations, project deadlines, notice periods, or travel lengths, a horizontal SVG timeline visualizes the span clearly between start and end dates.',
        'Switch to the built-in Date Arithmetic tab anytime to add or subtract a specific number of days, weeks, months, or years from any reference date.',
      ],
      howToSteps: [
        'Select either "Between Two Dates" or "Add / Subtract Time".',
        'Pick your start and end dates (and choose your regional weekend pattern for business-day counting).',
        'Inspect the exact duration breakdown, business days count, and horizontal timeline.',
      ],
      benefits: [
        'Two-in-one tool: date span difference plus date addition/subtraction.',
        'Supports both Fri–Sat and Sat–Sun weekend definitions.',
        'Animated horizontal SVG timeline linking start and end dates.',
        'Handles leap years and multi-month spans accurately.',
      ],
      faqs: [
        {
          q: 'Can I choose Friday–Saturday as the weekend?',
          a: 'Yes, toggle between Friday–Saturday (common across MENA) and Saturday–Sunday when calculating working days.',
        },
        {
          q: 'How do I find the date 90 days from today?',
          a: 'Switch to the Add / Subtract tab, keep today as the start date, choose Add (+), and enter 90 days.',
        },
        {
          q: 'Are leap years counted properly?',
          a: 'Yes, native calendar math accounts for February 29 in every leap year.',
        },
        {
          q: 'Does it work offline?',
          a: 'Yes, all date calculations run locally in your browser.',
        },
      ],
    },
  },
  {
    slug: 'number-to-words',
    category: 'text',
    icon: 'banknote',
    relatedSlugs: ['word-counter', 'arabic-text-decorator', 'currency-converter'],
    ar: {
      name: 'تحويل الأرقام إلى حروف',
      shortDesc: 'تفقيط الأرقام بالعربية بدقة نحوية كاملة للشيكات والعقود مع الجنيه والريال والدولار.',
      h1: 'أداة تفقيط وتحويل الأرقام إلى حروف عربية للشيكات',
      seoTitle: 'تحويل الأرقام إلى حروف عربية (تفقيط الشيكات والعقود) | مركز الأدوات',
      seoDescription:
        'حوّل الأرقام والمبالغ المالية إلى كلمات عربية صحيحة نحوياً (تفقيط) للشيكات والعقود، مع دعم الجنيه المصري والقرش والريال السعودي والهللة والدولار.',
      keywords: ['تفقيط الأرقام', 'تحويل الرقم إلى حروف', 'كتابة المبلغ بالحروف', 'تفقيط شيكات'],
      whatIs: [
        'أداة تحويل الأرقام إلى حروف (التفقيط) صُممت خصيصاً لكتابة المبالغ المالية والأرقام الحسابية باللغة العربية الفصحى السليمة نحوياً، مما يجعلها رفيقاً أساسياً عند تحرير الشيكات البنكية والفواتير والعقود القانونية.',
        'تراعي خوارزمية التفقيط قواعد التذكير والتأنيث في اللغة العربية، وصيغ المثنى والجمع والتمييز (مثل: ألف، ألفان، ثلاثة آلاف، أحد عشر جنيهاً، مائة وعشرون ريالاً)، وتتعامل بدقة مع الكسور العشرية لتحويلها إلى قروش أو هللات أو سنتات.',
        'تُعرض النتيجة داخل بطاقة أنيقة مستوحاة من ورقة الشيك البنكي بخط واضح ومقروء مع زر نسخ مباشر يمنع الأخطاء الإملائية عند النقل.',
      ],
      howToSteps: [
        'أدخل الرقم أو المبلغ المالي (يمكنك تضمين رقمين عشريين مثل 1235.50).',
        'اختر العملة المطلوبة: جنيه مصري، ريال سعودي، درهم إماراتي، دولار أمريكي، أو رقم مجرد بدون عملة.',
        'اقرأ النص المفقط داخل نموذج الشيك، ثم اضغط "نسخ النص" لاستخدامه في مستندك.',
      ],
      benefits: [
        'قواعد تفقيط عربية دقيقة تراعي التذكير والتأنيث والمثنى والتمييز.',
        'دعم العملات وأجزائها الكسرية (جنيه/قرش، ريال/هللة، درهم/فلس، دولار/سنت).',
        'دعم الأرقام الكبيرة حتى المليارات والتريليونات.',
        'عرض أنيق بصيغة شيك جاهز للمراجعة والنسخ السريع.',
      ],
      faqs: [
        {
          q: 'ما المقصود بتفقيط الأرقام؟',
          a: 'التفقيط هو كتابة القيمة الرقمية للمبلغ بالحروف والكلمات لمنع التلاعب أو اللبس في الشيكات المصرفية والعقود التجارية.',
        },
        {
          q: 'هل تتعامل الأداة مع القروش والهللات؟',
          a: 'نعم، أي جزء عشري بعد الفاصلة (حتى خانتين) يُحوّل تلقائياً إلى القروش أو الهللات أو الفلس أو السنت حسب العملة المختارة.',
        },
        {
          q: 'ما أكبر رقم تدعمه الأداة؟',
          a: 'تدعم الأداة الأرقام حتى 999 ملياراً مع الكسور العشرية بدقة كاملة.',
        },
        {
          q: 'هل تضيف الأداة عبارة "فقط لا غير" في النهاية؟',
          a: 'نعم، يمكنك تفعيل أو إلغاء خيار إضافة "فقط ... لا غير" حسب صيغة الشيك أو العقد المطلوب.',
        },
      ],
    },
    en: {
      name: 'Number to Words',
      shortDesc: 'Spell out numbers & currency amounts into accurate words for checks and contracts.',
      h1: 'Number to Words & Check Amount Writer',
      seoTitle: 'Number to Words Converter for Checks & Invoices | Tools Hub',
      seoDescription:
        'Convert numbers and financial amounts into grammatically accurate written words for checks, invoices, and legal contracts across USD, EGP, SAR, AED, or plain numbers.',
      keywords: ['number to words', 'check writer', 'amount in words', 'spell out numbers'],
      whatIs: [
        'Our Number to Words converter transforms digits and decimal currency amounts into crisp, grammatically accurate written words—ideal for filling out bank checks, legal agreements, and formal invoices without spelling mistakes.',
        'In English mode, it spells out numbers up to hundreds of billions cleanly alongside fractional cents, piasters, halalas, or fils depending on the chosen currency. In Arabic mode, it applies full Arabic grammatical gender and pluralization rules (Tafqeet).',
        'Your spelled-out figure is presented inside a refined check-voucher preview card with optional "Only" suffix formatting and instant one-click copying.',
      ],
      howToSteps: [
        'Enter any whole or decimal number (e.g., 1235.50).',
        'Select a currency (USD, EGP, SAR, AED, or Plain Number) and optional "Only" check suffix.',
        'Inspect the formatted check-style preview and click Copy to use it in your document.',
      ],
      benefits: [
        'Handles integers up to billions plus two-digit decimal fractions.',
        'Supports USD, EGP, SAR, AED, and plain number modes.',
        'Check-voucher preview layout for effortless proofreading.',
        'Instant one-click copy with optional formal suffix.',
      ],
      faqs: [
        {
          q: 'How are decimals handled for currencies?',
          a: 'Up to two decimal places are converted into the corresponding subunit (cents, piasters, halalas, or fils).',
        },
        {
          q: 'Can I spell out a plain number without a currency?',
          a: 'Yes, choose "Plain Number" from the currency selector to omit currency units.',
        },
        {
          q: 'What is the maximum number supported?',
          a: 'The converter supports numbers up to 999,999,999,999.99.',
        },
        {
          q: 'Does it work offline?',
          a: 'Yes, all text conversion logic executes locally inside your browser.',
        },
      ],
    },
  },
  {
    slug: 'image-converter',
    category: 'images-pdf',
    icon: 'refresh-cw',
    relatedSlugs: ['image-compressor', 'images-to-pdf', 'merge-pdf'],
    ar: {
      name: 'محوّل صيغ الصور',
      shortDesc: 'حوّل صورك بين JPG وPNG وWebP دفعة واحدة داخل متصفحك مع تحميل ZIP.',
      h1: 'محول صيغ الصور الفوري (JPG / PNG / WebP)',
      seoTitle: 'تحويل صيغ الصور أونلاين (JPG, PNG, WebP) بدون رفع | مركز الأدوات',
      seoDescription:
        'حوّل صورك بين صيغ JPG وPNG وWebP بسرعة وخصوصية كاملة داخل متصفحك. يدعم تحويل عدة صور مع ضبط الجودة وتحميلها في ملف ZIP.',
      keywords: ['تحويل صيغ الصور', 'webp إلى jpg', 'png إلى jpg', 'تحويل الصور'],
      whatIs: [
        'محول صيغ الصور يتيح لك تغيير امتداد صورك فوراً بين الصيغ الثلاث الأكثر انتشاراً على الويب والأجهزة: JPG وPNG وWebP، مثل تحويل صور WebP التي تحمّلها من المتصفح إلى صيغة JPG المتوافقة مع كل البرامج.',
        'تتم عملية التحويل داخل المتصفح عبر Canvas API بدون إرسال صورك إلى أي خادم خارجي، ومع خيار ملء الخلفية الشفافة بلون أبيض تلقائياً عند التحويل من PNG أو WebP إلى صيغة JPG التي لا تدعم الشفافية.',
        'يمكنك رفع عدة صور في وقت واحد وضبط نسبة الجودة ثم تنزيل كل صورة محوّلة مباشرة أو تنزيلها مجتمعة في أرشيف ZIP واحد.',
      ],
      howToSteps: [
        'اسحب الصور وأفلتها في منطقة الرفع أو اخترها من جهازك.',
        'حدد صيغة الهدف المطلوبة (JPG أو PNG أو WebP) واضبط الجودة.',
        'اضغط "تحويل الصور" ثم حمّل الملفات المحوّلة فردياً أو في ملف ZIP.',
      ],
      benefits: [
        'تحويل فوري بدون رفع أي صورة على الإنترنت.',
        'معالجة ذكية للشفافية عند التحويل إلى JPG.',
        'تحويل متعدد الدفعات مع تنزيل ZIP سريع.',
        'يدعم تحويل صور WebP وAVIF وPNG وJPG بسلاسة.',
      ],
      faqs: [
        {
          q: 'ماذا يحدث للخلفية الشفافة عند التحويل من PNG إلى JPG؟',
          a: 'لأن صيغة JPG لا تدعم الشفافية، تملأ الأداة الخلفية الشفافة باللون الأبيض النظيف بدلاً من ظهورها باللون الأسود.',
        },
        {
          q: 'هل يمكنني تحويل صور WebP إلى JPG لفتحها في برامج التصميم؟',
          a: 'نعم، اختر صيغة الهدف JPG وارفع صور WebP ليتم تحويلها خلال ثوانٍ.',
        },
        {
          q: 'هل تتأثر أبعاد الصورة الأصلية؟',
          a: 'لا، تحافظ الأداة على نفس الطول والعرض الأصليين للصورة دون قص أو تصغير.',
        },
        {
          q: 'هل التحويل مجاني بدون حد يومي؟',
          a: 'نعم، الأداة مجانية تماماً وبلا حدود لأنها تستخدم معالج جهازك مباشرة.',
        },
      ],
    },
    en: {
      name: 'Image Format Converter',
      shortDesc: 'Batch convert between JPG, PNG, and WebP locally in your browser with ZIP download.',
      h1: 'Fast Client-Side Image Converter (JPG, PNG, WebP)',
      seoTitle: 'Convert Image Formats Online (JPG, PNG, WebP) Privately | Tools Hub',
      seoDescription:
        'Convert WebP, PNG, and JPG images right inside your browser with zero uploads. Supports batch conversion, quality control, transparency handling, and ZIP downloads.',
      keywords: ['image converter', 'webp to jpg', 'png to webp', 'batch image converter'],
      whatIs: [
        'Our Image Format Converter lets you switch effortlessly between JPG, PNG, and WebP—whether you need to turn downloaded WebP assets into universally compatible JPGs or upgrade heavy PNGs into lightweight WebP files.',
        'Everything runs inside your browser via the HTML5 Canvas API with zero server uploads. When converting transparent PNG or WebP images into JPG, the tool automatically composites a crisp white background instead of turning transparent areas black.',
        'Drop an entire batch of photos, choose your target format and quality setting, and download individual files or a single ZIP archive.',
      ],
      howToSteps: [
        'Drop one or more images into the upload area.',
        'Pick your target output format (JPG, PNG, or WebP) and desired quality.',
        'Click Convert and download images individually or as a ZIP bundle.',
      ],
      benefits: [
        '100% browser-based with zero file uploads.',
        'Automatic white background fill when converting alpha PNG/WebP to JPG.',
        'Preserves original pixel dimensions.',
        'Batch processing with instant ZIP download.',
      ],
      faqs: [
        {
          q: 'How is transparency handled when converting PNG to JPG?',
          a: 'Since JPG does not support alpha transparency, transparent pixels are filled cleanly with white rather than black.',
        },
        {
          q: 'Does conversion resize my image dimensions?',
          a: 'No, output images retain their exact original width and height.',
        },
        {
          q: 'Can I convert WebP images downloaded from the web to JPG?',
          a: 'Yes! Drop your WebP files, select JPG as the target format, and convert in seconds.',
        },
        {
          q: 'Are there file count limits?',
          a: 'No daily limits or watermarks—convert as many files as your browser memory handles.',
        },
      ],
    },
  },
  {
    slug: 'arabic-text-decorator',
    category: 'text',
    icon: 'sparkles',
    popular: true,
    relatedSlugs: ['word-counter', 'number-to-words', 'qr-code-generator'],
    ar: {
      name: 'زخرفة الأسماء والحروف',
      shortDesc: 'أكثر من 40 نمط زخرفة جاهز بالرموز والتشكيل والإطارات للأسماء والألعاب والسوشيال.',
      h1: 'زخرفة الأسماء والحروف العربية والإنجليزية (40+ نمط)',
      seoTitle: 'زخرفة الأسماء والنصوص العربية والإنجليزية أونلاين | مركز الأدوات',
      seoDescription:
        'زخرف اسمك أو نصوصك بأكثر من 40 نمط زخرفة احترافي بالرموز والأقواس والتشكيل وحروف اليونيكود للألعاب والسوشيال ميديا مع نسخ بضغطة واحدة.',
      keywords: ['زخرفة اسماء', 'زخرفة عربي', 'زخرفة ببجي', 'زخرفة حروف'],
      whatIs: [
        'أداة زخرفة الأسماء والحروف تمنحك أكثر من 40 تصميماً مزخرفاً جاهزاً للنسخ الفوري، تناسب أسماء الحسابات في منصات التواصل الاجتماعي، وألقاب الألعاب الإلكترونية، والبايو، وعناوين المجموعات.',
        'تعمل الزخرفة بسلاسة مع الأسماء العربية والإنجليزية على حد سواء؛ فالنصوص العربية تحصل على لمسات التشكيل الجمالي والتطويل (الكشيدة) والأقواس والرموز المزخرفة، بينما تتحول الحروف الإنجليزية إلى عشرات أنماط اليونيكود الأنيقة مثل الخط القوطي والعريض والمائل والمؤطر.',
        'يمكنك تصفية الأنماط حسب الفئة (الكل، أسماء، ألعاب، سوشيال ميديا) والبحث عن نمط معين، ومعاينة اسمك بحجم واضح قبل نسخه بضغطة زر واحدة مع تأكيد فوري.',
      ],
      howToSteps: [
        'اكتب اسمك أو العبارة التي تريد زخرفتها بالعربية أو الإنجليزية في مربع الإدخال.',
        'استخدم أزرار التصفية (أسماء، ألعاب، سوشيال) لاختيار الأسلوب المناسب لذوقك.',
        'اضغط على زر "نسخ" في أي بطاقة لتصبح الزخرفة جاهزة للصق في حسابك أو لعبتك.',
      ],
      benefits: [
        'أكثر من 40 نمطاً متنوعاً بين الرموز والتشكيل وحروف اليونيكود.',
        'دعم ذكي للزخرفة العربية (كشيدة وتشكيل وإطارات) والإنجليزية معاً.',
        'تصنيف الأنماط وتسهيل البحث داخلها مع معاينة فورية كبيرة.',
        'توافق ممتاز مع إنستغرام وتيك توك وفيسبوك وألعاب الهواتف.',
      ],
      faqs: [
        {
          q: 'هل تظهر هذه الزخارف بشكل سليم في الألعاب ومنصات التواصل؟',
          a: 'نعم، تعتمد الزخارف على محارف Unicode القياسية التي تدعمها أغلب التطبيقات والهواتف الحديثة دون الحاجة لتثبيت خطوط خاصة.',
        },
        {
          q: 'هل تعمل الأداة مع الأسماء العربية؟',
          a: 'نعم، تتضمن قوالب خاصة للعربية تستخدم الكشيدة (ـ) والتشكيل المتوازن والإطارات المزخرفة، بالإضافة لقوالب إنجليزية بيونيكود.',
        },
        {
          q: 'لماذا قد ترفض بعض الألعاب رموزاً معينة في الاسم؟',
          a: 'بعض الألعاب تضع قيوداً على عدد المحارف أو الرموز الخاصة؛ جرّب أكثر من نمط من قسم "ألعاب" حتى تجد النمط المقبول في لعبتك.',
        },
        {
          q: 'هل يمكنني زخرفة جملة كاملة أم اسم واحد فقط؟',
          a: 'يمكنك زخرفة اسم واحد أو عبارة قصيرة للبايو وسيتحدث العرض المباشر في جميع البطاقات تلقائياً.',
        },
      ],
    },
    en: {
      name: 'Stylish Text & Name Decorator',
      shortDesc: 'Generate 40+ Unicode fonts, frames, gaming tags, and Arabic/English name styles.',
      h1: 'Stylish Name & Unicode Text Decorator (40+ Styles)',
      seoTitle: 'Stylish Name & Unicode Text Decorator (40+ Fonts) | Tools Hub',
      seoDescription:
        'Transform your name or bio into 40+ Unicode fonts, decorative frames, gaming clans, and stylish Arabic/English scripts with instant one-click copy.',
      keywords: ['stylish text generator', 'fancy font generator', 'gaming name decorator', 'unicode text'],
      whatIs: [
        'Our Stylish Text & Name Decorator turns ordinary names, gaming handles, and social media bios into 40+ distinctive Unicode variations ready for instant copy and paste.',
        'For English letters, it maps characters dynamically to bold, italic, gothic, script, monospace, double-struck, circled, and squared Unicode alphabets. For Arabic text, it offers balanced Kashida elongation, ornamental diacritics, brackets, and calligraphic frames.',
        'Filter effortlessly across Names, Gaming, and Social categories or search styles directly—every card updates live as you type.',
      ],
      howToSteps: [
        'Type your name, handle, or short bio in English or Arabic.',
        'Filter styles by category (All, Names, Gaming, Social) or search by style name.',
        'Click Copy on any card to copy the styled Unicode string straight to your clipboard.',
      ],
      benefits: [
        'Over 40 distinct Unicode font mappings and decorative frames.',
        'Built for both English Unicode alphabets and Arabic kashida/ornaments.',
        'Category filtering and instant live preview across all styles.',
        'Works natively in Instagram, TikTok, Discord, and mobile games.',
      ],
      faqs: [
        {
          q: 'Do these fancy fonts work without installing an app?',
          a: 'Yes! Because they use standard Unicode characters rather than custom font files, recipients see the exact style natively.',
        },
        {
          q: 'Does it support Arabic names too?',
          a: 'Yes, Arabic inputs automatically unlock decorative Kashida extensions, brackets, and ornamental frames.',
        },
        {
          q: 'Why do some games reject certain symbols?',
          a: 'Individual games limit specific symbol ranges or character lengths—filter by "Gaming" to find lighter, widely accepted styles.',
        },
        {
          q: 'Is there any text length limit?',
          a: 'Short names and bios render best; longer phrases work too and update instantly.',
        },
      ],
    },
  },
];
