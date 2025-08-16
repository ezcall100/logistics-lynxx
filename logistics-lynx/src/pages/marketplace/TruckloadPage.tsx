/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Calendar,
  Weight,
  Ruler,
  Package,
  TrendingUp,
  Filter,
  RefreshCw,
  Search,
  Eye,
  Phone,
  Heart
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const TruckloadPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedRange, setSelectedRange] = useState('all');

  const truckloadData = [
    {
      id: 'TL001',
      origin: 'Los Angeles, CA',
      destination: 'Chicago, IL',
      distance: 2015,
      rate: 6045,
      ratePerMile: 3.00,
      weight: 44500,
      length: 53,
      commodity: 'Electronics',
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-19',
      broker: 'Prime Logistics',
      brokerRating: 4.9,
      status: 'Available',
      bidsCount: 12,
      isUrgent: true,
      equipment: 'Dry Van',
      specialRequirements: ['Team Driver Preferred', 'Expedited']
    },
    {
      id: 'TL002',
      origin: 'Dallas, TX',
      destination: 'Miami, FL',
      distance: 1300,
      rate: 3900,
      ratePerMile: 3.00,
      weight: 40000,
      length: 53,
      commodity: 'Consumer Goods',
      pickupDate: '2024-01-17',
      deliveryDate: '2024-01-20',
      broker: 'Freight Solutions Inc',
      brokerRating: 4.7,
      status: 'Available',
      bidsCount: 8,
      isUrgent: false,
      equipment: 'Dry Van',
      specialRequirements: ['Temperature Monitoring']
    },
    {
      id: 'TL003',
      origin: 'Atlanta, GA',
      destination: 'Seattle, WA',
      distance: 2618,
      rate: 7854,
      ratePerMile: 3.00,
      weight: 42000,
      length: 53,
      commodity: 'Machinery Parts',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-22',
      broker: 'West Coast Freight',
      brokerRating: 4.8,
      status: 'Available',
      bidsCount: 15,
      isUrgent: true,
      equipment: 'Dry Van',
      specialRequirements: ['Liftgate Required', 'Inside Delivery']
    },
    {
      id: 'TL004',
      origin: 'Phoenix, AZ',
      destination: 'Denver, CO',
      distance: 877,
      rate: 2631,
      ratePerMile: 3.00,
      weight: 38500,
      length: 48,
      commodity: 'Retail Goods',
      pickupDate: '2024-01-19',
      deliveryDate: '2024-01-21',
      broker: 'Mountain Logistics',
      brokerRating: 4.6,
      status: 'Available',
      bidsCount: 6,
      isUrgent: false,
      equipment: 'Dry Van',
      specialRequirements: ['Appointment Required']
    },
    {
      id: 'TL005',
      origin: 'Houston, TX',
      destination: 'New York, NY',
      distance: 1628,
      rate: 4884,
      ratePerMile: 3.00,
      weight: 43000,
      length: 53,
      commodity: 'Food Products',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-23',
      broker: 'Eastern Express',
      brokerRating: 4.9,
      status: 'Available',
      bidsCount: 20,
      isUrgent: true,
      equipment: 'Dry Van',
      specialRequirements: ['Food Grade Trailer', 'Temperature Controlled']
    }
  ];

  const marketInsights = {
    averageRate: 3.00,
    totalLoads: 1247,
    capacityUtilization: 84,
    demandTrend: '+12.5%',
    topLanes: [
      { lane: 'CA → IL', loads: 156, avgRate: '$3.05' },
      { lane: 'TX → FL', loads: 142, avgRate: '$2.98' },
      { lane: 'GA → WA', loads: 128, avgRate: '$3.15' },
      { lane: 'AZ → CO', loads: 98, avgRate: '$2.89' }
    ]
  };

  const handleBid = (load: unknown) => {
    toast.success(`Bid submitted for ${load.id} - ${load.origin} → ${load.destination}`);
  };

  const handleQuickBook = (load: unknown) => {
    toast.success(`Quick booking initiated for ${load.id}`);
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Truckload (TL) Freight</h1>
            <p className="text-muted-foreground">
              Full truckload opportunities with dedicated capacity
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rate/Mile</p>
                  <p className="text-2xl font-bold text-green-600">${marketInsights.averageRate}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Loads</p>
                  <p className="text-2xl font-bold">{marketInsights.totalLoads.toLocaleString()}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Capacity Utilization</p>
                  <p className="text-2xl font-bold">{marketInsights.capacityUtilization}%</p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Demand Trend</p>
                  <p className="text-2xl font-bold text-green-600">{marketInsights.demandTrend}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Available Loads */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <CardTitle>Available Truckload Shipments</CardTitle>
                    <CardDescription>
                      {truckloadData.length} full truckload opportunities
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by origin/destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {truckloadData.map((load) => (
                    <Card key={load.id} className={`border ${load.isUrgent ? 'border-red-200 bg-red-50' : 'hover:shadow-lg'} transition-all`}>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                          {/* Route Info */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{load.origin}</h3>
                              {load.isUrgent && <Badge variant="destructive" className="text-xs">URGENT</Badge>}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              ↓ {load.destination}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {load.distance} miles
                            </div>
                          </div>

                          {/* Load Details */}
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">{load.commodity}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Weight className="h-3 w-3" />
                              <span>{load.weight.toLocaleString()} lbs</span>
                              <Ruler className="h-3 w-3 ml-2" />
                              <span>{load.length}ft</span>
                            </div>
                            <div className="text-xs text-gray-500">{load.equipment}</div>
                          </div>

                          {/* Dates */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>Pick: {load.pickupDate}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>Del: {load.deliveryDate}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {load.broker} ({load.brokerRating} ⭐)
                            </div>
                          </div>

                          {/* Rate & Actions */}
                          <div className="space-y-3">
                            <div>
                              <div className="text-2xl font-bold text-green-600">
                                ${load.rate.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                ${load.ratePerMile}/mile • {load.bidsCount} bids
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleBid(load)}
                                className="w-full"
                              >
                                Submit Bid
                              </Button>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Heart className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Special Requirements */}
                        {load.specialRequirements.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              {load.specialRequirements.map((req, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Lanes */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top TL Lanes</CardTitle>
                <CardDescription>Most active truckload routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.topLanes.map((lane, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{lane.lane}</div>
                        <div className="text-sm text-gray-500">{lane.loads} loads</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{lane.avgRate}</div>
                        <div className="text-xs text-gray-500">avg/mile</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Advanced Search
                </Button>
                <Button className="w-full" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Set Rate Alerts
                </Button>
                <Button className="w-full" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Save Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TruckloadPage;