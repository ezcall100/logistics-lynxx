import React, { useState } from 'react';
import { 
  Map, 
  Navigation, 
  Clock, 
  MapPin, 
  Truck,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const RouteNavigation: React.FC = () => {
  const [currentLocation] = useState('Blythe, CA');
  const [destination] = useState('Phoenix, AZ');
  const [eta] = useState('2 hours 15 minutes');
  const [distance] = useState('125 miles');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Route Navigation</h1>
          <p className="text-gray-600">Real-time navigation and route optimization</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Current Route Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Route</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Location</p>
              <p className="font-medium text-gray-900">{currentLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-medium text-gray-900">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ETA</p>
              <p className="font-medium text-gray-900">{eta}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Map */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Navigation</h3>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive navigation map will be displayed here</p>
            <p className="text-sm text-gray-500">Real-time GPS tracking and turn-by-turn directions</p>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Distance</span>
              <span className="text-sm font-medium text-gray-900">{distance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estimated Time</span>
              <span className="text-sm font-medium text-gray-900">{eta}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Speed</span>
              <span className="text-sm font-medium text-gray-900">65 mph</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fuel Level</span>
              <span className="text-sm font-medium text-gray-900">75%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic & Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-green-900">Clear Traffic</p>
                <p className="text-sm text-green-700">No delays expected on current route</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">Weather Alert</p>
                <p className="text-sm text-orange-700">Light rain expected in 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Rest Stop Ahead</p>
                <p className="text-sm text-blue-700">Truck stop available in 15 miles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteNavigation;
