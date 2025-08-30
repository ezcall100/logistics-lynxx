import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Clock,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  totalShipments: number;
  totalSpend: number;
  avgDeliveryTime: number;
  onTimeDelivery: number;
  costPerShipment: number;
  monthlyGrowth: number;
}

const ShipperAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>({
    totalShipments: 156,
    totalSpend: 125000,
    avgDeliveryTime: 2.3,
    onTimeDelivery: 94.2,
    costPerShipment: 801.28,
    monthlyGrowth: 12.5
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipper Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your shipping operations</p>
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
              <p className="text-sm text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalShipments}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +{analyticsData.monthlyGrowth}%
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">${analyticsData.totalSpend.toLocaleString()}</p>
              <p className="text-sm text-blue-600">${analyticsData.costPerShipment.toFixed(2)} per shipment</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.avgDeliveryTime} days</p>
              <p className="text-sm text-orange-600">-0.3 days vs last month</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.onTimeDelivery}%</p>
              <p className="text-sm text-green-600">+2.1% improvement</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Freight Costs</span>
              <span className="text-sm font-medium text-gray-900">$85,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fuel Surcharges</span>
              <span className="text-sm font-medium text-gray-900">$25,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accessorial Charges</span>
              <span className="text-sm font-medium text-gray-900">$15,000</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${analyticsData.totalSpend.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">On-Time Delivery</span>
                <span className="text-sm font-medium text-gray-900">{analyticsData.onTimeDelivery}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analyticsData.onTimeDelivery}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Damage-Free Delivery</span>
                <span className="text-sm font-medium text-gray-900">98.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="text-sm font-medium text-gray-900">4.7/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Volume Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Shipping volume trends chart will be displayed here</p>
              <p className="text-sm text-gray-500">Monthly shipment volume and growth analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Cost trends chart will be displayed here</p>
              <p className="text-sm text-gray-500">Cost per shipment and total spend analysis</p>
            </div>
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
              <li>• Shipping volume increased by 12.5% this month</li>
              <li>• On-time delivery improved by 2.1%</li>
              <li>• Average delivery time reduced by 0.3 days</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Optimization Opportunities</h4>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Consolidate shipments to reduce per-unit costs</li>
              <li>• Optimize routes to improve delivery times</li>
              <li>• Negotiate better rates with preferred carriers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperAnalytics;
