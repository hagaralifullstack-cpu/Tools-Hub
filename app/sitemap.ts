import type { MetadataRoute } from 'next';
import { TOOLS } from '@/config/tools';
import { buildPath, getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticPaths = ['', 'about', 'contact', 'privacy-policy', 'terms'];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) => {
    const arUrl = `${baseUrl}${buildPath('ar', path)}`;
    const enUrl = `${baseUrl}${buildPath('en', path)}`;
    const priority = path === '' ? 1.0 : 0.6;
    const languages = { ar: arUrl, en: enUrl };

    return [
      {
        url: arUrl,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority,
        alternates: { languages },
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority,
        alternates: { languages },
      },
    ];
  });

  const toolEntries: MetadataRoute.Sitemap = TOOLS.flatMap((tool) => {
    const arUrl = `${baseUrl}${buildPath('ar', tool.slug)}`;
    const enUrl = `${baseUrl}${buildPath('en', tool.slug)}`;
    const languages = { ar: arUrl, en: enUrl };

    return [
      {
        url: arUrl,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: { languages },
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: { languages },
      },
    ];
  });

  return [...staticEntries, ...toolEntries];
}
