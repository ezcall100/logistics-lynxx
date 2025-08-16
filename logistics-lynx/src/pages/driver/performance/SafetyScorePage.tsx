/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, AlertTriangle, CheckCircle, Clock, Download, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface SafetyEvent {
  id: string;
  date: string;
  type: 'violation' | 'incident' | 'warning' | 'commendation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  impact: number; // points added/deducted
  status: 'resolved' | 'pending' | 'under_review';
  actionRequired: boolean;
}

const safetyEvents: SafetyEvent[] = [
  {
    id: 'SE001',
    date: '2024-01-19',
    type: 'commendation',
    severity: 'low',
    description: 'Completed 30 days without incidents',
    location: 'Overall Performance',
    impact: 10,
    status: 'resolved',
    actionRequired: false
  },
  {
    id: 'SE002',
    date: '2024-01-15',
    type: 'warning',
    severity: 'medium',
    description: 'Following too closely detected',
    location: 'I-25 N, Colorado',
    impact: -5,
    status: 'resolved',
    actionRequired: false
  },
  {
    id: 'SE003',
    date: '2024-01-12',
    type: 'violation',
    severity: 'high',
    description: 'Hours of Service violation',
    location: 'Kansas City, MO',
    impact: -15,
    status: 'under_review',
    actionRequired: true
  },
  {
    id: 'SE004',
    date: '2024-01-08',
    type: 'incident',
    severity: 'medium',
    description: 'Minor backing incident - no damage',
    location: 'Chicago Terminal',
    impact: -8,
    status: 'resolved',
    actionRequired: false
  }
];

const SafetyScorePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [isReportingIncident, setIsReportingIncident] = useState(false);

  const form = useForm({
    defaultValues: {
      incidentType: 'near_miss',
      severity: 'low',
      location: 'I-76 E, Denver, CO',
      description: 'Vehicle cut in front during lane change, no contact made',
      actionTaken: 'Reduced speed and maintained safe distance'
    }
  });

  const handleReportIncident = (data: unknown) => {
    console.log('Reporting safety incident:', data);
    toast.success('Safety incident reported successfully');
    setIsReportingIncident(false);
    form.reset();
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'commendation':
        return <Badge className="bg-green-500">Commendation</Badge>;
      case 'violation':
        return <Badge className="bg-red-500">Violation</Badge>;
      case 'incident':
        return <Badge className="bg-orange-500">Incident</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-400">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-500">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = safetyEvents.filter(event => 
    eventTypeFilter === 'all' || event.type === eventTypeFilter
  );

  const currentScore = 850; // Base safety score calculation
  const scoreChange = safetyEvents.reduce((sum, event) => sum + event.impact, 0);
  const finalScore = currentScore + scoreChange;

  const getScoreColor = (score: number) => {
    if (score >= 900) return 'text-green-600';
    if (score >= 800) return 'text-blue-600';
    if (score >= 700) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRating = (score: number) => {
    if (score >= 900) return 'Excellent';
    if (score >= 800) return 'Good';
    if (score >= 700) return 'Fair';
    return 'Poor';
  };

  const handleExport = () => {
    console.log('Exporting safety report');
    toast.success('Safety report exported successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safety Score</h1>
          <p className="text-muted-foreground">Monitor your safety performance and compliance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isReportingIncident} onOpenChange={setIsReportingIncident}>
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Safety Incident</DialogTitle>
                <DialogDescription>Document a safety event or near miss</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleReportIncident)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="incidentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Incident Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="near_miss">Near Miss</SelectItem>
                            <SelectItem value="accident">Accident</SelectItem>
                            <SelectItem value="violation">Traffic Violation</SelectItem>
                            <SelectItem value="equipment">Equipment Issue</SelectItem>
                            <SelectItem value="hazard">Road Hazard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Highway, city, or address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe what happened..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="actionTaken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Action Taken</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What steps did you take..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsReportingIncident(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Report</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Safety Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle>Current Safety Score</CardTitle>
            <CardDescription>Based on your driving record and compliance</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(finalScore)}`}>
              {finalScore}
            </div>
            <div className="text-xl font-medium mt-2">{getScoreRating(finalScore)}</div>
            <div className="flex justify-center items-center mt-4 gap-2">
              <TrendingUp className={`w-4 h-4 ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <span className={`text-sm ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scoreChange >= 0 ? '+' : ''}{scoreChange} points this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Incident Free</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">127</div>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredEvents.filter(e => e.actionRequired).length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">DOT Physical</span>
                <Badge className="bg-green-500">Current</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">CDL License</span>
                <Badge className="bg-green-500">Valid</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Medical Certificate</span>
                <Badge className="bg-yellow-500">Expires Soon</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Background Check</span>
                <Badge className="bg-green-500">Clear</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">HOS Compliance</span>
                <span className="font-medium text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Speed Compliance</span>
                <span className="font-medium text-blue-600">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Vehicle Inspections</span>
                <span className="font-medium text-green-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Fuel Efficiency</span>
                <span className="font-medium text-blue-600">Above Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Awards & Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Safety Champion - Q4 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Fuel Efficiency Leader</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-500" />
                <span className="text-sm">100K Miles Safe Driving</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Customer Service Excellence</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Events History */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Events History</CardTitle>
          <CardDescription>Recent safety events, violations, and commendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div>
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="violation">Violations</SelectItem>
                  <SelectItem value="incident">Incidents</SelectItem>
                  <SelectItem value="warning">Warnings</SelectItem>
                  <SelectItem value="commendation">Commendations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{getEventBadge(event.type)}</TableCell>
                  <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                  <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${event.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {event.impact >= 0 ? '+' : ''}{event.impact}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    {event.actionRequired ? (
                      <Button size="sm" variant="outline">
                        <Clock className="w-4 h-4" />
                      </Button>
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Reminders</CardTitle>
          <CardDescription>Important safety practices and compliance tips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Driving Best Practices</h4>
              <ul className="space-y-2 text-sm">
                <li>• Maintain 3-second following distance</li>
                <li>• Complete pre-trip inspections thoroughly</li>
                <li>• Obey speed limits and road conditions</li>
                <li>• Use proper backing procedures</li>
                <li>• Report all incidents immediately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Compliance Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li>• Monitor HOS limits carefully</li>
                <li>• Keep medical certificate current</li>
                <li>• Perform required vehicle inspections</li>
                <li>• Report equipment issues promptly</li>
                <li>• Attend mandatory safety training</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyScorePage;