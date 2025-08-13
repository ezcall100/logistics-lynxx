import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Star,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Calendar,
  Award,
  Target,
  Activity
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const DriverReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Driver KPIs
  const driverKPIs = [
    {
      title: 'Total Active Drivers',
      value: '156',
      change: '+8 new',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Safety Score',
      value: '94.7%',
      change: '+2.1%',
      trend: 'up',
      icon: Star,
      color: 'text-green-600'
    },
    {
      title: 'On-Time Performance',
      value: '96.3%',
      change: '+1.8%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Driver Satisfaction',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up',
      icon: Award,
      color: 'text-purple-600'
    }
  ];

  // Driver Performance Data
  const driverPerformance = [
    {
      driverId: 'DRV-001',
      name: 'John Smith',
      license: 'CDL-A',
      safetyScore: 98.5,
      onTimeRate: 97.2,
      milesThisMonth: 8450,
      loadsCompleted: 23,
      avgRating: 4.9,
      violations: 0,
      status: 'Active'
    },
    {
      driverId: 'DRV-002',
      name: 'Sarah Johnson',
      license: 'CDL-A',
      safetyScore: 96.8,
      onTimeRate: 95.1,
      milesThisMonth: 7890,
      loadsCompleted: 21,
      avgRating: 4.7,
      violations: 1,
      status: 'Active'
    },
    {
      driverId: 'DRV-003',
      name: 'Mike Davis',
      license: 'CDL-B',
      safetyScore: 94.2,
      onTimeRate: 93.8,
      milesThisMonth: 6750,
      loadsCompleted: 18,
      avgRating: 4.5,
      violations: 0,
      status: 'Active'
    },
    {
      driverId: 'DRV-004',
      name: 'Lisa Wilson',
      license: 'CDL-A',
      safetyScore: 99.1,
      onTimeRate: 98.7,
      milesThisMonth: 9120,
      loadsCompleted: 26,
      avgRating: 4.8,
      violations: 0,
      status: 'Active'
    },
    {
      driverId: 'DRV-005',
      name: 'Robert Brown',
      license: 'CDL-A',
      safetyScore: 91.3,
      onTimeRate: 89.4,
      milesThisMonth: 5680,
      loadsCompleted: 15,
      avgRating: 4.2,
      violations: 2,
      status: 'Training'
    }
  ];

  // Hours of Service Compliance
  const hosCompliance = [
    {
      driverName: 'John Smith',
      weeklyHours: 68,
      dailyHours: 9.5,
      restPeriod: 'Compliant',
      violations: 0,
      nextMandatoryRest: '2024-01-20 22:00',
      status: 'Compliant'
    },
    {
      driverName: 'Sarah Johnson',
      weeklyHours: 65,
      dailyHours: 10.2,
      restPeriod: 'Compliant',
      violations: 0,
      nextMandatoryRest: '2024-01-21 20:30',
      status: 'Compliant'
    },
    {
      driverName: 'Mike Davis',
      weeklyHours: 62,
      dailyHours: 8.7,
      restPeriod: 'Compliant',
      violations: 0,
      nextMandatoryRest: '2024-01-22 18:15',
      status: 'Compliant'
    },
    {
      driverName: 'Lisa Wilson',
      weeklyHours: 69,
      dailyHours: 10.8,
      restPeriod: 'Near Limit',
      violations: 1,
      nextMandatoryRest: '2024-01-20 19:45',
      status: 'Warning'
    },
    {
      driverName: 'Robert Brown',
      weeklyHours: 58,
      dailyHours: 7.2,
      restPeriod: 'Compliant',
      violations: 0,
      nextMandatoryRest: '2024-01-23 16:30',
      status: 'Compliant'
    }
  ];

  // Training & Certifications
  const trainingStatus = [
    {
      driverName: 'John Smith',
      safetyTraining: 'Current',
      hazmatCert: 'Expires 2024-06-15',
      defensiveDriving: 'Current',
      lastTraining: '2024-01-10',
      upcomingTraining: 'HAZMAT Renewal - 2024-05-15',
      complianceScore: 100
    },
    {
      driverName: 'Sarah Johnson',
      safetyTraining: 'Current',
      hazmatCert: 'N/A',
      defensiveDriving: 'Expires 2024-03-20',
      lastTraining: '2024-01-05',
      upcomingTraining: 'Defensive Driving - 2024-03-01',
      complianceScore: 95
    },
    {
      driverName: 'Mike Davis',
      safetyTraining: 'Expires 2024-02-28',
      hazmatCert: 'Current',
      defensiveDriving: 'Current',
      lastTraining: '2023-12-20',
      upcomingTraining: 'Safety Training - 2024-02-15',
      complianceScore: 90
    },
    {
      driverName: 'Lisa Wilson',
      safetyTraining: 'Current',
      hazmatCert: 'Current',
      defensiveDriving: 'Current',
      lastTraining: '2024-01-12',
      upcomingTraining: 'Advanced Safety - 2024-04-10',
      complianceScore: 100
    },
    {
      driverName: 'Robert Brown',
      safetyTraining: 'Overdue',
      hazmatCert: 'N/A',
      defensiveDriving: 'Overdue',
      lastTraining: '2023-11-15',
      upcomingTraining: 'Mandatory Training - 2024-01-25',
      complianceScore: 70
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-600';
      case 'Training': return 'bg-yellow-50 text-yellow-600';
      case 'Inactive': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-50 text-green-600';
      case 'Warning': return 'bg-yellow-50 text-yellow-600';
      case 'Violation': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const handleExportReport = () => {
    toast.success('Driver reports exported successfully');
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Driver Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive driver performance, safety, and compliance analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Driver KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {driverKPIs.map((kpi) => (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-sm font-medium ${kpi.color}`}>
                      {kpi.change} vs last period
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="compliance">HOS Compliance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Driver Performance Metrics</CardTitle>
                <CardDescription>Individual driver performance and safety scores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Safety Score</TableHead>
                      <TableHead>On-Time Rate</TableHead>
                      <TableHead>Miles (Month)</TableHead>
                      <TableHead>Loads</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {driverPerformance.map((driver) => (
                      <TableRow key={driver.driverId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-gray-500">{driver.driverId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{driver.license}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{driver.safetyScore}%</span>
                            {driver.safetyScore >= 95 ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{driver.onTimeRate}%</TableCell>
                        <TableCell>{driver.milesThisMonth.toLocaleString()}</TableCell>
                        <TableCell>{driver.loadsCompleted}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{driver.avgRating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={driver.violations === 0 ? 'default' : 'destructive'}>
                            {driver.violations}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(driver.status)}>
                            {driver.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hours of Service Compliance</CardTitle>
                <CardDescription>Driver HOS tracking and compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Weekly Hours</TableHead>
                      <TableHead>Daily Hours</TableHead>
                      <TableHead>Rest Period</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Next Mandatory Rest</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hosCompliance.map((driver, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{driver.driverName}</TableCell>
                        <TableCell>{driver.weeklyHours}/70</TableCell>
                        <TableCell>{driver.dailyHours}/11</TableCell>
                        <TableCell>{driver.restPeriod}</TableCell>
                        <TableCell>
                          <Badge variant={driver.violations === 0 ? 'default' : 'destructive'}>
                            {driver.violations}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.nextMandatoryRest}</TableCell>
                        <TableCell>
                          <Badge className={getComplianceColor(driver.status)}>
                            {driver.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training & Certification Status</CardTitle>
                <CardDescription>Driver training requirements and certification tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Safety Training</TableHead>
                      <TableHead>HAZMAT Cert</TableHead>
                      <TableHead>Defensive Driving</TableHead>
                      <TableHead>Last Training</TableHead>
                      <TableHead>Upcoming</TableHead>
                      <TableHead>Compliance Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingStatus.map((driver, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{driver.driverName}</TableCell>
                        <TableCell>
                          <Badge variant={driver.safetyTraining === 'Current' ? 'default' : 'destructive'}>
                            {driver.safetyTraining}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.hazmatCert}</TableCell>
                        <TableCell>
                          <Badge variant={driver.defensiveDriving === 'Current' ? 'default' : 'secondary'}>
                            {driver.defensiveDriving}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.lastTraining}</TableCell>
                        <TableCell className="text-sm">{driver.upcomingTraining}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{driver.complianceScore}%</span>
                            {driver.complianceScore >= 90 ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Driver Performance Trends</CardTitle>
                  <CardDescription>Key performance indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Average Safety Score</p>
                        <p className="text-sm text-gray-500">Fleet average</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">94.7%</p>
                        <p className="text-sm text-green-600">+2.1% ↑</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">On-Time Performance</p>
                        <p className="text-sm text-gray-500">Monthly average</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">96.3%</p>
                        <p className="text-sm text-green-600">+1.8% ↑</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Driver Satisfaction</p>
                        <p className="text-sm text-gray-500">Customer ratings</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">4.6/5</p>
                        <p className="text-sm text-green-600">+0.3 ↑</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Driver management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Driver Performance Review
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Training Session
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Recognition Program
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    HOS Compliance Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DriverReportsPage;