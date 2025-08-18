import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const FileManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">File Management</h2>
          <p className="text-gray-600">Manage system files and storage</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800">75% Used</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Storage Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">File management interface - browse, upload, and manage system files.</p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-orange-800">📁 750GB used of 1TB total storage</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManagementPage;
