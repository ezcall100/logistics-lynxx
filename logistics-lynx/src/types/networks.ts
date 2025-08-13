export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  status: 'active' | 'inactive' | 'pending';
  creditLimit: number;
  accountType: 'premium' | 'standard' | 'basic';
  industry: string;
  website?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  status: 'active' | 'inactive' | 'pending';
  vendorType: 'service' | 'equipment' | 'fuel' | 'maintenance' | 'insurance';
  paymentTerms: string;
  taxId: string;
  website?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Terminal {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  terminalType: 'port' | 'rail' | 'truck' | 'warehouse' | 'distribution';
  operatingHours: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'maintenance';
  capacity: number;
  facilities: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  locationType: 'pickup' | 'delivery' | 'stop' | 'hub' | 'depot';
  timeZone: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'inactive';
  accessInstructions?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Carrier {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  mc_number: string;
  dot_number: string;
  ein: string;
  equipment_types: string[];
  insurance_amount: string;
  insurance_expiry: string;
  safety_rating: 'satisfactory' | 'conditional' | 'unsatisfactory';
  capacity: string;
  operating_radius: string;
  specialties: string[];
  preferred_lanes: string[];
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  total_shipments: number;
  on_time_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface AccessRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  role: string;
  department?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  members: string[];
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  condition?: string;
  effect: 'allow' | 'deny';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'failure';
}