import type { FC } from 'react';

interface FieldRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

export const FieldRow: FC<FieldRowProps> = ({ label, value, mono = false }) => (
  <div className="ts-field">
    <span className="ts-field__label">{label}</span>
    <span className={mono ? 'ts-field__value ts-mono' : 'ts-field__value'}>{value}</span>
  </div>
);
