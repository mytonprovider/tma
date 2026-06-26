import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { initData, miniApp } from '@tma.js/sdk-react';

import { createStrictContext } from '@/lib/create-context';
import type { Explorer, Lang, Theme } from '@/types';
import { persist, readCloud, readLocal, storageKeys } from '@/state/storage';

interface SettingsValue {
  theme: Theme;
  lang: Lang;
  explorer: Explorer;
  favorites: string[];
  setTheme: (theme: Theme) => void;
  setLang: (lang: Lang) => void;
  setExplorer: (explorer: Explorer) => void;
  toggleFavorite: (pubkey: string) => void;
  isFavorite: (pubkey: string) => boolean;
}

const [Provider, useSettings] = createStrictContext<SettingsValue>('SettingsContext');

const detectTheme = (): Theme => {
  try {
    return miniApp.isDark() ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
};

const detectLang = (): Lang => {
  try {
    return initData.user()?.language_code?.startsWith('ru') ? 'ru' : 'en';
  } catch {
    return 'en';
  }
};

const parseTheme = (value: string | null, fallback: Theme): Theme =>
  value === 'dark' || value === 'light' ? value : fallback;

const parseLang = (value: string | null, fallback: Lang): Lang =>
  value === 'en' || value === 'ru' ? value : fallback;

const parseExplorer = (value: string | null, fallback: Explorer): Explorer =>
  value === 'tonviewer' || value === 'tonscan' ? value : fallback;

const parseFavorites = (value: string | null): string[] => {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export function SettingsProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(() => parseTheme(readLocal(storageKeys.theme), detectTheme()));
  const [lang, setLangState] = useState<Lang>(() => parseLang(readLocal(storageKeys.lang), detectLang()));
  const [explorer, setExplorerState] = useState<Explorer>(() =>
    parseExplorer(readLocal(storageKeys.explorer), 'tonviewer'),
  );
  const [favorites, setFavorites] = useState<string[]>(() => parseFavorites(readLocal(storageKeys.favorites)));

  useEffect(() => {
    let active = true;
    void readCloud(Object.values(storageKeys)).then((cloud) => {
      if (!active) return;
      if (cloud[storageKeys.theme]) setThemeState(parseTheme(cloud[storageKeys.theme], theme));
      if (cloud[storageKeys.lang]) setLangState(parseLang(cloud[storageKeys.lang], lang));
      if (cloud[storageKeys.explorer]) setExplorerState(parseExplorer(cloud[storageKeys.explorer], explorer));
      if (cloud[storageKeys.favorites]) setFavorites(parseFavorites(cloud[storageKeys.favorites]));
    });
    return () => {
      active = false;
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    persist(storageKeys.theme, next);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(storageKeys.lang, next);
  }, []);

  const setExplorer = useCallback((next: Explorer) => {
    setExplorerState(next);
    persist(storageKeys.explorer, next);
  }, []);

  const toggleFavorite = useCallback((pubkey: string) => {
    setFavorites((current) => {
      const next = current.includes(pubkey)
        ? current.filter((item) => item !== pubkey)
        : [...current, pubkey];
      persist(storageKeys.favorites, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((pubkey: string) => favorites.includes(pubkey), [favorites]);

  const value = useMemo<SettingsValue>(
    () => ({ theme, lang, explorer, favorites, setTheme, setLang, setExplorer, toggleFavorite, isFavorite }),
    [theme, lang, explorer, favorites, setTheme, setLang, setExplorer, toggleFavorite, isFavorite],
  );

  return <Provider value={value}>{children}</Provider>;
}

export { useSettings };
