import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'team',
      activityFeed: true,
      searchable: true
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false
    }
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Preferences</h1>
          <p className="text-gray-600 mt-2">
            Customize your user experience and account settings
          </p>
        </div>
        <EnhancedButton onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </EnhancedButton>
      </div>

      <div className="grid gap-6">
        {/* Language & Regional */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🌐
              </div>
              Language & Regional
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Set your preferred language and regional settings
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <select
                value={preferences.language}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setPreferences(prev => ({
                    ...prev,
                    language: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select
                value={preferences.timezone}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setPreferences(prev => ({
                    ...prev,
                    timezone: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="MST">Mountain Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
          </div>
        </ResponsiveCard>

        {/* Theme & Appearance */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🎨
              </div>
              Theme & Appearance
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose your preferred theme and visual settings
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <select
                value={preferences.theme}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setPreferences(prev => ({
                    ...prev,
                    theme: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
          </div>
        </ResponsiveCard>

        {/* Notifications */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔔
              </div>
              Notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure your notification preferences
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch
                checked={preferences.notifications.email}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch
                checked={preferences.notifications.push}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>SMS Notifications</Label>
              <Switch
                checked={preferences.notifications.sms}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, sms: checked }
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>

        {/* Privacy Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Privacy Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Control your privacy and visibility settings
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <select
                value={preferences.privacy.profileVisibility}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setPreferences(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, profileVisibility: e.target.value }
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="public">Public</option>
                <option value="team">Team Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Show in Activity Feed</Label>
              <Switch
                checked={preferences.privacy.activityFeed}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, activityFeed: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Searchable Profile</Label>
              <Switch
                checked={preferences.privacy.searchable}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, searchable: checked }
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>

        {/* Accessibility */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                ♿
              </div>
              Accessibility
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure accessibility features
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>High Contrast Mode</Label>
              <Switch
                checked={preferences.accessibility.highContrast}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, highContrast: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Large Text</Label>
              <Switch
                checked={preferences.accessibility.largeText}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, largeText: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Reduced Motion</Label>
              <Switch
                checked={preferences.accessibility.reducedMotion}
                onCheckedChange={(checked: boolean) => 
                  setPreferences(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, reducedMotion: checked }
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default UserPreferences;
