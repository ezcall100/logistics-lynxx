import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Clock, 
  Download,
  Filter,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  totalShipments: number;
  onTimeDelivery: number;
  averageCost: number;
  totalSpent: number;
  damageRate: number;
  customerSatisfaction: number;
}

const ShipperAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>({
    totalShipments: 1247,
    onTimeDelivery: 94.2,
    averageCost: 1250,
    totalSpent: 1560000,
    damageRate: 0.8,
    customerSatisfaction: 4.6
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipper Analytics</h1>
          <p className="text-gray-600">Performance insights and cost optimization</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.totalShipments.toLocaleString()}</h3>
          <p className="text-gray-600">Total Shipments</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.onTimeDelivery}%</h3>
          <p className="text-gray-600">On-Time Delivery</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${analyticsData.averageCost.toLocaleString()}</h3>
          <p className="text-gray-600">Average Cost</p>
          <p className="text-sm text-green-600 mt-1">-5.2% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.customerSatisfaction}/5.0</h3>
          <p className="text-gray-600">Satisfaction Score</p>
          <p className="text-sm text-green-600 mt-1">+0.3 vs last period</p>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-900 font-medium">Total Spent</span>
              <span className="text-blue-900 font-bold">${(analyticsData.totalSpent / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-900 font-medium">Cost Savings</span>
              <span className="text-green-900 font-bold">$125K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-900 font-medium">Damage Claims</span>
              <span className="text-purple-900 font-bold">${(analyticsData.totalSpent * analyticsData.damageRate / 100).toLocaleString()}</span>
            </div>
          </div>
          <div className="col-span-2">
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Cost Trend Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">On-Time Performance</h4>
              <p className="text-sm text-gray-600">Percentage of deliveries made on time</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{analyticsData.onTimeDelivery}%</div>
              <div className="text-sm text-green-600">+2.1% vs target</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Damage Rate</h4>
              <p className="text-sm text-gray-600">Percentage of shipments with damage claims</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{analyticsData.damageRate}%</div>
              <div className="text-sm text-red-600">+0.2% vs target</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Customer Satisfaction</h4>
              <p className="text-sm text-gray-600">Average customer rating</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.customerSatisfaction}/5.0</div>
              <div className="text-sm text-blue-600">+0.3 vs target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Generate Report</h3>
          <p className="text-sm text-gray-600 mb-4">Create detailed performance reports</p>
          <button className="btn-outline w-full">Generate Report</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Optimize Costs</h3>
          <p className="text-sm text-gray-600 mb-4">Get cost optimization recommendations</p>
          <button className="btn-outline w-full">View Recommendations</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
          <p className="text-sm text-gray-600 mb-4">Download analytics data for external analysis</p>
          <button className="btn-outline w-full">Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default ShipperAnalytics;
