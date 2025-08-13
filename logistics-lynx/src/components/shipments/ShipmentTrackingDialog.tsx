import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, MapPin, Calendar, Clock, DollarSign, User, Truck } from 'lucide-react';
import type { Shipment } from '@/types/tms';
import { format } from 'date-fns';

interface ShipmentTrackingDialogProps {
  shipment: Shipment;
  onClose?: () => void;
}

const ShipmentTrackingDialog: React.FC<ShipmentTrackingDialogProps> = ({ shipment, onClose }) => {
  return (
    <div className="space-y-6">
      {/* Shipment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Shipment Details
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{shipment.shipment_number}</h3>
              {shipment.customer_reference && (
                <p className="text-sm text-muted-foreground">Ref: {shipment.customer_reference}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline">
                {shipment.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge variant="secondary">
                {shipment.priority.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <Separator />
          
          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Origin
              </h4>
              <p className="text-sm text-muted-foreground">{shipment.origin}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                Destination
              </h4>
              <p className="text-sm text-muted-foreground">{shipment.destination}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shipment.pickup_date && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Pickup Date
                </h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(shipment.pickup_date), 'PPp')}
                </p>
              </div>
            )}
            {shipment.delivery_date && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  Delivery Date
                </h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(shipment.delivery_date), 'PPp')}
                </p>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shipment.equipment_type && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Equipment
                </h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {shipment.equipment_type.replace('_', ' ')}
                </p>
              </div>
            )}
            {shipment.rate && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Rate
                </h4>
                <p className="text-sm text-muted-foreground">
                  ${shipment.rate.toLocaleString()}
                </p>
              </div>
            )}
            {(shipment.weight || shipment.distance_miles) && (
              <div className="space-y-2">
                <h4 className="font-medium">Specifications</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {shipment.weight && <p>Weight: {shipment.weight.toLocaleString()} lbs</p>}
                  {shipment.distance_miles && <p>Distance: {shipment.distance_miles} miles</p>}
                </div>
              </div>
            )}
          </div>
          
          {shipment.special_instructions && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Special Instructions</h4>
                <p className="text-sm text-muted-foreground">{shipment.special_instructions}</p>
              </div>
            </>
          )}
          
        </CardContent>
      </Card>

      {/* Tracking Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                GPS tracking will be displayed here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Integration with fleet management systems
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {onClose && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShipmentTrackingDialog;