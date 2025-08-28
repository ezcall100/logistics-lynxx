import { 
  Settings, CheckCircle, Home, Package, MapPin, FileText
} from 'lucide-react';

import type { MenuItem } from '@/types/menu';

export const driversMenu: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/driver/dashboard',
    icon: Home
  },
  {
    id: 'loads',
    title: 'My Loads',
    path: '/driver/loads',
    icon: Package,
    children: [
      {
        id: 'assigned',
        title: 'Assigned Loads',
        path: '/driver/loads/assigned',
        icon: CheckCircle
      },
      {
        id: 'completed',
        title: 'Completed Loads',
        path: '/driver/loads/completed',
        icon: CheckCircle
      }
    ]
  },
  {
    id: 'tracking',
    title: 'Tracking',
    path: '/driver/tracking',
    icon: MapPin
  },
  {
    id: 'documents',
    title: 'Documents',
    path: '/driver/documents',
    icon: FileText
  },
  {
    id: 'settings',
    title: 'Settings',
    path: '/driver/settings',
    icon: Settings
  }
];