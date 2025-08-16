/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Send, 
  Calculator, 
  Sparkles, 
  MapPin, 
  Package, 
  Calendar,
  Truck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteFormData {
  customer: string;
  contactEmail: string;
  contactPhone: string;
  pickupDate: string;
  deliveryDate: string;
  origin: string;
  destination: string;
  loadType: string;
  weight: string;
  dimensions: string;
  specialInstructions: string;
  baseRate: string;
  fuelSurcharge: string;
  additionalCharges: string;
  totalAmount: string;
  validUntil: string;
}

const NewQuoteTab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteFormData>({
    customer: 'Walmart Distribution Center',
    contactEmail: 'logistics@walmart.com',
    contactPhone: '(555) 123-4567',
    pickupDate: '2024-01-20',
    deliveryDate: '2024-01-22',
    origin: 'Los Angeles, CA 90210',
    destination: 'Phoenix, AZ 85001',
    loadType: 'dry-van',
    weight: '42000',
    dimensions: '53\' x 8.5\' x 9\'',
    specialInstructions: 'Handle with care - fragile electronics inside. Requires temperature monitoring.',
    baseRate: '2400',
    fuelSurcharge: '320',
    additionalCharges: '150',
    totalAmount: '2870',
    validUntil: '2024-01-27'
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    suggestedRate: 2650,
    confidence: 92,
    marketRate: 2750,
    savings: 100
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-calculate total when base rates change
    if (field === 'baseRate' || field === 'fuelSurcharge' || field === 'additionalCharges') {
      const base = parseFloat(field === 'baseRate' ? value : formData.baseRate) || 0;
      const fuel = parseFloat(field === 'fuelSurcharge' ? value : formData.fuelSurcharge) || 0;
      const additional = parseFloat(field === 'additionalCharges' ? value : formData.additionalCharges) || 0;
      const total = (base + fuel + additional).toString();
      
      setFormData(prev => ({
        ...prev,
        totalAmount: total
      }));
    }
  };

  const generateAIQuote = async () => {
    setIsGeneratingAI(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiRate = Math.floor(Math.random() * 500) + 2400;
      const confidence = Math.floor(Math.random() * 20) + 80;
      
      setAiSuggestions({
        suggestedRate: aiRate,
        confidence: confidence,
        marketRate: aiRate + 100,
        savings: 100
      });
      
      // Update form with AI suggestion
      handleInputChange('baseRate', aiRate.toString());
      
      setIsGeneratingAI(false);
      
      toast({
        title: "AI Quote Generated",
        description: `Generated competitive quote with ${confidence}% confidence`,
      });
    }, 2000);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    toast({
      title: "Draft Saved",
      description: "Quote has been saved as draft",
    });
  };

  const handleSendQuote = () => {
    console.log('Sending quote:', formData);
    toast({
      title: "Quote Sent",
      description: "Quote has been sent to the customer",
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions Card */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">AI-Powered Quote Assistant</CardTitle>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {aiSuggestions.confidence}% Confidence
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${aiSuggestions.suggestedRate.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">AI Suggested Rate</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${aiSuggestions.marketRate.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Market Average</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                ${aiSuggestions.savings}
              </div>
              <div className="text-sm text-muted-foreground">Customer Savings</div>
            </div>
          </div>
          <Button 
            onClick={generateAIQuote} 
            disabled={isGeneratingAI}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            {isGeneratingAI ? 'Generating AI Quote...' : 'Generate AI Quote'}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div>
              <Label htmlFor="loadType">Load Type</Label>
              <Select value={formData.loadType} onValueChange={(value) => handleInputChange('loadType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select load type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry-van">Dry Van</SelectItem>
                  <SelectItem value="refrigerated">Refrigerated</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="step-deck">Step Deck</SelectItem>
                  <SelectItem value="lowboy">Lowboy</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="40000"
                />
              </div>
              <div>
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  placeholder="53' x 8.5' x 9'"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="origin">Origin Address</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                placeholder="1234 Main St, City, State ZIP"
              />
            </div>
            
            <div>
              <Label htmlFor="destination">Destination Address</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="5678 Oak Ave, City, State ZIP"
              />
            </div>
            
            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special handling requirements..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Pricing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="baseRate">Base Rate ($)</Label>
              <Input
                id="baseRate"
                type="number"
                value={formData.baseRate}
                onChange={(e) => handleInputChange('baseRate', e.target.value)}
                placeholder="2000"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fuelSurcharge">Fuel Surcharge ($)</Label>
                <Input
                  id="fuelSurcharge"
                  type="number"
                  value={formData.fuelSurcharge}
                  onChange={(e) => handleInputChange('fuelSurcharge', e.target.value)}
                  placeholder="200"
                />
              </div>
              <div>
                <Label htmlFor="additionalCharges">Additional Charges ($)</Label>
                <Input
                  id="additionalCharges"
                  type="number"
                  value={formData.additionalCharges}
                  onChange={(e) => handleInputChange('additionalCharges', e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-green-600">${parseFloat(formData.totalAmount || '0').toLocaleString()}</span>
            </div>
            
            <div>
              <Label htmlFor="validUntil">Quote Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => handleInputChange('validUntil', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save as Draft
            </Button>
            <Button onClick={handleSendQuote} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Quote to Customer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewQuoteTab;
