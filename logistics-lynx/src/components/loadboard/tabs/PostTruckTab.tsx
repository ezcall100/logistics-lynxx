
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Truck, MapPin, Calendar, DollarSign, Shield, Users, Zap } from 'lucide-react';

export const PostTruckTab: React.FC = () => {
  const { toast } = useToast();
  const [truckData, setTruckData] = useState({
    currentLocation: 'Chicago, IL',
    destinationPreference: 'Houston, TX',
    availableDate: '2024-06-20',
    truckType: 'dry-van',
    length: '53',
    maxWeight: '80000',
    preferredRate: '2.50',
    deadheadMiles: '50',
    teamDrivers: false,
    hazmatCertified: false,
    expediteCapable: true,
    specialEquipment: '',
    driverExperience: '5',
    comments: 'Professional service, on-time delivery guaranteed'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setTruckData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🚛 Truck Posted Successfully",
      description: "Your truck is now visible to shippers. AI optimization applied for maximum exposure.",
    });
  };

  const handleAutoFill = () => {
    toast({
      title: "🤖 Auto-Fill Applied",
      description: "Truck details filled with your most successful posting history.",
    });
    setTruckData(prev => ({
      ...prev,
      preferredRate: '2.75',
      deadheadMiles: '100',
      expediteCapable: true
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-lg border-border/60">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-600" />
            Post Your Truck
          </CardTitle>
          <CardDescription>
            Make your truck available to shippers with AI-optimized visibility
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentLocation" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Location
                </Label>
                <Input
                  id="currentLocation"
                  value={truckData.currentLocation}
                  onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                  placeholder="Current city, state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationPreference" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Preferred Destination
                </Label>
                <Input
                  id="destinationPreference"
                  value={truckData.destinationPreference}
                  onChange={(e) => handleInputChange('destinationPreference', e.target.value)}
                  placeholder="Preferred destination"
                />
              </div>
            </div>

            {/* Availability and Equipment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="availableDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Available Date
                </Label>
                <Input
                  id="availableDate"
                  type="date"
                  value={truckData.availableDate}
                  onChange={(e) => handleInputChange('availableDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="truckType" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Truck Type
                </Label>
                <Select value={truckData.truckType} onValueChange={(value) => handleInputChange('truckType', value)}>
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
              <div className="space-y-2">
                <Label htmlFor="length">Length (ft)</Label>
                <Input
                  id="length"
                  value={truckData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  placeholder="53"
                />
              </div>
            </div>

            {/* Capacity and Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxWeight">Max Weight (lbs)</Label>
                <Input
                  id="maxWeight"
                  value={truckData.maxWeight}
                  onChange={(e) => handleInputChange('maxWeight', e.target.value)}
                  placeholder="80000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredRate" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Preferred Rate ($/mile)
                </Label>
                <Input
                  id="preferredRate"
                  value={truckData.preferredRate}
                  onChange={(e) => handleInputChange('preferredRate', e.target.value)}
                  placeholder="2.50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadheadMiles">Max Deadhead (mi)</Label>
                <Input
                  id="deadheadMiles"
                  value={truckData.deadheadMiles}
                  onChange={(e) => handleInputChange('deadheadMiles', e.target.value)}
                  placeholder="50"
                />
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Capabilities & Certifications</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teamDrivers"
                    checked={truckData.teamDrivers}
                    onCheckedChange={(checked) => handleInputChange('teamDrivers', checked as boolean)}
                  />
                  <label htmlFor="teamDrivers" className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Drivers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hazmatCertified"
                    checked={truckData.hazmatCertified}
                    onCheckedChange={(checked) => handleInputChange('hazmatCertified', checked as boolean)}
                  />
                  <label htmlFor="hazmatCertified" className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Hazmat Certified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expediteCapable"
                    checked={truckData.expediteCapable}
                    onCheckedChange={(checked) => handleInputChange('expediteCapable', checked as boolean)}
                  />
                  <label htmlFor="expediteCapable" className="text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Expedite Capable
                  </label>
                </div>
              </div>
            </div>

            {/* Driver Experience */}
            <div className="space-y-2">
              <Label htmlFor="driverExperience">Driver Experience (years)</Label>
              <Select value={truckData.driverExperience} onValueChange={(value) => handleInputChange('driverExperience', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Special Equipment */}
            <div className="space-y-2">
              <Label htmlFor="specialEquipment">Special Equipment</Label>
              <Input
                id="specialEquipment"
                value={truckData.specialEquipment}
                onChange={(e) => handleInputChange('specialEquipment', e.target.value)}
                placeholder="e.g., Liftgate, Chains, Tarps"
              />
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                value={truckData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Additional information about your services..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Post Truck
              </Button>
              <Button type="button" variant="outline" onClick={handleAutoFill} className="px-6 h-12">
                Auto-Fill
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Market Insights */}
        <Card className="shadow-lg border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">High Demand Area</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Chicago area has 35% more load postings than average. Great positioning!
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Rate Trends</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Dry van rates on Chicago-Houston lane: $2.65/mile average (+8% this week)
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Optimization Tip</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Adding expedite capability increases booking chances by 40%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Posted Trucks */}
        <Card className="shadow-lg border-border/60">
          <CardHeader>
            <CardTitle>Your Posted Trucks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Truck #TK-001</p>
                  <p className="text-xs text-muted-foreground">Chicago → Open</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Truck #TK-002</p>
                  <p className="text-xs text-muted-foreground">Denver → Phoenix</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Booked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
