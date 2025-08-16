/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import type { UserRole, ExtendedUser } from '@/types/auth';
import type { MenuItem } from '@/types/menu';

export interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
