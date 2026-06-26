import type { FC, ReactNode } from 'react';

import { statusColors } from '@/theme';

interface IconProps {
  size?: number;
  color?: string;
}

const star = '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2';

export const MtpLogo: FC<IconProps> = ({ size = 54 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none">
    <path
      fill="#0078ff"
      d="M 234.9589,488.01445 C 184.87522,482.94051 144.8449,466.85693 106.97452,436.59226 97.871178,429.31718 80.569023,411.88329 72.84431,402.20217 39.737916,360.71108 22.291814,311.11923 22.196377,258.23163 22.159053,237.54755 23.9611,222.26091 28.712141,202.95886 41.443448,151.23538 71.816601,105.31181 114.47961,73.28023 184.86865,20.431821 279.4162,12.34084 357.69863,52.46657 c 22.04932,11.301959 39.84795,24.345978 58.03078,42.528807 19.06476,19.064773 32.03559,37.071863 43.86735,60.900013 10.95485,22.06215 17.47468,43.31949 21.31611,69.49938 1.9467,13.26705 2.05874,15.02967 2.0671,32.51806 0.009,19.46263 -0.4966,25.84696 -3.25881,41.12578 -10.94892,60.56282 -46.59911,115.26995 -97.47458,149.57997 -30.96804,20.8846 -62.56447,32.83621 -101.06103,38.22717 -7.01291,0.98207 -39.86942,1.81275 -46.22665,1.1687 z"
    />
    <rect fill="#f9f9f9" width="200" height="35" x="156" y="365.34995" />
    <rect fill="#f9f9f9" width="257.3848" height="35" x="-266.98523" y="230.39433" transform="rotate(-69.274321)" />
    <rect
      fill="#f9f9f9"
      width="257.3848"
      height="35"
      x="-447.58261"
      y="-248.69743"
      transform="matrix(-0.35389406,-0.93528552,-0.93528552,0.35389406,0,0)"
    />
  </svg>
);

export const ChevronLeft: FC<IconProps> = ({ color = 'var(--ts-accent)' }) => (
  <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
    <path d="M9.5 2L2 9.5L9.5 17" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarIcon: FC<IconProps & { filled: boolean; size?: number }> = ({
  filled,
  size = 18,
  color = 'var(--ts-accent)',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : 'none'}
    stroke={filled ? color : 'var(--ts-hint)'}
    strokeWidth={filled ? 1.4 : 1.7}
    strokeLinejoin="round"
  >
    <polygon points={star} />
  </svg>
);

export const SearchIcon: FC<IconProps> = ({ color = 'var(--ts-hint)' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" />
  </svg>
);

export const FiltersIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="7" x2="13" y2="7" />
    <line x1="3" y1="15" x2="9" y2="15" />
    <circle cx="16" cy="7" r="2.4" />
    <circle cx="12" cy="15" r="2.4" />
    <line x1="18" y1="7" x2="19" y2="7" />
    <line x1="14" y1="15" x2="19" y2="15" />
  </svg>
);

export const ChevronDown: FC<IconProps & { size?: number; flipped?: boolean }> = ({
  size = 13,
  color = 'var(--ts-accent)',
  flipped = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: flipped ? 'rotate(180deg)' : 'none' }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const GearIcon: FC<IconProps> = ({ color = 'var(--ts-hint)' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const ReloadIcon: FC<IconProps> = ({ color = 'var(--ts-hint)' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

export const PlusIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChatIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const ExternalIcon: FC<IconProps> = ({ color = 'var(--ts-hint)' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const CopyIcon: FC<IconProps> = ({ color = 'var(--ts-accent)' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

export const CheckIcon: FC<IconProps> = ({ color = statusColors.green }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const ClockIcon: FC<IconProps> = ({ color = statusColors.yellow }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const CloseIcon: FC<IconProps> = ({ size = 14, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const sectionIcon = (children: ReactNode): FC => () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: 'none' }}
  >
    {children}
  </svg>
);

export const LockIcon = sectionIcon(
  <>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </>,
);

export const InfoIcon = sectionIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </>,
);

export const CpuIcon = sectionIcon(
  <>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </>,
);

export const ChartIcon = sectionIcon(
  <>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </>,
);

export const GlobeIcon = sectionIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
  </>,
);

export const ServerIcon = sectionIcon(
  <>
    <rect x="3" y="4" width="18" height="7" rx="1.5" />
    <rect x="3" y="13" width="18" height="7" rx="1.5" />
    <line x1="7" y1="7.5" x2="7.01" y2="7.5" />
    <line x1="7" y1="16.5" x2="7.01" y2="16.5" />
  </>,
);
