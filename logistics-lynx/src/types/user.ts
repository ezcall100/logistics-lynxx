export interface User {
  id: string;
  user_id?: string; // Added for database compatibility
  email: string;
  first_name: string; // Added
  last_name: string; // Added
  name?: string; // Added for compatibility
  role: UserRole;
  created_at: string; // Added
  updated_at: string; // Added
  avatar_url?: string;
  phone?: string; // Added
  company?: string; // Added
  location?: { // Added
    city: string;
    state: string;
    country: string;
  };
  status?: UserStatus; // Added
  // Database specific fields
  carrier_id?: string;
  driver_license_expiry?: string;
  driver_license_number?: string;
  driver_performance_metrics?: any;
  driver_status?: string;
  vehicle_assigned?: string;
}

export type UserRole = 'admin' | 'user' | 'manager' | 'super_admin' | 'carrier_driver' | 'driver'; // Added driver

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'; // Defined here

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  last_sign_in_at?: string; // Added
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
