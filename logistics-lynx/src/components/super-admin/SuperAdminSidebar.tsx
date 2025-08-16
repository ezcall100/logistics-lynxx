/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard,
  Users2,
  Mail,
  UserPlus,
  Contact,
  FolderOpen,
  Calendar,
  Target,
  Ticket,
  List,
  UserCheck,
  UserX,
  AlertTriangle,
  Wrench,
  RefreshCw,
  HelpCircle,
  Network,
  Users,
  Truck,
  Building2,
  Briefcase,
  User,
  FileText,
  Upload,
  Settings,
  DollarSign,
  FileBarChart,
  RotateCcw,
  Receipt,
  CreditCard,
  Package,
  ShoppingCart,
  Calculator,
  HandCoins,
  Clock,
  FileSpreadsheet,
  Percent,
  Bot,
  BarChart3,
  Activity,
  Cpu,
  Key,
  AlertCircle,
  Store,
  Boxes,
  TrendingUp,
  BookOpen,
  Sun,
  Moon,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface SuperAdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/super-admin'
  },
  {
    title: 'CRM',
    icon: Users2,
    children: [
      { title: 'Overview', icon: LayoutDashboard, path: '/super-admin/crm/overview' },
      { title: 'Email', icon: Mail, path: '/super-admin/crm/email' },
      { title: 'Leads', icon: UserPlus, path: '/super-admin/crm/leads' },
      { title: 'Contacts', icon: Contact, path: '/super-admin/crm/contacts' },
      { title: 'Projects', icon: FolderOpen, path: '/super-admin/crm/projects' },
      { title: 'Calendar', icon: Calendar, path: '/super-admin/crm/calendar' },
      { title: 'Opportunities', icon: Target, path: '/super-admin/crm/opportunities' }
    ]
  },
  {
    title: 'Tickets',
    icon: Ticket,
    children: [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/tickets/dashboard' },
      { title: 'All Tickets', icon: List, path: '/super-admin/tickets/all' },
      { title: 'Categories', icon: FolderOpen, path: '/super-admin/tickets/categories' },
      { title: 'Templates', icon: FileText, path: '/super-admin/tickets/templates' },
      { title: 'Analytics', icon: BarChart3, path: '/super-admin/tickets/analytics' }
    ]
  },
  {
    title: 'Networks',
    icon: Network,
    children: [
      { title: 'Customers', icon: Users, path: '/super-admin/networks/customers' },
      { title: 'Vendors', icon: Truck, path: '/super-admin/networks/vendors' }
    ]
  },
  {
    title: 'Workers',
    icon: Building2,
    children: [
      { title: 'Executive', icon: Briefcase, path: '/super-admin/workers/executive' },
      { title: 'Employee', icon: User, path: '/super-admin/workers/employee' },
      { title: 'Drivers', icon: Truck, path: '/super-admin/workers/drivers' },
      { title: 'Agents', icon: Users, path: '/super-admin/workers/agents' }
    ]
  },
  {
    title: 'Documents',
    icon: FileText,
    children: [
      { title: 'All Documents', icon: List, path: '/super-admin/documents/all' },
      { title: 'Upload', icon: Upload, path: '/super-admin/documents/upload' },
      { title: 'Setup', icon: Settings, path: '/super-admin/documents/setup' }
    ]
  },
  {
    title: 'Financials',
    icon: DollarSign,
    children: [
      { title: 'Invoices', icon: FileBarChart, path: '/super-admin/financials/invoices' },
      { title: 'Recurring Invoices', icon: RotateCcw, path: '/super-admin/financials/recurring-invoices' },
      { title: 'Customer Statements', icon: Receipt, path: '/super-admin/financials/statements' },
      { title: 'Products & Services', icon: Package, path: '/super-admin/financials/products-services' },
      { title: 'Bills', icon: ShoppingCart, path: '/super-admin/financials/bills' },
      { title: 'Vendors', icon: Truck, path: '/super-admin/financials/vendors' },
      { title: 'Transactions', icon: Calculator, path: '/super-admin/financials/transactions' },
      { title: 'Reconciliation', icon: RotateCcw, path: '/super-admin/financials/reconciliation' },
      { title: 'Chart of Accounts', icon: FileSpreadsheet, path: '/super-admin/financials/chart-accounts' },
      { title: 'Run Payroll', icon: HandCoins, path: '/super-admin/financials/run-payroll' },
      { title: 'Employees', icon: User, path: '/super-admin/financials/employees' },
      { title: 'Timesheets', icon: Clock, path: '/super-admin/financials/timesheets' },
      { title: 'Payroll Transactions', icon: Calculator, path: '/super-admin/financials/payroll-transactions' },
      { title: 'Taxes', icon: Percent, path: '/super-admin/financials/taxes' },
      { title: 'Tax Forms', icon: FileText, path: '/super-admin/financials/tax-forms' }
    ]
  },
  {
    title: 'AI Dashboard',
    icon: Bot,
    children: [
      { title: 'Analytics', icon: BarChart3, path: '/super-admin/ai/analytics' },
      { title: 'System Health', icon: Activity, path: '/super-admin/ai/health' },
      { title: 'Agent Control', icon: Cpu, path: '/super-admin/ai/agents' },
      { title: 'Autonomous System', icon: Settings, path: '/super-admin/ai/autonomous-system' },
      { title: 'Autonomous Agents', icon: Bot, path: '/super-admin/ai/autonomous-agents' },
      { title: 'Agent Monitoring', icon: TrendingUp, path: '/super-admin/ai/monitoring' },
      { title: 'Design Engine', icon: Settings, path: '/super-admin/ai/design-engine' },
      { title: 'Market Research', icon: BarChart3, path: '/super-admin/ai/market-research' }
    ]
  },
  {
    title: 'API Dashboard',
    icon: Cpu,
    children: [
      { title: 'API Keys', icon: Settings, path: '/super-admin/api/keys' },
      { title: 'API Logs', icon: FileText, path: '/super-admin/api/logs' },
      { title: 'API Errors', icon: AlertCircle, path: '/super-admin/api/errors' }
    ]
  },
  {
    title: 'Market Place',
    icon: Store,
    children: [
      { title: 'All', icon: Boxes, path: '/super-admin/marketplace/all' },
      { title: 'Accounting', icon: Calculator, path: '/super-admin/marketplace/accounting' },
      { title: 'Carrier Compliance', icon: Truck, path: '/super-admin/marketplace/compliance' },
      { title: 'API', icon: Cpu, path: '/super-admin/marketplace/api' },
      { title: 'EDI', icon: Network, path: '/super-admin/marketplace/edi' },
      { title: 'ELDs', icon: Activity, path: '/super-admin/marketplace/elds' },
      { title: 'Factoring', icon: DollarSign, path: '/super-admin/marketplace/factoring' },
      { title: 'Fuel Cards', icon: CreditCard, path: '/super-admin/marketplace/fuel-cards' },
      { title: 'Load Board', icon: Package, path: '/super-admin/marketplace/load-board' },
      { title: 'Mileage', icon: TrendingUp, path: '/super-admin/marketplace/mileage' },
      { title: 'Payments', icon: DollarSign, path: '/super-admin/marketplace/payments' },
      { title: 'Tolls', icon: Receipt, path: '/super-admin/marketplace/tolls' },
      { title: 'Visibility', icon: Activity, path: '/super-admin/marketplace/visibility' }
    ]
  },
  {
    title: 'Reports',
    icon: FileBarChart,
    path: '/super-admin/reports'
  }
];

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ isOpen, onToggle }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpenItem = openItems.includes(item.title);

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpenItem} onOpenChange={() => toggleItem(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-left font-normal hover:bg-primary/10 hover:text-primary transition-all duration-200 group px-2 sm:px-3",
                level > 0 && "ml-2 sm:ml-4"
              )}
            >
              <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              {isOpen && <span className="flex-1">{item.title}</span>}
              {isOpen && (isOpenItem ? 
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" /> : 
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.title}
        to={item.path || '#'}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-105 group",
            level > 0 && "ml-2 sm:ml-4",
            isActive && "bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium shadow-sm border border-primary/20"
          )
        }
      >
        <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        {isOpen && <span>{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <div className={cn(
      "flex flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 relative z-20",
      isOpen ? "w-64 lg:w-72" : "w-16"
    )}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90 backdrop-blur-sm" />
      
      {/* Enhanced Header */}
      <div className="p-3 sm:p-4 border-b border-border/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Brain className="h-5 w-5 text-white animate-pulse" />
          </div>
          {isOpen && (
            <div className="animate-fade-in">
              <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Trans Bot AI
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Super Admin
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Navigation */}
      <ScrollArea className="flex-1 relative z-10">
        <div className="p-2 sm:p-3 space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </ScrollArea>

      {/* Enhanced Bottom Icons */}
      <div className="p-3 sm:p-4 border-t border-border/50 bg-gradient-to-r from-muted/10 to-transparent relative z-10">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            onClick={() => {}}
          >
            <BookOpen className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
            {isOpen && <span>Learn</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            onClick={() => {}}
          >
            <HelpCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform duration-200" />
            {isOpen && <span>Help</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 
              <Sun className="h-4 w-4 text-yellow-500 group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" /> : 
              <Moon className="h-4 w-4 text-purple-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            }
            {isOpen && <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;