import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, Clock, Truck, Navigation, Phone, MessageCircle, AlertTriangle, CheckCircle2, 
  Circle, Timer, Fuel, Package, Upload, DollarSign, Camera, FileText, PenTool, Plus, 
  Pin, Navigation2, Thermometer, Zap, MapIcon, Apple, Car, Edit3, Save, X, Signature, 
  Mail, Calculator, Receipt, CreditCard, Bot, Mic, MicOff, Volume2, Wifi, WifiOff, 
  Satellite, Shield, Activity, Search, Filter, Calendar, TrendingUp, Star, Eye,
  Pause, Play, Route, Hash, Weight, Package2, ArrowRight, MoreHorizontal, Bell,
  Compass, Gauge, BatteryCharging, Signal, CloudRain, Sun, Snowflake, Wind,
  Users, FileSignature, Clipboard, AlertCircle, CheckCircle, ExternalLink,
  RefreshCw, ChevronDown, ChevronUp, Maximize2, Minimize2, BarChart3,
  Target, Award, TrendingDown, Wallet, Wrench, Globe, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Enhanced Types with Real-World Data Structure
interface WeatherData {
  location: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'stormy';
  temperature: number;
  windSpeed: number;
  visibility: number;
  humidity: number;
  icon: string;
  alerts?: string[];
}

interface TrafficData {
  severity: 'light' | 'moderate' | 'heavy' | 'severe';
  delay: number;
  description: string;
  alternateRoute?: boolean;
  eta_impact: number;
}

interface VehicleDiagnostics {
  engineHealth: number;
  brakeHealth: number;
  tireHealth: number;
  fuelEfficiency: number;
  engineTemp: number;
  oilPressure: number;
  batteryVoltage: number;
  lastService: string;
  nextServiceDue: number;
  alerts: string[];
}

interface HosStatus {
  driveTime: number;
  onDutyTime: number;
  sleepTime: number;
  offDutyTime: number;
  maxDriveTime: number;
  maxOnDutyTime: number;
  requiredBreakIn: number;
  violationRisk: 'none' | 'low' | 'medium' | 'high';
  nextBreakRequired: string;
}

interface ActiveLoad {
  id: string;
  loadNumber: string;
  customerName: string;
  pickupLocation: {
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
    contactName: string;
    contactPhone: string;
    scheduledTime: string;
    window: string;
  };
  deliveryLocation: {
    company: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
    contactName: string;
    contactPhone: string;
    scheduledTime: string;
    window: string;
  };
  cargo: {
    type: string;
    weight: number;
    pallets: number;
    pieces: number;
    value: number;
    hazmat: boolean;
    temperature?: number;
    specialInstructions: string[];
  };
  documentation: {
    bol: { status: 'pending' | 'uploaded' | 'signed'; url?: string };
    pod: { status: 'pending' | 'uploaded' | 'signed'; url?: string };
    weighTickets: { status: 'pending' | 'uploaded'; urls: string[] };
    photos: { type: string; url: string; timestamp: string }[];
  };
  status: 'assigned' | 'en_route_pickup' | 'at_pickup' | 'loaded' | 'en_route_delivery' | 'at_delivery' | 'delivered';
  earnings: {
    baseRate: number;
    mileageRate: number;
    stops: number;
    accessories: { type: string; amount: number }[];
    fuelSurcharge: number;
    total: number;
  };
}

interface RouteIntelligence {
  currentMile: number;
  totalMiles: number;
  completionPercentage: number;
  estimatedTimeRemaining: number;
  fuelStopsRecommended: number;
  nextFuelStop: {
    name: string;
    distance: number;
    fuelPrice: number;
    amenities: string[];
  };
  alternateRoutes: {
    primary: { miles: number; time: number; tolls: number };
    scenic: { miles: number; time: number; tolls: number };
    truck_optimized: { miles: number; time: number; tolls: number };
  };
  roadConditions: {
    construction: boolean;
    accidents: boolean;
    weather_advisory: boolean;
    truck_restrictions: boolean;
  };
}

const ActiveRoutePage: React.FC = () => {
  // State Management
  const [activeLoad, setActiveLoad] = useState<ActiveLoad | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [traffic, setTraffic] = useState<TrafficData | null>(null);
  const [vehicle, setVehicle] = useState<VehicleDiagnostics | null>(null);
  const [hosStatus, setHosStatus] = useState<HosStatus | null>(null);
  const [routeIntel, setRouteIntel] = useState<RouteIntelligence | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'navigation' | 'logs' | 'documentation'>('dashboard');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['route', 'vehicle']);

  // Initialize with realistic data
  useEffect(() => {
    initializeRouteData();
    const interval = setInterval(updateLiveData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [initializeRouteData, updateLiveData]);

  const initializeRouteData = async () => {
    try {
      // Simulate API calls with realistic data
      await Promise.all([
        loadActiveRoute(),
        loadWeatherData(),
        loadTrafficData(),
        loadVehicleDiagnostics(),
        loadHosStatus(),
        loadRouteIntelligence()
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadActiveRoute = async () => {
    // Realistic active load data
    const mockLoad: ActiveLoad = {
      id: "LD-2025-001247",
      loadNumber: "ABC-789456",
      customerName: "Walmart Distribution",
      pickupLocation: {
        company: "Procter & Gamble Manufacturing",
        address: "4250 E 5th Ave",
        city: "Cincinnati",
        state: "OH",
        zipCode: "45202",
        coordinates: { lat: 39.1031, lng: -84.5120 },
        contactName: "Mike Henderson",
        contactPhone: "(513) 555-0192",
        scheduledTime: "2025-01-25T08:00:00Z",
        window: "08:00 - 10:00"
      },
      deliveryLocation: {
        company: "Walmart Distribution Center #6094",
        address: "7991 Enterprise Dr",
        city: "Newark",
        state: "OH",
        zipCode: "43055",
        coordinates: { lat: 40.0581, lng: -82.4013 },
        contactName: "Sarah Martinez",
        contactPhone: "(740) 555-0234",
        scheduledTime: "2025-01-25T14:30:00Z",
        window: "14:00 - 16:00"
      },
      cargo: {
        type: "Consumer Goods - Non-Hazmat",
        weight: 44500,
        pallets: 26,
        pieces: 1247,
        value: 187500,
        hazmat: false,
        specialInstructions: [
          "Dock door #12 - appointment required",
          "Load must remain upright",
          "Temperature sensitive - keep dry",
          "Count verification required"
        ]
      },
      documentation: {
        bol: { status: 'signed', url: '/docs/bol_789456.pdf' },
        pod: { status: 'pending' },
        weighTickets: { status: 'uploaded', urls: ['/docs/weight_in.pdf'] },
        photos: [
          { type: 'load_secured', url: '/photos/load1.jpg', timestamp: '2025-01-25T08:45:00Z' },
          { type: 'seal_intact', url: '/photos/seal1.jpg', timestamp: '2025-01-25T08:47:00Z' }
        ]
      },
      status: 'en_route_delivery',
      earnings: {
        baseRate: 1850.00,
        mileageRate: 0.68,
        stops: 1,
        accessories: [
          { type: 'Fuel surcharge', amount: 127.50 },
          { type: 'Layover pay', amount: 100.00 }
        ],
        fuelSurcharge: 89.25,
        total: 2166.75
      }
    };
    setActiveLoad(mockLoad);
  };

  const loadWeatherData = async () => {
    const mockWeather: WeatherData = {
      location: "Newark, OH",
      condition: 'cloudy',
      temperature: 34,
      windSpeed: 12,
      visibility: 8.5,
      humidity: 78,
      icon: '⛅',
      alerts: ['Winter Weather Advisory until 6 PM']
    };
    setWeather(mockWeather);
  };

  const loadTrafficData = async () => {
    const mockTraffic: TrafficData = {
      severity: 'moderate',
      delay: 15,
      description: 'Construction on I-70 E, lane closure',
      alternateRoute: true,
      eta_impact: 12
    };
    setTraffic(mockTraffic);
  };

  const loadVehicleDiagnostics = async () => {
    const mockVehicle: VehicleDiagnostics = {
      engineHealth: 94,
      brakeHealth: 87,
      tireHealth: 91,
      fuelEfficiency: 6.8,
      engineTemp: 195,
      oilPressure: 45,
      batteryVoltage: 12.6,
      lastService: "2025-01-15",
      nextServiceDue: 2500,
      alerts: []
    };
    setVehicle(mockVehicle);
  };

  const loadHosStatus = async () => {
    const mockHos: HosStatus = {
      driveTime: 6.5,
      onDutyTime: 8.25,
      sleepTime: 10.0,
      offDutyTime: 0.75,
      maxDriveTime: 11.0,
      maxOnDutyTime: 14.0,
      requiredBreakIn: 1.5,
      violationRisk: 'low',
      nextBreakRequired: "15:30"
    };
    setHosStatus(mockHos);
  };

  const loadRouteIntelligence = async () => {
    const mockRoute: RouteIntelligence = {
      currentMile: 89,
      totalMiles: 247,
      completionPercentage: 36,
      estimatedTimeRemaining: 185,
      fuelStopsRecommended: 1,
      nextFuelStop: {
        name: "TA Travel Center - I-70 Exit 142",
        distance: 67,
        fuelPrice: 3.89,
        amenities: ['Showers', 'Restaurant', 'Laundry', 'WiFi']
      },
      alternateRoutes: {
        primary: { miles: 247, time: 285, tolls: 12.50 },
        scenic: { miles: 271, time: 315, tolls: 8.75 },
        truck_optimized: { miles: 251, time: 295, tolls: 15.25 }
      },
      roadConditions: {
        construction: true,
        accidents: false,
        weather_advisory: true,
        truck_restrictions: false
      }
    };
    setRouteIntel(mockRoute);
  };

  const updateLiveData = useCallback(() => {
    if (!autoRefresh) return;
    
    // Simulate live updates
    setRouteIntel(prev => prev ? {
      ...prev,
      currentMile: prev.currentMile + (Math.random() * 2),
      completionPercentage: Math.min(prev.completionPercentage + 0.1, 100),
      estimatedTimeRemaining: Math.max(prev.estimatedTimeRemaining - 1, 0)
    } : null);

    setVehicle(prev => prev ? {
      ...prev,
      engineTemp: 195 + (Math.random() * 10 - 5),
      fuelEfficiency: prev.fuelEfficiency + (Math.random() * 0.2 - 0.1)
    } : null);
  }, [autoRefresh]);

  const handleStatusUpdate = (newStatus: ActiveLoad['status']) => {
    if (!activeLoad) return;
    
    setActiveLoad(prev => prev ? { ...prev, status: newStatus } : null);
    toast.success(`Status updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const handleDocumentUpload = (type: string) => {
    toast.success(`${type} uploaded successfully`);
  };

  const handleEmergencyContact = () => {
    window.open('tel:+18005551234');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getStatusColor = (status: ActiveLoad['status']) => {
    const colors = {
      'assigned': 'bg-blue-100 text-blue-700 border-blue-200',
      'en_route_pickup': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'at_pickup': 'bg-orange-100 text-orange-700 border-orange-200',
      'loaded': 'bg-purple-100 text-purple-700 border-purple-200',
      'en_route_delivery': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'at_delivery': 'bg-green-100 text-green-700 border-green-200',
      'delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getWeatherIcon = (condition: string) => {
    const icons = {
      sunny: <Sun className="w-5 h-5 text-yellow-500" />,
      cloudy: <CloudRain className="w-5 h-5 text-gray-500" />,
      rainy: <CloudRain className="w-5 h-5 text-blue-500" />,
      snowy: <Snowflake className="w-5 h-5 text-blue-300" />,
      foggy: <Eye className="w-5 h-5 text-gray-400" />,
      stormy: <Zap className="w-5 h-5 text-purple-500" />
    };
    return icons[condition as keyof typeof icons] || icons.cloudy;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-slate-600">Loading route intelligence...</p>
        </div>
      </div>
    );
  }

  if (!activeLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">No Active Route</h3>
            <p className="text-muted-foreground">Contact dispatch for route assignment</p>
            <Button onClick={handleEmergencyContact} className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Contact Dispatch
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Revolutionary Command Center Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-lg">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Route className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Active Route Control
                </h1>
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <span className="font-medium">{activeLoad.loadNumber}</span>
                  <Badge className={getStatusColor(activeLoad.status)}>
                    {activeLoad.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm">
                <Switch 
                  checked={voiceEnabled} 
                  onCheckedChange={setVoiceEnabled}
                  className="data-[state=checked]:bg-blue-600"
                />
                <span className="text-slate-600">Voice Commands</span>
                {voiceEnabled ? <Mic className="w-4 h-4 text-blue-600" /> : <MicOff className="w-4 h-4 text-slate-400" />}
              </div>
              
              <Button variant="outline" size="sm" onClick={handleEmergencyContact}>
                <Phone className="w-4 h-4 mr-2" />
                Emergency
              </Button>
              
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Intelligent Command Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Route Intelligence Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Route Progress */}
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Route Intelligence</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {routeIntel?.completionPercentage}% Complete
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Progress Visualization */}
                  <div className="relative">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span>Cincinnati, OH</span>
                      <span className="text-blue-600">{routeIntel?.currentMile} of {routeIntel?.totalMiles} miles</span>
                      <span>Newark, OH</span>
                    </div>
                    <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${routeIntel?.completionPercentage}%` }}
                      />
                      <div 
                        className="absolute top-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2"
                        style={{ left: `${routeIntel?.completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Pickup Complete</span>
                      <span>ETA: 2:30 PM</span>
                      <span>Delivery</span>
                    </div>
                  </div>

                  {/* Live Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">ETA</span>
                      </div>
                      <p className="text-xl font-bold text-green-800">3h 5m</p>
                      <p className="text-xs text-green-600">On time</p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Fuel className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">Fuel</span>
                      </div>
                      <p className="text-xl font-bold text-blue-800">67%</p>
                      <p className="text-xs text-blue-600">Next: 67 mi</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Timer className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">HOS</span>
                      </div>
                      <p className="text-xl font-bold text-orange-800">4.5h</p>
                      <p className="text-xs text-orange-600">Remaining</p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Earnings</span>
                      </div>
                      <p className="text-xl font-bold text-purple-800">${activeLoad.earnings.total.toLocaleString()}</p>
                      <p className="text-xs text-purple-600">This load</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Alerts & Conditions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Live Conditions & Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Weather */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getWeatherIcon(weather?.condition || 'cloudy')}
                        <span className="font-medium">Weather</span>
                      </div>
                      <span className="text-2xl font-bold">{weather?.temperature}°F</span>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Visibility:</span>
                        <span>{weather?.visibility} mi</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind:</span>
                        <span>{weather?.windSpeed} mph</span>
                      </div>
                    </div>
                    {weather?.alerts && weather.alerts.length > 0 && (
                      <div className="mt-2 p-2 bg-orange-100 rounded-lg">
                        <p className="text-xs text-orange-700 font-medium">{weather.alerts[0]}</p>
                      </div>
                    )}
                  </div>

                  {/* Traffic */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Traffic</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">
                        {traffic?.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>{traffic?.description}</p>
                      <div className="flex justify-between">
                        <span>Delay:</span>
                        <span className="font-medium text-orange-600">+{traffic?.delay} min</span>
                      </div>
                    </div>
                    {traffic?.alternateRoute && (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Route className="w-4 h-4 mr-2" />
                        View Alternate
                      </Button>
                    )}
                  </div>

                  {/* Vehicle Health */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Vehicle</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{vehicle?.engineHealth}%</span>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Engine Temp:</span>
                        <span>{vehicle?.engineTemp}°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oil Pressure:</span>
                        <span>{vehicle?.oilPressure} PSI</span>
                      </div>
                    </div>
                    <Progress value={vehicle?.engineHealth} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Load Documentation Hub */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span>Load Documentation</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Quick Capture
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <Badge className="bg-green-100 text-green-700">Complete</Badge>
                    </div>
                    <h4 className="font-medium">Bill of Lading</h4>
                    <p className="text-sm text-slate-600 mb-3">Signed & uploaded</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Document
                    </Button>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center justify-between mb-2">
                      <Circle className="w-6 h-6 text-orange-600" />
                      <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                    </div>
                    <h4 className="font-medium">Proof of Delivery</h4>
                    <p className="text-sm text-slate-600 mb-3">Ready for delivery</p>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                      <Signature className="w-4 h-4 mr-2" />
                      Get Signature
                    </Button>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-700">Complete</Badge>
                    </div>
                    <h4 className="font-medium">Weight Tickets</h4>
                    <p className="text-sm text-slate-600 mb-3">1 document uploaded</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Add More
                    </Button>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                      <Badge className="bg-purple-100 text-purple-700">2 Photos</Badge>
                    </div>
                    <h4 className="font-medium">Load Photos</h4>
                    <p className="text-sm text-slate-600 mb-3">Secured & sealed</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Smart Sidebar - Mission Control */}
          <div className="lg:col-span-4 space-y-6">
            {/* HOS Compliance Monitor */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>HOS Compliance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Drive Time</span>
                    <span className="font-bold">{hosStatus?.driveTime}h / {hosStatus?.maxDriveTime}h</span>
                  </div>
                  <Progress value={(hosStatus?.driveTime || 0) / (hosStatus?.maxDriveTime || 11) * 100} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">On Duty</span>
                    <span className="font-bold">{hosStatus?.onDutyTime}h / {hosStatus?.maxOnDutyTime}h</span>
                  </div>
                  <Progress value={(hosStatus?.onDutyTime || 0) / (hosStatus?.maxOnDutyTime || 14) * 100} className="h-2" />
                </div>

                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">Break Required</span>
                  </div>
                  <p className="text-sm text-yellow-600">Next break in {hosStatus?.requiredBreakIn}h at {hosStatus?.nextBreakRequired}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-700">Sleep Time</p>
                    <p className="text-green-600">{hosStatus?.sleepTime}h</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-medium text-blue-700">Off Duty</p>
                    <p className="text-blue-600">{hosStatus?.offDutyTime}h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Load Details Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span>Load Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Customer:</span>
                    <span className="font-medium">{activeLoad.customerName}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-700">✅ Pickup Complete</h4>
                    <p className="text-sm text-slate-600">{activeLoad.pickupLocation.company}</p>
                    <p className="text-xs text-slate-500">{activeLoad.pickupLocation.city}, {activeLoad.pickupLocation.state}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-700">🎯 Delivery Destination</h4>
                    <p className="text-sm text-slate-600">{activeLoad.deliveryLocation.company}</p>
                    <p className="text-xs text-slate-500">{activeLoad.deliveryLocation.city}, {activeLoad.deliveryLocation.state}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Window: {activeLoad.deliveryLocation.window}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Weight:</p>
                      <p className="font-medium">{activeLoad.cargo.weight.toLocaleString()} lbs</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Pallets:</p>
                      <p className="font-medium">{activeLoad.cargo.pallets}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Pieces:</p>
                      <p className="font-medium">{activeLoad.cargo.pieces.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Value:</p>
                      <p className="font-medium">${activeLoad.cargo.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Command Center */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Navigation
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Dispatch
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Fuel className="w-4 h-4 mr-2" />
                  Find Fuel Stops
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Wrench className="w-4 h-4 mr-2" />
                  Vehicle Inspection
                </Button>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                    onClick={() => handleStatusUpdate('at_delivery')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Arrived at Delivery
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => handleStatusUpdate('delivered')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Delivered
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Tracker */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Earnings Tracker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-700">${activeLoad.earnings.total.toLocaleString()}</p>
                  <p className="text-sm text-green-600">This Load Total</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Rate:</span>
                    <span className="font-medium">${activeLoad.earnings.baseRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Surcharge:</span>
                    <span className="font-medium">${activeLoad.earnings.fuelSurcharge}</span>
                  </div>
                  {activeLoad.earnings.accessories.map((acc, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{acc.type}:</span>
                      <span className="font-medium">${acc.amount}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-green-200">
                  <div className="flex justify-between text-sm">
                    <span>Per Mile Rate:</span>
                    <span className="font-medium">${activeLoad.earnings.mileageRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Est. Miles:</span>
                    <span className="font-medium">{routeIntel?.totalMiles}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Emergency Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg"
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 shadow-2xl"
          onClick={handleEmergencyContact}
        >
          <Phone className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ActiveRoutePage;