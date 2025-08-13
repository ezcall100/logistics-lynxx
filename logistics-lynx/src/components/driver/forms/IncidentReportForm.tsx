import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Clock, Fuel, MapPin, Phone, Wrench, Upload, Star, CheckCircle, XCircle, Calendar, Camera, Navigation, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const IncidentReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    incidentType: '',
    severity: '',
    dateTime: '',
    location: '',
    city: '',
    state: '',
    zipCode: '',
    weatherConditions: '',
    roadConditions: '',
    description: '',
    immediateActions: '',
    injuriesReported: false,
    injuryDetails: '',
    propertyDamage: false,
    damageDetails: '',
    estimatedDamage: '',
    otherVehiclesInvolved: false,
    otherVehicleDetails: '',
    witnessPresent: false,
    witnessInfo: '',
    policeReportFiled: false,
    policeReportNumber: '',
    insuranceNotified: false,
    emergencyServicesContacted: false,
    towingRequired: false,
    driverName: '',
    driverLicense: '',
    vehicleId: '',
    loadId: '',
    preventability: '',
    followUpRequired: false,
    followUpDetails: ''
  });
  
  const { toast } = useToast();

  const incidentTypes = [
    { value: 'accident', label: 'Vehicle Accident', severity: 'high' },
    { value: 'breakdown', label: 'Vehicle Breakdown', severity: 'medium' },
    { value: 'cargo_damage', label: 'Cargo Damage', severity: 'medium' },
    { value: 'theft', label: 'Theft/Security Issue', severity: 'high' },
    { value: 'injury', label: 'Personal Injury', severity: 'high' },
    { value: 'violation', label: 'Traffic Violation', severity: 'medium' },
    { value: 'near_miss', label: 'Near Miss', severity: 'low' },
    { value: 'customer_complaint', label: 'Customer Complaint', severity: 'low' },
    { value: 'environmental', label: 'Environmental Spill', severity: 'high' },
    { value: 'other', label: 'Other Incident', severity: 'medium' }
  ];

  const severityLevels = [
    { value: 'critical', label: 'Critical - Immediate Action Required', color: 'text-red-600' },
    { value: 'high', label: 'High - Urgent Response Needed', color: 'text-orange-600' },
    { value: 'medium', label: 'Medium - Requires Attention', color: 'text-yellow-600' },
    { value: 'low', label: 'Low - For Documentation', color: 'text-green-600' }
  ];

  const weatherConditions = [
    'Clear/Sunny', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Heavy Rain',
    'Drizzle', 'Snow', 'Ice/Sleet', 'Fog', 'Wind', 'Storm'
  ];

  const roadConditions = [
    'Dry', 'Wet', 'Icy', 'Snow Covered', 'Under Construction',
    'Poor Visibility', 'Heavy Traffic', 'Road Debris'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Incident Report Submitted",
      description: "Report has been submitted and relevant parties have been notified.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 16);
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Form Header */}
      <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <span>Incident Report</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Report unknown incidents, accidents, or safety concerns immediately
              </CardDescription>
            </div>
            <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">
              Priority Report
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Incident Classification */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Incident Classification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="incidentType">Type of Incident *</Label>
                <Select value={formData.incidentType} onValueChange={(value) => setFormData(prev => ({ ...prev, incidentType: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{type.label}</span>
                          <Badge className={cn("ml-2 text-xs", getSeverityColor(type.severity))}>
                            {type.severity}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <span className={level.color}>{level.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.severity === 'critical' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-800">Critical Incident Alert</span>
                </div>
                <p className="text-red-700 mb-4">
                  This is a critical incident. Emergency protocols have been activated.
                  Safety management and dispatch have been automatically notified.
                </p>
                <div className="flex space-x-2">
                  <Button type="button" variant="destructive" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    Share Location
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date, Time & Location */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Date, Time & Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateTime">Date & Time of Incident *</Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateTime: e.target.value }))}
                  className="h-12 text-lg"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, dateTime: getCurrentDateTime() }))}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Use Current Time
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Exact Location/Address *</Label>
                <Textarea
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Street address, mile marker, intersection, etc."
                  className="min-h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City name"
                  className="h-12 text-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    className="h-12 text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="ZIP"
                    className="h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Conditions */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Environmental Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weatherConditions">Weather Conditions</Label>
                <Select value={formData.weatherConditions} onValueChange={(value) => setFormData(prev => ({ ...prev, weatherConditions: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherConditions.map((weather) => (
                      <SelectItem key={weather} value={weather.toLowerCase().replace(/\s+/g, '_')}>
                        {weather}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roadConditions">Road Conditions</Label>
                <Select value={formData.roadConditions} onValueChange={(value) => setFormData(prev => ({ ...prev, roadConditions: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select road conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    {roadConditions.map((condition) => (
                      <SelectItem key={condition} value={condition.toLowerCase().replace(/\s+/g, '_')}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Details */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <span>Incident Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of what happened, including sequence of events..."
                className="min-h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="immediateActions">Immediate Actions Taken</Label>
              <Textarea
                id="immediateActions"
                value={formData.immediateActions}
                onChange={(e) => setFormData(prev => ({ ...prev, immediateActions: e.target.value }))}
                placeholder="What actions were taken immediately after the incident..."
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Damage & Injuries */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-orange-500" />
              <span>Damage & Injuries</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="injuriesReported"
                  checked={formData.injuriesReported}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, injuriesReported: !!checked }))}
                />
                <Label htmlFor="injuriesReported" className="text-lg font-medium">
                  Injuries reported
                </Label>
              </div>

              {formData.injuriesReported && (
                <div className="space-y-4 p-4 border-2 border-red-200 rounded-lg bg-red-50">
                  <Label htmlFor="injuryDetails" className="text-lg font-medium text-red-800">
                    Describe injuries in detail
                  </Label>
                  <Textarea
                    id="injuryDetails"
                    value={formData.injuryDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, injuryDetails: e.target.value }))}
                    placeholder="Detail all injuries, medical attention provided, emergency services contacted..."
                    className="min-h-24 border-red-300"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="propertyDamage"
                  checked={formData.propertyDamage}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, propertyDamage: !!checked }))}
                />
                <Label htmlFor="propertyDamage" className="text-lg font-medium">
                  Property damage reported
                </Label>
              </div>

              {formData.propertyDamage && (
                <div className="space-y-4 p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="damageDetails" className="text-lg font-medium text-yellow-800">
                        Damage Description
                      </Label>
                      <Textarea
                        id="damageDetails"
                        value={formData.damageDetails}
                        onChange={(e) => setFormData(prev => ({ ...prev, damageDetails: e.target.value }))}
                        placeholder="Describe all property damage..."
                        className="min-h-24 border-yellow-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedDamage" className="text-lg font-medium text-yellow-800">
                        Estimated Damage Cost
                      </Label>
                      <Input
                        id="estimatedDamage"
                        type="number"
                        value={formData.estimatedDamage}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimatedDamage: e.target.value }))}
                        placeholder="0.00"
                        className="h-12 text-lg border-yellow-300"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-500" />
              <span>Additional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="otherVehiclesInvolved"
                    checked={formData.otherVehiclesInvolved}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, otherVehiclesInvolved: !!checked }))}
                  />
                  <Label htmlFor="otherVehiclesInvolved" className="font-medium">
                    Other vehicles involved
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="witnessPresent"
                    checked={formData.witnessPresent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, witnessPresent: !!checked }))}
                  />
                  <Label htmlFor="witnessPresent" className="font-medium">
                    Witnesses present
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="policeReportFiled"
                    checked={formData.policeReportFiled}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, policeReportFiled: !!checked }))}
                  />
                  <Label htmlFor="policeReportFiled" className="font-medium">
                    Police report filed
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergencyServicesContacted"
                    checked={formData.emergencyServicesContacted}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emergencyServicesContacted: !!checked }))}
                  />
                  <Label htmlFor="emergencyServicesContacted" className="font-medium">
                    Emergency services contacted
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="towingRequired"
                    checked={formData.towingRequired}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, towingRequired: !!checked }))}
                  />
                  <Label htmlFor="towingRequired" className="font-medium">
                    Towing required
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insuranceNotified"
                    checked={formData.insuranceNotified}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, insuranceNotified: !!checked }))}
                  />
                  <Label htmlFor="insuranceNotified" className="font-medium">
                    Insurance notified
                  </Label>
                </div>
              </div>
            </div>

            {formData.policeReportFiled && (
              <div className="space-y-2">
                <Label htmlFor="policeReportNumber">Police Report Number</Label>
                <Input
                  id="policeReportNumber"
                  value={formData.policeReportNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, policeReportNumber: e.target.value }))}
                  placeholder="Report number"
                  className="h-12 text-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="glass-subtle">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-green-500" />
              <span>Photo Documentation</span>
            </CardTitle>
            <CardDescription>
              Photos are crucial for incident investigation and insurance claims
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">Upload incident photos</p>
              <p className="text-gray-500">Vehicle damage, scene, other vehicles, road conditions</p>
              <p className="text-sm text-gray-400 mt-2">Supports: JPG, PNG, PDF (Max 10MB each)</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Photo Checklist</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Overall scene from multiple angles</li>
                <li>• Vehicle damage (all sides)</li>
                <li>• License plates of all vehicles</li>
                <li>• Road signs and traffic signals</li>
                <li>• Skid marks or debris</li>
                <li>• Driver's licenses and insurance cards</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <Button type="button" variant="outline" className="h-12 px-8">
            Save Draft
          </Button>
          <Button type="submit" className="h-12 px-8 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Submit Incident Report
          </Button>
        </div>
      </form>
    </div>
  );
};