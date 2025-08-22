import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Save, RefreshCw, Plus, Edit, Trash2,
  Globe, Shield, Database, Server, Network, Zap,
  Users, Lock, Unlock, Eye, EyeOff, Download, Upload,
  AlertTriangle, CheckCircle, Clock, Calendar, Bell
} from 'lucide-react';

interface PortalSetting {
  id: string;
  portalId: string;
  portalName: string;
  category: 'security' | 'performance' | 'features' | 'integrations' | 'notifications';
  setting: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'select';
  description: string;
  lastModified: string;
  modifiedBy: string;
  isDefault: boolean;
}

interface PortalConfig {
  id: string;
  name: string;
  type: string;
  status: string;
  settings: PortalSetting[];
}

const PortalSettingsPage = () => {
  const [portals, setPortals] = useState<PortalConfig[]>([]);
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalSettings();
  }, []);

  const loadPortalSettings = async () => {
    setLoading(true);
    try {
      // Mock portal settings data
      const mockPortals: PortalConfig[] = [
        {
          id: 'portal-001',
          name: 'Carrier Portal',
          type: 'carrier',
          status: 'active',
          settings: [
            {
              id: 'setting-001',
              portalId: 'portal-001',
              portalName: 'Carrier Portal',
              category: 'security',
              setting: 'session_timeout',
              value: 3600,
              type: 'number',
              description: 'Session timeout in seconds',
              lastModified: '2024-01-15T10:30:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: false
            },
            {
              id: 'setting-002',
              portalId: 'portal-001',
              portalName: 'Carrier Portal',
              category: 'performance',
              setting: 'cache_enabled',
              value: true,
              type: 'boolean',
              description: 'Enable caching for better performance',
              lastModified: '2024-01-15T10:30:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: true
            },
            {
              id: 'setting-003',
              portalId: 'portal-001',
              portalName: 'Carrier Portal',
              category: 'features',
              setting: 'advanced_tracking',
              value: true,
              type: 'boolean',
              description: 'Enable advanced shipment tracking',
              lastModified: '2024-01-15T10:30:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: false
            }
          ]
        },
        {
          id: 'portal-002',
          name: 'Broker Portal',
          type: 'broker',
          status: 'active',
          settings: [
            {
              id: 'setting-004',
              portalId: 'portal-002',
              portalName: 'Broker Portal',
              category: 'security',
              setting: 'two_factor_auth',
              value: true,
              type: 'boolean',
              description: 'Require two-factor authentication',
              lastModified: '2024-01-15T10:25:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: false
            },
            {
              id: 'setting-005',
              portalId: 'portal-002',
              portalName: 'Broker Portal',
              category: 'notifications',
              setting: 'email_notifications',
              value: true,
              type: 'boolean',
              description: 'Enable email notifications',
              lastModified: '2024-01-15T10:25:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: true
            }
          ]
        },
        {
          id: 'portal-003',
          name: 'Shipper Portal',
          type: 'shipper',
          status: 'active',
          settings: [
            {
              id: 'setting-006',
              portalId: 'portal-003',
              portalName: 'Shipper Portal',
              category: 'performance',
              setting: 'max_concurrent_users',
              value: 1000,
              type: 'number',
              description: 'Maximum concurrent users allowed',
              lastModified: '2024-01-15T10:28:00Z',
              modifiedBy: 'admin@company.com',
              isDefault: false
            }
          ]
        }
      ];

      setPortals(mockPortals);
      if (mockPortals.length > 0) {
        setSelectedPortal(mockPortals[0].id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (portalId: string, settingId: string, newValue: any) => {
    setPortals(prev => 
      prev.map(portal => 
        portal.id === portalId 
          ? {
              ...portal,
              settings: portal.settings.map(setting =>
                setting.id === settingId 
                  ? { ...setting, value: newValue, lastModified: new Date().toISOString() }
                  : setting
              )
            }
          : portal
      )
    );
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Portal settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return Shield;
      case 'performance': return Zap;
      case 'features': return Settings;
      case 'integrations': return Network;
      case 'notifications': return Bell;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'bg-red-500';
      case 'performance': return 'bg-blue-500';
      case 'features': return 'bg-green-500';
      case 'integrations': return 'bg-purple-500';
      case 'notifications': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedPortalData = portals.find(p => p.id === selectedPortal);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Settings</h1>
          <p className="text-muted-foreground">
            Configure settings and preferences for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Portal Selection Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Portal</CardTitle>
              <CardDescription>Choose a portal to configure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {portals.map((portal) => (
                  <Button
                    key={portal.id}
                    variant={selectedPortal === portal.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedPortal(portal.id)}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {portal.name}
                    <Badge variant="outline" className="ml-auto">
                      {portal.settings.length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {selectedPortalData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedPortalData.name} Settings</CardTitle>
                    <CardDescription>
                      {selectedPortalData.settings.length} configuration options
                    </CardDescription>
                  </div>
                  <Badge variant={selectedPortalData.status === 'active' ? 'default' : 'secondary'}>
                    {selectedPortalData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="security" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>

                  {['security', 'performance', 'features', 'integrations', 'notifications'].map((category) => {
                    const categorySettings = selectedPortalData.settings.filter(
                      setting => setting.category === category
                    );
                    const CategoryIcon = getCategoryIcon(category);

                    return (
                      <TabsContent key={category} value={category} className="space-y-4">
                        {categorySettings.length > 0 ? (
                          categorySettings.map((setting) => (
                            <Card key={setting.id}>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${getCategoryColor(category)} text-white`}>
                                      <CategoryIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <CardTitle className="text-lg">
                                        {setting.setting.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                      </CardTitle>
                                      <CardDescription>{setting.description}</CardDescription>
                                    </div>
                                  </div>
                                  {setting.isDefault && (
                                    <Badge variant="outline">Default</Badge>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {/* Setting Value Input */}
                                  <div className="space-y-2">
                                    <Label>Value</Label>
                                    {setting.type === 'boolean' ? (
                                      <div className="flex items-center space-x-2">
                                        <Switch
                                          checked={setting.value as boolean}
                                          onCheckedChange={(checked) => 
                                            handleSettingChange(selectedPortalData.id, setting.id, checked)
                                          }
                                        />
                                        <Label>
                                          {setting.value ? 'Enabled' : 'Disabled'}
                                        </Label>
                                      </div>
                                    ) : setting.type === 'select' ? (
                                      <Select
                                        value={setting.value as string}
                                        onValueChange={(value) => 
                                          handleSettingChange(selectedPortalData.id, setting.id, value)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="option1">Option 1</SelectItem>
                                          <SelectItem value="option2">Option 2</SelectItem>
                                          <SelectItem value="option3">Option 3</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <Input
                                        type={setting.type === 'number' ? 'number' : 'text'}
                                        value={setting.value as string}
                                        onChange={(e) => 
                                          handleSettingChange(
                                            selectedPortalData.id, 
                                            setting.id, 
                                            setting.type === 'number' ? Number(e.target.value) : e.target.value
                                          )
                                        }
                                      />
                                    )}
                                  </div>

                                  {/* Metadata */}
                                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Last modified: {new Date(setting.lastModified).toLocaleString()}</span>
                                    <span>by {setting.modifiedBy}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="flex items-center justify-center py-8">
                              <div className="text-center space-y-2">
                                <CategoryIcon className="w-8 h-8 text-muted-foreground mx-auto" />
                                <p className="text-muted-foreground">No {category} settings configured</p>
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Setting
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center space-y-2">
                  <Settings className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Select a portal to view its settings</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalSettingsPage;
