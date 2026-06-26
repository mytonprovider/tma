import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import { fetchProviders } from '@/api/client';
import { computeRanges } from '@/lib/ranges';
import { createStrictContext } from '@/lib/create-context';
import type { Provider, Ranges } from '@/types';

type LoadState = 'loading' | 'ready' | 'error';

interface ProvidersValue {
  providers: Provider[];
  ranges: Ranges;
  state: LoadState;
  reload: () => void;
}

const [Provider, useProviders] = createStrictContext<ProvidersValue>('ProvidersContext');

export function ProvidersProvider({ children }: PropsWithChildren) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [state, setState] = useState<LoadState>('loading');

  const load = useCallback(async () => {
    setState('loading');
    try {
      setProviders(await fetchProviders());
      setState('ready');
    } catch {
      setProviders([]);
      setState('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const ranges = useMemo(() => computeRanges(providers), [providers]);
  const value = useMemo<ProvidersValue>(
    () => ({ providers, ranges, state, reload: () => void load() }),
    [providers, ranges, state, load],
  );

  return <Provider value={value}>{children}</Provider>;
}

export { useProviders };
