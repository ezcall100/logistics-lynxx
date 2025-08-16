import React, { useEffect, useState } from 'react';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Activity,
  CheckCircle,
  Clock,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Enhanced Icons for Owner-Operator Portal
const Icons = {
  Dashboard: '📊',
  Loads: '📦',
  Finances: '💰',
  Documents: '📋',
  Tracking: '📍',
  Messages: '💬',
  Settings: '⚙️',
  Search: '🔍',
  Bell: '🔔',
  Profile: '👤',
  Home: '🏠',
  ArrowRight: '➡️',
  ArrowDown: '⬇️',
  Check: '✅',
  Warning: '⚠️',
  Error: '❌',
  Info: 'ℹ️',
  Clock: '⏰',
  Calendar: '📅',
  Dollar: '💵',
  Percent: '📊',
  Chart: '📈',
  File: '📄',
  Upload: '📤',
  Download: '📥',
  Send: '📤',
  Receive: '📥',
  Bank: '🏦',
  Credit: '💳',
  Calculator: '🧮',
  Document: '📋',
  Chat: '💬',
  Phone: '📞',
  Email: '📧',
  Lock: '🔒',
  Unlock: '🔓',
  Shield: '🛡️',
  Star: '⭐',
  Fire: '🔥',
  Rocket: '🚀',
  Target: '🎯',
  Trophy: '🏆',
  Medal: '🥇',
  Diamond: '💎',
  Sparkles: '✨',
  Money: '💸',
  Growth: '📈',
  Success: '✅',
  Pending: '⏳',
  Rejected: '❌',
  Approved: '✅',
  Processing: '🔄',
  Completed: '🎉',
  Overdue: '🚨',
  OnTime: '⏰',
  Early: '⚡',
  Late: '🐌',
  High: '🔴',
  Medium: '🟡',
  Low: '🟢',
  Truck: '🚛',
  Route: '🗺️',
  Fuel: '⛽',
  Maintenance: '🔧',
  ELD: '📱',
  GPS: '📍',
  POD: '📋',
  BOL: '📄',
  Rate: '💰',
  Broker: '🤝',
  Carrier: '🚛',
  Shipper: '📦',
  Factoring: '💼',
  OwnerOperator: '👨‍💼'
};

const OwnerOperatorPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoad, setSelectedLoad] = useState('all');

  // Sample data for the owner-operator portal
  const [businessData, setBusinessData] = useState({
    totalEarnings: 125000,
    monthlyRevenue: 28500,
    activeLoads: 3,
    completedLoads: 47,
    onTimeDelivery: 98.5,
    fuelExpenses: 8500,
    maintenanceCosts: 2200,
    factoringUsage: 85.2,
    creditScore: 750
  });

  const [loads, setLoads] = useState([
    {
      id: 'LD-001',
      broker: 'ABC Freight',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      rate: 1250,
      status: 'active',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-22',
      trailerType: 'Dry Van',
      weight: '45,000 lbs',
      factoringStatus: 'pending',
      documents: ['BOL', 'Rate Confirmation'],
      priority: 'high'
    },
    {
      id: 'LD-002',
      broker: 'XYZ Logistics',
      origin: 'Phoenix, AZ',
      destination: 'Las Vegas, NV',
      rate: 950,
      status: 'completed',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      trailerType: 'Reefer',
      weight: '38,000 lbs',
      factoringStatus: 'paid',
      documents: ['BOL', 'POD', 'Rate Confirmation'],
      priority: 'medium'
    },
    {
      id: 'LD-003',
      broker: 'Fast Freight Co',
      origin: 'Las Vegas, NV',
      destination: 'Salt Lake City, UT',
      rate: 1100,
      status: 'pending',
      pickupDate: '2024-01-25',
      deliveryDate: '2024-01-27',
      trailerType: 'Flatbed',
      weight: '42,000 lbs',
      factoringStatus: 'not_submitted',
      documents: ['BOL'],
      priority: 'low'
    }
  ]);

  const [factoringData, setFactoringData] = useState({
    outstandingInvoices: 2850,
    pendingPayments: 1250,
    factoringFees: 285,
    advanceRate: 85,
    totalFactored: 125000,
    averagePaymentTime: 2.1
  });

  const [documents, setDocuments] = useState([
    {
      id: 'DOC-001',
      type: 'BOL',
      loadId: 'LD-001',
      status: 'uploaded',
      uploadedDate: '2024-01-20',
      required: true
    },
    {
      id: 'DOC-002',
      type: 'POD',
      loadId: 'LD-002',
      status: 'approved',
      uploadedDate: '2024-01-19',
      required: true
    },
    {
      id: 'DOC-003',
      type: 'Rate Confirmation',
      loadId: 'LD-001',
      status: 'pending',
      uploadedDate: '2024-01-20',
      required: true
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Owner-Operator Portal</h2>
          <p className="text-gray-600">Initializing business management tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">OO</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Owner-Operator Portal</h1>
              <p className="text-sm text-gray-600">Business Management & Factoring</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search loads, documents, or brokers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">{Icons.Search}</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 relative group">
              <span className="text-xl">{Icons.Bell}</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                5
              </span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <span className="text-xl">{Icons.Settings}</span>
            </button>
            <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">OO</span>
              </div>
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-gray-500">Owner-Operator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="bg-white/80 backdrop-blur-md shadow-lg w-72 sticky top-20 h-screen overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard, color: 'from-blue-500 to-cyan-500' },
                { key: 'loads', label: 'Load Management', icon: Icons.Loads, color: 'from-green-500 to-emerald-500' },
                { key: 'finances', label: 'Financial Tools', icon: Icons.Finances, color: 'from-purple-500 to-pink-500' },
                { key: 'documents', label: 'Documents', icon: Icons.Documents, color: 'from-orange-500 to-yellow-500' },
                { key: 'tracking', label: 'GPS Tracking', icon: Icons.Tracking, color: 'from-red-500 to-pink-500' },
                { key: 'messages', label: 'Messages', icon: Icons.Messages, color: 'from-indigo-500 to-purple-500' },
                { key: 'settings', label: 'Settings', icon: Icons.Settings, color: 'from-gray-500 to-slate-500' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                    activeTab === item.key 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-blue-500">{Icons.Home}</span>
              <span className="text-gray-400">{Icons.ArrowRight}</span>
              <span className="font-medium text-gray-900">Owner-Operator Portal</span>
            </div>

            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
              <>
                {/* Business Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">YTD</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">${businessData.totalEarnings.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-green-500 mr-1">↗</span>
                        +15.2% from last year
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Live</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{businessData.activeLoads}</div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-green-500 mr-1">{Icons.Check}</span>
                        All on schedule
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Factoring Usage</CardTitle>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">Active</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">{businessData.factoringUsage}%</div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-green-500 mr-1">{Icons.Money}</span>
                        ${factoringData.outstandingInvoices.toLocaleString()} pending
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
                      <Badge variant="default" className="bg-green-500">Excellent</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">{businessData.onTimeDelivery}%</div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className="text-green-500 mr-1">{Icons.Trophy}</span>
                        Industry leading
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Load Management & Factoring Integration */}
                <Card className="mb-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Loads}</span>
                      Load Management & Factoring
                      <Badge variant="secondary" className="ml-2">Integrated</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Active Loads */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="text-green-500">{Icons.Truck}</span>
                          Active Loads
                        </h3>
                        <div className="space-y-3">
                          {loads.filter(load => load.status === 'active').map(load => (
                            <div key={load.id} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-green-800">{load.id}</h4>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  ${load.rate.toLocaleString()}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {load.origin} → {load.destination}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">{load.broker}</span>
                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                  {Icons.Factoring} Send to Factoring
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Factoring Status */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="text-purple-500">{Icons.Factoring}</span>
                          Factoring Status
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-purple-800">Pending Payments</span>
                              <span className="text-2xl font-bold text-purple-600">${factoringData.pendingPayments.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Average payment time: {factoringData.averagePaymentTime} days</p>
                            <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600">
                              {Icons.Chart} View Details
                            </Button>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-blue-800">Advance Rate</span>
                              <span className="text-2xl font-bold text-blue-600">{factoringData.advanceRate}%</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Net payout after factoring fees</p>
                            <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600">
                              {Icons.Calculator} Calculate Payout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="mb-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Rocket}</span>
                      Quick Actions
                      <Badge variant="secondary" className="ml-2">Business Tools</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Loads}</span>
                        <span className="text-sm font-medium">Find Loads</span>
                        <span className="text-xs opacity-90">Load Board Access</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Factoring}</span>
                        <span className="text-sm font-medium">Factoring Request</span>
                        <span className="text-xs opacity-90">Quick Payment</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Documents}</span>
                        <span className="text-sm font-medium">Upload POD</span>
                        <span className="text-xs opacity-90">Document Management</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Tracking}</span>
                        <span className="text-sm font-medium">GPS Tracking</span>
                        <span className="text-xs opacity-90">Real-time Location</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Maintenance}</span>
                        <span className="text-sm font-medium">Maintenance Log</span>
                        <span className="text-xs opacity-90">Vehicle Care</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                        <span className="text-xl mb-1">{Icons.Chart}</span>
                        <span className="text-sm font-medium">Analytics</span>
                        <span className="text-xs opacity-90">Business Insights</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Load Management Tab */}
            {activeTab === 'loads' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Loads}</span>
                      Load Management
                      <Badge variant="secondary" className="ml-2">Integrated with Brokers</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {loads.map(load => (
                        <div key={load.id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-gray-800">{load.id}</h3>
                            <Badge variant={load.status === 'active' ? 'default' : load.status === 'completed' ? 'secondary' : 'outline'}>
                              {load.status}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-600">Route</p>
                              <p className="font-medium">{load.origin} → {load.destination}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Rate</p>
                              <p className="text-2xl font-bold text-green-600">${load.rate.toLocaleString()}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-600">Broker</p>
                                <p className="font-medium">{load.broker}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Trailer</p>
                                <p className="font-medium">{load.trailerType}</p>
                              </div>
                            </div>
                            <div className="pt-3 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Factoring</span>
                                <Badge variant={load.factoringStatus === 'paid' ? 'default' : load.factoringStatus === 'pending' ? 'secondary' : 'outline'}>
                                  {load.factoringStatus}
                                </Badge>
                              </div>
                            </div>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                              {Icons.Factoring} Send to Factoring
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Financial Tools Tab */}
            {activeTab === 'finances' && (
              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{Icons.Finances}</span>
                      Financial Management
                      <Badge variant="secondary" className="ml-2">Integrated Factoring</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <span className="text-green-500">{Icons.Money}</span>
                          Earnings Overview
                        </h3>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            ${businessData.monthlyRevenue.toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600">This month's revenue</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ${factoringData.outstandingInvoices.toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600">Outstanding invoices</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <span className="text-purple-500">{Icons.Factoring}</span>
                          Factoring Tools
                        </h3>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-2">
                            {factoringData.advanceRate}%
                          </div>
                          <p className="text-sm text-gray-600">Advance rate</p>
                        </div>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">
                          {Icons.Calculator} Calculate Net Payout
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">© 2024 Owner-Operator Portal</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Version 2.1.0</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Port: 8080</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Connected to All Portals
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Help}</span>
                <span>Help</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Settings}</span>
                <span>Settings</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-red-600 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Logout}</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OwnerOperatorPortal;
