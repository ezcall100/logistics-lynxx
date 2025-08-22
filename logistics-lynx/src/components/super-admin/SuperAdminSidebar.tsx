/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Brain,
  Shield,
  Database,
  Globe,
  Zap,
  Palette,
  Command,
  Sparkles,
  Crown,
  Home,
  Search,
  Bell,
  Plus,
  ExternalLink,
  ChevronLeft,
  Menu,
  X,
  Map,
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface SuperAdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: MenuItem[];
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  description?: string;
  external?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/super-admin',
    description: 'Overview and analytics'
  },
  {
    title: 'CRM Management',
    icon: Users2,
    description: 'Customer relationship management',
    children: [
      { title: 'Overview', icon: LayoutDashboard, path: '/super-admin/crm/overview' },
      { title: 'Leads', icon: UserPlus, path: '/super-admin/crm/leads' },
      { title: 'Contacts', icon: Contact, path: '/super-admin/crm/contacts' },
      { title: 'Opportunities', icon: Target, path: '/super-admin/crm/opportunities' },
      { title: 'Email Campaigns', icon: Mail, path: '/super-admin/crm/email' },
      { title: 'Projects', icon: FolderOpen, path: '/super-admin/crm/projects' },
      { title: 'Calendar', icon: Calendar, path: '/super-admin/crm/calendar' }
    ]
  },
  {
    title: 'User Management',
    icon: Users,
    description: 'Manage users and permissions',
    children: [
      { title: 'All Users', icon: Users2, path: '/super-admin/users' },
      { title: 'Roles & Permissions', icon: Shield, path: '/super-admin/roles' },
      { title: 'User Groups', icon: UserCheck, path: '/super-admin/groups' },
      { title: 'Access Control', icon: Key, path: '/super-admin/access-control' }
    ]
  },
  {
    title: 'System Administration',
    icon: Settings,
    description: 'System configuration and settings',
    children: [
      { title: 'Database Admin', icon: Database, path: '/super-admin/database' },
      { title: 'Network Config', icon: Network, path: '/super-admin/network' },
      { title: 'Security Center', icon: Shield, path: '/super-admin/security' },
      { title: 'System Health', icon: Activity, path: '/super-admin/health' },
      { title: 'Backup & Recovery', icon: RotateCcw, path: '/super-admin/backup' }
    ]
  },
  {
    title: 'AI & Automation',
    icon: Brain,
    description: 'AI agents and automation',
    children: [
      { title: 'Agent Control', icon: Cpu, path: '/super-admin/ai-dashboard' },
      { title: 'MCP Control', icon: Command, path: '/super-admin/mcp-control' },
      { title: 'Autonomous Tasks', icon: Bot, path: '/super-admin/autonomous' },
      { title: 'AI Analytics', icon: BarChart3, path: '/super-admin/ai-analytics' }
    ]
  },
  {
    title: 'Reports & Analytics',
    icon: BarChart3,
    description: 'Reports and data analytics',
    children: [
      { title: 'System Reports', icon: FileBarChart, path: '/super-admin/reports' },
      { title: 'User Analytics', icon: TrendingUp, path: '/super-admin/analytics/users' },
      { title: 'Performance Metrics', icon: Activity, path: '/super-admin/analytics/performance' },
      { title: 'Custom Reports', icon: FileSpreadsheet, path: '/super-admin/reports/custom' }
    ]
  },
  {
    title: 'Support & Tickets',
    icon: Ticket,
    description: 'Support tickets and help desk',
    children: [
      { title: 'All Tickets', icon: List, path: '/super-admin/tickets/all' },
      { title: 'Ticket Dashboard', icon: LayoutDashboard, path: '/super-admin/tickets/dashboard' },
      { title: 'Knowledge Base', icon: BookOpen, path: '/super-admin/knowledge-base' },
      { title: 'Help Center', icon: HelpCircle, path: '/super-admin/help' }
    ]
  },
  {
    title: 'Financial Management',
    icon: DollarSign,
    description: 'Financial operations and billing',
    children: [
      { title: 'Billing & Invoices', icon: Receipt, path: '/super-admin/billing' },
      { title: 'Payment Processing', icon: CreditCard, path: '/super-admin/payments' },
      { title: 'Financial Reports', icon: FileBarChart, path: '/super-admin/financial-reports' },
      { title: 'Tax Management', icon: Calculator, path: '/super-admin/tax' }
    ]
  },
  {
    title: 'Portal Management',
    icon: Globe,
    description: 'Multi-portal administration',
    children: [
      { title: 'Portal Overview', icon: LayoutDashboard, path: '/super-admin/portals' },
      { title: 'Portal Users', icon: Users, path: '/super-admin/portal-users' },
      { title: 'Portal Config', icon: Settings, path: '/super-admin/portal-config' },
      { title: 'Portal Analytics', icon: BarChart3, path: '/super-admin/portal-analytics' }
    ]
  },
  {
    title: 'Logistics & Operations',
    icon: Truck,
    description: 'Logistics and operational tools',
    children: [
      { title: 'Load Management', icon: Package, path: '/super-admin/loads' },
      { title: 'Fleet Management', icon: Truck, path: '/super-admin/fleet' },
      { title: 'Route Optimization', icon: Map, path: '/super-admin/routes' },
      { title: 'Dispatch Center', icon: Radio, path: '/super-admin/dispatch' }
    ]
  }
];

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ isOpen, onToggle }) => {
  const [openItems, setOpenItems] = useState<string[]>(['Dashboard']);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isItemActive = (item: MenuItem) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isItemActive(item);
    const isOpen = openItems.includes(item.title);

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between px-3 py-2 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary group",
                level > 0 && "ml-2",
                isActive && "bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium shadow-sm border border-primary/20"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                {isOpen && (
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant={item.badgeVariant || 'secondary'} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
              {isOpen && (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-2 space-y-1">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <TooltipProvider key={item.title}>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to={item.path || '#'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-105 group relative",
                  level > 0 && "ml-2",
                  isActive && "bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium shadow-sm border border-primary/20"
                )
              }
            >
              <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              {isOpen && (
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || 'secondary'} className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.external && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  )}
                </div>
              )}
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-primary rounded-full" />
              )}
            </NavLink>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent side="right" className="bg-card/95 backdrop-blur-xl border-border/50">
              <div>
                <p className="font-medium">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "flex flex-col border-r border-border/50 bg-gradient-to-b from-background/95 via-background/90 to-background/95 backdrop-blur-xl transition-all duration-300 relative z-20 shadow-lg",
        isOpen ? "w-72" : "w-16"
      )}
    >
      {/* Enhanced Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-purple-500/5 backdrop-blur-sm" />
      
      {/* Enhanced Header */}
      <div className="p-4 border-b border-border/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Crown className="h-5 w-5 text-white" />
          </div>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Trans Bot AI
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-muted-foreground">Super Admin Portal</p>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <ScrollArea className="flex-1 relative z-10">
        <div className="p-2 space-y-1">
          <AnimatePresence>
            {menuItems.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderMenuItem(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-border/50 relative z-10">
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* System Status */}
            <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700 dark:text-green-400">System Operational</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All systems running smoothly</p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2 hover:bg-primary/10">
                <Plus className="h-4 w-4" />
                Quick Add
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2 hover:bg-primary/10">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex-1 gap-2 hover:bg-primary/10"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="text-xs">Theme</span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-primary/10"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SuperAdminSidebar;