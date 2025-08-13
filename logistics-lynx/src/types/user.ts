
export type UserRole = 
  | 'super_admin'
  | 'shipper_admin' 
  | 'freight_broker_admin' 
  | 'carrier_admin' 
  | 'carrier_driver'
  | 'owner_operator';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  company?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  loginId: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
