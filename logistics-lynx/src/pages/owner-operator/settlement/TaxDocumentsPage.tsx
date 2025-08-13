import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Download, 
  Upload, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Search,
  Eye,
  Send,
  Clock,
  Calculator,
  Receipt,
  Building,
  User
} from 'lucide-react';
import { toast } from 'sonner';

interface TaxDocument {
  id: string;
  documentType: '1099-NEC' | 'W-2' | '1099-MISC' | 'Quarterly-941' | 'Annual-Summary';
  taxYear: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'available' | 'pending' | 'filed' | 'overdue';
  filedDate?: string;
  downloadUrl?: string;
}

interface TaxSummary {
  taxYear: string;
  totalIncome: number;
  totalTaxes: number;
  federalWithheld: number;
  stateWithheld: number;
  estimatedRefund: number;
  filingStatus: 'not-filed' | 'filed' | 'amended';
}

interface TaxEstimate {
  quarter: string;
  estimatedIncome: number;
  estimatedTax: number;
  dueDate: string;
  status: 'upcoming' | 'due' | 'paid' | 'overdue';
}

const TaxDocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  // Mock data for tax documents
  const taxDocuments: TaxDocument[] = [
    {
      id: '1',
      documentType: '1099-NEC',
      taxYear: '2023',
      issueDate: '2024-01-31',
      dueDate: '2024-04-15',
      amount: 175000.00,
      status: 'available'
    },
    {
      id: '2',
      documentType: 'W-2',
      taxYear: '2023',
      issueDate: '2024-01-31',
      dueDate: '2024-04-15',
      amount: 52000.00,
      status: 'available'
    },
    {
      id: '3',
      documentType: '1099-MISC',
      taxYear: '2023',
      issueDate: '2024-01-31',
      dueDate: '2024-04-15',
      amount: 8500.00,
      status: 'available'
    },
    {
      id: '4',
      documentType: 'Quarterly-941',
      taxYear: '2024',
      issueDate: '2024-01-31',
      dueDate: '2024-04-30',
      amount: 12750.00,
      status: 'filed',
      filedDate: '2024-04-15'
    },
    {
      id: '5',
      documentType: 'Annual-Summary',
      taxYear: '2023',
      issueDate: '2024-02-15',
      dueDate: '2024-04-15',
      amount: 235500.00,
      status: 'available'
    }
  ];

  // Mock data for tax summary
  const taxSummary: TaxSummary = {
    taxYear: '2023',
    totalIncome: 235500.00,
    totalTaxes: 47100.00,
    federalWithheld: 35325.00,
    stateWithheld: 7065.00,
    estimatedRefund: 4710.00,
    filingStatus: 'not-filed'
  };

  // Mock data for quarterly estimates
  const taxEstimates: TaxEstimate[] = [
    {
      quarter: 'Q1 2024',
      estimatedIncome: 60000.00,
      estimatedTax: 12000.00,
      dueDate: '2024-04-15',
      status: 'paid'
    },
    {
      quarter: 'Q2 2024',
      estimatedIncome: 62000.00,
      estimatedTax: 12400.00,
      dueDate: '2024-06-15',
      status: 'upcoming'
    },
    {
      quarter: 'Q3 2024',
      estimatedIncome: 58000.00,
      estimatedTax: 11600.00,
      dueDate: '2024-09-15',
      status: 'upcoming'
    },
    {
      quarter: 'Q4 2024',
      estimatedIncome: 65000.00,
      estimatedTax: 13000.00,
      dueDate: '2025-01-15',
      status: 'upcoming'
    }
  ];

  const filteredDocuments = taxDocuments.filter(doc => {
    const matchesSearch = doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.taxYear.includes(searchTerm);
    const matchesType = documentTypeFilter === 'all' || doc.documentType === documentTypeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'default',
      pending: 'secondary',
      filed: 'outline',
      overdue: 'destructive'
    } as const;
    
    const icons = {
      available: <FileText className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      filed: <CheckCircle className="w-3 h-3" />,
      overdue: <AlertTriangle className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getEstimateStatusBadge = (status: string) => {
    const variants = {
      upcoming: 'secondary',
      due: 'destructive',
      paid: 'default',
      overdue: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getDocumentIcon = (type: string) => {
    const icons = {
      '1099-NEC': <Building className="w-4 h-4" />,
      'W-2': <User className="w-4 h-4" />,
      '1099-MISC': <Receipt className="w-4 h-4" />,
      'Quarterly-941': <Calculator className="w-4 h-4" />,
      'Annual-Summary': <FileText className="w-4 h-4" />
    };

    return icons[type as keyof typeof icons] || <FileText className="w-4 h-4" />;
  };

  const handleViewDocument = (documentId: string) => {
    toast.success(`Opening tax document ${documentId}`);
  };

  const handleDownloadDocument = (documentId: string) => {
    toast.success(`Downloading tax document ${documentId}`);
  };

  const handleRequestDocument = () => {
    if (!requestMessage.trim()) {
      toast.error('Please enter a message for your request');
      return;
    }
    toast.success('Document request submitted successfully');
    setIsRequestDialogOpen(false);
    setRequestMessage('');
  };

  const handlePayEstimate = (quarter: string) => {
    toast.success(`Estimated tax payment for ${quarter} processed`);
  };

  const handleGenerateTaxReport = () => {
    toast.success('Generating comprehensive tax report...');
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Documents</h1>
          <p className="text-muted-foreground">Access and manage your tax documents and filings</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Request Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Tax Document</DialogTitle>
                <DialogDescription>
                  Request a specific tax document or correction
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1099-nec">1099-NEC</SelectItem>
                      <SelectItem value="w-2">W-2</SelectItem>
                      <SelectItem value="1099-misc">1099-MISC</SelectItem>
                      <SelectItem value="correction">Document Correction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tax-year">Tax Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your request..."
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRequestDocument}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleGenerateTaxReport}>
            <Calculator className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Tax Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tax Year {taxSummary.taxYear} Summary
          </CardTitle>
          <CardDescription>Overview of your tax information for the year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">${taxSummary.totalIncome.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${taxSummary.totalTaxes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Taxes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${taxSummary.federalWithheld.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Federal Withheld</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${taxSummary.stateWithheld.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">State Withheld</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${taxSummary.estimatedRefund.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Est. Refund</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              Filing Status: 
              <Badge variant={taxSummary.filingStatus === 'filed' ? 'default' : 'secondary'}>
                {taxSummary.filingStatus === 'not-filed' ? 'Not Filed' : 
                 taxSummary.filingStatus === 'filed' ? 'Filed' : 'Amended'}
              </Badge>
            </div>
            {taxSummary.filingStatus === 'not-filed' && (
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                File Taxes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Tax Documents</TabsTrigger>
          <TabsTrigger value="estimates">Quarterly Estimates</TabsTrigger>
          <TabsTrigger value="history">Filing History</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
              <CardDescription>Download and view your tax documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="type-filter">Document Type</Label>
                  <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="1099-NEC">1099-NEC</SelectItem>
                      <SelectItem value="W-2">W-2</SelectItem>
                      <SelectItem value="1099-MISC">1099-MISC</SelectItem>
                      <SelectItem value="Quarterly-941">Quarterly 941</SelectItem>
                      <SelectItem value="Annual-Summary">Annual Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="filed">Filed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Documents Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Tax Year</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDocumentIcon(document.documentType)}
                            {document.documentType}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{document.taxYear}</TableCell>
                        <TableCell>{document.issueDate}</TableCell>
                        <TableCell>{document.dueDate}</TableCell>
                        <TableCell>${document.amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(document.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDocument(document.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadDocument(document.id)}
                              disabled={document.status === 'pending'}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
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

        <TabsContent value="estimates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Tax Estimates</CardTitle>
              <CardDescription>Manage your quarterly estimated tax payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxEstimates.map((estimate, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{estimate.quarter}</h3>
                        <p className="text-sm text-muted-foreground">Due: {estimate.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${estimate.estimatedTax.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Income: ${estimate.estimatedIncome.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      {getEstimateStatusBadge(estimate.status)}
                      {estimate.status === 'upcoming' && (
                        <Button 
                          size="sm"
                          onClick={() => handlePayEstimate(estimate.quarter)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filing History</CardTitle>
              <CardDescription>View your past tax filings and amendments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">2023 Tax Return</h3>
                      <p className="text-sm text-muted-foreground">Filed: April 12, 2024</p>
                      <p className="text-sm text-muted-foreground">Method: Electronic Filing</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">Filed</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        Refund: $4,710
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">2022 Tax Return</h3>
                      <p className="text-sm text-muted-foreground">Filed: April 10, 2023</p>
                      <p className="text-sm text-muted-foreground">Method: Electronic Filing</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">Filed</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        Owed: $2,150
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">2022 Tax Return Amendment</h3>
                      <p className="text-sm text-muted-foreground">Filed: June 15, 2023</p>
                      <p className="text-sm text-muted-foreground">Method: Mail</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Amended</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        Additional Refund: $850
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxDocumentsPage;