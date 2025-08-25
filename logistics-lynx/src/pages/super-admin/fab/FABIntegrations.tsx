import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FABIntegrations = () => {
  const [integrations] = useState([
    {
      id: 1,
      name: 'Slack',
      description: 'Send notifications and alerts to Slack channels',
      status: 'connected',
      icon: '💬',
      lastSync: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Email',
      description: 'Send email notifications for FAB actions',
      status: 'connected',
      icon: '📧',
      lastSync: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Zapier',
      description: 'Automate workflows with Zapier integrations',
      status: 'disconnected',
      icon: '🔗',
      lastSync: 'Never'
    },
    {
      id: 4,
      name: 'Webhook',
      description: 'Custom webhook integrations for external systems',
      status: 'connected',
      icon: '🌐',
      lastSync: '1 hour ago'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Integrations</h1>
          <p className="text-gray-600 mt-2">
            Connect your FAB actions with external services and platforms
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add Integration
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Connected Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔗
              </div>
              Connected Integrations
            </CardTitle>
            <CardDescription>
              Active integrations with external services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.filter(i => i.status === 'connected').map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{integration.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📦
              </div>
              Available Integrations
            </CardTitle>
            <CardDescription>
              Integrations you can connect to your FAB actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.filter(i => i.status === 'disconnected').map((integration) => (
                <div key={integration.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{integration.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Connect
                  </Button>
                </div>
              ))}
              
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google Analytics</h4>
                    <p className="text-sm text-gray-600">Track FAB usage analytics</p>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Connect
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">📱</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">SMS</h4>
                    <p className="text-sm text-gray-600">Send SMS notifications</p>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Integration Settings
            </CardTitle>
            <CardDescription>
              Configure global integration settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-sync</h4>
                  <p className="text-sm text-gray-600">Automatically sync data with connected services</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Error Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications for integration errors</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Sync Frequency</h4>
                  <p className="text-sm text-gray-600">How often to sync with external services</p>
                </div>
                <select className="p-2 border rounded-md">
                  <option>Every 5 minutes</option>
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FABIntegrations;
