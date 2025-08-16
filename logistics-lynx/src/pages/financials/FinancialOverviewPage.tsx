/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  Users,
  PiggyBank,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  CreditCard,
  FileText,
  Download,
  Plus,
  Eye,
  Filter
} from 'lucide-react';

const FinancialOverviewPage = () => {
  const financialMetrics = {
    totalRevenue: 485620,
    monthlyRevenue: 52340,
    totalExpenses: 298750,
    monthlyExpenses: 31280,
    netProfit: 186870,
    cashFlow: 127490,
    outstandingInvoices: 45230,
    pendingBills: 18650,
    payrollLiability: 23800,
    taxLiability: 8950
  };

  const recentTransactions = [
    { id: 1, type: 'Payment Received', amount: 5400, customer: 'ABC Logistics', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'Vendor Payment', amount: -2300, vendor: 'Fuel Express', date: '2024-01-14', status: 'pending' },
    { id: 3, type: 'Payroll', amount: -18500, description: 'Bi-weekly Payroll', date: '2024-01-12', status: 'completed' },
    { id: 4, type: 'Invoice Payment', amount: 7200, customer: 'FastTrack Inc', date: '2024-01-11', status: 'completed' }
  ];

  const upcomingTasks = [
    { task: 'Process Payroll', dueDate: '2024-01-18', priority: 'high', type: 'payroll' },
    { task: 'File Tax Returns', dueDate: '2024-01-25', priority: 'medium', type: 'tax' },
    { task: 'Bank Reconciliation', dueDate: '2024-01-20', priority: 'medium', type: 'banking' },
    { task: 'Review Vendor Bills', dueDate: '2024-01-17', priority: 'low', type: 'expenses' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <UltraModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto p-6 space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-foreground tracking-tight">
                Financial Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time overview of your business financial performance
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-10 px-4">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="h-10 px-6 bg-primary hover:bg-primary/90">
                <PiggyBank className="h-4 w-4 mr-2" />
                Run Payroll
              </Button>
            </div>
          </div>

          {/* Key Metrics Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Revenue Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12.5%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(financialMetrics.totalRevenue)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: '85%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Healthy
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Cash Flow
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(financialMetrics.cashFlow)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-700" style={{ width: '72%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">72%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expenses Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                    <Receipt className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +3.2%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Expenses
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(financialMetrics.totalExpenses)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-700" style={{ width: '61%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">61%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Net Profit Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +18.3%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Net Profit
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(financialMetrics.netProfit)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full transition-all duration-700" style={{ width: '93%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">93%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Outstanding Items Dashboard */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  Outstanding Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Outstanding Invoices */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/60 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <h4 className="font-semibold text-amber-900">Outstanding Invoices</h4>
                      </div>
                      <p className="text-sm text-amber-700">15 invoices • Avg: 12 days overdue</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-amber-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: '75%' }} />
                        </div>
                        <span className="text-xs text-amber-600 font-medium">75%</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold text-amber-900">
                        {formatCurrency(financialMetrics.outstandingInvoices)}
                      </p>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200">
                        Overdue
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Pending Bills */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200/60 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <h4 className="font-semibold text-red-900">Pending Bills</h4>
                      </div>
                      <p className="text-sm text-red-700">8 bills • Due within 5 days</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-red-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full transition-all duration-700" style={{ width: '60%' }} />
                        </div>
                        <span className="text-xs text-red-600 font-medium">60%</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold text-red-900">
                        {formatCurrency(financialMetrics.pendingBills)}
                      </p>
                      <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200">
                        Due Soon
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liabilities Dashboard */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  Payroll & Tax Liabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Payroll Liability */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <h4 className="font-semibold text-blue-900">Payroll Liability</h4>
                      </div>
                      <p className="text-sm text-blue-700">Next payroll: Jan 18, 2024</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-blue-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full transition-all duration-700" style={{ width: '90%' }} />
                        </div>
                        <span className="text-xs text-blue-600 font-medium">90%</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(financialMetrics.payrollLiability)}
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200">
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Tax Liability */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/60 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <h4 className="font-semibold text-purple-900">Tax Liability</h4>
                      </div>
                      <p className="text-sm text-purple-700">Q1 2024 quarterly filing</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-purple-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full transition-all duration-700" style={{ width: '45%' }} />
                        </div>
                        <span className="text-xs text-purple-600 font-medium">45%</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-2xl font-bold text-purple-900">
                        {formatCurrency(financialMetrics.taxLiability)}
                      </p>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200">
                        Q1 2024
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity & Tasks Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  Recent Transactions
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 rounded-xl hover:bg-muted/40 transition-all border border-transparent hover:border-border/40 group">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${
                          transaction.amount > 0 
                            ? 'bg-green-100 text-green-600 group-hover:bg-green-200' 
                            : 'bg-red-100 text-red-600 group-hover:bg-red-200'
                        } transition-colors`}>
                          {transaction.amount > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.customer || transaction.vendor || transaction.description} • {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  Upcoming Tasks
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-xl hover:bg-muted/40 transition-all border border-transparent hover:border-border/40 group">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600 group-hover:bg-red-200' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200' : 
                          'bg-green-100 text-green-600 group-hover:bg-green-200'
                        }`}>
                          {task.priority === 'high' && <AlertTriangle className="h-4 w-4" />}
                          {task.priority === 'medium' && <Clock className="h-4 w-4" />}
                          {task.priority === 'low' && <CheckCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{task.task}</p>
                          <p className="text-sm text-muted-foreground">Due {formatDate(task.dueDate)}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Dashboard */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-28 flex-col gap-3 hover:shadow-lg hover:scale-[1.02] transition-all group border-2 hover:border-primary/30"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:scale-110 transition-transform">
                    <PiggyBank className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Run Payroll</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-28 flex-col gap-3 hover:shadow-lg hover:scale-[1.02] transition-all group border-2 hover:border-blue-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Receipt className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Create Invoice</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-28 flex-col gap-3 hover:shadow-lg hover:scale-[1.02] transition-all group border-2 hover:border-green-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Schedule Payment</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-28 flex-col gap-3 hover:shadow-lg hover:scale-[1.02] transition-all group border-2 hover:border-purple-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/20 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UltraModernLayout>
  );
};

export default FinancialOverviewPage;