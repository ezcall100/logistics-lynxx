/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Truck,
  Bed,
  Coffee,
  Navigation,
  FileText,
  Download,
  Eye,
  Edit,
  Activity,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Shield,
  Timer,
  Zap,
  Target,
  Gauge,
  ArrowUpDown,
  MoreVertical,
  Printer,
  Share
} from 'lucide-react';

const HOSLogs = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Current HOS status
  const currentStatus = {
    status: 'On Duty',
    timeInStatus: '2h 15m',
    hoursRemaining: {
      drive: 8.5,
      onDuty: 11.75,
      cycle: 62.25
    },
    nextBreakRequired: '1h 45m',
    lastReset: '2024-01-14 22:00'
  };

  // Today's log entries
  const todayLogs = [
    { id: 1, status: 'Off Duty', startTime: '22:00', endTime: '06:00', duration: '8h 0m', location: 'Dallas, TX - Rest Area', date: '2024-01-14' },
    { id: 2, status: 'On Duty', startTime: '06:00', endTime: '06:30', duration: '30m', location: 'Dallas, TX - Truck Stop', date: '2024-01-15' },
    { id: 3, status: 'Driving', startTime: '06:30', endTime: '10:00', duration: '3h 30m', location: 'Dallas, TX → Little Rock, AR', date: '2024-01-15' },
    { id: 4, status: 'On Duty', startTime: '10:00', endTime: '10:30', duration: '30m', location: 'Little Rock, AR - Fuel Stop', date: '2024-01-15' },
    { id: 5, status: 'Driving', startTime: '10:30', endTime: 'Current', duration: '1h 45m', location: 'Little Rock, AR → Memphis, TN', date: '2024-01-15' }
  ];

  // Weekly summary
  const weeklySummary = [
    { date: '2024-01-15', drive: 5.25, onDuty: 6.75, offDuty: 17.25, violations: 0, status: 'current' },
    { date: '2024-01-14', drive: 9.5, onDuty: 12.0, offDuty: 12.0, violations: 0, status: 'complete' },
    { date: '2024-01-13', drive: 8.75, onDuty: 11.5, offDuty: 12.5, violations: 0, status: 'complete' },
    { date: '2024-01-12', drive: 10.0, onDuty: 13.0, offDuty: 11.0, violations: 1, status: 'complete' },
    { date: '2024-01-11', drive: 7.5, onDuty: 10.0, offDuty: 14.0, violations: 0, status: 'complete' },
    { date: '2024-01-10', drive: 8.25, onDuty: 11.25, offDuty: 12.75, violations: 0, status: 'complete' },
    { date: '2024-01-09', drive: 9.0, onDuty: 12.5, offDuty: 11.5, violations: 0, status: 'complete' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Driving': return 'bg-blue-100 text-blue-800';
      case 'On Duty': return 'bg-green-100 text-green-800';
      case 'Off Duty': return 'bg-gray-100 text-gray-800';
      case 'Sleeper': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Driving': return <Navigation className="h-4 w-4" />;
      case 'On Duty': return <Truck className="h-4 w-4" />;
      case 'Off Duty': return <Coffee className="h-4 w-4" />;
      case 'Sleeper': return <Bed className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getProgressColor = (hours: number, limit: number) => {
    const percentage = (hours / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="container-responsive space-y-8 animate-fade-in">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/40 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-900/10 backdrop-blur-sm p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/5 to-teal-400/10" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Hours of Service
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Track your driving hours and compliance status with real-time monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">Real-time HOS tracking active</span>
              <Badge className="bg-green-100 text-green-700 text-xs ml-2">
                <Shield className="w-3 h-3 mr-1" />
                Compliant
              </Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80">
              <Edit className="h-4 w-4 mr-2" />
              Edit Current
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
          <CardDescription>Real-time HOS tracking and remaining hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(currentStatus.status)}>
                {getStatusIcon(currentStatus.status)}
                <span className="ml-2">{currentStatus.status}</span>
              </Badge>
              <span className="text-muted-foreground">for {currentStatus.timeInStatus}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next break required in</p>
              <p className="font-semibold">{currentStatus.nextBreakRequired}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Drive Time</span>
                <span className="text-sm">{currentStatus.hoursRemaining.drive}h / 11h</span>
              </div>
              <Progress 
                value={(currentStatus.hoursRemaining.drive / 11) * 100} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">On Duty Time</span>
                <span className="text-sm">{currentStatus.hoursRemaining.onDuty}h / 14h</span>
              </div>
              <Progress 
                value={(currentStatus.hoursRemaining.onDuty / 14) * 100} 
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">70-Hour Cycle</span>
                <span className="text-sm">{currentStatus.hoursRemaining.cycle}h / 70h</span>
              </div>
              <Progress 
                value={(currentStatus.hoursRemaining.cycle / 70) * 100} 
                className="h-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last 34-hour reset: {currentStatus.lastReset}</span>
          </div>
        </CardContent>
      </Card>

      {/* HOS Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Log</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/40 dark:from-slate-950/50 dark:via-gray-950/30 dark:to-slate-900/20 backdrop-blur-sm shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-purple-400/5" />
            <CardHeader className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    Today's Activity Log
                  </CardTitle>
                  <CardDescription className="text-base">Detailed breakdown of your duty status changes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] bg-background/60 backdrop-blur-sm border-border/50">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="driving">Driving</SelectItem>
                      <SelectItem value="on-duty">On Duty</SelectItem>
                      <SelectItem value="off-duty">Off Duty</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm border-border/50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              {/* Enhanced Table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Time Period</TableHead>
                      <TableHead className="font-semibold">Duration</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <Badge className={cn(
                            "px-3 py-1.5 font-semibold shadow-sm transition-all duration-200",
                            getStatusColor(log.status)
                          )}>
                            {getStatusIcon(log.status)}
                            <span className="ml-2">{log.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{log.startTime} - {log.endTime}</div>
                            <div className="text-xs text-muted-foreground">{log.date}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{log.duration}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{log.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/40 dark:from-slate-950/50 dark:via-gray-950/30 dark:to-slate-900/20 backdrop-blur-sm shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-blue-400/5 to-indigo-400/5" />
            <CardHeader className="relative">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    Weekly Summary
                  </CardTitle>
                  <CardDescription className="text-base">7-day HOS overview and compliance status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm border-border/50">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="bg-background/60 backdrop-blur-sm border-border/50">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              {/* Enhanced Weekly Table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="text-center font-semibold">Drive Time</TableHead>
                      <TableHead className="text-center font-semibold">On Duty</TableHead>
                      <TableHead className="text-center font-semibold">Off Duty</TableHead>
                      <TableHead className="text-center font-semibold">Violations</TableHead>
                      <TableHead className="text-center font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {weeklySummary.map((day, index) => (
                      <TableRow key={index} className={cn(
                        "hover:bg-muted/30 transition-colors",
                        day.status === 'current' && "bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500"
                      )}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{new Date(day.date).toLocaleDateString()}</div>
                            {day.status === 'current' && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                <Target className="w-3 h-3 mr-1" />
                                Current
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-blue-600">{day.drive}h</div>
                            <Progress value={(day.drive / 11) * 100} className="h-1 w-16 mx-auto" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-emerald-600">{day.onDuty}h</div>
                            <Progress value={(day.onDuty / 14) * 100} className="h-1 w-16 mx-auto" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-slate-600">{day.offDuty}h</div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {day.violations === 0 ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-600">0</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="font-medium text-red-600">{day.violations}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HOS Violations</CardTitle>
              <CardDescription>Review unknown compliance issues and violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recent Violations</h3>
                <p className="text-muted-foreground">
                  You're in compliance with all HOS regulations. Keep up the good work!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>HOS Reports</CardTitle>
              <CardDescription>Generate and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Daily Log Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed daily activity and compliance status
                  </p>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Weekly Summary</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    7-day overview with violation summary
                  </p>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Monthly Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete monthly HOS analysis
                  </p>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Custom Range</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select custom date range for reports
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Select Dates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HOSLogs;