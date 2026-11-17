'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { usePreferences } from '@/lib/preferences';
import { RippleButton } from '@/components/MotionPrimitives';

type QrType = 'url' | 'text' | 'wifi' | 'whatsapp' | 'email' | 'phone';

export function QrCodeGenerator({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar';
  const { formatNumber } = usePreferences();

  const [qrType, setQrType] = useState<QrType>('url');
  const [urlVal, setUrlVal] = useState('https://example.com');
  const [textVal, setTextVal] = useState(isAr ? 'مرحباً بكم في مركز الأدوات' : 'Hello from Tools Hub');
  const [wifiSsid, setWifiSsid] = useState('MyHomeWiFi');
  const [wifiPass, setWifiPass] = useState('password123');
  const [wifiSec, setWifiSec] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [waPhone, setWaPhone] = useState('201000000000');
  const [waMsg, setWaMsg] = useState(isAr ? 'مرحباً!' : 'Hello!');
  const [emailAddr, setEmailAddr] = useState('hello@example.com');
  const [emailSub, setEmailSub] = useState('');
  const [phoneNum, setPhoneNum] = useState('+201000000000');

  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(320);
  const [svgMarkup, setSvgMarkup] = useState('');
  const [pngUrl, setPngUrl] = useState('');

  const payload = useMemo(() => {
    switch (qrType) {
      case 'url':
        return urlVal.trim() || 'https://example.com';
      case 'text':
        return textVal.trim() || 'Tools Hub';
      case 'wifi':
        return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiSec === 'nopass' ? '' : wifiPass};;`;
      case 'whatsapp': {
        const cleanPhone = waPhone.replace(/[^\d]/g, '');
        const encoded = encodeURIComponent(waMsg);
        return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ''}`;
      }
      case 'email':
        return `mailto:${emailAddr.trim()}${
          emailSub ? `?subject=${encodeURIComponent(emailSub)}` : ''
        }`;
      case 'phone':
        return `tel:${phoneNum.trim()}`;
    }
  }, [qrType, urlVal, textVal, wifiSec, wifiSsid, wifiPass, waPhone, waMsg, emailAddr, emailSub, phoneNum]);

  useEffect(() => {
    let cancelled = false;
    async function buildQr() {
      try {
        const QRCode = await import('qrcode');
        const svg = await QRCode.toString(payload, {
          type: 'svg',
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        });
        const png = await QRCode.toDataURL(payload, {
          width: size * 2,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
        });
        if (!cancelled) {
          setSvgMarkup(svg);
          setPngUrl(png);
        }
      } catch {
        // Fallback no-op if payload exceeds QR limits
      }
    }
    buildQr();
    return () => {
      cancelled = true;
    };
  }, [payload, fgColor, bgColor, size]);

  const downloadPng = () => {
    if (!pngUrl) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `qrcode-${qrType}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${qrType}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const types: Array<{ id: QrType; ar: string; en: string }> = [
    { id: 'url', ar: 'رابط URL', en: 'URL' },
    { id: 'text', ar: 'نص', en: 'Text' },
    { id: 'wifi', ar: 'واي فاي', en: 'Wi-Fi' },
    { id: 'whatsapp', ar: 'واتساب', en: 'WhatsApp' },
    { id: 'email', ar: 'بريد', en: 'Email' },
    { id: 'phone', ar: 'هاتف', en: 'Phone' },
  ];

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10">
        {types.map((tp) => (
          <button
            key={tp.id}
            type="button"
            onClick={() => setQrType(tp.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              qrType === tp.id
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isAr ? tp.ar : tp.en}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Form Controls */}
        <div className="md:col-span-7 space-y-4">
          {qrType === 'url' && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'الرابط (URL)' : 'Website URL'}
              </label>
              <input
                type="url"
                dir="ltr"
                value={urlVal}
                onChange={(e) => setUrlVal(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          {qrType === 'text' && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                {isAr ? 'النص المطلوب' : 'Text Content'}
              </label>
              <textarea
                rows={4}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  {isAr ? 'اسم الشبكة (SSID)' : 'Network Name (SSID)'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                    {isAr ? 'التشفير' : 'Security'}
                  </label>
                  <select
                    value={wifiSec}
                    onChange={(e) => setWifiSec(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-3 py-2.5 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">{isAr ? 'مفتوحة بدون كلمة مرور' : 'Open (No Password)'}</option>
                  </select>
                </div>
                {wifiSec !== 'nopass' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                      {isAr ? 'كلمة مرور الشبكة' : 'Wi-Fi Password'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {qrType === 'whatsapp' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  {isAr ? 'رقم الواتساب (بالرمز الدولي بدون +)' : 'WhatsApp Number (with country code)'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  {isAr ? 'رسالة مبدئية (اختياري)' : 'Pre-filled Message (optional)'}
                </label>
                <input
                  type="text"
                  value={waMsg}
                  onChange={(e) => setWaMsg(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {qrType === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={emailAddr}
                  onChange={(e) => setEmailAddr(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  {isAr ? 'عنوان الرسالة (اختياري)' : 'Subject (optional)'}
                </label>
                <input
                  type="text"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {qrType === 'phone' && (
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                {isAr ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0B1020] px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              />
            </div>
          )}

          {/* Colors & Size */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                {isAr ? 'لون الرمز' : 'QR Color'}
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                {isAr ? 'لون الخلفية' : 'Background'}
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 dark:border-white/15 bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-200">
                {isAr ? 'الحجم' : 'Size'}: {formatNumber(size)}px
              </label>
              <input
                type="range"
                min={180}
                max={600}
                step={20}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-amber-500 mt-2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Glowing Glass Preview */}
        <div className="md:col-span-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-indigo-500/5 p-6 flex flex-col items-center gap-4">
          <div
            className="p-4 rounded-2xl shadow-xl border border-white/20"
            style={{ backgroundColor: bgColor }}
          >
            {pngUrl ? (
              <img
                src={pngUrl}
                alt="QR Code Preview"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                ...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full">
            <RippleButton
              onClick={downloadPng}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              <span>PNG</span>
            </RippleButton>
            <RippleButton
              onClick={downloadSvg}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              <span>SVG</span>
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
