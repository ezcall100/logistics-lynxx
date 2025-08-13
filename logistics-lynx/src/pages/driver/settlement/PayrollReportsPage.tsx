import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Filter,
  Search,
  Eye,
  Calculator,
  Target,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface PayrollReport {
  id: string;
  reportType: string;
  period: string;
  startDate: string;
  endDate: string;
  generatedDate: string;
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalDeductions: number;
  totalHours: number;
  totalMiles: number;
  status: 'final' | 'preliminary' | 'processing';
}

interface TaxDocument {
  id: string;
  documentType: string;
  taxYear: number;
  issuedDate: string;
  status: 'available' | 'pending' | 'mailed';
  description: string;
}

interface PayrollSummary {
  ytdGross: number;
  ytdNet: number;
  ytdTax: number;
  ytdDeductions: number;
  currentQuarter: {
    gross: number;
    net: number;
    tax: number;
  };
  lastQuarter: {
    gross: number;
    net: number;
    tax: number;
  };
}

const PayrollReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('ytd');
  const [selectedReport, setSelectedReport] = useState<PayrollReport | null>(null);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  // Sample payroll reports
  const payrollReports: PayrollReport[] = [
    {
      id: '1',
      reportType: 'Bi-Weekly Payroll',
      period: 'Dec 16-31, 2023',
      startDate: '2023-12-16',
      endDate: '2023-12-31',
      generatedDate: '2024-01-05',
      totalGross: 4150.75,
      totalNet: 3268.90,
      totalTax: 623.60,
      totalDeductions: 258.25,
      totalHours: 78.5,
      totalMiles: 3240,
      status: 'final'
    },
    {
      id: '2',
      reportType: 'Bi-Weekly Payroll',
      period: 'Dec 1-15, 2023',
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      generatedDate: '2023-12-20',
      totalGross: 3890.25,
      totalNet: 3065.40,
      totalTax: 586.85,
      totalDeductions: 238.00,
      totalHours: 74.0,
      totalMiles: 3120,
      status: 'final'
    },
    {
      id: '3',
      reportType: 'Monthly Summary',
      period: 'November 2023',
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      generatedDate: '2023-12-05',
      totalGross: 7845.60,
      totalNet: 6189.30,
      totalTax: 1184.40,
      totalDeductions: 471.90,
      totalHours: 148.5,
      totalMiles: 6180,
      status: 'final'
    },
    {
      id: '4',
      reportType: 'Quarterly Report',
      period: 'Q4 2023',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      generatedDate: '2024-01-15',
      totalGross: 23580.45,
      totalNet: 18608.20,
      totalTax: 3557.40,
      totalDeductions: 1414.85,
      totalHours: 446.5,
      totalMiles: 18640,
      status: 'final'
    },
    {
      id: '5',
      reportType: 'Annual Summary',
      period: '2023 Tax Year',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      generatedDate: '2024-01-31',
      totalGross: 94240.80,
      totalNet: 74368.45,
      totalTax: 14225.60,
      totalDeductions: 5646.75,
      totalHours: 1786.0,
      totalMiles: 74580,
      status: 'final'
    }
  ];

  // Sample tax documents
  const taxDocuments: TaxDocument[] = [
    {
      id: '1',
      documentType: 'W-2 Wage and Tax Statement',
      taxYear: 2023,
      issuedDate: '2024-01-31',
      status: 'available',
      description: 'Annual wage and tax statement for 2023'
    },
    {
      id: '2',
      documentType: '1099-MISC',
      taxYear: 2023,
      issuedDate: '2024-01-31',
      status: 'available',
      description: 'Miscellaneous income for 2023'
    },
    {
      id: '3',
      documentType: 'W-2 Wage and Tax Statement',
      taxYear: 2022,
      issuedDate: '2023-01-31',
      status: 'available',
      description: 'Annual wage and tax statement for 2022'
    }
  ];

  const payrollSummary: PayrollSummary = {
    ytdGross: 94240.80,
    ytdNet: 74368.45,
    ytdTax: 14225.60,
    ytdDeductions: 5646.75,
    currentQuarter: {
      gross: 23580.45,
      net: 18608.20,
      tax: 3557.40
    },
    lastQuarter: {
      gross: 22840.60,
      net: 18025.30,
      tax: 3445.20
    }
  };

  const handleViewReport = (report: PayrollReport) => {
    setSelectedReport(report);
    setShowReportDetail(true);
    toast.success('Loading report details...');
  };

  const handleDownloadReport = (reportId: string) => {
    toast.success('Report downloaded successfully');
  };

  const handleDownloadTaxDocument = (documentId: string) => {
    toast.success('Tax document downloaded successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'final':
        return <Badge className="bg-emerald-100 text-emerald-800">Final</Badge>;
      case 'preliminary':
        return <Badge className="bg-amber-100 text-amber-800">Preliminary</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'available':
        return <Badge className="bg-emerald-100 text-emerald-800">Available</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'mailed':
        return <Badge className="bg-blue-100 text-blue-800">Mailed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const calculateQuarterlyChange = () => {
    const change = ((payrollSummary.currentQuarter.gross - payrollSummary.lastQuarter.gross) / payrollSummary.lastQuarter.gross) * 100;
    return change;
  };

  const filteredReports = payrollReports.filter(report => 
    filterType === 'all' || report.reportType.toLowerCase().includes(filterType.toLowerCase())
  );

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payroll Reports</h1>
          <p className="text-muted-foreground">View and download your payroll reports and tax documents</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleDownloadReport('annual-summary')}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">YTD Gross</p>
                <p className="text-2xl font-bold text-primary">${payrollSummary.ytdGross.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">YTD Net</p>
                <p className="text-2xl font-bold">${payrollSummary.ytdNet.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">YTD Tax</p>
                <p className="text-2xl font-bold">${payrollSummary.ytdTax.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quarter Change</p>
                <p className={`text-2xl font-bold ${calculateQuarterlyChange() >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {calculateQuarterlyChange() >= 0 ? '+' : ''}{calculateQuarterlyChange().toFixed(1)}%
                </p>
              </div>
              {calculateQuarterlyChange() >= 0 ? 
                <TrendingUp className="h-8 w-8 text-emerald-600" /> : 
                <TrendingDown className="h-8 w-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Payroll Reports</TabsTrigger>
          <TabsTrigger value="tax-docs">Tax Documents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search reports..."
                    className="w-full"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Report Type</th>
                      <th className="text-left p-3 font-semibold">Period</th>
                      <th className="text-left p-3 font-semibold">Gross Pay</th>
                      <th className="text-left p-3 font-semibold">Net Pay</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{report.reportType}</div>
                            <div className="text-sm text-muted-foreground">
                              Generated: {new Date(report.generatedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{report.period}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.totalHours}h | {report.totalMiles.toLocaleString()} mi
                          </div>
                        </td>
                        <td className="p-3 font-medium">${report.totalGross.toLocaleString()}</td>
                        <td className="p-3 font-medium">${report.totalNet.toLocaleString()}</td>
                        <td className="p-3">{getStatusBadge(report.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadReport(report.id)}
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

        <TabsContent value="tax-docs" className="space-y-6">
          {/* Tax Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDocuments.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-muted/50">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">{doc.documentType}</div>
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Tax Year</div>
                          <div className="font-medium">{doc.taxYear}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Issued</div>
                          <div className="font-medium">{new Date(doc.issuedDate).toLocaleDateString()}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Status</div>
                          <div>{getStatusBadge(doc.status)}</div>
                        </div>
                        <Button
                          onClick={() => handleDownloadTaxDocument(doc.id)}
                          disabled={doc.status === 'pending'}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Tax Season Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Tax documents for 2024 will be available by January 31, 2025. 
                      You will be notified when new documents are ready for download.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quarterly Earnings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <span>Q4 2023</span>
                    <span className="font-medium">${payrollSummary.currentQuarter.gross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/20 rounded">
                    <span>Q3 2023</span>
                    <span className="font-medium">${payrollSummary.lastQuarter.gross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/10 rounded">
                    <span>Growth Rate</span>
                    <span className={`font-medium ${calculateQuarterlyChange() >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {calculateQuarterlyChange() >= 0 ? '+' : ''}{calculateQuarterlyChange().toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Income Breakdown (YTD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Gross Income</span>
                    <span className="font-medium">${payrollSummary.ytdGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Federal Tax</span>
                    <span className="font-medium text-red-600">-${(payrollSummary.ytdTax * 0.7).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>State Tax</span>
                    <span className="font-medium text-red-600">-${(payrollSummary.ytdTax * 0.2).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>FICA</span>
                    <span className="font-medium text-red-600">-${(payrollSummary.ytdTax * 0.1).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other Deductions</span>
                    <span className="font-medium text-orange-600">-${payrollSummary.ytdDeductions.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Net Income</span>
                    <span className="text-emerald-600">${payrollSummary.ytdNet.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">$1.26</div>
                  <div className="text-sm text-muted-foreground">Average per Mile</div>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">$52.78</div>
                  <div className="text-sm text-muted-foreground">Average per Hour</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">248</div>
                  <div className="text-sm text-muted-foreground">Working Days (YTD)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Detail Dialog */}
      <Dialog open={showReportDetail} onOpenChange={setShowReportDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Report Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Report Type:</span>
                      <span className="font-medium">{selectedReport.reportType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Period:</span>
                      <span className="font-medium">{selectedReport.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Generated:</span>
                      <span className="font-medium">{new Date(selectedReport.generatedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span>{getStatusBadge(selectedReport.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Financial Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gross Pay:</span>
                      <span className="font-medium">${selectedReport.totalGross.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Withheld:</span>
                      <span className="font-medium">-${selectedReport.totalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Deductions:</span>
                      <span className="font-medium">-${selectedReport.totalDeductions.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Net Pay:</span>
                      <span>${selectedReport.totalNet.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Hours:</span>
                    <span className="font-medium">{selectedReport.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Miles:</span>
                    <span className="font-medium">{selectedReport.totalMiles.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pay per Hour:</span>
                    <span className="font-medium">${(selectedReport.totalGross / selectedReport.totalHours).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pay per Mile:</span>
                    <span className="font-medium">${(selectedReport.totalGross / selectedReport.totalMiles).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleDownloadReport(selectedReport.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={() => setShowReportDetail(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollReportsPage;