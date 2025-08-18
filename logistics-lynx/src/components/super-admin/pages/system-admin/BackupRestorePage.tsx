import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const BackupRestorePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Backup & Restore</h2>
          <p className="text-gray-600">Manage system backups and recovery</p>
        </div>
        <Badge className="bg-green-100 text-green-800">Last: 2h ago</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Backup Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Backup and restore interface - schedule backups, restore data, and manage recovery points.</p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">💾 Last backup completed 2 hours ago successfully</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupRestorePage;
