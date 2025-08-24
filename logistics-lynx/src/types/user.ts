export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  phone?: string;
  company?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  status?: UserStatus;
}

export type UserRole = 'admin' | 'user' | 'manager' | 'super_admin';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  last_sign_in_at?: string;
}

export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata?: {
    role?: string;
    name?: string;
  };
  created_at: string;
  last_sign_in_at?: string;
}
