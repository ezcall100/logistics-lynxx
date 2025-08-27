import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Users, Database, Activity, RefreshCw, Download, Target, Circle, Triangle } from 'lucide-react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedBadge, 
  EnhancedTable, 
  // EnhancedSearch, 
  EnhancedProgress, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_change' | 'data_access' | 'system_change' | 'security_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  ip: string;
  location: string;
  timestamp: string;
  description: string;
  status: 'resolved' | 'investigating' | 'open';
  details: string;
}

interface Vulnerability {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'authentication' | 'authorization' | 'data_protection' | 'network' | 'application' | 'infrastructure';
  status: 'open' | 'investigating' | 'mitigated' | 'resolved';
  discovered: string;
  description: string;
  impact: string;
  recommendation: string;
  cve?: string;
  cvss?: number;
}

interface ComplianceCheck {
  id: string;
  name: string;
  category: 'gdpr' | 'soc2' | 'hipaa' | 'pci' | 'iso27001';
  status: 'pass' | 'fail' | 'warning' | 'not_applicable';
  lastCheck: string;
  nextCheck: string;
  description: string;
  requirements: string[];
}

const SecurityAudit: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  // const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockSecurityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'failed_login',
      severity: 'medium',
      user: 'unknown@example.com',
      ip: '192.168.1.100',
      location: 'New York, NY',
      timestamp: '2024-01-15 14:30:00',
      description: 'Multiple failed login attempts detected',
      status: 'investigating',
      details: '5 failed attempts from IP 192.168.1.100'
    },
    {
      id: '2',
      type: 'permission_change',
      severity: 'high',
      user: 'admin@company.com',
      ip: '10.0.0.50',
      location: 'San Francisco, CA',
      timestamp: '2024-01-15 13:45:00',
      description: 'User permissions modified',
      status: 'resolved',
      details: 'User john.doe@company.com granted admin privileges'
    },
    {
      id: '3',
      type: 'data_access',
      severity: 'low',
      user: 'user@company.com',
      ip: '10.0.0.25',
      location: 'Chicago, IL',
      timestamp: '2024-01-15 12:15:00',
      description: 'Sensitive data accessed',
      status: 'open',
      details: 'Access to customer database records'
    }
  ];

  const mockVulnerabilities: Vulnerability[] = [
    {
      id: '1',
      title: 'SQL Injection Vulnerability',
      severity: 'high',
      category: 'application',
      status: 'investigating',
      discovered: '2024-01-15',
      description: 'Potential SQL injection vulnerability in user input validation',
      impact: 'Could allow unauthorized database access',
      recommendation: 'Implement proper input validation and use parameterized queries',
      cve: 'CVE-2024-0001',
      cvss: 8.5
    },
    {
      id: '2',
      title: 'Weak Password Policy',
      severity: 'medium',
      category: 'authentication',
      status: 'open',
      discovered: '2024-01-14',
      description: 'Password policy allows weak passwords',
      impact: 'Increased risk of account compromise',
      recommendation: 'Enforce stronger password requirements',
      cvss: 5.5
    }
  ];

  const mockComplianceChecks: ComplianceCheck[] = [
    {
      id: '1',
      name: 'Data Encryption at Rest',
      category: 'soc2',
      status: 'pass',
      lastCheck: '2024-01-15 10:00:00',
      nextCheck: '2024-01-22 10:00:00',
      description: 'Verify all sensitive data is encrypted at rest',
      requirements: ['AES-256 encryption', 'Key rotation', 'Access controls']
    },
    {
      id: '2',
      name: 'User Access Reviews',
      category: 'gdpr',
      status: 'warning',
      lastCheck: '2024-01-14 15:30:00',
      nextCheck: '2024-01-21 15:30:00',
      description: 'Quarterly user access reviews',
      requirements: ['Review all user permissions', 'Remove unused accounts', 'Document changes']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSecurityEvents(mockSecurityEvents);
      setVulnerabilities(mockVulnerabilities);
      setComplianceChecks(mockComplianceChecks);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      case 'high':
        return <EnhancedBadge variant="danger" mode={mode}>High</EnhancedBadge>;
      case 'medium':
        return <EnhancedBadge variant="warning" mode={mode}>Medium</EnhancedBadge>;
      case 'low':
        return <EnhancedBadge variant="default" mode={mode}>Low</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <EnhancedBadge variant="success" mode={mode}>Resolved</EnhancedBadge>;
      case 'investigating':
        return <EnhancedBadge variant="warning" mode={mode}>Investigating</EnhancedBadge>;
      case 'open':
        return <EnhancedBadge variant="danger" mode={mode}>Open</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <EnhancedBadge variant="success" mode={mode}>Pass</EnhancedBadge>;
      case 'fail':
        return <EnhancedBadge variant="danger" mode={mode}>Fail</EnhancedBadge>;
      case 'warning':
        return <EnhancedBadge variant="warning" mode={mode}>Warning</EnhancedBadge>;
      case 'not_applicable':
        return <EnhancedBadge variant="default" mode={mode}>N/A</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const securityEventColumns = [
    {
      key: 'timestamp',
      title: 'Time',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textPrimary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    },
    {
      key: 'type',
      title: 'Event Type',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
          {value.replace('_', ' ').toUpperCase()}
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
      key: 'user',
      title: 'User/IP',
      sortable: true,
      render: (_value: string, row: SecurityEvent) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.user}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.ip}
          </div>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    }
  ];

  const vulnerabilityColumns = [
    {
      key: 'title',
      title: 'Vulnerability',
      sortable: true,
      render: (_value: string, row: Vulnerability) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.title}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.category.replace('_', ' ').toUpperCase()}
          </div>
        </div>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (_value: string, row: Vulnerability) => (
        <div>
          {getSeverityBadge(_value)}
          {row.cvss && (
            <div className={`text-xs ${stableStyles.textMuted[mode]} mt-1`}>
              CVSS: {row.cvss}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'discovered',
      title: 'Discovered',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'impact',
      title: 'Impact',
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    }
  ];

  const complianceColumns = [
    {
      key: 'name',
      title: 'Check Name',
      sortable: true,
      render: (_value: string, row: ComplianceCheck) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.name}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.category.toUpperCase()}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getComplianceStatusBadge(value)
    },
    {
      key: 'lastCheck',
      title: 'Last Check',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    },
    {
      key: 'nextCheck',
      title: 'Next Check',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    }
  ];

  const securityMetrics = {
    totalEvents: securityEvents.length,
    criticalEvents: securityEvents.filter(e => e.severity === 'critical').length,
    highEvents: securityEvents.filter(e => e.severity === 'high').length,
    openVulnerabilities: vulnerabilities.filter(v => v.status === 'open').length,
    compliancePass: complianceChecks.filter(c => c.status === 'pass').length,
    complianceFail: complianceChecks.filter(c => c.status === 'fail').length
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              Security Audit
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Comprehensive security monitoring and compliance reporting
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
              Run Scan
            </EnhancedButton>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Total Security Events
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {securityMetrics.totalEvents}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(securityMetrics.totalEvents / 100) * 100}
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
                  Critical Events
                </p>
                <p className={`text-2xl font-bold ${getSeverityColor('critical')}`}>
                  {securityMetrics.criticalEvents}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(securityMetrics.criticalEvents / 10) * 100}
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
                  Open Vulnerabilities
                </p>
                <p className={`text-2xl font-bold ${getSeverityColor('high')}`}>
                  {securityMetrics.openVulnerabilities}
                </p>
              </div>
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(securityMetrics.openVulnerabilities / 5) * 100}
                max={100}
                mode={mode}
                variant="warning"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Compliance Pass Rate
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textAccent[mode]}`}>
                  {Math.round((securityMetrics.compliancePass / complianceChecks.length) * 100)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(securityMetrics.compliancePass / complianceChecks.length) * 100}
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
                  Failed Compliance
                </p>
                <p className={`text-2xl font-bold ${getSeverityColor('high')}`}>
                  {securityMetrics.complianceFail}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(securityMetrics.complianceFail / complianceChecks.length) * 100}
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
                  Security Score
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textAccent[mode]}`}>
                  85/100
                </p>
              </div>
              <Target className="w-8 h-8 text-teal-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={85}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>
        </div>

        {/* Security Events */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              Recent Security Events
            </h2>
            <div className="flex space-x-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                mode={mode}
              >
                Export
              </EnhancedButton>
            </div>
          </div>
          
          <EnhancedTable
            columns={securityEventColumns}
            data={securityEvents}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No security events found"
          />
        </EnhancedCard>

        {/* Vulnerabilities and Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vulnerabilities */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Security Vulnerabilities
              </h2>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Shield className="w-4 h-4" />}
                mode={mode}
              >
                View All
              </EnhancedButton>
            </div>
            
            <EnhancedTable
              columns={vulnerabilityColumns}
              data={vulnerabilities}
              mode={mode}
              sortable
              loading={loading}
              emptyMessage="No vulnerabilities found"
            />
          </EnhancedCard>

          {/* Compliance Checks */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Compliance Checks
              </h2>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<CheckCircle className="w-4 h-4" />}
                mode={mode}
              >
                View All
              </EnhancedButton>
            </div>
            
            <EnhancedTable
              columns={complianceColumns}
              data={complianceChecks}
              mode={mode}
              sortable
              loading={loading}
              emptyMessage="No compliance checks found"
            />
          </EnhancedCard>
        </div>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Security Actions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Shield className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Vulnerability Scan</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Users className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Access Review</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Lock className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Password Audit</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Database className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Data Audit</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<CheckCircle className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Compliance Check</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Generate Report</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default SecurityAudit;
