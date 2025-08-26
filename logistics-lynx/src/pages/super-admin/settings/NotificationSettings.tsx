import { useState } from 'react';
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
        <EnhancedButton onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </EnhancedButton>
      </div>

      <div className="grid gap-6">
        {/* Email Notifications */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📧
              </div>
              Email Notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure email notification preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>

        {/* Push Notifications */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔔
              </div>
              Push Notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure push notification preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>

        {/* SMS Notifications */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              SMS Notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure SMS notification preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>

        {/* In-App Notifications */}
        <ResponsiveCard>
          <div className="mb-4">
            <ResponsiveCardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                💬
              </div>
              In-App Notifications
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure in-app notification preferences
            </p>
          </div>
          <ResponsiveCardContent className="space-y-4">
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
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default NotificationSettings;
