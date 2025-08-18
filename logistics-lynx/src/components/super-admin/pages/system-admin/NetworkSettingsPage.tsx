import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const NetworkSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Network Settings</h2>
          <p className="text-gray-600">Configure network and connectivity</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">Stable</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Network Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Network settings interface - configure connectivity, firewall, and network policies.</p>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800">🌍 Network is stable with 1.2ms latency</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkSettingsPage;
