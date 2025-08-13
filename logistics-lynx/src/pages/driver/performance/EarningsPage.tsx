import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, Calendar, Download, Filter, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface EarningsRecord {
  id: string;
  date: string;
  loadNumber: string;
  origin: string;
  destination: string;
  miles: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  payType: 'mileage' | 'percentage' | 'flat' | 'hourly';
  status: 'paid' | 'pending' | 'processing';
}

const earningsData: EarningsRecord[] = [
  {
    id: 'E001',
    date: '2024-01-19',
    loadNumber: 'LD-789123',
    origin: 'Denver, CO',
    destination: 'Phoenix, AZ',
    miles: 587,
    grossPay: 1758.00,
    deductions: 125.50,
    netPay: 1632.50,
    payType: 'mileage',
    status: 'paid'
  },
  {
    id: 'E002',
    date: '2024-01-18',
    loadNumber: 'LD-789124',
    origin: 'Kansas City, MO',
    destination: 'Denver, CO',
    miles: 523,
    grossPay: 1569.00,
    deductions: 89.75,
    netPay: 1479.25,
    payType: 'mileage',
    status: 'paid'
  },
  {
    id: 'E003',
    date: '2024-01-17',
    loadNumber: 'LD-789125',
    origin: 'Chicago, IL',
    destination: 'Kansas City, MO',
    miles: 412,
    grossPay: 1236.00,
    deductions: 67.20,
    netPay: 1168.80,
    payType: 'mileage',
    status: 'processing'
  },
  {
    id: 'E004',
    date: '2024-01-16',
    loadNumber: 'LD-789126',
    origin: 'Detroit, MI',
    destination: 'Chicago, IL',
    miles: 238,
    grossPay: 950.00,
    deductions: 45.30,
    netPay: 904.70,
    payType: 'flat',
    status: 'pending'
  }
];

const EarningsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingEarning, setViewingEarning] = useState<EarningsRecord | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPayTypeBadge = (type: string) => {
    const types = {
      mileage: 'Per Mile',
      percentage: 'Percentage',
      flat: 'Flat Rate',
      hourly: 'Hourly'
    };
    return <Badge variant="outline">{types[type as keyof typeof types]}</Badge>;
  };

  const filteredEarnings = earningsData.filter(earning => 
    statusFilter === 'all' || earning.status === statusFilter
  );

  const totalGross = filteredEarnings.reduce((sum, earning) => sum + earning.grossPay, 0);
  const totalNet = filteredEarnings.reduce((sum, earning) => sum + earning.netPay, 0);
  const totalDeductions = filteredEarnings.reduce((sum, earning) => sum + earning.deductions, 0);
  const totalMiles = filteredEarnings.reduce((sum, earning) => sum + earning.miles, 0);

  const handleExport = () => {
    console.log('Exporting earnings data');
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className="text-muted-foreground">Track your income and payment history</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalGross.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalNet.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">After deductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalDeductions.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Taxes, fees, etc.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Per Mile</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalNet / totalMiles).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Net per mile</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>View and manage your payment records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div>
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Payment Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Earnings Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Load #</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Miles</TableHead>
                <TableHead>Pay Type</TableHead>
                <TableHead>Gross Pay</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEarnings.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{earning.date}</TableCell>
                  <TableCell className="font-medium">{earning.loadNumber}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{earning.origin}</div>
                      <div className="text-muted-foreground">→ {earning.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell>{earning.miles}</TableCell>
                  <TableCell>{getPayTypeBadge(earning.payType)}</TableCell>
                  <TableCell className="font-medium text-green-600">${earning.grossPay.toFixed(2)}</TableCell>
                  <TableCell className="text-red-600">${earning.deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-bold">${earning.netPay.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(earning.status)}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setViewingEarning(earning)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Deductions Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Deductions Breakdown</CardTitle>
          <CardDescription>Detailed view of your deductions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Federal Tax</span>
                <span className="font-medium">$189.45</span>
              </div>
              <div className="flex justify-between">
                <span>State Tax</span>
                <span className="font-medium">$67.20</span>
              </div>
              <div className="flex justify-between">
                <span>FICA</span>
                <span className="font-medium">$145.30</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Insurance</span>
                <span className="font-medium">$78.50</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Card Fee</span>
                <span className="font-medium">$15.75</span>
              </div>
              <div className="flex justify-between">
                <span>Equipment</span>
                <span className="font-medium">$25.00</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Other Fees</span>
                <span className="font-medium">$12.55</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total Deductions</span>
                <span className="font-bold text-red-600">${totalDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Earning Details Dialog */}
      <Dialog open={viewingEarning !== null} onOpenChange={() => setViewingEarning(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Earning Details</DialogTitle>
            <DialogDescription>{viewingEarning?.loadNumber}</DialogDescription>
          </DialogHeader>
          {viewingEarning && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <p className="text-sm font-medium">{viewingEarning.date}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(viewingEarning.status)}</div>
                </div>
                <div>
                  <Label>Origin</Label>
                  <p className="text-sm font-medium">{viewingEarning.origin}</p>
                </div>
                <div>
                  <Label>Destination</Label>
                  <p className="text-sm font-medium">{viewingEarning.destination}</p>
                </div>
                <div>
                  <Label>Miles</Label>
                  <p className="text-sm font-medium">{viewingEarning.miles}</p>
                </div>
                <div>
                  <Label>Pay Type</Label>
                  <div className="mt-1">{getPayTypeBadge(viewingEarning.payType)}</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Pay</span>
                    <span className="font-medium text-green-600">${viewingEarning.grossPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductions</span>
                    <span className="font-medium text-red-600">-${viewingEarning.deductions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Net Pay</span>
                    <span>${viewingEarning.netPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setViewingEarning(null)}>
                  Close
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EarningsPage;