import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { AuthProvider, useAuth } from './context/auth/AuthProvider';
import { useTheme } from './components/theme/theme-provider';

// 🚀 AUTONOMOUS PORTAL SYSTEM - BASED ON KNOWLEDGE BASE
// This system follows the actual portal structure from the knowledge base

// Core Portal Components - Based on knowledge base registry
import EnhancedSuperAdminPortal from './components/super-admin/EnhancedSuperAdminPortal';
import SoftwareAdminPortal from './components/portals/SoftwareAdminPortal';
import CarriersPortal from './components/portals/CarriersPortal';
import BrokersPortal from './components/portals/BrokersPortal';
import ShippersPortal from './components/portals/ShippersPortal';
import AccessAllPortals from './components/portals/AccessAllPortals';

// Existing Page Components
import SuperAdminPage from './pages/SuperAdminPage';
import CarrierPortalPage from './pages/CarrierPortalPage';
import BrokerPortalPage from './pages/BrokerPortalPage';
import ShipperPortalPage from './pages/ShipperPortalPage';
import DriverManagementPage from './pages/DriverManagementPage';
import LoadBoardPage from './pages/LoadBoardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BillingPage from './pages/BillingPage';
import CompliancePage from './pages/CompliancePage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import SystemHealthPage from './pages/SystemHealthPage';
import UserManagement from './components/admin/UserManagement';
import OnboardingReviewDashboard from './components/admin/OnboardingReviewDashboard';
import LoginPage from './pages/auth/LoginPage';

// Autonomous System Components
import { MasterAutonomousAgent } from './autonomous/MasterAutonomousAgent';
import AutonomousDevelopmentSystem from './autonomous/AutonomousDevelopmentSystem';

// UI Components
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

// Icons
import { 
  Brain, 
  Shield, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  Zap, 
  Globe,
  Database,
  Network,
  Activity,
  Target,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Car,
  Building2,
  CreditCard,
  Calculator,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Eye,
  DollarSign,
  Receipt,
  Banknote,
  Building,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Home,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  Cog,
  HelpCircle,
  Info,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  FileText,
  File,
  Folder,
  FolderOpen,
  Save,
  Edit,
  Trash2,
  Archive,
  Inbox,
  Send,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MessageCircle,
  Video,
  Camera,
  Image,
  Music,
  Headphones,
  Mic,
  MicOff,
  Volume,
  Volume1,
  Lock,
  Unlock,
  Key,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  XCircle,
  MinusCircle,
  PlusCircle,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Package,
  ShoppingCart,
  Wrench,
  Fuel,
  Sun,
  Moon
} from 'lucide-react';

// 🎯 PORTAL CONFIGURATION - EYE-FRIENDLY SOFTWARE DESIGN PATTERNS
// This matches the actual portal structure from knowledge/10-agent-registry/registry.json
const PORTAL_CONFIG = {
  // Core Administrative Portals - Professional Blues
  superAdmin: {
    path: '/super-admin',
    title: 'Super Admin',
    description: 'System-wide administration and oversight',
    icon: Shield,
    color: 'bg-gradient-to-r from-blue-700 to-indigo-700',
    roles: ['super_admin', 'owner'],
    flag: 'portal.superAdmin.enabled',
    autonomous: true,
    component: EnhancedSuperAdminPortal
  },
  admin: {
    path: '/admin',
    title: 'Admin Portal',
    description: 'User management and system configuration',
    icon: Settings,
    color: 'bg-gradient-to-r from-slate-600 to-slate-700',
    roles: ['admin', 'owner'],
    flag: 'portal.admin.enabled',
    autonomous: true,
    component: UserManagement
  },
  tmsAdmin: {
    path: '/tms-admin',
    title: 'TMS Admin',
    description: 'Transportation Management System administration',
    icon: Truck,
    color: 'bg-gradient-to-r from-teal-600 to-teal-700',
    roles: ['tms_admin', 'admin'],
    flag: 'portal.tmsAdmin.enabled',
    autonomous: true,
    component: null // Will use default layout
  },

  // Primary Business Portals - Trustworthy Blues and Greens
  carrier: {
    path: '/carrier',
    title: 'Carrier Portal',
    description: 'Fleet management and load operations',
    icon: Truck,
    color: 'bg-gradient-to-r from-blue-600 to-blue-700',
    roles: ['carrier_admin', 'carrier_user', 'driver', 'owner', 'admin'],
    flag: 'portal.carrier.enabled',
    autonomous: true,
    component: CarriersPortal
  },
  broker: {
    path: '/broker',
    title: 'Broker Portal',
    description: 'Load matching and relationship management',
    icon: Users,
    color: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
    roles: ['broker_admin', 'broker_user', 'owner', 'admin'],
    flag: 'portal.broker.enabled',
    autonomous: true,
    component: BrokersPortal
  },
  shipper: {
    path: '/shipper',
    title: 'Shipper Portal',
    description: 'Shipping requests and shipment tracking',
    icon: Package,
    color: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
    roles: ['shipper_admin', 'shipper_user', 'owner', 'admin'],
    flag: 'portal.shipper.enabled',
    autonomous: true,
    component: ShippersPortal
  },

  // Operational Portals - Action-oriented Colors
  driver: {
    path: '/driver',
    title: 'Driver Portal',
    description: 'Mobile-friendly driver operations',
    icon: Car,
    color: 'bg-gradient-to-r from-amber-600 to-amber-700',
    roles: ['driver', 'carrier_admin', 'carrier_user'],
    flag: 'portal.driver.enabled',
    autonomous: true,
    component: DriverManagementPage
  },
  ownerOperator: {
    path: '/owner-operator',
    title: 'Owner Operator',
    description: 'Independent operator management',
    icon: Building2,
    color: 'bg-gradient-to-r from-violet-600 to-violet-700',
    roles: ['owner_operator', 'carrier_admin', 'broker_admin', 'shipper_admin'],
    flag: 'portal.ownerOperator.enabled',
    autonomous: true,
    component: null
  },

  // Financial Portals - Success Greens
  factoring: {
    path: '/factoring',
    title: 'Factoring Portal',
    description: 'Invoice factoring and cash flow management',
    icon: DollarSign,
    color: 'bg-gradient-to-r from-green-600 to-green-700',
    roles: ['factoring', 'admin'],
    flag: 'portal.factoring.enabled',
    autonomous: true,
    component: null
  },
  financials: {
    path: '/financials',
    title: 'Financials Portal',
    description: 'Financial reporting and accounting',
    icon: Calculator,
    color: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
    roles: ['finance', 'admin'],
    flag: 'portal.financials.enabled',
    autonomous: true,
    component: BillingPage
  },

  // Market and Trading Portals - Dynamic Colors
  loadBoard: {
    path: '/load-board',
    title: 'Load Board',
    description: 'Load posting and matching marketplace',
    icon: Briefcase,
    color: 'bg-gradient-to-r from-cyan-600 to-cyan-700',
    roles: ['broker_admin', 'carrier_admin', 'shipper_admin'],
    flag: 'portal.loadBoard.enabled',
    autonomous: true,
    component: LoadBoardPage
  },
  marketplace: {
    path: '/marketplace',
    title: 'Marketplace',
    description: 'Trading platform and auctions',
    icon: Globe,
    color: 'bg-gradient-to-r from-sky-600 to-sky-700',
    roles: ['all'],
    flag: 'portal.marketplace.enabled',
    autonomous: true,
    component: null
  },
  rates: {
    path: '/rates',
    title: 'Rates Portal',
    description: 'Rate management and pricing optimization',
    icon: TrendingUp,
    color: 'bg-gradient-to-r from-blue-600 to-blue-700',
    roles: ['broker_admin', 'carrier_admin', 'admin'],
    flag: 'portal.rates.enabled',
    autonomous: true,
    component: null
  },

  // Integration and Data Portals - Technical Colors
  edi: {
    path: '/edi',
    title: 'EDI Portal',
    description: 'Electronic Data Interchange management',
    icon: Network,
    color: 'bg-gradient-to-r from-slate-600 to-slate-700',
    roles: ['edi_admin', 'edi_user', 'admin', 'owner'],
    flag: 'portal.edi.enabled',
    autonomous: true,
    component: null
  },
  analytics: {
    path: '/analytics',
    title: 'Analytics Portal',
    description: 'Business intelligence and reporting',
    icon: BarChart3,
    color: 'bg-gradient-to-r from-purple-600 to-purple-700',
    roles: ['analytics_admin', 'analytics_user', 'admin', 'owner'],
    flag: 'portal.analytics.enabled',
    autonomous: true,
    component: AnalyticsPage
  },

  // Management Portals - Professional Colors
  crm: {
    path: '/crm',
    title: 'CRM Portal',
    description: 'Customer relationship management',
    icon: Users,
    color: 'bg-gradient-to-r from-rose-600 to-rose-700',
    roles: ['crm_admin', 'crm_user', 'admin', 'owner'],
    flag: 'portal.crm.enabled',
    autonomous: true,
    component: null
  },
  directory: {
    path: '/directory',
    title: 'Directory Portal',
    description: 'Company and contact directory',
    icon: Phone,
    color: 'bg-gradient-to-r from-orange-600 to-orange-700',
    roles: ['all'],
    flag: 'portal.directory.enabled',
    autonomous: true,
    component: null
  },

  // Autonomous and AI Portals - Futuristic Colors
  autonomous: {
    path: '/autonomous',
    title: 'Autonomous Portal',
    description: 'AI agent management and monitoring',
    icon: Brain,
    color: 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700',
    roles: ['autonomous_admin', 'autonomous_user', 'admin'],
    flag: 'portal.autonomous.enabled',
    autonomous: true,
    component: null
  },
  workers: {
    path: '/workers',
    title: 'Workers Portal',
    description: 'Background job management and monitoring',
    icon: Activity,
    color: 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700',
    roles: ['admin', 'devops'],
    flag: 'portal.workers.enabled',
    autonomous: true,
    component: null
  },

  // Onboarding Portal - Welcoming Colors
  onboarding: {
    path: '/onboarding',
    title: 'Onboarding Portal',
    description: 'User onboarding and setup wizard',
    icon: User,
    color: 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-700',
    roles: ['all'],
    flag: 'portal.onboarding.enabled',
    autonomous: true,
    component: OnboardingReviewDashboard
  },

  // Software Company Portal - Professional Tech Colors
  softwareCompany: {
    path: '/software-company',
    title: 'Software Company Dashboard',
    description: 'Software company management and development',
    icon: Monitor,
    color: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700',
    roles: ['admin', 'owner', 'software_admin'],
    flag: 'portal.softwareCompany.enabled',
    autonomous: true,
    component: SoftwareAdminPortal
  }
};

