import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { SettingsRow, SettingsSection } from '@/components/ui/settings-row';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cog, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Zap,
  Database,
  Network,
  Lock,
  Unlock,
  Settings,
  Palette,
  Eye,
  EyeOff
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const SemanticColorDemoPage: React.FC = () => {
  const [switches, setSwitches] = useState({
    mcpSystem: false,
    autoRecovery: true,
    securityMode: true,
    notifications: false,
    darkMode: true,
    analytics: false,
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSwitches(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Semantic Color System Demo</h1>
            <p className="text-gray-600 dark:text-gray-400">Showcasing hardened semantic color tokens and components</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700">
          <Eye className="w-3 h-3 mr-1" />
          Live Preview
        </Badge>
      </div>

      <Tabs defaultValue="switches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="switches">Switches</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="settings">Settings Rows</TabsTrigger>
          <TabsTrigger value="mcp">MCP Demo</TabsTrigger>
        </TabsList>

        {/* Switches Demo */}
        <TabsContent value="switches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Enhanced Switch Components
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switches with semantic color variants and guaranteed contrast
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Default Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Standard semantic color variant
                    </p>
                  </div>
                  <Switch
                    variant="default"
                    checked={switches.mcpSystem}
                    onCheckedChange={(checked) => handleSwitchChange('mcpSystem', checked)}
                  />
                </div>

                {/* Success Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Success Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Green variant for positive states
                    </p>
                  </div>
                  <Switch
                    variant="success"
                    checked={switches.autoRecovery}
                    onCheckedChange={(checked) => handleSwitchChange('autoRecovery', checked)}
                  />
                </div>

                {/* Warning Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Warning Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Amber variant for caution states
                    </p>
                  </div>
                  <Switch
                    variant="warning"
                    checked={switches.notifications}
                    onCheckedChange={(checked) => handleSwitchChange('notifications', checked)}
                  />
                </div>

                {/* Danger Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Danger Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Red variant for critical states
                    </p>
                  </div>
                  <Switch
                    variant="danger"
                    checked={switches.securityMode}
                    onCheckedChange={(checked) => handleSwitchChange('securityMode', checked)}
                  />
                </div>

                {/* Info Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Info Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Blue variant for informational states
                    </p>
                  </div>
                  <Switch
                    variant="info"
                    checked={switches.analytics}
                    onCheckedChange={(checked) => handleSwitchChange('analytics', checked)}
                  />
                </div>

                {/* Gradient Switch */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <Label className="text-base font-medium">Gradient Switch</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Gradient variant for premium features
                    </p>
                  </div>
                  <Switch
                    variant="gradient"
                    checked={switches.darkMode}
                    onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Buttons Demo */}
        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Enhanced Button Components
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Buttons with semantic color variants and loading states
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Buttons */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Primary Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="gradient">Gradient</Button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Secondary Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Loading States */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Loading States</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button loading>Loading</Button>
                    <Button variant="success" loading>Processing</Button>
                    <Button variant="outline" loading>Updating</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Rows Demo */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="w-5 h-5 text-green-500" />
                Settings Row Components
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Guaranteed contrast-safe settings panels with semantic variants
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingsSection 
                title="System Settings" 
                subtitle="Configure core system parameters"
                variant="card"
              >
                <SettingsRow
                  title="Auto Recovery"
                  description="Automatically recover from system failures"
                  variant={switches.autoRecovery ? "success" : "warning"}
                >
                  <Switch
                    variant={switches.autoRecovery ? "success" : "warning"}
                    checked={switches.autoRecovery}
                    onCheckedChange={(checked) => handleSwitchChange('autoRecovery', checked)}
                  />
                </SettingsRow>

                <SettingsRow
                  title="Security Mode"
                  description="Enable enhanced security protocols"
                  variant={switches.securityMode ? "success" : "danger"}
                >
                  <Switch
                    variant={switches.securityMode ? "success" : "danger"}
                    checked={switches.securityMode}
                    onCheckedChange={(checked) => handleSwitchChange('securityMode', checked)}
                  />
                </SettingsRow>

                <SettingsRow
                  title="Dark Mode"
                  description="Switch between light and dark themes"
                  variant="primary"
                >
                  <Switch
                    variant="gradient"
                    checked={switches.darkMode}
                    onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
                  />
                </SettingsRow>
              </SettingsSection>

              <SettingsSection 
                title="Notification Settings" 
                subtitle="Configure system notifications and alerts"
                variant="muted"
              >
                <SettingsRow
                  title="Push Notifications"
                  description="Receive real-time system alerts"
                  variant={switches.notifications ? "info" : "default"}
                >
                  <Switch
                    variant={switches.notifications ? "info" : "default"}
                    checked={switches.notifications}
                    onCheckedChange={(checked) => handleSwitchChange('notifications', checked)}
                  />
                </SettingsRow>

                <SettingsRow
                  title="Analytics Collection"
                  description="Allow system to collect usage analytics"
                  variant={switches.analytics ? "success" : "warning"}
                >
                  <Switch
                    variant={switches.analytics ? "success" : "warning"}
                    checked={switches.analytics}
                    onCheckedChange={(checked) => handleSwitchChange('analytics', checked)}
                  />
                </SettingsRow>
              </SettingsSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MCP Demo */}
        <TabsContent value="mcp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                MCP Configuration Demo
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-world example of the MCP Configuration page with semantic colors
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* System Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Database</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Connected</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Network className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Network</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Stable</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Security</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-green-500" />
                </div>
              </div>

              {/* MCP Configuration */}
              <SettingsSection 
                title="MCP Configuration" 
                subtitle="Configure the Master Control Program settings and behavior"
                variant="card"
              >
                <SettingsRow
                  title="MCP System"
                  description="Enable or disable the Master Control Program"
                  variant={switches.mcpSystem ? "success" : "danger"}
                >
                  <Switch
                    variant={switches.mcpSystem ? "success" : "danger"}
                    checked={switches.mcpSystem}
                    onCheckedChange={(checked) => handleSwitchChange('mcpSystem', checked)}
                  />
                </SettingsRow>

                <SettingsRow
                  title="Auto Recovery"
                  description="Automatically recover from system failures"
                  variant={switches.autoRecovery ? "success" : "warning"}
                >
                  <Switch
                    variant={switches.autoRecovery ? "success" : "warning"}
                    checked={switches.autoRecovery}
                    onCheckedChange={(checked) => handleSwitchChange('autoRecovery', checked)}
                  />
                </SettingsRow>

                <SettingsRow
                  title="Security Mode"
                  description="Enable enhanced security protocols"
                  variant={switches.securityMode ? "success" : "danger"}
                >
                  <Switch
                    variant={switches.securityMode ? "success" : "danger"}
                    checked={switches.securityMode}
                    onCheckedChange={(checked) => handleSwitchChange('securityMode', checked)}
                  />
                </SettingsRow>
              </SettingsSection>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
                <Button variant="default">
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SemanticColorDemoPage;
