import UltraModernLayout from '@/components/layout/UltraModernLayout';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users,
  Truck,
  Plus,
  Filter,
  Search
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
  availability_status?: string;
  performance_score?: number;
  total_loads_completed?: number;
}

interface Customer {
  id: string;
  customer_name: string;
  contact_email?: string;
  customer_status?: string;
  customer_type?: string;
}

export default function LoadManagementPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalLoads: 0,
    activeLoads: 0,
    totalRevenue: 0,
    availableCarriers: 0
  });

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchData]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch loads from shipments table
      const { data: loadsData, error: loadsError } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (loadsError) throw loadsError;

      // Fetch carriers
      const { data: carriersData, error: carriersError } = await supabase
        .from('freight_carriers')
        .select('*')
        .order('carrier_name');

      if (carriersError) throw carriersError;

      // Fetch customers
      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('*')
        .order('customer_name');

      if (customersError) throw customersError;

      setLoads(loadsData || []);
      setCarriers(carriersData || []);
      setCustomers(customersData || []);

      // Calculate stats
      const totalRevenue = (loadsData || []).reduce((sum, load) => sum + (load.rate || 0), 0);
      const activeLoads = (loadsData || []).filter(load => 
        ['assigned', 'picked_up', 'in_transit'].includes(load.status)
      ).length;
      const availableCarriers = (carriersData || []).filter(carrier => 
        carrier.availability_status === 'available'
      ).length;

      setStats({
        totalLoads: loadsData?.length || 0,
        activeLoads,
        totalRevenue,
        availableCarriers
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch load management data",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'picked_up': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in_transit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <UltraModernLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Load Management</h1>
            <p className="text-muted-foreground">
              Manage loads, carriers, and customers in one place
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="h-4 w-4 mr-2" />
            New Load
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loads</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLoads}</div>
              <p className="text-xs text-muted-foreground">
                All time loads
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLoads}</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All time revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Carriers</CardTitle>
              <Truck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableCarriers}</div>
              <p className="text-xs text-muted-foreground">
                Ready for dispatch
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="loads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="loads">Loads</TabsTrigger>
            <TabsTrigger value="carriers">Carriers</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="loads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Load Management</CardTitle>
                <CardDescription>
                  Track and manage all your loads
                </CardDescription>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search loads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="picked_up">Picked Up</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLoads.map((load) => (
                    <div
                      key={load.id}
                      className="p-4 rounded-lg border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lg">{load.shipment_number}</span>
                          <Badge className={getPriorityColor(load.priority)}>
                            {load.priority}
                          </Badge>
                          <Badge className={getStatusColor(load.status)}>
                            {load.status}
                          </Badge>
                        </div>
                        {load.rate && (
                          <div className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {load.rate.toLocaleString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{load.origin} → {load.destination}</span>
                        </div>
                        {load.weight && (
                          <div>
                            <span className="text-muted-foreground">Weight: </span>
                            {load.weight.toLocaleString()} lbs
                          </div>
                        )}
                        {load.distance_miles && (
                          <div>
                            <span className="text-muted-foreground">Distance: </span>
                            {load.distance_miles} miles
                          </div>
                        )}
                        {load.pickup_date && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Pickup: {new Date(load.pickup_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {load.delivery_date && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Delivery: {new Date(load.delivery_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {load.equipment_type && (
                          <div>
                            <span className="text-muted-foreground">Equipment: </span>
                            {load.equipment_type}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {filteredLoads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No loads found matching your criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carriers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carrier Management</CardTitle>
                <CardDescription>
                  Manage your carrier network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {carriers.map((carrier) => (
                    <div
                      key={carrier.id}
                      className="p-4 rounded-lg border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{carrier.carrier_name}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            carrier.availability_status === 'available' 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {carrier.availability_status || 'unknown'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
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
                          <div>Completed Loads: {carrier.total_loads_completed}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {carriers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No carriers found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  Manage your customer relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="p-4 rounded-lg border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{customer.customer_name}</span>
                        <Badge variant="outline">
                          {customer.customer_type || 'Standard'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        {customer.contact_email && (
                          <div>Email: {customer.contact_email}</div>
                        )}
                        {customer.customer_status && (
                          <div>Status: {customer.customer_status}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {customers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No customers found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UltraModernLayout>
  );
}