// 🎯 AUTONOMOUS PORTAL SELECTOR COMPONENT
const AutonomousPortalSelector = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { theme, setTheme, isDark } = useTheme();

  // Toggle theme
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Filter portals based on user role and search
  const filteredPortals = Object.entries(PORTAL_CONFIG).filter(([key, portal]) => {
    const matchesSearch = portal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'autonomous' && portal.autonomous) ||
                           (selectedCategory === 'business' && ['carrier', 'broker', 'shipper'].includes(key)) ||
                           (selectedCategory === 'financial' && ['factoring', 'financials', 'rates'].includes(key)) ||
                           (selectedCategory === 'admin' && ['superAdmin', 'admin', 'tmsAdmin', 'softwareCompany'].includes(key));
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: 'all', label: 'All Portals', icon: Grid },
    { key: 'autonomous', label: 'Autonomous', icon: Brain },
    { key: 'business', label: 'Business', icon: Briefcase },
    { key: 'financial', label: 'Financial', icon: DollarSign },
    { key: 'admin', label: 'Administrative', icon: Shield }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
              <div className={`backdrop-blur-sm border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-800/80 border-slate-600' 
            : 'bg-white/80 border-slate-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-800' : 'text-slate-800'
                  }`}>
                    Logistics Lynx
                  </h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-600' : 'text-slate-600'
                  }`}>
                    Autonomous TMS Platform
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Cog className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-slate-700 hover:bg-slate-100' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-500'
                }`} />
                <Input
                  placeholder="Search portals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-white/70 border-slate-300 text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500' 
                      : 'bg-white/70 border-slate-300 text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? viewMode === 'grid' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    : viewMode === 'grid' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`transition-colors duration-300 ${
                  isDarkMode 
                    ? viewMode === 'list' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    : viewMode === 'list' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className={`grid w-full grid-cols-5 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-white/70 border border-slate-200' 
                : 'bg-white/70 border border-slate-200'
            }`}>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.key}
                  value={category.key}
                  className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-slate-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white' 
                      : 'text-slate-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Portal Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredPortals.map(([key, portal]) => {
            const IconComponent = portal.icon;
            return (
              <Card
                key={key}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  viewMode === 'grid' 
                    ? `bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-blue-300 shadow-md` 
                    : `bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-blue-300 shadow-md`
                }`}
                onClick={() => navigate(portal.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${portal.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {portal.autonomous && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-sm">
                        <Brain className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <CardTitle className={`text-lg font-semibold mt-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-800' : 'text-slate-800'
                  }`}>
                    {portal.title}
                  </CardTitle>
                  <CardDescription className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-600' : 'text-slate-600'
                  }`}>
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {portal.roles.slice(0, 2).map((role, index) => (
                        <Badge key={index} variant="outline" className={`text-xs transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-slate-600 border-slate-300 bg-slate-50' 
                            : 'text-slate-600 border-slate-300 bg-slate-50'
                        }`}>
                          {role}
                        </Badge>
                      ))}
                      {portal.roles.length > 2 && (
                        <Badge variant="outline" className={`text-xs transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-slate-600 border-slate-300 bg-slate-50' 
                            : 'text-slate-600 border-slate-300 bg-slate-50'
                        }`}>
                          +{portal.roles.length - 2}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 group-hover:text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Autonomous System Status */}
        <div className="mt-12">
          <Card className={`transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-slate-800' : 'text-slate-800'
              }`}>
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Autonomous System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-700' : 'text-slate-700'
                  }`}>
                    Master Agent: Active
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-700' : 'text-slate-700'
                  }`}>
                    Development System: Running
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-sm"></div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-700' : 'text-slate-700'
                  }`}>
                    AI Optimization: Enabled
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 🎯 MAIN APP COMPONENT
function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // Check if user is authenticated - Temporarily bypass for demo
  if (!user) {
    // For demo purposes, allow access without authentication
    console.log('Demo mode: Bypassing authentication');
  }

  return (
        <div className="App">
          <Routes>
            {/* Main Portal Selection */}
        <Route path="/" element={<AutonomousPortalSelector />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Portal Routes - Based on knowledge base registry */}
        <Route path="/super-admin/*" element={<EnhancedSuperAdminPortal />} />
        <Route path="/admin/*" element={<UserManagement />} />
        <Route path="/tms-admin/*" element={<SuperAdminPage />} />
        <Route path="/carrier/*" element={<CarriersPortal />} />
        <Route path="/broker/*" element={<BrokersPortal />} />
        <Route path="/shipper/*" element={<ShippersPortal />} />
        <Route path="/driver/*" element={<DriverManagementPage />} />
        <Route path="/owner-operator/*" element={<SuperAdminPage />} />
        <Route path="/factoring/*" element={<BillingPage />} />
        <Route path="/load-board/*" element={<LoadBoardPage />} />
        <Route path="/crm/*" element={<SuperAdminPage />} />
        <Route path="/financials/*" element={<BillingPage />} />
        <Route path="/edi/*" element={<SuperAdminPage />} />
        <Route path="/marketplace/*" element={<SuperAdminPage />} />
        <Route path="/analytics/*" element={<AnalyticsPage />} />
        <Route path="/autonomous/*" element={<SuperAdminPage />} />
        <Route path="/workers/*" element={<SystemHealthPage />} />
        <Route path="/rates/*" element={<SuperAdminPage />} />
        <Route path="/directory/*" element={<SuperAdminPage />} />
        <Route path="/onboarding/*" element={<OnboardingReviewDashboard />} />
        <Route path="/software-company/*" element={<SoftwareAdminPortal />} />

        {/* Legacy Routes for Compatibility */}
        <Route path="/carrier-portal" element={<CarrierPortalPage />} />
        <Route path="/broker-portal" element={<BrokerPortalPage />} />
        <Route path="/shipper-portal" element={<ShipperPortalPage />} />
        <Route path="/access-all" element={<AccessAllPortals />} />

        {/* Catch-all route */}
        <Route path="*" element={<AutonomousPortalSelector />} />
          </Routes>
        </div>
  );
}

// 🎯 MAIN APP WRAPPER
function App() {
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;