/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  Building, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  BarChart3,
  PieChart,
  RefreshCw,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface HistoricalContract {
  id: string;
  carrierName: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  totalValue: number;
  completedValue: number;
  ratePerMile: number;
  totalLoads: number;
  completedLoads: number;
  status: 'completed' | 'terminated' | 'expired' | 'cancelled';
  terminationReason?: string;
  performanceRating: number;
  onTimePercentage: number;
  contractType: 'standard' | 'expedite' | 'specialized' | 'regional';
  lastPayment?: string;
  finalSettlement?: number;
}

interface ContractMetrics {
  totalContracts: number;
  totalValue: number;
  averageContractDuration: number;
  completionRate: number;
  averagePerformanceRating: number;
  totalLoadsCompleted: number;
}

interface PerformanceAnalytics {
  period: string;
  contractsCompleted: number;
  averageValue: number;
  topPerformingCarrier: string;
  terminationRate: number;
}

const AgreementHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [selectedContract, setSelectedContract] = useState<HistoricalContract | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Mock data for historical contracts
  const historicalContracts: HistoricalContract[] = [
    {
      id: '1',
      carrierName: 'Swift Transportation',
      contractNumber: 'CT-2023-001',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      actualEndDate: '2023-12-31',
      totalValue: 2200000.00,
      completedValue: 2180000.00,
      ratePerMile: 2.10,
      totalLoads: 550,
      completedLoads: 548,
      status: 'completed',
      performanceRating: 4.8,
      onTimePercentage: 96.5,
      contractType: 'standard',
      lastPayment: '2024-01-15',
      finalSettlement: 2180000.00
    },
    {
      id: '2',
      carrierName: 'J.B. Hunt Transport',
      contractNumber: 'CT-2023-002',
      startDate: '2023-02-01',
      endDate: '2023-12-31',
      actualEndDate: '2023-10-15',
      totalValue: 1800000.00,
      completedValue: 1200000.00,
      ratePerMile: 2.25,
      totalLoads: 400,
      completedLoads: 267,
      status: 'terminated',
      terminationReason: 'Performance issues',
      performanceRating: 3.2,
      onTimePercentage: 78.5,
      contractType: 'expedite',
      lastPayment: '2023-10-20',
      finalSettlement: 1200000.00
    },
    {
      id: '3',
      carrierName: 'Werner Enterprises',
      contractNumber: 'CT-2023-003',
      startDate: '2023-03-01',
      endDate: '2023-08-31',
      actualEndDate: '2023-08-31',
      totalValue: 950000.00,
      completedValue: 950000.00,
      ratePerMile: 2.05,
      totalLoads: 190,
      completedLoads: 190,
      status: 'completed',
      performanceRating: 4.6,
      onTimePercentage: 94.2,
      contractType: 'regional',
      lastPayment: '2023-09-15',
      finalSettlement: 950000.00
    },
    {
      id: '4',
      carrierName: 'Prime Inc.',
      contractNumber: 'CT-2022-015',
      startDate: '2022-06-01',
      endDate: '2023-05-31',
      actualEndDate: '2023-05-31',
      totalValue: 1650000.00,
      completedValue: 1650000.00,
      ratePerMile: 1.95,
      totalLoads: 425,
      completedLoads: 425,
      status: 'completed',
      performanceRating: 4.4,
      onTimePercentage: 92.8,
      contractType: 'standard',
      lastPayment: '2023-06-15',
      finalSettlement: 1650000.00
    },
    {
      id: '5',
      carrierName: 'Atlas Transport',
      contractNumber: 'CT-2023-004',
      startDate: '2023-04-01',
      endDate: '2024-03-31',
      actualEndDate: '2023-07-20',
      totalValue: 1400000.00,
      completedValue: 350000.00,
      ratePerMile: 2.15,
      totalLoads: 280,
      completedLoads: 70,
      status: 'cancelled',
      terminationReason: 'Mutual agreement',
      performanceRating: 4.1,
      onTimePercentage: 89.5,
      contractType: 'specialized',
      lastPayment: '2023-08-05',
      finalSettlement: 350000.00
    },
    {
      id: '6',
      carrierName: 'Maverick Transportation',
      contractNumber: 'CT-2022-008',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      actualEndDate: '2022-12-31',
      totalValue: 1750000.00,
      completedValue: 1750000.00,
      ratePerMile: 2.20,
      totalLoads: 350,
      completedLoads: 350,
      status: 'completed',
      performanceRating: 4.9,
      onTimePercentage: 98.1,
      contractType: 'expedite',
      lastPayment: '2023-01-15',
      finalSettlement: 1750000.00
    }
  ];

  // Mock data for contract metrics
  const contractMetrics: ContractMetrics = {
    totalContracts: 6,
    totalValue: 10750000.00,
    averageContractDuration: 8.2,
    completionRate: 83.3,
    averagePerformanceRating: 4.3,
    totalLoadsCompleted: 1850
  };

  // Mock data for performance analytics
  const performanceAnalytics: PerformanceAnalytics[] = [
    {
      period: '2023',
      contractsCompleted: 4,
      averageValue: 1375000.00,
      topPerformingCarrier: 'Swift Transportation',
      terminationRate: 25.0
    },
    {
      period: '2022',
      contractsCompleted: 2,
      averageValue: 1750000.00,
      topPerformingCarrier: 'Maverick Transportation',
      terminationRate: 0.0
    }
  ];

  const filteredContracts = historicalContracts.filter(contract => {
    const matchesSearch = contract.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.contractType === typeFilter;
    const contractYear = new Date(contract.startDate).getFullYear().toString();
    const matchesYear = yearFilter === 'all' || contractYear === yearFilter;
    return matchesSearch && matchesStatus && matchesType && matchesYear;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      terminated: 'destructive',
      expired: 'secondary',
      cancelled: 'outline'
    } as const;
    
    const icons = {
      completed: <CheckCircle className="w-3 h-3" />,
      terminated: <XCircle className="w-3 h-3" />,
      expired: <Clock className="w-3 h-3" />,
      cancelled: <AlertTriangle className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      standard: 'bg-blue-100 text-blue-800',
      expedite: 'bg-red-100 text-red-800',
      specialized: 'bg-purple-100 text-purple-800',
      regional: 'bg-green-100 text-green-800'
    };

    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewDetails = (contract: HistoricalContract) => {
    setSelectedContract(contract);
    setIsDetailsDialogOpen(true);
  };

  const handleDownloadContract = (contractId: string) => {
    toast.success(`Downloading contract ${contractId}`);
  };

  const handleArchiveContract = (contractId: string) => {
    toast.success(`Contract ${contractId} archived successfully`);
  };

  const handleGenerateReport = () => {
    toast.success('Generating comprehensive performance report');
  };

  const handleExportHistory = () => {
    toast.success('Exporting contract history data');
  };

  const calculateCompletionPercentage = (contract: HistoricalContract) => {
    return (contract.completedLoads / contract.totalLoads) * 100;
  };

  const calculateValuePercentage = (contract: HistoricalContract) => {
    return (contract.completedValue / contract.totalValue) * 100;
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agreement History</h1>
          <p className="text-muted-foreground">Review past contracts and performance analytics</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportHistory}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleGenerateReport}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractMetrics.totalContracts}</div>
            <p className="text-xs text-muted-foreground">
              Historical agreements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(contractMetrics.totalValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Contract value processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractMetrics.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractMetrics.averagePerformanceRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 rating
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Contract History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="insights">Business Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Contracts</CardTitle>
              <CardDescription>Review and analyze past carrier agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by carrier or contract number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-40">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-40">
                  <Label htmlFor="type-filter">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="expedite">Expedite</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-32">
                  <Label htmlFor="year-filter">Year</Label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contracts Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Performance</TableHead>
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
                            <div className="text-sm text-muted-foreground">{contract.contractNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(contract.contractType)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{contract.startDate}</div>
                            <div className="text-muted-foreground">to {contract.actualEndDate || contract.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">${(contract.completedValue / 1000000).toFixed(1)}M</div>
                            <div className="text-sm text-muted-foreground">
                              of ${(contract.totalValue / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{contract.completedLoads}/{contract.totalLoads} loads</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${calculateCompletionPercentage(contract)}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className={`font-medium ${getPerformanceColor(contract.performanceRating)}`}>
                              {contract.performanceRating.toFixed(1)}/5.0
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {contract.onTimePercentage.toFixed(1)}% on-time
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contract.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(contract)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadContract(contract.id)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleArchiveContract(contract.id)}
                            >
                              <Archive className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Annual Performance
                </CardTitle>
                <CardDescription>Year-over-year contract performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceAnalytics.map((analytics, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{analytics.period}</h3>
                        <Badge variant="outline">{analytics.contractsCompleted} contracts</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Average Value</div>
                          <div className="font-medium">${(analytics.averageValue / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Termination Rate</div>
                          <div className="font-medium">{analytics.terminationRate.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-muted-foreground text-sm">Top Performer</div>
                        <div className="font-medium">{analytics.topPerformingCarrier}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Contract Distribution
                </CardTitle>
                <CardDescription>Breakdown by contract type and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">By Type</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Standard</span>
                        <span className="font-medium">33.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expedite</span>
                        <span className="font-medium">33.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regional</span>
                        <span className="font-medium">16.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Specialized</span>
                        <span className="font-medium">16.7%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">By Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Completed</span>
                        <span className="font-medium">66.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminated</span>
                        <span className="font-medium">16.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cancelled</span>
                        <span className="font-medium">16.7%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Insights</CardTitle>
                <CardDescription>Data-driven insights from contract history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900">High Performance Carriers</div>
                      <div className="text-sm text-green-700">Maverick Transportation and Swift Transportation consistently deliver 95%+ on-time rates</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900">Contract Value Trends</div>
                      <div className="text-sm text-blue-700">Average contract value decreased by 15% year-over-year, focusing on efficiency</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-900">Risk Factors</div>
                      <div className="text-sm text-yellow-700">Expedite contracts have higher termination rates (25% vs 12% standard)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Strategic recommendations based on historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-medium">Focus on Top Performers</div>
                    <div className="text-sm text-muted-foreground">Prioritize contract renewals with carriers achieving 4.5+ performance ratings</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium">Improve Contract Terms</div>
                    <div className="text-sm text-muted-foreground">Review termination clauses for expedite contracts to reduce early exits</div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="font-medium">Diversify Contract Types</div>
                    <div className="text-sm text-muted-foreground">Consider more regional contracts to reduce dependency on long-haul services</div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="font-medium">Performance Monitoring</div>
                    <div className="text-sm text-muted-foreground">Implement monthly performance reviews for contracts under 4.0 rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Contract Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Contract Details</DialogTitle>
            <DialogDescription>
              Comprehensive details for {selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Carrier Information</Label>
                  <div className="mt-1">
                    <div className="text-lg font-semibold">{selectedContract?.carrierName}</div>
                    <div className="text-sm text-muted-foreground">{selectedContract?.contractNumber}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Contract Type</Label>
                    <div className="mt-1">{selectedContract && getTypeBadge(selectedContract.contractType)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">{selectedContract && getStatusBadge(selectedContract.status)}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Start Date</Label>
                    <div className="mt-1">{selectedContract?.startDate}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">End Date</Label>
                    <div className="mt-1">{selectedContract?.actualEndDate || selectedContract?.endDate}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Total Value</Label>
                    <div className="mt-1 text-lg font-semibold">${selectedContract?.totalValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Completed Value</Label>
                    <div className="mt-1 text-lg font-semibold">${selectedContract?.completedValue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium">Performance Rating</Label>
                <div className={`mt-1 text-2xl font-bold ${selectedContract && getPerformanceColor(selectedContract.performanceRating)}`}>
                  {selectedContract?.performanceRating.toFixed(1)}/5.0
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">On-Time Delivery</Label>
                <div className="mt-1 text-2xl font-bold">{selectedContract?.onTimePercentage.toFixed(1)}%</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Load Completion</Label>
                <div className="mt-1 text-2xl font-bold">
                  {selectedContract?.completedLoads}/{selectedContract?.totalLoads}
                </div>
              </div>
            </div>

            {selectedContract?.status === 'terminated' && selectedContract?.terminationReason && (
              <div>
                <Label className="text-sm font-medium">Termination Reason</Label>
                <div className="mt-1 p-3 bg-red-50 rounded-md text-sm text-red-700">
                  {selectedContract.terminationReason}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Financial Summary</Label>
                <div className="mt-1 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rate per Mile:</span>
                    <span className="font-medium">${selectedContract?.ratePerMile.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Settlement:</span>
                    <span className="font-medium">${selectedContract?.finalSettlement?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Payment:</span>
                    <span className="font-medium">{selectedContract?.lastPayment}</span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Value Completion</Label>
                <div className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full flex items-center justify-center text-xs text-white font-medium" 
                      style={{ width: `${selectedContract && calculateValuePercentage(selectedContract)}%` }}
                    >
                      {selectedContract && calculateValuePercentage(selectedContract).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedContract && handleDownloadContract(selectedContract.id)}>
              <Download className="w-4 h-4 mr-2" />
              Download Contract
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgreementHistoryPage;