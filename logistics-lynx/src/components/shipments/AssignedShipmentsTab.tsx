/* eslint-disable @typescript-eslint/no-explicit-any */

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
  MoreHorizontal, 
  Edit, 
  Eye,
  Phone,
  MapPin,
  Truck,
  UserCheck,
  RefreshCw
} from 'lucide-react';

interface AssignedShipment {
  id: string;
  shipmentNumber: string;
  customer: string;
  origin: string;
  destination: string;
  assignedDate: string;
  expectedPickup: string;
  carrier: string;
  driver: string;
  driverPhone: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  weight: string;
  value: number;
}

const mockAssignedShipments: AssignedShipment[] = [
  {
    id: '2',
    shipmentNumber: 'SH-2024-002',
    customer: 'Amazon Logistics',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    assignedDate: '2024-01-16',
    expectedPickup: '2024-01-17 08:00',
    carrier: 'FedEx Freight',
    driver: 'Mike Johnson',
    driverPhone: '+1 (555) 234-5678',
    priority: 'urgent',
    weight: '35,000 lbs',
    value: 120000
  },
  {
    id: '7',
    shipmentNumber: 'SH-2024-007',
    customer: 'Tesla Manufacturing',
    origin: 'Austin, TX',
    destination: 'Reno, NV',
    assignedDate: '2024-01-17',
    expectedPickup: '2024-01-18 06:00',
    carrier: 'Schneider',
    driver: 'Carlos Rodriguez',
    driverPhone: '+1 (555) 345-6789',
    priority: 'high',
    weight: '28,000 lbs',
    value: 95000
  },
  {
    id: '8',
    shipmentNumber: 'SH-2024-008',
    customer: 'Apple Logistics',
    origin: 'Cupertino, CA',
    destination: 'Austin, TX',
    assignedDate: '2024-01-17',
    expectedPickup: '2024-01-19 10:00',
    carrier: 'Swift Transportation',
    driver: 'Jennifer Lee',
    driverPhone: '+1 (555) 456-7890',
    priority: 'normal',
    weight: '22,000 lbs',
    value: 180000
  }
];

const AssignedShipmentsTab = () => {
  const [shipments] = useState<AssignedShipment[]>(mockAssignedShipments);
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityBadge = (priority: AssignedShipment['priority']) => {
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
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (shipmentId: string) => {
    console.log('Edit assigned shipment:', shipmentId);
  };

  const handleView = (shipmentId: string) => {
    console.log('View assigned shipment:', shipmentId);
  };

  const handleContactDriver = (phone: string) => {
    console.log('Contact driver at:', phone);
  };

  const handleTrack = (shipmentId: string) => {
    console.log('Track assigned shipment:', shipmentId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl font-semibold">Assigned Shipments</CardTitle>
            </div>
            
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search assigned shipments..."
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
                  <TableHead>Assignment Details</TableHead>
                  <TableHead>Carrier/Driver</TableHead>
                  <TableHead>Expected Pickup</TableHead>
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
                          <span className="font-medium">Assigned:</span> {shipment.assignedDate}
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          Ready for Pickup
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{shipment.carrier}</div>
                        <div className="text-sm text-muted-foreground">{shipment.driver}</div>
                        <div className="text-xs text-muted-foreground">{shipment.driverPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {shipment.expectedPickup}
                      </div>
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
                          onClick={() => handleContactDriver(shipment.driverPhone)}
                          className="h-8 w-8 p-0"
                          title="Contact Driver"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTrack(shipment.id)}
                          className="h-8 w-8 p-0"
                          title="Track Location"
                        >
                          <MapPin className="h-4 w-4" />
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
                              Edit Assignment
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
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assigned shipments found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignedShipmentsTab;
