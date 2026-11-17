import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { PrivacyView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  path: 'privacy-policy',
  title: 'Privacy Policy | Tools Hub',
  description:
    'Read the Tools Hub Privacy Policy covering local browser processing, localStorage preferences, cookies, and Google AdSense.',
});

export default function EnglishPrivacyPage() {
  return (
    <SiteShell locale="en">
      <PrivacyView locale="en" />
    </SiteShell>
  );
}
