/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import TemplatesTable from './TemplatesTable';
import CreateTemplateDialog from './CreateTemplateDialog';
import { mockTemplates } from './mockData';

const TemplatesTab = () => {
  const [templates] = useState(mockTemplates);

  return (
    <TabsContent value="templates" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search templates..."
            className="w-64"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="communications">Communications</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateTemplateDialog />
      </div>
      <TemplatesTable templates={templates} />
    </TabsContent>
  );
};

export default TemplatesTab;
