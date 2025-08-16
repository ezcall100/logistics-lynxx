import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  PlayCircle,
  Zap,
  Users,
  Package,
  Route
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Load {
  id: string;
  shipment_number: string;
  origin: string;
  destination: string;
  status: string;
  priority: string;
  equipment_type?: string;
  weight?: number;
  distance_miles?: number;
  pickup_date?: string;
  delivery_date?: string;
  rate?: number;
  created_at: string;
}

interface Carrier {
  id: string;
  carrier_name: string;
  contact_phone?: string;
  equipment_types?: string[];
  operating_regions?: string[];
  availability_status?: string;
  performance_score?: number;
  total_loads_completed?: number;
  average_rating?: number;
  created_at: string;
}

interface DispatchAssignment {
  load_id: string;
  carrier_id: string;
  assigned_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  notes?: string;
}

export function DispatchDashboard() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoDispatchEnabled, setAutoDispatchEnabled] = useState(false);
  const { toast } = useToast();

  const [dispatchStats, setDispatchStats] = useState({
    pendingDispatches: 0,
    activeCarriers: 0,
    completionRate: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    fetchLoads();
    fetchCarriers();
    fetchDispatchStats();
  }, [fetchCarriers, fetchDispatchStats, fetchLoads]);

  const fetchLoads = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .in('status', ['pending', 'assigned'])
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoads(data || []);
    } catch (error) {
      console.error('Error fetching loads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch loads",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchCarriers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('freight_carriers')
        .select('*')
        .eq('availability_status', 'available')
        .order('performance_score', { ascending: false });

      if (error) throw error;
      setCarriers(data || []);
    } catch (error) {
      console.error('Error fetching carriers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch carriers",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchDispatchStats = useCallback(async () => {
    try {
      // Simulate fetching dispatch statistics
      setDispatchStats({
        pendingDispatches: loads.filter(l => l.status === 'pending').length,
        activeCarriers: carriers.filter(c => c.availability_status === 'available').length,
        completionRate: 92.5,
        avgResponseTime: 45
      });
    } catch (error) {
      console.error('Error fetching dispatch stats:', error);
    }
  }, [loads, carriers]);

  const handleManualDispatch = async () => {
    if (!selectedLoad || !selectedCarrier) {
      toast({
        title: "Error",
        description: "Please select both a load and carrier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Update load status to assigned
      const { error: loadError } = await supabase
        .from('shipments')
        .update({ 
          status: 'assigned',
          carrier_id: selectedCarrier.id,
          assigned_to: selectedCarrier.id
        })
        .eq('id', selectedLoad.id);

      if (loadError) throw loadError;

      // Update carrier status
      const { error: carrierError } = await supabase
        .from('freight_carriers')
        .update({ availability_status: 'assigned' })
        .eq('id', selectedCarrier.id);

      if (carrierError) throw carrierError;

      toast({
        title: "Success",
        description: `Load ${selectedLoad.shipment_number} assigned to ${selectedCarrier.carrier_name}`,
      });

      // Refresh data
      await Promise.all([fetchLoads(), fetchCarriers(), fetchDispatchStats()]);
      setSelectedLoad(null);
      setSelectedCarrier(null);
    } catch (error) {
      console.error('Error dispatching load:', error);
      toast({
        title: "Error",
        description: "Failed to dispatch load",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoDispatch = async () => {
    setIsLoading(true);
    try {
      // Simple auto-dispatch logic: match based on equipment type and location
      const availableLoads = loads.filter(l => l.status === 'pending');
      const availableCarriers = carriers.filter(c => c.availability_status === 'available');

      let dispatchedCount = 0;
      
      for (const load of availableLoads) {
        // Find best carrier based on equipment type and score
        const suitableCarriers = availableCarriers.filter(carrier => 
          !carrier.equipment_types || 
          carrier.equipment_types.includes(load.equipment_type || 'dry_van')
        );

        if (suitableCarriers.length > 0) {
          // Select carrier with highest performance score
          const bestCarrier = suitableCarriers.reduce((best, current) => 
            (current.performance_score || 0) > (best.performance_score || 0) ? current : best
          );

          // Assign load to carrier
          await supabase
            .from('shipments')
            .update({ 
              status: 'assigned',
              carrier_id: bestCarrier.id,
              assigned_to: bestCarrier.id
            })
            .eq('id', load.id);

          await supabase
            .from('freight_carriers')
            .update({ availability_status: 'assigned' })
            .eq('id', bestCarrier.id);

          dispatchedCount++;
          // Remove carrier from available list for this batch
          const carrierIndex = availableCarriers.indexOf(bestCarrier);
          if (carrierIndex > -1) {
            availableCarriers.splice(carrierIndex, 1);
          }
        }
      }

      toast({
        title: "Auto-Dispatch Complete",
        description: `Successfully dispatched ${dispatchedCount} loads`,
      });

      // Refresh data
      await Promise.all([fetchLoads(), fetchCarriers(), fetchDispatchStats()]);
    } catch (error) {
      console.error('Error in auto-dispatch:', error);
      toast({
        title: "Error",
        description: "Auto-dispatch failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLoads = loads.filter(load => {
    const matchesSearch = load.shipment_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         load.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || load.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carrier Dispatch</h1>
          <p className="text-muted-foreground">
            Automated and manual carrier dispatch management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleAutoDispatch}
            disabled={isLoading || loads.filter(l => l.status === 'pending').length === 0}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Zap className="h-4 w-4 mr-2" />
            Auto-Dispatch
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Dispatches</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dispatchStats.pendingDispatches}</div>
            <p className="text-xs text-muted-foreground">
              Loads awaiting assignment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Carriers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dispatchStats.activeCarriers}</div>
            <p className="text-xs text-muted-foreground">
              Available for dispatch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dispatchStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dispatchStats.avgResponseTime}m</div>
            <p className="text-xs text-muted-foreground">
              Carrier acceptance time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList>
          <TabsTrigger value="manual">Manual Dispatch</TabsTrigger>
          <TabsTrigger value="automatic">Automatic Rules</TabsTrigger>
          <TabsTrigger value="history">Dispatch History</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Loads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Available Loads
                </CardTitle>
                <CardDescription>
                  Select a load to dispatch to a carrier
                </CardDescription>
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search loads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredLoads.map((load) => (
                    <div
                      key={load.id}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all",
                        selectedLoad?.id === load.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedLoad(load)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{load.shipment_number}</span>
                        <Badge className={getPriorityColor(load.priority)}>
                          {load.priority}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {load.origin} → {load.destination}
                        </div>
                        {load.weight && (
                          <div>Weight: {load.weight} lbs</div>
                        )}
                        {load.distance_miles && (
                          <div>Distance: {load.distance_miles} miles</div>
                        )}
                        {load.rate && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {load.rate}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Carriers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Available Carriers
                </CardTitle>
                <CardDescription>
                  Select a carrier to assign the load
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {carriers.map((carrier) => (
                    <div
                      key={carrier.id}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all",
                        selectedCarrier?.id === carrier.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedCarrier(carrier)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{carrier.carrier_name}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Available
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {carrier.contact_phone && (
                          <div>Phone: {carrier.contact_phone}</div>
                        )}
                        {carrier.equipment_types && (
                          <div>Equipment: {carrier.equipment_types.join(', ')}</div>
                        )}
                        {carrier.performance_score && (
                          <div>Score: {carrier.performance_score}/100</div>
                        )}
                        {carrier.total_loads_completed && (
                          <div>Completed: {carrier.total_loads_completed} loads</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dispatch Action */}
                {selectedLoad && selectedCarrier && (
                  <div className="border-t pt-4">
                    <Button 
                      onClick={handleManualDispatch}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Dispatch Load
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automatic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Dispatch Rules</CardTitle>
              <CardDescription>
                Configure rules for automatic carrier assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-dispatch">Enable Auto-Dispatch</Label>
                  <Button
                    variant={autoDispatchEnabled ? "default" : "outline"}
                    onClick={() => setAutoDispatchEnabled(!autoDispatchEnabled)}
                  >
                    {autoDispatchEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority Handling</Label>
                    <Select defaultValue="score">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Performance Score</SelectItem>
                        <SelectItem value="distance">Nearest Carrier</SelectItem>
                        <SelectItem value="cost">Lowest Rate</SelectItem>
                        <SelectItem value="experience">Most Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Equipment Matching</Label>
                    <Select defaultValue="strict">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Exact Match</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="unknown">Any Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Performance Score</Label>
                  <Input type="number" defaultValue="75" min="0" max="100" />
                </div>

                <div className="space-y-2">
                  <Label>Auto-Dispatch Schedule</Label>
                  <Textarea 
                    placeholder="Configure when auto-dispatch should run (e.g., every 15 minutes during business hours)"
                    defaultValue="Every 15 minutes between 8:00 AM - 6:00 PM EST"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Dispatch History</CardTitle>
              <CardDescription>
                Track recent dispatch activities and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Dispatch history will be shown here once dispatches are made
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}