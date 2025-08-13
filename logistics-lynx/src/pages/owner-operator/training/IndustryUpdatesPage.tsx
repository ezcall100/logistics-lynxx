import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, TrendingUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const IndustryUpdatesPage = () => {
  const updatesData = {
    alerts: [
      {
        type: 'regulatory',
        title: 'New ELD Compliance Requirements',
        description: 'Updated electronic logging device regulations effective March 2024',
        date: '2024-01-15',
        priority: 'high',
        category: 'Compliance'
      },
      {
        type: 'market',
        title: 'Fuel Price Surge Expected',
        description: 'Industry experts predict 15% increase in diesel prices over next quarter',
        date: '2024-01-14',
        priority: 'medium',
        category: 'Market'
      },
      {
        type: 'technology',
        title: 'New Route Optimization Technology',
        description: 'AI-powered routing solutions showing 12% efficiency improvements',
        date: '2024-01-13',
        priority: 'low',
        category: 'Technology'
      }
    ],
    regulations: [
      {
        title: 'DOT Physical Requirements Update',
        effectiveDate: '2024-04-01',
        status: 'upcoming',
        impact: 'medium',
        description: 'New medical examination requirements for commercial drivers'
      },
      {
        title: 'Insurance Coverage Minimums',
        effectiveDate: '2024-02-15',
        status: 'active',
        impact: 'high',
        description: 'Increased minimum liability coverage requirements'
      }
    ],
    marketTrends: [
      { metric: 'Freight Rates', trend: 'up', change: '+8.5%', period: 'vs last month' },
      { metric: 'Load Availability', trend: 'up', change: '+12%', period: 'vs last quarter' },
      { metric: 'Fuel Costs', trend: 'up', change: '+15%', period: 'vs last month' },
      { metric: 'Driver Shortage', trend: 'stable', change: 'No change', period: 'vs last quarter' }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'upcoming': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Industry Updates</h1>
        <p className="text-muted-foreground">Stay informed about industry changes and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Regulatory Changes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Market Updates</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Info className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tech News</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Latest Industry Alerts
            </CardTitle>
            <CardDescription>Important updates affecting your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {updatesData.alerts.map((alert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getPriorityColor(alert.priority)}>
                    {alert.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
                <h4 className="font-semibold mb-2">{alert.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                <Button size="sm" variant="outline">Learn More</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Regulatory Changes
            </CardTitle>
            <CardDescription>Upcoming and active regulatory updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {updatesData.regulations.map((regulation, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getStatusColor(regulation.status)} border-0`}>
                    {regulation.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Effective: {regulation.effectiveDate}
                  </span>
                </div>
                <h4 className="font-semibold mb-2">{regulation.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{regulation.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Impact:</span>
                  <Badge variant="outline" className="text-xs">
                    {regulation.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Trends
          </CardTitle>
          <CardDescription>Current industry metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {updatesData.marketTrends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{trend.metric}</h4>
                  {getTrendIcon(trend.trend)}
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold">{trend.change}</p>
                  <p className="text-xs text-muted-foreground">{trend.period}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Industry conferences and webinars</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Owner-Operator Business Summit</h4>
              <p className="text-sm text-muted-foreground">March 15-17, 2024 • Las Vegas, NV</p>
              <Button size="sm" className="mt-2">Register</Button>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Freight Technology Expo</h4>
              <p className="text-sm text-muted-foreground">April 8-10, 2024 • Chicago, IL</p>
              <Button size="sm" className="mt-2">Register</Button>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Safety & Compliance Webinar</h4>
              <p className="text-sm text-muted-foreground">February 22, 2024 • Online</p>
              <Button size="sm" className="mt-2">Join</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Customize your update notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Regulatory Updates</h4>
                <p className="text-sm text-muted-foreground">DOT, FMCSA, and state regulations</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Market Trends</h4>
                <p className="text-sm text-muted-foreground">Freight rates and fuel prices</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Technology Updates</h4>
                <p className="text-sm text-muted-foreground">New tools and innovations</p>
              </div>
              <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
            </div>

            <Button className="w-full">Update Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustryUpdatesPage;