// src/services/authService.ts

export const redirectUserByRole = (role: string): string => {
  switch (role) {
    case 'super_admin': return '/super-admin/dashboard';
    case 'carrier_admin': return '/carrier/dashboard';
    case 'freight_broker_admin': return '/broker/dashboard';
    case 'shipper_admin': return '/shipper/dashboard';
    case 'carrier_driver': return '/driver/dashboard';
    case 'owner_operator': return '/owner-operator/dashboard';
    default: return '/access-denied';
  }
};

export const demoCredentials: Record<string, { email: string; password: string }> = {
  super_admin: { email: 'admin@transbotai.com', password: 'demo-password' },
  carrier_admin: { email: 'carrier@transbotai.com', password: 'demo-password' },
  freight_broker_admin: { email: 'broker@transbotai.com', password: 'demo-password' },
  shipper_admin: { email: 'shipper@transbotai.com', password: 'demo-password' },
  carrier_driver: { email: 'driver@transbotai.com', password: 'demo-password' },
  owner_operator: { email: 'owner@transbotai.com', password: 'demo-password' },
};

export const roles = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Carrier Admin', value: 'carrier_admin' },
  { label: 'Broker Admin', value: 'freight_broker_admin' },
  { label: 'Shipper Admin', value: 'shipper_admin' },
  { label: 'Driver', value: 'carrier_driver' },
  { label: 'Owner Operator', value: 'owner_operator' },
];

// Role-based access control helper
export const hasRoleAccess = (userRole: string, requiredRole: string): boolean => {
  // Super admin has access to everything
  if (userRole === 'super_admin') return true;
  
  // Check if user has the required role
  return userRole === requiredRole;
};

// Portal access mapping
export const portalAccess = {
  super_admin: ['super-admin', 'carrier', 'broker', 'shipper', 'driver', 'owner-operator'],
  carrier_admin: ['carrier'],
  freight_broker_admin: ['broker'],
  shipper_admin: ['shipper'],
  carrier_driver: ['driver'],
  owner_operator: ['owner-operator'],
};

export const canAccessPortal = (userRole: string, portal: string): boolean => {
  const allowedPortals = portalAccess[userRole as keyof typeof portalAccess] || [];
  return allowedPortals.includes(portal);
};
