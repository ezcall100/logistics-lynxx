import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Activity,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  Settings,
  RefreshCw,
  Download
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedTable,
  EnhancedSearch,
  EnhancedProgress,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface ActiveUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'idle' | 'offline' | 'away';
  lastActivity: string;
  sessionDuration: number;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  ip: string;
  userAgent: string;
  pageViews: number;
  actions: number;
  loginTime: string;
  timezone: string;
  role: string;
  department: string;
  company: string;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  page: string;
  timestamp: string;
  duration: number;
  device: string;
  location: string;
}

interface DeviceStats {
  device: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface LocationStats {
  location: string;
  count: number;
  percentage: number;
  country: string;
  flag: string;
}

const ActiveUsers: React.FC = () => {
  console.log('🚀 ActiveUsers component is rendering!');
  const [mode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([]);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const mockActiveUsers: ActiveUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      status: 'online',
      lastActivity: '2024-01-15 14:30:00',
      sessionDuration: 45,
      device: 'desktop',
      browser: 'Chrome 120.0',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      pageViews: 23,
      actions: 156,
      loginTime: '2024-01-15 13:45:00',
      timezone: 'America/Los_Angeles',
      role: 'admin',
      department: 'Engineering',
      company: 'Tech Corp'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      status: 'idle',
      lastActivity: '2024-01-15 14:25:00',
      sessionDuration: 120,
      device: 'mobile',
      browser: 'Safari 17.0',
      location: 'New York, NY',
      ip: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
      pageViews: 15,
      actions: 89,
      loginTime: '2024-01-15 12:25:00',
      timezone: 'America/New_York',
      role: 'user',
      department: 'Marketing',
      company: 'Tech Corp'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      status: 'online',
      lastActivity: '2024-01-15 14:32:00',
      sessionDuration: 30,
      device: 'tablet',
      browser: 'Firefox 121.0',
      location: 'Chicago, IL',
      ip: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0)',
      pageViews: 8,
      actions: 45,
      loginTime: '2024-01-15 14:02:00',
      timezone: 'America/Chicago',
      role: 'manager',
      department: 'Sales',
      company: 'Tech Corp'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      status: 'away',
      lastActivity: '2024-01-15 14:15:00',
      sessionDuration: 90,
      device: 'desktop',
      browser: 'Edge 120.0',
      location: 'Austin, TX',
      ip: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      pageViews: 12,
      actions: 67,
      loginTime: '2024-01-15 12:45:00',
      timezone: 'America/Chicago',
      role: 'user',
      department: 'HR',
      company: 'Tech Corp'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      status: 'online',
      lastActivity: '2024-01-15 14:35:00',
      sessionDuration: 15,
      device: 'mobile',
      browser: 'Chrome Mobile 120.0',
      location: 'Seattle, WA',
      ip: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Android 14; Mobile)',
      pageViews: 5,
      actions: 23,
      loginTime: '2024-01-15 14:20:00',
      timezone: 'America/Los_Angeles',
      role: 'admin',
      department: 'Finance',
      company: 'Tech Corp'
    }
  ];

  const mockUserActivities: UserActivity[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      action: 'Viewed User Management',
      page: '/admin/users',
      timestamp: '2024-01-15 14:30:00',
      duration: 120,
      device: 'desktop',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Updated Profile',
      page: '/profile',
      timestamp: '2024-01-15 14:25:00',
      duration: 45,
      device: 'mobile',
      location: 'New York, NY'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      action: 'Generated Report',
      page: '/analytics/reports',
      timestamp: '2024-01-15 14:32:00',
      duration: 180,
      device: 'tablet',
      location: 'Chicago, IL'
    }
  ];

  const mockDeviceStats: DeviceStats[] = [
    {
      device: 'Desktop',
      count: 2,
      percentage: 40,
      trend: 'up'
    },
    {
      device: 'Mobile',
      count: 2,
      percentage: 40,
      trend: 'stable'
    },
    {
      device: 'Tablet',
      count: 1,
      percentage: 20,
      trend: 'down'
    }
  ];

  const mockLocationStats: LocationStats[] = [
    {
      location: 'San Francisco',
      count: 1,
      percentage: 20,
      country: 'US',
      flag: '🇺🇸'
    },
    {
      location: 'New York',
      count: 1,
      percentage: 20,
      country: 'US',
      flag: '🇺🇸'
    },
    {
      location: 'Chicago',
      count: 1,
      percentage: 20,
      country: 'US',
      flag: '🇺🇸'
    },
    {
      location: 'Austin',
      count: 1,
      percentage: 20,
      country: 'US',
      flag: '🇺🇸'
    },
    {
      location: 'Seattle',
      count: 1,
      percentage: 20,
      country: 'US',
      flag: '🇺🇸'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActiveUsers(mockActiveUsers);
      setUserActivities(mockUserActivities);
      setDeviceStats(mockDeviceStats);
      setLocationStats(mockLocationStats);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <EnhancedBadge variant="success" mode={mode}>Online</EnhancedBadge>;
      case 'idle':
        return <EnhancedBadge variant="warning" mode={mode}>Idle</EnhancedBadge>;
      case 'away':
        return <EnhancedBadge variant="default" mode={mode}>Away</EnhancedBadge>;
      case 'offline':
        return <EnhancedBadge variant="danger" mode={mode}>Offline</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Smartphone className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const activeUserColumns = [
    {
      key: 'name',
      title: 'User',
      sortable: true,
      render: (_: any, row: ActiveUser) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {row.avatar ? (
              <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
            ) : (
              row.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
              {row.name}
            </div>
            <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
              {row.email}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (_: any) => getStatusBadge(_)
    },
    {
      key: 'device',
      title: 'Device',
      sortable: true,
      render: (_: any, row: ActiveUser) => (
        <div className="flex items-center space-x-2">
          {getDeviceIcon(row.device)}
          <span className={`text-sm ${stableStyles.textPrimary[mode]}`}>
            {row.browser}
          </span>
        </div>
      )
    },
    {
      key: 'location',
      title: 'Location',
      sortable: true,
      render: (_: any, row: ActiveUser) => (
        <div>
          <div className={`text-sm ${stableStyles.textPrimary[mode]}`}>
            {row.location}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.ip}
          </div>
        </div>
      )
    },
    {
      key: 'sessionDuration',
      title: 'Session',
      sortable: true,
      render: (_: any, row: ActiveUser) => (
        <div>
          <div className={`text-sm ${stableStyles.textPrimary[mode]}`}>
            {formatDuration(row.sessionDuration)}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.pageViews} pages
          </div>
        </div>
      )
    },
    {
      key: 'lastActivity',
      title: 'Last Activity',
      sortable: true,
      render: (_: any) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(_).toLocaleTimeString()}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any) => (
        <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
          >
            View
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Settings className="w-4 h-4" />}
            mode={mode}
          >
            Settings
          </EnhancedButton>
        </div>
      )
    }
  ];

  const activityColumns = [
    {
      key: 'userName',
      title: 'User',
      sortable: true,
      render: (_: any, row: UserActivity) => (
        <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
          {row.userName}
        </div>
      )
    },
    {
      key: 'action',
      title: 'Action',
      sortable: true,
      render: (_: any, row: UserActivity) => (
        <div>
          <div className={`text-sm ${stableStyles.textPrimary[mode]}`}>
            {row.action}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.page}
          </div>
        </div>
      )
    },
    {
      key: 'device',
      title: 'Device',
      sortable: true,
      render: (_: any, row: UserActivity) => (
        <div className="flex items-center space-x-2">
          {getDeviceIcon(row.device)}
          <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>
            {row.device}
          </span>
        </div>
      )
    },
    {
      key: 'duration',
      title: 'Duration',
      sortable: true,
      render: (_: any, row: UserActivity) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {formatDuration(row.duration)}
        </div>
      )
    },
    {
      key: 'timestamp',
      title: 'Time',
      sortable: true,
      render: (_: any) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(_).toLocaleTimeString()}
        </div>
      )
    }
  ];

  const metrics = {
    totalActive: activeUsers.length,
    onlineUsers: activeUsers.filter(u => u.status === 'online').length,
    idleUsers: activeUsers.filter(u => u.status === 'idle').length,
    awayUsers: activeUsers.filter(u => u.status === 'away').length,
    totalSessions: activeUsers.reduce((sum, user) => sum + user.pageViews, 0),
    totalActions: activeUsers.reduce((sum, user) => sum + user.actions, 0),
    avgSessionDuration: Math.round(activeUsers.reduce((sum, user) => sum + user.sessionDuration, 0) / activeUsers.length)
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              Active Users
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Real-time monitoring of user activity and sessions
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Data
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              mode={mode}
            >
              Refresh
            </EnhancedButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Total Active Users
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalActive}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.totalActive / 100) * 100}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Online Users
                </p>
                <p className={`text-2xl font-bold text-green-600`}>
                  {metrics.onlineUsers}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.onlineUsers / metrics.totalActive) * 100}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Total Sessions
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalSessions}
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.totalSessions / 200) * 100}
                max={100}
                mode={mode}
                variant="default"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Avg Session Duration
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {formatDuration(metrics.avgSessionDuration)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(metrics.avgSessionDuration / 120) * 100}
                max={100}
                mode={mode}
                variant="warning"
              />
            </div>
          </EnhancedCard>
        </div>

        {/* Device and Location Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Statistics */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Device Distribution
              </h3>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<BarChart3 className="w-4 h-4" />}
                mode={mode}
              >
                View Details
              </EnhancedButton>
            </div>
            <div className="space-y-4">
              {deviceStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getDeviceIcon(stat.device.toLowerCase())}
                    <div>
                      <p className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        {stat.device}
                      </p>
                      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                        {stat.count} users
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      {stat.percentage}%
                    </span>
                    {getTrendIcon(stat.trend)}
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          {/* Location Statistics */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Geographic Distribution
              </h3>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Globe className="w-4 h-4" />}
                mode={mode}
              >
                View Map
              </EnhancedButton>
            </div>
            <div className="space-y-4">
              {locationStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{stat.flag}</span>
                    <div>
                      <p className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        {stat.location}
                      </p>
                      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                        {stat.count} users
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                    {stat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </EnhancedCard>
        </div>

        {/* Active Users Table */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              Currently Active Users
            </h3>
            <div className="flex space-x-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="idle">Idle</option>
                <option value="away">Away</option>
              </select>
              <EnhancedSearch
                placeholder="Search users..."
                value={searchQuery}
                onChange={setSearchQuery}
                mode={mode}
              />
            </div>
          </div>

          <EnhancedTable
            columns={activeUserColumns}
            data={activeUsers}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No active users found"
          />
        </EnhancedCard>

        {/* Recent Activity */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              Recent User Activity
            </h3>
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Activity className="w-4 h-4" />}
              mode={mode}
            >
              View All
            </EnhancedButton>
          </div>

          <EnhancedTable
            columns={activityColumns}
            data={userActivities}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No recent activity found"
          />
        </EnhancedCard>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<UserPlus className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Add User</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<UserMinus className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Remove User</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<UserCheck className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Verify Users</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<UserX className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Block User</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Export Data</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Settings</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default ActiveUsers;
