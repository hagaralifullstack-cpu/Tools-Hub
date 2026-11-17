'use client';

import React, { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';
import { DICTIONARY } from '@/lib/i18n';

export type AdSlotVariant = 'leaderboard' | 'rectangle' | 'sidebar';

const VARIANT_HEIGHT: Record<AdSlotVariant, string> = {
  leaderboard: 'min-h-[96px]',
  rectangle: 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
};

export function AdSlot({
  variant = 'leaderboard',
  locale = 'ar',
  slotId = '0000000000',
  className = '',
}: {
  variant?: AdSlotVariant;
  locale?: Locale;
  slotId?: string;
  className?: string;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isConfigured =
    Boolean(adsenseId) &&
    adsenseId !== 'ca-pub-0000000000000000' &&
    !adsenseId?.includes('placeholder');

  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isConfigured || pushedRef.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Ignore AdSense initialization errors when blocked by adblockers
    }
  }, [isConfigured]);

  const label = DICTIONARY[locale].toolPage.adLabel;

  return (
    <aside
      aria-label={label}
      className={`w-full rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-[#121A33]/70 flex flex-col items-center justify-center p-3 text-center ${VARIANT_HEIGHT[variant]} ${className}`}
    >
      <span className="text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        {label}
      </span>

      {isConfigured ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={adsenseId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="w-full flex-1 flex items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-white/10 px-4 py-3 text-xs text-slate-400 dark:text-slate-500">
          <span>
            {locale === 'ar'
              ? 'مساحة إعلانية مخصصة (Google AdSense) — حجز ثابت لمنع تحرك الصفحة'
              : 'Reserved Ad Space (Google AdSense) — Fixed slot preventing CLS'}
          </span>
        </div>
      )}
    </aside>
  );
}
