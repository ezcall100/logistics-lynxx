import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, Activity,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Key, Wifi, HardDrive, Cpu,
  Memory, WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, BarChart3, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, PieChart, TrendingDown, Gauge, Zap,
  Virus, Bug, Skull, Crosshair, Target, Database,
  Network, WifiIcon, ShieldX, ShieldAlert, ShieldCheck as ShieldCheckIcon
} from 'lucide-react';

// Real data models
interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cveId?: string;
  cvssScore: number;
  affectedComponent: string;
  discoveredAt: string;
  status: 'open' | 'in_progress' | 'resolved' | 'false_positive';
  remediation: string;
  assignedTo?: string;
  tags: string[];
  exploitability: 'exploitable' | 'potentially_exploitable' | 'not_exploitable';
}

interface SecurityScan {
  id: string;
  name: string;
  type: 'full' | 'quick' | 'targeted' | 'compliance';
  target: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  startTime: string;
  endTime?: string;
  duration?: string;
  vulnerabilitiesFound: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  scanConfig: string;
  scanner: string;
}

interface ThreatIntelligence {
  id: string;
  threatName: string;
  threatType: 'malware' | 'phishing' | 'ddos' | 'apt' | 'ransomware' | 'insider';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  description: string;
  indicators: string[];
  firstSeen: string;
  lastSeen: string;
  affectedSystems: string[];
  status: 'active' | 'mitigated' | 'monitoring';
  iocType: 'ip' | 'domain' | 'url' | 'hash' | 'email';
}

interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'contained' | 'resolved' | 'closed';
  reportedAt: string;
  assignedTo?: string;
  affectedSystems: string[];
  impact: string;
  timeline: {
    timestamp: string;
    event: string;
    user: string;
  }[];
  evidence: string[];
  resolution?: string;
  lessonsLearned?: string;
}

interface ComplianceCheck {
  id: string;
  framework: 'SOC2' | 'ISO27001' | 'GDPR' | 'HIPAA' | 'PCI-DSS' | 'NIST';
  control: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  lastChecked: string;
  nextCheck: string;
  evidence: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  remediation?: string;
  owner: string;
}

