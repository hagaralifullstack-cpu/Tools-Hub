import type { CategoryId } from '@/lib/i18n';

export type ToolIconName =
  | 'cake'
  | 'moon'
  | 'coins'
  | 'percent'
  | 'wallet'
  | 'image-down'
  | 'file-image'
  | 'files'
  | 'file-text'
  | 'shield-check'
  | 'qr-code'
  | 'ruler'
  | 'arrow-left-right'
  | 'baby'
  | 'flame'
  | 'activity'
  | 'landmark'
  | 'calendar-range'
  | 'banknote'
  | 'refresh-cw'
  | 'sparkles';

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolLocaleContent {
  name: string;
  shortDesc: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  whatIs: string[];
  howToSteps: string[];
  benefits: string[];
  faqs: ToolFaq[];
}

export interface ToolConfig {
  slug: string;
  category: CategoryId;
  icon: ToolIconName;
  popular?: boolean;
  relatedSlugs: [string, string, string];
  ar: ToolLocaleContent;
  en: ToolLocaleContent;
}
