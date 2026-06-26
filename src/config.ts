import type { Explorer } from '@/types';

export const APP_NAME = 'My TON Provider';

export const COIN = 'GRAM';

export const SUBSCRIBE_BOT = 'mytonprovider_test_bot';

export const LINKS = {
  becomeProvider: 'https://github.com/igroman787/mytonprovider/blob/master/README.md',
  chat: 'https://t.me/mytonprovider_chat',
  site: 'https://mytonprovider.org',
} as const;

export const explorerName: Record<Explorer, string> = {
  tonviewer: 'Tonviewer',
  tonscan: 'Tonscan',
};

export const getExplorerUrl = (explorer: Explorer, address: string): string =>
  explorer === 'tonscan' ? `https://tonscan.org/address/${address}` : `https://tonviewer.com/${address}`;

export const getSubscribeUrl = (pubkey: string): string => `https://t.me/${SUBSCRIBE_BOT}?start=${pubkey}`;
