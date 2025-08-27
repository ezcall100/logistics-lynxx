/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import { Code, AlertTriangle } from 'lucide-react';
import type { UserRole } from '@/types/auth';
import type { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  path?: string;
  children?: MenuItem[];
}

export const useMenuGenerator = () => {
  const getMenuForRole = useCallback((role: UserRole): MenuItem[] => {
    const menus: Record<UserRole, MenuItem[]> = {
      super_admin: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'users', label: 'User Management', icon: LayoutDashboard, path: '/settings' },
        { id: 'analytics', label: 'Analytics', icon: LayoutDashboard, path: '/analytics' },
        { 
          id: 'api-dashboard', 
          label: 'API Dashboard', 
          icon: Activity, 
          children: [
            { id: 'api-overview', label: 'Overview', icon: LayoutDashboard, path: '/api' },
            { id: 'api-functions', label: 'Edge Functions', icon: Code, path: '/api/functions' },
            { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api/keys' },
            { id: 'api-logs', label: 'Logs & Errors', icon: AlertTriangle, path: '/api/logs' }
          ]
        }
      ],
      carrier_admin: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'fleet', label: 'Fleet Management', icon: LayoutDashboard, path: '/assets' },
        { id: 'shipments', label: 'Shipments', icon: LayoutDashboard, path: '/shipments' },
        { 
          id: 'api-dashboard', 
          label: 'API Dashboard', 
          icon: Activity, 
          children: [
            { id: 'api-overview', label: 'Overview', icon: LayoutDashboard, path: '/api' },
            { id: 'api-functions', label: 'Edge Functions', icon: Code, path: '/api/functions' },
            { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api/keys' },
            { id: 'api-logs', label: 'Logs & Errors', icon: AlertTriangle, path: '/api/logs' }
          ]
        }
      ],
      freight_broker_admin: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'loads', label: 'Load Management', icon: LayoutDashboard, path: '/loads' },
        { id: 'carriers', label: 'Carriers', icon: LayoutDashboard, path: '/carriers' },
        { 
          id: 'api-dashboard', 
          label: 'API Dashboard', 
          icon: Activity, 
          children: [
            { id: 'api-overview', label: 'Overview', icon: LayoutDashboard, path: '/api' },
            { id: 'api-functions', label: 'Edge Functions', icon: Code, path: '/api/functions' },
            { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api/keys' },
            { id: 'api-logs', label: 'Logs & Errors', icon: AlertTriangle, path: '/api/logs' }
          ]
        }
      ],
      // shipper_admin: Removed to prevent conflicts with ShipperSidebar component
      // shipper_admin uses dedicated ShipperSidebar component with SHIPPER_ADMIN_MENU
      carrier_driver: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'routes', label: 'My Routes', icon: LayoutDashboard, path: '/routes' },
        { id: 'logs', label: 'Driver Logs', icon: LayoutDashboard, path: '/logs' },
        { 
          id: 'api-dashboard', 
          label: 'API Dashboard', 
          icon: Activity, 
          children: [
            { id: 'api-overview', label: 'Overview', icon: LayoutDashboard, path: '/api' },
            { id: 'api-functions', label: 'Edge Functions', icon: Code, path: '/api/functions' },
            { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api/keys' },
            { id: 'api-logs', label: 'Logs & Errors', icon: AlertTriangle, path: '/api/logs' }
          ]
        }
      ],
      owner_operator: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { id: 'business', label: 'Business', icon: LayoutDashboard, path: '/business' },
        { id: 'finances', label: 'Finances', icon: LayoutDashboard, path: '/finances' },
        { 
          id: 'api-dashboard', 
          label: 'API Dashboard', 
          icon: Activity, 
          children: [
            { id: 'api-overview', label: 'Overview', icon: LayoutDashboard, path: '/api' },
            { id: 'api-functions', label: 'Edge Functions', icon: Code, path: '/api/functions' },
            { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api/keys' },
            { id: 'api-logs', label: 'Logs & Errors', icon: AlertTriangle, path: '/api/logs' }
          ]
        }
      ]
    };
    return menus[role] || [];
  }, []);

  return { getMenuForRole };
};
