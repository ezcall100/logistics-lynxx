import React, { useState } from 'react';
import { Package, CheckCircle, Clock, AlertTriangle, FileText, Camera, Star, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DeliveryRecord {
  id: string;
  loadNumber: string;
  shipper: string;
  origin: string;
  destination: string;
  deliveryDate: string;
  deliveryTime: string;
  status: 'delivered' | 'pending_proof' | 'disputed' | 'verified';
  receivedBy: string;
  signature: string;
  photos: string[];
  rate: number;
  commodity: string;
  weight: number;
  actualWeight: number;
  proofOfDelivery: {
    bolNumber: string;
    signedAt: string;
    notes: string;
    damageReported: boolean;
    shortageReported: boolean;
  };
  invoiceStatus: 'pending' | 'sent' | 'paid' | 'overdue';
  paymentDue: string;
  customerRating: number;
  driverNotes: string;
  issues: string[];
}

const DeliveryStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRecord | null>(null);
  const [disputeReason, setDisputeReason] = useState('');

  // Mock data for delivery records
  const deliveryRecords: DeliveryRecord[] = [
    {
      id: 'DR001',
      loadNumber: 'TMS-2024-001',
      shipper: 'ABC Manufacturing',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      deliveryDate: '2024-01-26',
      deliveryTime: '14:30',
      status: 'verified',
      receivedBy: 'John Smith',
      signature: 'john_smith_signature.png',
      photos: ['delivery_photo_1.jpg', 'delivery_photo_2.jpg'],
      rate: 1540,
      commodity: 'Electronics',
      weight: 25000,
      actualWeight: 24950,
      proofOfDelivery: {
        bolNumber: 'BOL-ABC-001',
        signedAt: '2024-01-26T14:30:00',
        notes: 'Delivered in excellent condition',
        damageReported: false,
        shortageReported: false
      },
      invoiceStatus: 'paid',
      paymentDue: '2024-02-25',
      customerRating: 5,
      driverNotes: 'Smooth delivery, professional receiver',
      issues: []
    },
    {
      id: 'DR002',
      loadNumber: 'TMS-2024-002',
      shipper: 'Fresh Foods Corp',
      origin: 'Salinas, CA',
      destination: 'Las Vegas, NV',
      deliveryDate: '2024-01-25',
      deliveryTime: '23:45',
      status: 'pending_proof',
      receivedBy: 'Sarah Johnson',
      signature: 'sarah_johnson_signature.png',
      photos: ['delivery_photo_3.jpg'],
      rate: 1890,
      commodity: 'Produce',
      weight: 38000,
      actualWeight: 38000,
      proofOfDelivery: {
        bolNumber: 'BOL-FF-002',
        signedAt: '2024-01-25T23:45:00',
        notes: 'Late delivery due to traffic',
        damageReported: false,
        shortageReported: false
      },
      invoiceStatus: 'sent',
      paymentDue: '2024-02-24',
      customerRating: 4,
      driverNotes: 'Night delivery completed successfully',
      issues: ['Late arrival']
    },
    {
      id: 'DR003',
      loadNumber: 'TMS-2024-003',
      shipper: 'Steel Works Inc',
      origin: 'Chicago, IL',
      destination: 'Detroit, MI',
      deliveryDate: '2024-01-26',
      deliveryTime: '18:00',
      status: 'disputed',
      receivedBy: 'Mike Rodriguez',
      signature: 'mike_rodriguez_signature.png',
      photos: ['delivery_photo_4.jpg', 'damage_photo_1.jpg'],
      rate: 1120,
      commodity: 'Steel Coils',
      weight: 45000,
      actualWeight: 44800,
      proofOfDelivery: {
        bolNumber: 'BOL-SW-003',
        signedAt: '2024-01-26T18:00:00',
        notes: 'Minor damage to packaging reported',
        damageReported: true,
        shortageReported: true
      },
      invoiceStatus: 'pending',
      paymentDue: '2024-02-25',
      customerRating: 3,
      driverNotes: 'Damage noted during inspection',
      issues: ['Packaging damage', 'Weight shortage: 200 lbs']
    },
    {
      id: 'DR004',
      loadNumber: 'TMS-2024-004',
      shipper: 'Auto Parts Direct',
      origin: 'Atlanta, GA',
      destination: 'Charlotte, NC',
      deliveryDate: '2024-01-26',
      deliveryTime: '16:15',
      status: 'delivered',
      receivedBy: 'Lisa Chen',
      signature: 'lisa_chen_signature.png',
      photos: ['delivery_photo_5.jpg'],
      rate: 980,
      commodity: 'Auto Parts',
      weight: 18000,
      actualWeight: 18000,
      proofOfDelivery: {
        bolNumber: 'BOL-APD-004',
        signedAt: '2024-01-26T16:15:00',
        notes: 'All items delivered as expected',
        damageReported: false,
        shortageReported: false
      },
      invoiceStatus: 'sent',
      paymentDue: '2024-02-25',
      customerRating: 5,
      driverNotes: 'Perfect condition delivery',
      issues: []
    },
    {
      id: 'DR005',
      loadNumber: 'TMS-2024-005',
      shipper: 'Tech Components LLC',
      origin: 'San Jose, CA',
      destination: 'Seattle, WA',
      deliveryDate: '2024-01-27',
      deliveryTime: '11:00',
      status: 'delivered',
      receivedBy: 'David Park',
      signature: 'david_park_signature.png',
      photos: ['delivery_photo_6.jpg', 'delivery_photo_7.jpg'],
      rate: 2100,
      commodity: 'Computer Hardware',
      weight: 22000,
      actualWeight: 22000,
      proofOfDelivery: {
        bolNumber: 'BOL-TC-005',
        signedAt: '2024-01-27T11:00:00',
        notes: 'Fragile items handled with care',
        damageReported: false,
        shortageReported: false
      },
      invoiceStatus: 'pending',
      paymentDue: '2024-02-26',
      customerRating: 5,
      driverNotes: 'Special handling requirements met',
      issues: []
    }
  ];

  const filteredDeliveries = deliveryRecords.filter(delivery => {
    const matchesSearch = delivery.loadNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case 'pending_proof':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Proof</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Disputed</Badge>;
      case 'verified':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Verified</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Sent</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending_proof':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'disputed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmitDispute = (delivery: DeliveryRecord) => {
    if (!disputeReason) {
      toast.error('Please enter a dispute reason');
      return;
    }
    toast.success(`Dispute submitted for delivery ${delivery.loadNumber}`);
    setDisputeReason('');
    setSelectedDelivery(null);
    // Mock API call would go here
  };

  const handleDownloadPOD = (delivery: DeliveryRecord) => {
    toast.success(`Downloading POD for ${delivery.loadNumber}`);
    // Mock download functionality
  };

  const getTotalRevenue = () => {
    return filteredDeliveries.reduce((sum, delivery) => sum + delivery.rate, 0);
  };

  const getAverageRating = () => {
    const rated = filteredDeliveries.filter(d => d.customerRating > 0);
    return rated.length > 0 ? rated.reduce((sum, delivery) => sum + delivery.customerRating, 0) / rated.length : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Delivery Status</h1>
            <p className="text-muted-foreground">Track delivery status and manage proof of delivery</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="hover-scale">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">This period</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getTotalRevenue())}</div>
              <p className="text-xs text-muted-foreground">Delivered loads</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getAverageRating().toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Customer satisfaction</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disputed</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {filteredDeliveries.filter(d => d.status === 'disputed').length}
              </div>
              <p className="text-xs text-muted-foreground">Need resolution</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by load number, shipper, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending_proof">Pending Proof</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Records ({filteredDeliveries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load #</TableHead>
                    <TableHead>Shipper</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeliveries.map((delivery) => (
                    <TableRow key={delivery.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{delivery.loadNumber}</TableCell>
                      <TableCell>{delivery.shipper}</TableCell>
                      <TableCell>{delivery.destination}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{new Date(delivery.deliveryDate).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">{delivery.deliveryTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(delivery.status)}
                          {getStatusBadge(delivery.status)}
                        </div>
                      </TableCell>
                      <TableCell>{getInvoiceStatusBadge(delivery.invoiceStatus)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(delivery.customerRating)}
                          <span className="text-xs text-muted-foreground ml-1">{delivery.customerRating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{formatCurrency(delivery.rate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedDelivery(delivery)}>
                                <FileText className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Delivery Details - {delivery.loadNumber}</DialogTitle>
                                <DialogDescription>Complete delivery information and proof of delivery</DialogDescription>
                              </DialogHeader>
                              {selectedDelivery && (
                                <Tabs defaultValue="details" className="w-full">
                                  <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="proof">Proof of Delivery</TabsTrigger>
                                    <TabsTrigger value="photos">Photos</TabsTrigger>
                                    <TabsTrigger value="issues">Issues</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="details" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Received By</label>
                                        <p className="text-sm text-muted-foreground">{selectedDelivery.receivedBy}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Commodity</label>
                                        <p className="text-sm text-muted-foreground">{selectedDelivery.commodity}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Expected Weight</label>
                                        <p className="text-sm text-muted-foreground">{selectedDelivery.weight.toLocaleString()} lbs</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Actual Weight</label>
                                        <p className="text-sm text-muted-foreground">{selectedDelivery.actualWeight.toLocaleString()} lbs</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Customer Rating</label>
                                        <div className="flex items-center gap-1">
                                          {renderStars(selectedDelivery.customerRating)}
                                          <span className="text-sm text-muted-foreground ml-1">{selectedDelivery.customerRating}/5</span>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Payment Due</label>
                                        <p className="text-sm text-muted-foreground">{new Date(selectedDelivery.paymentDue).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Driver Notes</label>
                                      <p className="text-sm text-muted-foreground">{selectedDelivery.driverNotes}</p>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="proof" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">BOL Number</label>
                                        <p className="text-sm text-muted-foreground">{selectedDelivery.proofOfDelivery.bolNumber}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Signed At</label>
                                        <p className="text-sm text-muted-foreground">{new Date(selectedDelivery.proofOfDelivery.signedAt).toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Damage Reported</label>
                                        <Badge variant={selectedDelivery.proofOfDelivery.damageReported ? "destructive" : "outline"}>
                                          {selectedDelivery.proofOfDelivery.damageReported ? 'Yes' : 'No'}
                                        </Badge>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Shortage Reported</label>
                                        <Badge variant={selectedDelivery.proofOfDelivery.shortageReported ? "destructive" : "outline"}>
                                          {selectedDelivery.proofOfDelivery.shortageReported ? 'Yes' : 'No'}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">POD Notes</label>
                                      <p className="text-sm text-muted-foreground">{selectedDelivery.proofOfDelivery.notes}</p>
                                    </div>
                                    <div className="flex justify-center">
                                      <img 
                                        src={`/api/placeholder/300/150`} 
                                        alt="Signature"
                                        className="border rounded-lg"
                                      />
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="photos" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedDelivery.photos.map((photo, index) => (
                                        <div key={index} className="space-y-2">
                                          <img 
                                            src={`/api/placeholder/250/200`} 
                                            alt={`Delivery photo ${index + 1}`}
                                            className="w-full rounded-lg border"
                                          />
                                          <p className="text-xs text-center text-muted-foreground">{photo}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="issues" className="space-y-4">
                                    {selectedDelivery.issues.length > 0 ? (
                                      <div className="space-y-2">
                                        {selectedDelivery.issues.map((issue, index) => (
                                          <div key={index} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                            <span className="text-sm text-red-800">{issue}</span>
                                          </div>
                                        ))}
                                        
                                        {delivery.status !== 'disputed' && (
                                          <div className="mt-4 space-y-3">
                                            <Label htmlFor="dispute-reason">Submit Dispute</Label>
                                            <Textarea
                                              id="dispute-reason"
                                              placeholder="Explain the reason for dispute..."
                                              value={disputeReason}
                                              onChange={(e) => setDisputeReason(e.target.value)}
                                            />
                                            <Button 
                                              onClick={() => handleSubmitDispute(delivery)}
                                              className="w-full bg-red-600 hover:bg-red-700"
                                            >
                                              Submit Dispute
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-center py-8">
                                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                        <p className="text-muted-foreground">No issues reported</p>
                                      </div>
                                    )}
                                  </TabsContent>
                                </Tabs>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadPOD(delivery)}
                          >
                            <Download className="h-4 w-4" />
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
      </div>
    </div>
  );
};

export default DeliveryStatusPage;