import type { SearchRequestDto, SearchResponseDto } from '@/api/dto';
import { toProvider } from '@/api/mappers';
import type { Provider } from '@/types';

const API_BASE = 'https://mytonprovider.org/api/v1';
const SEARCH_LIMIT = 140;
const REQUEST_TIMEOUT = 12000;

const searchBody: SearchRequestDto = {
  filters: { uptime_gt_percent: 0, uptime_lt_percent: 100, has_free_space: false, is_send_telemetry: null },
  sort: { column: 'rating', order: 'desc' },
  exact: [],
  limit: SEARCH_LIMIT,
  offset: 0,
};

export const fetchProviders = async (): Promise<Provider[]> => {
  const response = await fetch(`${API_BASE}/providers/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(searchBody),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = (await response.json()) as SearchResponseDto;
  const providers = data.providers ?? [];
  if (!providers.length) throw new Error('empty');

  const requestedAt = Math.floor(Date.now() / 1000);
  return providers.map((p) => toProvider(p, requestedAt));
};
