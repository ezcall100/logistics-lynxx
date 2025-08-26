import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
        <EnhancedButton onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </EnhancedButton>
      </div>

      <div className="grid gap-6">
        {/* Visual Accessibility */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👁️
              </div>
              Visual Accessibility
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Adjust visual settings for better visibility
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>

        {/* Navigation & Interaction */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ⌨️
              </div>
              Navigation & Interaction
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure navigation and interaction preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>

        {/* Motion & Animation */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Motion & Animation
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure motion and animation preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
