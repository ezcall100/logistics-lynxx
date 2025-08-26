import React from 'react';
import { Handshake, Package, DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import PortalLayout from '../../components/layout/PortalLayout';

const BrokerDashboard: React.FC = () => {
  return (
    <PortalLayout title="Broker Dashboard" subtitle="Manage freight brokerage operations and carrier relationships">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Loads</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Handshake className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Carrier Partners</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$89K</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Loads */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Available Loads</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((load) => (
                  <div key={load} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Load #{2000 + load}</p>
                        <p className="text-sm text-gray-600">Dallas → Phoenix</p>
                        <p className="text-xs text-gray-500">Dry Van • 45,000 lbs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$1,850</p>
                      <p className="text-sm text-blue-600">Available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carrier Performance */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Carriers</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">AC</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">ABC Trucking</p>
                      <p className="text-sm text-gray-600">4.9 ★ • 127 loads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">98%</p>
                    <p className="text-xs text-gray-500">On-time</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">RT</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Reliable Transport</p>
                      <p className="text-sm text-gray-600">4.8 ★ • 89 loads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">96%</p>
                    <p className="text-xs text-gray-500">On-time</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">ST</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Swift Trucking</p>
                      <p className="text-sm text-gray-600">4.7 ★ • 156 loads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">94%</p>
                    <p className="text-xs text-gray-500">On-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Post Load</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Handshake className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Carrier</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Clients</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Clock className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Track Loads</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default BrokerDashboard;
