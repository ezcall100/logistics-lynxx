import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Download, 
  Eye,
  Target,
  MapPin,
  FileText,
  Calculator
} from 'lucide-react';
import { toast } from 'sonner';

interface EarningsRecord {
  id: string;
  payPeriod: string;
  startDate: string;
  endDate: string;
  grossPay: number;
  netPay: number;
  totalMiles: number;
  totalHours: number;
  deliveries: number;
  status: 'paid' | 'pending' | 'processing';
  payDate: string;
}

interface EarningsBreakdown {
  basePay: number;
  mileageBonus: number;
  deliveryBonus: number;
  safetyBonus: number;
  overtime: number;
  deductions: {
    taxes: number;
    insurance: number;
    fuelAdvance: number;
    other: number;
  };
}

const EarningsOverviewPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('current');
  const [selectedRecord, setSelectedRecord] = useState<EarningsRecord | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Sample data
  const currentEarnings = {
    periodStart: '2024-01-01',
    periodEnd: '2024-01-14',
    totalMiles: 2847,
    totalHours: 68.5,
    grossPay: 3425.50,
    netPay: 2698.30,
    deliveries: 12,
    status: 'processing' as const
  };

  const earningsHistory: EarningsRecord[] = [
    {
      id: '1',
      payPeriod: 'Dec 16-31, 2023',
      startDate: '2023-12-16',
      endDate: '2023-12-31',
      grossPay: 4150.75,
      netPay: 3268.90,
      totalMiles: 3240,
      totalHours: 78.5,
      deliveries: 15,
      status: 'paid',
      payDate: '2024-01-05'
    },
    {
      id: '2',
      payPeriod: 'Dec 1-15, 2023',
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      grossPay: 3890.25,
      netPay: 3065.40,
      totalMiles: 3120,
      totalHours: 74.0,
      deliveries: 14,
      status: 'paid',
      payDate: '2023-12-20'
    },
    {
      id: '3',
      payPeriod: 'Nov 16-30, 2023',
      startDate: '2023-11-16',
      endDate: '2023-11-30',
      grossPay: 3675.80,
      netPay: 2898.20,
      totalMiles: 2950,
      totalHours: 70.5,
      deliveries: 13,
      status: 'paid',
      payDate: '2023-12-05'
    }
  ];

  const breakdownData: EarningsBreakdown = {
    basePay: 2400.00,
    mileageBonus: 568.50,
    deliveryBonus: 240.00,
    safetyBonus: 150.00,
    overtime: 67.00,
    deductions: {
      taxes: 485.30,
      insurance: 125.00,
      fuelAdvance: 89.90,
      other: 27.00
    }
  };

  const handleViewDetails = (record: EarningsRecord) => {
    setSelectedRecord(record);
    setShowBreakdown(true);
    toast.success('Loading earnings details...');
  };

  const handleDownloadStatement = (recordId: string) => {
    toast.success('Pay statement downloaded successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Earnings Overview</h1>
          <p className="text-muted-foreground">Track your pay, bonuses, and earnings history</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="last">Last Period</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleDownloadStatement('current')}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Current Period Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gross Pay</p>
                <p className="text-2xl font-bold text-primary">${currentEarnings.grossPay.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Pay</p>
                <p className="text-2xl font-bold">${currentEarnings.netPay.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Miles</p>
                <p className="text-2xl font-bold">{currentEarnings.totalMiles.toLocaleString()}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deliveries</p>
                <p className="text-2xl font-bold">{currentEarnings.deliveries}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Period</TabsTrigger>
          <TabsTrigger value="history">Earnings History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Period Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Current Pay Period: {currentEarnings.periodStart} to {currentEarnings.periodEnd}
                {getStatusBadge(currentEarnings.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Pay Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Pay:</span>
                      <span className="font-medium">${breakdownData.basePay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mileage Bonus:</span>
                      <span className="font-medium">${breakdownData.mileageBonus.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Bonus:</span>
                      <span className="font-medium">${breakdownData.deliveryBonus.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety Bonus:</span>
                      <span className="font-medium">${breakdownData.safetyBonus.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime:</span>
                      <span className="font-medium">${breakdownData.overtime.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Gross Total:</span>
                      <span>${currentEarnings.grossPay.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Deductions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Federal Tax:</span>
                      <span className="font-medium">-${breakdownData.deductions.taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Insurance:</span>
                      <span className="font-medium">-${breakdownData.deductions.insurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fuel Advance:</span>
                      <span className="font-medium">-${breakdownData.deductions.fuelAdvance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other:</span>
                      <span className="font-medium">-${breakdownData.deductions.other.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Deductions:</span>
                      <span>-${Object.values(breakdownData.deductions).reduce((a, b) => a + b, 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Hours Worked:</span>
                      <span className="font-medium">{currentEarnings.totalHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Miles Driven:</span>
                      <span className="font-medium">{currentEarnings.totalMiles.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deliveries:</span>
                      <span className="font-medium">{currentEarnings.deliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay per Mile:</span>
                      <span className="font-medium">${(currentEarnings.grossPay / currentEarnings.totalMiles).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay per Hour:</span>
                      <span className="font-medium">${(currentEarnings.grossPay / currentEarnings.totalHours).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => setShowBreakdown(true)} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button onClick={() => handleDownloadStatement('current')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Earnings History */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Pay Period</th>
                      <th className="text-left p-3 font-semibold">Gross Pay</th>
                      <th className="text-left p-3 font-semibold">Net Pay</th>
                      <th className="text-left p-3 font-semibold">Miles</th>
                      <th className="text-left p-3 font-semibold">Hours</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsHistory.map((record) => (
                      <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{record.payPeriod}</div>
                            <div className="text-sm text-muted-foreground">
                              Paid: {record.payDate}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-medium">${record.grossPay.toLocaleString()}</td>
                        <td className="p-3 font-medium">${record.netPay.toLocaleString()}</td>
                        <td className="p-3">{record.totalMiles.toLocaleString()}</td>
                        <td className="p-3">{record.totalHours}h</td>
                        <td className="p-3">{getStatusBadge(record.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(record)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadStatement(record.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Breakdown Dialog */}
      <Dialog open={showBreakdown} onOpenChange={setShowBreakdown}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detailed Earnings Breakdown</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Earnings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Pay Rate:</span>
                    <span>$0.85/mile</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Miles Driven:</span>
                    <span>{currentEarnings.totalMiles}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Base Pay:</span>
                    <span className="font-medium">${breakdownData.basePay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Performance Bonuses:</span>
                    <span className="font-medium">${(breakdownData.mileageBonus + breakdownData.deliveryBonus + breakdownData.safetyBonus).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Overtime Pay:</span>
                    <span className="font-medium">${breakdownData.overtime.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Gross Total:</span>
                    <span>${currentEarnings.grossPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Deductions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Federal Income Tax:</span>
                    <span>-${(breakdownData.deductions.taxes * 0.7).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>State Income Tax:</span>
                    <span>-${(breakdownData.deductions.taxes * 0.2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>FICA Tax:</span>
                    <span>-${(breakdownData.deductions.taxes * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Health Insurance:</span>
                    <span>-${breakdownData.deductions.insurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fuel Advance:</span>
                    <span>-${breakdownData.deductions.fuelAdvance.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Deductions:</span>
                    <span>-${Object.values(breakdownData.deductions).reduce((a, b) => a + b, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Net Pay:</span>
                <span className="text-primary">${currentEarnings.netPay.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EarningsOverviewPage;