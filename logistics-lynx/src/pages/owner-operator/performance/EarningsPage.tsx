import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter, Search, Plus, Eye, BarChart3, PieChart } from 'lucide-react';
import { toast } from "sonner";

interface EarningsEntry {
  id: string;
  date: string;
  loadNumber: string;
  customer: string;
  origin: string;
  destination: string;
  miles: number;
  grossRevenue: number;
  fuelCosts: number;
  tolls: number;
  permits: number;
  maintenance: number;
  insurance: number;
  otherExpenses: number;
  netEarnings: number;
  ratePerMile: number;
  profitMargin: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  invoiceNumber: string;
}

const mockEarningsData: EarningsEntry[] = [
  {
    id: 'earn-001',
    date: '2024-07-19',
    loadNumber: 'LD-456789',
    customer: 'MegaCorp Industries',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    miles: 583,
    grossRevenue: 2150.00,
    fuelCosts: 438.40,
    tolls: 45.75,
    permits: 0,
    maintenance: 156.78,
    insurance: 125.50,
    otherExpenses: 25.00,
    netEarnings: 1358.57,
    ratePerMile: 3.69,
    profitMargin: 63.2,
    paymentStatus: 'paid',
    paymentDate: '2024-07-19',
    invoiceNumber: 'INV-2024-001'
  },
  {
    id: 'earn-002',
    date: '2024-07-18',
    loadNumber: 'LD-456788',
    customer: 'Sunshine Logistics',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    miles: 462,
    grossRevenue: 1850.00,
    fuelCosts: 322.75,
    tolls: 28.50,
    permits: 0,
    maintenance: 0,
    insurance: 125.50,
    otherExpenses: 15.00,
    netEarnings: 1358.25,
    ratePerMile: 4.00,
    profitMargin: 73.4,
    paymentStatus: 'paid',
    paymentDate: '2024-07-18',
    invoiceNumber: 'INV-2024-002'
  },
  {
    id: 'earn-003',
    date: '2024-07-17',
    loadNumber: 'LD-456787',
    customer: 'Texas Transport Co',
    origin: 'Miami, FL',
    destination: 'Houston, TX',
    miles: 673,
    grossRevenue: 2450.00,
    fuelCosts: 490.15,
    tolls: 32.25,
    permits: 25.00,
    maintenance: 0,
    insurance: 125.50,
    otherExpenses: 40.00,
    netEarnings: 1737.10,
    ratePerMile: 3.64,
    profitMargin: 70.9,
    paymentStatus: 'pending',
    invoiceNumber: 'INV-2024-003'
  },
  {
    id: 'earn-004',
    date: '2024-07-16',
    loadNumber: 'LD-456786',
    customer: 'Mountain Peak Freight',
    origin: 'Houston, TX',
    destination: 'Denver, CO',
    miles: 518,
    grossRevenue: 2200.00,
    fuelCosts: 402.85,
    tolls: 18.75,
    permits: 0,
    maintenance: 89.50,
    insurance: 125.50,
    otherExpenses: 30.00,
    netEarnings: 1533.40,
    ratePerMile: 4.25,
    profitMargin: 69.7,
    paymentStatus: 'paid',
    paymentDate: '2024-07-16',
    invoiceNumber: 'INV-2024-004'
  },
  {
    id: 'earn-005',
    date: '2024-07-15',
    loadNumber: 'LD-456785',
    customer: 'Great Lakes Shipping',
    origin: 'Denver, CO',
    destination: 'Chicago, IL',
    miles: 587,
    grossRevenue: 1980.00,
    fuelCosts: 445.20,
    tolls: 22.50,
    permits: 0,
    maintenance: 0,
    insurance: 125.50,
    otherExpenses: 35.00,
    netEarnings: 1351.80,
    ratePerMile: 3.37,
    profitMargin: 68.3,
    paymentStatus: 'overdue',
    invoiceNumber: 'INV-2024-005'
  }
];

interface WeeklyEarnings {
  week: string;
  grossRevenue: number;
  expenses: number;
  netEarnings: number;
  loads: number;
  miles: number;
}

const mockWeeklyData: WeeklyEarnings[] = [
  { week: 'Week 1', grossRevenue: 8650.00, expenses: 2847.65, netEarnings: 5802.35, loads: 4, miles: 2236 },
  { week: 'Week 2', grossRevenue: 9200.00, expenses: 3124.80, netEarnings: 6075.20, loads: 5, miles: 2654 },
  { week: 'Week 3', grossRevenue: 7980.00, expenses: 2456.90, netEarnings: 5523.10, loads: 3, miles: 1987 },
  { week: 'Week 4', grossRevenue: 10450.00, expenses: 3589.75, netEarnings: 6860.25, loads: 6, miles: 3124 }
];

const EarningsPage: React.FC = () => {
  const [earnings, setEarnings] = useState<EarningsEntry[]>(mockEarningsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('this_month');
  const [selectedEntry, setSelectedEntry] = useState<EarningsEntry | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredEarnings = earnings.filter(entry => {
    const matchesSearch = entry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDownloadReport = () => {
    toast.success('Earnings report downloaded successfully');
  };

  const handleViewDetails = (entry: EarningsEntry) => {
    setSelectedEntry(entry);
  };

  const handleSendInvoice = (id: string) => {
    toast.success('Invoice sent successfully');
  };

  // Calculate summary statistics
  const totalGrossRevenue = filteredEarnings.reduce((sum, e) => sum + e.grossRevenue, 0);
  const totalExpenses = filteredEarnings.reduce((sum, e) => sum + (e.fuelCosts + e.tolls + e.permits + e.maintenance + e.insurance + e.otherExpenses), 0);
  const totalNetEarnings = filteredEarnings.reduce((sum, e) => sum + e.netEarnings, 0);
  const totalMiles = filteredEarnings.reduce((sum, e) => sum + e.miles, 0);
  const avgRatePerMile = totalMiles > 0 ? totalGrossRevenue / totalMiles : 0;
  const avgProfitMargin = filteredEarnings.length > 0 ? filteredEarnings.reduce((sum, e) => sum + e.profitMargin, 0) / filteredEarnings.length : 0;

  // Weekly summary
  const weeklyTotals = mockWeeklyData.reduce((acc, week) => ({
    grossRevenue: acc.grossRevenue + week.grossRevenue,
    expenses: acc.expenses + week.expenses,
    netEarnings: acc.netEarnings + week.netEarnings,
    loads: acc.loads + week.loads,
    miles: acc.miles + week.miles
  }), { grossRevenue: 0, expenses: 0, netEarnings: 0, loads: 0, miles: 0 });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Earnings Dashboard</h1>
        <p className="text-muted-foreground">Track your revenue, expenses, and profitability</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Earnings</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gross Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${totalGrossRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Net Earnings</p>
                    <p className="text-2xl font-bold text-foreground">${totalNetEarnings.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% vs last month
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rate per Mile</p>
                    <p className="text-2xl font-bold text-foreground">${avgRatePerMile.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{totalMiles.toLocaleString()} total miles</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                    <p className="text-2xl font-bold text-foreground">{avgProfitMargin.toFixed(1)}%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Above industry avg
                    </p>
                  </div>
                  <PieChart className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {earnings.filter(e => e.paymentStatus === 'paid').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Paid Invoices</div>
                  <div className="text-lg font-semibold text-green-600">
                    ${earnings.filter(e => e.paymentStatus === 'paid').reduce((sum, e) => sum + e.grossRevenue, 0).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {earnings.filter(e => e.paymentStatus === 'pending').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending Payments</div>
                  <div className="text-lg font-semibold text-yellow-600">
                    ${earnings.filter(e => e.paymentStatus === 'pending').reduce((sum, e) => sum + e.grossRevenue, 0).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {earnings.filter(e => e.paymentStatus === 'overdue').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                  <div className="text-lg font-semibold text-red-600">
                    ${earnings.filter(e => e.paymentStatus === 'overdue').reduce((sum, e) => sum + e.grossRevenue, 0).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by customer, load number, or invoice..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="this_quarter">This Quarter</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleDownloadReport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Earnings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Earnings</CardTitle>
              <CardDescription>Complete breakdown of revenue and expenses by load</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Load #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Miles</TableHead>
                      <TableHead>Gross Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Net Earnings</TableHead>
                      <TableHead>Rate/Mile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEarnings.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.loadNumber}</TableCell>
                        <TableCell>{entry.customer}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {entry.origin} → {entry.destination}
                          </div>
                        </TableCell>
                        <TableCell>{entry.miles}</TableCell>
                        <TableCell className="text-green-600 font-semibold">${entry.grossRevenue.toFixed(2)}</TableCell>
                        <TableCell className="text-red-600">
                          ${(entry.fuelCosts + entry.tolls + entry.permits + entry.maintenance + entry.insurance + entry.otherExpenses).toFixed(2)}
                        </TableCell>
                        <TableCell className="font-semibold">${entry.netEarnings.toFixed(2)}</TableCell>
                        <TableCell>${entry.ratePerMile.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(entry.paymentStatus)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(entry)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {entry.paymentStatus === 'pending' && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleSendInvoice(entry.id)}
                              >
                                Send Invoice
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings Summary</CardTitle>
              <CardDescription>Weekly performance breakdown for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Loads</TableHead>
                    <TableHead>Miles</TableHead>
                    <TableHead>Gross Revenue</TableHead>
                    <TableHead>Expenses</TableHead>
                    <TableHead>Net Earnings</TableHead>
                    <TableHead>Avg Rate/Mile</TableHead>
                    <TableHead>Profit Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWeeklyData.map((week) => (
                    <TableRow key={week.week}>
                      <TableCell className="font-medium">{week.week}</TableCell>
                      <TableCell>{week.loads}</TableCell>
                      <TableCell>{week.miles.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${week.grossRevenue.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">${week.expenses.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">${week.netEarnings.toLocaleString()}</TableCell>
                      <TableCell>${(week.grossRevenue / week.miles).toFixed(2)}</TableCell>
                      <TableCell>{((week.netEarnings / week.grossRevenue) * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Monthly Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">${weeklyTotals.grossRevenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Gross Revenue</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">${weeklyTotals.netEarnings.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Net Earnings</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{weeklyTotals.loads}</div>
                  <div className="text-sm text-muted-foreground">Total Loads Completed</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          {/* Expense Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ${filteredEarnings.reduce((sum, e) => sum + e.fuelCosts, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {((filteredEarnings.reduce((sum, e) => sum + e.fuelCosts, 0) / totalExpenses) * 100).toFixed(1)}% of total expenses
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  ${filteredEarnings.reduce((sum, e) => sum + e.maintenance, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {((filteredEarnings.reduce((sum, e) => sum + e.maintenance, 0) / totalExpenses) * 100).toFixed(1)}% of total expenses
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${filteredEarnings.reduce((sum, e) => sum + e.insurance, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {((filteredEarnings.reduce((sum, e) => sum + e.insurance, 0) / totalExpenses) * 100).toFixed(1)}% of total expenses
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load #</TableHead>
                    <TableHead>Fuel</TableHead>
                    <TableHead>Tolls</TableHead>
                    <TableHead>Permits</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Other</TableHead>
                    <TableHead>Total Expenses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEarnings.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.loadNumber}</TableCell>
                      <TableCell>${entry.fuelCosts.toFixed(2)}</TableCell>
                      <TableCell>${entry.tolls.toFixed(2)}</TableCell>
                      <TableCell>${entry.permits.toFixed(2)}</TableCell>
                      <TableCell>${entry.maintenance.toFixed(2)}</TableCell>
                      <TableCell>${entry.insurance.toFixed(2)}</TableCell>
                      <TableCell>${entry.otherExpenses.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">
                        ${(entry.fuelCosts + entry.tolls + entry.permits + entry.maintenance + entry.insurance + entry.otherExpenses).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed View Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEntry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Earnings Details: {selectedEntry.loadNumber}
                </DialogTitle>
                <DialogDescription>
                  Complete financial breakdown for this load
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-semibold">{selectedEntry.date}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Customer</div>
                      <div className="font-semibold">{selectedEntry.customer}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Invoice</div>
                      <div className="font-semibold">{selectedEntry.invoiceNumber}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue & Earnings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue & Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Gross Revenue</div>
                        <div className="text-2xl font-bold text-green-600">${selectedEntry.grossRevenue.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Expenses</div>
                        <div className="text-2xl font-bold text-red-600">
                          ${(selectedEntry.fuelCosts + selectedEntry.tolls + selectedEntry.permits + selectedEntry.maintenance + selectedEntry.insurance + selectedEntry.otherExpenses).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Net Earnings</div>
                        <div className="text-2xl font-bold text-foreground">${selectedEntry.netEarnings.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expense Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Fuel Costs</div>
                        <div className="font-semibold">${selectedEntry.fuelCosts.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Tolls</div>
                        <div className="font-semibold">${selectedEntry.tolls.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Permits</div>
                        <div className="font-semibold">${selectedEntry.permits.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Maintenance</div>
                        <div className="font-semibold">${selectedEntry.maintenance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Insurance</div>
                        <div className="font-semibold">${selectedEntry.insurance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Other Expenses</div>
                        <div className="font-semibold">${selectedEntry.otherExpenses.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Rate per Mile</div>
                        <div className="text-lg font-semibold">${selectedEntry.ratePerMile.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit Margin</div>
                        <div className="text-lg font-semibold">{selectedEntry.profitMargin.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Miles</div>
                        <div className="text-lg font-semibold">{selectedEntry.miles}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Payment Status</div>
                        <div className="mt-1">{getStatusBadge(selectedEntry.paymentStatus)}</div>
                      </div>
                      {selectedEntry.paymentDate && (
                        <div>
                          <div className="text-sm text-muted-foreground">Payment Date</div>
                          <div className="font-semibold">{selectedEntry.paymentDate}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EarningsPage;