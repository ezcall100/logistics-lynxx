import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Crown, Truck, Ship, Users, Car, Wrench, 
  TrendingUp, Sparkles, Brain, Calendar,
  Monitor, Smartphone, Tablet, Globe
} from 'lucide-react';

interface PortalImprovement {
  portalName: string;
  icon: React.ComponentType<{ className?: string }>;
  completionPercentage: number;
  dailyImprovements: number;
  lastUpdate: string;
  currentFeatures: string[];
  upcomingFeatures: string[];
  aiSuggestions: string[];
  uiUxScore: number;
  userSatisfaction: number;
  responsiveDesign: boolean;
  accessibilityScore: number;
  performanceScore: number;
}

const PORTALS_DATA: PortalImprovement[] = [
  {
    portalName: 'Super Admin Portal',
    icon: Crown,
    completionPercentage: 95,
    dailyImprovements: 8,
    lastUpdate: '2 hours ago',
    currentFeatures: ['Advanced Analytics Dashboard', 'Agent Management System', 'Real-time Monitoring', 'Performance Analytics'],
    upcomingFeatures: ['AI-Powered Insights', 'Predictive Analytics', 'Advanced Reporting'],
    aiSuggestions: ['Enhanced data visualization', 'Automated alert system', 'User behavior analysis'],
    uiUxScore: 94,
    userSatisfaction: 98,
    responsiveDesign: true,
    accessibilityScore: 96,
    performanceScore: 97
  },
  {
    portalName: 'Carrier Portal',
    icon: Truck,
    completionPercentage: 88,
    dailyImprovements: 12,
    lastUpdate: '1 hour ago',
    currentFeatures: ['Load Management', 'Driver Assignment', 'Vehicle Tracking', 'Rate Calculator'],
    upcomingFeatures: ['AI Route Optimization', 'Fuel Efficiency Tracker', 'Maintenance Scheduler'],
    aiSuggestions: ['Smart load matching', 'Dynamic pricing algorithm', 'Driver performance analytics'],
    uiUxScore: 91,
    userSatisfaction: 94,
    responsiveDesign: true,
    accessibilityScore: 89,
    performanceScore: 93
  },
  {
    portalName: 'Shipper Portal',
    icon: Ship,
    completionPercentage: 85,
    dailyImprovements: 10,
    lastUpdate: '30 minutes ago',
    currentFeatures: ['Shipment Booking', 'Rate Quotes', 'Tracking Dashboard', 'Document Management'],
    upcomingFeatures: ['AI Shipment Optimization', 'Predictive Delivery', 'Smart Notifications'],
    aiSuggestions: ['Automated booking workflow', 'Cost optimization recommendations', 'Delivery time predictions'],
    uiUxScore: 87,
    userSatisfaction: 92,
    responsiveDesign: true,
    accessibilityScore: 91,
    performanceScore: 88
  },
  {
    portalName: 'Broker Portal',
    icon: Users,
    completionPercentage: 90,
    dailyImprovements: 9,
    lastUpdate: '45 minutes ago',
    currentFeatures: ['Load Board', 'Carrier Matching', 'Rate Management', 'Commission Tracking'],
    upcomingFeatures: ['AI Market Analysis', 'Smart Broker Recommendations', 'Automated Negotiations'],
    aiSuggestions: ['Dynamic market pricing', 'Carrier performance scoring', 'Freight matching optimization'],
    uiUxScore: 93,
    userSatisfaction: 96,
    responsiveDesign: true,
    accessibilityScore: 94,
    performanceScore: 95
  },
  {
    portalName: 'Driver Portal',
    icon: Car,
    completionPercentage: 82,
    dailyImprovements: 14,
    lastUpdate: '15 minutes ago',
    currentFeatures: ['Mobile App', 'Route Navigation', 'ELD Integration', 'Document Capture'],
    upcomingFeatures: ['AI Safety Assistant', 'Smart Route Planning', 'Fuel Station Finder'],
    aiSuggestions: ['Voice-activated commands', 'Fatigue detection system', 'Traffic pattern analysis'],
    uiUxScore: 85,
    userSatisfaction: 89,
    responsiveDesign: true,
    accessibilityScore: 87,
    performanceScore: 91
  },
  {
    portalName: 'Owner-Operator Portal',
    icon: Wrench,
    completionPercentage: 79,
    dailyImprovements: 11,
    lastUpdate: '1 hour ago',
    currentFeatures: ['Equipment Management', 'Financial Dashboard', 'Maintenance Tracking', 'Revenue Analytics'],
    upcomingFeatures: ['AI Business Insights', 'Equipment Optimization', 'Market Opportunity Alerts'],
    aiSuggestions: ['Profit margin optimization', 'Equipment utilization analysis', 'Market trend predictions'],
    uiUxScore: 83,
    userSatisfaction: 87,
    responsiveDesign: true,
    accessibilityScore: 85,
    performanceScore: 89
  }
];

const IMPROVEMENT_TIMELINE = [
  { date: 'Mon', improvements: 45, features: 12, bugs: 3 },
  { date: 'Tue', improvements: 52, features: 15, bugs: 2 },
  { date: 'Wed', improvements: 48, features: 18, bugs: 1 },
  { date: 'Thu', improvements: 63, features: 22, bugs: 4 },
  { date: 'Fri', improvements: 58, features: 20, bugs: 2 },
  { date: 'Sat', improvements: 41, features: 14, bugs: 1 },
  { date: 'Sun', improvements: 39, features: 11, bugs: 2 }
];

export const PortalImprovementTracker: React.FC = () => {
  const [todayImprovements, setTodayImprovements] = useState(0);

  useEffect(() => {
    // Calculate total daily improvements
    const total = PORTALS_DATA.reduce((sum, portal) => sum + portal.dailyImprovements, 0);
    setTodayImprovements(total);
  }, []);

  const getStatusColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (score: number) => {
    if (score >= 95) return 'Excellent';
    if (score >= 85) return 'Very Good';
    if (score >= 75) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Daily Portal UI/UX Improvements</h2>
          <p className="text-muted-foreground">Autonomous agents building and improving TMS portals 24/7</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="default" className="text-lg px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {todayImprovements} Improvements Today
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            100% AI Built
          </Badge>
        </div>
      </div>

      {/* Daily Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Features</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">New features deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UI Improvements</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Design enhancements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Optimizations</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Responsive improvements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Gains</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">Speed improvements</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portals">Portal Progress</TabsTrigger>
          <TabsTrigger value="timeline">Improvement Timeline</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="portals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {PORTALS_DATA.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card key={portal.portalName} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{portal.portalName}</CardTitle>
                          <CardDescription>Last updated {portal.lastUpdate}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="default">
                        {portal.completionPercentage}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{portal.completionPercentage}%</span>
                      </div>
                      <Progress value={portal.completionPercentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Daily Improvements</p>
                        <p className="text-2xl font-bold text-green-600">+{portal.dailyImprovements}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">UI/UX Score</p>
                        <p className={`text-2xl font-bold ${getStatusColor(portal.uiUxScore)}`}>
                          {portal.uiUxScore}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">User Satisfaction</span>
                        <Badge variant="outline">{getStatusBadge(portal.userSatisfaction)}</Badge>
                      </div>
                      <Progress value={portal.userSatisfaction} className="h-1" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Latest AI Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {portal.currentFeatures.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {portal.currentFeatures.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{portal.currentFeatures.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Monitor className="w-3 h-3" />
                        <span>Responsive</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>A11y: {portal.accessibilityScore}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Perf: {portal.performanceScore}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Improvement Timeline</CardTitle>
              <CardDescription>
                Daily improvements made by autonomous agents across all portals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={IMPROVEMENT_TIMELINE}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="improvements" fill="#22c55e" name="Total Improvements" />
                  <Bar dataKey="features" fill="#3b82f6" name="New Features" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Improvement Trends</CardTitle>
                <CardDescription>Real-time AI-driven enhancements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={IMPROVEMENT_TIMELINE}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="improvements" stroke="#22c55e" strokeWidth={3} />
                    <Line type="monotone" dataKey="features" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's AI Achievements</CardTitle>
                <CardDescription>Real-time autonomous improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Smart Route Optimization</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">New</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Predictive Load Matching</span>
                    </div>
                    <Badge variant="outline" className="text-blue-600">Enhanced</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Dynamic Pricing Engine</span>
                    </div>
                    <Badge variant="outline" className="text-purple-600">Optimized</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Mobile UI Enhancements</span>
                    </div>
                    <Badge variant="outline" className="text-orange-600">Updated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};