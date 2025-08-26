import React from 'react';
import { Truck, Package, MapPin, Clock, DollarSign, Users, RefreshCw } from 'lucide-react';
import PortalLayout from '../../components/layout/PortalLayout';
import { useCarrierData } from '../../hooks/api/useCarrierData';

const CarrierDashboard: React.FC = () => {
  const { loads, fleetStatus, stats, loading, error, refresh } = useCarrierData();

  if (loading) {
    return (
      <PortalLayout title="Carrier Dashboard" subtitle="Manage your fleet, loads, and operations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </PortalLayout>
    );
  }

  if (error) {
    return (
      <PortalLayout title="Carrier Dashboard" subtitle="Manage your fleet, loads, and operations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">Error loading data: {error}</p>
            <button 
              onClick={refresh}
              className="mt-4 flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout title="Carrier Dashboard" subtitle="Manage your fleet, loads, and operations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Trucks</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.active_trucks || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Loads</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.active_loads || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.on_time_rate || 0}%</p>
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
                <p className="text-2xl font-bold text-gray-900">${(stats?.monthly_revenue || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Loads */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Loads</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {loads.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No active loads found</p>
                  </div>
                ) : (
                  loads.slice(0, 3).map((load) => (
                    <div key={load.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Load #{load.load_number}</p>
                          <p className="text-sm text-gray-600">{load.origin} → {load.destination}</p>
                          <p className="text-xs text-gray-500">{load.cargo_type} • {load.weight.toLocaleString()} lbs</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${load.rate.toLocaleString()}</p>
                        <p className={`text-sm ${
                          load.status === 'in_transit' ? 'text-green-600' : 
                          load.status === 'available' ? 'text-blue-600' : 
                          load.status === 'completed' ? 'text-gray-600' : 'text-red-600'
                        }`}>
                          {load.status.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Fleet Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Fleet Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {fleetStatus ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Available</span>
                      </div>
                      <span className="text-sm text-gray-600">{fleetStatus.available} trucks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">In Transit</span>
                      </div>
                      <span className="text-sm text-gray-600">{fleetStatus.in_transit} trucks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium">Loading/Unloading</span>
                      </div>
                      <span className="text-sm text-gray-600">{fleetStatus.loading_unloading} trucks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Maintenance</span>
                      </div>
                      <span className="text-sm text-gray-600">{fleetStatus.maintenance} trucks</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Total Fleet</span>
                        <span className="text-sm font-bold text-gray-900">{fleetStatus.total_trucks} trucks</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Fleet status unavailable</p>
                  </div>
                )}
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
                <span className="text-sm font-medium text-gray-900">New Load</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Truck className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Truck</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Drivers</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Track Fleet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default CarrierDashboard;
