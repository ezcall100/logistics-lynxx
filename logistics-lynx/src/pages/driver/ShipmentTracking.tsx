import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle,
  AlertTriangle,
  Camera,
  FileText,
  Phone,
  MessageCircle
} from 'lucide-react';

interface ShipmentCargo {
  description: string;
  weight: string;
  pieces: number;
  value: string;
  temperature: string;
}

interface ShipmentLocation {
  company: string;
  address: string;
  contact: string;
  phone: string;
  scheduledTime: string;
  actualTime: string | null;
}

interface Shipment {
  id: string;
  status: string;
  pickup: ShipmentLocation;
  delivery: ShipmentLocation;
  cargo: ShipmentCargo;
  progress: number;
  currentLocation?: string;
  lastUpdate: string;
  documents?: string[];
  deliveryTime?: string;
}

const ShipmentTracking = () => {
  const [activeTab, setActiveTab] = useState('active');

  const shipments: {
    active: Shipment[];
    completed: Shipment[];
    upcoming: Shipment[];
  } = {
    active: [
      {
        id: 'LD001',
        status: 'In Transit',
        pickup: {
          company: 'Chicago Distribution Center',
          address: '1250 W Van Buren St, Chicago, IL 60607',
          contact: 'Mike Johnson',
          phone: '(312) 555-0123',
          scheduledTime: '2024-01-20 08:00',
          actualTime: '2024-01-20 08:15'
        },
        delivery: {
          company: 'Detroit Warehouse',
          address: '15800 Northline Rd, Southgate, MI 48195',
          contact: 'Sarah Davis',
          phone: '(313) 555-0456',
          scheduledTime: '2024-01-20 14:00',
          actualTime: null
        },
        cargo: {
          description: 'Electronic Components',
          weight: '15,000 lbs',
          pieces: 42,
          value: '$25,000',
          temperature: 'Ambient'
        },
        progress: 65,
        currentLocation: 'Battle Creek, MI',
        lastUpdate: '2024-01-20 11:30',
        documents: ['BOL', 'Invoice', 'Delivery Receipt']
      }
    ],
    completed: [
      {
        id: 'LD002',
        status: 'Delivered',
        pickup: {
          company: 'Milwaukee Logistics',
          address: '2100 W Forest Home Ave, Milwaukee, WI 53215',
          contact: 'Tom Wilson',
          phone: '(414) 555-0789',
          scheduledTime: '2024-01-19 09:00',
          actualTime: '2024-01-19 09:10'
        },
        delivery: {
          company: 'Chicago Distribution Hub',
          address: '3400 S Ashland Ave, Chicago, IL 60609',
          contact: 'Lisa Martinez',
          phone: '(312) 555-0321',
          scheduledTime: '2024-01-19 13:00',
          actualTime: '2024-01-19 12:45'
        },
        cargo: {
          description: 'Auto Parts',
          weight: '12,500 lbs',
          pieces: 36,
          value: '$18,500',
          temperature: 'Ambient'
        },
        progress: 100,
        deliveryTime: '2024-01-19 12:45',
        lastUpdate: '2024-01-19 12:45'
      }
    ],
    upcoming: [
      {
        id: 'LD003',
        status: 'Assigned',
        pickup: {
          company: 'Detroit Manufacturing',
          address: '18000 Northline Rd, Southgate, MI 48195',
          contact: 'Robert Kim',
          phone: '(313) 555-0654',
          scheduledTime: '2024-01-21 10:00',
          actualTime: null
        },
        delivery: {
          company: 'Cleveland Warehouse',
          address: '4500 Denison Ave, Cleveland, OH 44109',
          contact: 'Jennifer Lee',
          phone: '(216) 555-0987',
          scheduledTime: '2024-01-21 15:00',
          actualTime: null
        },
        cargo: {
          description: 'Industrial Equipment',
          weight: '18,000 lbs',
          pieces: 8,
          value: '$45,000',
          temperature: 'Ambient'
        },
        progress: 0,
        lastUpdate: '2024-01-20 16:00'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-500';
      case 'Delivered': return 'bg-green-500';
      case 'Assigned': return 'bg-yellow-500';
      case 'Delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTimeStatus = (scheduled: string, actual: string | null) => {
    if (!actual) return 'pending';
    const scheduledTime = new Date(scheduled);
    const actualTime = new Date(actual);
    if (actualTime <= scheduledTime) return 'on-time';
    return 'delayed';
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderShipmentCard = (shipment: Shipment) => (
    <Card key={shipment.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{shipment.id}</CardTitle>
            <CardDescription>{shipment.cargo.description}</CardDescription>
          </div>
          <Badge className={getStatusColor(shipment.status)}>
            {shipment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {shipment.status === 'In Transit' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{shipment.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${shipment.progress}%` }}
              />
            </div>
            {shipment.currentLocation && (
              <div className="text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 inline mr-1" />
                Current Location: {shipment.currentLocation}
              </div>
            )}
          </div>
        )}

        {/* Pickup and Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-semibold text-sm">Pickup</span>
            </div>
            <div className="ml-5 space-y-1">
              <div className="font-medium">{shipment.pickup.company}</div>
              <div className="text-sm text-muted-foreground">{shipment.pickup.address}</div>
              <div className="text-sm">
                <span className="text-muted-foreground">Contact: </span>
                {shipment.pickup.contact}
              </div>
              <div className="text-sm flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>Scheduled: {formatTime(shipment.pickup.scheduledTime)}</span>
                {shipment.pickup.actualTime && (
                  <span className={
                    getTimeStatus(shipment.pickup.scheduledTime, shipment.pickup.actualTime) === 'on-time' 
                      ? 'text-green-600' : 'text-red-600'
                  }>
                    (Actual: {formatTime(shipment.pickup.actualTime)})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-semibold text-sm">Delivery</span>
            </div>
            <div className="ml-5 space-y-1">
              <div className="font-medium">{shipment.delivery.company}</div>
              <div className="text-sm text-muted-foreground">{shipment.delivery.address}</div>
              <div className="text-sm">
                <span className="text-muted-foreground">Contact: </span>
                {shipment.delivery.contact}
              </div>
              <div className="text-sm flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>Scheduled: {formatTime(shipment.delivery.scheduledTime)}</span>
                {shipment.delivery.actualTime && (
                  <span className={
                    getTimeStatus(shipment.delivery.scheduledTime, shipment.delivery.actualTime) === 'on-time' 
                      ? 'text-green-600' : 'text-red-600'
                  }>
                    (Actual: {formatTime(shipment.delivery.actualTime)})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="bg-muted p-3 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Weight:</span>
              <div className="font-semibold">{shipment.cargo.weight}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Pieces:</span>
              <div className="font-semibold">{shipment.cargo.pieces}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Value:</span>
              <div className="font-semibold">{shipment.cargo.value}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Temperature:</span>
              <div className="font-semibold">{shipment.cargo.temperature}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-muted-foreground">
            Last updated: {formatTime(shipment.lastUpdate)}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Camera className="w-3 h-3 mr-1" />
              Photo
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-3 h-3 mr-1" />
              Documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shipment Tracking</h1>
            <p className="text-muted-foreground">Track and manage your load deliveries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
            <Button>
              <Package className="w-4 h-4 mr-2" />
              Update Status
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipments.active.length}</div>
              <p className="text-xs text-muted-foreground">Currently in transit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipments.completed.length}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shipments.upcoming.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled pickups</p>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Shipments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {shipments.active.length > 0 ? (
              shipments.active.map(renderShipmentCard)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Shipments</h3>
                  <p className="text-muted-foreground">You don't have unknown shipments in transit.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {shipments.upcoming.length > 0 ? (
              shipments.upcoming.map(renderShipmentCard)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Shipments</h3>
                  <p className="text-muted-foreground">You don't have unknown scheduled pickups.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {shipments.completed.length > 0 ? (
              shipments.completed.map(renderShipmentCard)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Shipments</h3>
                  <p className="text-muted-foreground">You haven't completed unknown shipments yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ShipmentTracking;