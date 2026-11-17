'use client';

import React, { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from './SearchModal';
import { CookieBanner } from './CookieBanner';

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <div
      dir={dir}
      lang={locale}
      className="min-h-screen flex flex-col bg-[#F7F8FC] dark:bg-[#0B1020] text-slate-900 dark:text-slate-100 transition-colors duration-200"
    >
      <Header locale={locale} />
      <SearchModal locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
    </div>
  );
}
