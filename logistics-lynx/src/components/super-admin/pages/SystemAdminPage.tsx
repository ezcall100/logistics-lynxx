import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

// System Admin Components
import DatabaseManagementPage from './system-admin/DatabaseManagementPage';
import ApiManagementPage from './system-admin/ApiManagementPage';
import NetworkSettingsPage from './system-admin/NetworkSettingsPage';
import FileManagementPage from './system-admin/FileManagementPage';
import BackupRestorePage from './system-admin/BackupRestorePage';
import SystemUpdatesPage from './system-admin/SystemUpdatesPage';

const SystemAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('database');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/api')) setActiveTab('api');
    else if (path.includes('/network')) setActiveTab('network');
    else if (path.includes('/files')) setActiveTab('files');
    else if (path.includes('/backup')) setActiveTab('backup');
    else if (path.includes('/updates')) setActiveTab('updates');
    else setActiveTab('database');
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">System Administration</h1>
          <p className="text-gray-600 mt-1">Manage database, API, network, and system configurations</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <span className="mr-2">🔄</span>
            System Health Check
          </Button>
          <Button variant="outline">
            <span className="mr-2">📊</span>
            Performance
          </Button>
        </div>
      </motion.div>

      {/* System Health Overview */}
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
                <span className="text-green-600 text-lg">🗄️</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Database</p>
                <p className="text-lg font-semibold text-green-600">Online</p>
                <p className="text-xs text-green-600">99.9% uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">🔌</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">API Services</p>
                <p className="text-lg font-semibold text-blue-600">Healthy</p>
                <p className="text-xs text-blue-600">15,420 requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">🌍</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Network</p>
                <p className="text-lg font-semibold text-purple-600">Stable</p>
                <p className="text-xs text-purple-600">1.2ms latency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">💾</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Storage</p>
                <p className="text-lg font-semibold text-orange-600">75%</p>
                <p className="text-xs text-orange-600">750GB used</p>
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
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="database" onClick={() => navigate('/super-admin/system/database')}>
                  Database
                </TabsTrigger>
                <TabsTrigger value="api" onClick={() => navigate('/super-admin/system/api')}>
                  API
                </TabsTrigger>
                <TabsTrigger value="network" onClick={() => navigate('/super-admin/system/network')}>
                  Network
                </TabsTrigger>
                <TabsTrigger value="files" onClick={() => navigate('/super-admin/system/files')}>
                  Files
                </TabsTrigger>
                <TabsTrigger value="backup" onClick={() => navigate('/super-admin/system/backup')}>
                  Backup
                </TabsTrigger>
                <TabsTrigger value="updates" onClick={() => navigate('/super-admin/system/updates')}>
                  Updates
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="p-6">
            <Routes>
              <Route path="/database" element={<DatabaseManagementPage />} />
              <Route path="/api" element={<ApiManagementPage />} />
              <Route path="/network" element={<NetworkSettingsPage />} />
              <Route path="/files" element={<FileManagementPage />} />
              <Route path="/backup" element={<BackupRestorePage />} />
              <Route path="/updates" element={<SystemUpdatesPage />} />
            </Routes>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SystemAdminPage;
