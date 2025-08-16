/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PayrollPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payroll</h1>
      <Card>
        <CardHeader>
          <CardTitle>Earnings & Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Payroll and earnings tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
