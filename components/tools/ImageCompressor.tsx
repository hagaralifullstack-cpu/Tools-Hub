'use client';

import React, { useCallback, useState } from 'react';
import { Upload, Download, Trash2, Archive, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { RippleButton } from '@/components/MotionPrimitives';

interface CompressedItem {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedUrl: string | null;
  compressedSize: number;
  progress: number;
  width: number;
  height: number;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageCompressor({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [items, setItems] = useState<CompressedItem[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [outputFormat, setOutputFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);

  const compressOne = useCallback(
    async (
      item: CompressedItem,
      q: number,
      maxW: number,
      mime: 'image/webp' | 'image/jpeg' | 'image/png'
    ): Promise<CompressedItem> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          let targetW = img.naturalWidth;
          let targetH = img.naturalHeight;
          if (maxW > 0 && targetW > maxW) {
            const ratio = maxW / targetW;
            targetW = maxW;
            targetH = Math.round(targetH * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ ...item, progress: 100, error: isAr ? 'تعذر تهيئة Canvas' : 'Canvas unavailable' });
            return;
          }

          if (mime === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetW, targetH);
          }
          ctx.drawImage(img, 0, 0, targetW, targetH);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve({ ...item, progress: 100, error: isAr ? 'فشل الضغط' : 'Compression failed' });
                return;
              }
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                ...item,
                compressedBlob: blob,
                compressedUrl,
                compressedSize: blob.size,
                width: targetW,
                height: targetH,
                progress: 100,
              });
            },
            mime,
            q / 100
          );
        };
        img.onerror = () => {
          resolve({ ...item, progress: 100, error: isAr ? 'ملف صورة غير مدعوم' : 'Unsupported image' });
        };
        img.src = item.originalUrl;
      });
    },
    [isAr]
  );

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const newItems: CompressedItem[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      originalUrl: URL.createObjectURL(file),
      originalSize: file.size,
      compressedBlob: null,
      compressedUrl: null,
      compressedSize: 0,
      progress: 20,
      width: 0,
      height: 0,
    }));

    setItems((prev) => [...prev, ...newItems]);
    setIsProcessing(true);

    for (const item of newItems) {
      const result = await compressOne(item, quality, maxWidth, outputFormat);
      setItems((prev) => prev.map((it) => (it.id === item.id ? result : it)));
      if (!compareId) setCompareId(item.id);
    }

    setIsProcessing(false);
  };

  const recompressAll = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    for (const item of items) {
      setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, progress: 35 } : it)));
      const result = await compressOne(item, quality, maxWidth, outputFormat);
      setItems((prev) => prev.map((it) => (it.id === item.id ? result : it)));
    }
    setIsProcessing(false);
  };

  const downloadOne = (item: CompressedItem) => {
    if (!item.compressedUrl) return;
    const ext = outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/jpeg' ? 'jpg' : 'png';
    const base = item.file.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = item.compressedUrl;
    a.download = `${base}-compressed.${ext}`;
    a.click();
  };

  const downloadAllZip = async () => {
    const ready = items.filter((it) => it.compressedBlob);
    if (ready.length === 0) return;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const ext = outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/jpeg' ? 'jpg' : 'png';

    ready.forEach((it, idx) => {
      if (!it.compressedBlob) return;
      const base = it.file.name.replace(/\.[^.]+$/, '');
      zip.file(`${base}-${idx + 1}.${ext}`, it.compressedBlob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeCompare = items.find((i) => i.id === compareId && i.compressedUrl);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
            <span>{isAr ? 'جودة الضغط' : 'Quality'}</span>
            <span className="font-tabular text-rose-500">{formatNumber(quality)}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'أقصى عرض (بكسل)' : 'Max Width (px)'}
          </label>
          <select
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none"
          >
            <option value={0}>{isAr ? 'الأبعاد الأصلية' : 'Original Width'}</option>
            <option value={1920}>1920 px (Full HD)</option>
            <option value={1280}>1280 px (HD)</option>
            <option value={800}>800 px (Web)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            {isAr ? 'صيغة الإخراج' : 'Output Format'}
          </label>
          <select
            value={outputFormat}
            onChange={(e) =>
              setOutputFormat(e.target.value as 'image/webp' | 'image/jpeg' | 'image/png')
            }
            className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0B1020] px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none"
          >
            <option value="image/webp">WebP ({isAr ? 'الأصغر حجماً' : 'Smallest'})</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
          </select>
        </div>
      </div>

      {/* Dropzone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`block rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-rose-500 bg-rose-500/10 scale-[1.01]'
            : 'border-rose-400/40 hover:border-rose-500 bg-gradient-to-br from-rose-500/[0.04] to-orange-500/[0.04]'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center shadow-lg mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {isAr
            ? 'اسحب الصور وأفلتها هنا، أو اضغط لاختيار عدة صور'
            : 'Drag & drop photos here, or click to select multiple images'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {isAr
            ? 'JPG, PNG, WebP · تتم المعالجة محلياً دون رفع ملفاتك'
            : 'JPG, PNG, WebP · 100% browser processing without uploading'}
        </p>
      </label>

      {/* Action Buttons when files exist */}
      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <RippleButton
              onClick={recompressAll}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs sm:text-sm font-semibold shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isAr ? 'إعادة الضغط بالإعدادات الحالية' : 'Re-compress with Settings'}</span>
            </RippleButton>

            <RippleButton
              onClick={downloadAllZip}
              disabled={isProcessing || items.every((i) => !i.compressedBlob)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold"
            >
              <Archive className="w-4 h-4" />
              <span>{isAr ? 'تحميل الكل (ZIP)' : 'Download All (ZIP)'}</span>
            </RippleButton>
          </div>

          <button
            type="button"
            onClick={() => {
              setItems([]);
              setCompareId(null);
            }}
            className="text-xs text-rose-500 hover:underline cursor-pointer"
          >
            {isAr ? 'مسح القائمة' : 'Clear All'}
          </button>
        </div>
      )}

      {/* Interactive Before / After Comparison Slider */}
      {activeCompare && activeCompare.compressedUrl && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 space-y-3 bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-800 dark:text-slate-200">
              {isAr ? 'مقارنة قبل وبعد الضغط:' : 'Before / After Preview:'}{' '}
              {activeCompare.file.name}
            </span>
            <span className="text-slate-500 font-tabular">
              {formatBytes(activeCompare.originalSize)} → {formatBytes(activeCompare.compressedSize)}
            </span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-900 select-none">
            <img
              src={activeCompare.compressedUrl}
              alt="Compressed"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={activeCompare.originalUrl}
                alt="Original"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className="absolute inset-y-0 w-0.5 bg-white shadow-md pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label={isAr ? 'منزلق المقارنة' : 'Comparison slider'}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
        </div>
      )}

      {/* Image Cards List */}
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => {
            const savedPct =
              item.originalSize > 0 && item.compressedSize > 0
                ? Math.round(((item.originalSize - item.compressedSize) / item.originalSize) * 100)
                : 0;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1020]/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.compressedUrl || item.originalUrl}
                    alt={item.file.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-white/10"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.file.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-tabular">
                      <span>{formatBytes(item.originalSize)}</span>
                      <span>→</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.compressedSize ? formatBytes(item.compressedSize) : '...'}
                      </span>
                      {savedPct > 0 && (
                        <span className="text-rose-500 font-bold">
                          (-{formatNumber(savedPct)}%)
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 w-full max-w-xs rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.compressedUrl && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCompareId(item.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                      >
                        {isAr ? 'مقارنة' : 'Compare'}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadOne(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تحميل' : 'Save'}</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && !isProcessing && (
        <p className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {isAr
              ? 'تمت معالجة الصور بنجاح داخل متصفحك.'
              : 'All images processed locally inside your browser.'}
          </span>
        </p>
      )}
    </div>
  );
}
