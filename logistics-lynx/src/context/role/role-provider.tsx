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
          id: 'create-user',
          label: 'Create User',
          icon: '👤',
          action: 'create_user',
          description: 'Create new user account'
        },
        {
          id: 'system-overview',
          label: 'System Overview',
          icon: '📊',
          action: 'system_overview',
          description: 'View system overview'
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          icon: '🔒',
          action: 'security_settings',
          description: 'Configure security'
        }
      ],
      admin: [
        {
          id: 'manage-users',
          label: 'Manage Users',
          icon: '👥',
          action: 'manage_users',
          description: 'Manage system users'
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: '⚙️',
          action: 'system_settings',
          description: 'Configure system settings'
        },
        {
          id: 'view-logs',
          label: 'View Logs',
          icon: '📋',
          action: 'view_logs',
          description: 'Access system logs'
        }
      ],
      freight_broker_admin: [
        {
          id: 'create-load',
          label: 'Create Load',
          icon: '➕',
          action: 'create_load',
          description: 'Create a new freight load'
        },
        {
          id: 'find-carriers',
          label: 'Find Carriers',
          icon: '🔍',
          action: 'find_carriers',
          description: 'Search available carriers'
        },
        {
          id: 'view-reports',
          label: 'View Reports',
          icon: '📊',
          action: 'view_reports',
          description: 'Access brokerage reports'
        }
      ],
      carrier_admin: [
        {
          id: 'manage-fleet',
          label: 'Manage Fleet',
          icon: '🚛',
          action: 'manage_fleet',
          description: 'Manage vehicle fleet'
        },
        {
          id: 'dispatch-loads',
          label: 'Dispatch Loads',
          icon: '📦',
          action: 'dispatch_loads',
          description: 'Dispatch loads to drivers'
        },
        {
          id: 'driver-management',
          label: 'Driver Management',
          icon: '👨‍💼',
          action: 'driver_management',
          description: 'Manage driver accounts'
        }
      ],
      shipper_admin: [
        {
          id: 'create-shipment',
          label: 'Create Shipment',
          icon: '📦',
          action: 'create_shipment',
          description: 'Create new shipment'
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
