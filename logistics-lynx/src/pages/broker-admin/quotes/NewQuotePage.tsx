/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Truck, 
  Package, 
  Ship, 
  Car,
  Plus,
  Brain,
  Calculator,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Zap,
  Send,
  Save,
  Copy,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface QuoteFormData {
  // Customer Information
  customerName: string;
  contactPerson: string;
  email: string;
  phone: string;
  customerType: string;
  
  // Shipment Details
  transportMode: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  deliveryDate: string;
  
  // Load Details
  weight: string;
  dimensions: string;
  pieces: string;
  commodityType: string;
  commodityValue: string;
  
  // Requirements
  equipmentType: string;
  specialRequirements: string;
  hazmat: boolean;
  temperatureControl: boolean;
  
  // Pricing
  customerRate: string;
  carrierRate: string;
  fuelSurcharge: string;
  accessorials: string;
  
  // Options
  priority: string;
  autoQuote: boolean;
  sendImmediately: boolean;
}

const NewQuotePage = () => {
  const [activeMode, setActiveMode] = useState('truckload');
  const [formData, setFormData] = useState<QuoteFormData>({
    customerName: '',
    contactPerson: '',
    email: '',
    phone: '',
    customerType: 'new',
    transportMode: 'truckload',
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    deliveryDate: '',
    weight: '',
    dimensions: '',
    pieces: '',
    commodityType: '',
    commodityValue: '',
    equipmentType: 'dry_van',
    specialRequirements: '',
    hazmat: false,
    temperatureControl: false,
    customerRate: '',
    carrierRate: '',
    fuelSurcharge: '',
    accessorials: '',
    priority: 'standard',
    autoQuote: true,
    sendImmediately: false
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    suggestedRate: 0,
    confidence: 0,
    marketComparison: '',
    recommendations: []
  });

  const transportModes = [
    { id: 'truckload', name: 'Truckload (TL)', icon: Truck, description: 'Full truck capacity shipments' },
    { id: 'ltl', name: 'Less Than Truckload (LTL)', icon: Package, description: 'Partial truck shipments' },
    { id: 'intermodal', name: 'Intermodal', icon: Ship, description: 'Rail and truck combination' },
    { id: 'drayage', name: 'Drayage', icon: Truck, description: 'Port and terminal services' },
    { id: 'auto', name: 'Auto Transport', icon: Car, description: 'Vehicle transportation' },
    { id: 'expedited', name: 'Expedited', icon: Zap, description: 'Time-critical shipments' }
  ];

  const handleInputChange = (field: keyof QuoteFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAIQuote = async () => {
    if (!formData.pickupAddress || !formData.deliveryAddress || !formData.weight) {
      toast.error('Please provide pickup location, delivery location, and weight for AI analysis');
      return;
    }

    toast.loading('AI analyzing market rates...', { id: 'ai-quote' });

    // Simulate AI processing
    setTimeout(() => {
      const baseWeight = parseFloat(formData.weight.replace(/[^0-9.]/g, '')) || 25000;
      const distance = Math.floor(Math.random() * 1500) + 200;
      
      let baseRate = 0;
      switch (activeMode) {
        case 'truckload': baseRate = distance * 2.45; break;
        case 'ltl': baseRate = baseWeight * 0.18; break;
        case 'intermodal': baseRate = distance * 1.85; break;
        case 'drayage': baseRate = 450; break;
        case 'auto': baseRate = distance * 0.95; break;
        case 'expedited': baseRate = distance * 4.20; break;
        default: baseRate = distance * 2.45;
      }

      const modeMultiplier = formData.temperatureControl ? 1.25 : 1.0;
      const hazmatMultiplier = formData.hazmat ? 1.15 : 1.0;
      const suggestedRate = Math.round(baseRate * modeMultiplier * hazmatMultiplier);
      const carrierCost = Math.round(suggestedRate * 0.82);
      
      setAiSuggestions({
        suggestedRate,
        confidence: 88 + Math.floor(Math.random() * 10),
        marketComparison: suggestedRate > baseRate * 1.1 ? 'Above Market' : 'Competitive',
        recommendations: [
          'Current market trend: +8% for this lane',
          'High carrier availability in origin area',
          'Fuel costs stable this week'
        ]
      });

      setFormData(prev => ({
        ...prev,
        customerRate: suggestedRate.toString(),
        carrierRate: carrierCost.toString()
      }));

      toast.success('AI quote generated successfully!', { id: 'ai-quote' });
    }, 2500);
  };

  const saveQuote = (isDraft = false) => {
    if (!formData.customerName || !formData.customerRate) {
      toast.error('Please provide customer name and rate');
      return;
    }

    const quoteData = {
      ...formData,
      id: `QT-${Date.now()}`,
      status: isDraft ? 'draft' : 'active',
      createdAt: new Date().toISOString()
    };

    if (isDraft) {
      toast.success('Quote saved as draft');
    } else {
      toast.success('Quote created and sent to customer');
    }

    // Reset form
    setFormData({
      customerName: '',
      contactPerson: '',
      email: '',
      phone: '',
      customerType: 'new',
      transportMode: activeMode,
      pickupAddress: '',
      deliveryAddress: '',
      pickupDate: '',
      deliveryDate: '',
      weight: '',
      dimensions: '',
      pieces: '',
      commodityType: '',
      commodityValue: '',
      equipmentType: 'dry_van',
      specialRequirements: '',
      hazmat: false,
      temperatureControl: false,
      customerRate: '',
      carrierRate: '',
      fuelSurcharge: '',
      accessorials: '',
      priority: 'standard',
      autoQuote: true,
      sendImmediately: false
    });
  };

  const getModeSpecificFields = () => {
    switch (activeMode) {
      case 'ltl':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Number of Pieces</Label>
              <Input 
                value={formData.pieces}
                onChange={(e) => handleInputChange('pieces', e.target.value)}
                placeholder="e.g., 15 pallets"
              />
            </div>
            <div>
              <Label>Freight Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">Class 50</SelectItem>
                  <SelectItem value="55">Class 55</SelectItem>
                  <SelectItem value="60">Class 60</SelectItem>
                  <SelectItem value="65">Class 65</SelectItem>
                  <SelectItem value="70">Class 70</SelectItem>
                  <SelectItem value="77.5">Class 77.5</SelectItem>
                  <SelectItem value="85">Class 85</SelectItem>
                  <SelectItem value="92.5">Class 92.5</SelectItem>
                  <SelectItem value="100">Class 100</SelectItem>
                  <SelectItem value="110">Class 110</SelectItem>
                  <SelectItem value="125">Class 125</SelectItem>
                  <SelectItem value="150">Class 150</SelectItem>
                  <SelectItem value="175">Class 175</SelectItem>
                  <SelectItem value="200">Class 200</SelectItem>
                  <SelectItem value="250">Class 250</SelectItem>
                  <SelectItem value="300">Class 300</SelectItem>
                  <SelectItem value="400">Class 400</SelectItem>
                  <SelectItem value="500">Class 500</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'auto':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Vehicle Count</Label>
              <Input 
                value={formData.pieces}
                onChange={(e) => handleInputChange('pieces', e.target.value)}
                placeholder="Number of vehicles"
              />
            </div>
            <div>
              <Label>Vehicle Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="truck">Pickup Truck</SelectItem>
                  <SelectItem value="luxury">Luxury Vehicle</SelectItem>
                  <SelectItem value="classic">Classic Car</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'intermodal':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Container Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20ft">20' Container</SelectItem>
                  <SelectItem value="40ft">40' Container</SelectItem>
                  <SelectItem value="40hc">40' High Cube</SelectItem>
                  <SelectItem value="45ft">45' Container</SelectItem>
                  <SelectItem value="53ft">53' Container</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Rail Provider Preference</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bnsf">BNSF Railway</SelectItem>
                  <SelectItem value="up">Union Pacific</SelectItem>
                  <SelectItem value="csx">CSX Transportation</SelectItem>
                  <SelectItem value="ns">Norfolk Southern</SelectItem>
                  <SelectItem value="cn">Canadian National</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">New Freight Quote</h1>
          <p className="text-muted-foreground text-lg">
            Create professional quotes with AI-powered pricing intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">AI Assistant Active</span>
          </div>
        </div>
      </div>

      {/* Transport Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Transportation Mode
          </CardTitle>
          <CardDescription>Select the primary transportation method for this shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {transportModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    activeMode === mode.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    setActiveMode(mode.id);
                    handleInputChange('transportMode', mode.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-8 w-8 ${activeMode === mode.id ? 'text-blue-600' : 'text-muted-foreground'}`} />
                      <div>
                        <div className="font-semibold">{mode.name}</div>
                        <div className="text-sm text-muted-foreground">{mode.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Quote Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Company or individual name"
                  />
                </div>
                <div>
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Select value={formData.customerType} onValueChange={(value) => handleInputChange('customerType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Customer</SelectItem>
                      <SelectItem value="existing">Existing Customer</SelectItem>
                      <SelectItem value="preferred">Preferred Customer</SelectItem>
                      <SelectItem value="enterprise">Enterprise Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="Primary contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="pickupAddress">Pickup Location *</Label>
                  <Input
                    id="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                    placeholder="Complete pickup address"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Location *</Label>
                  <Input
                    id="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    placeholder="Complete delivery address"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Load Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Load Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="weight">Weight *</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="e.g., 45,000 lbs"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="L x W x H (optional)"
                  />
                </div>
              </div>

              {getModeSpecificFields()}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="commodityType">Commodity Type</Label>
                  <Input
                    id="commodityType"
                    value={formData.commodityType}
                    onChange={(e) => handleInputChange('commodityType', e.target.value)}
                    placeholder="e.g., Electronics, Food grade"
                  />
                </div>
                <div>
                  <Label htmlFor="commodityValue">Declared Value</Label>
                  <Input
                    id="commodityValue"
                    value={formData.commodityValue}
                    onChange={(e) => handleInputChange('commodityValue', e.target.value)}
                    placeholder="$50,000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="equipmentType">Equipment Type</Label>
                <Select value={formData.equipmentType} onValueChange={(value) => handleInputChange('equipmentType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry_van">Dry Van</SelectItem>
                    <SelectItem value="refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="step_deck">Step Deck</SelectItem>
                    <SelectItem value="lowboy">Lowboy</SelectItem>
                    <SelectItem value="box_truck">Box Truck</SelectItem>
                    <SelectItem value="tanker">Tanker</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hazmat"
                    checked={formData.hazmat}
                    onCheckedChange={(checked) => handleInputChange('hazmat', checked)}
                  />
                  <Label htmlFor="hazmat" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Hazardous Materials
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="temperatureControl"
                    checked={formData.temperatureControl}
                    onCheckedChange={(checked) => handleInputChange('temperatureControl', checked)}
                  />
                  <Label htmlFor="temperatureControl">Temperature Controlled</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Appointment required, lift gate, inside delivery, etc."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.autoQuote}
                    onCheckedChange={(checked) => handleInputChange('autoQuote', checked)}
                  />
                  <div>
                    <div className="font-medium">AI-Powered Pricing</div>
                    <div className="text-sm text-muted-foreground">Generate competitive rates automatically</div>
                  </div>
                </div>
                <Button onClick={generateAIQuote} disabled={!formData.autoQuote} className="bg-blue-600">
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Quote
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="customerRate">Customer Rate *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="customerRate"
                      value={formData.customerRate}
                      onChange={(e) => handleInputChange('customerRate', e.target.value)}
                      placeholder="0.00"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="carrierRate">Carrier Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="carrierRate"
                      value={formData.carrierRate}
                      onChange={(e) => handleInputChange('carrierRate', e.target.value)}
                      placeholder="0.00"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {formData.customerRate && formData.carrierRate && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="grid gap-2 md:grid-cols-3">
                    <div>
                      <div className="text-sm font-medium text-green-800">Gross Margin</div>
                      <div className="text-xl font-bold text-green-600">
                        ${(parseFloat(formData.customerRate) - parseFloat(formData.carrierRate)).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-800">Margin %</div>
                      <div className="text-xl font-bold text-green-600">
                        {(((parseFloat(formData.customerRate) - parseFloat(formData.carrierRate)) / parseFloat(formData.carrierRate)) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-800">ROI</div>
                      <div className="text-xl font-bold text-green-600">
                        {(((parseFloat(formData.customerRate) - parseFloat(formData.carrierRate)) / parseFloat(formData.customerRate)) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fuelSurcharge">Fuel Surcharge</Label>
                  <Input
                    id="fuelSurcharge"
                    value={formData.fuelSurcharge}
                    onChange={(e) => handleInputChange('fuelSurcharge', e.target.value)}
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <Label htmlFor="accessorials">Accessorial Charges</Label>
                  <Input
                    id="accessorials"
                    value={formData.accessorials}
                    onChange={(e) => handleInputChange('accessorials', e.target.value)}
                    placeholder="Additional fees"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Actions Panel */}
        <div className="space-y-6">
          {/* AI Insights */}
          {aiSuggestions.suggestedRate > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI Market Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">${aiSuggestions.suggestedRate.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Suggested Rate</div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Confidence</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {aiSuggestions.confidence}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Position</span>
                  <Badge variant="outline">
                    {aiSuggestions.marketComparison}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Market Insights</div>
                  <div className="space-y-1">
                    {aiSuggestions.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.sendImmediately}
                  onCheckedChange={(checked) => handleInputChange('sendImmediately', checked)}
                />
                <Label>Send immediately upon creation</Label>
              </div>

              <div>
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 space-y-2">
                <Button onClick={() => saveQuote(true)} variant="outline" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                <Button onClick={() => saveQuote(false)} className="w-full bg-green-600">
                  <Send className="h-4 w-4 mr-2" />
                  Create & Send Quote
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Standard Dry Van',
                  'Refrigerated Express',
                  'Flatbed Heavy',
                  'LTL Regional'
                ].map((template) => (
                  <Button key={template} variant="ghost" className="w-full justify-start text-sm">
                    <FileText className="h-3 w-3 mr-2" />
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewQuotePage;