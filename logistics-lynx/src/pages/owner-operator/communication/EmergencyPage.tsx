import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  Heart,
  Car,
  Zap,
  FileText,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Navigation,
  Siren,
  Radio,
  Users,
  Calendar,
  Star,
  ChevronRight,
  ExternalLink,
  Download,
  Smartphone,
  Headphones,
  Building,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyContact {
  id: string;
  name: string;
  title: string;
  organization: string;
  phone: string;
  email?: string;
  type: 'emergency-services' | 'company' | 'medical' | 'roadside' | 'family';
  priority: 'primary' | 'secondary' | 'backup';
  available24h: boolean;
  notes?: string;
}

interface EmergencyIncident {
  id: string;
  type: 'accident' | 'breakdown' | 'medical' | 'security' | 'weather' | 'cargo';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating' | 'pending';
  title: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  reportedAt: Date;
  reportedBy: string;
  assignedTo?: string;
  resolvedAt?: Date;
  actions: EmergencyAction[];
  attachments?: string[];
}

interface EmergencyAction {
  id: string;
  action: string;
  timestamp: Date;
  performedBy: string;
  notes?: string;
}

interface EmergencyProcedure {
  id: string;
  title: string;
  category: 'accident' | 'breakdown' | 'medical' | 'security' | 'weather' | 'cargo';
  priority: 'high' | 'medium' | 'low';
  steps: string[];
  contacts: string[];
  lastUpdated: Date;
  version: string;
}

const EmergencyPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedIncident, setSelectedIncident] = useState<string>('');
  const [emergencyForm, setEmergencyForm] = useState({
    type: 'breakdown',
    severity: 'medium',
    title: '',
    description: '',
    location: '',
    currentLat: 0,
    currentLng: 0
  });

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 'ec-001',
      name: '911 Emergency Services',
      title: 'Emergency Dispatcher',
      organization: 'Emergency Services',
      phone: '911',
      type: 'emergency-services',
      priority: 'primary',
      available24h: true,
      notes: 'For life-threatening emergencies only'
    },
    {
      id: 'ec-002',
      name: 'Highway Patrol',
      title: 'State Police',
      organization: 'State Highway Patrol',
      phone: '*77',
      type: 'emergency-services',
      priority: 'primary',
      available24h: true,
      notes: 'For accidents and highway emergencies'
    },
    {
      id: 'ec-003',
      name: 'Sarah Mitchell',
      title: 'Operations Manager',
      organization: 'TMS Operations',
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@tms.com',
      type: 'company',
      priority: 'primary',
      available24h: true,
      notes: 'Primary company contact for emergencies'
    },
    {
      id: 'ec-004',
      name: 'Mike Rodriguez',
      title: 'Fleet Manager',
      organization: 'TMS Fleet Operations',
      phone: '+1 (555) 234-5678',
      email: 'mike.rodriguez@tms.com',
      type: 'company',
      priority: 'secondary',
      available24h: false,
      notes: 'Available 6 AM - 10 PM weekdays'
    },
    {
      id: 'ec-005',
      name: 'AAA Roadside Assistance',
      title: 'Roadside Support',
      organization: 'AAA',
      phone: '+1 (800) 222-4357',
      type: 'roadside',
      priority: 'primary',
      available24h: true,
      notes: 'Company account: TMS-FLEET-2024'
    },
    {
      id: 'ec-006',
      name: 'Dr. Jennifer Adams',
      title: 'Company Medical Advisor',
      organization: 'TMS Medical',
      phone: '+1 (555) 345-6789',
      email: 'j.adams@tmsmedical.com',
      type: 'medical',
      priority: 'primary',
      available24h: false,
      notes: 'Available for medical guidance 24/7 via phone'
    },
    {
      id: 'ec-007',
      name: 'Maria Johnson',
      title: 'Emergency Contact',
      organization: 'Family',
      phone: '+1 (555) 456-7890',
      type: 'family',
      priority: 'primary',
      available24h: true,
      notes: 'Spouse - notify in case of serious emergency'
    }
  ];

  const emergencyIncidents: EmergencyIncident[] = [
    {
      id: 'inc-001',
      type: 'breakdown',
      severity: 'high',
      status: 'active',
      title: 'Engine Overheating on I-95',
      description: 'Engine temperature rising rapidly. Pulled over at mile marker 145. Need immediate roadside assistance.',
      location: 'I-95 North, Mile Marker 145, Jacksonville, FL',
      coordinates: { lat: 30.3322, lng: -81.6557 },
      reportedAt: new Date(2024, 0, 19, 14, 30),
      reportedBy: 'John Smith (Driver)',
      assignedTo: 'Mike Rodriguez',
      actions: [
        {
          id: 'act-001',
          action: 'Contacted roadside assistance',
          timestamp: new Date(2024, 0, 19, 14, 35),
          performedBy: 'John Smith',
          notes: 'AAA dispatched, ETA 45 minutes'
        },
        {
          id: 'act-002',
          action: 'Notified fleet manager',
          timestamp: new Date(2024, 0, 19, 14, 32),
          performedBy: 'Sarah Mitchell',
          notes: 'Backup truck being arranged for load transfer'
        }
      ]
    },
    {
      id: 'inc-002',
      type: 'accident',
      severity: 'critical',
      status: 'resolved',
      title: 'Minor Collision at Loading Dock',
      description: 'Backing collision with dock equipment. Minor damage to rear bumper. No injuries reported.',
      location: 'ABC Manufacturing, Loading Dock 3, Chicago, IL',
      reportedAt: new Date(2024, 0, 18, 11, 15),
      reportedBy: 'John Smith (Driver)',
      assignedTo: 'Sarah Mitchell',
      resolvedAt: new Date(2024, 0, 18, 16, 30),
      actions: [
        {
          id: 'act-003',
          action: 'Initial incident report filed',
          timestamp: new Date(2024, 0, 18, 11, 20),
          performedBy: 'John Smith',
          notes: 'Photos taken, no injuries'
        },
        {
          id: 'act-004',
          action: 'Insurance claim initiated',
          timestamp: new Date(2024, 0, 18, 13, 0),
          performedBy: 'Sarah Mitchell',
          notes: 'Claim #INS-2024-0118-001'
        },
        {
          id: 'act-005',
          action: 'Vehicle inspection completed',
          timestamp: new Date(2024, 0, 18, 16, 30),
          performedBy: 'Mike Rodriguez',
          notes: 'Safe to continue operations'
        }
      ]
    },
    {
      id: 'inc-003',
      type: 'weather',
      severity: 'medium',
      status: 'investigating',
      title: 'Severe Weather Alert - Route Closure',
      description: 'Heavy snow and ice conditions on planned route. Multiple road closures reported.',
      location: 'I-80 West, Wyoming Corridor',
      reportedAt: new Date(2024, 0, 17, 8, 45),
      reportedBy: 'Weather Service Alert',
      assignedTo: 'Jennifer Carter',
      actions: [
        {
          id: 'act-006',
          action: 'Route alternatives being evaluated',
          timestamp: new Date(2024, 0, 17, 9, 0),
          performedBy: 'Jennifer Carter',
          notes: 'Checking southern route options'
        }
      ]
    }
  ];

  const emergencyProcedures: EmergencyProcedure[] = [
    {
      id: 'proc-001',
      title: 'Vehicle Breakdown Protocol',
      category: 'breakdown',
      priority: 'high',
      steps: [
        'Safely pull over to the right shoulder or parking area',
        'Turn on hazard lights immediately',
        'Place reflective triangles 100 feet behind vehicle',
        'Contact dispatch and roadside assistance',
        'Stay with vehicle unless unsafe to do so',
        'Document incident with photos and notes'
      ],
      contacts: ['ec-003', 'ec-005'],
      lastUpdated: new Date(2024, 0, 1),
      version: '2.1'
    },
    {
      id: 'proc-002',
      title: 'Traffic Accident Response',
      category: 'accident',
      priority: 'high',
      steps: [
        'Ensure personal safety first',
        'Call 911 if injuries or major damage',
        'Move to safe location if possible',
        'Turn on hazard lights and set up warning devices',
        'Document scene with photos',
        'Exchange information with other parties',
        'Contact company dispatcher immediately',
        'Do not admit fault or sign documents'
      ],
      contacts: ['ec-001', 'ec-002', 'ec-003'],
      lastUpdated: new Date(2024, 0, 1),
      version: '3.0'
    },
    {
      id: 'proc-003',
      title: 'Medical Emergency Response',
      category: 'medical',
      priority: 'high',
      steps: [
        'Call 911 immediately for serious injuries',
        'Administer first aid if trained',
        'Do not move injured person unless in danger',
        'Stay calm and provide clear information to responders',
        'Contact company medical advisor',
        'Notify family emergency contact if serious',
        'Document incident thoroughly'
      ],
      contacts: ['ec-001', 'ec-006', 'ec-007'],
      lastUpdated: new Date(2024, 0, 1),
      version: '2.3'
    }
  ];

  const handleEmergencyCall = (contact: EmergencyContact) => {
    toast({
      title: "Emergency Call Initiated",
      description: `Calling ${contact.name} at ${contact.phone}`,
      variant: "destructive"
    });
  };

  const handleReportIncident = () => {
    if (!emergencyForm.title || !emergencyForm.description) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Emergency Report Submitted",
      description: "Your emergency report has been submitted and dispatch has been notified.",
    });

    setEmergencyForm({
      type: 'breakdown',
      severity: 'medium',
      title: '',
      description: '',
      location: '',
      currentLat: 0,
      currentLng: 0
    });
  };

  const getIncidentIcon = (type: string) => {
    const icons = {
      'accident': Car,
      'breakdown': Truck,
      'medical': Heart,
      'security': Shield,
      'weather': Zap,
      'cargo': Package
    };
    return icons[type as keyof typeof icons] || AlertTriangle;
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'destructive',
      'critical': 'destructive'
    } as const;
    return <Badge variant={variants[severity as keyof typeof variants]}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'active': { variant: 'destructive' as const, icon: AlertTriangle },
      'resolved': { variant: 'default' as const, icon: CheckCircle },
      'investigating': { variant: 'default' as const, icon: Eye },
      'pending': { variant: 'outline' as const, icon: Clock }
    };
    const { variant, icon: Icon } = config[status as keyof typeof config];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getContactTypeIcon = (type: string) => {
    const icons = {
      'emergency-services': Siren,
      'company': Building,
      'medical': Heart,
      'roadside': Truck,
      'family': Users
    };
    return icons[type as keyof typeof icons] || Phone;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Emergency Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            Emergency Center
          </h1>
          <p className="text-muted-foreground mt-2">
            24/7 emergency response and incident management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" className="gap-2">
            <Phone className="h-4 w-4" />
            Call 911
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report Emergency Incident</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-type">Incident Type</Label>
                    <Select value={emergencyForm.type} onValueChange={(value) => setEmergencyForm(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accident">Traffic Accident</SelectItem>
                        <SelectItem value="breakdown">Vehicle Breakdown</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="security">Security Issue</SelectItem>
                        <SelectItem value="weather">Weather Emergency</SelectItem>
                        <SelectItem value="cargo">Cargo Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={emergencyForm.severity} onValueChange={(value) => setEmergencyForm(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incident-title">Incident Title</Label>
                  <Input
                    id="incident-title"
                    placeholder="Brief description of the incident"
                    value={emergencyForm.title}
                    onChange={(e) => setEmergencyForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-description">Detailed Description</Label>
                  <Textarea
                    id="incident-description"
                    placeholder="Provide detailed information about the incident..."
                    value={emergencyForm.description}
                    onChange={(e) => setEmergencyForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-location">Current Location</Label>
                  <Input
                    id="incident-location"
                    placeholder="Street address, mile marker, or GPS coordinates"
                    value={emergencyForm.location}
                    onChange={(e) => setEmergencyForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Navigation className="h-4 w-4" />
                    Use Current Location
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Share Location
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handleReportIncident} variant="destructive">
                  Report Emergency
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Siren className="h-5 w-5" />
            Quick Emergency Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="destructive" className="h-20 flex-col gap-2" onClick={() => handleEmergencyCall(emergencyContacts[0])}>
              <Phone className="h-6 w-6" />
              <span>Call 911</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => handleEmergencyCall(emergencyContacts[1])}>
              <Radio className="h-6 w-6" />
              <span>Highway Patrol</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => handleEmergencyCall(emergencyContacts[4])}>
              <Truck className="h-6 w-6" />
              <span>Roadside Assist</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => handleEmergencyCall(emergencyContacts[2])}>
              <Headphones className="h-6 w-6" />
              <span>Dispatch</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {emergencyContacts.map((contact) => {
                const Icon = getContactTypeIcon(contact.type);
                return (
                  <div key={contact.id} className="border rounded-lg p-3 hover:bg-accent transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        contact.type === 'emergency-services' && "bg-red-100 text-red-600",
                        contact.type === 'company' && "bg-blue-100 text-blue-600",
                        contact.type === 'medical' && "bg-green-100 text-green-600",
                        contact.type === 'roadside' && "bg-orange-100 text-orange-600",
                        contact.type === 'family' && "bg-purple-100 text-purple-600"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                          {contact.available24h && (
                            <Badge variant="secondary" className="text-xs">24/7</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{contact.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">{contact.organization}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={contact.type === 'emergency-services' ? 'destructive' : 'outline'}
                            onClick={() => handleEmergencyCall(contact)}
                            className="text-xs"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </Button>
                        </div>
                        {contact.notes && (
                          <p className="text-xs text-muted-foreground mt-2 italic">{contact.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {emergencyIncidents.map((incident) => {
                const Icon = getIncidentIcon(incident.type);
                return (
                  <div
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident.id)}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer transition-colors hover:bg-accent",
                      selectedIncident === incident.id && "bg-primary/10 border-primary"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        incident.severity === 'critical' && "bg-red-100 text-red-600",
                        incident.severity === 'high' && "bg-orange-100 text-orange-600",
                        incident.severity === 'medium' && "bg-yellow-100 text-yellow-600",
                        incident.severity === 'low' && "bg-green-100 text-green-600"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{incident.title}</h4>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{incident.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {incident.reportedAt.toLocaleDateString()} at {incident.reportedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Emergency Procedures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Emergency Procedures
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {emergencyProcedures.map((procedure) => (
                <div key={procedure.id} className="border rounded-lg p-3 hover:bg-accent transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{procedure.title}</h4>
                    <div className="flex items-center gap-1">
                      <Badge variant={procedure.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {procedure.priority}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Steps: {procedure.steps.length}</p>
                    <div className="text-xs">
                      <p className="font-medium mb-1">Quick Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        {procedure.steps.slice(0, 3).map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                        {procedure.steps.length > 3 && (
                          <li className="text-primary">+ {procedure.steps.length - 3} more steps...</li>
                        )}
                      </ol>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>v{procedure.version}</span>
                      <span>{procedure.lastUpdated.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Incident Details */}
      {selectedIncident && (
        <Card>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const incident = emergencyIncidents.find(i => i.id === selectedIncident);
              if (!incident) return null;
              
              const Icon = getIncidentIcon(incident.type);
              
              return (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-full",
                      incident.severity === 'critical' && "bg-red-100 text-red-600",
                      incident.severity === 'high' && "bg-orange-100 text-orange-600",
                      incident.severity === 'medium' && "bg-yellow-100 text-yellow-600",
                      incident.severity === 'low' && "bg-green-100 text-green-600"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">{incident.title}</h2>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{incident.description}</p>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{incident.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reported</p>
                          <p className="text-sm text-muted-foreground">
                            {incident.reportedAt.toLocaleDateString()} at {incident.reportedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reported By</p>
                          <p className="text-sm text-muted-foreground">{incident.reportedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Assigned To</p>
                          <p className="text-sm text-muted-foreground">{incident.assignedTo || 'Unassigned'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Action Timeline</h3>
                    <div className="space-y-4">
                      {incident.actions.map((action, index) => (
                        <div key={action.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            {index < incident.actions.length - 1 && (
                              <div className="w-px h-8 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{action.action}</p>
                              <span className="text-sm text-muted-foreground">
                                {action.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{action.performedBy}</p>
                            {action.notes && (
                              <p className="text-sm text-muted-foreground mt-1">{action.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Update Status
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Action
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmergencyPage;