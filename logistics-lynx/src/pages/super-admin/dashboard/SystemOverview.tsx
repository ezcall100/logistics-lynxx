import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  DollarSign, 
  Shield, 
  Network,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw
} from 'lucide-react';
import { getSystemMetrics, getUserAnalytics } from '../../../api/dashboard';

// 🌟 Innovative Design System Components
const InnovativeCard = ({ children, className = "", hover = true, glass = false, elevated = false, premium = false, animated = false, mode = "light", ...props }: any) => {
  const styles = {
    glass: mode === "light" ? "bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl" : "bg-slate-800/20 backdrop-blur-2xl border border-slate-700/30 shadow-2xl",
    elevated: mode === "light" ? "bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-2xl border border-slate-200/80 shadow-2xl" : "bg-gradient-to-br from-slate-800 via-blue-900/30 to-indigo-900/30 backdrop-blur-2xl border border-slate-700/80 shadow-2xl",
    surface: mode === "light" ? "bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-xl" : "bg-slate-800/95 backdrop-blur-xl border border-slate-700/60 shadow-xl"
  };
  
  return (
    <div 
      className={`${glass ? styles.glass : elevated ? styles.elevated : styles.surface} rounded-2xl p-6 transition-all duration-300 cubic-bezier(0.68, -0.55, 0.265, 1.55) ${hover ? 'hover:scale-[1.02]' : ''} ${animated ? 'animate-pulse' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

const InnovativeButton = ({ children, onClick, variant = "primary", size = "md", className = "", icon, loading = false, premium = false, mode = "light", ...props }: any) => {
  const variants = {
    primary: mode === "light" ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/35 hover:scale-105" : "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-600 text-white shadow-xl shadow-cyan-400/25 hover:shadow-2xl hover:shadow-cyan-400/35 hover:scale-105",
    secondary: mode === "light" ? "bg-white/90 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:bg-white hover:border-slate-300 shadow-lg hover:shadow-xl hover:scale-105" : "bg-slate-800/90 backdrop-blur-sm border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 shadow-lg hover:shadow-xl hover:scale-105",
    outline: mode === "light" ? "bg-transparent border border-slate-200/60 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md" : "bg-transparent border border-slate-700/60 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 shadow-sm hover:shadow-md"
  };
  
  const sizes = {
    sm: "px-4 py-2.5 text-sm font-medium",
    md: "px-6 py-3 text-sm font-semibold",
    lg: "px-8 py-4 text-base font-bold"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${variants[variant]} ${sizes[size]} transition-all duration-300 cubic-bezier(0.68, -0.55, 0.265, 1.55) rounded-xl font-medium ${loading ? 'opacity-75 cursor-not-allowed' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        )}
        {icon && !loading && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};

const InnovativeBadge = ({ children, variant = "default", className = "", pulse = false, premium = false, mode = "light" }: any) => {
  const variants = {
    default: mode === "light" ? "bg-gradient-to-r from-cyan-100 to-indigo-100 text-cyan-800 border border-cyan-200/60" : "bg-gradient-to-r from-cyan-900 to-indigo-900 text-cyan-200 border border-cyan-700/60",
    success: mode === "light" ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/60" : "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/60",
    warning: mode === "light" ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200/60" : "bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 border border-amber-700/60",
    danger: mode === "light" ? "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200/60" : "bg-gradient-to-r from-red-900 to-pink-900 text-red-200 border border-red-700/60",
    live: mode === "light" ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/60 animate-pulse" : "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/60 animate-pulse"
  };
  
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${variants[variant]} shadow-xl ${mode === "light" ? 'shadow-slate-900/8' : 'shadow-black/20'} ${pulse ? 'animate-pulse' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}>
      {children}
    </span>
  );
};

interface SystemOverviewProps {}

const SystemOverview: React.FC<SystemOverviewProps> = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<any>(null);
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const mode = darkMode ? "dark" : "light";

  const fetchData = async () => {
    setLoading(true);
    console.log('🔄 Fetching API data...');
    try {
      const [metricsResult, analyticsResult] = await Promise.all([
        getSystemMetrics(),
        getUserAnalytics()
      ]);
      
      console.log('📊 API Response - Metrics:', metricsResult);
      console.log('📈 API Response - Analytics:', analyticsResult);
      
      if (metricsResult.data) {
        setSystemMetrics(metricsResult.data);
      }
      
      if (analyticsResult.data) {
        setUserAnalytics(analyticsResult.data);
      }
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fallback data if API fails
  const fallbackMetrics = {
    revenue: 125000,
    activeUsers: 156,
    securityScore: 94
  };

  const systemHealth = {
    uptime: 99.8,
    cpuUsage: 45,
    memoryUsage: 62,
    activeConnections: 1234,
    responseTime: 125,
    status: 'healthy'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return mode === "light" ? 'text-emerald-600' : 'text-emerald-400';
      case 'warning': return mode === "light" ? 'text-amber-600' : 'text-amber-400';
      case 'critical': return mode === "light" ? 'text-red-600' : 'text-red-400';
      default: return mode === "light" ? 'text-slate-600' : 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <LayoutDashboard className={`h-6 w-6 ${mode === "light" ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <h1 className={`text-2xl sm:text-3xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>
                System Overview
              </h1>
            </div>
            <p className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>
              Real-time system metrics and performance monitoring
            </p>
          </div>
          <InnovativeButton 
            variant="outline" 
            mode={mode}
            onClick={fetchData}
            loading={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </InnovativeButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InnovativeCard mode={mode} hover={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Total Revenue</p>
                              <p className={`text-2xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>
                  {loading ? 'Loading...' : formatCurrency(systemMetrics?.totalRevenue || fallbackMetrics.revenue)}
                </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
            <span className="text-emerald-600">+12.5%</span>
            <span className={`ml-1 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>from last month</span>
          </div>
        </InnovativeCard>

        <InnovativeCard mode={mode} hover={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Active Users</p>
                              <p className={`text-2xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>
                  {loading ? 'Loading...' : formatNumber(systemMetrics?.activeUsers || fallbackMetrics.activeUsers)}
                </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-blue-600">+8.2%</span>
            <span className={`ml-1 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>from last week</span>
          </div>
        </InnovativeCard>

        <InnovativeCard mode={mode} hover={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Security Score</p>
                              <p className={`text-2xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>
                  {loading ? 'Loading...' : (systemMetrics?.securityScore || fallbackMetrics.securityScore)}/100
                </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-cyan-100 to-indigo-100 rounded-xl">
              <Shield className="h-6 w-6 text-cyan-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-cyan-600 mr-1" />
            <span className="text-cyan-600">Excellent</span>
            <span className={`ml-1 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>security status</span>
          </div>
        </InnovativeCard>

        <InnovativeCard mode={mode} hover={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>System Status</p>
              <p className={`text-2xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Healthy</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Activity className="h-4 w-4 text-emerald-600 mr-1" />
            <span className="text-emerald-600">All systems operational</span>
          </div>
        </InnovativeCard>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InnovativeCard mode={mode} elevated={true}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>System Health</h3>
            <InnovativeBadge variant="live" mode={mode}>Live</InnovativeBadge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className={`h-4 w-4 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>CPU Usage</span>
              </div>
              <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{systemHealth.cpuUsage}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className={`h-4 w-4 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Memory Usage</span>
              </div>
              <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{systemHealth.memoryUsage}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className={`h-4 w-4 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Active Connections</span>
              </div>
              <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{formatNumber(systemHealth.activeConnections)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className={`h-4 w-4 ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`} />
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Response Time</span>
              </div>
              <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{systemHealth.responseTime}ms</span>
            </div>
          </div>
        </InnovativeCard>

        <InnovativeCard mode={mode} elevated={true}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Uptime & Performance</h3>
            <InnovativeBadge variant="success" mode={mode}>99.8%</InnovativeBadge>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>System Uptime</span>
                <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{formatUptime(systemHealth.uptime)}</span>
              </div>
              <div className={`w-full ${mode === "light" ? 'bg-slate-200' : 'bg-slate-700'} rounded-full h-2`}>
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{ width: `${systemHealth.uptime}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Performance Score</span>
                <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>A+</span>
              </div>
              <div className={`w-full ${mode === "light" ? 'bg-slate-200' : 'bg-slate-700'} rounded-full h-2`}>
                <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Security Rating</span>
                <span className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Excellent</span>
              </div>
              <div className={`w-full ${mode === "light" ? 'bg-slate-200' : 'bg-slate-700'} rounded-full h-2`}>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </InnovativeCard>
      </div>

      {/* Recent Activity */}
      <InnovativeCard mode={mode} glass={true}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Recent Activity</h3>
          <InnovativeButton variant="outline" className="text-sm" mode={mode}>
            View All
          </InnovativeButton>
        </div>
        
        <div className="space-y-3">
          <div className={`flex items-center space-x-3 p-3 ${mode === "light" ? 'bg-slate-50/50' : 'bg-slate-700/50'} rounded-lg`}>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>System backup completed successfully</p>
              <p className={`text-xs ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>2 minutes ago</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-3 p-3 ${mode === "light" ? 'bg-slate-50/50' : 'bg-slate-700/50'} rounded-lg`}>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>New user registration: john.doe@company.com</p>
              <p className={`text-xs ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>5 minutes ago</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-3 p-3 ${mode === "light" ? 'bg-slate-50/50' : 'bg-slate-700/50'} rounded-lg`}>
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Shield className="h-4 w-4 text-cyan-600" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Security scan completed - No threats detected</p>
              <p className={`text-xs ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>10 minutes ago</p>
            </div>
          </div>
        </div>
      </InnovativeCard>
    </div>
  );
};

export default SystemOverview;
