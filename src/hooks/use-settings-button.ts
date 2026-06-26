import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsButton } from '@tma.js/sdk-react';

export const useSettingsButton = (): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!settingsButton.mount.isAvailable()) return;
    settingsButton.mount();
    if (settingsButton.show.isAvailable()) settingsButton.show();
    const off = settingsButton.onClick(() => navigate('/settings'));
    return () => {
      off();
      if (settingsButton.hide.isAvailable()) settingsButton.hide();
      settingsButton.unmount();
    };
  }, [navigate]);
};
