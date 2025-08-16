/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  Zap,
  Globe,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Shield,
  TrendingUp,
  FileText,
  Terminal,
  Truck,
  Route,
  Package
} from 'lucide-react';
import LiveFeed from '@/components/autonomous/LiveFeed';
import MetricsBar from '@/components/autonomous/MetricsBar';
import WebsiteBuilder from '@/components/autonomous/WebsiteBuilder';
import WebsiteBuilderConsole from '@/components/autonomous/WebsiteBuilderConsole';

export default function AutonomousDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-green-500 flex items-center justify-center shadow-md">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Trans Bot AI Autonomous Dashboard
                </h1>
                <p className="text-slate-600 mt-1">
                  Full Authority 24/7 Operations - TMS Software + 50-Page Website
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="bg-green-500 text-white px-3 py-1 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                LIVE
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 px-3 py-1 rounded-full">
                24/7 Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">TMS Software Active</p>
                  <p className="text-2xl font-bold text-green-800">20/20</p>
                  <p className="text-xs text-green-600">All portals online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Active Operations</p>
                  <p className="text-2xl font-bold text-blue-800">23</p>
                  <p className="text-xs text-blue-600">Real-time processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">System Health</p>
                  <p className="text-2xl font-bold text-purple-800">98.5%</p>
                  <p className="text-xs text-purple-600">Optimal performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-700">Security Status</p>
                  <p className="text-2xl font-bold text-orange-800">Secure</p>
                  <p className="text-xs text-orange-600">All systems protected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-white/20">
          <CardContent className="p-6">
            <Tabs defaultValue="live-feed" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="live-feed" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <Activity className="w-4 h-4" />
                  <span className="font-medium">Live Feed</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="website-builder" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Website Builder</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="builder-console" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <Terminal className="w-4 h-4" />
                  <span className="font-medium">Builder Console</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="metrics" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Metrics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="system" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">System</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live-feed" className="space-y-4">
                <LiveFeed />
              </TabsContent>

              <TabsContent value="website-builder" className="space-y-4">
                <WebsiteBuilder />
              </TabsContent>

              <TabsContent value="builder-console" className="space-y-4">
                <WebsiteBuilderConsole />
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <MetricsBar />
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Configuration */}
                  <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Settings className="w-5 h-5 text-blue-600" />
                        <span>System Configuration</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Autonomy Mode</p>
                          <Badge variant="default" className="bg-green-500 text-white px-3 py-1 rounded-full">FULL</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Emergency Stop</p>
                          <Badge variant="outline" className="border-red-200 text-red-700 px-3 py-1 rounded-full">DISABLED</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Self-healing</p>
                          <Badge variant="default" className="bg-green-500 text-white px-3 py-1 rounded-full">ENABLED</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Real-time Updates</p>
                          <Badge variant="default" className="bg-blue-500 text-white px-3 py-1 rounded-full">ACTIVE</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">Website Builder</p>
                          <Badge variant="default" className="bg-green-500 text-white px-3 py-1 rounded-full">ENABLED</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-600">API Endpoints</p>
                          <Badge variant="default" className="bg-green-500 text-white px-3 py-1 rounded-full">ACTIVE</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Portal Status Summary */}
                  <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-slate-800">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span>TMS Portal Status Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Super Admin</p>
                            <p className="text-xs text-green-600">Online</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Carrier Portal</p>
                            <p className="text-xs text-green-600">Online</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Broker Portal</p>
                            <p className="text-xs text-green-600">Online</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-green-800">Shipper Portal</p>
                            <p className="text-xs text-green-600">Online</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* TMS Features Overview */}
                <Card className="bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-slate-800">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span>TMS Software Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <Route className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-blue-800">Route Optimization</h4>
                        <p className="text-sm text-blue-600">AI-powered logistics planning</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-green-800">Load Management</h4>
                        <p className="text-sm text-green-600">Intelligent cargo optimization</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-purple-800">Real-time Tracking</h4>
                        <p className="text-sm text-purple-600">Live fleet monitoring</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
