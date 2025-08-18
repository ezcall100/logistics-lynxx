import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

// User Management Components
import AllUsersPage from './user-management/AllUsersPage';
import ActiveUsersPage from './user-management/ActiveUsersPage';
import PendingUsersPage from './user-management/PendingUsersPage';
import SuspendedUsersPage from './user-management/SuspendedUsersPage';
import RoleManagementPage from './user-management/RoleManagementPage';
import PermissionsPage from './user-management/PermissionsPage';
import UserGroupsPage from './user-management/UserGroupsPage';

const UserManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all-users');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/active')) setActiveTab('active-users');
    else if (path.includes('/pending')) setActiveTab('pending-users');
    else if (path.includes('/suspended')) setActiveTab('suspended-users');
    else if (path.includes('/roles')) setActiveTab('roles');
    else if (path.includes('/permissions')) setActiveTab('permissions');
    else if (path.includes('/groups')) setActiveTab('user-groups');
    else setActiveTab('all-users');
  }, [location.pathname]);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, permissions, and access control</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <span className="mr-2">➕</span>
            Add User
          </Button>
          <Button variant="outline">
            <span className="mr-2">📊</span>
            Export
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Users</p>
                <p className="text-lg font-semibold text-green-600">2,847</p>
                <p className="text-xs text-green-600">+5.2% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-lg">⏳</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Pending Approval</p>
                <p className="text-lg font-semibold text-yellow-600">23</p>
                <p className="text-xs text-yellow-600">Requires action</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-red-600 text-lg">❌</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Suspended</p>
                <p className="text-lg font-semibold text-red-600">5</p>
                <p className="text-xs text-red-600">Security issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">👑</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Roles</p>
                <p className="text-lg font-semibold text-blue-600">12</p>
                <p className="text-xs text-blue-600">Custom roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <div className="px-6 py-4">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all-users" onClick={() => navigate('/super-admin/users')}>
                  All Users
                </TabsTrigger>
                <TabsTrigger value="active-users" onClick={() => navigate('/super-admin/users/active')}>
                  Active
                </TabsTrigger>
                <TabsTrigger value="pending-users" onClick={() => navigate('/super-admin/users/pending')}>
                  Pending
                </TabsTrigger>
                <TabsTrigger value="suspended-users" onClick={() => navigate('/super-admin/users/suspended')}>
                  Suspended
                </TabsTrigger>
                <TabsTrigger value="roles" onClick={() => navigate('/super-admin/roles')}>
                  Roles
                </TabsTrigger>
                <TabsTrigger value="permissions" onClick={() => navigate('/super-admin/permissions')}>
                  Permissions
                </TabsTrigger>
                <TabsTrigger value="user-groups" onClick={() => navigate('/super-admin/groups')}>
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="p-6">
            <Routes>
              <Route path="/" element={<AllUsersPage />} />
              <Route path="/active" element={<ActiveUsersPage />} />
              <Route path="/pending" element={<PendingUsersPage />} />
              <Route path="/suspended" element={<SuspendedUsersPage />} />
              <Route path="/roles" element={<RoleManagementPage />} />
              <Route path="/permissions" element={<PermissionsPage />} />
              <Route path="/groups" element={<UserGroupsPage />} />
            </Routes>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default UserManagementPage;
