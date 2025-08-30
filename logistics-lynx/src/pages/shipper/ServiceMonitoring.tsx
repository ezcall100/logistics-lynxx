import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star,
  TrendingUp,
  Download
} from 'lucide-react';

interface ServiceMetric {
  metric: string;
  current: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const ServiceMonitoring: React.FC = () => {
  const [metrics] = useState<ServiceMetric[]>([
    {
      metric: 'On-Time Delivery',
      current: 94.2,
      target: 95.0,
      status: 'good',
      trend: 'up'
    },
    {
      metric: 'Service Quality Score',
      current: 4.7,
      target: 4.5,
      status: 'excellent',
      trend: 'up'
    },
    {
      metric: 'Response Time',
      current: 2.3,
      target: 2.0,
      status: 'warning',
      trend: 'down'
    },
    {
      metric: 'Damage Rate',
      current: 0.8,
      target: 1.0,
      status: 'excellent',
      trend: 'stable'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Monitoring</h1>
          <p className="text-gray-600">Monitor service quality and performance metrics</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{metric.current}</p>
                <p className="text-sm text-gray-500">Target: {metric.target}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Quality Dashboard */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Quality Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Excellent Performance</span>
              </div>
              <span className="text-green-600 font-medium">2 metrics</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Good Performance</span>
              </div>
              <span className="text-blue-600 font-medium">1 metric</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Needs Attention</span>
              </div>
              <span className="text-orange-600 font-medium">1 metric</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Recent Improvements</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">On-time delivery improved by 2.1%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Service quality score increased to 4.7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Damage rate reduced to 0.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Service performance trends chart will be displayed here</p>
            <p className="text-sm text-gray-500">Historical data and performance analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceMonitoring;

