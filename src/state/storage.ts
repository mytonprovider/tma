import { cloudStorage } from '@tma.js/sdk-react';

export const storageKeys = {
  theme: 'ts_theme',
  lang: 'ts_lang',
  explorer: 'ts_explorer',
  favorites: 'ts_favs',
} as const;

const memory = new Map<string, string>();

export const readLocal = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
};

const writeLocal = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
};

export const persist = (key: string, value: string): void => {
  writeLocal(key, value);
  try {
    if (cloudStorage.setItem.isAvailable()) void cloudStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
};

export const readCloud = async (keys: string[]): Promise<Record<string, string>> => {
  try {
    if (!cloudStorage.getItem.isAvailable()) return {};
    const entries = await Promise.all(
      keys.map(async (key) => [key, await cloudStorage.getItem(key)] as const),
    );
    return Object.fromEntries(entries.filter(([, value]) => value));
  } catch {
    return {};
  }
};
