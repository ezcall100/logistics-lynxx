import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Calendar,
  TrendingUp,
  Download
} from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime?: string;
  totalHours: number;
  status: 'active' | 'completed' | 'break';
  type: 'driving' | 'on-duty' | 'off-duty' | 'break';
}

const TimeTracking: React.FC = () => {
  const [timeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      date: '2024-01-20',
      startTime: '06:00',
      endTime: '14:00',
      totalHours: 8,
      status: 'completed',
      type: 'driving'
    },
    {
      id: '2',
      date: '2024-01-20',
      startTime: '14:00',
      endTime: '15:00',
      totalHours: 1,
      status: 'completed',
      type: 'break'
    },
    {
      id: '3',
      date: '2024-01-20',
      startTime: '15:00',
      status: 'active',
      type: 'driving',
      totalHours: 0
    }
  ]);

  const [isTracking, setIsTracking] = useState(true);
  const [currentTime, setCurrentTime] = useState('15:30');

  const totalDrivingHours = timeEntries
    .filter(entry => entry.type === 'driving')
    .reduce((acc, entry) => acc + entry.totalHours, 0);

  const remainingHours = 11 - totalDrivingHours;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600">Track your hours of service and compliance</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Log
        </button>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Time</p>
              <p className="text-2xl font-bold text-gray-900">{currentTime}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Driving Hours</p>
              <p className="text-2xl font-bold text-gray-900">{totalDrivingHours}h</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-orange-600">{remainingHours}h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Time Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Controls</h3>
        <div className="flex gap-4">
          <button 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              isTracking 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            onClick={() => setIsTracking(!isTracking)}
          >
            {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isTracking ? 'Pause' : 'Start'}
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Square className="w-4 h-4" />
            End Shift
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Take Break
          </button>
        </div>
      </div>

      {/* Time Log */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Today's Time Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {entry.startTime} - {entry.endTime || 'Active'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.type === 'driving' ? 'text-blue-600 bg-blue-50' :
                      entry.type === 'break' ? 'text-orange-600 bg-orange-50' :
                      'text-gray-600 bg-gray-50'
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.totalHours}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.status === 'active' ? 'text-green-600 bg-green-50' :
                      entry.status === 'completed' ? 'text-gray-600 bg-gray-50' :
                      'text-orange-600 bg-orange-50'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Daily Driving Limit</span>
              <span className="text-sm font-medium text-gray-900">11 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Weekly Driving Limit</span>
              <span className="text-sm font-medium text-gray-900">60 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Required Break</span>
              <span className="text-sm font-medium text-gray-900">30 min / 8 hours</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Today's Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Driving Time</span>
                  <span className="text-sm font-medium text-gray-900">{totalDrivingHours}/11 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(totalDrivingHours / 11) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Break Time</span>
                  <span className="text-sm font-medium text-gray-900">1/1 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
