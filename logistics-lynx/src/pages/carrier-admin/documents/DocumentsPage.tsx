/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DocumentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Documents</h1>
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Document storage and management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
