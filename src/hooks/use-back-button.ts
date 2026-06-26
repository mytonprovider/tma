import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backButton } from '@tma.js/sdk-react';

export const useBackButton = (): void => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      if (backButton.hide.isAvailable()) backButton.hide();
      return;
    }
    if (!backButton.show.isAvailable()) return;
    backButton.show();
    const off = backButton.onClick(() => navigate(-1));
    return () => off();
  }, [pathname, navigate]);
};
