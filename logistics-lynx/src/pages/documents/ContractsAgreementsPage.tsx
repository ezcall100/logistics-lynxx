import { useState } from 'react';
import { FileText, Search, Plus, Download, Eye, Edit, Trash2, Filter, Calendar, Building, User, MapPin, AlertTriangle } from 'lucide-react';
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

const contractsData = [
  {
    id: 'CON-2024-001',
    title: 'Master Service Agreement - Global Logistics',
    customer: 'Global Logistics Inc',
    type: 'master-agreement',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: '$2,400,000',
    autoRenewal: true,
    daysToExpiry: 245,
    priority: 'high'
  },
  {
    id: 'CON-2024-002',
    title: 'Seasonal Transport Contract - Express Freight',
    customer: 'Express Freight Co',
    type: 'seasonal',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    value: '$850,000',
    autoRenewal: false,
    daysToExpiry: 45,
    priority: 'medium'
  },
  {
    id: 'CON-2024-003',
    title: 'Non-Disclosure Agreement - Metro Transport',
    customer: 'Metro Transport',
    type: 'nda',
    status: 'pending',
    startDate: '2024-02-15',
    endDate: '2026-02-15',
    value: 'N/A',
    autoRenewal: true,
    daysToExpiry: 730,
    priority: 'low'
  },
  {
    id: 'CON-2024-004',
    title: 'Spot Rate Agreement - Rapid Delivery',
    customer: 'Rapid Delivery LLC',
    type: 'spot-rate',
    status: 'expired',
    startDate: '2023-06-01',
    endDate: '2024-01-31',
    value: '$320,000',
    autoRenewal: false,
    daysToExpiry: -15,
    priority: 'medium'
  }
];

const agreementsData = [
  {
    id: 'AGR-2024-001',
    title: 'Driver Employment Agreement - John Smith',
    party: 'John Smith',
    type: 'employment',
    status: 'active',
    signedDate: '2024-01-15',
    effectiveDate: '2024-01-20',
    terminationDate: null,
    department: 'Operations'
  },
  {
    id: 'AGR-2024-002',
    title: 'Equipment Lease Agreement - TruckCorp',
    party: 'TruckCorp Leasing',
    type: 'equipment-lease',
    status: 'active',
    signedDate: '2024-02-01',
    effectiveDate: '2024-02-01',
    terminationDate: '2027-02-01',
    department: 'Fleet'
  },
  {
    id: 'AGR-2024-003',
    title: 'Insurance Agreement - SafeGuard Insurance',
    party: 'SafeGuard Insurance Co',
    type: 'insurance',
    status: 'pending',
    signedDate: null,
    effectiveDate: '2024-03-01',
    terminationDate: '2025-03-01',
    department: 'Risk Management'
  }
];

export default function ContractsAgreementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('contracts');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'master-agreement': return 'bg-blue-100 text-blue-800';
      case 'seasonal': return 'bg-orange-100 text-orange-800';
      case 'spot-rate': return 'bg-purple-100 text-purple-800';
      case 'nda': return 'bg-indigo-100 text-indigo-800';
      case 'employment': return 'bg-green-100 text-green-800';
      case 'equipment-lease': return 'bg-yellow-100 text-yellow-800';
      case 'insurance': return 'bg-red-100 text-red-800';
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

  const totalContracts = contractsData.length;
  const activeContracts = contractsData.filter(c => c.status === 'active').length;
  const expiringContracts = contractsData.filter(c => c.daysToExpiry <= 90 && c.daysToExpiry > 0).length;
  const totalAgreements = agreementsData.length;
  const totalContractValue = contractsData
    .filter(c => c.value !== 'N/A')
    .reduce((sum, c) => sum + parseFloat(c.value.replace('$', '').replace(',', '')), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contracts & Agreements</h1>
          <p className="text-muted-foreground">Manage customer contracts and legal agreements</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Contract</DialogTitle>
                <DialogDescription>Set up a new customer contract or agreement</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Contract Title</Label>
                  <Input id="title" placeholder="Enter contract title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer/Party</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global Logistics Inc</SelectItem>
                      <SelectItem value="express">Express Freight Co</SelectItem>
                      <SelectItem value="metro">Metro Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Contract Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="master-agreement">Master Agreement</SelectItem>
                      <SelectItem value="seasonal">Seasonal Contract</SelectItem>
                      <SelectItem value="spot-rate">Spot Rate Agreement</SelectItem>
                      <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Contract Value</Label>
                  <Input id="value" placeholder="$0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea id="terms" placeholder="Enter key terms and conditions" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoRenewal" />
                  <Label htmlFor="autoRenewal">Enable automatic renewal</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Create Contract</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Contracts</p>
                <p className="text-2xl font-bold">{totalContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Contracts</p>
                <p className="text-2xl font-bold">{activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{expiringContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Agreements</p>
                <p className="text-2xl font-bold">{totalAgreements}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalContractValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="contracts">Customer Contracts</TabsTrigger>
          <TabsTrigger value="agreements">Legal Agreements</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contracts..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Contracts</CardTitle>
              <CardDescription>All contracts with customers and service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Days to Expiry</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contractsData.map((contract) => {
                    const expiryWarning = getExpiryWarning(contract.daysToExpiry);
                    return (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            {contract.customer}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(contract.type)}>
                            {contract.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{contract.value}</TableCell>
                        <TableCell>{contract.startDate}</TableCell>
                        <TableCell>{contract.endDate}</TableCell>
                        <TableCell className={expiryWarning.color}>
                          {expiryWarning.message}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(contract.priority)}>
                            {contract.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
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

        <TabsContent value="agreements" className="space-y-4">
          {/* Agreements Table */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Agreements</CardTitle>
              <CardDescription>Employment contracts, NDAs, and other legal agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agreement ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Signed Date</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Termination Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agreementsData.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell className="font-medium">{agreement.id}</TableCell>
                      <TableCell>{agreement.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {agreement.party}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(agreement.type)}>
                          {agreement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{agreement.department}</TableCell>
                      <TableCell>{agreement.signedDate || 'Pending'}</TableCell>
                      <TableCell>{agreement.effectiveDate}</TableCell>
                      <TableCell>{agreement.terminationDate || 'Ongoing'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(agreement.status)}>
                          {agreement.status}
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