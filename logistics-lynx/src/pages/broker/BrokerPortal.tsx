import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Truck, 
  Package, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Settings,
  Bell,
  Calendar,
  FileText,
  Shield,
  Zap,
  Target,
  Award,
  Star,
  Activity,
  Gauge,
  Network,
  Brain
} from 'lucide-react';

// Broker Portal Components
import BrokerDashboard from './BrokerDashboard';
import LoadManagement from './LoadManagement';
import CarrierManagement from './CarrierManagement';
import RateOptimization from './RateOptimization';
import ComplianceCenter from './ComplianceCenter';
import Analytics from './Analytics';

const BrokerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(5);
  const [userProfile, setUserProfile] = useState({
    name: 'John Broker',
    company: 'Elite Logistics Solutions',
    role: 'Senior Broker',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const location = useLocation();

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path);
  }, [location]);

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      path: '/broker',
      description: 'Overview & KPIs'
    },
    {
      id: 'loads',
      name: 'Load Management',
      icon: Package,
      path: '/broker/loads',
      description: 'Smart carrier matching'
    },
    {
      id: 'carriers',
      name: 'Carrier Management',
      icon: Truck,
      path: '/broker/carriers',
      description: 'Fleet optimization'
    },
    {
      id: 'rates',
      name: 'Rate Optimization',
      icon: DollarSign,
      path: '/broker/rates',
      description: 'Margin optimization'
    },
    {
      id: 'compliance',
      name: 'Compliance Center',
      icon: Shield,
      path: '/broker/compliance',
      description: 'Regulatory monitoring'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: TrendingUp,
      path: '/broker/analytics',
      description: 'Business intelligence'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-purple-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Broker Portal
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Logistics Orchestration & Smart Matching
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search loads, carriers..."
                  className="pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-purple-200/50 dark:border-slate-600/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-200 dark:border-slate-600"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userProfile.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-purple-200/50 dark:border-slate-700/50 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-700/50'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-purple-500 group-hover:text-purple-600'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {item.name}
                        </p>
                        <p className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-purple-200/50 dark:border-slate-700/50">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>New Load</span>
                </button>
                <button className="w-full flex items-center space-x-x px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Truck className="h-4 w-4" />
                  <span>Add Carrier</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                  <DollarSign className="h-4 w-4" />
                  <span>Rate Quote</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<BrokerDashboard />} />
            <Route path="/loads" element={<LoadManagement />} />
            <Route path="/carriers" element={<CarrierManagement />} />
            <Route path="/rates" element={<RateOptimization />} />
            <Route path="/compliance" element={<ComplianceCenter />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default BrokerPortal;
