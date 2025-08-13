
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserRole, ExtendedUser } from '@/types/auth';
import type { LucideIcon } from 'lucide-react';
import { useAuthState } from '@/hooks/auth/useAuthState';
import { useAuthOperations } from '@/hooks/auth/useAuthOperations';
import { useRoleManagement } from '@/hooks/auth/useRoleManagement';
import { useMenuGenerator } from '@/hooks/auth/useMenuGenerator';
import type { Session } from '@supabase/supabase-js';

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

interface MenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  path?: string;
  children?: MenuItem[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { authState, initializeAuth, updateAuthState, resetAuthState } = useAuthState();
  const { signIn, signUp, signOut } = useAuthOperations();
  const { 
    selectedRole, 
    availableRoles, 
    loadSavedRole, 
    updateSelectedRole, 
    clearSelectedRole 
  } = useRoleManagement();
  const { getMenuForRole } = useMenuGenerator();

  useEffect(() => {
    console.log('AuthProvider: Setting up authentication...');
    
    let mounted = true;
    
    const setupAuth = async () => {
      // Initialize auth state
      await initializeAuth();
      
      // Load saved role only after auth is initialized
      if (mounted) {
        loadSavedRole();
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, session?.user ? 'User present' : 'No user');
        
        if (mounted) {
          // Update auth state based on session
          await updateAuthState(session);

          // Clear role on sign out
          if (event === 'SIGNED_OUT') {
            clearSelectedRole();
          }
        }
      }
    );

    // Initialize authentication
    setupAuth();

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [initializeAuth, updateAuthState, loadSavedRole, clearSelectedRole]);

  const handleSignOut = async () => {
    console.log('AuthProvider: Signing out user');
    await signOut();
    resetAuthState();
    clearSelectedRole();
  };

  const contextValue: AuthContextType = {
    user: authState.user,
    session: authState.session,
    selectedRole,
    loading: authState.loading,
    isAuthenticated: !!authState.user,
    isLoading: authState.loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    login: signIn,
    logout: handleSignOut,
    setSelectedRole: updateSelectedRole,
    switchRole: updateSelectedRole,
    availableRoles,
    getMenuForRole,
  };

  console.log('AuthProvider: Current state', {
    userEmail: authState.user?.email,
    isAuthenticated: !!authState.user,
    selectedRole,
    loading: authState.loading
  });

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
