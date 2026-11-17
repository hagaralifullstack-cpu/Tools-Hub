import type { Metadata } from 'next';
import type { Locale } from './i18n';
import type { ToolConfig } from '@/config/tools';

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    'https://toolshub.example.com';
  return envUrl.replace(/\/+$/, '');
}

export function buildPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (locale === 'ar') {
    return clean ? `/${clean}` : '/';
  }
  return clean ? `/en/${clean}` : '/en';
}

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  keywords = [],
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const baseUrl = getSiteUrl();
  const arPath = buildPath('ar', path);
  const enPath = buildPath('en', path);
  const currentPath = locale === 'ar' ? arPath : enPath;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        ar: `${baseUrl}${arPath}`,
        en: `${baseUrl}${enPath}`,
        'x-default': `${baseUrl}${arPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${currentPath}`,
      siteName: locale === 'ar' ? 'مركز الأدوات | Tools Hub' : 'Tools Hub | مركز الأدوات',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildToolJsonLd(tool: ToolConfig, locale: Locale) {
  const baseUrl = getSiteUrl();
  const content = tool[locale];
  const toolUrl = `${baseUrl}${buildPath(locale, tool.slug)}`;
  const homeUrl = `${baseUrl}${buildPath(locale)}`;

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.name,
    url: toolUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    description: content.seoDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: content.name,
        item: toolUrl,
      },
    ],
  };

  return { webApp, faqPage, breadcrumbList };
}
