import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Target, Users } from 'lucide-react';

const PerformanceMetricsPage = () => {
  const kpiData = [
    { label: 'Revenue per Mile', value: '$2.85', change: '+12%', trend: 'up' },
    { label: 'Fuel Efficiency', value: '7.2 MPG', change: '+0.3', trend: 'up' },
    { label: 'On-Time Delivery', value: '96.5%', change: '+2.1%', trend: 'up' },
    { label: 'Load Acceptance Rate', value: '87%', change: '-3%', trend: 'down' }
  ];

  const performanceAreas = [
    {
      category: 'Operational Efficiency',
      metrics: [
        { name: 'Miles per Day', current: 542, target: 600, percentage: 90 },
        { name: 'Deadhead %', current: 8.5, target: 5.0, percentage: 65 },
        { name: 'Fuel Cost per Mile', current: 0.42, target: 0.38, percentage: 75 }
      ]
    },
    {
      category: 'Financial Performance',
      metrics: [
        { name: 'Profit Margin', current: 24.8, target: 30.0, percentage: 83 },
        { name: 'Cost per Mile', current: 1.58, target: 1.45, percentage: 70 },
        { name: 'Revenue Growth', current: 18.2, target: 20.0, percentage: 91 }
      ]
    },
    {
      category: 'Service Quality',
      metrics: [
        { name: 'Customer Rating', current: 4.7, target: 5.0, percentage: 94 },
        { name: 'Delivery Accuracy', current: 98.2, target: 100, percentage: 98 },
        { name: 'Response Time (hrs)', current: 2.1, target: 1.5, percentage: 80 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Metrics</h1>
        <p className="text-muted-foreground">Track your business performance and key indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        {performanceAreas.map((area, areaIndex) => (
          <Card key={areaIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {area.category}
              </CardTitle>
              <CardDescription>Performance indicators for {area.category.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {area.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{metric.name}</h4>
                      <Badge variant={metric.percentage >= 85 ? 'default' : metric.percentage >= 70 ? 'secondary' : 'destructive'}>
                        {metric.percentage}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span className="font-medium">{metric.current}{metric.name.includes('%') ? '%' : metric.name.includes('$') ? '' : metric.name.includes('hrs') ? '' : ''}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target:</span>
                        <span className="text-muted-foreground">{metric.target}{metric.name.includes('%') ? '%' : metric.name.includes('$') ? '' : metric.name.includes('hrs') ? '' : ''}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.percentage >= 85 ? 'bg-green-500' : 
                            metric.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Goals
            </CardTitle>
            <CardDescription>Set and track your business objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Monthly Revenue Target</h4>
              <p className="text-2xl font-bold">$60,000</p>
              <p className="text-sm text-muted-foreground">Current: $56,100 (93.5%)</p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Miles per Month</h4>
              <p className="text-2xl font-bold">18,000</p>
              <p className="text-sm text-muted-foreground">Current: 16,260 (90.3%)</p>
            </div>

            <Button className="w-full">Update Goals</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Benchmarking
            </CardTitle>
            <CardDescription>Compare your performance with industry standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Revenue per Mile</p>
                <p className="text-sm text-muted-foreground">You: $2.85 | Industry: $2.65</p>
              </div>
              <Badge variant="default">Above Average</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Fuel Efficiency</p>
                <p className="text-sm text-muted-foreground">You: 7.2 MPG | Industry: 6.8 MPG</p>
              </div>
              <Badge variant="default">Above Average</Badge>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">On-Time Delivery</p>
                <p className="text-sm text-muted-foreground">You: 96.5% | Industry: 94.2%</p>
              </div>
              <Badge variant="default">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetricsPage;