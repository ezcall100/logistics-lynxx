/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart,
  FileText,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const FinancialReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState<unknown>(null);

  // Financial Summary Data
  const financialSummary = {
    totalRevenue: 2847350,
    totalExpenses: 1892460,
    netProfit: 954890,
    profitMargin: 33.5,
    previousRevenue: 2543210,
    previousExpenses: 1745830,
    previousProfit: 797380,
    revenueGrowth: 11.9,
    expenseGrowth: 8.4,
    profitGrowth: 19.8
  };

  // Revenue Breakdown
  const revenueBreakdown = [
    {
      category: 'Truckload Services',
      amount: 1524890,
      percentage: 53.5,
      change: '+15.2%',
      trend: 'up'
    },
    {
      category: 'LTL Services',
      amount: 687450,
      percentage: 24.1,
      change: '+8.7%',
      trend: 'up'
    },
    {
      category: 'Intermodal',
      amount: 342180,
      percentage: 12.0,
      change: '+12.3%',
      trend: 'up'
    },
    {
      category: 'Specialty Services',
      amount: 196830,
      percentage: 6.9,
      change: '-2.1%',
      trend: 'down'
    },
    {
      category: 'Other Revenue',
      amount: 96000,
      percentage: 3.4,
      change: '+5.8%',
      trend: 'up'
    }
  ];

  // Expense Categories
  const expenseCategories = [
    {
      category: 'Fuel Costs',
      amount: 567890,
      percentage: 30.0,
      change: '+12.5%',
      trend: 'up',
      budget: 550000,
      variance: 17890
    },
    {
      category: 'Driver Wages',
      amount: 456720,
      percentage: 24.1,
      change: '+6.8%',
      trend: 'up',
      budget: 460000,
      variance: -3280
    },
    {
      category: 'Vehicle Maintenance',
      amount: 298450,
      percentage: 15.8,
      change: '+8.9%',
      trend: 'up',
      budget: 285000,
      variance: 13450
    },
    {
      category: 'Insurance',
      amount: 189340,
      percentage: 10.0,
      change: '+3.2%',
      trend: 'up',
      budget: 185000,
      variance: 4340
    },
    {
      category: 'Equipment Lease',
      amount: 156780,
      percentage: 8.3,
      change: '+1.5%',
      trend: 'up',
      budget: 155000,
      variance: 1780
    },
    {
      category: 'Administrative',
      amount: 223280,
      percentage: 11.8,
      change: '+4.1%',
      trend: 'up',
      budget: 215000,
      variance: 8280
    }
  ];

  // Monthly Financial Data
  const monthlyData = [
    { month: 'Jan 2024', revenue: 245680, expenses: 167890, profit: 77790, margin: 31.7 },
    { month: 'Feb 2024', revenue: 267340, expenses: 179450, profit: 87890, margin: 32.9 },
    { month: 'Mar 2024', revenue: 289760, expenses: 186730, profit: 103030, margin: 35.6 },
    { month: 'Apr 2024', revenue: 298450, expenses: 195680, profit: 102770, margin: 34.4 },
    { month: 'May 2024', revenue: 312890, expenses: 201340, profit: 111550, margin: 35.7 },
    { month: 'Jun 2024', revenue: 334570, expenses: 210890, profit: 123680, margin: 37.0 },
    { month: 'Jul 2024', revenue: 356780, expenses: 218960, profit: 137820, margin: 38.6 },
    { month: 'Aug 2024', revenue: 289340, expenses: 195670, profit: 93670, margin: 32.4 },
    { month: 'Sep 2024', revenue: 312450, expenses: 208340, profit: 104110, margin: 33.3 },
    { month: 'Oct 2024', revenue: 345670, expenses: 224580, profit: 121090, margin: 35.0 },
    { month: 'Nov 2024', revenue: 367890, expenses: 239870, profit: 128020, margin: 34.8 },
    { month: 'Dec 2024', revenue: 389560, expenses: 258060, profit: 131500, margin: 33.7 }
  ];

  // Customer Profitability
  const customerProfitability = [
    {
      customer: 'Walmart Distribution',
      revenue: 486750,
      expenses: 298450,
      profit: 188300,
      margin: 38.7,
      loads: 234,
      avgRevenue: 2080
    },
    {
      customer: 'Amazon Logistics',
      revenue: 423680,
      expenses: 276890,
      profit: 146790,
      margin: 34.6,
      loads: 189,
      avgRevenue: 2242
    },
    {
      customer: 'Home Depot Supply',
      revenue: 356890,
      expenses: 241670,
      profit: 115220,
      margin: 32.3,
      loads: 156,
      avgRevenue: 2288
    },
    {
      customer: 'FedEx Ground',
      revenue: 298450,
      expenses: 198670,
      profit: 99780,
      margin: 33.4,
      loads: 134,
      avgRevenue: 2228
    },
    {
      customer: 'UPS Supply Chain',
      revenue: 267890,
      expenses: 189340,
      profit: 78550,
      margin: 29.3,
      loads: 98,
      avgRevenue: 2734
    }
  ];

  // Report Templates
  const reportTemplates = [
    {
      id: 1,
      name: 'Monthly P&L Statement',
      description: 'Comprehensive profit and loss statement',
      lastGenerated: '2024-01-15',
      frequency: 'Monthly',
      status: 'active'
    },
    {
      id: 2,
      name: 'Revenue by Customer',
      description: 'Customer-wise revenue breakdown',
      lastGenerated: '2024-01-14',
      frequency: 'Weekly',
      status: 'active'
    },
    {
      id: 3,
      name: 'Expense Analysis',
      description: 'Detailed expense category analysis',
      lastGenerated: '2024-01-13',
      frequency: 'Monthly',
      status: 'active'
    },
    {
      id: 4,
      name: 'Cash Flow Report',
      description: 'Cash inflow and outflow analysis',
      lastGenerated: '2024-01-12',
      frequency: 'Weekly',
      status: 'paused'
    }
  ];

  const handleGenerateReport = (templateId?: number) => {
    if (templateId) {
      toast.success(`Generating report from template ${templateId}...`);
    } else {
      toast.success('Generating custom financial report...');
    }
  };

  const handleDownloadReport = (format: string) => {
    toast.success(`Downloading report in ${format} format...`);
  };

  const handleExportData = (dataType: string) => {
    toast.success(`Exporting ${dataType} data...`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive financial analytics and reporting
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => handleGenerateReport()}>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(financialSummary.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      +{financialSummary.revenueGrowth}%
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(financialSummary.totalExpenses)}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      +{financialSummary.expenseGrowth}%
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-red-50">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(financialSummary.netProfit)}
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      +{financialSummary.profitGrowth}%
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {financialSummary.profitMargin}%
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">+2.3%</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Different Report Views */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Revenue, expenses, and profit trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Expenses</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Margin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyData.slice(-6).map((month) => (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">{month.month}</TableCell>
                          <TableCell className="text-green-600">
                            {formatCurrency(month.revenue)}
                          </TableCell>
                          <TableCell>{formatCurrency(month.expenses)}</TableCell>
                          <TableCell className="text-blue-600 font-semibold">
                            {formatCurrency(month.profit)}
                          </TableCell>
                          <TableCell>{month.margin}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Generate and export financial reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleDownloadReport('PDF')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download P&L Statement (PDF)
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleDownloadReport('Excel')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleExportData('Revenue')}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Revenue Analysis
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleExportData('Expenses')}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Expense Breakdown
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueBreakdown.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          {formatCurrency(item.amount)}
                        </TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                        <TableCell>
                          <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                            {item.change}
                          </span>
                        </TableCell>
                        <TableCell>
                          {item.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>Detailed breakdown of expenses vs budget</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>% of Total</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseCategories.map((expense) => (
                      <TableRow key={expense.category}>
                        <TableCell className="font-medium">{expense.category}</TableCell>
                        <TableCell>{formatCurrency(expense.amount)}</TableCell>
                        <TableCell>{formatCurrency(expense.budget)}</TableCell>
                        <TableCell className={getVarianceColor(expense.variance)}>
                          {expense.variance > 0 ? '+' : ''}{formatCurrency(expense.variance)}
                        </TableCell>
                        <TableCell>{expense.percentage}%</TableCell>
                        <TableCell>
                          <span className={expense.trend === 'up' ? 'text-red-600' : 'text-green-600'}>
                            {expense.change}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Profitability</CardTitle>
                <CardDescription>Profitability analysis by customer</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Loads</TableHead>
                      <TableHead>Avg Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerProfitability.map((customer) => (
                      <TableRow key={customer.customer}>
                        <TableCell className="font-medium">{customer.customer}</TableCell>
                        <TableCell className="text-green-600">
                          {formatCurrency(customer.revenue)}
                        </TableCell>
                        <TableCell>{formatCurrency(customer.expenses)}</TableCell>
                        <TableCell className="text-blue-600 font-semibold">
                          {formatCurrency(customer.profit)}
                        </TableCell>
                        <TableCell>{customer.margin}%</TableCell>
                        <TableCell>{customer.loads}</TableCell>
                        <TableCell>{formatCurrency(customer.avgRevenue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>Manage and generate reports from templates</CardDescription>
                </div>
                <Button onClick={() => handleGenerateReport()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Last Generated</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.description}</TableCell>
                        <TableCell>{template.lastGenerated}</TableCell>
                        <TableCell>{template.frequency}</TableCell>
                        <TableCell>
                          <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                            {template.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleGenerateReport(template.id)}
                            >
                              Generate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
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
    </Layout>
  );
};

export default FinancialReportsPage;