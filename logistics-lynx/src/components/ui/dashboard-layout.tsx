/**
 * Modern Dashboard Layout Component
 * Responsive dashboard layout with sidebar navigation and header
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Badge } from './badge';
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Settings,
  User,
  Search,
  Sun,
  Moon,
  LogOut,
  Home,
  BarChart3,
  Users,
  Settings as SettingsIcon,
  FileText,
  Database,
  Activity,
  Shield,
  Truck,
  Package,
  Building2,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Star,
  Zap,
  Target,
  Award,
  DollarSign,
  PieChart,
  LineChart,
  BarChart,
  Grid3X3,
  List,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string | number;
  children?: NavigationItem[];
  color?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: NavigationItem[];
  title?: string;
  subtitle?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  notifications?: number;
  onNavigationChange?: (item: NavigationItem) => void;
  onThemeToggle?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function DashboardLayout({
  children,
  navigation,
  title = 'Dashboard',
  subtitle,
  user,
  notifications = 0,
  onNavigationChange,
  onThemeToggle,
  onLogout,
  className,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation
  const handleNavigation = (item: NavigationItem) => {
    setActiveItem(item.id);
    onNavigationChange?.(item);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeToggle?.();
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' },
    closed: { opacity: 0, pointerEvents: 'none' },
  };

  return (
    <div className={cn('min-h-screen bg-secondary-50', className)}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          !sidebarOpen && '-translate-x-full'
        )}
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? 'open' : 'closed'}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-secondary-900">TMS Portal</h1>
              <p className="text-xs text-secondary-500">Autonomous System</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={() => handleNavigation(item)}
            />
          ))}
        </nav>

        {/* Sidebar Footer */}
        {user && (
          <div className="p-4 border-t border-secondary-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary-50">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {user.role}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className={cn('lg:pl-64', !sidebarOpen && 'lg:pl-16')}>
        {/* Header */}
        <header className="bg-white border-b border-secondary-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-secondary-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-secondary-500">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleThemeToggle}
                className="text-secondary-400 hover:text-secondary-600"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-secondary-400 hover:text-secondary-600"
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications > 99 ? '99+' : notifications}
                  </Badge>
                )}
              </Button>

              {/* Settings */}
              <Button
                variant="ghost"
                size="sm"
                className="text-secondary-400 hover:text-secondary-600"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
interface NavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
}

function NavigationItem({ item, isActive, onClick }: NavigationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setIsExpanded(!isExpanded);
    } else {
      onClick();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
          isActive
            ? 'bg-primary-50 text-primary-700 border border-primary-200'
            : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
        )}
      >
        <div className="flex items-center space-x-3">
          <item.icon
            className={cn(
              'w-5 h-5',
              isActive ? 'text-primary-600' : 'text-secondary-400'
            )}
          />
          <span>{item.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {item.badge && (
            <Badge
              variant={isActive ? 'default' : 'secondary'}
              className="text-xs"
            >
              {item.badge}
            </Badge>
          )}
          {item.children && (
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-90'
              )}
            />
          )}
        </div>
      </button>

      {/* Submenu */}
      {item.children && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-8 mt-2 space-y-1"
            >
              {item.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => onClick()}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 rounded-lg transition-colors"
                >
                  <child.icon className="w-4 h-4 text-secondary-400" />
                  <span>{child.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default DashboardLayout;
