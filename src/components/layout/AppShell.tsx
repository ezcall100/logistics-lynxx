/**
 * App Shell Layout
 * Unified layout component for all portals with consistent structure
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Home,
  BarChart3,
  FileText,
  Users,
  Truck,
  Package,
  DollarSign,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompactThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface AppShellProps {
  children: React.ReactNode;
  portal: 'super-admin' | 'shipper-admin' | 'broker-admin' | 'carrier-admin' | 'driver' | 'owner-operator' | 'factoring';
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: Array<{
    label: string;
    href: string;
    badge?: string | number;
  }>;
}

const portalConfigs = {
  'super-admin': {
    title: 'Super Admin',
    color: 'var(--super-admin)',
    icon: Shield,
    navigation: [
      { label: 'Dashboard', href: '/super-admin', icon: Home },
      { label: 'User Management', href: '/super-admin/users', icon: Users },
      { label: 'Company Settings', href: '/super-admin/settings', icon: Settings },
      { label: 'Security Dashboard', href: '/super-admin/security/dashboard', icon: Shield },
      { label: 'Subscriptions', href: '/super-admin/subscriptions', icon: DollarSign },
      { label: 'Feature Flags', href: '/super-admin/features', icon: Shield },
      { label: 'Analytics', href: '/super-admin/analytics', icon: BarChart3 },
    ] as NavigationItem[],
  },
  'shipper-admin': {
    title: 'Shipper Admin',
    color: 'var(--shipper)',
    icon: Package,
    navigation: [
      { label: 'Dashboard', href: '/shipper-admin', icon: Home },
      { label: 'Loads', href: '/shipper-admin/loads', icon: FileText },
      { label: 'Quotes', href: '/shipper-admin/quotes', icon: DollarSign },
      { label: 'Documents', href: '/shipper-admin/documents', icon: FileText },
      { label: 'Billing', href: '/shipper-admin/billing', icon: DollarSign },
      { label: 'Analytics', href: '/shipper-admin/analytics', icon: BarChart3 },
    ] as NavigationItem[],
  },
  'broker-admin': {
    title: 'Broker Admin',
    color: 'var(--broker)',
    icon: Users,
    navigation: [
      { label: 'Dashboard', href: '/broker-admin', icon: Home },
      { label: 'Loads', href: '/broker-admin/loads', icon: FileText },
      { label: 'Carriers', href: '/broker-admin/carriers', icon: Truck },
      { label: 'Agreements', href: '/broker-admin/agreements', icon: FileText },
      { label: 'Invoices', href: '/broker-admin/invoices', icon: DollarSign },
      { label: 'Activity', href: '/broker-admin/activity', icon: BarChart3 },
    ] as NavigationItem[],
  },
  'carrier-admin': {
    title: 'Carrier Admin',
    color: 'var(--carrier)',
    icon: Truck,
    navigation: [
      { label: 'Dashboard', href: '/carrier-admin', icon: Home },
      { label: 'Fleet', href: '/carrier-admin/fleet', icon: Truck },
      { label: 'Drivers', href: '/carrier-admin/drivers', icon: Users },
      { label: 'Owner-Operators', href: '/carrier-admin/owner-operators', icon: Users },
      { label: 'Loads', href: '/carrier-admin/loads', icon: FileText },
      { label: 'Compliance', href: '/carrier-admin/compliance', icon: Shield },
    ] as NavigationItem[],
  },
  driver: {
    title: 'Driver Portal',
    color: 'var(--driver)',
    icon: Truck,
    navigation: [
      { label: 'My Loads', href: '/driver/loads', icon: FileText },
      { label: 'HOS', href: '/driver/hos', icon: BarChart3 },
      { label: 'Documents', href: '/driver/documents', icon: FileText },
      { label: 'Chat', href: '/driver/chat', icon: Users },
      { label: 'Payments', href: '/driver/payments', icon: DollarSign },
    ] as NavigationItem[],
  },
  'owner-operator': {
    title: 'Owner-Operator',
    color: 'var(--owner-operator)',
    icon: Truck,
    navigation: [
      { label: 'Loads', href: '/owner-operator/loads', icon: FileText },
      { label: 'Invoices', href: '/owner-operator/invoices', icon: DollarSign },
      { label: 'Expenses', href: '/owner-operator/expenses', icon: DollarSign },
      { label: 'Settlements', href: '/owner-operator/settlements', icon: DollarSign },
    ] as NavigationItem[],
  },
  factoring: {
    title: 'Factoring Company',
    color: 'var(--factoring)',
    icon: DollarSign,
    navigation: [
      { label: 'Invoices', href: '/factoring/invoices', icon: FileText },
      { label: 'Verifications', href: '/factoring/verifications', icon: Shield },
      { label: 'Payments', href: '/factoring/payments', icon: DollarSign },
      { label: 'Disputes', href: '/factoring/disputes', icon: HelpCircle },
    ] as NavigationItem[],
  },
};

export function AppShell({
  children,
  portal,
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  sidebar,
  header,
  footer,
  className,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const config = portalConfigs[portal];
  const PortalIcon = config.icon;

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  // Navigation item component
  const NavigationItem = ({ item }: { item: NavigationItem }) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const [isExpanded, setIsExpanded] = useState(isActive);

    return (
      <div>
        <button
          onClick={() => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            } else {
              navigate(item.href);
            }
          }}
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-contrast'
              : 'text-text-muted hover:bg-surface-2 hover:text-text'
          )}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children!.map((child) => {
              const isChildActive = location.pathname === child.href;
              return (
                <button
                  key={child.href}
                  onClick={() => navigate(child.href)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                    isChildActive
                      ? 'bg-primary-subtle text-primary'
                      : 'text-text-muted hover:bg-surface-2 hover:text-text'
                  )}
                >
                  <span className="flex-1 text-left">{child.label}</span>
                  {child.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {child.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-bg-secondary">
      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-surface shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md"
            style={{ backgroundColor: config.color }}
          >
            <PortalIcon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-text">{config.title}</h1>
            <p className="text-xs text-text-muted">Portal</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {config.navigation.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">User Name</p>
              <p className="text-xs text-text-muted truncate">user@example.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-surface px-4 shadow-sm">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-text-muted">/</span>}
                {crumb.href ? (
                  <button
                    onClick={() => navigate(crumb.href!)}
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-text font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
          </form>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
            <CompactThemeToggle />
          </div>
        </header>

        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="border-b border-border bg-surface px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                {title && <h1 className="text-2xl font-semibold text-text">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className={cn('h-full', className)}>
            {children}
          </div>
        </main>

        {/* Footer */}
        {footer && (
          <footer className="border-t border-border bg-surface px-6 py-4">
            {footer}
          </footer>
        )}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Export portal configurations for use in other components
export { portalConfigs };
export type { NavigationItem };
