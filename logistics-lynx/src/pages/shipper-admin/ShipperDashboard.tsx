
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Truck, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Globe,
  Shield,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Star,
  Phone,
  MessageSquare,
  Mail,
  FileText,
  Activity,
  TrendingDown,
  Zap,
  Building,
  Network,
  Route,
  Fuel,
  Gauge,
  AlertCircle,
  Info,
  ExternalLink,
  Calculator
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ShipperDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const navigate = useNavigate();

  // Enhanced metrics with real data
  const metrics = [
    {
      title: "Active Shipments",
      value: "156",
      change: "+12.3%",
      trend: "up",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Currently in transit",
      detail: "23 pending pickup, 89 in transit, 44 delivered"
    },
    {
      title: "Total Spend",
      value: "$847,230",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "This month",
      detail: "Avg. cost per mile: $2.34"
    },
    {
      title: "On-Time Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      description: "Last 30 days",
      detail: "147 on-time, 9 delayed"
    },
    {
      title: "Active Carriers",
      value: "89",
      change: "+5",
      trend: "up",
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "In network",
      detail: "Avg. rating: 4.7/5.0"
    }
  ];

  // Enhanced recent shipments with real data
  const recentShipments = [
    {
      id: "SH-2024-001",
      origin: "Dallas, TX",
      destination: "New York, NY",
      status: "In Transit",
      carrier: "ABC Logistics",
      eta: "2024-01-25 14:30",
      value: "$12,450",
      progress: 75,
      priority: "High",
      type: "Full Truckload",
      weight: "45,000 lbs",
      distance: "1,350 miles"
    },
    {
      id: "SH-2024-002",
      origin: "Los Angeles, CA",
      destination: "Chicago, IL",
      status: "Pending Pickup",
      carrier: "Swift Transport",
      eta: "2024-01-26 09:00",
      value: "$8,750",
      progress: 15,
      priority: "Medium",
      type: "LTL",
      weight: "12,500 lbs",
      distance: "2,100 miles"
    },
    {
      id: "SH-2024-003",
      origin: "Miami, FL",
      destination: "Seattle, WA",
      status: "Delivered",
      carrier: "Reliable Freight",
      eta: "2024-01-24 16:45",
      value: "$15,200",
      progress: 100,
      priority: "High",
      type: "Full Truckload",
      weight: "38,000 lbs",
      distance: "3,200 miles"
    },
    {
      id: "SH-2024-004",
      origin: "Phoenix, AZ",
      destination: "Denver, CO",
      status: "In Transit",
      carrier: "FastTrack Logistics",
      eta: "2024-01-25 11:30",
      value: "$6,800",
      progress: 60,
      priority: "Low",
      type: "LTL",
      weight: "8,200 lbs",
      distance: "850 miles"
    },
    {
      id: "SH-2024-005",
      origin: "Atlanta, GA",
      destination: "Boston, MA",
      status: "Delayed",
      carrier: "Express Cargo",
      eta: "2024-01-26 08:00",
      value: "$9,950",
      progress: 45,
      priority: "High",
      type: "Full Truckload",
      weight: "42,000 lbs",
      distance: "1,100 miles"
    }
  ];

  // Enhanced top carriers with real data
  const topCarriers = [
    {
      name: "ABC Logistics",
      shipments: 45,
      onTime: 96.4,
      rating: 4.8,
      spend: "$145,230",
      status: "Active",
      contact: "+1 (555) 123-4567",
      email: "dispatch@abclogistics.com"
    },
    {
      name: "FastTrack Logistics",
      shipments: 38,
      onTime: 94.2,
      rating: 4.6,
      spend: "$98,750",
      status: "Active",
      contact: "+1 (555) 234-5678",
      email: "operations@fasttrack.com"
    },
    {
      name: "Reliable Freight",
      shipments: 32,
      onTime: 97.1,
      rating: 4.9,
      spend: "$87,420",
      status: "Active",
      contact: "+1 (555) 345-6789",
      email: "dispatch@reliablefreight.com"
    },
    {
      name: "Swift Delivery",
      shipments: 28,
      onTime: 93.8,
      rating: 4.5,
      spend: "$76,890",
      status: "Active",
      contact: "+1 (555) 456-7890",
      email: "operations@swiftdelivery.com"
    }
  ];

  // Performance data
  const performanceData = {
    costEfficiency: 75,
    serviceQuality: 88,
    networkGrowth: 92,
    onTimeDeliveries: 94.2,
    avgRating: 4.8,
    costPerMile: 3.42,
    activeLoads: 156
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "In Transit": { variant: "default" as const, className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
      "Delivered": { variant: "secondary" as const, className: "bg-green-100 text-green-800 hover:bg-green-200" },
      "Pending Pickup": { variant: "outline" as const, className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
      "Delayed": { variant: "destructive" as const, className: "bg-red-100 text-red-800 hover:bg-red-200" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig["Pending Pickup"];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      "High": { variant: "destructive" as const, className: "bg-red-100 text-red-800" },
      "Medium": { variant: "default" as const, className: "bg-yellow-100 text-yellow-800" },
      "Low": { variant: "secondary" as const, className: "bg-green-100 text-green-800" }
    };
    
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig["Medium"];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Shipper Dashboard
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Monitor your logistics operations and track shipments in real-time
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="7d" className="text-xs">7D</TabsTrigger>
              <TabsTrigger value="30d" className="text-xs">30D</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs">90D</TabsTrigger>
              <TabsTrigger value="1y" className="text-xs">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => navigate('/shipper-admin/shipments/new')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <div className={cn("absolute top-0 left-0 w-1 h-full", metric.bgColor)} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                <metric.icon className={cn("h-5 w-5", metric.color)} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Shipments */}
        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Recent Shipments</CardTitle>
              <CardDescription>
                Track your latest shipment activities and status updates
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/shipper-admin/shipments/all')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentShipments.map((shipment) => {
                    const statusBadge = getStatusBadge(shipment.status);
                    const priorityBadge = getPriorityBadge(shipment.priority);
                    
                    return (
                      <TableRow key={shipment.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{shipment.id}</div>
                            <div className="flex gap-1">
                              <Badge variant={priorityBadge.variant} className={priorityBadge.className}>
                                {shipment.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {shipment.type}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{shipment.origin}</div>
                            <div className="text-xs text-muted-foreground">{shipment.destination}</div>
                            <div className="text-xs text-muted-foreground">{shipment.distance}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadge.variant} className={statusBadge.className}>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{shipment.carrier}</div>
                            <div className="text-xs text-muted-foreground">ETA: {shipment.eta}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{shipment.value}</div>
                          <div className="text-xs text-muted-foreground">{shipment.weight}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={shipment.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground">{shipment.progress}%</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/shipper-admin/shipments/${shipment.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/shipper-admin/shipments/${shipment.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Carrier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="mr-2 h-4 w-4" />
                                Track Location
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Performing Carriers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Top Performing Carriers</CardTitle>
              <CardDescription>
                Your best carrier partners based on performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCarriers.map((carrier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {carrier.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold">{carrier.name}</p>
                          <p className="text-sm text-muted-foreground">{carrier.shipments} shipments</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{carrier.onTime}%</span>
                          <span className="text-muted-foreground">on-time</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">{carrier.rating}</span>
                          <span className="text-muted-foreground">rating</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{carrier.spend}</div>
                      <div className="text-sm text-muted-foreground">total spend</div>
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Performance Summary</CardTitle>
              <CardDescription>
                Key performance indicators for this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{performanceData.onTimeDeliveries}%</div>
                    <div className="text-sm text-muted-foreground">On-Time Deliveries</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{performanceData.avgRating}/5.0</div>
                    <div className="text-sm text-muted-foreground">Avg. Rating</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">${performanceData.costPerMile}</div>
                    <div className="text-sm text-muted-foreground">Cost per Mile</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{performanceData.activeLoads}</div>
                    <div className="text-sm text-muted-foreground">Active Loads</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Cost Efficiency</span>
                      <span className="text-sm text-green-600 font-medium">+12.5%</span>
                    </div>
                    <Progress value={performanceData.costEfficiency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Service Quality</span>
                      <span className="text-sm text-green-600 font-medium">+8.3%</span>
                    </div>
                    <Progress value={performanceData.serviceQuality} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Network Growth</span>
                      <span className="text-sm text-blue-600 font-medium">+15.2%</span>
                    </div>
                    <Progress value={performanceData.networkGrowth} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
              <CardDescription>
                Frequently used features for faster operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => navigate('/shipper-admin/shipments/new')}
              >
                <Package className="mr-3 h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Create New Shipment</div>
                  <div className="text-xs text-muted-foreground">Book a new load</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => navigate('/shipper-admin/networks/carriers')}
              >
                <Users className="mr-3 h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Find Carriers</div>
                  <div className="text-xs text-muted-foreground">Search carrier network</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={() => navigate('/shipper-admin/reports/financial')}
              >
                <BarChart3 className="mr-3 h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-xs text-muted-foreground">Performance insights</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                onClick={() => navigate('/shipper-admin/quotes/new')}
              >
                <Calculator className="mr-3 h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-medium">Get Quick Quote</div>
                  <div className="text-xs text-muted-foreground">Compare rates</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
