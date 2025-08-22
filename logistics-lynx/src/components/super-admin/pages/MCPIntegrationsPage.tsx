import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, CircuitBoard, Shield, Server, Network, Zap, Activity, 
  CheckCircle, Clock, TrendingUp, Users, Globe, Database,
  ArrowRight, Play, Settings, Eye, Lock, Key, Cpu,
  HardDrive, Wifi, BarChart3, AlertTriangle, Info,
  Target, Award, Trophy, Star, Rocket, Sparkles,
  Gauge, ShieldCheck, Fingerprint, Smartphone, Monitor,
  Smartphone as Mobile, Tablet, Wifi as WifiIcon, Signal,
  BarChart4, PieChart, LineChart, ScatterChart, Cog,
  Wrench, Palette, Sun, Moon, Smartphone as MobileIcon,
  Building2, Globe2, ShieldX, UserCheck, UserX,
  TrendingDown, Code, Terminal, Command, TerminalSquare,
  Link, ExternalLink, RefreshCw, Plus, Minus, X,
  Cloud, CloudRain, CloudLightning, CloudSnow,
  Database as DatabaseIcon, Server as ServerIcon,
  Monitor as MonitorIcon, Smartphone as SmartphoneIcon,
  MessageSquare, Mail, Search
} from 'lucide-react';

const MCPIntegrationsPage = () => {
  const [activeTab, setActiveTab] = useState('cloud');
  const [integrations, setIntegrations] = useState({
    aws: { enabled: true, status: 'connected', health: 98 },
    azure: { enabled: true, status: 'connected', health: 95 },
    gcp: { enabled: false, status: 'disconnected', health: 0 },
    kubernetes: { enabled: true, status: 'connected', health: 92 },
    docker: { enabled: true, status: 'connected', health: 97 },
    jenkins: { enabled: false, status: 'disconnected', health: 0 },
    gitlab: { enabled: true, status: 'connected', health: 94 },
    github: { enabled: true, status: 'connected', health: 96 },
    slack: { enabled: true, status: 'connected', health: 99 },
    teams: { enabled: false, status: 'disconnected', health: 0 },
    email: { enabled: true, status: 'connected', health: 100 },
    sms: { enabled: false, status: 'disconnected', health: 0 },
    mysql: { enabled: true, status: 'connected', health: 93 },
    postgresql: { enabled: true, status: 'connected', health: 91 },
    mongodb: { enabled: false, status: 'disconnected', health: 0 },
    redis: { enabled: true, status: 'connected', health: 98 },
    elasticsearch: { enabled: true, status: 'connected', health: 89 },
    prometheus: { enabled: true, status: 'connected', health: 95 },
    grafana: { enabled: true, status: 'connected', health: 94 },
    datadog: { enabled: false, status: 'disconnected', health: 0 },
    newrelic: { enabled: true, status: 'connected', health: 87 }
  });

  const integrationCategories = {
    cloud: [
      { name: 'AWS', icon: Cloud, description: 'Amazon Web Services integration', color: 'orange' },
      { name: 'Azure', icon: Cloud, description: 'Microsoft Azure integration', color: 'blue' },
      { name: 'GCP', icon: Cloud, description: 'Google Cloud Platform integration', color: 'red' }
    ],
    containers: [
      { name: 'Kubernetes', icon: Server, description: 'Container orchestration platform', color: 'blue' },
      { name: 'Docker', icon: Server, description: 'Container runtime environment', color: 'blue' }
    ],
    cicd: [
      { name: 'Jenkins', icon: Cog, description: 'Continuous integration server', color: 'red' },
      { name: 'GitLab', icon: Code, description: 'Git repository and CI/CD platform', color: 'orange' },
      { name: 'GitHub', icon: Code, description: 'Git repository hosting service', color: 'purple' }
    ],
    communication: [
      { name: 'Slack', icon: MessageSquare, description: 'Team communication platform', color: 'purple' },
      { name: 'Teams', icon: MessageSquare, description: 'Microsoft Teams integration', color: 'blue' },
      { name: 'Email', icon: Mail, description: 'Email notification system', color: 'gray' },
      { name: 'SMS', icon: Smartphone, description: 'SMS notification system', color: 'green' }
    ],
    databases: [
      { name: 'MySQL', icon: DatabaseIcon, description: 'Relational database management', color: 'blue' },
      { name: 'PostgreSQL', icon: DatabaseIcon, description: 'Advanced open source database', color: 'blue' },
      { name: 'MongoDB', icon: DatabaseIcon, description: 'NoSQL document database', color: 'green' },
      { name: 'Redis', icon: DatabaseIcon, description: 'In-memory data structure store', color: 'red' }
    ],
    monitoring: [
      { name: 'Elasticsearch', icon: Search, description: 'Search and analytics engine', color: 'blue' },
      { name: 'Prometheus', icon: Activity, description: 'Monitoring and alerting toolkit', color: 'red' },
      { name: 'Grafana', icon: BarChart3, description: 'Analytics and monitoring platform', color: 'orange' },
      { name: 'Datadog', icon: Activity, description: 'Application performance monitoring', color: 'purple' },
      { name: 'New Relic', icon: Activity, description: 'Application performance monitoring', color: 'blue' }
    ]
  };

  const toggleIntegration = (integrationName: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationName]: {
        ...prev[integrationName as keyof typeof prev],
        enabled: !prev[integrationName as keyof typeof prev].enabled,
        status: !prev[integrationName as keyof typeof prev].enabled ? 'connected' : 'disconnected',
        health: !prev[integrationName as keyof typeof prev].enabled ? Math.floor(Math.random() * 20) + 80 : 0
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'disconnected': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-emerald-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                  <Link className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  MCP Integrations
                </h1>
                <p className="text-xl text-blue-100 mt-2">
                  Seamless Connectivity with Your Entire Technology Stack
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-emerald-400">21</div>
                <div className="text-sm text-blue-100">Total Integrations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-400">15</div>
                <div className="text-sm text-blue-100">Active Connections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-400">94.2%</div>
                <div className="text-sm text-blue-100">Average Health</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">6</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        {/* Integration Overview */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Globe className="w-8 h-8 text-blue-600" />
              <span>Integration Ecosystem</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-3xl mx-auto">
              Connect your MCP with all your existing tools, platforms, and services for unified management and control.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="cloud" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Cloud className="w-4 h-4 mr-2" />
                  Cloud
                </TabsTrigger>
                <TabsTrigger value="containers" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Server className="w-4 h-4 mr-2" />
                  Containers
                </TabsTrigger>
                <TabsTrigger value="cicd" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Code className="w-4 h-4 mr-2" />
                  CI/CD
                </TabsTrigger>
                <TabsTrigger value="communication" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Communication
                </TabsTrigger>
                <TabsTrigger value="databases" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <DatabaseIcon className="w-4 h-4 mr-2" />
                  Databases
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Activity className="w-4 h-4 mr-2" />
                  Monitoring
                </TabsTrigger>
              </TabsList>

              {Object.entries(integrationCategories).map(([category, categoryIntegrations]) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {categoryIntegrations.map((integration, index) => {
                      const integrationKey = integration.name.toLowerCase().replace(/\s+/g, '');
                      const integrationData = integrations[integrationKey as keyof typeof integrations];
                      
                      return (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-3 rounded-lg bg-${integration.color}-100`}>
                                  <integration.icon className={`w-6 h-6 text-${integration.color}-600`} />
                                </div>
                                <div>
                                  <CardTitle className="text-lg font-semibold text-slate-900">
                                    {integration.name}
                                  </CardTitle>
                                  <CardDescription className="text-slate-600">
                                    {integration.description}
                                  </CardDescription>
                                </div>
                              </div>
                              <Switch
                                checked={integrationData?.enabled || false}
                                onCheckedChange={() => toggleIntegration(integrationKey)}
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-600">Status</span>
                              <Badge className={getStatusColor(integrationData?.status || 'disconnected')}>
                                {integrationData?.status || 'disconnected'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-600">Health</span>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-medium ${getHealthColor(integrationData?.health || 0)}`}>
                                  {integrationData?.health || 0}%
                                </span>
                                <Progress value={integrationData?.health || 0} className="w-20 h-2" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-600">Last Sync</span>
                              <span className="text-sm text-slate-500">
                                {integrationData?.enabled ? '2 minutes ago' : 'Never'}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Integration Benefits */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span>Integration Benefits</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Discover how MCP integrations transform your system management experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Unified Management</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Manage all your systems, services, and tools from a single, centralized MCP interface.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Single dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Cross-platform control</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Unified monitoring</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Automated Workflows</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Create intelligent workflows that span across multiple platforms and services automatically.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Cross-service automation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Intelligent routing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Conditional logic</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Comprehensive Analytics</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Gain insights across your entire technology stack with unified analytics and reporting.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Cross-platform insights</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Unified reporting</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Performance correlation</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-orange-100">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Enhanced Security</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Centralized security management with unified threat detection and response across all platforms.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Unified security</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Cross-platform monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Centralized alerts</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-red-100">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Time Savings</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Reduce manual tasks and eliminate context switching between different platforms and tools.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Automated operations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Reduced manual work</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Faster response times</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-indigo-100">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Scalability</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Scale your operations seamlessly as you add new tools and services to your stack.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Easy expansion</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Flexible architecture</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Future-proof design</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Statistics */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <BarChart4 className="w-8 h-8 text-emerald-600" />
              <span>Integration Statistics</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Real-time statistics showing the health and performance of your integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Active Integrations</h3>
                  <Link className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">15/21</div>
                <Progress value={71.4} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">71.4% connected</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Average Health</h3>
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
                <Progress value={94.2} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">System health score</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Response Time</h3>
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">&lt; 100ms</div>
                <Progress value={95} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Average latency</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Uptime</h3>
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">99.8%</div>
                <Progress value={99.8} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Connect Your Entire Stack?</h3>
              <p className="text-blue-100 mb-6">
                Transform your system management with seamless integrations across all your tools and platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Integration
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh All Connections
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPIntegrationsPage;
