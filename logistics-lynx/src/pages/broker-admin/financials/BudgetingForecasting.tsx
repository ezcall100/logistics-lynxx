import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  PieChart,
  Edit,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BudgetingForecasting = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [isNewBudgetDialogOpen, setIsNewBudgetDialogOpen] = useState(false);
  const [newBudgetItem, setNewBudgetItem] = useState({
    category: '',
    subcategory: '',
    budgetedAmount: '',
    period: 'monthly'
  });

  // Sample budget data
  const budgetData = [
    {
      id: '1',
      category: 'Revenue',
      subcategory: 'Freight Services',
      budgeted: 500000,
      actual: 485000,
      variance: -15000,
      percentage: 97.0,
      status: 'warning'
    },
    {
      id: '2',
      category: 'Revenue',
      subcategory: 'Broker Commissions',
      budgeted: 75000,
      actual: 82000,
      variance: 7000,
      percentage: 109.3,
      status: 'good'
    },
    {
      id: '3',
      category: 'Expenses',
      subcategory: 'Carrier Payments',
      budgeted: 350000,
      actual: 365000,
      variance: 15000,
      percentage: 104.3,
      status: 'warning'
    },
    {
      id: '4',
      category: 'Expenses',
      subcategory: 'Office Rent',
      budgeted: 24000,
      actual: 24000,
      variance: 0,
      percentage: 100.0,
      status: 'good'
    },
    {
      id: '5',
      category: 'Expenses',
      subcategory: 'Insurance',
      budgeted: 18000,
      actual: 15500,
      variance: -2500,
      percentage: 86.1,
      status: 'good'
    },
    {
      id: '6',
      category: 'Expenses',
      subcategory: 'Marketing',
      budgeted: 12000,
      actual: 15800,
      variance: 3800,
      percentage: 131.7,
      status: 'alert'
    },
    {
      id: '7',
      category: 'Expenses',
      subcategory: 'Technology',
      budgeted: 8000,
      actual: 7200,
      variance: -800,
      percentage: 90.0,
      status: 'good'
    },
    {
      id: '8',
      category: 'Expenses',
      subcategory: 'Legal & Professional',
      budgeted: 6000,
      actual: 5500,
      variance: -500,
      percentage: 91.7,
      status: 'good'
    },
  ];

  // Forecast data
  const forecastData = [
    { month: 'Jan', budgeted: 45000, forecasted: 47000, actual: 45500 },
    { month: 'Feb', budgeted: 45000, forecasted: 46500, actual: 44800 },
    { month: 'Mar', budgeted: 45000, forecasted: 48000, actual: 47200 },
    { month: 'Apr', budgeted: 45000, forecasted: 49000, actual: 48500 },
    { month: 'May', budgeted: 45000, forecasted: 50000, actual: null },
    { month: 'Jun', budgeted: 45000, forecasted: 51000, actual: null },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />On Track</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
      case 'alert':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Over Budget</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'text-gray-600';
    return variance > 0 ? 'text-red-600' : 'text-green-600';
  };

  const handleCreateBudget = () => {
    toast({
      title: "Budget Item Created",
      description: `Budget for ${newBudgetItem.subcategory} has been created successfully.`,
    });
    setIsNewBudgetDialogOpen(false);
    setNewBudgetItem({
      category: '',
      subcategory: '',
      budgetedAmount: '',
      period: 'monthly'
    });
  };

  // Calculate totals
  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudgeted;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Budgeting & Forecasting</h1>
            <p className="text-muted-foreground">
              Plan and track your financial performance against budgets
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isNewBudgetDialogOpen} onOpenChange={setIsNewBudgetDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Budget Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Budget Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newBudgetItem.category} onValueChange={(value) => setNewBudgetItem({...newBudgetItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Revenue">Revenue</SelectItem>
                        <SelectItem value="Expenses">Expenses</SelectItem>
                        <SelectItem value="Assets">Assets</SelectItem>
                        <SelectItem value="Liabilities">Liabilities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                      id="subcategory"
                      value={newBudgetItem.subcategory}
                      onChange={(e) => setNewBudgetItem({...newBudgetItem, subcategory: e.target.value})}
                      placeholder="Enter subcategory name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Budgeted Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newBudgetItem.budgetedAmount}
                        onChange={(e) => setNewBudgetItem({...newBudgetItem, budgetedAmount: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="period">Period</Label>
                      <Select value={newBudgetItem.period} onValueChange={(value) => setNewBudgetItem({...newBudgetItem, period: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleCreateBudget} className="w-full">
                    Create Budget Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budgeted</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(totalBudgeted)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Actual</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(totalActual)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Variance</p>
                  <p className={`text-lg font-bold ${getVarianceColor(totalVariance)}`}>
                    {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${totalVariance >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                  {totalVariance >= 0 ? 
                    <TrendingUp className="h-4 w-4 text-red-600" /> : 
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Performance</p>
                  <p className="text-lg font-bold">
                    {((totalActual / totalBudgeted) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Period Selection */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Budget Period</CardTitle>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">Fiscal Year 2024</SelectItem>
                  <SelectItem value="Q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="Q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="Q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="Q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="budget" className="space-y-4">
          <TabsList>
            <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead className="text-right">Budgeted</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead className="text-right">%</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>{item.subcategory}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.budgeted)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.actual)}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${getVarianceColor(item.variance)}`}>
                          {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {item.percentage.toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <div className="w-24">
                            <Progress value={Math.min(item.percentage, 100)} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Budgeted</TableHead>
                      <TableHead className="text-right">Forecasted</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastData.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.budgeted)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.forecasted)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.actual ? formatCurrency(item.actual) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.actual ? 
                            <span className={getVarianceColor(item.actual - item.budgeted)}>
                              {item.actual >= item.budgeted ? '+' : ''}{formatCurrency(item.actual - item.budgeted)}
                            </span> : '-'
                          }
                        </TableCell>
                        <TableCell>
                          {item.actual ? 
                            getStatusBadge(Math.abs(item.actual - item.budgeted) <= 2000 ? 'good' : 'warning') :
                            <Badge variant="secondary">Forecast</Badge>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Variance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Favorable Variances</h3>
                      <div className="space-y-2">
                        {budgetData.filter(item => item.variance < 0).map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="font-medium">{item.subcategory}</span>
                            <span className="text-green-600 font-bold">
                              {formatCurrency(Math.abs(item.variance))} saved
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Unfavorable Variances</h3>
                      <div className="space-y-2">
                        {budgetData.filter(item => item.variance > 0).map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="font-medium">{item.subcategory}</span>
                            <span className="text-red-600 font-bold">
                              {formatCurrency(item.variance)} over
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BudgetingForecasting;