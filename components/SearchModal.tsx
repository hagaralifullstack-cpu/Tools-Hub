'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { TOOLS } from '@/config/tools';
import { CATEGORIES, DICTIONARY, type Locale } from '@/lib/i18n';
import { buildPath } from '@/lib/seo';
import { usePreferences } from '@/lib/preferences';
import { ToolIcon } from './BrandArtwork';

export function SearchModal({ locale }: { locale: Locale }) {
  const { searchOpen, setSearchOpen } = usePreferences();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = DICTIONARY[locale];

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS.slice(0, 8);
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
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/70 backdrop-blur-sm px-4 pt-16 sm:pt-24"
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.searchPlaceholder}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121A33] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10">
              <Search className="w-5 h-5 text-indigo-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-transparent text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.nav.searchEmpty}
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((tool) => {
                    const cat = CATEGORIES[tool.category];
                    const content = tool[locale];
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={buildPath(locale, tool.slug)}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors group"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradientClass} text-white flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            <ToolIcon name={tool.icon} className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                                {content.name}
                              </span>
                              <span className="text-xs text-slate-400">·</span>
                              <span className={`text-xs ${cat.textAccentClass} truncate`}>
                                {locale === 'ar' ? cat.nameAr : cat.nameEn}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {content.shortDesc}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
