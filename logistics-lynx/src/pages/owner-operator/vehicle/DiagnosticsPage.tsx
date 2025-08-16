/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  Thermometer,
  Gauge,
  Droplets,
  Battery,
  Wrench,
  Calendar,
  FileText,
  Download
} from 'lucide-react';

interface DiagnosticData {
  category: string;
  status: 'good' | 'warning' | 'critical';
  value: string | number;
  unit?: string;
  normalRange?: string;
  lastChecked: string;
  description: string;
}

interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'active' | 'resolved' | 'pending';
  dateDetected: string;
  mileage: number;
}

const DiagnosticsPage: React.FC = () => {
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);

  const diagnosticData: DiagnosticData[] = [
    {
      category: 'Engine',
      status: 'good',
      value: 185,
      unit: '°F',
      normalRange: '180-220°F',
      lastChecked: '2024-01-15 14:30',
      description: 'Engine operating temperature'
    },
    {
      category: 'Transmission',
      status: 'warning',
      value: 195,
      unit: '°F',
      normalRange: '160-200°F',
      lastChecked: '2024-01-15 14:30',
      description: 'Transmission fluid temperature slightly elevated'
    },
    {
      category: 'Coolant Level',
      status: 'good',
      value: 'Full',
      normalRange: 'Full',
      lastChecked: '2024-01-15 14:30',
      description: 'Coolant reservoir level'
    },
    {
      category: 'Oil Pressure',
      status: 'good',
      value: 45,
      unit: 'PSI',
      normalRange: '30-80 PSI',
      lastChecked: '2024-01-15 14:30',
      description: 'Engine oil pressure'
    },
    {
      category: 'Battery Voltage',
      status: 'good',
      value: 12.6,
      unit: 'V',
      normalRange: '12.4-12.8V',
      lastChecked: '2024-01-15 14:30',
      description: 'Battery electrical voltage'
    },
    {
      category: 'Fuel Level',
      status: 'warning',
      value: 25,
      unit: '%',
      normalRange: '> 20%',
      lastChecked: '2024-01-15 14:30',
      description: 'Fuel tank level running low'
    },
    {
      category: 'Brake Air Pressure',
      status: 'good',
      value: 120,
      unit: 'PSI',
      normalRange: '100-125 PSI',
      lastChecked: '2024-01-15 14:30',
      description: 'Air brake system pressure'
    },
    {
      category: 'Exhaust Temperature',
      status: 'critical',
      value: 1250,
      unit: '°F',
      normalRange: '600-1100°F',
      lastChecked: '2024-01-15 14:30',
      description: 'Exhaust gas temperature too high - check immediately'
    }
  ];

  const diagnosticCodes: DiagnosticCode[] = [
    {
      code: 'P0171',
      description: 'System Too Lean (Bank 1)',
      severity: 'warning',
      status: 'active',
      dateDetected: '2024-01-12',
      mileage: 245680
    },
    {
      code: 'P0420',
      description: 'Catalyst System Efficiency Below Threshold',
      severity: 'critical',
      status: 'active',
      dateDetected: '2024-01-10',
      mileage: 245450
    },
    {
      code: 'P0401',
      description: 'Exhaust Gas Recirculation Flow Insufficient',
      severity: 'warning',
      status: 'pending',
      dateDetected: '2024-01-08',
      mileage: 245220
    },
    {
      code: 'B1260',
      description: 'Anti-theft System Malfunction',
      severity: 'info',
      status: 'resolved',
      dateDetected: '2024-01-05',
      mileage: 244980
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info':
        return 'border-blue-500 bg-blue-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'critical':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const handleRunDiagnostic = () => {
    setIsRunningDiagnostic(true);
    setTimeout(() => {
      setIsRunningDiagnostic(false);
    }, 5000);
  };

  const handleDownloadReport = () => {
    console.log('Downloading diagnostic report...');
  };

  const criticalIssues = diagnosticData.filter(item => item.status === 'critical').length;
  const warningIssues = diagnosticData.filter(item => item.status === 'warning').length;
  const overallHealth = criticalIssues === 0 && warningIssues === 0 ? 100 : 
                       criticalIssues === 0 && warningIssues <= 2 ? 85 :
                       criticalIssues === 0 ? 70 : 
                       criticalIssues <= 2 ? 50 : 25;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Diagnostics</h1>
          <p className="text-muted-foreground">Monitor your vehicle's health and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button 
            onClick={handleRunDiagnostic} 
            disabled={isRunningDiagnostic}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {isRunningDiagnostic ? 'Running...' : 'Run Diagnostic'}
          </Button>
        </div>
      </div>

      {/* Overall Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-6 w-6" />
            Overall Vehicle Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">{overallHealth}%</div>
              <p className="text-sm text-muted-foreground">System Health Score</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">{criticalIssues} Critical Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{warningIssues} Warnings</span>
              </div>
            </div>
          </div>
          <Progress value={overallHealth} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Last diagnostic scan: January 15, 2024 at 2:30 PM
          </p>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {criticalIssues > 0 && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            <strong>Critical Issues Detected:</strong> {criticalIssues} system(s) require immediate attention. 
            Schedule maintenance as soon as possible to prevent breakdown.
          </AlertDescription>
        </Alert>
      )}

      {isRunningDiagnostic && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            <strong>Running Diagnostic Scan:</strong> Please wait while we check all vehicle systems...
            <Progress value={60} className="h-2 mt-2" />
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="systems" className="space-y-6">
        <TabsList>
          <TabsTrigger value="systems">System Status</TabsTrigger>
          <TabsTrigger value="codes">Diagnostic Codes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="systems">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosticData.map((item, index) => (
              <Card key={index} className={`${item.status === 'critical' ? 'border-red-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{item.category}</CardTitle>
                    {getStatusIcon(item.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {item.value}
                        {item.unit && <span className="text-lg text-muted-foreground ml-1">{item.unit}</span>}
                      </span>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    {item.normalRange && (
                      <div className="text-sm text-muted-foreground">
                        Normal: {item.normalRange}
                      </div>
                    )}
                    <div className="text-sm">{item.description}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.lastChecked}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="codes">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Trouble Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diagnosticCodes.map((code, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(code.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-lg">{code.code}</span>
                          <Badge variant="outline" className="capitalize">
                            {code.status}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {code.severity}
                          </Badge>
                        </div>
                        <p className="text-sm">{code.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Detected: {code.dateDetected}
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge className="h-3 w-3" />
                            Mileage: {code.mileage.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Wrench className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Diagnostic history will be displayed here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Track trends and patterns in your vehicle's performance over time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagnosticsPage;