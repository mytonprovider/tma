import type {
  Filters,
  Provider,
  RangeKey,
  Ranges,
  Sort,
} from '@/types';
import { hasFreeSpace, resolveStatus } from '@/lib/status';
import { GB } from '@/lib/units';

const inRange = (value: number, range: [number, number] | null): boolean =>
  !range || (value >= range[0] && value <= range[1]);

const matchesFilters = (provider: Provider, filters: Filters): boolean => {
  if (filters.location && provider.iso !== filters.location) return false;
  if (!inRange(provider.rating, filters.rating)) return false;
  if (!inRange(provider.uptime, filters.uptime)) return false;
  if (!inRange(provider.price, filters.price)) return false;
  if (!inRange(provider.bagBytes / GB, filters.bag)) return false;
  if (filters.cores && (!provider.hasTelemetry || !inRange(provider.cores, filters.cores))) return false;
  if (filters.ram && (!provider.hasTelemetry || !inRange(provider.ramTotal, filters.ram))) return false;
  if (filters.freeSpace === true && !hasFreeSpace(provider)) return false;
  if (filters.telemetry === true && !provider.hasTelemetry) return false;
  if (filters.telemetry === false && provider.hasTelemetry) return false;
  if (filters.stableOnly && resolveStatus(provider).tone !== 'green') return false;
  return true;
};

const sortValue = (provider: Provider, field: Sort['field']): number => {
  switch (field) {
    case 'rating':
      return provider.rating;
    case 'uptime':
      return provider.uptime;
    case 'price':
      return provider.price;
    case 'working_time':
      return provider.workingTime;
  }
};

export interface QueryParams {
  favoritesOnly: boolean;
  favorites: string[];
  filters: Filters;
  search: string;
  sort: Sort;
}

export const queryProviders = (providers: Provider[], params: QueryParams): Provider[] => {
  const base = params.favoritesOnly
    ? providers.filter((p) => params.favorites.includes(p.pubkey))
    : providers.filter((p) => matchesFilters(p, params.filters));

  const term = params.search.trim().toLowerCase();
  const searched = term ? base.filter((p) => p.pubkey.toLowerCase().includes(term)) : base;

  const direction = params.sort.dir === 'asc' ? 1 : -1;
  return [...searched].sort(
    (a, b) => direction * (sortValue(a, params.sort.field) - sortValue(b, params.sort.field)),
  );
};

const isNarrowed = (filters: Filters, ranges: Ranges, key: RangeKey): boolean => {
  const current = filters[key];
  if (!current) return false;
  const bounds = ranges[key];
  return current[0] > bounds[0] || current[1] < bounds[1];
};

export const countActiveFilters = (filters: Filters, ranges: Ranges): number => {
  const rangeKeys: RangeKey[] = ['rating', 'uptime', 'price', 'bag', 'cores', 'ram'];
  const narrowed = rangeKeys.filter((key) => isNarrowed(filters, ranges, key)).length;
  return (
    narrowed +
    (filters.location ? 1 : 0) +
    (filters.freeSpace != null ? 1 : 0) +
    (filters.telemetry != null ? 1 : 0) +
    (filters.stableOnly ? 1 : 0)
  );
};
