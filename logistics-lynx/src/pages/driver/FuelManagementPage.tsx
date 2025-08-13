import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Fuel, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Upload,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

const FuelManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample fuel data
  const fuelData = {
    currentLevel: 78,
    efficiency: 7.8,
    weeklySpend: 892.50,
    monthlyBudget: 3500,
    averagePrice: 3.45,
    totalGallons: 258.6,
    lastFillUp: '2 hours ago'
  };

  const fuelTransactions = [
    {
      id: 'FT-2024-001',
      date: '2024-01-24',
      time: '14:30',
      location: 'Pilot Travel Center - Atlanta, GA',
      gallons: 125.5,
      pricePerGallon: 3.45,
      total: 432.98,
      odometer: 187542,
      fuelType: 'Diesel',
      status: 'completed',
      receipt: 'available'
    },
    {
      id: 'FT-2024-002',
      date: '2024-01-23',
      time: '08:15',
      location: 'TA Travel Center - Birmingham, AL',
      gallons: 133.1,
      pricePerGallon: 3.42,
      total: 455.20,
      odometer: 187012,
      fuelType: 'Diesel',
      status: 'completed',
      receipt: 'available'
    },
    {
      id: 'FT-2024-003',
      date: '2024-01-22',
      time: '16:45',
      location: 'Love\'s Travel Stop - Jackson, MS',
      gallons: 115.8,
      pricePerGallon: 3.48,
      total: 403.00,
      odometer: 186498,
      fuelType: 'Diesel',
      status: 'pending',
      receipt: 'missing'
    }
  ];

  const fuelStops = [
    {
      name: 'Pilot Flying J',
      location: 'Next Exit - 2.3 miles',
      price: 3.42,
      amenities: ['Showers', 'Restaurant', 'ATM'],
      rating: 4.5
    },
    {
      name: 'TA Travel Center', 
      location: 'Exit 127 - 8.1 miles',
      price: 3.45,
      amenities: ['Showers', 'Laundry', 'Restaurant'],
      rating: 4.2
    },
    {
      name: 'Love\'s Travel Stop',
      location: 'Exit 135 - 12.7 miles', 
      price: 3.47,
      amenities: ['Showers', 'Food Court'],
      rating: 4.0
    }
  ];

  const handleAddFuelEntry = () => {
    setShowAddForm(true);
    toast.success('Opening fuel entry form...');
  };

  const handleExportData = () => {
    toast.success('Exporting fuel data...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Fuel Management
          </h1>
          <p className="text-muted-foreground">
            Track fuel consumption, expenses, and optimize efficiency
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={handleExportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleAddFuelEntry} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Fuel Entry
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600/80">Current Level</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {fuelData.currentLevel}%
                </p>
                <p className="text-xs text-blue-600/70">Last updated: {fuelData.lastFillUp}</p>
              </div>
              <Fuel className="w-8 h-8 text-blue-600" />
            </div>
            <Progress value={fuelData.currentLevel} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600/80">Efficiency</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {fuelData.efficiency} MPG
                </p>
                <p className="text-xs text-green-600/70">Above industry avg.</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600/80">Weekly Spend</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                  ${fuelData.weeklySpend}
                </p>
                <p className="text-xs text-orange-600/70">{fuelData.totalGallons} gallons</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600/80">Avg. Price</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  ${fuelData.averagePrice}
                </p>
                <p className="text-xs text-purple-600/70">Per gallon this week</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fuel Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recent Fuel Transactions
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-48"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fuelTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{transaction.id}</h4>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          {transaction.receipt === 'missing' && (
                            <Badge className="bg-red-100 text-red-700 border-red-200">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Receipt Missing
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {transaction.location}
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p className="font-medium">{transaction.date}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Gallons:</span>
                            <p className="font-medium">{transaction.gallons}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Price/Gal:</span>
                            <p className="font-medium">${transaction.pricePerGallon}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>
                            <p className="font-bold text-green-600">${transaction.total}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {transaction.receipt === 'available' && (
                          <Button variant="outline" size="sm">
                            <CreditCard className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nearby Fuel Stops */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Nearby Fuel Stops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fuelStops.map((stop, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">{stop.name}</h4>
                        <p className="text-xs text-muted-foreground">{stop.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${stop.price}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-xs">{stop.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {stop.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-3" size="sm" variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Budget Overview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Monthly Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Spent this month</span>
                  <span className="font-bold">${fuelData.weeklySpend * 3.2}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Budget utilization</span>
                    <span>{Math.round((fuelData.weeklySpend * 3.2 / fuelData.monthlyBudget) * 100)}%</span>
                  </div>
                  <Progress value={(fuelData.weeklySpend * 3.2 / fuelData.monthlyBudget) * 100} className="h-2" />
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Remaining budget</span>
                    <span className="font-bold text-green-600">
                      ${fuelData.monthlyBudget - (fuelData.weeklySpend * 3.2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={handleAddFuelEntry} variant="outline" className="h-16 flex-col">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">Add Entry</span>
            </Button>
            <Button onClick={handleExportData} variant="outline" className="h-16 flex-col">
              <Download className="w-5 h-5 mb-1" />
              <span className="text-xs">Export Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">View Reports</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <MapPin className="w-5 h-5 mb-1" />
              <span className="text-xs">Find Fuel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelManagementPage;