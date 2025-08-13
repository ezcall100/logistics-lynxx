import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  DollarSign, 
  Clock, 
  Star,
  MapPin,
  Package,
  Users,
  Target,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  CheckCircle,
  AlertTriangle,
  Eye
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const MarketplaceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedMode, setSelectedMode] = useState('all');

  // Sample data for the dashboard
  const stats = [
    {
      title: 'Active Loads',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Rate/Mile',
      value: '$2.84',
      change: '+$0.15',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Market Capacity',
      value: '78%',
      change: '-5.2%',
      trend: 'down',
      icon: Truck,
      color: 'text-orange-600'
    },
    {
      title: 'Your Bids Won',
      value: '156',
      change: '+23',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const marketTrends = [
    { mode: 'Truckload', demand: 85, capacity: 72, rate: '$2.95', change: '+8.5%' },
    { mode: 'LTL', demand: 92, capacity: 88, rate: '$4.25', change: '+12.3%' },
    { mode: 'Intermodal', demand: 76, capacity: 65, rate: '$1.85', change: '+5.7%' },
    { mode: 'Refrigerated', demand: 89, capacity: 71, rate: '$3.45', change: '+15.2%' },
    { mode: 'Flatbed', demand: 82, capacity: 74, rate: '$3.15', change: '+6.8%' },
    { mode: 'Auto Transport', demand: 77, capacity: 69, rate: '$2.65', change: '+4.2%' }
  ];

  const hotLanes = [
    {
      origin: 'Los Angeles, CA',
      destination: 'Dallas, TX',
      distance: '1,435 mi',
      loads: 234,
      avgRate: '$3,850',
      equipment: 'Van',
      priority: 'high'
    },
    {
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      distance: '715 mi',
      loads: 189,
      avgRate: '$2,150',
      equipment: 'Flatbed',
      priority: 'high'
    },
    {
      origin: 'Miami, FL',
      destination: 'New York, NY',
      distance: '1,280 mi',
      loads: 156,
      avgRate: '$3,200',
      equipment: 'Reefer',
      priority: 'medium'
    },
    {
      origin: 'Seattle, WA',
      destination: 'Phoenix, AZ',
      distance: '1,420 mi',
      loads: 98,
      avgRate: '$3,450',
      equipment: 'Van',
      priority: 'medium'
    },
    {
      origin: 'Houston, TX',
      destination: 'Denver, CO',
      distance: '1,020 mi',
      loads: 87,
      avgRate: '$2,750',
      equipment: 'Flatbed',
      priority: 'low'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'bid_won',
      message: 'Won bid for load LA → NYC',
      amount: '$4,250',
      time: '5 min ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'rate_alert',
      message: 'Rate increase on Chicago → Atlanta lane',
      amount: '+$150/mi',
      time: '12 min ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'new_opportunity',
      message: 'High-paying refrigerated load available',
      amount: '$5,800',
      time: '18 min ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'carrier_match',
      message: 'New carrier partner request',
      amount: '',
      time: '25 min ago',
      status: 'info'
    }
  ];

  const handleRefreshData = () => {
    toast.success('Market data refreshed successfully');
  };

  const handleQuickBid = (lane: unknown) => {
    toast.success(`Quick bid submitted for ${lane.origin} → ${lane.destination}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bid_won': return CheckCircle;
      case 'rate_alert': return TrendingUp;
      case 'new_opportunity': return Zap;
      case 'carrier_match': return Users;
      default: return AlertTriangle;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Market Place Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time freight market insights and opportunities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRefreshData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Market Trends */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Market Trends by Mode</CardTitle>
                  <CardDescription>
                    Current demand, capacity, and rate trends across transportation modes
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/carrier-admin/marketplace/rate-analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketTrends.map((trend) => (
                    <div key={trend.mode} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{trend.mode}</h4>
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold">{trend.rate}</span>
                            <Badge variant="secondary" className="text-green-600">
                              {trend.change}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Demand</span>
                              <span>{trend.demand}%</span>
                            </div>
                            <Progress value={trend.demand} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Capacity</span>
                              <span>{trend.capacity}%</span>
                            </div>
                            <Progress value={trend.capacity} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest market updates and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 rounded-full bg-blue-50">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        {activity.amount && (
                          <p className="text-sm text-green-600 font-semibold">{activity.amount}</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hot Lanes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Hot Lanes</CardTitle>
              <CardDescription>
                High-volume freight lanes with competitive rates
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search lanes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/carrier-admin/marketplace/load-board">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lane</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Active Loads</TableHead>
                  <TableHead>Avg Rate</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotLanes.map((lane, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{lane.origin}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          {lane.destination}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{lane.distance}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lane.loads} loads</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">{lane.avgRate}</TableCell>
                    <TableCell>{lane.equipment}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(lane.priority)}>
                        {lane.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleQuickBid(lane)}
                        className="mr-2"
                      >
                        Quick Bid
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Load Board</h3>
              <p className="text-sm text-muted-foreground mb-4">Browse available loads</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/marketplace/load-board">Browse Loads</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Freight Matching</h3>
              <p className="text-sm text-muted-foreground mb-4">AI-powered load matching</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/marketplace/freight-matching">Find Matches</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Rate Analytics</h3>
              <p className="text-sm text-muted-foreground mb-4">Market rate insights</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/marketplace/rate-analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Carrier Network</h3>
              <p className="text-sm text-muted-foreground mb-4">Partner with carriers</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/marketplace/carrier-network">View Network</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MarketplaceDashboard;