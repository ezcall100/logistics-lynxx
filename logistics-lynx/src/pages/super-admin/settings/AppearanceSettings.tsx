import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🎨
              </div>
              Theme Settings
            </CardTitle>
            <CardDescription>
              Choose your preferred theme and color scheme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Display Settings
            </CardTitle>
            <CardDescription>
              Adjust font size and interface density
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Animation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Animation Settings
            </CardTitle>
            <CardDescription>
              Configure interface animations and transitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppearanceSettings;
