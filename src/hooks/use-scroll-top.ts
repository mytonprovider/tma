import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollTop = (): void => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
