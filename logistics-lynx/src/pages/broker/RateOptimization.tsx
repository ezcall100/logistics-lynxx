import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Brain,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Package,
  Truck,
  Users,
  Zap,
  Target,
  Award,
  Clock,
  Activity,
  Gauge,
  Network
} from 'lucide-react';

interface RateData {
  id: string;
  origin: string;
  destination: string;
  currentRate: number;
  marketRate: number;
  recommendedRate: number;
  margin: number;
  volume: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

const RateOptimization: React.FC = () => {
  const [rates, setRates] = useState<RateData[]>([]);
  const [selectedRate, setSelectedRate] = useState<RateData | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'details'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrend, setFilterTrend] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRates([
        {
          id: 'R001',
          origin: 'Los Angeles, CA',
          destination: 'New York, NY',
          currentRate: 2.85,
          marketRate: 3.15,
          recommendedRate: 3.05,
          margin: 7.0,
          volume: 45,
          trend: 'up',
          lastUpdated: '2 hours ago'
        },
        {
          id: 'R002',
          origin: 'Chicago, IL',
          destination: 'Miami, FL',
          currentRate: 2.45,
          marketRate: 2.35,
          recommendedRate: 2.40,
          margin: 2.0,
          volume: 32,
          trend: 'down',
          lastUpdated: '1 hour ago'
        },
        {
          id: 'R003',
          origin: 'Dallas, TX',
          destination: 'Seattle, WA',
          currentRate: 2.65,
          marketRate: 2.70,
          recommendedRate: 2.68,
          margin: 1.1,
          volume: 28,
          trend: 'stable',
          lastUpdated: '30 min ago'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRates = rates.filter(rate => {
    const matchesSearch = rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrend = filterTrend === 'all' || rate.trend === filterTrend;
    return matchesSearch && matchesTrend;
  });

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4" />;
      case 'down': return <ArrowDown className="w-4 h-4" />;
      case 'stable': return <Minus className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

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
            Rate Optimization
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered rate intelligence and margin optimization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Brain className="w-4 h-4 mr-2 inline" />
            AI Analysis
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            New Rate
          </button>
        </div>
      </div>

      {/* Rate Details View */}
      {viewMode === 'details' && selectedRate && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Rate Analysis: {selectedRate.origin} → {selectedRate.destination}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Last updated: {selectedRate.lastUpdated}
                </p>
              </div>
              <button 
                onClick={() => setViewMode('overview')}
                className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Back to Overview
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rate Comparison */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Rate Comparison
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedRate.currentRate}</p>
                      <p className="text-xs text-gray-500">per mile</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Market Rate</p>
                      <p className="text-2xl font-bold text-blue-600">${selectedRate.marketRate}</p>
                      <p className="text-xs text-gray-500">per mile</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Recommended</p>
                      <p className="text-2xl font-bold text-green-600">${selectedRate.recommendedRate}</p>
                      <p className="text-xs text-gray-500">per mile</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Margin Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Margin Analysis
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Margin</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedRate.margin}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Volume</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedRate.volume}</p>
                      <p className="text-xs text-gray-500">loads</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Trend</p>
                      <div className="flex items-center justify-center space-x-1">
                        {getTrendIcon(selectedRate.trend)}
                        <span className="text-sm font-medium capitalize">{selectedRate.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview View */}
      {viewMode === 'overview' && (
        <>
          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Market Insights</h2>
                <p className="text-gray-600 dark:text-gray-400">Real-time market intelligence and recommendations</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                    Opportunity
                  </span>
                  <span className="text-xs font-medium text-red-600">High impact</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  LA to NY Rate Increase
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Market rates have increased 10.5% in the last week. Consider raising rates by 5-7%.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">92% confidence</span>
                  <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
                    Increase rates by 6%
                  </button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                    Risk
                  </span>
                  <span className="text-xs font-medium text-yellow-600">Medium impact</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Chicago to Miami Capacity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Available capacity has increased 25% in this lane. Monitor for rate pressure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">78% confidence</span>
                  <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
                    Monitor closely
                  </button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                    Trend
                  </span>
                  <span className="text-xs font-medium text-green-600">Low impact</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Fuel Cost Stabilization
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Fuel costs have stabilized after recent volatility. May reduce rate pressure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">85% confidence</span>
                  <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium">
                    Continue monitoring
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search rates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={filterTrend}
                  onChange={(e) => setFilterTrend(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="all">All Trends</option>
                  <option value="up">Trending Up</option>
                  <option value="down">Trending Down</option>
                  <option value="stable">Stable</option>
                </select>
                
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Rates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRates.map((rate) => (
              <div 
                key={rate.id} 
                className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedRate(rate);
                  setViewMode('details');
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {rate.origin} → {rate.destination}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(rate.trend)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(rate.trend)}`}>
                        {rate.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Rate</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${rate.currentRate}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Market Rate</span>
                      <span className="text-sm font-medium text-blue-600">
                        ${rate.marketRate}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Recommended</span>
                      <span className="text-sm font-medium text-green-600">
                        ${rate.recommendedRate}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Margin</span>
                      <span className="text-sm font-medium text-purple-600">
                        {rate.margin}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {rate.volume} loads/month
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RateOptimization;
