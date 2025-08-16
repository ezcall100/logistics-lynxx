/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Plus, Edit, Download, Search, Filter, Upload, FileText, CheckCircle, AlertTriangle, Clock, Eye, Printer } from 'lucide-react';
import { toast } from "sonner";

interface BOLPODDocument {
  id: string;
  documentNumber: string;
  type: 'bol' | 'pod' | 'delivery_receipt' | 'inspection_report';
  loadNumber: string;
  date: string;
  shipper: string;
  consignee: string;
  origin: string;
  destination: string;
  driver: string;
  vehicle: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'signed' | 'completed';
  signedBy?: string;
  signedDate?: string;
  digitalSignature?: boolean;
  items: {
    description: string;
    quantity: number;
    weight: number;
    dimensions?: string;
    hazmat?: boolean;
    value?: number;
  }[];
  specialInstructions?: string;
  damageNotes?: string;
  photoUrls?: string[];
  deliveryNotes?: string;
  arrivalTime?: string;
  departureTime?: string;
  totalPieces: number;
  totalWeight: number;
  freightValue: number;
  insuranceCoverage?: number;
  isHazmat: boolean;
  customerReference?: string;
  purchaseOrder?: string;
}

const mockDocuments: BOLPODDocument[] = [
  {
    id: 'doc-001',
    documentNumber: 'BOL-2024-001',
    type: 'bol',
    loadNumber: 'LD-456789',
    date: '2024-07-19',
    shipper: 'MegaCorp Industries',
    consignee: 'Atlanta Distribution Center',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    status: 'completed',
    signedBy: 'Robert Johnson',
    signedDate: '2024-07-19',
    digitalSignature: true,
    items: [
      {
        description: 'Electronics Components',
        quantity: 240,
        weight: 45000,
        dimensions: '48x40x60',
        hazmat: false,
        value: 125000
      }
    ],
    specialInstructions: 'Handle with care - fragile electronics',
    deliveryNotes: 'Delivered to receiving dock 3, all items accounted for',
    arrivalTime: '14:30',
    departureTime: '16:45',
    totalPieces: 240,
    totalWeight: 45000,
    freightValue: 125000,
    insuranceCoverage: 150000,
    isHazmat: false,
    customerReference: 'REF-789456',
    purchaseOrder: 'PO-123789'
  },
  {
    id: 'doc-002',
    documentNumber: 'POD-2024-001',
    type: 'pod',
    loadNumber: 'LD-456788',
    date: '2024-07-18',
    shipper: 'Sunshine Logistics',
    consignee: 'Miami Warehouse',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    status: 'signed',
    signedBy: 'Maria Rodriguez',
    signedDate: '2024-07-18',
    digitalSignature: true,
    items: [
      {
        description: 'Automotive Parts',
        quantity: 180,
        weight: 38500,
        dimensions: '40x48x54',
        hazmat: false,
        value: 89000
      }
    ],
    deliveryNotes: 'Delivered successfully, customer satisfied',
    arrivalTime: '11:15',
    departureTime: '13:30',
    totalPieces: 180,
    totalWeight: 38500,
    freightValue: 89000,
    isHazmat: false,
    customerReference: 'REF-456123'
  },
  {
    id: 'doc-003',
    documentNumber: 'BOL-2024-002',
    type: 'bol',
    loadNumber: 'LD-456787',
    date: '2024-07-17',
    shipper: 'Texas Transport Co',
    consignee: 'Houston Distribution',
    origin: 'Miami, FL',
    destination: 'Houston, TX',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    status: 'in_transit',
    items: [
      {
        description: 'Consumer Goods',
        quantity: 320,
        weight: 47800,
        dimensions: '48x40x72',
        hazmat: false,
        value: 156000
      }
    ],
    specialInstructions: 'Appointment required for delivery',
    totalPieces: 320,
    totalWeight: 47800,
    freightValue: 156000,
    isHazmat: false,
    customerReference: 'REF-789123'
  },
  {
    id: 'doc-004',
    documentNumber: 'DR-2024-001',
    type: 'delivery_receipt',
    loadNumber: 'LD-456786',
    date: '2024-07-16',
    shipper: 'Mountain Peak Freight',
    consignee: 'Denver Logistics Hub',
    origin: 'Houston, TX',
    destination: 'Denver, CO',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    status: 'delivered',
    items: [
      {
        description: 'Industrial Equipment',
        quantity: 85,
        weight: 41200,
        dimensions: '60x48x80',
        hazmat: false,
        value: 98000
      }
    ],
    arrivalTime: '09:45',
    departureTime: '12:15',
    totalPieces: 85,
    totalWeight: 41200,
    freightValue: 98000,
    isHazmat: false,
    damageNotes: 'Minor scuff on item #23, documented with photos'
  }
];

const BOLPODPage: React.FC = () => {
  const [documents, setDocuments] = useState<BOLPODDocument[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [editingDocument, setEditingDocument] = useState<BOLPODDocument | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<BOLPODDocument | null>(null);

  const [newDocument, setNewDocument] = useState({
    documentNumber: '',
    type: 'bol' as const,
    loadNumber: '',
    date: new Date().toISOString().split('T')[0],
    shipper: '',
    consignee: '',
    origin: '',
    destination: '',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    status: 'pending' as const,
    specialInstructions: '',
    customerReference: '',
    purchaseOrder: '',
    totalPieces: 0,
    totalWeight: 0,
    freightValue: 0,
    isHazmat: false,
    items: [{ description: '', quantity: 0, weight: 0, hazmat: false }]
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.consignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'signed':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Signed</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Delivered</Badge>;
      case 'in_transit':
        return <Badge variant="secondary">In Transit</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: { [key: string]: string } = {
      bol: 'bg-blue-100 text-blue-800',
      pod: 'bg-green-100 text-green-800',
      delivery_receipt: 'bg-purple-100 text-purple-800',
      inspection_report: 'bg-orange-100 text-orange-800'
    };

    const labels: { [key: string]: string } = {
      bol: 'BOL',
      pod: 'POD',
      delivery_receipt: 'Delivery Receipt',
      inspection_report: 'Inspection Report'
    };

    return (
      <Badge variant="secondary" className={colors[type] || colors.bol}>
        {labels[type] || type}
      </Badge>
    );
  };

  const handleAddDocument = () => {
    if (!newDocument.documentNumber || !newDocument.loadNumber || !newDocument.shipper) {
      toast.error('Please fill in all required fields');
      return;
    }

    const document: BOLPODDocument = {
      id: `doc-${Date.now()}`,
      ...newDocument,
      items: newDocument.items.filter(item => item.description && item.quantity > 0)
    };

    setDocuments([document, ...documents]);
    setIsAddingDocument(false);
    resetNewDocument();
    toast.success('Document added successfully');
  };

  const resetNewDocument = () => {
    setNewDocument({
      documentNumber: '',
      type: 'bol',
      loadNumber: '',
      date: new Date().toISOString().split('T')[0],
      shipper: '',
      consignee: '',
      origin: '',
      destination: '',
      driver: 'John Mitchell',
      vehicle: 'TRK-001',
      status: 'pending',
      specialInstructions: '',
      customerReference: '',
      purchaseOrder: '',
      totalPieces: 0,
      totalWeight: 0,
      freightValue: 0,
      isHazmat: false,
      items: [{ description: '', quantity: 0, weight: 0, hazmat: false }]
    });
  };

  const handleUpdateStatus = (id: string, status: BOLPODDocument['status']) => {
    setDocuments(documents =>
      documents.map(doc =>
        doc.id === id ? { ...doc, status } : doc
      )
    );
    toast.success('Document status updated successfully');
  };

  const handleDownloadDocument = (id: string) => {
    toast.success('Document downloaded successfully');
  };

  const handlePrintDocument = (id: string) => {
    toast.success('Document sent to printer');
  };

  const addItemRow = () => {
    setNewDocument({
      ...newDocument,
      items: [...newDocument.items, { description: '', quantity: 0, weight: 0, hazmat: false }]
    });
  };

  const updateItem = (index: number, field: string, value: unknown) => {
    const updatedItems = newDocument.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewDocument({ ...newDocument, items: updatedItems });
  };

  const removeItem = (index: number) => {
    if (newDocument.items.length > 1) {
      const updatedItems = newDocument.items.filter((_, i) => i !== index);
      setNewDocument({ ...newDocument, items: updatedItems });
    }
  };

  // Calculate summary statistics
  const totalDocuments = documents.length;
  const completedDocuments = documents.filter(d => d.status === 'completed').length;
  const pendingDocuments = documents.filter(d => d.status === 'pending').length;
  const inTransitDocuments = documents.filter(d => d.status === 'in_transit').length;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">BOL & POD Management</h1>
        <p className="text-muted-foreground">Bill of Lading and Proof of Delivery document management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-foreground">{totalDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedDocuments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-blue-600">{inTransitDocuments}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingDocuments}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by document number, load, shipper, or consignee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <BookOpen className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bol">BOL</SelectItem>
                <SelectItem value="pod">POD</SelectItem>
                <SelectItem value="delivery_receipt">Delivery Receipt</SelectItem>
                <SelectItem value="inspection_report">Inspection Report</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddingDocument(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>BOL & POD Documents</CardTitle>
          <CardDescription>Complete shipping documentation and delivery records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Load #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shipper</TableHead>
                  <TableHead>Consignee</TableHead>
                  <TableHead>Pieces</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">{document.documentNumber}</TableCell>
                    <TableCell>{getTypeBadge(document.type)}</TableCell>
                    <TableCell>{document.loadNumber}</TableCell>
                    <TableCell>{document.date}</TableCell>
                    <TableCell>{document.shipper}</TableCell>
                    <TableCell>{document.consignee}</TableCell>
                    <TableCell>{document.totalPieces}</TableCell>
                    <TableCell>{document.totalWeight.toLocaleString()} lbs</TableCell>
                    <TableCell>{getStatusBadge(document.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(document.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintDocument(document.id)}
                        >
                          <Printer className="h-4 w-4" />
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

      {/* Add Document Dialog */}
      <Dialog open={isAddingDocument} onOpenChange={setIsAddingDocument}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
            <DialogDescription>
              Create a new BOL, POD, or delivery document
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="documentNumber">Document Number *</Label>
                <Input
                  id="documentNumber"
                  value={newDocument.documentNumber}
                  onChange={(e) => setNewDocument({ ...newDocument, documentNumber: e.target.value })}
                  placeholder="BOL-2024-XXX"
                />
              </div>
              <div>
                <Label htmlFor="type">Document Type</Label>
                <Select value={newDocument.type} onValueChange={(value: unknown) => setNewDocument({ ...newDocument, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bol">Bill of Lading (BOL)</SelectItem>
                    <SelectItem value="pod">Proof of Delivery (POD)</SelectItem>
                    <SelectItem value="delivery_receipt">Delivery Receipt</SelectItem>
                    <SelectItem value="inspection_report">Inspection Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="loadNumber">Load Number *</Label>
                <Input
                  id="loadNumber"
                  value={newDocument.loadNumber}
                  onChange={(e) => setNewDocument({ ...newDocument, loadNumber: e.target.value })}
                  placeholder="LD-123456"
                />
              </div>
            </div>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipper">Shipper *</Label>
                    <Input
                      id="shipper"
                      value={newDocument.shipper}
                      onChange={(e) => setNewDocument({ ...newDocument, shipper: e.target.value })}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="consignee">Consignee</Label>
                    <Input
                      id="consignee"
                      value={newDocument.consignee}
                      onChange={(e) => setNewDocument({ ...newDocument, consignee: e.target.value })}
                      placeholder="Destination company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      value={newDocument.origin}
                      onChange={(e) => setNewDocument({ ...newDocument, origin: e.target.value })}
                      placeholder="Chicago, IL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={newDocument.destination}
                      onChange={(e) => setNewDocument({ ...newDocument, destination: e.target.value })}
                      placeholder="Atlanta, GA"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Freight Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newDocument.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          placeholder="Item description"
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Weight (lbs)</Label>
                        <Input
                          type="number"
                          value={item.weight}
                          onChange={(e) => updateItem(index, 'weight', Number(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`hazmat-${index}`}
                            checked={item.hazmat}
                            onCheckedChange={(checked) => updateItem(index, 'hazmat', checked)}
                          />
                          <Label htmlFor={`hazmat-${index}`}>Hazmat</Label>
                        </div>
                      </div>
                      <div className="flex items-end">
                        {newDocument.items.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addItemRow}>
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerReference">Customer Reference</Label>
                <Input
                  id="customerReference"
                  value={newDocument.customerReference}
                  onChange={(e) => setNewDocument({ ...newDocument, customerReference: e.target.value })}
                  placeholder="REF-123456"
                />
              </div>
              <div>
                <Label htmlFor="purchaseOrder">Purchase Order</Label>
                <Input
                  id="purchaseOrder"
                  value={newDocument.purchaseOrder}
                  onChange={(e) => setNewDocument({ ...newDocument, purchaseOrder: e.target.value })}
                  placeholder="PO-123456"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={newDocument.specialInstructions}
                onChange={(e) => setNewDocument({ ...newDocument, specialInstructions: e.target.value })}
                placeholder="Any special handling or delivery instructions..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddingDocument(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDocument}>
              Add Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {selectedDocument.documentNumber} - {getTypeBadge(selectedDocument.type)}
                </DialogTitle>
                <DialogDescription>
                  Complete document details and shipping information
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Load Number</div>
                      <div className="font-semibold">{selectedDocument.loadNumber}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-semibold">{selectedDocument.date}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Driver</div>
                      <div className="font-semibold">{selectedDocument.driver}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Vehicle</div>
                      <div className="font-semibold">{selectedDocument.vehicle}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shipping Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Shipper</h4>
                        <div className="text-foreground">{selectedDocument.shipper}</div>
                        <div className="text-muted-foreground">{selectedDocument.origin}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Consignee</h4>
                        <div className="text-foreground">{selectedDocument.consignee}</div>
                        <div className="text-muted-foreground">{selectedDocument.destination}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Freight Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Dimensions</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Hazmat</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDocument.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.weight} lbs</TableCell>
                            <TableCell>{item.dimensions || 'N/A'}</TableCell>
                            <TableCell>{item.value ? `$${item.value.toLocaleString()}` : 'N/A'}</TableCell>
                            <TableCell>
                              {item.hazmat ? (
                                <Badge variant="destructive">Yes</Badge>
                              ) : (
                                <Badge variant="outline">No</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Pieces</div>
                        <div className="font-semibold text-lg">{selectedDocument.totalPieces}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Weight</div>
                        <div className="font-semibold text-lg">{selectedDocument.totalWeight.toLocaleString()} lbs</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Freight Value</div>
                        <div className="font-semibold text-lg">${selectedDocument.freightValue.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Information */}
                {(selectedDocument.arrivalTime || selectedDocument.departureTime || selectedDocument.deliveryNotes) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(selectedDocument.arrivalTime || selectedDocument.departureTime) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedDocument.arrivalTime && (
                            <div>
                              <div className="text-sm text-muted-foreground">Arrival Time</div>
                              <div className="font-semibold">{selectedDocument.arrivalTime}</div>
                            </div>
                          )}
                          {selectedDocument.departureTime && (
                            <div>
                              <div className="text-sm text-muted-foreground">Departure Time</div>
                              <div className="font-semibold">{selectedDocument.departureTime}</div>
                            </div>
                          )}
                        </div>
                      )}
                      {selectedDocument.deliveryNotes && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Delivery Notes</div>
                          <div className="p-3 bg-muted rounded-lg">{selectedDocument.deliveryNotes}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Signature Information */}
                {selectedDocument.signedBy && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Signature Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Signed By</div>
                          <div className="font-semibold">{selectedDocument.signedBy}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Signed Date</div>
                          <div className="font-semibold">{selectedDocument.signedDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Digital Signature</div>
                          <div className="font-semibold">
                            {selectedDocument.digitalSignature ? (
                              <Badge variant="default" className="bg-green-100 text-green-800">Yes</Badge>
                            ) : (
                              <Badge variant="outline">No</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Special Instructions & Notes */}
                {(selectedDocument.specialInstructions || selectedDocument.damageNotes) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedDocument.specialInstructions && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Special Instructions</div>
                          <div className="p-3 bg-muted rounded-lg">{selectedDocument.specialInstructions}</div>
                        </div>
                      )}
                      {selectedDocument.damageNotes && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            Damage Notes
                          </div>
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            {selectedDocument.damageNotes}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BOLPODPage;