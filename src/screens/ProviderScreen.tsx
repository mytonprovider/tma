import { type FC, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { openTelegramLink } from '@tma.js/sdk-react';

import { getExplorerUrl, getSubscribeUrl } from '@/config';
import { describeStatus } from '@/lib/describe';
import { formatAmount, formatMbps, formatPing, formatPrice, formatSpace, formatTime, shortenKey } from '@/lib/format';
import { getUptimeTone } from '@/lib/status';
import { GB } from '@/lib/units';
import { useCopy } from '@/hooks/use-copy';
import { useTranslation } from '@/i18n/use-translation';
import { isTelegram } from '@/lib/platform';
import type { Provider } from '@/types';
import { useProviders } from '@/state/providers';
import { useSettings } from '@/state/settings';
import { statusColors, tint } from '@/theme';
import { FieldRow } from '@/ui/FieldRow';
import { NavBar } from '@/ui/NavBar';
import { ProviderDetailSkeleton } from '@/ui/ProviderDetailSkeleton';
import { SectionHeader } from '@/ui/SectionHeader';
import {
  ChartIcon,
  CheckIcon,
  ChevronLeft,
  ClockIcon,
  CopyIcon,
  CpuIcon,
  GlobeIcon,
  InfoIcon,
  LockIcon,
  ServerIcon,
  StarIcon,
} from '@/ui/icons';

const checkBadge = (ratio: number) => {
  if (ratio >= 0.99) return { bg: tint(statusColors.green, 0.18), color: statusColors.green };
  if (ratio >= 0.8) return { bg: tint(statusColors.yellow, 0.18), color: statusColors.yellow };
  return { bg: tint(statusColors.red, 0.18), color: statusColors.red };
};

interface CopyRowProps {
  label: string;
  value: string;
  display: string;
  copied: boolean;
  onCopy: () => void;
  onOpen?: () => void;
}

const CopyRow: FC<CopyRowProps> = ({ label, display, copied, onCopy, onOpen }) => (
  <div className="ts-field">
    <span className="ts-field__label">{label}</span>
    <span className="ts-copy">
      {onOpen ? (
        <button type="button" className="ts-copy__link" onClick={onOpen}>
          {display}
        </button>
      ) : (
        <button type="button" className="ts-copy__text" onClick={onCopy}>
          {display}
        </button>
      )}
      <button type="button" className="ts-copy__icon" onClick={onCopy}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </span>
  </div>
);

export function ProviderScreen() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { pubkey } = useParams<{ pubkey: string }>();
  const { providers, state } = useProviders();
  const { explorer, lang, isFavorite, toggleFavorite } = useSettings();
  const { copied, copy } = useCopy();

  const provider = useMemo<Provider | undefined>(
    () => providers.find((item) => item.pubkey === pubkey),
    [providers, pubkey],
  );

  const status = useMemo(() => (provider ? describeStatus(provider, t) : null), [provider, t]);

  const backButton = isTelegram() ? undefined : (
    <button type="button" className="ts-nav__side ts-nav__side--left" onClick={() => navigate(-1)}>
      <ChevronLeft />
      {t.back}
    </button>
  );

  if (!provider || !status) {
    if (state === 'loading') {
      return (
        <>
          <NavBar title="" left={backButton} />
          <ProviderDetailSkeleton />
        </>
      );
    }
    return <Navigate to="/" replace />;
  }

  const place = provider.iso
    ? provider.city
      ? `${provider.city}, ${provider.country}`
      : provider.country ?? t.unknown
    : t.unknown;

  const providerFields = [
    { label: t.span, value: `${formatTime(provider.minSpan, lang)} – ${formatTime(provider.maxSpan, lang)}` },
    { label: t.maxBag, value: formatSpace(provider.bagBytes, lang) },
    { label: t.workingTime, value: formatTime(provider.workingTime, lang) },
    { label: t.location, value: place },
    { label: t.uptime, value: `${provider.uptime.toFixed(2)} %` },
    { label: t.rating, value: provider.rating.toFixed(2) },
    { label: t.price, value: formatPrice(provider.price) },
  ];

  const hardwareFields = [
    { label: t.cpuName, value: provider.cpu },
    { label: t.cpuNumber, value: String(provider.cores) },
    { label: t.cpuVirtual, value: provider.virtual ? t.yes : t.no },
    { label: t.ram, value: `${formatAmount(provider.ramUsed)} / ${formatAmount(provider.ramTotal)} Gb` },
    {
      label: t.totalSpace,
      value: `${formatSpace(provider.spaceUsed * GB, lang)} / ${formatSpace(provider.spaceTotal * GB, lang)}`,
    },
  ];

  const benchmarkFields = [
    { label: t.diskRead, value: provider.diskRead },
    { label: t.diskWrite, value: provider.diskWrite },
  ];

  const networkFields = [
    { label: t.stDownload, value: formatMbps(provider.download) },
    { label: t.stUpload, value: formatMbps(provider.upload) },
    { label: t.stPing, value: formatPing(provider.ping) },
    { label: t.country, value: provider.country ?? t.unknown },
    { label: t.isp, value: provider.isp },
  ];

  const badge = checkBadge(status.ratio);
  const favorite = isFavorite(provider.pubkey);

  const openExplorer = () => {
    try {
      window.open(getExplorerUrl(explorer, provider.address), '_blank');
    } catch {
      return;
    }
  };

  const openSubscribe = () => {
    const url = getSubscribeUrl(provider.pubkey);
    try {
      if (openTelegramLink.isAvailable()) {
        openTelegramLink(url);
        return;
      }
    } catch {
      window.open(url, '_blank');
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <>
      <NavBar
        title={
          <span className="ts-nav__pk">
            <span className="ts-nav__dot" style={{ background: status.color }} />
            {shortenKey(provider.pubkey, 14)}
          </span>
        }
        left={backButton}
        right={
          <button
            type="button"
            className="ts-nav__side ts-nav__side--right"
            onClick={() => toggleFavorite(provider.pubkey)}
          >
            <StarIcon filled={favorite} size={23} />
          </button>
        }
      />

      <div className="ts-scroll">
        {provider.staleSec > 0 && (
          <div className="ts-warn">{t.lastSeen.replace('{t}', formatTime(provider.staleSec, lang, true))}</div>
        )}
        {provider.telemetryStaleSec > 0 && (
          <div className="ts-tele-warn">
            <ClockIcon />
            <span>{t.lastTelemetry.replace('{t}', formatTime(provider.telemetryStaleSec, lang, true))}</span>
          </div>
        )}

        <div className="ts-status">
          {status.total > 0 && (
            <div className="ts-healthbar">
              <div style={{ flexGrow: Math.max(status.ratio, 0.0001), background: status.color }} />
              <div style={{ flexGrow: Math.max(1 - status.ratio, 0), background: 'var(--ts-sepf)' }} />
            </div>
          )}
          <div className="ts-status__body">
            <div className="ts-status__head">
              <div className="ts-status__label">
                <span className="ts-dot" style={{ width: 9, height: 9, background: status.color }} />
                <span style={{ color: status.color }}>{status.label}</span>
              </div>
              {status.total > 0 && (
                <div className="ts-status__checks">
                  <span className="ts-status__checks-hint">{t.filesAvail}</span>
                  <span className="ts-chip-count" style={{ background: badge.bg, color: badge.color }}>
                    {status.passed}
                  </span>
                  <span style={{ color: 'var(--ts-hint)' }}>/</span>
                  <span className="ts-chip-count" style={{ background: 'var(--ts-card2)', color: 'var(--ts-hint)' }}>
                    {status.total}
                  </span>
                </div>
              )}
            </div>
            {status.desc && <div className="ts-status__desc">{status.desc}</div>}
          </div>
        </div>

        <div className="ts-tiles">
          <div className="ts-tile">
            <div className="ts-tile__value" style={{ color: 'var(--ts-accent)' }}>
              ★ {provider.rating.toFixed(2)}
            </div>
            <div className="ts-tile__label">{t.rating}</div>
          </div>
          <div className="ts-tile">
            <div className="ts-tile__value" style={{ color: statusColors[getUptimeTone(provider.uptime)] }}>
              {provider.uptime.toFixed(2)}%
            </div>
            <div className="ts-tile__label">{t.uptime}</div>
          </div>
          <div className="ts-tile">
            <div className="ts-tile__value">{formatPrice(provider.price)}</div>
            <div className="ts-tile__label">{t.priceUnit}</div>
          </div>
        </div>

        <button type="button" className="ts-primary-btn" onClick={openSubscribe}>
          {t.subscribe}
        </button>
        <div className="ts-subcap">
          <LockIcon />
          <span>{t.subscribeNote}</span>
        </div>

        <SectionHeader title={t.providerGroup} icon={<InfoIcon />} />
        <div className="ts-card">
          <CopyRow
            label={t.publicKey}
            value={provider.pubkey}
            display={shortenKey(provider.pubkey, 12)}
            copied={copied === 'pk'}
            onCopy={() => copy(provider.pubkey, 'pk')}
          />
          <CopyRow
            label={t.address}
            value={provider.address}
            display={shortenKey(provider.address, 14)}
            copied={copied === 'addr'}
            onCopy={() => copy(provider.address, 'addr')}
            onOpen={openExplorer}
          />
          {providerFields.map((field) => (
            <FieldRow key={field.label} label={field.label} value={field.value} />
          ))}
        </div>

        {provider.hasTelemetry ? (
          <>
            <SectionHeader title={t.hardware} icon={<CpuIcon />} />
            <div className="ts-card">
              {hardwareFields.map((field) => (
                <FieldRow key={field.label} label={field.label} value={field.value} />
              ))}
            </div>

            <SectionHeader title={t.benchmarks} icon={<ChartIcon />} />
            <div className="ts-card">
              {benchmarkFields.map((field) => (
                <FieldRow key={field.label} label={field.label} value={field.value} />
              ))}
            </div>

            <SectionHeader title={t.network} icon={<GlobeIcon />} />
            <div className="ts-card">
              {networkFields.map((field) => (
                <FieldRow key={field.label} label={field.label} value={field.value} />
              ))}
            </div>

            <SectionHeader title={t.software} icon={<ServerIcon />} />
            <div className="ts-card">
              <CopyRow
                label={t.storageHash}
                value={provider.storageHash}
                display={provider.storageHash || '—'}
                copied={copied === 's'}
                onCopy={() => copy(provider.storageHash, 's')}
              />
              <CopyRow
                label={t.providerHash}
                value={provider.providerHash}
                display={provider.providerHash || '—'}
                copied={copied === 'p'}
                onCopy={() => copy(provider.providerHash, 'p')}
              />
            </div>
          </>
        ) : (
          <div className="ts-tele-warn" style={{ background: 'var(--ts-card)' }}>
            <ClockIcon color="var(--ts-hint)" />
            <span style={{ color: 'var(--ts-hint)' }}>{t.noTelemetry}</span>
          </div>
        )}
      </div>
    </>
  );
}
