import React, { useState, useEffect, createContext, useContext } from 'react';
import { EnhancedHeader } from './EnhancedHeader';
import { EnhancedSidebar } from './EnhancedSidebar';
import Breadcrumbs from '../ui/Breadcrumbs';
import { Plus, Settings, Bell, Search, User, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
// Temporarily commented out to fix dependency issues
// import { executeFabAction } from '../FabActions';

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface EnhancedLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | undefined;
}

export const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({
  children,
  user
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Use more specific breakpoints to avoid tablet issues
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isMobile = window.innerWidth < 768;
      const isDesktop = window.innerWidth >= 1024;
      
      setIsMobile(isMobile || isTablet);
      
      // Keep sidebar open on desktop, closed on mobile/tablet
      if (isDesktop) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const themeContextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme
  };

  // Enhanced FAB Actions
  const fabActions = [
    {
      id: 'quick-action',
      icon: Plus,
      label: 'Quick Action',
      action: () => console.log('Quick action triggered'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      action: () => console.log('Settings opened'),
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      action: () => console.log('Notifications opened'),
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        {/* Enhanced Header */}
        <EnhancedHeader
          onSidebarToggle={toggleSidebar}
          sidebarOpen={sidebarOpen}
          isDarkMode={isDarkMode}
          user={user}
        />

        <div className="flex h-screen pt-16">
          {/* Enhanced Sidebar */}
          <EnhancedSidebar
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            user={user}
          />

          {/* Mobile Overlay */}
          {sidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={handleOverlayClick}
            />
          )}

          {/* Main Content Area */}
          <main className={`
            flex-1 overflow-auto transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}
          `}>
            {/* Enhanced Breadcrumbs - Fixed spacing to prevent overlap */}
            <div className="sticky top-16 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
              <div className="px-8 py-4">
                <Breadcrumbs className="text-sm font-medium text-gray-500 dark:text-gray-400" />
              </div>
            </div>

            {/* Page Content with Enhanced Styling - Added proper spacing */}
            <div className="p-6 pt-6">
              <div className="opacity-0 animate-pulse" style={{ animation: 'fadeIn 0.3s ease-in-out forwards' }}>
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Enhanced Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* FAB Actions */}
          <div className={`flex flex-col items-end space-y-3 transition-all duration-300 ${fabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            {fabActions.map((action, index) => (
              <div
                key={action.id}
                className="flex items-center space-x-3"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInRight 0.3s ease-in-out forwards'
                }}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50 dark:border-slate-700/50">
                  {action.label}
                </span>
                <button
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center`}
                >
                  <action.icon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Main FAB */}
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-50 flex items-center justify-center"
          >
            {fabOpen ? (
              <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
            ) : (
              <Plus className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Enhanced Theme Toggle (Fixed Position) */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 text-gray-900 dark:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </button>
        </div>

        {/* Enhanced Loading States */}
        <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300" id="global-loading">
          <div className="text-center">
            <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 h-12 w-12 mx-auto mb-4"></div>
            <p className="text-gray-900 dark:text-white font-medium">Loading...</p>
          </div>
        </div>

        {/* Enhanced Notifications Area */}
        <div className="fixed top-20 right-6 z-50 space-y-3" id="notifications-area">
          {/* Notifications will be dynamically inserted here */}
        </div>

        {/* Enhanced Tooltips Container */}
        <div className="fixed inset-0 pointer-events-none z-50" id="tooltips-container">
          {/* Tooltips will be dynamically inserted here */}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

// Export individual components for flexibility
export { EnhancedHeader } from './EnhancedHeader';
export { EnhancedSidebar } from './EnhancedSidebar';

export default useTheme;