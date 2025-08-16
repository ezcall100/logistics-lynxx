/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package,
  MapPin,
  Calendar,
  Truck,
  DollarSign,
  FileText,
  Plus,
  Search,
  Calculator,
  Clock,
  User,
  Building2,
  Route,
  Shield,
  Bell,
  Save,
  Send,
  Copy,
  CheckCircle
} from 'lucide-react';

const CreateShipmentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shipmentType: '',
    customer: '',
    commodity: '',
    weight: '',
    dimensions: '',
    pickupDate: '',
    deliveryDate: '',
    origin: '',
    destination: '',
    carrier: '',
    rate: '',
    equipment: '',
    specialInstructions: ''
  });

  const steps = [
    { number: 1, title: 'Shipment Details', icon: Package },
    { number: 2, title: 'Locations & Dates', icon: MapPin },
    { number: 3, title: 'Carrier & Pricing', icon: Truck },
    { number: 4, title: 'Documentation', icon: FileText },
    { number: 5, title: 'Review & Submit', icon: Send }
  ];

  const equipmentTypes = [
    'Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Lowboy', 'Tanker', 'Box Truck', 'Other'
  ];

  const shipmentTypes = [
    'FTL (Full Truckload)', 'LTL (Less Than Truckload)', 'Expedited', 'White Glove', 'Temperature Controlled'
  ];

  const customers = [
    'ABC Manufacturing', 'XYZ Logistics', 'Global Supply Co', 'Metro Distribution', 'Prime Industries'
  ];

  const carriers = [
    'Swift Transport', 'Desert Express', 'Mountain Freight', 'Coastal Carriers', 'Highway Heroes'
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Information</CardTitle>
                <CardDescription>Basic details about your shipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shipmentType">Shipment Type</Label>
                    <Select value={formData.shipmentType} onValueChange={(value) => setFormData({...formData, shipmentType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {shipmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select value={formData.customer} onValueChange={(value) => setFormData({...formData, customer: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity Description</Label>
                  <Input 
                    id="commodity"
                    placeholder="e.g., Electronics, Food Products, Machinery"
                    value={formData.commodity}
                    onChange={(e) => setFormData({...formData, commodity: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input 
                      id="weight"
                      type="number"
                      placeholder="e.g., 25000"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
                    <Input 
                      id="dimensions"
                      placeholder="e.g., 48×8.5×9.5"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipment Type</Label>
                    <Select value={formData.equipment} onValueChange={(value) => setFormData({...formData, equipment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((equipment) => (
                          <SelectItem key={equipment} value={equipment}>{equipment}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Requirements</CardTitle>
                <CardDescription>Additional services and handling requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hazmat" />
                    <Label htmlFor="hazmat">Hazmat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="oversized" />
                    <Label htmlFor="oversized">Oversized</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="expedited" />
                    <Label htmlFor="expedited">Expedited</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="liftgate" />
                    <Label htmlFor="liftgate">Liftgate Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="appointment" />
                    <Label htmlFor="appointment">Appointment Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inside" />
                    <Label htmlFor="inside">Inside Delivery</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Information</CardTitle>
                <CardDescription>Origin location and pickup details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Pickup Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="origin"
                      placeholder="Enter pickup address or city, state"
                      className="pl-10"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input 
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anytime">Anytime</SelectItem>
                        <SelectItem value="am">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="pm">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="appointment">By Appointment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>Destination location and delivery details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Delivery Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="destination"
                      placeholder="Enter delivery address or city, state"
                      className="pl-10"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input 
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime">Delivery Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anytime">Anytime</SelectItem>
                        <SelectItem value="am">Morning (8AM-12PM)</SelectItem>
                        <SelectItem value="pm">Afternoon (12PM-5PM)</SelectItem>
                        <SelectItem value="appointment">By Appointment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Optimization</CardTitle>
                <CardDescription>AI-powered route suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Route className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Recommended Route</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    Distance: 1,247 miles | Estimated Transit: 2.1 days
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Alternative Routes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Carrier Selection</CardTitle>
                <CardDescription>Choose or find a carrier for this shipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carrier">Select Carrier</Label>
                    <Select value={formData.carrier} onValueChange={(value) => setFormData({...formData, carrier: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        {carriers.map((carrier) => (
                          <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>AI Carrier Matching</Label>
                    <Button variant="outline" className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Find Best Match
                    </Button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Top Carrier Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Swift Transport</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">98% On-Time</Badge>
                        <span className="text-green-700">$2,450</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Mountain Freight</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">95% On-Time</Badge>
                        <span className="text-green-700">$2,380</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Rates</CardTitle>
                <CardDescription>Set rates and calculate pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerRate">Customer Rate</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="customerRate"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carrierRate">Carrier Rate</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="carrierRate"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        value={formData.rate}
                        onChange={(e) => setFormData({...formData, rate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Margin</Label>
                    <div className="p-2 bg-gray-50 rounded border text-center font-medium">
                      18.5%
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calculator className="h-4 w-4 mr-2" />
                    Rate Calculator
                  </Button>
                  <Button variant="outline" size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Market Rates
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Accessorial Charges</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fuel Surcharge</span>
                      <Input className="w-20 h-8" placeholder="$0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Detention</span>
                      <Input className="w-20 h-8" placeholder="$0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Layover</span>
                      <Input className="w-20 h-8" placeholder="$0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other</span>
                      <Input className="w-20 h-8" placeholder="$0" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documentation</CardTitle>
                <CardDescription>Upload and manage shipment documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Bill of Lading</p>
                    <p className="text-xs text-muted-foreground mb-3">PDF, DOC up to 10MB</p>
                    <Button size="sm" variant="outline">Upload BOL</Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Rate Confirmation</p>
                    <p className="text-xs text-muted-foreground mb-3">PDF, DOC up to 10MB</p>
                    <Button size="sm" variant="outline">Upload RC</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea 
                    id="instructions"
                    placeholder="Enter unknown special handling instructions, delivery notes, or requirements..."
                    className="h-32"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Auto-Generated Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rate Confirmation</span>
                      <Button size="sm" variant="outline">Generate</Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Carrier Packet</span>
                      <Button size="sm" variant="outline">Generate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications & Alerts</CardTitle>
                <CardDescription>Configure shipment tracking and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="customerNotify" defaultChecked />
                      <Label htmlFor="customerNotify">Notify Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="carrierNotify" defaultChecked />
                      <Label htmlFor="carrierNotify">Notify Carrier</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="statusAlerts" defaultChecked />
                      <Label htmlFor="statusAlerts">Status Update Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deliveryAlert" defaultChecked />
                      <Label htmlFor="deliveryAlert">Delivery Confirmation</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Summary</CardTitle>
                <CardDescription>Review all details before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Shipment Details</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Type:</span> {formData.shipmentType || 'Not specified'}</p>
                      <p><span className="font-medium">Customer:</span> {formData.customer || 'Not specified'}</p>
                      <p><span className="font-medium">Commodity:</span> {formData.commodity || 'Not specified'}</p>
                      <p><span className="font-medium">Weight:</span> {formData.weight ? `${formData.weight} lbs` : 'Not specified'}</p>
                      <p><span className="font-medium">Equipment:</span> {formData.equipment || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Route Information</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Origin:</span> {formData.origin || 'Not specified'}</p>
                      <p><span className="font-medium">Destination:</span> {formData.destination || 'Not specified'}</p>
                      <p><span className="font-medium">Pickup Date:</span> {formData.pickupDate || 'Not specified'}</p>
                      <p><span className="font-medium">Delivery Date:</span> {formData.deliveryDate || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Carrier & Pricing</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Carrier:</span> {formData.carrier || 'Not assigned'}</p>
                      <p><span className="font-medium">Rate:</span> {formData.rate ? `$${formData.rate}` : 'Not specified'}</p>
                      <p><span className="font-medium">Estimated Margin:</span> 18.5%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Special Instructions</h4>
                    <div className="text-sm">
                      <p>{formData.specialInstructions || 'None specified'}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Shipment
                    </Button>
                    <Button variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <h1 className="text-3xl font-bold tracking-tight">Create New Shipment</h1>
          <p className="text-muted-foreground">
            Set up a new shipment with all details and documentation
          </p>
        </div>
        <Button variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
        <Button 
          onClick={nextStep}
          disabled={currentStep === steps.length}
        >
          {currentStep === steps.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default CreateShipmentPage;