/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Truck, MapPin, Clock, Phone, AlertTriangle, Navigation, Fuel, Edit, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InTransitLoad {
  id: string;
  loadNumber: string;
  shipper: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  currentLocation: string;
  progress: number;
  status: 'picked_up' | 'in_transit' | 'delayed' | 'fuel_stop';
  estimatedArrival: string;
  totalMiles: number;
  remainingMiles: number;
  rate: number;
  commodity: string;
  weight: number;
  nextStop: string;
  fuelLevel: number;
  driverNotes: string;
  customerContact: {
    name: string;
    phone: string;
    email: string;
  };
  lastUpdate: string;
  delays: {
    reason: string;
    duration: number;
    timestamp: string;
  }[];
}

const InTransitPage: React.FC = () => {
  const [selectedLoad, setSelectedLoad] = useState<InTransitLoad | null>(null);
  const [updateNotes, setUpdateNotes] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  // Mock data for in-transit loads
  const inTransitLoads: InTransitLoad[] = [
    {
      id: 'IT001',
      loadNumber: 'TMS-2024-001',
      shipper: 'ABC Manufacturing',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-26',
      currentLocation: 'Indio, CA',
      progress: 65,
      status: 'in_transit',
      estimatedArrival: '2024-01-26T14:30:00',
      totalMiles: 385,
      remainingMiles: 135,
      rate: 1540,
      commodity: 'Electronics',
      weight: 25000,
      nextStop: 'Fuel Stop - Blythe, CA',
      fuelLevel: 45,
      driverNotes: 'Traffic moderate, on schedule',
      customerContact: {
        name: 'John Smith',
        phone: '(555) 123-4567',
        email: 'john@abcmfg.com'
      },
      lastUpdate: '2024-01-26T10:15:00',
      delays: []
    },
    {
      id: 'IT002',
      loadNumber: 'TMS-2024-002',
      shipper: 'Fresh Foods Corp',
      origin: 'Salinas, CA',
      destination: 'Las Vegas, NV',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-25',
      currentLocation: 'Bakersfield, CA',
      progress: 30,
      status: 'delayed',
      estimatedArrival: '2024-01-25T23:45:00',
      totalMiles: 420,
      remainingMiles: 294,
      rate: 1890,
      commodity: 'Produce',
      weight: 38000,
      nextStop: 'Inspection Station - Barstow, CA',
      fuelLevel: 75,
      driverNotes: 'Delayed due to mechanical issue, repair completed',
      customerContact: {
        name: 'Sarah Johnson',
        phone: '(555) 987-6543',
        email: 'sarah@freshfoods.com'
      },
      lastUpdate: '2024-01-25T16:30:00',
      delays: [
        {
          reason: 'Mechanical Issue',
          duration: 180,
          timestamp: '2024-01-25T14:00:00'
        }
      ]
    },
    {
      id: 'IT003',
      loadNumber: 'TMS-2024-003',
      shipper: 'Steel Works Inc',
      origin: 'Chicago, IL',
      destination: 'Detroit, MI',
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-26',
      currentLocation: 'Kalamazoo, MI',
      progress: 85,
      status: 'in_transit',
      estimatedArrival: '2024-01-26T18:00:00',
      totalMiles: 280,
      remainingMiles: 42,
      rate: 1120,
      commodity: 'Steel Coils',
      weight: 45000,
      nextStop: 'Delivery - Detroit Steel Plant',
      fuelLevel: 60,
      driverNotes: 'Making good time, early arrival expected',
      customerContact: {
        name: 'Mike Rodriguez',
        phone: '(555) 456-7890',
        email: 'mike@steelworks.com'
      },
      lastUpdate: '2024-01-26T16:45:00',
      delays: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'picked_up':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Picked Up</Badge>;
      case 'in_transit':
        return <Badge className="bg-green-100 text-green-800 border-green-200">In Transit</Badge>;
      case 'delayed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Delayed</Badge>;
      case 'fuel_stop':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Fuel Stop</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'picked_up':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'in_transit':
        return <Truck className="h-5 w-5 text-green-600" />;
      case 'delayed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'fuel_stop':
        return <Fuel className="h-5 w-5 text-yellow-600" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleLocationUpdate = (load: InTransitLoad) => {
    if (!currentLocation) {
      toast.error('Please enter current location');
      return;
    }
    toast.success(`Location updated for load ${load.loadNumber}`);
    setCurrentLocation('');
    setSelectedLoad(null);
    // Mock API call would go here
  };

  const handleStatusUpdate = (load: InTransitLoad, newStatus: string) => {
    toast.success(`Status updated to ${newStatus} for load ${load.loadNumber}`);
    // Mock API call would go here
  };

  const handleDeliveryConfirmation = (load: InTransitLoad) => {
    toast.success(`Delivery confirmed for load ${load.loadNumber}`);
    // Mock API call would go here
  };

  const getTotalRevenue = () => {
    return inTransitLoads.reduce((sum, load) => sum + load.rate, 0);
  };

  const getAverageProgress = () => {
    return inTransitLoads.reduce((sum, load) => sum + load.progress, 0) / inTransitLoads.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">In Transit Loads</h1>
            <p className="text-muted-foreground">Monitor and manage loads currently in transport</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="hover-scale">
              <Navigation className="h-4 w-4 mr-2" />
              GPS Tracking
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inTransitLoads.length}</div>
              <p className="text-xs text-muted-foreground">Currently transporting</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(getTotalRevenue())}</div>
              <p className="text-xs text-muted-foreground">In transit value</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(getAverageProgress())}%</div>
              <p className="text-xs text-muted-foreground">Route completion</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed Loads</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {inTransitLoads.filter(load => load.status === 'delayed').length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Loads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {inTransitLoads.map((load) => (
            <Card key={load.id} className="hover-scale">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{load.loadNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">{load.shipper}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(load.status)}
                    {getStatusBadge(load.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Route Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Route:</span>
                    <span className="font-medium">{load.origin} → {load.destination}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span>{load.currentLocation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Next:</span>
                    <span>{load.nextStop}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{load.progress}%</span>
                  </div>
                  <Progress value={load.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{load.remainingMiles} mi remaining</span>
                    <span>{load.totalMiles} mi total</span>
                  </div>
                </div>

                {/* Fuel Level */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fuel Level</span>
                    <span>{load.fuelLevel}%</span>
                  </div>
                  <Progress 
                    value={load.fuelLevel} 
                    className={`h-2 ${load.fuelLevel < 25 ? 'text-red-600' : ''}`}
                  />
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rate:</span>
                    <p className="font-semibold text-green-600">{formatCurrency(load.rate)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Delivery:</span>
                    <p className="font-medium">{new Date(load.deliveryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <p>{load.weight.toLocaleString()} lbs</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ETA:</span>
                    <p>{new Date(load.estimatedArrival).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* Delays */}
                {load.delays.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Active Delays</h4>
                    {load.delays.map((delay, index) => (
                      <div key={index} className="text-xs text-red-700">
                        {delay.reason} - {delay.duration} minutes
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedLoad(load)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Load - {load.loadNumber}</DialogTitle>
                        <DialogDescription>Update location and status information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="location">Current Location</Label>
                          <Input
                            id="location"
                            placeholder="Enter current location"
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Driver Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add unknown updates or notes"
                            value={updateNotes}
                            onChange={(e) => setUpdateNotes(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setSelectedLoad(null)}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleLocationUpdate(load)}>
                            Update Location
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    size="sm" 
                    onClick={() => handleDeliveryConfirmation(load)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={load.progress < 90}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {load.progress >= 90 ? 'Deliver' : `${load.progress}%`}
                  </Button>
                </div>

                {/* Customer Contact */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Customer Contact:</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Phone className="h-4 w-4 mr-1" />
                      {load.customerContact.name}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InTransitPage;