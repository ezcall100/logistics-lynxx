/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck, 
  Package, 
  DollarSign, 
  Plus, 
  Trash2, 
  Save, 
  Route,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  Fuel,
  Calculator,
  Map
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface RouteStop {
  id: string;
  type: 'pickup' | 'delivery' | 'fuel' | 'rest' | 'maintenance';
  company: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // in minutes
  contactName: string;
  contactPhone: string;
  notes: string;
  priority: 'high' | 'medium' | 'low';
  requirements: string[];
}

interface RoutePreferences {
  avoidTolls: boolean;
  avoidHighways: boolean;
  preferScenic: boolean;
  maxDrivingHours: number;
  fuelStopInterval: number; // miles
  restStopInterval: number; // hours
  truckRestrictions: boolean;
  hazmatRoute: boolean;
}

interface RouteCostEstimate {
  totalDistance: number;
  estimatedDuration: number; // hours
  fuelCost: number;
  tollCost: number;
  driverPayment: number;
  totalCost: number;
  profitMargin: number;
}

const RoutePlannerPage: React.FC = () => {
  const [routeName, setRouteName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [loadType, setLoadType] = useState('');
  const [revenue, setRevenue] = useState('');
  
  const [routeStops, setRouteStops] = useState<RouteStop[]>([
    {
      id: '1',
      type: 'pickup',
      company: 'Walmart Distribution Center',
      address: '123 Warehouse Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      scheduledDate: '2024-01-20',
      scheduledTime: '08:00',
      estimatedDuration: 90,
      contactName: 'John Smith',
      contactPhone: '555-0123',
      notes: 'Loading dock #5, bring BOL',
      priority: 'high',
      requirements: ['appointment', 'BOL required']
    },
    {
      id: '2',
      type: 'delivery',
      company: 'Target Distribution',
      address: '456 Commerce Ave',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30301',
      scheduledDate: '2024-01-21',
      scheduledTime: '14:00',
      estimatedDuration: 60,
      contactName: 'Jane Doe',
      contactPhone: '555-0456',
      notes: 'Delivery confirmation required',
      priority: 'high',
      requirements: ['signature required', 'photo proof']
    }
  ]);

  const [routePreferences, setRoutePreferences] = useState<RoutePreferences>({
    avoidTolls: false,
    avoidHighways: false,
    preferScenic: false,
    maxDrivingHours: 10,
    fuelStopInterval: 300,
    restStopInterval: 8,
    truckRestrictions: true,
    hazmatRoute: false
  });

  const [costEstimate, setCostEstimate] = useState<RouteCostEstimate>({
    totalDistance: 587,
    estimatedDuration: 12.5,
    fuelCost: 425,
    tollCost: 85,
    driverPayment: 800,
    totalCost: 1310,
    profitMargin: 1537
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Add new stop
  const addStop = () => {
    const newStop: RouteStop = {
      id: Date.now().toString(),
      type: 'delivery',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      scheduledDate: '',
      scheduledTime: '',
      estimatedDuration: 60,
      contactName: '',
      contactPhone: '',
      notes: '',
      priority: 'medium',
      requirements: []
    };
    setRouteStops([...routeStops, newStop]);
  };

  // Remove stop
  const removeStop = (id: string) => {
    setRouteStops(routeStops.filter(stop => stop.id !== id));
  };

  // Update stop
  const updateStop = (id: string, field: keyof RouteStop, value: unknown) => {
    setRouteStops(routeStops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  // Calculate route optimization
  const optimizeRoute = () => {
    // Simulated optimization
    const optimizedDistance = Math.round(costEstimate.totalDistance * 0.95);
    const optimizedDuration = Math.round(costEstimate.estimatedDuration * 0.9 * 10) / 10;
    const optimizedFuelCost = Math.round(costEstimate.fuelCost * 0.92);
    
    setCostEstimate(prev => ({
      ...prev,
      totalDistance: optimizedDistance,
      estimatedDuration: optimizedDuration,
      fuelCost: optimizedFuelCost,
      totalCost: optimizedFuelCost + prev.tollCost + prev.driverPayment,
      profitMargin: Number(revenue) - (optimizedFuelCost + prev.tollCost + prev.driverPayment)
    }));
    
    toast.success('Route optimized successfully! Reduced distance by 5% and fuel costs by 8%');
  };

  // Save route
  const saveRoute = () => {
    if (!routeName || !startDate || !truckNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const routeData = {
      routeName,
      startDate,
      endDate,
      truckNumber,
      driverName,
      customerName,
      loadType,
      revenue: Number(revenue),
      stops: routeStops,
      preferences: routePreferences,
      costEstimate
    };
    
    console.log('Saving route:', routeData);
    toast.success('Route saved successfully!');
  };

  // Get stop type color
  const getStopTypeColor = (type: string) => {
    switch (type) {
      case 'pickup': return 'bg-blue-500';
      case 'delivery': return 'bg-green-500';
      case 'fuel': return 'bg-yellow-500';
      case 'rest': return 'bg-purple-500';
      case 'maintenance': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Planner</h1>
          <p className="text-muted-foreground">
            Plan and optimize your transportation routes for maximum efficiency
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={optimizeRoute}>
            <Route className="h-4 w-4 mr-2" />
            Optimize Route
          </Button>
          <Button onClick={saveRoute}>
            <Save className="h-4 w-4 mr-2" />
            Save Route
          </Button>
        </div>
      </div>

      {/* Main Planning Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="stops">Route Stops</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Route Information</CardTitle>
              <CardDescription>Enter the fundamental details for your route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routeName">Route Name *</Label>
                  <Input
                    id="routeName"
                    placeholder="e.g., Chicago to Atlanta Express"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer</Label>
                  <Input
                    id="customerName"
                    placeholder="Customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="revenue">Expected Revenue</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="2500"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="truckNumber">Truck Number *</Label>
                  <Select value={truckNumber} onValueChange={setTruckNumber}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRK-001">TRK-001 (Peterbilt 579)</SelectItem>
                      <SelectItem value="TRK-002">TRK-002 (Kenworth T680)</SelectItem>
                      <SelectItem value="TRK-003">TRK-003 (Freightliner Cascadia)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver</Label>
                  <Select value={driverName} onValueChange={setDriverName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
                      <SelectItem value="Carlos Martinez">Carlos Martinez</SelectItem>
                      <SelectItem value="Lisa Wong">Lisa Wong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loadType">Load Type</Label>
                  <Select value={loadType} onValueChange={setLoadType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select load type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry-van">Dry Van</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                      <SelectItem value="tanker">Tanker</SelectItem>
                      <SelectItem value="oversized">Oversized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Route Stops Tab */}
        <TabsContent value="stops" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Route Stops</CardTitle>
                  <CardDescription>Add and manage pickup, delivery, and other stops</CardDescription>
                </div>
                <Button onClick={addStop}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {routeStops.map((stop, index) => (
                <Card key={stop.id} className={`border-l-4 ${getPriorityColor(stop.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getStopTypeColor(stop.type)}>
                          {index + 1}. {stop.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={`${stop.priority === 'high' ? 'border-red-500 text-red-700' : stop.priority === 'medium' ? 'border-yellow-500 text-yellow-700' : 'border-green-500 text-green-700'}`}>
                          {stop.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeStop(stop.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Stop Type</Label>
                        <Select 
                          value={stop.type} 
                          onValueChange={(value) => updateStop(stop.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="fuel">Fuel Stop</SelectItem>
                            <SelectItem value="rest">Rest Stop</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select 
                          value={stop.priority} 
                          onValueChange={(value) => updateStop(stop.id, 'priority', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                          placeholder="Company name"
                          value={stop.company}
                          onChange={(e) => updateStop(stop.id, 'company', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                          placeholder="Street address"
                          value={stop.address}
                          onChange={(e) => updateStop(stop.id, 'address', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          placeholder="City"
                          value={stop.city}
                          onChange={(e) => updateStop(stop.id, 'city', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input
                          placeholder="State"
                          value={stop.state}
                          onChange={(e) => updateStop(stop.id, 'state', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>ZIP Code</Label>
                        <Input
                          placeholder="ZIP"
                          value={stop.zipCode}
                          onChange={(e) => updateStop(stop.id, 'zipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Scheduled Date</Label>
                        <Input
                          type="date"
                          value={stop.scheduledDate}
                          onChange={(e) => updateStop(stop.id, 'scheduledDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Scheduled Time</Label>
                        <Input
                          type="time"
                          value={stop.scheduledTime}
                          onChange={(e) => updateStop(stop.id, 'scheduledTime', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Est. Duration (min)</Label>
                        <Input
                          type="number"
                          placeholder="60"
                          value={stop.estimatedDuration}
                          onChange={(e) => updateStop(stop.id, 'estimatedDuration', Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact Name</Label>
                        <Input
                          placeholder="Contact person"
                          value={stop.contactName}
                          onChange={(e) => updateStop(stop.id, 'contactName', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Contact Phone</Label>
                        <Input
                          placeholder="Phone number"
                          value={stop.contactPhone}
                          onChange={(e) => updateStop(stop.id, 'contactPhone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Special instructions, requirements, or notes..."
                        value={stop.notes}
                        onChange={(e) => updateStop(stop.id, 'notes', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Preferences</CardTitle>
              <CardDescription>Configure route optimization preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Route Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Avoid Tolls</Label>
                      <div className="text-sm text-muted-foreground">Prefer toll-free routes</div>
                    </div>
                    <Switch
                      checked={routePreferences.avoidTolls}
                      onCheckedChange={(checked) => 
                        setRoutePreferences(prev => ({ ...prev, avoidTolls: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Avoid Highways</Label>
                      <div className="text-sm text-muted-foreground">Use local roads when possible</div>
                    </div>
                    <Switch
                      checked={routePreferences.avoidHighways}
                      onCheckedChange={(checked) => 
                        setRoutePreferences(prev => ({ ...prev, avoidHighways: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Truck Restrictions</Label>
                      <div className="text-sm text-muted-foreground">Follow truck route restrictions</div>
                    </div>
                    <Switch
                      checked={routePreferences.truckRestrictions}
                      onCheckedChange={(checked) => 
                        setRoutePreferences(prev => ({ ...prev, truckRestrictions: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>HAZMAT Route</Label>
                      <div className="text-sm text-muted-foreground">Use HAZMAT approved routes</div>
                    </div>
                    <Switch
                      checked={routePreferences.hazmatRoute}
                      onCheckedChange={(checked) => 
                        setRoutePreferences(prev => ({ ...prev, hazmatRoute: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Driving Limits</h4>
                  
                  <div className="space-y-2">
                    <Label>Max Driving Hours per Day</Label>
                    <Input
                      type="number"
                      min="1"
                      max="14"
                      value={routePreferences.maxDrivingHours}
                      onChange={(e) => 
                        setRoutePreferences(prev => ({ ...prev, maxDrivingHours: Number(e.target.value) }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fuel Stop Interval (miles)</Label>
                    <Input
                      type="number"
                      min="100"
                      max="600"
                      value={routePreferences.fuelStopInterval}
                      onChange={(e) => 
                        setRoutePreferences(prev => ({ ...prev, fuelStopInterval: Number(e.target.value) }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rest Stop Interval (hours)</Label>
                    <Input
                      type="number"
                      min="2"
                      max="12"
                      value={routePreferences.restStopInterval}
                      onChange={(e) => 
                        setRoutePreferences(prev => ({ ...prev, restStopInterval: Number(e.target.value) }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium">Distance:</span>
                  <span>{costEstimate.totalDistance} miles</span>
                  
                  <span className="font-medium">Estimated Duration:</span>
                  <span>{costEstimate.estimatedDuration} hours</span>
                  
                  <span className="font-medium">Fuel Cost:</span>
                  <span className="text-red-600">${costEstimate.fuelCost}</span>
                  
                  <span className="font-medium">Toll Cost:</span>
                  <span className="text-red-600">${costEstimate.tollCost}</span>
                  
                  <span className="font-medium">Driver Payment:</span>
                  <span className="text-red-600">${costEstimate.driverPayment}</span>
                  
                  <Separator className="col-span-2 my-2" />
                  
                  <span className="font-medium">Total Costs:</span>
                  <span className="text-red-600 font-bold">${costEstimate.totalCost}</span>
                  
                  <span className="font-medium">Revenue:</span>
                  <span className="text-green-600 font-bold">${revenue || 0}</span>
                  
                  <span className="font-medium">Net Profit:</span>
                  <span className={`font-bold ${costEstimate.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${costEstimate.profitMargin}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profit Margin</span>
                      <span>{revenue ? ((costEstimate.profitMargin / Number(revenue)) * 100).toFixed(1) : 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${costEstimate.profitMargin >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${revenue ? Math.abs((costEstimate.profitMargin / Number(revenue)) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Revenue per Mile:</span>
                    <span>${revenue ? (Number(revenue) / costEstimate.totalDistance).toFixed(2) : '0.00'}</span>
                    
                    <span className="font-medium">Cost per Mile:</span>
                    <span>${(costEstimate.totalCost / costEstimate.totalDistance).toFixed(2)}</span>
                    
                    <span className="font-medium">Profit per Mile:</span>
                    <span className={costEstimate.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${(costEstimate.profitMargin / costEstimate.totalDistance).toFixed(2)}
                    </span>
                    
                    <span className="font-medium">Break-even Revenue:</span>
                    <span>${costEstimate.totalCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {costEstimate.profitMargin < 500 && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800 dark:text-yellow-200">Low Profit Margin</div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">
                        Consider negotiating higher rates or optimizing fuel efficiency.
                      </div>
                    </div>
                  </div>
                )}
                
                {routePreferences.avoidTolls === false && costEstimate.tollCost > 50 && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Route className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800 dark:text-blue-200">Toll Optimization</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Enabling "Avoid Tolls" could save ${costEstimate.tollCost} but may increase fuel costs.
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800 dark:text-green-200">Fuel Efficiency</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Maintaining 65 mph average speed can improve fuel efficiency by 10-15%.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Summary</CardTitle>
              <CardDescription>Review your complete route plan before saving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Route Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Route Name:</span>
                    <span className="font-medium">{routeName || 'Unnamed Route'}</span>
                    
                    <span className="text-muted-foreground">Customer:</span>
                    <span>{customerName || 'Not specified'}</span>
                    
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{startDate ? new Date(startDate).toLocaleDateString() : 'Not set'}</span>
                    
                    <span className="text-muted-foreground">Driver:</span>
                    <span>{driverName || 'Not assigned'}</span>
                    
                    <span className="text-muted-foreground">Truck:</span>
                    <span>{truckNumber || 'Not assigned'}</span>
                    
                    <span className="text-muted-foreground">Load Type:</span>
                    <span>{loadType || 'Not specified'}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Total Distance:</span>
                    <span className="font-medium">{costEstimate.totalDistance} miles</span>
                    
                    <span className="text-muted-foreground">Est. Duration:</span>
                    <span>{costEstimate.estimatedDuration} hours</span>
                    
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="text-green-600 font-medium">${revenue || 0}</span>
                    
                    <span className="text-muted-foreground">Net Profit:</span>
                    <span className={`font-medium ${costEstimate.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${costEstimate.profitMargin}
                    </span>
                    
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className="font-medium">
                      {revenue ? ((costEstimate.profitMargin / Number(revenue)) * 100).toFixed(1) : 0}%
                    </span>
                    
                    <span className="text-muted-foreground">Total Stops:</span>
                    <span>{routeStops.length}</span>
                  </div>
                </div>
              </div>

              {/* Route Stops Summary */}
              <div className="space-y-3">
                <h4 className="font-medium">Route Stops ({routeStops.length})</h4>
                <div className="space-y-2">
                  {routeStops.map((stop, index) => (
                    <div key={stop.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Badge className={getStopTypeColor(stop.type)}>
                        {index + 1}
                      </Badge>
                      <div className="flex-1">
                        <div className="font-medium">{stop.company || 'Unnamed Stop'}</div>
                        <div className="text-sm text-muted-foreground">
                          {stop.city}, {stop.state} - {stop.type}
                          {stop.scheduledDate && stop.scheduledTime && (
                            <span className="ml-2">
                              on {new Date(stop.scheduledDate).toLocaleDateString()} at {stop.scheduledTime}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className={stop.priority === 'high' ? 'border-red-500 text-red-700' : ''}>
                        {stop.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences Summary */}
              <div className="space-y-3">
                <h4 className="font-medium">Route Preferences</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Avoid Tolls:</span>
                    <span className="ml-2">{routePreferences.avoidTolls ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Max Driving Hours:</span>
                    <span className="ml-2">{routePreferences.maxDrivingHours} hours</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Truck Restrictions:</span>
                    <span className="ml-2">{routePreferences.truckRestrictions ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Fuel Stop Interval:</span>
                    <span className="ml-2">{routePreferences.fuelStopInterval} miles</span>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              <div className="space-y-3">
                <h4 className="font-medium">Validation Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {routeName ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className={`text-sm ${routeName ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      Route name {routeName ? 'provided' : 'required'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {startDate ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className={`text-sm ${startDate ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      Start date {startDate ? 'set' : 'required'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {truckNumber ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className={`text-sm ${truckNumber ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      Truck {truckNumber ? 'assigned' : 'required'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {routeStops.length >= 2 ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    <span className={`text-sm ${routeStops.length >= 2 ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                      {routeStops.length >= 2 ? 'Sufficient stops' : 'At least 2 stops recommended'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoutePlannerPage;