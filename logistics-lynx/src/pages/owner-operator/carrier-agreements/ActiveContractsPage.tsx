/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Download, 
  Edit, 
  Eye, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Building,
  Truck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

interface ActiveContract {
  id: string;
  carrierName: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  completedLoads: number;
  remainingLoads: number;
  status: 'active' | 'expiring-soon' | 'performance-review';
  ratePerMile: number;
  paymentTerms: string;
  insuranceStatus: 'valid' | 'expiring' | 'expired';
  safetyRating: string;
  lastPayment: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

interface ContractSummary {
  totalActiveContracts: number;
  totalContractValue: number;
  averageRatePerMile: number;
  expiringThisMonth: number;
  topPerformingCarrier: string;
  monthlyVolume: number;
}

const ActiveContractsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [isRenewalDialogOpen, setIsRenewalDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ActiveContract | null>(null);
  const [renewalData, setRenewalData] = useState({
    newEndDate: '',
    rateAdjustment: '',
    additionalTerms: ''
  });

  // Mock data for active contracts
  const activeContracts: ActiveContract[] = [
    {
      id: '1',
      carrierName: 'Swift Transportation',
      contractNumber: 'CT-2024-001',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      totalValue: 2500000.00,
      completedLoads: 245,
      remainingLoads: 355,
      status: 'active',
      ratePerMile: 2.15,
      paymentTerms: 'NET 30',
      insuranceStatus: 'valid',
      safetyRating: 'Satisfactory',
      lastPayment: '2024-01-15',
      contactPerson: 'John Smith',
      contactEmail: 'john.smith@swift.com',
      contactPhone: '(555) 123-4567'
    },
    {
      id: '2',
      carrierName: 'J.B. Hunt Transport',
      contractNumber: 'CT-2024-002',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      totalValue: 1800000.00,
      completedLoads: 180,
      remainingLoads: 20,
      status: 'expiring-soon',
      ratePerMile: 2.25,
      paymentTerms: 'NET 15',
      insuranceStatus: 'valid',
      safetyRating: 'Satisfactory',
      lastPayment: '2024-01-20',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.j@jbhunt.com',
      contactPhone: '(555) 234-5678'
    },
    {
      id: '3',
      carrierName: 'Werner Enterprises',
      contractNumber: 'CT-2024-003',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      totalValue: 1200000.00,
      completedLoads: 95,
      remainingLoads: 105,
      status: 'active',
      ratePerMile: 2.05,
      paymentTerms: 'NET 30',
      insuranceStatus: 'expiring',
      safetyRating: 'Satisfactory',
      lastPayment: '2024-01-18',
      contactPerson: 'Mike Davis',
      contactEmail: 'mike.davis@werner.com',
      contactPhone: '(555) 345-6789'
    },
    {
      id: '4',
      carrierName: 'Schneider National',
      contractNumber: 'CT-2024-004',
      startDate: '2024-01-10',
      endDate: '2024-12-31',
      totalValue: 3200000.00,
      completedLoads: 320,
      remainingLoads: 480,
      status: 'active',
      ratePerMile: 2.35,
      paymentTerms: 'NET 30',
      insuranceStatus: 'valid',
      safetyRating: 'Outstanding',
      lastPayment: '2024-01-22',
      contactPerson: 'Lisa Brown',
      contactEmail: 'lisa.brown@schneider.com',
      contactPhone: '(555) 456-7890'
    },
    {
      id: '5',
      carrierName: 'Prime Inc.',
      contractNumber: 'CT-2024-005',
      startDate: '2024-01-05',
      endDate: '2024-12-31',
      totalValue: 1950000.00,
      completedLoads: 165,
      remainingLoads: 335,
      status: 'performance-review',
      ratePerMile: 1.95,
      paymentTerms: 'NET 45',
      insuranceStatus: 'valid',
      safetyRating: 'Conditional',
      lastPayment: '2024-01-12',
      contactPerson: 'Tom Wilson',
      contactEmail: 'tom.wilson@primeinc.com',
      contactPhone: '(555) 567-8901'
    }
  ];

  // Mock data for contract summary
  const contractSummary: ContractSummary = {
    totalActiveContracts: 5,
    totalContractValue: 10650000.00,
    averageRatePerMile: 2.15,
    expiringThisMonth: 1,
    topPerformingCarrier: 'Schneider National',
    monthlyVolume: 1005
  };

  const filteredContracts = activeContracts.filter(contract => {
    const matchesSearch = contract.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesInsurance = insuranceFilter === 'all' || contract.insuranceStatus === insuranceFilter;
    return matchesSearch && matchesStatus && matchesInsurance;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      'expiring-soon': 'destructive',
      'performance-review': 'secondary'
    } as const;
    
    const icons = {
      active: <CheckCircle className="w-3 h-3" />,
      'expiring-soon': <AlertTriangle className="w-3 h-3" />,
      'performance-review': <Clock className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
      </Badge>
    );
  };

  const getInsuranceBadge = (status: string) => {
    const variants = {
      valid: 'default',
      expiring: 'secondary',
      expired: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getSafetyRatingBadge = (rating: string) => {
    const variants = {
      'Outstanding': 'default',
      'Satisfactory': 'outline',
      'Conditional': 'secondary',
      'Unsatisfactory': 'destructive'
    } as const;

    return (
      <Badge variant={variants[rating as keyof typeof variants]}>
        {rating}
      </Badge>
    );
  };

  const handleViewContract = (contractId: string) => {
    toast.success(`Opening contract details for ${contractId}`);
  };

  const handleEditContract = (contract: ActiveContract) => {
    setSelectedContract(contract);
    toast.success(`Editing contract ${contract.contractNumber}`);
  };

  const handleRenewContract = (contract: ActiveContract) => {
    setSelectedContract(contract);
    setIsRenewalDialogOpen(true);
  };

  const handleSubmitRenewal = () => {
    if (!renewalData.newEndDate) {
      toast.error('Please select a new end date');
      return;
    }
    toast.success(`Renewal request submitted for ${selectedContract?.contractNumber}`);
    setIsRenewalDialogOpen(false);
    setRenewalData({ newEndDate: '', rateAdjustment: '', additionalTerms: '' });
  };

  const handleContactCarrier = (contract: ActiveContract) => {
    toast.success(`Contacting ${contract.contactPerson} at ${contract.carrierName}`);
  };

  const handleDownloadContract = (contractId: string) => {
    toast.success(`Downloading contract ${contractId}`);
  };

  const handlePerformanceReview = (contractId: string) => {
    toast.success(`Initiating performance review for contract ${contractId}`);
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Contracts</h1>
          <p className="text-muted-foreground">Manage and monitor your active carrier agreements</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handlePerformanceReview('all')}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Review All
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractSummary.totalActiveContracts}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(contractSummary.totalContractValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate/Mile</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${contractSummary.averageRatePerMile.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +3.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractSummary.expiringThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Management</CardTitle>
          <CardDescription>Monitor contract performance and manage carrier relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by carrier name or contract number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                  <SelectItem value="performance-review">Performance Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="insurance-filter">Insurance</Label>
              <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Insurance</SelectItem>
                  <SelectItem value="valid">Valid</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contracts Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Contract #</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Rate/Mile</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Safety Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contract.carrierName}</div>
                        <div className="text-sm text-muted-foreground">{contract.contactPerson}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{contract.contractNumber}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{contract.startDate} - {contract.endDate}</div>
                        <div className="text-muted-foreground">${(contract.totalValue / 1000000).toFixed(1)}M</div>
                      </div>
                    </TableCell>
                    <TableCell>${contract.ratePerMile.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{contract.completedLoads}/{contract.completedLoads + contract.remainingLoads} loads</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(contract.completedLoads / (contract.completedLoads + contract.remainingLoads)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getInsuranceBadge(contract.insuranceStatus)}</TableCell>
                    <TableCell>{getSafetyRatingBadge(contract.safetyRating)}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewContract(contract.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleContactCarrier(contract)}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditContract(contract)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadContract(contract.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Renewal Dialog */}
      <Dialog open={isRenewalDialogOpen} onOpenChange={setIsRenewalDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Renew Contract</DialogTitle>
            <DialogDescription>
              Submit a renewal request for {selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-end">Current End Date</Label>
              <Input
                id="current-end"
                value={selectedContract?.endDate || ''}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="new-end">New End Date</Label>
              <Input
                id="new-end"
                type="date"
                value={renewalData.newEndDate}
                onChange={(e) => setRenewalData({ ...renewalData, newEndDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="rate-adjustment">Rate Adjustment (%)</Label>
              <Input
                id="rate-adjustment"
                type="number"
                step="0.1"
                placeholder="e.g., 5.0 for 5% increase"
                value={renewalData.rateAdjustment}
                onChange={(e) => setRenewalData({ ...renewalData, rateAdjustment: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="additional-terms">Additional Terms</Label>
              <Textarea
                id="additional-terms"
                placeholder="Any additional terms or modifications..."
                value={renewalData.additionalTerms}
                onChange={(e) => setRenewalData({ ...renewalData, additionalTerms: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenewalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRenewal}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Submit Renewal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveContractsPage;