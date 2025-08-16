/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const CustomerAccounts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center border border-purple-200/30">
          <Users className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Accounts</h1>
          <p className="text-muted-foreground">Manage customer account information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Customer Accounts functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAccounts;
