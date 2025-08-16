/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Calculator,
  Calendar,
  Fuel,
  MapPin
} from 'lucide-react';

interface BusinessMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  target?: string;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

interface MonthlyData {
  month: string;
  revenue: number;
  miles: number;
  loads: number;
  expenses: number;
  profit: number;
  rpmLoaded: number;
  rpmTotal: number;
  utilizationRate: number;
}

const BusinessMetricsPage: React.FC = () => {
  const keyMetrics: BusinessMetric[] = [
    {
      id: '1',
      name: 'Total Revenue',
      value: '$24,580',
      change: 8.5,
      changeType: 'increase',
      period: 'This Month',
      target: '$25,000',
      status: 'good'
    },
    {
      id: '2',
      name: 'Net Profit',
      value: '$18,420',
      change: 12.3,
      changeType: 'increase',
      period: 'This Month',
      target: '$20,000',
      status: 'excellent'
    },
    {
      id: '3',
      name: 'Revenue Per Mile (Loaded)',
      value: '$2.85',
      change: -2.1,
      changeType: 'decrease',
      period: 'This Month',
      target: '$3.00',
      status: 'warning'
    },
    {
      id: '4',
      name: 'Revenue Per Mile (Total)',
      value: '$2.42',
      change: 3.2,
      changeType: 'increase',
      period: 'This Month',
      target: '$2.50',
      status: 'good'
    },
    {
      id: '5',
      name: 'Truck Utilization',
      value: '87%',
      change: 5.8,
      changeType: 'increase',
      period: 'This Month',
      target: '90%',
      status: 'good'
    },
    {
      id: '6',
      name: 'Average Load Value',
      value: '$2,840',
      change: -1.5,
      changeType: 'decrease',
      period: 'This Month',
      target: '$3,000',
      status: 'warning'
    },
    {
      id: '7',
      name: 'Fuel Efficiency',
      value: '6.8 MPG',
      change: 4.2,
      changeType: 'increase',
      period: 'This Month',
      target: '7.0 MPG',
      status: 'good'
    },
    {
      id: '8',
      name: 'On-Time Delivery',
      value: '96%',
      change: 2.1,
      changeType: 'increase',
      period: 'This Month',
      target: '98%',
      status: 'excellent'
    }
  ];

  const monthlyData: MonthlyData[] = [
    {
      month: 'Jan 2024',
      revenue: 24580,
      miles: 8620,
      loads: 14,
      expenses: 6160,
      profit: 18420,
      rpmLoaded: 2.85,
      rpmTotal: 2.42,
      utilizationRate: 87
    },
    {
      month: 'Dec 2023',
      revenue: 22650,
      miles: 8250,
      loads: 13,
      expenses: 5890,
      profit: 16760,
      rpmLoaded: 2.92,
      rpmTotal: 2.35,
      utilizationRate: 82
    },
    {
      month: 'Nov 2023',
      revenue: 23120,
      miles: 7980,
      loads: 15,
      expenses: 6420,
      profit: 16700,
      rpmLoaded: 2.78,
      rpmTotal: 2.28,
      utilizationRate: 89
    },
    {
      month: 'Oct 2023',
      revenue: 21850,
      miles: 7650,
      loads: 12,
      expenses: 5940,
      profit: 15910,
      rpmLoaded: 2.89,
      rpmTotal: 2.31,
      utilizationRate: 85
    },
    {
      month: 'Sep 2023',
      revenue: 25340,
      miles: 9120,
      loads: 16,
      expenses: 6580,
      profit: 18760,
      rpmLoaded: 2.95,
      rpmTotal: 2.48,
      utilizationRate: 91
    }
  ];

  const expenseBreakdown = [
    { category: 'Fuel', amount: 2840, percentage: 46.1, color: 'bg-red-500' },
    { category: 'Maintenance', amount: 980, percentage: 15.9, color: 'bg-blue-500' },
    { category: 'Insurance', amount: 750, percentage: 12.2, color: 'bg-green-500' },
    { category: 'Permits & Fees', amount: 420, percentage: 6.8, color: 'bg-yellow-500' },
    { category: 'Equipment Lease', amount: 650, percentage: 10.6, color: 'bg-purple-500' },
    { category: 'Other', amount: 520, percentage: 8.4, color: 'bg-gray-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getChangeIcon = (changeType: string, change: number) => {
    if (changeType === 'increase') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (changeType === 'decrease') {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Metrics</h1>
          <p className="text-muted-foreground">Track your business performance and profitability</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Last Updated: Today
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center gap-2">
                      {getChangeIcon(metric.changeType, metric.change)}
                      <span className={`text-sm ${
                        metric.changeType === 'increase' ? 'text-green-500' : 
                        metric.changeType === 'decrease' ? 'text-red-500' : 
                        'text-muted-foreground'
                      }`}>
                        {metric.changeType === 'increase' ? '+' : ''}
                        {metric.change}%
                      </span>
                      <span className="text-sm text-muted-foreground">vs last month</span>
                    </div>
                    {metric.target && (
                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue & Profit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue & Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="font-semibold">$24,580</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Expenses</span>
                    <span className="font-semibold text-red-600">$6,160</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold">Net Profit</span>
                    <span className="font-bold text-green-600">$18,420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profit Margin</span>
                    <Badge variant="default">75.0%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{expense.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">${expense.amount}</span>
                          <span className="text-xs text-muted-foreground">
                            {expense.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${expense.color} h-2 rounded-full`}
                          style={{ width: `${expense.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rate Analysis */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Rate Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">$2.85</div>
                    <div className="text-sm text-muted-foreground">Revenue per Loaded Mile</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$2.42</div>
                    <div className="text-sm text-muted-foreground">Revenue per Total Mile</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">$0.72</div>
                    <div className="text-sm text-muted-foreground">Cost per Mile</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">$1.70</div>
                    <div className="text-sm text-muted-foreground">Profit per Mile</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operational Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Operational Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Miles</span>
                    </div>
                    <span className="font-semibold">8,620 miles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Loaded Miles</span>
                    </div>
                    <span className="font-semibold">7,450 miles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Deadhead %</span>
                    </div>
                    <Badge variant="secondary">13.6%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Utilization Rate</span>
                    </div>
                    <Badge variant="default">87%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Fuel Efficiency</span>
                    </div>
                    <span className="font-semibold">6.8 MPG</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Load Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Load Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Loads</span>
                    <span className="font-semibold">14 loads</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Load Value</span>
                    <span className="font-semibold">$2,840</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Miles per Load</span>
                    <span className="font-semibold">532 miles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-Time Delivery</span>
                    <Badge variant="default">96%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Rating</span>
                    <Badge variant="default">4.8/5.0</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Miles</TableHead>
                    <TableHead>Loads</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>RPM (Loaded)</TableHead>
                    <TableHead>Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyData.map((month, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell>${month.revenue.toLocaleString()}</TableCell>
                      <TableCell>{month.miles.toLocaleString()}</TableCell>
                      <TableCell>{month.loads}</TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        ${month.profit.toLocaleString()}
                      </TableCell>
                      <TableCell>${month.rpmLoaded.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{month.utilizationRate}%</Badge>
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
};

export default BusinessMetricsPage;