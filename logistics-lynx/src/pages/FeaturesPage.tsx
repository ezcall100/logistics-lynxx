/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Brain, Zap, BarChart3, Truck, Shield, Globe, 
  Route, Clock, DollarSign, Users, Settings, 
  Smartphone, Database, Cloud, Lock, CheckCircle 
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Features & Capabilities
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            AI-Powered Features
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover the revolutionary features that make Trans Bot AI the most advanced transportation management platform
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of intelligent transportation management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI Route Optimization</CardTitle>
                <CardDescription>
                  Advanced machine learning algorithms optimize routes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Reduces fuel costs by 25%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Decreases delivery times by 30%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time traffic integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>
                  Live monitoring of all vehicles and shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    GPS tracking with 99.9% accuracy
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Instant alerts and notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Historical route analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>
                  Data-driven insights for better decision making
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Demand forecasting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Maintenance predictions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cost optimization insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Smart Load Matching</CardTitle>
                <CardDescription>
                  AI-powered matching of loads to vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Optimal capacity utilization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Reduced empty miles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automated matching algorithms
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Safety Management</CardTitle>
                <CardDescription>
                  Proactive safety monitoring and prevention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Driver behavior monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Incident prevention alerts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Compliance tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Global Operations</CardTitle>
                <CardDescription>
                  Manage operations across multiple countries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multi-language support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Local compliance features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Currency conversion
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade features for complex operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Route className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Dynamic Route Planning</CardTitle>
                <CardDescription>
                  Routes that adapt to real-time conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our AI continuously monitors traffic, weather, and other factors to dynamically adjust routes for optimal efficiency.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">Real-time Updates</Badge>
                  <Badge variant="outline">Weather Integration</Badge>
                  <Badge variant="outline">Traffic Analysis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Predictive Scheduling</CardTitle>
                <CardDescription>
                  AI-powered scheduling optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced algorithms predict optimal scheduling based on historical data and current conditions.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">ML Algorithms</Badge>
                  <Badge variant="outline">Historical Data</Badge>
                  <Badge variant="outline">Optimization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>
                  Maximize efficiency, minimize costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive cost analysis and optimization recommendations to reduce operational expenses.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">Fuel Optimization</Badge>
                  <Badge variant="outline">Maintenance Planning</Badge>
                  <Badge variant="outline">Cost Analysis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Comprehensive driver and team oversight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete driver management system with performance tracking and training recommendations.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">Performance Tracking</Badge>
                  <Badge variant="outline">Training Programs</Badge>
                  <Badge variant="outline">Team Analytics</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology for maximum reliability and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Cloud className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <CardTitle>Cloud-Native</CardTitle>
                <CardDescription>
                  Built on AWS for scalability and reliability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Database className="h-12 w-12 text-green-600 mb-4 mx-auto" />
                <CardTitle>Real-time Database</CardTitle>
                <CardDescription>
                  PostgreSQL with real-time synchronization
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
                <CardTitle>Mobile First</CardTitle>
                <CardDescription>
                  Responsive design for all devices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Lock className="h-12 w-12 text-red-600 mb-4 mx-auto" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  SOC 2 compliant with end-to-end encryption
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience AI-Powered Transportation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how Trans Bot AI can transform your operations
          </p>
          <Button size="lg" variant="secondary">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
