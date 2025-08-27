import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
const AdvancedSettings: React.FC = () => {
  const [advancedSettings, setAdvancedSettings] = useState({
    debugMode: false,
    performanceMode: true,
    experimentalFeatures: false,
    cacheTimeout: 300,
    maxConcurrentRequests: 10,
    logLevel: 'info'
  });

  const handleSettingChange = (key: string, value: any) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Settings</h2>
        <p className="text-muted-foreground">
          Configure performance, debugging, and experimental features.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Performance Settings</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Optimize system performance and resource usage
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Performance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable high-performance optimizations
              </p>
            </div>
            <Switch
              checked={advancedSettings.performanceMode}
              onCheckedChange={(checked: boolean) => handleSettingChange('performanceMode', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cacheTimeout">Cache Timeout (seconds)</Label>
            <Input
              type="number"
              value={advancedSettings.cacheTimeout}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('cacheTimeout', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxConcurrentRequests">Max Concurrent Requests</Label>
            <Input
              type="number"
              value={advancedSettings.maxConcurrentRequests}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('maxConcurrentRequests', parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Debugging & Development</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Development and debugging options
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable detailed logging and debugging information
              </p>
            </div>
            <Switch
              checked={advancedSettings.debugMode}
              onCheckedChange={(checked: boolean) => handleSettingChange('debugMode', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <select
              id="logLevel"
              value={advancedSettings.logLevel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('logLevel', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Experimental Features</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Enable experimental features and beta functionality
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Experimental Features</Label>
              <p className="text-sm text-muted-foreground">
                Enable beta features and experimental functionality
              </p>
            </div>
            <Switch
              checked={advancedSettings.experimentalFeatures}
              onCheckedChange={(checked: boolean) => handleSettingChange('experimentalFeatures', checked)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Reset to Defaults</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  );
};

export default AdvancedSettings;
