import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const IpWhitelistPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">IP Whitelist</h2>
          <p className="text-gray-600">Manage allowed IP addresses</p>
        </div>
        <Badge className="bg-green-100 text-green-800">24 IPs</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>IP Address Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">IP whitelist interface - manage allowed IP addresses for enhanced security.</p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">🌍 24 IP addresses are whitelisted</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IpWhitelistPage;
