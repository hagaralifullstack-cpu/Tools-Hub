'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { formatNumeral, type NumeralMode } from './numerals';

export type ThemeMode = 'dark' | 'light';

interface PreferencesContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  numerals: NumeralMode;
  toggleNumerals: () => void;
  setNumerals: (mode: NumeralMode) => void;
  formatNumber: (
    value: string | number,
    options?: Intl.NumberFormatOptions
  ) => string;
  recentSlugs: string[];
  recordToolUsage: (slug: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cookieConsent: 'accepted' | 'essential' | null;
  setCookieConsent: (choice: 'accepted' | 'essential') => void;
  mounted: boolean;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const THEME_KEY = 'toolshub_theme';
const NUMERALS_KEY = 'toolshub_numerals';
const RECENT_KEY = 'toolshub_recent_tools';
const COOKIE_KEY = 'toolshub_cookie_consent';

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [numerals, setNumeralsState] = useState<NumeralMode>('western');
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookieConsent, setCookieConsentState] = useState<
    'accepted' | 'essential' | null
  >(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      try {
        const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
        const initialTheme: ThemeMode = savedTheme === 'light' ? 'light' : 'dark';
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');

        const savedNumerals = localStorage.getItem(NUMERALS_KEY) as NumeralMode | null;
        if (savedNumerals === 'arabic' || savedNumerals === 'western') {
          setNumeralsState(savedNumerals);
        }

        const savedRecent = localStorage.getItem(RECENT_KEY);
        if (savedRecent) {
          const parsed = JSON.parse(savedRecent);
          if (Array.isArray(parsed)) {
            setRecentSlugs(parsed.filter((s) => typeof s === 'string').slice(0, 6));
          }
        }

        const savedConsent = localStorage.getItem(COOKIE_KEY);
        if (savedConsent === 'accepted' || savedConsent === 'essential') {
          setCookieConsentState(savedConsent);
        }
      } catch {
        // Ignore storage failures in restricted contexts
      }
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const setNumerals = useCallback((mode: NumeralMode) => {
    setNumeralsState(mode);
    try {
      localStorage.setItem(NUMERALS_KEY, mode);
    } catch {}
  }, []);

  const toggleNumerals = useCallback(() => {
    setNumerals(numerals === 'western' ? 'arabic' : 'western');
  }, [numerals, setNumerals]);

  const formatNumber = useCallback(
    (value: string | number, options?: Intl.NumberFormatOptions) =>
      formatNumeral(value, numerals, options),
    [numerals]
  );

  const recordToolUsage = useCallback((slug: string) => {
    setRecentSlugs((prev) => {
      const updated = [slug, ...prev.filter((s) => s !== slug)].slice(0, 6);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const setCookieConsent = useCallback((choice: 'accepted' | 'essential') => {
    setCookieConsentState(choice);
    try {
      localStorage.setItem(COOKIE_KEY, choice);
    } catch {}
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        toggleTheme,
        numerals,
        toggleNumerals,
        setNumerals,
        formatNumber,
        recentSlugs,
        recordToolUsage,
        searchOpen,
        setSearchOpen,
        cookieConsent,
        setCookieConsent,
        mounted,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}
