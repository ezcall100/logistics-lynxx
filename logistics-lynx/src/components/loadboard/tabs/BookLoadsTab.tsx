
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar, DollarSign, Package } from 'lucide-react';

const mockBookedLoads = [
  {
    id: 'BL-001',
    loadId: 'LB-001',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    pickupDate: '2024-06-20',
    deliveryDate: '2024-06-22',
    rate: '$2,750',
    status: 'confirmed',
    bookedAt: '2024-06-18 10:30 AM',
    shipper: 'TechCorp Industries',
    commodity: 'Electronics'
  },
  {
    id: 'BL-002',
    loadId: 'LB-005',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    pickupDate: '2024-06-21',
    deliveryDate: '2024-06-21',
    rate: '$1,200',
    status: 'pending',
    bookedAt: '2024-06-18 02:15 PM',
    shipper: 'Northwest Logistics',
    commodity: 'Textiles'
  },
  {
    id: 'BL-003',
    loadId: 'LB-008',
    origin: 'Miami, FL',
    destination: 'Orlando, FL',
    pickupDate: '2024-06-22',
    deliveryDate: '2024-06-22',
    rate: '$950',
    status: 'in-transit',
    bookedAt: '2024-06-19 09:45 AM',
    shipper: 'Sunshine Freight',
    commodity: 'Food Products'
  },
  {
    id: 'BL-004',
    loadId: 'LB-012',
    origin: 'Denver, CO',
    destination: 'Kansas City, MO',
    pickupDate: '2024-06-23',
    deliveryDate: '2024-06-24',
    rate: '$1,850',
    status: 'delivered',
    bookedAt: '2024-06-17 04:20 PM',
    shipper: 'Mountain Express',
    commodity: 'Machinery'
  }
];

export const BookLoadsTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedLoad, setSelectedLoad] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in-transit': return <Package className="h-4 w-4 text-blue-600" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "❌ Booking Cancelled",
      description: `Booking ${bookingId} has been cancelled successfully.`,
    });
  };

  const handleViewDocuments = (bookingId: string) => {
    toast({
      title: "📄 Documents",
      description: `Opening documents for booking ${bookingId}.`,
    });
  };

  const handleTrackLoad = (bookingId: string) => {
    toast({
      title: "🚛 Tracking",
      description: `Real-time tracking activated for booking ${bookingId}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">$45,250</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booked Loads Table */}
      <Card className="shadow-lg border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            My Booked Loads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Load Details</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBookedLoads.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{booking.id}</div>
                        <div className="text-xs text-muted-foreground">{booking.loadId}</div>
                        <div className="text-xs text-blue-600">{booking.bookedAt}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{booking.shipper}</div>
                        <div className="text-sm text-blue-600">{booking.commodity}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-green-600" />
                          {booking.origin}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-red-600" />
                          {booking.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Pickup: {booking.pickupDate}
                        </div>
                        <div className="text-muted-foreground">
                          Delivery: {booking.deliveryDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{booking.rate}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(booking.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          {booking.status.replace('-', ' ')}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDocuments(booking.id)}
                        >
                          Docs
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTrackLoad(booking.id)}
                        >
                          Track
                        </Button>
                        {booking.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
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
