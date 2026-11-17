import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { HomeView } from '@/components/HomeView';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  path: '',
  title: 'Tools Hub | 21 Free Client-Side Browser Utilities',
  description:
    '21 fast, free browser utilities with 100% client-side privacy: Age & Hijri calculators, Zakat, Egypt payroll tax, image compression, PDF merger, QR generator, and more.',
  keywords: ['tools hub', 'free browser utilities', 'pdf merger', 'image compressor', 'age calculator'],
});

export default function EnglishHomePage() {
  return (
    <SiteShell locale="en">
      <Suspense fallback={<div className="min-h-screen" />}>
        <HomeView locale="en" />
      </Suspense>
    </SiteShell>
  );
}
