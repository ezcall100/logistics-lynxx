import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Navigation from '../components/layout/Navigation';
import LiveBuildMonitor from '../components/autonomous/LiveBuildMonitor';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation - Created by Autonomous Agent */}
      <Navigation />
      
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
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="font-semibold text-sm mb-1">PageCreator</h4>
                <Badge variant="default" className="text-xs">
                  building
                </Badge>
                <p className="text-xs text-gray-500 mt-2">Creating new pages</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🧩</div>
                <h4 className="font-semibold text-sm mb-1">ComponentArchitect</h4>
                <Badge variant="default" className="text-xs">
                  building
                </Badge>
                <p className="text-xs text-gray-500 mt-2">Architecting components</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold text-sm mb-1">LayoutEngineer</h4>
                <Badge variant="default" className="text-xs">
                  building
                </Badge>
                <p className="text-xs text-gray-500 mt-2">Engineering layouts</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-sm mb-1">ContentWriter</h4>
                <Badge variant="default" className="text-xs">
                  building
                </Badge>
                <p className="text-xs text-gray-500 mt-2">Writing content</p>
              </CardContent>
            </Card>
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
                <li>• Last Build: 9:28:35 AM</li>
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
              🔥 This entire page was created by autonomous agents at 9:28:35 AM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;