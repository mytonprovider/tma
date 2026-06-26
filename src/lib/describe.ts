import type { Dict } from '@/i18n/dictionaries';
import { resolveStatus } from '@/lib/status';
import type { Provider, StatusTone } from '@/types';
import { statusColors } from '@/theme';

export interface StatusView {
  tone: StatusTone;
  color: string;
  label: string;
  desc: string;
  ratio: number;
  percent: string | null;
  passed: number;
  total: number;
}

export const describeStatus = (provider: Provider, t: Dict): StatusView => {
  const status = resolveStatus(provider);
  const desc =
    status.total === 0
      ? t.reason.none
      : (status.dominantReason != null && t.reason[status.dominantReason]) || '';
  const percent =
    provider.status !== 0 ? null : status.ratio >= 1 ? '100%' : `${(status.ratio * 100).toFixed(1)}%`;

  return {
    tone: status.tone,
    color: statusColors[status.tone],
    label: t.status[status.labelKey],
    desc,
    ratio: status.ratio,
    percent,
    passed: status.passed,
    total: status.total,
  };
};
