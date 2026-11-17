import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getRelatedTools, getToolBySlug } from '@/config/tools';
import { buildPageMetadata, buildToolJsonLd } from '@/lib/seo';
import { SiteShell } from '@/components/SiteShell';
import { ToolPageTemplate } from '@/components/ToolPageTemplate';
import { ToolRenderer } from '@/components/tools/ToolRenderer';

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const content = tool.en;
  return buildPageMetadata({
    locale: 'en',
    path: tool.slug,
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: content.keywords,
  });
}

export default async function EnglishToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);
  const jsonLd = buildToolJsonLd(tool, 'en');

  return (
    <SiteShell locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumbList) }}
      />
      <ToolPageTemplate tool={tool} relatedTools={related} locale="en">
        <ToolRenderer slug={tool.slug} locale="en" />
      </ToolPageTemplate>
    </SiteShell>
  );
}
