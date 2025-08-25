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

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: {
      analytics: true,
      usage: true,
      marketing: false
    },
    profileVisibility: {
      public: false,
      team: true,
      private: false
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      loginNotifications: true
    }
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy & Security Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your data privacy and security preferences
          </p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Data Collection
            </CardTitle>
            <CardDescription>
              Control what data is collected and how it's used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Analytics Data</Label>
              <Switch
                checked={privacySettings.dataCollection.analytics}
                onCheckedChange={(checked: boolean) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    dataCollection: { ...prev.dataCollection, analytics: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Usage Data</Label>
              <Switch
                checked={privacySettings.dataCollection.usage}
                onCheckedChange={(checked: boolean) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    dataCollection: { ...prev.dataCollection, usage: checked }
                  }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Marketing Communications</Label>
              <Switch
                checked={privacySettings.dataCollection.marketing}
                onCheckedChange={(checked: boolean) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    dataCollection: { ...prev.dataCollection, marketing: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Visibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                👤
              </div>
              Profile Visibility
            </CardTitle>
            <CardDescription>
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <select
                value={privacySettings.profileVisibility.public ? 'public' : 
                       privacySettings.profileVisibility.team ? 'team' : 'private'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value;
                  setPrivacySettings(prev => ({
                    ...prev,
                    profileVisibility: {
                      public: value === 'public',
                      team: value === 'team',
                      private: value === 'private'
                    }
                  }));
                }}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="public">Public</option>
                <option value="team">Team Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Two-Factor Authentication</Label>
              <Switch
                checked={privacySettings.security.twoFactor}
                onCheckedChange={(checked: boolean) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactor: checked }
                  }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <select
                value={privacySettings.security.sessionTimeout}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Login Notifications</Label>
              <Switch
                checked={privacySettings.security.loginNotifications}
                onCheckedChange={(checked: boolean) => 
                  setPrivacySettings(prev => ({
                    ...prev,
                    security: { ...prev.security, loginNotifications: checked }
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

export default PrivacySettings;
