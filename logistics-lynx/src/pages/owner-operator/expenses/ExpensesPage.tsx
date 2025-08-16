/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ExpensesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Expenses</h1>
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Expense management and tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesPage;
