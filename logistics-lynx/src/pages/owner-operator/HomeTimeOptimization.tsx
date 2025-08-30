import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Clock, 
  MapPin, 
  Truck,
  Plus,
  Edit,
  Trash2,
  Download
} from 'lucide-react';

interface HomeTimeSchedule {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  location: string;
  status: 'scheduled' | 'active' | 'completed';
  notes: string;
}

const HomeTimeOptimization: React.FC = () => {
  const [schedules] = useState<HomeTimeSchedule[]>([
    {
      id: '1',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      duration: 2.5,
      location: 'Phoenix, AZ',
      status: 'scheduled',
      notes: 'Family event - important'
    },
    {
      id: '2',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      duration: 2,
      location: 'Phoenix, AZ',
      status: 'scheduled',
      notes: 'Regular home time'
    }
  ]);

  const [availableHomeTime] = useState(2.5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home Time Optimization</h1>
          <p className="text-gray-600">Plan and manage your home time efficiently</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Schedule
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Home Time
          </button>
        </div>
      </div>

      {/* Home Time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600">Available</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{availableHomeTime} days</h3>
          <p className="text-gray-600">Home Time Available</p>
          <p className="text-sm text-blue-600 mt-1">Next scheduled: Jan 25</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-semibold text-green-600">Scheduled</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{schedules.length}</h3>
          <p className="text-gray-600">Upcoming Trips</p>
          <p className="text-sm text-green-600 mt-1">4.5 days total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-purple-600">Efficiency</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">85%</h3>
          <p className="text-gray-600">Home Time Utilization</p>
          <p className="text-sm text-green-600 mt-1">+5% vs last month</p>
        </div>
      </div>

      {/* Current Location & Next Home Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Current Location</p>
                <p className="text-sm text-blue-700">Las Vegas, NV</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Current Load</p>
                <p className="text-sm text-green-700">Load #1043 - Las Vegas → Salt Lake City</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Time to Home</p>
                <p className="text-sm text-purple-700">3 days, 12 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Home Time</h3>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-900">January 25-27, 2024</h4>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-blue-600 bg-blue-100">
                Scheduled
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">2.5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">Phoenix, AZ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Notes:</span>
                <span className="font-medium">Family event - important</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-outline flex items-center gap-2 text-sm">
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button className="btn-outline flex items-center gap-2 text-sm">
                <Trash2 className="w-3 h-3" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Home Time Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Home Time Schedule</h3>
          <button className="btn-outline flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Schedule
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date Range</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Notes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(schedule.startDate).toLocaleDateString()} - {new Date(schedule.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(schedule.startDate).toLocaleDateString('en-US', { weekday: 'short' })} - {new Date(schedule.endDate).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{schedule.duration} days</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{schedule.location}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      schedule.status === 'scheduled' ? 'text-blue-600 bg-blue-50' :
                      schedule.status === 'active' ? 'text-green-600 bg-green-50' :
                      'text-gray-600 bg-gray-50'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600">{schedule.notes}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Home Time Optimization Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">Plan Ahead</p>
                <p className="text-sm text-blue-700">Schedule home time at least 2 weeks in advance to ensure availability</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <div>
                <p className="font-medium text-green-900">Coordinate Routes</p>
                <p className="text-sm text-green-700">Plan loads that end near your home location</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-purple-600">3</span>
              </div>
              <div>
                <p className="font-medium text-purple-900">Flexible Scheduling</p>
                <p className="text-sm text-purple-700">Be flexible with dates to maximize home time opportunities</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-orange-600">4</span>
              </div>
              <div>
                <p className="font-medium text-orange-900">Communication</p>
                <p className="text-sm text-orange-700">Keep dispatch informed of your home time preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTimeOptimization;
