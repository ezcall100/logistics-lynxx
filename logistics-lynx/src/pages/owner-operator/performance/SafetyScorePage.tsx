import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Car,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

interface SafetyMetric {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  change: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  description: string;
}

interface SafetyEvent {
  id: string;
  type: 'violation' | 'incident' | 'inspection' | 'warning';
  title: string;
  description: string;
  date: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  status: 'resolved' | 'pending' | 'investigating';
}

const SafetyScorePage: React.FC = () => {
  const overallScore = 92;
  const scoreChange = 3;

  const safetyMetrics: SafetyMetric[] = [
    {
      id: '1',
      name: 'HOS Compliance',
      score: 98,
      maxScore: 100,
      change: 2,
      status: 'excellent',
      description: 'Hours of Service regulation compliance'
    },
    {
      id: '2',
      name: 'Speed Management',
      score: 89,
      maxScore: 100,
      change: -1,
      status: 'good',
      description: 'Speed limit compliance and safe driving'
    },
    {
      id: '3',
      name: 'Following Distance',
      score: 94,
      maxScore: 100,
      change: 5,
      status: 'excellent',
      description: 'Maintaining safe following distance'
    },
    {
      id: '4',
      name: 'Hard Braking',
      score: 85,
      maxScore: 100,
      change: -3,
      status: 'good',
      description: 'Frequency of hard braking events'
    },
    {
      id: '5',
      name: 'Inspection Score',
      score: 96,
      maxScore: 100,
      change: 0,
      status: 'excellent',
      description: 'Vehicle inspection compliance'
    },
    {
      id: '6',
      name: 'Fuel Efficiency',
      score: 82,
      maxScore: 100,
      change: 4,
      status: 'good',
      description: 'Fuel-efficient driving practices'
    }
  ];

  const recentEvents: SafetyEvent[] = [
    {
      id: '1',
      type: 'inspection',
      title: 'DOT Inspection Passed',
      description: 'Roadside inspection completed with no violations',
      date: '2024-01-14',
      location: 'Dallas, TX',
      severity: 'low',
      status: 'resolved'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Speed Alert',
      description: 'Exceeded speed limit by 8 mph on I-45',
      date: '2024-01-12',
      location: 'Houston, TX',
      severity: 'medium',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'violation',
      title: 'HOS Warning',
      description: 'Approaching daily driving limit (10.5/11 hours)',
      date: '2024-01-10',
      location: 'San Antonio, TX',
      severity: 'medium',
      status: 'resolved'
    },
    {
      id: '4',
      type: 'incident',
      title: 'Hard Braking Event',
      description: 'Sudden stop detected on Highway 290',
      date: '2024-01-08',
      location: 'Austin, TX',
      severity: 'low',
      status: 'investigating'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: '30 Days Safe Driving',
      description: 'No safety violations for 30 consecutive days',
      date: '2024-01-15',
      icon: <Award className="h-6 w-6 text-yellow-500" />
    },
    {
      id: '2',
      title: 'Perfect Inspection',
      description: 'Passed DOT inspection with zero violations',
      date: '2024-01-14',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      id: '3',
      title: 'Fuel Efficiency Leader',
      description: 'Top 10% in fuel efficiency this month',
      date: '2024-01-01',
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'violation':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'incident':
        return <Car className="h-5 w-5 text-yellow-500" />;
      case 'inspection':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Score</h1>
          <p className="text-muted-foreground">Monitor your driving safety performance and compliance</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Last Updated: Today
        </Badge>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-500" />
            Overall Safety Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{overallScore}/100</div>
              <div className="flex items-center gap-2">
                {scoreChange > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">+{scoreChange} from last month</span>
                  </>
                ) : scoreChange < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">{scoreChange} from last month</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">No change from last month</span>
                )}
              </div>
            </div>
            <div className="text-center">
              <Badge className={getStatusColor('excellent')}>Excellent</Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Top 5% of drivers
              </p>
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="metrics">Safety Metrics</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{metric.name}</CardTitle>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{metric.score}</span>
                      <span className="text-sm text-muted-foreground">/ {metric.maxScore}</span>
                    </div>
                    <Progress value={(metric.score / metric.maxScore) * 100} className="h-2" />
                    <div className="flex items-center gap-2">
                      {metric.change > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-500">+{metric.change}</span>
                        </>
                      ) : metric.change < 0 ? (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-red-500">{metric.change}</span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">No change</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Recent Safety Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className={`p-4 rounded-lg border ${getSeverityColor(event.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getEventIcon(event.type)}
                        <div className="space-y-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="capitalize">
                          {event.status}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {event.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Safety Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {achievement.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {achievement.date}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Safety Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Safety trends chart coming soon</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Will show safety score trends over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafetyScorePage;