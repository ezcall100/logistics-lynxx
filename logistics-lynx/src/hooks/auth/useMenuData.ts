/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import type { UserRole } from '@/types/auth';
import type { MenuItem } from '@/types/menu';

export const useMenuData = () => {
  const getMenuForRole = useCallback((role: UserRole): MenuItem[] => {
    const menus: Record<UserRole, MenuItem[]> = {
      super_admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'users', label: 'User Management', path: '/settings' },
        { id: 'analytics', label: 'Analytics', path: '/analytics' },
        { id: 'crm', label: 'CRM', path: '/crm' },
        { id: 'api', label: 'API Dashboard', path: '/api' }
      ],
      carrier_admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'fleet', label: 'Fleet Management', path: '/assets' },
        { id: 'shipments', label: 'Shipments', path: '/shipments' },
        { id: 'drivers', label: 'Drivers', path: '/workers?tab=drivers' }
      ],
      freight_broker_admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'loads', label: 'Load Management', path: '/loadboard' },
        { id: 'carriers', label: 'Carriers', path: '/networks?tab=carriers' },
        { id: 'quotes', label: 'Quotes', path: '/quotes' }
      ],
      shipper_admin: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'shipments', label: 'Shipments', path: '/shipments' },
        { id: 'tracking', label: 'Tracking', path: '/shipments' },
        { id: 'vendors', label: 'Vendors', path: '/networks?tab=vendors' }
      ],
      carrier_driver: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'routes', label: 'My Routes', path: '/shipments/dispatch' },
        { id: 'logs', label: 'Driver Logs', path: '/shipments/messaging' },
        { id: 'truck', label: 'My Truck', path: '/assets/truck' }
      ],
      owner_operator: [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'business', label: 'Business', path: '/analytics' },
        { id: 'finances', label: 'Finances', path: '/financials' },
        { id: 'loads', label: 'Find Loads', path: '/shipments/find-load' }
      ]
    };
    return menus[role] || [];
  }, []);

  return { getMenuForRole };
};
