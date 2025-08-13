import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Truck, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Fuel, 
  Gauge, 
  Wrench,
  MapPin,
  Calendar,
  FileText,
  Settings,
  RefreshCw,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleAlert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
}

interface VehicleInspection {
  id: string;
  date: string;
  inspector: string;
  type: string;
  status: "passed" | "failed" | "pending";
  notes: string;
}

const VehicleStatusPage = () => {
  const { toast } = useToast();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);

  // Mock vehicle data
  const vehicleData = {
    id: "TRK-001",
    make: "Freightliner",
    model: "Cascadia",
    year: 2022,
    vin: "1FUJGHDV8NLBD1234",
    plateNumber: "TXC-789",
    mileage: 145782,
    location: "Dallas, TX",
    status: "active",
    lastInspection: "2024-01-15",
    nextMaintenance: "2024-02-20"
  };

  const alerts: VehicleAlert[] = [
    {
      id: "1",
      type: "warning",
      title: "Tire Pressure Low",
      description: "Front left tire pressure is below recommended PSI",
      timestamp: "2024-01-19 08:30"
    },
    {
      id: "2",
      type: "info",
      title: "Scheduled Maintenance Due",
      description: "Oil change scheduled for next week",
      timestamp: "2024-01-19 06:00"
    },
    {
      id: "3",
      type: "critical",
      title: "Engine Warning Light",
      description: "Check engine light activated - immediate attention required",
      timestamp: "2024-01-18 14:22"
    }
  ];

  const inspections: VehicleInspection[] = [
    {
      id: "1",
      date: "2024-01-15",
      inspector: "John Smith",
      type: "DOT Inspection",
      status: "passed",
      notes: "All systems operational, minor tire wear noted"
    },
    {
      id: "2",
      date: "2024-01-10",
      inspector: "Mike Johnson",
      type: "Pre-Trip",
      status: "passed",
      notes: "Vehicle ready for operation"
    },
    {
      id: "3",
      date: "2024-01-05",
      inspector: "Sarah Davis",
      type: "Post-Trip",
      status: "failed",
      notes: "Brake fluid low, headlight alignment needed"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "warning": return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      default: return "default";
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: "default",
      failed: "destructive",
      pending: "secondary"
    };
    return variants[status as keyof typeof variants] || "default";
  };

  const handleReportIssue = () => {
    toast({
      title: "Issue Reported",
      description: "Your vehicle issue has been reported to maintenance team.",
    });
    setIsReportDialogOpen(false);
  };

  const handleInspectionSubmit = () => {
    toast({
      title: "Inspection Completed",
      description: "Vehicle inspection has been recorded successfully.",
    });
    setIsInspectionDialogOpen(false);
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Status</h1>
          <p className="text-muted-foreground">Monitor and manage your assigned vehicle</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Report Vehicle Issue</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="tire">Tire Related</SelectItem>
                      <SelectItem value="brake">Brake System</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="issue-description">Description</Label>
                  <Textarea 
                    id="issue-description" 
                    placeholder="Describe the issue in detail..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="issue-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleReportIssue} className="flex-1">
                    Submit Report
                  </Button>
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isInspectionDialogOpen} onOpenChange={setIsInspectionDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Log Inspection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Vehicle Inspection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inspection-type">Inspection Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-trip">Pre-Trip</SelectItem>
                        <SelectItem value="post-trip">Post-Trip</SelectItem>
                        <SelectItem value="dot">DOT Inspection</SelectItem>
                        <SelectItem value="maintenance">Maintenance Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspection-status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passed">Passed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="inspection-notes">Notes</Label>
                  <Textarea 
                    id="inspection-notes" 
                    placeholder="Inspection details and findings..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleInspectionSubmit} className="flex-1">
                    Save Inspection
                  </Button>
                  <Button variant="outline" onClick={() => setIsInspectionDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Vehicle Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vehicle ID</p>
                <p className="text-xl font-semibold">{vehicleData.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gauge className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mileage</p>
                <p className="text-xl font-semibold">{vehicleData.mileage.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-xl font-semibold">{vehicleData.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Service</p>
                <p className="text-xl font-semibold">{vehicleData.nextMaintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Make & Model</Label>
                    <p className="font-medium">{vehicleData.make} {vehicleData.model}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Year</Label>
                    <p className="font-medium">{vehicleData.year}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">VIN</Label>
                    <p className="font-medium text-xs">{vehicleData.vin}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">License Plate</Label>
                    <p className="font-medium">{vehicleData.plateNumber}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engine Performance</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Brake System</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Transmission</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Electrical System</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="p-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge variant={getAlertVariant(alert.type) as unknown}>
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Acknowledge</Button>
                      <Button size="sm">Resolve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Inspections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>{inspection.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(inspection.status) as unknown}>
                          {inspection.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{inspection.notes}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">
                            <Camera className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Engine Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Oil Pressure</Label>
                    <p className="text-lg font-semibold text-green-600">Normal</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Coolant Temp</Label>
                    <p className="text-lg font-semibold text-green-600">195°F</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">RPM</Label>
                    <p className="text-lg font-semibold">1450</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Fuel Level</Label>
                    <p className="text-lg font-semibold">78%</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Diagnostics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Fuel Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">6.8</p>
                  <p className="text-sm text-muted-foreground">Miles per gallon</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm font-medium">6.8 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Week</span>
                    <span className="text-sm font-medium">7.1 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average</span>
                    <span className="text-sm font-medium">6.9 MPG</span>
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

export default VehicleStatusPage;