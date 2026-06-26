import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { safeLaunchParams } from '@/lib/platform';

const PUBKEY = /^[0-9a-f]{64}$/i;

export const useStartParam = (): void => {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const param = safeLaunchParams()?.tgWebAppStartParam;
    if (param && PUBKEY.test(param)) navigate(`/provider/${param}`);
  }, [navigate]);
};
