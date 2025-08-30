import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  MapPin, 
  Clock,
  Fuel,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface OwnerOperatorStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  activeLoads: number;
  totalMiles: number;
  fuelCost: number;
  maintenanceCost: number;
  homeTime: number;
}

interface Load {
  id: string;
  origin: string;
  destination: string;
  status: 'active' | 'completed' | 'pending';
  revenue: number;
  expenses: number;
  profit: number;
  pickupDate: string;
  deliveryDate: string;
  miles: number;
}

const OwnerOperatorDashboard: React.FC = () => {
  const [stats] = useState<OwnerOperatorStats>({
    totalRevenue: 28470,
    totalExpenses: 18750,
    netProfit: 9720,
    activeLoads: 3,
    totalMiles: 2847,
    fuelCost: 8540,
    maintenanceCost: 1250,
    homeTime: 2.5
  });

  const [loads] = useState<Load[]>([
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      status: 'active',
      revenue: 1250,
      expenses: 420,
      profit: 830,
      pickupDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      miles: 425
    },
    {
      id: '2',
      origin: 'Phoenix, AZ',
      destination: 'Las Vegas, NV',
      status: 'active',
      revenue: 980,
      expenses: 310,
      profit: 670,
      pickupDate: '2024-01-17',
      deliveryDate: '2024-01-18',
      miles: 298
    },
    {
      id: '3',
      origin: 'Las Vegas, NV',
      destination: 'Salt Lake City, UT',
      status: 'pending',
      revenue: 1450,
      expenses: 480,
      profit: 970,
      pickupDate: '2024-01-19',
      deliveryDate: '2024-01-20',
      miles: 512
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner-Operator Dashboard</h1>
          <p className="text-gray-600">Manage your fleet and maximize profitability</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Home Time
          </button>
          <button className="btn-primary flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            View Reports
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${stats.netProfit.toLocaleString()}</h3>
          <p className="text-gray-600">Net Profit</p>
          <p className="text-sm text-green-600 mt-1">+18% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.activeLoads}</h3>
          <p className="text-gray-600">Active Loads</p>
          <p className="text-sm text-green-600 mt-1">+1 vs last week</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalMiles.toLocaleString()}</h3>
          <p className="text-gray-600">Total Miles</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.homeTime}</h3>
          <p className="text-gray-600">Home Time (days)</p>
          <p className="text-sm text-red-600 mt-1">-0.5 vs last week</p>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Total Revenue</span>
              </div>
              <span className="font-semibold text-green-600">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span className="font-medium text-gray-900">Total Expenses</span>
              </div>
              <span className="font-semibold text-red-600">${stats.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Fuel className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Fuel Cost</span>
              </div>
              <span className="font-semibold text-blue-600">${stats.fuelCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Maintenance</span>
              </div>
              <span className="font-semibold text-orange-600">${stats.maintenanceCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Loads</h3>
          <div className="space-y-4">
            {loads.map((load) => (
              <div key={load.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      load.status === 'active' ? 'text-green-600 bg-green-50' :
                      load.status === 'completed' ? 'text-blue-600 bg-blue-50' :
                      'text-yellow-600 bg-yellow-50'
                    }`}>
                      {load.status}
                    </span>
                    <span className="text-sm text-gray-600">Load #{load.id}</span>
                  </div>
                  <span className="font-semibold text-green-600">${load.profit}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {load.origin} → {load.destination}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{load.miles} miles</span>
                  <span>Revenue: ${load.revenue}</span>
                  <span>Expenses: ${load.expenses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Find Loads</h3>
          <p className="text-sm text-gray-600 mb-4">Browse available loads and book profitable routes</p>
          <button className="btn-primary w-full">Browse Loads</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Schedule Maintenance</h3>
          <p className="text-sm text-gray-600 mb-4">Book maintenance appointments and track service history</p>
          <button className="btn-outline w-full">Schedule Service</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Request Advance</h3>
          <p className="text-sm text-gray-600 mb-4">Get quick access to your earnings when you need them</p>
          <button className="btn-outline w-full">Request Funds</button>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Maintenance Due</p>
              <p className="text-sm text-yellow-700">Your truck is due for oil change in 500 miles</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Load Completed</p>
              <p className="text-sm text-green-700">Load #1042 has been delivered successfully</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Home Time Available</p>
              <p className="text-sm text-blue-700">You have 2.5 days of home time available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">34%</div>
            <p className="text-gray-600">Profit Margin</p>
            <p className="text-sm text-green-600">+2% vs last month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
            <p className="text-gray-600">On-Time Delivery</p>
            <p className="text-sm text-green-600">+1.2% vs last month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">7.2</div>
            <p className="text-gray-600">MPG Average</p>
            <p className="text-sm text-red-600">-0.3 vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOperatorDashboard;
