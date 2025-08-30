import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart,
  Download,
  Calendar,
  DollarSign,
  Truck,
  MapPin,
  Clock,
  Target
} from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  totalMiles: number;
  avgRevenuePerMile: number;
  fuelEfficiency: number;
  utilization: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  miles: number;
}

const OwnerOperatorAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 28470,
    totalExpenses: 18750,
    netProfit: 9720,
    profitMargin: 34,
    totalMiles: 2847,
    avgRevenuePerMile: 10.0,
    fuelEfficiency: 7.2,
    utilization: 85
  });

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Jan', revenue: 28470, expenses: 18750, profit: 9720, miles: 2847 },
    { month: 'Dec', revenue: 24120, expenses: 17340, profit: 6780, miles: 2412 },
    { month: 'Nov', revenue: 26580, expenses: 18920, profit: 7660, miles: 2658 },
    { month: 'Oct', revenue: 22890, expenses: 16540, profit: 6350, miles: 2289 },
    { month: 'Sep', revenue: 25120, expenses: 17890, profit: 7230, miles: 2512 },
    { month: 'Aug', revenue: 23450, expenses: 17230, profit: 6220, miles: 2345 }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner-Operator Analytics</h1>
          <p className="text-gray-600">Comprehensive business performance insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
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
          <p className="text-sm text-green-600 mt-1">+18% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${analyticsData.netProfit.toLocaleString()}</h3>
          <p className="text-gray-600">Net Profit</p>
          <p className="text-sm text-green-600 mt-1">+28% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.profitMargin}%</h3>
          <p className="text-gray-600">Profit Margin</p>
          <p className="text-sm text-green-600 mt-1">+2% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{analyticsData.totalMiles.toLocaleString()}</h3>
          <p className="text-gray-600">Total Miles</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Revenue per Mile</span>
                <span className="text-sm font-semibold text-gray-900">${analyticsData.avgRevenuePerMile}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(analyticsData.avgRevenuePerMile / 12) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Fuel Efficiency</span>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.fuelEfficiency} MPG</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(analyticsData.fuelEfficiency / 8) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Utilization Rate</span>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.utilization}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analyticsData.utilization}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Profit Margin</span>
                <span className="text-sm font-semibold text-gray-900">{analyticsData.profitMargin}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${analyticsData.profitMargin}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
          <div className="space-y-3">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">{month.month}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">${month.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{month.miles} miles</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">${month.profit.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">{((month.profit / month.revenue) * 100).toFixed(1)}% margin</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Monthly revenue trends</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profit Analysis</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Profit vs Expenses over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Strong Revenue Growth</p>
                <p className="text-sm text-green-700">Your revenue increased by 18% this month, driven by higher load rates and increased utilization.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Excellent Profit Margin</p>
                <p className="text-sm text-blue-700">Your 34% profit margin is well above the industry average of 28%, indicating strong cost management.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Truck className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">High Utilization Rate</p>
                <p className="text-sm text-yellow-700">Your 85% utilization rate shows efficient load planning and minimal empty miles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900">Revenue per Mile</p>
                <p className="text-sm text-purple-700">Your $10.00 revenue per mile is competitive and shows good load selection strategy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-medium text-blue-900">Route Optimization</h4>
            </div>
            <p className="text-sm text-blue-700">Consider AI-powered routing to reduce empty miles and improve fuel efficiency.</p>
            <p className="text-xs text-blue-600 mt-2">Potential: +$420/month</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <h4 className="font-medium text-green-900">Load Selection</h4>
            </div>
            <p className="text-sm text-green-700">Focus on higher-paying loads with better profit margins and shorter deadhead distances.</p>
            <p className="text-xs text-green-600 mt-2">Potential: +$390/month</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-medium text-purple-900">Fuel Management</h4>
            </div>
            <p className="text-sm text-purple-700">Implement fuel-efficient driving techniques and plan fuel stops at lower-cost locations.</p>
            <p className="text-xs text-purple-600 mt-2">Potential: +$390/month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOperatorAnalytics;
