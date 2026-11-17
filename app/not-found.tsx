import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { DICTIONARY } from '@/lib/i18n';

export default function NotFound() {
  const t = DICTIONARY.ar.notFound;
  const en = DICTIONARY.en.notFound;

  return (
    <SiteShell locale="ar">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/15 to-amber-500/20 border border-indigo-500/30">
          <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            404
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t.description}
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400" dir="ltr">
          {en.title} — {en.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-opacity"
          >
            {t.backHome}
          </Link>
          <Link
            href="/en"
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#121A33] text-slate-800 dark:text-white font-bold text-sm hover:border-indigo-500/40 transition-colors"
          >
            {en.backHome}
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
