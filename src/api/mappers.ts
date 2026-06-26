import type { ProviderDto } from '@/api/dto';
import type { Provider } from '@/types';

const STALE_THRESHOLD = 600;
const NANO = 1e9;

export const toProvider = (dto: ProviderDto, requestedAt: number): Provider => {
  const telemetry = dto.telemetry ?? {};
  const location = dto.location ?? {};
  const hasTelemetry = !!dto.is_send_telemetry && !!dto.telemetry;
  const checks = (dto.statuses_reason_stats ?? []).map((c) => ({ reason: c.reason, count: c.cnt }));

  const lastOnline = dto.last_online_check_time ?? 0;
  const onlineGap = lastOnline ? Math.max(0, requestedAt - lastOnline) : 0;
  const staleSec = onlineGap > STALE_THRESHOLD ? onlineGap : 0;

  const telemetryUpdated = telemetry.updated_at ?? 0;
  const telemetryGap = hasTelemetry && telemetryUpdated ? Math.max(0, requestedAt - telemetryUpdated) : 0;

  return {
    pubkey: dto.pubkey,
    address: dto.address,
    status: dto.status,
    statusRatio: typeof dto.status_ratio === 'number' ? dto.status_ratio : null,
    country: location.country ?? null,
    iso: location.country_iso ?? null,
    city: location.city ?? '',
    uptime: typeof dto.uptime === 'number' ? dto.uptime : 0,
    rating: typeof dto.rating === 'number' ? dto.rating : 0,
    price: (dto.price ?? 0) / NANO,
    workingTime: dto.working_time ?? 0,
    minSpan: dto.min_span ?? 0,
    maxSpan: dto.max_span ?? 0,
    bagBytes: dto.max_bag_size_bytes ?? 0,
    hasTelemetry,
    checks,
    cpu: telemetry.cpu_name ?? '—',
    cores: telemetry.cpu_number ?? 0,
    virtual: !!telemetry.cpu_is_virtual,
    ramUsed: telemetry.usage_ram ?? 0,
    ramTotal: telemetry.total_ram ?? 0,
    spaceUsed: telemetry.used_provider_space ?? 0,
    spaceTotal: telemetry.total_provider_space ?? 0,
    diskRead: telemetry.qd64_disk_read_speed ?? '—',
    diskWrite: telemetry.qd64_disk_write_speed ?? '—',
    download: telemetry.speedtest_download ?? 0,
    upload: telemetry.speedtest_upload ?? 0,
    ping: Math.round(telemetry.speedtest_ping ?? 0),
    isp: telemetry.isp ?? '—',
    storageHash: telemetry.storage_git_hash ?? '',
    providerHash: telemetry.provider_git_hash ?? '',
    staleSec,
    telemetryStaleSec: telemetryGap > STALE_THRESHOLD ? telemetryGap : 0,
  };
};
