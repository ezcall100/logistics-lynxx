import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isAuthenticated: boolean;
  avatar?: string;
  company?: {
    id: string;
    name: string;
    type: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication methods
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'super-admin',
        permissions: [
          'dashboard:read',
          'users:read',
          'users:write',
          'system:admin',
          'security:admin',
          'mcp:admin',
          'analytics:read',
          'settings:admin',
          'portals:admin',
          'business:admin'
        ],
        isAuthenticated: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        company: {
          id: 'company-1',
          name: 'Logistics Lynx Corp',
          type: 'enterprise'
        }
      };

      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      console.log('🔍 AuthContext: User logged in successfully', mockUser);
      return true;
    } catch (error) {
      console.error('🔍 AuthContext: Login failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    console.log('🔍 AuthContext: User logged out');
  };

  const refreshUser = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call to refresh user data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would call your API to get fresh user data
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('🔍 AuthContext: User data refreshed', parsedUser);
      }
    } catch (error) {
      console.error('🔍 AuthContext: Failed to refresh user data', error);
      logout(); // Logout if refresh fails
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('🔍 AuthContext: User restored from storage', parsedUser);
        } else {
          // For demo purposes, auto-login as super admin
          // In production, this would redirect to login
          await login('admin@logisticslynx.com', 'demo-password');
        }
      } catch (error) {
        console.error('🔍 AuthContext: Failed to initialize auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    login,
    logout,
    refreshUser,
    hasPermission,
    hasRole
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