// Mock API functions
const mockAPI = {
  getVulnerabilities: (): Promise<Vulnerability[]> => Promise.resolve([
    {
      id: 'vuln-001',
      title: 'SQL Injection in User Authentication',
      description: 'The login form is vulnerable to SQL injection attacks allowing unauthorized access.',
      severity: 'critical',
      cveId: 'CVE-2024-1234',
      cvssScore: 9.8,
      affectedComponent: '/api/auth/login',
      discoveredAt: '2024-01-15T10:30:00Z',
      status: 'open',
      remediation: 'Use parameterized queries and input validation',
      assignedTo: 'security-team',
      tags: ['sql-injection', 'authentication', 'api'],
      exploitability: 'exploitable'
    },
    {
      id: 'vuln-002',
      title: 'Cross-Site Scripting (XSS) in Dashboard',
      description: 'User input is not properly sanitized in the dashboard comments section.',
      severity: 'high',
      cveId: 'CVE-2024-1235',
      cvssScore: 7.5,
      affectedComponent: '/dashboard/comments',
      discoveredAt: '2024-01-14T15:45:00Z',
      status: 'in_progress',
      remediation: 'Implement proper input sanitization and CSP headers',
      assignedTo: 'frontend-team',
      tags: ['xss', 'dashboard', 'user-input'],
      exploitability: 'potentially_exploitable'
    },
    {
      id: 'vuln-003',
      title: 'Weak Password Policy',
      description: 'Password requirements are not strong enough to prevent brute force attacks.',
      severity: 'medium',
      cvssScore: 5.0,
      affectedComponent: 'User Registration System',
      discoveredAt: '2024-01-13T09:20:00Z',
      status: 'resolved',
      remediation: 'Enforce strong password requirements and rate limiting',
      assignedTo: 'security-team',
      tags: ['password-policy', 'authentication'],
      exploitability: 'potentially_exploitable'
    }
  ]),

  getSecurityScans: (): Promise<SecurityScan[]> => Promise.resolve([
    {
      id: 'scan-001',
      name: 'Weekly Full Security Scan',
      type: 'full',
      target: 'Production Environment',
      status: 'completed',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T10:30:00Z',
      duration: '2h 30m',
      vulnerabilitiesFound: 15,
      criticalCount: 2,
      highCount: 5,
      mediumCount: 6,
      lowCount: 2,
      scanConfig: 'comprehensive-security-scan',
      scanner: 'OWASP ZAP'
    },
    {
      id: 'scan-002',
      name: 'API Security Assessment',
      type: 'targeted',
      target: 'API Gateway',
      status: 'running',
      startTime: '2024-01-15T14:00:00Z',
      vulnerabilitiesFound: 0,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      scanConfig: 'api-security-scan',
      scanner: 'Burp Suite'
    },
    {
      id: 'scan-003',
      name: 'Compliance Check - SOC2',
      type: 'compliance',
      target: 'Entire System',
      status: 'scheduled',
      startTime: '2024-01-16T09:00:00Z',
      vulnerabilitiesFound: 0,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      scanConfig: 'soc2-compliance-scan',
      scanner: 'Qualys'
    }
  ]),

  getThreatIntelligence: (): Promise<ThreatIntelligence[]> => Promise.resolve([
    {
      id: 'threat-001',
      threatName: 'LokiBot Banking Trojan',
      threatType: 'malware',
      severity: 'high',
      source: 'CrowdStrike Intelligence',
      description: 'New variant of LokiBot targeting financial institutions and cryptocurrency exchanges.',
      indicators: ['192.168.1.100', 'malware.example.com', 'a1b2c3d4e5f6'],
      firstSeen: '2024-01-10T00:00:00Z',
      lastSeen: '2024-01-15T12:00:00Z',
      affectedSystems: ['web-servers', 'database-servers'],
      status: 'active',
      iocType: 'hash'
    },
    {
      id: 'threat-002',
      threatName: 'Phishing Campaign - Invoice Scam',
      threatType: 'phishing',
      severity: 'medium',
      source: 'Microsoft Defender',
      description: 'Targeted phishing campaign using fake invoice emails to steal credentials.',
      indicators: ['phishing.example.com', 'invoice@fakecompany.com'],
      firstSeen: '2024-01-12T00:00:00Z',
      lastSeen: '2024-01-15T18:00:00Z',
      affectedSystems: ['email-servers', 'user-workstations'],
      status: 'mitigated',
      iocType: 'domain'
    },
    {
      id: 'threat-003',
      threatName: 'DDoS Attack - Network Layer',
      threatType: 'ddos',
      severity: 'critical',
      source: 'Cloudflare',
      description: 'Large-scale DDoS attack targeting network infrastructure.',
      indicators: ['185.220.101.0/24', '45.95.147.0/24'],
      firstSeen: '2024-01-15T06:00:00Z',
      lastSeen: '2024-01-15T08:00:00Z',
      affectedSystems: ['load-balancers', 'web-servers'],
      status: 'active',
      iocType: 'ip'
    }
  ]),

  getSecurityIncidents: (): Promise<SecurityIncident[]> => Promise.resolve([
    {
      id: 'incident-001',
      title: 'Suspicious Login Attempts Detected',
      description: 'Multiple failed login attempts detected from unusual IP addresses.',
      severity: 'medium',
      status: 'investigating',
      reportedAt: '2024-01-15T16:30:00Z',
      assignedTo: 'security-analyst-1',
      affectedSystems: ['authentication-service', 'user-database'],
      impact: 'Potential account compromise risk',
      timeline: [
        {
          timestamp: '2024-01-15T16:30:00Z',
          event: 'Incident reported by SIEM',
          user: 'system'
        },
        {
          timestamp: '2024-01-15T16:35:00Z',
          event: 'Assigned to security analyst',
          user: 'security-manager'
        }
      ],
      evidence: ['SIEM logs', 'Authentication logs', 'IP geolocation data']
    },
    {
      id: 'incident-002',
      title: 'Data Exfiltration Attempt Blocked',
      description: 'Attempted unauthorized data export detected and blocked.',
      severity: 'high',
      status: 'contained',
      reportedAt: '2024-01-14T22:15:00Z',
      assignedTo: 'security-analyst-2',
      affectedSystems: ['database-server', 'file-server'],
      impact: 'No data loss - attempt was blocked',
      timeline: [
        {
          timestamp: '2024-01-14T22:15:00Z',
          event: 'Data exfiltration attempt detected',
          user: 'system'
        },
        {
          timestamp: '2024-01-14T22:16:00Z',
          event: 'Automated response triggered',
          user: 'system'
        },
        {
          timestamp: '2024-01-14T22:20:00Z',
          event: 'Incident contained',
          user: 'security-analyst-2'
        }
      ],
      evidence: ['Database access logs', 'Network traffic logs', 'User session data']
    }
  ]),

  getComplianceChecks: (): Promise<ComplianceCheck[]> => Promise.resolve([
    {
      id: 'comp-001',
      framework: 'SOC2',
      control: 'CC6.1 - Logical Access Security',
      description: 'Verify that logical access to systems is restricted to authorized users.',
      status: 'compliant',
      lastChecked: '2024-01-15T00:00:00Z',
      nextCheck: '2024-01-22T00:00:00Z',
      evidence: 'Access control logs, user provisioning procedures',
      riskLevel: 'low',
      owner: 'security-team'
    },
    {
      id: 'comp-002',
      framework: 'GDPR',
      control: 'Article 32 - Security of Processing',
      description: 'Ensure appropriate technical and organizational measures for data security.',
      status: 'partial',
      lastChecked: '2024-01-14T00:00:00Z',
      nextCheck: '2024-01-21T00:00:00Z',
      evidence: 'Encryption implementation, access controls',
      riskLevel: 'medium',
      remediation: 'Implement additional encryption for data at rest',
      owner: 'data-protection-officer'
    },
    {
      id: 'comp-003',
      framework: 'ISO27001',
      control: 'A.9.2.1 - User Registration and De-registration',
      description: 'Ensure proper user registration and de-registration procedures.',
      status: 'non_compliant',
      lastChecked: '2024-01-13T00:00:00Z',
      nextCheck: '2024-01-20T00:00:00Z',
      evidence: 'User management procedures review',
      riskLevel: 'high',
      remediation: 'Implement formal user registration process',
      owner: 'it-admin'
    }
  ])
};

const SecurityScannerPage = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([]);
  const [threatIntelligence, setThreatIntelligence] = useState<ThreatIntelligence[]>([]);
  const [securityIncidents, setSecurityIncidents] = useState<SecurityIncident[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [newScanDialog, setNewScanDialog] = useState(false);
  const [newVulnerabilityDialog, setNewVulnerabilityDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        vulns,
        scans,
        threats,
        incidents,
        compliance
      ] = await Promise.all([
        mockAPI.getVulnerabilities(),
        mockAPI.getSecurityScans(),
        mockAPI.getThreatIntelligence(),
        mockAPI.getSecurityIncidents(),
        mockAPI.getComplianceChecks()
      ]);

      setVulnerabilities(vulns);
      setSecurityScans(scans);
      setThreatIntelligence(threats);
      setSecurityIncidents(incidents);
      setComplianceChecks(compliance);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load security data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      case 'info': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-red-100 text-red-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartScan = () => {
    toast({
      title: "Security Scan Started",
      description: "New security scan has been initiated",
    });
    setNewScanDialog(false);
  };

  const handleAddVulnerability = () => {
    toast({
      title: "Vulnerability Added",
      description: "New vulnerability has been added to the system",
    });
    setNewVulnerabilityDialog(false);
  };

  const handleResolveVulnerability = (id: string) => {
    setVulnerabilities(prev => 
      prev.map(v => v.id === id ? { ...v, status: 'resolved' as const } : v)
    );
    toast({
      title: "Vulnerability Resolved",
      description: "Vulnerability has been marked as resolved",
    });
  };

  const handleUpdateIncidentStatus = (id: string, status: string) => {
    setSecurityIncidents(prev => 
      prev.map(i => i.id === id ? { ...i, status: status as any } : i)
    );
    toast({
      title: "Incident Updated",
      description: `Incident status updated to ${status}`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading security data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Scanner Agent</h1>
          <p className="text-muted-foreground">
            Comprehensive security monitoring, vulnerability management, and threat intelligence
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setNewScanDialog(true)}>
            <Play className="h-4 w-4 mr-2" />
            Start Scan
          </Button>
          <Button onClick={() => setNewVulnerabilityDialog(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Vulnerability
          </Button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vulnerabilities.length}</div>
            <p className="text-xs text-muted-foreground">
              {vulnerabilities.filter(v => v.severity === 'critical').length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityScans.filter(s => s.status === 'running').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {securityScans.filter(s => s.status === 'completed').length} completed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {threatIntelligence.filter(t => t.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {threatIntelligence.filter(t => t.severity === 'critical').length} critical threats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityIncidents.filter(i => i.status === 'open').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {securityIncidents.filter(i => i.severity === 'critical').length} critical incidents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="scans">Security Scans</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="incidents">Security Incidents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Management</CardTitle>
              <CardDescription>
                Track and manage security vulnerabilities across the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>CVSS Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Discovered</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vulnerabilities.map((vuln) => (
                    <TableRow key={vuln.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vuln.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {vuln.affectedComponent}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{vuln.cvssScore}</span>
                          <Progress value={vuln.cvssScore * 10} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vuln.status)}>
                          {vuln.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(vuln.discoveredAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {vuln.assignedTo || 'Unassigned'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResolveVulnerability(vuln.id)}
                            disabled={vuln.status === 'resolved'}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Scans Tab */}
        <TabsContent value="scans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Scans</CardTitle>
              <CardDescription>
                Monitor and manage security scanning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scan Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Vulnerabilities</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium">{scan.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{scan.type}</Badge>
                      </TableCell>
                      <TableCell>{scan.target}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(scan.status)}>
                          {scan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{scan.duration || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Badge className="bg-red-100 text-red-800">
                            {scan.criticalCount} Critical
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-800">
                            {scan.highCount} High
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threat Intelligence Tab */}
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Intelligence</CardTitle>
              <CardDescription>
                Monitor and analyze security threats and indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Threat Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>First Seen</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {threatIntelligence.map((threat) => (
                    <TableRow key={threat.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{threat.threatName}</div>
                          <div className="text-sm text-muted-foreground">
                            {threat.source}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{threat.threatType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(threat.firstSeen).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(threat.lastSeen).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Shield className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Incidents</CardTitle>
              <CardDescription>
                Track and manage security incident response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {incident.affectedSystems.join(', ')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {incident.assignedTo || 'Unassigned'}
                      </TableCell>
                      <TableCell>
                        {new Date(incident.reportedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {incident.impact}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateIncidentStatus(incident.id, 'resolved')}
                            disabled={incident.status === 'resolved'}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
              <CardDescription>
                Monitor compliance with security frameworks and regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Framework</TableHead>
                    <TableHead>Control</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead>Next Check</TableHead>
                    <TableHead>Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{check.framework}</div>
                          <div className="text-sm text-muted-foreground">
                            {check.control}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {check.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(check.status)}>
                          {check.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(check.riskLevel)}>
                          {check.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(check.lastChecked).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(check.nextCheck).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{check.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Scan Dialog */}
      <Dialog open={newScanDialog} onOpenChange={setNewScanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Security Scan</DialogTitle>
            <DialogDescription>
              Configure and initiate a new security scan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="scan-name">Scan Name</Label>
              <Input id="scan-name" placeholder="Enter scan name" />
            </div>
            <div>
              <Label htmlFor="scan-type">Scan Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Scan</SelectItem>
                  <SelectItem value="quick">Quick Scan</SelectItem>
                  <SelectItem value="targeted">Targeted Scan</SelectItem>
                  <SelectItem value="compliance">Compliance Scan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="scan-target">Target</Label>
              <Input id="scan-target" placeholder="Enter target URL or system" />
            </div>
            <div>
              <Label htmlFor="scan-config">Scan Configuration</Label>
              <Textarea id="scan-config" placeholder="Enter scan configuration details" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewScanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartScan}>
              Start Scan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Vulnerability Dialog */}
      <Dialog open={newVulnerabilityDialog} onOpenChange={setNewVulnerabilityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vulnerability</DialogTitle>
            <DialogDescription>
              Report a new security vulnerability
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="vuln-title">Vulnerability Title</Label>
              <Input id="vuln-title" placeholder="Enter vulnerability title" />
            </div>
            <div>
              <Label htmlFor="vuln-description">Description</Label>
              <Textarea id="vuln-description" placeholder="Enter vulnerability description" />
            </div>
            <div>
              <Label htmlFor="vuln-severity">Severity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="vuln-component">Affected Component</Label>
              <Input id="vuln-component" placeholder="Enter affected component" />
            </div>
            <div>
              <Label htmlFor="vuln-remediation">Remediation</Label>
              <Textarea id="vuln-remediation" placeholder="Enter remediation steps" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewVulnerabilityDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVulnerability}>
              Add Vulnerability
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityScannerPage;
