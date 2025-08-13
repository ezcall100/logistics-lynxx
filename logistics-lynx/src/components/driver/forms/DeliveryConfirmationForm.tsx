import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Package, MapPin, Clock, AlertTriangle, CheckCircle, Camera, Upload, Star, User, Phone, MessageCircle, Truck, Weight, Thermometer, Shield, Signature } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const DeliveryConfirmationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    loadId: 'LD-2024-001',
    customerName: 'Walmart Distribution Center',
    deliveryAddress: '1234 Commerce Dr, Detroit, MI 48201',
    scheduledTime: '2024-01-20 14:00',
    actualArrivalTime: '',
    actualDeliveryTime: '',
    recipientName: '',
    recipientTitle: '',
    recipientPhone: '',
    cargoCondition: '',
    packagesDelivered: '',
    packagesExpected: '24',
    temperatureRecorded: '',
    damageReported: false,
    damageDescription: '',
    customerComments: '',
    driverNotes: '',
    signatureRequired: true,
    photoRequired: true,
    rating: 5,
    deliveryStatus: 'completed'
  });
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Delivery Confirmed",
      description: "Delivery has been successfully recorded and customer notified.",
    });
  };

  const cargoConditions = [
    { value: 'excellent', label: 'Excellent - No issues', color: 'text-green-600' },
    { value: 'good', label: 'Good - Minor wear', color: 'text-blue-600' },
    { value: 'fair', label: 'Fair - Some damage', color: 'text-yellow-600' },
    { value: 'poor', label: 'Poor - Significant damage', color: 'text-red-600' }
  ];

  const getCurrentTime = () => {
    return new Date().toISOString().slice(0, 16);
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Form Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Delivery Confirmation
              </CardTitle>
              <CardDescription className="text-lg">
                Load ID: {formData.loadId} • {formData.customerName}
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
              <Package className="h-4 w-4 mr-2" />
              In Progress
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Information */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Delivery Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-medium">{formData.deliveryAddress}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Scheduled Delivery Time</Label>
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <p className="font-medium">{formData.scheduledTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualArrivalTime">Actual Arrival Time</Label>
                <Input
                  id="actualArrivalTime"
                  type="datetime-local"
                  value={formData.actualArrivalTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, actualArrivalTime: e.target.value }))}
                  className="h-12 text-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, actualArrivalTime: getCurrentTime() }))}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Use Current Time
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualDeliveryTime">Actual Delivery Time</Label>
                <Input
                  id="actualDeliveryTime"
                  type="datetime-local"
                  value={formData.actualDeliveryTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, actualDeliveryTime: e.target.value }))}
                  className="h-12 text-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, actualDeliveryTime: getCurrentTime() }))}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Use Current Time
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipient Information */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <span>Recipient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                  placeholder="Full name of person who received delivery"
                  className="h-12 text-lg"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientTitle">Title / Position</Label>
                <Input
                  id="recipientTitle"
                  value={formData.recipientTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientTitle: e.target.value }))}
                  placeholder="Manager, Supervisor, etc."
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Contact Phone</Label>
                <Input
                  id="recipientPhone"
                  type="tel"
                  value={formData.recipientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientPhone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  className="h-12 text-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cargo Information */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-orange-500" />
              <span>Cargo Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="packagesDelivered">Packages Delivered *</Label>
                <Input
                  id="packagesDelivered"
                  type="number"
                  value={formData.packagesDelivered}
                  onChange={(e) => setFormData(prev => ({ ...prev, packagesDelivered: e.target.value }))}
                  placeholder="0"
                  className="h-12 text-lg"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Expected Packages</Label>
                <div className="p-3 bg-gray-50 rounded-lg border h-12 flex items-center">
                  <span className="font-medium text-lg">{formData.packagesExpected}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperatureRecorded">Temperature (°F)</Label>
                <Input
                  id="temperatureRecorded"
                  type="number"
                  value={formData.temperatureRecorded}
                  onChange={(e) => setFormData(prev => ({ ...prev, temperatureRecorded: e.target.value }))}
                  placeholder="72"
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoCondition">Cargo Condition *</Label>
              <Select value={formData.cargoCondition} onValueChange={(value) => setFormData(prev => ({ ...prev, cargoCondition: value }))}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select cargo condition" />
                </SelectTrigger>
                <SelectContent>
                  {cargoConditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      <div className="flex items-center space-x-2">
                        <span className={condition.color}>{condition.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="damageReported"
                  checked={formData.damageReported}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, damageReported: !!checked }))}
                />
                <Label htmlFor="damageReported" className="text-lg font-medium">
                  Damage or issues reported
                </Label>
              </div>

              {formData.damageReported && (
                <div className="space-y-4 p-4 border-2 border-red-200 rounded-lg bg-red-50">
                  <Label htmlFor="damageDescription" className="text-lg font-medium text-red-800">
                    Describe damage or issues in detail
                  </Label>
                  <Textarea
                    id="damageDescription"
                    value={formData.damageDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, damageDescription: e.target.value }))}
                    placeholder="Provide detailed description of unknown damage, missing items, or other issues..."
                    className="min-h-32 border-red-300"
                  />
                  
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-800">Important</span>
                    </div>
                    <p className="text-red-700">
                      Photos are required when damage is reported. Customer will be notified immediately.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comments & Notes */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span>Comments & Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerComments">Customer Comments</Label>
              <Textarea
                id="customerComments"
                value={formData.customerComments}
                onChange={(e) => setFormData(prev => ({ ...prev, customerComments: e.target.value }))}
                placeholder="Any comments from the customer..."
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverNotes">Driver Notes</Label>
              <Textarea
                id="driverNotes"
                value={formData.driverNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, driverNotes: e.target.value }))}
                placeholder="Any additional notes about the delivery..."
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Documentation & Signatures */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-green-500" />
              <span>Documentation & Signatures</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium">Photo Documentation</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-600">Take delivery photos</p>
                  <p className="text-sm text-gray-500">BOL, delivered packages, recipient</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Digital Signature</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Signature className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-600">Capture signature</p>
                  <p className="text-sm text-gray-500">Recipient confirmation signature</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Documentation Requirements</span>
              </div>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Photo of delivered packages at destination</li>
                <li>• Digital signature from authorized recipient</li>
                <li>• Photo of signed Bill of Lading (BOL)</li>
                {formData.damageReported && <li className="text-red-600">• Photos of unknown damage or issues</li>}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Customer Rating */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Service Rating</span>
            </CardTitle>
            <CardDescription>
              Rate your overall delivery experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="transition-colors hover:scale-110"
                >
                  <Star
                    className={cn("h-8 w-8",
                      star <= formData.rating
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    )}
                  />
                </button>
              ))}
              <span className="ml-4 text-lg font-medium">
                {formData.rating}/5 - {formData.rating >= 4 ? 'Excellent' : formData.rating >= 3 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <Button type="button" variant="outline" className="h-12 px-8">
            Save Draft
          </Button>
          <Button type="submit" className="h-12 px-8 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-5 w-5 mr-2" />
            Confirm Delivery
          </Button>
        </div>
      </form>
    </div>
  );
};