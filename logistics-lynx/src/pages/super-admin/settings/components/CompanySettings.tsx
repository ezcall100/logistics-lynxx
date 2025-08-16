/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  Plus, 
  Edit,
  Save,
  RotateCcw,
  Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanySettings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    legalName: 'Trans Bot AI LLC',
    dbaName: 'Trans Bot AI',
    entityType: 'llc',
    registrationNumber: 'DE-LLC-2023-001234',
    registrationState: 'Delaware',
    federalEin: '12-3456789',
    foundedDate: '2023-01-15',
    businessDescription: 'AI-powered Transportation Management Software',
    website: 'https://transbotai.com',
    supportEmail: 'support@transbotai.com',
    supportPhone: '+1 (555) 123-4567'
  });

  const [offices, setOffices] = useState([
    {
      id: '1',
      name: 'Headquarters',
      type: 'headquarters',
      address: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      timezone: 'America/Los_Angeles',
      capacity: 50,
      isMainOffice: true
    },
    {
      id: '2',
      name: 'Development Center',
      type: 'development',
      address: '456 Tech Boulevard',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      timezone: 'America/Chicago',
      capacity: 30,
      isMainOffice: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    maintenanceAlerts: true,
    securityAlerts: true,
    weeklyReports: true
  });

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Company settings saved',
        description: 'All company information has been updated successfully.',
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getOfficeTypeBadge = (type: string) => {
    const variants = {
      'headquarters': 'default',
      'development': 'secondary',
      'sales': 'outline',
      'support': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'outline'}>
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Legal Entity Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Legal Entity Information
          </CardTitle>
          <CardDescription>
            Official business registration and legal details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Business Name *</Label>
              <Input
                id="legalName"
                value={companyInfo.legalName}
                onChange={(e) => handleCompanyInfoChange('legalName', e.target.value)}
                placeholder="Trans Bot AI LLC"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbaName">DBA Name</Label>
              <Input
                id="dbaName"
                value={companyInfo.dbaName}
                onChange={(e) => handleCompanyInfoChange('dbaName', e.target.value)}
                placeholder="Trans Bot AI"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entityType">Entity Type</Label>
              <Select value={companyInfo.entityType} onValueChange={(value) => handleCompanyInfoChange('entityType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="s-corp">S-Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationState">Registration State</Label>
              <Select value={companyInfo.registrationState} onValueChange={(value) => handleCompanyInfoChange('registrationState', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delaware">Delaware</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundedDate">Founded Date</Label>
              <Input
                id="foundedDate"
                type="date"
                value={companyInfo.foundedDate}
                onChange={(e) => handleCompanyInfoChange('foundedDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={companyInfo.registrationNumber}
                onChange={(e) => handleCompanyInfoChange('registrationNumber', e.target.value)}
                placeholder="DE-LLC-2023-001234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="federalEin">Federal EIN</Label>
              <Input
                id="federalEin"
                value={companyInfo.federalEin}
                onChange={(e) => handleCompanyInfoChange('federalEin', e.target.value)}
                placeholder="12-3456789"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              value={companyInfo.businessDescription}
              onChange={(e) => handleCompanyInfoChange('businessDescription', e.target.value)}
              placeholder="Describe your business activities..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Primary contact details for customer support and business inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  value={companyInfo.website}
                  onChange={(e) => handleCompanyInfoChange('website', e.target.value)}
                  className="pl-10"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="supportEmail"
                  type="email"
                  value={companyInfo.supportEmail}
                  onChange={(e) => handleCompanyInfoChange('supportEmail', e.target.value)}
                  className="pl-10"
                  placeholder="support@yourcompany.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Support Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="supportPhone"
                  value={companyInfo.supportPhone}
                  onChange={(e) => handleCompanyInfoChange('supportPhone', e.target.value)}
                  className="pl-10"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Office Locations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Office Locations
            </CardTitle>
            <CardDescription>
              Manage company office locations and operating timezones
            </CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Office
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {offices.map((office) => (
              <Card key={office.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{office.name}</h4>
                      {getOfficeTypeBadge(office.type)}
                      {office.isMainOffice && (
                        <Badge variant="destructive">Main Office</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p>{office.address}</p>
                        <p>{office.city}, {office.state} {office.zipCode}</p>
                        <p>{office.country}</p>
                      </div>
                      <div>
                        <p><Phone className="inline h-3 w-3 mr-1" />{office.phone}</p>
                        <p><Globe className="inline h-3 w-3 mr-1" />{office.timezone}</p>
                        <p>Capacity: {office.capacity} people</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how and when you receive important system notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important notifications via email
                </p>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => handleNotificationChange('emailAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive critical alerts via SMS
                </p>
              </div>
              <Switch
                checked={notifications.smsAlerts}
                onCheckedChange={(checked) => handleNotificationChange('smsAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Browser push notifications for real-time updates
                </p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  System maintenance and downtime notifications
                </p>
              </div>
              <Switch
                checked={notifications.maintenanceAlerts}
                onCheckedChange={(checked) => handleNotificationChange('maintenanceAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Security incidents and login notifications
                </p>
              </div>
              <Switch
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly summary reports and analytics
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={!hasChanges || isLoading}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Changes
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanySettings;