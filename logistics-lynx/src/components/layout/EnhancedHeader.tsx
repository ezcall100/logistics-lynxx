import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, Settings, LogOut, ChevronDown, Shield, Brain, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  isDarkMode?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  } | undefined;
}

export const EnhancedHeader: React.FC<HeaderProps> = ({
  onSidebarToggle,
  user
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const quickActions = [
    { name: 'AI Assistant', icon: Brain, action: () => navigate('/super-admin/dashboard') },
    { name: 'System Monitor', icon: Activity, action: () => navigate('/super-admin/monitoring/performance') },
    { name: 'Settings', icon: Settings, action: () => navigate('/super-admin/settings') },
    { name: 'Security', icon: Shield, action: () => navigate('/super-admin/security/audit') }
  ];

  return (
    <header className="bg-[color:var(--bg-app)]/90 backdrop-blur-xl border-b border-[color:var(--bg-surface-rgba)] sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={onSidebarToggle}
              className="hidden lg:block p-2 rounded-[color:var(--radius-mcp)] transition-all duration-200 group bg-[color:var(--bg-surface-rgba)] hover:bg-[color:var(--bg-surface-rgba)]/80 border border-[color:var(--bg-surface-rgba)]"
            >
              <Menu className="h-5 w-5 text-[color:var(--fg-muted)] group-hover:text-[color:var(--brand-1)] transition-colors duration-200" />
            </button>

            {/* Enhanced Logo with MCP-V2 Design */}
            <Link to="/super-admin/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] rounded-[color:var(--radius-mcp)] flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[color:var(--success)] rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[color:var(--brand-2)] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-[color:var(--fg)] group-hover:text-[color:var(--brand-1)] transition-colors duration-200">
                  MCP Super Admin
                </span>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-[color:var(--success)] rounded-full animate-pulse"></div>
                  <span className="text-xs text-[color:var(--fg-muted)] font-medium">Master Control Program</span>
                </div>
              </div>
            </Link>

            {/* Enhanced Search Bar */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[color:var(--fg-muted)]" />
                <input
                  type="text"
                  placeholder="Search MCP systems..."
                  className="pl-10 pr-4 py-2 w-64 bg-[color:var(--bg-surface-rgba)] border border-[color:var(--bg-surface-rgba)] rounded-[color:var(--radius-mcp)] text-[color:var(--fg)] placeholder-[color:var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-1)] focus:border-transparent transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Center Section - Enhanced Status Indicators */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* System Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-[color:var(--success)]/10 border border-[color:var(--success)]/20 rounded-full">
              <div className="w-2 h-2 bg-[color:var(--success)] rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-[color:var(--success)]">System Healthy</span>
            </div>

            {/* AI Agents Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-[color:var(--brand-1)]/10 border border-[color:var(--brand-1)]/20 rounded-full">
              <Brain className="h-3 w-3 text-[color:var(--brand-1)]" />
              <span className="text-xs font-medium text-[color:var(--brand-1)]">12 AI Agents Active</span>
            </div>

            {/* Network Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-[color:var(--brand-2)]/10 border border-[color:var(--brand-2)]/20 rounded-full">
              <Activity className="h-3 w-3 text-[color:var(--brand-2)]" />
              <span className="text-xs font-medium text-[color:var(--brand-2)]">2.4 GB/s</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="p-2 rounded-[color:var(--radius-mcp)] bg-[color:var(--bg-surface-rgba)] hover:bg-[color:var(--bg-surface-rgba)]/80 border border-[color:var(--bg-surface-rgba)] transition-all duration-200 group"
                  title={action.name}
                >
                  <action.icon className="h-4 w-4 text-[color:var(--fg-muted)] group-hover:text-[color:var(--brand-1)] transition-colors duration-200" />
                </button>
              ))}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-[color:var(--radius-mcp)] bg-[color:var(--bg-surface-rgba)] hover:bg-[color:var(--bg-surface-rgba)]/80 border border-[color:var(--bg-surface-rgba)] transition-all duration-200 relative"
              >
                <Bell className="h-5 w-5 text-[color:var(--fg-muted)]" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[color:var(--critical)] text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-[color:var(--radius-mcp)] bg-[color:var(--bg-surface-rgba)] hover:bg-[color:var(--bg-surface-rgba)]/80 border border-[color:var(--bg-surface-rgba)] transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-[color:var(--fg)]">{user?.name || 'Super Admin'}</p>
                  <p className="text-xs text-[color:var(--fg-muted)]">{user?.role || 'super_admin'}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-[color:var(--fg-muted)]" />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl border border-[color:var(--bg-surface-rgba)] rounded-[color:var(--radius-mcp)] shadow-[color:var(--shadow-soft)] z-50">
                  <div className="p-4 border-b border-[color:var(--bg-surface-rgba)]">
                    <p className="text-sm font-medium text-[color:var(--fg)]">{user?.name || 'Super Admin'}</p>
                    <p className="text-xs text-[color:var(--fg-muted)]">{user?.email || 'admin@transbot.ai'}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => navigate('/super-admin/profile')}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-[color:var(--fg)] hover:bg-[color:var(--bg-app)] rounded-[color:var(--radius-mcp)] transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => navigate('/super-admin/settings')}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-[color:var(--fg)] hover:bg-[color:var(--bg-app)] rounded-[color:var(--radius-mcp)] transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={logout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-[color:var(--critical)] hover:bg-[color:var(--bg-app)] rounded-[color:var(--radius-mcp)] transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-[color:var(--radius-mcp)] bg-[color:var(--bg-surface-rgba)] hover:bg-[color:var(--bg-surface-rgba)]/80 border border-[color:var(--bg-surface-rgba)] transition-all duration-200"
            >
              <Menu className="h-5 w-5 text-[color:var(--fg-muted)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl border-t border-[color:var(--bg-surface-rgba)]">
          <div className="px-4 py-2 space-y-1">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={() => {
                  action.action();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-[color:var(--fg)] hover:bg-[color:var(--bg-app)] rounded-[color:var(--radius-mcp)] transition-colors"
              >
                <action.icon className="h-4 w-4" />
                <span>{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
