import type { FC, ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, icon }) => (
  <div className="ts-section-title">
    {icon}
    {title}
  </div>
);
