import { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
const ActiveSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY, USA',
      ipAddress: '192.168.1.100',
      lastActivity: '2024-01-15 14:30:00',
      status: 'active',
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY, USA',
      ipAddress: '192.168.1.101',
      lastActivity: '2024-01-15 13:45:00',
      status: 'active',
      isCurrent: false
    },
    {
      id: 3,
      device: 'Firefox on Mac',
      location: 'San Francisco, CA, USA',
      ipAddress: '203.0.113.45',
      lastActivity: '2024-01-15 10:20:00',
      status: 'idle',
      isCurrent: false
    },
    {
      id: 4,
      device: 'Chrome on Android',
      location: 'Unknown',
      ipAddress: '198.51.100.123',
      lastActivity: '2024-01-14 16:30:00',
      status: 'suspicious',
      isCurrent: false
    }
  ]);

  const handleTerminateSession = (sessionId: number) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleTerminateAllOtherSessions = () => {
    setSessions(prev => prev.filter(session => session.isCurrent));
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'active': return 'bg-green-100 text-green-800';
  //     case 'idle': return 'bg-yellow-100 text-yellow-800';
  //     case 'suspicious': return 'bg-red-100 text-red-800';
  //     default: return 'bg-gray-100 text-gray-800';
  //   }
  // };

  const getDeviceIcon = (device: string) => {
    if (device.includes('iPhone') || device.includes('Android')) return '📱';
    if (device.includes('Mac')) return '💻';
    if (device.includes('Windows')) return '🖥️';
    return '💻';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Sessions</h1>
          <p className="text-gray-600 mt-2">
            Manage your active login sessions across devices
          </p>
        </div>
        <Button
          variant="outline" 
          onClick={handleTerminateAllOtherSessions}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          Terminate All Other Sessions
        </Button>
      </div>
      
      <div className="grid gap-6">
        {/* Session Summary */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Session Summary
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Overview of your active sessions
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-green-600">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-blue-600">Active Sessions</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-yellow-600">Idle Sessions</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-red-600">Suspicious Sessions</div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Active Sessions List */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔐
              </div>
              Active Sessions
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your current and recent login sessions
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{getDeviceIcon(session.device)}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          {session.device}
                        </h4>
                        {session.isCurrent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            Current Session
                          </span>
                        )}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {session.location} • IP: {session.ipAddress}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last activity: {session.lastActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!session.isCurrent && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Security Recommendations */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                ⚠️
              </div>
              Security Recommendations
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Tips to keep your account secure
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Review Suspicious Sessions</h4>
                  <p className="text-sm text-gray-600">
                    Terminate any sessions from unknown devices or locations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Use Strong Passwords</h4>
                  <p className="text-sm text-gray-600">
                    Ensure your password is unique and difficult to guess
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default ActiveSessions;
