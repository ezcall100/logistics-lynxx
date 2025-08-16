/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Share,
  Printer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockDocuments = [
  {
    id: 'DOC-001',
    shipmentId: 'TMS-2024-089',
    type: 'Bill of Lading',
    fileName: 'BOL_TMS-2024-089.pdf',
    status: 'signed',
    uploadedBy: 'Mike Rodriguez',
    uploadDate: '2024-01-15 08:30',
    signedBy: 'John Smith',
    signDate: '2024-01-15 09:15',
    customer: 'Walmart Inc.',
    size: '2.4 MB'
  },
  {
    id: 'DOC-002',
    shipmentId: 'TMS-2024-089',
    type: 'Proof of Delivery',
    fileName: 'POD_TMS-2024-089.pdf',
    status: 'pending',
    uploadedBy: 'System',
    uploadDate: '2024-01-17 14:30',
    signedBy: null,
    signDate: null,
    customer: 'Walmart Inc.',
    size: '1.8 MB'
  },
  {
    id: 'DOC-003',
    shipmentId: 'TMS-2024-091',
    type: 'Invoice',
    fileName: 'INV_TMS-2024-091.pdf',
    status: 'uploaded',
    uploadedBy: 'Finance Dept',
    uploadDate: '2024-01-16 11:20',
    signedBy: null,
    signDate: null,
    customer: 'Target Corporation',
    size: '1.2 MB'
  },
  {
    id: 'DOC-004',
    shipmentId: 'TMS-2024-092',
    type: 'Bill of Lading',
    fileName: 'BOL_TMS-2024-092.pdf',
    status: 'signed',
    uploadedBy: 'Jennifer Lee',
    uploadDate: '2024-01-14 07:45',
    signedBy: 'Tom Anderson',
    signDate: '2024-01-14 08:00',
    customer: 'Amazon Logistics',
    size: '2.1 MB'
  },
  {
    id: 'DOC-005',
    shipmentId: 'TMS-2024-093',
    type: 'Inspection Report',
    fileName: 'INSPECT_TMS-2024-093.pdf',
    status: 'uploaded',
    uploadedBy: 'Robert Johnson',
    uploadDate: '2024-01-17 10:15',
    signedBy: null,
    signDate: null,
    customer: 'Home Depot',
    size: '3.7 MB'
  }
];

const ShipmentDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'uploaded': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed': return <CheckCircle className="h-4 w-4" />;
      case 'uploaded': return <Upload className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Document Management</h2>
          <p className="text-muted-foreground">Manage bills of lading, proof of delivery, and invoices</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Bulk Print
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Signed</p>
                <p className="text-2xl font-bold text-green-500">
                  {filteredDocuments.filter(d => d.status === 'signed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uploaded</p>
                <p className="text-2xl font-bold text-blue-500">
                  {filteredDocuments.filter(d => d.status === 'uploaded').length}
                </p>
              </div>
              <Upload className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-500">
                  {filteredDocuments.filter(d => d.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Docs</p>
                <p className="text-2xl font-bold text-purple-500">{filteredDocuments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by file name, shipment ID, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="uploaded">Uploaded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Bill of Lading">Bill of Lading</SelectItem>
                <SelectItem value="Proof of Delivery">Proof of Delivery</SelectItem>
                <SelectItem value="Invoice">Invoice</SelectItem>
                <SelectItem value="Inspection Report">Inspection Report</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Documents ({filteredDocuments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Info</TableHead>
                  <TableHead>Signature Info</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.type}</p>
                          <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{doc.shipmentId}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-foreground">{doc.customer}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(doc.status)}
                            <span>{doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
                          </div>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.uploadedBy}</p>
                        <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.signedBy ? (
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.signedBy}</p>
                          <p className="text-xs text-muted-foreground">{doc.signDate}</p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Not signed
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{doc.size}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Share Document
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Print Document
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Document
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Document Templates */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Quick Actions & Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <h4 className="font-medium text-foreground">Bill of Lading</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Generate standardized BOL for shipments</p>
              <Button size="sm" className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create BOL
              </Button>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="font-medium text-foreground">Proof of Delivery</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Delivery confirmation template</p>
              <Button size="sm" className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create POD
              </Button>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Upload className="h-5 w-5 text-purple-500" />
                </div>
                <h4 className="font-medium text-foreground">Bulk Upload</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Upload multiple documents at once</p>
              <Button size="sm" className="w-full" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentDocuments;