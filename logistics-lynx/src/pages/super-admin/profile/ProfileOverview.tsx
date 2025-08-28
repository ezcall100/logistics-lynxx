import React, { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';

const ProfileOverview: React.FC = () => {
  const [profile] = useState({
    name: 'John Doe',
    email: 'john.doe@tms-enterprise.com',
    role: 'Super Admin',
    department: 'IT Management',
    location: 'New York, NY',
    phone: '+1 (555); 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'Active',
    lastLogin: '2024-01-15 14:30:00',
    joinDate: '2023-01-15'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile changes
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Overview</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
              <Button onClick={handleEdit}>
                Edit Profile
              </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Profile Header */}
        <ResponsiveCard>
          <div className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{profile.role}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {profile.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-sm font-medium">{profile.lastLogin}</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Personal Information */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👤
              </div>
              Personal Information
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your basic account information and contact details
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900 mt-1">{profile.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <p className="text-gray-900 mt-1">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="text-gray-900 mt-1">{profile.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900 mt-1">{profile.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900 mt-1">{profile.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <p className="text-gray-900 mt-1">{profile.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Account Security */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Account Security
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account security settings and authentication
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                  <Button>
                Enable 2FA
              </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                </div>
                  <Button>
                Change Password
              </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Active Sessions</h4>
                  <p className="text-sm text-gray-600">3 active sessions across devices</p>
                </div>
                  <Button>
                View Sessions
              </Button>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Preferences */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Preferences
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Customize your account preferences and settings
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-gray-600">English (US)</p>
                </div>
                  <Button>Chang
              e</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Time Zone</h4>
                  <p className="text-sm text-gray-600">Eastern Time (ET)</p>
                </div>
                  <Button>Chang
              e</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-gray-600">Email and push notifications enabled</p>
                </div>
                  <Button>Configur
              e</Button>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default ProfileOverview;
