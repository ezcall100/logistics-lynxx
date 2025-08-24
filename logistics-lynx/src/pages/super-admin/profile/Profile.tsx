import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Settings,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Lock,
  Unlock,
  Database,
  Server,
  Globe,
  Building,
  CreditCard,
  Star,
  Heart,
  Zap,
  RefreshCw,
  Plus,
  Trash2,
  Archive,
  RotateCcw,
  Copy,
  Share,
  ExternalLink,
  MessageSquare,
  Phone as PhoneIcon,
  Video,
  Camera as CameraIcon,
  Image,
  File,
  Folder,
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
  Hexagon,
  Octagon,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Droplets,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Wind,
  Thermometer,
  Gauge,
  Timer,
  Navigation,
  Compass,
  Map,
  Layers,
  Grid3X3,
  Rows,
  Sidebar,
  SidebarClose,
  SidebarOpen,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutTemplate,
  LayoutDashboard
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedInput,
  EnhancedModal,
  EnhancedProgress,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  department: string;
  company: string;
  bio: string;
  dateOfBirth: string;
  hireDate: string;
  lastLogin: string;
  loginCount: number;
  status: 'active' | 'inactive' | 'pending';
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'team';
      activityVisibility: 'public' | 'private' | 'team';
    };
  };
  permissions: string[];
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    startDate: string;
    endDate: string;
  };
}

interface ActivityLog {
  id: string;
  type: 'login' | 'logout' | 'profile_update' | 'password_change' | 'settings_change' | 'data_access' | 'system_action';
  description: string;
  timestamp: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
}

