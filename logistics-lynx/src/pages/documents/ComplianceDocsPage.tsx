/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Shield, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const complianceData = [
  {
    id: 'DOT-2024-001',
    title: 'DOT Safety Audit Report',
    category: 'dot-compliance',
    status: 'compliant',
    lastUpdated: '2024-02-10',
    expiryDate: '2024-12-31',
    daysToExpiry: 285,
    priority: 'high',
    assignee: 'Sarah Johnson',
    documents: ['audit-report.pdf', 'corrective-actions.pdf']
  },
  {
    id: 'EPA-2024-001',
    title: 'Environmental Compliance Certificate',
    category: 'environmental',
    status: 'pending-review',
    lastUpdated: '2024-02-08',
    expiryDate: '2024-06-30',
    daysToExpiry: 130,
    priority: 'medium',
    assignee: 'Mike Wilson',
    documents: ['epa-certificate.pdf']
  },
  {
    id: 'OSHA-2024-001',
    title: 'Workplace Safety Training Records',
    category: 'safety',
    status: 'non-compliant',
    lastUpdated: '2024-01-15',
    expiryDate: '2024-03-15',
    daysToExpiry: 15,
    priority: 'high',
    assignee: 'Lisa Chen',
    documents: ['training-records.pdf', 'incident-reports.pdf']
  },
  {
    id: 'IRS-2024-001',
    title: 'Tax Compliance Documentation',
    category: 'tax',
    status: 'compliant',
    lastUpdated: '2024-02-01',
    expiryDate: '2024-04-15',
    daysToExpiry: 45,
    priority: 'medium',
    assignee: 'Robert Davis',
    documents: ['tax-forms.pdf', 'audit-trail.pdf']
  }
];

const auditData = [
  {
    id: 'AUD-2024-001',
    title: 'Annual DOT Compliance Audit',
    auditor: 'Federal Motor Carrier Safety Administration',
    date: '2024-01-15',
    status: 'completed',
    findings: 3,
    violations: 1,
    score: 85,
    nextAudit: '2025-01-15'
  },
  {
    id: 'AUD-2024-002',
    title: 'Environmental Impact Assessment',
    auditor: 'Environmental Protection Agency',
    date: '2024-02-01',
    status: 'in-progress',
    findings: 0,
    violations: 0,
    score: null,
    nextAudit: '2024-08-01'
  },
  {
    id: 'AUD-2023-003',
    title: 'Safety Management Review',
    auditor: 'Occupational Safety and Health Administration',
    date: '2023-11-15',
    status: 'completed',
    findings: 5,
    violations: 2,
    score: 78,
    nextAudit: '2024-05-15'
  }
];

export default function ComplianceDocsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('compliance');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dot-compliance': return 'bg-blue-100 text-blue-800';
      case 'environmental': return 'bg-green-100 text-green-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'tax': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryWarning = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return { color: 'text-red-600', message: 'Expired' };
    if (daysToExpiry <= 30) return { color: 'text-red-600', message: `${daysToExpiry} days` };
    if (daysToExpiry <= 90) return { color: 'text-yellow-600', message: `${daysToExpiry} days` };
    return { color: 'text-green-600', message: `${daysToExpiry} days` };
  };

  const totalCompliance = complianceData.length;
  const compliantItems = complianceData.filter(c => c.status === 'compliant').length;
  const nonCompliantItems = complianceData.filter(c => c.status === 'non-compliant').length;
  const expiringItems = complianceData.filter(c => c.daysToExpiry <= 30).length;
  const complianceRate = Math.round((compliantItems / totalCompliance) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance Documents</h1>
          <p className="text-muted-foreground">Manage regulatory compliance and audit documentation</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Compliance Doc
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Compliance Document</DialogTitle>
                <DialogDescription>Upload or create a new compliance document</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input id="title" placeholder="Enter document title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dot-compliance">DOT Compliance</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                      <SelectItem value="robert">Robert Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="pending-review">Pending Review</SelectItem>
                      <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter document description or compliance notes" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoReminder" />
                  <Label htmlFor="autoReminder">Enable expiry reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Add Document</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{totalCompliance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold">{compliantItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Non-Compliant</p>
                <p className="text-2xl font-bold">{nonCompliantItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{expiringItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-bold">{complianceRate}%</p>
              </div>
            </div>
            <Progress value={complianceRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="compliance">Compliance Documents</TabsTrigger>
          <TabsTrigger value="audits">Audit Records</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search compliance documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Compliance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>All regulatory compliance documents and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.map((item) => {
                    const expiryWarning = getExpiryWarning(item.daysToExpiry);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {item.assignee}
                          </div>
                        </TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                        <TableCell className={expiryWarning.color}>
                          {expiryWarning.message}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {/* Audit Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Records</CardTitle>
              <CardDescription>Regulatory audits and compliance assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Next Audit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditData.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.id}</TableCell>
                      <TableCell>{audit.title}</TableCell>
                      <TableCell>{audit.auditor}</TableCell>
                      <TableCell>{audit.date}</TableCell>
                      <TableCell>{audit.findings}</TableCell>
                      <TableCell className={audit.violations > 0 ? 'text-red-600' : 'text-green-600'}>
                        {audit.violations}
                      </TableCell>
                      <TableCell>
                        {audit.score ? (
                          <div className="flex items-center gap-2">
                            <span className={audit.score >= 80 ? 'text-green-600' : audit.score >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                              {audit.score}%
                            </span>
                            <Progress value={audit.score} className="w-16" />
                          </div>
                        ) : (
                          'Pending'
                        )}
                      </TableCell>
                      <TableCell>{audit.nextAudit}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}