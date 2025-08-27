import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
const AppearanceSettings = () => {
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    colorScheme: 'blue',
    fontSize: 'medium',
    density: 'comfortable',
    animations: true
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appearance Settings</h1>
          <p className="text-gray-600 mt-2">
            Customize the look and feel of your TMS interface
          </p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🎨
              </div>
              Theme Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose your preferred theme and color scheme
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <select
                value={appearanceSettings.theme}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setAppearanceSettings(prev => ({
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
            
            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <select
                value={appearanceSettings.colorScheme}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setAppearanceSettings(prev => ({
                    ...prev,
                    colorScheme: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Display Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Adjust font size and interface density
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Font Size</Label>
              <select
                value={appearanceSettings.fontSize}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setAppearanceSettings(prev => ({
                    ...prev,
                    fontSize: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Interface Density</Label>
              <select
                value={appearanceSettings.density}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setAppearanceSettings(prev => ({
                    ...prev,
                    density: e.target.value
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
          </div>
        </div>

        {/* Animation Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Animation Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure interface animations and transitions
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Animations</Label>
              <Switch
                checked={appearanceSettings.animations}
                onCheckedChange={(checked: boolean) => 
                  setAppearanceSettings(prev => ({
                    ...prev,
                    animations: checked
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
