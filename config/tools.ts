import { TOOLS_PART_1 } from './tools-part1';
import { TOOLS_PART_2 } from './tools-part2';
import type { ToolConfig } from './tools-types';
import type { CategoryId } from '@/lib/i18n';

export * from './tools-types';

export const TOOLS: ToolConfig[] = [...TOOLS_PART_1, ...TOOLS_PART_2];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategoryId): ToolConfig[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolConfig[] {
  return TOOLS.filter((t) => t.popular);
}

export function getRelatedTools(tool: ToolConfig): ToolConfig[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolConfig => Boolean(t));
}
