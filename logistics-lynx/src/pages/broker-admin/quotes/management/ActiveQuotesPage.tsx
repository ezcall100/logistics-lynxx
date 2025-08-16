/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Clock, 
  CheckCircle,
  Send,
  Edit,
  Eye,
  AlertTriangle,
  Filter,
  Download
} from 'lucide-react';

const ActiveQuotesPage = () => {
  const activeQuotes = [
    {
      id: 'QT-2024-045',
      customer: 'Global Manufacturing Inc',
      route: 'Los Angeles, CA → Phoenix, AZ',
      equipment: 'Dry Van',
      amount: 3250,
      margin: 22,
      sentDate: '2024-01-15',
      expiryDate: '2024-02-15',
      daysActive: 5,
      followUps: 2,
      priority: 'high'
    },
    {
      id: 'QT-2024-046',
      customer: 'Tech Logistics Corp',
      route: 'Chicago, IL → Dallas, TX',
      equipment: 'Refrigerated',
      amount: 2850,
      margin: 18,
      sentDate: '2024-01-16',
      expiryDate: '2024-02-10',
      daysActive: 4,
      followUps: 1,
      priority: 'medium'
    },
    {
      id: 'QT-2024-047',
      customer: 'Retail Solutions Ltd',
      route: 'Miami, FL → Atlanta, GA',
      equipment: 'Flatbed',
      amount: 1950,
      margin: 25,
      sentDate: '2024-01-17',
      expiryDate: '2024-02-08',
      daysActive: 3,
      followUps: 0,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getUrgencyIndicator = (daysActive: number, expiryDays: number) => {
    if (expiryDays <= 3) return { color: 'text-red-600', icon: AlertTriangle };
    if (expiryDays <= 7) return { color: 'text-yellow-600', icon: Clock };
    return { color: 'text-green-600', icon: CheckCircle };
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Quotes</h1>
          <p className="text-muted-foreground">
            Monitor and manage quotes currently awaiting customer response
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">Within 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124K</div>
            <p className="text-xs text-muted-foreground">Active pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2d</div>
            <p className="text-xs text-muted-foreground">Days pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Activity Dashboard</CardTitle>
          <CardDescription>
            Track quotes requiring attention and follow-up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeQuotes.map((quote) => {
              const expiryDays = Math.ceil((new Date(quote.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const urgency = getUrgencyIndicator(quote.daysActive, expiryDays);
              const UrgencyIcon = urgency.icon;

              return (
                <div key={quote.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-lg">{quote.id}</div>
                        <div className="text-sm text-muted-foreground">{quote.customer}</div>
                      </div>
                      <Badge variant={getPriorityColor(quote.priority)}>
                        {quote.priority} priority
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">${quote.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{quote.margin}% margin</div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 mb-4">
                    <div>
                      <div className="text-sm font-medium">Route</div>
                      <div className="text-sm text-muted-foreground">{quote.route}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Equipment</div>
                      <div className="text-sm text-muted-foreground">{quote.equipment}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <UrgencyIcon className={`h-3 w-3 ${urgency.color}`} />
                        Status
                      </div>
                      <div className={`text-sm ${urgency.color}`}>
                        {expiryDays > 0 ? `Expires in ${expiryDays} days` : 'Expired'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Sent: {quote.sentDate}</span>
                      <span>Active: {quote.daysActive} days</span>
                      <span>Follow-ups: {quote.followUps}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-3 w-3 mr-1" />
                        Follow Up
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bulk Follow-Up</CardTitle>
            <CardDescription>Send follow-up emails to all pending quotes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Bulk Follow-Up
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expiry Alerts</CardTitle>
            <CardDescription>Set up notifications for expiring quotes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Configure Alerts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Review</CardTitle>
            <CardDescription>Analyze active quote performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveQuotesPage;