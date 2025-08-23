import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Activity, Settings, Brain, Server } from 'lucide-react';

export default function EnhancedSuperAdminPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Check if we have nested routes */}
      <Outlet />
      
      {/* Fallback content when no nested route is active */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            👑 Super Admin Portal
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Welcome to the Super Administrator Portal - Your central command center for system management
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
    </div>
  );
}

