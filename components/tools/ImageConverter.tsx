'use client';

import React, { useState } from 'react';
import { Upload, ArrowRight, Download, Archive, Trash2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { RippleButton } from '@/components/MotionPrimitives';

interface ConvertedFile {
  id: string;
  file: File;
  originalUrl: string;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  done: boolean;
}

export function ImageConverter({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';

  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [targetMime, setTargetMime] = useState<'image/jpeg' | 'image/png' | 'image/webp'>(
    'image/jpeg'
  );
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);

  const handleUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    const valid = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    const next: ConvertedFile[] = valid.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      originalUrl: URL.createObjectURL(file),
      convertedBlob: null,
      convertedUrl: null,
      done: false,
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const convertAll = async () => {
    if (files.length === 0) return;
    setConverting(true);

    for (const item of files) {
      const converted = await new Promise<ConvertedFile>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ ...item, done: true });
            return;
          }
          if (targetMime === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve({ ...item, done: true });
              resolve({
                ...item,
                convertedBlob: blob,
                convertedUrl: URL.createObjectURL(blob),
                done: true,
              });
            },
            targetMime,
            quality / 100
          );
        };
        img.onerror = () => resolve({ ...item, done: true });
        img.src = item.originalUrl;
      });
      setFiles((prev) => prev.map((f) => (f.id === item.id ? converted : f)));
    }
    setConverting(false);
  };

  const ext = targetMime === 'image/jpeg' ? 'jpg' : targetMime === 'image/png' ? 'png' : 'webp';

  const downloadSingle = (item: ConvertedFile) => {
    if (!item.convertedUrl) return;
    const base = item.file.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = `${base}.${ext}`;
    a.click();
  };

  const downloadZip = async () => {
    const ready = files.filter((f) => f.convertedBlob);
    if (ready.length === 0) return;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    ready.forEach((f, idx) => {
      if (!f.convertedBlob) return;
      const base = f.file.name.replace(/\.[^.]+$/, '');
      zip.file(`${base}-${idx + 1}.${ext}`, f.convertedBlob);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${ext}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Conversion Format Selector */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 text-xs font-bold">
            ANY
          </span>
          <ArrowRight className="w-4 h-4 text-rose-500 animate-pulse rtl:rotate-180" />
          <select
            value={targetMime}
            onChange={(e) =>
              setTargetMime(e.target.value as 'image/jpeg' | 'image/png' | 'image/webp')
            }
            className="rounded-xl border border-rose-500/40 bg-white dark:bg-[#0B1020] px-4 py-2 text-sm font-bold text-rose-500"
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
            {isAr ? 'الجودة:' : 'Quality:'} {quality}%
          </span>
          <input
            type="range"
            min={20}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Dropzone */}
      <label className="block rounded-2xl border-2 border-dashed border-rose-400/40 hover:border-rose-500 bg-gradient-to-br from-rose-500/[0.04] to-orange-500/[0.04] p-8 text-center cursor-pointer transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center mb-3 shadow-md">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          {isAr ? 'ارفع صورك لتحويل صيغتها فوراً' : 'Drop images to convert formats instantly'}
        </p>
      </label>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <RippleButton
              onClick={convertAll}
              disabled={converting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs sm:text-sm font-bold shadow-sm"
            >
              <span>
                {converting
                  ? isAr
                    ? 'جاري التحويل...'
                    : 'Converting...'
                  : isAr
                  ? `تحويل الكل إلى ${ext.toUpperCase()}`
                  : `Convert All to ${ext.toUpperCase()}`}
              </span>
            </RippleButton>

            {files.some((f) => f.convertedBlob) && (
              <RippleButton
                onClick={downloadZip}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-bold"
              >
                <Archive className="w-4 h-4" />
                <span>{isAr ? 'تحميل الكل ZIP' : 'Download ZIP'}</span>
              </RippleButton>
            )}
          </div>

          <div className="space-y-2.5">
            {files.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 p-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.convertedUrl || item.originalUrl}
                    alt={item.file.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.done ? `→ .${ext}` : isAr ? 'جاهز للتحويل' : 'Ready'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.convertedUrl && (
                    <button
                      type="button"
                      onClick={() => downloadSingle(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{ext.toUpperCase()}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => setFiles((prev) => prev.filter((f) => f.id !== item.id))}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
