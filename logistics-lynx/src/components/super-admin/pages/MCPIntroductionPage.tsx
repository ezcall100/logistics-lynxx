import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, CircuitBoard, Shield, Server, Network, Zap, Activity, 
  CheckCircle, Clock, TrendingUp, Users, Globe, Database,
  ArrowRight, Play, Settings, Eye, Lock, Key, Cpu,
  HardDrive, Wifi, BarChart3, AlertTriangle, Info,
  Target, Award, Trophy, Star, Rocket, Sparkles, Cog
} from 'lucide-react';

const MCPIntroductionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Master Control Program
                </h1>
                <p className="text-xl text-blue-100 mt-2">
                  The Central Nervous System of Your Digital Fortress
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Operational</span>
                </div>
                <p className="text-blue-100 text-sm">System running at 98.5% efficiency</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="font-semibold">24/7 Monitoring</span>
                </div>
                <p className="text-blue-100 text-sm">Continuous surveillance active</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="font-semibold">AI-Powered</span>
                </div>
                <p className="text-blue-100 text-sm">Autonomous decision making</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto space-y-12">
        {/* What is MCP Section */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <CircuitBoard className="w-8 h-8 text-blue-600" />
              <span>What is the Master Control Program?</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-3xl mx-auto">
              The Master Control Program (MCP) is the central nervous system of your digital infrastructure, 
              orchestrating all autonomous agents, monitoring system health, and ensuring optimal performance 
              across your entire technology stack.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span>Central Intelligence</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The MCP serves as the central brain of your system, processing real-time data from all connected 
                  components and making intelligent decisions to optimize performance, security, and resource allocation.
                </p>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Real-time decision making</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Predictive analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Autonomous optimization</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Security Command</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  As the security command center, the MCP continuously monitors for threats, manages access controls, 
                  and coordinates defensive responses across your entire digital perimeter.
                </p>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Threat detection & response</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Access control management</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Security policy enforcement</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Capabilities */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <span>Core Capabilities</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Discover the powerful capabilities that make the MCP the ultimate command center
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Real-Time Monitoring</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Continuous surveillance of system metrics, performance indicators, and operational status across all components.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>24/7 surveillance</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Agent Management</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Orchestrate and control autonomous agents, manage their priorities, and coordinate their activities.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Target className="w-3 h-3" />
                  <span>Intelligent coordination</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <AlertTriangle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Alert Management</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Intelligent alert processing, prioritization, and automated response coordination for system events.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Eye className="w-3 h-3" />
                  <span>Smart prioritization</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-orange-100">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Security Control</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Centralized security management, threat detection, and automated defensive response coordination.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>Threat neutralization</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-red-100">
                    <Settings className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">System Configuration</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Dynamic system configuration management, performance tuning, and resource optimization.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Cog className="w-3 h-3" />
                  <span>Dynamic optimization</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-indigo-100">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Analytics & Insights</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Advanced analytics, performance insights, and predictive modeling for system optimization.
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>Predictive insights</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Architecture */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Server className="w-8 h-8 text-slate-600" />
              <span>System Architecture</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Understanding how the MCP integrates with your entire technology stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Core Processing</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The MCP core processes real-time data streams, executes decision algorithms, and coordinates 
                  responses across all system components with millisecond precision.
                </p>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Processing Power</span>
                    <Badge className="bg-blue-100 text-blue-800">High Performance</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Response Time</span>
                    <Badge className="bg-emerald-100 text-emerald-800">&lt; 50ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime</span>
                    <Badge className="bg-purple-100 text-purple-800">99.9%</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Network className="w-5 h-5 text-emerald-600" />
                  <span>Network Integration</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Seamless integration with all network components, APIs, and external services ensures 
                  comprehensive system oversight and control capabilities.
                </p>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">API Endpoints</span>
                    <Badge className="bg-emerald-100 text-emerald-800">REST + GraphQL</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Protocols</span>
                    <Badge className="bg-blue-100 text-blue-800">HTTP/2 + WebSocket</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Security</span>
                    <Badge className="bg-orange-100 text-orange-800">TLS 1.3</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span>Data Management</span>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Advanced data management with real-time analytics, predictive modeling, and intelligent 
                  storage optimization for maximum performance and reliability.
                </p>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Storage Type</span>
                    <Badge className="bg-purple-100 text-purple-800">Distributed</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Analytics</span>
                    <Badge className="bg-indigo-100 text-indigo-800">Real-time</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Backup</span>
                    <Badge className="bg-green-100 text-green-800">Automated</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Award className="w-8 h-8 text-emerald-600" />
              <span>Benefits & Advantages</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Discover how the MCP transforms your system operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Rocket className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Operational Efficiency</h4>
                    <p className="text-slate-600 text-sm">
                      Reduce manual intervention by 85% through automated monitoring, decision-making, and response coordination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Enhanced Security</h4>
                    <p className="text-slate-600 text-sm">
                      Proactive threat detection and automated response capabilities reduce security incidents by 90%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Performance Optimization</h4>
                    <p className="text-slate-600 text-sm">
                      Continuous system tuning and resource optimization improve overall performance by 40%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">24/7 Availability</h4>
                    <p className="text-slate-600 text-sm">
                      Round-the-clock monitoring and automated maintenance ensure 99.9% system availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Intelligent Insights</h4>
                    <p className="text-slate-600 text-sm">
                      Advanced analytics provide actionable insights for strategic decision-making and optimization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-red-100">
                    <Sparkles className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Scalability</h4>
                    <p className="text-slate-600 text-sm">
                      Designed to scale seamlessly with your infrastructure growth and evolving requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience the Power of MCP?</h3>
              <p className="text-blue-100 mb-6">
                Take control of your digital infrastructure with the most advanced Master Control Program ever created.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="w-4 h-4 mr-2" />
                  Launch MCP Control Center
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Info className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPIntroductionPage;
