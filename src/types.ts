export type Range = [number, number];

export type StatusTone = 'gray' | 'green' | 'yellow' | 'orange' | 'red';

export type SortField = 'rating' | 'uptime' | 'price' | 'working_time';

export type SortDirection = 'asc' | 'desc';

export type Theme = 'dark' | 'light';

export type Lang = 'en' | 'ru';

export type Explorer = 'tonviewer' | 'tonscan';

export type TelemetryFilter = boolean | null;

export interface StatusCheck {
  reason: number;
  count: number;
}

export interface Provider {
  pubkey: string;
  address: string;
  status: number | null;
  statusRatio: number | null;
  country: string | null;
  iso: string | null;
  city: string;
  uptime: number;
  rating: number;
  price: number;
  workingTime: number;
  minSpan: number;
  maxSpan: number;
  bagBytes: number;
  hasTelemetry: boolean;
  checks: StatusCheck[];
  cpu: string;
  cores: number;
  virtual: boolean;
  ramUsed: number;
  ramTotal: number;
  spaceUsed: number;
  spaceTotal: number;
  diskRead: string;
  diskWrite: string;
  download: number;
  upload: number;
  ping: number;
  isp: string;
  storageHash: string;
  providerHash: string;
  staleSec: number;
  telemetryStaleSec: number;
}

export interface Sort {
  field: SortField;
  dir: SortDirection;
}

export interface Filters {
  location: string | null;
  rating: Range | null;
  uptime: Range | null;
  price: Range | null;
  bag: Range | null;
  cores: Range | null;
  ram: Range | null;
  freeSpace: boolean | null;
  telemetry: TelemetryFilter;
  stableOnly: boolean;
}

export type RangeKey = 'rating' | 'uptime' | 'price' | 'bag' | 'cores' | 'ram';

export type Ranges = Record<RangeKey, Range>;
