
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  RefreshCw, 
  Eye, 
  RotateCcw,
  Download,
  Trash2,
  FileText,
  DollarSign,
  Clock,
  AlertCircle
} from 'lucide-react';

export const FailedInvoices: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const failedInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      documentNumber: 'EDI210-001',
      partner: 'ABC Logistics',
      loadNumber: 'LD001234',
      errorCode: 'AMOUNT_MISMATCH',
      errorMessage: 'Invoice amount does not match original tender amount',
      failureTime: '2024-06-17 10:30',
      retryCount: 1,
      priority: 'high',
      invoiceAmount: 2450.00,
      expectedAmount: 2400.00,
      invoiceDate: '2024-06-15',
      dueDate: '2024-06-30'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      documentNumber: 'EDI210-002',
      partner: 'XYZ Transport',
      loadNumber: 'LD001235',
      errorCode: 'MISSING_REFERENCE',
      errorMessage: 'Missing load reference number in invoice',
      failureTime: '2024-06-17 09:15',
      retryCount: 0,
      priority: 'medium',
      invoiceAmount: 1890.50,
      expectedAmount: 1890.50,
      invoiceDate: '2024-06-16',
      dueDate: '2024-07-01'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      documentNumber: 'EDI210-003',
      partner: 'Global Freight',
      loadNumber: 'LD001236',
      errorCode: 'FORMAT_ERROR',
      errorMessage: 'Invalid date format in invoice header',
      failureTime: '2024-06-16 16:45',
      retryCount: 2,
      priority: 'low',
      invoiceAmount: 3200.00,
      expectedAmount: 3200.00,
      invoiceDate: '2024-06-14',
      dueDate: '2024-06-29'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      documentNumber: 'EDI210-004',
      partner: 'Swift Delivery',
      loadNumber: 'LD001237',
      errorCode: 'DUPLICATE_INVOICE',
      errorMessage: 'Invoice number already exists in system',
      failureTime: '2024-06-16 14:20',
      retryCount: 0,
      priority: 'medium',
      invoiceAmount: 1650.75,
      expectedAmount: 1650.75,
      invoiceDate: '2024-06-15',
      dueDate: '2024-06-30'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      documentNumber: 'EDI210-005',
      partner: 'Metro Shipping',
      loadNumber: 'LD001238',
      errorCode: 'VALIDATION_ERROR',
      errorMessage: 'Tax calculation does not match invoice totals',
      failureTime: '2024-06-16 12:10',
      retryCount: 1,
      priority: 'high',
      invoiceAmount: 2750.25,
      expectedAmount: 2725.00,
      invoiceDate: '2024-06-15',
      dueDate: '2024-06-30'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getErrorCodeBadge = (errorCode: string) => {
    const colorMap: { [key: string]: string } = {
      'AMOUNT_MISMATCH': 'bg-red-100 text-red-800',
      'MISSING_REFERENCE': 'bg-orange-100 text-orange-800',
      'FORMAT_ERROR': 'bg-purple-100 text-purple-800',
      'DUPLICATE_INVOICE': 'bg-yellow-100 text-yellow-800',
      'VALIDATION_ERROR': 'bg-blue-100 text-blue-800'
    };
    
    return <Badge className={colorMap[errorCode] || 'bg-gray-100 text-gray-800'}>{errorCode}</Badge>;
  };

  const handleRetry = (id: number) => {
    toast({
      title: "Retry Initiated",
      description: `Retrying failed invoice ${id}. Please wait...`,
    });

    setTimeout(() => {
      toast({
        title: "Retry Complete",
        description: "Invoice has been reprocessed successfully.",
      });
    }, 2000);
  };

  const handleBulkRetry = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to retry.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Retry Initiated",
      description: `Retrying ${selectedItems.length} failed invoices.`,
    });
    setSelectedItems([]);
  };

  const handleViewDetails = (id: number) => {
    toast({
      title: "View Invoice Details",
      description: "Detailed invoice information would be displayed here.",
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Invoice Deleted",
      description: "Failed invoice has been removed from the queue.",
    });
  };

  const handleManualReview = (id: number) => {
    toast({
      title: "Manual Review",
      description: "Invoice has been flagged for manual review.",
    });
  };

  const filteredInvoices = failedInvoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.errorCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = failedInvoices.reduce((sum, inv) => sum + inv.invoiceAmount, 0);
  const totalVariance = failedInvoices.reduce((sum, inv) => sum + Math.abs(inv.invoiceAmount - inv.expectedAmount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Failed Invoices</h1>
          <p className="text-muted-foreground">Monitor and resolve failed invoice processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleBulkRetry}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Bulk Retry
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Invoices</CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedInvoices.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Affected amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Variance</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalVariance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total discrepancy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {failedInvoices.filter(inv => inv.priority === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by invoice number, partner, load number, or error code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Failed Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Failed Invoice Queue
          </CardTitle>
          <CardDescription>
            Review and resolve failed invoice processing issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(failedInvoices.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Load</TableHead>
                <TableHead>Amounts</TableHead>
                <TableHead>Error</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Retries</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(invoice.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, invoice.id]);
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== invoice.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.invoiceNumber}</div>
                      <div className="text-sm text-muted-foreground">{invoice.documentNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.partner}</TableCell>
                  <TableCell>{invoice.loadNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">${invoice.invoiceAmount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Expected: ${invoice.expectedAmount.toLocaleString()}
                      </div>
                      {invoice.invoiceAmount !== invoice.expectedAmount && (
                        <div className="text-xs text-red-600">
                          Variance: ${Math.abs(invoice.invoiceAmount - invoice.expectedAmount).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getErrorCodeBadge(invoice.errorCode)}
                      <div className="text-xs text-muted-foreground max-w-48 truncate">
                        {invoice.errorMessage}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(invoice.priority)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{invoice.dueDate}</div>
                      <div className="text-xs text-muted-foreground">
                        Inv: {invoice.invoiceDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.retryCount}/3</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(invoice.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleRetry(invoice.id)}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleManualReview(invoice.id)}>
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(invoice.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
