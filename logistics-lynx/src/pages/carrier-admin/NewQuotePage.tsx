/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Plus, X, ArrowLeft, Save, Send, Calculator } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface QuoteFormData {
  customer: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  transportMode: string;
  equipmentType: string;
  originCity: string;
  originState: string;
  originZip: string;
  destinationCity: string;
  destinationState: string;
  destinationZip: string;
  commodity: string;
  weight: string;
  dimensions: string;
  pickupDate: Date | undefined;
  deliveryDate: Date | undefined;
  specialRequirements: string;
  baseRate: string;
  fuelSurcharge: string;
  accessorials: string[];
  notes: string;
  validityDays: string;
  priority: string;
}

const NewQuotePage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('customer');
  const [newAccessorial, setNewAccessorial] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<QuoteFormData>({
    customer: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    transportMode: '',
    equipmentType: '',
    originCity: '',
    originState: '',
    originZip: '',
    destinationCity: '',
    destinationState: '',
    destinationZip: '',
    commodity: '',
    weight: '',
    dimensions: '',
    pickupDate: undefined,
    deliveryDate: undefined,
    specialRequirements: '',
    baseRate: '',
    fuelSurcharge: '',
    accessorials: [],
    notes: '',
    validityDays: '7',
    priority: 'medium'
  });

  const transportModes = [
    'Truckload', 'LTL', 'Intermodal', 'Drayage', 'Auto Transport', 'Heavy Haul', 'Expedited', 'Refrigerated'
  ];

  const equipmentTypes = {
    'Truckload': ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Lowboy'],
    'LTL': ['Standard', 'Temperature Controlled', 'Hazmat'],
    'Intermodal': ['53\' Container', '40\' Container', '20\' Container'],
    'Drayage': ['Chassis', 'Bobtail'],
    'Auto Transport': ['Car Carrier', 'Enclosed Trailer'],
    'Heavy Haul': ['Multi-Axle', 'RGN', 'Schnabel'],
    'Expedited': ['Sprinter Van', 'Straight Truck', 'Tractor Trailer'],
    'Refrigerated': ['Reefer Van', 'Reefer Trailer']
  };

  const handleInputChange = (field: keyof QuoteFormData, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate delivery date when pickup date is set
    if (field === 'pickupDate' && value) {
      const deliveryDate = new Date(value);
      deliveryDate.setDate(deliveryDate.getDate() + 2); // Default 2 days transit
      setFormData(prev => ({
        ...prev,
        deliveryDate
      }));
    }
  };

  const addAccessorial = () => {
    if (newAccessorial.trim() && !formData.accessorials.includes(newAccessorial.trim())) {
      setFormData(prev => ({
        ...prev,
        accessorials: [...prev.accessorials, newAccessorial.trim()]
      }));
      setNewAccessorial('');
    }
  };

  const removeAccessorial = (accessorial: string) => {
    setFormData(prev => ({
      ...prev,
      accessorials: prev.accessorials.filter(a => a !== accessorial)
    }));
  };

  const calculateTotal = () => {
    const base = parseFloat(formData.baseRate) || 0;
    const fuel = parseFloat(formData.fuelSurcharge) || 0;
    return base + fuel;
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Quote saved as draft');
      navigate('/carrier-admin/quotes');
    } catch (error) {
      toast.error('Failed to save quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendQuote = async () => {
    setIsSubmitting(true);
    try {
      // Validation
      if (!formData.customer || !formData.contactEmail || !formData.transportMode || !formData.baseRate) {
        throw new Error('Please fill in all required fields');
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Quote sent to customer');
      navigate('/carrier-admin/quotes');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabsData = [
    { id: 'customer', label: 'Customer Info', icon: '👤' },
    { id: 'shipment', label: 'Shipment Details', icon: '📦' },
    { id: 'route', label: 'Route & Timing', icon: '🚛' },
    { id: 'pricing', label: 'Pricing', icon: '💰' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/carrier-admin/quotes')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Quote</h1>
            <p className="text-muted-foreground">Create a new shipping quote for your customer</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSendQuote} disabled={isSubmitting}>
            <Send className="h-4 w-4 mr-2" />
            Send Quote
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {tabsData.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                  currentTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {tab.icon}
                </div>
                <span className={cn(
                  "ml-2 text-sm font-medium",
                  currentTab === tab.id ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
                {index < tabsData.length - 1 && (
                  <div className="w-12 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              <span>{tab.icon}</span>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Customer Information */}
        <TabsContent value="customer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter customer details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer Company *</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => handleInputChange('customer', e.target.value)}
                    placeholder="e.g., Walmart Inc."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="john.smith@walmart.com"
                    required
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
        </TabsContent>

        {/* Shipment Details */}
        <TabsContent value="shipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Details</CardTitle>
              <CardDescription>Specify transportation mode and cargo information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transportMode">Transportation Mode *</Label>
                  <Select value={formData.transportMode} onValueChange={(value) => handleInputChange('transportMode', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.map(mode => (
                        <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipmentType">Equipment Type *</Label>
                  <Select 
                    value={formData.equipmentType} 
                    onValueChange={(value) => handleInputChange('equipmentType', value)}
                    disabled={!formData.transportMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.transportMode && equipmentTypes[formData.transportMode as keyof typeof equipmentTypes]?.map(equipment => (
                        <SelectItem key={equipment} value={equipment}>{equipment}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="commodity">Commodity</Label>
                  <Input
                    id="commodity"
                    value={formData.commodity}
                    onChange={(e) => handleInputChange('commodity', e.target.value)}
                    placeholder="General Merchandise"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="45,000 lbs"
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

              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Any special handling, temperature requirements, or other notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Route & Timing */}
        <TabsContent value="route" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route & Timing</CardTitle>
              <CardDescription>Specify pickup and delivery locations and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Origin */}
              <div>
                <h3 className="text-lg font-medium mb-3">Origin</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="originCity">City *</Label>
                    <Input
                      id="originCity"
                      value={formData.originCity}
                      onChange={(e) => handleInputChange('originCity', e.target.value)}
                      placeholder="Chicago"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originState">State *</Label>
                    <Input
                      id="originState"
                      value={formData.originState}
                      onChange={(e) => handleInputChange('originState', e.target.value)}
                      placeholder="IL"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originZip">ZIP Code</Label>
                    <Input
                      id="originZip"
                      value={formData.originZip}
                      onChange={(e) => handleInputChange('originZip', e.target.value)}
                      placeholder="60601"
                    />
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div>
                <h3 className="text-lg font-medium mb-3">Destination</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="destinationCity">City *</Label>
                    <Input
                      id="destinationCity"
                      value={formData.destinationCity}
                      onChange={(e) => handleInputChange('destinationCity', e.target.value)}
                      placeholder="Houston"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="destinationState">State *</Label>
                    <Input
                      id="destinationState"
                      value={formData.destinationState}
                      onChange={(e) => handleInputChange('destinationState', e.target.value)}
                      placeholder="TX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="destinationZip">ZIP Code</Label>
                    <Input
                      id="destinationZip"
                      value={formData.destinationZip}
                      onChange={(e) => handleInputChange('destinationZip', e.target.value)}
                      placeholder="77001"
                    />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate ? format(formData.pickupDate, "PPP") : "Select pickup date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate}
                        onSelect={(date) => handleInputChange('pickupDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.deliveryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Select delivery date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.deliveryDate}
                        onSelect={(date) => handleInputChange('deliveryDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>Set rates and additional charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="baseRate">Base Rate * ($)</Label>
                  <Input
                    id="baseRate"
                    type="number"
                    value={formData.baseRate}
                    onChange={(e) => handleInputChange('baseRate', e.target.value)}
                    placeholder="3115"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fuelSurcharge">Fuel Surcharge ($)</Label>
                  <Input
                    id="fuelSurcharge"
                    type="number"
                    value={formData.fuelSurcharge}
                    onChange={(e) => handleInputChange('fuelSurcharge', e.target.value)}
                    placeholder="187"
                  />
                </div>
                <div>
                  <Label htmlFor="validityDays">Quote Valid (Days)</Label>
                  <Input
                    id="validityDays"
                    type="number"
                    value={formData.validityDays}
                    onChange={(e) => handleInputChange('validityDays', e.target.value)}
                    placeholder="7"
                  />
                </div>
              </div>

              {/* Accessorials */}
              <div>
                <Label>Accessorials</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newAccessorial}
                      onChange={(e) => setNewAccessorial(e.target.value)}
                      placeholder="Add accessorial (e.g., Detention, Fuel Surcharge)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccessorial())}
                    />
                    <Button type="button" onClick={addAccessorial} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.accessorials.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.accessorials.map((accessorial, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {accessorial}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeAccessorial(accessorial)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Total Quote Amount:
                  </span>
                  <span className="text-2xl text-primary">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional terms, conditions, or notes for this quote..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = tabsData.findIndex(tab => tab.id === currentTab);
            if (currentIndex > 0) {
              setCurrentTab(tabsData[currentIndex - 1].id);
            }
          }}
          disabled={currentTab === 'customer'}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            const currentIndex = tabsData.findIndex(tab => tab.id === currentTab);
            if (currentIndex < tabsData.length - 1) {
              setCurrentTab(tabsData[currentIndex + 1].id);
            }
          }}
          disabled={currentTab === 'pricing'}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NewQuotePage;