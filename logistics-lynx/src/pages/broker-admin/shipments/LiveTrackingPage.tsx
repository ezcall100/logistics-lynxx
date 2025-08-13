import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin,
  Truck,
  Navigation,
  Clock,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare,
  Route,
  Fuel,
  Thermometer,
  Shield,
  Activity,
  Target,
  Search,
  Filter,
  RefreshCw,
  Bell
} from 'lucide-react';

const LiveTrackingPage = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const activeShipments = [
    {
      id: 'SH-2024-001',
      customer: 'ABC Manufacturing',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      carrier: 'Swift Transport',
      driver: 'John Smith',
      phone: '(555) 123-4567',
      status: 'In Transit',
      progress: 65,
      currentLocation: 'Indianapolis, IN',
      estimatedArrival: '2024-01-15 14:30',
      lastUpdate: '5 min ago',
      speed: '65 mph',
      temperature: '38°F',
      alerts: ['On Schedule'],
      coordinates: { lat: 39.7684, lng: -86.1581 }
    },
    {
      id: 'SH-2024-003',
      customer: 'Global Supply Co',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      carrier: 'Mountain Freight',
      driver: 'Mike Johnson',
      phone: '(555) 987-6543',
      status: 'Delayed',
      progress: 40,
      currentLocation: 'Amarillo, TX',
      estimatedArrival: '2024-01-16 11:45',
      lastUpdate: '12 min ago',
      speed: '0 mph',
      temperature: '42°F',
      alerts: ['Traffic Delay', 'ETA Updated'],
      coordinates: { lat: 35.2219, lng: -101.8313 }
    },
    {
      id: 'SH-2024-005',
      customer: 'Metro Distribution',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      carrier: 'Coastal Carriers',
      driver: 'Sarah Wilson',
      phone: '(555) 456-7890',
      status: 'In Transit',
      progress: 85,
      currentLocation: 'Olympia, WA',
      estimatedArrival: '2024-01-15 16:00',
      lastUpdate: '2 min ago',
      speed: '70 mph',
      temperature: '45°F',
      alerts: ['On Schedule', 'Weather Watch'],
      coordinates: { lat: 47.0379, lng: -122.9015 }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'On Schedule': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (alert) => {
    switch (alert) {
      case 'On Schedule': return 'bg-green-100 text-green-800';
      case 'Traffic Delay': return 'bg-yellow-100 text-yellow-800';
      case 'ETA Updated': return 'bg-orange-100 text-orange-800';
      case 'Weather Watch': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Tracking</h1>
          <p className="text-muted-foreground">
            Real-time tracking and monitoring of active shipments
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="text-sm">
            <Activity className="h-3 w-3 mr-1" />
            Live Updates
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold">{activeShipments.length}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Schedule</p>
                <p className="text-2xl font-bold">
                  {activeShipments.filter(s => s.alerts.includes('On Schedule')).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold">
                  {activeShipments.filter(s => s.status === 'Delayed').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">63%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Shipments</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Updated {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <CardDescription>Click a shipment to view detailed tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-3">
                {activeShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedShipment?.id === shipment.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{shipment.id}</h3>
                        <Badge className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{shipment.customer}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3 w-3" />
                        <span>{shipment.currentLocation}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{shipment.progress}% Complete</span>
                        <span>{shipment.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tracking View */}
        <div className="lg:col-span-2 space-y-4">
          {selectedShipment ? (
            <>
              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Map View</CardTitle>
                  <CardDescription>Real-time location tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Interactive Map</p>
                      <p className="text-sm text-gray-500">
                        Current Location: {selectedShipment.currentLocation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Details - {selectedShipment.id}</CardTitle>
                  <CardDescription>{selectedShipment.customer}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Route Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Route Information</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Origin:</span> {selectedShipment.origin}</p>
                        <p><span className="font-medium">Destination:</span> {selectedShipment.destination}</p>
                        <p><span className="font-medium">Current:</span> {selectedShipment.currentLocation}</p>
                        <p><span className="font-medium">ETA:</span> {selectedShipment.estimatedArrival}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Carrier & Driver</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Carrier:</span> {selectedShipment.carrier}</p>
                        <p><span className="font-medium">Driver:</span> {selectedShipment.driver}</p>
                        <p><span className="font-medium">Phone:</span> {selectedShipment.phone}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            SMS
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Navigation className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                      <p className="text-sm font-medium">Speed</p>
                      <p className="text-lg font-bold">{selectedShipment.speed}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Route className="h-6 w-6 mx-auto text-green-600 mb-1" />
                      <p className="text-sm font-medium">Progress</p>
                      <p className="text-lg font-bold">{selectedShipment.progress}%</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Thermometer className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-lg font-bold">{selectedShipment.temperature}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Clock className="h-6 w-6 mx-auto text-orange-600 mb-1" />
                      <p className="text-sm font-medium">Last Update</p>
                      <p className="text-lg font-bold">{selectedShipment.lastUpdate}</p>
                    </div>
                  </div>

                  {/* Active Alerts */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Active Alerts</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedShipment.alerts.map((alert, index) => (
                        <Badge key={index} className={getAlertColor(alert)}>
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Status Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="text-sm">
                          <p className="font-medium">Currently in transit</p>
                          <p className="text-muted-foreground">Indianapolis, IN - 5 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <div className="text-sm">
                          <p className="font-medium">Departed origin terminal</p>
                          <p className="text-muted-foreground">Chicago, IL - 8 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <div className="text-sm">
                          <p className="font-medium">Pickup completed</p>
                          <p className="text-muted-foreground">Chicago, IL - 10 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Shipment</h3>
                  <p className="text-gray-500">
                    Choose a shipment from the list to view detailed tracking information
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;