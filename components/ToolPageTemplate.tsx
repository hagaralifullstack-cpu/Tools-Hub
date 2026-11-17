'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  Share2,
  Check,
  Copy,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import type { ToolConfig } from '@/config/tools';
import { CATEGORIES, DICTIONARY, type Locale } from '@/lib/i18n';
import { buildPath, getSiteUrl } from '@/lib/seo';
import { usePreferences } from '@/lib/preferences';
import { CategoryIllustration, ToolIcon } from './BrandArtwork';
import { AdSlot } from './AdSlot';
import { FaqAccordion } from './FaqAccordion';
import { ScrollReveal } from './MotionPrimitives';

export function ToolPageTemplate({
  tool,
  relatedTools,
  locale,
  children,
}: {
  tool: ToolConfig;
  relatedTools: ToolConfig[];
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = DICTIONARY[locale].toolPage;
  const cat = CATEGORIES[tool.category];
  const content = tool[locale];
  const { recordToolUsage } = usePreferences();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    recordToolUsage(tool.slug);
  }, [tool.slug, recordToolUsage]);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `${getSiteUrl()}${buildPath(locale, tool.slug)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const SepIcon = locale === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* 1. Breadcrumb + H1 Header */}
      <div className="space-y-4">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
        >
          <Link
            href={buildPath(locale)}
            className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
          >
            {t.breadcrumbHome}
          </Link>
          <SepIcon className="w-3.5 h-3.5 shrink-0" />
          <Link
            href={`${buildPath(locale)}?category=${tool.category}#tools-catalog`}
            className={`hover:underline ${cat.textAccentClass}`}
          >
            {locale === 'ar' ? cat.nameAr : cat.nameEn}
          </Link>
          <SepIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {content.name}
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradientClass} text-white flex items-center justify-center shadow-lg shrink-0`}
            >
              <ToolIcon name={tool.icon} className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
                {content.h1}
              </h1>
              <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 mt-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t.localBadge}</span>
              </p>
            </div>
          </div>

          <CategoryIllustration
            category={tool.category}
            className="hidden md:block w-16 h-16 shrink-0"
          />
        </div>
      </div>

      {/* 2. Top AdSlot */}
      <AdSlot variant="leaderboard" locale={locale} />

      {/* Main 2-column workspace + sticky sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* 3. Interactive Tool Card */}
          <section
            aria-label={content.name}
            style={{
              boxShadow: `0 18px 48px -20px ${cat.accentHex}33`,
            }}
            className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121A33] p-5 sm:p-8"
          >
            {children}
          </section>

          {/* 9. Share Bar */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Share2 className="w-4 h-4 text-indigo-500" />
              <span>{t.shareTitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${content.name} - ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {t.shareWhatsapp}
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {t.shareFacebook}
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.copiedLink}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyLink}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. Bottom AdSlot */}
          <AdSlot variant="rectangle" locale={locale} />

          {/* 5. Detailed Tool Guide (300-400 words) */}
          <ScrollReveal>
            <article className="rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.whatIsTitle}
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {content.whatIs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.howToTitle}
                </h3>
                <ol className="space-y-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {content.howToSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: cat.accentHex }}
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {t.benefitsTitle}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                  {content.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] p-3 border border-slate-100 dark:border-white/[0.05]"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: cat.accentHex }}
                      />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollReveal>

          {/* 6. FAQ Accordion */}
          <ScrollReveal>
            <section aria-labelledby="tool-faq-heading" className="space-y-4">
              <h2
                id="tool-faq-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
              >
                {t.faqTitle}
              </h2>
              <FaqAccordion items={content.faqs} />
            </section>
          </ScrollReveal>

          {/* 7. Related Tools (3 cards) */}
          <ScrollReveal>
            <section aria-labelledby="related-heading" className="space-y-4">
              <h2
                id="related-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
              >
                {t.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((rel) => {
                  const relCat = CATEGORIES[rel.category];
                  return (
                    <Link
                      key={rel.slug}
                      href={buildPath(locale, rel.slug)}
                      className="group rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-4 hover:border-indigo-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${relCat.gradientClass} text-white flex items-center justify-center`}
                        >
                          <ToolIcon name={rel.icon} className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                        {rel[locale].name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {rel[locale].shortDesc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>
        </div>

        {/* 8. Sticky Desktop Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <AdSlot variant="sidebar" locale={locale} />
        </aside>
      </div>
    </div>
  );
}
