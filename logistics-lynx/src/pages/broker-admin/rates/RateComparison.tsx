/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Star,
  MapPin,
  Calendar,
  Truck,
  DollarSign,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Filter
} from 'lucide-react';

const RateComparison = () => {
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedMode, setSelectedMode] = useState('truck');
  const [selectedDate, setSelectedDate] = useState('');

  const comparisonData = [
    {
      id: 1,
      carrier: 'ABC Logistics',
      carrierType: 'Large Fleet',
      rate: 3250,
      ratePerMile: 1.16,
      transitTime: '3-4 days',
      reliability: 98,
      rating: 4.8,
      totalLoads: 1456,
      onTimePerformance: 96,
      lastUpdate: '2 hours ago',
      specialServices: ['Tracking', 'Insurance', '24/7 Support'],
      savings: 0,
      recommended: true
    },
    {
      id: 2,
      carrier: 'Express Carriers',
      carrierType: 'Regional',
      rate: 2950,
      ratePerMile: 1.06,
      transitTime: '2-3 days',
      reliability: 94,
      rating: 4.6,
      totalLoads: 856,
      onTimePerformance: 92,
      lastUpdate: '4 hours ago',
      specialServices: ['Tracking', 'Express Delivery'],
      savings: 300,
      recommended: false
    },
    {
      id: 3,
      carrier: 'Owner Op - John Smith',
      carrierType: 'Owner Operator',
      rate: 3100,
      ratePerMile: 1.11,
      transitTime: '3-5 days',
      reliability: 89,
      rating: 4.9,
      totalLoads: 234,
      onTimePerformance: 94,
      lastUpdate: '1 hour ago',
      specialServices: ['Personal Service', 'Flexible Schedule'],
      savings: 150,
      recommended: false
    },
    {
      id: 4,
      carrier: 'Swift Transportation',
      carrierType: 'Large Fleet',
      rate: 3450,
      ratePerMile: 1.23,
      transitTime: '4-5 days',
      reliability: 91,
      rating: 4.4,
      totalLoads: 2134,
      onTimePerformance: 89,
      lastUpdate: '6 hours ago',
      specialServices: ['Tracking', 'Insurance', 'Temperature Control'],
      savings: -200,
      recommended: false
    },
    {
      id: 5,
      carrier: 'Owner Op - Maria Rodriguez',
      carrierType: 'Owner Operator',
      rate: 2850,
      ratePerMile: 1.02,
      transitTime: '3-4 days',
      reliability: 92,
      rating: 4.7,
      totalLoads: 178,
      onTimePerformance: 95,
      lastUpdate: '3 hours ago',
      specialServices: ['Bilingual Service', 'Flexible Pickup'],
      savings: 400,
      recommended: false
    }
  ];

  const marketAnalytics = [
    { route: 'LA-NY', avgRate: 3100, trend: 'up', change: 5.2, volume: 'high' },
    { route: 'Chicago-Miami', avgRate: 2100, trend: 'down', change: -2.1, volume: 'medium' },
    { route: 'Seattle-Houston', avgRate: 1950, trend: 'up', change: 3.8, volume: 'low' },
    { route: 'Atlanta-Denver', avgRate: 2350, trend: 'stable', change: 0.5, volume: 'high' }
  ];

  const getBestValue = () => {
    return comparisonData.reduce((prev, current) => 
      (prev.ratePerMile < current.ratePerMile) ? prev : current
    );
  };

  const getFastest = () => {
    return comparisonData.reduce((prev, current) => 
      (parseInt(prev.transitTime) < parseInt(current.transitTime)) ? prev : current
    );
  };

  const getMostReliable = () => {
    return comparisonData.reduce((prev, current) => 
      (prev.reliability > current.reliability) ? prev : current
    );
  };

  const getSavingsColor = (savings: number) => {
    if (savings > 0) return 'text-green-600';
    if (savings < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Rate Comparison</h1>
            <p className="text-muted-foreground">
              Compare rates from multiple carriers and find the best value
            </p>
          </div>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>

        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle>Route & Requirements</CardTitle>
            <CardDescription>Enter your shipment details to compare rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium">Origin City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Los Angeles, CA"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Destination City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="New York, NY"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Transportation Mode</label>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Truck/LTL</SelectItem>
                    <SelectItem value="rail">Rail Freight</SelectItem>
                    <SelectItem value="ocean">Ocean Freight</SelectItem>
                    <SelectItem value="air">Air Freight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Pickup Date</label>
                <Input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Compare Rates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Value</p>
                  <p className="text-xl font-bold">{getBestValue().carrier}</p>
                  <p className="text-sm text-green-600">${getBestValue().ratePerMile}/mile</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fastest</p>
                  <p className="text-xl font-bold">{getFastest().carrier}</p>
                  <p className="text-sm text-blue-600">{getFastest().transitTime}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Most Reliable</p>
                  <p className="text-xl font-bold">{getMostReliable().carrier}</p>
                  <p className="text-sm text-purple-600">{getMostReliable().reliability}% reliable</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comparison">Rate Comparison</TabsTrigger>
            <TabsTrigger value="market">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate Comparison Results</CardTitle>
                <CardDescription>Los Angeles, CA → New York, NY (2,790 miles) • Pickup: Today</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>$/Mile</TableHead>
                      <TableHead>Transit Time</TableHead>
                      <TableHead>Reliability</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Savings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((rate) => (
                      <TableRow key={rate.id} className={rate.recommended ? 'bg-green-50' : ''}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {rate.recommended && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            <div>
                              <div className="font-medium">{rate.carrier}</div>
                              <div className="text-sm text-muted-foreground">{rate.carrierType}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-lg">${rate.rate.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${rate.ratePerMile}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {rate.transitTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{rate.reliability}%</span>
                            </div>
                            <Progress value={rate.reliability} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{rate.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(rate.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${getSavingsColor(rate.savings)}`}>
                            {rate.savings > 0 ? '+' : ''}${rate.savings}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant={rate.recommended ? 'default' : 'outline'}>
                              {rate.recommended ? 'Book Now' : 'Select'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Detailed Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonData.slice(0, 3).map((rate) => (
                <Card key={rate.id} className={rate.recommended ? 'ring-2 ring-green-500' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{rate.carrier}</CardTitle>
                        <CardDescription>{rate.carrierType}</CardDescription>
                      </div>
                      {rate.recommended && (
                        <Badge className="bg-green-500">Recommended</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-4 border rounded-lg">
                      <div className="text-2xl font-bold">${rate.rate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">${rate.ratePerMile}/mile</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Transit Time:</span>
                        <span className="text-sm font-medium">{rate.transitTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">On-Time:</span>
                        <span className="text-sm font-medium">{rate.onTimePerformance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Loads:</span>
                        <span className="text-sm font-medium">{rate.totalLoads.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Update:</span>
                        <span className="text-sm font-medium">{rate.lastUpdate}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Special Services:</div>
                      <div className="flex flex-wrap gap-1">
                        {rate.specialServices.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" variant={rate.recommended ? 'default' : 'outline'}>
                      {rate.recommended ? 'Book This Rate' : 'Select Rate'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Rate Analytics</CardTitle>
                <CardDescription>Current market trends and rate analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Average Rate</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Change %</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Market Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketAnalytics.map((market, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{market.route}</TableCell>
                        <TableCell>${market.avgRate.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(market.trend)}
                            <span className="capitalize">{market.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={market.change > 0 ? 'text-green-600' : market.change < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {market.change > 0 ? '+' : ''}{market.change}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            market.volume === 'high' ? 'border-green-500 text-green-700' :
                            market.volume === 'medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-red-500 text-red-700'
                          }>
                            {market.volume}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {market.trend === 'up' ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              Increasing demand
                            </div>
                          ) : market.trend === 'down' ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingDown className="h-4 w-4" />
                              Decreasing rates
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-600">
                              <ArrowUpDown className="h-4 w-4" />
                              Stable market
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RateComparison;