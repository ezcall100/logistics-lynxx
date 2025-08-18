import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  SignalLow
} from 'lucide-react';

// Portal configuration with enhanced data
const portalConfig = {
  carrier: {
    title: 'Carrier Portal',
    description: 'Manage your fleet, drivers, and load assignments efficiently',
    icon: Truck,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    features: ['Fleet Management', 'Load Management', 'Driver Portal', 'Route Optimization', 'Compliance', 'Reports'],
    stats: {
      activeFleets: '24',
      totalDrivers: '156',
      activeLoads: '89',
      onTimeDelivery: '98.5%'
    }
  },
  broker: {
    title: 'Broker Portal',
    description: 'Connect carriers with shippers and manage load distribution',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    features: ['Load Board', 'Carrier Network', 'Rate Management', 'Documentation', 'Analytics', 'CRM'],
    stats: {
      activeLoads: '342',
      carriers: '89',
      totalRevenue: '$2.4M',
      successRate: '94.2%'
    }
  },
  autonomous: {
    title: 'Autonomous Portal',
    description: 'Monitor AI agents and autonomous system performance',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    features: ['AI Dashboard', 'Agent Management', 'System Monitoring', 'Development', 'Configuration', 'Logs'],
    stats: {
      activeAgents: '250',
      systemHealth: '99.8%',
      tasksCompleted: '1,847',
      uptime: '99.9%'
    }
  },
  analytics: {
    title: 'Analytics Portal',
    description: 'Comprehensive analytics and reporting for all operations',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    features: ['Overview', 'Performance', 'Data Insights', 'Trend Analysis', 'Custom Reports', 'Export'],
    stats: {
      dataPoints: '2.4M',
      reports: '156',
      insights: '89',
      accuracy: '99.7%'
    }
  }
};

// Enhanced Portal Selection Component
const PortalSelector = () => {
  const navigate = useNavigate();

  const handlePortalClick = (portalType: string) => {
    navigate(`/${portalType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Logistics Lynx
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive logistics management platform. Choose your portal to access powerful tools and insights.
            </p>
          </div>
        </div>
      </div>

      {/* Portal Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(portalConfig).map(([portalType, config]) => {
            const IconComponent = config.icon;
            return (
              <div
                key={portalType}
                onClick={() => handlePortalClick(portalType)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-2 ${config.borderColor} overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {config.title}
                      </h3>
                      <p className="text-gray-600">
                        {config.description}
                      </p>
                    </div>
                    <div className={`w-16 h-16 ${config.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 text-gray-700`} />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(config.stats).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {config.features.slice(0, 4).map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {config.features.length > 4 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          +{config.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <GlobalErrorBoundary>
      <div className="App">
        <Routes>
          {/* Main Portal Selection */}
          <Route path="/" element={<PortalSelector />} />

          {/* Portal Dashboards */}
          <Route 
            path="/carrier/*" 
            element={
              <ModernLayout
                portalType="carrier"
                title="Carrier Management Dashboard"
                description="Manage your fleet, drivers, and load assignments efficiently"
                menuItems={portalMenus.carrier}
              >
                <ModernDashboard
                  title="Carrier Management Dashboard"
                  description="Manage your fleet, drivers, and load assignments efficiently"
                  data={sampleDashboardData.carrier}
                  portalType="carrier"
                />
              </ModernLayout>
            } 
          />

          <Route 
            path="/broker/*" 
            element={
              <ModernLayout
                portalType="broker"
                title="Broker Management Dashboard"
                description="Connect carriers with shippers and manage load distribution"
                menuItems={portalMenus.broker}
              >
                <ModernDashboard
                  title="Broker Management Dashboard"
                  description="Connect carriers with shippers and manage load distribution"
                  data={sampleDashboardData.broker}
                  portalType="broker"
                />
              </ModernLayout>
            } 
          />

          <Route 
            path="/autonomous/*" 
            element={
              <ModernLayout
                portalType="autonomous"
                title="Autonomous AI Dashboard"
                description="Monitor AI agents and autonomous system performance"
                menuItems={portalMenus.autonomous}
              >
                <ModernDashboard
                  title="Autonomous AI Dashboard"
                  description="Monitor AI agents and autonomous system performance"
                  data={sampleDashboardData.autonomous}
                  portalType="autonomous"
                />
              </ModernLayout>
            } 
          />

          <Route 
            path="/analytics/*" 
            element={
              <ModernLayout
                portalType="analytics"
                title="Analytics Dashboard"
                description="Comprehensive analytics and reporting for all operations"
                menuItems={portalMenus.analytics}
              >
                <ModernDashboard
                  title="Analytics Dashboard"
                  description="Comprehensive analytics and reporting for all operations"
                  data={sampleDashboardData.analytics || sampleDashboardData.carrier}
                  portalType="analytics"
                />
              </ModernLayout>
            } 
          />

          {/* Additional Routes */}
          <Route path="/software-company" element={<SoftwareCompanyDashboard />} />
          <Route path="/master-agent" element={<MasterAutonomousAgentDashboard />} />

          {/* Catch-all route - redirect to portal selection */}
          <Route path="*" element={<PortalSelector />} />
        </Routes>
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;