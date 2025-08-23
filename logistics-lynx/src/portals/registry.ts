/* eslint-disable @typescript-eslint/no-explicit-any */
export type PortalKey =
  | "superAdmin" | "onboarding"
  | "broker" | "shipper" | "carrier" | "driver" | "ownerOperator"
  | "factoring" | "loadBoard" | "crm" | "financials" | "edi"
  | "marketplace" | "analytics" | "autonomous" | "workers" | "rates" | "directory";

export type PortalDef = {
  key: PortalKey;
  title: string;
  path: string;
  featureFlag: string;           // e.g. "portal.broker.enabled"
  roles: string[];               // allowed roles
  status?: "active" | "maintenance" | "beta";
  description: string;
  icon: string;
  color: string;
  features: string[];
};

export const PORTALS: PortalDef[] = [
  { 
    key: "superAdmin", 
    title: "Super Admin", 
    path: "/super-admin", 
    featureFlag: "portal.superAdmin.enabled", 
    roles: ["super_admin"],
    status: "active",
    description: "Complete system administration and oversight",
    icon: "Settings",
    color: "bg-purple-500",
    features: ["System Management", "User Administration", "Global Analytics", "Security Controls"]
  },

  { 
    key: "onboarding", 
    title: "Onboarding", 
    path: "/onboarding", 
    featureFlag: "portal.onboarding.enabled", 
    roles: ["owner", "admin", "manager"],
    status: "active",
    description: "User onboarding and training portal",
    icon: "Users",
    color: "bg-green-500",
    features: ["User Onboarding", "Training Modules", "Documentation", "Progress Tracking"]
  },
  { 
    key: "broker", 
    title: "Broker", 
    path: "/broker", 
    featureFlag: "portal.broker.enabled", 
    roles: ["broker_admin", "broker_user", "owner", "admin"],
    status: "active",
    description: "Freight brokerage and customer management",
    icon: "Building2",
    color: "bg-green-500",
    features: ["Load Management", "Customer Relations", "Rate Negotiation", "Documentation"]
  },
  { 
    key: "shipper", 
    title: "Shipper", 
    path: "/shipper", 
    featureFlag: "portal.shipper.enabled", 
    roles: ["shipper_admin", "shipper_user", "owner", "admin"],
    status: "active",
    description: "Shipment booking and tracking",
    icon: "Package",
    color: "bg-red-500",
    features: ["Shipment Booking", "Real-time Tracking", "Rate Quotes", "Documentation"]
  },
  { 
    key: "carrier", 
    title: "Carrier", 
    path: "/carrier", 
    featureFlag: "portal.carrier.enabled", 
    roles: ["carrier_admin", "carrier_user", "owner", "admin"],
    status: "active",
    description: "Fleet management and driver operations",
    icon: "Truck",
    color: "bg-blue-500",
    features: ["Fleet Management", "Driver Operations", "Route Optimization", "Maintenance Tracking"]
  },
  { 
    key: "driver", 
    title: "Driver", 
    path: "/driver", 
    featureFlag: "portal.driver.enabled", 
    roles: ["driver", "carrier_admin", "owner", "admin"],
    status: "active",
    description: "Mobile driver interface and operations",
    icon: "Users",
    color: "bg-orange-500",
    features: ["Load Assignment", "Navigation", "Documentation", "Communication"]
  },
  { 
    key: "ownerOperator", 
    title: "Owner Operator", 
    path: "/owner-operator", 
    featureFlag: "portal.ownerOperator.enabled", 
    roles: ["owner_operator", "owner", "admin"],
    status: "active",
    description: "Independent operator business management",
    icon: "Car",
    color: "bg-indigo-500",
    features: ["Business Analytics", "Load Selection", "Financial Management", "Compliance"]
  },
  { 
    key: "factoring", 
    title: "Factoring", 
    path: "/factoring", 
    featureFlag: "portal.factoring.enabled", 
    roles: ["finance_admin", "owner", "admin"],
    status: "active",
    description: "Invoice factoring and financial services",
    icon: "DollarSign",
    color: "bg-emerald-500",
    features: ["Invoice Factoring", "Payment Processing", "Financial Reports", "Cash Flow Management"]
  },
  { 
    key: "loadBoard", 
    title: "Load Board", 
    path: "/load-board", 
    featureFlag: "portal.loadBoard.enabled", 
    roles: ["broker_admin", "carrier_user", "owner", "admin"],
    status: "active",
    description: "Load board and freight matching",
    icon: "ClipboardList",
    color: "bg-amber-500",
    features: ["Load Posting", "Freight Matching", "Rate Negotiation", "Load Tracking"]
  },
  { 
    key: "crm", 
    title: "CRM", 
    path: "/crm", 
    featureFlag: "portal.crm.enabled", 
    roles: ["sales", "owner", "admin"],
    status: "active",
    description: "Customer relationship management",
    icon: "Users",
    color: "bg-teal-500",
    features: ["Customer Management", "Sales Pipeline", "Communication Tracking", "Lead Management"]
  },
  { 
    key: "financials", 
    title: "Financials", 
    path: "/financials", 
    featureFlag: "portal.financials.enabled", 
    roles: ["finance_admin", "owner", "admin"],
    status: "active",
    description: "Financial management and accounting",
    icon: "BarChart3",
    color: "bg-green-600",
    features: ["Accounting", "Financial Reports", "Budget Management", "Tax Compliance"]
  },
  { 
    key: "edi", 
    title: "EDI", 
    path: "/edi", 
    featureFlag: "portal.edi.enabled", 
    roles: ["edi_admin", "owner", "admin"],
    status: "active",
    description: "Electronic Data Interchange management",
    icon: "Database",
    color: "bg-purple-600",
    features: ["EDI Integration", "Data Mapping", "Transaction Monitoring", "Compliance"]
  },
  { 
    key: "marketplace", 
    title: "Marketplace", 
    path: "/marketplace", 
    featureFlag: "portal.marketplace.enabled", 
    roles: ["owner", "admin", "manager"],
    status: "active",
    description: "Freight marketplace and trading platform",
    icon: "ShoppingCart",
    color: "bg-pink-500",
    features: ["Marketplace Trading", "Auction System", "Price Discovery", "Transaction History"]
  },
  { 
    key: "analytics", 
    title: "Analytics", 
    path: "/analytics", 
    featureFlag: "portal.analytics.enabled", 
    roles: ["owner", "admin", "manager", "analyst"],
    status: "active",
    description: "Advanced business intelligence and reporting",
    icon: "BarChart3",
    color: "bg-teal-500",
    features: ["Performance Analytics", "Predictive Insights", "Custom Reports", "Data Visualization"]
  },
  { 
    key: "autonomous", 
    title: "Autonomous AI", 
    path: "/autonomous", 
    featureFlag: "portal.autonomous.enabled", 
    roles: ["owner", "admin", "sre"],
    status: "active",
    description: "AI-powered autonomous operations",
    icon: "Activity",
    color: "bg-pink-500",
    features: ["AI Agents", "Automated Operations", "System Monitoring", "Predictive Maintenance"]
  },
  { 
    key: "workers", 
    title: "Workers", 
    path: "/workers", 
    featureFlag: "portal.workers.enabled", 
    roles: ["ops", "owner", "admin"],
    status: "active",
    description: "Worker management and operations",
    icon: "Briefcase",
    color: "bg-gray-600",
    features: ["Worker Management", "Scheduling", "Performance Tracking", "Payroll Integration"]
  },
  { 
    key: "rates", 
    title: "Rates", 
    path: "/rates", 
    featureFlag: "portal.rates.enabled", 
    roles: ["pricing", "broker_admin", "owner", "admin"],
    status: "active",
    description: "Rate management and pricing optimization",
    icon: "TrendingUp",
    color: "bg-yellow-500",
    features: ["Rate Management", "Pricing Optimization", "Market Analysis", "Rate Negotiation"]
  },
  { 
    key: "directory", 
    title: "Directory", 
    path: "/directory", 
    featureFlag: "portal.directory.enabled", 
    roles: ["owner", "admin", "manager", "ops"],
    status: "active",
    description: "Business directory and contact management",
    icon: "BookOpen",
    color: "bg-blue-700",
    features: ["Business Directory", "Contact Management", "Network Building", "Search & Discovery"]
  }
];

// Helper functions
export const getPortalByKey = (key: PortalKey): PortalDef | undefined => {
  return PORTALS.find(p => p.key === key);
};

export const getPortalByPath = (path: string): PortalDef | undefined => {
  return PORTALS.find(p => p.path === path);
};

export const getPortalsByRole = (role: string): PortalDef[] => {
  return PORTALS.filter(p => p.roles.includes(role));
};

export const getAllPortalPaths = (): string[] => {
  return PORTALS.map(p => p.path);
};

// Deprecated routes mapping
export const DEPRECATED_ROUTES: Record<string, string> = {
  "/carrier-admin": "/carrier",
  "/broker-admin": "/broker", 
  "/shipper-admin": "/shipper",
  "/carrier-dispatch": "/load-board"
};
