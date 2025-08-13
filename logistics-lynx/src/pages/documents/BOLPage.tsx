import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Truck, 
  MapPin, 
  Calendar,
  Package,
  User,
  Building2,
  Edit,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';

// Sample BOL data
const sampleBOLs = [
  {
    id: 'BOL-2024-001234',
    shipperName: 'ACME Manufacturing Inc.',
    shipperAddress: '123 Industrial Blvd, Chicago, IL 60601',
    consigneeName: 'Global Distribution Center',
    consigneeAddress: '456 Warehouse St, Dallas, TX 75201',
    carrierName: 'FastFreight Express',
    driverName: 'John Smith',
    truckNumber: 'TRK-1001',
    trailerNumber: 'TRL-2001',
    status: 'in_transit',
    createDate: '2024-02-15',
    pickupDate: '2024-02-16',
    deliveryDate: '2024-02-18',
    totalWeight: '45,000 lbs',
    totalValue: '$125,000',
    freight: [
      { description: 'Steel Coils', quantity: 25, weight: '40,000 lbs', class: 'Class 85' },
      { description: 'Industrial Machinery Parts', quantity: 50, weight: '5,000 lbs', class: 'Class 70' }
    ],
    specialInstructions: 'Handle with care. Notify consignee 2 hours before delivery.',
    hazmat: false,
    priority: 'standard'
  },
  {
    id: 'BOL-2024-001235',
    shipperName: 'Tech Components LLC',
    shipperAddress: '789 Silicon Valley Dr, San Jose, CA 95101',
    consigneeName: 'Electronics Warehouse',
    consigneeAddress: '321 Commerce Blvd, Phoenix, AZ 85001',
    carrierName: 'FastFreight Express',
    driverName: 'Sarah Johnson',
    truckNumber: 'TRK-1002',
    trailerNumber: 'TRL-2002',
    status: 'delivered',
    createDate: '2024-02-10',
    pickupDate: '2024-02-11',
    deliveryDate: '2024-02-13',
    totalWeight: '15,000 lbs',
    totalValue: '$280,000',
    freight: [
      { description: 'Computer Servers', quantity: 10, weight: '8,000 lbs', class: 'Class 92.5' },
      { description: 'Network Equipment', quantity: 30, weight: '7,000 lbs', class: 'Class 92.5' }
    ],
    specialInstructions: 'Temperature controlled. Fragile items - no stacking.',
    hazmat: false,
    priority: 'expedited'
  },
  {
    id: 'BOL-2024-001236',
    shipperName: 'Chemical Supply Co.',
    shipperAddress: '555 Industrial Park, Houston, TX 77001',
    consigneeName: 'Manufacturing Plant',
    consigneeAddress: '777 Factory Rd, Birmingham, AL 35201',
    carrierName: 'FastFreight Express',
    driverName: 'Mike Wilson',
    truckNumber: 'TRK-1003',
    trailerNumber: 'TRL-2003',
    status: 'pending_pickup',
    createDate: '2024-02-17',
    pickupDate: '2024-02-19',
    deliveryDate: '2024-02-21',
    totalWeight: '35,000 lbs',
    totalValue: '$85,000',
    freight: [
      { description: 'Industrial Chemicals', quantity: 100, weight: '35,000 lbs', class: 'Class 55' }
    ],
    specialInstructions: 'HAZMAT shipment. Driver must have proper endorsements.',
    hazmat: true,
    priority: 'urgent'
  }
];

const BOLPage = () => {
  const { toast } = useToast();
  const [bols, setBols] = useState(sampleBOLs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBOL, setSelectedBOL] = useState(null);
  const [formData, setFormData] = useState({
    shipperName: '',
    shipperAddress: '',
    consigneeName: '',
    consigneeAddress: '',
    driverName: '',
    truckNumber: '',
    trailerNumber: '',
    pickupDate: '',
    deliveryDate: '',
    specialInstructions: '',
    hazmat: false,
    priority: 'standard'
  });

  const filteredBOLs = bols.filter(bol => {
    const matchesSearch = 
      bol.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bol.shipperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bol.consigneeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bol.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || bol.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'expedited': return 'bg-orange-100 text-orange-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_pickup': return <Clock className="h-4 w-4" />;
      case 'in_transit': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleCreateBOL = () => {
    const newBOL = {
      id: `BOL-2024-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
      ...formData,
      carrierName: 'FastFreight Express',
      status: 'pending_pickup',
      createDate: new Date().toISOString().split('T')[0],
      totalWeight: '0 lbs',
      totalValue: '$0',
      freight: [],
      hazmat: false
    };
    
    setBols([newBOL, ...bols]);
    setIsCreateModalOpen(false);
    resetForm();
    toast({
      title: 'Success',
      description: 'Bill of Lading created successfully'
    });
  };

  const resetForm = () => {
    setFormData({
      shipperName: '',
      shipperAddress: '',
      consigneeName: '',
      consigneeAddress: '',
      driverName: '',
      truckNumber: '',
      trailerNumber: '',
      pickupDate: '',
      deliveryDate: '',
      specialInstructions: '',
      hazmat: false,
      priority: 'standard'
    });
  };

  const statusStats = {
    total: bols.length,
    pending_pickup: bols.filter(b => b.status === 'pending_pickup').length,
    in_transit: bols.filter(b => b.status === 'in_transit').length,
    delivered: bols.filter(b => b.status === 'delivered').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bill of Lading Management</h1>
            <p className="text-muted-foreground">Create, track, and manage shipping documentation</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create BOL
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total BOLs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusStats.total}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickup</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusStats.pending_pickup}</div>
              <p className="text-xs text-muted-foreground">Awaiting pickup</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusStats.in_transit}</div>
              <p className="text-xs text-muted-foreground">En route</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusStats.delivered}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* BOL Management */}
        <Card>
          <CardHeader>
            <CardTitle>BOL Records</CardTitle>
            <CardDescription>Track and manage all Bill of Lading documents</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search BOLs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending_pickup">Pending Pickup</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BOL Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>BOL Number</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver/Equipment</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBOLs.map((bol) => (
                    <TableRow key={bol.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{bol.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {bol.totalWeight} • {bol.totalValue}
                            </div>
                            {bol.hazmat && (
                              <Badge variant="destructive" className="text-xs mt-1">HAZMAT</Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-3 w-3" />
                            <span className="font-medium">From:</span> {bol.shipperName}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3" />
                            <span className="font-medium">To:</span> {bol.consigneeName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-3 w-3" />
                            {bol.driverName}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Truck className="h-3 w-3" />
                            {bol.truckNumber} / {bol.trailerNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">Pickup:</span> {new Date(bol.pickupDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span className="font-medium">Delivery:</span> {new Date(bol.deliveryDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(bol.status)}
                          <Badge className={getStatusColor(bol.status)}>
                            {bol.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(bol.priority)}>
                          {bol.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
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

        {/* Create BOL Dialog */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Bill of Lading</DialogTitle>
              <DialogDescription>
                Generate a new BOL for shipment documentation
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              {/* Shipper Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipper Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="shipperName">Company Name</Label>
                  <Input
                    id="shipperName"
                    value={formData.shipperName}
                    onChange={(e) => setFormData({...formData, shipperName: e.target.value})}
                    placeholder="ACME Manufacturing Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipperAddress">Address</Label>
                  <Textarea
                    id="shipperAddress"
                    value={formData.shipperAddress}
                    onChange={(e) => setFormData({...formData, shipperAddress: e.target.value})}
                    placeholder="123 Industrial Blvd, Chicago, IL 60601"
                    rows={3}
                  />
                </div>
              </div>

              {/* Consignee Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Consignee Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="consigneeName">Company Name</Label>
                  <Input
                    id="consigneeName"
                    value={formData.consigneeName}
                    onChange={(e) => setFormData({...formData, consigneeName: e.target.value})}
                    placeholder="Global Distribution Center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consigneeAddress">Address</Label>
                  <Textarea
                    id="consigneeAddress"
                    value={formData.consigneeAddress}
                    onChange={(e) => setFormData({...formData, consigneeAddress: e.target.value})}
                    placeholder="456 Warehouse St, Dallas, TX 75201"
                    rows={3}
                  />
                </div>
              </div>

              {/* Transportation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Transportation Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input
                      id="driverName"
                      value={formData.driverName}
                      onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truckNumber">Truck Number</Label>
                    <Input
                      id="truckNumber"
                      value={formData.truckNumber}
                      onChange={(e) => setFormData({...formData, truckNumber: e.target.value})}
                      placeholder="TRK-1001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trailerNumber">Trailer Number</Label>
                    <Input
                      id="trailerNumber"
                      value={formData.trailerNumber}
                      onChange={(e) => setFormData({...formData, trailerNumber: e.target.value})}
                      placeholder="TRL-2001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="expedited">Expedited</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Schedule Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    placeholder="Any special handling requirements..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={handleCreateBOL}>
                Create BOL
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default BOLPage;