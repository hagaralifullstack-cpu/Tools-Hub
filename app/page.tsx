import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { HomeView } from '@/components/HomeView';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'ar',
  path: '',
  title: 'مركز الأدوات | 21 أداة مجانية وسريعة داخل المتصفح',
  description:
    'منصة عربية تضم 21 أداة مجانية تعمل داخل متصفحك بخصوصية 100%: حاسبة العمر، تحويل التاريخ هجري ميلادي، حاسبة الزكاة، ضغط الصور، دمج PDF، وزخرفة الأسماء.',
  keywords: ['مركز الأدوات', 'أدوات مجانية', 'حاسبة العمر', 'ضغط الصور', 'دمج pdf'],
});

export default function ArabicHomePage() {
  return (
    <SiteShell locale="ar">
      <Suspense fallback={<div className="min-h-screen" />}>
        <HomeView locale="ar" />
      </Suspense>
    </SiteShell>
  );
}
