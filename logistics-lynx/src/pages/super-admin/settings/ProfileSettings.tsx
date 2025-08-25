import React, { useState, useEffect } from 'react';
import { 
  User, 
  Camera, 
  Save, 
  Key, 
  Trash2,
  RotateCcw,
  Settings,
  Bell,
  Shield,
  Eye
} from 'lucide-react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedInput, 
  EnhancedModal, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  timezone: string;
  language: string;
  bio: string;
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  dateOfBirth: string;
  hireDate: string;
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      marketing: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'team';
      showEmail: boolean;
      showPhone: boolean;
      showLocation: boolean;
    };
    accessibility: {
      fontSize: 'small' | 'medium' | 'large';
      highContrast: boolean;
      reduceMotion: boolean;
    };
  };
}

const ProfileSettings: React.FC = () => {
  const [mode] = useState<'light' | 'dark'>('light');
  const [saving, setSaving] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    role: 'Super Admin',
    department: 'IT',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    language: 'en',
    bio: 'Experienced Super Administrator with expertise in enterprise system management and security.',
    website: 'https://johndoe.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    dateOfBirth: '1985-06-15',
    hireDate: '2020-03-01',
    lastLogin: '2024-01-15 14:30:00',
    preferences: {
      theme: 'auto',
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: false
      },
      privacy: {
        profileVisibility: 'team',
        showEmail: true,
        showPhone: false,
        showLocation: true
      },
      accessibility: {
        fontSize: 'medium',
        highContrast: false,
        reduceMotion: false
      }
    }
  });

  const [formData, setFormData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProfile(formData);
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSaving(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'accessibility', label: 'Accessibility', icon: Eye }
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
              Profile </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              mode={mode}
              onClick={() => setFormData(profile)}
            >
              Reset
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <EnhancedCard mode={mode} elevated>
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`
                    )}
                  </div>
                  <button
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    {formData.role}
                  </p>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    {formData.department}
                  </p>
                </div>
                <div className="space-y-2">
                  <EnhancedButton
                    variant="secondary"
                    size="sm"
                    icon={<Camera className="w-4 h-4" />}
                    mode={mode}
                    onClick={() => setShowAvatarModal(true)}
                  >
                    Change Photo
                  </EnhancedButton>
                  <EnhancedButton
                    variant="secondary"
                    size="sm"
                    icon={<Key className="w-4 h-4" />}
                    mode={mode}
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </EnhancedButton>
                </div>
              </div>
            </EnhancedCard>

            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      First Name
                    </label>
                    <EnhancedInput
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Last Name
                    </label>
                    <EnhancedInput
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Email
                    </label>
                    <EnhancedInput
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      </label>
                    <EnhancedInput
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Date of Birth
                    </label>
                    <EnhancedInput
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Location
                    </label>
                    <EnhancedInput
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      mode={mode}
                    />
                  </div>
                </div>
              </EnhancedCard>

              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Role
                    </label>
                    <EnhancedInput
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Department
                    </label>
                    <EnhancedInput
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Hire Date
                    </label>
                    <EnhancedInput
                      type="date"
                      value={formData.hireDate}
                      onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                      mode={mode}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                      Website
                    </label>
                    <EnhancedInput
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      mode={mode}
                    />
                  </div>
                </div>
              </EnhancedCard>

              <EnhancedCard mode={mode} elevated>
                <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                  Bio
                </h3>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent resize-none`}
                  placeholder="Tell us about yourself..."
                />
              </EnhancedCard>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <EnhancedCard mode={mode} elevated>
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
                Display Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Theme
                  </label>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        theme: e.target.value as 'light' | 'dark' | 'auto'
                      }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </EnhancedCard>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Email Notifications</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Receive notifications via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        email: e.target.checked
                      }
                    }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Push Notifications</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Receive push notifications in browser
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications.push}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        push: e.target.checked
                      }
                    }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>SMS Notifications</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Receive notifications via SMS
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications.sms}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        sms: e.target.checked
                      }
                    }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Marketing Communications</h4>
                  <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    Receive marketing and promotional emails
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications.marketing}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      notifications: {
                        ...formData.preferences.notifications,
                        marketing: e.target.checked
                      }
                    }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Privacy </h3>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Profile Visibility
                </label>
                <select
                  value={formData.preferences.privacy.profileVisibility}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      privacy: {
                        ...formData.preferences.privacy,
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Show Email Address</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Allow others to see your email address
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.preferences.privacy.showEmail}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        privacy: {
                          ...formData.preferences.privacy,
                          showEmail: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Show Number</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Allow others to see your phone number
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.preferences.privacy.showPhone}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        privacy: {
                          ...formData.preferences.privacy,
                          showPhone: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Show Location</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Allow others to see your location
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.preferences.privacy.showLocation}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        privacy: {
                          ...formData.preferences.privacy,
                          showLocation: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <EnhancedCard mode={mode} elevated>
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-4`}>
              Accessibility </h3>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                  Font Size
                </label>
                <select
                  value={formData.preferences.accessibility.fontSize}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      accessibility: {
                        ...formData.preferences.accessibility,
                        fontSize: e.target.value as 'small' | 'medium' | 'large'
                      }
                    }
                  })}
                  className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>High Contrast</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Enable high contrast mode for better visibility
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.preferences.accessibility.highContrast}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        accessibility: {
                          ...formData.preferences.accessibility,
                          highContrast: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${stableStyles.textPrimary[mode]}`}>Reduce Motion</h4>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Reduce animations and motion effects
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.preferences.accessibility.reduceMotion}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        accessibility: {
                          ...formData.preferences.accessibility,
                          reduceMotion: e.target.checked
                        }
                      }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Avatar Modal */}
        <EnhancedModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          title="Change Profile Photo"
          mode={mode}
          size="md"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`
                )}
              </div>
              <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                a new profile photo
              </p>
            </div>
            <div className="space-y-3">
              <EnhancedButton
                variant="primary"
                size="sm"
                icon={<Camera className="w-4 h-4" />}
                mode={mode}
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                Photo
              </EnhancedButton>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              {formData.avatar && (
                <EnhancedButton
                  variant="danger"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  mode={mode}
                  onClick={() => setFormData({ ...formData, avatar: '' })}
                >
                  Remove Photo
                </EnhancedButton>
              )}
            </div>
          </div>
        </EnhancedModal>

        {/* Password Change Modal */}
        <EnhancedModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          title="Change Password"
          mode={mode}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                Current Password
              </label>
              <EnhancedInput
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                mode={mode}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                New Password
              </label>
              <EnhancedInput
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                mode={mode}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                Confirm New Password
              </label>
              <EnhancedInput
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                mode={mode}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <EnhancedButton
                variant="secondary"
                onClick={() => setShowPasswordModal(false)}
                mode={mode}
              >
                Cancel
              </EnhancedButton>
              <EnhancedButton
                variant="primary"
                onClick={handlePasswordChange}
                loading={saving}
                mode={mode}
              >
                Change Password
              </EnhancedButton>
            </div>
          </div>
        </EnhancedModal>
      </div>
    </div>
  );
};

export default ProfileSettings;
