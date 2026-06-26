import { useMemo } from 'react';

export interface SegmentedOption<T> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  height?: number;
  fontSize?: number;
}

export function SegmentedControl<T>({
  options,
  value,
  onChange,
  height = 33,
  fontSize = 13.5,
}: SegmentedControlProps<T>) {
  const activeIndex = useMemo(
    () => Math.max(0, options.findIndex((option) => Object.is(option.value, value))),
    [options, value],
  );

  return (
    <div className="ts-seg" style={{ height }}>
      <div
        className="ts-seg__thumb"
        style={{
          width: `calc((100% - 4px) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className="ts-seg__btn"
          style={{ fontSize, color: index === activeIndex ? 'var(--ts-text)' : 'var(--ts-hint)' }}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
