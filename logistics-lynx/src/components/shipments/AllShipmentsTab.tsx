
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  RefreshCw,
  MapPin,
  Phone,
  Truck
} from 'lucide-react';
import { ShipmentStats } from './ShipmentStats';

interface Shipment {
  id: string;
  shipmentNumber: string;
  customer: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'delayed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  weight: string;
  carrier: string;
  driver: string;
  value: number;
  progress: number;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    shipmentNumber: 'SH-2024-001',
    customer: 'Walmart Distribution',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    status: 'in_transit',
    priority: 'high',
    weight: '40,000 lbs',
    carrier: 'Swift Transportation',
    driver: 'John Smith',
    value: 85000,
    progress: 65
  },
  {
    id: '2',
    shipmentNumber: 'SH-2024-002',
    customer: 'Amazon Logistics',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    pickupDate: '2024-01-16',
    deliveryDate: '2024-01-19',
    status: 'assigned',
    priority: 'urgent',
    weight: '35,000 lbs',
    carrier: 'FedEx Freight',
    driver: 'Mike Johnson',
    value: 120000,
    progress: 0
  },
  {
    id: '3',
    shipmentNumber: 'SH-2024-003',
    customer: 'Home Depot Supply',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    pickupDate: '2024-01-14',
    deliveryDate: '2024-01-16',
    status: 'delivered',
    priority: 'normal',
    weight: '45,000 lbs',
    carrier: 'J.B. Hunt',
    driver: 'Sarah Davis',
    value: 95000,
    progress: 100
  },
  {
    id: '4',
    shipmentNumber: 'SH-2024-004',
    customer: 'Target Corporation',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    pickupDate: '2024-01-17',
    deliveryDate: '2024-01-19',
    status: 'pending',
    priority: 'normal',
    weight: '38,000 lbs',
    carrier: 'TBD',
    driver: 'TBD',
    value: 78000,
    progress: 0
  },
  {
    id: '5',
    shipmentNumber: 'SH-2024-005',
    customer: 'Best Buy Logistics',
    origin: 'Portland, OR',
    destination: 'San Francisco, CA',
    pickupDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    status: 'delayed',
    priority: 'high',
    weight: '25,000 lbs',
    carrier: 'UPS Freight',
    driver: 'Tom Wilson',
    value: 65000,
    progress: 30
  },
  {
    id: '6',
    shipmentNumber: 'SH-2024-006',
    customer: 'Costco Wholesale',
    origin: 'Seattle, WA',
    destination: 'Las Vegas, NV',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-20',
    status: 'picked_up',
    priority: 'normal',
    weight: '42,000 lbs',
    carrier: 'Schneider',
    driver: 'Lisa Brown',
    value: 89000,
    progress: 25
  }
];

const AllShipmentsTab = () => {
  const [shipments] = useState<Shipment[]>(mockShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: Shipment['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      assigned: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      picked_up: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      in_transit: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      delayed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    return (
      <Badge className={variants[status]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Shipment['priority']) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    return (
      <Badge className={variants[priority]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (shipmentId: string) => {
    console.log('Edit shipment:', shipmentId);
    // Implementation for edit functionality
  };

  const handleDelete = (shipmentId: string) => {
    console.log('Delete shipment:', shipmentId);
    // Implementation for delete functionality
  };

  const handleView = (shipmentId: string) => {
    console.log('View shipment:', shipmentId);
    // Implementation for view functionality
  };

  const handleTrack = (shipmentId: string) => {
    console.log('Track shipment:', shipmentId);
    // Implementation for tracking functionality
  };

  const handleContact = (shipmentId: string) => {
    console.log('Contact driver for shipment:', shipmentId);
    // Implementation for contacting driver
  };

  const stats = {
    totalShipments: shipments.length,
    pendingShipments: shipments.filter(s => s.status === 'pending').length,
    inTransitShipments: shipments.filter(s => s.status === 'in_transit' || s.status === 'picked_up').length,
    deliveredShipments: shipments.filter(s => s.status === 'delivered').length,
    delayedShipments: shipments.filter(s => s.status === 'delayed').length,
    avgDeliveryTime: 48
  };

  return (
    <div className="space-y-6">
      <ShipmentStats stats={stats} />
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <CardTitle className="text-xl font-semibold">All Shipments</CardTitle>
            
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 lg:w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('assigned')}>
                    Assigned
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('in_transit')}>
                    In Transit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                    Delivered
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('delayed')}>
                    Delayed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Shipment
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Carrier/Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {shipment.shipmentNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{shipment.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          Weight: {shipment.weight}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">From:</span> {shipment.origin}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">To:</span> {shipment.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Pickup:</span> {shipment.pickupDate}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Delivery:</span> {shipment.deliveryDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{shipment.carrier}</div>
                        <div className="text-sm text-muted-foreground">{shipment.driver}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(shipment.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(shipment.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{shipment.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      ${shipment.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTrack(shipment.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleContact(shipment.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(shipment.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(shipment.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Shipment
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(shipment.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
          
          {filteredShipments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No shipments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllShipmentsTab;
