import React, { useState, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  RefreshCw,
  Download,
  Eye,
  Settings,
  HelpCircle,
  Archive,
  Server,
  Gauge,
  AlertCircle,
  AlertOctagon,
  PowerOff,
  Plus
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedTable,
  EnhancedSearch,
  EnhancedProgress,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  category: string;
  source: string;
  timestamp: string;
  assignedTo?: string;
  priority: number;
  impact: string;
  resolution?: string;
  tags: string[];
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

interface IncidentReport {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  startTime: string;
  endTime?: string;
  duration?: number;
  affectedServices: string[];
  impact: string;
  resolution?: string;
  assignee?: string;
}

const SystemAlerts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);

  console.log('🚨 SystemAlerts component is rendering!');

  // Mock data
  const mockAlerts: SystemAlert[] = [
    {
      id: 'ALT001',
      title: 'High CPU Usage Detected',
      description: 'Server CPU usage has exceeded 90% for the past 5 minutes',
      severity: 'high',
      status: 'active',
      category: 'performance',
      source: 'web-server-01',
      timestamp: '2024-01-15 14:30:00',
      assignedTo: 'John Doe',
      priority: 1,
      impact: 'Potential service degradation',
      tags: ['performance', 'cpu', 'server']
    },
    {
      id: 'ALT002',
      title: 'Connection Pool Exhausted',
      description: 'All database connections are currently in use',
      severity: 'critical',
      status: 'acknowledged',
      category: 'database',
      source: 'db-cluster-01',
      timestamp: '2024-01-15 14:25:00',
      assignedTo: 'Jane Smith',
      priority: 1,
      impact: 'Service unavailable',
      resolution: 'Increased connection pool size',
      tags: ['database', 'connection', 'critical']
    },
    {
      id: 'ALT003',
      title: 'SSL Certificate Expiring Soon',
      description: 'SSL certificate will expire in 7 days',
      severity: 'medium',
      status: 'active',
      category: 'security',
      source: 'load-balancer-01',
      timestamp: '2024-01-15 14:20:00',
      priority: 2,
      impact: 'Potential service interruption',
      tags: ['security', 'ssl', 'certificate']
    },
    {
      id: 'ALT004',
      title: 'Disk Space Low',
      description: 'Available disk space is below 10%',
      severity: 'medium',
      status: 'resolved',
      category: 'storage',
      source: 'file-server-01',
      timestamp: '2024-01-15 14:15:00',
      assignedTo: 'Mike Johnson',
      priority: 2,
      impact: 'Potential data loss',
      resolution: 'Cleaned up temporary files',
      tags: ['storage', 'disk', 'space']
    },
    {
      id: 'ALT005',
      title: 'Latency Increased',
      description: 'Average response time has increased by 200ms',
      severity: 'low',
      status: 'active',
      category: 'network',
      source: 'cdn-edge-01',
      timestamp: '2024-01-15 14:10:00',
      priority: 3,
      impact: 'Slight performance degradation',
      tags: ['network', 'latency', 'performance']
    }
  ];

  const mockSystemHealth: SystemHealth[] = [
    {
      component: 'Web Server Cluster',
      status: 'healthy',
      uptime: 99.98,
      responseTime: 45,
      lastCheck: '2024-01-15 14:35:00',
      metrics: {
        cpu: 65,
        memory: 78,
        disk: 45,
        network: 92
      }
    },
    {
      component: 'Cluster',
      status: 'warning',
      uptime: 99.95,
      responseTime: 120,
      lastCheck: '2024-01-15 14:35:00',
      metrics: {
        cpu: 85,
        memory: 92,
        disk: 78,
        network: 88
      }
    },
    {
      component: 'Load Balancer',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 12,
      lastCheck: '2024-01-15 14:35:00',
      metrics: {
        cpu: 25,
        memory: 45,
        disk: 30,
        network: 95
      }
    },
    {
      component: 'File Storage',
      status: 'critical',
      uptime: 99.90,
      responseTime: 250,
      lastCheck: '2024-01-15 14:35:00',
      metrics: {
        cpu: 95,
        memory: 98,
        disk: 95,
        network: 75
      }
    },
    {
      component: 'CDN Edge Servers',
      status: 'healthy',
      uptime: 99.97,
      responseTime: 35,
      lastCheck: '2024-01-15 14:35:00',
      metrics: {
        cpu: 40,
        memory: 55,
        disk: 20,
        network: 98
      }
    }
  ];

  const mockIncidents: IncidentReport[] = [
    {
      id: 'INC001',
      title: 'Connection Issues',
      description: 'Multiple database connection failures causing service outages',
      severity: 'critical',
      status: 'investigating',
      startTime: '2024-01-15 14:25:00',
      affectedServices: ['User Management', 'Payment Processing', 'Analytics'],
      impact: 'Service unavailable for 15 minutes',
      assignee: 'Jane Smith'
    },
    {
      id: 'INC002',
      title: 'High CPU Usage on Web Servers',
      description: 'Sustained high CPU usage affecting response times',
      severity: 'high',
      status: 'open',
      startTime: '2024-01-15 14:30:00',
      affectedServices: ['Web Application', 'API Services'],
      impact: 'Increased response times',
      assignee: 'John Doe'
    },
    {
      id: 'INC003',
      title: 'SSL Certificate Renewal',
      description: 'SSL certificate renewal process',
      severity: 'medium',
      status: 'resolved',
      startTime: '2024-01-15 10:00:00',
      endTime: '2024-01-15 10:15:00',
      duration: 15,
      affectedServices: ['Load Balancer'],
      impact: 'Brief service interruption',
      resolution: 'Certificate successfully renewed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setSystemHealth(mockSystemHealth);
      setIncidents(mockIncidents);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      case 'high':
        return <EnhancedBadge variant="warning" mode={mode}>High</EnhancedBadge>;
      case 'medium':
        return <EnhancedBadge variant="default" mode={mode}>Medium</EnhancedBadge>;
      case 'low':
        return <EnhancedBadge variant="default" mode={mode}>Low</EnhancedBadge>;
      case 'info':
        return <EnhancedBadge variant="success" mode={mode}>Info</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <EnhancedBadge variant="danger" mode={mode}>Active</EnhancedBadge>;
      case 'acknowledged':
        return <EnhancedBadge variant="warning" mode={mode}>Acknowledged</EnhancedBadge>;
      case 'resolved':
        return <EnhancedBadge variant="success" mode={mode}>Resolved</EnhancedBadge>;
      case 'dismissed':
        return <EnhancedBadge variant="default" mode={mode}>Dismissed</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'offline':
        return <PowerOff className="w-5 h-5 text-gray-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getIncidentStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <EnhancedBadge variant="danger" mode={mode}>Open</EnhancedBadge>;
      case 'investigating':
        return <EnhancedBadge variant="warning" mode={mode}>Investigating</EnhancedBadge>;
      case 'resolved':
        return <EnhancedBadge variant="success" mode={mode}>Resolved</EnhancedBadge>;
      case 'closed':
        return <EnhancedBadge variant="default" mode={mode}>Closed</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const alertColumns = [
    {
      key: 'title',
      title: 'Title',
      sortable: true,
      render: (_: string, row: SystemAlert) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.title}
          </div>
          <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            {row.description}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {row.tags.map((tag) => (
              <span key={index} className={`text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 ${stableStyles.textSecondary[mode]}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (value: string) => getSeverityBadge(value)
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      render: (_: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          Performance
        </div>
      )
    },
    {
      key: 'source',
      title: 'Source',
      sortable: true,
      render: (_: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          web-server-01
        </div>
      )
    },
    {
      key: 'timestamp',
      title: 'Timestamp',
      sortable: true,
      render: (_: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          2024-01-15 14:30:00
        </div>
      )
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      sortable: true,
      render: (_: any, row: SystemAlert) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {row.assignedTo || 'Unassigned'}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, __: SystemAlert) => (
        <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
          >
            View
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<CheckCircle className="w-4 h-4" />}
            mode={mode}
          >
            Acknowledge
          </EnhancedButton>
        </div>
      )
    }
  ];

  const incidentColumns = [
    {
      key: 'title',
      title: 'Incident',
      sortable: true,
      render: (_: string, row: IncidentReport) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.title}
          </div>
          <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            {row.description}
          </div>
        </div>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (value: string) => getSeverityBadge(value)
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getIncidentStatusBadge(value)
    },
    {
      key: 'startTime',
      title: 'Start Time',
      sortable: true,
      render: (_: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          2024-01-15 14:25:00
        </div>
      )
    },
    {
      key: 'duration',
      title: 'Duration',
      sortable: true,
      render: (_: any, row: IncidentReport) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {row.duration ? `${row.duration} min` : 'Ongoing'}
        </div>
      )
    },
    {
      key: 'assignee',
      title: 'Assignee',
      sortable: true,
      render: (_: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          Unassigned
        </div>
      )
    }
  ];

  const metrics = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
    resolvedAlerts: alerts.filter(a => a.status === 'resolved').length,
    systemUptime: Math.min(...systemHealth.map(h => h.uptime)),
    avgResponseTime: Math.round(systemHealth.reduce((sum, h) => sum + h.responseTime, 0) / systemHealth.length),
    openIncidents: incidents.filter(i => i.status === 'open' || i.status === 'investigating').length
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              System Alerts
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Real-time monitoring and incident management
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Report
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              mode={mode}
            >
              Refresh
            </EnhancedButton>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Active Alerts
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.activeAlerts}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className={`text-sm font-medium text-red-600`}>
                    {metrics.criticalAlerts} critical
                  </span>
                </div>
              </div>
              <Bell className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.activeAlerts / metrics.totalAlerts) * 100}
                max={100}
                mode={mode}
                variant="danger"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  System Uptime
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.systemUptime.toFixed(2)}%
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={`text-sm font-medium text-green-600`}>
                    All systems operational
                  </span>
                </div>
              </div>
              <Server className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={metrics.systemUptime}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Avg Response Time
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.avgResponseTime}ms
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className={`text-sm font-medium text-blue-600`}>
                    Good performance
                  </span>
                </div>
              </div>
              <Gauge className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.avgResponseTime / 500) * 100}
                max={100}
                mode={mode}
                variant="default"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Open Incidents
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.openIncidents}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className={`text-sm font-medium text-orange-600`}>
                    Under investigation
                  </span>
                </div>
              </div>
              <AlertOctagon className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.openIncidents / 10) * 100}
                max={100}
                mode={mode}
                variant="warning"
              />
            </div>
          </EnhancedCard>
        </div>

        {/* System Health Overview */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              System Health Overview
            </h3>
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Gauge className="w-4 h-4" />}
              mode={mode}
            >
              View Details
            </EnhancedButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemHealth.map((health) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                    {health.component}
                  </h4>
                  {getHealthStatusIcon(health.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={stableStyles.textSecondary[mode]}>Uptime:</span>
                    <span className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                      {health.uptime.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={stableStyles.textSecondary[mode]}>Response:</span>
                    <span className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                      {health.responseTime}ms
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={stableStyles.textSecondary[mode]}>CPU</span>
                      <span className={stableStyles.textSecondary[mode]}>{health.metrics.cpu}%</span>
                    </div>
                    <EnhancedProgress
                      value={health.metrics.cpu}
                      max={100}
                      mode={mode}
                      variant={health.metrics.cpu > 80 ? "danger" : health.metrics.cpu > 60 ? "warning" : "success"}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={stableStyles.textSecondary[mode]}>Memory</span>
                      <span className={stableStyles.textSecondary[mode]}>{health.metrics.memory}%</span>
                    </div>
                    <EnhancedProgress
                      value={health.metrics.memory}
                      max={100}
                      mode={mode}
                      variant={health.metrics.memory > 80 ? "danger" : health.metrics.memory > 60 ? "warning" : "success"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </EnhancedCard>

        {/* Active Alerts */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              Active Alerts
            </h3>
            <div className="flex space-x-2">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>
              <EnhancedSearch
                placeholder="alerts..."
                value={searchQuery}
                onChange={setSearchQuery}
                mode={mode}
              />
            </div>
          </div>

          <EnhancedTable
            columns={alertColumns}
            data={alerts}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No alerts found"
          />
        </EnhancedCard>

        {/* Recent Incidents */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              Recent Incidents
            </h3>
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<AlertCircle className="w-4 h-4" />}
              mode={mode}
            >
              View All
            </EnhancedButton>
          </div>

          <EnhancedTable
            columns={incidentColumns}
            data={incidents}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No incidents found"
          />
        </EnhancedCard>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Create Alert</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<CheckCircle className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Acknowledge All</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Archive className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Archive Old</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Export Data</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Settings</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<HelpCircle className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Help</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default SystemAlerts;
