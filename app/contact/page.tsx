import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { ContactView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'ar',
  path: 'contact',
  title: 'اتصل بنا | مركز الأدوات',
  description:
    'تواصل مع فريق مركز الأدوات لاقتراح أدوات جديدة أو إرسال الملاحظات والاستفسارات.',
});

export default function ArabicContactPage() {
  return (
    <SiteShell locale="ar">
      <ContactView locale="ar" />
    </SiteShell>
  );
}
