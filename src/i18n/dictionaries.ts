import type { Lang, SortField } from '@/types';

export type StatusKey =
  | 'noData'
  | 'stable'
  | 'partial'
  | 'unstable'
  | 'unavailable'
  | 'notStored'
  | 'noProofs'
  | 'unknown';

export interface Dict {
  back: string;
  reset: string;
  settings: string;
  mainTitle: string;
  mainDesc: string;
  list: string;
  fav: string;
  filters: string;
  sortBy: string;
  searchPlaceholder: string;
  loadMore: string;
  loadError: string;
  retry: string;
  providersNotFound: string;
  favEmptyTitle: string;
  favEmptyDesc: string;
  location: string;
  anyLoc: string;
  ratingF: string;
  uptimeF: string;
  priceF: string;
  bagF: string;
  coresF: string;
  ramF: string;
  any: string;
  providerGroup: string;
  statusGroup: string;
  freeSpace: string;
  sendTelemetry: string;
  statusF: string;
  stableOnly: string;
  yes: string;
  no: string;
  publicKey: string;
  address: string;
  span: string;
  maxBag: string;
  workingTime: string;
  uptime: string;
  rating: string;
  price: string;
  priceUnit: string;
  hardware: string;
  cpuName: string;
  cpuNumber: string;
  cpuVirtual: string;
  ram: string;
  totalSpace: string;
  benchmarks: string;
  diskRead: string;
  diskWrite: string;
  network: string;
  stDownload: string;
  stUpload: string;
  stPing: string;
  country: string;
  isp: string;
  software: string;
  storageHash: string;
  providerHash: string;
  filesAvail: string;
  noTelemetry: string;
  unknown: string;
  appearance: string;
  language: string;
  light: string;
  dark: string;
  reload: string;
  becomeProvider: string;
  support: string;
  footerNote: string;
  explorerLabel: string;
  subscribe: string;
  subscribeNote: string;
  lastTelemetry: string;
  lastSeen: string;
  showing: (count: number) => string;
  inFav: (count: number) => string;
  showResults: (count: number) => string;
  status: Record<StatusKey, string>;
  reason: Record<number, string> & { none: string };
  sortField: Record<SortField, string>;
}

const en: Dict = {
  back: 'Back',
  reset: 'Reset',
  settings: 'Settings',
  mainTitle: 'TON Storage Providers',
  mainDesc: 'Find and compare storage providers on the TON network',
  list: 'List',
  fav: 'Favorites',
  filters: 'Filters',
  sortBy: 'Sort by',
  searchPlaceholder: 'Search by public key',
  loadMore: 'Load more',
  loadError: 'Failed to load providers',
  retry: 'Try again',
  providersNotFound: 'No providers match these filters',
  favEmptyTitle: 'No favorites yet',
  favEmptyDesc: 'Tap the star on any provider to add it to your favorites.',
  location: 'Location',
  anyLoc: 'Any',
  ratingF: 'Rating',
  uptimeF: 'Uptime',
  priceF: 'Price',
  bagF: 'Max bag size',
  coresF: 'CPU cores',
  ramF: 'RAM',
  any: 'Any',
  providerGroup: 'Provider',
  statusGroup: 'Status & data',
  freeSpace: 'Only with free space',
  sendTelemetry: 'Sends telemetry',
  statusF: 'Status',
  stableOnly: 'Stable',
  yes: 'Yes',
  no: 'No',
  publicKey: 'Public Key',
  address: 'Address',
  span: 'Span',
  maxBag: 'Max bag size',
  workingTime: 'Working Time',
  uptime: 'Uptime',
  rating: 'Rating',
  price: 'Price',
  priceUnit: '200GB/mo',
  hardware: 'Hardware',
  cpuName: 'CPU Name',
  cpuNumber: 'CPU Number',
  cpuVirtual: 'CPU is Virtual',
  ram: 'RAM',
  totalSpace: 'Provider Space',
  benchmarks: 'Benchmarks',
  diskRead: 'Disk Read Speed',
  diskWrite: 'Disk Write Speed',
  network: 'Network',
  stDownload: 'Download',
  stUpload: 'Upload',
  stPing: 'Ping',
  country: 'Country',
  isp: 'ISP',
  software: 'Software',
  storageHash: 'Storage Git Hash',
  providerHash: 'Provider Git Hash',
  filesAvail: 'checks:',
  noTelemetry: 'This provider does not send telemetry, so hardware and network data are unavailable.',
  unknown: 'Unknown',
  appearance: 'Appearance',
  language: 'Language',
  light: 'Light',
  dark: 'Dark',
  reload: 'Reload',
  becomeProvider: 'Become a provider',
  support: 'Providers chat',
  footerNote: 'Provider data via',
  explorerLabel: 'Explorer',
  subscribe: 'Subscribe',
  subscribeNote: 'Owner only · telemetry password required',
  lastTelemetry: 'Last telemetry update was more than {t} ago',
  lastSeen: 'Last seen online more than {t} ago',
  showing: (count) => `Showing ${count} providers`,
  inFav: (count) => `${count} in favorites`,
  showResults: (count) => `Show ${count} ${count === 1 ? 'result' : 'results'}`,
  status: {
    noData: 'No Data',
    stable: 'Stable',
    partial: 'Partial',
    unstable: 'Unstable',
    unavailable: 'Unavailable',
    notStored: 'Not stored',
    noProofs: 'No proofs',
    unknown: 'Unknown',
  },
  reason: {
    0: 'Provider is working correctly and serving files as expected',
    101: 'IP address cannot be found or this provider is unavailable',
    102: 'IP address cannot be found or this provider is unavailable',
    103: 'Connection timed out — provider is not responding',
    201: 'Can not ping provider — it was offline or ports are closed',
    202: 'Storage contract issues detected',
    301: 'Have no headers information',
    302: 'Have no headers information',
    401: 'Can not proof files availability',
    402: 'Can not proof files availability',
    403: 'Can not proof files availability',
    none: 'We have not checked this provider yet',
  },
  sortField: { rating: 'Rating', uptime: 'Uptime', price: 'Price', working_time: 'Working time' },
};

