import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CircleDollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const CashFlowPage = () => {
  const cashFlowData = {
    currentBalance: 15420,
    monthlyInflow: 52800,
    monthlyOutflow: 41200,
    netCashFlow: 11600,
    projectedBalance: 27020
  };

  const upcomingPayments = [
    { description: 'Fuel Card Payment', amount: 2850, dueDate: '2024-01-20', status: 'upcoming' },
    { description: 'Insurance Premium', amount: 650, dueDate: '2024-01-25', status: 'upcoming' },
    { description: 'Truck Payment', amount: 1850, dueDate: '2024-02-01', status: 'scheduled' }
  ];

  const expectedReceivables = [
    { description: 'ABC Logistics Payment', amount: 2400, expectedDate: '2024-01-18', status: 'pending' },
    { description: 'XYZ Distribution', amount: 1950, expectedDate: '2024-01-22', status: 'pending' },
    { description: 'Quick Freight Co.', amount: 3200, expectedDate: '2024-01-25', status: 'confirmed' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cash Flow</h1>
        <p className="text-muted-foreground">Monitor your business cash flow and liquidity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashFlowData.currentBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Inflow</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashFlowData.monthlyInflow.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Outflow</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashFlowData.monthlyOutflow.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashFlowData.netCashFlow.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Positive flow</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Bills and expenses due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">-${payment.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      payment.status === 'upcoming' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Expected Receivables
            </CardTitle>
            <CardDescription>Payments you're expecting to receive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expectedReceivables.map((receivable, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{receivable.description}</p>
                    <p className="text-sm text-muted-foreground">Expected: {receivable.expectedDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+${receivable.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      receivable.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {receivable.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Projection</CardTitle>
          <CardDescription>Projected balance for next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Current Balance</span>
              <span className="font-bold">${cashFlowData.currentBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <span>+ Expected Receivables</span>
              <span className="font-bold">+$7,550</span>
            </div>
            <div className="flex justify-between items-center text-red-600">
              <span>- Upcoming Payments</span>
              <span className="font-bold">-$5,350</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Projected Balance</span>
                <span className="font-bold text-lg">${cashFlowData.projectedBalance.toLocaleString()}</span>
              </div>
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-sm text-muted-foreground">75% liquidity ratio - Good cash position</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowPage;