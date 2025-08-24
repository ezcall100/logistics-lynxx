import { supabase } from '@/integrations/supabase/client';
import { User, UserRole, UserStatus } from '@/types/user';

// Mock user data to avoid Supabase schema issues
const mockUsers: User[] = [
  {
    id: '1',
    user_id: 'user_1',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    name: 'Admin User',
    role: 'super_admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: undefined,
    phone: '+1234567890',
    company: 'Example Corp',
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    },
    status: 'active',
    carrier_id: undefined,
    driver_license_expiry: undefined,
    driver_license_number: undefined,
    driver_performance_metrics: undefined,
    driver_status: undefined,
    vehicle_assigned: undefined
  }
];

export const getUserById = async (id: string): Promise<{ data: User | null; error: any }> => {
  try {
    // Use mock data instead of Supabase
    const user = mockUsers.find(u => u.id === id);
    return { data: user || null, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createUser = async (userData: Partial<User>): Promise<{ data: User | null; error: any }> => {
  try {
    // Create mock user
    const newUser: User = {
      id: Date.now().toString(),
      user_id: userData.user_id || `user_${Date.now()}`,
      email: userData.email || '',
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      name: userData.name,
      role: userData.role || 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: userData.avatar_url,
      phone: userData.phone,
      company: userData.company,
      location: userData.location,
      status: userData.status || 'active',
      carrier_id: userData.carrier_id,
      driver_license_expiry: userData.driver_license_expiry,
      driver_license_number: userData.driver_license_number,
      driver_performance_metrics: userData.driver_performance_metrics,
      driver_status: userData.driver_status,
      vehicle_assigned: userData.vehicle_assigned
    };

    mockUsers.push(newUser);
    return { data: newUser, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<{ data: User | null; error: any }> => {
  try {
    // Update mock user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return { data: null, error: 'User not found' };
    }

    const updatedUser = { ...mockUsers[userIndex], ...updates, updated_at: new Date().toISOString() };
    mockUsers[userIndex] = updatedUser;
    return { data: updatedUser, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteUser = async (id: string): Promise<{ error: any }> => {
  try {
    // Delete mock user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return { error: 'User not found' };
    }

    mockUsers.splice(userIndex, 1);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getAllUsers = async (): Promise<{ data: User[]; error: any }> => {
  try {
    return { data: mockUsers, error: null };
  } catch (error) {
    return { data: [], error };
  }
};
