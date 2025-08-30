import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Fuel, 
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface DriverStats {
  currentTrip: string;
  totalMiles: number;
  hoursDriven: number;
  earnings: number;
  fuelLevel: number;
  nextStop: string;
  eta: string;
}

const DriverDashboard: React.FC = () => {
  const [driverStats] = useState<DriverStats>({
    currentTrip: 'LA to Phoenix',
    totalMiles: 1250,
    hoursDriven: 8.5,
    earnings: 450.00,
    fuelLevel: 75,
    nextStop: 'Phoenix, AZ',
    eta: '2 hours'
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
          <p className="text-gray-600">Welcome back, John Smith</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-green-600 bg-green-50">
            Active
          </span>
        </div>
      </div>

      {/* Current Trip Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Trip</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Trip</p>
              <p className="font-medium text-gray-900">{driverStats.currentTrip}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Stop</p>
              <p className="font-medium text-gray-900">{driverStats.nextStop}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ETA</p>
              <p className="font-medium text-gray-900">{driverStats.eta}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Miles</p>
              <p className="text-2xl font-bold text-gray-900">{driverStats.totalMiles.toLocaleString()}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours Driven</p>
              <p className="text-2xl font-bold text-gray-900">{driverStats.hoursDriven}h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${driverStats.earnings.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fuel Level</p>
              <p className="text-2xl font-bold text-gray-900">{driverStats.fuelLevel}%</p>
            </div>
            <Fuel className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Safety Score</span>
                <span className="text-sm font-medium text-gray-900">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">On-Time Delivery</span>
                <span className="text-sm font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Fuel Efficiency</span>
                <span className="text-sm font-medium text-gray-900">8.2 mpg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Perfect Safety Record</p>
                <p className="text-sm text-green-700">30 days without incidents</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Efficiency Improvement</p>
                <p className="text-sm text-blue-700">15% better fuel economy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">On-Time Streak</p>
                <p className="text-sm text-purple-700">25 consecutive on-time deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            View Route
          </button>
          <button className="btn-outline flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Log Hours
          </button>
          <button className="btn-outline flex items-center justify-center gap-2">
            <Truck className="w-4 h-4" />
            Vehicle Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
