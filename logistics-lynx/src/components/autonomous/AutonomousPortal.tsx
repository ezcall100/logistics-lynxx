import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Enhanced Icons for Autonomous AI Portal
const Icons = {
  Dashboard: '📊',
  AI: '🤖',
  Brain: '🧠',
  Robot: '🤖',
  Automation: '⚡',
  Analytics: '📈',
  Prediction: '🔮',
  Optimization: '🎯',
  Machine: '⚙️',
  Neural: '🕸️',
  Learning: '📚',
  Intelligence: '🧠',
  Algorithm: '🔢',
  Data: '📊',
  Model: '🏗️',
  Training: '🏋️',
  Inference: '🔍',
  Deployment: '🚀',
  Monitoring: '👁️',
  Alert: '🚨',
  Success: '✅',
  Warning: '⚠️',
  Error: '❌',
  Info: 'ℹ️',
  Clock: '⏰',
  Calendar: '📅',
  Chart: '📈',
  Network: '🌐',
  Cloud: '☁️',
  Database: '🗄️',
  API: '🔌',
  Code: '💻',
  Settings: '⚙️',
  Search: '🔍',
  Bell: '🔔',
  Profile: '👤',
  Home: '🏠',
  ArrowRight: '➡️',
  ArrowDown: '⬇️',
  ArrowUp: '⬆️',
  Plus: '➕',
  Minus: '➖',
  Edit: '✏️',
  Delete: '🗑️',
  Save: '💾',
  Download: '📥',
  Upload: '📤',
  Refresh: '🔄',
  Play: '▶️',
  Pause: '⏸️',
  Stop: '⏹️',
  Record: '🔴',
  Live: '🔴',
  Offline: '⚫',
  Online: '🟢',
  Processing: '🔄',
  Queued: '⏳',
  Completed: '✅',
  Failed: '❌',
  Pending: '⏳',
  Running: '🏃',
  Idle: '😴',
  Active: '🔥',
  Inactive: '💤',
  High: '🔴',
  Medium: '🟡',
  Low: '🟢',
  Critical: '🚨',
  Normal: '🟢',
  Degraded: '🟡',
  Down: '🔴',
  Up: '🟢',
  Fire: '🔥',
  Rocket: '🚀',
  Target: '🎯',
  Trophy: '🏆',
  Medal: '🥇',
  Diamond: '💎',
  Sparkles: '✨',
  Magic: '✨',
  Power: '⚡',
  Energy: '⚡',
  Speed: '🏃',
  Performance: '📈',
  Efficiency: '📊',
  Accuracy: '🎯',
  Precision: '🎯',
  Recall: '📊',
  F1Score: '📊',
  Loss: '📉',
  AccuracyScore: '📈',
  Validation: '✅',
  Testing: '🧪',
  Production: '🏭',
  Development: '🔧',
  Staging: '🎭',
  Environment: '🌍',
  Version: '📋',
  Release: '🚀',
  Beta: '🧪',
  Alpha: '🔬',
  Stable: '🛡️',
  Experimental: '🧪',
  Research: '🔬',
  Innovation: '💡',
  Discovery: '🔍',
  Invention: '💡',
  Creation: '🎨',
  Design: '🎨',
  Architecture: '🏗️',
  Framework: '🏗️',
  Library: '📚',
  Tool: '🔧',
  Utility: '🔧',
  Service: '🔧',
  Microservice: '🔧',
  APIEndpoint: '🔌',
  Webhook: '🔗',
  Integration: '🔗',
  Connector: '🔗',
  Adapter: '🔌',
  Bridge: '🌉',
  Gateway: '🚪',
  Router: '🛣️',
  LoadBalancer: '⚖️',
  Cache: '💾',
  Memory: '🧠',
  Storage: '💾',
  Table: '📋',
  Index: '📇',
  Query: '🔍',
  Filter: '🔍',
  Sort: '📊',
  Aggregate: '📊',
  Group: '👥',
  Join: '🔗',
  Union: '🔗',
  Intersection: '🔗',
  Difference: '➖',
  Complement: '➖',
  Subset: '📦',
  Superset: '📦',
  Element: '🔢',
  Collection: '📦',
  Array: '📋',
  ObjectType: '📦',
  Function: '🔧',
  Method: '🔧',
  Class: '🏗️',
  Interface: '🔌',
  Abstract: '🔬',
  Concrete: '🏗️',
  Virtual: '👻',
  Real: '🏗️',
  Static: '🛑',
  Dynamic: '🏃',
  Constant: '🔒',
  Variable: '📊',
  Parameter: '📋',
  Argument: '📋',
  Return: '↩️',
  Input: '📥',
  Output: '📤',
  Stream: '🌊',
  Buffer: '📦',
  Queue: '📋',
  Stack: '📚',
  Heap: '📚',
  Tree: '🌳',
  Node: '🔗',
  Edge: '🔗',
  Vertex: '🔗',
  Path: '🛣️',
  Route: '🛣️',
  Circuit: '⚡',
  Loop: '🔄',
  Recursion: '🔄',
  Iteration: '🔄',
  Sequence: '📋',
  Parallel: '⚡',
  Concurrent: '⚡',
  Synchronous: '🔄',
  Asynchronous: '⚡',
  Event: '📅',
  Trigger: '🔫',
  Signal: '📡',
  Message: '💬',
  Notification: '🔔',
  Exception: '🚨',
  Bug: '🐛',
  Debug: '🔍',
  Log: '📋',
  Trace: '🕸️',
  Benchmark: '📊',
  Test: '🧪',
  Unit: '🧪',
  System: '🏗️',
  Acceptance: '✅',
  Regression: '📉',
  Load: '⚖️',
  Stress: '😰',
  Security: '🔒',
  Penetration: '🔓',
  Vulnerability: '🕳️',
  Exploit: '💥',
  Patch: '🩹',
  Fix: '🔧',
  Update: '🔄',
  Upgrade: '⬆️',
  Downgrade: '⬇️',
  Rollback: '↩️',
  Forward: '➡️',
  Backward: '⬅️',
  Compatible: '✅',
  Incompatible: '❌',
  Deprecated: '⚠️',
  Legacy: '📜',
  Modern: '✨',
  Future: '🔮',
  Past: '📜',
  Present: '🎁',
  RealTime: '⚡',
  NearRealTime: '⚡',
  Batch: '📦'
};

const AutonomousPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [aiAgents, setAiAgents] = useState([
    { id: 1, name: 'Route Optimization Agent', status: 'active', performance: 98.5, type: 'optimization', lastActive: '2 min ago' },
    { id: 2, name: 'Load Matching Agent', status: 'active', performance: 95.2, type: 'matching', lastActive: '1 min ago' },
    { id: 3, name: 'Price Prediction Agent', status: 'training', performance: 87.3, type: 'prediction', lastActive: '5 min ago' },
    { id: 4, name: 'Risk Assessment Agent', status: 'active', performance: 99.1, type: 'risk', lastActive: '30 sec ago' },
    { id: 5, name: 'Customer Service Agent', status: 'idle', performance: 92.8, type: 'service', lastActive: '10 min ago' },
    { id: 6, name: 'Document Processing Agent', status: 'active', performance: 96.7, type: 'processing', lastActive: '1 min ago' }
  ]);
  const [automationWorkflows, setAutomationWorkflows] = useState([
    { id: 1, name: 'Load Assignment Automation', status: 'running', progress: 75, type: 'assignment', triggers: 1247 },
    { id: 2, name: 'Invoice Processing', status: 'completed', progress: 100, type: 'billing', triggers: 892 },
    { id: 3, name: 'Route Optimization', status: 'running', progress: 45, type: 'optimization', triggers: 567 },
    { id: 4, name: 'Customer Notifications', status: 'active', progress: 90, type: 'communication', triggers: 2341 }
  ]);
  const [predictiveModels, setPredictiveModels] = useState([
    { id: 1, name: 'Demand Forecasting', accuracy: 94.2, status: 'active', lastUpdated: '1 hour ago', predictions: 1247 },
    { id: 2, name: 'Price Optimization', accuracy: 91.8, status: 'active', lastUpdated: '30 min ago', predictions: 892 },
    { id: 3, name: 'Risk Assessment', accuracy: 96.5, status: 'training', lastUpdated: '2 hours ago', predictions: 567 },
    { id: 4, name: 'Customer Churn', accuracy: 89.3, status: 'active', lastUpdated: '45 min ago', predictions: 2341 }
  ]);
  const [systemMetrics, setSystemMetrics] = useState({
    totalAgents: 6,
    activeAgents: 4,
    totalWorkflows: 4,
    runningWorkflows: 2,
    totalModels: 4,
    activeModels: 3,
    systemHealth: 99.8,
    aiPerformance: 95.2,
    automationEfficiency: 87.5,
    predictionAccuracy: 92.9
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateAgent = () => {
    // AI Agent creation logic
    console.log('Creating new AI agent...');
  };

  const handleCreateWorkflow = () => {
    // Automation workflow creation logic
    console.log('Creating new automation workflow...');
  };

  const handleCreateModel = () => {
    // Predictive model creation logic
    console.log('Creating new predictive model...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'training': return 'text-yellow-600 bg-yellow-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'completed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600';
    if (performance >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Initializing Autonomous AI Portal</h2>
          <p className="text-gray-600">Loading AI agents and systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Autonomous AI Portal</h1>
              <p className="text-sm text-gray-600">AI-Powered Autonomous Operations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">AI Systems Online</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              {Icons.Home} Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg min-h-screen p-4">
          <nav className="space-y-2">
            {[
              { key: 'dashboard', label: 'AI Dashboard', icon: Icons.Dashboard, color: 'from-indigo-500 to-purple-500' },
              { key: 'agents', label: 'AI Agents', icon: Icons.Robot, color: 'from-blue-500 to-cyan-500' },
              { key: 'automation', label: 'Automation', icon: Icons.Automation, color: 'from-green-500 to-emerald-500' },
              { key: 'predictive', label: 'Predictive Analytics', icon: Icons.Prediction, color: 'from-orange-500 to-yellow-500' },
              { key: 'models', label: 'ML Models', icon: Icons.Brain, color: 'from-purple-500 to-pink-500' },
              { key: 'monitoring', label: 'System Monitoring', icon: Icons.Monitoring, color: 'from-red-500 to-pink-500' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                  activeTab === tab.key 
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">{Icons.Robot}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">{systemMetrics.activeAgents}/{systemMetrics.totalAgents}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">↗</span>
                    Active AI agents
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Automation Workflows</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">{Icons.Automation}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{systemMetrics.runningWorkflows}/{systemMetrics.totalWorkflows}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">⚡</span>
                    Running workflows
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ML Models</CardTitle>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">{Icons.Brain}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{systemMetrics.activeModels}/{systemMetrics.totalModels}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">🧠</span>
                    Active models
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Badge variant="default" className="bg-green-500">Excellent</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{systemMetrics.systemHealth}%</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-green-500 mr-1">✅</span>
                    Overall performance
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* AI Performance Overview */}
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Chart}</span>
                      AI Performance Overview
                      <Badge variant="secondary" className="ml-2">Real-time</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600">{systemMetrics.aiPerformance}%</div>
                        <div className="text-sm text-gray-600">AI Performance</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                        <div className="text-3xl font-bold text-green-600">{systemMetrics.automationEfficiency}%</div>
                        <div className="text-sm text-gray-600">Automation Efficiency</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600">{systemMetrics.predictionAccuracy}%</div>
                        <div className="text-sm text-gray-600">Prediction Accuracy</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Rocket}</span>
                      Quick Actions
                      <Badge variant="secondary" className="ml-2">Power Tools</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Button 
                        onClick={handleCreateAgent}
                        className="h-20 flex-col bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <span className="text-xl mb-1">{Icons.Plus}</span>
                        <span className="text-sm font-medium">Create AI Agent</span>
                      </Button>
                      <Button 
                        onClick={handleCreateWorkflow}
                        variant="outline" 
                        className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
                      >
                        <span className="text-xl mb-1">{Icons.Automation}</span>
                        <span className="text-sm font-medium">Create Workflow</span>
                      </Button>
                      <Button 
                        onClick={handleCreateModel}
                        variant="outline" 
                        className="h-20 flex-col bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
                      >
                        <span className="text-xl mb-1">{Icons.Brain}</span>
                        <span className="text-sm font-medium">Create Model</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col bg-gradient-to-br from-orange-500 to-yellow-600 text-white hover:from-orange-600 hover:to-yellow-700 transition-all duration-300 hover:scale-105 border-0 shadow-lg"
                      >
                        <span className="text-xl mb-1">{Icons.Monitoring}</span>
                        <span className="text-sm font-medium">System Monitor</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Robot}</span>
                      AI Agents Management
                      <Badge variant="secondary" className="ml-2">{aiAgents.length} Agents</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {aiAgents.map((agent) => (
                        <Card key={agent.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">{agent.name}</CardTitle>
                              <Badge className={getStatusColor(agent.status)}>
                                {agent.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Performance:</span>
                                <span className={getPerformanceColor(agent.performance)}>
                                  {agent.performance}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Type:</span>
                                <span className="text-gray-600">{agent.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Last Active:</span>
                                <span className="text-gray-600">{agent.lastActive}</span>
                              </div>
                              <div className="flex space-x-2 mt-3">
                                <Button size="sm" variant="outline">Configure</Button>
                                <Button size="sm" variant="outline">Monitor</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'automation' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Automation}</span>
                      Automation Workflows
                      <Badge variant="secondary" className="ml-2">{automationWorkflows.length} Workflows</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {automationWorkflows.map((workflow) => (
                        <Card key={workflow.id} className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white text-xl">{Icons.Automation}</span>
                                </div>
                                <div>
                                  <h3 className="font-semibold">{workflow.name}</h3>
                                  <p className="text-sm text-gray-600">Type: {workflow.type}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(workflow.status)}>
                                  {workflow.status}
                                </Badge>
                                <div className="text-sm text-gray-600 mt-1">
                                  {workflow.triggers} triggers
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{workflow.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${workflow.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button size="sm" variant="outline">View Details</Button>
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline">Pause</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'predictive' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Prediction}</span>
                      Predictive Analytics
                      <Badge variant="secondary" className="ml-2">{predictiveModels.length} Models</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {predictiveModels.map((model) => (
                        <Card key={model.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{model.name}</CardTitle>
                              <Badge className={getStatusColor(model.status)}>
                                {model.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Accuracy:</span>
                                <span className={`font-semibold ${getPerformanceColor(model.accuracy)}`}>
                                  {model.accuracy}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Predictions:</span>
                                <span className="font-semibold">{model.predictions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Last Updated:</span>
                                <span className="text-sm">{model.lastUpdated}</span>
                              </div>
                              <div className="flex space-x-2 mt-4">
                                <Button size="sm" variant="outline">View Predictions</Button>
                                <Button size="sm" variant="outline">Retrain</Button>
                                <Button size="sm" variant="outline">Deploy</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'models' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Brain}</span>
                      Machine Learning Models
                      <Badge variant="secondary" className="ml-2">Advanced</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Neural Network', type: 'Deep Learning', accuracy: 97.2, status: 'active' },
                        { name: 'Random Forest', type: 'Ensemble', accuracy: 94.8, status: 'active' },
                        { name: 'Support Vector Machine', type: 'Classification', accuracy: 92.1, status: 'training' },
                        { name: 'Gradient Boosting', type: 'Ensemble', accuracy: 95.6, status: 'active' },
                        { name: 'K-Means Clustering', type: 'Unsupervised', accuracy: 89.3, status: 'idle' },
                        { name: 'Linear Regression', type: 'Regression', accuracy: 91.7, status: 'active' }
                      ].map((model, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">{model.name}</CardTitle>
                              <Badge className={getStatusColor(model.status)}>
                                {model.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Type:</span>
                                <span className="text-gray-600">{model.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Accuracy:</span>
                                <span className={getPerformanceColor(model.accuracy)}>
                                  {model.accuracy}%
                                </span>
                              </div>
                              <div className="flex space-x-2 mt-3">
                                <Button size="sm" variant="outline">Train</Button>
                                <Button size="sm" variant="outline">Evaluate</Button>
                                <Button size="sm" variant="outline">Deploy</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Monitoring}</span>
                      System Monitoring
                      <Badge variant="secondary" className="ml-2">Real-time</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { name: 'CPU Usage', value: '45%', status: 'normal', icon: Icons.Processing },
                        { name: 'Memory Usage', value: '67%', status: 'normal', icon: Icons.Memory },
                        { name: 'GPU Usage', value: '23%', status: 'low', icon: Icons.Processing },
                        { name: 'Network I/O', value: '1.2 GB/s', status: 'normal', icon: Icons.Network },
                        { name: 'Disk Usage', value: '78%', status: 'warning', icon: Icons.Storage },
                        { name: 'API Response Time', value: '120ms', status: 'normal', icon: Icons.API },
                        { name: 'Database Connections', value: '45/100', status: 'normal', icon: Icons.Database },
                        { name: 'Active Sessions', value: '1,247', status: 'normal', icon: Icons.Profile }
                      ].map((metric, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl">{metric.icon}</span>
                              <Badge className={getStatusColor(metric.status)}>
                                {metric.status}
                              </Badge>
                            </div>
                            <div className="text-lg font-semibold">{metric.value}</div>
                            <div className="text-sm text-gray-600">{metric.name}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AutonomousPortal;