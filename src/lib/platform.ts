import { retrieveLaunchParams } from '@tma.js/sdk-react';

type LaunchParams = ReturnType<typeof retrieveLaunchParams>;

export const safeLaunchParams = (): LaunchParams | null => {
  try {
    return retrieveLaunchParams();
  } catch {
    return null;
  }
};

export const isTelegram = (): boolean => safeLaunchParams() !== null;
