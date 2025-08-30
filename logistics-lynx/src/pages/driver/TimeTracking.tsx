import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'driving' | 'on-duty' | 'off-duty' | 'sleeper';
  location: string;
}

const TimeTracking: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'driving' | 'on-duty' | 'off-duty' | 'sleeper'>('off-duty');
  const [timeEntries] = useState<TimeEntry[]>([
    {
      id: '1',
      date: '2024-01-20',
      startTime: '06:00',
      endTime: '11:00',
      duration: '5h 0m',
      status: 'driving',
      location: 'Los Angeles, CA'
    },
    {
      id: '2',
      date: '2024-01-20',
      startTime: '11:00',
      endTime: '11:30',
      duration: '0h 30m',
      status: 'on-duty',
      location: 'Rest Stop, CA'
    },
    {
      id: '3',
      date: '2024-01-20',
      startTime: '11:30',
      endTime: '16:30',
      duration: '5h 0m',
      status: 'driving',
      location: 'Phoenix, AZ'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'driving': return 'text-red-600 bg-red-50';
      case 'on-duty': return 'text-yellow-600 bg-yellow-50';
      case 'off-duty': return 'text-green-600 bg-green-50';
      case 'sleeper': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'driving': return <Play className="w-4 h-4" />;
      case 'on-duty': return <Clock className="w-4 h-4" />;
      case 'off-duty': return <Square className="w-4 h-4" />;
      case 'sleeper': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600">Hours of Service (HOS) compliance tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              currentStatus === 'driving' ? 'bg-red-100' :
              currentStatus === 'on-duty' ? 'bg-yellow-100' :
              currentStatus === 'off-duty' ? 'bg-green-100' :
              'bg-blue-100'
            }`}>
              {getStatusIcon(currentStatus)}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 capitalize">{currentStatus.replace('-', ' ')}</h4>
              <p className="text-gray-600">Started at 6:00 AM today</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">8h 30m</div>
            <p className="text-sm text-gray-600">Total time today</p>
          </div>
        </div>
      </div>

      {/* Time Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Controls</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setCurrentStatus('driving')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              currentStatus === 'driving' 
                ? 'border-red-500 bg-red-50 text-red-700' 
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5" />
              <span className="font-medium">Driving</span>
            </div>
            <p className="text-sm text-gray-600">Behind the wheel</p>
          </button>
          <button 
            onClick={() => setCurrentStatus('on-duty')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              currentStatus === 'on-duty' 
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700' 
                : 'border-gray-200 hover:border-yellow-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">On Duty</span>
            </div>
            <p className="text-sm text-gray-600">Working but not driving</p>
          </button>
          <button 
            onClick={() => setCurrentStatus('sleeper')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              currentStatus === 'sleeper' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Sleeper</span>
            </div>
            <p className="text-sm text-gray-600">In sleeper berth</p>
          </button>
          <button 
            onClick={() => setCurrentStatus('off-duty')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              currentStatus === 'off-duty' 
                ? 'border-green-500 bg-green-50 text-green-700' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Square className="w-5 h-5" />
              <span className="font-medium">Off Duty</span>
            </div>
            <p className="text-sm text-gray-600">Personal time</p>
          </button>
        </div>
      </div>

      {/* Today's Time Log */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Time Log</h3>
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  entry.status === 'driving' ? 'bg-red-100' :
                  entry.status === 'on-duty' ? 'bg-yellow-100' :
                  entry.status === 'off-duty' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  {getStatusIcon(entry.status)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">{entry.status.replace('-', ' ')}</h4>
                  <p className="text-sm text-gray-600">{entry.startTime} - {entry.endTime}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{entry.duration}</div>
                <p className="text-sm text-gray-600">{entry.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Driving Time</h4>
            </div>
            <div className="text-2xl font-bold text-green-900">10h 0m</div>
            <p className="text-sm text-green-700">2h remaining today</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-900">On-Duty Time</h4>
            </div>
            <div className="text-2xl font-bold text-yellow-900">12h 30m</div>
            <p className="text-sm text-yellow-700">1h 30m remaining</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Rest Required</h4>
            </div>
            <div className="text-2xl font-bold text-blue-900">10h 0m</div>
            <p className="text-sm text-blue-700">Complete by 8:00 PM</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HOS Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Driving Time Warning</p>
              <p className="text-sm text-yellow-700">You have 2 hours of driving time remaining today</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Compliance Status</p>
              <p className="text-sm text-green-700">You are currently compliant with HOS regulations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
