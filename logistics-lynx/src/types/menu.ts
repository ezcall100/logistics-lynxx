/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MenuItem {
  id: string;
  label: string;
  icon?: unknown;
  path?: string;
  children?: MenuItem[];
}
