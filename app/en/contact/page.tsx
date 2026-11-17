import React from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
import { ContactView } from '@/components/LegalPages';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  locale: 'en',
  path: 'contact',
  title: 'Contact Us | Tools Hub',
  description:
    'Get in touch with the Tools Hub team for feature suggestions, feedback, or inquiries.',
});

export default function EnglishContactPage() {
  return (
    <SiteShell locale="en">
      <ContactView locale="en" />
    </SiteShell>
  );
}
