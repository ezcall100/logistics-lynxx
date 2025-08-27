import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
const LanguageSettings = () => {
  const [languageSettings, setLanguageSettings] = useState({
    primaryLanguage: 'en',
    secondaryLanguage: 'es',
    autoDetect: true,
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    timezone: 'UTC'
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Language & Regional Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure language, date/time format, and regional preferences
          </p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <div className="grid gap-6">
        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🌐
              </div>
              Language Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose your preferred languages
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Language</Label>
              <select
                value={languageSettings.primaryLanguage}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    primaryLanguage: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Secondary Language</Label>
              <select
                value={languageSettings.secondaryLanguage}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    secondaryLanguage: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Auto-detect Language</Label>
              <Switch
                checked={languageSettings.autoDetect}
                onCheckedChange={(checked: boolean) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    autoDetect: checked
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Date & Time Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📅
              </div>
              Date & Time Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure date and time display formats
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date Format</Label>
              <select
                value={languageSettings.dateFormat}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    dateFormat: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Time Format</Label>
              <select
                value={languageSettings.timeFormat}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    timeFormat: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="12h">12-hour</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🌍
              </div>
              Regional Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure currency and timezone
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <select
                value={languageSettings.currency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
                    ...prev,
                    currency: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select
                value={languageSettings.timezone}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setLanguageSettings(prev => ({
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
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
