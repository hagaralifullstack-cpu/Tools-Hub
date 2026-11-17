'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  Sun,
  Moon,
  Languages,
  Menu,
  X,
  ChevronDown,
  Hash,
} from 'lucide-react';
import { CATEGORY_LIST, DICTIONARY, type Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { buildPath } from '@/lib/seo';
import { BrandLogoSvg } from './BrandArtwork';

export function Header({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];
  const pathname = usePathname() || '/';
  const { theme, toggleTheme, numerals, toggleNumerals, setSearchOpen } =
    usePreferences();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const otherLocale: Locale = locale === 'ar' ? 'en' : 'ar';

  // Preserve current subpage path when toggling between / and /en
  const cleanSubPath = pathname.replace(/^\/en(\/|$)/, '/').replace(/^\/+/, '');
  const switchHref = buildPath(otherLocale, cleanSubPath);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#0B1020]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark */}
        <Link
          href={buildPath(locale)}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          <BrandLogoSvg className="w-8 h-8" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
            {t.siteName}
          </span>
        </Link>

        {/* Zone 2: Concise navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href={buildPath(locale)}
            className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.home}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
              className="inline-flex items-center gap-1 hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.nav.categories}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full start-0 pt-2 w-64 z-50"
                >
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] shadow-xl p-2">
                    {CATEGORY_LIST.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`${buildPath(locale)}?category=${cat.id}#tools-catalog`}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          {locale === 'ar' ? cat.nameAr : cat.nameEn}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.accentHex }}
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href={buildPath(locale, 'about')}
            className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.about}
          </Link>

          <Link
            href={buildPath(locale, 'contact')}
            className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Zone 3: Primary interactive actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t.nav.searchPlaceholder}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.05] hover:border-indigo-500/40 text-xs text-slate-600 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">{t.nav.tools}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-[#0B1020] text-slate-500 border border-slate-200 dark:border-white/10">
              {t.nav.searchShortcut}
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleNumerals}
            title={
              numerals === 'western' ? t.nav.numeralsWestern : t.nav.numeralsArabic
            }
            aria-label={t.nav.numeralsLabel}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] hover:border-indigo-500/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Hash className="w-3.5 h-3.5 text-cyan-500" />
            <span>{numerals === 'western' ? '123' : '١٢٣'}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] hover:border-indigo-500/40 text-slate-700 dark:text-slate-200 transition-colors shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          <Link
            href={switchHref}
            aria-label={t.nav.switchLangLabel}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 shadow-sm"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t.nav.switchLang}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.nav.numeralsLabel}
                </span>
                <button
                  type="button"
                  onClick={toggleNumerals}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  {numerals === 'western'
                    ? t.nav.numeralsWestern
                    : t.nav.numeralsArabic}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {CATEGORY_LIST.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`${buildPath(locale)}?category=${cat.id}#tools-catalog`}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>{locale === 'ar' ? cat.nameAr : cat.nameEn}</span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.accentHex }}
                    />
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-600 dark:text-slate-300">
                <Link
                  href={buildPath(locale)}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-indigo-500"
                >
                  {t.nav.home}
                </Link>
                <Link
                  href={buildPath(locale, 'about')}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-indigo-500"
                >
                  {t.nav.about}
                </Link>
                <Link
                  href={buildPath(locale, 'contact')}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-indigo-500"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
