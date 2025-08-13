import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  User, 
  Plus,
  Search,
  Filter,
  Zap,
  Target,
  Route,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ShipmentPlanning = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const mockAppointments = [
    {
      id: 'APP-001',
      time: '08:00',
      type: 'Pickup',
      customer: 'Walmart Inc.',
      location: 'Chicago, IL',
      driver: 'Mike Rodriguez',
      shipmentId: 'TMS-2024-089',
      status: 'confirmed'
    },
    {
      id: 'APP-002',
      time: '10:30',
      type: 'Delivery',
      customer: 'Target Corporation',
      location: 'Phoenix, AZ',
      driver: 'Carlos Martinez',
      shipmentId: 'TMS-2024-091',
      status: 'pending'
    },
    {
      id: 'APP-003',
      time: '14:00',
      type: 'Pickup',
      customer: 'Amazon Logistics',
      location: 'Seattle, WA',
      driver: 'Jennifer Lee',
      shipmentId: 'TMS-2024-092',
      status: 'confirmed'
    }
  ];

  const mockAvailableDrivers = [
    { id: 'D005', name: 'Alex Thompson', vehicle: 'Truck #210', location: 'Dallas, TX', status: 'available' },
    { id: 'D006', name: 'Sarah Wilson', vehicle: 'Truck #187', location: 'Houston, TX', status: 'available' },
    { id: 'D007', name: 'Chris Brown', vehicle: 'Truck #156', location: 'Austin, TX', status: 'available' }
  ];

  const mockUnassignedLoads = [
    {
      id: 'LOAD-001',
      customer: 'Home Depot',
      route: 'Dallas, TX → Miami, FL',
      pickup: '2024-01-18 09:00',
      delivery: '2024-01-20 15:00',
      weight: '45,000 lbs',
      equipment: 'Dry Van',
      rate: '$3,200'
    },
    {
      id: 'LOAD-002',
      customer: 'Costco Wholesale',
      route: 'Los Angeles, CA → Denver, CO',
      pickup: '2024-01-19 07:00',
      delivery: '2024-01-21 12:00',
      weight: '38,500 lbs',
      equipment: 'Reefer',
      rate: '$2,850'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Planning & Dispatch</h2>
          <p className="text-muted-foreground">Schedule appointments and assign loads to drivers</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            AI Auto-Assign
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Appointment Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="calendar" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calendar" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search appointments..." className="pl-10 w-64" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pickup">Pickups</SelectItem>
                        <SelectItem value="delivery">Deliveries</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border border-border/50 bg-background/50"
                />
              </TabsContent>
              
              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-3">
                  {mockAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={appointment.type === 'Pickup' ? 'default' : 'secondary'}>
                            {appointment.type}
                          </Badge>
                          <Badge variant="outline" className={
                            appointment.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-500 border-green-500/30'
                              : 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="font-medium text-foreground">{appointment.customer}</p>
                        <p className="text-sm text-muted-foreground">{appointment.location}</p>
                        <p className="text-sm text-muted-foreground">Driver: {appointment.driver}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{appointment.time}</p>
                        <p className="text-sm text-muted-foreground">{appointment.shipmentId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Today's Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg">
                  <p className="text-2xl font-bold text-blue-500">8</p>
                  <p className="text-xs text-muted-foreground">Pickups</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                  <p className="text-2xl font-bold text-green-500">12</p>
                  <p className="text-xs text-muted-foreground">Deliveries</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">On Schedule</span>
                  <span className="text-green-500 font-medium">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delayed</span>
                  <span className="text-amber-500 font-medium">15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Drivers */}
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Available Drivers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAvailableDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{driver.name}</p>
                    <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                    <p className="text-xs text-muted-foreground">{driver.location}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Assign
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Unassigned Loads */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5 text-primary" />
            <span>Unassigned Loads</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockUnassignedLoads.map((load) => (
              <div
                key={load.id}
                className="p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                    Unassigned
                  </Badge>
                  <p className="font-bold text-primary">{load.rate}</p>
                </div>
                <p className="font-medium text-foreground mb-2">{load.customer}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{load.route}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Pickup: {load.pickup}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>{load.equipment} • {load.weight}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Zap className="h-4 w-4 mr-1" />
                    AI Assign
                  </Button>
                  <Button size="sm" variant="outline">
                    Manual
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentPlanning;