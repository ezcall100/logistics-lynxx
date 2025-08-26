import React, { useState, useEffect } from 'react';
import { ResponsiveCard, EnhancedButton, stableStyles } from '../../../components/ui';
import { EnhancedProgress } from '../../../components/ui/EnhancedUIComponents';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Activity, 
  Settings,
  RefreshCw,
  Eye,
  Download,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'threat' | 'warning' | 'info' | 'success';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  description: string;
  user?: string;
  ip?: string;
  action?: string;
}

interface ComplianceCheck {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  category: string;
  description: string;
  lastChecked: string;
  nextCheck: string;
}

interface ThreatMetrics {
  totalThreats: number;
  criticalThreats: number;
  highThreats: number;
  mediumThreats: number;
  lowThreats: number;
  blockedAttempts: number;
  successfulBreaches: number;
  securityScore: number;
}

const SecurityAudit: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [threatMetrics, setThreatMetrics] = useState<ThreatMetrics>({
    totalThreats: 0,
    criticalThreats: 0,
    highThreats: 0,
    mediumThreats: 0,
    lowThreats: 0,
    blockedAttempts: 0,
    successfulBreaches: 0,
    securityScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    loadSecurityData();
    const interval = setInterval(loadSecurityData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const loadSecurityData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await Promise.all([
        loadSecurityEvents(),
        loadComplianceChecks(),
        loadThreatMetrics()
      ]);
    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSecurityEvents = async () => {
    // Simulate security events data
    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'threat',
        severity: 'critical',
        source: 'External IP',
        description: 'Multiple failed login attempts detected',
        user: 'unknown@external.com',
        ip: '192.168.1.100',
        action: 'IP blocked'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'warning',
        severity: 'medium',
        source: '',
        description: 'Unusual query pattern detected',
        user: 'admin@company.com',
        ip: '10.0.0.50',
        action: 'Investigation required'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        type: 'info',
        severity: 'low',
        source: 'API Gateway',
        description: 'Rate limit exceeded for user',
        user: 'user@company.com',
        ip: '10.0.0.25',
        action: 'Rate limited'
      }
    ];
    setSecurityEvents(mockEvents);
  };

  const loadComplianceChecks = async () => {
    const mockCompliance: ComplianceCheck[] = [
      {
        id: '1',
        name: 'SOC 2 II Compliance',
        status: 'pass',
        category: 'Compliance',
        description: 'Security controls and processes audit',
        lastChecked: new Date().toISOString(),
        nextCheck: new Date(Date.now() + 86400000).toISOString()
      },
      {
        id: '2',
        name: 'GDPR Compliance',
        status: 'pass',
        category: 'Privacy',
        description: 'Data protection and privacy controls',
        lastChecked: new Date().toISOString(),
        nextCheck: new Date(Date.now() + 86400000).toISOString()
      },
      {
        id: '3',
        name: 'PCI DSS Compliance',
        status: 'warning',
        category: 'Payment Security',
        description: 'Payment card industry security standards',
        lastChecked: new Date().toISOString(),
        nextCheck: new Date(Date.now() + 86400000).toISOString()
      },
      {
        id: '4',
        name: 'HIPAA Compliance',
        status: 'pending',
        category: 'Healthcare',
        description: 'Healthcare data protection standards',
        lastChecked: new Date(Date.now() - 86400000).toISOString(),
        nextCheck: new Date().toISOString()
      }
    ];
    setComplianceChecks(mockCompliance);
  };

  const loadThreatMetrics = async () => {
    const mockMetrics: ThreatMetrics = {
      totalThreats: 156,
      criticalThreats: 3,
      highThreats: 12,
      mediumThreats: 45,
      lowThreats: 96,
      blockedAttempts: 1247,
      successfulBreaches: 0,
      securityScore: 94
    };
    setThreatMetrics(mockMetrics);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-500';
      case 'fail': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <RefreshCw className="w-4 h-4 text-gray-500" />;
      default: return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Audit Center</h1>
          <p className="text-gray-600">Comprehensive security monitoring and compliance management</p>
        </div>
        <div className="flex items-center space-x-4">
          <EnhancedButton variant="outline" onClick={loadSecurityData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </EnhancedButton>
          <EnhancedButton>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </EnhancedButton>
        </div>
      </div>

      {/* Security Score Card */}
      <ResponsiveCard className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
              <p className="text-gray-600">Overall system security rating</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{threatMetrics.securityScore}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
          <EnhancedProgress value={threatMetrics.securityScore} className="mt-4" />
        </div>
      </ResponsiveCard>

      {/* Threat Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Threats</p>
                <p className="text-2xl font-bold text-gray-900">{threatMetrics.totalThreats}</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Threats</p>
                <p className="text-2xl font-bold text-red-600">{threatMetrics.criticalThreats}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked Attempts</p>
                <p className="text-2xl font-bold text-green-600">{threatMetrics.blockedAttempts}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Breaches</p>
                <p className="text-2xl font-bold text-gray-900">{threatMetrics.successfulBreaches}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </ResponsiveCard>
      </div>

      {/* Main Content Tabs */}
      <ResponsiveCard className="space-y-6">
        <div className="grid w-full grid-cols-4">
          <EnhancedButton variant="outline" value="events">Security Events</EnhancedButton>
          <EnhancedButton variant="outline" value="compliance">Compliance</EnhancedButton>
          <EnhancedButton variant="outline" value="analytics">Analytics</EnhancedButton>
          <EnhancedButton variant="outline" value="settings">Settings</EnhancedButton>
        </div>

                 <ResponsiveCard className="space-y-6">
          <div className="mb-4">
            <h3 className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Real-time Security Events</span>
            </h3>
          </div>
          <div>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)}`} />
                    <div>
                      <p className="font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        {event.source} • {event.user} • {event.ip}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{event.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

                 <ResponsiveCard className="space-y-6">
          <div className="mb-4">
            <h3 className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Compliance Status</span>
            </h3>
          </div>
          <div>
            <div className="space-y-4">
              {complianceChecks.map((check) => (
                <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="font-medium text-gray-900">{check.name}</p>
                      <p className="text-sm text-gray-500">{check.description}</p>
                      <p className="text-xs text-gray-400">
                        Last checked: {new Date(check.lastChecked).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {check.status.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Next: {new Date(check.nextCheck).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

                 <ResponsiveCard className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Threat Distribution</span>
                </h3>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Critical</span>
                    <span className="text-sm text-red-600 font-bold">{threatMetrics.criticalThreats}</span>
                  </div>
                  <EnhancedProgress value={(threatMetrics.criticalThreats / threatMetrics.totalThreats) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">High</span>
                    <span className="text-sm text-orange-600 font-bold">{threatMetrics.highThreats}</span>
                  </div>
                  <EnhancedProgress value={(threatMetrics.highThreats / threatMetrics.totalThreats) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Medium</span>
                    <span className="text-sm text-yellow-600 font-bold">{threatMetrics.mediumThreats}</span>
                  </div>
                  <EnhancedProgress value={(threatMetrics.mediumThreats / threatMetrics.totalThreats) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Low</span>
                    <span className="text-sm text-blue-600 font-bold">{threatMetrics.lowThreats}</span>
                  </div>
                  <EnhancedProgress value={(threatMetrics.lowThreats / threatMetrics.totalThreats) * 100} className="h-2" />
                </div>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Access Patterns</span>
                </h3>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Failed Logins</span>
                    <span className="text-sm text-red-600 font-bold">247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Suspicious IPs</span>
                    <span className="text-sm text-orange-600 font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Rate Limited</span>
                    <span className="text-sm text-yellow-600 font-bold">89</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Blocked Requests</span>
                    <span className="text-sm text-blue-600 font-bold">1,247</span>
                  </div>
                </div>
              </div>
            </ResponsiveCard>
          </div>
        </ResponsiveCard>

                 <ResponsiveCard className="space-y-6">
          <div className="mb-4">
            <h3 className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Security Settings</span>
            </h3>
          </div>
          <div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Monitoring</h4>
                  <p className="text-sm text-gray-500">Enable real-time security event monitoring</p>
                </div>
                <EnhancedButton variant="outline">Configure</EnhancedButton>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Alert Notifications</h4>
                  <p className="text-sm text-gray-500">Configure alert notification channels</p>
                </div>
                <EnhancedButton variant="outline">Configure</EnhancedButton>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Compliance Reporting</h4>
                  <p className="text-sm text-gray-500">Set up automated compliance reports</p>
                </div>
                <EnhancedButton variant="outline">Configure</EnhancedButton>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Threat Intelligence</h4>
                  <p className="text-sm text-gray-500">Configure threat intelligence feeds</p>
                </div>
                <EnhancedButton variant="outline">Configure</EnhancedButton>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </ResponsiveCard>
    </div>
  );
};

export default SecurityAudit;
