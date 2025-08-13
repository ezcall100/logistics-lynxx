import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Search,
  FileText,
  PieChart
} from 'lucide-react';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Mock data for reports
  const profitLossData = {
    revenue: 1250000,
    expenses: 980000,
    netIncome: 270000,
    marginPercent: 21.6
  };

  const balanceSheetData = {
    totalAssets: 2500000,
    totalLiabilities: 1200000,
    equity: 1300000,
    currentRatio: 2.1
  };

  const cashFlowData = [
    { month: 'Jan', inflow: 125000, outflow: 98000, net: 27000 },
    { month: 'Feb', inflow: 142000, outflow: 105000, net: 37000 },
    { month: 'Mar', inflow: 158000, outflow: 112000, net: 46000 },
    { month: 'Apr', inflow: 167000, outflow: 125000, net: 42000 },
    { month: 'May', inflow: 189000, outflow: 134000, net: 55000 },
    { month: 'Jun', inflow: 195000, outflow: 128000, net: 67000 }
  ];

  const reportTypes = [
    {
      title: 'Profit & Loss',
      description: 'Revenue and expense breakdown',
      icon: TrendingUp,
      value: '$270K',
      change: '+12.5%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Balance Sheet',
      description: 'Assets, liabilities, and equity',
      icon: BarChart3,
      value: '$2.5M',
      change: '+8.2%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Cash Flow',
      description: 'Cash inflows and outflows',
      icon: DollarSign,
      value: '$67K',
      change: '+22.1%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Financial Dashboard',
      description: 'Key performance indicators',
      icon: PieChart,
      value: '95%',
      change: '+5.3%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentReports = [
    { id: 1, name: 'Monthly P&L Report - June 2024', type: 'P&L', date: '2024-06-30', status: 'completed' },
    { id: 2, name: 'Q2 Balance Sheet', type: 'Balance Sheet', date: '2024-06-30', status: 'completed' },
    { id: 3, name: 'Cash Flow Analysis - Q2', type: 'Cash Flow', date: '2024-06-28', status: 'completed' },
    { id: 4, name: 'YTD Financial Summary', type: 'Dashboard', date: '2024-06-25', status: 'completed' },
    { id: 5, name: 'Monthly P&L Report - May 2024', type: 'P&L', date: '2024-05-31', status: 'completed' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Comprehensive financial analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report, index) => {
          const IconComponent = report.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${report.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <Badge variant={report.change.startsWith('+') ? 'default' : 'destructive'}>
                    {report.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-2xl font-bold mt-2">{report.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profit-loss" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="profit-loss" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>Revenue and expense breakdown for the current period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${profitLossData.revenue.toLocaleString()}
                  </p>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${profitLossData.expenses.toLocaleString()}
                  </p>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${profitLossData.netIncome.toLocaleString()}
                  </p>
                  <Progress value={22} className="h-2" />
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Profit Margin: <span className="font-semibold text-green-600">{profitLossData.marginPercent}%</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance-sheet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>Assets, liabilities, and equity overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${balanceSheetData.totalAssets.toLocaleString()}
                  </p>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${balanceSheetData.totalLiabilities.toLocaleString()}
                  </p>
                  <Progress value={48} className="h-2" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Equity</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${balanceSheetData.equity.toLocaleString()}
                  </p>
                  <Progress value={52} className="h-2" />
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Current Ratio: <span className="font-semibold text-green-600">{balanceSheetData.currentRatio}:1</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
              <CardDescription>Monthly cash inflows and outflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cashFlowData.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-medium w-12">{month.month}</div>
                      <div className="text-sm text-muted-foreground">
                        In: ${month.inflow.toLocaleString()} | Out: ${month.outflow.toLocaleString()}
                      </div>
                    </div>
                    <div className={`font-semibold ${month.net > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {month.net > 0 ? '+' : ''}${month.net.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Revenue Growth</span>
                  <span className="text-sm font-semibold text-green-600">+15.2%</span>
                </div>
                <Progress value={76} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Expense Control</span>
                  <span className="text-sm font-semibold text-blue-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cash Position</span>
                  <span className="text-sm font-semibold text-purple-600">Strong</span>
                </div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.slice(0, 4).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;