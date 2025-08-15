import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Navigation from '../components/Navigation';

const HomePage = () => {
  // Mock data for agents
  const agents = [
    { name: 'UI Builder', status: 'building', task: 'Creating components' },
    { name: 'API Agent', status: 'active', task: 'Managing endpoints' },
    { name: 'Data Agent', status: 'building', task: 'Processing data' },
    { name: 'Test Agent', status: 'idle', task: 'Running tests' }
  ];

  const getAgentIcon = (name: string) => {
    const icons: Record<string, string> = {
      'UI Builder': '🎨',
      'API Agent': '🔌',
      'Data Agent': '📊',
      'Test Agent': '🧪'
    };
    return icons[name] || '🤖';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Created by Autonomous Agent */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Trans Bot AI
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our autonomous agents are continuously building and improving this platform. 
              Watch as new features, pages, and components are created in real-time.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Features
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
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
            {agents.map((agent, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl mb-2">{getAgentIcon(agent.name)}</div>
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

      {/* Page Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Explore All Pages
            </h3>
            <p className="text-gray-600">
              Navigate to any page in the Trans Bot AI platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Public Pages */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Public Pages</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-blue-600 hover:text-blue-800">About</Link>
                <Link to="/services" className="block text-blue-600 hover:text-blue-800">Services</Link>
                <Link to="/products" className="block text-blue-600 hover:text-blue-800">Products</Link>
                <Link to="/pricing" className="block text-blue-600 hover:text-blue-800">Pricing</Link>
                <Link to="/contact" className="block text-blue-600 hover:text-blue-800">Contact</Link>
                <Link to="/blog" className="block text-blue-600 hover:text-blue-800">Blog</Link>
                <Link to="/careers" className="block text-blue-600 hover:text-blue-800">Careers</Link>
                <Link to="/support" className="block text-blue-600 hover:text-blue-800">Support</Link>
                <Link to="/documentation" className="block text-blue-600 hover:text-blue-800">Documentation</Link>
                <Link to="/status" className="block text-blue-600 hover:text-blue-800">Status</Link>
              </div>
            </div>

            {/* Portal Pages */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Portal Pages</h4>
              <div className="space-y-2">
                <Link to="/broker" className="block text-green-600 hover:text-green-800">Broker Portal</Link>
                <Link to="/carrier" className="block text-green-600 hover:text-green-800">Carrier Portal</Link>
                <Link to="/shipper" className="block text-green-600 hover:text-green-800">Shipper Portal</Link>
                <Link to="/driver" className="block text-green-600 hover:text-green-800">Driver Portal</Link>
                <Link to="/super-admin" className="block text-green-600 hover:text-green-800">Super Admin</Link>
                <Link to="/admin" className="block text-green-600 hover:text-green-800">Admin</Link>
                <Link to="/tms-admin" className="block text-green-600 hover:text-green-800">TMS Admin</Link>
                <Link to="/analytics" className="block text-green-600 hover:text-green-800">Analytics</Link>
                <Link to="/autonomous" className="block text-green-600 hover:text-green-800">Autonomous AI</Link>
              </div>
            </div>

            {/* Protected Pages */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Protected Pages</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-purple-600 hover:text-purple-800">Login</Link>
                <Link to="/register" className="block text-purple-600 hover:text-purple-800">Register</Link>
                <Link to="/dashboard" className="block text-purple-600 hover:text-purple-800">Dashboard</Link>
                <Link to="/portal-selection" className="block text-purple-600 hover:text-purple-800">Portal Selection</Link>
                <Link to="/profile" className="block text-purple-600 hover:text-purple-800">Profile</Link>
                <Link to="/settings" className="block text-purple-600 hover:text-purple-800">Settings</Link>
                <Link to="/billing" className="block text-purple-600 hover:text-purple-800">Billing</Link>
                <Link to="/analytics-dashboard" className="block text-purple-600 hover:text-purple-800">Analytics Dashboard</Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full">Register</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="w-full">View Pricing</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Created by Autonomous Agent */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Trans Bot AI</h4>
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
                <li>• Last Build: 11:33:44 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Link to="/live-monitoring">
                  <Button variant="outline" size="sm">Monitor</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              🔥 This entire page was created by autonomous agents at 11:33:44 PM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;