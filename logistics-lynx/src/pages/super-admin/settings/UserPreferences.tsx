import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { 
  User, 
  Palette, 
  Bell, 
  Globe, 
  Clock, 
  Eye, 
  Keyboard,
  Monitor,
  Smartphone,
  Tablet,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface UserPreferencesProps {}

const UserPreferences: React.FC<UserPreferencesProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');
  
  const [preferences, setPreferences] = useState({
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      accentColor: '#10B981',
      fontSize: 'medium',
      fontFamily: 'Inter',
      compactMode: false,
      showAnimations: true,
      reduceMotion: false,
      highContrast: false
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      desktop: true,
      sound: true,
      vibration: false,
      quietHours: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
      digest: true,
      digestFrequency: 'daily'
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowMessages: true,
      allowFriendRequests: true,
      shareAnalytics: false,
      shareLocation: false,
      dataCollection: true,
      personalizedAds: false
    },
    accessibility: {
      screenReader: false,
      highContrast: false,
      largeText: false,
      boldText: false,
      reduceMotion: false,
      colorBlind: false,
      keyboardNavigation: true,
      focusIndicators: true
    },
    language: {
      primaryLanguage: 'en',
      secondaryLanguage: 'es',
      autoTranslate: false,
      spellCheck: true,
      grammarCheck: false,
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      timezone: 'America/New_York',
      currency: 'USD'
    },
    dashboard: {
      layout: 'grid',
      defaultView: 'overview',
      showWelcomeMessage: true,
      showQuickActions: true,
      showRecentActivity: true,
      showNotifications: true,
      autoRefresh: true,
      refreshInterval: 30
    }
  });

  const [originalPreferences, setOriginalPreferences] = useState(preferences);

  const handlePreferenceChange = (category: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSavePreferences = async (category: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOriginalPreferences(prev => ({
        ...prev,
        [category]: preferences[category as keyof typeof preferences]
      }));
      console.log(`${category} preferences saved:`, preferences[category as keyof typeof preferences]);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPreferences = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: originalPreferences[category as keyof typeof originalPreferences]
    }));
  };

  const hasChanges = (category: string) => {
    return JSON.stringify(preferences[category as keyof typeof preferences]) !== 
           JSON.stringify(originalPreferences[category as keyof typeof originalPreferences]);
  };

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'accessibility', name: 'Accessibility', icon: Keyboard },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'dashboard', name: 'Dashboard', icon: Monitor }
  ];

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <select
            value={preferences.appearance.theme}
            onChange={(e) => handlePreferenceChange('appearance', 'theme', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Font Size
          </label>
          <select
            value={preferences.appearance.fontSize}
            onChange={(e) => handlePreferenceChange('appearance', 'fontSize', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">Extra Large</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Color
          </label>
          <Input
            type="color"
            value={preferences.appearance.primaryColor}
            onChange={(e) => handlePreferenceChange('appearance', 'primaryColor', e.target.value)}
            className="mt-1 h-10"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Accent Color
          </label>
          <Input
            type="color"
            value={preferences.appearance.accentColor}
            onChange={(e) => handlePreferenceChange('appearance', 'accentColor', e.target.value)}
            className="mt-1 h-10"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="compactMode"
            checked={preferences.appearance.compactMode}
            onChange={(e) => handlePreferenceChange('appearance', 'compactMode', e.target.checked)}
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
            checked={preferences.appearance.showAnimations}
            onChange={(e) => handlePreferenceChange('appearance', 'showAnimations', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="showAnimations" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Show Animations
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="highContrast"
            checked={preferences.appearance.highContrast}
            onChange={(e) => handlePreferenceChange('appearance', 'highContrast', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="highContrast" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            High Contrast Mode
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Digest Frequency
          </label>
          <select
            value={preferences.notifications.digestFrequency}
            onChange={(e) => handlePreferenceChange('notifications', 'digestFrequency', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="never">Never</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quiet Hours Start
          </label>
          <Input
            type="time"
            value={preferences.notifications.quietHoursStart}
            onChange={(e) => handlePreferenceChange('notifications', 'quietHoursStart', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quiet Hours End
          </label>
          <Input
            type="time"
            value={preferences.notifications.quietHoursEnd}
            onChange={(e) => handlePreferenceChange('notifications', 'quietHoursEnd', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {Object.entries(preferences.notifications).filter(([key]) => 
          !['digestFrequency', 'quietHoursStart', 'quietHoursEnd'].includes(key)
        ).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Receive {key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications
              </p>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handlePreferenceChange('notifications', key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Visibility
          </label>
          <select
            value={preferences.privacy.profileVisibility}
            onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {Object.entries(preferences.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Allow {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </p>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handlePreferenceChange('privacy', key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        {Object.entries(preferences.accessibility).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Enable {key.replace(/([A-Z])/g, ' $1').toLowerCase()} for better accessibility
              </p>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handlePreferenceChange('accessibility', key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Language
          </label>
          <select
            value={preferences.language.primaryLanguage}
            onChange={(e) => handlePreferenceChange('language', 'primaryLanguage', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Secondary Language
          </label>
          <select
            value={preferences.language.secondaryLanguage}
            onChange={(e) => handlePreferenceChange('language', 'secondaryLanguage', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Format
          </label>
          <select
            value={preferences.language.dateFormat}
            onChange={(e) => handlePreferenceChange('language', 'dateFormat', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Format
          </label>
          <select
            value={preferences.language.timeFormat}
            onChange={(e) => handlePreferenceChange('language', 'timeFormat', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="12-hour">12-hour</option>
            <option value="24-hour">24-hour</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoTranslate"
            checked={preferences.language.autoTranslate}
            onChange={(e) => handlePreferenceChange('language', 'autoTranslate', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="autoTranslate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Auto-translate content
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="spellCheck"
            checked={preferences.language.spellCheck}
            onChange={(e) => handlePreferenceChange('language', 'spellCheck', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="spellCheck" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable spell check
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="grammarCheck"
            checked={preferences.language.grammarCheck}
            onChange={(e) => handlePreferenceChange('language', 'grammarCheck', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="grammarCheck" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable grammar check
          </label>
        </div>
      </div>
    </div>
  );

  const renderDashboardSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Layout
          </label>
          <select
            value={preferences.dashboard.layout}
            onChange={(e) => handlePreferenceChange('dashboard', 'layout', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="compact">Compact</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Default View
          </label>
          <select
            value={preferences.dashboard.defaultView}
            onChange={(e) => handlePreferenceChange('dashboard', 'defaultView', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="overview">Overview</option>
            <option value="analytics">Analytics</option>
            <option value="tasks">Tasks</option>
            <option value="calendar">Calendar</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Auto-refresh Interval (seconds)
          </label>
          <Input
            type="number"
            value={preferences.dashboard.refreshInterval}
            onChange={(e) => handlePreferenceChange('dashboard', 'refreshInterval', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {Object.entries(preferences.dashboard).filter(([key]) => 
          !['layout', 'defaultView', 'refreshInterval'].includes(key)
        ).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Show {key.replace(/([A-Z])/g, ' $1').toLowerCase()} on dashboard
              </p>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handlePreferenceChange('dashboard', key, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'accessibility':
        return renderAccessibilitySettings();
      case 'language':
        return renderLanguageSettings();
      case 'dashboard':
        return renderDashboardSettings();
      default:
        return renderAppearanceSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            User Preferences
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your personal settings, appearance, and preferences.
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
            <span className="capitalize">{activeTab} Preferences</span>
            <div className="flex space-x-2">
              {hasChanges(activeTab) && (
                <Button
                  variant="outline"
                  onClick={() => handleResetPreferences(activeTab)}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              )}
              <Button
                onClick={() => handleSavePreferences(activeTab)}
                disabled={isLoading || !hasChanges(activeTab)}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Customize your {activeTab} preferences and settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPreferences;
