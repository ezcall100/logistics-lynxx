/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  Users, 
  TrendingUp, 
  Clock,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const OperationsReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Operations KPIs
  const operationsKPIs = [
    {
      title: 'Fleet Utilization',
      value: '89.2%',
      change: '+5.1%',
      trend: 'up',
      icon: Truck,
      color: 'text-blue-600'
    },
    {
      title: 'On-Time Delivery',
      value: '94.7%',
      change: '+2.3%',
      trend: 'up',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Active Loads',
      value: '1,247',
      change: '+8.3%',
      trend: 'up',
      icon: Package,
      color: 'text-orange-600'
    },
    {
      title: 'Driver Efficiency',
      value: '92.5%',
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  // Fleet Operations Data
  const fleetOperations = [
    {
      vehicleId: 'TRK-001',
      driverName: 'John Smith',
      currentStatus: 'In Transit',
      currentLoad: 'LA to NYC Electronics',
      eta: '2024-01-18 14:30',
      utilizationRate: 94.5,
      milesThisWeek: 2847,
      efficiency: 'High'
    },
    {
      vehicleId: 'TRK-002',
      driverName: 'Sarah Johnson',
      currentStatus: 'Loading',
      currentLoad: 'Chicago to Atlanta Steel',
      eta: '2024-01-19 10:15',
      utilizationRate: 88.2,
      milesThisWeek: 2456,
      efficiency: 'High'
    },
    {
      vehicleId: 'TRK-003',
      driverName: 'Mike Davis',
      currentStatus: 'Available',
      currentLoad: 'None',
      eta: 'N/A',
      utilizationRate: 76.8,
      milesThisWeek: 1923,
      efficiency: 'Medium'
    },
    {
      vehicleId: 'TRK-004',
      driverName: 'Lisa Wilson',
      currentStatus: 'Unloading',
      currentLoad: 'Miami to Boston Reefer',
      eta: '2024-01-17 16:45',
      utilizationRate: 91.3,
      milesThisWeek: 2678,
      efficiency: 'High'
    },
    {
      vehicleId: 'TRK-005',
      driverName: 'Robert Brown',
      currentStatus: 'Maintenance',
      currentLoad: 'None',
      eta: 'N/A',
      utilizationRate: 0,
      milesThisWeek: 0,
      efficiency: 'N/A'
    }
  ];

  // Route Performance
  const routePerformance = [
    {
      route: 'Los Angeles → Chicago',
      frequency: 23,
      avgTime: '2.5 days',
      onTimeRate: 96.8,
      utilizationRate: 94.2,
      profitability: 'High'
    },
    {
      route: 'Dallas → Miami',
      frequency: 18,
      avgTime: '1.8 days',
      onTimeRate: 94.1,
      utilizationRate: 89.7,
      profitability: 'High'
    },
    {
      route: 'Atlanta → Seattle',
      frequency: 15,
      avgTime: '3.2 days',
      onTimeRate: 91.3,
      utilizationRate: 87.5,
      profitability: 'Medium'
    },
    {
      route: 'Phoenix → Denver',
      frequency: 12,
      avgTime: '1.2 days',
      onTimeRate: 98.2,
      utilizationRate: 92.1,
      profitability: 'High'
    },
    {
      route: 'Houston → New York',
      frequency: 20,
      avgTime: '2.8 days',
      onTimeRate: 89.7,
      utilizationRate: 85.3,
      profitability: 'Medium'
    }
  ];

  // Operational Issues
  const operationalIssues = [
    {
      id: 1,
      type: 'Delay',
      description: 'TRK-008 delayed due to weather conditions',
      severity: 'Medium',
      status: 'Active',
      reportedAt: '2024-01-15 09:30',
      estimatedResolution: '2024-01-15 18:00'
    },
    {
      id: 2,
      type: 'Maintenance',
      description: 'TRK-012 requires immediate brake service',
      severity: 'High',
      status: 'In Progress',
      reportedAt: '2024-01-15 07:15',
      estimatedResolution: '2024-01-16 12:00'
    },
    {
      id: 3,
      type: 'Route',
      description: 'Road closure affecting I-95 corridor',
      severity: 'Medium',
      status: 'Monitoring',
      reportedAt: '2024-01-15 06:45',
      estimatedResolution: '2024-01-17 00:00'
    },
    {
      id: 4,
      type: 'Driver',
      description: 'Driver shortage for West Coast routes',
      severity: 'High',
      status: 'Active',
      reportedAt: '2024-01-14 14:20',
      estimatedResolution: '2024-01-20 00:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-50 text-blue-600';
      case 'Loading': return 'bg-yellow-50 text-yellow-600';
      case 'Unloading': return 'bg-orange-50 text-orange-600';
      case 'Available': return 'bg-green-50 text-green-600';
      case 'Maintenance': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-50 text-red-600';
      case 'Medium': return 'bg-yellow-50 text-yellow-600';
      case 'Low': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const handleExportReport = () => {
    toast.success('Operations report exported successfully');
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Operations Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive operational performance and fleet analytics
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

        {/* Operations KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {operationsKPIs.map((kpi) => (
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
        <Tabs defaultValue="fleet" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            <TabsTrigger value="routes">Route Performance</TabsTrigger>
            <TabsTrigger value="issues">Operational Issues</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="fleet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Fleet Operations</CardTitle>
                <CardDescription>Current status and performance of all vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle ID</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Load</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Miles This Week</TableHead>
                      <TableHead>Efficiency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fleetOperations.map((vehicle) => (
                      <TableRow key={vehicle.vehicleId}>
                        <TableCell className="font-medium">{vehicle.vehicleId}</TableCell>
                        <TableCell>{vehicle.driverName}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vehicle.currentStatus)}>
                            {vehicle.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.currentLoad}</TableCell>
                        <TableCell>{vehicle.eta}</TableCell>
                        <TableCell>{vehicle.utilizationRate}%</TableCell>
                        <TableCell>{vehicle.milesThisWeek.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={vehicle.efficiency === 'High' ? 'default' : 'secondary'}>
                            {vehicle.efficiency}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Route Performance Analysis</CardTitle>
                <CardDescription>Performance metrics for key transportation routes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Avg Transit Time</TableHead>
                      <TableHead>On-Time Rate</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Profitability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routePerformance.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{route.route}</TableCell>
                        <TableCell>{route.frequency} loads/month</TableCell>
                        <TableCell>{route.avgTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{route.onTimeRate}%</span>
                            {route.onTimeRate >= 95 ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{route.utilizationRate}%</TableCell>
                        <TableCell>
                          <Badge variant={route.profitability === 'High' ? 'default' : 'secondary'}>
                            {route.profitability}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Operational Issues & Alerts</CardTitle>
                <CardDescription>Current operational challenges and their resolution status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Est. Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operationalIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium">{issue.type}</TableCell>
                        <TableCell>{issue.description}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{issue.status}</TableCell>
                        <TableCell>{issue.reportedAt}</TableCell>
                        <TableCell>{issue.estimatedResolution}</TableCell>
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
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Key operational metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Fleet Utilization Trend</p>
                        <p className="text-sm text-gray-500">7-day average</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">89.2%</p>
                        <p className="text-sm text-green-600">+5.1% ↑</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">On-Time Delivery</p>
                        <p className="text-sm text-gray-500">Monthly average</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">94.7%</p>
                        <p className="text-sm text-green-600">+2.3% ↑</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Driver Efficiency</p>
                        <p className="text-sm text-gray-500">Current period</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">92.5%</p>
                        <p className="text-sm text-green-600">+4.2% ↑</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common operational tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Fleet Utilization Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Route Optimization Analysis
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Performance Benchmarking
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Maintenance Review
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

export default OperationsReportsPage;