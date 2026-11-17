import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { PrivacyView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'ar',
  path: 'privacy-policy',
  title: 'سياسة الخصوصية | مركز الأدوات',
  description:
    'اقرأ سياسة الخصوصية الخاصة بمركز الأدوات، وتفاصيل المعالجة المحلية للملفات، وملفات تعريف الارتباط وإعلانات Google AdSense.',
});

export default function ArabicPrivacyPage() {
  return (
    <SiteShell locale="ar">
      <PrivacyView locale="ar" />
    </SiteShell>
  );
}
