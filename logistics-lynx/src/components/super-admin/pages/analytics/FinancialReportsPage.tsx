import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Activity, Clock, Zap,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, Database, Network,
  ShieldX, ShieldAlert, ShieldCheck as ShieldCheckIcon,
  Target, Database as DatabaseIcon, Cpu as CpuIcon,
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Clock as ClockIcon,
  AlertTriangle, CheckCircle, Minus, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Users, DollarSign, Package as PackageIcon,
  Truck, Calendar, FileText, Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  DollarSign as DollarSignIcon, CreditCard, Receipt, Calculator, PiggyBank, TrendingUp as TrendingUpIcon2
} from 'lucide-react';

// Enhanced data models
interface FinancialReport {
  id: string;
  name: string;
  type: 'revenue' | 'expenses' | 'profit' | 'cash_flow' | 'budget' | 'forecast';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastGenerated: string;
  nextRun: string;
  format: 'pdf' | 'csv' | 'excel' | 'json' | 'html';
  recipients: string[];
  size: string;
  description: string;
  schedule?: string;
  parameters?: Record<string, any>;
}

interface FinancialMetric {
  id: string;
  name: string;
  category: 'revenue' | 'expenses' | 'profit' | 'cash_flow' | 'budget';
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  timestamp: string;
  description: string;
  target?: number;
  threshold?: {
    warning: number;
    critical: number;
  };
}

interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  account: string;
  tags: string[];
}

interface FinancialBudget {
  id: string;
  name: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: 'on_track' | 'over_budget' | 'under_budget';
  lastUpdated: string;
  currency: string;
}

// Mock API functions
const mockAPI = {
  getFinancialReports: (): Promise<FinancialReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Monthly Revenue Report',
        type: 'revenue',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 2592000000).toISOString(),
        format: 'pdf',
        recipients: ['finance@transbot.ai', 'ceo@transbot.ai'],
        size: '3.2 MB',
        description: 'Monthly revenue analysis and growth metrics',
        schedule: '0 9 1 * *',
        parameters: { includeGrowth: true, includeProjections: true }
      },
      {
        id: '2',
        name: 'Quarterly Profit & Loss',
        type: 'profit',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 7776000000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'excel',
        recipients: ['finance@transbot.ai'],
        size: '4.1 MB',
        description: 'Quarterly profit and loss statement',
        schedule: '0 10 1 */3 *',
        parameters: { includeBreakdown: true, includeComparisons: true }
      },
      {
        id: '3',
        name: 'Weekly Cash Flow Report',
        type: 'cash_flow',
        status: 'running',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 604800000).toISOString(),
        format: 'html',
        recipients: ['finance@transbot.ai'],
        size: '2.8 MB',
        description: 'Weekly cash flow analysis and projections',
        schedule: '0 8 * * 1',
        parameters: { includeProjections: true, includeAlerts: true }
      },
      {
        id: '4',
        name: 'Annual Budget Report',
        type: 'budget',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 31536000000).toISOString(),
        nextRun: new Date(Date.now() + 31536000000).toISOString(),
        format: 'pdf',
        recipients: ['finance@transbot.ai', 'board@transbot.ai'],
        size: '5.2 MB',
        description: 'Annual budget performance and variance analysis',
        schedule: '0 10 1 1 *',
        parameters: { includeVariance: true, includeRecommendations: true }
      },
      {
        id: '5',
        name: 'Expense Analysis Report',
        type: 'expenses',
        status: 'failed',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        nextRun: new Date(Date.now() + 2592000000).toISOString(),
        format: 'csv',
        recipients: ['finance@transbot.ai'],
        size: '0 MB',
        description: 'Monthly expense analysis and cost optimization',
        schedule: '0 7 1 * *',
        parameters: { includeCategories: true, includeTrends: true }
      }
    ]),

  getFinancialMetrics: (): Promise<FinancialMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Monthly Revenue',
        category: 'revenue',
        value: 2847500,
        unit: '$',
        change: 156000,
        changePercent: 5.8,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Total revenue for the current month',
        target: 3000000,
        threshold: { warning: 2500000, critical: 2000000 }
      },
      {
        id: '2',
        name: 'Monthly Expenses',
        category: 'expenses',
        value: 1875000,
        unit: '$',
        change: 89000,
        changePercent: 5.0,
        trend: 'up',
        status: 'warning',
        timestamp: new Date().toISOString(),
        description: 'Total expenses for the current month',
        target: 1800000,
        threshold: { warning: 1900000, critical: 2100000 }
      },
      {
        id: '3',
        name: 'Net Profit',
        category: 'profit',
        value: 972500,
        unit: '$',
        change: 67000,
        changePercent: 7.4,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Net profit for the current month',
        target: 900000,
        threshold: { warning: 750000, critical: 600000 }
      },
      {
        id: '4',
        name: 'Profit Margin',
        category: 'profit',
        value: 34.2,
        unit: '%',
        change: 0.5,
        changePercent: 1.5,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Profit margin percentage',
        target: 30,
        threshold: { warning: 25, critical: 20 }
      },
      {
        id: '5',
        name: 'Cash Flow',
        category: 'cash_flow',
        value: 1250000,
        unit: '$',
        change: 89000,
        changePercent: 7.7,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Positive cash flow for the current month',
        target: 1000000,
        threshold: { warning: 800000, critical: 600000 }
      },
      {
        id: '6',
        name: 'Budget Utilization',
        category: 'budget',
        value: 78.5,
        unit: '%',
        change: 2.1,
        changePercent: 2.7,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Budget utilization rate',
        target: 85,
        threshold: { warning: 90, critical: 95 }
      }
    ]),

  getFinancialTransactions: (): Promise<FinancialTransaction[]> => 
    Promise.resolve([
      {
        id: '1',
        type: 'income',
        category: 'Subscription Revenue',
        amount: 125000,
        currency: 'USD',
        description: 'Monthly subscription payments',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
        reference: 'INV-2024-001',
        account: 'Operating Account',
        tags: ['recurring', 'subscription']
      },
      {
        id: '2',
        type: 'expense',
        category: 'Infrastructure',
        amount: 45000,
        currency: 'USD',
        description: 'Cloud infrastructure costs',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        status: 'completed',
        reference: 'EXP-2024-001',
        account: 'Operating Account',
        tags: ['infrastructure', 'cloud']
      },
      {
        id: '3',
        type: 'expense',
        category: 'Personnel',
        amount: 89000,
        currency: 'USD',
        description: 'Employee salaries and benefits',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        status: 'completed',
        reference: 'EXP-2024-002',
        account: 'Payroll Account',
        tags: ['personnel', 'payroll']
      }
    ]),

  getFinancialBudgets: (): Promise<FinancialBudget[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Technology Budget',
        category: 'Technology',
        allocated: 500000,
        spent: 387500,
        remaining: 112500,
        period: '2024',
        status: 'on_track',
        lastUpdated: new Date().toISOString(),
        currency: 'USD'
      },
      {
        id: '2',
        name: 'Marketing Budget',
        category: 'Marketing',
        allocated: 300000,
        spent: 285000,
        remaining: 15000,
        period: '2024',
        status: 'over_budget',
        lastUpdated: new Date().toISOString(),
        currency: 'USD'
      },
      {
        id: '3',
        name: 'Operations Budget',
        category: 'Operations',
        allocated: 400000,
        spent: 312000,
        remaining: 88000,
        period: '2024',
        status: 'on_track',
        lastUpdated: new Date().toISOString(),
        currency: 'USD'
      }
    ])
};

const FinancialReportsPage = () => {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [budgets, setBudgets] = useState<FinancialBudget[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFinancialData();
  }, []);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      const [reportsData, metricsData, transactionsData, budgetsData] = await Promise.all([
        mockAPI.getFinancialReports(),
        mockAPI.getFinancialMetrics(),
        mockAPI.getFinancialTransactions(),
        mockAPI.getFinancialBudgets()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
      setTransactions(transactionsData);
      setBudgets(budgetsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load financial data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'text-green-600 bg-green-50';
      case 'over_budget': return 'text-red-600 bg-red-50';
      case 'under_budget': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading financial reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">
            Financial analytics, revenue tracking, and budget management
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadFinancialData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Financial Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <Card key={metric.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{metric.name}</CardTitle>
                <Badge variant={metric.status === 'critical' ? 'destructive' : metric.status === 'warning' ? 'secondary' : 'default'}>
                  {metric.status}
                </Badge>
              </div>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {metric.unit === '$' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                {metric.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target</span>
                      <span>{metric.unit === '$' ? formatCurrency(metric.target) : `${metric.target}${metric.unit}`}</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports and Analytics */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="type">Type:</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="expenses">Expenses</SelectItem>
                      <SelectItem value="profit">Profit</SelectItem>
                      <SelectItem value="cash_flow">Cash Flow</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="forecast">Forecast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Manage and generate financial analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {report.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastGenerated).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(report.nextRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {report.format}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
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

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Recent financial transactions and cash flow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(transaction => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>
                Budget allocation and spending tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgets.map(budget => (
                  <Card key={budget.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{budget.name}</CardTitle>
                        <Badge className={getBudgetStatusColor(budget.status)}>
                          {budget.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>{budget.category} • {budget.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Allocated</span>
                            <span>{formatCurrency(budget.allocated, budget.currency)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Spent</span>
                            <span>{formatCurrency(budget.spent, budget.currency)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium">
                            <span>Remaining</span>
                            <span>{formatCurrency(budget.remaining, budget.currency)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Utilization</span>
                            <span>{((budget.spent / budget.allocated) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(budget.spent / budget.allocated) * 100} className="h-2" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(budget.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Revenue trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Expense analysis chart will be implemented here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Report Dialog */}
      <Dialog open={newReportDialog} onOpenChange={setNewReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Financial Report</DialogTitle>
            <DialogDescription>
              Configure a new financial analysis report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Report Name</Label>
              <Input
                id="name"
                placeholder="Enter report name"
              />
            </div>
            <div>
              <Label htmlFor="type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="cash_flow">Cash Flow</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="forecast">Forecast</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReportDialog(false)}>
              Cancel
            </Button>
            <Button>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialReportsPage;
