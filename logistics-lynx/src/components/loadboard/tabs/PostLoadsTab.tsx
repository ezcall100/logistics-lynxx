/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, DollarSign, Calendar, Package, Truck, Bot } from 'lucide-react';

export const PostLoadsTab: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    pickupDate: '2024-06-20',
    deliveryDate: '2024-06-22',
    weight: '45000',
    length: '48',
    trailerType: 'dry-van',
    rate: '2500',
    commodity: 'Electronics',
    specialInstructions: 'Handle with care - fragile items'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✨ Load Posted Successfully",
      description: "AI optimization has enhanced your load posting for maximum visibility.",
    });
  };

  const handleAIOptimize = () => {
    toast({
      title: "🤖 AI Optimization Applied",
      description: "Rate adjusted to $2,750 based on market analysis and route optimization.",
    });
    setFormData(prev => ({ ...prev, rate: '2750' }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-lg border-border/60">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Post New Load
          </CardTitle>
          <CardDescription>
            Create a new load posting with AI-powered optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Origin
                </Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Origin city, state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Destination city, state"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Pickup Date
                </Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Delivery Date
                </Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="Weight in pounds"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (ft)</Label>
                <Input
                  id="length"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  placeholder="Length in feet"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trailerType" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Trailer Type
                </Label>
                <Select value={formData.trailerType} onValueChange={(value) => handleInputChange('trailerType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-van">Dry Van</SelectItem>
                    <SelectItem value="reefer">Reefer</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="step-deck">Step Deck</SelectItem>
                    <SelectItem value="lowboy">Lowboy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Rate ($)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="rate"
                    value={formData.rate}
                    onChange={(e) => handleInputChange('rate', e.target.value)}
                    placeholder="Total rate"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleAIOptimize}>
                    <Bot className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Input
                  id="commodity"
                  value={formData.commodity}
                  onChange={(e) => handleInputChange('commodity', e.target.value)}
                  placeholder="What's being shipped"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special handling requirements..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Post Load
              </Button>
              <Button type="button" variant="outline" className="px-6 h-12">
                Save Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="shadow-lg border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Market Analysis</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Chicago to Houston corridor is showing high demand. Recommended rate: $2.75/mile
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Route Optimization</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Optimal route: I-55 S → I-44 W → I-35 S. Distance: 925 miles, Est. time: 14h 30m
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Weather Alert</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Possible delays in Oklahoma due to storm system. Consider backup route.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-border/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Load #LB-2024-001</p>
                  <p className="text-xs text-muted-foreground">Chicago → Miami</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Booked</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Load #LB-2024-002</p>
                  <p className="text-xs text-muted-foreground">Detroit → Atlanta</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
