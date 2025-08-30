import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Fuel, 
  DollarSign,
  Truck,
  Route,
  Download,
  Settings
} from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  distance: number;
  time: number;
  fuelCost: number;
  tolls: number;
  totalCost: number;
  efficiency: number;
  traffic: 'low' | 'medium' | 'high';
  weather: 'clear' | 'rain' | 'snow';
}

const SmartRoutePlanning: React.FC = () => {
  const [routeOptions] = useState<RouteOption[]>([
    {
      id: '1',
      name: 'Optimal Route',
      distance: 425,
      time: 6.5,
      fuelCost: 127,
      tolls: 15,
      totalCost: 142,
      efficiency: 95,
      traffic: 'low',
      weather: 'clear'
    },
    {
      id: '2',
      name: 'Fastest Route',
      distance: 398,
      time: 5.8,
      fuelCost: 119,
      tolls: 25,
      totalCost: 144,
      efficiency: 88,
      traffic: 'medium',
      weather: 'clear'
    },
    {
      id: '3',
      name: 'Most Economical',
      distance: 452,
      time: 7.2,
      fuelCost: 113,
      tolls: 8,
      totalCost: 121,
      efficiency: 92,
      traffic: 'low',
      weather: 'clear'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState('1');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Route Planning</h1>
          <p className="text-gray-600">AI-powered route optimization for maximum efficiency</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Route
          </button>
        </div>
      </div>

      {/* Current Trip Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Trip</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Origin</p>
              <p className="text-sm text-blue-700">Los Angeles, CA</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Destination</p>
              <p className="text-sm text-green-700">Phoenix, AZ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Truck className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Load Type</p>
              <p className="text-sm text-purple-700">Dry Van - 40,000 lbs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Routes</h3>
        <div className="space-y-4">
          {routeOptions.map((route) => (
            <div 
              key={route.id} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedRoute === route.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRoute(route.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedRoute === route.id ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <h4 className="font-semibold text-gray-900">{route.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    route.traffic === 'low' ? 'text-green-600 bg-green-50' :
                    route.traffic === 'medium' ? 'text-yellow-600 bg-yellow-50' :
                    'text-red-600 bg-red-50'
                  }`}>
                    {route.traffic} traffic
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${route.totalCost}</p>
                  <p className="text-sm text-gray-600">Total Cost</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Distance</p>
                  <p className="font-medium">{route.distance} miles</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{route.time} hours</p>
                </div>
                <div>
                  <p className="text-gray-600">Fuel Cost</p>
                  <p className="font-medium">${route.fuelCost}</p>
                </div>
                <div>
                  <p className="text-gray-600">Efficiency</p>
                  <p className="font-medium">{route.efficiency}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Route Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">Total Distance</span>
              <span className="font-semibold">{routeOptions.find(r => r.id === selectedRoute)?.distance} miles</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">Estimated Time</span>
              <span className="font-semibold">{routeOptions.find(r => r.id === selectedRoute)?.time} hours</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">Fuel Cost</span>
              <span className="font-semibold">${routeOptions.find(r => r.id === selectedRoute)?.fuelCost}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">Tolls</span>
              <span className="font-semibold">${routeOptions.find(r => r.id === selectedRoute)?.tolls}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-900">Total Cost</span>
              <span className="font-bold text-blue-600">${routeOptions.find(r => r.id === selectedRoute)?.totalCost}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Map</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map</p>
              <p className="text-sm text-gray-400">Route visualization</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Optimal route</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Alternative routes</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Traffic alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Route Optimization Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Fuel className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Fuel Optimization</h3>
          <p className="text-sm text-gray-600 mb-4">AI-powered fuel efficiency routing to minimize costs</p>
          <button className="btn-outline w-full">Optimize Fuel</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Time Optimization</h3>
          <p className="text-sm text-gray-600 mb-4">Real-time traffic analysis for fastest routes</p>
          <button className="btn-outline w-full">Optimize Time</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Cost Optimization</h3>
          <p className="text-sm text-gray-600 mb-4">Balance time, fuel, and tolls for best value</p>
          <button className="btn-outline w-full">Optimize Cost</button>
        </div>
      </div>

      {/* Weather & Traffic Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Traffic Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-600">!</span>
              </div>
              <div>
                <p className="font-medium text-yellow-900">Traffic Alert</p>
                <p className="text-sm text-yellow-700">Construction on I-10 near Indio, CA</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">☀</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">Weather Update</p>
                <p className="text-sm text-blue-700">Clear skies expected for entire route</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">✓</span>
              </div>
              <div>
                <p className="font-medium text-green-900">Rest Stops</p>
                <p className="text-sm text-green-700">3 truck stops available along route</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">⚡</span>
              </div>
              <div>
                <p className="font-medium text-purple-900">Fuel Prices</p>
                <p className="text-sm text-purple-700">Best prices at exit 234 - $3.45/gal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRoutePlanning;
