import React, { useState } from 'react';
import { Truck, Fuel, Gauge, AlertTriangle, CheckCircle, Settings, MapPin, Clock, Thermometer, Battery, Edit, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VehicleStatus {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  mileage: number;
  fuelLevel: number;
  engineHours: number;
  engineTemp: number;
  oilPressure: number;
  batteryVoltage: number;
  tirePressure: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  lastInspection: string;
  nextService: string;
  currentLocation: string;
  status: 'operational' | 'maintenance_due' | 'out_of_service' | 'inspection_due';
  alerts: Alert[];
  diagnostics: DiagnosticCode[];
}

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'pending' | 'resolved';
  detected: string;
}

const VehicleStatusPage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleStatus | null>(null);
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [maintenanceNotes, setMaintenanceNotes] = useState('');

  // Mock vehicle data
  const vehicleStatus: VehicleStatus = {
    id: 'VH001',
    make: 'Kenworth',
    model: 'T680',
    year: 2021,
    vin: '1XKAD40X5LJ123456',
    licensePlate: 'TRK-2024',
    mileage: 145280,
    fuelLevel: 75,
    engineHours: 8920,
    engineTemp: 195,
    oilPressure: 45,
    batteryVoltage: 12.8,
    tirePressure: {
      frontLeft: 110,
      frontRight: 108,
      rearLeft: 105,
      rearRight: 107
    },
    lastInspection: '2024-01-15',
    nextService: '2024-02-15',
    currentLocation: 'Phoenix, AZ - I-10 Mile Marker 143',
    status: 'operational',
    alerts: [
      {
        id: 'ALT001',
        type: 'warning',
        message: 'Tire pressure low on rear left wheel',
        timestamp: '2024-01-26T08:30:00',
        acknowledged: false
      },
      {
        id: 'ALT002',
        type: 'info',
        message: 'Scheduled maintenance due in 500 miles',
        timestamp: '2024-01-26T06:00:00',
        acknowledged: true
      }
    ],
    diagnostics: [
      {
        code: 'P0128',
        description: 'Coolant Temperature Below Thermostat Regulating Temperature',
        severity: 'medium',
        status: 'active',
        detected: '2024-01-25T14:20:00'
      },
      {
        code: 'U0100',
        description: 'Lost Communication with ECM/PCM',
        severity: 'low',
        status: 'resolved',
        detected: '2024-01-20T09:15:00'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Operational</Badge>;
      case 'maintenance_due':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Maintenance Due</Badge>;
      case 'out_of_service':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Out of Service</Badge>;
      case 'inspection_due':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Inspection Due</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    toast.success(`Alert ${alertId} acknowledged`);
    // Mock API call would go here
  };

  const handleRequestMaintenance = () => {
    if (!maintenanceNotes) {
      toast.error('Please enter maintenance notes');
      return;
    }
    toast.success('Maintenance request submitted successfully');
    setMaintenanceNotes('');
    // Mock API call would go here
  };

  const handleUpdateInspection = () => {
    if (!inspectionNotes) {
      toast.error('Please enter inspection notes');
      return;
    }
    toast.success('Inspection updated successfully');
    setInspectionNotes('');
    // Mock API call would go here
  };

  const handleRefreshData = () => {
    toast.success('Vehicle data refreshed');
    // Mock API call would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vehicle Status</h1>
            <p className="text-muted-foreground">Monitor real-time vehicle health and performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleRefreshData} className="hover-scale">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Settings className="h-4 w-4 mr-2" />
              Vehicle Settings
            </Button>
          </div>
        </div>

        {/* Vehicle Overview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{vehicleStatus.year} {vehicleStatus.make} {vehicleStatus.model}</CardTitle>
                <p className="text-muted-foreground">VIN: {vehicleStatus.vin} • License: {vehicleStatus.licensePlate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-blue-600" />
                {getStatusBadge(vehicleStatus.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Gauge className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="text-lg font-semibold">{vehicleStatus.mileage.toLocaleString()} mi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engine Hours</p>
                  <p className="text-lg font-semibold">{vehicleStatus.engineHours.toLocaleString()} hrs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Location</p>
                  <p className="text-sm font-medium">{vehicleStatus.currentLocation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Level</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStatus.fuelLevel}%</div>
              <Progress value={vehicleStatus.fuelLevel} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {vehicleStatus.fuelLevel < 25 ? 'Low fuel warning' : 'Normal range'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engine Temp</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStatus.engineTemp}°F</div>
              <Progress 
                value={(vehicleStatus.engineTemp / 250) * 100} 
                className={`h-2 mt-2 ${vehicleStatus.engineTemp > 220 ? 'text-red-600' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {vehicleStatus.engineTemp > 220 ? 'High temperature' : 'Normal operating temp'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oil Pressure</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStatus.oilPressure} PSI</div>
              <Progress 
                value={(vehicleStatus.oilPressure / 80) * 100} 
                className="h-2 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Normal pressure</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleStatus.batteryVoltage}V</div>
              <Progress 
                value={(vehicleStatus.batteryVoltage / 15) * 100} 
                className="h-2 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Good condition</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Status */}
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="tires">Tire Pressure</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts ({vehicleStatus.alerts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicleStatus.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="font-medium">{alert.message}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {!alert.acknowledged && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tires" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tire Pressure Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Front Tires</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Front Left</p>
                        <p className="text-2xl font-bold">{vehicleStatus.tirePressure.frontLeft}</p>
                        <p className="text-xs text-muted-foreground">PSI</p>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Front Right</p>
                        <p className="text-2xl font-bold">{vehicleStatus.tirePressure.frontRight}</p>
                        <p className="text-xs text-muted-foreground">PSI</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Rear Tires</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Rear Left</p>
                        <p className={`text-2xl font-bold ${vehicleStatus.tirePressure.rearLeft < 110 ? 'text-red-600' : ''}`}>
                          {vehicleStatus.tirePressure.rearLeft}
                        </p>
                        <p className="text-xs text-muted-foreground">PSI</p>
                        {vehicleStatus.tirePressure.rearLeft < 110 && (
                          <Badge variant="destructive" className="text-xs mt-1">Low</Badge>
                        )}
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Rear Right</p>
                        <p className="text-2xl font-bold">{vehicleStatus.tirePressure.rearRight}</p>
                        <p className="text-xs text-muted-foreground">PSI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Diagnostic Trouble Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicleStatus.diagnostics.map((diagnostic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{diagnostic.code}</h4>
                        <p className="text-sm text-muted-foreground">{diagnostic.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Detected: {new Date(diagnostic.detected).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={diagnostic.severity === 'high' ? 'destructive' : diagnostic.severity === 'medium' ? 'outline' : 'secondary'}
                        >
                          {diagnostic.severity}
                        </Badge>
                        <Badge 
                          variant={diagnostic.status === 'active' ? 'destructive' : 'outline'}
                        >
                          {diagnostic.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Last Inspection</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vehicleStatus.lastInspection).toLocaleDateString()}
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <p className="font-medium">Next Service Due</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(vehicleStatus.nextService).toLocaleDateString()}
                      </p>
                    </div>
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Request Maintenance</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Maintenance</DialogTitle>
                        <DialogDescription>
                          Submit a maintenance request for your vehicle
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="maintenance-notes">Maintenance Notes</Label>
                          <Textarea
                            id="maintenance-notes"
                            placeholder="Describe the maintenance needed..."
                            value={maintenanceNotes}
                            onChange={(e) => setMaintenanceNotes(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={handleRequestMaintenance}>Submit Request</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inspection Update</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="inspection-notes">Inspection Notes</Label>
                    <Textarea
                      id="inspection-notes"
                      placeholder="Enter pre-trip inspection notes..."
                      value={inspectionNotes}
                      onChange={(e) => setInspectionNotes(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleUpdateInspection} className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Inspection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VehicleStatusPage;