#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Autonomous Website Builder...');
console.log('📝 This will create new pages, headers, and components based on tasks!');

class AutonomousWebsiteBuilder {
  constructor() {
    this.wss = null;
    this.websiteDir = './logistics-lynx';
    this.pagesDir = './logistics-lynx/src/pages';
    this.componentsDir = './logistics-lynx/src/components';
    this.agents = [
      { name: 'PageCreator', status: 'idle', task: 'Creating new pages' },
      { name: 'HeaderBuilder', status: 'idle', task: 'Building headers' },
      { name: 'ComponentArchitect', status: 'idle', task: 'Architecting components' },
      { name: 'ContentWriter', status: 'idle', task: 'Writing content' },
      { name: 'NavigationDesigner', status: 'idle', task: 'Designing navigation' },
      { name: 'LayoutEngineer', status: 'idle', task: 'Engineering layouts' }
    ];
    this.taskQueue = [];
    this.buildCount = 0;
    this.devServerProcess = null;
  }

  startWebSocketServer() {
    this.wss = new WebSocket.Server({ port: 8087 });
    console.log('🌐 Autonomous Website Builder WebSocket server started on port 8087');

    this.wss.on('connection', (ws) => {
      console.log('🔌 New client connected to autonomous website builder');
      
      // Send initial status
      ws.send(JSON.stringify({
        type: 'builder_status',
        data: this.agents,
        timestamp: new Date().toISOString()
      }));

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          if (data.type === 'request_build') {
            this.startAutonomousBuild(ws, data.task || 'default');
          }
        } catch (error) {
          console.log('Error parsing message:', error.message);
        }
      });
    });
  }

  startAutonomousBuild(ws, task) {
    console.log(`🔄 Starting autonomous build for task: ${task}`);
    
    // Start all agents
    this.agents.forEach(agent => {
      agent.status = 'building';
    });

    // Broadcast status update
    this.broadcastUpdate({
      type: 'builder_status',
      data: this.agents,
      message: 'All agents started autonomous build'
    });

    // Execute build tasks based on the request
    switch (task) {
      case 'homepage':
        this.buildHomePage(ws);
        break;
      case 'dashboard':
        this.buildDashboard(ws);
        break;
      case 'navigation':
        this.buildNavigation(ws);
        break;
      case 'components':
        this.buildComponents(ws);
        break;
      default:
        this.buildCompleteWebsite(ws);
    }
  }

  buildHomePage(ws) {
    const agent = this.agents.find(a => a.name === 'PageCreator');
    agent.status = 'building';
    agent.task = 'Creating new homepage';

    const timestamp = new Date().toLocaleTimeString();
    const homePageContent = `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - Created by Autonomous Agent */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TMS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transportation Management System</h1>
                <p className="text-sm text-gray-600">Powered by Autonomous Agents</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                🔥 Live Updates Active
              </Badge>
              <Button variant="default">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Created by Autonomous Agent */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to the Future of Transportation Management
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our autonomous agents are continuously building and improving this platform. 
              Watch as new features, pages, and components are created in real-time.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Features
              </Button>
              <Button size="lg" variant="outline">
                View Live Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Created by Autonomous Agent */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Autonomous Features
            </h3>
            <p className="text-gray-600">
              Built and maintained by intelligent agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  🤖 Autonomous Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600">
                  Intelligent agents continuously monitor, build, and improve the system
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  ⚡ Real-Time Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-600">
                  Watch as new pages and components are created live
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  🎯 Smart Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-600">
                  Automated workflows and intelligent decision making
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Status Section - Created by Autonomous Agent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Live Build Status
            </h3>
            <p className="text-gray-600">
              Current autonomous agent activities
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {this.agents.map((agent, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl mb-2">{this.getAgentIcon(agent.name)}</div>
                  <h4 className="font-semibold text-sm mb-1">{agent.name}</h4>
                  <Badge variant={agent.status === 'building' ? 'default' : 'secondary'} className="text-xs">
                    {agent.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-2">{agent.task}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Created by Autonomous Agent */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">TMS Platform</h4>
              <p className="text-gray-400 text-sm">
                Built by autonomous agents for the future of transportation management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Autonomous Agents</li>
                <li>• Real-Time Updates</li>
                <li>• Smart Automation</li>
                <li>• Live Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Status</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• System: Active</li>
                <li>• Agents: Building</li>
                <li>• Updates: Live</li>
                <li>• Last Build: ${timestamp}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">Dashboard</Button>
                <Button variant="outline" size="sm">Monitor</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              🔥 This entire page was created by autonomous agents at ${timestamp}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;`;

    const homePagePath = path.join(this.pagesDir, 'HomePage.tsx');
    
    // Ensure directory exists
    const pageDir = path.dirname(homePagePath);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    fs.writeFileSync(homePagePath, homePageContent);
    
    this.broadcastUpdate({
      type: 'page_created',
      agent: 'PageCreator',
      action: 'Created new homepage with header, hero, features, and footer',
      file: homePagePath,
      timestamp: new Date().toISOString()
    });

    // Restart dev server to show changes
    this.restartDevServer();

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Homepage created successfully';
      this.broadcastUpdate({
        type: 'builder_status',
        data: this.agents,
        message: 'PageCreator completed homepage build'
      });
    }, 3000);
  }

  buildNavigation(ws) {
    const agent = this.agents.find(a => a.name === 'NavigationDesigner');
    agent.status = 'building';
    agent.task = 'Building navigation system';

    const timestamp = new Date().toLocaleTimeString();
    const navigationContent = `import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  BarChart3, 
  Truck, 
  Users, 
  Settings, 
  Zap,
  Menu,
  X
} from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home, href: '/', badge: 'New' },
    { name: 'Dashboard', icon: BarChart3, href: '/dashboard', badge: 'Live' },
    { name: 'Fleet', icon: Truck, href: '/fleet' },
    { name: 'Drivers', icon: Users, href: '/drivers' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Autonomous', icon: Zap, href: '/autonomous', badge: 'AI' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TMS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TMS Platform</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🔥 Autonomous
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;`;

    const navigationPath = path.join(this.componentsDir, 'layout', 'Navigation.tsx');
    
    // Ensure directory exists
    const navDir = path.dirname(navigationPath);
    if (!fs.existsSync(navDir)) {
      fs.mkdirSync(navDir, { recursive: true });
    }

    fs.writeFileSync(navigationPath, navigationContent);
    
    this.broadcastUpdate({
      type: 'component_created',
      agent: 'NavigationDesigner',
      action: 'Created responsive navigation system with mobile menu',
      file: navigationPath,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Navigation system built';
      this.broadcastUpdate({
        type: 'builder_status',
        data: this.agents,
        message: 'NavigationDesigner completed navigation build'
      });
    }, 2500);
  }

  buildComponents(ws) {
    const agent = this.agents.find(a => a.name === 'ComponentArchitect');
    agent.status = 'building';
    agent.task = 'Architecting new components';

    const timestamp = new Date().toLocaleTimeString();
    
    // Create multiple components
    const components = [
      {
        name: 'AutonomousStatusCard',
        content: `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Cpu, Zap } from 'lucide-react';

const AutonomousStatusCard = () => {
  const agents = [
    { name: 'PageCreator', status: 'active', icon: Activity, color: 'text-green-600' },
    { name: 'HeaderBuilder', status: 'building', icon: Cpu, color: 'text-blue-600' },
    { name: 'ComponentArchitect', status: 'idle', icon: Zap, color: 'text-purple-600' }
  ];

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          🤖 Autonomous Agent Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <agent.icon className={\`w-4 h-4 \${agent.color}\`} />
                <span className="font-medium">{agent.name}</span>
              </div>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-2 bg-purple-100 rounded text-xs text-purple-700">
          🔥 Created by autonomous agent at ${timestamp}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousStatusCard;`
      },
      {
        name: 'LiveBuildMonitor',
        content: `import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const LiveBuildMonitor = () => {
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing build...');

  useEffect(() => {
    const tasks = [
      'Analyzing requirements...',
      'Creating components...',
      'Building layouts...',
      'Optimizing performance...',
      'Deploying changes...',
      'Build complete!'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < tasks.length) {
        setCurrentTask(tasks[currentIndex]);
        setBuildProgress((currentIndex + 1) * (100 / tasks.length));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          ⚡ Live Build Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-blue-600 mb-2">Current Task:</p>
            <p className="font-medium text-blue-800">{currentTask}</p>
          </div>
          
          <div>
            <p className="text-sm text-blue-600 mb-2">Build Progress:</p>
            <Progress value={buildProgress} className="mb-2" />
            <p className="text-xs text-blue-600">{Math.round(buildProgress)}% complete</p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              🔥 Live Updates
            </Badge>
            <span className="text-xs text-blue-600">Created at ${timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveBuildMonitor;`
      }
    ];

    components.forEach((component, index) => {
      const componentPath = path.join(this.componentsDir, 'autonomous', component.name + '.tsx');
      
      // Ensure directory exists
      const componentDir = path.dirname(componentPath);
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
      }

      fs.writeFileSync(componentPath, component.content);
      
      this.broadcastUpdate({
        type: 'component_created',
        agent: 'ComponentArchitect',
        action: `Created ${component.name} component`,
        file: componentPath,
        timestamp: new Date().toISOString()
      });
    });

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Components architected';
      this.broadcastUpdate({
        type: 'builder_status',
        data: this.agents,
        message: 'ComponentArchitect completed component build'
      });
    }, 4000);
  }

  buildCompleteWebsite(ws) {
    console.log('🏗️ Building complete website with all components...');
    
    // Build homepage
    this.buildHomePage(ws);
    
    // Build navigation
    setTimeout(() => this.buildNavigation(ws), 2000);
    
    // Build components
    setTimeout(() => this.buildComponents(ws), 4000);
    
    // Build dashboard
    setTimeout(() => this.buildDashboard(ws), 6000);
  }

  buildDashboard(ws) {
    const agent = this.agents.find(a => a.name === 'LayoutEngineer');
    agent.status = 'building';
    agent.task = 'Engineering dashboard layout';

    const timestamp = new Date().toLocaleTimeString();
    const dashboardContent = `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import AutonomousStatusCard from '../components/autonomous/AutonomousStatusCard';
import LiveBuildMonitor from '../components/autonomous/LiveBuildMonitor';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TMS Dashboard</h1>
              <p className="text-gray-600">Built by autonomous agents</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                🔥 Live Build Active
              </Badge>
              <Button>New Build</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Autonomous Status */}
          <div className="lg:col-span-1">
            <AutonomousStatusCard />
          </div>

          {/* Live Build Monitor */}
          <div className="lg:col-span-2">
            <LiveBuildMonitor />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pages Created</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📄</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Components Built</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🧩</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🤖</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Build Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.3s</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">⚡</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Builds */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Recent Autonomous Builds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Homepage with Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Completed</Badge>
                  <span className="text-sm text-gray-500">2 minutes ago</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Component Library</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Building</Badge>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Dashboard Layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Completed</Badge>
                  <span className="text-sm text-gray-500">5 minutes ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600">
              🔥 This dashboard was engineered by autonomous agents at ${timestamp}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;`;

    const dashboardPath = path.join(this.pagesDir, 'Dashboard.tsx');
    
    // Ensure directory exists
    const dashboardDir = path.dirname(dashboardPath);
    if (!fs.existsSync(dashboardDir)) {
      fs.mkdirSync(dashboardDir, { recursive: true });
    }

    fs.writeFileSync(dashboardPath, dashboardContent);
    
    this.broadcastUpdate({
      type: 'page_created',
      agent: 'LayoutEngineer',
      action: 'Engineered complete dashboard with stats and build monitoring',
      file: dashboardPath,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Dashboard engineered';
      this.broadcastUpdate({
        type: 'builder_status',
        data: this.agents,
        message: 'LayoutEngineer completed dashboard build'
      });
    }, 3000);
  }

  getAgentIcon(agentName) {
    const icons = {
      'PageCreator': '📄',
      'HeaderBuilder': '🏗️',
      'ComponentArchitect': '🧩',
      'ContentWriter': '✍️',
      'NavigationDesigner': '🧭',
      'LayoutEngineer': '⚙️'
    };
    return icons[agentName] || '🤖';
  }

  restartDevServer() {
    console.log('🔄 Restarting development server to show new builds...');
    
    // Kill existing dev server process
    if (this.devServerProcess) {
      this.devServerProcess.kill('SIGTERM');
    }

    // Start new dev server
    this.devServerProcess = spawn('npm', ['run', 'dev'], {
      cwd: this.websiteDir,
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, PORT: '8084' }
    });

    this.devServerProcess.stdout.on('data', (data) => {
      console.log(`📝 Dev Server: ${data.toString().trim()}`);
    });

    this.devServerProcess.stderr.on('data', (data) => {
      console.log(`⚠️ Dev Server Error: ${data.toString().trim()}`);
    });

    this.devServerProcess.on('close', (code) => {
      console.log(`🛑 Dev server process exited with code ${code}`);
    });

    this.broadcastUpdate({
      type: 'dev_server_restart',
      agent: 'System',
      action: 'Development server restarted to show new builds',
      timestamp: new Date().toISOString()
    });
  }

  broadcastUpdate(update) {
    this.buildCount++;
    
    const message = {
      ...update,
      buildCount: this.buildCount,
      systemStatus: {
        totalBuilds: this.buildCount,
        activeAgents: this.agents.filter(a => a.status === 'building').length,
        lastUpdate: new Date().toISOString()
      }
    };

    if (this.wss) {
      this.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }

    console.log(`🏗️ [${update.agent || 'System'}] ${update.action || update.message}`);
  }
}

// Start the autonomous website builder
const builder = new AutonomousWebsiteBuilder();
builder.startWebSocketServer();

console.log('✅ Autonomous Website Builder is running!');
console.log('🌐 WebSocket server: ws://localhost:8087');
console.log('🏗️ Autonomous agents will create new pages and components');
console.log('🔗 Connect to request builds: homepage, dashboard, navigation, components');

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down autonomous website builder...');
  if (builder.wss) {
    builder.wss.close();
  }
  if (builder.devServerProcess) {
    builder.devServerProcess.kill('SIGTERM');
  }
  process.exit(0);
});
