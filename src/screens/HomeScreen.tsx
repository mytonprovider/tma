import { useDeferredValue, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, LINKS } from '@/config';
import { describeStatus } from '@/lib/describe';
import { countActiveFilters, queryProviders } from '@/lib/query';
import { isTelegram } from '@/lib/platform';
import { useTranslation } from '@/i18n/use-translation';
import { useListControls } from '@/state/list-controls';
import { useProviders } from '@/state/providers';
import { useSettings } from '@/state/settings';
import { statusColors, tint } from '@/theme';
import { NavBar } from '@/ui/NavBar';
import { ProviderListSkeleton } from '@/ui/ProviderListSkeleton';
import { ProviderRow } from '@/ui/ProviderRow';
import { SegmentedControl } from '@/ui/SegmentedControl';
import {
  ChatIcon,
  ChevronDown,
  CloseIcon,
  ExternalIcon,
  FiltersIcon,
  GearIcon,
  PlusIcon,
  ReloadIcon,
  MtpLogo,
  SearchIcon,
} from '@/ui/icons';

export function HomeScreen() {
  const t = useTranslation();
  const navigate = useNavigate();
  const { providers, ranges, state, reload } = useProviders();
  const { lang, favorites, isFavorite, toggleFavorite } = useSettings();
  const { tab, filters, sort, search, visible, setTab, setSearch, setSort, loadMore, resetFilters } =
    useListControls();

  const deferredTab = useDeferredValue(tab);
  const items = useMemo(
    () =>
      queryProviders(providers, {
        favoritesOnly: deferredTab === 'fav',
        favorites,
        filters,
        search,
        sort,
      }),
    [providers, deferredTab, favorites, filters, search, sort],
  );

  const shown = items.slice(0, visible);
  const hasMore = items.length > visible;
  const activeFilterCount = countActiveFilters(filters, ranges);

  return (
    <>
      {!isTelegram() && (
        <NavBar
          title={APP_NAME}
          right={
            <div className="ts-nav__actions">
              <button
                type="button"
                aria-label={t.reload}
                className={state === 'loading' ? 'ts-spin' : undefined}
                onClick={reload}
              >
                <ReloadIcon />
              </button>
              <button type="button" aria-label={t.settings} onClick={() => navigate('/settings')}>
                <GearIcon />
              </button>
            </div>
          }
        />
      )}

      <div className="ts-scroll">
        <div className="ts-hero">
          <span className="ts-hero__logo">
            <MtpLogo />
          </span>
          <div className="ts-hero__title">{t.mainTitle}</div>
          <div className="ts-hero__desc">{t.mainDesc}</div>
        </div>

        <div className="ts-search">
          <SearchIcon />
          <input
            value={search}
            placeholder={t.searchPlaceholder}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button type="button" className="ts-search__clear" onClick={() => setSearch('')}>
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="ts-tabs">
          <SegmentedControl
            options={[
              { value: 'list', label: t.list },
              { value: 'fav', label: t.fav },
            ]}
            value={tab}
            onChange={setTab}
            height={38}
            fontSize={14}
          />
        </div>

        {tab === 'list' && (
          <div className="ts-toolbar">
            <button type="button" className="ts-tool-btn" onClick={() => navigate('/filters')}>
              <FiltersIcon />
              {t.filters}
              {activeFilterCount > 0 && <span className="ts-badge">{activeFilterCount}</span>}
            </button>
            <button type="button" className="ts-tool-btn" onClick={() => setSort(sort.field)}>
              <ChevronDown flipped={sort.dir === 'asc'} />
              {t.sortField[sort.field]}
            </button>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className="ts-tool-btn ts-tool-btn--icon"
                style={{ background: tint(statusColors.red, 0.14) }}
                onClick={resetFilters}
              >
                <CloseIcon color={statusColors.red} />
              </button>
            )}
          </div>
        )}

        {state === 'loading' && providers.length === 0 ? (
          <ProviderListSkeleton />
        ) : state === 'error' ? (
          <div className="ts-empty">
            <div className="ts-empty__glyph">!</div>
            <div className="ts-empty__title">{t.loadError}</div>
            <button type="button" className="ts-load-more" onClick={reload}>
              {t.retry}
            </button>
          </div>
        ) : (
          <>
            <div className="ts-count">
              {deferredTab === 'fav' ? t.inFav(items.length) : t.showing(items.length)}
            </div>
            {shown.length > 0 ? (
              <div className="ts-list">
                {shown.map((provider) => (
                  <ProviderRow
                    key={provider.pubkey}
                    provider={provider}
                    status={describeStatus(provider, t)}
                    favorite={isFavorite(provider.pubkey)}
                    lang={lang}
                    onOpen={() => navigate(`/provider/${provider.pubkey}`)}
                    onToggleFavorite={() => toggleFavorite(provider.pubkey)}
                  />
                ))}
              </div>
            ) : (
              <div className="ts-empty">
                <div className="ts-empty__glyph">{deferredTab === 'fav' ? '★' : '⌕'}</div>
                <div className="ts-empty__title">
                  {deferredTab === 'fav' ? t.favEmptyTitle : t.providersNotFound}
                </div>
                {deferredTab === 'fav' && <div className="ts-empty__desc">{t.favEmptyDesc}</div>}
              </div>
            )}
          </>
        )}

        {hasMore && (
          <button type="button" className="ts-load-more" onClick={loadMore}>
            {t.loadMore}
          </button>
        )}

        <div className="ts-footer">
          <div className="ts-card">
            <a className="ts-footer__row" href={LINKS.becomeProvider} target="_blank" rel="noopener noreferrer">
              <span className="ts-footer__icon" style={{ background: '#34c759' }}>
                <PlusIcon />
              </span>
              <span className="ts-footer__label">{t.becomeProvider}</span>
              <ExternalIcon />
            </a>
            <a className="ts-footer__row" href={LINKS.chat} target="_blank" rel="noopener noreferrer">
              <span className="ts-footer__icon" style={{ background: 'var(--ts-accent)' }}>
                <ChatIcon />
              </span>
              <span className="ts-footer__label">{t.support}</span>
              <ExternalIcon />
            </a>
          </div>
          <div className="ts-footer__note">
            {t.footerNote}{' '}
            <a href={LINKS.site} target="_blank" rel="noopener noreferrer">
              mytonprovider.org
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
