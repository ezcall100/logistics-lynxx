// ========================
// 🔒 Security Scanner Dashboard
// ========================
import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Progress } from '../../../components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity, BarChart3, FileText, RefreshCw, Download, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';

interface SecurityScan {
  id: string;
  timestamp: string;
  type: 'vulnerability' | 'compliance' | 'threat' | 'configuration';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'running' | 'completed' | 'failed';
  target: string;
  findings: number;
  riskScore: number;
  description: string;
  agentId?: string;
}

interface SecurityFinding {
  id: string;
  scanId: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  cve?: string;
  cvss?: number;
  status: 'open' | 'investigating' | 'mitigated' | 'resolved';
  createdAt: string;
  updatedAt: string;
  agentId?: string;
}

interface AgentAuditLog {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details: string;
}

interface SecurityMetrics {
  totalScans: number;
  activeScans: number;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  averageRiskScore: number;
  securityScore: number;
  lastScanTime: string;
  nextScheduledScan: string;
}

const SecurityScannerDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [securityFindings, setSecurityFindings] = useState<SecurityFinding[]>([]);
  const [agentAuditLogs, setAgentAuditLogs] = useState<AgentAuditLog[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalScans: 0,
    activeScans: 0,
    criticalFindings: 0,
    highFindings: 0,
    mediumFindings: 0,
    lowFindings: 0,
    averageRiskScore: 0,
    securityScore: 0,
    lastScanTime: '',
    nextScheduledScan: ''
  });

  useEffect(() => {
    loadSecurityData();
    const interval = setInterval(() => {
      if (autoRefresh) {
        loadSecurityData();
      }
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [selectedTimeframe, autoRefresh]);

  const loadSecurityData = async () => {
    setIsLoading(true);
    try {
      // Simulate MCP API calls
      await Promise.all([
        loadSecurityScans(),
        loadSecurityFindings(),
        loadAgentAuditLogs(),
        loadSecurityMetrics()
      ]);
    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSecurityScans = async () => {
    // Simulate MCP API call: GET /agent/logs?type=security
    const mockScans: SecurityScan[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'vulnerability',
        severity: 'high',
        status: 'completed',
        target: 'transbotai.com',
        findings: 3,
        riskScore: 7.5,
        description: 'Vulnerability scan completed',
        agentId: 'agent-001'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'compliance',
        severity: 'medium',
        status: 'running',
        target: 'api.transbotai.com',
        findings: 1,
        riskScore: 4.2,
        description: 'Compliance scan in progress',
        agentId: 'agent-002'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'threat',
        severity: 'critical',
        status: 'completed',
        target: 'mcp.transbotai.com',
        findings: 5,
        riskScore: 9.1,
        description: 'Threat detection scan',
        agentId: 'agent-003'
      }
    ];
    setSecurityScans(mockScans);
  };

  const loadSecurityFindings = async () => {
    const mockFindings: SecurityFinding[] = [
      {
        id: '1',
        scanId: '1',
        type: 'SQL Injection',
        severity: 'high',
        title: 'Potential SQL Injection Vulnerability',
        description: 'Input validation missing in login endpoint',
        cve: 'CVE-2023-1234',
        cvss: 8.5,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        agentId: 'agent-001'
      },
      {
        id: '2',
        scanId: '1',
        type: 'XSS',
        severity: 'medium',
        title: 'Cross-Site Scripting Vulnerability',
        description: 'User input not properly sanitized',
        cve: 'CVE-2023-5678',
        cvss: 6.2,
        status: 'investigating',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
        agentId: 'agent-001'
      }
    ];
    setSecurityFindings(mockFindings);
  };

  const loadAgentAuditLogs = async () => {
    // Simulate MCP API call: GET /agent/logs
    const mockLogs: AgentAuditLog[] = [
      {
        id: '1',
        agentId: 'agent-001',
        agentName: 'Security Scanner Agent',
        action: 'SCAN_STARTED',
        resource: '/api/security/scan',
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.100',
        userAgent: 'MCP-Agent/1.0',
        success: true,
        details: 'Vulnerability scan initiated'
      },
      {
        id: '2',
        agentId: 'agent-002',
        agentName: 'Compliance Agent',
        action: 'COMPLIANCE_CHECK',
        resource: '/api/compliance/check',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        ipAddress: '192.168.1.101',
        userAgent: 'MCP-Agent/1.0',
        success: true,
        details: 'GDPR compliance check completed'
      }
    ];
    setAgentAuditLogs(mockLogs);
  };

  const loadSecurityMetrics = async () => {
    // Simulate MCP API call: GET /agent/metrics
    const mockMetrics: SecurityMetrics = {
      totalScans: 156,
      activeScans: 2,
      criticalFindings: 3,
      highFindings: 7,
      mediumFindings: 12,
      lowFindings: 25,
      averageRiskScore: 6.8,
      securityScore: 85,
      lastScanTime: new Date().toISOString(),
      nextScheduledScan: new Date(Date.now() + 3600000).toISOString()
    };
    setSecurityMetrics(mockMetrics);
  };

  const startNewScan = async (scanType: string) => {
    try {
      // Simulate MCP API call: POST /agent/scan
      console.log(`Starting ${scanType} scan...`);
      await loadSecurityData();
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  const exportSecurityReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: securityMetrics,
      scans: securityScans,
      findings: securityFindings,
      auditLogs: agentAuditLogs
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Chart data
  const findingsData = [
    { name: 'Critical', value: securityMetrics.criticalFindings, color: '#ef4444' },
    { name: 'High', value: securityMetrics.highFindings, color: '#f97316' },
    { name: 'Medium', value: securityMetrics.mediumFindings, color: '#eab308' },
    { name: 'Low', value: securityMetrics.lowFindings, color: '#22c55e' }
  ];

  const scanTrendData = [
    { time: '00:00', scans: 5, findings: 12 },
    { time: '04:00', scans: 8, findings: 18 },
    { time: '08:00', scans: 12, findings: 25 },
    { time: '12:00', scans: 15, findings: 30 },
    { time: '16:00', scans: 10, findings: 22 },
    { time: '20:00', scans: 6, findings: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Security Scanner Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time security scanning, agent audit logs, and risk metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
                variant="outline"
              </Button>size="sm"
            onClick={() =>setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
          ></Button>
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto' : 'Manual'}
            <Download className="h-4 w-4 mr-2" />
            Export
        </div>
      </div>

      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Security Score</h3>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{securityMetrics.securityScore}%</div>
            <Progress value={securityMetrics.securityScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {securityMetrics.securityScore >= 80 ? 'Excellent' : 
               securityMetrics.securityScore >= 60 ? 'Good' : 'Needs Attention'}
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Scans</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{securityMetrics.activeScans}</div>
            <p className="text-xs text-muted-foreground">
              {securityMetrics.totalScans} total scans
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Critical Findings</h3>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{securityMetrics.criticalFindings}</div>
            <p className="text-xs text-muted-foreground">
              {securityMetrics.highFindings} high priority
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Average Risk Score</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{securityMetrics.averageRiskScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Scale: 0-10 (10 = highest risk)
            </p>
          </div>
        </ResponsiveCard>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="scans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scans">Security Scans</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="audit">Agent Audit Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scans" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Security Scans</h3>
                  <p className="text-slate-600 dark:text-slate-400">Active and completed security scans</p>
                </div>
                <div className="flex space-x-2">
                    <Search className="h-4 w-4 mr-2" />
                    Vulnerability Scan
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance Scan
                </div>
              </div>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{scan.type}</span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{scan.target}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {scan.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {scan.severity}
                        </span>
                      </TableCell>
                      <TableCell>{scan.findings}</TableCell>
                      <TableCell>{scan.riskScore.toFixed(1)}</TableCell>
                      <TableCell className="font-mono text-xs">{scan.agentId}</TableCell>
                      <TableCell>
                        {new Date(scan.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Security Findings</h3>
              <p className="text-slate-600 dark:text-slate-400">Detailed security vulnerabilities and issues</p>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>CVSS</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityFindings.map((finding) => (
                    <TableRow key={finding.id}>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{finding.type}</span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{finding.title}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {finding.severity}
                        </span>
                      </TableCell>
                      <TableCell>{finding.cvss?.toFixed(1) || 'N/A'}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{finding.status}</span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{finding.agentId}</TableCell>
                      <TableCell>
                        {new Date(finding.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Agent Audit Logs</h3>
              <p className="text-slate-600 dark:text-slate-400">Real-time agent activity and security events</p>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.agentName}</div>
                          <div className="text-xs text-muted-foreground font-mono">{log.agentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{log.action}</span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>
                        {log.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Findings Distribution</h3>
                <p className="text-slate-600 dark:text-slate-400">Breakdown of security findings by severity</p>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={findingsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {findingsData.map((entry) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Scan Activity Trend</h3>
                <p className="text-slate-600 dark:text-slate-400">Security scan activity over time</p>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scanTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="scans" stroke="#8884d8" name="Scans" />
                    <Line type="monotone" dataKey="findings" stroke="#82ca9d" name="Findings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ResponsiveCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityScannerDashboard;
