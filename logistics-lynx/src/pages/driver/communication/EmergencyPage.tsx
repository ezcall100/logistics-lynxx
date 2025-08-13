import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Phone, 
  Shield,
  Truck,
  MapPin,
  Clock,
  Users,
  FileText,
  Zap,
  Heart,
  Car,
  Construction,
  Flame,
  Activity,
  Navigation,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  available24h: boolean;
  priority: number;
}

interface EmergencyReport {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  description: string;
  timestamp: string;
  status: "reported" | "responding" | "resolved";
  reportedBy: string;
  responseTime?: string;
}

const EmergencyPage = () => {
  const { toast } = useToast();
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const [isReportIncidentOpen, setIsReportIncidentOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState("");

  // Emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Emergency Services",
      role: "911 Emergency",
      phone: "911",
      available24h: true,
      priority: 1
    },
    {
      id: "2",
      name: "Company Emergency Line",
      role: "24/7 Dispatch Emergency",
      phone: "(555) 911-HELP",
      available24h: true,
      priority: 2
    },
    {
      id: "3",
      name: "Roadside Assistance",
      role: "Fleet Roadside Support",
      phone: "(555) ROADSIDE",
      available24h: true,
      priority: 3
    },
    {
      id: "4",
      name: "Safety Hotline",
      role: "Company Safety Department",
      phone: "(555) 123-SAFE",
      available24h: true,
      priority: 4
    },
    {
      id: "5",
      name: "Medical Emergency",
      role: "Poison Control",
      phone: "1-800-222-1222",
      available24h: true,
      priority: 5
    },
    {
      id: "6",
      name: "DOT Emergency",
      role: "Department of Transportation",
      phone: "(555) DOT-HELP",
      available24h: false,
      priority: 6
    }
  ];

  // Emergency types
  const emergencyTypes = [
    { id: "medical", name: "Medical Emergency", icon: Heart, color: "bg-red-100 text-red-800", severity: "critical" },
    { id: "accident", name: "Vehicle Accident", icon: Car, color: "bg-orange-100 text-orange-800", severity: "high" },
    { id: "breakdown", name: "Vehicle Breakdown", icon: Truck, color: "bg-yellow-100 text-yellow-800", severity: "medium" },
    { id: "fire", name: "Fire/Hazmat", icon: Flame, color: "bg-red-100 text-red-800", severity: "critical" },
    { id: "weather", name: "Severe Weather", icon: Zap, color: "bg-blue-100 text-blue-800", severity: "high" },
    { id: "security", name: "Security Threat", icon: Shield, color: "bg-purple-100 text-purple-800", severity: "high" },
    { id: "road", name: "Road Hazard", icon: Construction, color: "bg-orange-100 text-orange-800", severity: "medium" },
    { id: "other", name: "Other Emergency", icon: AlertTriangle, color: "bg-gray-100 text-gray-800", severity: "medium" }
  ];

  // Recent emergency reports
  const emergencyReports: EmergencyReport[] = [
    {
      id: "1",
      type: "Vehicle Breakdown",
      severity: "medium",
      location: "I-35 North, Mile Marker 245",
      description: "Engine overheating, pulled over safely on shoulder",
      timestamp: "2024-01-19 14:30",
      status: "responding",
      reportedBy: "John Doe (Driver)",
      responseTime: "8 minutes"
    },
    {
      id: "2",
      type: "Road Hazard",
      severity: "medium",
      location: "US-290 Westbound, Near Exit 12",
      description: "Large debris in roadway, reported to authorities",
      timestamp: "2024-01-18 09:15",
      status: "resolved",
      reportedBy: "Jane Smith (Driver)",
      responseTime: "15 minutes"
    },
    {
      id: "3",
      type: "Severe Weather",
      severity: "high",
      location: "I-10 East, Rest Area Mile 156",
      description: "Seeking shelter due to tornado warning in area",
      timestamp: "2024-01-17 16:45",
      status: "resolved",
      reportedBy: "Mike Johnson (Driver)",
      responseTime: "5 minutes"
    }
  ];

  const handleEmergencyCall = (contact: EmergencyContact) => {
    toast({
      title: "Emergency Call Initiated",
      description: `Calling ${contact.name} at ${contact.phone}`,
      variant: "destructive"
    });
  };

  const handleQuickEmergency = (type: string) => {
    setSelectedEmergency(type);
    setIsEmergencyDialogOpen(true);
  };

  const handleReportEmergency = () => {
    toast({
      title: "Emergency Reported",
      description: "Emergency services have been notified and are responding.",
      variant: "destructive"
    });
    setIsEmergencyDialogOpen(false);
  };

  const handleReportIncident = () => {
    toast({
      title: "Incident Reported",
      description: "Incident report has been submitted to safety department.",
    });
    setIsReportIncidentOpen(false);
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    return colors[severity as keyof typeof colors];
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      reported: "bg-yellow-100 text-yellow-800",
      responding: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header with Emergency Alert */}
      <div className="space-y-4">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency Hotline: (555) 911-HELP</strong> - Available 24/7 for immediate assistance
          </AlertDescription>
        </Alert>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-red-600">Emergency Response</h1>
            <p className="text-muted-foreground">24/7 emergency support and incident reporting</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="destructive" size="lg" onClick={() => handleEmergencyCall(emergencyContacts[0])}>
              <Phone className="h-5 w-5 mr-2" />
              Call 911
            </Button>
            <Button variant="outline" onClick={() => handleEmergencyCall(emergencyContacts[1])}>
              <Phone className="h-4 w-4 mr-2" />
              Company Emergency
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Emergency Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Zap className="h-5 w-5" />
            Quick Emergency Response
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyTypes.slice(0, 4).map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant="outline"
                  className="h-20 flex-col gap-2 border-2 hover:border-red-300"
                  onClick={() => handleQuickEmergency(type.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs text-center">{type.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Contacts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{contact.name}</h4>
                  <p className="text-xs text-muted-foreground">{contact.role}</p>
                  <p className="text-sm font-mono">{contact.phone}</p>
                  {contact.available24h && (
                    <Badge className="bg-green-100 text-green-800 text-xs">24/7</Badge>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant={contact.priority <= 2 ? "destructive" : "outline"}
                  onClick={() => handleEmergencyCall(contact)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Types & Recent Reports */}
        <div className="lg:col-span-2 space-y-6">
          {/* All Emergency Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emergencyTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleQuickEmergency(type.id)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-3 rounded-lg ${type.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium text-sm text-center">{type.name}</h4>
                        <Badge className={getSeverityBadge(type.severity)} >
                          {type.severity}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Emergency Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Emergency Reports
                </CardTitle>
                <Dialog open={isReportIncidentOpen} onOpenChange={setIsReportIncidentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Report Incident
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Report Safety Incident</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="incident-type">Incident Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                          <SelectContent>
                            {emergencyTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="incident-severity">Severity</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="incident-location">Location</Label>
                        <Input id="incident-location" placeholder="Current location or address" />
                      </div>
                      <div>
                        <Label htmlFor="incident-description">Description</Label>
                        <Textarea 
                          id="incident-description" 
                          placeholder="Describe the incident in detail..."
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleReportIncident} className="flex-1">
                          Submit Report
                        </Button>
                        <Button variant="outline" onClick={() => setIsReportIncidentOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyReports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{report.type}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityBadge(report.severity)}>
                          {report.severity}
                        </Badge>
                        <Badge className={getStatusBadge(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{report.timestamp}</span>
                        {report.responseTime && (
                          <span className="text-muted-foreground">
                            • Response: {report.responseTime}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{report.reportedBy}</span>
                      </div>
                      <p className="text-muted-foreground mt-2">{report.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Dialog */}
      <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Report Emergency
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                This will immediately notify emergency services and dispatch.
              </AlertDescription>
            </Alert>
            
            <div>
              <Label htmlFor="emergency-location">Current Location</Label>
              <div className="flex gap-2">
                <Input id="emergency-location" placeholder="Enter location or use GPS" className="flex-1" />
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="emergency-details">Emergency Details</Label>
              <Textarea 
                id="emergency-details" 
                placeholder="Describe the emergency situation..."
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label>Actions Taken</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Moved to safe location</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Set up warning devices</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Called 911</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleReportEmergency} variant="destructive" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Emergency
              </Button>
              <Button variant="outline" onClick={() => setIsEmergencyDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyPage;