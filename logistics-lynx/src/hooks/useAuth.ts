import { useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'broker' | 'carrier' | 'shipper' | 'owner-operator' | 'driver';
  avatar?: string;
}

interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuth = (): AuthContext => {
  const [user, setUser] = useState<User | null>(() => {
    // Check for stored user data
    const stored = localStorage.getItem('mcp-user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, password: string) => {
    // Simulate login - in real app, this would call your auth API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'super-admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    };

    setUser(mockUser);
    localStorage.setItem('mcp-user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mcp-user');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('mcp-user', JSON.stringify(updatedUser));
    }
  }, [user]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};