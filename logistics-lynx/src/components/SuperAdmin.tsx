import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SuperAdminRoutes from '../pages/super-admin/SuperAdminRoutes';
import { EnhancedLayout } from './layout/EnhancedLayout';
import { EnhancedIcon } from './ui/EnhancedIcon';

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
  
  // 🌟 Stable Gradients - No Flashing
  gradientPrimary: {
    light: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20"
  },
  gradientAccent: {
    light: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600",
    dark: "bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500"
  },
  gradientSurface: {
    light: "bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20",
    dark: "bg-gradient-to-br from-slate-800 via-blue-900/20 to-indigo-900/20"
  }
};

// 🎨 STABLE UI COMPONENTS - No Flashing, Eye-Friendly
const StableButton = ({ children, onClick, variant = "primary", size = "md", className = "", icon, loading = false, premium = false, mode = "light", ...props }: any) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: premium 
      ? `${stableStyles.gradientAccent[mode as keyof typeof stableStyles.gradientAccent]} text-white hover:shadow-lg hover:scale-105`
      : `${stableStyles.accent[mode as keyof typeof stableStyles.accent]} text-white hover:${stableStyles.accentHover[mode as keyof typeof stableStyles.accentHover]}`,
    secondary: `${stableStyles.surface[mode as keyof typeof stableStyles.surface]} ${stableStyles.textPrimary[mode as keyof typeof stableStyles.textPrimary]} hover:${stableStyles.surfaceHover[mode as keyof typeof stableStyles.surfaceHover]}`,
    ghost: `${stableStyles.glass[mode as keyof typeof stableStyles.glass]} ${stableStyles.textPrimary[mode as keyof typeof stableStyles.textPrimary]} hover:${stableStyles.glassHover[mode as keyof typeof stableStyles.glassHover]}`,
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    neutral: `${stableStyles.surface[mode as keyof typeof stableStyles.surface]} ${stableStyles.textSecondary[mode as keyof typeof stableStyles.textSecondary]} hover:${stableStyles.surfaceHover[mode as keyof typeof stableStyles.surfaceHover]}`,
    outline: `${stableStyles.border[mode as keyof typeof stableStyles.border]} ${stableStyles.textPrimary[mode as keyof typeof stableStyles.textPrimary]} hover:${stableStyles.surface[mode as keyof typeof stableStyles.surface]}`
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading && <div className="animate-spin mr-2">⚡</div>}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const StableInput = ({ placeholder, value, onChange, icon, premium = false, mode = "light", ...props }: any) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} ${stableStyles.surface[mode as keyof typeof stableStyles.surface]} ${stableStyles.border[mode as keyof typeof stableStyles.border]} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${stableStyles.transition}`}
        {...props}
      />
    </div>
  );
};

const StableNavItem = ({ children, onClick, active = false, premium = false, mode = "light", ...props }: any) => {
  const baseClasses = "flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 cursor-pointer";
  const activeClasses = active 
    ? `${stableStyles.surfaceElevated[mode as keyof typeof stableStyles.surfaceElevated]} ${stableStyles.shadowGlow[mode as keyof typeof stableStyles.shadowGlow]}`
    : `${stableStyles.glass[mode as keyof typeof stableStyles.glass]} hover:${stableStyles.glassHover[mode as keyof typeof stableStyles.glassHover]}`;
  
  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const StableBadge = ({ children, variant = "default", premium = false, mode = "light", className = "", pulse = false, ...props }: any) => {
  const baseClasses = "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium";
  const variantClasses = {
    default: `${stableStyles.surface[mode as keyof typeof stableStyles.surface]} ${stableStyles.textSecondary[mode as keyof typeof stableStyles.textSecondary]}`,
    live: "bg-green-500 text-white",
    premium: `${stableStyles.gradientAccent[mode as keyof typeof stableStyles.gradientAccent]} text-white`,
    danger: "bg-red-500 text-white"
  };
  const pulseClasses = pulse ? "animate-pulse" : "";
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${pulseClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};

const StableDropdown = ({ children, isOpen, onToggle, trigger, premium = false, mode = "light", ...props }: any) => {
  return (
    <div className="relative">
      <div onClick={onToggle}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 ${stableStyles.surface[mode as keyof typeof stableStyles.surface]} ${stableStyles.border[mode as keyof typeof stableStyles.border]} rounded-xl shadow-xl z-50`}>
          {children}
        </div>
      )}
    </div>
  );
};

const StableMenuItem = ({ children, icon, description, premium = false, mode = "light", onClick, ...props }: any) => {
  return (
    <div 
      className={`flex items-center space-x-3 p-3 cursor-pointer hover:${stableStyles.surfaceHover[mode as keyof typeof stableStyles.surfaceHover]} transition-all duration-200`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <div className="flex-1">
        <div className={`font-medium ${stableStyles.textPrimary[mode as keyof typeof stableStyles.textPrimary]}`}>{children}</div>
        {description && <div className={`text-xs ${stableStyles.textMuted[mode as keyof typeof stableStyles.textMuted]}`}>{description}</div>}
      </div>
    </div>
  );
};

const StableAvatar = ({ src, alt, fallback, size = "md", status, ring = false, premium = false, mode = "light" }: any) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    premium: "bg-gradient-to-r from-teal-500 to-indigo-500"
  };
  
  return (
    <div className="relative">
      <div className={`${sizeClasses[size as keyof typeof sizeClasses]} rounded-full ${stableStyles.surface[mode as keyof typeof stableStyles.surface]} flex items-center justify-center ${stableStyles.textPrimary[mode as keyof typeof stableStyles.textPrimary]} ${ring ? stableStyles.shadowGlow[mode as keyof typeof stableStyles.shadowGlow] : ''}`}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="font-semibold">{fallback}</span>
        )}
      </div>
      {status && (
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]} border-2 border-white`}></div>
      )}
    </div>
  );
};

const StableProgress = ({ value, premium = false, mode = "light", ...props }: any) => {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2 ${mode === "dark" ? "bg-slate-700" : ""}`}>
      <div 
        className={`h-2 rounded-full ${premium ? stableStyles.gradientAccent[mode as keyof typeof stableStyles.gradientAccent] : "bg-blue-500"}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const SuperAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [fabOpen, setFabOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'Admin User',
    email: 'admin@logisticslynx.com',
    role: 'Super Admin',
    avatar: undefined
  };

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
      key: 'analytics',
      title: 'Analytics & Reports',
      icon: '📈',
      description: 'Comprehensive analytics and reporting',
      submenu: [
        { title: 'Business Intelligence', path: '/super-admin/analytics/bi', icon: '📊' },
        { title: 'Performance Metrics', path: '/super-admin/analytics/performance', icon: '⚡' },
        { title: 'User Behavior', path: '/super-admin/analytics/behavior', icon: '👤' },
        { title: 'Revenue Analytics', path: '/super-admin/analytics/revenue', icon: '💰' },
        { title: 'Custom Reports', path: '/super-admin/analytics/reports', icon: '📋' },
        { title: 'Data Export', path: '/super-admin/analytics/export', icon: '📤' },
        { title: 'Real-time Monitoring', path: '/super-admin/analytics/monitoring', icon: '🔄' },
        { title: 'Predictive Analytics', path: '/super-admin/analytics/predictive', icon: '🔮' }
      ]
    },
    {
      key: 'integrations',
      title: 'Integrations',
      icon: '🔗',
      description: 'Third-party integrations and APIs',
      submenu: [
        { title: 'API Management', path: '/super-admin/integrations/api', icon: '🔌' },
        { title: 'Webhook Configuration', path: '/super-admin/integrations/webhooks', icon: '🎣' },
        { title: 'OAuth Providers', path: '/super-admin/integrations/oauth', icon: '🔐' },
        { title: 'Payment Gateways', path: '/super-admin/integrations/payments', icon: '💳' },
        { title: 'Email Services', path: '/super-admin/integrations/email', icon: '📧' },
        { title: 'SMS Services', path: '/super-admin/integrations/sms', icon: '📱' },
        { title: 'File Storage', path: '/super-admin/integrations/storage', icon: '📁' },
        { title: 'CRM Integration', path: '/super-admin/integrations/crm', icon: '👥' }
      ]
    },
    {
      key: 'settings',
      title: 'Settings',
      icon: '⚙️',
      description: 'System configuration and preferences',
      submenu: [
        { title: 'General Settings', path: '/super-admin/settings/general', icon: '⚙️' },
        { title: 'Appearance', path: '/super-admin/settings/appearance', icon: '🎨' },
        { title: 'Notifications', path: '/super-admin/settings/notifications', icon: '🔔' },
        { title: 'Language & Region', path: '/super-admin/settings/language', icon: '🌍' },
        { title: 'Privacy & Security', path: '/super-admin/settings/privacy', icon: '🔒' },
        { title: 'Backup & Sync', path: '/super-admin/settings/backup', icon: '💾' },
        { title: 'Advanced Options', path: '/super-admin/settings/advanced', icon: '🔧' },
        { title: 'About & Support', path: '/super-admin/settings/about', icon: 'ℹ️' }
      ]
    }
  ];

  const fabActions = [
    {
      title: 'Quick User',
      description: 'Add new user',
      icon: '👤',
      action: () => navigate('/super-admin/users/new')
    },
    {
      title: 'System Alert',
      description: 'Create alert',
      icon: '🚨',
      action: () => navigate('/super-admin/alerts/new')
    },
    {
      title: 'Quick Report',
      description: 'Generate report',
      icon: '📊',
      action: () => navigate('/super-admin/analytics/quick-report')
    },
    {
      title: 'Backup Now',
      description: 'Manual backup',
      icon: '💾',
      action: () => console.log('Backup initiated')
    },
    {
      title: 'System Check',
      description: 'Health check',
      icon: '🔍',
      action: () => console.log('System check initiated')
    }
  ];

  return (
    <div className={`min-h-screen ${stableStyles.gradientPrimary[mode]} ${stableStyles.transitionSmooth}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex h-screen">
        {/* 🌟 Innovative Sidebar */}
        <aside className={`${stableStyles.gradientPrimary[mode]} ${sidebarOpen ? 'w-80 lg:w-80 md:w-64' : 'w-20 lg:w-20 md:w-16'} ${stableStyles.transitionSmooth} flex flex-col shadow-3xl border-r ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'} fixed lg:relative z-40 h-full`}>
          {/* 🌟 Innovative Logo */}
          <div className={`p-4 sm:p-6 border-b ${mode === "light" ? 'border-slate-200/50' : 'border-slate-700/50'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-xl hover:scale-110 transition-transform duration-300">
                MCP
              </div>
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <h1 className={`font-bold text-lg sm:text-xl ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Super Admin</h1>
                  <p className={`text-xs sm:text-sm ${mode === "light" ? 'text-slate-600' : 'text-slate-300'}`}>Innovative World-Class Portal</p>
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
          <nav className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 sm:space-y-2">
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
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-lg sm:text-xl">{item.icon}</span>
                    {sidebarOpen && (
                      <div className="hidden sm:block">
                        <span className="font-medium text-sm sm:text-base">{item.title}</span>
                        {item.description && <p className={`text-xs ${mode === "light" ? 'text-slate-400' : 'text-slate-500'}`}>{item.description}</p>}
                      </div>
                    )}
                  </div>
                  {sidebarOpen && (
                    <div className="flex items-center space-x-2">
                      {item.badge && <StableBadge variant={item.badge === 'Live' ? 'live' : item.badge === 'AI' ? 'premium' : 'default'} premium={item.badge === 'Live' || item.badge === 'AI'} mode={mode}>{item.badge}</StableBadge>}
                      {item.submenu && (
                        <div className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg transition-all duration-200 ${expandedMenus[item.key] || false ? 'bg-teal-500/10 text-teal-600' : 'bg-slate-100/50 text-slate-400'} ${mode === "dark" ? (expandedMenus[item.key] || false ? 'bg-teal-400/20 text-teal-400' : 'bg-slate-700/50 text-slate-500') : ''}`}>
                          <svg 
                            className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${expandedMenus[item.key] || false ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </StableNavItem>
                
                {/* 🌟 Innovative Submenu */}
                {item.submenu && (expandedMenus[item.key] || false) && sidebarOpen && (
                  <div className="ml-4 sm:ml-8 space-y-1">
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
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-base sm:text-lg">{subItem.icon}</span>
                          <span className="font-medium text-sm sm:text-base">{subItem.title}</span>
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
                  <StableBadge variant="live" mode={mode}>Online</StableBadge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={mode === "light" ? 'text-slate-500' : 'text-slate-400'}>Performance</span>
                    <span className={mode === "light" ? 'text-slate-600' : 'text-slate-300'}>75%</span>
                  </div>
                  <StableProgress value={75} premium={true} mode={mode} />
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* 🌟 Innovative Main Content */}
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'} transition-all duration-300`}>
          {/* 🌟 Innovative Header */}
          <header className={`${stableStyles.surface[mode]} ${stableStyles.border[mode]} border-b px-4 sm:px-6 py-3 sm:py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <StableButton
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                  mode={mode}
                >
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </StableButton>
                <div className="hidden sm:block">
                  <h2 className={`text-base sm:text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>Super Admin Portal</h2>
                  <p className={`text-xs sm:text-sm ${stableStyles.textSecondary[mode]}`}>Manage your entire system</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* 🌟 Innovative Dark Mode Toggle */}
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
                    <div className={`flex items-center space-x-2 sm:space-x-4 cursor-pointer p-2 sm:p-3 rounded-xl ${mode === "light" ? 'hover:bg-slate-50/80' : 'hover:bg-slate-700/80'} transition-all duration-200 hover:scale-105`}>
                      <StableAvatar fallback="SA" status="premium" ring premium={true} mode={mode} />
                      <div className="hidden sm:block">
                        <p className={`text-sm sm:text-base font-semibold ${mode === "light" ? 'text-slate-900' : 'text-white'}`}>Super Admin</p>
                        <p className={`text-xs sm:text-sm ${mode === "light" ? 'text-slate-500' : 'text-slate-400'}`}>admin@tms.com</p>
                      </div>
                      <div className={`flex items-center justify-center w-5 h-5 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`}>
                        <svg 
                          className="w-4 h-4 text-slate-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
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
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/*" element={<SuperAdminRoutes />} />
            </Routes>
          </main>
        </div>

        {/* 🚀 Responsive FAB */}
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
          {/* FAB Actions */}
          {fabOpen && (
            <div className="absolute bottom-16 sm:bottom-20 right-0 space-y-2 w-64 sm:w-auto">
              {fabActions.slice(0, 5).map((action, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-2 sm:p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    action.action();
                    setFabOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm">
                      {action.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs sm:text-sm text-gray-900 truncate">{action.title}</div>
                      <div className="text-xs text-gray-500 truncate">{action.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Main FAB Button */}
          <button
            onClick={() => {
              console.log('FAB clicked, current state:', fabOpen);
              setFabOpen(!fabOpen);
            }}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-lg sm:text-xl font-bold"
          >
            {fabOpen ? '✕' : '⚡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
