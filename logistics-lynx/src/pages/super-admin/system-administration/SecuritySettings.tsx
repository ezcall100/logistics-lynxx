import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Settings,
  RefreshCw,
  Download,
  Upload,
  Key,
  Fingerprint,
  Wifi,
  WifiOff,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Brain,
  Zap,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Save,
  RotateCcw,
  ShieldCheck,
  ShieldX,
  AlertCircle,
  Info,
  User,
  Users,
  Globe,
  Server,
  Database,
  Network,
  HardDrive,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecurityRule {
  id: string;
  name: string;
  type: 'firewall' | 'authentication' | 'encryption' | 'access' | 'monitoring';
  status: 'active' | 'inactive' | 'warning';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lastUpdated: string;
  mcpAgentId?: string;
  confidenceScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'data_access' | 'system_change' | 'threat_detected' | 'backup' | 'update';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  status: 'pending' | 'investigating' | 'resolved' | 'false_positive';
  mcpAgentId?: string;
}

interface SecurityMetrics {
  overallScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  activeThreats: number;
  blockedAttempts: number;
  lastScan: string;
  nextScan: string;
  encryptionStatus: 'enabled' | 'disabled' | 'partial';
  firewallStatus: 'active' | 'inactive' | 'warning';
  authenticationStatus: 'secure' | 'warning' | 'vulnerable';
  backupStatus: 'current' | 'outdated' | 'failed';
  mcpAgentStatus: 'connected' | 'disconnected' | 'error';
}

interface SecurityScan {
  id: string;
  type: 'full' | 'quick' | 'targeted';
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  startTime: string;
  endTime?: string;
  threatsFound: number;
  vulnerabilitiesFound: number;
  recommendations: number;
  mcpAgentId: string;
}

const SecuritySettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<SecurityRule[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockRules: SecurityRule[] = [
    {
      id: 'rule-001',
      name: 'Two-Factor Authentication',
      type: 'authentication',
      status: 'active',
      priority: 'high',
      description: 'Enforce 2FA for all admin accounts',
      lastUpdated: '2024-01-15 14:30:00',
      mcpAgentId: 'agent-002',
      confidenceScore: 0.95,
      threatLevel: 'low'
    },
    {
      id: 'rule-002',
      name: 'Firewall Protection',
      type: 'firewall',
      status: 'active',
      priority: 'critical',
      description: 'Block unauthorized access attempts',
      lastUpdated: '2024-01-15 14:25:00',
      mcpAgentId: 'agent-001',
      confidenceScore: 0.98,
      threatLevel: 'low'
    },
    {
      id: 'rule-003',
      name: 'Data Encryption',
      type: 'encryption',
      status: 'active',
      priority: 'high',
      description: 'Encrypt all sensitive data at rest',
      lastUpdated: '2024-01-15 14:20:00',
      mcpAgentId: 'agent-003',
      confidenceScore: 0.92,
      threatLevel: 'low'
    },
    {
      id: 'rule-004',
      name: 'Access Control',
      type: 'access',
      status: 'warning',
      priority: 'medium',
      description: 'Monitor and control user access',
      lastUpdated: '2024-01-15 14:15:00',
      mcpAgentId: 'agent-004',
      confidenceScore: 0.87,
      threatLevel: 'medium'
    }
  ];

  const mockEvents: SecurityEvent[] = [
    {
      id: 'event-001',
      type: 'login_attempt',
      severity: 'warning',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected from IP 192.168.1.100',
      timestamp: '2024-01-15 14:35:00',
      source: 'Web Interface',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'New York, US',
      status: 'investigating',
      mcpAgentId: 'agent-002'
    },
    {
      id: 'event-002',
      type: 'threat_detected',
      severity: 'error',
      title: 'Suspicious Activity Detected',
      description: 'Unusual data access pattern detected in user database',
      timestamp: '2024-01-15 14:30:00',
      source: 'Database Monitor',
      status: 'investigating',
      mcpAgentId: 'agent-001'
    },
    {
      id: 'event-003',
      type: 'backup',
      severity: 'info',
      title: 'Backup Completed Successfully',
      description: 'Daily backup completed with 100% success rate',
      timestamp: '2024-01-15 14:00:00',
      source: 'Backup System',
      status: 'resolved',
      mcpAgentId: 'agent-003'
    }
  ];

  const mockMetrics: SecurityMetrics = {
    overallScore: 94,
    threatLevel: 'low',
    activeThreats: 2,
    blockedAttempts: 156,
    lastScan: '2024-01-15 14:00:00',
    nextScan: '2024-01-15 16:00:00',
    encryptionStatus: 'enabled',
    firewallStatus: 'active',
    authenticationStatus: 'secure',
    backupStatus: 'current',
    mcpAgentStatus: 'connected'
  };

  const mockScans: SecurityScan[] = [
    {
      id: 'scan-001',
      type: 'full',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15 14:00:00',
      endTime: '2024-01-15 14:45:00',
      threatsFound: 0,
      vulnerabilitiesFound: 2,
      recommendations: 5,
      mcpAgentId: 'agent-001'
    },
    {
      id: 'scan-002',
      type: 'quick',
      status: 'running',
      progress: 65,
      startTime: '2024-01-15 14:30:00',
      threatsFound: 0,
      vulnerabilitiesFound: 0,
      recommendations: 0,
      mcpAgentId: 'agent-002'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRules(mockRules);
      setEvents(mockEvents);
      setMetrics(mockMetrics);
      setScans(mockScans);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Shield className="h-8 w-8 mr-3 text-red-600" />
            Security Settings
          </h1>
              <p className="text-xl text-gray-600">
                TransBot AI - Enterprise Security Control Center
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Security Overview */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Security Score</p>
                  <p className={`text-3xl font-bold ${getThreatLevelColor(metrics.threatLevel)}`}>
                    {metrics.overallScore}/100
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Active Threats</p>
                  <p className="text-3xl font-bold text-red-600">{metrics.activeThreats}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -3 from yesterday
              </div>
      </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Blocked Attempts</p>
                  <p className="text-3xl font-bold text-orange-600">{metrics.blockedAttempts}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Last 24 hours
              </div>
        </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
        <div>
                  <p className="text-sm font-medium text-red-600">Threat Level</p>
                  <p className={`text-3xl font-bold ${getThreatLevelColor(metrics.threatLevel)}`}>
                    {metrics.threatLevel.toUpperCase()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                System secure
              </div>
            </div>
          </div>
        )}

        {/* Security Status */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Encryption</h3>
                <Lock className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 capitalize">{metrics.encryptionStatus}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Firewall</h3>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 capitalize">{metrics.firewallStatus}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Authentication</h3>
                <Key className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 capitalize">{metrics.authenticationStatus}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Backup</h3>
                <Database className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 capitalize">{metrics.backupStatus}</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'rules', name: 'Security Rules', icon: Shield },
                { id: 'events', name: 'Security Events', icon: AlertTriangle },
                { id: 'scans', name: 'Security Scans', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* MCP Agent Performance */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-600" />
                    MCP Security Agents
                  </h3>
                  <div className="space-y-4">
                    {rules.filter(rule => rule.mcpAgentId).map((rule) => (
                      <div key={rule.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(rule.status)}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{rule.name}</p>
                            <p className="text-sm text-gray-500">{rule.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{(rule.confidenceScore * 100).toFixed(0)}%</p>
                          <p className="text-xs text-gray-500 capitalize">{rule.threatLevel}</p>
                        </div>
                      </div>
                    ))}
                  </div>
            </div>

                {/* Recent Security Events */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Recent Security Events
              </h3>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                        <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(event.severity)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.severity)}`}>
                              {event.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security Rules</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(rule.status)}`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{rule.name}</h4>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <p className="text-xs text-gray-500">Last updated: {rule.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                          {rule.priority}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security Events</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border">
                      <div className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(event.severity)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Source: {event.source}</span>
                          <span>Time: {event.timestamp}</span>
                          {event.ipAddress && <span>IP: {event.ipAddress}</span>}
                          {event.location && <span>Location: {event.location}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scans' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security Scans</h3>
              <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Scan
                  </Button>
                </div>
                <div className="space-y-4">
                  {scans.map((scan) => (
                    <div key={scan.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900 capitalize">{scan.type} Scan</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            scan.status === 'completed' ? 'bg-green-100 text-green-800' :
                            scan.status === 'running' ? 'bg-blue-100 text-blue-800' :
                            scan.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {scan.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Started: {scan.startTime}
                        </div>
                      </div>
                      
                      {scan.status === 'running' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{scan.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${scan.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{scan.threatsFound}</p>
                          <p className="text-gray-600">Threats Found</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{scan.vulnerabilitiesFound}</p>
                          <p className="text-gray-600">Vulnerabilities</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{scan.recommendations}</p>
                          <p className="text-gray-600">Recommendations</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button className="h-20 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Security Scan</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Access Control</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Key className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Authentication</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Database className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Backup & Restore</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
