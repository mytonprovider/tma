import type { FC } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    type="button"
    className="ts-toggle"
    style={{ background: checked ? 'var(--ts-accent)' : 'var(--ts-seg)' }}
    onClick={() => onChange(!checked)}
  >
    <span className="ts-toggle__knob" style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
  </button>
);
