import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { TermsView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'ar',
  path: 'terms',
  title: 'الشروط والأحكام | مركز الأدوات',
  description:
    'الشروط والأحكام المنظمة لاستخدام أدوات وحاسبات موقع مركز الأدوات المجانية.',
});

export default function ArabicTermsPage() {
  return (
    <SiteShell locale="ar">
      <TermsView locale="ar" />
    </SiteShell>
  );
}
