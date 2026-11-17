'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { RippleButton } from './MotionPrimitives';

export function AboutView({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] p-6 sm:p-10 space-y-5">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 dark:text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          <span>{isAr ? 'عن مركز الأدوات' : 'About Tools Hub'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {isAr
            ? 'منصة أدوات مجانية تضع سرعتك وخصوصيتك أولاً'
            : 'Free Browser Utilities Built Around Speed & Privacy'}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {isAr
            ? 'أُنشئ مركز الأدوات (Tools Hub) ليكون مرجعاً عربياً وإنجليزياً متكاملاً يجمع 21 أداة يومية أساسية في مكان واحد: من حاسبات العمر والتقويم الهجري والزكاة والمرتبات والقروض، إلى ضغط وتحويل الصور ودمج ملفات PDF وأدوات النصوص والصحة.'
            : 'Tools Hub brings together 21 essential daily utilities in one fast bilingual workspace—covering financial & payroll calculators, Hijri/Gregorian calendars, client-side image & PDF workflows, text utilities, and wellness estimators.'}
        </p>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {isAr
            ? 'المبدأ الهندسي الأساسي للمنصة هو المعالجة المحلية الكاملة: جميع الصور والمستندات والحسابات الحساسة تتم داخل ذاكرة متصفحك فقط ولا تُرفع إلى أي خادم خارجي، مع تجربة خالية من التسجيل الإجباري والعلامات المائية.'
            : 'Our core engineering commitment is 100% client-side execution: your images, PDFs, and personal calculations run strictly inside your browser tab without server uploads, sign-up gates, or watermarks.'}
        </p>
      </div>
    </div>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const mailto = `mailto:contact@toolshub.example.com?subject=${encodeURIComponent(
      subject || (isAr ? `رسالة من ${name}` : `Message from ${name}`)
    )}&body=${encodeURIComponent(`${name} (${email})\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'اتصل بنا' : 'Contact Us'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isAr
                ? 'يسعدنا تلقي اقتراحاتكم لإضافة أدوات جديدة أو الإبلاغ عن أي ملاحظات.'
                : 'Send tool suggestions, bug reports, or partnership inquiries.'}
            </p>
          </div>
        </div>

        {sent && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>
              {isAr
                ? 'تم فتح تطبيق البريد الإلكتروني الخاص بك لإرسال الرسالة. شكراً لتواصلك!'
                : 'Your default email client has been opened with your message. Thank you!'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {isAr ? 'الاسم' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              {isAr ? 'الموضوع' : 'Subject'}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              {isAr ? 'الرسالة' : 'Message'}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <RippleButton
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-bold shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'إرسال عبر البريد' : 'Send via Email'}</span>
          </RippleButton>
        </form>
      </div>
    </div>
  );
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <article className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] p-6 sm:p-10 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '1. المعالجة المحلية للملفات والبيانات' : '1. 100% Client-Side File Processing'}
          </h2>
          <p>
            {isAr
              ? 'جميع الأدوات الموجودة في مركز الأدوات (بما في ذلك ضغط الصور، تحويل الصيغ، إنشاء ودمج ملفات PDF، ومولد كلمات المرور) تعمل بالكامل داخل متصفحك. ملفاتك وصورك لا تُرفع إلى خوادمنا ولا نحتفظ بأي نسخة منها.'
              : 'Every utility on Tools Hub—including image compression, format conversion, PDF assembly/merging, and password generation—runs strictly inside your local browser. Your files are never uploaded to or stored on our servers.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '2. التخزين المحلي (localStorage)' : '2. Local Storage Preferences'}
          </h2>
          <p>
            {isAr
              ? 'نستخدم التخزين المحلي في متصفحك فقط لحفظ تفضيلاتك الشخصية مثل الوضع الداكن أو الفاتح، ونوع الأرقام المفضل، وآخر الأدوات التي استخدمتها، ويمكنك مسحها في أي وقت من إعدادات المتصفح.'
              : 'We use browser localStorage strictly to remember your theme preference (dark/light), numeral format, cookie choice, and recently opened tools. You may clear these anytime from your browser settings.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr
              ? '3. ملفات تعريف الارتباط (Cookies) وإعلانات Google AdSense'
              : '3. Cookies & Google AdSense Advertising'}
          </h2>
          <p>
            {isAr
              ? 'يستخدم هذا الموقع خدمة Google AdSense لعرض الإعلانات. قد تستخدم شركة Google وشركاؤها ملفات تعريف الارتباط (بما في ذلك ملف تعريف الارتباط للإعلانات) لعرض إعلانات مخصصة للمستخدمين استناداً إلى زياراتهم السابقة لهذا الموقع أو لمواقع أخرى على الإنترنت. يمكنك تعطيل الإعلانات المخصصة عبر زيارة صفحة إعدادات إعلانات Google.'
              : 'This website uses Google AdSense to display advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites on the internet. Users may opt out of personalized advertising by visiting Google Ads Settings.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '4. طلبات أسعار الصرف' : '4. Exchange Rate Requests'}
          </h2>
          <p>
            {isAr
              ? 'تجلب أداة محول العملات أسعار الصرف العامة مباشرة من متصفحك عبر open.er-api.com مع تخزين مؤقت لمدة ساعة دون إرسال أي بيانات تعريف شخصية.'
              : 'The Currency Converter fetches public mid-market exchange rates directly from open.er-api.com with 1-hour local caching without transmitting personal identifiers.'}
          </p>
        </section>
      </article>
    </div>
  );
}

export function TermsView({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <article className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] p-6 sm:p-10 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '1. استخدام الأدوات' : '1. Acceptable Use'}
          </h2>
          <p>
            {isAr
              ? 'جميع الأدوات متاحة مجاناً للاستخدام الشخصي والتجاري المشروع دون ضمانات صريحة أو ضمنية. تقع على عاتق المستخدم مسؤولية التحقق من مخرجات الملفات والأرقام قبل الاعتماد عليها في المعاملات الرسمية.'
              : 'All utilities are offered free of charge for lawful personal and commercial use on an "as-is" basis. Users are responsible for verifying outputs before relying on them in official transactions.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '2. إخلاء المسؤولية الطبية والمالية والشرعية' : '2. Informational Disclaimer'}
          </h2>
          <p>
            {isAr
              ? 'النتائج الصادرة من حاسبات الصحة (السعرات، مؤشر كتلة الجسم، موعد الولادة)، وحاسبات الضرائب والقروض، وحاسبة الزكاة هي نتائج استرشادية وتقديرية فقط ولا تُعد استشارة طبية أو قانونية أو ضريبية أو فتوى شرعية.'
              : 'Outputs from health calculators (BMI, calories, pregnancy due date), tax/loan calculators, and Zakat calculators are strictly informational estimates and do not constitute medical, legal, financial, or religious advice.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isAr ? '3. الملكية الفكرية' : '3. Intellectual Property'}
          </h2>
          <p>
            {isAr
              ? 'تبقى ملكية جميع الصور والمستندات التي تعالجها عبر الموقع لك بالكامل، ولا يطالب الموقع بأي حقوق على مخرجاتك.'
              : 'You retain 100% ownership and copyright over all images, PDFs, and text processed with our browser utilities.'}
          </p>
        </section>
      </article>
    </div>
  );
}
