/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const QuoteCenter = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-200/30">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quote Center</h1>
          <p className="text-muted-foreground">Create and manage quotes</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Quote Center functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteCenter;
