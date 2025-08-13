import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  FileText, 
  Mail, 
  CheckCircle, 
  Bot,
  Upload,
  Download,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Save,
  RotateCcw,
  Workflow,
  Zap,
  Shield,
  Lock,
  Users,
  Timer,
  AlertCircle,
  Bell,
  DollarSign
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SettingsToolsPage = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [settings, setSettings] = useState({
    autoQuoteGeneration: true,
    emailNotifications: true,
    smsNotifications: false,
    approvalRequired: true,
    marginThreshold: 15,
    expirationDays: 7
  });

  // Mock data for templates and settings
  const quoteTemplates = [
    {
      id: 1,
      name: 'Standard Dry Van',
      description: 'Default template for dry van shipments',
      equipmentType: 'Dry Van',
      lastModified: '2024-01-15',
      isActive: true,
      usageCount: 234
    },
    {
      id: 2,
      name: 'Refrigerated Transport',
      description: 'Template for temperature-controlled shipments',
      equipmentType: 'Refrigerated',
      lastModified: '2024-01-12',
      isActive: true,
      usageCount: 156
    },
    {
      id: 3,
      name: 'Flatbed Heavy Haul',
      description: 'Template for oversized and heavy cargo',
      equipmentType: 'Flatbed',
      lastModified: '2024-01-10',
      isActive: false,
      usageCount: 89
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: 'Quote Submission',
      subject: 'Your Freight Quote - {Quote ID}',
      type: 'Customer',
      lastModified: '2024-01-14',
      isActive: true
    },
    {
      id: 2,
      name: 'Quote Approval Required',
      subject: 'Quote Approval Needed - {Quote ID}',
      type: 'Internal',
      lastModified: '2024-01-13',
      isActive: true
    },
    {
      id: 3,
      name: 'Quote Expiration Warning',
      subject: 'Quote Expiring Soon - {Quote ID}',
      type: 'Customer',
      lastModified: '2024-01-11',
      isActive: true
    }
  ];

  const approvalWorkflows = [
    {
      id: 1,
      name: 'Standard Approval',
      description: 'Quotes above $5,000 require manager approval',
      trigger: 'Amount > $5,000',
      approvers: ['Manager', 'Senior Manager'],
      isActive: true
    },
    {
      id: 2,
      name: 'Low Margin Alert',
      description: 'Quotes with margins below 15% need review',
      trigger: 'Margin < 15%',
      approvers: ['Pricing Manager'],
      isActive: true
    },
    {
      id: 3,
      name: 'High Value Approval',
      description: 'Quotes above $25,000 require executive approval',
      trigger: 'Amount > $25,000',
      approvers: ['VP Sales', 'General Manager'],
      isActive: false
    }
  ];

  const pricingRules = [
    {
      id: 1,
      name: 'Seasonal Adjustment',
      description: 'Increase rates by 8% during peak season (Nov-Jan)',
      condition: 'Peak Season',
      adjustment: '+8%',
      isActive: true
    },
    {
      id: 2,
      name: 'Volume Discount',
      description: 'Apply 5% discount for customers with 50+ loads/month',
      condition: 'Volume > 50 loads/month',
      adjustment: '-5%',
      isActive: true
    },
    {
      id: 3,
      name: 'Fuel Surcharge Auto-Update',
      description: 'Automatically adjust fuel surcharge based on DOE rates',
      condition: 'Weekly DOE Update',
      adjustment: 'Variable',
      isActive: true
    }
  ];

  const userPermissions = [
    {
      role: 'Sales Rep',
      canCreate: true,
      canEdit: true,
      canApprove: false,
      maxQuoteAmount: 10000,
      minMargin: 15
    },
    {
      role: 'Sales Manager',
      canCreate: true,
      canEdit: true,
      canApprove: true,
      maxQuoteAmount: 50000,
      minMargin: 10
    },
    {
      role: 'Executive',
      canCreate: true,
      canEdit: true,
      canApprove: true,
      maxQuoteAmount: null,
      minMargin: 5
    }
  ];

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings & Tools</h1>
          <p className="text-muted-foreground">
            Configure quote templates, workflows, and system settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="email-templates" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="pricing-rules" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Auto-Pricing
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>

        {/* Quote Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quote Templates
              </CardTitle>
              <CardDescription>
                Manage reusable quote templates for different equipment types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quoteTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={template.isActive ? 'default' : 'secondary'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Equipment Type</Label>
                        <p className="font-medium">{template.equipmentType}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Last Modified</Label>
                        <p className="font-medium">{template.lastModified}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Usage Count</Label>
                        <p className="font-medium">{template.usageCount} quotes</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="email-templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Templates
              </CardTitle>
              <CardDescription>
                Customize email communications for quotes and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={template.type === 'Customer' ? 'default' : 'secondary'}>
                          {template.type}
                        </Badge>
                        <Badge variant={template.isActive ? 'default' : 'secondary'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Last modified: {template.lastModified}
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Email Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval Workflows */}
        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Approval Workflows
              </CardTitle>
              <CardDescription>
                Configure automated approval processes for quotes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalWorkflows.map((workflow) => (
                  <div key={workflow.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={workflow.isActive ? 'default' : 'secondary'}>
                          {workflow.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Trigger Condition</Label>
                        <p className="font-medium">{workflow.trigger}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Approvers</Label>
                        <p className="font-medium">{workflow.approvers.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workflow
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto-Pricing Rules */}
        <TabsContent value="pricing-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Auto-Pricing Rules
              </CardTitle>
              <CardDescription>
                Set up automated pricing adjustments and business rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Condition</Label>
                        <p className="font-medium">{rule.condition}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Adjustment</Label>
                        <Badge variant="outline" className={rule.adjustment.includes('+') ? 'text-green-600' : rule.adjustment.includes('-') ? 'text-red-600' : 'text-blue-600'}>
                          {rule.adjustment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Pricing Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                User Permissions
              </CardTitle>
              <CardDescription>
                Configure role-based access controls for quote management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userPermissions.map((permission, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{permission.role}</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Quote Actions</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Create Quotes</span>
                            <Badge variant={permission.canCreate ? 'default' : 'secondary'}>
                              {permission.canCreate ? 'Allowed' : 'Denied'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Edit Quotes</span>
                            <Badge variant={permission.canEdit ? 'default' : 'secondary'}>
                              {permission.canEdit ? 'Allowed' : 'Denied'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Approve Quotes</span>
                            <Badge variant={permission.canApprove ? 'default' : 'secondary'}>
                              {permission.canApprove ? 'Allowed' : 'Denied'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Quote Limits</Label>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-muted-foreground">Max Quote Amount</span>
                            <p className="font-medium">
                              {permission.maxQuoteAmount ? `$${permission.maxQuoteAmount.toLocaleString()}` : 'Unlimited'}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Min Margin</span>
                            <p className="font-medium">{permission.minMargin}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quote Settings
                </CardTitle>
                <CardDescription>
                  Configure general quote behavior and defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-quote">Auto Quote Generation</Label>
                      <p className="text-sm text-muted-foreground">Enable AI-powered automatic quote creation</p>
                    </div>
                    <Switch
                      id="auto-quote"
                      checked={settings.autoQuoteGeneration}
                      onCheckedChange={(checked) => handleSettingChange('autoQuoteGeneration', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="approval-required">Approval Required</Label>
                      <p className="text-sm text-muted-foreground">Require approval for all quotes before sending</p>
                    </div>
                    <Switch
                      id="approval-required"
                      checked={settings.approvalRequired}
                      onCheckedChange={(checked) => handleSettingChange('approvalRequired', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="margin-threshold">Minimum Margin Threshold (%)</Label>
                    <Input
                      id="margin-threshold"
                      type="number"
                      value={settings.marginThreshold}
                      onChange={(e) => handleSettingChange('marginThreshold', parseInt(e.target.value))}
                      className="w-24"
                    />
                    <p className="text-sm text-muted-foreground">Quotes below this margin will require approval</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiration-days">Default Quote Expiration (Days)</Label>
                    <Input
                      id="expiration-days"
                      type="number"
                      value={settings.expirationDays}
                      onChange={(e) => handleSettingChange('expirationDays', parseInt(e.target.value))}
                      className="w-24"
                    />
                    <p className="text-sm text-muted-foreground">Default number of days before quotes expire</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure notification preferences and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email alerts for quote updates</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text alerts for urgent quote matters</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Label className="text-sm font-medium">Notification Types</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="quote-approved" className="rounded" defaultChecked />
                        <Label htmlFor="quote-approved" className="text-sm">Quote Approved</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="quote-expired" className="rounded" defaultChecked />
                        <Label htmlFor="quote-expired" className="text-sm">Quote Expiring Soon</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="high-value" className="rounded" defaultChecked />
                        <Label htmlFor="high-value" className="text-sm">High Value Quotes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="low-margin" className="rounded" />
                        <Label htmlFor="low-margin" className="text-sm">Low Margin Alerts</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import/Export Tools
              </CardTitle>
              <CardDescription>
                Manage quote data import and export operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Import Data</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Quote Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Customer Rates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Carrier Rates
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Export Data</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Quotes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export Settings Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Export Analytics Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                System Maintenance
              </CardTitle>
              <CardDescription>
                System maintenance and configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Management</h4>
                  <div className="space-y-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear Expired Quotes
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Clear Expired Quotes</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete all quotes that have been expired for more than 90 days. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Default Settings
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Cache & Performance</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Rebuild Indexes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsToolsPage;