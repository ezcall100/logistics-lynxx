/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';
import OverviewStats from './templates/OverviewStats';
import TemplatesTab from './templates/TemplatesTab';
import DocumentsTab from './templates/DocumentsTab';

const TemplatesDocumentsTab = () => {
  return (
    <div className="space-y-6">
      <OverviewStats />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Templates & Documents Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TemplatesTab />
            <DocumentsTab />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesDocumentsTab;
