import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Save, RefreshCw, Globe, Shield, Bell, 
  Database, Server, Users, Lock, Eye, EyeOff,
  Mail, Phone, MapPin, Calendar, Clock, Zap,
  AlertTriangle, CheckCircle, Info, Trash2, Edit,
  Plus, Download, Upload, Key, Fingerprint
} from 'lucide-react';

// Real data models
interface SystemSettings {
  id: string;
  category: string;
  name: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'select';
  description: string;
  required: boolean;
  options?: string[];
  validation?: string;
}

interface SecuritySettings {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  configuredBy: string;
}

interface NotificationSettings {
  id: string;
  type: string;
  channel: 'email' | 'sms' | 'push' | 'webhook';
  enabled: boolean;
  recipients: string[];
  template: string;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

interface IntegrationSettings {
  id: string;
  name: string;
  provider: string;
  status: 'active' | 'inactive' | 'error';
  apiKey: string;
  webhookUrl: string;
  lastSync: string;
  syncInterval: number;
}

// Mock API functions
const mockAPI = {
  getSystemSettings: (): Promise<SystemSettings[]> => Promise.resolve([
    {
      id: 'site-name',
      category: 'General',
      name: 'Site Name',
      value: 'Trans Bot AI',
      type: 'string',
      description: 'The name of your application',
      required: true,
      validation: 'min:2,max:50'
    },
    {
      id: 'site-url',
      category: 'General',
      name: 'Site URL',
      value: 'https://transbot.ai',
      type: 'string',
      description: 'The main URL of your application',
      required: true,
      validation: 'url'
    },
    {
      id: 'timezone',
      category: 'General',
      name: 'Default Timezone',
      value: 'UTC',
      type: 'select',
      description: 'Default timezone for the application',
      required: true,
      options: ['UTC', 'EST', 'PST', 'GMT', 'CET']
    },
    {
      id: 'maintenance-mode',
      category: 'System',
      name: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode for system updates',
      required: false
    },
    {
      id: 'session-timeout',
      category: 'Security',
      name: 'Session Timeout (minutes)',
      value: 30,
      type: 'number',
      description: 'User session timeout in minutes',
      required: true,
      validation: 'min:5,max:480'
    },
    {
      id: 'max-login-attempts',
      category: 'Security',
      name: 'Max Login Attempts',
      value: 5,
      type: 'number',
      description: 'Maximum failed login attempts before lockout',
      required: true,
      validation: 'min:3,max:10'
    }
  ]),

  getSecuritySettings: (): Promise<SecuritySettings[]> => Promise.resolve([
    {
      id: '2fa',
      name: 'Two-Factor Authentication',
      enabled: true,
      description: 'Require 2FA for all user accounts',
      riskLevel: 'high',
      lastUpdated: '2024-01-15T10:30:00Z',
      configuredBy: 'admin@transbot.ai'
    },
    {
      id: 'password-policy',
      name: 'Strong Password Policy',
      enabled: true,
      description: 'Enforce strong password requirements',
      riskLevel: 'medium',
      lastUpdated: '2024-01-14T15:20:00Z',
      configuredBy: 'admin@transbot.ai'
    },
    {
      id: 'session-management',
      name: 'Session Management',
      enabled: true,
      description: 'Track and manage user sessions',
      riskLevel: 'medium',
      lastUpdated: '2024-01-13T09:45:00Z',
      configuredBy: 'admin@transbot.ai'
    },
    {
      id: 'api-rate-limiting',
      name: 'API Rate Limiting',
      enabled: true,
      description: 'Limit API requests per user/IP',
      riskLevel: 'low',
      lastUpdated: '2024-01-12T14:30:00Z',
      configuredBy: 'admin@transbot.ai'
    }
  ]),

  getNotificationSettings: (): Promise<NotificationSettings[]> => Promise.resolve([
    {
      id: 'system-alerts',
      type: 'System Alerts',
      channel: 'email',
      enabled: true,
      recipients: ['admin@transbot.ai', 'devops@transbot.ai'],
      template: 'System alert: {message}',
      frequency: 'immediate'
    },
    {
      id: 'security-events',
      type: 'Security Events',
      channel: 'webhook',
      enabled: true,
      recipients: ['security@transbot.ai'],
      template: 'Security event detected: {event}',
      frequency: 'immediate'
    },
    {
      id: 'performance-reports',
      type: 'Performance Reports',
      channel: 'email',
      enabled: true,
      recipients: ['admin@transbot.ai'],
      template: 'Daily performance report: {summary}',
      frequency: 'daily'
    }
  ]),

  getIntegrationSettings: (): Promise<IntegrationSettings[]> => Promise.resolve([
    {
      id: 'stripe',
      name: 'Stripe Payment',
      provider: 'Stripe',
      status: 'active',
      apiKey: 'sk_test_...',
      webhookUrl: 'https://transbot.ai/webhooks/stripe',
      lastSync: '2024-01-15T10:30:00Z',
      syncInterval: 300
    },
    {
      id: 'sendgrid',
      name: 'SendGrid Email',
      provider: 'SendGrid',
      status: 'active',
      apiKey: 'SG...',
      webhookUrl: 'https://transbot.ai/webhooks/sendgrid',
      lastSync: '2024-01-15T10:25:00Z',
      syncInterval: 60
    },
    {
      id: 'slack',
      name: 'Slack Notifications',
      provider: 'Slack',
      status: 'active',
      apiKey: 'xoxb-...',
      webhookUrl: 'https://hooks.slack.com/services/...',
      lastSync: '2024-01-15T10:20:00Z',
      syncInterval: 60
    }
  ])
};

const GlobalSettingsPage = () => {
  const [systemSettings, setSystemSettings] = useState<SystemSettings[]>([]);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>([]);
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSetting, setEditingSetting] = useState<string | null>(null);
  const [newIntegrationDialog, setNewIntegrationDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const [system, security, notifications, integrations] = await Promise.all([
        mockAPI.getSystemSettings(),
        mockAPI.getSecuritySettings(),
        mockAPI.getNotificationSettings(),
        mockAPI.getIntegrationSettings()
      ]);

      setSystemSettings(system);
      setSecuritySettings(security);
      setNotificationSettings(notifications);
      setIntegrationSettings(integrations);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSetting = (id: string, value: any) => {
    setSystemSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    );
    setEditingSetting(null);
    toast({
      title: "Setting Updated",
      description: "System setting has been updated successfully",
    });
  };

  const handleToggleSecurity = (id: string) => {
    setSecuritySettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    toast({
      title: "Security Setting Updated",
      description: "Security setting has been toggled",
    });
  };

  const handleToggleNotification = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    toast({
      title: "Notification Updated",
      description: "Notification setting has been toggled",
    });
  };

  const handleAddIntegration = () => {
    toast({
      title: "Integration Added",
      description: "New integration has been added successfully",
    });
    setNewIntegrationDialog(false);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Global Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings, security, notifications, and integrations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSettings} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => toast({ title: "Settings Saved", description: "All settings have been saved" })}>
            <Save className="h-4 w-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure core system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label className="font-medium">{setting.name}</Label>
                      {setting.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingSetting === setting.id ? (
                      <div className="flex items-center space-x-2">
                        {setting.type === 'boolean' ? (
                          <Switch
                            checked={setting.value as boolean}
                            onCheckedChange={(checked) => handleSaveSetting(setting.id, checked)}
                          />
                        ) : setting.type === 'select' ? (
                          <Select value={setting.value as string} onValueChange={(value) => handleSaveSetting(setting.id, value)}>
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options?.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type={setting.type === 'number' ? 'number' : 'text'}
                            value={setting.value as string}
                            onChange={(e) => handleSaveSetting(setting.id, e.target.value)}
                            className="w-48"
                          />
                        )}
                        <Button size="sm" onClick={() => setEditingSetting(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {setting.type === 'boolean' ? (setting.value ? 'Enabled' : 'Disabled') : setting.value}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => setEditingSetting(setting.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Manage security settings and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securitySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{setting.name}</h3>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getRiskLevelColor(setting.riskLevel)}>
                          {setting.riskLevel} risk
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last updated: {new Date(setting.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => handleToggleSecurity(setting.id)}
                      />
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure notification channels and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-green-500" />
                        <div>
                          <h3 className="font-medium">{setting.type}</h3>
                          <p className="text-sm text-muted-foreground">
                            Channel: {setting.channel} | Frequency: {setting.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">
                          Recipients: {setting.recipients.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => handleToggleNotification(setting.id)}
                      />
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Third-Party Integrations</CardTitle>
                  <CardDescription>
                    Manage external service integrations and API connections
                  </CardDescription>
                </div>
                <Button onClick={() => setNewIntegrationDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationSettings.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-purple-500" />
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Provider: {integration.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalSettingsPage;
