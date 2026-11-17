'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { usePreferences } from '@/lib/preferences';

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { formatNumber } = usePreferences();
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prefersReducedMotion || !Number.isFinite(value)) {
      prevRef.current = value;
      return;
    }

    const start = prevRef.current;
    const end = value;
    if (Math.abs(start - end) < 1e-6) return;

    const duration = 380;
    const startTime = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + (end - start) * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
        prevRef.current = end;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, prefersReducedMotion]);

  const shownValue =
    prefersReducedMotion || !Number.isFinite(value) ? value : displayValue;

  const formatted = formatNumber(
    Number.isFinite(shownValue) ? shownValue : 0,
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  );

  return (
    <span className={`font-tabular ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(99, 102, 241, 0.25)',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const ry = (x - 0.5) * 7;
    const rx = (0.5 - y) * 7;
    setTilt({ rx, ry, mx: x * 100, my: y * 100, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilt.active ? -4 : 0}px)`,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(280px circle at ${tilt.mx}% ${tilt.my}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export function RippleButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 550);
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`relative overflow-hidden select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

export function NavigationProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setVisible(true);
    setWidth(35);
    const t1 = setTimeout(() => setWidth(85), 90);
    const t2 = setTimeout(() => setWidth(100), 220);
    const t3 = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 420);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[80] h-[3px] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#F5B942] transition-all duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
