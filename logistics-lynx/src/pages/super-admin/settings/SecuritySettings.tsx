import React, { useState, useEffect } from 'react';
import { Shield, Save, RefreshCw, Trash2, Plus, Users, Clock, CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  EnhancedCard, 
  EnhancedBadge, 
  EnhancedInput, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface SecurityConfig {
  authentication: {
    twoFactorEnabled: boolean;
    twoFactorMethod: 'sms' | 'email' | 'authenticator';
    sessionTimeout: number;
    maxConcurrentSessions: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      maxAge: number;
      preventReuse: number;
    };
    lockoutPolicy: {
      maxAttempts: number;
      lockoutDuration: number;
      resetAfter: number;
    };
  };
  accessControl: {
    ipWhitelist: string[];
    ipBlacklist: string[];
    allowedDomains: string[];
    blockedDomains: string[];
    geoRestrictions: {
      enabled: boolean;
      allowedCountries: string[];
      blockedCountries: string[];
    };
    timeRestrictions: {
      enabled: boolean;
      allowedHours: { start: number; end: number };
      allowedDays: number[];
    };
  };
  auditLogging: {
    enabled: boolean;
    retentionDays: number;
    logLevel: 'error' | 'warn' | 'info' | 'debug';
    events: {
      login: boolean;
      logout: boolean;
      passwordChange: boolean;
      permissionChange: boolean;
      dataAccess: boolean;
      systemChange: boolean;
    };
  };
  encryption: {
    dataAtRest: boolean;
    dataInTransit: boolean;
    algorithm: 'AES-256' | 'AES-128' | 'ChaCha20';
    keyRotation: number;
    sslCertificate: string;
    sslKey: string;
  };
  compliance: {
    gdpr: boolean;
    hipaa: boolean;
    soc2: boolean;
    pci: boolean;
    iso27001: boolean;
    dataRetention: {
      enabled: boolean;
      retentionPeriod: number;
      autoDelete: boolean;
    };
  };
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change' | 'data_access' | 'system_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  ip: string;
  location: string;
  timestamp: string;
  description: string;
  details: string;
}

const SecuritySettings: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // const [saving, setSaving] = useState(false);

  const [mode] = useState<'light' | 'dark'>('light');
  // const [, setSaving] = useState(false);
  // const [, setLoading] = useState(false);
  const [showIPModal, setShowIPModal] = useState(false);



  // const [showIPModal, setShowIPModal] = useState(false);
  // const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [config] = useState<SecurityConfig>({
    authentication: {
      twoFactorEnabled: true,
      twoFactorMethod: 'authenticator',
      sessionTimeout: 3600,
      maxConcurrentSessions: 3,
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90,
        preventReuse: 5
      },
      lockoutPolicy: {
        maxAttempts: 5,
        lockoutDuration: 900,
        resetAfter: 3600
      }
    },
    accessControl: {
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      ipBlacklist: [],
      allowedDomains: ['company.com', 'partner.com'],
      blockedDomains: [],
      geoRestrictions: {
        enabled: false,
        allowedCountries: ['US', 'CA', 'UK'],
        blockedCountries: []
      },
      timeRestrictions: {
        enabled: false,
        allowedHours: { start: 0, end: 23 },
        allowedDays: [0, 1, 2, 3, 4, 5, 6]
      }
    },
    auditLogging: {
      enabled: true,
      retentionDays: 365,
      logLevel: 'info',
      events: {
        login: true,
        logout: true,
        passwordChange: true,
        permissionChange: true,
        dataAccess: true,
        systemChange: true
      }
    },
    encryption: {
      dataAtRest: true,
      dataInTransit: true,
      algorithm: 'AES-256',
      keyRotation: 90,
      sslCertificate: '',
      sslKey: ''
    },
    compliance: {
      gdpr: true,
      hipaa: false,
      soc2: true,
      pci: false,
      iso27001: false,
      dataRetention: {
        enabled: true,
        retentionPeriod: 2555,
        autoDelete: true
      }
    }
  });

  const [formData, setFormData] = useState(config);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  // Mock security events
  useEffect(() => {
    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'failed_login',
        severity: 'medium',
        user: 'unknown@example.com',
        ip: '192.168.1.100',
        location: 'New York, NY',
        timestamp: '2024-01-15 14:30:00',
        description: 'Multiple failed login attempts',
        details: '5 failed attempts from IP 192.168.1.100'
      },
      {
        id: '2',
        type: 'login',
        severity: 'low',
        user: 'admin@company.com',
        ip: '10.0.0.50',
        location: 'San Francisco, CA',
        timestamp: '2024-01-15 14:25:00',
        description: 'Successful login',
        details: 'Login from trusted IP address'
      },
      {
        id: '3',
        type: 'permission_change',
        severity: 'high',
        user: 'admin@company.com',
        ip: '10.0.0.50',
        location: 'San Francisco, CA',
        timestamp: '2024-01-15 14:20:00',
        description: 'User permissions modified',
        details: 'User john.doe@company.com granted admin privileges'
      }
    ];
    setSecurityEvents(mockEvents);
  }, []);

  // const handleSave = async () => {
  //   setSaving(true);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   setConfig(formData);
  //   setSaving(false);
  // };

  //   // const handleTestSecurity = async () => {
  //   setLoading(true);
  //   // Simulate security test
  //   await new Promise(resolve => setTimeout(resolve, 1500));
  //   setLoading(false);
  //   alert('Security configuration test completed successfully!');
  // };

  const tabs = [
    { id: 'authentication', label: 'Authentication', icon: Lock },
    { id: 'accessControl', label: 'Access Control', icon: Users },
    { id: 'auditLogging', label: 'Audit Logging', icon: Clock },
    { id: 'encryption', label: 'Encryption', icon: Shield },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'events', label: 'Security Events', icon: AlertTriangle }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      case 'high':
        return <EnhancedBadge variant="danger" mode={mode}>High</EnhancedBadge>;
      case 'medium':
        return <EnhancedBadge variant="warning" mode={mode}>Medium</EnhancedBadge>;
      case 'low':
        return <EnhancedBadge variant="default" mode={mode}>Low</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'failed_login':
        return <EnhancedBadge variant="danger" mode={mode}>Failed Login</EnhancedBadge>;
      case 'login':
        return <EnhancedBadge variant="success" mode={mode}>Login</EnhancedBadge>;
      case 'logout':
        return <EnhancedBadge variant="default" mode={mode}>Logout</EnhancedBadge>;
      case 'password_change':
        return <EnhancedBadge variant="warning" mode={mode}>Password Change</EnhancedBadge>;
      case 'permission_change':
        return <EnhancedBadge variant="warning" mode={mode}>Permission Change</EnhancedBadge>;
      case 'data_access':
        return <EnhancedBadge variant="default" mode={mode}>Data Access</EnhancedBadge>;
      case 'system_change':
        return <EnhancedBadge variant="warning" mode={mode}>System Change</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              Security Settings
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Configure security policies and access controls
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => setFormData(config)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Test Security
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <EnhancedCard mode={mode}>
          <div className="flex space-x-1 border-b">
            {tabs.map((tab) => {
              // const Icon = tab.icon;
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
                  <Lock className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </EnhancedCard>

        {/* Authentication Settings */}
        {activeTab === 'authentication' && (
          <div className="space-y-6">
            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Two-Factor Authentication
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Enable 2FA</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Require two-factor authentication for all users
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.authentication.twoFactorEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: { ...formData.authentication, twoFactorEnabled: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    2FA Method
                  </label>
                  <select
                    value={formData.authentication.twoFactorMethod}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: { ...formData.authentication, twoFactorMethod: e.target.value as any }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="authenticator">Authenticator App</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Session Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Session Timeout (seconds)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.authentication.sessionTimeout.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: { ...formData.authentication, sessionTimeout: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Max Concurrent Sessions
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.authentication.maxConcurrentSessions.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: { ...formData.authentication, maxConcurrentSessions: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Password Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Minimum Length
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.authentication.passwordPolicy.minLength.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          minLength: parseInt(e.target.value)
                        }
                      }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Maximum Age (days)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.authentication.passwordPolicy.maxAge.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          maxAge: parseInt(e.target.value)
                        }
                      }
                    })}
                    mode={mode}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>Require Uppercase</span>
                  <input
                    type="checkbox"
                    checked={formData.authentication.passwordPolicy.requireUppercase}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          requireUppercase: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>Require Lowercase</span>
                  <input
                    type="checkbox"
                    checked={formData.authentication.passwordPolicy.requireLowercase}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          requireLowercase: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>Require Numbers</span>
                  <input
                    type="checkbox"
                    checked={formData.authentication.passwordPolicy.requireNumbers}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          requireNumbers: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>Require Special Characters</span>
                  <input
                    type="checkbox"
                    checked={formData.authentication.passwordPolicy.requireSpecialChars}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        passwordPolicy: {
                          ...formData.authentication.passwordPolicy,
                          requireSpecialChars: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Account Lockout Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Max Login Attempts
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.authentication.lockoutPolicy.maxAttempts.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        lockoutPolicy: {
                          ...formData.authentication.lockoutPolicy,
                          maxAttempts: parseInt(e.target.value)
                        }
                      }
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
                    value={formData.authentication.lockoutPolicy.lockoutDuration.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      authentication: {
                        ...formData.authentication,
                        lockoutPolicy: {
                          ...formData.authentication.lockoutPolicy,
                          lockoutDuration: parseInt(e.target.value)
                        }
                      }
                    })}
                    mode={mode}
                  />
                </div>
              </div>
            </EnhancedCard>
          </div>
        )}

        {/* Access Control Settings */}
        {activeTab === 'accessControl' && (
          <div className="space-y-6">
            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                IP Access Control
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      IP Whitelist
                    </label>
                    <Button onClick={() => setShowIPModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add IP
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.accessControl.ipWhitelist.map((ip, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm text-green-800">{ip}</span>
                        <Button
                          onClick={() => {
                            const newList = formData.accessControl.ipWhitelist.filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              accessControl: { ...formData.accessControl, ipWhitelist: newList }
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      IP Blacklist
                    </label>
                    <Button onClick={() => setShowIPModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add IP
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.accessControl.ipBlacklist.map((ip, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="text-sm text-red-800">{ip}</span>
                        <Button
                          onClick={() => {
                            const newList = formData.accessControl.ipBlacklist.filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              accessControl: { ...formData.accessControl, ipBlacklist: newList }
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </EnhancedCard>

            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Geographic Restrictions
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Enable Geo Restrictions</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Restrict access based on geographic location
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.accessControl.geoRestrictions.enabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessControl: {
                        ...formData.accessControl,
                        geoRestrictions: {
                          ...formData.accessControl.geoRestrictions,
                          enabled: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Allowed Countries
                    </label>
                    <select
                      multiple
                      value={formData.accessControl.geoRestrictions.allowedCountries}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData,
                          accessControl: {
                            ...formData.accessControl,
                            geoRestrictions: {
                              ...formData.accessControl.geoRestrictions,
                              allowedCountries: selected
                            }
                          }
                        });
                      }}
                      className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Blocked Countries
                    </label>
                    <select
                      multiple
                      value={formData.accessControl.geoRestrictions.blockedCountries}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({
                          ...formData,
                          accessControl: {
                            ...formData.accessControl,
                            geoRestrictions: {
                              ...formData.accessControl.geoRestrictions,
                              blockedCountries: selected
                            }
                          }
                        });
                      }}
                      className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                    >
                      <option value="CN">China</option>
                      <option value="RU">Russia</option>
                      <option value="IR">Iran</option>
                      <option value="KP">North Korea</option>
                    </select>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </div>
        )}

        {/* Audit Logging Settings */}
        {activeTab === 'auditLogging' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Audit Logging Configuration
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Enable Audit Logging</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Log all security events and user activities
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.auditLogging.enabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    auditLogging: { ...formData.auditLogging, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Retention Period (days)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.auditLogging.retentionDays.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      auditLogging: { ...formData.auditLogging, retentionDays: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Log Level
                  </label>
                  <select
                    value={formData.auditLogging.logLevel}
                    onChange={(e) => setFormData({
                      ...formData,
                      auditLogging: { ...formData.auditLogging, logLevel: e.target.value as any }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="error">Error</option>
                    <option value="warn">Warning</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>
              </div>
              <div>
                <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>Events to Log</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(formData.auditLogging.events).map(([event, enabled]) => (
                    <div key={event} className="flex items-center justify-between">
                      <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                        {event.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <input
                        type="checkbox"
                        checked={enabled as boolean}
                        onChange={(e) => setFormData({
                          ...formData,
                          auditLogging: {
                            ...formData.auditLogging,
                            events: {
                              ...formData.auditLogging.events,
                              [event]: e.target.checked
                            }
                          }
                        })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Encryption Settings */}
        {activeTab === 'encryption' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Encryption Configuration
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Data at Rest</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Encrypt data stored in database
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.encryption.dataAtRest}
                    onChange={(e) => setFormData({
                      ...formData,
                      encryption: { ...formData.encryption, dataAtRest: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Data in Transit</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Encrypt data during transmission
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.encryption.dataInTransit}
                    onChange={(e) => setFormData({
                      ...formData,
                      encryption: { ...formData.encryption, dataInTransit: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Encryption Algorithm
                  </label>
                  <select
                    value={formData.encryption.algorithm}
                    onChange={(e) => setFormData({
                      ...formData,
                      encryption: { ...formData.encryption, algorithm: e.target.value as any }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="AES-256">AES-256</option>
                    <option value="AES-128">AES-128</option>
                    <option value="ChaCha20">ChaCha20</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Key Rotation (days)
                  </label>
                  <EnhancedInput
                    type="number"
                    value={formData.encryption.keyRotation.toString()}
                    onChange={(e) => setFormData({
                      ...formData,
                      encryption: { ...formData.encryption, keyRotation: parseInt(e.target.value) }
                    })}
                    mode={mode}
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Compliance Settings */}
        {activeTab === 'compliance' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Compliance Configuration
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>GDPR Compliance</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      General Data Protection Regulation
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.compliance.gdpr}
                    onChange={(e) => setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, gdpr: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>HIPAA Compliance</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Health Insurance Portability and Accountability Act
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.compliance.hipaa}
                    onChange={(e) => setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, hipaa: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>SOC 2 Compliance</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Service Organization Control 2
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.compliance.soc2}
                    onChange={(e) => setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, soc2: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>PCI Compliance</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Payment Card Industry Data Security Standard
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.compliance.pci}
                    onChange={(e) => setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, pci: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Security Events */}
        {activeTab === 'events' && (
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Recent Security Events
              </h3>
                <Button
              >
                Export Logs
              </Button>
            </div>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getEventTypeBadge(event.type)}
                      {getSeverityBadge(event.severity)}
                    </div>
                    <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className={`font-medium ${stableStyles.textPrimary[mode]} mb-1`}>
                    {event.description}
                  </div>
                  <div className={`text-sm ${stableStyles.textSecondary[mode]} mb-2`}>
                    {event.details}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>User: {event.user}</span>
                    <span>IP: {event.ip}</span>
                    <span>Location: {event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
