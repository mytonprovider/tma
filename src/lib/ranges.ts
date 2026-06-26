import { GB } from '@/lib/units';
import type { Provider, Range, Ranges } from '@/types';

const floorTo = (value: number, factor: number): number => Math.floor(value * factor) / factor;
const ceilTo = (value: number, factor: number): number => Math.ceil(value * factor) / factor;
const orFallback = (values: number[], fallback: number[]): number[] => values.length ? values : fallback;

const DEFAULT_RANGES: Ranges = {
  rating: [0, 5],
  uptime: [0, 100],
  price: [0, 1],
  bag: [0, 32],
  cores: [1, 64],
  ram: [1, 128],
};

export const computeRanges = (providers: Provider[]): Ranges => {
  if (!providers.length) return DEFAULT_RANGES;
  const ratings = providers.map((p) => p.rating);
  const uptimes = providers.map((p) => p.uptime).filter((v) => v > 0);
  const prices = providers.map((p) => p.price).filter((v) => v > 0);
  const withCores = providers.filter((p) => p.hasTelemetry && p.cores > 0).map((p) => p.cores);
  const withRam = providers.filter((p) => p.hasTelemetry && p.ramTotal > 0).map((p) => p.ramTotal);
  const bags = providers.map((p) => p.bagBytes / GB);

  return {
    rating: [floorTo(Math.min(...ratings), 10), ceilTo(Math.max(...ratings), 10)] as Range,
    uptime: [floorTo(Math.min(...orFallback(uptimes, [0])), 1), 100] as Range,
    price: [
      floorTo(Math.min(...orFallback(prices, [0])), 100),
      ceilTo(Math.max(...orFallback(prices, [1])), 100),
    ] as Range,
    bag: [Math.floor(Math.min(...bags)), Math.ceil(Math.max(...bags))] as Range,
    cores: [Math.min(...orFallback(withCores, [1])), Math.max(...orFallback(withCores, [1]))] as Range,
    ram: [
      Math.floor(Math.min(...orFallback(withRam, [1]))),
      Math.ceil(Math.max(...orFallback(withRam, [1]))),
    ] as Range,
  };
};
