import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  Truck,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  distance: string;
  time: string;
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
      distance: '425 miles',
      time: '6h 15m',
      fuelCost: 195,
      tolls: 12.50,
      totalCost: 207.50,
      efficiency: 95,
      traffic: 'low',
      weather: 'clear'
    },
    {
      id: '2',
      name: 'Fastest Route',
      distance: '410 miles',
      time: '5h 45m',
      fuelCost: 220,
      tolls: 25.00,
      totalCost: 245.00,
      efficiency: 88,
      traffic: 'medium',
      weather: 'clear'
    },
    {
      id: '3',
      name: 'Most Economical',
      distance: '450 miles',
      time: '7h 00m',
      fuelCost: 175,
      tolls: 5.00,
      totalCost: 180.00,
      efficiency: 92,
      traffic: 'low',
      weather: 'rain'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(routeOptions[0]);

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'clear': return <CheckCircle className="w-4 h-4" />;
      case 'rain': return <AlertTriangle className="w-4 h-4" />;
      case 'snow': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

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
            <Navigation className="w-4 h-4" />
            Recalculate
          </button>
        </div>
      </div>

      {/* Current Trip Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Trip Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Origin</p>
                <p className="font-medium text-gray-900">Los Angeles, CA</p>
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
                <p className="font-medium text-gray-900">Phoenix, AZ</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-medium text-gray-900">Today 6:00 PM</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Load Type</p>
                <p className="font-medium text-gray-900">Dry Van</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Route Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Route Options</h3>
        <div className="space-y-4">
          {routeOptions.map((route) => (
            <div 
              key={route.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedRoute.id === route.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedRoute.id === route.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    {selectedRoute.id === route.id && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <h4 className="font-medium text-gray-900">{route.name}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrafficColor(route.traffic)}`}>
                    {route.traffic} traffic
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${route.totalCost}</div>
                  <p className="text-sm text-gray-600">Total cost</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-medium text-gray-900">{route.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium text-gray-900">{route.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fuel Cost</p>
                  <p className="font-medium text-gray-900">${route.fuelCost}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Efficiency</p>
                  <p className="font-medium text-gray-900">{route.efficiency}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Route Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Route Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Distance</span>
              <span className="font-medium text-gray-900">{selectedRoute.distance}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Estimated Time</span>
              <span className="font-medium text-gray-900">{selectedRoute.time}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Fuel Cost</span>
              <span className="font-medium text-gray-900">${selectedRoute.fuelCost}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tolls</span>
              <span className="font-medium text-gray-900">${selectedRoute.tolls}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Route Efficiency</span>
              <span className="font-medium text-gray-900">{selectedRoute.efficiency}%</span>
            </div>
          </div>
          <div>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Route map will be displayed here</p>
                <p className="text-sm text-gray-500">Interactive route visualization</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getWeatherIcon(selectedRoute.weather)}
                <span className="text-sm text-gray-600 capitalize">{selectedRoute.weather} weather</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">{selectedRoute.efficiency}% efficient</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Cost Optimization</h3>
          <p className="text-sm text-gray-600 mb-4">Minimize fuel and toll costs</p>
          <button className="btn-outline w-full">Optimize Costs</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Time Optimization</h3>
          <p className="text-sm text-gray-600 mb-4">Fastest route with traffic consideration</p>
          <button className="btn-outline w-full">Optimize Time</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Efficiency Mode</h3>
          <p className="text-sm text-gray-600 mb-4">Balance time and cost efficiency</p>
          <button className="btn-outline w-full">Optimize Efficiency</button>
        </div>
      </div>

      {/* Weather & Traffic Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Traffic Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Traffic Alert</p>
              <p className="text-sm text-yellow-700">Construction on I-10 near Indio - 15 min delay expected</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Weather Alert</p>
              <p className="text-sm text-blue-700">Light rain expected near Palm Springs - reduce speed</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Good News</p>
              <p className="text-sm text-green-700">Clear traffic conditions on selected route</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRoutePlanning;
