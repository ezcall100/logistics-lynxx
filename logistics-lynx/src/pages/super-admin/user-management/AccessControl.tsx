import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Shield, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe, 
  User,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Settings,
  Activity,
  Brain,
  Zap,
  Eye,
  EyeOff,
  Wifi,
  WifiOff,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  ShieldX
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccessRule {
  id: string;
  name: string;
  type: 'ip_whitelist' | 'ip_blacklist' | 'geo_restriction' | 'time_based' | 'device_restriction' | 'session_limit';
  status: 'active' | 'inactive' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  conditions: string[];
  affectedUsers: number;
  lastModified: string;
  createdBy: string;
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  confidenceScore?: number;
  aiGenerated: boolean;
}

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'access_denied' | 'suspicious_activity' | 'policy_violation' | 'threat_detected';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  confidenceScore?: number;
  aiAnalyzed: boolean;
}

interface AccessMetrics {
  totalRules: number;
  activeRules: number;
  blockedAttempts: number;
  suspiciousActivities: number;
  avgResponseTime: number;
  securityScore: number;
  rulesByType: {
    type: string;
    count: number;
    percentage: number;
  }[];
  eventsBySeverity: {
    severity: string;
    count: number;
    percentage: number;
  }[];
  mcpAgentMetrics: {
    agentId: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    confidenceScore: number;
    threatsDetected: number;
    avgResponseTime: number;
    automationRate: number;
  }[];
}

const AccessControl: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<AccessRule[]>([]);
  const [filteredRules, setFilteredRules] = useState<AccessRule[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<AccessMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockRules: AccessRule[] = [
    {
      id: 'RULE-001',
      name: 'Office IP Whitelist',
      type: 'ip_whitelist',
      status: 'active',
      priority: 'high',
      description: 'Allow access only from office IP addresses',
      conditions: ['192.168.1.0/24', '10.0.0.0/8'],
      affectedUsers: 45,
      lastModified: '2024-01-15 10:30:00',
      createdBy: 'admin@company.com',
      mcpAgentId: 'agent-security-001',
      agentStatus: 'online',
      confidenceScore: 0.95,
      aiGenerated: true
    },
    {
      id: 'RULE-002',
      name: 'High-Risk Country Block',
      type: 'geo_restriction',
      status: 'active',
      priority: 'critical',
      description: 'Block access from high-risk countries',
      conditions: ['Country: Russia', 'Country: North Korea', 'Country: Iran'],
      affectedUsers: 0,
      lastModified: '2024-01-14 16:45:00',
      createdBy: 'security@company.com',
      mcpAgentId: 'agent-security-002',
      agentStatus: 'online',
      confidenceScore: 0.98,
      aiGenerated: true
    },
    {
      id: 'RULE-003',
      name: 'Business Hours Access',
      type: 'time_based',
      status: 'active',
      priority: 'medium',
      description: 'Restrict access to business hours only',
      conditions: ['Time: 9:00 AM - 6:00 PM', 'Days: Monday-Friday'],
      affectedUsers: 23,
      lastModified: '2024-01-13 14:20:00',
      createdBy: 'admin@company.com',
      mcpAgentId: 'agent-security-003',
      agentStatus: 'busy',
      confidenceScore: 0.87,
      aiGenerated: false
    },
    {
      id: 'RULE-004',
      name: 'Suspicious IP Blacklist',
      type: 'ip_blacklist',
      status: 'active',
      priority: 'high',
      description: 'Block known malicious IP addresses',
      conditions: ['185.220.101.0/24', '45.95.147.0/24'],
      affectedUsers: 0,
      lastModified: '2024-01-15 08:15:00',
      createdBy: 'security@company.com',
      mcpAgentId: 'agent-security-001',
      agentStatus: 'online',
      confidenceScore: 0.92,
      aiGenerated: true
    },
    {
      id: 'RULE-005',
      name: 'Session Limit Policy',
      type: 'session_limit',
      status: 'inactive',
      priority: 'low',
      description: 'Limit concurrent sessions per user',
      conditions: ['Max Sessions: 3', 'Timeout: 30 minutes'],
      affectedUsers: 12,
      lastModified: '2024-01-12 11:30:00',
      createdBy: 'admin@company.com',
      mcpAgentId: 'agent-security-002',
      agentStatus: 'online',
      confidenceScore: 0.76,
      aiGenerated: false
    }
  ];

  const mockEvents: SecurityEvent[] = [
    {
      id: 'EVENT-001',
      type: 'suspicious_activity',
      severity: 'high',
      user: 'john.doe@company.com',
      ipAddress: '185.220.101.45',
      location: 'Moscow, Russia',
      timestamp: '2024-01-15 14:30:00',
      description: 'Multiple failed login attempts from suspicious IP',
      status: 'investigating',
      mcpAgentId: 'agent-security-001',
      agentStatus: 'online',
      confidenceScore: 0.94,
      aiAnalyzed: true
    },
    {
      id: 'EVENT-002',
      type: 'access_denied',
      severity: 'medium',
      user: 'unknown',
      ipAddress: '192.168.1.100',
      location: 'San Francisco, CA',
      timestamp: '2024-01-15 13:45:00',
      description: 'Access denied due to time-based restriction',
      status: 'resolved',
      mcpAgentId: 'agent-security-002',
      agentStatus: 'online',
      confidenceScore: 0.88,
      aiAnalyzed: true
    },
    {
      id: 'EVENT-003',
      type: 'threat_detected',
      severity: 'critical',
      user: 'admin@company.com',
      ipAddress: '10.0.0.50',
      location: 'New York, NY',
      timestamp: '2024-01-15 12:15:00',
      description: 'Potential data exfiltration attempt detected',
      status: 'open',
      mcpAgentId: 'agent-security-003',
      agentStatus: 'busy',
      confidenceScore: 0.97,
      aiAnalyzed: true
    },
    {
      id: 'EVENT-004',
      type: 'policy_violation',
      severity: 'low',
      user: 'jane.smith@company.com',
      ipAddress: '172.16.0.25',
      location: 'Chicago, IL',
      timestamp: '2024-01-15 11:30:00',
      description: 'User accessed restricted area outside business hours',
      status: 'resolved',
      mcpAgentId: 'agent-security-001',
      agentStatus: 'online',
      confidenceScore: 0.82,
      aiAnalyzed: false
    },
    {
      id: 'EVENT-005',
      type: 'login_attempt',
      severity: 'medium',
      user: 'unknown',
      ipAddress: '45.95.147.123',
      location: 'Tehran, Iran',
      timestamp: '2024-01-15 10:00:00',
      description: 'Failed login attempt from blocked country',
      status: 'resolved',
      mcpAgentId: 'agent-security-002',
      agentStatus: 'online',
      confidenceScore: 0.96,
      aiAnalyzed: true
    }
  ];

  const mockMetrics: AccessMetrics = {
    totalRules: 15,
    activeRules: 12,
    blockedAttempts: 234,
    suspiciousActivities: 18,
    avgResponseTime: 2.5,
    securityScore: 92,
    rulesByType: [
      { type: 'IP Whitelist', count: 4, percentage: 26.7 },
      { type: 'IP Blacklist', count: 3, percentage: 20.0 },
      { type: 'Geo Restriction', count: 2, percentage: 13.3 },
      { type: 'Time Based', count: 3, percentage: 20.0 },
      { type: 'Device Restriction', count: 2, percentage: 13.3 },
      { type: 'Session Limit', count: 1, percentage: 6.7 }
    ],
    eventsBySeverity: [
      { severity: 'Critical', count: 3, percentage: 16.7 },
      { severity: 'High', count: 8, percentage: 44.4 },
      { severity: 'Medium', count: 5, percentage: 27.8 },
      { severity: 'Low', count: 2, percentage: 11.1 }
    ],
    mcpAgentMetrics: [
      {
        agentId: 'agent-security-001',
        name: 'Security Agent Alpha',
        status: 'online',
        confidenceScore: 0.95,
        threatsDetected: 12,
        avgResponseTime: 1.8,
        automationRate: 85
      },
      {
        agentId: 'agent-security-002',
        name: 'Security Agent Beta',
        status: 'online',
        confidenceScore: 0.88,
        threatsDetected: 8,
        avgResponseTime: 2.2,
        automationRate: 72
      },
      {
        agentId: 'agent-security-003',
        name: 'Security Agent Gamma',
        status: 'busy',
        confidenceScore: 0.92,
        threatsDetected: 15,
        avgResponseTime: 1.5,
        automationRate: 78
      }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRules(mockRules);
      setFilteredRules(mockRules);
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setMetrics(mockMetrics);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter rules based on search and filters
    let filtered = rules;

    if (searchQuery) {
      filtered = filtered.filter(rule =>
        rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(rule => rule.type === typeFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(rule => rule.status === statusFilter);
    }

    setFilteredRules(filtered);
  }, [rules, searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ip_whitelist': return <CheckCircle className="h-4 w-4" />;
      case 'ip_blacklist': return <XCircle className="h-4 w-4" />;
      case 'geo_restriction': return <Globe className="h-4 w-4" />;
      case 'time_based': return <Clock className="h-4 w-4" />;
      case 'device_restriction': return <Wifi className="h-4 w-4" />;
      case 'session_limit': return <User className="h-4 w-4" />;
      default: return <Key className="h-4 w-4" />;
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Access Control
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          IP restrictions, session management, security policies
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Access Control
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          IP restrictions, session management, security policies with AI-powered threat detection
        </p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rules</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalRules}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked Attempts</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{metrics.blockedAttempts}</p>
              </div>
              <ShieldX className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.securityScore}%</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
        <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{metrics.avgResponseTime}s</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      )}

      {/* MCP Agent Performance */}
      {metrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            MCP Security Agent Performance
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.mcpAgentMetrics.map((agent) => (
              <div key={agent.agentId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{agent.name}</h4>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{agent.status}</span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                    <span className="font-medium">{(agent.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Threats Detected:</span>
                    <span className="font-medium">{agent.threatsDetected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg Response:</span>
                    <span className="font-medium">{agent.avgResponseTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Automation:</span>
                    <span className="font-medium">{agent.automationRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Access Rules */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Access Control Rules ({filteredRules.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Rule
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Affected Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MCP Agent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          {rule.aiGenerated && (
                            <Zap className="h-4 w-4 text-yellow-500" title="AI Generated" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {rule.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {rule.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                      {getTypeIcon(rule.type)}
                      <span className="ml-1">{rule.type.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}>
                      {rule.status === 'active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {rule.affectedUsers}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {rule.mcpAgentId && (
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(rule.agentStatus || 'offline')}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {(rule.confidenceScore || 0) * 100}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Security Events ({filteredEvents.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MCP Agent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          {event.aiAnalyzed && (
                            <Zap className="h-4 w-4 text-yellow-500" title="AI Analyzed" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.type.replace('_', ' ')}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {event.user}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {event.ipAddress}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {event.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {event.mcpAgentId && (
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(event.agentStatus || 'offline')}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {(event.confidenceScore || 0) * 100}%
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
