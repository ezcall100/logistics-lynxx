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

const AccessibilitySettings = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    screenReader: true,
    reducedMotion: false,
    focusIndicators: true,
    keyboardNavigation: true,
    colorBlindSupport: false
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accessibility Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure accessibility features for better usability
          </p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Visual Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👁️
              </div>
              Visual Accessibility
            </CardTitle>
            <CardDescription>
              Adjust visual settings for better visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>High Contrast Mode</Label>
              <Switch
                checked={accessibilitySettings.highContrast}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    highContrast: checked
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Large Text</Label>
              <Switch
                checked={accessibilitySettings.largeText}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    largeText: checked
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Color Blind Support</Label>
              <Switch
                checked={accessibilitySettings.colorBlindSupport}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    colorBlindSupport: checked
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation & Interaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ⌨️
              </div>
              Navigation & Interaction
            </CardTitle>
            <CardDescription>
              Configure navigation and interaction preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Screen Reader Support</Label>
              <Switch
                checked={accessibilitySettings.screenReader}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    screenReader: checked
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Focus Indicators</Label>
              <Switch
                checked={accessibilitySettings.focusIndicators}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    focusIndicators: checked
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Keyboard Navigation</Label>
              <Switch
                checked={accessibilitySettings.keyboardNavigation}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    keyboardNavigation: checked
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Motion & Animation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Motion & Animation
            </CardTitle>
            <CardDescription>
              Configure motion and animation preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Reduced Motion</Label>
              <Switch
                checked={accessibilitySettings.reducedMotion}
                onCheckedChange={(checked: boolean) => 
                  setAccessibilitySettings(prev => ({
                    ...prev,
                    reducedMotion: checked
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

export default AccessibilitySettings;
