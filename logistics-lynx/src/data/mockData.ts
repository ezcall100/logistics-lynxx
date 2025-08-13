import { Customer, Vendor, Terminal, Location, Carrier, AccessRole, User, UserGroup, AccessPolicy, AuditLog } from '@/types/networks';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'ABC Manufacturing Corp',
    email: 'orders@abcmanufacturing.com',
    phone: '(555) 123-4567',
    address: '1234 Industrial Blvd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    contactPerson: 'John Smith',
    status: 'active',
    creditLimit: 50000,
    accountType: 'premium',
    industry: 'Manufacturing',
    website: 'https://abcmanufacturing.com',
    notes: 'Preferred customer with excellent payment history',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Global Retail Solutions',
    email: 'logistics@globalretail.com',
    phone: '(555) 987-6543',
    address: '5678 Commerce Ave',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30309',
    contactPerson: 'Sarah Johnson',
    status: 'active',
    creditLimit: 75000,
    accountType: 'premium',
    industry: 'Retail',
    website: 'https://globalretail.com',
    notes: 'High volume shipper, requires temperature controlled transport',
    createdAt: '2024-02-01T10:15:00Z',
    updatedAt: '2024-03-12T09:45:00Z'
  },
  {
    id: '3',
    name: 'TechStart Innovation',
    email: 'shipping@techstart.com',
    phone: '(555) 456-7890',
    address: '9012 Tech Park Dr',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    contactPerson: 'Mike Chen',
    status: 'pending',
    creditLimit: 25000,
    accountType: 'standard',
    industry: 'Technology',
    website: 'https://techstart.com',
    notes: 'New customer, credit verification pending',
    createdAt: '2024-03-01T12:00:00Z',
    updatedAt: '2024-03-15T16:20:00Z'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Fuel Express LLC',
    email: 'billing@fuelexpress.com',
    phone: '(555) 111-2222',
    address: '2468 Energy Rd',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    contactPerson: 'Robert Davis',
    status: 'active',
    vendorType: 'fuel',
    paymentTerms: 'Net 30',
    taxId: '12-3456789',
    website: 'https://fuelexpress.com',
    notes: 'Primary fuel supplier, competitive rates',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-08T11:15:00Z'
  },
  {
    id: '2',
    name: 'Premier Maintenance Services',
    email: 'contact@premiermaint.com',
    phone: '(555) 333-4444',
    address: '1357 Service Center Blvd',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    contactPerson: 'Lisa Thompson',
    status: 'active',
    vendorType: 'maintenance',
    paymentTerms: 'Net 15',
    taxId: '98-7654321',
    website: 'https://premiermaint.com',
    notes: 'Certified for all vehicle types, 24/7 emergency service',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-03-05T13:45:00Z'
  }
];

export const mockTerminals: Terminal[] = [
  {
    id: '1',
    name: 'Port of Long Beach Terminal',
    code: 'POLB-001',
    address: '1000 Harbor Blvd',
    city: 'Long Beach',
    state: 'CA',
    zipCode: '90802',
    country: 'USA',
    latitude: 33.7701,
    longitude: -118.2137,
    terminalType: 'port',
    operatingHours: '24/7',
    contactPerson: 'Captain James Wilson',
    phone: '(562) 555-0100',
    email: 'operations@polb.com',
    status: 'active',
    capacity: 10000,
    facilities: ['Container Storage', 'Crane Operations', 'Rail Access', 'Truck Loading'],
    notes: 'Major international shipping terminal with rail connectivity',
    createdAt: '2024-01-05T06:00:00Z',
    updatedAt: '2024-03-01T10:30:00Z'
  },
  {
    id: '2',
    name: 'Dallas Distribution Hub',
    code: 'DDH-002',
    address: '5000 Distribution Way',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    country: 'USA',
    latitude: 32.7767,
    longitude: -96.7970,
    terminalType: 'distribution',
    operatingHours: 'Mon-Fri 6AM-10PM',
    contactPerson: 'Maria Rodriguez',
    phone: '(214) 555-0200',
    email: 'hub@dallasdist.com',
    status: 'active',
    capacity: 5000,
    facilities: ['Warehouse Storage', 'Cross-dock', 'Temperature Control', 'Security'],
    notes: 'Central distribution point for Southwest region',
    createdAt: '2024-01-12T08:15:00Z',
    updatedAt: '2024-03-03T15:20:00Z'
  }
];

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Walmart Distribution Center',
    code: 'WDC-CHI-001',
    address: '3000 Walmart Dr',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60629',
    country: 'USA',
    latitude: 41.8781,
    longitude: -87.6298,
    locationType: 'pickup',
    timeZone: 'America/Chicago',
    contactPerson: 'Tom Anderson',
    phone: '(773) 555-0300',
    email: 'receiving@walmart-dc.com',
    status: 'active',
    accessInstructions: 'Use Gate 3 for truck deliveries. Check in at security office.',
    notes: 'High security facility, appointment required',
    createdAt: '2024-01-08T07:00:00Z',
    updatedAt: '2024-03-07T12:00:00Z'
  },
  {
    id: '2',
    name: 'Amazon Fulfillment Center',
    code: 'AFC-ATL-001',
    address: '1500 Fulfillment Pkwy',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30349',
    country: 'USA',
    latitude: 33.7490,
    longitude: -84.3880,
    locationType: 'delivery',
    timeZone: 'America/New_York',
    contactPerson: 'Jennifer Kim',
    phone: '(404) 555-0400',
    email: 'shipping@amazon-fc.com',
    status: 'active',
    accessInstructions: 'Follow signage to dock doors 15-30 for LTL deliveries.',
    notes: '24/7 operations, multiple dock doors available',
    createdAt: '2024-01-18T11:30:00Z',
    updatedAt: '2024-03-09T14:15:00Z'
  }
];

export const mockCarriers: Carrier[] = [
  {
    id: 'CAR-001',
    company_name: 'Swift Transportation',
    contact_person: 'David Wilson',
    email: 'dispatch@swift.com',
    phone: '(555) 111-0001',
    address: '2200 Swift Blvd',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85009',
    country: 'United States',
    mc_number: 'MC-138549',
    dot_number: 'DOT-54321',
    ein: '86-0675968',
    equipment_types: ['Dry Van', 'Refrigerated', 'Flatbed'],
    insurance_amount: '$1,000,000',
    insurance_expiry: '2024-12-31',
    safety_rating: 'satisfactory',
    capacity: '18,000 trucks',
    operating_radius: 'National',
    specialties: ['Temperature Controlled', 'LTL', 'Expedited'],
    preferred_lanes: ['West Coast to Midwest', 'Southwest to Southeast'],
    status: 'active',
    rating: 4.2,
    total_shipments: 15642,
    on_time_percentage: 94,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-03-10T14:30:00Z'
  },
  {
    id: 'CAR-002',
    company_name: 'FedEx Freight',
    contact_person: 'Jennifer Martinez',
    email: 'ltl@fedexfreight.com',
    phone: '(555) 222-0002',
    address: '3875 Airways Blvd',
    city: 'Memphis',
    state: 'TN',
    zip_code: '38118',
    country: 'United States',
    mc_number: 'MC-142723',
    dot_number: 'DOT-87654',
    ein: '62-0959711',
    equipment_types: ['Dry Van', 'LTL', 'White Glove'],
    insurance_amount: '$2,000,000',
    insurance_expiry: '2024-11-15',
    safety_rating: 'satisfactory',
    capacity: '5,000 trucks',
    operating_radius: 'National',
    specialties: ['LTL', 'White Glove', 'Time Critical'],
    preferred_lanes: ['Hub to Hub Network'],
    status: 'active',
    rating: 4.6,
    total_shipments: 8934,
    on_time_percentage: 97,
    created_at: '2024-01-20T10:15:00Z',
    updated_at: '2024-03-12T09:45:00Z'
  },
  {
    id: 'CAR-003',
    company_name: 'Regional Express Carriers',
    contact_person: 'Mark Thompson',
    email: 'ops@regionalexpress.com',
    phone: '(555) 333-0003',
    address: '1455 Commerce Dr',
    city: 'Dallas',
    state: 'TX',
    zip_code: '75207',
    country: 'United States',
    mc_number: 'MC-789456',
    dot_number: 'DOT-12345',
    ein: '75-1234567',
    equipment_types: ['Dry Van', 'Flatbed'],
    insurance_amount: '$1,000,000',
    insurance_expiry: '2024-09-30',
    safety_rating: 'conditional',
    capacity: '150 trucks',
    operating_radius: '500 miles',
    specialties: ['Regional', 'Same Day'],
    preferred_lanes: ['Texas Triangle', 'Dallas to Houston'],
    status: 'pending',
    rating: 3.8,
    total_shipments: 1234,
    on_time_percentage: 89,
    created_at: '2024-03-01T12:00:00Z',
    updated_at: '2024-03-15T16:20:00Z'
  }
];

