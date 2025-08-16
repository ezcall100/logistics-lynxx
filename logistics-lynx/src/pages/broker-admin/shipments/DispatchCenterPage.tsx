/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users2,
  Truck,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Phone,
  MessageSquare,
  Target,
  Route,
  Bot,
  Activity,
  DollarSign,
  Star,
  Calendar,
  Bell,
  UserCheck,
  Package
} from 'lucide-react';

const DispatchCenterPage = () => {
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const availableLoads = [
    {
      id: 'LD-2024-001',
      customer: 'ABC Manufacturing',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      pickup: '2024-01-16 08:00',
      delivery: '2024-01-18 17:00',
      weight: '42,000 lbs',
      equipment: 'Dry Van',
      rate: '$2,450',
      miles: '587',
      priority: 'High',
      status: 'Available',
      commodity: 'Auto Parts'
    },
    {
      id: 'LD-2024-002',
      customer: 'Global Supply Co',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      pickup: '2024-01-16 14:00',
      delivery: '2024-01-18 10:00',
      weight: '35,500 lbs',
      equipment: 'Reefer',
      rate: '$2,880',
      miles: '641',
      priority: 'Medium',
      status: 'Matching',
      commodity: 'Frozen Foods'
    },
    {
      id: 'LD-2024-003',
      customer: 'Metro Distribution',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      pickup: '2024-01-17 06:00',
      delivery: '2024-01-17 18:00',
      weight: '28,750 lbs',
      equipment: 'Flatbed',
      rate: '$1,875',
      miles: '358',
      priority: 'Urgent',
      status: 'Available',
      commodity: 'Steel Beams'
    }
  ];

  const availableCarriers = [
    {
      id: 'CAR-001',
      name: 'Swift Transport',
      driver: 'John Smith',
      phone: '(555) 123-4567',
      currentLocation: 'Chicago, IL',
      equipment: 'Dry Van',
      capacity: '48,000 lbs',
      rating: 4.8,
      onTimeRate: '98%',
      status: 'Available',
      lastLoad: '2 days ago',
      preferredLanes: ['IL-GA', 'IL-TX', 'IL-FL']
    },
    {
      id: 'CAR-002',
      name: 'Mountain Freight',
      driver: 'Mike Johnson',
      phone: '(555) 987-6543',
      currentLocation: 'Denver, CO',
      equipment: 'Reefer',
      capacity: '45,000 lbs',
      rating: 4.6,
      onTimeRate: '95%',
      status: 'Available',
      lastLoad: '1 day ago',
      preferredLanes: ['CO-TX', 'CO-CA', 'CO-UT']
    },
    {
      id: 'CAR-003',
      name: 'Desert Express',
      driver: 'Sarah Wilson',
      phone: '(555) 456-7890',
      currentLocation: 'Phoenix, AZ',
      equipment: 'Flatbed',
      capacity: '50,000 lbs',
      rating: 4.9,
      onTimeRate: '99%',
      status: 'Available',
      lastLoad: '3 hours ago',
      preferredLanes: ['AZ-CA', 'AZ-TX', 'AZ-NV']
    }
  ];

  const dispatchStats = [
    { label: 'Available Loads', value: '24', icon: Package, change: '+3', trend: 'up' },
    { label: 'Available Carriers', value: '18', icon: Truck, change: '+1', trend: 'up' },
    { label: 'Matched Today', value: '12', icon: CheckCircle, change: '+5', trend: 'up' },
    { label: 'Pending Assignment', value: '6', icon: Clock, change: '-2', trend: 'down' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Matching': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const matchCarriersToLoad = (load) => {
    // AI-powered matching logic (simplified)
    return availableCarriers.filter(carrier => 
      carrier.equipment === load.equipment &&
      parseInt(carrier.capacity.replace(/[^\d]/g, '')) >= parseInt(load.weight.replace(/[^\d]/g, ''))
    ).sort((a, b) => b.rating - a.rating);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispatch Center</h1>
          <p className="text-muted-foreground">
            AI-powered load assignment and carrier matching
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Bot className="h-4 w-4 mr-2" />
            Auto-Match
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Manual Assignment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dispatchStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-sm">
                    <span className={`${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">today</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Loads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Loads</CardTitle>
                <CardDescription>Loads requiring carrier assignment</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {availableLoads.map((load) => (
                <div
                  key={load.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLoad?.id === load.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLoad(load)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{load.id}</h3>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(load.priority)}>
                          {load.priority}
                        </Badge>
                        <Badge className={getStatusColor(load.status)}>
                          {load.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{load.customer}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{load.origin} → {load.destination}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Pickup:</span> {load.pickup}
                        </div>
                        <div>
                          <span className="font-medium">Delivery:</span> {load.delivery}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span><span className="font-medium">Weight:</span> {load.weight}</span>
                        <span><span className="font-medium">Equipment:</span> {load.equipment}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{load.rate}</span>
                        <span className="text-sm text-muted-foreground">{load.miles} miles</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Bot className="h-3 w-3 mr-1" />
                        AI Match
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carrier Matching */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedLoad ? `Matching Carriers for ${selectedLoad.id}` : 'Available Carriers'}
            </CardTitle>
            <CardDescription>
              {selectedLoad ? 'AI-recommended carriers for this load' : 'All available carriers'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedLoad ? (
              <div className="space-y-4">
                {/* Load Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Load Requirements</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><span className="font-medium">Route:</span> {selectedLoad.origin} → {selectedLoad.destination}</p>
                    <p><span className="font-medium">Equipment:</span> {selectedLoad.equipment}</p>
                    <p><span className="font-medium">Weight:</span> {selectedLoad.weight}</p>
                    <p><span className="font-medium">Rate:</span> {selectedLoad.rate}</p>
                  </div>
                </div>

                {/* Matched Carriers */}
                <div className="space-y-3">
                  {matchCarriersToLoad(selectedLoad).map((carrier, index) => (
                    <div key={carrier.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{carrier.name}</h4>
                            <p className="text-sm text-muted-foreground">{carrier.driver}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{carrier.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {index === 0 ? 'Best Match' : `Match ${index + 1}`}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Location:</span> {carrier.currentLocation}
                          </div>
                          <div>
                            <span className="font-medium">On-Time:</span> {carrier.onTimeRate}
                          </div>
                          <div>
                            <span className="font-medium">Equipment:</span> {carrier.equipment}
                          </div>
                          <div>
                            <span className="font-medium">Capacity:</span> {carrier.capacity}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Last load: {carrier.lastLoad}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm">
                              Assign
                            </Button>
                          </div>
                        </div>

                        {index === 0 && (
                          <div className="bg-green-50 border border-green-200 rounded p-2">
                            <p className="text-xs text-green-700">
                              <CheckCircle className="h-3 w-3 inline mr-1" />
                              Perfect match: Equipment type, capacity, and location optimize efficiency
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {availableCarriers.map((carrier) => (
                  <div key={carrier.id} className="border rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{carrier.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{carrier.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{carrier.driver}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Location:</span> {carrier.currentLocation}
                        </div>
                        <div>
                          <span className="font-medium">Equipment:</span> {carrier.equipment}
                        </div>
                        <div>
                          <span className="font-medium">Capacity:</span> {carrier.capacity}
                        </div>
                        <div>
                          <span className="font-medium">On-Time:</span> {carrier.onTimeRate}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Matching Panel */}
      <Card>
        <CardHeader>
          <CardTitle>AI Dispatch Assistant</CardTitle>
          <CardDescription>Automated matching and optimization suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-6 w-6 text-blue-600" />
                <h4 className="font-medium text-blue-900">Smart Matching</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                AI analyzes 20+ factors including location, capacity, ratings, and historical performance
              </p>
              <Button size="sm" className="w-full">
                Enable Auto-Match
              </Button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Route className="h-6 w-6 text-green-600" />
                <h4 className="font-medium text-green-900">Route Optimization</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Optimize routes for fuel efficiency, transit time, and carrier preferences
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Optimize Routes
              </Button>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="h-6 w-6 text-purple-600" />
                <h4 className="font-medium text-purple-900">Performance Insights</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                Real-time analytics on dispatch efficiency and carrier performance
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DispatchCenterPage;