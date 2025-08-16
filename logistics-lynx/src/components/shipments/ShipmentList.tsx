/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, Eye, Truck, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShipmentForm } from './ShipmentForm';
import ShipmentTrackingDialog from './ShipmentTrackingDialog';
import type { Shipment } from '@/types/tms';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  assigned: 'bg-blue-100 text-blue-800 border-blue-300',
  picked_up: 'bg-orange-100 text-orange-800 border-orange-300',
  in_transit: 'bg-purple-100 text-purple-800 border-purple-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  normal: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export const ShipmentList: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const { toast } = useToast();

  const fetchShipments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data as Shipment[] || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch shipments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleDeleteShipment = async (shipmentId: string) => {
    if (!confirm('Are you sure you want to delete this shipment?')) return;

    try {
      const { error } = await supabase
        .from('shipments')
        .delete()
        .eq('id', shipmentId);

      if (error) throw error;

      setShipments(shipments.filter(s => s.id !== shipmentId));
      toast({
        title: 'Success',
        description: 'Shipment deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting shipment:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete shipment',
        variant: 'destructive',
      });
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.shipment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (shipment.customer_reference && shipment.customer_reference.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFormSuccess = () => {
    fetchShipments();
    setIsFormOpen(false);
    setSelectedShipment(null);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipments ({filteredShipments.length})
            </CardTitle>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setSelectedShipment(null);
                  setIsFormOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedShipment ? 'Edit Shipment' : 'Create New Shipment'}
                  </DialogTitle>
                </DialogHeader>
                <ShipmentForm
                  shipment={selectedShipment || undefined}
                  onSuccess={handleFormSuccess}
                  onCancel={() => {
                    setIsFormOpen(false);
                    setSelectedShipment(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipments by number, origin, destination, or customer reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Shipments Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No shipments found matching your search.' : 'No shipments found. Create your first shipment to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{shipment.shipment_number}</div>
                          {shipment.customer_reference && (
                            <div className="text-sm text-muted-foreground">
                              Ref: {shipment.customer_reference}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={statusColors[shipment.status as keyof typeof statusColors]}
                        >
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={priorityColors[shipment.priority]}
                        >
                          {shipment.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="max-w-[100px] truncate">{shipment.origin}</span>
                          <span>→</span>
                          <span className="max-w-[100px] truncate">{shipment.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">
                          {shipment.equipment_type?.replace('_', ' ') || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          {shipment.pickup_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-green-600" />
                              <span>Pick: {format(new Date(shipment.pickup_date), 'MMM dd')}</span>
                            </div>
                          )}
                          {shipment.delivery_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-blue-600" />
                              <span>Del: {format(new Date(shipment.delivery_date), 'MMM dd')}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {shipment.rate ? (
                          <span className="font-medium">${shipment.rate.toLocaleString()}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsTrackingOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View & Track
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsFormOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteShipment(shipment.id)}
                              className="text-destructive"
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shipment Tracking Dialog */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Shipment Tracking - {selectedShipment?.shipment_number}
            </DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <ShipmentTrackingDialog
              shipment={selectedShipment}
              onClose={() => {
                setIsTrackingOpen(false);
                setSelectedShipment(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};