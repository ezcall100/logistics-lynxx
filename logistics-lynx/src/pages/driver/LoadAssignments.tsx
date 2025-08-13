import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  MapPin,
  Clock,
  DollarSign,
  Navigation,
  Phone,
  FileText,
  Search,
  Filter,
  Truck,
  Route,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  Star,
  TrendingUp,
  Eye,
  MoreVertical,
  Navigation2,
  MessageSquare,
  Timer,
  Package,
  Fuel,
  Shield
} from 'lucide-react';

const LoadAssignments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const loads = {
    assigned: [
      {
        id: 'LD-2024-001',
        pickup: { location: 'Dallas, TX', date: 'Today 08:00', company: 'Walmart DC' },
        delivery: { location: 'Atlanta, GA', date: 'Tomorrow 14:00', company: 'Home Depot' },
        distance: '925 miles',
        rate: '$2,450',
        commodity: 'Electronics',
        weight: '42,000 lbs',
        status: 'In Progress',
        priority: 'Normal',
        instructions: 'Temperature controlled load. Keep between 65-75°F.',
        progress: 65
      },
      {
        id: 'LD-2024-002',
        pickup: { location: 'Houston, TX', date: 'Jan 18 06:00', company: 'Port of Houston' },
        delivery: { location: 'Phoenix, AZ', date: 'Jan 19 18:00', company: 'Target DC' },
        distance: '1,187 miles',
        rate: '$3,200',
        commodity: 'Consumer Goods',
        weight: '45,500 lbs',
        status: 'Assigned',
        priority: 'High',
        instructions: 'Expedited delivery. No delays permitted.',
        progress: 0
      }
    ],
    available: [
      {
        id: 'LD-2024-003',
        pickup: { location: 'San Antonio, TX', date: 'Jan 20 10:00', company: 'Distribution Center' },
        delivery: { location: 'Denver, CO', date: 'Jan 22 15:00', company: 'Costco' },
        distance: '847 miles',
        rate: '$2,890',
        commodity: 'Food Products',
        weight: '38,750 lbs',
        status: 'Available',
        priority: 'Normal',
        instructions: 'Standard dry van load. No special requirements.',
        progress: 0
      },
      {
        id: 'LD-2024-004',
        pickup: { location: 'Fort Worth, TX', date: 'Jan 21 14:00', company: 'Manufacturing Plant' },
        delivery: { location: 'Las Vegas, NV', date: 'Jan 23 10:00', company: 'Walmart' },
        distance: '1,024 miles',
        rate: '$3,450',
        commodity: 'Machinery Parts',
        weight: '47,800 lbs',
        status: 'Available',
        priority: 'High',
        instructions: 'Heavy haul - special permits required.',
        progress: 0
      }
    ],
    completed: [
      {
        id: 'LD-2024-000',
        pickup: { location: 'Austin, TX', date: 'Jan 12 09:00', company: 'Dell Technologies' },
        delivery: { location: 'Memphis, TN', date: 'Jan 14 16:00', company: 'FedEx Hub' },
        distance: '785 miles',
        rate: '$2,100',
        commodity: 'Computer Equipment',
        weight: '35,200 lbs',
        status: 'Delivered',
        priority: 'Normal',
        instructions: 'Fragile items - handle with care.',
        progress: 100,
        completedDate: 'Jan 14, 2024'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const LoadCard = ({ load, showActions = true }: { load: unknown, showActions?: boolean }) => (
    <Card className="group mb-6 relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-100/40 dark:from-slate-950/50 dark:via-gray-950/30 dark:to-slate-900/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-purple-400/5 group-hover:from-blue-400/10 group-hover:via-indigo-400/10 group-hover:to-purple-400/10 transition-all duration-300" />
      <CardHeader className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-foreground">{load.id}</CardTitle>
                <CardDescription className="text-base font-medium">{load.commodity} • {load.weight}</CardDescription>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={cn(
              "px-3 py-1.5 font-semibold shadow-sm transition-all duration-200",
              getPriorityColor(load.priority)
            )}>
              {load.priority === 'High' && <Star className="w-3 h-3 mr-1" />}
              {load.priority}
            </Badge>
            <Badge className={cn(
              "px-3 py-1.5 font-semibold shadow-sm transition-all duration-200",
              getStatusColor(load.status)
            )}>
              {load.status === 'In Progress' && <Timer className="w-3 h-3 mr-1" />}
              {load.status === 'Assigned' && <CheckCircle className="w-3 h-3 mr-1" />}
              {load.status === 'Available' && <Target className="w-3 h-3 mr-1" />}
              {load.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium">Pickup</p>
                <p className="text-sm text-muted-foreground">{load.pickup.company}</p>
                <p className="text-sm">{load.pickup.location}</p>
                <p className="text-sm text-muted-foreground">{load.pickup.date}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">{load.delivery.company}</p>
                <p className="text-sm">{load.delivery.location}</p>
                <p className="text-sm text-muted-foreground">{load.delivery.date}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3 border-t border-b">
          <div>
            <p className="text-sm text-muted-foreground">Distance</p>
            <p className="font-semibold">{load.distance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rate</p>
            <p className="font-semibold text-green-600">{load.rate}</p>
          </div>
          {load.completedDate && (
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-semibold">{load.completedDate}</p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium">Special Instructions:</p>
          <p className="text-sm text-muted-foreground">{load.instructions}</p>
        </div>

        {load.status === 'In Progress' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{load.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${load.progress}%` }}
              />
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex flex-wrap gap-3 pt-4">
            {load.status === 'Available' && (
              <>
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Load
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </>
            )}
            {load.status === 'In Progress' && (
              <>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </>
            )}
            {load.status === 'Assigned' && (
              <>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg">
                  <Timer className="h-4 w-4 mr-2" />
                  Start Trip
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Navigation2 className="h-4 w-4 mr-2" />
                  Route Plan
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container-responsive space-y-8 animate-fade-in">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-900/10 backdrop-blur-sm p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/5 to-purple-400/10" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  Load Assignments
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Manage your assigned loads and discover available opportunities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">Real-time load tracking active</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-background/60 backdrop-blur-sm border-border/50">
                <SelectValue placeholder="Filter loads" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loads</SelectItem>
                <SelectItem value="high-priority">High Priority</SelectItem>
                <SelectItem value="local">Local Area</SelectItem>
                <SelectItem value="long-haul">Long Haul</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Search with AI Features */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="🔍 Search loads by ID, location, commodity, or ask AI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-20 bg-background/60 backdrop-blur-sm border-border/50 focus:bg-background/80 transition-colors h-12 text-base"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            AI
          </Badge>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">⌘K</Badge>
        </div>
      </div>

      {/* Enhanced Quick Stats with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-100/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-blue-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/5 group-hover:from-blue-400/20 group-hover:to-indigo-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Active Loads</p>
                <p className="text-3xl font-black text-blue-900 dark:text-blue-100">{loads.assigned.length}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Currently assigned</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-emerald-100/40 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-emerald-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/5 group-hover:from-emerald-400/20 group-hover:to-green-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Available</p>
                <p className="text-3xl font-black text-emerald-900 dark:text-emerald-100">{loads.available.length}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Ready to accept</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-50/80 via-violet-50/60 to-purple-100/40 dark:from-purple-950/30 dark:via-violet-950/20 dark:to-purple-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-400/5 group-hover:from-purple-400/20 group-hover:to-violet-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">This Week</p>
                <p className="text-3xl font-black text-purple-900 dark:text-purple-100">7</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Completed loads</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-orange-100/40 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-orange-900/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/5 group-hover:from-orange-400/20 group-hover:to-amber-400/10 transition-all duration-300" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wide">Total Miles</p>
                <p className="text-3xl font-black text-orange-900 dark:text-orange-100">2.8K</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">This week</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Route className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Load Tabs */}
      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assigned">Assigned ({loads.assigned.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({loads.available.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({loads.completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Assigned Loads</CardTitle>
              <CardDescription>Loads currently assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              {loads.assigned.map((load) => (
                <LoadCard key={load.id} load={load} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Loads</CardTitle>
              <CardDescription>Loads available for assignment in your area</CardDescription>
            </CardHeader>
            <CardContent>
              {loads.available.map((load) => (
                <LoadCard key={load.id} load={load} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Loads</CardTitle>
              <CardDescription>Your delivery history and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {loads.completed.map((load) => (
                <LoadCard key={load.id} load={load} showActions={false} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoadAssignments;