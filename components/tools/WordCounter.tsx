'use client';

import React, { useMemo, useState } from 'react';
import { Copy, Check, Trash2, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { toEasternDigits, toWesternDigits } from '@/lib/numerals';

const STOP_WORDS = new Set([
  'في', 'من', 'على', 'إلى', 'الى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك', 'تلك',
  'التي', 'الذي', 'الذين', 'أن', 'إن', 'ان', 'كان', 'كانت', 'يكون', 'هو', 'هي',
  'هم', 'نحن', 'أنت', 'ما', 'لا', 'لم', 'لن', 'قد', 'أو', 'و', 'ثم', 'بين',
  'كل', 'بعض', 'غير', 'كما', 'عند', 'منذ', 'حتى', 'به', 'بها', 'له', 'لها',
  'the', 'and', 'for', 'that', 'with', 'this', 'from', 'are', 'was', 'were',
  'have', 'has', 'had', 'not', 'but', 'you', 'your', 'can', 'will', 'all', 'into',
]);

export function WordCounter({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();
  const [text, setText] = useState(
    isAr
      ? 'اكتب أو الصق نصك هنا لتحصل على تحليل فوري لعدد الكلمات والحروف ووقت القراءة.'
      : 'Type or paste your text here to get instant word counts, reading time, and keyword frequency.'
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const wordsList = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const words = wordsList.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed
      ? trimmed.split(/[.!?؟\n]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
      : 0;

    const readMinutes = Math.max(0, Math.ceil(words / 200));
    const speakMinutes = Math.max(0, Math.ceil(words / 130));

    const freqMap = new Map<string, number>();
    wordsList.forEach((raw) => {
      const clean = raw
        .toLowerCase()
        .replace(/[.,!?;:"'()\[\]{}،؛؟«»]/g, '');
      if (clean.length < 2 || STOP_WORDS.has(clean)) return;
      freqMap.set(clean, (freqMap.get(clean) || 0) + 1);
    });

    const topWords = Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readMinutes,
      speakMinutes,
      topWords,
    };
  }, [text]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const removeExtraSpaces = () => {
    setText((prev) =>
      prev
        .split('\n')
        .map((line) => line.replace(/[ \t]+/g, ' ').trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
    );
  };

  const removeDuplicates = () => {
    setText((prev) => {
      const seen = new Set<string>();
      return prev
        .split('\n')
        .filter((line) => {
          const key = line.trim();
          if (!key) return true;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .join('\n');
    });
  };

  const convertDigitsInText = () => {
    setText((prev) => (/[0-9]/.test(prev) ? toEasternDigits(prev) : toWesternDigits(prev)));
  };

  return (
    <div className="space-y-5">
      {/* Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {[
          { label: isAr ? 'الكلمات' : 'Words', value: stats.words },
          { label: isAr ? 'الحروف' : 'Characters', value: stats.charsWithSpaces },
          { label: isAr ? 'بدون مسافات' : 'No Spaces', value: stats.charsNoSpaces },
          { label: isAr ? 'الجمل' : 'Sentences', value: stats.sentences },
          { label: isAr ? 'الفقرات' : 'Paragraphs', value: stats.paragraphs },
          {
            label: isAr ? 'وقت القراءة' : 'Read Time',
            value: `${formatNumber(stats.readMinutes)} ${isAr ? 'د' : 'min'}`,
            raw: true,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-3 py-2.5 text-center"
          >
            <div className="text-lg sm:text-xl font-extrabold text-violet-600 dark:text-violet-300 font-tabular">
              {item.raw ? item.value : formatNumber(item.value as number)}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ النص' : 'Copy Text'}</span>
        </button>

        <button
          type="button"
          onClick={removeExtraSpaces}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
        >
          {isAr ? 'إزالة المسافات الزائدة' : 'Trim Extra Spaces'}
        </button>

        <button
          type="button"
          onClick={removeDuplicates}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
        >
          {isAr ? 'إزالة التكرار' : 'Deduplicate Lines'}
        </button>

        <button
          type="button"
          onClick={convertDigitsInText}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
        >
          {isAr ? 'تحويل الأرقام (١٢٣/123)' : 'Toggle 123 / ١٢٣'}
        </button>

        <button
          type="button"
          onClick={() => setText('')}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{isAr ? 'مسح' : 'Clear'}</span>
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        aria-label={isAr ? 'محرر النصوص' : 'Text Editor'}
        className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] p-4 text-sm sm:text-base leading-relaxed text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none resize-y"
      />

      {/* Speaking time & Top Keywords */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/70 dark:bg-white/[0.02]">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          {isAr ? 'وقت التحدث التقديري: ' : 'Estimated speaking time: '}
          <strong className="text-violet-600 dark:text-violet-400 font-tabular">
            {formatNumber(stats.speakMinutes)} {isAr ? 'دقيقة' : 'min'}
          </strong>
        </div>

        {stats.topWords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              {isAr ? 'الأكثر تكراراً:' : 'Top words:'}
            </span>
            {stats.topWords.map(([word, count]) => (
              <span
                key={word}
                className="text-slate-700 dark:text-slate-200 font-medium"
              >
                {word} ({formatNumber(count)})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
