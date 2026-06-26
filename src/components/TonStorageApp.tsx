import type { CSSProperties } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useBackButton } from '@/hooks/use-back-button';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { useSettingsButton } from '@/hooks/use-settings-button';
import { useStartParam } from '@/hooks/use-start-param';
import { isTelegram } from '@/lib/platform';
import { FiltersScreen } from '@/screens/FiltersScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProviderScreen } from '@/screens/ProviderScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { useSettings } from '@/state/settings';
import { toCssVars, palettes } from '@/theme';

export function TonStorageApp() {
  const { theme } = useSettings();
  useBackButton();
  useSettingsButton();
  useScrollTop();
  useStartParam();

  return (
    <div
      className={isTelegram() ? 'ts-page' : 'ts-page ts-web'}
      style={toCssVars(palettes[theme]) as CSSProperties}
    >
      <div className="ts-app">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/provider/:pubkey" element={<ProviderScreen />} />
          <Route path="/filters" element={<FiltersScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
