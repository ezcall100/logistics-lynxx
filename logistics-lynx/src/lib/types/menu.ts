/* eslint-disable @typescript-eslint/no-explicit-any */

import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  path: string;
  subMenu?: MenuItem[];
}

export interface MenuItemWithSubMenu extends Omit<MenuItem, 'path'> {
  path?: string; // Make path optional for parent menu items
  subMenu: MenuItem[];
}

export interface MenuSection {
  title?: string;
  items: (MenuItem | MenuItemWithSubMenu)[];
}
