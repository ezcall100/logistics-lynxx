import React, { useState, useCallback } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AppShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  rightRail?: React.ReactNode;
  showSidebar?: boolean;
  showRightRail?: boolean;
  onSidebarToggle?: () => void;
  onRightRailToggle?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  sidebar,
  topbar,
  rightRail,
  showSidebar = true,
  showRightRail = false,
  onSidebarToggle,
  onRightRailToggle
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightRailOpen, setIsRightRailOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const { user, logout } = useAuth();

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
    onSidebarToggle?.();
  }, [isSidebarOpen, onSidebarToggle]);

  const handleRightRailToggle = useCallback(() => {
    setIsRightRailOpen(!isRightRailOpen);
    onRightRailToggle?.();
  }, [isRightRailOpen, onRightRailToggle]);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    // TODO: Implement theme switching logic
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-primary flex">
      {/* Sidebar */}
      {showSidebar && (
        <aside 
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-elevated border-r border-default
            transform transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-default">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MCP</span>
                </div>
                <span className="font-semibold text-lg">Portal</span>
              </div>
              <button
                onClick={handleSidebarToggle}
                className="lg:hidden p-2 rounded-md hover:bg-soft transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              {sidebar}
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        {topbar || (
          <header className="bg-elevated border-b border-default px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {showSidebar && (
                  <button
                    onClick={handleSidebarToggle}
                    className="lg:hidden p-2 rounded-md hover:bg-soft transition-colors"
                    aria-label="Toggle sidebar"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                )}
                
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-canvas border border-default rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-md hover:bg-soft transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>

                {/* Notifications */}
                <button
                  className="p-2 rounded-md hover:bg-soft transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-soft transition-colors"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-brand-primary-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-tertiary" />
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-elevated border border-default rounded-lg shadow-lg py-1 z-50">
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-soft transition-colors flex items-center space-x-2"
                      onClick={() => {/* TODO: Navigate to profile */}}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-soft transition-colors flex items-center space-x-2"
                      onClick={() => {/* TODO: Navigate to settings */}}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-default my-1"></div>
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-soft transition-colors flex items-center space-x-2 text-error"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 flex min-w-0">
          <div className="flex-1 overflow-auto">
            {children}
          </div>

          {/* Right Rail */}
          {showRightRail && rightRail && (
            <aside 
              className={`
                fixed lg:static inset-y-0 right-0 z-40 w-80 bg-elevated border-l border-default
                transform transition-transform duration-200 ease-in-out
                ${isRightRailOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              `}
            >
              <div className="flex flex-col h-full">
                {/* Right Rail Header */}
                <div className="flex items-center justify-between p-4 border-b border-default">
                  <h3 className="font-semibold">Details</h3>
                  <button
                    onClick={handleRightRailToggle}
                    className="lg:hidden p-2 rounded-md hover:bg-soft transition-colors"
                    aria-label="Close right rail"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Right Rail Content */}
                <div className="flex-1 overflow-y-auto">
                  {rightRail}
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {(isSidebarOpen || isRightRailOpen) && (
        <div 
          className="fixed inset-0 bg-overlay z-30 lg:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsRightRailOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AppShell;



