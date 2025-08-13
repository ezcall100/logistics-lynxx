import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation,
  Truck,
  CheckCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Upload,
  PlayCircle,
  Package,
  Route,
  Timer,
  Anchor,
  ChevronRight,
  MapPinOff,
  Fuel,
  MoreHorizontal,
  User,
  Settings,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { TransportInfoForm } from '@/components/driver/TransportInfoForm';
import { DocumentUploader } from '@/components/driver/DocumentUploader';

interface RouteLeg {
  id: string;
  type: 'hook' | 'pickup' | 'drop' | 'delivery' | 'empty_return';
  sequence: number;
  title: string;
  location: string;
  address: string;
  scheduledTime: string;
  estimatedDuration: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  contact?: {
    name: string;
    phone: string;
    email?: string;
  };
  requirements: string[];
  documents: string[];
  specialInstructions?: string;
  loadDetails?: {
    loadNumber: string;
    weight: number;
    pieces: number;
    value: number;
  };
  weather?: {
    condition: string;
    temp: number;
    icon: string;
  };
  estimatedFuelCost?: number;
  transportInfo?: {
    trailerNumber?: string;
    chassisNumber?: string;
    poNumber?: string;
    refNumber?: string;
    containerNumber?: string;
    sealNumber?: string;
    equipmentType?: string;
    hazmatClass?: string;
  };
  uploadedDocuments?: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
  }[];
}

interface RouteProgress {
  currentLegIndex: number;
  totalLegs: number;
  completedLegs: number;
  totalMiles: number;
  completedMiles: number;
  estimatedEarnings: number;
  actualTime: number;
  estimatedTime: number;
  fuelEfficiency: number;
  totalFuelCost: number;
}

interface AssignedRoute {
  id: string;
  routeId: string;
  customerName: string;
  dispatcherName: string;
  dispatcherPhone: string;
  startTime: string;
  expectedEndTime: string;
  legs: RouteLeg[];
  progress: RouteProgress;
  driverRating: number;
  routePriority: 'high' | 'medium' | 'low';
}

export const RoutePlannerPage: React.FC = () => {
  const [assignedRoute, setAssignedRoute] = useState<AssignedRoute | null>(null);
  const [currentLegIndex, setCurrentLegIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedLeg, setExpandedLeg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('timeline');
  const [showTransportForm, setShowTransportForm] = useState<string | null>(null);
  const [showDocUploader, setShowDocUploader] = useState<string | null>(null);

  useEffect(() => {
    fetchAssignedRoute();
  }, []);

  const fetchAssignedRoute = async () => {
    try {
      const mockRoute: AssignedRoute = {
        id: 'route-001',
        routeId: 'RT-2025-001',
        customerName: 'ABC Manufacturing',
        dispatcherName: 'Mike Rodriguez',
        dispatcherPhone: '+1-555-0199',
        startTime: '2025-01-25T06:00:00Z',
        expectedEndTime: '2025-01-26T18:00:00Z',
        driverRating: 4.8,
        routePriority: 'high',
        progress: {
          currentLegIndex: 0,
          totalLegs: 6,
          completedLegs: 0,
          totalMiles: 1247,
          completedMiles: 0,
          estimatedEarnings: 2850.00,
          actualTime: 0,
          estimatedTime: 2160,
          fuelEfficiency: 6.2,
          totalFuelCost: 578.50
        },
        legs: [
          {
            id: 'leg-1',
            type: 'hook',
            sequence: 1,
            title: 'Hook Empty Trailer',
            location: 'Fleet Yard Terminal',
            address: '500 Fleet Dr, Dallas, TX 75201',
            scheduledTime: '2025-01-25T06:00:00Z',
            estimatedDuration: 30,
            status: 'pending',
            contact: { name: 'Yard Manager', phone: '+1-555-0100' },
            requirements: ['Pre-trip inspection', 'Trailer hookup', 'Equipment check'],
            documents: ['Trailer inspection form', 'Equipment checklist'],
            specialInstructions: 'Use dock 5. Check trailer brakes and lights.',
            weather: { condition: 'Clear', temp: 45, icon: '☀️' },
            estimatedFuelCost: 25.00,
            loadDetails: { loadNumber: 'EMPTY', weight: 0, pieces: 0, value: 0 }
          },
          {
            id: 'leg-2',
            type: 'pickup',
            sequence: 2,
            title: 'Load Pickup',
            location: 'ABC Manufacturing',
            address: '123 Industrial Blvd, Dallas, TX 75201',
            scheduledTime: '2025-01-25T08:00:00Z',
            estimatedDuration: 90,
            status: 'pending',
            contact: { name: 'Sarah Johnson', phone: '+1-555-0123', email: 'sarah.j@abcmfg.com' },
            requirements: ['BOL signature', 'Load securement', 'Weight verification'],
            documents: ['Bill of Lading', 'Weight tickets', 'Load photos'],
            specialInstructions: 'Heavy machinery parts. Use dock #3. Crane assistance available.',
            weather: { condition: 'Partly Cloudy', temp: 52, icon: '⛅' },
            estimatedFuelCost: 45.00,
            loadDetails: { loadNumber: 'LD-789456', weight: 45000, pieces: 12, value: 125000 }
          },
          {
            id: 'leg-3',
            type: 'delivery',
            sequence: 3,
            title: 'First Delivery',
            location: 'Construction Solutions',
            address: '2850 Commerce Dr, Oklahoma City, OK 73108',
            scheduledTime: '2025-01-25T14:30:00Z',
            estimatedDuration: 60,
            status: 'pending',
            contact: { name: 'David Wilson', phone: '+1-555-0234' },
            requirements: ['POD signature', 'Unload assistance', 'Damage inspection'],
            documents: ['Proof of Delivery', 'Damage report (if unknown)'],
            specialInstructions: 'Use crane for unloading. Site foreman contact required.',
            weather: { condition: 'Light Rain', temp: 48, icon: '🌧️' },
            estimatedFuelCost: 125.00,
            loadDetails: { loadNumber: 'LD-789456', weight: 25000, pieces: 6, value: 75000 }
          },
          {
            id: 'leg-4',
            type: 'pickup',
            sequence: 4,
            title: 'Second Load Pickup',
            location: 'Food Processing Inc',
            address: '890 Warehouse Rd, San Antonio, TX 78201',
            scheduledTime: '2025-01-26T07:00:00Z',
            estimatedDuration: 60,
            status: 'pending',
            contact: { name: 'Maria Garcia', phone: '+1-555-0345' },
            requirements: ['Temperature check', 'Reefer setup', 'BOL verification'],
            documents: ['Reefer BOL', 'Temperature logs'],
            specialInstructions: 'Reefer load. Maintain -10°F. Time-sensitive delivery.',
            weather: { condition: 'Sunny', temp: 68, icon: '☀️' },
            estimatedFuelCost: 185.00,
            loadDetails: { loadNumber: 'LD-456123', weight: 38000, pieces: 850, value: 45000 }
          },
          {
            id: 'leg-5',
            type: 'delivery',
            sequence: 5,
            title: 'Final Delivery',
            location: 'Restaurant Supply Co',
            address: '1650 Distribution Way, Phoenix, AZ 85034',
            scheduledTime: '2025-01-26T16:00:00Z',
            estimatedDuration: 45,
            status: 'pending',
            contact: { name: 'James Martinez', phone: '+1-555-0456' },
            requirements: ['Temperature verification', 'POD signature', 'Product count'],
            documents: ['Delivery receipt', 'Temperature log'],
            specialInstructions: 'Temperature check required upon arrival. Dock 12.',
            weather: { condition: 'Hot', temp: 85, icon: '🌡️' },
            estimatedFuelCost: 165.00,
            loadDetails: { loadNumber: 'LD-456123', weight: 38000, pieces: 850, value: 45000 }
          },
          {
            id: 'leg-6',
            type: 'drop',
            sequence: 6,
            title: 'Drop Empty Trailer',
            location: 'Phoenix Drop Yard',
            address: '2100 Freight Blvd, Phoenix, AZ 85009',
            scheduledTime: '2025-01-26T18:00:00Z',
            estimatedDuration: 20,
            status: 'pending',
            contact: { name: 'Yard Supervisor', phone: '+1-555-0567' },
            requirements: ['Trailer inspection', 'Drop documentation'],
            documents: ['Drop receipt', 'Final inspection'],
            specialInstructions: 'Clean trailer before drop. Check for damage.',
            weather: { condition: 'Clear', temp: 78, icon: '☀️' },
            estimatedFuelCost: 33.50,
            loadDetails: { loadNumber: 'EMPTY', weight: 0, pieces: 0, value: 0 }
          }
        ]
      };
      
      setAssignedRoute(mockRoute);
      setCurrentLegIndex(mockRoute.progress.currentLegIndex);
    } catch (error) {
      console.error('Error fetching route:', error);
      toast({
        title: "Error",
        description: "Failed to load assigned route",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLegStatusUpdate = (legId: string, newStatus: RouteLeg['status']) => {
    if (!assignedRoute) return;

    setAssignedRoute(prev => {
      if (!prev) return null;
      
      const updatedLegs = prev.legs.map(leg => 
        leg.id === legId ? { ...leg, status: newStatus } : leg
      );

      const completedLegs = updatedLegs.filter(leg => leg.status === 'completed').length;
      const completedMiles = Math.round((completedLegs / prev.legs.length) * prev.progress.totalMiles);
      
      return {
        ...prev,
        legs: updatedLegs,
        progress: {
          ...prev.progress,
          completedLegs,
          completedMiles,
          currentLegIndex: newStatus === 'completed' && legId === prev.legs[currentLegIndex]?.id 
            ? Math.min(currentLegIndex + 1, prev.legs.length - 1)
            : prev.progress.currentLegIndex
        }
      };
    });

    toast({
      title: "Status Updated",
      description: `Leg status updated to ${newStatus}`,
    });

    if (newStatus === 'completed') {
      const currentLeg = assignedRoute.legs[currentLegIndex];
      if (legId === currentLeg?.id && currentLegIndex < assignedRoute.legs.length - 1) {
        setCurrentLegIndex(prev => prev + 1);
      }
    }
  };

  const handleStartNavigation = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleContactPerson = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleTransportInfoSave = (legId: string, transportInfo: unknown) => {
    if (!assignedRoute) return;

    setAssignedRoute(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        legs: prev.legs.map(leg => 
          leg.id === legId ? { ...leg, transportInfo } : leg
        )
      };
    });

    setShowTransportForm(null);
  };

  const handleDocumentUpload = (legId: string, document: unknown) => {
    if (!assignedRoute) return;

    setAssignedRoute(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        legs: prev.legs.map(leg => 
          leg.id === legId ? { 
            ...leg, 
            uploadedDocuments: [...(leg.uploadedDocuments || []), document]
          } : leg
        )
      };
    });
  };

  const handleDocumentDelete = (legId: string, documentId: string) => {
    if (!assignedRoute) return;

    setAssignedRoute(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        legs: prev.legs.map(leg => 
          leg.id === legId ? { 
            ...leg, 
            uploadedDocuments: (leg.uploadedDocuments || []).filter(doc => doc.id !== documentId)
          } : leg
        )
      };
    });
  };

  const getStatusColor = (status: RouteLeg['status']) => {
    switch (status) {
      case 'completed': return 'bg-ai-success/10 text-ai-success border-ai-success/20';
      case 'in_progress': return 'bg-ai-info/10 text-ai-info border-ai-info/20';
      case 'delayed': return 'bg-ai-error/10 text-ai-error border-ai-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getLegTypeConfig = (type: RouteLeg['type']) => {
    switch (type) {
      case 'hook': return { 
        color: 'bg-ai-accent/10 text-ai-accent border-ai-accent/20', 
        icon: Anchor, 
        gradient: 'from-ai-accent to-purple-600',
        emoji: '🔗'
      };
      case 'pickup': return { 
        color: 'bg-ai-info/10 text-ai-info border-ai-info/20', 
        icon: Package, 
        gradient: 'from-ai-info to-ai-primary',
        emoji: '📦'
      };
      case 'delivery': return { 
        color: 'bg-ai-success/10 text-ai-success border-ai-success/20', 
        icon: CheckCircle, 
        gradient: 'from-ai-success to-emerald-600',
        emoji: '✅'
      };
      case 'drop': return { 
        color: 'bg-driver/10 text-driver border-driver/20', 
        icon: MapPinOff, 
        gradient: 'from-driver to-ai-error',
        emoji: '📍'
      };
      default: return { 
        color: 'bg-muted/10 text-muted-foreground border-muted/20', 
        icon: Truck, 
        gradient: 'from-muted to-border',
        emoji: '🚛'
      };
    }
  };

  const calculateProgress = () => {
    if (!assignedRoute) return 0;
    return (assignedRoute.progress.completedLegs / assignedRoute.progress.totalLegs) * 100;
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">{/* Loading state without layout wrapper */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gradient-to-r from-ai-primary to-driver rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gradient-to-r from-muted to-border rounded animate-pulse" />
              <div className="h-4 w-48 bg-gradient-to-r from-muted to-border rounded animate-pulse" />
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gradient-to-r from-muted/50 to-background rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!assignedRoute) {
    return (
      <div className="space-y-6">{/* No route state without layout wrapper */}
        <div className="space-y-6">
          <Card className="glass border-border/50">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-ai-primary to-driver rounded-full flex items-center justify-center">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-ai-primary to-driver bg-clip-text text-transparent">
                  No Active Route
                </h3>
                <p className="text-muted-foreground">No route assignment found. Please contact dispatch.</p>
                <Button className="bg-gradient-to-r from-ai-primary to-driver">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Dispatch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentLeg = assignedRoute.legs[currentLegIndex];

  return (
    <div className="w-full max-w-none p-6 space-y-8 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* AI-Enhanced Hero Header */}
      <div className="glass-ultra rounded-3xl p-8 border border-border/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Route Planner
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    {assignedRoute.customerName} • Route {assignedRoute.routeId}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 text-sm font-medium">
                  {assignedRoute.routePriority.toUpperCase()} PRIORITY
                </Badge>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-yellow-600">{assignedRoute.driverRating} Driver Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">AI-Optimized Route</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  ETA: {new Date(assignedRoute.expectedEndTime).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="btn-premium hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 mr-2" />
                Contact Dispatch
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 btn-premium">
                <Navigation className="w-4 h-4 mr-2" />
                Start Route
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-ai-primary/10 to-ai-info/10 border border-ai-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Route className="w-4 h-4 text-ai-primary" />
                <span className="text-sm font-medium text-ai-primary">Progress</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{assignedRoute.progress.completedLegs} of {assignedRoute.progress.totalLegs} legs</span>
                  <span>{calculateProgress().toFixed(0)}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-ai-success/10 to-emerald-100 border border-ai-success/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-ai-success" />
                <span className="text-sm font-medium text-ai-success">Earnings</span>
              </div>
              <p className="text-2xl font-bold text-ai-success">
                ${assignedRoute.progress.estimatedEarnings.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-ai-warning/10 to-yellow-100 border border-ai-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-ai-warning" />
                <span className="text-sm font-medium text-ai-warning">Fuel Cost</span>
              </div>
              <p className="text-2xl font-bold text-ai-warning">
                ${assignedRoute.progress.totalFuelCost.toFixed(2)}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-ai-info/10 to-blue-100 border border-ai-info/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-ai-info" />
                <span className="text-sm font-medium text-ai-info">Total Miles</span>
              </div>
              <p className="text-2xl font-bold text-ai-info">
                {assignedRoute.progress.totalMiles}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Route Legs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="current">Current Leg</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-ai-primary" />
                  Route Timeline
                </CardTitle>
                <CardDescription>
                  Complete route with all legs and their current status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedRoute.legs.map((leg, legIndex) => {
                  const isActive = legIndex === currentLegIndex;
                  const isCompleted = leg.status === 'completed';
                  const isExpanded = expandedLeg === leg.id;
                  const legConfig = getLegTypeConfig(leg.type);
                  const LegIcon = legConfig.icon;

                  return (
                    <div key={leg.id} className="relative group">
                      {/* Connection Line */}
                      {legIndex < assignedRoute.legs.length - 1 && (
                        <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-ai-primary/60 to-muted/30 z-0" />
                      )}

                      <Card className={`glass transition-all duration-500 group-hover:scale-[1.01] ${
                        isActive ? 'ring-2 ring-ai-primary bg-gradient-to-br from-ai-primary/5 to-driver/5 shadow-2xl' :
                        isCompleted ? 'ring-2 ring-ai-success bg-gradient-to-br from-ai-success/5 to-emerald-50 shadow-xl' :
                        'hover:ring-1 hover:ring-border hover:shadow-lg border-border/50'
                      }`}>
                        
                        {/* Status Indicator Strip */}
                        <div className={`h-1 w-full rounded-t-lg ${
                          isCompleted ? 'bg-gradient-to-r from-ai-success to-emerald-500' :
                          isActive ? 'bg-gradient-to-r from-ai-primary to-ai-accent animate-pulse' :
                          leg.status === 'delayed' ? 'bg-gradient-to-r from-ai-error to-red-500' :
                          'bg-gradient-to-r from-muted to-border'
                        }`} />

                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Enhanced Icon with Status */}
                            <div className="relative">
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                isCompleted ? `bg-gradient-to-br ${legConfig.gradient} shadow-lg` :
                                isActive ? `bg-gradient-to-br ${legConfig.gradient} shadow-lg animate-pulse-soft` :
                                'bg-gradient-to-br from-muted to-background border border-border'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-7 w-7 text-white" />
                                ) : (
                                  <LegIcon className={`h-7 w-7 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                                )}
                              </div>
                              
                              {/* Sequence Number */}
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-ai-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {leg.sequence}
                              </div>
                              
                              {/* Status Pulse */}
                              {isActive && (
                                <div className="absolute inset-0 rounded-2xl ring-4 ring-ai-primary/30 animate-ping" />
                              )}
                            </div>
                            
                            {/* Leg Information */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-foreground">{leg.title}</h3>
                                    <Badge className={`${legConfig.color} text-xs font-medium`}>
                                      {leg.type.toUpperCase()}
                                    </Badge>
                                    <Badge className={`${getStatusColor(leg.status)} text-xs font-medium`}>
                                      {leg.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-lg font-semibold text-ai-primary">{leg.location}</p>
                                  <p className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {leg.address}
                                  </p>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpandedLeg(isExpanded ? null : leg.id)}
                                    className="hover:bg-ai-primary/10"
                                  >
                                    <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                  </Button>
                                </div>
                              </div>

                              {/* Enhanced Quick Stats Grid */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-ai-info/10 to-ai-primary/10 border border-ai-info/20">
                                  <Clock className="h-4 w-4 text-ai-info" />
                                  <div>
                                    <p className="text-xs font-medium text-ai-info">Scheduled</p>
                                    <p className="text-sm font-bold">{new Date(leg.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-ai-accent/10 to-purple-100 border border-ai-accent/20">
                                  <Timer className="h-4 w-4 text-ai-accent" />
                                  <div>
                                    <p className="text-xs font-medium text-ai-accent">Duration</p>
                                    <p className="text-sm font-bold">{leg.estimatedDuration}m</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-ai-warning/10 to-yellow-100 border border-ai-warning/20">
                                  <span className="text-lg">{leg.weather?.icon}</span>
                                  <div>
                                    <p className="text-xs font-medium text-ai-warning">Weather</p>
                                    <p className="text-sm font-bold">{leg.weather?.temp}°F</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-ai-success/10 to-green-100 border border-ai-success/20">
                                  <DollarSign className="h-4 w-4 text-ai-success" />
                                  <div>
                                    <p className="text-xs font-medium text-ai-success">Fuel Cost</p>
                                    <p className="text-sm font-bold">${leg.estimatedFuelCost?.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Load Information Panel */}
                              {leg.loadDetails && leg.loadDetails.loadNumber !== 'EMPTY' && (
                                <div className="p-4 rounded-xl bg-gradient-to-r from-driver/10 to-ai-primary/10 border border-driver/20">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Package className="h-4 w-4 text-driver" />
                                    <span className="font-semibold text-driver">Load Information</span>
                                    <Badge className="bg-driver text-white text-xs">
                                      {leg.loadDetails.loadNumber}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="text-center p-2 bg-white/50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Weight</p>
                                      <p className="font-bold text-driver">{leg.loadDetails.weight.toLocaleString()}</p>
                                      <p className="text-xs text-muted-foreground">lbs</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Pieces</p>
                                      <p className="font-bold text-driver">{leg.loadDetails.pieces}</p>
                                      <p className="text-xs text-muted-foreground">units</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Value</p>
                                      <p className="font-bold text-ai-success">${leg.loadDetails.value.toLocaleString()}</p>
                                      <p className="text-xs text-muted-foreground">USD</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/50 rounded-lg">
                                      <p className="text-xs text-muted-foreground">Type</p>
                                      <p className="font-bold text-driver">{leg.type.toUpperCase()}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Quick Action Buttons */}
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-ai-primary to-ai-accent hover:from-ai-primary/90 hover:to-ai-accent/90"
                                  onClick={() => handleStartNavigation(leg.address)}
                                >
                                  <Navigation className="h-3 w-3 mr-1" />
                                  Navigate
                                </Button>
                                
                                {leg.contact && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleContactPerson(leg.contact!.phone)}
                                    className="hover:bg-ai-info/10 hover:border-ai-info/30"
                                  >
                                    <Phone className="h-3 w-3 mr-1" />
                                    Call
                                  </Button>
                                )}
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setShowTransportForm(leg.id)}
                                  className="hover:bg-ai-accent/10 hover:border-ai-accent/30"
                                >
                                  <Settings className="h-3 w-3 mr-1" />
                                  Transport Info
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setShowDocUploader(leg.id)}
                                  className="hover:bg-ai-warning/10 hover:border-ai-warning/30"
                                >
                                  <Upload className="h-3 w-3 mr-1" />
                                  Documents
                                </Button>

                                {/* Status Update Buttons */}
                                {!isCompleted && (
                                  <div className="flex gap-1 ml-auto">
                                    {leg.status === 'pending' && (
                                      <Button 
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleLegStatusUpdate(leg.id, 'in_progress')}
                                        className="bg-ai-primary text-white hover:bg-ai-primary/90"
                                      >
                                        <PlayCircle className="h-3 w-3 mr-1" />
                                        Start
                                      </Button>
                                    )}
                                    
                                    {leg.status === 'in_progress' && (
                                      <>
                                        <Button 
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleLegStatusUpdate(leg.id, 'completed')}
                                          className="bg-ai-success text-white hover:bg-ai-success/90"
                                        >
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Complete
                                        </Button>
                                        <Button 
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleLegStatusUpdate(leg.id, 'delayed')}
                                          className="bg-ai-error text-white hover:bg-ai-error/90"
                                        >
                                          <AlertTriangle className="h-3 w-3 mr-1" />
                                          Delay
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Expanded Details Section */}
                          {isExpanded && (
                            <div className="mt-6 pt-6 space-y-4 animate-fade-in border-t border-border/30">
                              {/* Contact Information */}
                              {leg.contact && (
                                <Card className="bg-gradient-to-r from-ai-info/5 to-ai-primary/5 border-ai-info/20">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <User className="h-4 w-4 text-ai-info" />
                                      <span className="font-semibold text-ai-info">Contact Information</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground">Name</p>
                                        <p className="font-semibold">{leg.contact.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="font-semibold">{leg.contact.phone}</p>
                                      </div>
                                      {leg.contact.email && (
                                        <div>
                                          <p className="text-xs text-muted-foreground">Email</p>
                                          <p className="font-semibold">{leg.contact.email}</p>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              {/* Requirements & Documents */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Card className="bg-gradient-to-r from-ai-warning/5 to-yellow-50 border-ai-warning/20">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FileText className="h-4 w-4 text-ai-warning" />
                                      <span className="font-semibold text-ai-warning">Requirements</span>
                                    </div>
                                    <div className="space-y-2">
                                      {leg.requirements.map((req, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full bg-ai-warning" />
                                          <span className="text-sm">{req}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-r from-ai-accent/5 to-purple-50 border-ai-accent/20">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FileText className="h-4 w-4 text-ai-accent" />
                                      <span className="font-semibold text-ai-accent">Documents</span>
                                    </div>
                                    <div className="space-y-2">
                                      {leg.documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-2 h-2 rounded-full bg-ai-accent" />
                                          <span className="text-sm">{doc}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Special Instructions */}
                              {leg.specialInstructions && (
                                <Card className="bg-gradient-to-r from-ai-error/5 to-red-50 border-ai-error/20">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <AlertTriangle className="h-4 w-4 text-ai-error" />
                                      <span className="font-semibold text-ai-error">Special Instructions</span>
                                    </div>
                                    <p className="text-sm bg-white/50 p-3 rounded-lg border border-ai-error/10">
                                      {leg.specialInstructions}
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Transport Info Form */}
                      {showTransportForm === leg.id && (
                        <div className="mt-4 animate-fade-in">
                          <TransportInfoForm
                            legType={leg.type}
                            transportInfo={leg.transportInfo}
                            onSave={(info) => handleTransportInfoSave(leg.id, info)}
                          />
                        </div>
                      )}

                      {/* Document Uploader */}
                      {showDocUploader === leg.id && (
                        <div className="mt-4 animate-fade-in">
                          <DocumentUploader
                            legId={leg.id}
                            legType={leg.type}
                            uploadedDocuments={leg.uploadedDocuments}
                            onDocumentUpload={handleDocumentUpload}
                            onDocumentDelete={handleDocumentDelete}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            {currentLeg && (
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getLegTypeConfig(currentLeg.type).gradient} flex items-center justify-center text-white`}>
                      {getLegTypeConfig(currentLeg.type).emoji}
                    </div>
                    <span>{currentLeg.title}</span>
                    <Badge className={getStatusColor(currentLeg.status)}>
                      {currentLeg.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{currentLeg.location} • {currentLeg.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current leg detailed view content can be added here */}
                  <p className="text-muted-foreground">Focus on your current active leg with detailed information and controls.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Route Overview</CardTitle>
                <CardDescription>Complete route summary and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Route analytics and summary information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoutePlannerPage;