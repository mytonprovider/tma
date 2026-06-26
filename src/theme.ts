import type { StatusTone, Theme } from '@/types';

export const ACCENT = '#0098EA';

export const tint = (hex: string, alpha: number): string => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export interface Palette {
  bg: string;
  card: string;
  card2: string;
  text: string;
  hint: string;
  sep: string;
  sepf: string;
  navbg: string;
  active: string;
  seg: string;
  thumb: string;
  star: string;
  backdrop: string;
}

const dark: Palette = {
  bg: '#0e0e11',
  card: '#1c1c20',
  card2: '#2a2a2f',
  text: '#f0f0f3',
  hint: '#8e8e93',
  sep: 'rgba(255,255,255,0.09)',
  sepf: 'rgba(255,255,255,0.06)',
  navbg: 'rgba(14,14,17,0.72)',
  active: 'rgba(255,255,255,0.06)',
  seg: 'rgba(118,118,128,0.24)',
  thumb: '#6c6c72',
  star: '#48484a',
  backdrop: '#000000',
};

const light: Palette = {
  bg: '#efeff4',
  card: '#ffffff',
  card2: '#f2f2f7',
  text: '#000000',
  hint: '#8a8a8e',
  sep: 'rgba(0,0,0,0.1)',
  sepf: 'rgba(0,0,0,0.07)',
  navbg: 'rgba(255,255,255,0.82)',
  active: 'rgba(0,0,0,0.05)',
  seg: 'rgba(118,118,128,0.14)',
  thumb: '#ffffff',
  star: '#c7c7cc',
  backdrop: '#efeff4',
};

export const palettes: Record<Theme, Palette> = { dark, light };

export const statusColors: Record<StatusTone, string> = {
  gray: '#8e8e93',
  green: '#2ec06c',
  yellow: '#e0a000',
  orange: '#ff8c1a',
  red: '#ff3b30',
};

export const toCssVars = (palette: Palette): Record<string, string> => ({
  '--ts-accent': ACCENT,
  '--ts-bg': palette.bg,
  '--ts-card': palette.card,
  '--ts-card2': palette.card2,
  '--ts-text': palette.text,
  '--ts-hint': palette.hint,
  '--ts-sep': palette.sep,
  '--ts-sepf': palette.sepf,
  '--ts-navbg': palette.navbg,
  '--ts-active': palette.active,
  '--ts-seg': palette.seg,
  '--ts-thumb': palette.thumb,
  '--ts-star': palette.star,
  '--ts-backdrop': palette.backdrop,
});
