import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  Home,
  BarChart3,
  Truck,
  Package,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  FileText,
  Target,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  Plus,
  Database,
  Shield,
  Zap,
  Globe,
  Cpu,
  Server,
  Network,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow
} from 'lucide-react';

interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  submenu?: Array<{
    name: string;
    path: string;
    icon?: string;
  }>;
}

interface PortalLayoutProps {
  children: React.ReactNode;
  portalType: string;
  title: string;
  description: string;
  menuItems: MenuItem[];
}

// Icon mapping for menu items
const iconMap = {
  '📊': BarChart3,
  '🚛': Truck,
  '📦': Package,
  '👥': Users,
  '⚙️': Settings,
  '🤖': Activity,
  '📋': FileText,
  '🎯': Target,
  '💰': DollarSign,
  '🗺️': MapPin,
  '📅': Calendar,
  '⏰': Clock,
  '➕': Plus,
  '💻': Cpu,
  '🖥️': Monitor,
  '📱': Smartphone,
  '📟': Tablet,
  '🌐': Globe,
  '🛡️': Shield,
  '⚡': Zap,
  '🗄️': Database,
  '🔧': Settings,
  '📡': Network,
  '💾': HardDrive,
  '🖥️': Monitor,
  '📶': Signal,
  '📶-high': SignalHigh,
  '📶-medium': SignalMedium,
  '📶-low': SignalLow,
  '📶-off': WifiOff,
  '📶-on': Wifi
};

export const ModernLayout: React.FC<PortalLayoutProps> = ({
  children,
  portalType,
  title,
  description,
  menuItems
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`bg-slate-800 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {sidebarOpen && (
            <h2 className="text-xl font-semibold">
              {portalType.charAt(0).toUpperCase() + portalType.slice(1)} Portal
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-700"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
            
            return (
              <div key={index}>
                {item.submenu ? (
                  <div>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between text-white hover:bg-slate-700 ${
                        expandedMenus[item.name] ? 'bg-slate-700' : ''
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={18} />
                        {sidebarOpen && <span>{item.name}</span>}
                      </div>
                      {sidebarOpen && (
                        <ChevronRight 
                          size={16} 
                          className={`transition-transform ${
                            expandedMenus[item.name] ? 'rotate-90' : ''
                          }`}
                        />
                      )}
                    </Button>
                    
                    {expandedMenus[item.name] && sidebarOpen && (
                      <div className="ml-6 mt-2 space-y-1 bg-slate-900 rounded-md p-2">
                        {item.submenu.map((subItem, subIndex) => {
                          const SubIconComponent = subItem.icon 
                            ? iconMap[subItem.icon as keyof typeof iconMap] || Home
                            : IconComponent;
                          
                          return (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                isActiveRoute(subItem.path)
                                  ? 'bg-slate-700 text-white'
                                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              <SubIconComponent size={16} />
                              <span>{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActiveRoute(item.path || '')
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent size={18} />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {title}
                </h1>
                <p className="text-sm text-gray-600">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Portal-specific menu configurations
export const portalMenus = {
  carrier: [
    { name: 'Dashboard', icon: '📊', path: '/carrier/dashboard' },
    { 
      name: 'Fleet Management', 
      icon: '🚛', 
      submenu: [
        { name: 'Vehicles', path: '/carrier/vehicles', icon: '🚛' },
        { name: 'Drivers', path: '/carrier/drivers', icon: '👥' },
        { name: 'Maintenance', path: '/carrier/maintenance', icon: '🔧' }
      ]
    },
    { 
      name: 'Load Management', 
      icon: '📦', 
      submenu: [
        { name: 'Available Loads', path: '/carrier/loads', icon: '📦' },
        { name: 'Active Loads', path: '/carrier/active-loads', icon: '📦' },
        { name: 'Completed Loads', path: '/carrier/completed-loads', icon: '✅' }
      ]
    },
    { name: 'Route Optimization', icon: '🗺️', path: '/carrier/routes' },
    { name: 'Reports', icon: '📈', path: '/carrier/reports' },
    { name: 'Settings', icon: '⚙️', path: '/carrier/settings' }
  ],
  
  broker: [
    { name: 'Dashboard', icon: '📊', path: '/broker/dashboard' },
    { 
      name: 'Load Board', 
      icon: '📋', 
      submenu: [
        { name: 'Available Loads', path: '/broker/loads', icon: '📦' },
        { name: 'Post Load', path: '/broker/post-load', icon: '➕' },
        { name: 'Load History', path: '/broker/load-history', icon: '📅' }
      ]
    },
    { 
      name: 'Carrier Network', 
      icon: '🚛', 
      submenu: [
        { name: 'Carriers', path: '/broker/carriers', icon: '🚛' },
        { name: 'Add Carrier', path: '/broker/add-carrier', icon: '➕' },
        { name: 'Carrier Ratings', path: '/broker/carrier-ratings', icon: '⭐' }
      ]
    },
    { name: 'Rate Management', icon: '💰', path: '/broker/rates' },
    { name: 'Analytics', icon: '📈', path: '/broker/analytics' },
    { name: 'Settings', icon: '⚙️', path: '/broker/settings' }
  ],
  
  autonomous: [
    { name: 'AI Dashboard', icon: '🤖', path: '/autonomous/dashboard' },
    { 
      name: 'Agent Management', 
      icon: '👥', 
      submenu: [
        { name: 'Active Agents', path: '/autonomous/agents', icon: '🤖' },
        { name: 'Agent Performance', path: '/autonomous/performance', icon: '📊' },
        { name: 'Agent Logs', path: '/autonomous/logs', icon: '📋' }
      ]
    },
    { 
      name: 'System Monitoring', 
      icon: '📊', 
      submenu: [
        { name: 'Real-time Metrics', path: '/autonomous/metrics', icon: '📊' },
        { name: 'System Health', path: '/autonomous/health', icon: '❤️' },
        { name: 'Alert Management', path: '/autonomous/alerts', icon: '🔔' }
      ]
    },
    { 
      name: 'Development', 
      icon: '💻', 
      submenu: [
        { name: 'Code Changes', path: '/autonomous/code', icon: '💻' },
        { name: 'Deployments', path: '/autonomous/deployments', icon: '🚀' },
        { name: 'Testing', path: '/autonomous/testing', icon: '🧪' }
      ]
    },
    { name: 'Configuration', icon: '⚙️', path: '/autonomous/config' }
  ],
  
  analytics: [
    { name: 'Overview', icon: '📊', path: '/analytics/overview' },
    { 
      name: 'Performance', 
      icon: '📈', 
      submenu: [
        { name: 'Business Metrics', path: '/analytics/business', icon: '📊' },
        { name: 'Operational KPIs', path: '/analytics/operational', icon: '📈' },
        { name: 'Financial Reports', path: '/analytics/financial', icon: '💰' }
      ]
    },
    { 
      name: 'Data Insights', 
      icon: '🔍', 
      submenu: [
        { name: 'Trend Analysis', path: '/analytics/trends', icon: '📈' },
        { name: 'Predictive Analytics', path: '/analytics/predictive', icon: '🔮' },
        { name: 'Custom Reports', path: '/analytics/custom', icon: '📋' }
      ]
    },
    { name: 'Export', icon: '📤', path: '/analytics/export' }
  ]
};