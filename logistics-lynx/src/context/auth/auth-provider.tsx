import React, { ReactNode } from 'react';
import type { UserRole } from '@/types/auth';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useMenuData } from '@/hooks/auth/useMenuData';
import { AuthContext, AuthContextType } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    session,
    selectedRole,
    loading,
    availableRoles,
    signIn,
    signUp,
    signOut,
    updateSelectedRole
  } = useAuthContext();

  const { getMenuForRole } = useMenuData();

  const contextValue: AuthContextType = {
    user,
    session,
    selectedRole,
    loading,
    isAuthenticated: !!user,
    isLoading: loading,
    signIn,
    signUp,
    signOut,
    login: signIn,
    logout: signOut,
    setSelectedRole: updateSelectedRole,
    switchRole: updateSelectedRole,
    availableRoles,
    getMenuForRole: (role?: UserRole) => getMenuForRole(role || selectedRole),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
