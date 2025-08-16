/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  CreditCard,
  Building,
  Users,
  Calendar,
  AlertTriangle,
  PieChart
} from 'lucide-react';

const FinancialsPage = () => {
  // Financial metrics data
  const financialMetrics = {
    totalRevenue: 2450000,
    totalExpenses: 1876000,
    netIncome: 574000,
    grossMargin: 23.4,
    monthlyGrowth: 8.2,
    cashFlow: 890000
  };

  const recentTransactions = [
    { id: 1, date: '2024-06-30', description: 'Customer Payment - ABC Logistics', amount: 25750, type: 'income' },
    { id: 2, date: '2024-06-30', description: 'Fuel Expense - Shell', amount: -12400, type: 'expense' },
    { id: 3, date: '2024-06-29', description: 'Driver Payroll', amount: -45600, type: 'expense' },
    { id: 4, date: '2024-06-29', description: 'Load Payment - XYZ Corp', amount: 18950, type: 'income' },
    { id: 5, date: '2024-06-28', description: 'Insurance Premium', amount: -8900, type: 'expense' }
  ];

  const upcomingPayments = [
    { id: 1, dueDate: '2024-07-15', vendor: 'Premium Fuel Co.', amount: 18500, status: 'pending' },
    { id: 2, dueDate: '2024-07-20', vendor: 'Maintenance Plus', amount: 6750, status: 'pending' },
    { id: 3, dueDate: '2024-07-25', vendor: 'Insurance Partners', amount: 12300, status: 'approved' },
    { id: 4, dueDate: '2024-07-30', vendor: 'Equipment Lease', amount: 4200, status: 'pending' }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `$${financialMetrics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Net Income',
      value: `$${financialMetrics.netIncome.toLocaleString()}`,
      change: '+8.7%',
      icon: TrendingUp,
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Expenses',
      value: `$${financialMetrics.totalExpenses.toLocaleString()}`,
      change: '+5.3%',
      icon: BarChart3,
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Cash Flow',
      value: `$${financialMetrics.cashFlow.toLocaleString()}`,
      change: '+15.2%',
      icon: TrendingUp,
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-muted-foreground">Comprehensive financial dashboard and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                  <Badge variant={kpi.trend === 'up' ? 'default' : 'destructive'}>
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{kpi.title}</h3>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial transactions and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                      {transaction.type === 'income' ? 
                        <TrendingUp className="h-4 w-4 text-green-600" /> : 
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Scheduled payments and obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-blue-50">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.vendor}</p>
                      <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Payments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Health Summary</CardTitle>
          <CardDescription>Key performance indicators and health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gross Margin</span>
                <span className="text-sm font-semibold text-green-600">{financialMetrics.grossMargin}%</span>
              </div>
              <Progress value={financialMetrics.grossMargin} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Monthly Growth</span>
                <span className="text-sm font-semibold text-blue-600">+{financialMetrics.monthlyGrowth}%</span>
              </div>
              <Progress value={financialMetrics.monthlyGrowth * 10} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expense Ratio</span>
                <span className="text-sm font-semibold text-orange-600">76.6%</span>
              </div>
              <Progress value={76.6} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-16 flex flex-col items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          <span className="text-sm">Process Payment</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
          <Users className="h-5 w-5" />
          <span className="text-sm">Run Payroll</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
          <PieChart className="h-5 w-5" />
          <span className="text-sm">Generate Report</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">View Alerts</span>
        </Button>
      </div>
    </div>
  );
};

export default FinancialsPage;