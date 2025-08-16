/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3
} from 'lucide-react';

const FinancialDashboard = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2,847,395",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      description: "This month"
    },
    {
      title: "Outstanding AR",
      value: "$486,230",
      change: "-8.1%",
      trend: "down",
      icon: TrendingUp,
      description: "Past due accounts"
    },
    {
      title: "Pending AP",
      value: "$234,890",
      change: "+5.2%",
      trend: "up",
      icon: TrendingDown,
      description: "Due this week"
    },
    {
      title: "Cash Flow",
      value: "$1,456,780",
      change: "+18.7%",
      trend: "up",
      icon: Activity,
      description: "Available balance"
    }
  ];

  const recentTransactions = [
    { id: "INV-2024-001", customer: "Global Logistics Corp", amount: "$45,250", status: "paid", date: "2024-01-15" },
    { id: "INV-2024-002", customer: "FastTrack Shipping", amount: "$32,180", status: "pending", date: "2024-01-14" },
    { id: "INV-2024-003", customer: "Prime Transport", amount: "$58,920", status: "overdue", date: "2024-01-12" },
    { id: "INV-2024-004", customer: "Metro Freight", amount: "$21,450", status: "paid", date: "2024-01-11" },
    { id: "INV-2024-005", customer: "Express Carriers", amount: "$67,340", status: "pending", date: "2024-01-10" }
  ];

  const cashFlowData = [
    { month: "Jan", income: 285000, expenses: 180000 },
    { month: "Feb", income: 320000, expenses: 195000 },
    { month: "Mar", income: 275000, expenses: 175000 },
    { month: "Apr", income: 405000, expenses: 250000 },
    { month: "May", income: 380000, expenses: 220000 },
    { month: "Jun", income: 425000, expenses: 275000 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "default" as const,
      pending: "secondary" as const,
      overdue: "destructive" as const
    };
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
          <p className="text-muted-foreground">Complete overview of your financial operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <PieChart className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest financial activities and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{transaction.id}</div>
                      <div className="text-sm text-muted-foreground">{transaction.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{transaction.amount}</div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Cash Flow Summary
            </CardTitle>
            <CardDescription>Monthly income vs expenses analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashFlowData.slice(-3).map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{month.month} 2024</span>
                    <span className="text-sm text-muted-foreground">
                      Net: ${(month.income - month.expenses).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600">Income: ${month.income.toLocaleString()}</span>
                      <span className="text-red-600">Expenses: ${month.expenses.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(month.income - month.expenses) / month.income * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Financial Actions</CardTitle>
          <CardDescription>Frequently used financial operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <DollarSign className="w-6 h-6" />
              <span>Create Invoice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <CreditCard className="w-6 h-6" />
              <span>Record Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Manage Customers</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <PieChart className="w-6 h-6" />
              <span>Financial Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;