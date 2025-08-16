/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, Receipt } from 'lucide-react';

const EarningsPaymentsPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Earnings & Payments</h1>
        <p className="text-muted-foreground">Pay statements, bonuses, deductions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Current Earnings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$1,850.50</div>
            <p className="text-sm text-muted-foreground">This pay period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="w-5 h-5" />
              <span>Pay Statements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>View detailed pay statements, bonuses, and deduction breakdowns.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsPaymentsPage;