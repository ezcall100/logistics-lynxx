import { createContext, useContext } from 'react';
import type { UserRole } from '@/types/auth';

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

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const useRoleContext = useRole; // Alias for backward compatibility
