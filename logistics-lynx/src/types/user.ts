import type { UserRole } from './auth';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  last_sign_in_at?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
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
