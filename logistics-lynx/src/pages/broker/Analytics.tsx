import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Truck, 
  Package, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Star,
  Award,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Brain,
  Target,
  Zap,
  Activity,
  Gauge,
  Network,
  ArrowUp,
  ArrowDown,
  Minus,
  Percent
} from 'lucide-react';

interface AnalyticsMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface PerformanceData {
  month: string;
  revenue: number;
  loads: number;
  margin: number;
  satisfaction: number;
}

const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMetrics([
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: '$1,247,450',
          change: '+12.5%',
          changeType: 'positive',
          icon: DollarSign,
          color: 'green'
        },
        {
          id: 'loads',
          title: 'Total Loads',
          value: '1,247',
          change: '+8.2%',
          changeType: 'positive',
          icon: Package,
          color: 'blue'
        },
        {
          id: 'carriers',
          title: 'Active Carriers',
          value: '156',
          change: '+15.3%',
          changeType: 'positive',
          icon: Truck,
          color: 'purple'
        },
        {
          id: 'margin',
          title: 'Average Margin',
          value: '18.7%',
          change: '+2.1%',
          changeType: 'positive',
          icon: TrendingUp,
          color: 'emerald'
        },
        {
          id: 'onTime',
          title: 'On-Time Delivery',
          value: '94.2%',
          change: '+1.8%',
          changeType: 'positive',
          icon: CheckCircle,
          color: 'green'
        },
        {
          id: 'satisfaction',
          title: 'Customer Satisfaction',
          value: '4.8/5',
          change: '+0.2',
          changeType: 'positive',
          icon: Star,
          color: 'yellow'
        }
      ]);

      setPerformanceData([
        { month: 'Jan', revenue: 125000, loads: 145, margin: 17.2, satisfaction: 4.6 },
        { month: 'Feb', revenue: 138000, loads: 162, margin: 18.1, satisfaction: 4.7 },
        { month: 'Mar', revenue: 142000, loads: 168, margin: 18.5, satisfaction: 4.7 },
        { month: 'Apr', revenue: 135000, loads: 158, margin: 17.8, satisfaction: 4.6 },
        { month: 'May', revenue: 148000, loads: 175, margin: 18.9, satisfaction: 4.8 },
        { month: 'Jun', revenue: 155000, loads: 182, margin: 19.2, satisfaction: 4.8 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics & Business Intelligence
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Performance insights and data-driven decision making
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Insights
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Load Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Load Performance
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Load performance chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Performance
          </h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Month</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Loads</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Margin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((data, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-slate-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{data.month}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">${data.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{data.loads}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{data.margin}%</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{data.satisfaction}/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Business Insights</h2>
            <p className="text-gray-600 dark:text-gray-400">Data-driven recommendations for business growth</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">Growth Opportunity</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Revenue has increased 12.5% this month. Consider expanding to high-performing lanes.
            </p>
            <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
              View Opportunities
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Performance Alert</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              On-time delivery rate is 94.2%. Focus on improving carrier communication.
            </p>
            <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
              View Details
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-gray-900 dark:text-white">Customer Success</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Customer satisfaction is 4.8/5. Consider implementing customer feedback system.
            </p>
            <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
