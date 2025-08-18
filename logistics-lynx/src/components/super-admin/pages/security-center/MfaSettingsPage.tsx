import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const MfaSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">MFA Settings</h2>
          <p className="text-gray-600">Multi-factor authentication configuration</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Multi-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">MFA settings interface - configure multi-factor authentication for enhanced security.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">🔐 MFA is enabled for 2,847 users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MfaSettingsPage;
