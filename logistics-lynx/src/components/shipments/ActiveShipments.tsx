import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Phone,
  Search,
  Filter,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const mockActiveShipments = [
  {
    id: 'TMS-2024-089',
    status: 'in_transit',
    customer: 'Walmart Inc.',
    driver: 'Mike Rodriguez',
    driverId: 'D001',
    vehicle: 'Truck #145',
    route: 'Chicago, IL → Atlanta, GA',
    progress: 75,
    eta: '2024-01-17 14:30',
    priority: 'high',
    mode: 'FTL',
    equipment: 'Dry Van',
    currentLocation: 'Macon, GA - I-75 Mile 171',
    alerts: ['Traffic delay ahead'],
    value: '$3,985'
  },
  {
    id: 'TMS-2024-091',
    status: 'assigned',
    customer: 'Target Corporation',
    driver: 'Carlos Martinez',
    driverId: 'D002',
    vehicle: 'Truck #203',
    route: 'Los Angeles, CA → Phoenix, AZ',
    progress: 0,
    eta: '2024-01-18 09:00',
    priority: 'medium',
    mode: 'LTL',
    equipment: 'Standard',
    currentLocation: 'Los Angeles, CA - Depot',
    alerts: [],
    value: '$2,067'
  },
  {
    id: 'TMS-2024-092',
    status: 'picked_up',
    customer: 'Amazon Logistics',
    driver: 'Jennifer Lee',
    driverId: 'D003',
    vehicle: 'Truck #089',
    route: 'Seattle, WA → Denver, CO',
    progress: 25,
    eta: '2024-01-19 16:00',
    priority: 'low',
    mode: 'Intermodal',
    equipment: '53\' Container',
    currentLocation: 'Spokane, WA - I-90 Mile 281',
    alerts: ['Weather watch'],
    value: '$4,735'
  },
  {
    id: 'TMS-2024-093',
    status: 'pending',
    customer: 'Home Depot',
    driver: 'Robert Johnson',
    driverId: 'D004',
    vehicle: 'Truck #156',
    route: 'Dallas, TX → Houston, TX',
    progress: 0,
    eta: '2024-01-17 11:00',
    priority: 'urgent',
    mode: 'Expedited',
    equipment: 'Flatbed',
    currentLocation: 'Dallas, TX - Pending Pickup',
    alerts: ['Appointment confirmation needed'],
    value: '$1,850'
  }
];

const ActiveShipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'assigned': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'picked_up': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const filteredShipments = mockActiveShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || shipment.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Active Shipments</h2>
          <p className="text-muted-foreground">Monitor and manage shipments in progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by shipment ID, customer, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-blue-500">
                  {filteredShipments.filter(s => s.status === 'in_transit').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-green-500">
                  {filteredShipments.filter(s => s.status === 'assigned').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-500">
                  {filteredShipments.filter(s => s.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold text-red-500">
                  {filteredShipments.filter(s => s.alerts.length > 0).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipments Table */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <span>Active Shipments ({filteredShipments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Driver & Vehicle</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{shipment.id}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {shipment.mode}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {shipment.equipment}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{shipment.customer}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {shipment.driver.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{shipment.driver}</p>
                          <p className="text-xs text-muted-foreground">{shipment.vehicle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">{shipment.route}</p>
                        <p className="text-xs text-muted-foreground">{shipment.currentLocation}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-foreground">{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">ETA: {shipment.eta}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge variant="outline" className={getStatusColor(shipment.status)}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {shipment.alerts.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <AlertCircle className="h-3 w-3 text-amber-500" />
                            <span className="text-xs text-amber-500">{shipment.alerts.length} alert(s)</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(shipment.priority)}>
                        {shipment.priority.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{shipment.value}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Shipment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="h-4 w-4 mr-2" />
                              Track Location
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Contact Driver
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
    </div>
  );
};

export default ActiveShipments;