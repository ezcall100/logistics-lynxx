import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck, 
  AlertTriangle,
  Phone,
  MessageSquare
} from 'lucide-react';

const RouteNavigation: React.FC = () => {
  const [currentLocation] = useState('Los Angeles, CA');
  const [destination] = useState('Phoenix, AZ');
  const [eta] = useState('2:30 PM');
  const [distance] = useState('425 miles');
  const [estimatedTime] = useState('6h 15m');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Route Navigation</h1>
          <p className="text-gray-600">Real-time navigation and route information</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Dispatch
          </button>
          <button className="btn-outline flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Send Update
          </button>
        </div>
      </div>

      {/* Current Route Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Route Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="font-medium text-gray-900">{currentLocation}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-medium text-gray-900">{destination}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ETA</p>
                <p className="font-medium text-gray-900">{eta}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="font-medium text-gray-900">{distance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Navigation Map */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Navigation Map</h3>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Live navigation map will be displayed here</p>
            <p className="text-sm text-gray-500">Real-time GPS tracking and turn-by-turn directions</p>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Distance</span>
              <span className="font-medium text-gray-900">{distance}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Estimated Time</span>
              <span className="font-medium text-gray-900">{estimatedTime}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Fuel Required</span>
              <span className="font-medium text-gray-900">~85 gallons</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tolls</span>
              <span className="font-medium text-gray-900">$12.50</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Rest Stops</span>
              <span className="font-medium text-gray-900">3 recommended</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic & Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Traffic Alert</p>
                <p className="text-sm text-yellow-700">Construction on I-10 near Indio - 15 min delay</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Weather Alert</p>
                <p className="text-sm text-blue-700">Light rain expected near Palm Springs</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Good News</p>
                <p className="text-sm text-green-700">Clear traffic conditions on current route</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Call Dispatch</h3>
          <p className="text-sm text-gray-600 mb-4">Contact dispatch for route changes or issues</p>
          <button className="btn-outline w-full">Call Now</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Send Update</h3>
          <p className="text-sm text-gray-600 mb-4">Update your status or report issues</p>
          <button className="btn-outline w-full">Send Update</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Navigation className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Reroute</h3>
          <p className="text-sm text-gray-600 mb-4">Request route changes or find alternatives</p>
          <button className="btn-outline w-full">Request Reroute</button>
        </div>
      </div>
    </div>
  );
};

export default RouteNavigation;
