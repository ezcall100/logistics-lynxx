import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">TBA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trans Bot AI</h1>
                <p className="text-xs text-gray-600">Autonomous Agents</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">About</Link>
              <Link to="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600">Services</Link>
              <Link to="/autonomous" className="text-sm font-medium text-gray-600 hover:text-blue-600">Autonomous</Link>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              <Link to="/autonomous">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Autonomous Portal
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
                  🎯 Smart Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-600">
                  AI-driven performance optimization and user experience improvements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Access
            </h3>
            <p className="text-gray-600">
              Access key portals and features
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/autonomous">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <h4 className="font-semibold text-gray-900">Autonomous Portal</h4>
                  <p className="text-sm text-gray-600">AI Development Dashboard</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/broker">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-900">Broker Portal</h4>
                  <p className="text-sm text-gray-600">Freight Management</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/carrier">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🚛</div>
                  <h4 className="font-semibold text-gray-900">Carrier Portal</h4>
                  <p className="text-sm text-gray-600">Fleet Operations</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/shipper">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">📦</div>
                  <h4 className="font-semibold text-gray-900">Shipper Portal</h4>
                  <p className="text-sm text-gray-600">Booking & Tracking</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Trans Bot AI</h3>
            <p className="text-gray-400 mb-6">
              Powered by autonomous agents for continuous improvement
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/services" className="text-gray-400 hover:text-white">Services</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              <Link to="/autonomous" className="text-gray-400 hover:text-white">Autonomous</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;