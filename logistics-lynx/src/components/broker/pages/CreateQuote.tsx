/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  CalendarIcon,
  MapPin, 
  Truck, 
  Package, 
  DollarSign, 
  Calculator,
  Bot,
  Save,
  Send,
  FileText,
  Users,
  Clock,
  Gauge
} from 'lucide-react';

const CreateQuote = () => {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [quoteData, setQuoteData] = useState({
    customer: '',
    customerContact: '',
    equipment: '',
    weight: '',
    commodity: '',
    pickupLocation: '',
    deliveryLocation: '',
    distance: '',
    baseRate: '',
    fuelSurcharge: '',
    accessorials: '',
    totalRate: '',
    margin: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    const base = parseFloat(quoteData.baseRate) || 0;
    const fuel = parseFloat(quoteData.fuelSurcharge) || 0;
    const accessorial = parseFloat(quoteData.accessorials) || 0;
    return (base + fuel + accessorial).toFixed(2);
  };

  const equipmentTypes = [
    'Dry Van - 53ft',
    'Reefer - 53ft',
    'Flatbed - 48ft',
    'Step Deck',
    'Lowboy',
    'Container - 20ft',
    'Container - 40ft',
    'Box Truck',
    'Sprinter Van'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Quote</h1>
          <p className="text-muted-foreground">
            Build a comprehensive freight quote with AI assistance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bot className="h-4 w-4" />
            AI Assist
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Use Template
          </Button>
        </div>
      </div>

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
              <CardDescription>
                Select or add customer details for this quote
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Select value={quoteData.customer} onValueChange={(value) => handleInputChange('customer', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abc-logistics">ABC Logistics</SelectItem>
                      <SelectItem value="transport-co">Transport Co</SelectItem>
                      <SelectItem value="freight-max">FreightMax</SelectItem>
                      <SelectItem value="shipfast-llc">ShipFast LLC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input
                    id="contact"
                    placeholder="Contact name"
                    value={quoteData.customerContact}
                    onChange={(e) => handleInputChange('customerContact', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipment Details
              </CardTitle>
              <CardDescription>
                Define the freight specifications and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment Type *</Label>
                  <Select value={quoteData.equipment} onValueChange={(value) => handleInputChange('equipment', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="e.g., 45000"
                    value={quoteData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Input
                  id="commodity"
                  placeholder="Description of goods"
                  value={quoteData.commodity}
                  onChange={(e) => handleInputChange('commodity', e.target.value)}
                />
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
              <CardDescription>
                Pickup and delivery locations with scheduling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location *</Label>
                  <Input
                    id="pickup"
                    placeholder="City, State or ZIP"
                    value={quoteData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery">Delivery Location *</Label>
                  <Input
                    id="delivery"
                    placeholder="City, State or ZIP"
                    value={quoteData.deliveryLocation}
                    onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deliveryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (miles)</Label>
                  <Input
                    id="distance"
                    placeholder="Auto-calculated"
                    value={quoteData.distance}
                    onChange={(e) => handleInputChange('distance', e.target.value)}
                  />
                </div>
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
              <CardDescription>
                Configure rates and calculate total pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="baseRate">Base Rate ($)</Label>
                  <Input
                    id="baseRate"
                    placeholder="0.00"
                    value={quoteData.baseRate}
                    onChange={(e) => handleInputChange('baseRate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelSurcharge">Fuel Surcharge ($)</Label>
                  <Input
                    id="fuelSurcharge"
                    placeholder="0.00"
                    value={quoteData.fuelSurcharge}
                    onChange={(e) => handleInputChange('fuelSurcharge', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accessorials">Accessorials ($)</Label>
                  <Input
                    id="accessorials"
                    placeholder="0.00"
                    value={quoteData.accessorials}
                    onChange={(e) => handleInputChange('accessorials', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Target Margin (%)</Label>
                  <Input
                    id="margin"
                    placeholder="15"
                    value={quoteData.margin}
                    onChange={(e) => handleInputChange('margin', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center p-4 bg-accent/50 rounded-lg">
                <span className="text-lg font-semibold">Total Quote Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  ${calculateTotal()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes & Requirements</Label>
                <Textarea
                  id="notes"
                  placeholder="Special instructions, requirements, or notes..."
                  rows={4}
                  value={quoteData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quote Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Quote Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quote ID:</span>
                  <Badge variant="outline">Q-2024-NEW</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge variant="outline">Draft</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Created:</span>
                  <span className="text-muted-foreground">Just now</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Rate:</span>
                  <span>${quoteData.baseRate || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fuel Surcharge:</span>
                  <span>${quoteData.fuelSurcharge || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accessorials:</span>
                  <span>${quoteData.accessorials || '0.00'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Market Rate</span>
                </div>
                <p className="text-sm text-blue-700">
                  Similar lanes average $2,400-$2,800
                </p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Transit Time</span>
                </div>
                <p className="text-sm text-green-700">
                  Recommended: 2-3 business days
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                Get More AI Insights
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Quote
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Preview PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;