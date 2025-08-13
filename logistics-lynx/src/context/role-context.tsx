import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'freight_broker_admin'
  | 'carrier_admin'
  | 'shipper_admin'
  | 'driver'
  | 'owner_operator'
  | 'factoring_admin'
  | 'analyst';

export interface RoleInfo {
  id: UserRole;
  name: string;
  description: string;
  color: string;
  icon: string;
  permissions: string[];
}

export const ROLES: Record<UserRole, RoleInfo> = {
  super_admin: {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full system control and oversight',
    color: 'indigo',
    icon: '👑',
    permissions: ['*']
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    description: 'System administration and management',
    color: 'red',
    icon: '⚙️',
    permissions: ['manage_users', 'system_settings', 'view_logs', 'manage_portals']
  },
  freight_broker_admin: {
    id: 'freight_broker_admin',
    name: 'Freight Broker Admin',
    description: 'Freight brokerage and load management',
    color: 'blue',
    icon: '📦',
    permissions: ['manage_loads', 'manage_carriers', 'view_reports', 'create_quotes']
  },
  carrier_admin: {
    id: 'carrier_admin',
    name: 'Carrier Admin',
    description: 'Fleet operations and driver management',
    color: 'green',
    icon: '🚛',
    permissions: ['manage_fleet', 'manage_drivers', 'dispatch_loads', 'view_reports']
  },
  shipper_admin: {
    id: 'shipper_admin',
    name: 'Shipper Admin',
    description: 'Booking and shipment management',
    color: 'orange',
    icon: '📦',
    permissions: ['create_shipments', 'track_shipments', 'manage_quotes', 'view_reports']
  },
  driver: {
    id: 'driver',
    name: 'Driver',
    description: 'Mobile interface for drivers',
    color: 'purple',
    icon: '👨‍💼',
    permissions: ['view_loads', 'update_status', 'check_in', 'upload_docs']
  },
  owner_operator: {
    id: 'owner_operator',
    name: 'Owner Operator',
    description: 'Independent trucking business management',
    color: 'amber',
    icon: '🏢',
    permissions: ['manage_business', 'view_contracts', 'track_expenses', 'view_reports']
  },
  factoring_admin: {
    id: 'factoring_admin',
    name: 'Factoring Admin',
    description: 'Financial services and invoice management',
    color: 'emerald',
    icon: '💰',
    permissions: ['process_invoices', 'manage_clients', 'view_finances', 'generate_reports']
  },
  analyst: {
    id: 'analyst',
    name: 'Analyst',
    description: 'Data analysis and reporting',
    color: 'teal',
    icon: '📊',
    permissions: ['view_analytics', 'generate_reports', 'export_data', 'view_insights']
  }
};

export interface RoleContextType {
  currentRole: UserRole;
  roleInfo: RoleInfo;
  setRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  getAvailableRoles: () => RoleInfo[];
  getRoleQuickActions: () => Array<{
    id: string;
    label: string;
    icon: string;
    action: string;
    description: string;
  }>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
  initialRole?: UserRole;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ 
  children, 
  initialRole = 'super_admin' 
}) => {
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
          id: 'dispatch-load',
          label: 'Dispatch Load',
          icon: '📤',
          action: 'dispatch_load',
          description: 'Dispatch load to driver'
        },
        {
          id: 'manage-fleet',
          label: 'Manage Fleet',
          icon: '🚛',
          action: 'manage_fleet',
          description: 'Manage fleet vehicles'
        },
        {
          id: 'driver-schedule',
          label: 'Driver Schedule',
          icon: '📅',
          action: 'driver_schedule',
          description: 'View driver schedules'
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
          description: 'Track active shipments'
        },
        {
          id: 'get-quote',
          label: 'Get Quote',
          icon: '💰',
          action: 'get_quote',
          description: 'Get shipping quote'
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
          icon: '📱',
          action: 'update_status',
          description: 'Update delivery status'
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
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const useRoleContext = useRole; // Alias for backward compatibility
