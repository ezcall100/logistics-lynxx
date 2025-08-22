import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

// Import the enhanced Super Admin layout components
import EnhancedSuperAdminLayout from './EnhancedSuperAdminLayout';

// Import MCP Design System
import '@/styles/mcp-design-system.css';

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

// Icons from lucide-react
import { 
  Brain, Shield, Users, Settings, Database, Globe, Activity, 
  BarChart3, Lock, Search, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Server, Network, Zap, Eye, EyeOff, RefreshCw,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  LogOut, Sun, Moon, ChevronDown, ChevronLeft, ChevronRight,
  Home, Building2, Phone, Mail, MapPin, Calendar, DollarSign,
  Truck, Package, Car, Briefcase, Calculator, FileText,
  ShieldCheck, Key, Fingerprint, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Folder, Cog, Wrench, UserCheck, UserX, ShieldX,
  ArrowUpRight, ArrowDownRight, Minus, XCircle,
  Link, Heart, TrendingDown, PieChart,
  LineChart, BarChart4, ScatterChart, ActivitySquare,
  CalendarDays, Target, Award, Trophy,
  Share, Unlock, Settings2,
     LayoutDashboard, Code, Bug, Palette, Maximize2, Menu,
   CircuitBoard, BookOpen, HelpCircle, Rocket, Command
} from 'lucide-react';

// Custom Logo Components
import TransBotLogo from '../ui/TransBotLogo';
import TransBotHeaderLogo from './ui/TransBotHeaderLogo';

// Autonomous System Integration
const AutonomousSystem = {
  status: 'operational',
  agents: {
    total: 24,
    active: 22,
    idle: 2,
    error: 0
  },
  performance: {
    cpu: 68,
    memory: 72,
    storage: 45,
    network: 89
  },
  alerts: [
    { id: 1, type: 'info', message: 'System optimization in progress', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '10 min ago' }
  ]
};

// Import engineering agent pages
import FrontendDeveloperPage from './pages/FrontendDeveloperPage';
import BackendAPIPage from './pages/BackendAPIPage';
import QATestingPage from './pages/QATestingPage';
import UIUXDesignerPage from './pages/UIUXDesignerPage';
import DevOpsPage from './pages/DevOpsPage';
import DatabaseOptimizerPage from './pages/DatabaseOptimizerPage';
import SecurityScannerPage from './pages/SecurityScannerPage';
import PerformanceMonitorPage from './pages/PerformanceMonitorPage';

// Import autonomous dashboard page
import AutonomousDashboardPage from '../../pages/AutonomousDashboardPage';

// Import user management page
import UserManagementPage from '../../pages/super-admin/UserManagementPage';

// Import system control pages
import SystemHealthPage from '../../pages/SystemHealthPage';
import DatabaseAdminPage from '../../pages/super-admin/DatabaseAdminPage';
import NetworkConfigPage from '../../pages/super-admin/NetworkConfigPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import BackupRestorePage from './pages/system-admin/BackupRestorePage';
import PortalOverviewPage from './pages/PortalOverviewPage';
import AllPortalsPage from './pages/AllPortalsPage';
import PortalCategoriesPage from './pages/PortalCategoriesPage';
import PortalMonitoringPage from './pages/PortalMonitoringPage';
import PortalSettingsPage from './pages/PortalSettingsPage';
import PortalAnalyticsPage from './pages/PortalAnalyticsPage';
import PortalSecurityPage from './pages/PortalSecurityPage';
import PortalBackupPage from './pages/PortalBackupPage';
import PortalUsersPage from './pages/PortalUsersPage';
import PortalConfigurationsPage from './pages/PortalConfigurationsPage';

// Import analytics and reports pages
import AnalyticsReportsPage from './pages/AnalyticsReportsPage';

// Import profile and settings pages
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Import MCP control pages
import MCPControlCenter from './pages/MCPControlCenter';
import MCPIntroductionPage from './pages/MCPIntroductionPage';
import MCPFeaturesPage from './pages/MCPFeaturesPage';
import MCPIntegrationsPage from './pages/MCPIntegrationsPage';
import MCPDocumentationPage from './pages/MCPDocumentationPage';
import MCPSupportPage from './pages/MCPSupportPage';
import MCPAgentRegistryPage from './pages/MCPAgentRegistryPage';
import MCPSystemMonitorPage from './pages/MCPSystemMonitorPage';
import MCPSecurityHubPage from './pages/MCPSecurityHubPage';
import MCPPerformanceAnalyticsPage from './pages/MCPPerformanceAnalyticsPage';
import MCPConfigurationManagerPage from './pages/MCPConfigurationManagerPage';
import MCPBackupRecoveryPage from './pages/MCPBackupRecoveryPage';
import MCPAPIGatewayPage from './pages/MCPAPIGatewayPage';
import MCPLogManagementPage from './pages/MCPLogManagementPage';
import MCPAlertCenterPage from './pages/MCPAlertCenterPage';
import MCPDeploymentManagerPage from './pages/MCPDeploymentManagerPage';
import MCPCommanderPage from './pages/MCPCommanderPage';

// Import dashboard page
import DashboardPage from './pages/DashboardPage';

const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <EnhancedSuperAdminLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/autonomous/*" element={
              <AuthProvider>
                <AutonomousDashboardPage />
              </AuthProvider>
            } />
            <Route path="/users/*" element={<UserManagementPage />} />
            <Route path="/portals/overview" element={<PortalOverviewPage />} />
            <Route path="/portals/all" element={<AllPortalsPage />} />
            <Route path="/portals/categories" element={<PortalCategoriesPage />} />
            <Route path="/portals/monitoring" element={<PortalMonitoringPage />} />
            <Route path="/portals/settings" element={<PortalSettingsPage />} />
            <Route path="/portals/analytics" element={<PortalAnalyticsPage />} />
            <Route path="/portals/security" element={<PortalSecurityPage />} />
            <Route path="/portals/backup" element={<PortalBackupPage />} />
            <Route path="/portals/users" element={<PortalUsersPage />} />
            <Route path="/portals/configurations" element={<PortalConfigurationsPage />} />
            <Route path="/portals" element={<PortalOverviewPage />} />
            <Route path="/analytics/*" element={<AnalyticsReportsPage />} />
            {/* System Control Pages */}
            <Route path="/system" element={<DashboardPage />} />
            <Route path="/system/health" element={<SystemHealthPage />} />
            <Route path="/system/database" element={<DatabaseAdminPage />} />
            <Route path="/system/network" element={<NetworkConfigPage />} />
            <Route path="/system/security" element={<SecurityCenterPage />} />
            <Route path="/system/backup" element={<BackupRestorePage />} />
            {/* Engineering Suite Pages */}
            <Route path="/engineering" element={<DashboardPage />} />
            <Route path="/engineering/frontend" element={<FrontendDeveloperPage />} />
            <Route path="/engineering/backend" element={<BackendAPIPage />} />
            <Route path="/engineering/qa" element={<QATestingPage />} />
            <Route path="/engineering/design" element={<UIUXDesignerPage />} />
            <Route path="/engineering/devops" element={<DevOpsPage />} />
            <Route path="/engineering/database" element={<DatabaseOptimizerPage />} />
            <Route path="/engineering/security" element={<SecurityScannerPage />} />
            <Route path="/engineering/performance" element={<PerformanceMonitorPage />} />
            {/* Profile and Settings Pages */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/mcp" element={<MCPControlCenter />} />
            <Route path="/mcp/introduction" element={<MCPIntroductionPage />} />
            <Route path="/mcp/features" element={<MCPFeaturesPage />} />
            <Route path="/mcp/integrations" element={<MCPIntegrationsPage />} />
            <Route path="/mcp/documentation" element={<MCPDocumentationPage />} />
            <Route path="/mcp/support" element={<MCPSupportPage />} />
            <Route path="/mcp/agent-registry" element={<MCPAgentRegistryPage />} />
            <Route path="/mcp/system-monitor" element={<MCPSystemMonitorPage />} />
            <Route path="/mcp/security-hub" element={<MCPSecurityHubPage />} />
            <Route path="/mcp/performance-analytics" element={<MCPPerformanceAnalyticsPage />} />
            <Route path="/mcp/configuration" element={<MCPConfigurationManagerPage />} />
            <Route path="/mcp/backup-recovery" element={<MCPBackupRecoveryPage />} />
            <Route path="/mcp/api-gateway" element={<MCPAPIGatewayPage />} />
            <Route path="/mcp/log-management" element={<MCPLogManagementPage />} />
            <Route path="/mcp/alert-center" element={<MCPAlertCenterPage />} />
            <Route path="/mcp/deployment" element={<MCPDeploymentManagerPage />} />
            <Route path="/mcp/commander" element={<MCPCommanderPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </EnhancedSuperAdminLayout>
  );
};

export default EnhancedSuperAdminPortal;

