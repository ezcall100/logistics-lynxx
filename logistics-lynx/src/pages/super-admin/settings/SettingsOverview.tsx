import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Settings, 
  User, 
  Shield, 
  Palette, 
  Bell, 
  Globe, 
  Database, 
  Mail, 
  Lock, 
  Eye, 
  Keyboard,
  Monitor,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SettingsOverviewProps {}

const SettingsOverview: React.FC<SettingsOverviewProps> = () => {
  const settingsCategories = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your personal information, security settings, and preferences.',
      icon: User,
      path: '/super-admin/settings/profile',
      features: [
        'Personal Information',
        'Password Management',
        'Profile Picture',
        'Account Status',
        'Notification Preferences'
      ],
      status: 'active',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'system',
      title: 'System Settings',
      description: 'Configure system-wide settings, security policies, and application preferences.',
      icon: Settings,
      path: '/super-admin/settings/system',
      features: [
        'General Configuration',
        'Security Policies',
        'Email Settings',
        'Performance Options',
        'Appearance Settings'
      ],
      status: 'active',
      lastUpdated: '1 day ago'
    },
    {
      id: 'preferences',
      title: 'User Preferences',
      description: 'Customize your personal settings, appearance, and preferences.',
      icon: Palette,
      path: '/super-admin/settings/preferences',
      features: [
        'Theme & Appearance',
        'Notification Settings',
        'Privacy Controls',
        'Accessibility Options',
        'Language & Region'
      ],
      status: 'active',
      lastUpdated: '3 hours ago'
    }
  ];

  const quickActions = [
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: Lock,
      action: () => window.location.href = '/super-admin/settings/profile'
    },
    {
      title: 'Update Profile',
      description: 'Edit your personal information',
      icon: User,
      action: () => window.location.href = '/super-admin/settings/profile'
    },
    {
      title: 'Notification Settings',
      description: 'Configure notification preferences',
      icon: Bell,
      action: () => window.location.href = '/super-admin/settings/preferences'
    },
    {
      title: 'Theme Settings',
      description: 'Customize appearance and theme',
      icon: Palette,
      action: () => window.location.href = '/super-admin/settings/preferences'
    }
  ];

  const recentChanges = [
    {
      setting: 'Password Policy',
      category: 'System Settings',
      change: 'Updated minimum password length to 12 characters',
      timestamp: '2 hours ago',
      user: 'Super Admin'
    },
    {
      setting: 'Email Notifications',
      category: 'User Preferences',
      change: 'Enabled push notifications for security alerts',
      timestamp: '4 hours ago',
      user: 'Super Admin'
    },
    {
      setting: 'Theme',
      category: 'User Preferences',
      change: 'Switched to dark mode',
      timestamp: '1 day ago',
      user: 'Super Admin'
    },
    {
      setting: 'Session Timeout',
      category: 'System Settings',
      change: 'Increased session timeout to 60 minutes',
      timestamp: '2 days ago',
      user: 'Super Admin'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Settings Overview
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your settings and preferences in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common settings you might want to access quickly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(category.status)}>
                    {category.status}
                  </Badge>
                </div>
                <CardDescription>
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Features:
                  </h4>
                  <ul className="space-y-1">
                    {category.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Last updated: {category.lastUpdated}
                  </span>
                  <Link to={category.path}>
                    <Button size="sm" className="flex items-center space-x-1">
                      <span>Configure</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>Recent Changes</span>
          </CardTitle>
          <CardDescription>
            Track recent modifications to settings and configurations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentChanges.map((change, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {change.setting}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {change.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {change.change}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>By {change.user}</span>
                    <span>{change.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Settings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configured</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">142</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">14</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Backup</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsOverview;
