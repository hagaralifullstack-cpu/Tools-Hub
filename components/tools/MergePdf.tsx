'use client';

import React, { useState } from 'react';
import {
  FileText,
  Upload,
  ArrowUp,
  ArrowDown,
  Trash2,
  Combine,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { RippleButton } from '@/components/MotionPrimitives';
import { triggerCelebration } from '@/lib/confetti';

interface PdfDocItem {
  id: string;
  file: File;
  bytes: ArrayBuffer;
  pageCount: number;
}

export function MergePdf({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [docs, setDocs] = useState<PdfDocItem[]>([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    setErrorMsg(null);
    const { PDFDocument } = await import('pdf-lib');

    const incoming: PdfDocItem[] = [];
    for (const file of Array.from(fileList)) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        continue;
      }
      try {
        const bytes = await file.arrayBuffer();
        const loaded = await PDFDocument.load(bytes);
        incoming.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          bytes,
          pageCount: loaded.getPageCount(),
        });
      } catch {
        setErrorMsg(
          isAr
            ? `تعذر قراءة الملف "${file.name}". قد يكون تالفاً أو محمياً بكلمة مرور.`
            : `Could not read "${file.name}". It may be encrypted or corrupted.`
        );
      }
    }

    setDocs((prev) => [...prev, ...incoming]);
  };

  const moveDoc = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= docs.length) return;
    const copy = [...docs];
    const [removed] = copy.splice(index, 1);
    copy.splice(target, 0, removed);
    setDocs(copy);
  };

  const handleMerge = async () => {
    if (docs.length < 2) {
      setErrorMsg(
        isAr ? 'يرجى رفع ملفين PDF على الأقل للدمج.' : 'Please upload at least 2 PDF files to merge.'
      );
      return;
    }
    setMerging(true);
    setProgress(15);
    setErrorMsg(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < docs.length; i++) {
        const srcDoc = await PDFDocument.load(docs[i].bytes);
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
        copiedPages.forEach((p) => mergedPdf.addPage(p));
        setProgress(Math.round(((i + 1) / docs.length) * 90));
      }

      const mergedBytes = await mergedPdf.save();
      setProgress(100);
      const blob = new Blob([new Uint8Array(mergedBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged-document.pdf';
      a.click();
      URL.revokeObjectURL(url);
      triggerCelebration('merge-pdf');
    } catch {
      setErrorMsg(isAr ? 'حدث خطأ أثناء دمج الملفات.' : 'Failed to merge PDFs.');
    } finally {
      setMerging(false);
    }
  };

  const totalPages = docs.reduce((acc, d) => acc + d.pageCount, 0);

  return (
    <div className="space-y-6">
      <label className="block rounded-2xl border-2 border-dashed border-rose-400/40 hover:border-rose-500 bg-gradient-to-br from-rose-500/[0.04] to-orange-500/[0.04] p-8 text-center cursor-pointer transition-colors">
        <input
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center mb-3 shadow-md">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {isAr ? 'اسحب ملفات PDF هنا أو اضغط لاختيارها' : 'Drop PDF files here or click to select'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {isAr
            ? 'دمج محلي بالكامل — مستنداتك لا تغادر جهازك'
            : '100% local merge — documents never leave your browser'}
        </p>
      </label>

      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500">
          {errorMsg}
        </div>
      )}

      {docs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-tabular">
            <span>
              {formatNumber(docs.length)} {isAr ? 'ملفات' : 'files'} ·{' '}
              {formatNumber(totalPages)} {isAr ? 'صفحة إجمالاً' : 'total pages'}
            </span>
            <button
              type="button"
              onClick={() => setDocs([])}
              className="text-rose-500 hover:underline cursor-pointer"
            >
              {isAr ? 'مسح الكل' : 'Clear'}
            </button>
          </div>

          <div className="space-y-2.5">
            {docs.map((doc, idx) => (
              <div
                key={doc.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1020]/70 p-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {doc.file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-tabular">
                      {formatNumber(doc.pageCount)} {isAr ? 'صفحة' : 'pages'} ·{' '}
                      {(doc.file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={idx === 0}
                    onClick={() => moveDoc(idx, -1)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={idx === docs.length - 1}
                    onClick={() => moveDoc(idx, 1)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    onClick={() => setDocs((prev) => prev.filter((d) => d.id !== doc.id))}
                    className="p-2 rounded-lg hover:bg-rose-500/15 text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {merging && (
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <RippleButton
            onClick={handleMerge}
            disabled={merging || docs.length < 2}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/20"
          >
            <Combine className="w-5 h-5" />
            <span>
              {merging
                ? isAr
                  ? 'جاري دمج الملفات...'
                  : 'Merging PDFs...'
                : isAr
                ? 'دمج وتحميل الملف النهائي'
                : 'Merge & Download Combined PDF'}
            </span>
          </RippleButton>
        </div>
      )}
    </div>
  );
}
