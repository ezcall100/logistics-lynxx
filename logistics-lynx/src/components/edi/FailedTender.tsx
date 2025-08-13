
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
  Calendar,
  Clock
} from 'lucide-react';

export const FailedTender: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const failedTenders = [
    {
      id: 1,
      documentNumber: 'TDR-2024-001',
      partner: 'ABC Logistics',
      loadNumber: 'LD001234',
      errorCode: 'PARSE_ERROR',
      errorMessage: 'Invalid date format in shipment details',
      failureTime: '2024-06-17 09:15',
      retryCount: 2,
      priority: 'high',
      amount: 2450.00,
      origin: 'Dallas, TX',
      destination: 'Houston, TX'
    },
    {
      id: 2,
      documentNumber: 'TDR-2024-002',
      partner: 'XYZ Transport',
      loadNumber: 'LD001235',
      errorCode: 'VALIDATION_ERROR',
      errorMessage: 'Missing required field: shipper_reference',
      failureTime: '2024-06-17 08:30',
      retryCount: 1,
      priority: 'medium',
      amount: 1890.50,
      origin: 'Phoenix, AZ',
      destination: 'Denver, CO'
    },
    {
      id: 3,
      documentNumber: 'TDR-2024-003',
      partner: 'Global Freight',
      loadNumber: 'LD001236',
      errorCode: 'CONNECTION_ERROR',
      errorMessage: 'Unable to connect to partner EDI endpoint',
      failureTime: '2024-06-16 15:45',
      retryCount: 3,
      priority: 'high',
      amount: 3200.00,
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA'
    },
    {
      id: 4,
      documentNumber: 'TDR-2024-004',
      partner: 'Swift Delivery',
      loadNumber: 'LD001237',
      errorCode: 'TIMEOUT_ERROR',
      errorMessage: 'Request timeout while processing tender',
      failureTime: '2024-06-16 14:20',
      retryCount: 0,
      priority: 'low',
      amount: 1650.75,
      origin: 'Miami, FL',
      destination: 'Orlando, FL'
    },
    {
      id: 5,
      documentNumber: 'TDR-2024-005',
      partner: 'Metro Shipping',
      loadNumber: 'LD001238',
      errorCode: 'BUSINESS_RULE_ERROR',
      errorMessage: 'Shipment weight exceeds partner capacity limits',
      failureTime: '2024-06-16 11:10',
      retryCount: 1,
      priority: 'medium',
      amount: 2750.25,
      origin: 'Seattle, WA',
      destination: 'Portland, OR'
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
      'PARSE_ERROR': 'bg-purple-100 text-purple-800',
      'VALIDATION_ERROR': 'bg-orange-100 text-orange-800',
      'CONNECTION_ERROR': 'bg-red-100 text-red-800',
      'TIMEOUT_ERROR': 'bg-yellow-100 text-yellow-800',
      'BUSINESS_RULE_ERROR': 'bg-blue-100 text-blue-800'
    };
    
    return <Badge className={colorMap[errorCode] || 'bg-gray-100 text-gray-800'}>{errorCode}</Badge>;
  };

  const handleRetry = (id: number) => {
    toast({
      title: "Retry Initiated",
      description: `Retrying failed tender ${id}. Please wait...`,
    });

    setTimeout(() => {
      toast({
        title: "Retry Complete",
        description: "Tender has been reprocessed successfully.",
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
      description: `Retrying ${selectedItems.length} failed tenders.`,
    });
    setSelectedItems([]);
  };

  const handleViewDetails = (id: number) => {
    toast({
      title: "View Details",
      description: "Detailed error information would be displayed here.",
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Tender Deleted",
      description: "Failed tender has been removed from the queue.",
    });
  };

  const filteredTenders = failedTenders.filter(tender =>
    tender.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.errorCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Failed Tenders</h1>
          <p className="text-muted-foreground">Monitor and resolve failed tender processing</p>
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
            <CardTitle className="text-sm font-medium">Total Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTenders.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {failedTenders.filter(t => t.priority === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retry Pending</CardTitle>
            <RotateCcw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {failedTenders.filter(t => t.retryCount > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Can be retried</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${failedTenders.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Affected revenue</p>
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
                  placeholder="Search by document number, partner, load number, or error code..."
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

      {/* Failed Tenders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Failed Tender Queue
          </CardTitle>
          <CardDescription>
            Review and resolve failed tender processing issues
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
                        setSelectedItems(failedTenders.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Load</TableHead>
                <TableHead>Error</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Failed Time</TableHead>
                <TableHead>Retries</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenders.map((tender) => (
                <TableRow key={tender.id}>
                  <TableCell>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(tender.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, tender.id]);
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== tender.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tender.documentNumber}</div>
                      <div className="text-sm text-muted-foreground">{tender.loadNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{tender.partner}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{tender.origin}</div>
                      <div className="text-sm text-muted-foreground">→ {tender.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getErrorCodeBadge(tender.errorCode)}
                      <div className="text-xs text-muted-foreground max-w-48 truncate">
                        {tender.errorMessage}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(tender.priority)}</TableCell>
                  <TableCell>${tender.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{tender.failureTime}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tender.retryCount}/3</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(tender.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => handleRetry(tender.id)}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(tender.id)}>
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