interface SecurityEvent {
  id: string;
  type: 'failed_login' | 'password_reset' | 'two_factor_enabled' | 'two_factor_disabled' | 'permission_change' | 'suspicious_activity';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

const Profile: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [editing, setEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data
  const mockProfile: UserProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: '/api/avatars/john-doe.jpg',
    role: 'Super Admin',
    department: 'IT Administration',
    company: 'Tech Corp',
    bio: 'Experienced system administrator with expertise in enterprise software management and security.',
    dateOfBirth: '1985-03-15',
    hireDate: '2020-01-15',
    lastLogin: '2024-01-15 14:30:00',
    loginCount: 1247,
    status: 'active',
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: true,
    preferences: {
      theme: 'dark',
      language: 'en-US',
      timezone: 'America/Los_Angeles',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'team',
        activityVisibility: 'private'
      }
    },
    permissions: ['read', 'write', 'admin', 'super_admin', 'user_management', 'system_settings'],
    subscription: {
      plan: 'enterprise',
      status: 'active',
      startDate: '2023-01-01',
      endDate: '2024-12-31'
    }
  };

  const mockActivityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'login',
      description: 'Successfully logged in',
      timestamp: '2024-01-15 14:30:00',
      ip: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0'
    },
    {
      id: '2',
      type: 'profile_update',
      description: 'Updated profile information',
      timestamp: '2024-01-15 13:45:00',
      ip: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0'
    },
    {
      id: '3',
      type: 'settings_change',
      description: 'Changed notification preferences',
      timestamp: '2024-01-15 12:20:00',
      ip: '192.168.1.100',
      location: 'San Francisco, CA',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0'
    }
  ];

  const mockSecurityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'two_factor_enabled',
      description: 'Two-factor authentication enabled',
      timestamp: '2024-01-10 10:30:00',
      severity: 'low',
      resolved: true
    },
    {
      id: '2',
      type: 'failed_login',
      description: 'Failed login attempt from unknown IP',
      timestamp: '2024-01-08 15:20:00',
      severity: 'medium',
      resolved: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setActivityLogs(mockActivityLogs);
      setSecurityEvents(mockSecurityEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = (updatedProfile: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updatedProfile });
      setEditing(false);
    }
  };

  const handlePasswordChange = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change logic
    console.log('Password changed');
    setShowPasswordModal(false);
  };

  const handleTwoFactorToggle = (enabled: boolean) => {
    if (profile) {
      setProfile({ ...profile, twoFactorEnabled: enabled });
    }
    setShowTwoFactorModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <EnhancedBadge variant="success" mode={mode}>Active</EnhancedBadge>;
      case 'inactive':
        return <EnhancedBadge variant="default" mode={mode}>Inactive</EnhancedBadge>;
      case 'pending':
        return <EnhancedBadge variant="warning" mode={mode}>Pending</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getSubscriptionBadge = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return <EnhancedBadge variant="premium" mode={mode}>Enterprise</EnhancedBadge>;
      case 'premium':
        return <EnhancedBadge variant="success" mode={mode}>Premium</EnhancedBadge>;
      case 'basic':
        return <EnhancedBadge variant="default" mode={mode}>Basic</EnhancedBadge>;
      case 'free':
        return <EnhancedBadge variant="default" mode={mode}>Free</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>{plan}</EnhancedBadge>;
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <User className="w-4 h-4 text-green-500" />;
      case 'logout':
        return <User className="w-4 h-4 text-red-500" />;
      case 'profile_update':
        return <Edit className="w-4 h-4 text-blue-500" />;
      case 'password_change':
        return <Key className="w-4 h-4 text-orange-500" />;
      case 'settings_change':
        return <Settings className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSecurityEventIcon = (type: string) => {
    switch (type) {
      case 'failed_login':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'password_reset':
        return <Key className="w-4 h-4 text-orange-500" />;
      case 'two_factor_enabled':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'two_factor_disabled':
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading || !profile) {
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
              Profile
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Data
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={editing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              onClick={() => setEditing(!editing)}
              mode={mode}
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </EnhancedButton>
          </div>
        </div>

        {/* Profile Overview */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    profile.name.charAt(0).toUpperCase()
                  )}
                </div>
                <button
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center">
                <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                  {profile.name}
                </h2>
                <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                  {profile.role}
                </p>
                {getStatusBadge(profile.status)}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Full Name
                  </label>
                  <EnhancedInput
                    value={profile.name}
                    onChange={(e) => handleSaveProfile({ name: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <EnhancedInput
                      value={profile.email}
                      onChange={(e) => handleSaveProfile({ email: e.target.value })}
                      disabled={!editing}
                      mode={mode}
                    />
                    {profile.emailVerified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Phone
                  </label>
                  <div className="flex items-center space-x-2">
                    <EnhancedInput
                      value={profile.phone}
                      onChange={(e) => handleSaveProfile({ phone: e.target.value })}
                      disabled={!editing}
                      mode={mode}
                    />
                    {profile.phoneVerified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Location
                  </label>
                  <EnhancedInput
                    value={profile.location}
                    onChange={(e) => handleSaveProfile({ location: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Company
                  </label>
                  <EnhancedInput
                    value={profile.company}
                    onChange={(e) => handleSaveProfile({ company: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Department
                  </label>
                  <EnhancedInput
                    value={profile.department}
                    onChange={(e) => handleSaveProfile({ department: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleSaveProfile({ bio: e.target.value })}
                  disabled={!editing}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent resize-none`}
                />
              </div>
            </div>
          </div>
        </EnhancedCard>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'preferences', label: 'Preferences', icon: Settings },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'subscription', label: 'Subscription', icon: CreditCard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Date of Birth
                  </label>
                  <EnhancedInput
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleSaveProfile({ dateOfBirth: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Hire Date
                  </label>
                  <EnhancedInput
                    type="date"
                    value={profile.hireDate}
                    onChange={(e) => handleSaveProfile({ hireDate: e.target.value })}
                    disabled={!editing}
                    mode={mode}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Last Login
                  </label>
                  <p className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                    {new Date(profile.lastLogin).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Login Count
                  </label>
                  <p className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                    {profile.loginCount} logins
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Permissions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.permissions.map((permission) => (
                      <EnhancedBadge key={permission} variant="default" mode={mode}>
                        {permission}
                      </EnhancedBadge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {activeTab === 'security' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Security Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                    Password
                  </h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Last changed 30 days ago
                  </p>
                </div>
                <EnhancedButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowPasswordModal(true)}
                  mode={mode}
                >
                  Change Password
                </EnhancedButton>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                    Two-Factor Authentication
                  </h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <EnhancedButton
                  variant={profile.twoFactorEnabled ? "danger" : "success"}
                  size="sm"
                  onClick={() => setShowTwoFactorModal(true)}
                  mode={mode}
                >
                  {profile.twoFactorEnabled ? 'Disable' : 'Enable'}
                </EnhancedButton>
              </div>

              <div className="space-y-4">
                <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                  Recent Security Events
                </h4>
                <div className="space-y-2">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {getSecurityEventIcon(event.type)}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                          {event.description}
                        </p>
                        <p className={`text-xs ${stableStyles.textSecondary[mode]}`}>
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <EnhancedBadge
                        variant={event.severity === 'critical' ? 'danger' : event.severity === 'high' ? 'warning' : 'default'}
                        mode={mode}
                      >
                        {event.severity}
                      </EnhancedBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {activeTab === 'preferences' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Preferences
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                    Theme
                  </label>
                  <select
                    value={profile.preferences.theme}
                    onChange={(e) => handleSaveProfile({
                      preferences: { ...profile.preferences, theme: e.target.value as 'light' | 'dark' | 'auto' }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                    Language
                  </label>
                  <select
                    value={profile.preferences.language}
                    onChange={(e) => handleSaveProfile({
                      preferences: { ...profile.preferences, language: e.target.value }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                    Timezone
                  </label>
                  <select
                    value={profile.preferences.timezone}
                    onChange={(e) => handleSaveProfile({
                      preferences: { ...profile.preferences, timezone: e.target.value }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                  Notifications
                </h4>
                <div className="space-y-3">
                  {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                      </span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSaveProfile({
                          preferences: {
                            ...profile.preferences,
                            notifications: {
                              ...profile.preferences.notifications,
                              [key]: e.target.checked
                            }
                          }
                        })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className={`font-medium ${stableStyles.textPrimary[mode]} mb-3`}>
                  Privacy Settings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                      Profile Visibility
                    </label>
                    <select
                      value={profile.preferences.privacy.profileVisibility}
                      onChange={(e) => handleSaveProfile({
                        preferences: {
                          ...profile.preferences,
                          privacy: {
                            ...profile.preferences.privacy,
                            profileVisibility: e.target.value as 'public' | 'private' | 'team'
                          }
                        }
                      })}
                      className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                    >
                      <option value="public">Public</option>
                      <option value="team">Team Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-2`}>
                      Activity Visibility
                    </label>
                    <select
                      value={profile.preferences.privacy.activityVisibility}
                      onChange={(e) => handleSaveProfile({
                        preferences: {
                          ...profile.preferences,
                          privacy: {
                            ...profile.preferences.privacy,
                            activityVisibility: e.target.value as 'public' | 'private' | 'team'
                          }
                        }
                      })}
                      className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                    >
                      <option value="public">Public</option>
                      <option value="team">Team Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {activeTab === 'activity' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Activity History
            </h3>
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {getActivityTypeIcon(log.type)}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      {log.description}
                    </p>
                    <p className={`text-xs ${stableStyles.textSecondary[mode]}`}>
                      {new Date(log.timestamp).toLocaleString()} • {log.ip} • {log.location}
                    </p>
                    <p className={`text-xs ${stableStyles.textSecondary[mode]}`}>
                      {log.device} • {log.browser}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>
        )}

        {activeTab === 'subscription' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Subscription Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                    Current Plan
                  </h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    {profile.subscription.plan.charAt(0).toUpperCase() + profile.subscription.plan.slice(1)} Plan
                  </p>
                </div>
                {getSubscriptionBadge(profile.subscription.plan)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    Start Date
                  </label>
                  <p className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                    {new Date(profile.subscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                    End Date
                  </label>
                  <p className={`text-sm ${stableStyles.textPrimary[mode]}`}>
                    {new Date(profile.subscription.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${stableStyles.textSecondary[mode]} mb-1`}>
                  Status
                </label>
                <EnhancedBadge
                  variant={profile.subscription.status === 'active' ? 'success' : 'danger'}
                  mode={mode}
                >
                  {profile.subscription.status.charAt(0).toUpperCase() + profile.subscription.status.slice(1)}
                </EnhancedBadge>
              </div>
            </div>
          </EnhancedCard>
        )}
      </div>

      {/* Modals */}
      <EnhancedModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        title="Update Avatar"
        mode={mode}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                profile.name.charAt(0).toUpperCase()
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              icon={<Upload className="w-4 h-4" />}
              mode={mode}
            >
              Upload Image
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              icon={<Camera className="w-4 h-4" />}
              mode={mode}
            >
              Take Photo
            </EnhancedButton>
          </div>
        </div>
      </EnhancedModal>

      <EnhancedModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        mode={mode}
      >
        <PasswordChangeForm
          onSubmit={handlePasswordChange}
          onCancel={() => setShowPasswordModal(false)}
          mode={mode}
        />
      </EnhancedModal>

      <EnhancedModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        title={profile.twoFactorEnabled ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
        mode={mode}
      >
        <TwoFactorForm
          enabled={profile.twoFactorEnabled}
          onSubmit={handleTwoFactorToggle}
          onCancel={() => setShowTwoFactorModal(false)}
          mode={mode}
        />
      </EnhancedModal>
    </div>
  );
};

// Password Change Form Component
interface PasswordChangeFormProps {
  onSubmit: (currentPassword: string, newPassword: string, confirmPassword: string) => void;
  onCancel: () => void;
  mode: 'light' | 'dark';
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ onSubmit, onCancel, mode }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentPassword, newPassword, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
          Current Password
        </label>
        <div className="relative">
          <EnhancedInput
            type={showPasswords ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            mode={mode}
          />
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
          New Password
        </label>
        <EnhancedInput
          type={showPasswords ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          mode={mode}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
          Confirm New Password
        </label>
        <EnhancedInput
          type={showPasswords ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          mode={mode}
        />
      </div>
      <div className="flex justify-end space-x-3">
        <EnhancedButton
          variant="secondary"
          onClick={onCancel}
          mode={mode}
        >
          Cancel
        </EnhancedButton>
        <EnhancedButton
          variant="primary"
          type="submit"
          mode={mode}
        >
          Change Password
        </EnhancedButton>
      </div>
    </form>
  );
};

// Two-Factor Authentication Form Component
interface TwoFactorFormProps {
  enabled: boolean;
  onSubmit: (enabled: boolean) => void;
  onCancel: () => void;
  mode: 'light' | 'dark';
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ enabled, onSubmit, onCancel, mode }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(!enabled);
  };

  return (
    <div className="space-y-4">
      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
        {enabled 
          ? 'Are you sure you want to disable two-factor authentication? This will make your account less secure.'
          : 'Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.'
        }
      </p>
      
      {!enabled && (
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Verification Code
          </label>
          <EnhancedInput
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            mode={mode}
          />
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <EnhancedButton
          variant="secondary"
          onClick={onCancel}
          mode={mode}
        >
          Cancel
        </EnhancedButton>
        <EnhancedButton
          variant={enabled ? "danger" : "success"}
          onClick={handleSubmit}
          mode={mode}
        >
          {enabled ? 'Disable 2FA' : 'Enable 2FA'}
        </EnhancedButton>
      </div>
    </div>
  );
};

export default Profile;
