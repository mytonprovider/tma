import { COIN } from '@/config';
import { GB, KB, MB } from '@/lib/units';
import type { Lang } from '@/types';

interface Units {
  sec: (n: number) => string;
  min: (n: number) => string;
  hr: (n: number) => string;
  days: (n: number) => string;
  year: (n: number) => string;
  gb: (v: string) => string;
  mb: (v: string) => string;
  kb: (v: string) => string;
  bytes: (n: number) => string;
}

const unitsByLang: Record<Lang, Units> = {
  en: {
    sec: (n) => `${n} sec`,
    min: (n) => `${n} min`,
    hr: (n) => `${n} hr`,
    days: (n) => `${n} days`,
    year: (n) => `${n} year`,
    gb: (v) => `${v} Gb`,
    mb: (v) => `${v} Mb`,
    kb: (v) => `${v} Kb`,
    bytes: (n) => `${n} bytes`,
  },
  ru: {
    sec: (n) => `${n} сек`,
    min: (n) => `${n} мин`,
    hr: (n) => `${n} ч`,
    days: (n) => `${n} дн`,
    year: (n) => `${n} г`,
    gb: (v) => `${v} Гб`,
    mb: (v) => `${v} Мб`,
    kb: (v) => `${v} Кб`,
    bytes: (n) => `${n} байт`,
  },
};

export const formatTime = (secs: number, lang: Lang, skipLast = false): string => {
  const u = unitsByLang[lang];
  if (secs < 60) return u.sec(Math.round(secs));
  const seconds = Math.round(secs % 60);
  const minutes = Math.floor(secs / 60) % 60;
  const hours = Math.floor(secs / 3600) % 24;
  const days = Math.floor(secs / 86400) % 365;
  const years = Math.floor(secs / 31536000);
  if (years > 0) return [u.year(years), !skipLast && days ? u.days(days) : ''].join(' ').trim();
  if (secs < 3600) return [minutes ? u.min(minutes) : '', !skipLast && seconds ? u.sec(seconds) : ''].join(' ').trim();
  if (secs < 86400) return [hours ? u.hr(hours) : '', !skipLast && minutes ? u.min(minutes) : ''].join(' ').trim();
  return [days ? u.days(days) : '', !skipLast && hours ? u.hr(hours) : ''].join(' ').trim();
};

export const formatSpace = (bytes: number, lang: Lang): string => {
  const u = unitsByLang[lang];
  if (bytes <= 0) return '—';
  if (bytes <= KB) return u.bytes(bytes);
  if (bytes <= MB) return u.kb((bytes / KB).toFixed(2));
  if (bytes <= GB) return u.mb((bytes / MB).toFixed(2));
  return u.gb((bytes / GB).toFixed(2));
};

export const formatMbps = (bytesPerSec: number): string =>
  bytesPerSec > 0 ? `${(bytesPerSec / MB).toFixed(0)} Mbps` : '—';

export const formatPing = (ping: number): string =>
  ping > 0 && ping < 100000 ? `${ping} ms` : '—';

export const shortenKey = (key: string, maxLen: number): string => {
  if (!key || key.length <= maxLen) return key || '';
  const half = Math.floor(maxLen / 2);
  return `${key.substring(0, half)}…${key.substring(key.length - half)}`;
};

export const formatAmount = (value: number): string => String(parseFloat(value.toFixed(2)));

export const formatPrice = (value: number): string => `${formatAmount(value)} ${COIN}`;
