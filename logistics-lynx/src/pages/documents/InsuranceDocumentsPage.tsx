import { useState } from 'react';
import { Shield, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, DollarSign, Building } from 'lucide-react';
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

const insuranceData = [
  {
    id: 'INS-001',
    policyNumber: 'CMV-2024-001',
    insuranceType: 'Liability',
    provider: 'SafeGuard Insurance Co',
    coverage: '$1,000,000',
    premium: '$4,500',
    effectiveDate: '2024-01-01',
    expiryDate: '2025-01-01',
    status: 'active',
    vehicle: 'TRK-001',
    daysToExpiry: 315,
    deductible: '$1,000'
  },
  {
    id: 'INS-002',
    policyNumber: 'CARGO-2024-002',
    insuranceType: 'Cargo',
    provider: 'Freight Insurance Plus',
    coverage: '$100,000',
    premium: '$2,200',
    effectiveDate: '2024-02-01',
    expiryDate: '2025-02-01',
    status: 'active',
    vehicle: 'All Vehicles',
    daysToExpiry: 346,
    deductible: '$500'
  },
  {
    id: 'INS-003',
    policyNumber: 'PHY-2024-003',
    insuranceType: 'Physical Damage',
    provider: 'TruckCare Insurance',
    coverage: '$85,000',
    premium: '$3,800',
    effectiveDate: '2024-01-15',
    expiryDate: '2024-03-15',
    status: 'expired',
    vehicle: 'TRK-002',
    daysToExpiry: -15,
    deductible: '$2,500'
  },
  {
    id: 'INS-004',
    policyNumber: 'WC-2024-004',
    insuranceType: 'Workers Compensation',
    provider: 'National Workers Comp',
    coverage: '$500,000',
    premium: '$6,200',
    effectiveDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'active',
    vehicle: 'All Employees',
    daysToExpiry: 285,
    deductible: '$0'
  }
];

const claimsData = [
  {
    id: 'CLM-001',
    claimNumber: 'CL-2024-001',
    policyNumber: 'CMV-2024-001',
    incidentDate: '2024-02-15',
    reportDate: '2024-02-16',
    claimType: 'Accident',
    status: 'open',
    estimatedAmount: '$15,000',
    paidAmount: '$0',
    adjuster: 'Mark Johnson',
    description: 'Minor collision with passenger vehicle',
    vehicle: 'TRK-001'
  },
  {
    id: 'CLM-002',
    claimNumber: 'CL-2024-002',
    policyNumber: 'CARGO-2024-002',
    incidentDate: '2024-01-28',
    reportDate: '2024-01-28',
    claimType: 'Cargo Damage',
    status: 'closed',
    estimatedAmount: '$8,500',
    paidAmount: '$8,000',
    adjuster: 'Sarah Wilson',
    description: 'Water damage to electronics shipment',
    vehicle: 'TRK-003'
  },
  {
    id: 'CLM-003',
    claimNumber: 'CL-2024-003',
    policyNumber: 'PHY-2024-003',
    incidentDate: '2024-02-05',
    reportDate: '2024-02-06',
    claimType: 'Theft',
    status: 'investigating',
    estimatedAmount: '$25,000',
    paidAmount: '$0',
    adjuster: 'Robert Davis',
    description: 'Vehicle equipment theft at truck stop',
    vehicle: 'TRK-002'
  }
];

export default function InsuranceDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('policies');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsuranceTypeColor = (type: string) => {
    switch (type) {
      case 'Liability': return 'bg-blue-100 text-blue-800';
      case 'Cargo': return 'bg-orange-100 text-orange-800';
      case 'Physical Damage': return 'bg-purple-100 text-purple-800';
      case 'Workers Compensation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClaimTypeColor = (type: string) => {
    switch (type) {
      case 'Accident': return 'bg-red-100 text-red-800';
      case 'Cargo Damage': return 'bg-orange-100 text-orange-800';
      case 'Theft': return 'bg-purple-100 text-purple-800';
      case 'Vandalism': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryWarning = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return { color: 'text-red-600', message: 'Expired' };
    if (daysToExpiry <= 30) return { color: 'text-red-600', message: `${daysToExpiry} days` };
    if (daysToExpiry <= 90) return { color: 'text-yellow-600', message: `${daysToExpiry} days` };
    return { color: 'text-green-600', message: `${daysToExpiry} days` };
  };

  const totalPolicies = insuranceData.length;
  const activePolicies = insuranceData.filter(p => p.status === 'active').length;
  const expiredPolicies = insuranceData.filter(p => p.status === 'expired').length;
  const expiringPolicies = insuranceData.filter(p => p.daysToExpiry <= 30 && p.daysToExpiry > 0).length;
  const totalClaims = claimsData.length;
  const openClaims = claimsData.filter(c => c.status === 'open' || c.status === 'investigating').length;
  const totalPremium = insuranceData
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + parseFloat(p.premium.replace('$', '').replace(',', '')), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Insurance Documents</h1>
          <p className="text-muted-foreground">Manage insurance policies, claims, and coverage documentation</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Insurance Policy</DialogTitle>
                <DialogDescription>Add a new insurance policy or coverage</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input id="policyNumber" placeholder="CMV-2024-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceType">Insurance Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liability">Liability</SelectItem>
                      <SelectItem value="cargo">Cargo</SelectItem>
                      <SelectItem value="physical-damage">Physical Damage</SelectItem>
                      <SelectItem value="workers-comp">Workers Compensation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input id="provider" placeholder="SafeGuard Insurance Co" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage">Coverage Amount</Label>
                  <Input id="coverage" placeholder="$1,000,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium">Annual Premium</Label>
                  <Input id="premium" placeholder="$4,500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deductible">Deductible</Label>
                  <Input id="deductible" placeholder="$1,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input id="effectiveDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Covered Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="trk-001">TRK-001</SelectItem>
                      <SelectItem value="trk-002">TRK-002</SelectItem>
                      <SelectItem value="trl-001">TRL-001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Policy Notes</Label>
                  <Textarea id="notes" placeholder="Additional policy details" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoRenewal" />
                  <Label htmlFor="autoRenewal">Enable automatic renewal reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Add Policy</Button>
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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Policies</p>
                <p className="text-2xl font-bold">{totalPolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activePolicies}</p>
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
                <p className="text-2xl font-bold">{expiringPolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold">{expiredPolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold">{totalClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Open Claims</p>
                <p className="text-2xl font-bold">{openClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">Annual Premium</p>
                <p className="text-2xl font-bold">${totalPremium.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="policies">Insurance Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims Management</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search policies..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Insurance Policies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Policies</CardTitle>
              <CardDescription>All active and historical insurance policies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insuranceData.map((policy) => {
                    const expiryWarning = getExpiryWarning(policy.daysToExpiry);
                    return (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.id}</TableCell>
                        <TableCell>{policy.policyNumber}</TableCell>
                        <TableCell>
                          <Badge className={getInsuranceTypeColor(policy.insuranceType)}>
                            {policy.insuranceType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            {policy.provider}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{policy.coverage}</TableCell>
                        <TableCell>{policy.premium}</TableCell>
                        <TableCell>{policy.vehicle}</TableCell>
                        <TableCell>{policy.effectiveDate}</TableCell>
                        <TableCell>{policy.expiryDate}</TableCell>
                        <TableCell className={expiryWarning.color}>
                          {expiryWarning.message}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status}
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
                              <FileText className="h-4 w-4" />
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

        <TabsContent value="claims" className="space-y-4">
          {/* Claims Table */}
          <Card>
            <CardHeader>
              <CardTitle>Claims Management</CardTitle>
              <CardDescription>All insurance claims and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Claim Number</TableHead>
                    <TableHead>Policy Number</TableHead>
                    <TableHead>Claim Type</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Incident Date</TableHead>
                    <TableHead>Report Date</TableHead>
                    <TableHead>Estimated Amount</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Adjuster</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimsData.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>
                        <Badge className={getClaimTypeColor(claim.claimType)}>
                          {claim.claimType}
                        </Badge>
                      </TableCell>
                      <TableCell>{claim.vehicle}</TableCell>
                      <TableCell>{claim.incidentDate}</TableCell>
                      <TableCell>{claim.reportDate}</TableCell>
                      <TableCell className="font-semibold">{claim.estimatedAmount}</TableCell>
                      <TableCell className="font-semibold">{claim.paidAmount}</TableCell>
                      <TableCell>{claim.adjuster}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status}
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