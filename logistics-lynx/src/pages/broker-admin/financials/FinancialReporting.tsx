import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Eye,
  Filter,
  FileText,
  Calculator,
  Building,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const FinancialReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');

  const reportTypes = [
    {
      id: "profit_loss",
      title: "Profit & Loss Statement",
      description: "Comprehensive P&L report showing revenue, expenses, and net income",
      icon: TrendingUp,
      lastGenerated: "2024-02-01",
      frequency: "Monthly"
    },
    {
      id: "balance_sheet",
      title: "Balance Sheet",
      description: "Assets, liabilities, and equity snapshot",
      icon: Calculator,
      lastGenerated: "2024-02-01",
      frequency: "Monthly"
    },
    {
      id: "cash_flow",
      title: "Cash Flow Statement",
      description: "Operating, investing, and financing activities",
      icon: Activity,
      lastGenerated: "2024-02-01",
      frequency: "Monthly"
    },
    {
      id: "ar_aging",
      title: "AR Aging Report",
      description: "Outstanding receivables by aging periods",
      icon: Building,
      lastGenerated: "2024-02-05",
      frequency: "Weekly"
    },
    {
      id: "ap_aging",
      title: "AP Aging Report", 
      description: "Outstanding payables by aging periods",
      icon: Users,
      lastGenerated: "2024-02-05",
      frequency: "Weekly"
    },
    {
      id: "customer_profitability",
      title: "Customer Profitability",
      description: "Revenue and margin analysis by customer",
      icon: PieChart,
      lastGenerated: "2024-02-01",
      frequency: "Monthly"
    }
  ];

  const kpiMetrics = [
    {
      title: "Revenue Growth",
      current: 2847395,
      previous: 2534280,
      change: 12.3,
      period: "vs Last Month",
      icon: DollarSign
    },
    {
      title: "Gross Margin", 
      current: 23.5,
      previous: 21.8,
      change: 1.7,
      period: "Percentage Points",
      icon: TrendingUp,
      isPercentage: true
    },
    {
      title: "Operating Ratio",
      current: 89.2,
      previous: 91.4,
      change: -2.2,
      period: "Percentage Points", 
      icon: Calculator,
      isPercentage: true
    },
    {
      title: "DSO (Days Sales Outstanding)",
      current: 32,
      previous: 35,
      change: -3,
      period: "Days",
      icon: Calendar
    }
  ];

  const topCustomers = [
    { name: "Global Logistics Corp", revenue: 125680, margin: 18.5, loads: 23 },
    { name: "Prime Transport", revenue: 98450, margin: 22.1, loads: 18 },
    { name: "FastTrack Shipping", revenue: 87320, margin: 19.8, loads: 15 },
    { name: "Express Carriers", revenue: 76540, margin: 25.2, loads: 12 },
    { name: "Metro Freight", revenue: 65890, margin: 16.4, loads: 14 }
  ];

  const monthlyPL = [
    { 
      category: "Revenue",
      current: 2847395,
      budget: 2800000,
      variance: 47395,
      percentOfBudget: 101.7
    },
    {
      category: "Direct Costs",
      current: 2178450,
      budget: 2156000,
      variance: -22450,
      percentOfBudget: 101.0
    },
    {
      category: "Gross Profit",
      current: 668945,
      budget: 644000,
      variance: 24945,
      percentOfBudget: 103.9
    },
    {
      category: "Operating Expenses",
      current: 456780,
      budget: 475000,
      variance: 18220,
      percentOfBudget: 96.2
    },
    {
      category: "Net Income",
      current: 212165,
      budget: 169000,
      variance: 43165,
      percentOfBudget: 125.5
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reporting</h1>
          <p className="text-muted-foreground">Comprehensive financial analysis and reporting</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Select Period
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {metric.isPercentage ? 
                  formatPercentage(metric.current) : 
                  (metric.title.includes('DSO') ? `${metric.current}` : formatCurrency(metric.current))
                }
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {metric.change > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={metric.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {metric.change > 0 ? '+' : ''}{metric.change}{metric.isPercentage ? 'pp' : ''}
                </span>
                <span>{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Standard Reports</TabsTrigger>
          <TabsTrigger value="profitloss">P&L Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Financial Reports</CardTitle>
              <CardDescription>Generate and download comprehensive financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {reportTypes.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <report.icon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-foreground">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>Last generated: {report.lastGenerated}</span>
                          <span>Frequency: {report.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitloss" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Analysis</CardTitle>
              <CardDescription>Current month performance vs budget</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>% of Budget</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyPL.map((item) => (
                    <TableRow key={item.category}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(item.current)}</TableCell>
                      <TableCell>{formatCurrency(item.budget)}</TableCell>
                      <TableCell>
                        <span className={item.variance > 0 ? 'text-green-600' : 'text-red-600'}>
                          {item.variance > 0 ? '+' : ''}{formatCurrency(item.variance)}
                        </span>
                      </TableCell>
                      <TableCell>{formatPercentage(item.percentOfBudget)}</TableCell>
                      <TableCell>
                        <Progress 
                          value={Math.min(item.percentOfBudget, 150)} 
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Customer Performance</CardTitle>
              <CardDescription>Revenue and profitability analysis by customer</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Gross Margin</TableHead>
                    <TableHead>Load Count</TableHead>
                    <TableHead>Avg Revenue/Load</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer) => (
                    <TableRow key={customer.name}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(customer.revenue)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-medium">{formatPercentage(customer.margin)}</span>
                          <Progress value={customer.margin} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>{customer.loads}</TableCell>
                      <TableCell>{formatCurrency(customer.revenue / customer.loads)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create custom financial reports with specific criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <p>Custom report builder features</p>
                <p className="text-sm">Build tailored reports with custom date ranges, filters, and metrics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReporting;