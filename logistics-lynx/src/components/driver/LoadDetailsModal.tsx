/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Package,
  Truck,
  Calendar,
  Clock,
  DollarSign,
  Navigation,
  Phone,
  FileText,
  AlertTriangle,
  CheckCircle,
  User,
  Building,
  Weight,
  Ruler,
  Thermometer,
  Shield,
  Route,
  Fuel,
  Timer,
  Target,
  Activity
} from 'lucide-react';

interface LoadDetails {
  id: string;
  status: string;
  pickup: {
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    contact: string;
    phone: string;
    scheduledTime: string;
    actualTime?: string;
    appointmentNumber?: string;
  };
  delivery: {
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    contact: string;
    phone: string;
    scheduledTime: string;
    actualTime?: string;
    appointmentNumber?: string;
  };
  cargo: {
    description: string;
    weight: string;
    pieces: number;
    dimensions: string;
    value: string;
    hazmat: boolean;
    temperature: string;
    specialInstructions?: string;
  };
  financial: {
    rate: string;
    mileage: string;
    ratePerMile: string;
    fuelSurcharge: string;
    accessorials: string;
    totalPay: string;
  };
  route: {
    totalDistance: string;
    estimatedTime: string;
    actualTime?: string;
    fuelStops: number;
    tollCost: string;
  };
  documents: {
    bol: boolean;
    pod: boolean;
    invoice: boolean;
    rateConfirmation: boolean;
    manifest: boolean;
  };
  tracking: {
    progress: number;
    currentLocation: string;
    nextMilestone: string;
    estimatedArrival: string;
    delays: unknown[];
  };
}

interface LoadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadId: string;
}

const LoadDetailsModal: React.FC<LoadDetailsModalProps> = ({ isOpen, onClose, loadId }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock load data - in real app, this would be fetched based on loadId
  const loadDetails: LoadDetails = {
    id: "LD-2024-001",
    status: "In Transit",
    pickup: {
      company: "Walmart Distribution Center",
      address: "1450 Lakeside Pkwy",
      city: "Dallas",
      state: "TX",
      zip: "75247",
      contact: "Mike Johnson",
      phone: "(214) 555-0123",
      scheduledTime: "2024-01-15 08:00",
      actualTime: "2024-01-15 08:15",
      appointmentNumber: "WM-001234"
    },
    delivery: {
      company: "Home Depot Distribution",
      address: "2455 Paces Ferry Rd",
      city: "Atlanta",
      state: "GA",
      zip: "30339",
      contact: "Sarah Williams",
      phone: "(404) 555-0156",
      scheduledTime: "2024-01-16 14:00",
      appointmentNumber: "HD-005678"
    },
    cargo: {
      description: "Home improvement supplies and tools",
      weight: "43,500 lbs",
      pieces: 24,
      dimensions: "48' x 8' x 9'",
      value: "$125,000",
      hazmat: false,
      temperature: "Ambient",
      specialInstructions: "Handle with care - fragile items mixed in"
    },
    financial: {
      rate: "$2,450.00",
      mileage: "925 miles",
      ratePerMile: "$2.65",
      fuelSurcharge: "$185.00",
      accessorials: "$75.00",
      totalPay: "$2,710.00"
    },
    route: {
      totalDistance: "925 miles",
      estimatedTime: "14h 30m",
      fuelStops: 2,
      tollCost: "$45.50"
    },
    documents: {
      bol: true,
      pod: false,
      invoice: true,
      rateConfirmation: true,
      manifest: true
    },
    tracking: {
      progress: 65,
      currentLocation: "Little Rock, AR",
      nextMilestone: "Memphis, TN",
      estimatedArrival: "Tomorrow 13:45",
      delays: [
        { type: "Traffic", description: "Construction delay on I-40", duration: "15 minutes" }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-ai-info text-white';
      case 'Delivered': return 'bg-ai-success text-white';
      case 'Delayed': return 'bg-ai-warning text-foreground';
      case 'Pending': return 'bg-ai-error text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'route', label: 'Route & Tracking', icon: Route },
    { id: 'cargo', label: 'Cargo Details', icon: Weight },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden glass-ultra">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-driver to-ai-primary bg-clip-text text-transparent">
                Load Details - {loadDetails.id}
              </DialogTitle>
              <DialogDescription className="text-lg">
                Complete shipment information and tracking
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(loadDetails.status)}>
              {loadDetails.status}
            </Badge>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-ai-primary text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto max-h-[60vh] space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pickup Information */}
              <Card className="glass border-border/50">
                <CardHeader className="bg-gradient-to-r from-ai-success/10 to-transparent">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-ai-success" />
                    <span>Pickup Location</span>
                    {loadDetails.pickup.actualTime && (
                      <Badge className="bg-ai-success text-white text-xs">COMPLETED</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{loadDetails.pickup.company}</h4>
                    <p className="text-muted-foreground">{loadDetails.pickup.address}</p>
                    <p className="text-muted-foreground">
                      {loadDetails.pickup.city}, {loadDetails.pickup.state} {loadDetails.pickup.zip}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{loadDetails.pickup.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{loadDetails.pickup.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Scheduled</p>
                      <p className="font-medium">{loadDetails.pickup.scheduledTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual</p>
                      <p className="font-medium text-ai-success">{loadDetails.pickup.actualTime || 'Pending'}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Pickup Location
                  </Button>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card className="glass border-border/50">
                <CardHeader className="bg-gradient-to-r from-ai-warning/10 to-transparent">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-ai-warning" />
                    <span>Delivery Location</span>
                    <Badge className="bg-ai-warning text-foreground text-xs">PENDING</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{loadDetails.delivery.company}</h4>
                    <p className="text-muted-foreground">{loadDetails.delivery.address}</p>
                    <p className="text-muted-foreground">
                      {loadDetails.delivery.city}, {loadDetails.delivery.state} {loadDetails.delivery.zip}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{loadDetails.delivery.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{loadDetails.delivery.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Scheduled</p>
                      <p className="font-medium">{loadDetails.delivery.scheduledTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ETA</p>
                      <p className="font-medium text-ai-warning">{loadDetails.tracking.estimatedArrival}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Delivery Location
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'route' && (
            <div className="space-y-6">
              {/* Progress Tracking */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-ai-primary" />
                    <span>Route Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{loadDetails.tracking.progress}%</span>
                    </div>
                    <Progress value={loadDetails.tracking.progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-semibold">{loadDetails.tracking.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Milestone</p>
                      <p className="font-semibold">{loadDetails.tracking.nextMilestone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Distance</p>
                      <p className="font-semibold">{loadDetails.route.totalDistance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                      <p className="font-semibold">{loadDetails.route.estimatedTime}</p>
                    </div>
                  </div>
                  
                  {loadDetails.tracking.delays.length > 0 && (
                    <div className="p-3 bg-ai-warning/10 border border-ai-warning/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-ai-warning" />
                        <span className="font-medium text-ai-warning">Active Delays</span>
                      </div>
                      {loadDetails.tracking.delays.map((delay, index) => (
                        <p key={index} className="text-sm">
                          {delay.type}: {delay.description} ({delay.duration})
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Route Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Route className="w-5 h-5 text-ai-info" />
                      <span>Route Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Stops</span>
                      <span className="font-medium">{loadDetails.route.fuelStops}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toll Cost</span>
                      <span className="font-medium">{loadDetails.route.tollCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ETA</span>
                      <span className="font-medium">{loadDetails.tracking.estimatedArrival}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-ai-primary to-ai-accent">
                      <Navigation className="w-4 h-4 mr-2" />
                      Start Navigation
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Fuel className="w-4 h-4 mr-2" />
                      Find Fuel Stops
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Dispatcher
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'cargo' && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-ai-accent" />
                  <span>Cargo Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="font-medium">{loadDetails.cargo.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="font-semibold text-lg">{loadDetails.cargo.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pieces</p>
                        <p className="font-semibold text-lg">{loadDetails.cargo.pieces}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dimensions</p>
                      <p className="font-medium">{loadDetails.cargo.dimensions}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="font-semibold text-lg text-ai-success">{loadDetails.cargo.value}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <p className="font-medium">{loadDetails.cargo.temperature}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Shield className={`w-5 h-5 ${loadDetails.cargo.hazmat ? 'text-ai-error' : 'text-ai-success'}`} />
                      <span className="font-medium">
                        {loadDetails.cargo.hazmat ? 'Hazmat Material' : 'Non-Hazmat'}
                      </span>
                    </div>
                    
                    {loadDetails.cargo.specialInstructions && (
                      <div className="p-3 bg-ai-warning/10 border border-ai-warning/20 rounded-lg">
                        <p className="text-sm font-medium text-ai-warning mb-1">Special Instructions:</p>
                        <p className="text-sm">{loadDetails.cargo.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'financial' && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-ai-success" />
                  <span>Financial Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-ai-success/10 rounded-lg">
                      <span className="font-medium">Base Rate</span>
                      <span className="font-bold text-lg">{loadDetails.financial.rate}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mileage</span>
                        <span className="font-medium">{loadDetails.financial.mileage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate per Mile</span>
                        <span className="font-medium">{loadDetails.financial.ratePerMile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Surcharge</span>
                        <span className="font-medium">{loadDetails.financial.fuelSurcharge}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accessorials</span>
                        <span className="font-medium">{loadDetails.financial.accessorials}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center p-6 bg-gradient-to-br from-ai-success/10 to-ai-primary/10 rounded-xl border border-ai-success/20">
                      <p className="text-sm text-muted-foreground mb-2">Total Pay</p>
                      <p className="text-4xl font-bold text-ai-success">{loadDetails.financial.totalPay}</p>
                      <p className="text-sm text-ai-success mt-2">Including all fees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'documents' && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-ai-info" />
                  <span>Documents & Paperwork</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {Object.entries(loadDetails.documents).map(([doc, status]) => (
                      <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium capitalize">{doc.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {status ? (
                            <CheckCircle className="w-4 h-4 text-ai-success" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-ai-warning" />
                          )}
                          <Badge className={status ? 'bg-ai-success text-white' : 'bg-ai-warning text-foreground'}>
                            {status ? 'Complete' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-ai-primary to-ai-accent">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload POD
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      View All Documents
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-border/50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-driver to-ai-primary">
            <Navigation className="w-4 h-4 mr-2" />
            Start Navigation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadDetailsModal;