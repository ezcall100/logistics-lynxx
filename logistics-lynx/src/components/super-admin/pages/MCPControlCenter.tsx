import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SettingsRow, SettingsSection } from '@/components/ui/settings-row';
import { Badge } from '@/components/ui/badge';
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
  Unlock
} from 'lucide-react';

interface MCPConfig {
  enabled: boolean;
  autoRecovery: boolean;
  monitoringLevel: 'basic' | 'standard' | 'advanced';
  alertThreshold: number;
  backupFrequency: 'hourly' | 'daily' | 'weekly';
  securityLevel: 'low' | 'medium' | 'high';
}

const MCPControlCenter: React.FC = () => {
  const [config, setConfig] = useState<MCPConfig>({
    enabled: false,
    autoRecovery: true,
    monitoringLevel: 'standard',
    alertThreshold: 75,
    backupFrequency: 'daily',
    securityLevel: 'medium',
  });

  const [isConnected, setIsConnected] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'warning'>('offline');

  useEffect(() => {
    // Simulate connection check
    const timer = setTimeout(() => {
      setIsConnected(true);
      setSystemStatus('online');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateConfig = (updates: Partial<MCPConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (systemStatus) {
      case 'online':
        return <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Online</Badge>;
      case 'warning':
        return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Warning</Badge>;
      case 'offline':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Offline</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
            <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Cog className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MCP Control Center</h1>
            <p className="text-gray-600 dark:text-gray-400">Master Control Program Configuration</p>
                  </div>
                </div>
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          {getStatusBadge()}
                </div>
              </div>
              
      {/* System Status Card */}
      <Card>
                    <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            System Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                      </CardContent>
                    </Card>

      {/* MCP Configuration */}
      <SettingsSection 
        title="MCP Configuration" 
        subtitle="Configure the Master Control Program settings and behavior"
        variant="card"
      >
        {/* MCP System Toggle */}
        <SettingsRow
          title="MCP System"
          description="Enable or disable the Master Control Program"
          variant={config.enabled ? "success" : "danger"}
        >
                        <Switch
            variant={config.enabled ? "success" : "danger"}
                          checked={config.enabled}
                          onCheckedChange={(checked) => updateConfig({ enabled: checked })}
                          disabled={!isConnected}
                        />
        </SettingsRow>

        {/* Auto Recovery */}
        <SettingsRow
          title="Auto Recovery"
          description="Automatically recover from system failures"
          variant={config.autoRecovery ? "success" : "warning"}
        >
                        <Switch
            variant={config.autoRecovery ? "success" : "warning"}
                          checked={config.autoRecovery}
                          onCheckedChange={(checked) => updateConfig({ autoRecovery: checked })}
                          disabled={!isConnected}
                        />
        </SettingsRow>

        {/* Monitoring Level */}
        <SettingsRow
          title="Monitoring Level"
          description="Set the level of system monitoring and logging"
        >
          <Select
            value={config.monitoringLevel}
            onValueChange={(value: 'basic' | 'standard' | 'advanced') => 
              updateConfig({ monitoringLevel: value })
            }
            disabled={!isConnected}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>

        {/* Alert Threshold */}
        <SettingsRow
          title="Alert Threshold"
          description="Percentage threshold for system alerts"
        >
                        <Select 
            value={config.alertThreshold.toString()}
            onValueChange={(value) => updateConfig({ alertThreshold: parseInt(value) })}
                          disabled={!isConnected}
                        >
            <SelectTrigger className="w-48">
              <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="90">90%</SelectItem>
              <SelectItem value="95">95%</SelectItem>
                          </SelectContent>
                        </Select>
        </SettingsRow>

        {/* Backup Frequency */}
        <SettingsRow
          title="Backup Frequency"
          description="How often to create system backups"
        >
                        <Select 
            value={config.backupFrequency}
            onValueChange={(value: 'hourly' | 'daily' | 'weekly') => 
              updateConfig({ backupFrequency: value })
            }
                          disabled={!isConnected}
                        >
            <SelectTrigger className="w-48">
              <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
        </SettingsRow>

        {/* Security Level */}
        <SettingsRow
          title="Security Level"
          description="Set the security level for system access"
        >
          <Select
            value={config.securityLevel}
            onValueChange={(value: 'low' | 'medium' | 'high') => 
              updateConfig({ securityLevel: value })
            }
            disabled={!isConnected}
          >
            <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
        </SettingsRow>
      </SettingsSection>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" disabled={!isConnected}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
        <Button variant="default" disabled={!isConnected}>
          <Zap className="w-4 h-4 mr-2" />
          Apply Changes
        </Button>
                </div>
              </div>
  );
};

export default MCPControlCenter;
