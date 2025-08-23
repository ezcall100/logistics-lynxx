import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { AuthProvider, useAuth } from './context/auth/AuthProvider';

// 🚀 AUTONOMOUS PORTAL SYSTEM - BASED ON KNOWLEDGE BASE
// This system follows the actual portal structure from the knowledge base

// Core Portal Components - Based on knowledge base registry
import EnhancedSuperAdminPortal from './components/super-admin/EnhancedSuperAdminPortal';
import MCPControlCenter from './components/super-admin/pages/MCPControlCenter';
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
import { AutonomousPortalSelector } from './components/portal/AutonomousPortalSelector';

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

// Portal configuration moved to separate component file

// Portal configuration moved to separate component file

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
        {/* Super Admin Portal with nested routes */}
        <Route path="/super-admin" element={<EnhancedSuperAdminPortal />}>
          {/* Default -> MCP intro */}
          <Route index element={<Navigate to="mcp/introduction" replace />} />
          <Route path="mcp/*" element={<MCPControlCenter />} />
          {/* Safety net */}
          <Route path="*" element={<Navigate to="mcp/introduction" replace />} />
        </Route>
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

        {/* Global fallback → Super Admin */}
        <Route path="*" element={<Navigate to="/super-admin" replace />} />
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