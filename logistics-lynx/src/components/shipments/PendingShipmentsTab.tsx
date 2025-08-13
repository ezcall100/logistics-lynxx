
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
  Edit, 
  Eye,
  Clock,
  UserPlus,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface PendingShipment {
  id: string;
  shipmentNumber: string;
  customer: string;
  origin: string;
  destination: string;
  createdDate: string;
  requiredPickup: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  weight: string;
  value: number;
  daysWaiting: number;
}

const mockPendingShipments: PendingShipment[] = [
  {
    id: '4',
    shipmentNumber: 'SH-2024-004',
    customer: 'Target Corporation',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    createdDate: '2024-01-15',
    requiredPickup: '2024-01-19',
    priority: 'normal',
    weight: '38,000 lbs',
    value: 78000,
    daysWaiting: 3
  },
  {
    id: '9',
    shipmentNumber: 'SH-2024-009',
    customer: 'Microsoft Supply Chain',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    createdDate: '2024-01-17',
    requiredPickup: '2024-01-20',
    priority: 'high',
    weight: '15,000 lbs',
    value: 150000,
    daysWaiting: 1
  },
  {
    id: '10',
    shipmentNumber: 'SH-2024-010',
    customer: 'Ford Motor Company',
    origin: 'Detroit, MI',
    destination: 'Chicago, IL',
    createdDate: '2024-01-14',
    requiredPickup: '2024-01-18',
    priority: 'urgent',
    weight: '50,000 lbs',
    value: 200000,
    daysWaiting: 4
  }
];

const PendingShipmentsTab = () => {
  const [shipments] = useState<PendingShipment[]>(mockPendingShipments);
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityBadge = (priority: PendingShipment['priority']) => {
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

  const getWaitingBadge = (days: number) => {
    if (days >= 3) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {days} days
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
        {days} days
      </Badge>
    );
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (shipmentId: string) => {
    console.log('Edit pending shipment:', shipmentId);
  };

  const handleView = (shipmentId: string) => {
    console.log('View pending shipment:', shipmentId);
  };

  const handleAssign = (shipmentId: string) => {
    console.log('Assign carrier to shipment:', shipmentId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-xl font-semibold">Pending Shipments</CardTitle>
            </div>
            
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search pending shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 lg:w-64"
                />
              </div>
              
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
                  <TableHead>Timeline</TableHead>
                  <TableHead>Waiting Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[140px]">Actions</TableHead>
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
                          <span className="font-medium">Created:</span> {shipment.createdDate}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Pickup by:</span> {shipment.requiredPickup}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getWaitingBadge(shipment.daysWaiting)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(shipment.priority)}
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      ${shipment.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAssign(shipment.id)}
                          className="h-8 w-8 p-0"
                          title="Assign Carrier"
                        >
                          <UserPlus className="h-4 w-4" />
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
                            <DropdownMenuItem onClick={() => handleAssign(shipment.id)}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Assign Carrier
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
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No pending shipments found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingShipmentsTab;
