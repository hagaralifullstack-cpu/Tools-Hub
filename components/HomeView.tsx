'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import {
  Search,
  ArrowUpRight,
  Shield,
  Zap,
  Smartphone,
  Gift,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { TOOLS, getPopularTools, getToolBySlug, type ToolConfig } from '@/config/tools';
import { CATEGORIES, CATEGORY_LIST, DICTIONARY, type CategoryId, type Locale } from '@/lib/i18n';
import { buildPath } from '@/lib/seo';
import { usePreferences } from '@/lib/preferences';
import { CategoryIllustration, ToolIcon } from './BrandArtwork';
import { AnimatedNumber, ScrollReveal, TiltCard } from './MotionPrimitives';
import { FaqAccordion } from './FaqAccordion';
import { AdSlot } from './AdSlot';

function TypewriterWord({ words }: { words: readonly string[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [charCount, setCharCount] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const currentWord = words[wordIdx] || '';

    const delay = deleting ? 45 : charCount === currentWord.length ? 1800 : 75;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charCount < currentWord.length) {
          setCharCount((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charCount > 0) {
          setCharCount((c) => c - 1);
        } else {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charCount, deleting, wordIdx, words, prefersReducedMotion]);

  const text = prefersReducedMotion
    ? words[0]
    : (words[wordIdx] || '').slice(0, charCount);

  return (
    <span className="inline-block bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
      {text || '\u00A0'}
      {!prefersReducedMotion && (
        <span className="inline-block w-[2px] h-[0.9em] align-middle bg-cyan-400 ms-1 animate-pulse" />
      )}
    </span>
  );
}

function ToolCard({
  tool,
  locale,
  index = 0,
}: {
  tool: ToolConfig;
  locale: Locale;
  index?: number;
}) {
  const cat = CATEGORIES[tool.category];
  const content = tool[locale];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={buildPath(locale, tool.slug)}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
      >
        <TiltCard
          glowColor={`${cat.accentHex}30`}
          className={`h-full rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-5 transition-all duration-200 ${cat.borderHoverClass} ${cat.glowClass}`}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradientClass} text-white flex items-center justify-center shadow-md shrink-0`}
            >
              <ToolIcon name={tool.icon} className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </div>

          <p className={`text-xs font-medium mb-1 ${cat.textAccentClass}`}>
            {locale === 'ar' ? cat.nameAr : cat.nameEn}
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
            {content.name}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {content.shortDesc}
          </p>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];
  const searchParams = useSearchParams();
  const { recentSlugs, mounted, formatNumber } = usePreferences();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [heroQuery, setHeroQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category') as CategoryId | null;
    if (paramCat && CATEGORIES[paramCat]) {
      Promise.resolve().then(() => setSelectedCategory(paramCat));
    }
  }, [searchParams]);

  const heroResults = useMemo(() => {
    const q = heroQuery.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter((tool) => {
      const ar = tool.ar;
      const en = tool.en;
      return (
        ar.name.toLowerCase().includes(q) ||
        ar.shortDesc.toLowerCase().includes(q) ||
        ar.keywords.some((k) => k.toLowerCase().includes(q)) ||
        en.name.toLowerCase().includes(q) ||
        en.shortDesc.toLowerCase().includes(q) ||
        en.keywords.some((k) => k.toLowerCase().includes(q)) ||
        tool.slug.includes(q)
      );
    });
  }, [heroQuery]);

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') return TOOLS;
    return TOOLS.filter((tool) => tool.category === selectedCategory);
  }, [selectedCategory]);

  const popularTools = useMemo(() => getPopularTools().slice(0, 6), []);
  const recentTools = useMemo(
    () =>
      recentSlugs
        .map((slug) => getToolBySlug(slug))
        .filter((item): item is ToolConfig => Boolean(item)),
    [recentSlugs]
  );

  const whyIcons = [Shield, Zap, Smartphone, Gift];

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/[0.06]">
        {/* Mesh gradient + slow floating blobs + dot pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hero-dot-grid opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 start-1/4 w-[420px] h-[420px] rounded-full bg-indigo-500/20 dark:bg-indigo-500/25 blur-3xl animate-blob-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 end-1/5 w-[380px] h-[380px] rounded-full bg-cyan-400/15 dark:bg-cyan-400/20 blur-3xl animate-blob-reverse"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 text-center">
          <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">
            {t.hero.privacyGuarantee}
          </p>

          <h1 className="max-w-4xl mx-auto text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] text-slate-900 dark:text-white text-balance">
            {t.hero.headlinePrefix}{' '}
            <TypewriterWord words={t.hero.rotatingWords} />{' '}
            {t.hero.headlineSuffix}
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Giant instant hero search */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#121A33]/95 backdrop-blur-xl px-4 sm:px-5 py-3.5 shadow-xl shadow-indigo-500/5 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 transition-all">
              <Search className="w-5 h-5 text-indigo-500 shrink-0" />
              <input
                type="search"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                aria-label={t.nav.searchPlaceholder}
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 shrink-0">
                {t.nav.searchShortcut}
              </kbd>
            </div>

            {heroQuery.trim().length > 0 && (
              <div className="absolute top-full inset-x-0 mt-2 z-30 rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#121A33] shadow-2xl overflow-hidden text-start">
                {heroResults.length === 0 ? (
                  <p className="p-5 text-sm text-slate-500 dark:text-slate-400 text-center">
                    {t.nav.searchEmpty}
                  </p>
                ) : (
                  <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.06]">
                    {heroResults.map((tool) => {
                      const cat = CATEGORIES[tool.category];
                      return (
                        <li key={tool.slug}>
                          <Link
                            href={buildPath(locale, tool.slug)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
                          >
                            <div
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.gradientClass} text-white flex items-center justify-center shrink-0`}
                            >
                              <ToolIcon name={tool.icon} className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {tool[locale].name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {tool[locale].shortDesc}
                              </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Animated Hero Stats */}
          <div className="max-w-3xl mx-auto mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            {t.hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#121A33]/75 backdrop-blur-md px-3 py-4 sm:p-5"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-cyan-400">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pt-10">
        {/* Top AdSlot */}
        <AdSlot variant="leaderboard" locale={locale} />

        {/* Recently Used (when available in localStorage) */}
        {mounted && recentTools.length > 0 && (
          <ScrollReveal>
            <section aria-labelledby="recent-heading">
              <div className="flex items-center gap-2.5 mb-5">
                <Clock className="w-5 h-5 text-cyan-500" />
                <div>
                  <h2
                    id="recent-heading"
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
                  >
                    {t.home.recentlyUsedTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {t.home.recentlyUsedSubtitle}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentTools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} locale={locale} index={i} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Category filter & All 21 Tools */}
        <section id="tools-catalog" aria-labelledby="catalog-heading" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2
                id="catalog-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              >
                {t.home.allToolsTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {t.home.allToolsSubtitle}
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-tabular">
              {formatNumber(filteredTools.length)} {t.home.toolsCountLabel}
            </span>
          </div>

          {/* Interactive category filter buttons */}
          <div
            role="tablist"
            aria-label={t.nav.categories}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                  : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
              }`}
            >
              {t.home.allCategories} ({formatNumber(TOOLS.length)})
            </button>

            {CATEGORY_LIST.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={
                    active
                      ? { backgroundColor: cat.accentHex, borderColor: cat.accentHex }
                      : undefined
                  }
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                    active
                      ? 'text-white shadow-md'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/25'
                  }`}
                >
                  {locale === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} locale={locale} index={index} />
            ))}
          </div>
        </section>

        {/* Category visual showcase */}
        <ScrollReveal>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  document.getElementById('tools-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-start rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 cursor-pointer ${cat.borderHoverClass}`}
              >
                <CategoryIllustration category={cat.id} className="w-16 h-16 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {locale === 'ar' ? cat.nameAr : cat.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {locale === 'ar' ? cat.descriptionAr : cat.descriptionEn}
                  </p>
                </div>
              </button>
            ))}
          </section>
        </ScrollReveal>

        {/* Most Popular Tools */}
        <ScrollReveal>
          <section aria-labelledby="popular-heading">
            <div className="flex items-center gap-2.5 mb-5">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <div>
                <h2
                  id="popular-heading"
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
                >
                  {t.home.mostUsedTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t.home.mostUsedSubtitle}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} locale={locale} index={index} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Why Us */}
        <ScrollReveal>
          <section aria-labelledby="why-heading">
            <h2
              id="why-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6"
            >
              {t.home.whyUsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.home.whyUsItems.map((item, idx) => {
                const Icon = whyIcons[idx] || Shield;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121A33] p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-cyan-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* General FAQs */}
        <ScrollReveal>
          <section aria-labelledby="home-faq-heading" className="max-w-4xl mx-auto">
            <h2
              id="home-faq-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center"
            >
              {t.home.faqTitle}
            </h2>
            <FaqAccordion items={t.home.faqs} />
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
