import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Database,
  Server,
  Lock,
  Unlock,
  Key,
  Users,
  Building,
  Star,
  Heart,
  Zap,
  RefreshCw,
  Trash2,
  Archive,
  RotateCcw,
  Copy,
  Share,
  ExternalLink,
  MessageSquare,
  Phone,
  Grid,
  List,
  Columns,
  Maximize,
  Minimize,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Type,
  Bold,
  Italic,
  Underline,
  Link,
  Unlink,
  Code,
  Quote,
  Hash,
  AtSign,
  Percent,
  Minus,
  Divide,
  Equal,
  Infinity,
  Pi,
  Sigma,
  Square,
  Circle,
  Triangle,
  Save,
  Edit,
  Download
  } from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedInput,
  EnhancedModal,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    maintenanceMode: boolean;
    debugMode: boolean;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      maxAge: number;
    };
    sessionPolicy: {
      sessionTimeout: number;
      maxConcurrentSessions: number;
      forceLogoutOnPasswordChange: boolean;
    };
    twoFactorPolicy: {
      enabled: boolean;
      required: boolean;
      gracePeriod: number;
    };
    ipWhitelist: string[];
    ipBlacklist: string[];
    geoRestrictions: {
      enabled: boolean;
      allowedCountries: string[];
      blockedCountries: string[];
    };
  };
  notifications: {
    email: {
      enabled: boolean;
      smtpHost: string;
      smtpPort: number;
      smtpUser: string;
      smtpPassword: string;
      fromEmail: string;
      fromName: string;
    };
    sms: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromNumber: string;
    };
    push: {
      enabled: boolean;
      vapidPublicKey: string;
      vapidPrivateKey: string;
    };
    webhooks: {
      enabled: boolean;
      endpoints: string[];
    };
  };
  integrations: {
    payment: {
      stripe: {
        enabled: boolean;
        publishableKey: string;
        secretKey: string;
        webhookSecret: string;
      };
      paypal: {
        enabled: boolean;
        clientId: string;
        clientSecret: string;
        mode: 'sandbox' | 'live';
      };
    };
    storage: {
      aws: {
        enabled: boolean;
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        bucket: string;
      };
      google: {
        enabled: boolean;
        projectId: string;
        bucket: string;
        credentials: string;
      };
    };
    analytics: {
      googleAnalytics: {
        enabled: boolean;
        trackingId: string;
      };
      mixpanel: {
        enabled: boolean;
        token: string;
      };
    };
  };
  performance: {
    caching: {
      enabled: boolean;
      redisUrl: string;
      ttl: number;
    };
    cdn: {
      enabled: boolean;
      provider: string;
      domain: string;
    };
    compression: {
      enabled: boolean;
      level: number;
    };
  };
}

interface SettingsCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Settings: React.FC = () => {
  const [mode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [editing, setEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);

  // Mock settings data
  const mockSettings: SystemSettings = {
    general: {
      siteName: 'Super Admin Portal',
      siteDescription: 'Enterprise-grade multi-portal SaaS platform',
      timezone: 'America/Los_Angeles',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      language: 'en-US',
      maintenanceMode: false,
      debugMode: false
    },
    security: {
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90
      },
      sessionPolicy: {
        sessionTimeout: 30,
        maxConcurrentSessions: 5,
        forceLogoutOnPasswordChange: true
      },
      twoFactorPolicy: {
        enabled: true,
        required: false,
        gracePeriod: 7
      },
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      ipBlacklist: ['192.168.1.100'],
      geoRestrictions: {
        enabled: false,
        allowedCountries: ['US', 'CA', 'GB'],
        blockedCountries: []
      }
    },
    notifications: {
      email: {
        enabled: true,
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'noreply@company.com',
        smtpPassword: '********',
        fromEmail: 'noreply@company.com',
        fromName: 'Super Admin Portal'
      },
      sms: {
        enabled: false,
        provider: 'twilio',
        apiKey: '********',
        fromNumber: '+1234567890'
      },
      push: {
        enabled: true,
        vapidPublicKey: 'BP...',
        vapidPrivateKey: '********'
      },
      webhooks: {
        enabled: false,
        endpoints: []
      }
    },
    integrations: {
      payment: {
        stripe: {
          enabled: true,
          publishableKey: 'pk_test_...',
          secretKey: 'sk_test_...',
          webhookSecret: 'whsec_...'
        },
        paypal: {
          enabled: false,
          clientId: '',
          clientSecret: '',
          mode: 'sandbox'
        }
      },
      storage: {
        aws: {
          enabled: true,
          accessKeyId: 'AKIA...',
          secretAccessKey: '********',
          region: 'us-west-2',
          bucket: 'company-assets'
        },
        google: {
          enabled: false,
          projectId: '',
          bucket: '',
          credentials: ''
        }
      },
      analytics: {
        googleAnalytics: {
          enabled: true,
          trackingId: 'GA-123456789'
        },
        mixpanel: {
          enabled: false,
          token: ''
        }
      }
    },
    performance: {
      caching: {
        enabled: true,
        redisUrl: 'redis://localhost:6379',
        ttl: 3600
      },
      cdn: {
        enabled: true,
        provider: 'cloudflare',
        domain: 'cdn.company.com'
      },
      compression: {
        enabled: true,
        level: 6
      }
    }
  };

  const settingsCategories: SettingsCategory[] = [
    {
      id: 'general',
      name: 'General',
      description: 'Basic system configuration',
      icon: SettingsIcon,
      color: 'text-blue-500'
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Security policies and settings',
      icon: Shield,
      color: 'text-red-500'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Email, SMS, and push notifications',
      icon: Bell,
      color: 'text-green-500'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Third-party service connections',
      icon: Link,
      color: 'text-purple-500'
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Caching and optimization settings',
      icon: Zap,
      color: 'text-orange-500'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveSettings = () => {
    // Handle settings save logic
    console.log('Settings saved');
    setEditing(false);
    setShowSaveModal(false);
  };

  const handleResetSettings = () => {
    // Handle settings reset logic
    console.log('Settings reset');
    setShowResetModal(false);
  };

  const handleBackupSettings = () => {
    // Handle settings backup logic
    console.log('Settings backed up');
    setShowBackupModal(false);
  };

  const getStatusBadge = (enabled: boolean) => {
    return enabled ? (
      <EnhancedBadge variant="success" mode={mode}>Enabled</EnhancedBadge>
    ) : (
      <EnhancedBadge variant="default" mode={mode}>Disabled</EnhancedBadge>
    );
  };

  if (loading || !settings) {
    return (
      <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              System Settings
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Configure system-wide settings and preferences
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              
              icon={<Download className="w-4 h-4" />}
              onClick={() => setShowBackupModal(true)}
              mode={mode}
            >
              Backup
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={() => setShowResetModal(true)}
              mode={mode}
            >
              Reset
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              
              icon={editing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              onClick={() => editing ? setShowSaveModal(true) : setEditing(true)}
              mode={mode}
            >
              {editing ? 'Save Changes' : 'Edit Settings'}
            </EnhancedButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Categories */}
          <div className="lg:col-span-1">
            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Categories
              </h3>
              <div className="space-y-2">
                {settingsCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors
                      ${activeCategory === category.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    <div>
                      <p className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        {category.name}
                      </p>
                      <p className={`text-xs ${stableStyles.textSecondary[mode]}`}>
                        {category.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </EnhancedCard>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {activeCategory === 'general' && (
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  General Settings
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                        Site Name
                      </label>
                      <EnhancedInput
                        value={settings.general.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value }
                        })}
                        disabled={!editing}
                        mode={mode}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                        Site Description
                      </label>
                      <EnhancedInput
                        value={settings.general.siteDescription}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteDescription: e.target.value }
                        })}
                        disabled={!editing}
                        mode={mode}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                        Timezone
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: e.target.value }
                        })}
                        disabled={!editing}
                        className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                      >
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                        Language
                      </label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, language: e.target.value }
                        })}
                        disabled={!editing}
                        className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Maintenance Mode
                      </h4>
                      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                        Temporarily disable the system for maintenance
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, maintenanceMode: e.target.checked }
                      })}
                      disabled={!editing}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Debug Mode
                      </h4>
                      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                        Enable detailed error reporting and logging
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.general.debugMode}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, debugMode: e.target.checked }
                      })}
                      disabled={!editing}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </EnhancedCard>
            )}

            {activeCategory === 'security' && (
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Security Settings
                </h3>
                <div className="space-y-6">
                  {/* Password Policy */}
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                      Password Policy
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                          Minimum Length
                        </label>
                        <EnhancedInput
                          type="number"
                                                     value={settings.security.passwordPolicy.minLength.toString()}
                           onChange={(e) => setSettings({
                             ...settings,
                             security: {
                               ...settings.security,
                               passwordPolicy: {
                                 ...settings.security.passwordPolicy,
                                 minLength: parseInt(e.target.value)
                               }
                             }
                           })}
                          disabled={!editing}
                          mode={mode}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                          Maximum Age (days)
                        </label>
                        <EnhancedInput
                          type="number"
                          value={settings.security.passwordPolicy.maxAge.toString()}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              passwordPolicy: {
                                ...settings.security.passwordPolicy,
                                maxAge: parseInt(e.target.value)
                              }
                            }
                          })}
                          disabled={!editing}
                          mode={mode}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        {Object.entries(settings.security.passwordPolicy).map(([key, value]) => {
                          if (typeof value === 'boolean') {
                            return (
                              <div key={key} className="flex items-center justify-between">
                                <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                                  Require {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={(e) => setSettings({
                                    ...settings,
                                    security: {
                                      ...settings.security,
                                      passwordPolicy: {
                                        ...settings.security.passwordPolicy,
                                        [key]: e.target.checked
                                      }
                                    }
                                  })}
                                  disabled={!editing}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Session Policy */}
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                      Session Policy
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                          Session Timeout (minutes)
                        </label>
                        <EnhancedInput
                          type="number"
                          value={settings.security.sessionPolicy.sessionTimeout.toString()}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              sessionPolicy: {
                                ...settings.security.sessionPolicy,
                                sessionTimeout: parseInt(e.target.value)
                              }
                            }
                          })}
                          disabled={!editing}
                          mode={mode}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                          Max Concurrent Sessions
                        </label>
                        <EnhancedInput
                          type="number"
                          value={settings.security.sessionPolicy.maxConcurrentSessions.toString()}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              sessionPolicy: {
                                ...settings.security.sessionPolicy,
                                maxConcurrentSessions: parseInt(e.target.value)
                              }
                            }
                          })}
                          disabled={!editing}
                          mode={mode}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Two-Factor Policy */}
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                      Two-Factor Authentication
                    </h4>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable 2FA
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorPolicy.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              twoFactorPolicy: {
                                ...settings.security.twoFactorPolicy,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Require 2FA for all users
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorPolicy.required}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: {
                              ...settings.security,
                              twoFactorPolicy: {
                                ...settings.security.twoFactorPolicy,
                                required: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            )}

            {activeCategory === 'notifications' && (
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Notification Settings
                </h3>
                <div className="space-y-6">
                  {/* Email Settings */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Email Notifications
                      </h4>
                      {getStatusBadge(settings.notifications.email.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable Email Notifications
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.email.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              email: {
                                ...settings.notifications.email,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                            SMTP Host
                          </label>
                          <EnhancedInput
                            value={settings.notifications.email.smtpHost}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: {
                                  ...settings.notifications.email,
                                  smtpHost: e.target.value
                                }
                              }
                            })}
                            disabled={!editing}
                            mode={mode}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                            SMTP Port
                          </label>
                          <EnhancedInput
                            type="number"
                            value={settings.notifications.email.smtpPort.toString()}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: {
                                  ...settings.notifications.email,
                                  smtpPort: parseInt(e.target.value)
                                }
                              }
                            })}
                            disabled={!editing}
                            mode={mode}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SMS Settings */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        SMS Notifications
                      </h4>
                      {getStatusBadge(settings.notifications.sms.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable SMS Notifications
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.sms.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              sms: {
                                ...settings.notifications.sms,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Push Notifications
                      </h4>
                      {getStatusBadge(settings.notifications.push.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable Push Notifications
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.notifications.push.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              push: {
                                ...settings.notifications.push,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            )}

            {activeCategory === 'integrations' && (
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Integration Settings
                </h3>
                <div className="space-y-6">
                  {/* Payment Integrations */}
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                      Payment Gateways
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                            Stripe
                          </span>
                          {getStatusBadge(settings.integrations.payment.stripe.enabled)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                            Enable Stripe Payments
                          </span>
                          <input
                            type="checkbox"
                            checked={settings.integrations.payment.stripe.enabled}
                            onChange={(e) => setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                payment: {
                                  ...settings.integrations.payment,
                                  stripe: {
                                    ...settings.integrations.payment.stripe,
                                    enabled: e.target.checked
                                  }
                                }
                              }
                            })}
                            disabled={!editing}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                            PayPal
                          </span>
                          {getStatusBadge(settings.integrations.payment.paypal.enabled)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                            Enable PayPal Payments
                          </span>
                          <input
                            type="checkbox"
                            checked={settings.integrations.payment.paypal.enabled}
                            onChange={(e) => setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                payment: {
                                  ...settings.integrations.payment,
                                  paypal: {
                                    ...settings.integrations.payment.paypal,
                                    enabled: e.target.checked
                                  }
                                }
                              }
                            })}
                            disabled={!editing}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Storage Integrations */}
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                      Storage Providers
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                            AWS S3
                          </span>
                          {getStatusBadge(settings.integrations.storage.aws.enabled)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                            Enable AWS S3 Storage
                          </span>
                          <input
                            type="checkbox"
                            checked={settings.integrations.storage.aws.enabled}
                            onChange={(e) => setSettings({
                              ...settings,
                              integrations: {
                                ...settings.integrations,
                                storage: {
                                  ...settings.integrations.storage,
                                  aws: {
                                    ...settings.integrations.storage.aws,
                                    enabled: e.target.checked
                                  }
                                }
                              }
                            })}
                            disabled={!editing}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            )}

            {activeCategory === 'performance' && (
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Performance Settings
                </h3>
                <div className="space-y-6">
                  {/* Caching */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Caching
                      </h4>
                      {getStatusBadge(settings.performance.caching.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable Redis Caching
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.performance.caching.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            performance: {
                              ...settings.performance,
                              caching: {
                                ...settings.performance.caching,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                          Redis URL
                        </label>
                        <EnhancedInput
                          value={settings.performance.caching.redisUrl}
                          onChange={(e) => setSettings({
                            ...settings,
                            performance: {
                              ...settings.performance,
                              caching: {
                                ...settings.performance.caching,
                                redisUrl: e.target.value
                              }
                            }
                          })}
                          disabled={!editing}
                          mode={mode}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CDN */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Content Delivery </h4>
                      {getStatusBadge(settings.performance.cdn.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable CDN
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.performance.cdn.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            performance: {
                              ...settings.performance,
                              cdn: {
                                ...settings.performance.cdn,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compression */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        Compression
                      </h4>
                      {getStatusBadge(settings.performance.compression.enabled)}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                          Enable Gzip Compression
                        </span>
                        <input
                          type="checkbox"
                          checked={settings.performance.compression.enabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            performance: {
                              ...settings.performance,
                              compression: {
                                ...settings.performance.compression,
                                enabled: e.target.checked
                              }
                            }
                          })}
                          disabled={!editing}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnhancedModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Settings"
        mode={mode}
      >
        <div className="space-y-4">
          <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            Are you sure you want to save these settings? This will apply the changes immediately.
          </p>
          <div className="flex justify-end space-x-3">
            <EnhancedButton
              variant="secondary"
              onClick={() => setShowSaveModal(false)}
              mode={mode}
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              onClick={handleSaveSettings}
              mode={mode}
            >
              Save Settings
            </EnhancedButton>
          </div>
        </div>
      </EnhancedModal>

      <EnhancedModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Settings"
        mode={mode}
      >
        <div className="space-y-4">
          <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            Are you sure you want to reset all settings to their default values? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <EnhancedButton
              variant="secondary"
              onClick={() => setShowResetModal(false)}
              mode={mode}
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton
              variant="danger"
              onClick={handleResetSettings}
              mode={mode}
            >
              Reset Settings
            </EnhancedButton>
          </div>
        </div>
      </EnhancedModal>

      <EnhancedModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        title="Backup Settings"
        mode={mode}
      >
        <div className="space-y-4">
          <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            Create a backup of all current settings. This will download a JSON file containing all configuration.
          </p>
          <div className="flex justify-end space-x-3">
            <EnhancedButton
              variant="secondary"
              onClick={() => setShowBackupModal(false)}
              mode={mode}
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              onClick={handleBackupSettings}
              mode={mode}
            >
              Download Backup
            </EnhancedButton>
          </div>
        </div>
      </EnhancedModal>
    </div>
  );
};

export default Settings;
