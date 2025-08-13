import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Receipt, 
  Package, 
  Bell, 
  User, 
  Shield,
  Save,
  Camera,
  MapPin,
  DollarSign,
  FileText,
  Truck
} from 'lucide-react';

const OwnerOperatorSettingsPage = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Houston, TX 77001',
    bio: 'Experienced owner-operator with 15+ years in the logistics industry.',
    
    // Payment settings
    bankName: 'Chase Bank',
    accountNumber: '****1234',
    routingNumber: '****5678',
    paymentMethod: 'direct_deposit',
    paymentFrequency: 'weekly',
    
    // Tax settings
    ssn: '***-**-****',
    taxId: '12-3456789',
    taxFilingStatus: 'single',
    quarterlyPayments: true,
    
    // Load preferences
    preferredLoadTypes: ['truckload', 'dry_van'],
    preferredEquipmentTypes: ['dry_van', 'refrigerated'],
    preferredRegions: ['southwest', 'west'],
    maxDistance: '500',
    minRate: '2.50',
    
    // Notification preferences
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    loadAlerts: true,
    paymentAlerts: true,
    maintenanceReminders: true
  });

  
  // Update active tab when URL parameter changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') || 'profile';
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', formData);
    // Here you would typically save to your backend/Supabase
  };

  return (
    <div className="container-fluid space-y-8 p-6">
      {/* Enhanced Header with Gradient Background */}
      <div className="relative overflow-hidden rounded-2xl glass-ultra border border-border/30 p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-owner-primary/10 via-transparent to-owner-primary/5"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-responsive-xl font-display bg-gradient-to-r from-owner-primary to-blue-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground text-responsive-base">
              Manage your account settings and preferences
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2 btn-premium glass-subtle hover:glass-ultra shadow-premium hover:shadow-glow transition-all duration-300">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        {/* Enhanced Tab Navigation */}
        <div className="glass-ultra rounded-2xl p-2 border border-border/30">
          <TabsList className="grid w-full grid-cols-5 bg-transparent gap-2">
            <TabsTrigger 
              value="profile" 
              className="gap-2 data-[state=active]:glass-ultra data-[state=active]:shadow-premium data-[state=active]:border data-[state=active]:border-owner-primary/30 rounded-xl transition-all duration-300"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="payment" 
              className="gap-2 data-[state=active]:glass-ultra data-[state=active]:shadow-premium data-[state=active]:border data-[state=active]:border-owner-primary/30 rounded-xl transition-all duration-300"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tax" 
              className="gap-2 data-[state=active]:glass-ultra data-[state=active]:shadow-premium data-[state=active]:border data-[state=active]:border-owner-primary/30 rounded-xl transition-all duration-300"
            >
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Tax</span>
            </TabsTrigger>
            <TabsTrigger 
              value="loads" 
              className="gap-2 data-[state=active]:glass-ultra data-[state=active]:shadow-premium data-[state=active]:border data-[state=active]:border-owner-primary/30 rounded-xl transition-all duration-300"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Loads</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="gap-2 data-[state=active]:glass-ultra data-[state=active]:shadow-premium data-[state=active]:border data-[state=active]:border-owner-primary/30 rounded-xl transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Enhanced Profile Settings Card */}
        <TabsContent value="profile" className="space-y-8 animate-fade-in">
          <Card className="glass-ultra border border-border/30 shadow-premium card-hover">
            <CardHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-owner-primary/5 to-transparent"></div>
              <CardTitle className="relative flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-xl glass-subtle">
                  <User className="h-6 w-6 text-owner-primary" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="relative text-base">
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full p-2">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">Upload a professional photo</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Manage your payment preferences and bank account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct_deposit">Direct Deposit</SelectItem>
                      <SelectItem value="check">Physical Check</SelectItem>
                      <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select value={formData.paymentFrequency} onValueChange={(value) => handleInputChange('paymentFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi_weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Bank Account Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      placeholder="****1234"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                    placeholder="****5678"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Information
              </CardTitle>
              <CardDescription>
                Manage your tax settings and 1099 information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number</Label>
                  <Input
                    id="ssn"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    placeholder="***-**-****"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID (EIN)</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    placeholder="12-3456789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxFilingStatus">Tax Filing Status</Label>
                <Select value={formData.taxFilingStatus} onValueChange={(value) => handleInputChange('taxFilingStatus', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
                    <SelectItem value="married_separate">Married Filing Separately</SelectItem>
                    <SelectItem value="head_of_household">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Quarterly Tax Payments</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic quarterly tax payment reminders
                  </p>
                </div>
                <Switch
                  checked={formData.quarterlyPayments}
                  onCheckedChange={(checked) => handleInputChange('quarterlyPayments', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Load Preferences */}
        <TabsContent value="loads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Load Preferences
              </CardTitle>
              <CardDescription>
                Set your preferences for load types, regions, and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Preferred Load Types</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'truckload', 'ltl', 'intermodal', 'drayage', 'auto_transport', 
                    'expedited', 'hotshot', 'partial_load', 'team_load', 'dedicated'
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={type}
                        checked={formData.preferredLoadTypes.includes(type)}
                        onChange={(e) => {
                          const types = e.target.checked
                            ? [...formData.preferredLoadTypes, type]
                            : formData.preferredLoadTypes.filter(t => t !== type);
                          handleInputChange('preferredLoadTypes', types);
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={type} className="text-sm capitalize">
                        {type.replace('_', ' ').toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Equipment Types</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'dry_van', 'refrigerated', 'flatbed', 'step_deck', 'lowboy', 
                    'tanker', 'container', 'car_hauler', 'dump_truck', 'box_truck',
                    'straight_truck', 'hotshot_trailer', 'double_drop', 'removable_gooseneck',
                    'conestoga', 'curtain_side', 'power_only',
                    // Intermodal Equipment
                    'container_chassis', '20ft_chassis', '40ft_chassis', '45ft_chassis', 
                    '53ft_chassis', 'tri_axle_chassis', 'gooseneck_chassis',
                    // Drayage Equipment  
                    'port_chassis', 'rail_chassis', 'yard_truck', 'container_handler'
                  ].map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={equipment}
                        checked={formData.preferredEquipmentTypes.includes(equipment)}
                        onChange={(e) => {
                          const equipment_types = e.target.checked
                            ? [...formData.preferredEquipmentTypes, equipment]
                            : formData.preferredEquipmentTypes.filter(e => e !== equipment);
                          handleInputChange('preferredEquipmentTypes', equipment_types);
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={equipment} className="text-sm capitalize">
                        {equipment.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Preferred Regions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['northeast', 'southeast', 'midwest', 'southwest', 'west', 'northwest'].map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={region}
                        checked={formData.preferredRegions.includes(region)}
                        onChange={(e) => {
                          const regions = e.target.checked
                            ? [...formData.preferredRegions, region]
                            : formData.preferredRegions.filter(r => r !== region);
                          handleInputChange('preferredRegions', regions);
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={region} className="text-sm capitalize">
                        {region}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDistance">Maximum Distance (miles)</Label>
                  <Input
                    id="maxDistance"
                    value={formData.maxDistance}
                    onChange={(e) => handleInputChange('maxDistance', e.target.value)}
                    placeholder="500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minRate">Minimum Rate ($/mile)</Label>
                  <Input
                    id="minRate"
                    value={formData.minRate}
                    onChange={(e) => handleInputChange('minRate', e.target.value)}
                    placeholder="2.50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Communication Methods</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    checked={formData.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in the app
                    </p>
                  </div>
                  <Switch
                    checked={formData.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Load Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      New loads, load updates, and delivery confirmations
                    </p>
                  </div>
                  <Switch
                    checked={formData.loadAlerts}
                    onCheckedChange={(checked) => handleInputChange('loadAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Payment confirmations and settlement updates
                    </p>
                  </div>
                  <Switch
                    checked={formData.paymentAlerts}
                    onCheckedChange={(checked) => handleInputChange('paymentAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Vehicle maintenance and inspection reminders
                    </p>
                  </div>
                  <Switch
                    checked={formData.maintenanceReminders}
                    onCheckedChange={(checked) => handleInputChange('maintenanceReminders', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerOperatorSettingsPage;