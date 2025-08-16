/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, Truck } from 'lucide-react';

const DocumentsLogsPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documents & Logs</h1>
        <p className="text-muted-foreground">HOS, BOL, receipts, certifications</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Hours of Service</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your HOS logs, duty status, and compliance records.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Trip Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access BOLs, receipts, inspection reports, and other trip documentation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsLogsPage;