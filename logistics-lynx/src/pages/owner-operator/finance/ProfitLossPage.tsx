import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Calculator } from 'lucide-react';

const ProfitLossPage = () => {
  const metrics = [
    { label: 'Total Revenue', value: '$89,420', change: '+12.3%', trend: 'up' },
    { label: 'Total Expenses', value: '$67,230', change: '+8.1%', trend: 'up' },
    { label: 'Net Profit', value: '$22,190', change: '+24.8%', trend: 'up' },
    { label: 'Profit Margin', value: '24.8%', change: '+2.1%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profit & Loss</h1>
        <p className="text-muted-foreground">Track your business financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Freight Revenue</span>
                <span>$76,890</span>
              </div>
              <Progress value={86} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Accessorial Charges</span>
                <span>$8,530</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Other Income</span>
                <span>$4,000</span>
              </div>
              <Progress value={4} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Fuel</span>
                <span>$28,420</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Maintenance</span>
                <span>$12,800</span>
              </div>
              <Progress value={19} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Insurance</span>
                <span>$8,900</span>
              </div>
              <Progress value={13} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Other Expenses</span>
                <span>$17,110</span>
              </div>
              <Progress value={26} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfitLossPage;