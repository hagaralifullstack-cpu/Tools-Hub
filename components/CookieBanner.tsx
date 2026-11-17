'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie } from 'lucide-react';
import { DICTIONARY, type Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { buildPath } from '@/lib/seo';

export function CookieBanner({ locale }: { locale: Locale }) {
  const { cookieConsent, setCookieConsent, mounted } = usePreferences();
  const t = DICTIONARY[locale].cookie;

  if (!mounted || cookieConsent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-4 inset-x-4 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#121A33]/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.message}{' '}
              <Link
                href={buildPath(locale, 'privacy-policy')}
                className="text-indigo-500 dark:text-cyan-400 underline underline-offset-2"
              >
                {t.learnMore}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setCookieConsent('essential')}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => setCookieConsent('accepted')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
