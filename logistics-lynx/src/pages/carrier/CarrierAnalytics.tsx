import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Truck, 
  Fuel, 
  DollarSign, 
  Clock,
  MapPin,
  Users,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  revenue: number;
  fuelCost: number;
  maintenanceCost: number;
  totalTrips: number;
  avgTripDistance: number;
  driverUtilization: number;
  vehicleUtilization: number;
  onTimeDelivery: number;
}

const CarrierAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>({
    revenue: 125000,
    fuelCost: 45000,
    maintenanceCost: 8500,
    totalTrips: 156,
    avgTripDistance: 425,
    driverUtilization: 87,
    vehicleUtilization: 92,
    onTimeDelivery: 94
  });

  const profit = analyticsData.revenue - analyticsData.fuelCost - analyticsData.maintenanceCost;
  const profitMargin = (profit / analyticsData.revenue) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carrier Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your fleet performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.revenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">${profit.toLocaleString()}</p>
              <p className="text-sm text-green-600">{profitMargin.toFixed(1)}% margin</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalTrips}</p>
              <p className="text-sm text-blue-600">+8.2% vs last period</p>
            </div>
            <Truck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.onTimeDelivery}%</p>
              <p className="text-sm text-green-600">+2.1% improvement</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Fuel Costs</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${analyticsData.fuelCost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Maintenance</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${analyticsData.maintenanceCost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Net Profit</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${profit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Rates</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Driver Utilization</span>
                <span className="text-sm font-medium text-gray-900">{analyticsData.driverUtilization}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${analyticsData.driverUtilization}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Vehicle Utilization</span>
                <span className="text-sm font-medium text-gray-900">{analyticsData.vehicleUtilization}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${analyticsData.vehicleUtilization}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Revenue trend chart will be displayed here</p>
              <p className="text-sm text-gray-500">Monthly revenue analysis and forecasting</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Performance</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Trip performance chart will be displayed here</p>
              <p className="text-sm text-gray-500">Distance, time, and efficiency metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Average Trip Distance</h4>
            <p className="text-2xl font-bold text-blue-600">{analyticsData.avgTripDistance} mi</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Active Drivers</h4>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">Days Active</h4>
            <p className="text-2xl font-bold text-purple-600">28</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Positive Trends</h4>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Revenue increased by 12.5% this month</li>
              <li>• Driver utilization improved by 3.2%</li>
              <li>• On-time delivery rate at 94%</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Optimization Opportunities</h4>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Fuel costs can be reduced by 8% with route optimization</li>
              <li>• Maintenance scheduling can improve vehicle uptime</li>
              <li>• Driver training can enhance safety scores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierAnalytics;

