import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, Save, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Network, Shield, Users, Activity,
  FileText, Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal
} from 'lucide-react';

const MCPConfigurationManagerPage = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [configurations, setConfigurations] = useState([
    {
      id: 1,
      name: 'Production Environment',
      type: 'system',
      status: 'active',
      lastModified: '2024-01-15 14:30',
      version: 'v2.1.0',
      description: 'Main production configuration for Trans Bot AI'
    },
    {
      id: 2,
      name: 'Development Environment',
      type: 'system',
      status: 'active',
      lastModified: '2024-01-15 12:15',
      version: 'v2.1.1-beta',
      description: 'Development and testing configuration'
    },
    {
      id: 3,
      name: 'Security Policies',
      type: 'security',
      status: 'active',
      lastModified: '2024-01-14 16:45',
      version: 'v1.8.2',
      description: 'Security and access control policies'
    },
    {
      id: 4,
      name: 'Database Configuration',
      type: 'database',
      status: 'active',
      lastModified: '2024-01-14 10:20',
      version: 'v2.0.5',
      description: 'Database connection and optimization settings'
    }
  ]);

  const [systemConfig, setSystemConfig] = useState({
    serverTimeout: 30,
    maxConnections: 1000,
    cacheEnabled: true,
    logLevel: 'info',
    autoBackup: true,
    backupInterval: 24,
    monitoringEnabled: true,
    alertThreshold: 85
  });

  const [securityConfig, setSecurityConfig] = useState({
    jwtExpiry: 3600,
    passwordPolicy: 'strong',
    mfaEnabled: true,
    sessionTimeout: 1800,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    rateLimitEnabled: true,
    maxLoginAttempts: 5
  });

  const [databaseConfig, setDatabaseConfig] = useState({
    connectionPool: 20,
    queryTimeout: 30,
    maxRetries: 3,
    sslEnabled: true,
    readReplicas: 2,
    backupRetention: 30
  });

  const [deploymentConfig, setDeploymentConfig] = useState({
    autoDeploy: false,
    stagingRequired: true,
    rollbackEnabled: true,
    healthCheckTimeout: 60,
    maxDeploymentTime: 300
  });

  const handleConfigSave = (type: string) => {
    // Simulate saving configuration
    console.log(`Saving ${type} configuration...`);
  };

  const handleConfigDeploy = (configId: number) => {
    // Simulate deploying configuration
    console.log(`Deploying configuration ${configId}...`);
  };

  const handleConfigExport = (configId: number) => {
    // Simulate exporting configuration
    console.log(`Exporting configuration ${configId}...`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Configuration Manager
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage system configurations, deployment settings, and environment variables
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Configuration
          </Button>
        </div>
      </div>

      {/* Configuration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Configs</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">4</p>
              </div>
              <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Deployed</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">3</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">1</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Versions</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">12</p>
              </div>
              <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configurations
              </CardTitle>
              <CardDescription>
                Manage and deploy system configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {configurations.map((config) => (
                <motion.div
                  key={config.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{config.name}</h4>
                    <Badge variant={config.status === 'active' ? 'default' : 'secondary'}>
                      {config.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {config.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>v{config.version}</span>
                    <span>{config.lastModified}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => handleConfigDeploy(config.id)}>
                      <Upload className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleConfigExport(config.id)}>
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Configuration Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="w-5 h-5 mr-2" />
                Configuration Editor
              </CardTitle>
              <CardDescription>
                Edit and manage system configuration parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="system">System</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="deployment">Deployment</TabsTrigger>
                </TabsList>

                <TabsContent value="system" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="serverTimeout">Server Timeout (seconds)</Label>
                      <Input
                        id="serverTimeout"
                        type="number"
                        value={systemConfig.serverTimeout}
                        onChange={(e) => setSystemConfig(prev => ({ ...prev, serverTimeout: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxConnections">Max Connections</Label>
                      <Input
                        id="maxConnections"
                        type="number"
                        value={systemConfig.maxConnections}
                        onChange={(e) => setSystemConfig(prev => ({ ...prev, maxConnections: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="logLevel">Log Level</Label>
                      <Select value={systemConfig.logLevel} onValueChange={(value) => setSystemConfig(prev => ({ ...prev, logLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="backupInterval">Backup Interval (hours)</Label>
                      <Input
                        id="backupInterval"
                        type="number"
                        value={systemConfig.backupInterval}
                        onChange={(e) => setSystemConfig(prev => ({ ...prev, backupInterval: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cacheEnabled">Enable Caching</Label>
                      <Switch
                        id="cacheEnabled"
                        checked={systemConfig.cacheEnabled}
                        onCheckedChange={(checked) => setSystemConfig(prev => ({ ...prev, cacheEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoBackup">Auto Backup</Label>
                      <Switch
                        id="autoBackup"
                        checked={systemConfig.autoBackup}
                        onCheckedChange={(checked) => setSystemConfig(prev => ({ ...prev, autoBackup: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monitoringEnabled">Enable Monitoring</Label>
                      <Switch
                        id="monitoringEnabled"
                        checked={systemConfig.monitoringEnabled}
                        onCheckedChange={(checked) => setSystemConfig(prev => ({ ...prev, monitoringEnabled: checked }))}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleConfigSave('system')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save System Configuration
                  </Button>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jwtExpiry">JWT Expiry (seconds)</Label>
                      <Input
                        id="jwtExpiry"
                        type="number"
                        value={securityConfig.jwtExpiry}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, jwtExpiry: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (seconds)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={securityConfig.sessionTimeout}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordPolicy">Password Policy</Label>
                      <Select value={securityConfig.passwordPolicy} onValueChange={(value) => setSecurityConfig(prev => ({ ...prev, passwordPolicy: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={securityConfig.maxLoginAttempts}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                    <Textarea
                      id="ipWhitelist"
                      value={securityConfig.ipWhitelist.join('\n')}
                      onChange={(e) => setSecurityConfig(prev => ({ ...prev, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) }))}
                      placeholder="Enter IP addresses or CIDR ranges (one per line)"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mfaEnabled">Enable MFA</Label>
                      <Switch
                        id="mfaEnabled"
                        checked={securityConfig.mfaEnabled}
                        onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, mfaEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rateLimitEnabled">Enable Rate Limiting</Label>
                      <Switch
                        id="rateLimitEnabled"
                        checked={securityConfig.rateLimitEnabled}
                        onCheckedChange={(checked) => setSecurityConfig(prev => ({ ...prev, rateLimitEnabled: checked }))}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleConfigSave('security')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Configuration
                  </Button>
                </TabsContent>

                <TabsContent value="database" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="connectionPool">Connection Pool Size</Label>
                      <Input
                        id="connectionPool"
                        type="number"
                        value={databaseConfig.connectionPool}
                        onChange={(e) => setDatabaseConfig(prev => ({ ...prev, connectionPool: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="queryTimeout">Query Timeout (seconds)</Label>
                      <Input
                        id="queryTimeout"
                        type="number"
                        value={databaseConfig.queryTimeout}
                        onChange={(e) => setDatabaseConfig(prev => ({ ...prev, queryTimeout: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxRetries">Max Retries</Label>
                      <Input
                        id="maxRetries"
                        type="number"
                        value={databaseConfig.maxRetries}
                        onChange={(e) => setDatabaseConfig(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="readReplicas">Read Replicas</Label>
                      <Input
                        id="readReplicas"
                        type="number"
                        value={databaseConfig.readReplicas}
                        onChange={(e) => setDatabaseConfig(prev => ({ ...prev, readReplicas: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                      <Input
                        id="backupRetention"
                        type="number"
                        value={databaseConfig.backupRetention}
                        onChange={(e) => setDatabaseConfig(prev => ({ ...prev, backupRetention: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sslEnabled">Enable SSL</Label>
                      <Switch
                        id="sslEnabled"
                        checked={databaseConfig.sslEnabled}
                        onCheckedChange={(checked) => setDatabaseConfig(prev => ({ ...prev, sslEnabled: checked }))}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleConfigSave('database')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Database Configuration
                  </Button>
                </TabsContent>

                <TabsContent value="deployment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="healthCheckTimeout">Health Check Timeout (seconds)</Label>
                      <Input
                        id="healthCheckTimeout"
                        type="number"
                        value={deploymentConfig.healthCheckTimeout}
                        onChange={(e) => setDeploymentConfig(prev => ({ ...prev, healthCheckTimeout: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxDeploymentTime">Max Deployment Time (seconds)</Label>
                      <Input
                        id="maxDeploymentTime"
                        type="number"
                        value={deploymentConfig.maxDeploymentTime}
                        onChange={(e) => setDeploymentConfig(prev => ({ ...prev, maxDeploymentTime: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoDeploy">Auto Deploy</Label>
                      <Switch
                        id="autoDeploy"
                        checked={deploymentConfig.autoDeploy}
                        onCheckedChange={(checked) => setDeploymentConfig(prev => ({ ...prev, autoDeploy: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="stagingRequired">Staging Required</Label>
                      <Switch
                        id="stagingRequired"
                        checked={deploymentConfig.stagingRequired}
                        onCheckedChange={(checked) => setDeploymentConfig(prev => ({ ...prev, stagingRequired: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rollbackEnabled">Enable Rollback</Label>
                      <Switch
                        id="rollbackEnabled"
                        checked={deploymentConfig.rollbackEnabled}
                        onCheckedChange={(checked) => setDeploymentConfig(prev => ({ ...prev, rollbackEnabled: checked }))}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleConfigSave('deployment')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Deployment Configuration
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configuration History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Configuration History
          </CardTitle>
          <CardDescription>
            Recent configuration changes and deployments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 1, config: 'Production Environment', action: 'Deployed', user: 'admin@transbot.ai', time: '2 hours ago', status: 'success' },
              { id: 2, config: 'Security Policies', action: 'Updated', user: 'security@transbot.ai', time: '4 hours ago', status: 'success' },
              { id: 3, config: 'Database Configuration', action: 'Rolled Back', user: 'admin@transbot.ai', time: '6 hours ago', status: 'warning' },
              { id: 4, config: 'Development Environment', action: 'Created', user: 'dev@transbot.ai', time: '1 day ago', status: 'success' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'success' ? 'bg-green-500' : 
                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium">{item.config}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.action} by {item.user}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPConfigurationManagerPage;
