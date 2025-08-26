import React from 'react';
import { Truck, MapPin, Clock, DollarSign, Package, Navigation } from 'lucide-react';
import PortalLayout from '../../components/layout/PortalLayout';

const DriverDashboard: React.FC = () => {
  return (
    <PortalLayout title="Driver Dashboard" subtitle="Track your current load and manage your schedule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Load</p>
                <p className="text-2xl font-bold text-gray-900">#1042</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Today</p>
                <p className="text-2xl font-bold text-gray-900">6.5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MapPin className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Miles Today</p>
                <p className="text-2xl font-bold text-gray-900">342</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Pay</p>
                <p className="text-2xl font-bold text-gray-900">$156</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Current Load Details</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Load Number:</span>
                  <span className="text-sm text-gray-900">#1042</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Origin:</span>
                  <span className="text-sm text-gray-900">Chicago, IL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Destination:</span>
                  <span className="text-sm text-gray-900">Los Angeles, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Cargo:</span>
                  <span className="text-sm text-gray-900">Electronics</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Weight:</span>
                  <span className="text-sm text-gray-900">45,000 lbs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Rate:</span>
                  <span className="text-sm text-gray-900">$2,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className="text-sm text-green-600 font-medium">In Transit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Navigation className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Navigation</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">HOS Log</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Truck className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Vehicle Status</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Package className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Load Updates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default DriverDashboard;
