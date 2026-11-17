'use client';

import React from 'react';
import {
  Cake,
  Moon,
  Coins,
  Percent,
  Wallet,
  ImageDown,
  FileImage,
  Files,
  FileText,
  ShieldCheck,
  QrCode,
  Ruler,
  ArrowLeftRight,
  Baby,
  Flame,
  Activity,
  Landmark,
  CalendarRange,
  Banknote,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import type { CategoryId } from '@/lib/i18n';
import type { ToolIconName } from '@/config/tools-types';

const ICON_MAP: Record<ToolIconName, React.ComponentType<{ className?: string }>> = {
  cake: Cake,
  moon: Moon,
  coins: Coins,
  percent: Percent,
  wallet: Wallet,
  'image-down': ImageDown,
  'file-image': FileImage,
  files: Files,
  'file-text': FileText,
  'shield-check': ShieldCheck,
  'qr-code': QrCode,
  ruler: Ruler,
  'arrow-left-right': ArrowLeftRight,
  baby: Baby,
  flame: Flame,
  activity: Activity,
  landmark: Landmark,
  'calendar-range': CalendarRange,
  banknote: Banknote,
  'refresh-cw': RefreshCw,
  sparkles: Sparkles,
};

export function ToolIcon({
  name,
  className = 'w-6 h-6',
}: {
  name: ToolIconName;
  className?: string;
}) {
  const IconComp = ICON_MAP[name] || Sparkles;
  return <IconComp className={className} aria-hidden="true" />;
}

export function BrandLogoSvg({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandGrad" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="55%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#F5B942" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0B1020" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        stroke="url(#brandGrad)"
        strokeWidth="2.5"
      />
      <rect x="17" y="17" width="13" height="13" rx="3.5" fill="url(#brandGrad)" />
      <rect x="34" y="17" width="13" height="13" rx="3.5" fill="#22D3EE" fillOpacity="0.85" />
      <rect x="17" y="34" width="13" height="13" rx="3.5" fill="#6366F1" fillOpacity="0.85" />
      <circle cx="40.5" cy="40.5" r="6.5" fill="#F5B942" />
    </svg>
  );
}

export function CategoryIllustration({
  category,
  className = 'w-16 h-16',
}: {
  category: CategoryId;
  className?: string;
}) {
  switch (category) {
    case 'date-religion':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catDateGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#F5B942" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catDateGrad)" fillOpacity="0.14" />
          <path
            d="M46 21a18 18 0 1 0 15 28 14 14 0 0 1-15-28Z"
            fill="url(#catDateGrad)"
          />
          <path
            d="M57 22l1.8 4.2 4.2 1.8-4.2 1.8L57 34l-1.8-4.2L51 28l4.2-1.8L57 22Z"
            fill="#F5B942"
          />
        </svg>
      );
    case 'finance':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catFinGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catFinGrad)" fillOpacity="0.14" />
          <circle cx="34" cy="44" r="14" stroke="url(#catFinGrad)" strokeWidth="3.5" fill="#3B82F6" fillOpacity="0.18" />
          <circle cx="48" cy="34" r="12" stroke="#22D3EE" strokeWidth="3" fill="#0B1020" fillOpacity="0.25" />
          <path d="M24 56h32" stroke="url(#catFinGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'images-pdf':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catImgGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catImgGrad)" fillOpacity="0.14" />
          <rect x="20" y="24" width="32" height="36" rx="6" fill="url(#catImgGrad)" fillOpacity="0.24" stroke="url(#catImgGrad)" strokeWidth="2.5" />
          <rect x="28" y="18" width="32" height="36" rx="6" fill="#0B1020" fillOpacity="0.28" stroke="#FB923C" strokeWidth="2.5" />
          <circle cx="38" cy="30" r="3.5" fill="#FB923C" />
          <path d="M32 46l8-9 6 6 4-4 6 7H32Z" fill="url(#catImgGrad)" />
        </svg>
      );
    case 'text':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catTxtGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catTxtGrad)" fillOpacity="0.14" />
          <rect x="22" y="22" width="36" height="36" rx="8" stroke="url(#catTxtGrad)" strokeWidth="2.5" fill="#8B5CF6" fillOpacity="0.12" />
          <path d="M30 33h20M30 41h15M30 49h10" stroke="url(#catTxtGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'health':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catHlthGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catHlthGrad)" fillOpacity="0.14" />
          <path
            d="M40 57s-17-10.5-17-22a10 10 0 0 1 17-7 10 10 0 0 1 17 7c0 11.5-17 22-17 22Z"
            fill="url(#catHlthGrad)"
            fillOpacity="0.25"
            stroke="url(#catHlthGrad)"
            strokeWidth="2.5"
          />
          <path d="M25 40h8l4-7 5 14 4-7h9" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'general':
    default:
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="catGenGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="34" fill="url(#catGenGrad)" fillOpacity="0.14" />
          <rect x="22" y="22" width="15" height="15" rx="3" stroke="#F59E0B" strokeWidth="2.5" />
          <rect x="43" y="22" width="15" height="15" rx="3" stroke="url(#catGenGrad)" strokeWidth="2.5" />
          <rect x="22" y="43" width="15" height="15" rx="3" stroke="url(#catGenGrad)" strokeWidth="2.5" />
          <circle cx="50.5" cy="50.5" r="7.5" fill="#F59E0B" />
        </svg>
      );
  }
}
