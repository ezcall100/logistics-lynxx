import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const EncryptionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Encryption</h2>
          <p className="text-gray-600">Manage data encryption and security</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">AES-256</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Encryption Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Encryption interface - manage data encryption, key management, and security protocols.</p>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800">🔒 AES-256 encryption active on all data</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncryptionPage;
