import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart,
  Download,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Fuel,
  Award
} from 'lucide-react';

interface DriverMetrics {
  totalMiles: number;
  totalHours: number;
  totalEarnings: number;
  fuelEfficiency: number;
  onTimeDelivery: number;
  safetyScore: number;
  avgSpeed: number;
  idleTime: number;
}

interface WeeklyData {
  day: string;
  miles: number;
  hours: number;
  earnings: number;
}

const DriverAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [metrics] = useState<DriverMetrics>({
    totalMiles: 2847,
    totalHours: 156,
    totalEarnings: 2847,
    fuelEfficiency: 7.2,
    onTimeDelivery: 98.5,
    safetyScore: 95.2,
    avgSpeed: 62,
    idleTime: 12.5
  });

  const [weeklyData] = useState<WeeklyData[]>([
    { day: 'Mon', miles: 425, hours: 22, earnings: 425 },
    { day: 'Tue', miles: 398, hours: 21, earnings: 398 },
    { day: 'Wed', miles: 512, hours: 24, earnings: 512 },
    { day: 'Thu', miles: 387, hours: 20, earnings: 387 },
    { day: 'Fri', miles: 456, hours: 23, earnings: 456 },
    { day: 'Sat', miles: 389, hours: 21, earnings: 389 },
    { day: 'Sun', miles: 280, hours: 15, earnings: 280 }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Analytics</h1>
          <p className="text-gray-600">Track your performance and earnings</p>
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.totalMiles.toLocaleString()}</h3>
          <p className="text-gray-600">Total Miles</p>
          <p className="text-sm text-green-600 mt-1">+12% vs last week</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.totalHours}</h3>
          <p className="text-gray-600">Total Hours</p>
          <p className="text-sm text-green-600 mt-1">+8% vs last week</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${metrics.totalEarnings.toLocaleString()}</h3>
          <p className="text-gray-600">Total Earnings</p>
          <p className="text-sm text-green-600 mt-1">+15% vs last week</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Fuel className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{metrics.fuelEfficiency}</h3>
          <p className="text-gray-600">MPG Average</p>
          <p className="text-sm text-red-600 mt-1">-2% vs last week</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">On-Time Delivery</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.onTimeDelivery}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${metrics.onTimeDelivery}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Safety Score</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.safetyScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${metrics.safetyScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Average Speed</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.avgSpeed} mph</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(metrics.avgSpeed / 70) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Idle Time</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.idleTime}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${metrics.idleTime}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Breakdown</h3>
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">{day.day}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{day.miles} miles</p>
                    <p className="text-xs text-gray-600">{day.hours} hours</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">${day.earnings}</p>
                  <p className="text-xs text-gray-600">${(day.earnings / day.hours).toFixed(1)}/hr</p>
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
            <h3 className="text-lg font-semibold text-gray-900">Miles vs Earnings</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Miles vs Earnings correlation</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Performance over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Award className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Perfect Week</p>
              <p className="text-sm text-green-700">100% on-time deliveries</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Safety Champion</p>
              <p className="text-sm text-blue-700">95+ safety score</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Award className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Fuel Efficient</p>
              <p className="text-sm text-purple-700">7.2+ MPG average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Strong Performance</p>
              <p className="text-sm text-blue-700">Your on-time delivery rate of 98.5% is above the company average of 95%.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
            <TrendingDown className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Fuel Efficiency</p>
              <p className="text-sm text-yellow-700">Consider reducing idle time to improve your fuel efficiency score.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <Award className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Earnings Opportunity</p>
              <p className="text-sm text-green-700">You're on track to exceed your weekly earnings goal by 15%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAnalytics;
