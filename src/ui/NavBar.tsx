import type { FC, ReactNode } from 'react';

interface NavBarProps {
  title: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export const NavBar: FC<NavBarProps> = ({ title, left, right }) => (
  <div className="ts-nav">
    {left}
    <div className="ts-nav__title">{title}</div>
    {right}
  </div>
);
