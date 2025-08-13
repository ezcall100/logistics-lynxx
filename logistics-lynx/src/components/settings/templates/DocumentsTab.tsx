
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import DocumentsTable from './DocumentsTable';
import UploadDocumentDialog from './UploadDocumentDialog';
import { mockDocuments } from './mockData';

const DocumentsTab = () => {
  const [documents] = useState(mockDocuments);

  return (
    <TabsContent value="documents" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search documents..."
            className="w-64"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <UploadDocumentDialog />
      </div>
      <DocumentsTable documents={documents} />
    </TabsContent>
  );
};

export default DocumentsTab;
