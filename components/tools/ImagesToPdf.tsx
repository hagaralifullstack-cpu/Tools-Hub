'use client';

import React, { useState } from 'react';
import {
  Upload,
  RotateCw,
  ArrowUp,
  ArrowDown,
  Trash2,
  FileDown,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { RippleButton } from '@/components/MotionPrimitives';
import { triggerCelebration } from '@/lib/confetti';

interface PdfImageItem {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number;
}

export function ImagesToPdf({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [images, setImages] = useState<PdfImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(24);
  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    setErrorMsg(null);
    const valid = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    const next: PdfImageItem[] = valid.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      rotation: 0,
    }));
    setImages((prev) => [...prev, ...next]);
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const copy = [...images];
    const [removed] = copy.splice(index, 1);
    copy.splice(target, 0, removed);
    setImages(copy);
  };

  const rotateItem = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
      )
    );
  };

  const renderRotatedJpegBytes = (
    url: string,
    rotationDeg: number
  ): Promise<{ bytes: Uint8Array; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const swap = rotationDeg === 90 || rotationDeg === 270;
        const w = swap ? img.naturalHeight : img.naturalWidth;
        const h = swap ? img.naturalWidth : img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context error'));

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.translate(w / 2, h / 2);
        ctx.rotate((rotationDeg * Math.PI) / 180);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

        canvas.toBlob(
          async (blob) => {
            if (!blob) return reject(new Error('Blob error'));
            const buf = await blob.arrayBuffer();
            resolve({ bytes: new Uint8Array(buf), width: w, height: h });
          },
          'image/jpeg',
          0.92
        );
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = url;
    });
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setGenerating(true);
    setErrorMsg(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const { bytes, width, height } = await renderRotatedJpegBytes(
          item.previewUrl,
          item.rotation
        );
        const embedded = await pdfDoc.embedJpg(bytes);

        let pageW = width;
        let pageH = height;
        let pad = 0;

        if (pageSize !== 'fit') {
          const baseW = pageSize === 'a4' ? 595.28 : 612;
          const baseH = pageSize === 'a4' ? 841.89 : 792;
          pageW = orientation === 'portrait' ? baseW : baseH;
          pageH = orientation === 'portrait' ? baseH : baseW;
          pad = margin;
        }

        const page = pdfDoc.addPage([pageW, pageH]);
        const availW = Math.max(20, pageW - pad * 2);
        const availH = Math.max(20, pageH - pad * 2);
        const scale = Math.min(availW / width, availH / height);
        const drawW = width * scale;
        const drawH = height * scale;

        page.drawImage(embedded, {
          x: (pageW - drawW) / 2,
          y: (pageH - drawH) / 2,
          width: drawW,
          height: drawH,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images-to-pdf.pdf';
      a.click();
      URL.revokeObjectURL(url);
      triggerCelebration('images-to-pdf');
    } catch {
      setErrorMsg(
        isAr
          ? 'حدث خطأ أثناء إنشاء ملف PDF. تأكد من سلامة الصور.'
          : 'Failed to build PDF. Please verify your image files.'
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'مقاس الصفحة' : 'Page Size'}
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter' | 'fit')}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white"
          >
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
            <option value="fit">{isAr ? 'حسب مقاس الصورة' : 'Fit to Image'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'اتجاه الصفحة' : 'Orientation'}
          </label>
          <select
            value={orientation}
            disabled={pageSize === 'fit'}
            onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white disabled:opacity-50"
          >
            <option value="portrait">{isAr ? 'عمودي (Portrait)' : 'Portrait'}</option>
            <option value="landscape">{isAr ? 'أفقي (Landscape)' : 'Landscape'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'الهوامش' : 'Margins'}
          </label>
          <select
            value={margin}
            disabled={pageSize === 'fit'}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white disabled:opacity-50"
          >
            <option value={0}>{isAr ? 'بدون هوامش' : 'None (0)'}</option>
            <option value={24}>{isAr ? 'هوامش متوسطة' : 'Normal'}</option>
            <option value={48}>{isAr ? 'هوامش واسعة' : 'Wide'}</option>
          </select>
        </div>
      </div>

      {/* Upload Dropzone */}
      <label className="block rounded-2xl border-2 border-dashed border-rose-400/40 hover:border-rose-500 bg-gradient-to-br from-rose-500/[0.04] to-orange-500/[0.04] p-8 text-center cursor-pointer transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center mb-3 shadow-md">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {isAr ? 'اختر صوراً أو اسحبها لإضافتها إلى الـ PDF' : 'Drop or select images to build your PDF'}
        </p>
      </label>

      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500">
          {errorMsg}
        </div>
      )}

      {/* Draggable / Reorderable Thumbnail Gallery */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1020] p-3 flex flex-col gap-2"
              >
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-200/60 dark:bg-white/[0.04] flex items-center justify-center">
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    style={{ transform: `rotate(${item.rotation}deg)` }}
                    className="max-h-full max-w-full object-contain transition-transform duration-200"
                  />
                  <span className="absolute top-1.5 start-1.5 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold font-tabular">
                    {formatNumber(idx + 1)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <button
                    type="button"
                    aria-label="Rotate"
                    onClick={() => rotateItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, -1)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={idx === images.length - 1}
                    onClick={() => moveItem(idx, 1)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => setImages((prev) => prev.filter((i) => i.id !== item.id))}
                    className="p-1.5 rounded-lg hover:bg-rose-500/15 text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <RippleButton
            onClick={handleGeneratePdf}
            disabled={generating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/25"
          >
            <FileDown className="w-5 h-5" />
            <span>
              {generating
                ? isAr
                  ? 'جاري إنشاء ملف PDF...'
                  : 'Creating PDF...'
                : isAr
                ? `إنشاء وتحميل PDF (${formatNumber(images.length)} صفحات)`
                : `Create & Download PDF (${images.length} pages)`}
            </span>
          </RippleButton>
        </div>
      )}
    </div>
  );
}
