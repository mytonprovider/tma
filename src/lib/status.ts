import type { StatusKey } from '@/i18n/dictionaries';
import type { Provider, StatusTone } from '@/types';

export interface ProviderStatus {
  tone: StatusTone;
  labelKey: StatusKey;
  ratio: number;
  hasData: boolean;
  passed: number;
  total: number;
  dominantReason: number | null;
}

const UNAVAILABLE = new Set([101, 102, 103, 201, 202]);
const NOT_STORED = new Set([301, 302]);
const NO_PROOFS = new Set([401, 402, 403]);

const classify = (status: number | null, ratio: number): Pick<ProviderStatus, 'tone' | 'labelKey'> => {
  if (status === null) return { tone: 'gray', labelKey: 'noData' };
  if (status === 0) {
    if (ratio >= 0.99) return { tone: 'green', labelKey: 'stable' };
    if (ratio >= 0.8) return { tone: 'yellow', labelKey: 'partial' };
    return { tone: 'red', labelKey: 'unstable' };
  }
  if (UNAVAILABLE.has(status)) return { tone: 'gray', labelKey: 'unavailable' };
  if (NOT_STORED.has(status)) return { tone: 'red', labelKey: 'notStored' };
  if (NO_PROOFS.has(status)) return { tone: 'orange', labelKey: 'noProofs' };
  return { tone: 'gray', labelKey: 'unknown' };
};

export const resolveStatus = (provider: Provider): ProviderStatus => {
  const valid = provider.checks.find((c) => c.reason === 0)?.count ?? 0;
  const total = provider.checks.reduce((sum, c) => sum + c.count, 0);
  const ratio =
    provider.statusRatio != null
      ? provider.statusRatio
      : total > 0
        ? valid / total
        : provider.status === 0
          ? 1
          : 0;
  const sorted = [...provider.checks].sort((a, b) => b.count - a.count);
  let dominantReason: number | null = null;
  if (sorted.length > 0) {
    dominantReason =
      sorted[0].count < total * 0.8 && sorted.length > 1 ? sorted[1].reason : sorted[0].reason;
  }

  return {
    ...classify(provider.status, ratio),
    ratio,
    hasData: total > 0 || provider.status != null,
    passed: valid,
    total,
    dominantReason,
  };
};

export const getUptimeTone = (uptime: number): StatusTone => {
  if (uptime >= 99) return 'green';
  if (uptime >= 95) return 'yellow';
  if (uptime > 0) return 'red';
  return 'gray';
};

export const hasFreeSpace = (provider: Provider): boolean =>
  provider.hasTelemetry ? provider.spaceTotal - provider.spaceUsed > 100 : false;
