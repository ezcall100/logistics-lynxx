import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, Save, RefreshCw, Download, Upload, 
  CheckCircle, AlertTriangle, Clock, Database, 
  Server, Network, Shield, Users, Activity,
  FileText, Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  Sun, Moon, Bell, User, LogOut, Info
} from 'lucide-react';

const SemanticColorDemoPage = () => {
  const [switches, setSwitches] = useState({
    mcpSystem: true,
    autoRecovery: false,
    monitoring: true,
    security: true,
    backup: false
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSwitches(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            🎨 Semantic Color System Demo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
            Comprehensive demonstration of semantic color tokens and contrast-aware components
          </p>
        </motion.div>
      </div>

      <Tabs defaultValue="buttons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="switches">Switches</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="mcp">MCP Demo</TabsTrigger>
        </TabsList>

        {/* Buttons Demo */}
        <TabsContent value="buttons" className="space-y-6">
          <Card className="card-default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Semantic Button Variants
              </CardTitle>
              <CardDescription>
                All buttons use semantic color tokens - no more white-on-white issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Primary Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default" size="lg">
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="success" size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enable System
                  </Button>
                  <Button variant="info" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Data
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Secondary Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Secondary Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="lg">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Settings
                  </Button>
                  <Button variant="ghost" size="lg">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Warning & Danger Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Warning & Danger Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="warning" size="lg">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Warning Action
                  </Button>
                  <Button variant="destructive" size="lg">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Item
                  </Button>
                  <Button variant="danger" size="lg">
                    <Shield className="w-4 h-4 mr-2" />
                    Disable Security
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Icon Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Icon Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="success" size="icon">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="warning" size="icon">
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="info" size="icon">
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Switches Demo */}
        <TabsContent value="switches" className="space-y-6">
          <Card className="card-default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                Semantic Switch Variants
              </CardTitle>
              <CardDescription>
                Switches with proper contrast and semantic colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* System Switches */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">System Controls</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                      <Label className="text-base font-medium">MCP System</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Master Control Program
                      </p>
                    </div>
                    <Switch
                      variant={switches.mcpSystem ? "success" : "danger"}
                      checked={switches.mcpSystem}
                      onCheckedChange={(checked) => handleSwitchChange('mcpSystem', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                      <Label className="text-base font-medium">Auto Recovery</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Automatic system recovery
                      </p>
                    </div>
                    <Switch
                      variant={switches.autoRecovery ? "success" : "warning"}
                      checked={switches.autoRecovery}
                      onCheckedChange={(checked) => handleSwitchChange('autoRecovery', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                      <Label className="text-base font-medium">System Monitoring</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Real-time monitoring
                      </p>
                    </div>
                    <Switch
                      variant={switches.monitoring ? "success" : "info"}
                      checked={switches.monitoring}
                      onCheckedChange={(checked) => handleSwitchChange('monitoring', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Security Switches */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security Controls</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                      <Label className="text-base font-medium">Security Protocol</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Enhanced security measures
                      </p>
                    </div>
                    <Switch
                      variant={switches.security ? "success" : "danger"}
                      checked={switches.security}
                      onCheckedChange={(checked) => handleSwitchChange('security', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div>
                      <Label className="text-base font-medium">Auto Backup</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Automatic data backup
                      </p>
                    </div>
                    <Switch
                      variant={switches.backup ? "success" : "warning"}
                      checked={switches.backup}
                      onCheckedChange={(checked) => handleSwitchChange('backup', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cards Demo */}
        <TabsContent value="cards" className="space-y-6">
          <Card className="card-default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                Semantic Card System
              </CardTitle>
              <CardDescription>
                Cards with proper contrast and semantic backgrounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Success Card */}
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-green-700 dark:text-green-300">System Online</CardTitle>
                    <CardDescription className="text-green-600 dark:text-green-400">
                      All systems operational
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Status: Active</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Warning Card */}
                <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-amber-700 dark:text-amber-300">High Load</CardTitle>
                    <CardDescription className="text-amber-600 dark:text-amber-400">
                      System under stress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span className="text-amber-700 dark:text-amber-300">CPU: 85%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Card */}
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-red-700 dark:text-red-300">Security Alert</CardTitle>
                    <CardDescription className="text-red-600 dark:text-red-400">
                      Unauthorized access detected
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">Action Required</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MCP Demo */}
        <TabsContent value="mcp" className="space-y-6">
          <Card className="card-default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="w-5 h-5 text-blue-500" />
                MCP Configuration Demo
              </CardTitle>
              <CardDescription>
                Real-world example of the MCP Configuration page with semantic colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* MCP System Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <Label className="text-base font-medium">MCP System</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Enable or disable the Master Control Program
                  </p>
                </div>
                <Switch
                  variant={switches.mcpSystem ? "success" : "danger"}
                  checked={switches.mcpSystem}
                  onCheckedChange={(checked) => handleSwitchChange('mcpSystem', checked)}
                />
              </div>

              <Separator />

              {/* Auto Recovery Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <Label className="text-base font-medium">Auto Recovery</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Automatically recover from system failures
                  </p>
                </div>
                <Switch
                  variant={switches.autoRecovery ? "success" : "warning"}
                  checked={switches.autoRecovery}
                  onCheckedChange={(checked) => handleSwitchChange('autoRecovery', checked)}
                />
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="success" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
                <Button variant="secondary" size="lg">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
                <Button variant="destructive" size="lg">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Settings
                </Button>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-300 font-medium">System Active</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Monitoring</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-700 dark:text-purple-300 font-medium">AI Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SemanticColorDemoPage;
