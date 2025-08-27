/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings, Database, Shield, Bell, Network, Users, Clock, CheckCircle, AlertTriangle, Eye, Lock } from 'lucide-react';

export interface MenuSection {
  items: MenuItem[];
}

export interface MenuItem {
  title: string;
  icon?: unknown;
  path?: string;
  subMenu?: MenuItem[];
}

export const BROKER_ADMIN_MENU: MenuSection = {
  items: [
    {
      title: "Dashboard",
      icon: BarChart3,
      path: "/broker-admin"
    },
    {
      title: "CRM",
      icon: Users,
      subMenu: [
        { title: "CRM Dashboard", icon: BarChart3, path: "/broker-admin/crm" },
        { title: "Sales Pipeline", icon: Target, path: "/broker-admin/crm/pipeline" },
        { title: "Lead Management", icon: Users, path: "/broker-admin/crm/leads" },
        { title: "Customer Accounts", icon: Building2, path: "/broker-admin/crm/customers" },
        { title: "Carrier Relations", icon: Truck, path: "/broker-admin/crm/carriers" },
        { title: "Quote Center", icon: FileText, path: "/broker-admin/crm/quotes" },
        { title: "Opportunities", icon: TrendingUp, path: "/broker-admin/crm/opportunities" },
        { title: "Communications", icon: MessageSquare, path: "/broker-admin/crm/communications" },
        { title: "Market Intelligence", icon: Brain, path: "/broker-admin/crm/market-intel" },
        { title: "Revenue Forecast", icon: Activity, path: "/broker-admin/crm/forecast" },
        { title: "Analytics & Reports", icon: PieChart, path: "/broker-admin/crm/analytics" },
        { title: "Task & Calendar", icon: Calendar, path: "/broker-admin/crm/calendar" }
      ]
    },
    {
      title: "Quotes Center",
      icon: FileText,
      subMenu: [
        // Main Dashboard & Creation
        { title: "Quote Dashboard", icon: BarChart3, path: "/broker-admin/quotes" },
        { title: "Create Quote", icon: Plus, path: "/broker-admin/quotes/create" },
        { title: "Quick Quote", icon: Lightning, path: "/broker-admin/quotes/quick" },
        { title: "All Quotes", icon: Layers, path: "/broker-admin/quotes/all" },
        
        // Quote Management & Pricing
        { 
          title: "Quote Management", 
          icon: Target, 
          subMenu: [
            { title: "Active Quotes", icon: Activity, path: "/broker-admin/quotes/active" },
            { title: "Pending Review", icon: Clock, path: "/broker-admin/quotes/pending" },
            { title: "Won Quotes", icon: CheckCircle, path: "/broker-admin/quotes/won" },
            { title: "Lost Quotes", icon: TrendingDown, path: "/broker-admin/quotes/lost" },
            { title: "Draft Quotes", icon: FileCheck, path: "/broker-admin/quotes/drafts" },
            { title: "Expired Quotes", icon: Timer, path: "/broker-admin/quotes/expired" }
          ]
        },
        
        // Smart Pricing & Rates
        { 
          title: "Pricing & Rates", 
          icon: DollarSign, 
          subMenu: [
            { title: "AI Quote Builder", icon: Bot, path: "/broker-admin/quotes/ai-builder" },
            { title: "Rate Calculator", icon: Calculator, path: "/broker-admin/quotes/calculator" },
            { title: "Customer Rates", icon: Users, path: "/broker-admin/quotes/customer-rates" },
            { title: "Carrier Rates", icon: Truck, path: "/broker-admin/quotes/carrier-rates" },
            { title: "Lane Pricing", icon: MapRoute, path: "/broker-admin/quotes/lanes" },
            { title: "Market Intelligence", icon: TrendingUp, path: "/broker-admin/quotes/market-intel" }
          ]
        },
        
        // Analytics & Reports
        { 
          title: "Analytics & Reports", 
          icon: PieChart, 
          subMenu: [
            { title: "Performance Dashboard", icon: Gauge, path: "/broker-admin/quotes/performance" },
            { title: "Win Rate Analysis", icon: Target, path: "/broker-admin/quotes/win-rate" },
            { title: "Revenue Forecast", icon: TrendingUp, path: "/broker-admin/quotes/forecast" },
            { title: "Margin Analysis", icon: PieChart, path: "/broker-admin/quotes/margins" },
            { title: "Custom Reports", icon: FileText, path: "/broker-admin/quotes/reports" }
          ]
        },
        
        // Settings & Tools
        { 
          title: "Settings & Tools", 
          icon: Settings, 
          subMenu: [
            { title: "Quote Templates", icon: FileText, path: "/broker-admin/quotes/templates" },
            { title: "Email Templates", icon: Mail, path: "/broker-admin/quotes/email-templates" },
            { title: "Approval Workflows", icon: CheckCircle, path: "/broker-admin/quotes/workflows" },
            { title: "Auto-Pricing Rules", icon: Bot, path: "/broker-admin/quotes/pricing-rules" },
            { title: "Import/Export", icon: Upload, path: "/broker-admin/quotes/import-export" },
            { title: "General Settings", icon: Settings, path: "/broker-admin/quotes/settings" }
          ]
        }
      ]
    },
    {
      title: "Shipments",
      icon: Package,
      subMenu: [
        // Main Dashboard & Core Functions
        { title: "Shipments Dashboard", icon: BarChart3, path: "/broker-admin/shipments" },
        { title: "Create Shipment", icon: Plus, path: "/broker-admin/shipments/create" },
        { title: "All Shipments", icon: Layers, path: "/broker-admin/shipments/all" },
        
        // Shipment Tracking & Status
        { 
          title: "Tracking & Status", 
          icon: MapPin, 
          subMenu: [
            { title: "Live Tracking", icon: Activity, path: "/broker-admin/shipments/live-tracking" },
            { title: "In Transit", icon: Truck, path: "/broker-admin/shipments/in-transit" },
            { title: "Pending Pickup", icon: Clock, path: "/broker-admin/shipments/pending-pickup" },
            { title: "At Origin", icon: MapPin, path: "/broker-admin/shipments/at-origin" },
            { title: "At Destination", icon: Target, path: "/broker-admin/shipments/at-destination" },
            { title: "Delivered", icon: CheckCircle, path: "/broker-admin/shipments/delivered" },
            { title: "Delayed/Issues", icon: AlertTriangle, path: "/broker-admin/shipments/issues" },
            { title: "POD Management", icon: FileCheck, path: "/broker-admin/shipments/pod" }
          ]
        },
        
        // Load Management & Dispatch
        { 
          title: "Load Management", 
          icon: Truck, 
          subMenu: [
            { title: "Dispatch Center", icon: Users2, path: "/broker-admin/shipments/dispatch" },
            { title: "Load Assignment", icon: UserCheck, path: "/broker-admin/shipments/assign" },
            { title: "Carrier Matching", icon: Bot, path: "/broker-admin/shipments/carrier-match" },
            { title: "Route Optimization", icon: MapRoute, path: "/broker-admin/shipments/routes" },
            { title: "Multi-Stop Loads", icon: Route, path: "/broker-admin/shipments/multi-stop" },
            { title: "LTL Consolidation", icon: Package, path: "/broker-admin/shipments/ltl" },
            { title: "Emergency Dispatch", icon: Bell, path: "/broker-admin/shipments/emergency" }
          ]
        },
        
        // Documentation & Compliance
        { 
          title: "Documentation", 
          icon: FileText, 
          subMenu: [
            { title: "BOL Management", icon: FileText, path: "/broker-admin/shipments/bol" },
            { title: "Rate Confirmations", icon: FileCheck, path: "/broker-admin/shipments/rate-confirmations" },
            { title: "Shipping Instructions", icon: Book, path: "/broker-admin/shipments/instructions" },
            { title: "Certificates", icon: Shield, path: "/broker-admin/shipments/certificates" },
            { title: "Customs Documents", icon: Globe, path: "/broker-admin/shipments/customs" },
            { title: "Document Templates", icon: FolderOpen, path: "/broker-admin/shipments/templates" },
            { title: "Digital Signatures", icon: Lock, path: "/broker-admin/shipments/signatures" }
          ]
        },
        
        // Billing & Financial
        { 
          title: "Billing & Invoicing", 
          icon: DollarSign, 
          subMenu: [
            { title: "Invoice Generation", icon: Receipt, path: "/broker-admin/shipments/invoicing" },
            { title: "Rate Management", icon: Calculator, path: "/broker-admin/shipments/rates" },
            { title: "Accessorial Charges", icon: Plus, path: "/broker-admin/shipments/accessorials" },
            { title: "Fuel Surcharges", icon: Fuel, path: "/broker-admin/shipments/fuel-charges" },
            { title: "Payment Status", icon: CreditCard, path: "/broker-admin/shipments/payments" },
            { title: "Margin Analysis", icon: PieChart, path: "/broker-admin/shipments/margins" },
            { title: "Cost Tracking", icon: TrendingUp, path: "/broker-admin/shipments/costs" }
          ]
        },
        
        // Communication Hub
        { 
          title: "Communication", 
          icon: MessageSquare, 
          subMenu: [
            { title: "Customer Updates", icon: Users, path: "/broker-admin/shipments/customer-comms" },
            { title: "Carrier Communications", icon: Truck, path: "/broker-admin/shipments/carrier-comms" },
            { title: "SMS Notifications", icon: Phone, path: "/broker-admin/shipments/sms" },
            { title: "Email Alerts", icon: Mail, path: "/broker-admin/shipments/email-alerts" },
            { title: "Status Updates", icon: Bell, path: "/broker-admin/shipments/status-updates" },
            { title: "Exception Alerts", icon: AlertTriangle, path: "/broker-admin/shipments/exceptions" }
          ]
        },
        
        // Analytics & Reports
        { 
          title: "Analytics & Reports", 
          icon: PieChart, 
          subMenu: [
            { title: "Performance Dashboard", icon: Gauge, path: "/broker-admin/shipments/performance" },
            { title: "On-Time Delivery", icon: Timer, path: "/broker-admin/shipments/otd" },
            { title: "Carrier Performance", icon: Star, path: "/broker-admin/shipments/carrier-performance" },
            { title: "Lane Analysis", icon: MapRoute, path: "/broker-admin/shipments/lane-analysis" },
            { title: "Volume Reports", icon: BarChart, path: "/broker-admin/shipments/volume" },
            { title: "Revenue Reports", icon: TrendingUp, path: "/broker-admin/shipments/revenue" },
            { title: "Custom Reports", icon: FileText, path: "/broker-admin/shipments/custom-reports" }
          ]
        }
      ]
    },
    {
      title: "Load Board",
      icon: Search,
      subMenu: [
        { title: "Post Loads", icon: Plus, path: "/broker-admin/load-board/post" },
        { title: "Search Loads", icon: Search, path: "/broker-admin/load-board/search" },
        { title: "Book Loads", icon: Book, path: "/broker-admin/load-board/book" }
      ]
    },
    {
      title: "Networks",
      icon: Network,
      subMenu: [
        { title: "Overview", icon: BarChart3, path: "/broker-admin/networks" },
        { title: "Customers", icon: Users, path: "/broker-admin/networks/customers" },
        { title: "Carriers", icon: Truck, path: "/broker-admin/networks/carriers" },
        { title: "Vendors", icon: Building2, path: "/broker-admin/networks/vendors" },
        { title: "Terminals", icon: MapPin, path: "/broker-admin/networks/terminals" },
        { title: "Locations", icon: Globe, path: "/broker-admin/networks/locations" },
        { title: "Partner Management", icon: Users2, path: "/broker-admin/networks/partners" },
        { title: "Network Analytics", icon: TrendingUp, path: "/broker-admin/networks/analytics" }
      ]
    },
    {
      title: "Workers",
      icon: Users2,
      subMenu: [
        { title: "Overview", icon: BarChart3, path: "/broker-admin/workers" },
        { title: "Executive Team", icon: UserCheck, path: "/broker-admin/workers/executive" },
        { title: "Employees", icon: Users, path: "/broker-admin/workers/employees" },
        { title: "Sales Agents", icon: Target, path: "/broker-admin/workers/agents" },
        { title: "Departments", icon: Building2, path: "/broker-admin/workers/departments" },
        { title: "Performance", icon: TrendingUp, path: "/broker-admin/workers/performance" },
        { title: "Payroll & Benefits", icon: DollarSign, path: "/broker-admin/workers/payroll" },
        { title: "Training & Development", icon: GraduationCap, path: "/broker-admin/workers/training" }
      ]
    },
    {
      title: "Documents",
      icon: FolderOpen,
      subMenu: [
        { title: "All Documents", icon: FolderOpen, path: "/broker-admin/documents" },
        { title: "Upload", icon: Upload, path: "/broker-admin/documents/upload" },
        { title: "Setup", icon: Wrench, path: "/broker-admin/documents/setup" }
      ]
    },
    {
      title: "Rates",
      icon: DollarSign,
      subMenu: [
        { title: "Rates Dashboard", icon: BarChart3, path: "/broker-admin/rates" },
        { title: "Rate Management", icon: Settings, path: "/broker-admin/rates/management" },
        { title: "Buy Rates", icon: ArrowDownCircle, path: "/broker-admin/rates/buy" },
        { title: "Sell Rates", icon: TrendingUp, path: "/broker-admin/rates/sell" },
        { title: "Fuel Surcharge", icon: Fuel, path: "/broker-admin/rates/fuel" },
        { title: "Accessorial Rates", icon: Plus, path: "/broker-admin/rates/accessorial" },
        { title: "Margin Analysis", icon: PieChart, path: "/broker-admin/rates/margin" },
        { title: "Target Rates", icon: Target, path: "/broker-admin/rates/target" },
        { title: "Carrier Integration", icon: Truck, path: "/broker-admin/rates/carrier-integration" },
        { title: "Rate Comparison", icon: ArrowUpDown, path: "/broker-admin/rates/comparison" }
      ]
    },
    {
      title: "API Dashboard",
      icon: Database,
      subMenu: [
        { title: "Overview", icon: BarChart3, path: "/broker-admin/api" },
        { title: "API Keys", icon: Settings, path: "/broker-admin/api/keys" },
        { title: "API Logs", icon: Activity, path: "/broker-admin/api/logs" },
        { title: "API Errors", icon: TrendingDown, path: "/broker-admin/api/errors" },
        { title: "Carrier Partners", icon: Truck, path: "/broker-admin/api/carrier-integration" },
        { title: "Transportation Modes", icon: Route, path: "/broker-admin/api/transportation-modes" },
        { title: "Webhooks", icon: Zap, path: "/broker-admin/api/webhooks" },
        { title: "Rate Limits", icon: Shield, path: "/broker-admin/api/rate-limits" },
        { title: "Documentation", icon: FileText, path: "/broker-admin/api/documentation" }
      ]
    },
    {
      title: "EDI Dashboard",
      icon: Zap,
      subMenu: [
        { title: "Overview", icon: BarChart3, path: "/broker-admin/edi" },
        { title: "Transaction Center", icon: ArrowUpDown, path: "/broker-admin/edi/transactions" },
        { title: "Partner Management", icon: Users, path: "/broker-admin/edi/partners" },
        { title: "Mapping & Config", icon: Settings, path: "/broker-admin/edi/mapping" },
        { title: "Monitoring", icon: Activity, path: "/broker-admin/edi/monitoring" },
        { title: "Error Management", icon: AlertTriangle, path: "/broker-admin/edi/errors" },
        { title: "Compliance & Audit", icon: Shield, path: "/broker-admin/edi/compliance" }
      ]
    },
    {
      title: "Market Place",
      icon: ShoppingCart,
      subMenu: [
        { title: "All", icon: Globe, path: "/broker-admin/marketplace" },
        { title: "Accounting", icon: Calculator, path: "/broker-admin/marketplace/accounting" },
        { title: "Carrier Compliance", icon: Shield, path: "/broker-admin/marketplace/compliance" },
        { title: "API", icon: Database, path: "/broker-admin/marketplace/api" },
        { title: "EDI", icon: Zap, path: "/broker-admin/marketplace/edi" },
        { title: "ELDs", icon: Activity, path: "/broker-admin/marketplace/elds" },
        { title: "Factoring", icon: CreditCard, path: "/broker-admin/marketplace/factoring" },
        { title: "Fuel Cards", icon: Fuel, path: "/broker-admin/marketplace/fuel-cards" },
        { title: "Load Board", icon: Search, path: "/broker-admin/marketplace/load-board" },
        { title: "Mileage", icon: Route, path: "/broker-admin/marketplace/mileage" },
        { title: "Payments", icon: CreditCard, path: "/broker-admin/marketplace/payments" },
        { title: "Tolls", icon: DollarSign, path: "/broker-admin/marketplace/tolls" },
        { title: "Visibility", icon: Eye, path: "/broker-admin/marketplace/visibility" }
      ]
    },
    {
      title: "Financials",
      icon: Calculator,
      subMenu: [
        { title: "Dashboard", icon: BarChart3, path: "/broker-admin/financials" },
        { title: "Chart of Accounts", icon: Book, path: "/broker-admin/financials/chart-of-accounts" },
        { title: "General Ledger", icon: Book, path: "/broker-admin/financials/general-ledger" },
        { title: "Accounts Receivable", icon: TrendingUp, path: "/broker-admin/financials/accounts-receivable" },
        { title: "Accounts Payable", icon: TrendingDown, path: "/broker-admin/financials/accounts-payable" },
        { title: "Invoicing", icon: FileText, path: "/broker-admin/financials/invoicing" },
        { title: "Bills & Expenses", icon: Receipt, path: "/broker-admin/financials/bills-expenses" },
        { title: "Payment Processing", icon: CreditCard, path: "/broker-admin/financials/payment-processing" },
        { title: "Check Printing", icon: FileText, path: "/broker-admin/financials/check-printing" },
        { title: "Bank Reconciliation", icon: Banknote, path: "/broker-admin/financials/bank-reconciliation" },
        { title: "Financial Reports", icon: PieChart, path: "/broker-admin/financials/financial-reports" },
        { title: "Cash Flow", icon: Activity, path: "/broker-admin/financials/cash-flow" },
        { title: "Budgeting & Forecasting", icon: Target, path: "/broker-admin/financials/budgeting" },
        { title: "Products & Services", icon: Package, path: "/broker-admin/financials/products-services" },
        { title: "Customer Statements", icon: Mail, path: "/broker-admin/financials/customer-statements" },
        { title: "Recurring Invoices", icon: Timer, path: "/broker-admin/financials/recurring-invoices" },
        { title: "Payroll", icon: Users2, path: "/broker-admin/financials/payroll" },
        { title: "Employees", icon: Users, path: "/broker-admin/financials/employees" },
        { title: "Timesheets", icon: Timer, path: "/broker-admin/financials/timesheets" },
        { title: "Tax Management", icon: Shield, path: "/broker-admin/financials/tax-management" },
        { title: "Profit & Loss", icon: TrendingUp, path: "/broker-admin/financials/profit-loss" },
        { title: "Balance Sheet", icon: BarChart, path: "/broker-admin/financials/balance-sheet" },
        { title: "Fixed Assets", icon: Warehouse, path: "/broker-admin/financials/fixed-assets" }
      ]
    }
  ]
};

export const BROKER_BOTTOM_ITEMS: MenuItem[] = [
  { title: "Settings", icon: Settings, path: "/broker-admin/settings" },
  { title: "Help", icon: HelpCircle, path: "/broker-admin/help" }
];

export const BROKER_SETTINGS_ITEMS: MenuItem[] = [
  { title: "Account Settings", icon: Settings, path: "/broker-admin/account" },
  { title: "Preferences", icon: Wrench, path: "/broker-admin/preferences" }
];