import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Input } from '../../../components/ui/input.tsx';
import { Button } from '@/components/ui/button';
// Custom Label component
const Label = ({ children, htmlFor, className = '' }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>
    {children}
  </label>
);

// Custom Switch component
const Switch = ({ 
  id,
  checked, 
  onCheckedChange 
}: { 
  id?: string;
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void 
}) => (
  <button
    id={id}
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

// Custom Separator component
const Separator = ({ className = '' }: { className?: string }) => (
  <div className={`border-t border-gray-200 my-4 ${className}`} />
);

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState({
    api: {
      enabled: true,
      endpoint: 'https://api.tms-enterprise.com/v1',
      key: '••••••••••••••••••••••••••••••••',
      rateLimit: 1000
    },
    webhooks: {
      enabled: false,
      url: '',
      secret: ''
    },
    thirdParty: {
      enabled: true,
      providers: ['stripe', 'twilio', 'sendgrid']
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integration Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure external integrations and API connections for your TMS platform
          </p>
        </div>
        <Button
          onClick={handleSave} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      
      <div className="grid gap-6">
        {/* API Configuration */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🔌
              </div>
              API Configuration
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure REST API endpoints and authentication
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-enabled">Enable API Access</Label>
              <Switch
                id="api-enabled"
                checked={integrations.api.enabled}
                onCheckedChange={(checked) => 
                  setIntegrations(prev => ({
                    ...prev,
                    api: { ...prev.api, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  value={integrations.api.endpoint}
                  onChange={(e) => 
                    setIntegrations(prev => ({
                      ...prev,
                      api: { ...prev.api, endpoint: e.target.value }
                    }))
                  }
                  placeholder="https://api.example.com/v1"
                />
              </div>
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={integrations.api.key}
                  onChange={(e) => 
                    setIntegrations(prev => ({
                      ...prev,
                      api: { ...prev.api, key: e.target.value }
                    }))
                  }
                  placeholder="Enter API key"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
              <Input
                id="rate-limit"
                type="number"
                value={integrations.api.rateLimit}
                onChange={(e) => 
                  setIntegrations(prev => ({
                    ...prev,
                    api: { ...prev.api, rateLimit: parseInt(e.target.value) }
                  }))
                }
              />
            </div>
            
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={isLoading}
            >
              Test API Connection
            </Button>
          </div>
        </ResponsiveCard>

        {/* Webhook Configuration */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔗
              </div>
              Webhook Configuration
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Set up webhooks for real-time event notifications
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="webhook-enabled">Enable Webhooks</Label>
              <Switch
                id="webhook-enabled"
                checked={integrations.webhooks.enabled}
                onCheckedChange={(checked) => 
                  setIntegrations(prev => ({
                    ...prev,
                    webhooks: { ...prev.webhooks, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  value={integrations.webhooks.url}
                  onChange={(e) => 
                    setIntegrations(prev => ({
                      ...prev,
                      webhooks: { ...prev.webhooks, url: e.target.value }
                    }))
                  }
                  placeholder="https://your-domain.com/webhook"
                />
              </div>
              <div>
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <Input
                  id="webhook-secret"
                  type="password"
                  value={integrations.webhooks.secret}
                  onChange={(e) => 
                    setIntegrations(prev => ({
                      ...prev,
                      webhooks: { ...prev.webhooks, secret: e.target.value }
                    }))
                  }
                  placeholder="Enter webhook secret"
                />
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={isLoading}
            >
              Test Webhook
            </Button>
          </div>
        </ResponsiveCard>

        {/* Third-Party Integrations */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🔌
              </div>
              Third-Party Integrations
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage external service integrations
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="third-party-enabled">Enable Third-Party Integrations</Label>
              <Switch
                id="third-party-enabled"
                checked={integrations.thirdParty.enabled}
                onCheckedChange={(checked) => 
                  setIntegrations(prev => ({
                    ...prev,
                    thirdParty: { ...prev.thirdParty, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="space-y-3">
              <Label>Active Integrations</Label>
              <div className="flex flex-wrap gap-2">
                {integrations.thirdParty.providers.map((provider) => (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {provider}
                  </span>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label>Available Integrations</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['stripe', 'twilio', 'sendgrid', 'slack', 'zapier', 'hubspot'].map((provider) => (
                  <div key={provider} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="capitalize font-medium">{provider}</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default IntegrationSettings;
