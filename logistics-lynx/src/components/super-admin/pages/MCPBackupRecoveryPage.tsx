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
  Save, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Network, Shield, Users, Activity,
  FileText, Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  HardDrive, Cloud, Archive, RotateCcw, ShieldCheck,
  AlertTriangle, Info, Play, Pause, Stop
} from 'lucide-react';

const MCPBackupRecoveryPage = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: 'Full System Backup',
      type: 'full',
      status: 'completed',
      size: '2.4 GB',
      createdAt: '2024-01-15 14:30',
      retention: '30 days',
      location: 'Primary Storage'
    },
    {
      id: 2,
      name: 'Database Backup',
      type: 'database',
      status: 'completed',
      size: '856 MB',
      createdAt: '2024-01-15 12:15',
      retention: '7 days',
      location: 'Cloud Storage'
    },
    {
      id: 3,
      name: 'Configuration Backup',
      type: 'config',
      status: 'in_progress',
      size: '45 MB',
      createdAt: '2024-01-15 16:45',
      retention: '90 days',
      location: 'Local Storage'
    },
    {
      id: 4,
      name: 'User Data Backup',
      type: 'user_data',
      status: 'failed',
      size: '1.2 GB',
      createdAt: '2024-01-15 10:20',
      retention: '30 days',
      location: 'Primary Storage'
    }
  ]);

  const [recoveryPoints, setRecoveryPoints] = useState([
    {
      id: 1,
      name: 'System Recovery Point 1',
      timestamp: '2024-01-15 14:30',
      type: 'full_system',
      status: 'available',
      size: '2.4 GB',
      description: 'Complete system state before major update'
    },
    {
      id: 2,
      name: 'Database Recovery Point 1',
      timestamp: '2024-01-15 12:15',
      type: 'database',
      status: 'available',
      size: '856 MB',
      description: 'Database state before configuration changes'
    },
    {
      id: 3,
      name: 'Emergency Recovery Point',
      timestamp: '2024-01-14 18:00',
      type: 'emergency',
      status: 'available',
      size: '1.8 GB',
      description: 'Emergency backup created during system maintenance'
    }
  ]);

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupInterval: 24,
    retentionPeriod: 30,
    compressionEnabled: true,
    encryptionEnabled: true,
    cloudBackup: true,
    localBackup: true,
    verifyBackups: true
  });

  const [recoverySettings, setRecoverySettings] = useState({
    autoRecovery: false,
    recoveryTimeout: 300,
    validateRecovery: true,
    notifyOnRecovery: true,
    preserveLogs: true
  });

  const handleBackupCreate = () => {
    // Simulate creating backup
    console.log('Creating new backup...');
  };

  const handleBackupRestore = (backupId: number) => {
    // Simulate restoring backup
    console.log(`Restoring backup ${backupId}...`);
  };

  const handleRecoveryPointCreate = () => {
    // Simulate creating recovery point
    console.log('Creating recovery point...');
  };

  const handleRecoveryPointRestore = (pointId: number) => {
    // Simulate restoring recovery point
    console.log(`Restoring recovery point ${pointId}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'available': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'failed': return 'Failed';
      case 'available': return 'Available';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Backup & Recovery
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage system backups, recovery points, and disaster recovery procedures
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleBackupCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Backups</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">4</p>
              </div>
              <Archive className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Successful</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">In Progress</p>
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
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Recovery Points</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">3</p>
              </div>
              <RotateCcw className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Points</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-6">
          {/* Backup List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="w-5 h-5 mr-2" />
                System Backups
              </CardTitle>
              <CardDescription>
                Manage and restore system backups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <motion.div
                    key={backup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(backup.status)}`} />
                        <h4 className="font-medium">{backup.name}</h4>
                        <Badge variant="outline">{backup.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500">{backup.size}</span>
                        <span className="text-sm text-slate-500">{backup.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <p>Location: {backup.location}</p>
                        <p>Retention: {backup.retention}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleBackupRestore(backup.id)}>
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-6">
          {/* Recovery Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Recovery Points
              </CardTitle>
              <CardDescription>
                System recovery points for disaster recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recoveryPoints.map((point) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(point.status)}`} />
                        <h4 className="font-medium">{point.name}</h4>
                        <Badge variant="outline">{point.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500">{point.size}</span>
                        <span className="text-sm text-slate-500">{point.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {point.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500">
                        Status: {getStatusText(point.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleRecoveryPointRestore(point.id)}>
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Recovery Point */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Recovery Point
              </CardTitle>
              <CardDescription>
                Create a new system recovery point
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recoveryName">Recovery Point Name</Label>
                  <Input
                    id="recoveryName"
                    placeholder="Enter recovery point name"
                  />
                </div>
                <div>
                  <Label htmlFor="recoveryType">Recovery Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recovery type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_system">Full System</SelectItem>
                      <SelectItem value="database">Database Only</SelectItem>
                      <SelectItem value="configuration">Configuration Only</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recoveryDescription">Description</Label>
                  <Textarea
                    id="recoveryDescription"
                    placeholder="Enter description for this recovery point"
                  />
                </div>
                <Button onClick={handleRecoveryPointCreate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Recovery Point
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="w-5 h-5 mr-2" />
                Backup Settings
              </CardTitle>
              <CardDescription>
                Configure automatic backup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backupInterval">Backup Interval (hours)</Label>
                  <Input
                    id="backupInterval"
                    type="number"
                    value={backupSettings.backupInterval}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, backupInterval: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                  <Input
                    id="retentionPeriod"
                    type="number"
                    value={backupSettings.retentionPeriod}
                    onChange={(e) => setBackupSettings(prev => ({ ...prev, retentionPeriod: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoBackup">Automatic Backups</Label>
                  <Switch
                    id="autoBackup"
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compressionEnabled">Enable Compression</Label>
                  <Switch
                    id="compressionEnabled"
                    checked={backupSettings.compressionEnabled}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, compressionEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="encryptionEnabled">Enable Encryption</Label>
                  <Switch
                    id="encryptionEnabled"
                    checked={backupSettings.encryptionEnabled}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, encryptionEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cloudBackup">Cloud Backup</Label>
                  <Switch
                    id="cloudBackup"
                    checked={backupSettings.cloudBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, cloudBackup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="localBackup">Local Backup</Label>
                  <Switch
                    id="localBackup"
                    checked={backupSettings.localBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, localBackup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verifyBackups">Verify Backups</Label>
                  <Switch
                    id="verifyBackups"
                    checked={backupSettings.verifyBackups}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, verifyBackups: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Recovery Settings
              </CardTitle>
              <CardDescription>
                Configure recovery and restoration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recoveryTimeout">Recovery Timeout (seconds)</Label>
                  <Input
                    id="recoveryTimeout"
                    type="number"
                    value={recoverySettings.recoveryTimeout}
                    onChange={(e) => setRecoverySettings(prev => ({ ...prev, recoveryTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoRecovery">Automatic Recovery</Label>
                  <Switch
                    id="autoRecovery"
                    checked={recoverySettings.autoRecovery}
                    onCheckedChange={(checked) => setRecoverySettings(prev => ({ ...prev, autoRecovery: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="validateRecovery">Validate Recovery</Label>
                  <Switch
                    id="validateRecovery"
                    checked={recoverySettings.validateRecovery}
                    onCheckedChange={(checked) => setRecoverySettings(prev => ({ ...prev, validateRecovery: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifyOnRecovery">Notify on Recovery</Label>
                  <Switch
                    id="notifyOnRecovery"
                    checked={recoverySettings.notifyOnRecovery}
                    onCheckedChange={(checked) => setRecoverySettings(prev => ({ ...prev, notifyOnRecovery: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="preserveLogs">Preserve Recovery Logs</Label>
                  <Switch
                    id="preserveLogs"
                    checked={recoverySettings.preserveLogs}
                    onCheckedChange={(checked) => setRecoverySettings(prev => ({ ...prev, preserveLogs: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Backup Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Backup Monitoring
              </CardTitle>
              <CardDescription>
                Monitor backup status and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Last Backup Success Rate</Label>
                    <span className="text-sm text-slate-500">75%</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Storage Usage</Label>
                    <span className="text-sm text-slate-500">4.5 GB / 10 GB</span>
                  </div>
                  <Progress value={45} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Backup Speed</Label>
                    <span className="text-sm text-slate-500">2.4 MB/s</span>
                  </div>
                  <Progress value={60} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Recent backup and recovery activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, action: 'Backup Completed', details: 'Full System Backup', time: '2 hours ago', status: 'success' },
                  { id: 2, action: 'Recovery Point Created', details: 'Emergency Recovery Point', time: '4 hours ago', status: 'success' },
                  { id: 3, action: 'Backup Failed', details: 'User Data Backup', time: '6 hours ago', status: 'error' },
                  { id: 4, action: 'Recovery Initiated', details: 'Database Recovery', time: '1 day ago', status: 'warning' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'success' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.details}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{item.time}</span>
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

export default MCPBackupRecoveryPage;
