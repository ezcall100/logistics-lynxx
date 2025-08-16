/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback, useMemo } from 'react';
import type { UserRole } from '@/types/auth';

export const useRoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');

  const availableRoles: UserRole[] = useMemo(() => [
    'super_admin',
    'carrier_admin',
    'freight_broker_admin',
    'shipper_admin',
    'carrier_driver',
    'owner_operator',
  ], []);

  const loadSavedRole = useCallback(() => {
    const savedRole = sessionStorage.getItem('selectedRole') as UserRole;
    if (savedRole && availableRoles.includes(savedRole)) {
      setSelectedRole(savedRole);
    }
  }, [availableRoles]);

  const updateSelectedRole = useCallback((role: UserRole) => {
    console.log('Setting selected role:', role);
    setSelectedRole(role);
    sessionStorage.setItem('selectedRole', role);
  }, []);

  const clearSelectedRole = useCallback(() => {
    sessionStorage.removeItem('selectedRole');
    setSelectedRole('super_admin');
  }, []);

  return {
    selectedRole,
    availableRoles,
    loadSavedRole,
    updateSelectedRole,
    clearSelectedRole,
  };
};
