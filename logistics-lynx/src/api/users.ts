import { supabase } from '../lib/supabaseClient';

// User Management API Service
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_login?: string;
  avatar_url?: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  created_at: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  member_count: number;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
}

// Get all users
export const getAllUsers = async (): Promise<{ data: User[] | null; error: any }> => {
  try {
    // First try to get from profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Profiles table error, using mock data:', error.message);
      
      // If profiles table fails, return mock data for development
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'admin@company.com',
          name: 'Super Admin',
          role: 'super_admin',
          status: 'active',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        },
        {
          id: '2',
          email: 'manager@company.com',
          name: 'System Manager',
          role: 'admin',
          status: 'active',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          last_login: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          email: 'user1@company.com',
          name: 'John Doe',
          role: 'user',
          status: 'active',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          last_login: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '4',
          email: 'user2@company.com',
          name: 'Jane Smith',
          role: 'user',
          status: 'active',
          created_at: new Date(Date.now() - 259200000).toISOString(),
          last_login: new Date(Date.now() - 10800000).toISOString()
        },
        {
          id: '5',
          email: 'inactive@company.com',
          name: 'Inactive User',
          role: 'user',
          status: 'inactive',
          created_at: new Date(Date.now() - 604800000).toISOString(),
          last_login: new Date(Date.now() - 604800000).toISOString()
        }
      ];
      
      return { data: mockUsers, error: null };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get user by ID
export const getUserById = async (id: string): Promise<{ data: User | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Create new user
export const createUser = async (userData: Partial<User>): Promise<{ data: User | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Update user
export const updateUser = async (id: string, updates: Partial<User>): Promise<{ data: User | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Delete user
export const deleteUser = async (id: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Get user roles
export const getUserRoles = async (): Promise<{ data: UserRole[] | null; error: any }> => {
  try {
    // Mock data for now - in real app, this would come from roles table
    const data: UserRole[] = [
      {
        id: '1',
        name: 'Super Admin',
        description: 'Full system access',
        permissions: ['*'],
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Admin',
        description: 'Administrative access',
        permissions: ['users.read', 'users.write', 'system.read'],
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'User',
        description: 'Standard user access',
        permissions: ['profile.read', 'profile.write'],
        created_at: new Date().toISOString(),
      },
    ];

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get user groups
export const getUserGroups = async (): Promise<{ data: UserGroup[] | null; error: any }> => {
  try {
    // Mock data for now - in real app, this would come from groups table
    const data: UserGroup[] = [
      {
        id: '1',
        name: 'Developers',
        description: 'Development team members',
        member_count: 12,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Operations',
        description: 'Operations team members',
        member_count: 8,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Sales',
        description: 'Sales team members',
        member_count: 15,
        created_at: new Date().toISOString(),
      },
    ];

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get support tickets
export const getSupportTickets = async (): Promise<{ data: SupportTicket[] | null; error: any }> => {
  try {
    // Mock data for now - in real app, this would come from tickets table
    const data: SupportTicket[] = [
      {
        id: '1',
        user_id: 'user1',
        subject: 'Login issue',
        description: 'Unable to login to the system',
        status: 'open',
        priority: 'high',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        user_id: 'user2',
        subject: 'Feature request',
        description: 'Need new reporting feature',
        status: 'in_progress',
        priority: 'medium',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get billing information
export const getBillingInfo = async (userId: string): Promise<{ data: any | null; error: any }> => {
  try {
    // Mock billing data
    const data = {
      userId,
      plan: 'Enterprise',
      status: 'active',
      nextBilling: '2024-02-15',
      amount: 299.99,
      usage: {
        users: 45,
        storage: '2.4 GB',
        apiCalls: 2400000,
      },
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
