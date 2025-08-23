import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { AuthProvider, useAuth } from './context/auth/AuthProvider';

// Add debug logging
console.log('App.tsx: Starting application...');

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

import LoginPage from './pages/auth/LoginPage';
import { AutonomousPortalSelector } from './components/portal/AutonomousPortalSelector';
import ErrorBoundary from './components/common/ErrorBoundary';

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
  console.log('AppContent: Component rendering...');
  
  // Temporary simple component for testing
  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Trans Bot AI - Development Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Current URL: {window.location.href}</p>
      <p>Hash: {window.location.hash}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Test Navigation:</h2>
        <a href="#/" style={{ marginRight: '10px', color: 'blue' }}>Home</a>
        <a href="#/super-admin" style={{ marginRight: '10px', color: 'blue' }}>Super Admin</a>
        <a href="#/carrier" style={{ marginRight: '10px', color: 'blue' }}>Carrier</a>
        <a href="#/broker" style={{ marginRight: '10px', color: 'blue' }}>Broker</a>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Info:</h3>
        <p>User Agent: {navigator.userAgent}</p>
        <p>Window Size: {window.innerWidth} x {window.innerHeight}</p>
      </div>
    </div>
  );
}

// 🎯 MAIN APP WRAPPER
function App() {
  console.log('App: Main App component rendering...');
  
  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
