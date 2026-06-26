import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { COIN } from '@/config';
import { queryProviders } from '@/lib/query';
import { isTelegram } from '@/lib/platform';
import { useTranslation } from '@/i18n/use-translation';
import type { RangeKey, SortField, TelemetryFilter } from '@/types';
import { useListControls } from '@/state/list-controls';
import { useProviders } from '@/state/providers';
import { NavBar } from '@/ui/NavBar';
import { RangeSlider } from '@/ui/RangeSlider';
import { SectionHeader } from '@/ui/SectionHeader';
import { SegmentedControl } from '@/ui/SegmentedControl';
import { ACCENT, tint } from '@/theme';
import { Toggle } from '@/ui/Toggle';
import { ChevronDown, ChevronLeft } from '@/ui/icons';

const SORT_FIELDS: SortField[] = ['rating', 'uptime', 'price', 'working_time'];

export function FiltersScreen() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { providers, ranges } = useProviders();
  const { filters, sort, search, setRange, setSort, patchFilters, reset } = useListControls();

  const sliderConfig: Record<RangeKey, { label: string; step: number; unit?: string; decimals: number }> = {
    rating: { label: t.ratingF, step: 0.01, decimals: 2 },
    uptime: { label: t.uptimeF, step: 0.01, unit: '%', decimals: 2 },
    price: { label: t.priceF, step: 0.01, unit: COIN, decimals: 2 },
    bag: { label: t.bagF, step: 1, unit: 'GB', decimals: 0 },
    cores: { label: t.coresF, step: 1, decimals: 0 },
    ram: { label: t.ramF, step: 1, unit: 'GB', decimals: 0 },
  };

  const locations = useMemo(
    () => [...new Set(providers.map((p) => p.iso).filter((iso): iso is string => !!iso))],
    [providers],
  );

  const resultCount = useMemo(
    () => queryProviders(providers, { favoritesOnly: false, favorites: [], filters, search, sort }).length,
    [providers, filters, search, sort],
  );

  const renderSlider = (key: RangeKey) => {
    const config = sliderConfig[key];
    return (
      <RangeSlider
        key={key}
        label={config.label}
        value={filters[key] ?? ranges[key]}
        bounds={ranges[key]}
        step={config.step}
        unit={config.unit}
        format={(value) => value.toFixed(config.decimals)}
        onChange={(range) => setRange(key, range)}
      />
    );
  };

  return (
    <>
      <NavBar
        title={t.filters}
        left={
          isTelegram() ? undefined : (
            <button type="button" className="ts-nav__side ts-nav__side--left" onClick={() => navigate(-1)}>
              <ChevronLeft />
              {t.back}
            </button>
          )
        }
        right={
          <button type="button" className="ts-nav__side ts-nav__side--right ts-nav__side--text" onClick={reset}>
            {t.reset}
          </button>
        }
      />

      <div className="ts-scroll">
        <SectionHeader title={t.sortBy} />
        <div className="ts-card">
          {SORT_FIELDS.map((field, index) => {
            const active = sort.field === field;
            return (
              <div key={field}>
                {index > 0 && <div className="ts-row__sep" style={{ marginLeft: 15 }} />}
                <div
                  className="ts-sort-row"
                  style={{ background: active ? tint(ACCENT, 0.1) : 'transparent' }}
                  onClick={() => setSort(field)}
                >
                  <span
                    className="ts-sort-row__label"
                    style={{ color: active ? 'var(--ts-accent)' : 'var(--ts-text)', fontWeight: active ? 600 : 400 }}
                  >
                    {t.sortField[field]}
                  </span>
                  {active && <ChevronDown size={16} flipped={sort.dir === 'asc'} />}
                </div>
              </div>
            );
          })}
        </div>

        <SectionHeader title={t.providerGroup} />
        <div className="ts-card ts-card--pad">
          <div className="ts-field-hint">{t.location}</div>
          <div className="ts-chips" style={{ marginBottom: 14 }}>
            {[null, ...locations].map((iso) => {
              const active = filters.location === iso;
              return (
                <button
                  key={iso ?? 'any'}
                  type="button"
                  className="ts-chip"
                  style={{
                    background: active ? 'var(--ts-accent)' : 'var(--ts-card2)',
                    color: active ? '#fff' : 'var(--ts-text)',
                    fontWeight: active ? 600 : 500,
                  }}
                  onClick={() => patchFilters({ location: iso })}
                >
                  {iso ?? t.anyLoc}
                </button>
              );
            })}
          </div>
          <div className="ts-divider" />
          {renderSlider('rating')}
          {renderSlider('uptime')}
          {renderSlider('price')}
          {renderSlider('bag')}
        </div>

        <SectionHeader title={t.hardware} />
        <div className="ts-card ts-card--pad">
          {renderSlider('cores')}
          {renderSlider('ram')}
        </div>

        <SectionHeader title={t.statusGroup} />
        <div className="ts-card ts-card--pad">
          <div className="ts-switch-row">
            <span className="ts-switch-row__label">{t.freeSpace}</span>
            <Toggle
              checked={filters.freeSpace === true}
              onChange={(checked) => patchFilters({ freeSpace: checked ? true : null })}
            />
          </div>
          <div className="ts-field-hint">{t.sendTelemetry}</div>
          <div style={{ marginBottom: 14 }}>
            <SegmentedControl<TelemetryFilter>
              options={[
                { value: null, label: t.any },
                { value: true, label: t.yes },
                { value: false, label: t.no },
              ]}
              value={filters.telemetry}
              onChange={(value) => patchFilters({ telemetry: value })}
            />
          </div>
          <div className="ts-field-hint">{t.statusF}</div>
          <SegmentedControl<boolean>
            options={[
              { value: false, label: t.any },
              { value: true, label: t.stableOnly },
            ]}
            value={filters.stableOnly}
            onChange={(value) => patchFilters({ stableOnly: value })}
          />
        </div>

        <button type="button" className="ts-primary-btn" onClick={() => navigate(-1)}>
          {t.showResults(resultCount)}
        </button>
      </div>
    </>
  );
}
