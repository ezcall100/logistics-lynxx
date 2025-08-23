import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Activity, Settings, Brain, Server, Menu, Plus, Zap, AlertTriangle, Settings2, Users2, BarChart3 } from 'lucide-react';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminFAB from './SuperAdminFAB';

export default function EnhancedSuperAdminPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Check if we're on a specific route or the main dashboard
  const isOnSpecificRoute = location.pathname !== '/super-admin' && 
                           !location.pathname.endsWith('/super-admin') &&
                           location.pathname !== '/super-admin/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <SuperAdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : ''}`}>
          {/* Header */}
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    👑 Super Admin Portal
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Central command center for system management
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  System Online
                </Badge>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto">
            {isOnSpecificRoute ? (
              // Render nested routes
              <Outlet />
            ) : (
              // Render main dashboard
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Welcome to Super Admin Dashboard
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300">
                    Manage your entire TMS ecosystem from this central command center
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <CardTitle>System Administration</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Manage system settings, configuration, and core infrastructure
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Access System Admin
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <CardTitle>User Management</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Manage users, roles, permissions, and access control
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Manage Users
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <CardTitle>System Analytics</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        System-wide performance metrics and usage analytics
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-orange-600" />
                        <CardTitle>Security & Compliance</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Security settings, compliance monitoring, and audit trails
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Security Center
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-indigo-600" />
                        <CardTitle>MCP Control Center</CardTitle>
                        <Badge variant="secondary">New</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Master Control Program - Advanced system management interface
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Launch MCP
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Server className="w-5 h-5 text-red-600" />
                        <CardTitle>System Health</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Monitor system health, performance, and operational status
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Health Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <SuperAdminFAB />
    </div>
  );
}

