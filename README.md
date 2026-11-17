# مركز الأدوات | Tools Hub

منصة أدوات ويب مجانية ثنائية اللغة (**العربية RTL** على الجذر `/` و**الإنجليزية LTR** على `/en`) تضم **21 أداة عملية** تعمل بالكامل داخل متصفح المستخدم (Client-Side 100%) بدون خادم وبدون قاعدة بيانات — مثالية للاستضافة على **Vercel** وجلب زيارات البحث وعرض إعلانات **Google AdSense**.

---

## المميزات الرئيسية

- **21 أداة مستقلة** كل أداة بصفحة خاصة ورابط نظيف (مثال: `/age-calculator` و`/en/age-calculator`) لفهرسة مثالية في محركات البحث.
- **خصوصية تامة 100%**: ملفات الصور والـ PDF وكلمات المرور لا تغادر جهاز المستخدم إطلاقاً.
- **دعم كامل للغتين**: العربية (RTL) على `/` والإنجليزية (LTR) على `/en` مع وسوم `hreflang` و`canonical` التلقائية.
- **تحسين محركات البحث (SEO)**: توليد تلقائي لـ `sitemap.xml` و`robots.txt` وبيانات منظمة `JSON-LD` (`WebApplication` و`FAQPage` و`BreadcrumbList`) وصورة OpenGraph.
- **جاهزية Google AdSense**: مكوّن `AdSlot` يحجز مساحة ثابتة لمنع اهتزاز الصفحة (CLS)، وملف `public/ads.txt`، وقراءة معرّف الناشر من `NEXT_PUBLIC_ADSENSE_ID`.
- **تفضيلات المستخدم**: الوضع الداكن/الفاتح، التبديل بين الأرقام الإنجليزية `123` والعربية `١٢٣`، وسجل آخر الأدوات المستخدمة عبر `localStorage`.

---

## المكتبات المستخدمة

| المكتبة | الوظيفة |
| --- | --- |
| `next` (App Router) + `typescript` + `tailwindcss` | إطار العمل والتوجيه وتنسيق الواجهة |
| `motion` | حركات الظهور، الميلان ثلاثي الأبعاد، والانتقالات مع احترام `prefers-reduced-motion` |
| `lucide-react` | أيقونات الواجهة والأدوات |
| `pdf-lib` | إنشاء ملفات PDF من الصور ودمج ملفات PDF محلياً في المتصفح (تحميل كسول Dynamic Import) |
| `qrcode` | توليد رموز QR Code وتصديرها بصيغتي PNG وSVG |
| `jszip` | تجميع الصور المضغوطة أو المحوّلة في ملف ZIP واحد للتحميل |
| `canvas-confetti` | تأثير احتفالي خفيف عند أول نتيجة ناجحة في الأدوات المناسبة |

---

## التشغيل المحلي (Local Development)

1. تأكد من تثبيت **Node.js 18+** ثم ثبّت الحزم:
   ```bash
   npm install
   ```
2. أنشئ ملف `.env.local` انسخاً من `.env.example` وعدّل القيم حسب بيئتك:
   ```env
   NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
   NEXT_PUBLIC_ADSENSE_ID="ca-pub-xxxxxxxxxxxxxxxx"
   ```
3. شغّل بيئة التطوير:
   ```bash
   npm run dev
   ```
   ثم افتح المتصفح على `http://localhost:3000`.

---

## الرفع على GitHub ثم Vercel

1. أنشئ مستودعاً جديداً على **GitHub** وارفع المشروع:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tools Hub bilingual 21-tool platform"
   git branch -M main
   git remote add origin https://github.com/USERNAME/tools-hub.git
   git push -u origin main
   ```
2. ادخل إلى لوحة تحكم **Vercel** واختر **Add New Project** ثم اربطه بمستودع GitHub.
3. من قسم **Environment Variables** في إعدادات المشروع على Vercel أضف:
   - `NEXT_PUBLIC_SITE_URL`: رابط موقعك النهائي (مثل `https://yourdomain.com`).
   - `NEXT_PUBLIC_ADSENSE_ID`: معرّف الناشر الخاص بك في Google AdSense (مثل `ca-pub-1234567890123456`).
4. حدّث السطر الموجود في `public/ads.txt` بمعرّف الناشر الخاص بك بدلاً من الرقم الافتراضي.
5. اضغط **Deploy** — وسيتم بناء جميع الصفحات الـ 42+ ثابتاً (SSG) بسرعة فائقة.

---

## كيفية تعديل شرائح ضرائب مصر أو إضافة أداة جديدة

### 1. تحديث شرائح الضرائب والتأمينات (مصر)
افتح الملف `config/rates.ts` وحدّث قيمة الإعفاء الشخصي أو الحدود التأمينية أو الشرائح التصاعدية بسهولة؛ هذا الملف معزول تماماً عن واجهة الحاسبة لتسهيل المراجعة السنوية.

### 2. إضافة أداة جديدة (خطوتان فقط)
1. أضف تعريف الأداة (الرابط `slug`، الفئة، الأيقونة، النصوص العربية والإنجليزية، والأسئلة الشائعة) إلى `config/tools-part2.ts` (المجمّع في `config/tools.ts`).
2. أنشئ مكوّن الأداة داخل `components/tools/MyNewTool.tsx` واربط الـ `slug` الخاص بها في `components/tools/ToolRenderer.tsx`.
سيتم تلقائياً توليد صفحتها العربية `/{slug}` وصفحتها الإنجليزية `/en/{slug}` وإضافتها للبحث و`sitemap.xml` و`Footer`.
