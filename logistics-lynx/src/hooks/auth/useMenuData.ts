/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from 'react';
import { UserRole } from '@/types/auth';
import { MenuItem } from '@/types/menu';

export const useMenuData = (userRole: UserRole) => {
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
    ],
    driver: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'routes', label: 'My Routes', path: '/shipments/dispatch' },
      { id: 'logs', label: 'Driver Logs', path: '/shipments/messaging' },
      { id: 'truck', label: 'My Truck', path: '/assets/truck' }
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'users', label: 'User Management', path: '/settings' },
      { id: 'analytics', label: 'Analytics', path: '/analytics' },
      { id: 'system', label: 'System Settings', path: '/system' }
    ],
    viewer: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'reports', label: 'Reports', path: '/reports' },
      { id: 'analytics', label: 'Analytics', path: '/analytics' }
    ],
    analyst: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'analytics', label: 'Analytics', path: '/analytics' },
      { id: 'reports', label: 'Reports', path: '/reports' },
      { id: 'data', label: 'Data Export', path: '/data' }
    ],
    factoring_admin: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'invoices', label: 'Invoices', path: '/invoices' },
      { id: 'clients', label: 'Clients', path: '/clients' },
      { id: 'finances', label: 'Finances', path: '/finances' }
    ]
  };

  return useMemo(() => {
    return menus[userRole] || [];
  }, [userRole]);
};
