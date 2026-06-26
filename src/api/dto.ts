export interface TelemetryDto {
  storage_git_hash?: string | null;
  provider_git_hash?: string | null;
  qd64_disk_read_speed?: string | null;
  qd64_disk_write_speed?: string | null;
  country?: string | null;
  isp?: string | null;
  cpu_name?: string | null;
  cpu_number?: number | null;
  cpu_is_virtual?: boolean | null;
  updated_at?: number | null;
  total_provider_space?: number | null;
  used_provider_space?: number | null;
  total_ram?: number | null;
  usage_ram?: number | null;
  speedtest_download?: number | null;
  speedtest_upload?: number | null;
  speedtest_ping?: number | null;
}

export interface LocationDto {
  country?: string | null;
  country_iso?: string | null;
  city?: string | null;
}

export interface StatusReasonStatDto {
  reason: number;
  cnt: number;
}

export interface ProviderDto {
  pubkey: string;
  address: string;
  status: number | null;
  status_ratio?: number | null;
  location?: LocationDto | null;
  uptime?: number;
  rating?: number;
  price?: number;
  working_time?: number;
  min_span?: number;
  max_span?: number;
  max_bag_size_bytes?: number;
  is_send_telemetry?: boolean;
  last_online_check_time?: number | null;
  statuses_reason_stats?: StatusReasonStatDto[];
  telemetry?: TelemetryDto | null;
}

export interface SearchResponseDto {
  providers: ProviderDto[];
}

export interface SearchRequestDto {
  filters: Record<string, unknown>;
  sort: { column: string; order: string };
  exact: string[];
  limit: number;
  offset: number;
}
