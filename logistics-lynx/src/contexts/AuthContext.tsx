import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Type definitions for better type safety
export type Role = 'super_admin' | 'carrier_admin' | 'freight_broker_admin' | 'shipper_admin' | 'carrier_driver' | 'owner_operator';
export type Permission = 
  | 'dashboard:read'
  | 'users:read' | 'users:write' | 'users:delete'
  | 'system:admin' | 'system:read'
  | 'security:admin' | 'security:read'
  | 'mcp:admin' | 'mcp:read'
  | 'analytics:read' | 'analytics:write'
  | 'settings:admin' | 'settings:read'
  | 'portals:admin' | 'portals:read'
  | 'business:admin' | 'business:read'
  | 'invoices:read' | 'invoices:write'
  | 'reports:read' | 'reports:write';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
  isAuthenticated: boolean;
  avatar?: string;
  company?: {
    id: string;
    name: string;
    type: string;
  };
  features?: string[]; // Feature flags
  lastLogin?: string;
  sessionExpiry?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasPermissions: (permissions: string[]) => boolean;
  hasFeature: (feature: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper functions for permission checking
const hasRoleFn = (user?: User) => (role: string): boolean => {
  return user?.role === role || false;
};

const hasPermissionsFn = (user?: User) => (permissions: string[]): boolean => {
  if (!user || !permissions.length) return false;
  return permissions.every(permission => 
    user.permissions.includes(permission as Permission)
  );
};

const hasFeatureFn = (user?: User) => (feature: string): boolean => {
  return user?.features?.includes(feature) || false;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Multi-tab sync for logout/login
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth:logout') {
        console.log('🔍 AuthContext: Logout detected from another tab');
        setUser(null);
        window.location.assign('/login');
      }
      if (e.key === 'auth:login' && e.newValue) {
        console.log('🔍 AuthContext: Login detected from another tab');
        try {
          const userData = JSON.parse(e.newValue);
          setUser(userData);
        } catch (error) {
          console.error('🔍 AuthContext: Failed to parse user data from storage', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mock authentication methods (replace with real API calls)
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email for demo purposes
      let role: Role = 'super_admin';
      let name = 'Admin User';
      
      if (email === 'ezcallnet.mo@gmail.com') {
        role = 'super_admin';
        name = 'Super Administrator';
      } else if (email.includes('carrier@')) {
        role = 'carrier_admin';
        name = 'Carrier Admin';
      } else if (email.includes('broker@')) {
        role = 'freight_broker_admin';
        name = 'Broker Admin';
      } else if (email.includes('shipper@')) {
        role = 'shipper_admin';
        name = 'Shipper Admin';
      } else if (email.includes('driver@')) {
        role = 'carrier_driver';
        name = 'Driver';
      } else if (email.includes('owner@')) {
        role = 'owner_operator';
        name = 'Owner Operator';
      }
      
      // Mock successful login for demo
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        role: role,
        permissions: role === 'super_admin' ? [
          'dashboard:read',
          'users:read',
          'users:write',
          'users:delete',
          'system:admin',
          'system:read',
          'security:admin',
          'security:read',
          'mcp:admin',
          'mcp:read',
          'analytics:read',
          'analytics:write',
          'settings:admin',
          'settings:read',
          'portals:admin',
          'portals:read',
          'business:admin',
          'business:read',
          'invoices:read',
          'invoices:write',
          'reports:read',
          'reports:write'
        ] : [
          'dashboard:read',
          'analytics:read',
          'settings:read'
        ],
        isAuthenticated: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        company: {
          id: 'company-1',
          name: 'Logistics Lynx Corp',
          type: 'enterprise'
        },
        features: [
          'fab.dispatch',
          'ai.agents',
          'advanced.analytics',
          'multi.tenant'
        ],
        lastLogin: new Date().toISOString(),
        sessionExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };

      setUser(mockUser);
      
      // Store in localStorage (in production, use httpOnly cookies for tokens)
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      localStorage.setItem('auth:login', JSON.stringify(mockUser));
      
      console.log('🔍 AuthContext: User logged in successfully', mockUser);
      return true;
    } catch (error) {
      console.error('🔍 AuthContext: Login failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.setItem('auth:logout', Date.now().toString());
    console.log('🔍 AuthContext: User logged out');
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call to refresh user data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would call your API to get fresh user data
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Check if session is expired
        if (parsedUser.sessionExpiry && new Date(parsedUser.sessionExpiry) < new Date()) {
          console.log('🔍 AuthContext: Session expired, logging out');
          logout();
          return;
        }
        
        setUser(parsedUser);
        console.log('🔍 AuthContext: User data refreshed', parsedUser);
      }
    } catch (error) {
      console.error('🔍 AuthContext: Failed to refresh user data', error);
      logout(); // Logout if refresh fails
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      console.log('🔍 AuthContext: User updated', updates);
    }
  }, [user]);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Check if session is expired
          if (parsedUser.sessionExpiry && new Date(parsedUser.sessionExpiry) < new Date()) {
            console.log('🔍 AuthContext: Session expired on init, clearing');
            localStorage.removeItem('auth_user');
            setUser(null);
          } else {
            setUser(parsedUser);
            console.log('🔍 AuthContext: User restored from storage', parsedUser);
          }
        } else {
          // For demo purposes, don't auto-login - let user login manually
          // In production, this would redirect to login
          console.log('🔍 AuthContext: No stored user, waiting for manual login');
          setUser(null);
        }
      } catch (error) {
        console.error('🔍 AuthContext: Failed to initialize auth', error);
        // If there's an error parsing stored user, just set user to null
        console.log('🔍 AuthContext: Error parsing stored user, setting user to null');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [login]);

  // Set up session expiry check
  useEffect(() => {
    if (!user?.sessionExpiry) return;

    const checkSessionExpiry = () => {
      if (new Date(user.sessionExpiry!) < new Date()) {
        console.log('🔍 AuthContext: Session expired, logging out');
        logout();
      }
    };

    const interval = setInterval(checkSessionExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user?.sessionExpiry, logout]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    login,
    logout,
    refreshUser,
    hasRole: hasRoleFn(user),
    hasPermissions: hasPermissionsFn(user),
    hasFeature: hasFeatureFn(user),
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
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

export default checkSessionExpiry;