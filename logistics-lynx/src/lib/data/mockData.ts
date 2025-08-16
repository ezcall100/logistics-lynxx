/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock data for the CRM system
export const mockContacts = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acmecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'ACME Corporation',
    position: 'Operations Manager',
    status: 'active',
    lastContact: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    tags: ['VIP', 'Decision Maker'],
    source: 'Website',
    notes: 'Key contact for logistics operations. Very responsive to emails.'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@globalfreight.com',
    phone: '+1 (555) 987-6543',
    company: 'Global Freight Solutions',
    position: 'Procurement Director',
    status: 'active',
    lastContact: '2024-01-12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    tags: ['Hot Lead'],
    source: 'Trade Show',
    notes: 'Interested in our premium carrier services.'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@transporttech.io',
    phone: '+1 (555) 456-7890',
    company: 'TransportTech Industries',
    position: 'Fleet Manager',
    status: 'inactive',
    lastContact: '2023-12-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    tags: ['Past Client'],
    source: 'Referral',
    notes: 'Previously used our services. May be interested in new offerings.'
  }
];

export const mockLeads = [
  {
    id: '1',
    title: 'ACME Corp - Fleet Expansion',
    company: 'ACME Corporation',
    contact: 'John Smith',
    email: 'john.smith@acmecorp.com',
    phone: '+1 (555) 123-4567',
    status: 'qualified',
    priority: 'high',
    source: 'Website Form',
    value: '$45,000',
    probability: 75,
    expectedClose: '2024-02-15',
    lastActivity: '2024-01-15',
    notes: 'Looking to expand their fleet by 20 vehicles. Budget approved.',
    assignedTo: 'Alice Cooper'
  },
  {
    id: '2',
    title: 'Global Freight - Premium Services',
    company: 'Global Freight Solutions',
    contact: 'Sarah Johnson',
    email: 'sarah.j@globalfreight.com',
    phone: '+1 (555) 987-6543',
    status: 'new',
    priority: 'medium',
    source: 'Trade Show',
    value: '$28,500',
    probability: 45,
    expectedClose: '2024-03-01',
    lastActivity: '2024-01-12',
    notes: 'Interested in premium carrier services with real-time tracking.',
    assignedTo: 'Bob Wilson'
  },
  {
    id: '3',
    title: 'TransportTech - Route Optimization',
    company: 'TransportTech Industries',
    contact: 'Michael Chen',
    email: 'mchen@transporttech.io',
    phone: '+1 (555) 456-7890',
    status: 'nurturing',
    priority: 'low',
    source: 'Cold Call',
    value: '$15,200',
    probability: 25,
    expectedClose: '2024-04-15',
    lastActivity: '2024-01-10',
    notes: 'Evaluating different TMS solutions. Price sensitive.',
    assignedTo: 'Charlie Davis'
  }
];

export const mockOpportunities = [
  {
    id: '1',
    name: 'ACME Corp - Enterprise TMS',
    account: 'ACME Corporation',
    stage: 'proposal',
    amount: '$125,000',
    probability: 80,
    expectedClose: '2024-02-28',
    owner: 'Alice Cooper',
    source: 'Existing Customer',
    type: 'Existing Business',
    nextStep: 'Final presentation to board',
    lastActivity: '2024-01-15',
    createdDate: '2023-11-15'
  },
  {
    id: '2',
    name: 'Global Freight - Multi-Modal Solution',
    account: 'Global Freight Solutions',
    stage: 'negotiation',
    amount: '$85,000',
    probability: 65,
    expectedClose: '2024-03-15',
    owner: 'Bob Wilson',
    source: 'Trade Show',
    type: 'New Business',
    nextStep: 'Contract review and pricing adjustment',
    lastActivity: '2024-01-14',
    createdDate: '2023-12-01'
  },
  {
    id: '3',
    name: 'StartupLogistics - Basic Package',
    account: 'StartupLogistics Inc',
    stage: 'discovery',
    amount: '$35,000',
    probability: 30,
    expectedClose: '2024-04-30',
    owner: 'Charlie Davis',
    source: 'Website',
    type: 'New Business',
    nextStep: 'Needs assessment call',
    lastActivity: '2024-01-13',
    createdDate: '2024-01-05'
  }
];

export const mockProjects = [
  {
    id: '1',
    name: 'ACME TMS Implementation',
    client: 'ACME Corporation',
    status: 'in-progress',
    progress: 75,
    startDate: '2023-12-01',
    endDate: '2024-02-29',
    budget: '$125,000',
    spent: '$85,000',
    manager: 'Alice Cooper',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    priority: 'high',
    description: 'Full TMS implementation including driver portal and fleet tracking',
    milestones: [
      { name: 'Requirements Gathering', completed: true, dueDate: '2023-12-15' },
      { name: 'System Configuration', completed: true, dueDate: '2024-01-15' },
      { name: 'User Training', completed: false, dueDate: '2024-02-15' },
      { name: 'Go Live', completed: false, dueDate: '2024-02-29' }
    ]
  },
  {
    id: '2',
    name: 'Global Freight API Integration',
    client: 'Global Freight Solutions',
    status: 'planning',
    progress: 25,
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    budget: '$85,000',
    spent: '$12,000',
    manager: 'Bob Wilson',
    team: ['Sarah Connor', 'Tom Wilson'],
    priority: 'medium',
    description: 'API integration for real-time shipment tracking and automated invoicing',
    milestones: [
      { name: 'API Documentation Review', completed: true, dueDate: '2024-01-20' },
      { name: 'Development Environment Setup', completed: false, dueDate: '2024-02-01' },
      { name: 'Core Integration', completed: false, dueDate: '2024-03-01' },
      { name: 'Testing & Deployment', completed: false, dueDate: '2024-04-15' }
    ]
  }
];

