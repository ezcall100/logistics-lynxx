import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  FileText,
  Search,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface EarningsRecord {
  id: string;
  weekEnding: string;
  grossEarnings: number;
  deductions: number;
  netPay: number;
  miles: number;
  loads: number;
  status: 'paid' | 'pending' | 'processing';
  payDate: string;
}

interface PayrollSummary {
  period: string;
  totalEarnings: number;
  totalMiles: number;
  totalLoads: number;
  averagePerMile: number;
  averagePerLoad: number;
}

const EarningsOverviewPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  // Mock data for earnings records
  const earningsRecords: EarningsRecord[] = [
    {
      id: '1',
      weekEnding: '2024-01-14',
      grossEarnings: 2850.00,
      deductions: 285.00,
      netPay: 2565.00,
      miles: 1420,
      loads: 5,
      status: 'paid',
      payDate: '2024-01-16'
    },
    {
      id: '2', 
      weekEnding: '2024-01-07',
      grossEarnings: 3200.00,
      deductions: 320.00,
      netPay: 2880.00,
      miles: 1600,
      loads: 6,
      status: 'paid',
      payDate: '2024-01-09'
    },
    {
      id: '3',
      weekEnding: '2023-12-31',
      grossEarnings: 2650.00,
      deductions: 265.00,
      netPay: 2385.00,
      miles: 1325,
      loads: 4,
      status: 'paid',
      payDate: '2024-01-02'
    },
    {
      id: '4',
      weekEnding: '2024-01-21',
      grossEarnings: 2950.00,
      deductions: 295.00,
      netPay: 2655.00,
      miles: 1475,
      loads: 5,
      status: 'processing',
      payDate: '2024-01-23'
    },
    {
      id: '5',
      weekEnding: '2024-01-28',
      grossEarnings: 3100.00,
      deductions: 310.00,
      netPay: 2790.00,
      miles: 1550,
      loads: 6,
      status: 'pending',
      payDate: '2024-01-30'
    }
  ];

  // Mock data for payroll summary
  const payrollSummary: PayrollSummary = {
    period: 'January 2024',
    totalEarnings: 14750.00,
    totalMiles: 7370,
    totalLoads: 26,
    averagePerMile: 2.00,
    averagePerLoad: 567.31
  };

  const filteredRecords = earningsRecords.filter(record => {
    const matchesSearch = record.weekEnding.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'default',
      pending: 'secondary', 
      processing: 'outline'
    } as const;
    
    const icons = {
      paid: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      processing: <RefreshCw className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewDetails = (recordId: string) => {
    toast.success(`Viewing earnings details for record ${recordId}`);
  };

  const handleDownloadPaystub = (recordId: string) => {
    toast.success(`Downloading paystub for record ${recordId}`);
  };

  const handleRequestAdvance = () => {
    toast.success('Pay advance request submitted for review');
  };

  const handleExportData = () => {
    toast.success('Earnings data exported successfully');
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Earnings Overview</h1>
          <p className="text-muted-foreground">Track your earnings, payments, and financial performance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRequestAdvance} variant="outline">
            <DollarSign className="w-4 h-4 mr-2" />
            Request Advance
          </Button>
          <Button onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.totalMiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +8.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Mile</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.averagePerMile.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 inline mr-1" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loads</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.totalLoads}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings Progress</CardTitle>
          <CardDescription>Track your progress toward monthly earning goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Earnings</span>
              <span className="font-medium">${payrollSummary.totalEarnings.toLocaleString()} / $20,000</span>
            </div>
            <Progress value={(payrollSummary.totalEarnings / 20000) * 100} className="h-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Days Remaining</div>
              <div className="text-2xl font-bold">3</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Projected Total</div>
              <div className="text-2xl font-bold">${(payrollSummary.totalEarnings * 1.2).toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Goal Achievement</div>
              <div className="text-2xl font-bold">74%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>View and manage your earnings records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by date or status..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="period-filter">Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Earnings Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week Ending</TableHead>
                  <TableHead>Gross Earnings</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Miles</TableHead>
                  <TableHead>Loads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.weekEnding}</TableCell>
                    <TableCell>${record.grossEarnings.toLocaleString()}</TableCell>
                    <TableCell>${record.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">${record.netPay.toLocaleString()}</TableCell>
                    <TableCell>{record.miles.toLocaleString()}</TableCell>
                    <TableCell>{record.loads}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>{record.payDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(record.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadPaystub(record.id)}
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

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No earnings records found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsOverviewPage;