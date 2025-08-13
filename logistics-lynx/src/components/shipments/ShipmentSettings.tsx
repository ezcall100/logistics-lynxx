import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Globe, 
  Truck, 
  Clock, 
  MapPin, 
  DollarSign,
  Users,
  Shield,
  Zap,
  Save,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const ShipmentSettings = () => {
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [trackingFrequency, setTrackingFrequency] = useState([15]);
  const [fuelSurchargeRate, setFuelSurchargeRate] = useState('8.5');

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shipment Settings</h2>
          <p className="text-muted-foreground">Configure shipment management preferences and automation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>General Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="america/chicago">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america/new_york">Eastern Time</SelectItem>
                        <SelectItem value="america/chicago">Central Time</SelectItem>
                        <SelectItem value="america/denver">Mountain Time</SelectItem>
                        <SelectItem value="america/los_angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance Unit</Label>
                    <Select defaultValue="miles">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">Miles</SelectItem>
                        <SelectItem value="kilometers">Kilometers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight Unit</Label>
                    <Select defaultValue="pounds">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pounds">Pounds (lbs)</SelectItem>
                        <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature Unit</Label>
                    <Select defaultValue="fahrenheit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mm/dd/yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Settings */}
        <TabsContent value="automation" className="space-y-6">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>AI & Automation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Auto-Assign Drivers</p>
                    <p className="text-sm text-muted-foreground">Automatically assign available drivers to new shipments</p>
                  </div>
                  <Switch checked={autoAssignEnabled} onCheckedChange={setAutoAssignEnabled} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Route Optimization</p>
                    <p className="text-sm text-muted-foreground">Use AI to optimize delivery routes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Auto Documentation</p>
                    <p className="text-sm text-muted-foreground">Generate documents automatically when shipments are completed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Price Recommendations</p>
                    <p className="text-sm text-muted-foreground">AI-powered pricing suggestions based on market data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Auto-Assign Confidence Threshold</Label>
                  <Slider defaultValue={[85]} max={100} min={50} step={5} className="w-full" />
                  <p className="text-xs text-muted-foreground">Minimum confidence level for automatic driver assignment</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-distance">Max Auto-Assign Distance (miles)</Label>
                  <Input id="max-distance" type="number" defaultValue="500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Send text messages for urgent notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">In-App Notifications</p>
                    <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Notification Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pickup-notify" defaultChecked className="rounded border-border" />
                      <Label htmlFor="pickup-notify">Pickup Confirmations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="delivery-notify" defaultChecked className="rounded border-border" />
                      <Label htmlFor="delivery-notify">Delivery Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="delay-notify" defaultChecked className="rounded border-border" />
                      <Label htmlFor="delay-notify">Delay Alerts</Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="assignment-notify" defaultChecked className="rounded border-border" />
                      <Label htmlFor="assignment-notify">Driver Assignments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="document-notify" className="rounded border-border" />
                      <Label htmlFor="document-notify">Document Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="billing-notify" defaultChecked className="rounded border-border" />
                      <Label htmlFor="billing-notify">Billing Events</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracking Settings */}
        <TabsContent value="tracking" className="space-y-6">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Tracking & GPS Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>GPS Update Frequency (minutes)</Label>
                  <Slider 
                    value={trackingFrequency} 
                    onValueChange={setTrackingFrequency}
                    max={60} 
                    min={5} 
                    step={5} 
                    className="w-full" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Current setting: Every {trackingFrequency[0]} minutes
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="geofence-radius">Geofence Radius (miles)</Label>
                    <Input id="geofence-radius" type="number" defaultValue="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eta-buffer">ETA Buffer (minutes)</Label>
                    <Input id="eta-buffer" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Real-time Tracking</p>
                    <p className="text-sm text-muted-foreground">Enable continuous GPS tracking for active shipments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Route Deviation Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert when drivers deviate from planned routes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Speed Monitoring</p>
                    <p className="text-sm text-muted-foreground">Monitor vehicle speeds and send alerts for violations</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Billing & Financial Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-surcharge">Default Fuel Surcharge (%)</Label>
                    <Input 
                      id="fuel-surcharge" 
                      type="number" 
                      value={fuelSurchargeRate}
                      onChange={(e) => setFuelSurchargeRate(e.target.value)}
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Default Payment Terms</Label>
                    <Select defaultValue="net30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net45">Net 45</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="late-fee">Late Payment Fee (%)</Label>
                    <Input id="late-fee" type="number" defaultValue="1.5" step="0.1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                    <Input id="invoice-prefix" defaultValue="INV-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="8.25" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="detention-rate">Detention Rate (per hour)</Label>
                    <Input id="detention-rate" type="number" defaultValue="50" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Auto-Generate Invoices</p>
                    <p className="text-sm text-muted-foreground">Automatically create invoices when shipments are delivered</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Quick Pay Discount</p>
                    <p className="text-sm text-muted-foreground">Offer discounts for early payment</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Automatic Collections</p>
                    <p className="text-sm text-muted-foreground">Send automated payment reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShipmentSettings;