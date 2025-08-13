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
  FileText, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Eye,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface PayrollReport {
  id: string;
  reportType: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  period: string;
  generatedDate: string;
  grossPay: number;
  netPay: number;
  totalDeductions: number;
  taxesWithheld: number;
  status: 'processing' | 'completed' | 'archived';
  downloadUrl?: string;
}

interface DeductionBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

interface PayrollSummary {
  currentPeriod: string;
  grossEarnings: number;
  netPay: number;
  yearToDateGross: number;
  yearToDateNet: number;
  taxRate: number;
  deductionRate: number;
}

const PayrollReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock data for payroll reports
  const payrollReports: PayrollReport[] = [
    {
      id: '1',
      reportType: 'weekly',
      period: 'Week ending Jan 21, 2024',
      generatedDate: '2024-01-22',
      grossPay: 2850.00,
      netPay: 2280.00,
      totalDeductions: 570.00,
      taxesWithheld: 427.50,
      status: 'completed'
    },
    {
      id: '2',
      reportType: 'weekly',
      period: 'Week ending Jan 14, 2024',
      generatedDate: '2024-01-15',
      grossPay: 3200.00,
      netPay: 2560.00,
      totalDeductions: 640.00,
      taxesWithheld: 480.00,
      status: 'completed'
    },
    {
      id: '3',
      reportType: 'monthly',
      period: 'December 2023',
      generatedDate: '2024-01-02',
      grossPay: 14750.00,
      netPay: 11800.00,
      totalDeductions: 2950.00,
      taxesWithheld: 2212.50,
      status: 'completed'
    },
    {
      id: '4',
      reportType: 'quarterly',
      period: 'Q4 2023',
      generatedDate: '2024-01-05',
      grossPay: 42500.00,
      netPay: 34000.00,
      totalDeductions: 8500.00,
      taxesWithheld: 6375.00,
      status: 'completed'
    },
    {
      id: '5',
      reportType: 'weekly',
      period: 'Week ending Jan 28, 2024',
      generatedDate: '2024-01-29',
      grossPay: 3100.00,
      netPay: 2480.00,
      totalDeductions: 620.00,
      taxesWithheld: 465.00,
      status: 'processing'
    }
  ];

  // Mock data for payroll summary
  const payrollSummary: PayrollSummary = {
    currentPeriod: 'January 2024',
    grossEarnings: 14750.00,
    netPay: 11800.00,
    yearToDateGross: 14750.00,
    yearToDateNet: 11800.00,
    taxRate: 15.0,
    deductionRate: 20.0
  };

  // Mock data for deduction breakdown
  const deductionBreakdown: DeductionBreakdown[] = [
    {
      category: 'Federal Income Tax',
      amount: 1770.00,
      percentage: 12.0,
      description: 'Federal income tax withholding'
    },
    {
      category: 'State Income Tax',
      amount: 442.50,
      percentage: 3.0,
      description: 'State income tax withholding'
    },
    {
      category: 'Social Security',
      amount: 914.50,
      percentage: 6.2,
      description: 'Social Security tax contribution'
    },
    {
      category: 'Medicare',
      amount: 213.88,
      percentage: 1.45,
      description: 'Medicare tax contribution'
    },
    {
      category: 'Health Insurance',
      amount: 350.00,
      percentage: 2.37,
      description: 'Health insurance premium'
    },
    {
      category: 'Retirement Plan',
      amount: 738.00,
      percentage: 5.0,
      description: '401(k) contribution'
    }
  ];

  const filteredReports = payrollReports.filter(report => {
    const matchesSearch = report.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportTypeFilter === 'all' || report.reportType === reportTypeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      processing: 'secondary',
      completed: 'default',
      archived: 'outline'
    } as const;
    
    const icons = {
      processing: <AlertCircle className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
      archived: <FileText className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getReportTypeBadge = (type: string) => {
    const colors = {
      weekly: 'bg-blue-100 text-blue-800',
      monthly: 'bg-green-100 text-green-800',
      quarterly: 'bg-purple-100 text-purple-800',
      yearly: 'bg-orange-100 text-orange-800'
    };

    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleViewReport = (reportId: string) => {
    toast.success(`Opening payroll report ${reportId}`);
  };

  const handleDownloadReport = (reportId: string) => {
    toast.success(`Downloading payroll report ${reportId}`);
  };

  const handleGenerateReport = () => {
    toast.success('Generating new payroll report...');
  };

  const handleExportAllReports = () => {
    toast.success('Exporting all payroll reports');
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Reports</h1>
          <p className="text-muted-foreground">View and manage your payroll reports and earnings data</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleExportAllReports} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button onClick={handleGenerateReport}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.grossEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.netPay.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +10.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.taxRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 inline mr-1" />
              -0.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Gross</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${payrollSummary.yearToDateGross.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Year to date earnings
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="breakdown">Deduction Breakdown</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>View and download your payroll reports by period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="type-filter">Report Type</Label>
                  <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reports Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Gross Pay</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.period}</TableCell>
                        <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
                        <TableCell>{report.generatedDate}</TableCell>
                        <TableCell>${report.grossPay.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">${report.netPay.toLocaleString()}</TableCell>
                        <TableCell>${report.totalDeductions.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewReport(report.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                              disabled={report.status === 'processing'}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deduction Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of payroll deductions and taxes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deductionBreakdown.map((deduction, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{deduction.category}</div>
                        <div className="text-sm text-muted-foreground">{deduction.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${deduction.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{deduction.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={deduction.percentage} className="h-2" />
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <div>Total Deductions</div>
                    <div>${deductionBreakdown.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Earnings Trend
                </CardTitle>
                <CardDescription>Monthly earnings comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>January 2024</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">$14,750</span>
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>December 2023</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">$13,200</span>
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>November 2023</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">$15,100</span>
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Tax Distribution
                </CardTitle>
                <CardDescription>Breakdown of tax withholdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Federal Income Tax</span>
                    <span className="font-semibold">12.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Social Security</span>
                    <span className="font-semibold">6.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>State Income Tax</span>
                    <span className="font-semibold">3.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medicare</span>
                    <span className="font-semibold">1.45%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollReportsPage;