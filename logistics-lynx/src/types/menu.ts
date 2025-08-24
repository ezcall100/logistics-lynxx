import { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  disabled?: boolean;
  badge?: string;
  badgeColor?: string;
}
