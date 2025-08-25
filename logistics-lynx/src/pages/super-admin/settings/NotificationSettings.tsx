import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Custom Label component
const Label = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>
    {children}
  </label>
);

// Custom Switch component
const Switch = ({ 
  checked, 
  onCheckedChange 
}: { 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void 
}) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
      frequency: 'immediate',
      types: ['security', 'updates', 'reports']
    },
    push: {
      enabled: true,
      types: ['alerts', 'reminders']
    },
    sms: {
      enabled: false,
      types: ['critical']
    },
    inApp: {
      enabled: true,
      types: ['all']
    }
  });

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure how and when you receive notifications
          </p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📧
              </div>
              Email Notifications
            </CardTitle>
            <CardDescription>
              Configure email notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Email Notifications</Label>
              <Switch
                checked={notificationSettings.email.enabled}
                onCheckedChange={(checked: boolean) => 
                  setNotificationSettings(prev => ({
                    ...prev,
                    email: { ...prev.email, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Notification Frequency</Label>
              <select
                value={notificationSettings.email.frequency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  setNotificationSettings(prev => ({
                    ...prev,
                    email: { ...prev.email, frequency: e.target.value }
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Digest</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔔
              </div>
              Push Notifications
            </CardTitle>
            <CardDescription>
              Configure push notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Push Notifications</Label>
              <Switch
                checked={notificationSettings.push.enabled}
                onCheckedChange={(checked: boolean) => 
                  setNotificationSettings(prev => ({
                    ...prev,
                    push: { ...prev.push, enabled: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* SMS Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              SMS Notifications
            </CardTitle>
            <CardDescription>
              Configure SMS notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable SMS Notifications</Label>
              <Switch
                checked={notificationSettings.sms.enabled}
                onCheckedChange={(checked: boolean) => 
                  setNotificationSettings(prev => ({
                    ...prev,
                    sms: { ...prev.sms, enabled: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* In-App Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                💬
              </div>
              In-App Notifications
            </CardTitle>
            <CardDescription>
              Configure in-app notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable In-App Notifications</Label>
              <Switch
                checked={notificationSettings.inApp.enabled}
                onCheckedChange={(checked: boolean) => 
                  setNotificationSettings(prev => ({
                    ...prev,
                    inApp: { ...prev.inApp, enabled: checked }
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

export default NotificationSettings;
