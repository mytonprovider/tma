import { useRef } from 'react';

import type { Range } from '@/types';

type Thumb = 'lo' | 'hi';

interface RangeSliderProps {
  label: string;
  value: Range;
  bounds: Range;
  step: number;
  format: (value: number) => string;
  unit?: string;
  onChange: (value: Range) => void;
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

export function RangeSlider({ label, value, bounds, step, format, unit, onChange }: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const [min, max] = bounds;
  const span = max - min || 1;
  const [lo, hi] = value;
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;

  const startDrag = (thumb: Thumb) => (event: React.PointerEvent) => {
    event.preventDefault();
    const move = (e: PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const raw = clamp(Math.round((min + ratio * span) / step) * step, min, max);
      const [curLo, curHi] = valueRef.current;
      onChange(thumb === 'lo' ? [Math.min(raw, curHi), curHi] : [curLo, Math.max(raw, curLo)]);
    };
    const stop = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  };

  const valueText = `${format(lo)} – ${format(hi)}${unit ? ` ${unit}` : ''}`;

  return (
    <div>
      <div className="ts-slider-head">
        <span className="ts-slider-head__label">{label}</span>
        <span className="ts-slider-head__value">{valueText}</span>
      </div>
      <div className="ts-slider">
        <div className="ts-slider__track" ref={trackRef}>
          <div className="ts-slider__fill" style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} />
          <div className="ts-slider__thumb" style={{ left: `${loPct}%` }} onPointerDown={startDrag('lo')} />
          <div className="ts-slider__thumb" style={{ left: `${hiPct}%` }} onPointerDown={startDrag('hi')} />
        </div>
      </div>
    </div>
  );
}
