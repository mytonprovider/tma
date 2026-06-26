import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { createStrictContext } from '@/lib/create-context';
import type { Filters, Range, RangeKey, Sort, SortField } from '@/types';

export type Tab = 'list' | 'fav';

const PAGE_SIZE = 10;

const DEFAULT_FILTERS: Filters = {
  location: null,
  rating: null,
  uptime: null,
  price: null,
  bag: null,
  cores: null,
  ram: null,
  freeSpace: null,
  telemetry: null,
  stableOnly: false,
};

const DEFAULT_SORT: Sort = { field: 'rating', dir: 'desc' };

interface ListControlsValue {
  tab: Tab;
  filters: Filters;
  sort: Sort;
  search: string;
  visible: number;
  pageSize: number;
  setTab: (tab: Tab) => void;
  patchFilters: (patch: Partial<Filters>) => void;
  setRange: (key: RangeKey, range: Range) => void;
  setSort: (field: SortField) => void;
  setSearch: (search: string) => void;
  loadMore: () => void;
  resetFilters: () => void;
  reset: () => void;
}

const [Provider, useListControls] = createStrictContext<ListControlsValue>('ListControlsContext');

export function ListControlsProvider({ children }: PropsWithChildren) {
  const [tab, setTabState] = useState<Tab>('list');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSortState] = useState<Sort>(DEFAULT_SORT);
  const [search, setSearchState] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const setTab = useCallback((next: Tab) => {
    setTabState(next);
    setVisible(PAGE_SIZE);
  }, []);

  const patchFilters = useCallback((patch: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setVisible(PAGE_SIZE);
  }, []);

  const setRange = useCallback(
    (key: RangeKey, range: Range) => patchFilters({ [key]: range } as Partial<Filters>),
    [patchFilters],
  );

  const setSort = useCallback((field: SortField) => {
    setSortState((current) =>
      current.field === field ? { field, dir: current.dir === 'desc' ? 'asc' : 'desc' } : { field, dir: 'desc' },
    );
    setVisible(PAGE_SIZE);
  }, []);

  const setSearch = useCallback((next: string) => {
    setSearchState(next);
    setVisible(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => setVisible((current) => current + PAGE_SIZE), []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setVisible(PAGE_SIZE);
  }, []);

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortState(DEFAULT_SORT);
    setSearchState('');
    setVisible(PAGE_SIZE);
  }, []);

  const value = useMemo<ListControlsValue>(
    () => ({
      tab,
      filters,
      sort,
      search,
      visible,
      pageSize: PAGE_SIZE,
      setTab,
      patchFilters,
      setRange,
      setSort,
      setSearch,
      loadMore,
      resetFilters,
      reset,
    }),
    [tab, filters, sort, search, visible, setTab, patchFilters, setRange, setSort, setSearch, loadMore, resetFilters, reset],
  );

  return <Provider value={value}>{children}</Provider>;
}

export { useListControls };