export const mockRoles: AccessRole[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: ['*'],
    isActive: true,
    isSystemRole: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Operations Manager',
    description: 'Manage shipments, carriers, and day-to-day operations',
    permissions: ['shipments.*', 'carriers.*', 'drivers.*', 'routes.*'],
    isActive: true,
    isSystemRole: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Customer Service',
    description: 'Handle customer inquiries and basic shipment tracking',
    permissions: ['shipments.read', 'customers.read', 'tracking.*'],
    isActive: true,
    isSystemRole: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-20T14:45:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Administrator',
    email: 'john.admin@company.com',
    phone: '(555) 123-4567',
    status: 'active',
    role: 'Super Admin',
    department: 'IT',
    lastLogin: '2024-03-15T09:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T09:30:00Z'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Operations',
    email: 'sarah.ops@company.com',
    phone: '(555) 987-6543',
    status: 'active',
    role: 'Operations Manager',
    department: 'Operations',
    lastLogin: '2024-03-15T08:15:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-15T08:15:00Z'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Support',
    email: 'mike.support@company.com',
    phone: '(555) 456-7890',
    status: 'active',
    role: 'Customer Service',
    department: 'Customer Service',
    lastLogin: '2024-03-14T16:45:00Z',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-03-14T16:45:00Z'
  }
];

export const mockUserGroups: UserGroup[] = [
  {
    id: '1',
    name: 'Operations Team',
    description: 'All operations staff including managers and coordinators',
    members: ['2', '4', '5'],
    roles: ['Operations Manager'],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-01T12:00:00Z'
  },
  {
    id: '2',
    name: 'Customer Support',
    description: 'Customer service representatives and support staff',
    members: ['3', '6'],
    roles: ['Customer Service'],
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-05T14:30:00Z'
  }
];

export const mockAccessPolicies: AccessPolicy[] = [
  {
    id: '1',
    name: 'Shipment Management Policy',
    description: 'Allow operations team to manage all shipment operations',
    resource: 'shipments',
    action: '*',
    condition: 'user.department == "Operations"',
    effect: 'allow',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Financial Data Restriction',
    description: 'Deny access to financial data for customer service',
    resource: 'financials',
    action: '*',
    condition: 'user.role == "Customer Service"',
    effect: 'deny',
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-15T15:30:00Z'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Administrator',
    action: 'CREATE',
    resource: 'shipment',
    resourceId: 'SH-2024-001',
    details: {
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      weight: 2500
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'success'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Operations',
    action: 'UPDATE',
    resource: 'carrier',
    resourceId: 'CAR-001',
    details: {
      field: 'status',
      oldValue: 'pending',
      newValue: 'active'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: '2024-03-15T09:15:00Z',
    status: 'success'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Support',
    action: 'VIEW',
    resource: 'customer',
    resourceId: 'CUST-001',
    details: {
      reason: 'Customer inquiry'
    },
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-03-15T08:45:00Z',
    status: 'success'
  }
];