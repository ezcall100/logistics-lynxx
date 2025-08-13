import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileText, Calendar, Target } from 'lucide-react';

const TaxDashboardPage = () => {
  const taxMetrics = [
    { label: 'Q1 Estimated Tax', amount: 4250, due: '2024-04-15', status: 'upcoming' },
    { label: 'Annual Tax Estimate', amount: 17000, due: '2024-04-15', status: 'projected' },
    { label: 'Deductions YTD', amount: 12800, due: '', status: 'current' },
    { label: 'Tax Savings', amount: 3200, due: '', status: 'savings' }
  ];

  const quarterlyProgress = [
    { quarter: 'Q1 2024', income: 52000, deductions: 18500, taxOwed: 4250, status: 'current' },
    { quarter: 'Q2 2024', income: 48000, deductions: 17200, taxOwed: 3900, status: 'projected' },
    { quarter: 'Q3 2024', income: 50000, deductions: 18000, taxOwed: 4100, status: 'projected' },
    { quarter: 'Q4 2024', income: 54000, deductions: 19500, taxOwed: 4750, status: 'projected' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tax Dashboard</h1>
        <p className="text-muted-foreground">Monitor your tax obligations and savings opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metric.amount.toLocaleString()}</div>
              {metric.due && (
                <p className="text-xs text-muted-foreground">Due: {metric.due}</p>
              )}
              <Badge variant={metric.status === 'upcoming' ? 'destructive' : 'secondary'} className="mt-2">
                {metric.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quarterly Tax Summary
            </CardTitle>
            <CardDescription>Overview of your quarterly tax obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quarterlyProgress.map((quarter, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{quarter.quarter}</h4>
                    <Badge variant={quarter.status === 'current' ? 'default' : 'secondary'}>
                      {quarter.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Income</p>
                      <p className="font-medium">${quarter.income.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deductions</p>
                      <p className="font-medium">${quarter.deductions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tax Owed</p>
                      <p className="font-medium">${quarter.taxOwed.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Tax Optimization Tips
            </CardTitle>
            <CardDescription>Maximize your deductions and savings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Mileage Tracking</h4>
              <p className="text-sm text-muted-foreground">Keep detailed records for maximum deductions</p>
              <Progress value={85} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">85% compliance rate</p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Equipment Depreciation</h4>
              <p className="text-sm text-muted-foreground">Track depreciation on truck and equipment</p>
              <Progress value={92} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">92% documented</p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Business Meals</h4>
              <p className="text-sm text-muted-foreground">Document meal expenses while traveling</p>
              <Progress value={67} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">67% tracked</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxDashboardPage;