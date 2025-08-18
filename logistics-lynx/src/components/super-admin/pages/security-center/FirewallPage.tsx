import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const FirewallPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Firewall</h2>
          <p className="text-gray-600">Network firewall and security rules</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800">Active</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Firewall Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Firewall interface - manage network security rules, traffic filtering, and threat protection.</p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-orange-800">🛡️ Firewall is active and protecting the network</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirewallPage;
