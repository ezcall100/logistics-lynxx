import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  FileText, 
  Calendar, 
  Download, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Eye,
  Filter,
  Bookmark,
  Archive,
  Lock,
  Globe,
  Users,
  Activity
} from 'lucide-react';

const ComplianceAuditing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [auditFilter, setAuditFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const auditTrails = [
    {
      id: "AUD-2024-001847",
      timestamp: "2024-01-15 14:32:15",
      event: "EDI Transaction Processed",
      type: "transaction",
      user: "System",
      partner: "ABC Logistics",
      transaction: "EDI 204",
      details: "Load tender successfully processed and acknowledged",
      compliance: "compliant",
      riskLevel: "low",
      retention: "7 years"
    },
    {
      id: "AUD-2024-001846",
      timestamp: "2024-01-15 14:28:22",
      event: "Mapping Configuration Changed",
      type: "configuration",
      user: "John Smith",
      partner: "MegaHaul Corp",
      transaction: "EDI 210",
      details: "Updated invoice mapping for billing address validation",
      compliance: "compliant",
      riskLevel: "medium",
      retention: "7 years"
    },
    {
      id: "AUD-2024-001845",
      timestamp: "2024-01-15 14:25:08",
      event: "Data Access Request",
      type: "access",
      user: "Sarah Johnson",
      partner: "QuickShip LLC",
      transaction: "EDI 214",
      details: "Shipment status data accessed for customer inquiry",
      compliance: "compliant",
      riskLevel: "low",
      retention: "3 years"
    },
    {
      id: "AUD-2024-001844",
      timestamp: "2024-01-15 14:22:33",
      event: "Failed Authentication Attempt",
      type: "security",
      user: "Unknown",
      partner: "TruckMaster Inc",
      transaction: "Multiple",
      details: "Multiple failed login attempts detected from IP 192.168.1.100",
      compliance: "violation",
      riskLevel: "high",
      retention: "10 years"
    },
    {
      id: "AUD-2024-001843",
      timestamp: "2024-01-15 14:19:45",
      event: "Data Export Performed",
      type: "export",
      user: "Mike Davis",
      partner: "FastTruck Express",
      transaction: "EDI 997",
      details: "Acknowledgment data exported for compliance reporting",
      compliance: "compliant",
      riskLevel: "medium",
      retention: "5 years"
    }
  ];

  const complianceMetrics = [
    {
      title: "Audit Compliance Rate",
      value: "99.2%",
      change: "+0.3%",
      trend: "up",
      icon: Shield,
      description: "Meeting regulatory requirements"
    },
    {
      title: "Data Retention",
      value: "100%",
      change: "0%",
      trend: "stable",
      icon: Archive,
      description: "Records properly archived"
    },
    {
      title: "Security Events",
      value: "3",
      change: "-2",
      trend: "down",
      icon: Lock,
      description: "Security incidents this month"
    },
    {
      title: "Audit Trails",
      value: "45,847",
      change: "+12%",
      trend: "up",
      icon: FileText,
      description: "Total recorded events"
    }
  ];

  const complianceChecks = [
    {
      category: "Data Privacy",
      requirement: "GDPR Article 30 - Records of Processing",
      status: "compliant",
      lastCheck: "2024-01-15",
      nextCheck: "2024-02-15",
      description: "Maintain detailed records of all data processing activities"
    },
    {
      category: "Financial Compliance",
      requirement: "SOX Section 404 - Internal Controls",
      status: "compliant",
      lastCheck: "2024-01-12",
      nextCheck: "2024-02-12",
      description: "Establish and maintain internal controls over financial reporting"
    },
    {
      category: "Transportation",
      requirement: "DOT 49 CFR Part 395 - Hours of Service",
      status: "warning",
      lastCheck: "2024-01-10",
      nextCheck: "2024-01-17",
      description: "Monitor and enforce driver hours of service regulations"
    },
    {
      category: "Data Security",
      requirement: "ISO 27001 - Information Security",
      status: "compliant",
      lastCheck: "2024-01-08",
      nextCheck: "2024-02-08",
      description: "Implement comprehensive information security management"
    },
    {
      category: "Electronic Records",
      requirement: "21 CFR Part 11 - Electronic Records",
      status: "compliant",
      lastCheck: "2024-01-05",
      nextCheck: "2024-02-05",
      description: "Ensure electronic records and signatures are trustworthy"
    }
  ];

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge variant="default">Compliant</Badge>;
      case 'warning': return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      case 'violation': return <Badge variant="destructive">Violation</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge variant="secondary">Low Risk</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white">Medium Risk</Badge>;
      case 'high': return <Badge variant="destructive">High Risk</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'violation': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAudits = auditTrails.filter(audit => {
    const matchesSearch = searchTerm === '' || 
      audit.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.partner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = auditFilter === 'all' || audit.type === auditFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Compliance & Auditing</h1>
          <p className="text-muted-foreground">
            Monitor compliance status and maintain comprehensive audit trails
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Audit
          </Button>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`text-${metric.trend === 'up' ? 'green' : metric.trend === 'down' ? 'red' : 'gray'}-600`}>
                  {metric.change}
                </span>
                <span>{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="audit-trails" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audit-trails">Audit Trails</TabsTrigger>
          <TabsTrigger value="compliance-checks">Compliance Checks</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="audit-trails" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Audit Trail Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search audit trails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={auditFilter} onValueChange={setAuditFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="transaction">Transactions</SelectItem>
                    <SelectItem value="configuration">Configuration</SelectItem>
                    <SelectItem value="access">Data Access</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="export">Data Export</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audit Trails List */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail Records</CardTitle>
              <CardDescription>
                {filteredAudits.length} records found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAudits.map((audit) => (
                  <div key={audit.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    {getComplianceIcon(audit.compliance)}
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium">{audit.event}</div>
                        <div className="text-sm text-muted-foreground">{audit.timestamp}</div>
                      </div>
                      
                      <div>
                        <Badge variant="outline">{audit.type}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">{audit.transaction}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium">{audit.user}</div>
                        <div className="text-sm text-muted-foreground">{audit.partner}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm">{audit.details}</div>
                      </div>
                      
                      <div className="space-y-1">
                        {getComplianceBadge(audit.compliance)}
                        {getRiskBadge(audit.riskLevel)}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance-checks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>Current compliance status across all regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    {getComplianceIcon(check.status)}
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <div className="font-medium">{check.category}</div>
                        <div className="text-sm text-muted-foreground">{check.requirement}</div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="text-sm">{check.description}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Last Check</div>
                        <div className="text-sm text-muted-foreground">{check.lastCheck}</div>
                        <div className="text-sm font-medium mt-1">Next Check</div>
                        <div className="text-sm text-muted-foreground">{check.nextCheck}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getComplianceBadge(check.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance Reports</CardTitle>
                <CardDescription>Generate compliance reports for auditors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  GDPR Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  SOX Controls Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  DOT Safety Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  ISO 27001 Security Review
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Analytics</CardTitle>
                <CardDescription>Analyze compliance trends and patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="h-4 w-4" />
                  Transaction Volume Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  User Access Patterns
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Globe className="h-4 w-4" />
                  Cross-Border Compliance
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Lock className="h-4 w-4" />
                  Security Incident Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceAuditing;