/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  CreditCard,
  Wallet,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Filter
} from 'lucide-react';

const FinancialDashboardPage = () => {
  const metrics = [
    { title: 'Total Revenue', value: '$2,847,650', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { title: 'Net Profit', value: '$456,890', change: '+8.2%', trend: 'up', icon: DollarSign },
    { title: 'Total Expenses', value: '$1,234,560', change: '-3.1%', trend: 'down', icon: Receipt },
    { title: 'Cash Flow', value: '$789,450', change: '+15.7%', trend: 'up', icon: Wallet },
  ];

  const recentTransactions = [
    { id: 'TXN-001', type: 'Invoice Payment', amount: 4500, status: 'completed', date: '2024-01-15' },
    { id: 'TXN-002', type: 'Fuel Expense', amount: -850, status: 'completed', date: '2024-01-14' },
    { id: 'TXN-003', type: 'Service Payment', amount: 2300, status: 'pending', date: '2024-01-13' },
  ];

  const budgetData = [
    { category: 'Operations', budget: 150000, spent: 125000, percentage: 83 },
    { category: 'Marketing', budget: 50000, spent: 35000, percentage: 70 },
    { category: 'Maintenance', budget: 80000, spent: 72000, percentage: 90 },
    { category: 'Insurance', budget: 120000, spent: 95000, percentage: 79 },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-muted-foreground">Overview of your financial performance and metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.amount > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Current month budget utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetData.map((budget) => (
                  <div key={budget.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{budget.category}</span>
                      <span className="text-muted-foreground">
                        ${budget.spent.toLocaleString()} / ${budget.budget.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={budget.percentage} 
                      className={`h-2 ${budget.percentage > 85 ? 'bg-red-100' : 'bg-green-100'}`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{budget.percentage}% used</span>
                      <span>${(budget.budget - budget.spent).toLocaleString()} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Receipt className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Record Payment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Payment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>7 overdue invoices</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>12 bills due this week</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Reconciliation up to date</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Payroll Processing</p>
                    <p className="text-muted-foreground">Due: Jan 31, 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Tax Filing</p>
                    <p className="text-muted-foreground">Due: Feb 15, 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Monthly Reports</p>
                    <p className="text-muted-foreground">Due: Feb 1, 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Revenue analysis charts and detailed breakdowns will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>Detailed expense breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Expense analysis charts and detailed breakdowns will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>Predictive analysis and future projections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Financial forecasting models and projections will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FinancialDashboardPage;