import React from 'react';
import Link from 'next/link';
import { CATEGORY_LIST, DICTIONARY, type Locale } from '@/lib/i18n';
import { getToolsByCategory } from '@/config/tools';
import { buildPath } from '@/lib/seo';
import { BrandLogoSvg } from './BrandArtwork';

export function Footer({ locale }: { locale: Locale }) {
  const t = DICTIONARY[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#0B1020]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand summary */}
          <div className="space-y-4">
            <Link href={buildPath(locale)} className="inline-flex items-center gap-2.5">
              <BrandLogoSvg className="w-8 h-8" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {t.siteName}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t.footer.brandDesc}
            </p>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {t.hero.privacyGuarantee}
            </p>
          </div>

          {/* First 3 categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {t.footer.categoriesHeading}
            </h3>
            <div className="space-y-4">
              {CATEGORY_LIST.slice(0, 3).map((cat) => (
                <div key={cat.id}>
                  <p className={`text-xs font-semibold mb-1.5 ${cat.textAccentClass}`}>
                    {locale === 'ar' ? cat.nameAr : cat.nameEn}
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {getToolsByCategory(cat.id).map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={buildPath(locale, tool.slug)}
                          className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                        >
                          {tool[locale].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining 3 categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {locale === 'ar' ? 'المزيد من الأدوات' : 'More Utilities'}
            </h3>
            <div className="space-y-4">
              {CATEGORY_LIST.slice(3).map((cat) => (
                <div key={cat.id}>
                  <p className={`text-xs font-semibold mb-1.5 ${cat.textAccentClass}`}>
                    {locale === 'ar' ? cat.nameAr : cat.nameEn}
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {getToolsByCategory(cat.id).map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={buildPath(locale, tool.slug)}
                          className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                        >
                          {tool[locale].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Legal & Pages */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {t.footer.legalHeading}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href={buildPath(locale, 'about')}
                  className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link
                  href={buildPath(locale, 'contact')}
                  className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={buildPath(locale, 'privacy-policy')}
                  className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={buildPath(locale, 'terms')}
                  className="hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {year} {t.siteName}. {t.footer.copyright}.
          </p>
          <p>
            {locale === 'ar'
              ? 'جميع العمليات تتم محلياً داخل متصفحك'
              : 'All tools execute 100% locally in your browser'}
          </p>
        </div>
      </div>
    </footer>
  );
}
