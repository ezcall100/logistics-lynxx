/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  DollarSign,
  CreditCard,
  Banknote,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Plus
} from 'lucide-react';

const CashFlowManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30_days');

  const cashFlowSummary = {
    currentBalance: 1456780,
    projectedBalance: 1623450,
    weeklyInflow: 385620,
    weeklyOutflow: 218890,
    netFlow: 166730
  };

  const upcomingInflows = [
    {
      date: "2024-02-05",
      description: "Invoice Payment - Global Logistics",
      amount: 45250,
      probability: 95,
      type: "invoice"
    },
    {
      date: "2024-02-06",
      description: "Invoice Payment - FastTrack Shipping", 
      amount: 32180,
      probability: 85,
      type: "invoice"
    },
    {
      date: "2024-02-08",
      description: "Invoice Payment - Prime Transport",
      amount: 58920,
      probability: 70,
      type: "invoice"
    },
    {
      date: "2024-02-10",
      description: "Factoring Advance - Load Batch",
      amount: 125000,
      probability: 100,
      type: "factoring"
    }
  ];

  const upcomingOutflows = [
    {
      date: "2024-02-05",
      description: "Carrier Payment - Elite Carriers",
      amount: 28450,
      status: "confirmed",
      type: "carrier"
    },
    {
      date: "2024-02-06",
      description: "Office Rent Payment",
      amount: 12500,
      status: "scheduled",
      type: "expense"
    },
    {
      date: "2024-02-08",
      description: "Carrier Payment - FastTrack Logistics",
      amount: 35680,
      status: "pending",
      type: "carrier"
    },
    {
      date: "2024-02-10",
      description: "Insurance Premium",
      amount: 8750,
      status: "scheduled",
      type: "expense"
    }
  ];

  const cashFlowForecast = [
    { date: "2024-02-05", openingBalance: 1456780, inflows: 45250, outflows: 28450, closingBalance: 1473580 },
    { date: "2024-02-06", openingBalance: 1473580, inflows: 32180, outflows: 48180, closingBalance: 1457580 },
    { date: "2024-02-07", openingBalance: 1457580, inflows: 0, outflows: 5230, closingBalance: 1452350 },
    { date: "2024-02-08", openingBalance: 1452350, inflows: 58920, outflows: 44430, closingBalance: 1466840 },
    { date: "2024-02-09", openingBalance: 1466840, inflows: 23450, outflows: 12780, closingBalance: 1477510 },
    { date: "2024-02-10", openingBalance: 1477510, inflows: 125000, outflows: 8750, closingBalance: 1593760 }
  ];

  const bankAccounts = [
    {
      name: "Primary Operating",
      accountNumber: "****1234",
      balance: 856430,
      type: "checking",
      lastUpdated: "2024-02-05 09:15 AM"
    },
    {
      name: "Payroll Account",
      accountNumber: "****5678", 
      balance: 145680,
      type: "checking",
      lastUpdated: "2024-02-05 09:15 AM"
    },
    {
      name: "Emergency Reserve",
      accountNumber: "****9012",
      balance: 454670,
      type: "savings",
      lastUpdated: "2024-02-05 09:15 AM"
    }
  ];

  const getTypeBadge = (type: string) => {
    const variants = {
      invoice: { variant: "default" as const, label: "Invoice" },
      factoring: { variant: "secondary" as const, label: "Factoring" },
      carrier: { variant: "default" as const, label: "Carrier" },
      expense: { variant: "outline" as const, label: "Expense" }
    };
    const config = variants[type as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: { variant: "default" as const, icon: CheckCircle },
      scheduled: { variant: "secondary" as const, icon: Clock },
      pending: { variant: "secondary" as const, icon: AlertTriangle }
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <config.icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cash Flow Management</h1>
          <p className="text-muted-foreground">Monitor and forecast business cash flow</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Forecast
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(cashFlowSummary.currentBalance)}</div>
            <p className="text-xs text-muted-foreground">All accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projected (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(cashFlowSummary.projectedBalance)}</div>
            <p className="text-xs text-muted-foreground">Net projection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Inflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(cashFlowSummary.weeklyInflow)}</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Incoming
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Outflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(cashFlowSummary.weeklyOutflow)}</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              Outgoing
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{formatCurrency(cashFlowSummary.netFlow)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList>
          <TabsTrigger value="forecast">Cash Flow Forecast</TabsTrigger>
          <TabsTrigger value="inflows">Expected Inflows</TabsTrigger>
          <TabsTrigger value="outflows">Planned Outflows</TabsTrigger>
          <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Cash Flow Forecast</CardTitle>
              <CardDescription>Daily cash position projections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Opening Balance</TableHead>
                    <TableHead>Inflows</TableHead>
                    <TableHead>Outflows</TableHead>
                    <TableHead>Closing Balance</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashFlowForecast.map((day) => {
                    const netChange = day.inflows - day.outflows;
                    return (
                      <TableRow key={day.date}>
                        <TableCell className="font-medium">{day.date}</TableCell>
                        <TableCell>{formatCurrency(day.openingBalance)}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          +{formatCurrency(day.inflows)}
                        </TableCell>
                        <TableCell className="text-red-600 font-medium">
                          -{formatCurrency(day.outflows)}
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(day.closingBalance)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {netChange > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className={netChange > 0 ? 'text-green-600' : 'text-red-600'}>
                              {formatCurrency(Math.abs(netChange))}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expected Cash Inflows</CardTitle>
              <CardDescription>Projected incoming payments and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInflows.map((inflow, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{inflow.date}</TableCell>
                      <TableCell>{inflow.description}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {formatCurrency(inflow.amount)}
                      </TableCell>
                      <TableCell>{getTypeBadge(inflow.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={inflow.probability} className="w-16" />
                          <span className="text-sm">{inflow.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Planned Cash Outflows</CardTitle>
              <CardDescription>Scheduled payments and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingOutflows.map((outflow, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{outflow.date}</TableCell>
                      <TableCell>{outflow.description}</TableCell>
                      <TableCell className="font-semibold text-red-600">
                        -{formatCurrency(outflow.amount)}
                      </TableCell>
                      <TableCell>{getTypeBadge(outflow.type)}</TableCell>
                      <TableCell>{getStatusBadge(outflow.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Overview</CardTitle>
              <CardDescription>Current balances and account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Banknote className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">Account {account.accountNumber}</p>
                        <p className="text-xs text-muted-foreground">Last updated: {account.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">{formatCurrency(account.balance)}</div>
                      <Badge variant="outline" className="mt-1">{account.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlowManagement;