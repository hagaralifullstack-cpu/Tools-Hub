import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { AboutView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  path: 'about',
  title: 'About Us | Tools Hub',
  description:
    'Learn about Tools Hub and our mission to provide 21 fast, free, privacy-first browser utilities.',
});

export default function EnglishAboutPage() {
  return (
    <SiteShell locale="en">
      <AboutView locale="en" />
    </SiteShell>
  );
}
