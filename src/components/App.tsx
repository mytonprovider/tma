import { HashRouter } from 'react-router-dom';

import { TonStorageApp } from '@/components/TonStorageApp';
import { ListControlsProvider } from '@/state/list-controls';
import { ProvidersProvider } from '@/state/providers';
import { SettingsProvider } from '@/state/settings';

export function App() {
  return (
    <SettingsProvider>
      <ProvidersProvider>
        <ListControlsProvider>
          <HashRouter>
            <TonStorageApp />
          </HashRouter>
        </ListControlsProvider>
      </ProvidersProvider>
    </SettingsProvider>
  );
}
