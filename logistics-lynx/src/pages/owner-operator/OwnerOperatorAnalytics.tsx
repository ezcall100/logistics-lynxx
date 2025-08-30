import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Clock, 
  Download,
  Filter,
  Calendar,
  Target,
  MapPin
} from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  totalMiles: number;
  averageRate: number;
  profitMargin: number;
  monthlyGrowth: number;
  fuelEfficiency: number;
  onTimeDelivery: number;
  customerSatisfaction: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  miles: number;
}

const OwnerOperatorAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 45000,
    totalMiles: 8500,
    averageRate: 2.85,
    profitMargin: 37.8,
    monthlyGrowth: 12.5,
    fuelEfficiency: 6.8,
    onTimeDelivery: 94.2,
    customerSatisfaction: 4.6
  });

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Jan', revenue: 42000, expenses: 26000, profit: 16000, miles: 8200 },
    { month: 'Feb', revenue: 38000, expenses: 24000, profit: 14000, miles: 7800 },
    { month: 'Mar', revenue: 41000, expenses: 25000, profit: 16000, miles: 8000 },
    { month: 'Apr', revenue: 44000, expenses: 27000, profit: 17000, miles: 8500 },
    { month: 'May', revenue: 47000, expenses: 29000, profit: 18000, miles: 9000 },
    { month: 'Jun', revenue: 45000, expenses: 28000, profit: 17000, miles: 8500 }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner-Operator Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${analyticsData.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-sm text-green-600 mt-1">+{analyticsData.monthlyGrowth}% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.totalMiles.toLocaleString()}</h3>
          <p className="text-gray-600">Total Miles</p>
          <p className="text-sm text-green-600 mt-1">+8.2% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${analyticsData.averageRate}</h3>
          <p className="text-gray-600">Average Rate/Mile</p>
          <p className="text-sm text-green-600 mt-1">+5.1% vs last period</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.profitMargin}%</h3>
          <p className="text-gray-600">Profit Margin</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last period</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">On-Time Delivery</span>
              </div>
              <span className="font-bold text-green-900">{analyticsData.onTimeDelivery}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Fuel Efficiency</span>
              </div>
              <span className="font-bold text-blue-900">{analyticsData.fuelEfficiency} MPG</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Customer Satisfaction</span>
              </div>
              <span className="font-bold text-purple-900">{analyticsData.customerSatisfaction}/5.0</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Average Load Distance</span>
              </div>
              <span className="font-bold text-orange-900">425 miles</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
          <div className="space-y-4">
            {monthlyData.slice(-6).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{data.month}</span>
                  <p className="text-sm text-gray-600">{data.miles.toLocaleString()} miles</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${data.profit.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">${data.revenue.toLocaleString()} revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Revenue trends chart will be displayed here</p>
              <p className="text-sm text-gray-500">Monthly revenue analysis and forecasting</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Analysis</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Profit analysis chart will be displayed here</p>
              <p className="text-sm text-gray-500">Profit margins and cost analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Positive Trends</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Revenue increased by 12.5% this month</li>
                <li>• Average rate per mile up 5.1%</li>
                <li>• Fuel efficiency improved by 8%</li>
                <li>• Customer satisfaction at 4.6/5.0</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Optimization Opportunities</h4>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Focus on higher-paying loads</li>
                <li>• Optimize routes for fuel efficiency</li>
                <li>• Consider backhaul opportunities</li>
                <li>• Negotiate better fuel rates</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Performance Metrics</h4>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• On-time delivery: 94.2%</li>
                <li>• Average load distance: 425 miles</li>
                <li>• Monthly miles: 8,500</li>
                <li>• Profit margin: 37.8%</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Financial Summary</h4>
              </div>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Total revenue: $45,000</li>
                <li>• Average rate: $2.85/mile</li>
                <li>• Monthly growth: 12.5%</li>
                <li>• Industry benchmark: Above average</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h4 className="font-medium text-green-900">Revenue Growth</h4>
            </div>
            <p className="text-sm text-green-700 mb-3">Focus on high-paying lanes and backhaul opportunities to increase revenue per mile.</p>
            <button className="text-sm text-green-600 font-medium hover:text-green-700">
              View Opportunities →
            </button>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-6 h-6 text-blue-600" />
              <h4 className="font-medium text-blue-900">Route Optimization</h4>
            </div>
            <p className="text-sm text-blue-700 mb-3">Use AI-powered routing to reduce empty miles and improve fuel efficiency.</p>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
              Optimize Routes →
            </button>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-purple-600" />
              <h4 className="font-medium text-purple-900">Cost Management</h4>
            </div>
            <p className="text-sm text-purple-700 mb-3">Implement preventive maintenance schedules and negotiate better fuel rates.</p>
            <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
              Manage Costs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOperatorAnalytics;
