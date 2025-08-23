export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'analyst'
  | 'viewer'
  | 'carrier_admin'
  | 'freight_broker_admin'
  | 'shipper_admin'
  | 'carrier_driver'
  | 'owner_operator';

export interface ExtendedUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
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