export const mockUsers = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice.cooper@company.com',
    role: 'Super Admin',
    department: 'IT',
    status: 'active',
    lastLogin: '2024-01-15 09:30',
    joinDate: '2023-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    permissions: ['full_access'],
    groups: ['Administrators', 'Sales Team']
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    role: 'Sales Manager',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    joinDate: '2023-03-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    permissions: ['sales_access', 'lead_management'],
    groups: ['Sales Team', 'Managers']
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie.davis@company.com',
    role: 'Sales Rep',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-14 17:20',
    joinDate: '2023-06-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    permissions: ['basic_access', 'lead_view'],
    groups: ['Sales Team']
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana.prince@company.com',
    role: 'Customer Success',
    department: 'Support',
    status: 'inactive',
    lastLogin: '2024-01-10 14:30',
    joinDate: '2023-08-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    permissions: ['support_access', 'customer_view'],
    groups: ['Support Team']
  }
];

export const mockAuditLog = [
  {
    id: '1',
    timestamp: '2024-01-15 09:30:15',
    user: 'Alice Cooper',
    action: 'User Created',
    resource: 'Users',
    details: 'Created new user: John Smith',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2024-01-15 09:15:42',
    user: 'Bob Wilson',
    action: 'Lead Updated',
    resource: 'Leads',
    details: 'Updated lead status for ACME Corp to qualified',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2024-01-15 08:45:30',
    user: 'Charlie Davis',
    action: 'Login Failed',
    resource: 'Authentication',
    details: 'Failed login attempt with invalid password',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    status: 'failed'
  },
  {
    id: '4',
    timestamp: '2024-01-15 08:30:12',
    user: 'Diana Prince',
    action: 'Contact Deleted',
    resource: 'Contacts',
    details: 'Deleted contact: Inactive Customer',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    status: 'success'
  }
];

export const mockEmails = [
  {
    id: '1',
    subject: 'Follow-up on TMS Discussion',
    from: 'alice.cooper@company.com',
    to: 'john.smith@acmecorp.com',
    status: 'sent',
    sentDate: '2024-01-15 10:30',
    openedDate: '2024-01-15 11:45',
    type: 'follow_up',
    template: 'Follow-up Template',
    contact: 'John Smith',
    company: 'ACME Corporation'
  },
  {
    id: '2',
    subject: 'Proposal for Fleet Management Solution',
    from: 'bob.wilson@company.com',
    to: 'sarah.j@globalfreight.com',
    status: 'opened',
    sentDate: '2024-01-14 15:20',
    openedDate: '2024-01-14 16:30',
    type: 'proposal',
    template: 'Proposal Template',
    contact: 'Sarah Johnson',
    company: 'Global Freight Solutions'
  },
  {
    id: '3',
    subject: 'Welcome to Our TMS Platform',
    from: 'system@company.com',
    to: 'mchen@transporttech.io',
    status: 'delivered',
    sentDate: '2024-01-13 09:15',
    openedDate: null,
    type: 'welcome',
    template: 'Welcome Template',
    contact: 'Michael Chen',
    company: 'TransportTech Industries'
  }
];

export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Demo Call with ACME Corp',
    date: '2024-01-16',
    time: '10:00 AM',
    duration: 60,
    type: 'demo',
    attendees: ['John Smith', 'Alice Cooper'],
    location: 'Zoom Meeting',
    description: 'Product demonstration for fleet management features',
    status: 'scheduled',
    reminderSet: true
  },
  {
    id: '2',
    title: 'Proposal Review Meeting',
    date: '2024-01-17',
    time: '2:00 PM',
    duration: 90,
    type: 'meeting',
    attendees: ['Sarah Johnson', 'Bob Wilson', 'Management Team'],
    location: 'Conference Room A',
    description: 'Review and finalize proposal for Global Freight Solutions',
    status: 'scheduled',
    reminderSet: true
  },
  {
    id: '3',
    title: 'Follow-up Call - TransportTech',
    date: '2024-01-18',
    time: '11:30 AM',
    duration: 30,
    type: 'call',
    attendees: ['Michael Chen', 'Charlie Davis'],
    location: 'Phone Call',
    description: 'Follow up on initial interest and answer technical questions',
    status: 'scheduled',
    reminderSet: false
  }
];