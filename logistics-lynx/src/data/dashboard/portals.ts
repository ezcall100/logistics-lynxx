export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  description: string;
}

export interface PortalData {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  status: 'online' | 'offline' | 'maintenance';
  accessibleRoles: string[];
  quickActions: QuickAction[];
  color: string;
  metrics?: {
    activeUsers?: number;
    lastActivity?: string;
    performance?: string;
  };
}

export const portals: PortalData[] = [
  {
    id: 'broker',
    name: 'Broker Portal',
    description: 'Freight brokerage and load management',
    icon: '📦',
    path: '/broker',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin'],
    color: 'blue',
    quickActions: [
      {
        id: 'create-load',
        label: 'Create Load',
        icon: '➕',
        action: 'create_load',
        description: 'Create a new freight load'
      },
      {
        id: 'find-carriers',
        label: 'Find Carriers',
        icon: '🔍',
        action: 'find_carriers',
        description: 'Search available carriers'
      },
      {
        id: 'view-reports',
        label: 'View Reports',
        icon: '📊',
        action: 'view_reports',
        description: 'Access brokerage reports'
      }
    ],
    metrics: {
      activeUsers: 45,
      lastActivity: '2 min ago',
      performance: '98.5%'
    }
  },
  {
    id: 'carrier',
    name: 'Carrier Portal',
    description: 'Fleet operations and driver management',
    icon: '🚛',
    path: '/carrier',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'carrier_admin'],
    color: 'green',
    quickActions: [
      {
        id: 'dispatch-load',
        label: 'Dispatch Load',
        icon: '📤',
        action: 'dispatch_load',
        description: 'Dispatch load to driver'
      },
      {
        id: 'manage-fleet',
        label: 'Manage Fleet',
        icon: '🚛',
        action: 'manage_fleet',
        description: 'Manage fleet vehicles'
      },
      {
        id: 'driver-schedule',
        label: 'Driver Schedule',
        icon: '📅',
        action: 'driver_schedule',
        description: 'View driver schedules'
      }
    ],
    metrics: {
      activeUsers: 67,
      lastActivity: '1 min ago',
      performance: '99.2%'
    }
  },
  {
    id: 'driver',
    name: 'Driver Portal',
    description: 'Mobile interface for drivers',
    icon: '👨‍💼',
    path: '/driver',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'carrier_admin', 'driver'],
    color: 'purple',
    quickActions: [
      {
        id: 'view-loads',
        label: 'View Loads',
        icon: '📋',
        action: 'view_loads',
        description: 'View assigned loads'
      },
      {
        id: 'update-status',
        label: 'Update Status',
        icon: '📱',
        action: 'update_status',
        description: 'Update delivery status'
      },
      {
        id: 'check-in',
        label: 'Check In',
        icon: '📍',
        action: 'check_in',
        description: 'Check in at location'
      }
    ],
    metrics: {
      activeUsers: 234,
      lastActivity: '30 sec ago',
      performance: '97.8%'
    }
  },
  {
    id: 'shipper',
    name: 'Shipper Portal',
    description: 'Booking and shipment tracking',
    icon: '📦',
    path: '/shipper',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'shipper_admin'],
    color: 'orange',
    quickActions: [
      {
        id: 'create-shipment',
        label: 'Create Shipment',
        icon: '📦',
        action: 'create_shipment',
        description: 'Create new shipment'
      },
      {
        id: 'track-shipments',
        label: 'Track Shipments',
        icon: '📍',
        action: 'track_shipments',
        description: 'Track active shipments'
      },
      {
        id: 'get-quote',
        label: 'Get Quote',
        icon: '💰',
        action: 'get_quote',
        description: 'Get shipping quote'
      }
    ],
    metrics: {
      activeUsers: 89,
      lastActivity: '5 min ago',
      performance: '99.1%'
    }
  },
  {
    id: 'admin',
    name: 'Admin Portal',
    description: 'System administration and management',
    icon: '⚙️',
    path: '/admin',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin'],
    color: 'red',
    quickActions: [
      {
        id: 'manage-users',
        label: 'Manage Users',
        icon: '👥',
        action: 'manage_users',
        description: 'Manage system users'
      },
      {
        id: 'system-settings',
        label: 'System Settings',
        icon: '⚙️',
        action: 'system_settings',
        description: 'Configure system settings'
      },
      {
        id: 'view-logs',
        label: 'View Logs',
        icon: '📋',
        action: 'view_logs',
        description: 'Access system logs'
      }
    ],
    metrics: {
      activeUsers: 12,
      lastActivity: '10 min ago',
      performance: '100%'
    }
  },
  {
    id: 'super-admin',
    name: 'Super Admin Portal',
    description: 'Full system control and oversight',
    icon: '👑',
    path: '/super-admin',
    status: 'online',
    accessibleRoles: ['super_admin'],
    color: 'indigo',
    quickActions: [
      {
        id: 'create-user',
        label: 'Create User',
        icon: '👤',
        action: 'create_user',
        description: 'Create new user account'
      },
      {
        id: 'system-overview',
        label: 'System Overview',
        icon: '📊',
        action: 'system_overview',
        description: 'View system overview'
      },
      {
        id: 'security-settings',
        label: 'Security Settings',
        icon: '🔒',
        action: 'security_settings',
        description: 'Configure security'
      }
    ],
    metrics: {
      activeUsers: 3,
      lastActivity: '15 min ago',
      performance: '100%'
    }
  },
  {
    id: 'analytics',
    name: 'Analytics Portal',
    description: 'Data insights and reporting',
    icon: '📊',
    path: '/analytics',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'analyst'],
    color: 'teal',
    quickActions: [
      {
        id: 'generate-report',
        label: 'Generate Report',
        icon: '📈',
        action: 'generate_report',
        description: 'Generate analytics report'
      },
      {
        id: 'view-dashboard',
        label: 'View Dashboard',
        icon: '📊',
        action: 'view_dashboard',
        description: 'View analytics dashboard'
      },
      {
        id: 'export-data',
        label: 'Export Data',
        icon: '📤',
        action: 'export_data',
        description: 'Export analytics data'
      }
    ],
    metrics: {
      activeUsers: 23,
      lastActivity: '8 min ago',
      performance: '98.9%'
    }
  },
  {
    id: 'autonomous',
    name: 'Autonomous Portal',
    description: 'AI-powered automation and insights',
    icon: '🤖',
    path: '/autonomous',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'analyst'],
    color: 'pink',
    quickActions: [
      {
        id: 'ai-insights',
        label: 'AI Insights',
        icon: '🧠',
        action: 'ai_insights',
        description: 'View AI insights'
      },
      {
        id: 'optimize-routes',
        label: 'Optimize Routes',
        icon: '🛣️',
        action: 'optimize_routes',
        description: 'AI route optimization'
      },
      {
        id: 'predict-demand',
        label: 'Predict Demand',
        icon: '🔮',
        action: 'predict_demand',
        description: 'Demand forecasting'
      }
    ],
    metrics: {
      activeUsers: 18,
      lastActivity: '12 min ago',
      performance: '99.5%'
    }
  },
  {
    id: 'factoring',
    name: 'Factoring Portal',
    description: 'Financial services and invoice management',
    icon: '💰',
    path: '/factoring',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'factoring_admin'],
    color: 'emerald',
    quickActions: [
      {
        id: 'process-invoice',
        label: 'Process Invoice',
        icon: '📄',
        action: 'process_invoice',
        description: 'Process invoice payment'
      },
      {
        id: 'view-finances',
        label: 'View Finances',
        icon: '💰',
        action: 'view_finances',
        description: 'View financial reports'
      },
      {
        id: 'manage-clients',
        label: 'Manage Clients',
        icon: '👥',
        action: 'manage_clients',
        description: 'Manage factoring clients'
      }
    ],
    metrics: {
      activeUsers: 34,
      lastActivity: '3 min ago',
      performance: '99.7%'
    }
  },
  {
    id: 'owner-operator',
    name: 'Owner-Operator Portal',
    description: 'Business management for owner-operators',
    icon: '🏢',
    path: '/owner-operator',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'owner_operator'],
    color: 'amber',
    quickActions: [
      {
        id: 'view-contracts',
        label: 'View Contracts',
        icon: '📋',
        action: 'view_contracts',
        description: 'View business contracts'
      },
      {
        id: 'financial-reports',
        label: 'Financial Reports',
        icon: '📊',
        action: 'financial_reports',
        description: 'View financial reports'
      },
      {
        id: 'manage-expenses',
        label: 'Manage Expenses',
        icon: '💸',
        action: 'manage_expenses',
        description: 'Track business expenses'
      }
    ],
    metrics: {
      activeUsers: 56,
      lastActivity: '7 min ago',
      performance: '98.3%'
    }
  },
  {
    id: 'load-board',
    name: 'Load Board Portal',
    description: 'Central marketplace for freight loads and capacity',
    icon: '📋',
    path: '/load-board',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'driver', 'owner_operator'],
    color: 'cyan',
    quickActions: [
      {
        id: 'post-load',
        label: 'Post Load',
        icon: '📝',
        action: 'post_load',
        description: 'Post a new freight load'
      },
      {
        id: 'find-loads',
        label: 'Find Loads',
        icon: '🔍',
        action: 'find_loads',
        description: 'Search available loads'
      },
      {
        id: 'bid-on-load',
        label: 'Bid on Load',
        icon: '💰',
        action: 'bid_on_load',
        description: 'Submit bid for load'
      },
      {
        id: 'track-shipments',
        label: 'Track Shipments',
        icon: '📍',
        action: 'track_shipments',
        description: 'Real-time shipment tracking'
      }
    ],
    metrics: {
      activeUsers: 234,
      lastActivity: '30 sec ago',
      performance: '99.8%'
    }
  },
  {
    id: 'crm',
    name: 'CRM Portal',
    description: 'Customer relationship management and business intelligence',
    icon: '👥',
    path: '/crm',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'factoring_admin'],
    color: 'violet',
    quickActions: [
      {
        id: 'add-contact',
        label: 'Add Contact',
        icon: '➕',
        action: 'add_contact',
        description: 'Add new customer contact'
      },
      {
        id: 'view-opportunities',
        label: 'Opportunities',
        icon: '🎯',
        action: 'view_opportunities',
        description: 'View sales opportunities'
      },
      {
        id: 'generate-leads',
        label: 'Generate Leads',
        icon: '📈',
        action: 'generate_leads',
        description: 'Create new business leads'
      },
      {
        id: 'customer-analytics',
        label: 'Analytics',
        icon: '📊',
        action: 'customer_analytics',
        description: 'Customer performance analytics'
      }
    ],
    metrics: {
      activeUsers: 89,
      lastActivity: '2 min ago',
      performance: '98.9%'
    }
  },
  {
    id: 'financials',
    name: 'Financials Portal',
    description: 'Financial management, invoicing, and payment processing',
    icon: '💰',
    path: '/financials',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'factoring_admin', 'owner_operator'],
    color: 'emerald',
    quickActions: [
      {
        id: 'create-invoice',
        label: 'Create Invoice',
        icon: '📄',
        action: 'create_invoice',
        description: 'Generate new invoice'
      },
      {
        id: 'process-payment',
        label: 'Process Payment',
        icon: '💳',
        action: 'process_payment',
        description: 'Process payment transaction'
      },
      {
        id: 'view-reports',
        label: 'Financial Reports',
        icon: '📊',
        action: 'view_financial_reports',
        description: 'Access financial reports'
      },
      {
        id: 'manage-expenses',
        label: 'Manage Expenses',
        icon: '💸',
        action: 'manage_expenses',
        description: 'Track and manage expenses'
      }
    ],
    metrics: {
      activeUsers: 156,
      lastActivity: '1 min ago',
      performance: '99.2%'
    }
  },
  {
    id: 'edi',
    name: 'EDI Portal',
    description: 'Electronic Data Interchange and document management',
    icon: '📡',
    path: '/edi',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'factoring_admin'],
    color: 'slate',
    quickActions: [
      {
        id: 'send-document',
        label: 'Send Document',
        icon: '📤',
        action: 'send_document',
        description: 'Send EDI document to partner'
      },
      {
        id: 'receive-document',
        label: 'Receive Document',
        icon: '📥',
        action: 'receive_document',
        description: 'Receive and process EDI document'
      },
      {
        id: 'view-transactions',
        label: 'View Transactions',
        icon: '📋',
        action: 'view_transactions',
        description: 'View EDI transaction history'
      },
      {
        id: 'manage-partners',
        label: 'Manage Partners',
        icon: '🤝',
        action: 'manage_partners',
        description: 'Manage EDI trading partners'
      }
    ],
    metrics: {
      activeUsers: 78,
      lastActivity: '45 sec ago',
      performance: '99.7%'
    }
  },
  {
    id: 'marketplace',
    name: 'Marketplace Portal',
    description: 'Central marketplace for logistics services and equipment',
    icon: '🏪',
    path: '/marketplace',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'factoring_admin', 'driver', 'owner_operator'],
    color: 'amber',
    quickActions: [
      {
        id: 'browse-services',
        label: 'Browse Services',
        icon: '🔍',
        action: 'browse_services',
        description: 'Browse available logistics services'
      },
      {
        id: 'list-service',
        label: 'List Service',
        icon: '📝',
        action: 'list_service',
        description: 'List your logistics service'
      },
      {
        id: 'place-order',
        label: 'Place Order',
        icon: '🛒',
        action: 'place_order',
        description: 'Place order for services'
      },
      {
        id: 'manage-listings',
        label: 'Manage Listings',
        icon: '📊',
        action: 'manage_listings',
        description: 'Manage your marketplace listings'
      }
    ],
    metrics: {
      activeUsers: 234,
      lastActivity: '30 sec ago',
      performance: '99.5%'
    }
  },
  {
    id: 'onboarding',
    name: 'Onboarding Portal',
    description: 'Legal documents, agreements, and compliance management',
    icon: '📋',
    path: '/onboarding',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin', 'freight_broker_admin', 'carrier_admin', 'shipper_admin', 'factoring_admin', 'driver', 'owner_operator'],
    color: 'indigo',
    quickActions: [
      {
        id: 'view-packets',
        label: 'View Packets',
        icon: '📄',
        action: 'view_packets',
        description: 'View onboarding packets'
      },
      {
        id: 'upload-documents',
        label: 'Upload Documents',
        icon: '📤',
        action: 'upload_documents',
        description: 'Upload required documents'
      },
      {
        id: 'sign-agreements',
        label: 'Sign Agreements',
        icon: '✍️',
        action: 'sign_agreements',
        description: 'Sign legal agreements'
      },
      {
        id: 'track-compliance',
        label: 'Track Compliance',
        icon: '✅',
        action: 'track_compliance',
        description: 'Track compliance status'
      }
    ],
    metrics: {
      activeUsers: 89,
      lastActivity: '2 min ago',
      performance: '99.8%'
    }
  },
  {
    id: 'tms-admin',
    name: 'TMS Administration Portal',
    description: 'Central management hub for Trans Bot AI TMS ecosystem',
    icon: '🏢',
    path: '/tms-admin',
    status: 'online',
    accessibleRoles: ['super_admin', 'admin'],
    color: 'slate',
    quickActions: [
      {
        id: 'manage-users',
        label: 'Manage Users',
        icon: '👥',
        action: 'manage_users',
        description: 'Manage user accounts and permissions'
      },
      {
        id: 'configure-dashboards',
        label: 'Configure Dashboards',
        icon: '⚙️',
        action: 'configure_dashboards',
        description: 'Configure user dashboards'
      },
      {
        id: 'system-settings',
        label: 'System Settings',
        icon: '🔧',
        action: 'system_settings',
        description: 'Manage system settings'
      },
      {
        id: 'view-analytics',
        label: 'View Analytics',
        icon: '📊',
        action: 'view_analytics',
        description: 'View system analytics'
      }
    ],
    metrics: {
      activeUsers: 15,
      lastActivity: '1 min ago',
      performance: '99.9%'
    }
  }
];

export const getPortalsByRole = (role: string): PortalData[] => {
  return portals.filter(portal => portal.accessibleRoles.includes(role));
};

export const getPortalById = (id: string): PortalData | undefined => {
  return portals.find(portal => portal.id === id);
};

export const getOnlinePortals = (): PortalData[] => {
  return portals.filter(portal => portal.status === 'online');
};
