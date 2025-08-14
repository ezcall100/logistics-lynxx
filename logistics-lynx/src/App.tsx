import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Zap, 
  Globe, 
  Settings, 
  ArrowRight,
  CheckCircle,
  Clock,
  Server,
  Shield,
  Truck,
  Route,
  Package
} from 'lucide-react';
import AutonomousDashboard from './pages/autonomous-dashboard';

function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-green-500 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold">Trans Bot AI</h1>
        <p className="text-xl text-muted-foreground">
          Leading TMS Software Company - Autonomous Transportation Management Systems
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="default" className="bg-green-500">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            LIVE
          </Badge>
          <Badge variant="outline">24/7 Autonomous TMS</Badge>
          <Badge variant="outline">AI-Powered Logistics</Badge>
        </div>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">TMS Software Active</h3>
                <p className="text-green-600">Autonomous fleet management</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">23 Active Operations</h3>
                <p className="text-blue-600">Real-time logistics processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800">98.5% System Health</h3>
                <p className="text-purple-600">Optimal TMS performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Trans Bot AI Autonomous Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Monitor real-time autonomous TMS operations, website building, and system performance. 
            View live feeds, metrics, and autonomous software development with full authority control.
          </p>
          <Link to="/autonomous-dashboard">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
              <Activity className="w-5 h-5 mr-2" />
              Open TMS Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* TMS Software Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h4 className="font-semibold">Fleet Management</h4>
            <p className="text-sm text-muted-foreground">Autonomous vehicle tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Route className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h4 className="font-semibold">Route Optimization</h4>
            <p className="text-sm text-muted-foreground">AI-powered logistics planning</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <h4 className="font-semibold">Load Management</h4>
            <p className="text-sm text-muted-foreground">Intelligent cargo optimization</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <h4 className="font-semibold">Real-time Updates</h4>
            <p className="text-sm text-muted-foreground">Live TMS operations</p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-center space-x-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Trans Bot AI TMS Software</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-sm">24/7 Autonomous Operation</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm">Enterprise Security</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span className="text-sm">Transportation Management</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/autonomous-dashboard" element={<AutonomousDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;