const ru: Dict = {
  back: 'Назад',
  reset: 'Сбросить',
  settings: 'Настройки',
  mainTitle: 'Провайдеры TON Storage',
  mainDesc: 'Удобный поиск и фильтры по провайдерам в сети TON',
  list: 'Список',
  fav: 'Избранное',
  filters: 'Фильтры',
  sortBy: 'Сортировка',
  searchPlaceholder: 'Поиск по публичному ключу',
  loadMore: 'Показать ещё',
  loadError: 'Не удалось загрузить провайдеров',
  retry: 'Повторить',
  providersNotFound: 'Нет провайдеров по этим фильтрам',
  favEmptyTitle: 'Пока нет избранного',
  favEmptyDesc: 'Нажмите звезду у любого провайдера, чтобы добавить его в избранное.',
  location: 'Местоположение',
  anyLoc: 'Любое',
  ratingF: 'Рейтинг',
  uptimeF: 'Доступность',
  priceF: 'Цена',
  bagF: 'Макс. размер файла',
  coresF: 'Ядра CPU',
  ramF: 'ОЗУ',
  any: 'Любой',
  providerGroup: 'Провайдер',
  statusGroup: 'Статус и данные',
  freeSpace: 'Только со свободным местом',
  sendTelemetry: 'Отправляет телеметрию',
  statusF: 'Статус',
  stableOnly: 'Стабильно',
  yes: 'Да',
  no: 'Нет',
  publicKey: 'Публичный ключ',
  address: 'Адрес',
  span: 'Спан',
  maxBag: 'Макс. размер файла',
  workingTime: 'Время работы',
  uptime: 'Доступность',
  rating: 'Рейтинг',
  price: 'Цена',
  priceUnit: '200ГБ/мес',
  hardware: 'Железо',
  cpuName: 'Имя CPU',
  cpuNumber: 'Кол-во CPU',
  cpuVirtual: 'Виртуальный CPU',
  ram: 'ОЗУ',
  totalSpace: 'Объём провайдера',
  benchmarks: 'Бенчмарки',
  diskRead: 'Скорость чтения',
  diskWrite: 'Скорость записи',
  network: 'Сеть',
  stDownload: 'Скачивание',
  stUpload: 'Загрузка',
  stPing: 'Пинг',
  country: 'Страна',
  isp: 'Интернет провайдер',
  software: 'Софт',
  storageHash: 'Git hash storage',
  providerHash: 'Git hash провайдера',
  filesAvail: 'проверки:',
  noTelemetry: 'Этот провайдер не отправляет телеметрию, поэтому данные о железе и сети недоступны.',
  unknown: 'Неизвестно',
  appearance: 'Оформление',
  language: 'Язык',
  light: 'Светлая',
  dark: 'Тёмная',
  reload: 'Перезагрузить',
  becomeProvider: 'Стать провайдером',
  support: 'Чат провайдеров',
  footerNote: 'Данные провайдеров:',
  explorerLabel: 'Эксплорер',
  subscribe: 'Подписаться',
  subscribeNote: 'Только владелец · по паролю телеметрии',
  lastTelemetry: 'Последнее обновление телеметрии было более {t} назад',
  lastSeen: 'Последний раз онлайн более {t} назад',
  showing: (count) => `Показано ${count} провайдеров`,
  inFav: (count) => `${count} в избранном`,
  showResults: (count) => `Показать ${count}`,
  status: {
    noData: 'Нет данных',
    stable: 'Стабильно',
    partial: 'Частично',
    unstable: 'Нестабильно',
    unavailable: 'Недоступно',
    notStored: 'Не хранит',
    noProofs: 'Нет пруфов',
    unknown: 'Неизвестно',
  },
  reason: {
    0: 'Провайдер работает корректно и отдаёт файлы',
    101: 'IP-адрес не найден или провайдер недоступен',
    102: 'IP-адрес не найден или провайдер недоступен',
    103: 'Истёк таймаут соединения — провайдер не отвечает',
    201: 'Не удаётся пинговать провайдера — он офлайн или порты закрыты',
    202: 'Обнаружены проблемы со storage-контрактом',
    301: 'Нет информации о заголовках',
    302: 'Нет информации о заголовках',
    401: 'Не удаётся проверить наличие файлов',
    402: 'Не удаётся проверить наличие файлов',
    403: 'Не удаётся проверить наличие файлов',
    none: 'Проверки для этого провайдера ещё не проводились',
  },
  sortField: { rating: 'Рейтинг', uptime: 'Доступность', price: 'Цена', working_time: 'Время работы' },
};

export const dictionaries: Record<Lang, Dict> = { en, ru };
