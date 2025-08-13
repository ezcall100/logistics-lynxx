import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  UserPlus, 
  Calendar, 
  Target,
  FileText,
  Plus,
  Truck,
  Clock,
  Package,
  CheckCircle,
  Search,
  Network,
  MapPin,
  Building,
  Shield,
  Fuel,
  UserCheck,
  Upload,
  Settings,
  DollarSign,
  CreditCard,
  Calculator,
  Receipt,
  Key,
  FileCheck,
  Users2,
  Activity,
  Store,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Heart,
  Contact,
  FolderOpen,
  PackageSearch,
  Building2,
  Code,
  Bug,
  Zap,
  BarChart3,
  PiggyBank,
  Landmark,
  Banknote,
  Copy,
  PackageOpen,
  Train,
  Container,
  Car,
  Snowflake,
  Square
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CarrierSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<unknown>;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/carrier-admin"
  },
  {
    title: "CRM",
    icon: Heart,
    children: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/carrier-admin/crm" },
      { title: "Email", icon: Mail, href: "/carrier-admin/crm/email" },
      { title: "Leads", icon: UserPlus, href: "/carrier-admin/crm/leads" },
      { title: "Contacts", icon: Contact, href: "/carrier-admin/crm/contacts" },
      { title: "Projects", icon: FolderOpen, href: "/carrier-admin/crm/projects" },
      { title: "Calendar", icon: Calendar, href: "/carrier-admin/crm/calendar" },
      { title: "Opportunities", icon: Target, href: "/carrier-admin/crm/opportunities" }
    ]
  },
  {
    title: 'Shipments Hub',
    icon: Package,
    href: '/carrier-admin/shipments-management',
    children: [
      { title: 'Overview', icon: Activity, href: '/carrier-admin/shipments-management' },
      { title: 'Active Shipments', icon: Truck, href: '/carrier-admin/shipments-management/active' },
      { title: 'Planning & Dispatch', icon: Calendar, href: '/carrier-admin/shipments-management/planning' },
      { title: 'Live Tracking', icon: MapPin, href: '/carrier-admin/shipments-management/tracking' },
      { title: 'Analytics & Reports', icon: BarChart3, href: '/carrier-admin/shipments-management/analytics' },
      { title: 'Documents', icon: FileText, href: '/carrier-admin/shipments-management/documents' },
      { title: 'Settings', icon: Settings, href: '/carrier-admin/shipments-management/settings' }
    ]
  },
  {
    title: "Load Board",
    icon: PackageSearch,
    href: "/carrier-admin/load-board",
    children: [
      { title: "All Loads", icon: Package, href: "/carrier-admin/load-board" },
      { title: "Truckload (TL)", icon: Truck, href: "/carrier-admin/load-board/truckload" },
      { title: "LTL Loads", icon: PackageOpen, href: "/carrier-admin/load-board/ltl" },
      { title: "Intermodal", icon: Train, href: "/carrier-admin/load-board/intermodal" },
      { title: "Drayage", icon: Container, href: "/carrier-admin/load-board/drayage" },
      { title: "Auto Transport", icon: Car, href: "/carrier-admin/load-board/auto" },
      { title: "Spot Market", icon: TrendingUp, href: "/carrier-admin/load-board/spot" },
      { title: "Posted Loads", icon: FileText, href: "/carrier-admin/load-board/posted" }
    ]
  },
  {
    title: "Networks",
    icon: Building2,
    children: [
      { title: "Customers", icon: Users, href: "/carrier-admin/networks/customers" },
      { title: "Vendors", icon: Package, href: "/carrier-admin/networks/vendors" },
      { title: "Terminals", icon: Building2, href: "/carrier-admin/networks/terminals" },
      { title: "Locations", icon: MapPin, href: "/carrier-admin/networks/locations" }
    ]
  },
  {
    title: "Assets",
    icon: Truck,
    children: [
      { title: "Unit", icon: Package, href: "/carrier-admin/assets/units" },
      { title: "Trucks", icon: Truck, href: "/carrier-admin/assets/trucks" },
      { title: "Trailers", icon: Truck, href: "/carrier-admin/assets/trailers" },
      { title: "Fleet Tracker", icon: MapPin, href: "/carrier-admin/assets/fleet-tracker" },
      { title: "Compliance", icon: Shield, href: "/carrier-admin/assets/compliance" },
      { title: "Fuel Audit", icon: Fuel, href: "/carrier-admin/assets/fuel-audit" }
    ]
  },
  {
    title: "Quotes",
    icon: DollarSign,
    children: [
      { title: "All Quotes", icon: FileText, href: "/carrier-admin/quotes" },
      { title: "New Quote", icon: Plus, href: "/carrier-admin/quotes/new" },
      { title: "Quote Templates", icon: Copy, href: "/carrier-admin/quotes/templates" }
    ]
  },
  {
    title: "Workers",
    icon: Users,
    children: [
      { title: "Personnel Management", icon: Users2, href: "/carrier-admin/personnel" },
      { title: "Drivers", icon: Truck, href: "/carrier-admin/drivers" },
      { title: "Owner Operators", icon: UserCheck, href: "/carrier-admin/owner-operators" },
      { title: "Executive", icon: UserCheck, href: "/carrier-admin/workers/executive" },
      { title: "Employee", icon: Users, href: "/carrier-admin/workers/employee" },
      { title: "Agents", icon: UserPlus, href: "/carrier-admin/workers/agents" }
    ]
  },
  {
    title: "Documents Hub",
    icon: FileText,
    children: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/carrier-admin/documents" },
      { title: "Bill of Lading", icon: FileText, href: "/carrier-admin/documents/bol" },
      { title: "Invoices & Receipts", icon: Receipt, href: "/carrier-admin/documents/invoices-receipts" },
      { title: "Contracts & Agreements", icon: FileCheck, href: "/carrier-admin/documents/contracts-agreements" },
      { title: "Compliance Docs", icon: Shield, href: "/carrier-admin/documents/compliance-docs" },
      { title: "Driver Documents", icon: UserCheck, href: "/carrier-admin/documents/driver-documents" },
      { title: "Vehicle Registration", icon: Truck, href: "/carrier-admin/documents/vehicle-registration" },
      { title: "Insurance Documents", icon: Shield, href: "/carrier-admin/documents/insurance-documents" },
      { title: "Inspection Reports", icon: FileCheck, href: "/carrier-admin/documents/inspection-reports" },
      { title: "Maintenance Records", icon: Settings, href: "/carrier-admin/documents/maintenance-records" },
      { title: "Upload Center", icon: Upload, href: "/carrier-admin/documents/upload-center" },
      { title: "Archive", icon: FolderOpen, href: "/carrier-admin/documents/archive" }
    ]
  },
  {
    title: "Market Place",
    icon: Store,
    children: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/carrier-admin/marketplace" },
      { title: "Load Board", icon: Truck, href: "/carrier-admin/marketplace/load-board" },
      { title: "Truckload (TL)", icon: Truck, href: "/carrier-admin/marketplace/truckload" },
      { title: "LTL Loads", icon: PackageOpen, href: "/carrier-admin/marketplace/ltl" },
      { title: "Intermodal", icon: Train, href: "/carrier-admin/marketplace/intermodal" },
      { title: "Drayage", icon: Container, href: "/carrier-admin/marketplace/drayage" },
      { title: "Auto Transport", icon: Car, href: "/carrier-admin/marketplace/auto-transport" },
      { title: "Heavy Haul", icon: Truck, href: "/carrier-admin/marketplace/heavy-haul" },
      { title: "Refrigerated", icon: Snowflake, href: "/carrier-admin/marketplace/refrigerated" },
      { title: "Flatbed", icon: Square, href: "/carrier-admin/marketplace/flatbed" },
      { title: "Posted Loads", icon: FileText, href: "/carrier-admin/marketplace/posted-loads" },
      { title: "Rate Analytics", icon: TrendingUp, href: "/carrier-admin/marketplace/rate-analytics" },
      { title: "Freight Matching", icon: Target, href: "/carrier-admin/marketplace/freight-matching" },
      { title: "Carrier Network", icon: Users, href: "/carrier-admin/marketplace/carrier-network" }
    ]
  },
  {
    title: "Reports Hub",
    icon: BarChart3,
    children: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/carrier-admin/reports" },
      { title: "Financial Reports", icon: DollarSign, href: "/carrier-admin/reports/financial" },
      { title: "Operations Reports", icon: Truck, href: "/carrier-admin/reports/operations" },
      { title: "Performance Analytics", icon: TrendingUp, href: "/carrier-admin/reports/performance" },
      { title: "Driver Reports", icon: UserCheck, href: "/carrier-admin/reports/drivers" },
      { title: "Vehicle Reports", icon: Truck, href: "/carrier-admin/reports/vehicles" },
      { title: "Route Analytics", icon: MapPin, href: "/carrier-admin/reports/routes" },
      { title: "Load Reports", icon: Package, href: "/carrier-admin/reports/loads" },
      { title: "Compliance Reports", icon: Shield, href: "/carrier-admin/reports/compliance" },
      { title: "Customer Reports", icon: Users, href: "/carrier-admin/reports/customers" },
      { title: "Safety Reports", icon: Shield, href: "/carrier-admin/reports/safety" },
      { title: "Fuel Reports", icon: Zap, href: "/carrier-admin/reports/fuel" },
      { title: "Maintenance Reports", icon: Settings, href: "/carrier-admin/reports/maintenance" },
      { title: "Custom Reports", icon: FileText, href: "/carrier-admin/reports/custom" }
    ]
  },
  {
    title: "Rates",
    icon: TrendingUp,
    children: [
      { title: "Rate Management", icon: TrendingUp, href: "/carrier-admin/rates" },
      { title: "Buy Rate", icon: DollarSign, href: "/carrier-admin/rates/buy" },
      { title: "Sell Rate", icon: TrendingUp, href: "/carrier-admin/rates/sell" },
      { title: "Fuel Surcharge", icon: Fuel, href: "/carrier-admin/rates/fuel" },
      { title: "Accessorial", icon: Calculator, href: "/carrier-admin/rates/accessorial" },
      { title: "Margin Analysis", icon: Target, href: "/carrier-admin/rates/margin" },
      { title: "Target Rates", icon: Target, href: "/carrier-admin/rates/target" }
    ]
  },
  {
    title: "Financials",
    icon: DollarSign,
    children: [
      { title: "Overview", icon: LayoutDashboard, href: "/carrier-admin/financials" },
      { title: "Sales & Payments", icon: CreditCard, href: "/carrier-admin/financials/sales" },
      { title: "Purchases", icon: Receipt, href: "/carrier-admin/financials/purchases" },
      { title: "Accounting", icon: Calculator, href: "/carrier-admin/financials/accounting" },
      { title: "Payroll", icon: Users, href: "/carrier-admin/financials/payroll" },
      { title: "Reports", icon: BarChart3, href: "/carrier-admin/financials/reports" },
      { title: "Taxes", icon: FileText, href: "/carrier-admin/financials/taxes" },
      { title: "Cost of Goods Sold", icon: Package, href: "/carrier-admin/financials/cogs" },
      { title: "Financial Settings", icon: Settings, href: "/carrier-admin/financials/settings" },
      { title: "Banking", icon: Landmark, href: "/carrier-admin/financials/banking" },
      { title: "Reconciliation", icon: CheckCircle, href: "/carrier-admin/financials/reconciliation" }
    ]
  },
  {
    title: "API Dashboard",
    icon: Code,
    children: [
      { title: "Overview", icon: LayoutDashboard, href: "/carrier-admin/api" },
      { title: "API Keys", icon: Key, href: "/carrier-admin/api/keys" },
      { title: "API Logs", icon: FileText, href: "/carrier-admin/api/logs" },
      { title: "API Errors", icon: Bug, href: "/carrier-admin/api/errors" }
    ]
  },
  {
    title: "EDI Dashboard",
    icon: Zap,
    children: [
      { title: "EDI Matching", icon: Zap, href: "/carrier-admin/edi/matching" },
      { title: "EDI Setup", icon: Settings, href: "/carrier-admin/edi/setup" },
      { title: "Partners List", icon: Users, href: "/carrier-admin/edi/partners" },
      { title: "Failed Tender", icon: Bug, href: "/carrier-admin/edi/failed-tender" },
      { title: "Failed Invoices", icon: Bug, href: "/carrier-admin/edi/failed-invoices" }
    ]
  },
];

const CarrierSidebar: React.FC<CarrierSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Dashboard']);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isGroupActive = (item: MenuItem) => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some(child => child.href && isActive(child.href));
    }
    return false;
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-gradient-to-b from-background/95 via-background/90 to-background/95 backdrop-blur-md border-r border-border/50 shadow-xl transition-all duration-300",
      collapsed ? "w-16" : "w-72"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10">
          {!collapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">Carrier Portal</h2>
              <p className="text-xs text-muted-foreground">Trans Bot TMS</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 hover:bg-primary/10"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              if (!item.children) {
                // Simple menu item
                return (
                  <Link
                    key={item.title}
                    to={item.href || '#'}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:scale-105",
                      isActive(item.href || '') 
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Link>
                );
              }

              // Menu item with children
              const isExpanded = expandedGroups.includes(item.title);
              const isGroupItemActive = isGroupActive(item);

              return (
                <Collapsible
                  key={item.title}
                  open={isExpanded && !collapsed}
                  onOpenChange={() => !collapsed && toggleGroup(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:scale-105",
                        isGroupItemActive 
                          ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate text-left">{item.title}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          )}
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-6">
                    {item.children.map((child) => (
                        <Link
                          key={child.title}
                          to={child.href || '#'}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/2 hover:translate-x-1",
                            isActive(child.href || '') 
                              ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-medium border-l-2 border-primary" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <child.icon className="h-3 w-3 shrink-0" />
                          <span className="truncate">{child.title}</span>
                        </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default CarrierSidebar;