
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
  MoreHorizontal, 
  Eye,
  CheckCircle,
  RefreshCw,
  Download,
  Star,
  Clock,
  Filter
} from 'lucide-react';

interface DeliveredShipment {
  id: string;
  shipmentNumber: string;
  customer: string;
  origin: string;
  destination: string;
  deliveredDate: string;
  deliveryTime: string;
  onTimeDelivery: boolean;
  carrier: string;
  driver: string;
  rating: number;
  weight: string;
  value: number;
  transitTime: string;
}

const mockDeliveredShipments: DeliveredShipment[] = [
  {
    id: '3',
    shipmentNumber: 'SH-2024-003',
    customer: 'Home Depot Supply',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    deliveredDate: '2024-01-16',
    deliveryTime: '14:30',
    onTimeDelivery: true,
    carrier: 'J.B. Hunt',
    driver: 'Sarah Davis',
    rating: 5,
    weight: '45,000 lbs',
    value: 95000,
    transitTime: '2 days'
  },
  {
    id: '12',
    shipmentNumber: 'SH-2024-012',
    customer: 'Boeing Manufacturing',
    origin: 'Seattle, WA',
    destination: 'Everett, WA',
    deliveredDate: '2024-01-15',
    deliveryTime: '10:15',
    onTimeDelivery: true,
    carrier: 'FedEx Freight',
    driver: 'Michael Chen',
    rating: 5,
    weight: '65,000 lbs',
    value: 500000,
    transitTime: '4 hours'
  },
  {
    id: '13',
    shipmentNumber: 'SH-2024-013',
    customer: 'Nike Distribution',
    origin: 'Portland, OR',
    destination: 'Los Angeles, CA',
    deliveredDate: '2024-01-14',
    deliveryTime: '16:45',
    onTimeDelivery: false,
    carrier: 'Swift Transportation',
    driver: 'Amanda Wilson',
    rating: 3,
    weight: '32,000 lbs',
    value: 75000,
    transitTime: '3 days'
  },
  {
    id: '14',
    shipmentNumber: 'SH-2024-014',
    customer: 'Tesla Gigafactory',
    origin: 'Austin, TX',
    destination: 'Fremont, CA',
    deliveredDate: '2024-01-13',
    deliveryTime: '08:20',
    onTimeDelivery: true,
    carrier: 'Schneider',
    driver: 'David Kim',
    rating: 4,
    weight: '28,000 lbs',
    value: 300000,
    transitTime: '2.5 days'
  }
];

const DeliveredShipmentsTab = () => {
  const [shipments] = useState<DeliveredShipment[]>(mockDeliveredShipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState<string>('all');

  const getDeliveryBadge = (onTime: boolean) => {
    return onTime ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        <CheckCircle className="h-3 w-3 mr-1" />
        On Time
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
        <Clock className="h-3 w-3 mr-1" />
        Delayed
      </Badge>
    );
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDelivery = deliveryFilter === 'all' || 
                           (deliveryFilter === 'on-time' && shipment.onTimeDelivery) ||
                           (deliveryFilter === 'delayed' && !shipment.onTimeDelivery);
    
    return matchesSearch && matchesDelivery;
  });

  const handleView = (shipmentId: string) => {
    console.log('View delivered shipment:', shipmentId);
  };

  const handleDownloadPOD = (shipmentId: string) => {
    console.log('Download proof of delivery for shipment:', shipmentId);
  };

  const handleGenerateInvoice = (shipmentId: string) => {
    console.log('Generate invoice for shipment:', shipmentId);
  };

  const stats = {
    totalDelivered: shipments.length,
    onTimeDeliveries: shipments.filter(s => s.onTimeDelivery).length,
    averageRating: shipments.reduce((sum, s) => sum + s.rating, 0) / shipments.length,
    totalValue: shipments.reduce((sum, s) => sum + s.value, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalDelivered}</div>
                <div className="text-sm text-muted-foreground">Total Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{Math.round((stats.onTimeDeliveries / stats.totalDelivered) * 100)}%</div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-600 fill-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl font-semibold">Delivered Shipments</CardTitle>
            </div>
            
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search delivered shipments..."
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
                  <DropdownMenuItem onClick={() => setDeliveryFilter('all')}>
                    All Deliveries
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeliveryFilter('on-time')}>
                    On-Time Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeliveryFilter('delayed')}>
                    Delayed Only
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
                  <TableHead>Delivery Details</TableHead>
                  <TableHead>Carrier/Driver</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Rating</TableHead>
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
                          <span className="font-medium">Delivered:</span> {shipment.deliveredDate}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Time:</span> {shipment.deliveryTime}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Transit:</span> {shipment.transitTime}
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
                      {getDeliveryBadge(shipment.onTimeDelivery)}
                    </TableCell>
                    <TableCell>
                      {getRatingStars(shipment.rating)}
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      ${shipment.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
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
                          <DropdownMenuItem onClick={() => handleDownloadPOD(shipment.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download POD
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateInvoice(shipment.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Generate Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredShipments.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No delivered shipments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveredShipmentsTab;
