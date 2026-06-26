import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';
import { safeLaunchParams } from '@/lib/platform';

import './index.css';
import '@/styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const launchParams = safeLaunchParams();
const platform = launchParams?.tgWebAppPlatform;
const startParam = launchParams?.tgWebAppStartParam;

const debug = (startParam ?? '').includes('debug') || import.meta.env.DEV;

void init({
  debug,
  eruda: debug && !!platform && ['ios', 'android'].includes(platform),
  mockForMacOS: platform === 'macos',
})
  .catch(() => undefined)
  .finally(() => {
    root.render(
      <StrictMode>
        <Root />
      </StrictMode>,
    );
  });
