import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  Wifi,
  HardDrive,
  Cpu,
  HardDriveIcon,
  WifiOff,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Settings,
  Bell,
  User,
  Users,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  MapPin,
  Globe,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  Shield as SecurityIcon,
  AlertTriangle as ThreatIcon,
  CheckCircle as SecureIcon,
  RefreshCw as RefreshIcon,
  Lock as LockIcon,
  Eye as ViewIcon,
  EyeOff as HideIcon,
  Key as KeyIcon,
  Fingerprint as BiometricIcon,
  Wifi as NetworkIcon,
  HardDrive as StorageIcon,
  Cpu as CpuIcon,
  WifiOff as OfflineIcon,
  AlertCircle as AlertIcon,
  Info as InfoIcon,
  ExternalLink as ExternalIcon,
  Copy as CopyIcon,
  Share2 as ShareIcon,
  Settings as ConfigIcon,
  Bell as NotificationIcon,
  User as UserIcon,
  Users as UsersIcon,
  Activity as ActivityIcon,
  BarChart3 as ChartIcon,
  TrendingUp as GrowthIcon,
  TrendingDown as DeclineIcon,
  Zap as PerformanceIcon,
  Clock as TimeIcon,
  MapPin as LocationIcon,
  Globe as GlobalIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Plus as AddIcon,
  X as CloseIcon,
  Edit,
  MoreHorizontal
} from 'lucide-react';

// Import MCP Design System
import '../../styles/mcp-design-system.css';

interface SecurityThreat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'brute_force' | 'ddos' | 'malware' | 'phishing' | 'suspicious_activity';
  source: string;
  target: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  description: string;
  ipAddress: string;
  location: string;
  riskScore: number;
  affectedUsers: number;
  mitigationStatus: 'pending' | 'in_progress' | 'completed';
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change';
  user: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  details: string;
  risk: 'low' | 'medium' | 'high';
  device: string;
  browser: string;
  success: boolean;
}

interface FirewallRule {
  id: string;
  name: string;
  protocol: string;
  port: string;
  source: string;
  destination: string;
  action: 'allow' | 'deny' | 'block';
  status: 'active' | 'inactive';
  priority: number;
  description: string;
  lastModified: string;
  createdBy: string;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'secure' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  currentValue: number;
}

const SecurityCenterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'maximum'>('high');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showThreatDialog, setShowThreatDialog] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreat | null>(null);
  
  // Enhanced security data
  const securityStats = {
    overallScore: 94,
    threatsBlocked: 1247,
    activeThreats: 3,
    resolvedThreats: 1244,
    securityEvents: 2847,
    failedLogins: 23,
    suspiciousActivities: 7,
    firewallRules: 156,
    activeRules: 142,
    lastScan: '2024-12-19 14:30:00',
    nextScan: '2024-12-19 16:30:00',
    uptime: '99.98%',
    responseTime: '0.8s'
  };

  const threats: SecurityThreat[] = [
    {
      id: '1',
      severity: 'high',
      type: 'brute_force',
      source: '192.168.1.100',
      target: 'Login System',
      timestamp: '2024-12-19 14:25:00',
      status: 'investigating',
      description: 'Multiple failed login attempts detected from suspicious IP',
      ipAddress: '192.168.1.100',
      location: 'New York, USA',
      riskScore: 85,
      affectedUsers: 12,
      mitigationStatus: 'in_progress'
    },
    {
      id: '2',
      severity: 'critical',
      type: 'ddos',
      source: 'Multiple IPs',
      target: 'Web Server',
      timestamp: '2024-12-19 13:45:00',
      status: 'active',
      description: 'Distributed Denial of Service attack detected',
      ipAddress: 'Multiple',
      location: 'Global',
      riskScore: 95,
      affectedUsers: 156,
      mitigationStatus: 'in_progress'
    },
    {
      id: '3',
      severity: 'medium',
      type: 'suspicious_activity',
      source: '10.0.0.50',
      target: 'Database',
      timestamp: '2024-12-19 12:30:00',
      status: 'resolved',
      description: 'Unusual database access pattern detected',
      ipAddress: '10.0.0.50',
      location: 'Internal Network',
      riskScore: 65,
      affectedUsers: 3,
      mitigationStatus: 'completed'
    }
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'failed_login',
      user: 'john.doe@company.com',
      ipAddress: '192.168.1.100',
      location: 'New York, USA',
      timestamp: '2024-12-19 14:25:00',
      details: '5 failed login attempts in 10 minutes',
      risk: 'high',
      device: 'Windows 11',
      browser: 'Chrome 120.0',
      success: false
    },
    {
      id: '2',
      type: 'login',
      user: 'admin@company.com',
      ipAddress: '10.0.0.10',
      location: 'Internal Network',
      timestamp: '2024-12-19 14:20:00',
      details: 'Successful login with 2FA',
      risk: 'low',
      device: 'MacOS',
      browser: 'Safari 17.0',
      success: true
    },
    {
      id: '3',
      type: 'permission_change',
      user: 'system@company.com',
      ipAddress: '10.0.0.1',
      location: 'Internal Network',
      timestamp: '2024-12-19 14:15:00',
      details: 'User role changed from User to Admin',
      risk: 'medium',
      device: 'Linux',
      browser: 'Firefox 121.0',
      success: true
    }
  ];

  const firewallRules: FirewallRule[] = [
    {
      id: '1',
      name: 'Allow HTTPS Traffic',
      protocol: 'TCP',
      port: '443',
      source: '0.0.0.0/0',
      destination: 'any',
      action: 'allow',
      status: 'active',
      priority: 1,
      description: 'Allow secure web traffic',
      lastModified: '2024-12-19 10:00:00',
      createdBy: 'admin@company.com'
    },
    {
      id: '2',
      name: 'Block Suspicious IPs',
      protocol: 'any',
      port: 'any',
      source: '192.168.1.100',
      destination: 'any',
      action: 'block',
      status: 'active',
      priority: 10,
      description: 'Block known malicious IP addresses',
      lastModified: '2024-12-19 14:25:00',
      createdBy: 'security@company.com'
    },
    {
      id: '3',
      name: 'Allow Internal Network',
      protocol: 'any',
      port: 'any',
      source: '10.0.0.0/8',
      destination: 'any',
      action: 'allow',
      status: 'active',
      priority: 5,
      description: 'Allow internal network traffic',
      lastModified: '2024-12-19 09:00:00',
      createdBy: 'admin@company.com'
    }
  ];

  const securityMetrics: SecurityMetric[] = [
    {
      id: '1',
      name: 'Threat Detection Rate',
      value: 98.5,
      unit: '%',
      status: 'secure',
      trend: 'up',
      threshold: 95,
      currentValue: 98.5
    },
    {
      id: '2',
      name: 'False Positive Rate',
      value: 2.1,
      unit: '%',
      status: 'secure',
      trend: 'down',
      threshold: 5,
      currentValue: 2.1
    },
    {
      id: '3',
      name: 'Response Time',
      value: 0.8,
      unit: 's',
      status: 'secure',
      trend: 'stable',
      threshold: 2,
      currentValue: 0.8
    },
    {
      id: '4',
      name: 'System Uptime',
      value: 99.98,
      unit: '%',
      status: 'secure',
      trend: 'up',
      threshold: 99.9,
      currentValue: 99.98
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'allow': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'deny': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'block': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const handleThreatAction = (threatId: string, action: string) => {
    // Handle threat actions
    console.log(`Action ${action} on threat ${threatId}`);
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || threat.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || threat.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <TooltipProvider>
      <div className="p-6 space-y-8">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                      Security Center
                    </h1>
                    <p className="text-lg text-red-100 mt-2">
                      Comprehensive security monitoring, threat detection, and incident response
                    </p>
                  </div>
                </div>
                
                {/* Security Status Indicators */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Security Score: {securityStats.overallScore}%</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm font-medium">{securityStats.activeThreats} Active Threats</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">{securityStats.threatsBlocked} Threats Blocked</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Scanning...' : 'Scan Now'}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Report
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Rule
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{securityStats.overallScore}%</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Security Score</p>
                  <p className="text-xs text-green-600 font-medium">Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/50">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{securityStats.activeThreats}</p>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">Active Threats</p>
                  <p className="text-xs text-red-600 font-medium">Requires attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{securityStats.threatsBlocked.toLocaleString()}</p>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Threats Blocked</p>
                  <p className="text-xs text-green-600 font-medium">Protected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{securityStats.securityEvents.toLocaleString()}</p>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Security Events</p>
                  <p className="text-xs text-green-600 font-medium">Monitored</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="threats" className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Threats</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger value="firewall" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Firewall</span>
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Metrics</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Security Health */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span>Security Health</span>
                      </CardTitle>
                      <CardDescription>Overall security posture and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Score</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {securityStats.overallScore}%
                          </Badge>
                        </div>
                        <Progress value={securityStats.overallScore} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Threat Detection</span>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            98.5%
                          </Badge>
                        </div>
                        <Progress value={98.5} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Response Time</span>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {securityStats.responseTime}
                          </Badge>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>Recent Alerts</span>
                      </CardTitle>
                      <CardDescription>Latest security alerts and notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium">DDoS Attack Detected</span>
                          </div>
                          <Badge className="bg-red-100 text-red-800">Critical</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium">Multiple Failed Logins</span>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">High</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">Security Scan Complete</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Threats Tab */}
              <TabsContent value="threats" className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search threats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Threats Table */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Security Threats</span>
                      <Badge variant="secondary">{filteredThreats.length} threats</Badge>
                    </CardTitle>
                    <CardDescription>Active and recent security threats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredThreats.map((threat) => (
                        <div key={threat.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                              <AlertTriangle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <p className="font-medium">{threat.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`text-xs ${getSeverityColor(threat.severity)}`}>
                                  {threat.severity}
                                </Badge>
                                <Badge className={`text-xs ${getStatusColor(threat.status)}`}>
                                  {threat.status}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {threat.ipAddress} • {threat.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">Risk: {threat.riskScore}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {threat.affectedUsers} users affected
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    setSelectedThreat(threat);
                                    setShowThreatDialog(true);
                                  }}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => handleThreatAction(threat.id, 'block')}>
                                    <Lock className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Block Source</TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span>Security Events</span>
                    </CardTitle>
                    <CardDescription>Recent security events and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Risk</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {securityEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{event.type.replace('_', ' ')}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{event.details}</p>
                              </div>
                            </TableCell>
                            <TableCell>{event.user}</TableCell>
                            <TableCell>{event.ipAddress}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>
                              <Badge className={getRiskColor(event.risk)}>
                                {event.risk}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {new Date(event.timestamp).toLocaleTimeString()}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {event.success ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <X className="w-4 h-4 text-red-600" />
                                )}
                                <span className="text-sm">{event.success ? 'Success' : 'Failed'}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Firewall Tab */}
              <TabsContent value="firewall" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="w-5 h-5 text-purple-600" />
                      <span>Firewall Rules</span>
                    </CardTitle>
                    <CardDescription>Configure and manage firewall rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {firewallRules.map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                              <Lock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <p className="font-medium">{rule.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{rule.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`text-xs ${getActionColor(rule.action)}`}>
                                  {rule.action}
                                </Badge>
                                <Badge className={`text-xs ${rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {rule.status}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {rule.protocol}:{rule.port}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Metrics Tab */}
              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {securityMetrics.map((metric) => (
                    <Card key={metric.id} className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{metric.name}</span>
                          <Badge className={
                            metric.status === 'secure' ? 'bg-green-100 text-green-800' :
                            metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {metric.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>Current performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Current Value</span>
                            <span className="text-sm font-medium">{metric.currentValue}{metric.unit}</span>
                          </div>
                          <Progress value={(metric.currentValue / metric.threshold) * 100} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Threshold: {metric.threshold}{metric.unit}</span>
                            <span className={`flex items-center space-x-1 ${
                              metric.trend === 'up' ? 'text-green-600' :
                              metric.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                            }`}>
                              {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                               metric.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                               <Activity className="w-3 h-3" />}
                              <span>{metric.trend}</span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SecurityCenterPage;
