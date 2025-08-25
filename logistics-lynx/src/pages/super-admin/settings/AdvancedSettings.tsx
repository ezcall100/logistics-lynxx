import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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

      <Card>
        <CardHeader>
          <CardTitle>Performance Settings</CardTitle>
          <CardDescription>
            Optimize system performance and resource usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debugging & Development</CardTitle>
          <CardDescription>
            Development and debugging options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experimental Features</CardTitle>
          <CardDescription>
            Enable experimental features and beta functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default AdvancedSettings;
