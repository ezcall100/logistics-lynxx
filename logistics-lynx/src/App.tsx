import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { AuthProvider, useAuth } from './context/auth/AuthProvider';

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
  Fuel
} from 'lucide-react';

// 🎯 PORTAL CONFIGURATION - BASED ON KNOWLEDGE BASE REGISTRY
// This matches the actual portal structure from knowledge/10-agent-registry/registry.json
const PORTAL_CONFIG = {
  // Core Administrative Portals
  superAdmin: {
    path: '/super-admin',
    title: 'Super Admin',
    description: 'System-wide administration and oversight',
    icon: Shield,
    color: 'bg-red-500',
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
    color: 'bg-blue-500',
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
    color: 'bg-green-500',
    roles: ['tms_admin', 'admin'],
    flag: 'portal.tmsAdmin.enabled',
    autonomous: true,
    component: null // Will use default layout
  },

  // Primary Business Portals - Based on knowledge base
  carrier: {
    path: '/carrier',
    title: 'Carrier Portal',
    description: 'Fleet management and load operations',
    icon: Truck,
    color: 'bg-blue-600',
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
    color: 'bg-purple-600',
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
    color: 'bg-orange-600',
    roles: ['shipper_admin', 'shipper_user', 'owner', 'admin'],
    flag: 'portal.shipper.enabled',
    autonomous: true,
    component: ShippersPortal
  },

  // Operational Portals
  driver: {
    path: '/driver',
    title: 'Driver Portal',
    description: 'Mobile-friendly driver operations',
    icon: Car,
    color: 'bg-yellow-600',
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
    color: 'bg-indigo-600',
    roles: ['owner_operator', 'carrier_admin', 'broker_admin', 'shipper_admin'],
    flag: 'portal.ownerOperator.enabled',
    autonomous: true,
    component: null
  },

  // Financial Portals
  factoring: {
    path: '/factoring',
    title: 'Factoring Portal',
    description: 'Invoice factoring and cash flow management',
    icon: DollarSign,
    color: 'bg-green-600',
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
    color: 'bg-emerald-600',
    roles: ['finance', 'admin'],
    flag: 'portal.financials.enabled',
    autonomous: true,
    component: BillingPage
  },

  // Market and Trading Portals
  loadBoard: {
    path: '/load-board',
    title: 'Load Board',
    description: 'Load posting and matching marketplace',
    icon: Briefcase,
    color: 'bg-teal-600',
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
    color: 'bg-cyan-600',
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
    color: 'bg-pink-600',
    roles: ['broker_admin', 'carrier_admin', 'admin'],
    flag: 'portal.rates.enabled',
    autonomous: true,
    component: null
  },

  // Integration and Data Portals
  edi: {
    path: '/edi',
    title: 'EDI Portal',
    description: 'Electronic Data Interchange management',
    icon: Network,
    color: 'bg-violet-600',
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
    color: 'bg-slate-600',
    roles: ['analytics_admin', 'analytics_user', 'admin', 'owner'],
    flag: 'portal.analytics.enabled',
    autonomous: true,
    component: AnalyticsPage
  },

  // Management Portals
  crm: {
    path: '/crm',
    title: 'CRM Portal',
    description: 'Customer relationship management',
    icon: Users,
    color: 'bg-rose-600',
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
    color: 'bg-amber-600',
    roles: ['all'],
    flag: 'portal.directory.enabled',
    autonomous: true,
    component: null
  },

  // Autonomous and AI Portals
  autonomous: {
    path: '/autonomous',
    title: 'Autonomous Portal',
    description: 'AI agent management and monitoring',
    icon: Brain,
    color: 'bg-gradient-to-r from-purple-600 to-pink-600',
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
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    roles: ['admin', 'devops'],
    flag: 'portal.workers.enabled',
    autonomous: true,
    component: null
  },

  // Onboarding Portal
  onboarding: {
    path: '/onboarding',
    title: 'Onboarding Portal',
    description: 'User onboarding and setup wizard',
    icon: User,
    color: 'bg-gradient-to-r from-green-600 to-emerald-600',
    roles: ['all'],
    flag: 'portal.onboarding.enabled',
    autonomous: true,
    component: OnboardingReviewDashboard
  },

  // Software Company Portal (Special)
  softwareCompany: {
    path: '/software-company',
    title: 'Software Company Dashboard',
    description: 'Software company management and development',
    icon: Monitor,
    color: 'bg-gradient-to-r from-purple-600 to-blue-600',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Logistics Lynx</h1>
                  <p className="text-purple-200 text-sm">Autonomous TMS Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Cog className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search portals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="text-white"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="text-white"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/10">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.key}
                  value={category.key}
                  className="text-white data-[state=active]:bg-white/20"
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
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  viewMode === 'grid' 
                    ? 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20' 
                    : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
                }`}
                onClick={() => navigate(portal.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${portal.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {portal.autonomous && (
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                        <Brain className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-white text-lg font-semibold mt-3">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {portal.roles.slice(0, 2).map((role, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-gray-300 border-gray-600">
                          {role}
                        </Badge>
                      ))}
                      {portal.roles.length > 2 && (
                        <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
                          +{portal.roles.length - 2}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Autonomous System Status */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Autonomous System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-200">Master Agent: Active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-200">Development System: Running</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-purple-200">AI Optimization: Enabled</span>
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

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-center mb-4">
              Please log in to access the autonomous portal system.
            </p>
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Main Portal Selection */}
        <Route path="/" element={<AutonomousPortalSelector />} />

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