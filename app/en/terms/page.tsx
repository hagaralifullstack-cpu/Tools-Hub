import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { TermsView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  path: 'terms',
  title: 'Terms of Service | Tools Hub',
  description:
    'Terms of Service governing the use of free utilities and calculators on Tools Hub.',
});

export default function EnglishTermsPage() {
  return (
    <SiteShell locale="en">
      <TermsView locale="en" />
    </SiteShell>
  );
}
