export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'analyst'
  | 'viewer'
  | 'carrier_admin'
  | 'freight_broker_admin'
  | 'shipper_admin'
  | 'carrier_driver'
  | 'owner_operator'
  | 'driver'
  | 'factoring_admin';

export interface ExtendedUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  last_sign_in_at?: string;
}

export interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}
