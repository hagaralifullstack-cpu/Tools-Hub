import type { Metadata } from 'next';
import Script from 'next/script';
import { Cairo, Tajawal, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PreferencesProvider } from '@/lib/preferences';
import { NavigationProgressBar } from '@/components/MotionPrimitives';
import { getSiteUrl } from '@/lib/seo';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'مركز الأدوات | Tools Hub — 21 أداة ذكية مجانية في المتصفح',
  description:
    'منصة أدوات مجانية باللغتين العربية والإنجليزية تعمل بالكامل داخل المتصفح بخصوصية تامة: حاسبات العمر والزكاة والضرائب، ضغط الصور ودمج PDF، وأدوات النصوص.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'مركز الأدوات | Tools Hub — 21 أداة ذكية مجانية',
    description:
      '21 أداة مجانية وسريعة تعمل داخل متصفحك بدون رفع ملفاتك لأي سيرفر.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مركز الأدوات | Tools Hub',
    description:
      '21 أداة مجانية وسريعة تعمل داخل متصفحك بدون رفع ملفاتك لأي سيرفر.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const hasRealAdsense =
    Boolean(adsenseId) &&
    adsenseId !== 'ca-pub-0000000000000000' &&
    !adsenseId?.includes('placeholder');

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`dark ${cairo.variable} ${tajawal.variable} ${jakarta.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('toolshub_theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}if(location.pathname==='/en'||location.pathname.indexOf('/en/')===0){document.documentElement.lang='en';document.documentElement.dir='ltr';}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {hasRealAdsense && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <PreferencesProvider>
          <NavigationProgressBar />
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
