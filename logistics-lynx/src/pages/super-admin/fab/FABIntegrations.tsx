import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plug, Settings, CheckCircle, XCircle } from 'lucide-react';

const FABIntegrations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Integrations</h1>
          <p className="text-gray-600 mt-2">Connect FAB actions with external services and APIs</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plug className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Slack', description: 'Send notifications to Slack channels', status: 'connected', icon: '💬' },
          { name: 'Email', description: 'Send email notifications', status: 'connected', icon: '📧' },
          { name: 'SMS', description: 'Send SMS notifications', status: 'disconnected', icon: '📱' },
          { name: 'Webhook', description: 'Custom webhook integrations', status: 'connected', icon: '🔗' },
          { name: 'Calendar', description: 'Google Calendar integration', status: 'disconnected', icon: '📅' },
          { name: 'CRM', description: 'Customer relationship management', status: 'connected', icon: '👥' }
        ].map((integration, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{integration.icon}</span>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                </div>
                <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                  {integration.status === 'connected' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {integration.status}
                </Badge>
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button 
                    size="sm" 
                    variant={integration.status === 'connected' ? 'outline' : 'default'}
                    className="flex-1"
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Analytics</CardTitle>
          <CardDescription>Performance metrics for integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Total Integrations</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Connected</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FABIntegrations;
