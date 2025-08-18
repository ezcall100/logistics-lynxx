import React, { useState } from 'react';
import { Routes, Route as RouterRoute, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { ModernLayout, portalMenus } from './components/layout/ModernLayout';
import { ModernDashboard } from './components/dashboard/ModernDashboard';
import { sampleDashboardData } from './components/dashboard/sample-data';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { SoftwareCompanyDashboard } from './components/SoftwareCompanyDashboard';
import { MasterAutonomousAgentDashboard } from './autonomous/MasterAutonomousAgent.tsx';
import { 
  Truck, 
  FileText, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  Users, 
  Package, 
  Settings,
  Activity,
  Target,
  Globe,
  Shield,
  Zap,
  Database,
  Network,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Car,
  Building2,
  CreditCard,
  Calculator,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Route,
  Eye,
  DollarSign,
  Receipt,
  Banknote,
  Building,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Home,
  Grid,
  List,
  ShoppingCart,
  Wrench,
  Fuel
} from 'lucide-react';

// Complete portal configuration with all available portals
const portalConfig = {
  dashboard: {
    title: 'Main Dashboard',
    description: 'System overview and performance metrics',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    route: '/',
    features: ['System Overview', 'Performance Metrics', 'Active Alerts', 'Portal Navigation'],
    stats: { activeUsers: '2,847', systemHealth: '99.9%', alerts: '3', portals: '20+' }
  },
  carrier: {
    title: 'Carrier Portal',
    description: 'Manage your fleet, drivers, and load assignments efficiently',
    icon: Truck,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    route: '/carrier',
    features: ['Fleet Management', 'Load Management', 'Driver Portal', 'Route Optimization', 'Compliance', 'Reports'],
    stats: { activeFleets: '24', totalDrivers: '156', activeLoads: '89', onTimeDelivery: '98.5%' }
  },
  broker: {
    title: 'Broker Portal',
    description: 'Connect carriers with shippers and manage load distribution',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    route: '/broker',
    features: ['Load Board', 'Carrier Network', 'Rate Management', 'Documentation', 'Analytics', 'CRM'],
    stats: { activeLoads: '342', carriers: '89', totalRevenue: '$2.4M', successRate: '94.2%' }
  },
  shipper: {
    title: 'Shipper Portal',
    description: 'Book shipments and track deliveries in real-time',
    icon: Package,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    route: '/shipper',
    features: ['Shipment Booking', 'Real-time Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
    stats: { shipments: '156', onTime: '98.2%', savings: '$8,950', rating: '4.9/5' }
  },
  driver: {
    title: 'Driver Portal',
    description: 'Mobile interface for drivers with route navigation',
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    route: '/driver',
    features: ['Route Navigation', 'Delivery Tracking', 'Document Upload', 'Communication', 'HOS Tracking'],
    stats: { hours: '7.5/11', miles: '387', score: '98%', mpg: '8.9' }
  },
  autonomous: {
    title: 'Autonomous Portal',
    description: 'Monitor AI agents and autonomous system performance',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    route: '/autonomous',
    features: ['AI Dashboard', 'Agent Management', 'System Monitoring', 'Development', 'Configuration', 'Logs'],
    stats: { activeAgents: '250', systemHealth: '99.8%', tasksCompleted: '1,847', uptime: '99.9%' }
  },
  analytics: {
    title: 'Analytics Portal',
    description: 'Comprehensive analytics and reporting for all operations',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    route: '/analytics',
    features: ['Overview', 'Performance', 'Data Insights', 'Trend Analysis', 'Custom Reports', 'Export'],
    stats: { dataPoints: '2.4M', reports: '156', insights: '89', accuracy: '99.7%' }
  },
  'super-admin': {
    title: 'Super Admin Portal',
    description: 'Complete system administration and oversight',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    route: '/super-admin',
    features: ['User Management', 'System Administration', 'Security Center', 'Portal Management', 'Global Settings'],
    stats: { totalUsers: '2,847', activePortals: '20+', systemHealth: '99.9%', securityScore: 'A+' }
  },
  'owner-operator': {
    title: 'Owner Operator Portal',
    description: 'Independent trucking business management hub',
    icon: Car,
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    route: '/owner-operator',
    features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis', 'Business Planning'],
    stats: { revenue: '$4,750', margin: '23.4%', efficiency: '94.8%', loads: '12' }
  },
  factoring: {
    title: 'Factoring Portal',
    description: 'Invoice factoring and financial management system',
    icon: CreditCard,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    route: '/factoring',
    features: ['Invoice Management', 'Payment Processing', 'Client Management', 'Financial Reports', 'Risk Assessment'],
    stats: { outstandingReceivables: '$2.8M', totalInvoices: '847', approvalRate: '94.5%', clients: '156' }
  },
  'load-board': {
    title: 'Load Board Portal',
    description: 'Comprehensive load matching and management system',
    icon: Target,
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    route: '/load-board',
    features: ['Load Posting', 'Carrier Matching', 'Rate Negotiation', 'Documentation', 'Tracking'],
    stats: { activeLoads: '1,247', carriers: '456', matches: '89%', revenue: '$1.2M' }
  },
  crm: {
    title: 'CRM Portal',
    description: 'Customer relationship management and sales tracking',
    icon: Users,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    route: '/crm',
    features: ['Lead Management', 'Contact Management', 'Sales Pipeline', 'Opportunities', 'Reports'],
    stats: { leads: '234', contacts: '1,567', opportunities: '89', conversionRate: '23.4%' }
  },
  billing: {
    title: 'Billing Portal',
    description: 'Comprehensive billing and invoicing management',
    icon: Receipt,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    route: '/billing',
    features: ['Invoice Generation', 'Payment Processing', 'Account Management', 'Financial Reports', 'Tax Management'],
    stats: { invoices: '456', payments: '389', outstanding: '$67K', collectionRate: '95.2%' }
  },
  marketplace: {
    title: 'Marketplace Portal',
    description: 'Integrated marketplace for logistics services',
    icon: ShoppingCart,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    route: '/marketplace',
    features: ['Service Listings', 'Provider Management', 'Order Processing', 'Reviews', 'Analytics'],
    stats: { services: '234', providers: '89', orders: '1,567', rating: '4.8/5' }
  },
  edi: {
    title: 'EDI Portal',
    description: 'Electronic Data Interchange management system',
    icon: Database,
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    route: '/edi',
    features: ['EDI Setup', 'Partner Management', 'Document Processing', 'Error Handling', 'Compliance'],
    stats: { partners: '67', documents: '2,345', successRate: '99.1%', errors: '23' }
  },
  compliance: {
    title: 'Compliance Portal',
    description: 'Regulatory compliance and safety management',
    icon: Shield,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    route: '/compliance',
    features: ['Safety Monitoring', 'Regulatory Updates', 'Audit Management', 'Training Records', 'Reporting'],
    stats: { safetyScore: '98.5%', violations: '2', trainingHours: '1,234', complianceRate: '99.8%' }
  },
  maintenance: {
    title: 'Maintenance Portal',
    description: 'Fleet maintenance and repair management',
    icon: Wrench,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    route: '/maintenance',
    features: ['Maintenance Scheduling', 'Repair Tracking', 'Parts Management', 'Cost Analysis', 'Vendor Management'],
    stats: { vehicles: '89', scheduled: '12', repairs: '34', costs: '$45K' }
  },
  fuel: {
    title: 'Fuel Portal',
    description: 'Fuel management and cost optimization',
    icon: Fuel,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    route: '/fuel',
    features: ['Fuel Tracking', 'Cost Analysis', 'Network Management', 'Reporting', 'Optimization'],
    stats: { gallons: '12,456', cost: '$67K', efficiency: '8.9 mpg', savings: '$12K' }
  },
  insurance: {
    title: 'Insurance Portal',
    description: 'Insurance management and claims processing',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    route: '/insurance',
    features: ['Policy Management', 'Claims Processing', 'Risk Assessment', 'Coverage Analysis', 'Reporting'],
    stats: { policies: '45', claims: '12', coverage: '$5.2M', premiums: '$89K' }
  },
  'software-company': {
    title: 'Software Company Dashboard',
    description: 'Software company management and development',
    icon: Monitor,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    route: '/software-company',
    features: ['Development', 'Product Management', 'Customer Support', 'Sales', 'Marketing'],
    stats: { customers: '1,234', revenue: '$2.4M', support: '98%', growth: '23.4%' }
  }
};

function App() {
  const [currentPortal, setCurrentPortal] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter portals based on search query
  const filteredPortals = Object.entries(portalConfig).filter(([key, portal]) =>
    portal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    portal.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Enhanced Portal Selection Component
  const PortalSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Logistics Lynx
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your comprehensive logistics management platform. Choose your portal to access powerful tools and insights.
            </p>
            
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search portals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPortals.map(([portalType, config]) => {
              const IconComponent = config.icon;
              return (
                <div
                  key={portalType}
                  onClick={() => navigate(config.route)}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-2 ${config.borderColor} overflow-hidden`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {config.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {config.description}
                        </p>
                      </div>
                      <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ml-4`}>
                        <IconComponent className={`w-6 h-6 text-gray-700`} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(config.stats).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {config.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {config.features.length > 3 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            +{config.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Portal Active
                      </div>
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Access Portal
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPortals.map(([portalType, config]) => {
              const IconComponent = config.icon;
              return (
                <div
                  key={portalType}
                  onClick={() => navigate(config.route)}
                  className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${config.borderColor} p-6`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${config.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-8 h-8 text-gray-700`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {config.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {config.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {config.features.slice(0, 4).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                          {config.features.length > 4 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              +{config.features.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Stats</div>
                        <div className="text-sm font-medium text-gray-900">
                          {Object.values(config.stats).slice(0, 2).join(' • ')}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All Systems Operational
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Real-time Updates
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Secure Access
            </div>
            <div className="flex items-center">
              <span className="font-medium">{filteredPortals.length} Portals Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <GlobalErrorBoundary>
      <div className="App">
        <Routes>
          {/* Main Portal Selection */}
          <RouterRoute path="/" element={<PortalSelector />} />

          {/* Portal Dashboards */}
          {Object.entries(portalConfig).map(([portalType, config]) => (
            <RouterRoute
              key={portalType}
              path={`${config.route}/*`}
              element={
                <ModernLayout
                  portalType={portalType}
                  title={config.title}
                  description={config.description}
                  menuItems={portalMenus[portalType] || []}
                >
                  <ModernDashboard
                    title={config.title}
                    description={config.description}
                    data={sampleDashboardData[portalType] || sampleDashboardData.carrier}
                    portalType={portalType}
                  />
                </ModernLayout>
              }
            />
          ))}

          {/* Software Company Dashboard */}
          <RouterRoute 
            path="/software-company" 
            element={<SoftwareCompanyDashboard />} 
          />

          {/* Master Autonomous Agent Dashboard */}
          <RouterRoute 
            path="/master-agent" 
            element={<MasterAutonomousAgentDashboard />} 
          />

          {/* Catch-all route - redirect to portal selection */}
          <RouterRoute 
            path="*" 
            element={<PortalSelector />} 
          />
        </Routes>
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;