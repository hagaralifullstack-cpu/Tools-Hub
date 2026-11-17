import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { AboutView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'ar',
  path: 'about',
  title: 'من نحن | مركز الأدوات',
  description:
    'تعرف على منصة مركز الأدوات ورسالتنا في تقديم 21 أداة مجانية سريعة تعمل بالكامل داخل المتصفح مع حماية خصوصيتك.',
});

export default function ArabicAboutPage() {
  return (
    <SiteShell locale="ar">
      <AboutView locale="ar" />
    </SiteShell>
  );
}
