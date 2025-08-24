import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { 
  Settings, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Lock,
  Users,
  Server,
  Network,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface SystemSettingsProps {}

const SystemSettings: React.FC<SystemSettingsProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Logistics Lynx',
      siteDescription: 'Enterprise Transportation Management System',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      language: 'English',
      currency: 'USD',
      maintenanceMode: false
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      enableAuditLog: true,
      ipWhitelist: '',
      sslRequired: true,
      dataEncryption: true
    },
    email: {
      smtpHost: 'smtp.company.com',
      smtpPort: 587,
      smtpUsername: 'noreply@company.com',
      smtpPassword: '********',
      fromEmail: 'noreply@company.com',
      fromName: 'Logistics Lynx',
      enableNotifications: true,
      emailVerification: true
    },
    notifications: {
      systemAlerts: true,
      userActivity: false,
      securityEvents: true,
      performanceWarnings: true,
      backupNotifications: true,
      updateNotifications: false,
      emailDigest: true,
      pushNotifications: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      sidebarCollapsed: false,
      compactMode: false,
      showAnimations: true,
      fontSize: 'medium',
      dashboardLayout: 'grid'
    },
    performance: {
      cacheEnabled: true,
      cacheDuration: 3600,
      compressionEnabled: true,
      imageOptimization: true,
      cdnEnabled: false,
      databaseOptimization: true,
      backgroundJobs: true
    }
  });

  const [originalSettings, setOriginalSettings] = useState(settings);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async (category: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOriginalSettings(prev => ({
        ...prev,
        [category]: settings[category as keyof typeof settings]
      }));
      console.log(`${category} settings saved:`, settings[category as keyof typeof settings]);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = (category: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: originalSettings[category as keyof typeof originalSettings]
    }));
  };

  const hasChanges = (category: string) => {
    return JSON.stringify(settings[category as keyof typeof settings]) !== 
           JSON.stringify(originalSettings[category as keyof typeof originalSettings]);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'performance', name: 'Performance', icon: Zap }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Site Name
          </label>
          <Input
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Site Description
          </label>
          <Input
            value={settings.general.siteDescription}
            onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Max Login Attempts
          </label>
          <Input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Minimum Password Length
          </label>
          <Input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            IP Whitelist (comma-separated)
          </label>
          <Input
            value={settings.security.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
            placeholder="192.168.1.1, 10.0.0.1"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requireTwoFactor"
            checked={settings.security.requireTwoFactor}
            onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="requireTwoFactor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Require Two-Factor Authentication
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableAuditLog"
            checked={settings.security.enableAuditLog}
            onChange={(e) => handleSettingChange('security', 'enableAuditLog', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="enableAuditLog" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Audit Logging
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sslRequired"
            checked={settings.security.sslRequired}
            onChange={(e) => handleSettingChange('security', 'sslRequired', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="sslRequired" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Require SSL/TLS
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="dataEncryption"
            checked={settings.security.dataEncryption}
            onChange={(e) => handleSettingChange('security', 'dataEncryption', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="dataEncryption" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Data Encryption
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            SMTP Host
          </label>
          <Input
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            SMTP Port
          </label>
          <Input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            SMTP Username
          </label>
          <Input
            value={settings.email.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            SMTP Password
          </label>
          <Input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            From Email
          </label>
          <Input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            From Name
          </label>
          <Input
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableNotifications"
            checked={settings.email.enableNotifications}
            onChange={(e) => handleSettingChange('email', 'enableNotifications', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="enableNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Email Notifications
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="emailVerification"
            checked={settings.email.emailVerification}
            onChange={(e) => handleSettingChange('email', 'emailVerification', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="emailVerification" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Require Email Verification
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </p>
          </div>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <select
            value={settings.appearance.theme}
            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Color
          </label>
          <Input
            type="color"
            value={settings.appearance.primaryColor}
            onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
            className="mt-1 h-10"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Font Size
          </label>
          <select
            value={settings.appearance.fontSize}
            onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Dashboard Layout
          </label>
          <select
            value={settings.appearance.dashboardLayout}
            onChange={(e) => handleSettingChange('appearance', 'dashboardLayout', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="compact">Compact</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sidebarCollapsed"
            checked={settings.appearance.sidebarCollapsed}
            onChange={(e) => handleSettingChange('appearance', 'sidebarCollapsed', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="sidebarCollapsed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Collapse Sidebar by Default
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="compactMode"
            checked={settings.appearance.compactMode}
            onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="compactMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Compact Mode
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showAnimations"
            checked={settings.appearance.showAnimations}
            onChange={(e) => handleSettingChange('appearance', 'showAnimations', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="showAnimations" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Show Animations
          </label>
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Cache Duration (seconds)
          </label>
          <Input
            type="number"
            value={settings.performance.cacheDuration}
            onChange={(e) => handleSettingChange('performance', 'cacheDuration', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="cacheEnabled"
            checked={settings.performance.cacheEnabled}
            onChange={(e) => handleSettingChange('performance', 'cacheEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="cacheEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Caching
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="compressionEnabled"
            checked={settings.performance.compressionEnabled}
            onChange={(e) => handleSettingChange('performance', 'compressionEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="compressionEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Compression
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="imageOptimization"
            checked={settings.performance.imageOptimization}
            onChange={(e) => handleSettingChange('performance', 'imageOptimization', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="imageOptimization" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Image Optimization
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="cdnEnabled"
            checked={settings.performance.cdnEnabled}
            onChange={(e) => handleSettingChange('performance', 'cdnEnabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="cdnEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable CDN
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="databaseOptimization"
            checked={settings.performance.databaseOptimization}
            onChange={(e) => handleSettingChange('performance', 'databaseOptimization', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="databaseOptimization" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Database Optimization
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="backgroundJobs"
            checked={settings.performance.backgroundJobs}
            onChange={(e) => handleSettingChange('performance', 'backgroundJobs', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="backgroundJobs" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Background Jobs
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'email':
        return renderEmailSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'performance':
        return renderPerformanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Configure system-wide settings, security policies, and application preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
                {hasChanges(tab.id) && (
                  <Badge variant="secondary" className="ml-1">
                    Modified
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="capitalize">{activeTab} Settings</span>
            <div className="flex space-x-2">
              {hasChanges(activeTab) && (
                <Button
                  variant="outline"
                  onClick={() => handleResetSettings(activeTab)}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              )}
              <Button
                onClick={() => handleSaveSettings(activeTab)}
                disabled={isLoading || !hasChanges(activeTab)}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Configure {activeTab} settings for the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
