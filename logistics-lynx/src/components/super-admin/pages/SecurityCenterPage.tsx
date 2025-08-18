import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

// Security Center Components
import SecurityAuditPage from './security-center/SecurityAuditPage';
import AccessControlPage from './security-center/AccessControlPage';
import EncryptionPage from './security-center/EncryptionPage';
import FirewallPage from './security-center/FirewallPage';
import MfaSettingsPage from './security-center/MfaSettingsPage';
import IpWhitelistPage from './security-center/IpWhitelistPage';

const SecurityCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('audit');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/access')) setActiveTab('access');
    else if (path.includes('/encryption')) setActiveTab('encryption');
    else if (path.includes('/firewall')) setActiveTab('firewall');
    else if (path.includes('/mfa')) setActiveTab('mfa');
    else if (path.includes('/ip')) setActiveTab('ip');
    else setActiveTab('audit');
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-600 mt-1">Monitor and manage system security, access control, and threat protection</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-red-600 hover:bg-red-700">
            <span className="mr-2">🔒</span>
            Security Audit
          </Button>
          <Button variant="outline">
            <span className="mr-2">🛡️</span>
            Threat Monitor
          </Button>
        </div>
      </motion.div>

      {/* Security Overview */}
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
                <span className="text-green-600 text-lg">🛡️</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Security Score</p>
                <p className="text-lg font-semibold text-green-600">A+</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-lg">🔐</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">MFA Enabled</p>
                <p className="text-lg font-semibold text-blue-600">2,847</p>
                <p className="text-xs text-blue-600">Users protected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">🚨</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Threats</p>
                <p className="text-lg font-semibold text-orange-600">0</p>
                <p className="text-xs text-green-600">No threats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-lg">🔒</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Encryption</p>
                <p className="text-lg font-semibold text-purple-600">AES-256</p>
                <p className="text-xs text-purple-600">Military grade</p>
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
                <TabsTrigger value="audit" onClick={() => navigate('/super-admin/security/audit')}>
                  Security Audit
                </TabsTrigger>
                <TabsTrigger value="access" onClick={() => navigate('/super-admin/security/access')}>
                  Access Control
                </TabsTrigger>
                <TabsTrigger value="encryption" onClick={() => navigate('/super-admin/security/encryption')}>
                  Encryption
                </TabsTrigger>
                <TabsTrigger value="firewall" onClick={() => navigate('/super-admin/security/firewall')}>
                  Firewall
                </TabsTrigger>
                <TabsTrigger value="mfa" onClick={() => navigate('/super-admin/security/mfa')}>
                  MFA Settings
                </TabsTrigger>
                <TabsTrigger value="ip" onClick={() => navigate('/super-admin/security/ip')}>
                  IP Whitelist
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="p-6">
            <Routes>
              <Route path="/audit" element={<SecurityAuditPage />} />
              <Route path="/access" element={<AccessControlPage />} />
              <Route path="/encryption" element={<EncryptionPage />} />
              <Route path="/firewall" element={<FirewallPage />} />
              <Route path="/mfa" element={<MfaSettingsPage />} />
              <Route path="/ip" element={<IpWhitelistPage />} />
            </Routes>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SecurityCenterPage;
