import type { FC } from 'react';

import { formatPrice, formatTime, shortenKey } from '@/lib/format';
import type { StatusView } from '@/lib/describe';
import type { Lang, Provider } from '@/types';
import { ACCENT, tint } from '@/theme';
import { StarIcon } from '@/ui/icons';

interface ProviderRowProps {
  provider: Provider;
  status: StatusView;
  favorite: boolean;
  lang: Lang;
  onOpen: () => void;
  onToggleFavorite: () => void;
}

export const ProviderRow: FC<ProviderRowProps> = ({
  provider,
  status,
  favorite,
  lang,
  onOpen,
  onToggleFavorite,
}) => {
  const place = provider.country ?? provider.iso ?? '—';
  const meta = `${place} · ${provider.uptime.toFixed(2)}% · ${formatPrice(provider.price)}`;

  return (
    <div className="ts-row" onClick={onOpen}>
      <div className="ts-row__body">
        <div className="ts-row__pk">{shortenKey(provider.pubkey, 16)}</div>
        <div className="ts-row__status">
          <span className="ts-dot" style={{ background: status.color }} />
          <span style={{ color: status.color, fontWeight: 600 }}>{status.label}</span>
          {status.percent && status.total > 0 && (
            <span className="ts-row__checks">
              <span className="ts-chip-count" style={{ background: tint(status.color, 0.18), color: status.color }}>
                {status.passed}
              </span>
              <span style={{ color: 'var(--ts-hint)' }}>/</span>
              <span className="ts-chip-count" style={{ background: 'var(--ts-card2)', color: 'var(--ts-hint)' }}>
                {status.total}
              </span>
            </span>
          )}
        </div>
        <div className="ts-row__meta">{meta}</div>
      </div>
      <div className="ts-row__metrics">
        <span className="ts-row__rating">★ {provider.rating.toFixed(2)}</span>
        {provider.workingTime > 0 && (
          <span className="ts-row__work">{formatTime(provider.workingTime, lang, true)}</span>
        )}
      </div>
      <button
        type="button"
        className="ts-fav-btn"
        style={{ background: favorite ? tint(ACCENT, 0.14) : 'var(--ts-seg)' }}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite();
        }}
      >
        <StarIcon filled={favorite} />
      </button>
    </div>
  );
};
