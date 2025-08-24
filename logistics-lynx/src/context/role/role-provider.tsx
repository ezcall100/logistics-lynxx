/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from 'react';
import type { UserRole } from '@/types/auth';
import { RoleContext, RoleContextType, ROLES, RoleInfo } from './role-context';

interface RoleProviderProps {
  children: ReactNode;
  initialRole?: UserRole;
}

export default function RoleProvider({ 
  children, 
  initialRole = 'super_admin' 
}: RoleProviderProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>(initialRole);

  const roleInfo = ROLES[currentRole];

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const hasPermission = (permission: string): boolean => {
    if (currentRole === 'super_admin') return true;
    return roleInfo.permissions.includes(permission) || roleInfo.permissions.includes('*');
  };

  const getAvailableRoles = (): RoleInfo[] => {
    return Object.values(ROLES);
  };

  const getRoleQuickActions = () => {
    const actions: Record<UserRole, Array<{
      id: string;
      label: string;
      icon: string;
      action: string;
      description: string;
    }>> = {
      super_admin: [
        {
          id: 'system-overview',
          label: 'System Overview',
          icon: '📊',
          action: 'view_system_overview',
          description: 'View system-wide metrics and status'
        },
        {
          id: 'user-management',
          label: 'User Management',
          icon: '👥',
          action: 'manage_users',
          description: 'Manage all system users'
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: '⚙️',
          action: 'system_settings',
          description: 'Configure system settings'
        }
      ],
      admin: [
        {
          id: 'user-management',
          label: 'User Management',
          icon: '👥',
          action: 'manage_users',
          description: 'Manage system users'
        },
        {
          id: 'system-logs',
          label: 'System Logs',
          icon: '📋',
          action: 'view_logs',
          description: 'View system activity logs'
        },
        {
          id: 'portal-management',
          label: 'Portal Management',
          icon: '🌐',
          action: 'manage_portals',
          description: 'Manage system portals'
        }
      ],
      freight_broker_admin: [
        {
          id: 'load-management',
          label: 'Load Management',
          icon: '📦',
          action: 'manage_loads',
          description: 'Manage freight loads'
        },
        {
          id: 'carrier-management',
          label: 'Carrier Management',
          icon: '🚛',
          action: 'manage_carriers',
          description: 'Manage carrier relationships'
        },
        {
          id: 'quote-creation',
          label: 'Create Quotes',
          icon: '💰',
          action: 'create_quotes',
          description: 'Create shipping quotes'
        }
      ],
      carrier_admin: [
        {
          id: 'fleet-management',
          label: 'Fleet Management',
          icon: '🚛',
          action: 'manage_fleet',
          description: 'Manage fleet operations'
        },
        {
          id: 'driver-management',
          label: 'Driver Management',
          icon: '👨‍💼',
          action: 'manage_drivers',
          description: 'Manage driver assignments'
        },
        {
          id: 'dispatch-loads',
          label: 'Dispatch Loads',
          icon: '📋',
          action: 'dispatch_loads',
          description: 'Dispatch loads to drivers'
        }
      ],
      shipper_admin: [
        {
          id: 'create-shipments',
          label: 'Create Shipments',
          icon: '📦',
          action: 'create_shipments',
          description: 'Create new shipments'
        },
        {
          id: 'track-shipments',
          label: 'Track Shipments',
          icon: '📍',
          action: 'track_shipments',
          description: 'Track shipment status'
        },
        {
          id: 'manage-quotes',
          label: 'Manage Quotes',
          icon: '💰',
          action: 'manage_quotes',
          description: 'Manage shipping quotes'
        }
      ],
      carrier_driver: [
        {
          id: 'view-assignments',
          label: 'View Assignments',
          icon: '📋',
          action: 'view_assignments',
          description: 'View assigned loads'
        },
        {
          id: 'update-status',
          label: 'Update Status',
          icon: '✅',
          action: 'update_status',
          description: 'Update load status'
        },
        {
          id: 'check-in',
          label: 'Check In',
          icon: '📍',
          action: 'check_in',
          description: 'Check in at location'
        }
      ],
      driver: [
        {
          id: 'view-loads',
          label: 'View Loads',
          icon: '📋',
          action: 'view_loads',
          description: 'View assigned loads'
        },
        {
          id: 'update-status',
          label: 'Update Status',
          icon: '✅',
          action: 'update_status',
          description: 'Update load status'
        },
        {
          id: 'check-in',
          label: 'Check In',
          icon: '📍',
          action: 'check_in',
          description: 'Check in at location'
        }
      ],
      owner_operator: [
        {
          id: 'view-contracts',
          label: 'View Contracts',
          icon: '📋',
          action: 'view_contracts',
          description: 'View business contracts'
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          icon: '📊',
          action: 'financial_reports',
          description: 'View financial reports'
        },
        {
          id: 'manage-expenses',
          label: 'Manage Expenses',
          icon: '💸',
          action: 'manage_expenses',
          description: 'Track business expenses'
        }
      ],
      factoring_admin: [
        {
          id: 'process-invoice',
          label: 'Process Invoice',
          icon: '📄',
          action: 'process_invoice',
          description: 'Process invoice payment'
        },
        {
          id: 'view-finances',
          label: 'View Finances',
          icon: '💰',
          action: 'view_finances',
          description: 'View financial reports'
        },
        {
          id: 'manage-clients',
          label: 'Manage Clients',
          icon: '👥',
          action: 'manage_clients',
          description: 'Manage factoring clients'
        }
      ],
      analyst: [
        {
          id: 'generate-report',
          label: 'Generate Report',
          icon: '📈',
          action: 'generate_report',
          description: 'Generate analytics report'
        },
        {
          id: 'view-dashboard',
          label: 'View Dashboard',
          icon: '📊',
          action: 'view_dashboard',
          description: 'View analytics dashboard'
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: '📤',
          action: 'export_data',
          description: 'Export analytics data'
        }
      ],
      viewer: [
        {
          id: 'view-content',
          label: 'View Content',
          icon: '👁️',
          action: 'view_content',
          description: 'View assigned content'
        },
        {
          id: 'view-reports',
          label: 'View Reports',
          icon: '📊',
          action: 'view_reports',
          description: 'View available reports'
        }
      ]
    };

    return actions[currentRole] || [];
  };

  const value: RoleContextType = {
    currentRole,
    roleInfo,
    setRole,
    hasPermission,
    getAvailableRoles,
    getRoleQuickActions
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}
