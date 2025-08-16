/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Truck, 
  Users, 
  MapPin,
  Fuel,
  Plus,
  Edit,
  Trash2,
  BarChart,
  Target,
  Route as MapRoute,
  Brain,
  Zap,
  Settings,
  Search,
  Filter,
  ArrowUpDown,
  Star,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const PricingRatesPage = () => {
  const [activeTab, setActiveTab] = useState('ai-builder');
  const [selectedLane, setSelectedLane] = useState('');
  const [aiQuoteData, setAiQuoteData] = useState({
    origin: '',
    destination: '',
    weight: '',
    commodity: '',
    equipment: '',
    specialRequirements: ''
  });

  // Mock data for different pricing sections
  const aiInsights = {
    marketRate: '$2,850',
    confidence: '92%',
    competitorRange: '$2,600 - $3,100',
    fuelSurcharge: '$285',
    demandLevel: 'High',
    carrierAvailability: 'Medium'
  };

  const customerRates = [
    {
      id: 1,
      customer: 'ABC Logistics',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      baseRate: '$2,400',
      fuelRate: '28%',
      margin: '18%',
      volume: 'High',
      status: 'Active'
    },
    {
      id: 2,
      customer: 'XYZ Manufacturing',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      baseRate: '$1,650',
      fuelRate: '25%',
      margin: '22%',
      volume: 'Medium',
      status: 'Active'
    }
  ];

  const carrierRates = [
    {
      id: 1,
      carrier: 'Premier Transport',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      rate: '$2,100',
      fuelRate: '26%',
      rating: 4.8,
      reliability: '98%',
      status: 'Preferred'
    },
    {
      id: 2,
      carrier: 'Reliable Freight',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      rate: '$1,350',
      fuelRate: '24%',
      rating: 4.5,
      reliability: '95%',
      status: 'Active'
    }
  ];

  const topLanes = [
    {
      id: 1,
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      volume: 45,
      avgRate: '$2,750',
      margin: '18%',
      trend: 'up'
    },
    {
      id: 2,
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      volume: 32,
      avgRate: '$1,850',
      margin: '22%',
      trend: 'stable'
    },
    {
      id: 3,
      origin: 'Atlanta, GA',
      destination: 'Miami, FL',
      volume: 28,
      avgRate: '$2,200',
      margin: '15%',
      trend: 'down'
    }
  ];

  const handleAiQuoteGeneration = () => {
    // Mock AI quote generation
    console.log('Generating AI quote with data:', aiQuoteData);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing & Rates</h1>
          <p className="text-muted-foreground">
            AI-powered pricing tools and rate management for optimal margins
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Rate Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Rate
          </Button>
        </div>
      </div>

      {/* Pricing Tools Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="ai-builder" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Builder
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="customer-rates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Customer Rates
          </TabsTrigger>
          <TabsTrigger value="carrier-rates" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Carrier Rates
          </TabsTrigger>
          <TabsTrigger value="lanes" className="flex items-center gap-2">
            <MapRoute className="h-4 w-4" />
            Lane Pricing
          </TabsTrigger>
          <TabsTrigger value="market-intel" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Intel
          </TabsTrigger>
        </TabsList>

        {/* AI Quote Builder */}
        <TabsContent value="ai-builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Quote Builder
                </CardTitle>
                <CardDescription>
                  Let AI analyze market data and generate optimal pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      placeholder="Chicago, IL"
                      value={aiQuoteData.origin}
                      onChange={(e) => setAiQuoteData({...aiQuoteData, origin: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Dallas, TX"
                      value={aiQuoteData.destination}
                      onChange={(e) => setAiQuoteData({...aiQuoteData, destination: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      placeholder="45,000"
                      value={aiQuoteData.weight}
                      onChange={(e) => setAiQuoteData({...aiQuoteData, weight: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipment Type</Label>
                    <Select value={aiQuoteData.equipment} onValueChange={(value) => setAiQuoteData({...aiQuoteData, equipment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry-van">Dry Van</SelectItem>
                        <SelectItem value="flatbed">Flatbed</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="step-deck">Step Deck</SelectItem>
                        <SelectItem value="lowboy">Lowboy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input
                    id="commodity"
                    placeholder="Electronics"
                    value={aiQuoteData.commodity}
                    onChange={(e) => setAiQuoteData({...aiQuoteData, commodity: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any special handling, delivery time requirements, etc."
                    value={aiQuoteData.specialRequirements}
                    onChange={(e) => setAiQuoteData({...aiQuoteData, specialRequirements: e.target.value})}
                  />
                </div>

                <Button onClick={handleAiQuoteGeneration} className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Generate AI Quote
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Market Analysis
                </CardTitle>
                <CardDescription>
                  Real-time market insights and pricing recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Suggested Rate</Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-2xl font-bold">{aiInsights.marketRate}</span>
                      <Badge variant="outline" className="text-green-600">
                        {aiInsights.confidence} confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Competitor Range</Label>
                    <div className="text-lg font-semibold">{aiInsights.competitorRange}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Fuel Surcharge</Label>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4" />
                      <span className="font-semibold">{aiInsights.fuelSurcharge}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Market Demand</Label>
                    <Badge className={aiInsights.demandLevel === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {aiInsights.demandLevel}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Carrier Availability</Label>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">{aiInsights.carrierAvailability}</span>
                    <Badge variant="outline">
                      15 carriers available
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">AI Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Price competitively at $2,850 for quick acceptance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span>High demand lane - consider premium pricing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Good margin opportunity with preferred carriers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rate Calculator */}
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Advanced Rate Calculator
              </CardTitle>
              <CardDescription>
                Calculate precise rates with all cost factors included
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Base Rate per Mile</Label>
                      <Input placeholder="$2.50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Total Miles</Label>
                      <Input placeholder="1,200" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Fuel Surcharge %</Label>
                      <Input placeholder="28%" />
                    </div>
                    <div className="space-y-2">
                      <Label>Deadhead Miles</Label>
                      <Input placeholder="150" />
                    </div>
                    <div className="space-y-2">
                      <Label>Detention Rate</Label>
                      <Input placeholder="$50/hr" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Accessorial Charges</Label>
                      <Input placeholder="$125" />
                    </div>
                    <div className="space-y-2">
                      <Label>Desired Margin %</Label>
                      <Input placeholder="18%" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="hazmat" />
                    <Label htmlFor="hazmat">Hazmat surcharge (+$0.25/mile)</Label>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-3">Rate Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Rate:</span>
                        <span>$3,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Surcharge:</span>
                        <span>$840</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deadhead:</span>
                        <span>$375</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accessorials:</span>
                        <span>$125</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total Cost:</span>
                        <span>$4,340</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Margin (18%):</span>
                        <span>$781</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Customer Rate:</span>
                        <span className="text-green-600">$5,121</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    Save Rate Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Rates */}
        <TabsContent value="customer-rates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Rate Management
              </CardTitle>
              <CardDescription>
                Manage contracted rates and pricing agreements with customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerRates.map((rate) => (
                  <div key={rate.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{rate.customer}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={rate.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rate.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Route</Label>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span>{rate.origin}</span>
                          <ArrowUpDown className="h-3 w-3" />
                          <MapPin className="h-3 w-3 text-red-600" />
                          <span>{rate.destination}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Base Rate</Label>
                        <p className="font-medium">{rate.baseRate}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Fuel Rate</Label>
                        <p className="font-medium">{rate.fuelRate}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Margin</Label>
                        <Badge variant="outline" className="text-green-600">
                          {rate.margin}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Volume</Label>
                        <p className="font-medium">{rate.volume}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carrier Rates */}
        <TabsContent value="carrier-rates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Carrier Rate Management
              </CardTitle>
              <CardDescription>
                Track carrier rates and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carrierRates.map((rate) => (
                  <div key={rate.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{rate.carrier}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={rate.status === 'Preferred' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                          {rate.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{rate.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Route</Label>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span>{rate.origin}</span>
                          <ArrowUpDown className="h-3 w-3" />
                          <MapPin className="h-3 w-3 text-red-600" />
                          <span>{rate.destination}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Rate</Label>
                        <p className="font-medium">{rate.rate}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Fuel Rate</Label>
                        <p className="font-medium">{rate.fuelRate}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Reliability</Label>
                        <Badge variant="outline" className="text-green-600">
                          {rate.reliability}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Actions</Label>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lane Pricing */}
        <TabsContent value="lanes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapRoute className="h-5 w-5" />
                Top Performing Lanes
              </CardTitle>
              <CardDescription>
                Analyze your most profitable shipping lanes and market trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLanes.map((lane) => (
                  <div key={lane.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{lane.origin}</span>
                        <ArrowUpDown className="h-4 w-4" />
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="font-medium">{lane.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lane.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {lane.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />}
                        {lane.trend === 'stable' && <ArrowUpDown className="h-4 w-4 text-blue-600" />}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Monthly Volume</Label>
                        <p className="font-bold text-lg">{lane.volume} loads</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Average Rate</Label>
                        <p className="font-bold text-lg">{lane.avgRate}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Average Margin</Label>
                        <Badge variant="outline" className="text-green-600">
                          {lane.margin}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Trend</Label>
                        <p className="font-medium capitalize">{lane.trend}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Intelligence */}
        <TabsContent value="market-intel" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Rate Increase</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Chicago to Dallas rates up 12% this week due to high demand
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Fuel className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Fuel Update</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      National fuel average increased to $4.85/gallon (+3.2%)
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Capacity Alert</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Limited flatbed availability in Southeast region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Rate Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Win Rate</span>
                    <span className="text-2xl font-bold text-green-600">67%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Margin</span>
                    <span className="text-2xl font-bold text-blue-600">19.5%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quote Response Time</span>
                    <span className="text-2xl font-bold text-purple-600">8m</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      View Detailed Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingRatesPage;