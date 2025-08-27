import { useState } from 'react';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Mail, Save, RefreshCw, Settings, Database, Code, Shield, Bell, HardDrive, Lock } from 'lucide-react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedInput, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface SystemConfig {
  general: {
    systemName: string;
    systemVersion: string;
    environment: 'development' | 'staging' | 'production';
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    language: string;
    maintenanceMode: boolean;
    debugMode: boolean;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    connectionPool: number;
    sslEnabled: boolean;
    backupEnabled: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    retentionDays: number;
  };
  api: {
    baseUrl: string;
    version: string;
    rateLimit: number;
    timeout: number;
    corsEnabled: boolean;
    corsOrigins: string[];
    authentication: {
      jwtSecret: string;
      jwtExpiry: number;
      refreshTokenExpiry: number;
      passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
      };
    };
  };
  email: {
    provider: 'smtp' | 'sendgrid' | 'mailgun' | 'ses';
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'none' | 'ssl' | 'tls';
    fromEmail: string;
    fromName: string;
    replyTo: string;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
    passwordHistory: number;
    ipWhitelist: string[];
    ipBlacklist: string[];
    sslEnabled: boolean;
    sslCertificate: string;
    sslKey: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    webhookUrl: string;
    slackWebhook: string;
    teamsWebhook: string;
  };
  storage: {
    provider: 'local' | 's3' | 'gcs' | 'azure';
    bucket: string;
    region: string;
    accessKey: string;
    secretKey: string;
    maxFileSize: number;
    allowedFileTypes: string[];
    cdnEnabled: boolean;
    cdnUrl: string;
  };
}

const SystemSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<SystemConfig>({
    general: {
      systemName: 'Logistics Lynx',
      systemVersion: '1.0.0',
      environment: 'development',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      language: 'en',
      maintenanceMode: false,
      debugMode: true
    },
    database: {
      host: 'localhost',
      port: 5432,
      name: 'logistics_lynx',
      username: 'admin',
      password: '',
      connectionPool: 10,
      sslEnabled: false,
      backupEnabled: true,
      backupFrequency: 'daily',
      retentionDays: 30
    },
    api: {
      baseUrl: 'http://localhost:3001',
      version: 'v1',
      rateLimit: 1000,
      timeout: 30000,
      corsEnabled: true,
      corsOrigins: ['http://localhost:3000'],
      authentication: {
        jwtSecret: '',
        jwtExpiry: 3600,
        refreshTokenExpiry: 86400,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true
        }
      }
    },
    email: {
      provider: 'smtp',
      host: 'smtp.gmail.com',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls',
      fromEmail: 'noreply@logisticslynx.com',
      fromName: 'Logistics Lynx',
      replyTo: 'support@logisticslynx.com'
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      passwordHistory: 5,
      ipWhitelist: [],
      ipBlacklist: [],
      sslEnabled: true,
      sslCertificate: '',
      sslKey: ''
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      webhookUrl: '',
      slackWebhook: '',
      teamsWebhook: ''
    },
    storage: {
      provider: 's3',
      bucket: '',
      region: 'us-east-1',
      accessKey: '',
      secretKey: '',
      maxFileSize: 10485760,
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
      cdnEnabled: false,
      cdnUrl: ''
    }
  });
  const [saving, setSaving] = useState(false);
  const [mode] = useState<'light' | 'dark'>('light');
  // const [showPasswordModal] = useState(false);
  // const [showBackupModal] = useState(false);


  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
  };

  const handleTestConnection = async (type: string) => {
    setLoading(true);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert(`${type} connection test successful!`);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'api', label: 'API', icon: Code },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'storage', label: 'Storage', icon: HardDrive }
  ];

  const timezones = [
    'America/Los_Angeles',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              System </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Configure system-wide settings and preferences
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              
              icon={<RefreshCw className="w-4 h-4" />}
              mode={mode}
              onClick={() => window.location.reload()}
            >
              Reset
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              
              icon={<Save className="w-4 h-4" />}
              mode={mode}
              onClick={handleSave}
              loading={saving}
            >
              Save Changes
            </EnhancedButton>
          </div>
        </div>

        {/* Tabs */}
        <EnhancedCard mode={mode}>
          <div className="flex space-x-1 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? `${stableStyles.textPrimary[mode]} border-b-2 border-blue-500`
                      : `${stableStyles.textSecondary[mode]} hover:${stableStyles.textPrimary[mode]}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </EnhancedCard>

        {/* General */}
        {activeTab === 'general' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              General System </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  System Name
                </label>
                <EnhancedInput
                  value={formData.general.systemName}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, systemName: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  System Version
                </label>
                <EnhancedInput
                  value={formData.general.systemVersion}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, systemVersion: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Environment
                </label>
                <select
                  value={formData.general.environment}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, environment: e.target.value as any }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Timezone
                </label>
                <select
                  value={formData.general.timezone}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, timezone: e.target.value }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Date Format
                </label>
                <EnhancedInput
                  value={formData.general.dateFormat}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, dateFormat: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Time Format
                </label>
                <select
                  value={formData.general.timeFormat}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, timeFormat: e.target.value as any }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="12h">12 Hour</option>
                  <option value="24h">24 Hour</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Language
                </label>
                <select
                  value={formData.general.language}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, language: e.target.value }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Maintenance Mode</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable maintenance mode to restrict access
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.general.maintenanceMode}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, maintenanceMode: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Debug Mode</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable debug mode for development
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.general.debugMode}
                  onChange={(e) => setFormData({
                    ...formData,
                    general: { ...formData.general, debugMode: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* */}
        {activeTab === 'database' && (
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Configuration
              </h3>
              <EnhancedButton
                variant="secondary"
                
                icon={<RefreshCw className="w-4 h-4" />}
                mode={mode}
                onClick={() => handleTestConnection('')}
                loading={loading}
              >
                Test Connection
              </EnhancedButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Host
                </label>
                <EnhancedInput
                  value={formData.database.host}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, host: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Port
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.database.port.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, port: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Name
                </label>
                <EnhancedInput
                  value={formData.database.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, name: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Username
                </label>
                <EnhancedInput
                  value={formData.database.username}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, username: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Password
                </label>
                <EnhancedInput
                  type="password"
                  value={formData.database.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, password: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Connection Pool
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.database.connectionPool.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, connectionPool: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>SSL Enabled</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable SSL connection to database
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.database.sslEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, sslEnabled: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Backup Enabled</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable automatic database backups
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.database.backupEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    database: { ...formData.database, backupEnabled: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* API */}
        {activeTab === 'api' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              API Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Base URL
                </label>
                <EnhancedInput
                  value={formData.api.baseUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    api: { ...formData.api, baseUrl: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  API Version
                </label>
                <EnhancedInput
                  value={formData.api.version}
                  onChange={(e) => setFormData({
                    ...formData,
                    api: { ...formData.api, version: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Rate Limit (requests/min)
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.api.rateLimit.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    api: { ...formData.api, rateLimit: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Timeout (ms)
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.api.timeout.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    api: { ...formData.api, timeout: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>CORS Enabled</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable Cross-Origin Resource Sharing
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.api.corsEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    api: { ...formData.api, corsEnabled: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Email */}
        {activeTab === 'email' && (
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Email Configuration
              </h3>
              <EnhancedButton
                variant="secondary"
                
                icon={<Mail className="w-4 h-4" />}
                mode={mode}
                onClick={() => handleTestConnection('Email')}
                loading={loading}
              >
                Test Connection
              </EnhancedButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Provider
                </label>
                <select
                  value={formData.email.provider}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, provider: e.target.value as any }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="smtp">SMTP</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="ses">AWS SES</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Host
                </label>
                <EnhancedInput
                  value={formData.email.host}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, host: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Port
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.email.port.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, port: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Username
                </label>
                <EnhancedInput
                  value={formData.email.username}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, username: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Password
                </label>
                <EnhancedInput
                  type="password"
                  value={formData.email.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, password: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Encryption
                </label>
                <select
                  value={formData.email.encryption}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: { ...formData.email, encryption: e.target.value as any }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="none">None</option>
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                </select>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Security Configuration
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Session Timeout (seconds)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.security.sessionTimeout.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Max Login Attempts
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.security.maxLoginAttempts.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Lockout Duration (seconds)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.security.lockoutDuration.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, lockoutDuration: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Password History
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.security.passwordHistory.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, passwordHistory: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Two-Factor Authentication</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Require 2FA for all users
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.security.twoFactorEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, twoFactorEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>SSL Enabled</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Enable SSL/TLS encryption
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.security.sslEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      security: { ...formData.security, sslEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Notification Configuration
            </h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Email Notifications</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      notifications via email
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.emailNotifications}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, emailNotifications: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>SMS Notifications</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      notifications via SMS
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.smsNotifications}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, smsNotifications: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Push Notifications</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      push notifications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notifications.pushNotifications}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, pushNotifications: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Webhook URL
                  </label>
                  <EnhancedInput
                    value={formData.notifications.webhookUrl}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, webhookUrl: e.target.value }
                    })}
                    mode={mode}
                    placeholder="https://your-webhook-url.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Slack Webhook
                  </label>
                  <EnhancedInput
                    value={formData.notifications.slackWebhook}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, slackWebhook: e.target.value }
                    })}
                    mode={mode}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Teams Webhook
                  </label>
                  <EnhancedInput
                    value={formData.notifications.teamsWebhook}
                    onChange={(e) => setFormData({
                      ...formData,
                      notifications: { ...formData.notifications, teamsWebhook: e.target.value }
                    })}
                    mode={mode}
                    placeholder="https://your-org.webhook.office.com/..."
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Storage */}
        {activeTab === 'storage' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Storage Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Provider
                </label>
                <select
                  value={formData.storage.provider}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, provider: e.target.value as any }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="local">Local Storage</option>
                  <option value="s3">Amazon S3</option>
                  <option value="gcs">Google Storage</option>
                  <option value="azure">Azure Blob Storage</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Bucket/Container
                </label>
                <EnhancedInput
                  value={formData.storage.bucket}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, bucket: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Region
                </label>
                <EnhancedInput
                  value={formData.storage.region}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, region: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Access </label>
                <EnhancedInput
                  value={formData.storage.accessKey}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, accessKey: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Secret </label>
                <EnhancedInput
                  type="password"
                  value={formData.storage.secretKey}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, secretKey: e.target.value }
                  })}
                  mode={mode}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Max File Size (bytes)
                </label>
                <EnhancedInput
                  type="number"
                  value={formData.storage.maxFileSize.toString()}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, maxFileSize: parseInt(e.target.value) }
                  })}
                  mode={mode}
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>CDN Enabled</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Enable Content Delivery </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.storage.cdnEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    storage: { ...formData.storage, cdnEnabled: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </EnhancedCard>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;
