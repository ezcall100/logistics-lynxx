import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Package, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Activity,
  Target,
  Award,
  Star,
  Gauge,
  Network,
  Brain,
  Zap,
  Target as TargetIcon,
  Plus,
  Settings
} from 'lucide-react';

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface LoadData {
  id: string;
  origin: string;
  destination: string;
  rate: number;
  status: 'available' | 'in-progress' | 'completed';
  carrier: string;
  pickupDate: string;
  deliveryDate: string;
}

interface CarrierData {
  id: string;
  name: string;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  location: string;
  equipment: string[];
  lastActive: string;
}

const BrokerDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [recentLoads, setRecentLoads] = useState<LoadData[]>([]);
  const [topCarriers, setTopCarriers] = useState<CarrierData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setMetrics([
        {
          id: 'revenue',
          title: 'Monthly Revenue',
          value: '$127,450',
          change: '+12.5%',
          changeType: 'positive',
          icon: DollarSign,
          color: 'green'
        },
        {
          id: 'loads',
          title: 'Active Loads',
          value: '47',
          change: '+8.2%',
          changeType: 'positive',
          icon: Package,
          color: 'blue'
        },
        {
          id: 'carriers',
          title: 'Available Carriers',
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

      setRecentLoads([
        {
          id: '1',
          origin: 'Los Angeles, CA',
          destination: 'New York, NY',
          rate: 2850,
          status: 'available',
          carrier: 'Elite Transport Co.',
          pickupDate: '2024-01-15',
          deliveryDate: '2024-01-18'
        },
        {
          id: '2',
          origin: 'Chicago, IL',
          destination: 'Miami, FL',
          rate: 1950,
          status: 'in-progress',
          carrier: 'Swift Logistics',
          pickupDate: '2024-01-14',
          deliveryDate: '2024-01-17'
        },
        {
          id: '3',
          origin: 'Dallas, TX',
          destination: 'Seattle, WA',
          rate: 2200,
          status: 'completed',
          carrier: 'Reliable Hauling',
          pickupDate: '2024-01-12',
          deliveryDate: '2024-01-15'
        }
      ]);

      setTopCarriers([
        {
          id: '1',
          name: 'Elite Transport Co.',
          rating: 4.9,
          status: 'available',
          location: 'Los Angeles, CA',
          equipment: ['Dry Van', 'Reefer'],
          lastActive: '2 min ago'
        },
        {
          id: '2',
          name: 'Swift Logistics',
          rating: 4.8,
          status: 'busy',
          location: 'Chicago, IL',
          equipment: ['Flatbed', 'Power Only'],
          lastActive: '15 min ago'
        },
        {
          id: '3',
          name: 'Reliable Hauling',
          rating: 4.7,
          status: 'available',
          location: 'Dallas, TX',
          equipment: ['Dry Van', 'Step Deck'],
          lastActive: '5 min ago'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'busy': return 'text-orange-600 bg-orange-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'busy': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
            Broker Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            New Load
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Settings
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
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
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
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

        {/* Load Status */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Load Status Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Available</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">In Progress</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">18</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">Completed</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">6</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Loads */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Loads
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentLoads.map((load) => (
                <div key={load.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {load.origin} → {load.destination}
                        </p>
                        <p className="text-sm text-gray-500">
                          {load.carrier} • ${load.rate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(load.status)}`}>
                      {load.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Carriers */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Carriers
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCarriers.map((carrier) => (
                <div key={carrier.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {carrier.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {carrier.location} • {carrier.equipment.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                        {carrier.rating}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(carrier.status)}`}>
                      {carrier.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
