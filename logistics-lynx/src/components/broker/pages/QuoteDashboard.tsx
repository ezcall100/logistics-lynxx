/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Plus, 
  Zap as Lightning, 
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  FileText,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuoteDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Quotes",
      value: "2,847",
      change: "+12%",
      trending: "up",
      icon: FileText,
      description: "vs last month"
    },
    {
      title: "Win Rate",
      value: "68.5%",
      change: "+2.1%",
      trending: "up",
      icon: Target,
      description: "above target"
    },
    {
      title: "Revenue Pipeline",
      value: "$847K",
      change: "+18%",
      trending: "up",
      icon: DollarSign,
      description: "active quotes"
    },
    {
      title: "Avg Response Time",
      value: "2.4hrs",
      change: "-15%",
      trending: "down",
      icon: Clock,
      description: "improvement"
    }
  ];

  const quickActions = [
    {
      title: "Create New Quote",
      description: "Start a new quote with full details",
      icon: Plus,
      color: "bg-blue-500",
      path: "/broker-admin/quotes/create"
    },
    {
      title: "Quick Quote",
      description: "Generate instant pricing",
      icon: Lightning,
      color: "bg-yellow-500",
      path: "/broker-admin/quotes/quick"
    },
    {
      title: "AI Quote Builder",
      description: "Let AI create optimal quotes",
      icon: BarChart3,
      color: "bg-purple-500",
      path: "/broker-admin/quotes/pricing/ai-builder"
    }
  ];

  const recentQuotes = [
    {
      id: "Q-2024-001",
      customer: "ABC Logistics",
      route: "Chicago, IL → Miami, FL",
      value: "$2,450",
      status: "pending",
      createdAt: "2 hours ago"
    },
    {
      id: "Q-2024-002",
      customer: "Transport Co",
      route: "Dallas, TX → Phoenix, AZ",
      value: "$1,875",
      status: "won",
      createdAt: "4 hours ago"
    },
    {
      id: "Q-2024-003",
      customer: "FreightMax",
      route: "Seattle, WA → Denver, CO",
      value: "$3,200",
      status: "active",
      createdAt: "6 hours ago"
    },
    {
      id: "Q-2024-004",
      customer: "ShipFast LLC",
      route: "Atlanta, GA → New York, NY",
      value: "$2,100",
      status: "expired",
      createdAt: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your freight quote performance and pipeline
          </p>
        </div>
        <Button onClick={() => navigate('/broker-admin/quotes/create')} className="gap-2">
          <Plus className="h-4 w-4" />
          New Quote
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`flex items-center ${
                  stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trending === 'up' ? '↗' : '↘'} {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Start your most common quote tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex-col items-start hover-scale"
                onClick={() => navigate(action.path)}
              >
                <div className={`p-2 rounded-md ${action.color} text-white mb-2`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Quotes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Quotes</CardTitle>
              <CardDescription>
                Latest quote activity and status updates
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/broker-admin/quotes/all')}
            >
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotes.map((quote, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{quote.id}</span>
                      <Badge variant="outline" className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {quote.customer} • {quote.route}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {quote.createdAt}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{quote.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Pipeline</CardTitle>
            <CardDescription>
              Current status distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Quotes</span>
                <span className="text-sm font-medium">156 quotes</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Review</span>
                <span className="text-sm font-medium">89 quotes</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Review</span>
                <span className="text-sm font-medium">67 quotes</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Draft Quotes</span>
                <span className="text-sm font-medium">23 quotes</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/broker-admin/quotes/pipeline/active')}
            >
              View Pipeline Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Quotes Created</span>
              <span className="font-medium">347</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Quotes Won</span>
              <span className="font-medium">238</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Revenue Generated</span>
              <span className="font-medium">$1.2M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Target</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Win Rate Goal</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">New Quotes</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Responses Sent</span>
              <span className="font-medium">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Follow-ups Due</span>
              <span className="font-medium">12</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteDashboard;