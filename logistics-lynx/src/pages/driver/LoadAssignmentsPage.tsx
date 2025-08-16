import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Truck, MapPin, Clock, DollarSign, Route, Navigation } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoadAssignment {
  id: string;
  load_id: string;
  pickup_location: string;
  delivery_location: string;
  pickup_date: string;
  delivery_date: string;
  load_status: string;
  estimated_earnings: number;
  miles_driven: number;
}

const LoadAssignmentsPage = () => {
  const [loads, setLoads] = useState<LoadAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDriverLoads();
  }, [fetchDriverLoads]);

  const fetchDriverLoads = useCallback(async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('driver_loads')
        .select('*')
        .eq('driver_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoads(data || []);
    } catch (error) {
      console.error('Error fetching loads:', error);
      toast({
        title: "Error",
        description: "Failed to load assignments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateLoadStatus = async (loadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('driver_loads')
        .update({ load_status: newStatus })
        .eq('id', loadId);

      if (error) throw error;

      setLoads(prev => prev.map(load => 
        load.id === loadId ? { ...load, load_status: newStatus } : load
      ));

      toast({
        title: "Status Updated",
        description: `Load status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-500';
      case 'en_route_pickup': return 'bg-orange-500';
      case 'picked_up': return 'bg-yellow-500';
      case 'en_route_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Load Assignments</h1>
          <p className="text-muted-foreground">Your current and upcoming load assignments</p>
        </div>
        <Button>
          <Navigation className="w-4 h-4 mr-2" />
          Route Planning
        </Button>
      </div>

      {/* Load Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Truck className="w-4 h-4 mr-2" />
              Active Loads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loads.filter(l => ['assigned', 'en_route_pickup', 'picked_up', 'en_route_delivery'].includes(l.load_status)).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Route className="w-4 h-4 mr-2" />
              Total Miles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loads.reduce((sum, load) => sum + (load.miles_driven || 0), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Estimated Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${loads.reduce((sum, load) => sum + (load.estimated_earnings || 0), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loads.filter(l => l.load_status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Load Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>Manage your load assignments and update status</CardDescription>
        </CardHeader>
        <CardContent>
          {loads.length === 0 ? (
            <div className="text-center py-8">
              <Truck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No load assignments found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Pickup Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loads.map((load) => (
                  <TableRow key={load.id}>
                    <TableCell className="font-medium">{load.load_id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-green-600" />
                          <span className="text-sm">{load.pickup_location}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-red-600" />
                          <span className="text-sm">{load.delivery_location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {load.pickup_date ? new Date(load.pickup_date).toLocaleDateString() : 'TBD'}
                    </TableCell>
                    <TableCell>
                      {load.delivery_date ? new Date(load.delivery_date).toLocaleDateString() : 'TBD'}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(load.load_status)} text-white`}>
                        {load.load_status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      ${load.estimated_earnings?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {load.load_status === 'assigned' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateLoadStatus(load.id, 'en_route_pickup')}
                          >
                            Start Trip
                          </Button>
                        )}
                        {load.load_status === 'en_route_pickup' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateLoadStatus(load.id, 'picked_up')}
                          >
                            Picked Up
                          </Button>
                        )}
                        {load.load_status === 'picked_up' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateLoadStatus(load.id, 'en_route_delivery')}
                          >
                            En Route
                          </Button>
                        )}
                        {load.load_status === 'en_route_delivery' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateLoadStatus(load.id, 'delivered')}
                          >
                            Delivered
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Route className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadAssignmentsPage;