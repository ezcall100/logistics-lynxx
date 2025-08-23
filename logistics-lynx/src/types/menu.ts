import { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  path?: string;
  submenus?: MenuItem[];
  disabled?: boolean;
  badge?: string | number;
}
