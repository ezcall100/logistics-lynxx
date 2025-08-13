
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Truck, DollarSign, Phone, Mail, User, Package } from 'lucide-react';

interface Load {
  id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  rate: number;
  distance: number;
  equipmentType: string;
  commodity: string;
  status: string;
  shipper: string;
  contact: string;
  phone: string;
}

interface LoadDetailsModalProps {
  load: Load | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LoadDetailsModal: React.FC<LoadDetailsModalProps> = ({
  load,
  isOpen,
  onClose
}) => {
  if (!load) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'booked':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'delivered':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Load Details - {load.id}</DialogTitle>
              <DialogDescription>
                Complete information for this freight opportunity
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(load.status)}>
              {load.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Origin</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{load.origin}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="font-medium">Destination</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{load.destination}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Total Distance</span>
                <span className="font-medium">{load.distance} miles</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Pickup Date</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {new Date(load.pickupDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Delivery Date</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {new Date(load.deliveryDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Load Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Load Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <Truck className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">{load.weight.toLocaleString()} lbs</p>
                <p className="text-xs text-muted-foreground">Weight</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-1 text-green-600" />
                <p className="text-sm font-medium">${load.rate.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Rate</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Package className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">{load.equipmentType}</p>
                <p className="text-xs text-muted-foreground">Equipment</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                <p className="text-sm font-medium">${(load.rate / load.distance).toFixed(2)}/mi</p>
                <p className="text-xs text-muted-foreground">Rate per Mile</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm"><span className="font-medium">Commodity:</span> {load.commodity}</p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{load.contact}</p>
                  <p className="text-sm text-muted-foreground">{load.shipper}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{load.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {load.status === 'available' && (
            <Button onClick={() => console.log('Booking load:', load.id)}>
              Book This Load
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
