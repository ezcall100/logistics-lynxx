/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  MapPin, 
  Calendar, 
  Truck, 
  DollarSign, 
  Clock,
  Plus,
  Save,
  Bot,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewShipmentTab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customer: 'Walmart Distribution',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    pickupDate: '2024-01-20',
    deliveryDate: '2024-01-22',
    weight: '40000',
    dimensions: '48x40x72',
    loadType: 'dry-van',
    priority: 'normal',
    value: '85000',
    specialInstructions: 'Handle with care - fragile electronics',
    contactName: 'John Smith',
    contactPhone: '+1 (555) 123-4567',
    contactEmail: 'john.smith@walmart.com'
  });

  const [aiRecommendations, setAiRecommendations] = useState({
    estimatedCost: 2850,
    recommendedCarrier: 'Swift Transportation',
    estimatedDelivery: '48 hours',
    routeOptimization: 'I-10 W → I-17 N (430 miles)',
    confidenceScore: 94
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAIOptimize = () => {
    // Simulate AI optimization
    toast({
      title: "AI Optimization Complete",
      description: "Route and carrier recommendations have been updated based on current market conditions.",
    });
    
    setAiRecommendations(prev => ({
      ...prev,
      estimatedCost: Math.floor(Math.random() * 1000) + 2500,
      confidenceScore: Math.floor(Math.random() * 10) + 90
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Shipment Created Successfully",
      description: "Your shipment has been created and is now available for carrier assignment.",
    });

    console.log('Creating shipment with data:', formData);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your shipment draft has been saved. You can continue editing later.",
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations Card */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                AI Route Optimization
              </CardTitle>
            </div>
            <Button onClick={handleAIOptimize} variant="outline" size="sm" className="gap-2">
              <Zap className="h-4 w-4" />
              Re-optimize
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                ${aiRecommendations.estimatedCost}
              </div>
              <div className="text-sm text-muted-foreground">Estimated Cost</div>
            </div>
            
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-bold">{aiRecommendations.recommendedCarrier}</div>
              <div className="text-sm text-muted-foreground">Recommended Carrier</div>
            </div>
            
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold">{aiRecommendations.estimatedDelivery}</div>
              <div className="text-sm text-muted-foreground">Delivery Time</div>
            </div>
            
            <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-lg border">
              <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-sm font-bold">{aiRecommendations.routeOptimization}</div>
              <div className="text-sm text-muted-foreground">Optimal Route</div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {aiRecommendations.confidenceScore}% Confidence Score
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleInputChange('customer', e.target.value)}
                  placeholder="Customer name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Weight in pounds"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (LxWxH)</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="Length x Width x Height"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loadType">Load Type</Label>
                  <Select value={formData.loadType} onValueChange={(value) => handleInputChange('loadType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry-van">Dry Van</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                      <SelectItem value="container">Container</SelectItem>
                      <SelectItem value="tanker">Tanker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Shipment Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder="Total shipment value"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special handling instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Route & Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Pickup location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Delivery location"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Contact person name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" onClick={handleSaveDraft} className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Shipment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewShipmentTab;
