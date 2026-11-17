'use client';

import React, { useMemo, useState } from 'react';
import { Copy, Check, Search } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

type StyleCategory = 'all' | 'names' | 'gaming' | 'social';

interface DecorationStyle {
  id: string;
  nameAr: string;
  nameEn: string;
  cat: Exclude<StyleCategory, 'all'>;
  transform: (text: string) => string;
}

function mapLatinChars(text: string, upperStart: number, lowerStart: number, digitStart?: number): string {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + (code - 97));
      if (digitStart && code >= 48 && code <= 57) return String.fromCodePoint(digitStart + (code - 48));
      return ch;
    })
    .join('');
}

function addKashida(text: string): string {
  const nonJoin = new Set(['ا', 'أ', 'إ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و', 'ؤ', 'ة', 'ى', 'ء', ' ']);
  const chars = Array.from(text);
  return chars
    .map((c, idx) => {
      const next = chars[idx + 1];
      if (!nonJoin.has(c) && next && next !== ' ' && /[\u0621-\u064A]/.test(c) && /[\u0621-\u064A]/.test(next)) {
        return `${c}ـ`;
      }
      return c;
    })
    .join('');
}

function addTashkeel(text: string): string {
  const marks = ['َ', 'ُ', 'ِ', 'ْ', 'ّ'];
  return Array.from(text)
    .map((c, i) => (/[\u0621-\u064A]/.test(c) ? `${c}${marks[i % marks.length]}` : c))
    .join('');
}

const STYLES: DecorationStyle[] = [
  { id: '1', nameAr: 'ملكي مُطوّل', nameEn: 'Royal Kashida', cat: 'names', transform: (t) => `꧁༒ ${addKashida(t)} ༒꧂` },
  { id: '2', nameAr: 'إطار نجوم', nameEn: 'Starry Frame', cat: 'names', transform: (t) => `★彡 ${t} 彡★` },
  { id: '3', nameAr: 'أقواس مزخرفة', nameEn: 'Ornate Brackets', cat: 'names', transform: (t) => `『${addKashida(t)}』` },
  { id: '4', nameAr: 'تاج الفخامة', nameEn: 'Crown Crest', cat: 'gaming', transform: (t) => `♛ ${t} ♛` },
  { id: '5', nameAr: 'سيوف القتال', nameEn: 'Battle Blades', cat: 'gaming', transform: (t) => `⚔️ ${t} ⚔️` },
  { id: '6', nameAr: 'أجنحة النصر', nameEn: 'Victory Wings', cat: 'gaming', transform: (t) => `꧁༺ ${t} ༻꧂` },
  { id: '7', nameAr: 'خط عريض أنيق', nameEn: 'Bold Serif', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d400, 0x1d41a, 0x1d7ce) },
  { id: '8', nameAr: 'خط مائل جذاب', nameEn: 'Italic Sans', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d608, 0x1d622) },
  { id: '9', nameAr: 'عريض مائل', nameEn: 'Bold Italic', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d468, 0x1d482) },
  { id: '10', nameAr: 'خط اليد المخطوط', nameEn: 'Script Cursive', cat: 'names', transform: (t) => mapLatinChars(t, 0x1d4d0, 0x1d4ea) },
  { id: '11', nameAr: 'قوطي كلاسيكي', nameEn: 'Gothic Fraktur', cat: 'gaming', transform: (t) => mapLatinChars(t, 0x1d56c, 0x1d586) },
  { id: '12', nameAr: 'مزدوج الخط', nameEn: 'Double Struck', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d538, 0x1d552, 0x1d7d8) },
  { id: '13', nameAr: 'حروف دائرية', nameEn: 'Circled Letters', cat: 'social', transform: (t) => mapLatinChars(t, 0x24b6, 0x24d0) },
  { id: '14', nameAr: 'مربعات داكنة', nameEn: 'Dark Squares', cat: 'gaming', transform: (t) => mapLatinChars(t, 0x1f170, 0x1f170) },
  { id: '15', nameAr: 'تشكيل متناغم', nameEn: 'Artistic Tashkeel', cat: 'names', transform: (t) => `« ${addTashkeel(t)} »` },
  { id: '16', nameAr: 'هالة سماوية', nameEn: 'Celestial Halo', cat: 'names', transform: (t) => `✧･ﾟ: *✧ ${t} ✧*:･ﾟ✧` },
  { id: '17', nameAr: 'قوس ياباني', nameEn: 'JP Corner', cat: 'social', transform: (t) => `「 ${t} 」` },
  { id: '18', nameAr: 'قلوب ناعمة', nameEn: 'Soft Hearts', cat: 'social', transform: (t) => `♡ ⊹ ${t} ⊹ ♡` },
  { id: '19', nameAr: 'برق السرعة', nameEn: 'Lightning Tag', cat: 'gaming', transform: (t) => `⚡ ${t} ⚡` },
  { id: '20', nameAr: 'شارة كلان', nameEn: 'Clan Emblem', cat: 'gaming', transform: (t) => `么 ${t} 乡` },
  { id: '21', nameAr: 'نسق ببجي', nameEn: 'Pro Gamer Tag', cat: 'gaming', transform: (t) => `×͜× ${t} ×͜×` },
  { id: '22', nameAr: 'إطار ماسي', nameEn: 'Diamond Edge', cat: 'names', transform: (t) => `❖ ${addKashida(t)} ❖` },
  { id: '23', nameAr: 'زهرة الأناقة', nameEn: 'Floral Accent', cat: 'names', transform: (t) => `✿ ${t} ✿` },
  { id: '24', nameAr: 'تطويل مزدوج', nameEn: 'Double Kashida', cat: 'names', transform: (t) => `ـ${addKashida(addKashida(t))}ـ` },
  { id: '25', nameAr: 'خط مونوسبيس', nameEn: 'Monospace', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d670, 0x1d68a, 0x1d7f6) },
  { id: '26', nameAr: 'عريض سانز', nameEn: 'Sans Bold', cat: 'social', transform: (t) => mapLatinChars(t, 0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { id: '27', nameAr: 'وسام ناري', nameEn: 'Flame Badge', cat: 'gaming', transform: (t) => `🔥【${t}】🔥` },
  { id: '28', nameAr: 'موجات زرقاء', nameEn: 'Wave Crest', cat: 'social', transform: (t) => `〰 ${t} 〰` },
  { id: '29', nameAr: 'سهم متقدم', nameEn: 'Arrow Banner', cat: 'gaming', transform: (t) => `➳ ${t} ➳` },
  { id: '30', nameAr: 'هلال ونجوم', nameEn: 'Crescent Charm', cat: 'names', transform: (t) => `☾ ⋆ ${addKashida(t)} ⋆ ☽` },
  { id: '31', nameAr: 'مفصول بنجوم', nameEn: 'Star Spaced', cat: 'social', transform: (t) => Array.from(t).join('✦') },
  { id: '32', nameAr: 'خط متباعد', nameEn: 'Wide Spaced', cat: 'social', transform: (t) => Array.from(t).join(' ') },
  { id: '33', nameAr: 'تحته خط', nameEn: 'Underlined', cat: 'social', transform: (t) => Array.from(t).map((c) => `${c}\u0332`).join('') },
  { id: '34', nameAr: 'مشطوب أنيق', nameEn: 'Strikethrough', cat: 'social', transform: (t) => Array.from(t).map((c) => `${c}\u0336`).join('') },
  { id: '35', nameAr: 'قوس مزدوج', nameEn: 'Double Bracket', cat: 'names', transform: (t) => `《 ${t} 》` },
  { id: '36', nameAr: 'شرارة ملكية', nameEn: 'Sparkle Crest', cat: 'names', transform: (t) => `✨ ${addKashida(t)} ✨` },
  { id: '37', nameAr: 'تاج ودرع', nameEn: 'Shield & Crown', cat: 'gaming', transform: (t) => `『♛』${t}『♛』` },
  { id: '38', nameAr: 'جمجمة الأسطورة', nameEn: 'Legend Tag', cat: 'gaming', transform: (t) => `☠︎ ${t} ☠︎` },
  { id: '39', nameAr: 'نوتة موسيقية', nameEn: 'Music Vibe', cat: 'social', transform: (t) => `♩♪ ${t} ♪♩` },
  { id: '40', nameAr: 'برواز فاخر', nameEn: 'Luxury Box', cat: 'names', transform: (t) => `╔═◈ ${t} ◈═╗` },
];

export function ArabicTextDecorator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';

  const [inputText, setInputText] = useState(isAr ? 'أحمد محمد' : 'Alex Storm');
  const [cat, setCat] = useState<StyleCategory>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleStyles = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    return STYLES.filter((st) => {
      if (cat !== 'all' && st.cat !== cat) return false;
      if (!q) return true;
      return st.nameAr.toLowerCase().includes(q) || st.nameEn.toLowerCase().includes(q);
    });
  }, [cat, filterQuery]);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1600);
    } catch {}
  };

  const sample = inputText.trim() || (isAr ? 'اسمك هنا' : 'Your Name');

  return (
    <div className="space-y-6">
      {/* Large Live Preview Input */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-cyan-500/10 p-5 space-y-3">
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          {isAr ? 'اكتب اسمك أو النص بالعربية أو الإنجليزية' : 'Type your name or text (English or Arabic)'}
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isAr ? 'مثال: عمر خالد أو Omar' : 'e.g. Omar Khaled'}
          className="w-full rounded-xl border border-violet-500/30 bg-white dark:bg-[#0B1020] px-4 py-3.5 text-lg sm:text-xl font-bold text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
        />
      </div>

      {/* Category & Style Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.05]">
          {(
            [
              { id: 'all', ar: 'الكل (40)', en: 'All (40)' },
              { id: 'names', ar: 'أسماء', en: 'Names' },
              { id: 'gaming', ar: 'ألعاب', en: 'Gaming' },
              { id: 'social', ar: 'سوشيال', en: 'Social' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCat(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                cat === item.id
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {isAr ? item.ar : item.en}
            </button>
          ))}
        </div>

        <div className="relative sm:w-56">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={isAr ? 'تصفية الأنماط...' : 'Filter styles...'}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] ps-9 pe-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* 40 Decorated Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleStyles.map((st) => {
          const decorated = st.transform(sample);
          const isCopied = copiedId === st.id;
          return (
            <div
              key={st.id}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#0B1020]/70 p-4 flex items-center justify-between gap-3 hover:border-violet-500/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-violet-600 dark:text-violet-400 mb-1">
                  {isAr ? st.nameAr : st.nameEn}
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {decorated}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(st.id, decorated)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-violet-600/15 text-violet-600 dark:text-violet-300 hover:bg-violet-600 hover:text-white'
                }`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? (isAr ? 'تم' : 'Copied') : isAr ? 'نسخ' : 'Copy'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
