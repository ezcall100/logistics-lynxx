import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Fuel, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Truck,
  Route,
  CheckCircle,
  AlertTriangle,
  Star,
  Timer,
  Gauge,
  Activity,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Target,
  Thermometer,
  Battery,
  Wifi,
  Signal,
  RefreshCw,
  Bell,
  Package,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const EnhancedDriverDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced driver data
  const driverData = {
    driver: {
      name: "Sarah Martinez",
      id: "DRV-2024",
      status: "In Transit",
      location: "I-95, Mile 147, Virginia",
      hoursRemaining: "7h 45m",
      nextBreak: "1h 45m",
      safetyScore: 98,
      todayEarnings: "$428.50",
      todayMiles: 387,
      fuelLevel: 82,
      efficiency: 94
    },
    currentLoad: {
      id: "LD-2024-1247",
      pickup: "Atlanta, GA",
      delivery: "Washington, DC",
      distance: "529 miles",
      progress: 73,
      eta: "14:30",
      status: "In Transit",
      priority: "High",
      weight: "32,000 lbs",
      commodity: "Electronics"
    },
    vehicle: {
      number: "TRK-1247",
      model: "Freightliner Cascadia",
      fuelLevel: 82,
      mpg: "7.8 MPG",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
      temperature: "68°F",
      engineStatus: "Normal",
      tiresPSI: "105 PSI",
      oilLevel: "Good"
    },
    metrics: {
      weeklyMiles: 2847,
      weeklyEarnings: "$2,156.50",
      avgDeliveryTime: "4.2 hrs",
      onTimeDeliveries: 47,
      totalDeliveries: 49,
      fuelEfficiency: 94
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full max-w-none space-y-6 animate-fade-in">
      {/* Header Section - Full Width */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Driver Dashboard
          </h1>
          <p className="text-muted-foreground">
            {formatDate(currentTime)} • {formatTime(currentTime)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            {driverData.driver.status}
          </Badge>
          <Button onClick={handleRefresh} disabled={refreshing} size="sm" variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Status Cards - Full Width Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600/80">Current Location</p>
                <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                  {driverData.driver.location}
                </p>
              </div>
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600/80">HOS Remaining</p>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  {driverData.driver.hoursRemaining}
                </p>
              </div>
              <Timer className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600/80">Today's Earnings</p>
                <p className="font-semibold text-orange-800 dark:text-orange-200">
                  {driverData.driver.todayEarnings}
                </p>
              </div>
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600/80">Safety Score</p>
                <p className="font-semibold text-purple-800 dark:text-purple-200">
                  {driverData.driver.safetyScore}%
                </p>
              </div>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Full Width */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Current Load Status - Takes 2 columns on xl screens */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Current Load Status
              <Badge className="bg-blue-100 text-blue-700 ml-auto">
                {driverData.currentLoad.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Load ID:</span>
                  <span className="font-medium">{driverData.currentLoad.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pickup:</span>
                  <span className="font-medium">{driverData.currentLoad.pickup}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Delivery:</span>
                  <span className="font-medium">{driverData.currentLoad.delivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Distance:</span>
                  <span className="font-medium">{driverData.currentLoad.distance}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ETA:</span>
                  <span className="font-medium text-green-600">{driverData.currentLoad.eta}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weight:</span>
                  <span className="font-medium">{driverData.currentLoad.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Commodity:</span>
                  <span className="font-medium">{driverData.currentLoad.commodity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Priority:</span>
                  <Badge className="bg-red-100 text-red-700">{driverData.currentLoad.priority}</Badge>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Route Progress</span>
                <span className="text-sm text-muted-foreground">{driverData.currentLoad.progress}%</span>
              </div>
              <Progress value={driverData.currentLoad.progress} className="h-3" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={() => navigate('/driver/routes/navigation')} className="flex-1 sm:flex-none">
                <Navigation className="w-4 h-4 mr-2" />
                Navigation
              </Button>
              <Button onClick={() => navigate('/driver/communication/dispatch')} variant="outline" className="flex-1 sm:flex-none">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Dispatch
              </Button>
              <Button onClick={() => navigate('/driver/documents/bol')} variant="outline" className="flex-1 sm:flex-none">
                <FileText className="w-4 h-4 mr-2" />
                BOL/POD
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-600" />
              Vehicle Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vehicle:</span>
                <span className="font-medium text-sm">{driverData.vehicle.number}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fuel Level</span>
                  <span className="text-sm font-medium">{driverData.vehicle.fuelLevel}%</span>
                </div>
                <Progress value={driverData.vehicle.fuelLevel} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Efficiency:</span>
                <span className="font-medium text-green-600">{driverData.vehicle.mpg}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-medium">{driverData.vehicle.temperature}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Engine:</span>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {driverData.vehicle.engineStatus}
                </Badge>
              </div>
            </div>

            <Button onClick={() => navigate('/driver/vehicle/status')} className="w-full" variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              Full Diagnostics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics - Full Width */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{driverData.metrics.weeklyMiles}</div>
              <div className="text-xs text-muted-foreground">Weekly Miles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{driverData.metrics.weeklyEarnings}</div>
              <div className="text-xs text-muted-foreground">Weekly Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{driverData.metrics.avgDeliveryTime}</div>
              <div className="text-xs text-muted-foreground">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{driverData.metrics.onTimeDeliveries}</div>
              <div className="text-xs text-muted-foreground">On-Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{driverData.metrics.totalDeliveries}</div>
              <div className="text-xs text-muted-foreground">Total Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{driverData.metrics.fuelEfficiency}%</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Quick Actions - Full Width */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
            <Button onClick={() => navigate('/driver/documents/hos')} variant="outline" className="h-16 flex-col">
              <Clock className="w-5 h-5 mb-1" />
              <span className="text-xs">HOS Logs</span>
            </Button>
            <Button onClick={() => navigate('/driver/routes/planner')} variant="outline" className="h-16 flex-col">
              <Route className="w-5 h-5 mb-1" />
              <span className="text-xs">Plan Route</span>
            </Button>
            <Button onClick={() => navigate('/driver/vehicle/inspections')} variant="outline" className="h-16 flex-col">
              <CheckCircle className="w-5 h-5 mb-1" />
              <span className="text-xs">Inspection</span>
            </Button>
            <Button onClick={() => navigate('/driver/communication/emergency')} variant="outline" className="h-16 flex-col">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-xs">Emergency</span>
            </Button>
            <Button onClick={() => navigate('/driver/documents/receipts')} variant="outline" className="h-16 flex-col">
              <FileText className="w-5 h-5 mb-1" />
              <span className="text-xs">Receipts</span>
            </Button>
            <Button onClick={() => navigate('/driver/performance/earnings')} variant="outline" className="h-16 flex-col">
              <DollarSign className="w-5 h-5 mb-1" />
              <span className="text-xs">Earnings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDriverDashboard;