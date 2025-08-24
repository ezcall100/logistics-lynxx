import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SuperAdminRoutes from '../pages/super-admin/SuperAdminRoutes';

// 🎨 STABLE DESIGN SYSTEM - No Flashing, Eye-Friendly, KPI-Focused
const stableStyles = {
  // 🌈 Stable Color Palette - No Flashing, Eye-Friendly
  primary: {
    light: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20"
  },
  secondary: {
    light: "bg-white",
    dark: "bg-slate-800"
  },
  accent: {
    light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600",
    dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500"
  },
  accentHover: {
    light: "bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-700",
    dark: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600"
  },
  
  // 🌊 Stable Glassmorphism - No Flashing
  glass: {
    light: "bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg",
    dark: "bg-slate-800/15 backdrop-blur-xl border border-slate-700/25 shadow-lg"
  },
  glassHover: {
    light: "bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl",
    dark: "bg-slate-800/20 backdrop-blur-xl border border-slate-700/30 shadow-xl"
  },
  glassDark: {
    light: "bg-slate-900/8 backdrop-blur-xl border border-slate-800/15",
    dark: "bg-black/15 backdrop-blur-xl border border-slate-900/15"
  },
  
  // 🏗️ Stable Surfaces - No Flashing
  surface: {
    light: "bg-white/90 backdrop-blur-lg border border-slate-200/50 shadow-lg",
    dark: "bg-slate-800/90 backdrop-blur-lg border border-slate-700/50 shadow-lg"
  },
  surfaceHover: {
    light: "bg-white/95 backdrop-blur-lg border border-slate-300/50 shadow-xl",
    dark: "bg-slate-800/95 backdrop-blur-lg border border-slate-600/50 shadow-xl"
  },
  surfaceElevated: {
    light: "bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 backdrop-blur-lg border border-slate-200/60 shadow-xl",
    dark: "bg-gradient-to-br from-slate-800 via-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-slate-700/60 shadow-xl"
  },
  
  // 📝 Stable Typography - Eye-Friendly
  textPrimary: {
    light: "text-slate-800 font-semibold",
    dark: "text-slate-100 font-semibold"
  },
  textSecondary: {
    light: "text-slate-600",
    dark: "text-slate-300"
  },
  textAccent: {
    light: "text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600",
    dark: "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400"
  },
  textMuted: {
    light: "text-slate-500",
    dark: "text-slate-400"
  },
  
  // 🎯 Stable Borders & Shadows - Subtle
  border: {
    light: "border border-slate-200/50",
    dark: "border border-slate-700/50"
  },
  borderAccent: {
    light: "border border-teal-200/50",
    dark: "border border-teal-700/50"
  },
  shadow: {
    light: "shadow-lg shadow-slate-900/5",
    dark: "shadow-lg shadow-black/15"
  },
  shadowHover: {
    light: "shadow-xl shadow-slate-900/8",
    dark: "shadow-xl shadow-black/20"
  },
  shadowGlow: {
    light: "shadow-md shadow-teal-500/15",
    dark: "shadow-md shadow-teal-400/15"
  },
  
  // ⚡ Stable Micro-interactions - No Flashing
  transition: "transition-all duration-300 ease-out",
  transitionFast: "transition-all duration-200 ease-out",
  transitionSlow: "transition-all duration-500 ease-out",
  transitionSmooth: "transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)",
  
  // 🌊 Stable Gradients - Subtle
  gradientPrimary: {
    light: "bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900/15 to-indigo-900/15"
  },
  gradientAccent: {
    light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600",
    dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500"
  },
  gradientSurface: {
    light: "bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/10",
    dark: "bg-gradient-to-br from-slate-800 via-blue-900/10 to-indigo-900/10"
  },
  gradientGlass: {
    light: "bg-gradient-to-br from-white/15 via-teal-50/5 to-transparent",
    dark: "bg-gradient-to-br from-slate-800/15 via-teal-900/5 to-transparent"
  },
  
  // 🎭 Stable Animations - No Flashing
  animateFloat: "animate-pulse",
  animateGlow: "animate-pulse",
  animateSlide: "animate-in slide-in-from-top-2 duration-300",
  animateFade: "animate-in fade-in duration-300",
  animateScale: "animate-in zoom-in-95 duration-300",
  animateRotate: "animate-spin",
  animatePulse: "animate-pulse"
};

// 🌟 Stable Button Component - No Flashing
const StableButton = ({ children, onClick, variant = "primary", size = "md", className = "", icon, loading = false, premium = false, mode = "light", ...props }: any) => {
  const variants = {
    primary: {
      light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 hover:from-teal-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/25 hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 hover:from-teal-500 hover:via-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-teal-400/20 hover:shadow-xl hover:shadow-teal-400/25 hover:scale-[1.02]"
    },
    secondary: {
      light: "bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-white hover:border-slate-300 shadow-md hover:shadow-lg hover:scale-[1.02]",
      dark: "bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600 shadow-md hover:shadow-lg hover:scale-[1.02]"
    },
    ghost: {
      light: "bg-transparent text-slate-600 hover:bg-slate-100/50 hover:text-slate-800 hover:scale-[1.02]",
      dark: "bg-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 hover:scale-[1.02]"
    },
    danger: {
      light: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-400/20 hover:shadow-xl hover:scale-[1.02]"
    },
    success: {
      light: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-400/20 hover:shadow-xl hover:scale-[1.02]"
    },
    premium: {
      light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 hover:from-teal-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02]",
      dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 hover:from-teal-500 hover:via-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-teal-400/25 hover:shadow-xl hover:shadow-teal-400/30 hover:scale-[1.02]"
    }
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
      className={`${variants[variant][mode]} ${sizes[size]} ${stableStyles.transitionSmooth} rounded-xl font-medium ${loading ? 'opacity-75 cursor-not-allowed' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}
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

// 🎨 Stable Card Component - No Flashing
const StableCard = ({ children, className = "", hover = true, glass = false, elevated = false, premium = false, animated = false, mode = "light", ...props }: any) => (
  <div 
    className={`${glass ? stableStyles.glass[mode] : elevated ? stableStyles.surfaceElevated[mode] : stableStyles.surface[mode]} rounded-2xl p-6 ${hover ? stableStyles.transitionSmooth + ' hover:' + (glass ? stableStyles.glassHover[mode] : stableStyles.surfaceHover[mode]) + ' hover:scale-[1.01]' : ''} ${animated ? 'animate-pulse' : ''} ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// 👤 Stable Avatar Component - Enhanced
const StableAvatar = ({ src, alt, fallback, size = "md", status, ring = false, premium = false, mode = "light" }: any) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base"
  };
  
  const statusColors = {
    online: "bg-emerald-400",
    offline: "bg-slate-400",
    busy: "bg-amber-400",
    away: "bg-blue-400",
    premium: mode === "light" ? "bg-gradient-to-r from-teal-400 to-indigo-400" : "bg-gradient-to-r from-teal-500 to-indigo-500"
  };
  
  return (
    <div className="relative">
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold border-4 border-white shadow-lg ${ring ? 'ring-4 ring-teal-500/20' : ''}`}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[status]} rounded-full border-2 border-white shadow-md`}></div>
      )}
    </div>
  );
};

// 🏷️ Stable Badge Component - No Flashing
const StableBadge = ({ children, variant = "default", className = "", pulse = false, premium = false, mode = "light" }: any) => {
  const variants = {
    default: {
      light: "bg-gradient-to-r from-teal-100 to-indigo-100 text-teal-800 border border-teal-200/50",
      dark: "bg-gradient-to-r from-teal-900 to-indigo-900 text-teal-200 border border-teal-700/50"
    },
    success: {
      light: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/50",
      dark: "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/50"
    },
    warning: {
      light: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200/50",
      dark: "bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 border border-amber-700/50"
    },
    danger: {
      light: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200/50",
      dark: "bg-gradient-to-r from-red-900 to-pink-900 text-red-200 border border-red-700/50"
    },
    info: {
      light: "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200/50",
      dark: "bg-gradient-to-r from-slate-900 to-gray-900 text-slate-200 border border-slate-700/50"
    },
    premium: {
      light: "bg-gradient-to-r from-teal-100 to-indigo-100 text-teal-800 border border-teal-200/50",
      dark: "bg-gradient-to-r from-teal-900 to-indigo-900 text-teal-200 border border-teal-700/50"
    },
    live: {
      light: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/50",
      dark: "bg-gradient-to-r from-emerald-900 to-green-900 text-emerald-200 border border-emerald-700/50"
    }
  };
  
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${variants[variant][mode]} ${stableStyles.shadow[mode]} ${pulse ? 'animate-pulse' : ''} ${premium ? 'animate-pulse' : ''} ${className}`}>
      {children}
    </span>
  );
};

// 📝 Stable Input Component - Enhanced
const StableInput = ({ placeholder, value, onChange, className = "", icon, error, success, premium = false, mode = "light", ...props }: any) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
        {icon}
      </span>
    )}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} ${mode === "light" ? 'bg-white/80' : 'bg-slate-800/80'} backdrop-blur-sm border ${error ? 'border-red-300' : success ? 'border-emerald-300' : mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'} rounded-xl focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/30' : success ? 'focus:ring-emerald-500/30' : 'focus:ring-teal-500/30'} focus:border-teal-500 ${stableStyles.transitionSmooth} ${mode === "light" ? 'text-slate-700 placeholder-slate-400' : 'text-white placeholder-slate-500'} ${premium ? 'animate-pulse' : ''} ${className}`}
      {...props}
    />
    {error && (
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">⚠️</span>
    )}
    {success && (
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 text-sm">✅</span>
    )}
  </div>
);

// 🎯 Stable Dropdown Component - Enhanced
const StableDropdown = ({ isOpen, onToggle, trigger, children, premium = false, mode = "light" }: any) => (
  <div className="relative">
    <div onClick={onToggle} className="cursor-pointer">
      {trigger}
    </div>
    {isOpen && (
      <div className={`absolute right-0 mt-3 w-72 ${mode === "light" ? 'bg-white/95' : 'bg-slate-800/95'} backdrop-blur-xl rounded-2xl shadow-xl ${mode === "light" ? 'border border-white/20' : 'border border-slate-700/20'} z-50 overflow-hidden ${stableStyles.animateSlide}`}>
        {children}
          </div>
    )}
          </div>
);

// 🎨 Stable Menu Item Component - Enhanced
const StableMenuItem = ({ children, onClick, className = "", icon, badge, description, premium = false, mode = "light" }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 ${mode === "light" ? 'hover:bg-slate-50/80' : 'hover:bg-slate-700/80'} cursor-pointer ${stableStyles.transitionFast} ${premium ? 'animate-pulse' : ''} ${className}`}
  >
    <div className="flex items-center space-x-3">
      {icon && <span className="text-slate-400 text-lg">{icon}</span>}
      <div>
        <span className={`font-medium ${mode === "light" ? 'text-slate-700' : 'text-slate-300'}`}>{children}</span>
        {description && <p className={`text-xs ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>{description}</p>}
          </div>
        </div>
    {badge && <StableBadge variant="default" className="text-xs" mode={mode}>{badge}</StableBadge>}
  </div>
);

// 🧭 Stable Nav Item Component - Enhanced
const StableNavItem = ({ children, onClick, className = "", icon, badge, description, active = false, premium = false, mode = "light" }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer ${active ? (mode === "light" ? 'bg-white/10 text-slate-800' : 'bg-slate-700/10 text-white') : (mode === "light" ? 'text-slate-600 hover:bg-white/5 hover:text-slate-800' : 'text-slate-300 hover:bg-slate-700/5 hover:text-white')} ${stableStyles.transitionFast} ${premium ? 'animate-pulse' : ''} ${className}`}
  >
    <div className="flex items-center space-x-3">
      {icon && <span className="text-lg">{icon}</span>}
      <div>
        <span className="font-medium">{children}</span>
        {description && <p className={`text-xs ${mode === "light" ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>}
      </div>
    </div>
    {badge && <StableBadge variant="default" className="text-xs" mode={mode}>{badge}</StableBadge>}
  </div>
);

// 📊 Stable Progress Component - Enhanced
const StableProgress = ({ value, max = 100, className = "", premium = false, mode = "light" }: any) => (
  <div className={`w-full ${mode === "light" ? 'bg-slate-200/30' : 'bg-slate-700/30'} rounded-full h-2 ${premium ? 'animate-pulse' : ''} ${className}`}>
    <div 
      className={`h-2 rounded-full transition-all duration-500 ease-out ${mode === "light" ? 'bg-gradient-to-r from-teal-500 to-indigo-500' : 'bg-gradient-to-r from-teal-400 to-indigo-400'}`}
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);

const SuperAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const mode = darkMode ? "dark" : "light";

  const navigationItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      badge: 'Live',
      description: 'System overview and analytics',
      submenu: [
        { title: 'System Overview', path: '/super-admin/dashboard', icon: '🏠' },
        { title: 'Active Users', path: '/super-admin/dashboard/users', icon: '👥' },
        { title: 'Revenue Metrics', path: '/super-admin/dashboard/revenue', icon: '💰' },
        { title: 'System Alerts', path: '/super-admin/dashboard/alerts', icon: '🚨' }
      ]
    },
    {
      key: 'users',
      title: 'User Management',
      icon: '👤',
      badge: '8',
      description: 'Manage all users across the platform',
      submenu: [
        { title: 'All Users', path: '/super-admin/users', icon: '👥' },
        { title: 'User Roles', path: '/super-admin/users/roles', icon: '🔑' },
        { title: 'User Groups', path: '/super-admin/users/groups', icon: '👥' },
        { title: 'Access Control', path: '/super-admin/users/access', icon: '🔒' },
        { title: 'User Analytics', path: '/super-admin/users/analytics', icon: '📈' },
        { title: 'Billing Management', path: '/super-admin/users/billing', icon: '💳' },
        { title: 'Support Tickets', path: '/super-admin/users/support', icon: '🎫' },
        { title: 'User Onboarding', path: '/super-admin/users/onboarding', icon: '🚀' }
      ]
    },
    {
      key: 'system',
      title: 'System Administration',
      icon: '⚙️',
      description: 'Core system administration tools',
      submenu: [
        { title: 'Database Management', path: '/super-admin/system/database', icon: '🗄️' },
        { title: 'API Management', path: '/super-admin/system/api', icon: '🔌' },
        { title: 'Server Monitoring', path: '/super-admin/system/monitoring', icon: '🖥️' },
        { title: 'Deployment Management', path: '/super-admin/system/deployment', icon: '🚀' },
        { title: 'Configuration', path: '/super-admin/system/config', icon: '⚙️' },
        { title: 'Backup & Recovery', path: '/super-admin/system/backup', icon: '💾' },
        { title: 'Security Settings', path: '/super-admin/system/security', icon: '🔒' },
        { title: 'Integration Hub', path: '/super-admin/system/integrations', icon: '🔗' },
        { title: 'File Storage', path: '/super-admin/system/storage', icon: '📁' },
        { title: 'Email Services', path: '/super-admin/system/email', icon: '📧' }
      ]
    },
    {
      key: 'security',
      title: 'Security Center',
      icon: '🛡️',
      badge: 'Live',
      description: 'Security monitoring and management',
      submenu: [
        { title: 'Security Audit', path: '/super-admin/security/audit', icon: '🔍' },
        { title: 'Access Logs', path: '/super-admin/security/logs', icon: '📋' },
        { title: 'Data Protection', path: '/super-admin/security/protection', icon: '🔐' },
        { title: 'API Security', path: '/super-admin/security/api', icon: '🔌' },
        { title: 'User Permissions', path: '/super-admin/security/permissions', icon: '🔑' },
        { title: 'Security Policies', path: '/super-admin/security/policies', icon: '📜' },
        { title: 'Incident Response', path: '/super-admin/security/incidents', icon: '🚨' },
        { title: 'Compliance Management', path: '/super-admin/security/compliance', icon: '✅' }
      ]
    },
    {
      key: 'monitoring',
      title: 'System Monitoring',
      icon: '📊',
      description: 'Real-time system monitoring',
      submenu: [
        { title: 'Performance Monitoring', path: '/super-admin/monitoring/performance', icon: '⚡' },
        { title: 'Error Tracking', path: '/super-admin/monitoring/errors', icon: '🐛' },
        { title: 'Log Analysis', path: '/super-admin/monitoring/logs', icon: '📝' },
        { title: 'Alert Management', path: '/super-admin/monitoring/alerts', icon: '🔔' },
        { title: 'Uptime Monitoring', path: '/super-admin/monitoring/uptime', icon: '⏱️' },
        { title: 'Resource Usage', path: '/super-admin/monitoring/resources', icon: '💻' },
        { title: 'Network Monitoring', path: '/super-admin/monitoring/network', icon: '🌐' },
        { title: 'Health Checks', path: '/super-admin/monitoring/health', icon: '❤️' }
      ]
    },
    {
      key: 'portals',
      title: 'Portal Management',
      icon: '🌐',
      description: 'Multi-portal management system',
      submenu: [
        { title: 'Portal Overview', path: '/super-admin/portals', icon: '👁️' },
        { title: 'Portal Configuration', path: '/super-admin/portals/config', icon: '⚙️' },
        { title: 'Portal Users', path: '/super-admin/portals/users', icon: '👥' },
        { title: 'Feature Management', path: '/super-admin/portals/features', icon: '✨' },
        { title: 'Portal Analytics', path: '/super-admin/portals/analytics', icon: '📊' },
        { title: 'Portal Billing', path: '/super-admin/portals/billing', icon: '💳' },
        { title: 'Portal Support', path: '/super-admin/portals/support', icon: '🎫' },
        { title: 'Portal Integrations', path: '/super-admin/portals/integrations', icon: '🔗' },
        { title: 'Portal Backup', path: '/super-admin/portals/backup', icon: '💾' },
        { title: 'Portal Security', path: '/super-admin/portals/security', icon: '🔒' },
        { title: 'Portal Compliance', path: '/super-admin/portals/compliance', icon: '✅' },
        { title: 'Portal Deployment', path: '/super-admin/portals/deployment', icon: '🚀' }
      ]
    },
    {
      key: 'analytics',
      title: 'Analytics & Reports',
      icon: '📈',
      description: 'Advanced analytics and reporting',
      submenu: [
        { title: 'Business Analytics', path: '/super-admin/analytics/business', icon: '📊' },
        { title: 'User Analytics', path: '/super-admin/analytics/users', icon: '👥' },
        { title: 'Performance Reports', path: '/super-admin/analytics/performance', icon: '⚡' },
        { title: 'Security Reports', path: '/super-admin/analytics/security', icon: '🛡️' },
        { title: 'Financial Reports', path: '/super-admin/analytics/financial', icon: '💰' },
        { title: 'Operational Reports', path: '/super-admin/analytics/operational', icon: '⚙️' },
        { title: 'Custom Reports', path: '/super-admin/analytics/custom', icon: '📋' },
        { title: 'Data Export', path: '/super-admin/analytics/export', icon: '📤' },
        { title: 'Dashboard Builder', path: '/super-admin/analytics/dashboards', icon: '🏗️' },
        { title: 'Scheduled Reports', path: '/super-admin/analytics/scheduled', icon: '⏰' }
      ]
    },
    {
      key: 'mcp',
      title: 'MCP Control Center',
      icon: '🤖',
      badge: 'AI',
      description: 'AI and autonomous system control',
      submenu: [
        { title: 'MCP Overview', path: '/super-admin/mcp', icon: '👁️' },
        { title: 'Agent Management', path: '/super-admin/mcp/agents', icon: '🤖' },
        { title: 'AI Models', path: '/super-admin/mcp/models', icon: '🧠' },
        { title: 'Data Pipeline', path: '/super-admin/mcp/pipeline', icon: '🔗' },
        { title: 'Machine Learning', path: '/super-admin/mcp/learning', icon: '🎯' },
        { title: 'AI Analytics', path: '/super-admin/mcp/analytics', icon: '📊' },
        { title: 'Automation Rules', path: '/super-admin/mcp/automation', icon: '⚡' },
        { title: 'AI Integrations', path: '/super-admin/mcp/integrations', icon: '🔗' },
        { title: 'AI Monitoring', path: '/super-admin/mcp/monitoring', icon: '👁️' },
        { title: 'AI Compliance', path: '/super-admin/mcp/compliance', icon: '✅' },
        { title: 'AI Documentation', path: '/super-admin/mcp/documentation', icon: '📚' },
        { title: 'AI Support', path: '/super-admin/mcp/support', icon: '🎫' }
      ]
    },
    {
      key: 'business',
      title: 'Business Operations',
      icon: '💼',
      description: 'Business operations management',
      submenu: [
        { title: 'Customer Management', path: '/super-admin/business/customers', icon: '👥' },
        { title: 'Sales Pipeline', path: '/super-admin/business/sales', icon: '📈' },
        { title: 'Billing & Invoicing', path: '/super-admin/business/billing', icon: '💳' },
        { title: 'Support Management', path: '/super-admin/business/support', icon: '🎫' },
        { title: 'Documentation', path: '/super-admin/business/docs', icon: '📚' },
        { title: 'Marketing Tools', path: '/super-admin/business/marketing', icon: '📢' },
        { title: 'Partner Management', path: '/super-admin/business/partners', icon: '🤝' },
        { title: 'Legal & Compliance', path: '/super-admin/business/legal', icon: '⚖️' }
      ]
    },
    {
      key: 'devops',
      title: 'Development & DevOps',
      icon: '🛠️',
      description: 'Development and DevOps tools',
      submenu: [
        { title: 'Code Repository', path: '/super-admin/dev/repository', icon: '📁' },
        { title: 'CI/CD Pipeline', path: '/super-admin/dev/pipeline', icon: '🔗' },
        { title: 'Testing Suite', path: '/super-admin/dev/testing', icon: '🧪' },
        { title: 'Environment Management', path: '/super-admin/dev/environments', icon: '🌍' },
        { title: 'Performance Testing', path: '/super-admin/dev/performance', icon: '⚡' },
        { title: 'Security Testing', path: '/super-admin/dev/security', icon: '🔒' },
        { title: 'Dev Documentation', path: '/super-admin/dev/documentation', icon: '📚' },
        { title: 'Release Management', path: '/super-admin/dev/releases', icon: '🚀' }
      ]
    }
  ];

  const fabActions = [
    { title: 'Add User', icon: '👤', action: () => console.log('Add User'), color: 'from-teal-500 to-indigo-500', description: 'Create new user account' },
    { title: 'Create Report', icon: '📊', action: () => console.log('Create Report'), color: 'from-emerald-500 to-green-500', description: 'Generate analytics report' },
    { title: 'System Backup', icon: '💾', action: () => console.log('System Backup'), color: 'from-indigo-500 to-purple-500', description: 'Backup system data' },
    { title: 'Security Scan', icon: '🔒', action: () => console.log('Security Scan'), color: 'from-red-500 to-pink-500', description: 'Run security audit' },
    { title: 'Performance Check', icon: '⚡', action: () => console.log('Performance Check'), color: 'from-amber-500 to-orange-500', description: 'Monitor system performance' },
    { title: 'Deploy Update', icon: '🚀', action: () => console.log('Deploy Update'), color: 'from-indigo-500 to-purple-500', description: 'Deploy system updates' }
  ];

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} relative overflow-hidden transition-all duration-500`}>
      {/* 🌊 Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${mode === "light" ? 'bg-gradient-to-br from-cyan-500/10 to-indigo-500/10' : 'bg-gradient-to-br from-cyan-400/10 to-indigo-400/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${mode === "light" ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-blue-400/10 to-cyan-400/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${mode === "light" ? 'bg-gradient-to-br from-indigo-500/5 to-blue-500/5' : 'bg-gradient-to-br from-indigo-400/5 to-blue-400/5'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* 🌟 Innovative Sidebar */}
        <aside className={`${stableStyles.gradientPrimary[mode]} ${sidebarOpen ? 'w-80' : 'w-20'} ${stableStyles.transitionSmooth} flex flex-col shadow-3xl border-r ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'}`}>
          {/* 🌟 Innovative Logo */}
          <div className={`p-6 border-b ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-xl hover:scale-110 transition-transform duration-300">
                MCP
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className={`font-bold text-xl ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Super Admin</h1>
                  <p className={`text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Innovative World-Class Portal</p>
                </div>
              )}
            </div>
          </div>

          {/* 🌟 Innovative Search */}
          {sidebarOpen && (
            <div className={`p-4 border-b ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'}`}>
              <StableInput
                placeholder="Search across all portals..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                icon="🔍"
                premium={true}
                mode={mode}
              />
            </div>
          )}

          {/* 🌟 Innovative Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.key} className="space-y-1">
                <StableNavItem
                  onClick={() => {
                    setActiveMenu(item.key);
                    if (item.submenu) {
                      toggleMenu(item.key);
                      // Navigate to the first submenu item if available
                      if (item.submenu.length > 0) {
                        navigate(item.submenu[0].path);
                      }
                    }
                  }}
                  active={activeMenu === item.key}
                  premium={item.badge === 'Live' || item.badge === 'AI'}
                  mode={mode}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && (
                      <div>
                        <span className="font-medium">{item.title}</span>
                        {item.description && <p className={`text-xs ${mode === "light" ? 'text-slate-400' : 'text-slate-500'}`}>{item.description}</p>}
                      </div>
                    )}
                  </div>
                  {sidebarOpen && (
                    <div className="flex items-center space-x-2">
                      {item.badge && <StableBadge variant={item.badge === 'Live' ? 'live' : item.badge === 'AI' ? 'premium' : 'default'} premium={item.badge === 'Live' || item.badge === 'AI'} mode={mode}>{item.badge}</StableBadge>}
                      {item.submenu && <span className={`text-sm ${mode === "light" ? 'text-slate-400' : 'text-slate-500'}`}>{expandedMenus[item.key] ? '▼' : '▶'}</span>}
                    </div>
                  )}
                </StableNavItem>
                
                {/* �� Innovative Submenu */}
                {item.submenu && expandedMenus[item.key] && sidebarOpen && (
                  <div className="ml-8 space-y-1">
                    {item.submenu.map((subItem, index) => (
                      <StableNavItem
                        key={index}
                        onClick={() => {
                          setActiveMenu(`${item.key}-${index}`);
                          console.log(`🚀 Navigating to: ${subItem.path}`);
                          navigate(subItem.path);
                        }}
                        active={activeMenu === `${item.key}-${index}`}
                        premium={false}
                        mode={mode}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{subItem.icon}</span>
                          <span className="font-medium">{subItem.title}</span>
                        </div>
                      </StableNavItem>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 🌟 Innovative Footer */}
          {sidebarOpen && (
            <div className={`p-4 border-t ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>System Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400">Online</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>88 pages operational</span>
                    <span className="text-emerald-400 text-xs font-medium">75%</span>
                  </div>
                  <StableProgress value={75} premium={true} mode={mode} />
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* 🌟 Innovative Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 🌟 Innovative Header */}
          <header className={`${stableStyles.surface[mode]} border-b ${mode === "light" ? 'border-slate-200/60' : 'border-slate-700/60'} shadow-lg`}>
            <div className="flex items-center justify-between px-8 py-6">
              <div className="flex items-center space-x-6">
                <StableButton
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  variant="ghost"
                  size="sm"
                  className="p-3"
                  premium={true}
                  mode={mode}
                >
                  {sidebarOpen ? '◀' : '▶'}
                </StableButton>
                
                <div className="hidden md:block">
                  <h1 className={`text-2xl font-bold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>MCP Super Admin Portal</h1>
                  <p className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>Innovative World-Class Enterprise Management Dashboard</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* 🌟 Dark Mode Toggle */}
                <StableButton
                  onClick={toggleDarkMode}
                  variant="ghost"
                  size="sm"
                  className="p-3"
                  premium={true}
                  mode={mode}
                >
                  {darkMode ? '☀️' : '🌙'}
                </StableButton>

                {/* 🌟 Innovative Notifications */}
                <div className="relative">
                  <StableButton variant="ghost" size="sm" className="p-3" premium={true} mode={mode}>
                    🔔
                  </StableButton>
                  <StableBadge variant="danger" className="absolute -top-2 -right-2" pulse premium={true} mode={mode}>
                    3
                  </StableBadge>
                </div>

                {/* 🌟 Innovative User Menu */}
                <StableDropdown
                  isOpen={userDropdownOpen}
                  onToggle={() => setUserDropdownOpen(!userDropdownOpen)}
                  premium={true}
                  mode={mode}
                  trigger={
                    <div className={`flex items-center space-x-4 cursor-pointer p-3 rounded-xl ${mode === "light" ? 'hover:bg-slate-50/80' : 'hover:bg-slate-700/80'} transition-all duration-200 hover:scale-105`}>
                      <StableAvatar fallback="SA" status="premium" ring premium={true} mode={mode} />
                      <div className="hidden md:block">
                        <p className={`font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Super Admin</p>
                        <p className={mode === "light" ? 'text-slate-500' : 'text-slate-400'}>admin@tms.com</p>
                      </div>
                    </div>
                  }
                >
                  <StableMenuItem icon="👤" description="View your profile" premium={true} mode={mode} onClick={() => navigate('/super-admin/settings/profile')}>Profile</StableMenuItem>
                  <StableMenuItem icon="⚙️" description="Manage settings" premium={true} mode={mode} onClick={() => navigate('/super-admin/settings')}>Settings</StableMenuItem>
                  <StableMenuItem icon="🔒" description="Security options" premium={true} mode={mode} onClick={() => navigate('/super-admin/security')}>Security</StableMenuItem>
                  <div className={`border-t ${mode === "light" ? 'border-slate-200' : 'border-slate-700'} my-1`}></div>
                  <StableMenuItem icon="🚪" description="Sign out" premium={true} mode={mode}>Logout</StableMenuItem>
                </StableDropdown>
              </div>
            </div>
          </header>

          {/* 🌟 Innovative Content Area */}
          <main className="flex-1 overflow-auto p-8">
    <Routes>
              <Route path="/*" element={<SuperAdminRoutes />} />
    </Routes>
          </main>
        </div>

        {/* 🌟 Innovative Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          {/* FAB Actions */}
          {fabOpen && (
            <div className="absolute bottom-24 right-0 space-y-3">
              {fabActions.map((action, index) => (
                <StableCard
                  key={index}
                  className="w-64 cursor-pointer hover:shadow-3xl"
                  premium={true}
                  animated={true}
                  mode={mode}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>{action.title}</h3>
                      <p className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>{action.description}</p>
                    </div>
                  </div>
                </StableCard>
              ))}
            </div>
          )}
          
          {/* Main FAB */}
          <StableButton
            onClick={() => setFabOpen(!fabOpen)}
            size="lg"
            variant="premium"
            className="w-16 h-16 rounded-2xl p-0 text-2xl shadow-3xl hover:shadow-4xl"
            premium={true}
            mode={mode}
          >
            {fabOpen ? '✕' : '⚡'}
          </StableButton>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
