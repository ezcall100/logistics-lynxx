import React from 'react';

import { ResponsiveCard } from '../../../components/ui';

const SecurityCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">🔒 Security Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">🔐 Authentication</h3>
            <p className="text-sm text-gray-600 mb-4">Multi-factor authentication status</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>MFA Enabled</span>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>SSO Configured</span>
                <span className="text-green-600">✓ Active</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">🛡️ Firewall</h3>
            <p className="text-sm text-gray-600 mb-4">Network security status</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>WAF Status</span>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>DDoS Protection</span>
                <span className="text-green-600">✓ Active</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
        
        <ResponsiveCard>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">📝 Audit Logs</h3>
            <p className="text-sm text-gray-600 mb-4">Security event monitoring</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Logging Level</span>
                <span className="text-blue-600">Verbose</span>
              </div>
              <div className="flex justify-between">
                <span>Retention Period</span>
                <span className="text-blue-600">90 days</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>

      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security Overview</h2>
          <p className="text-gray-600 mb-4">
            Comprehensive security monitoring and threat detection system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900">Threat Detection</h4>
              <p className="text-sm text-red-700">Real-time threat monitoring and alerts</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Access Control</h4>
              <p className="text-sm text-blue-700">Role-based access management</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default SecurityCenter;
