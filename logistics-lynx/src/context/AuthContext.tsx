
import React, { createContext, useContext, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import type { UserRole, ExtendedUser } from '@/types/auth';
import type { MenuItem } from '@/types/menu';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useMenuData } from '@/hooks/auth/useMenuData';

interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  selectedRole: UserRole;
  loading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  setSelectedRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  availableRoles: UserRole[];
  getMenuForRole: (role?: UserRole) => MenuItem[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
