import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  badge?: string;
  badgeColor?: string;
}
