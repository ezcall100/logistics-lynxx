
export type UserRole = 
  | 'super_admin'
  | 'carrier_admin'
  | 'freight_broker_admin'
  | 'shipper_admin'
  | 'carrier_driver'
  | 'owner_operator';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  user_id?: string;
}

export interface ExtendedUser {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: UserRole;
}
