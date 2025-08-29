import React, { useState, useEffect, createContext, useContext } from 'react';
import { EnhancedHeader } from './EnhancedHeader';
import { EnhancedSidebar } from './EnhancedSidebar';
import Breadcrumbs from '../ui/Breadcrumbs';
import { Plus, Settings, Bell, Search, User, LogOut, Moon, Sun, Menu, X, Sparkles, Command, Brain } from 'lucide-react';
import { Button } from '../ui/button';

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

  // Enhanced FAB Actions with MCP-V2 theme
  const fabActions = [
    {
      id: 'ai-assistant',
      icon: Brain,
      label: 'AI Assistant',
      action: () => console.log('AI Assistant triggered'),
      color: 'bg-[color:var(--brand-1)] hover:bg-[color:var(--brand-1)]/90'
    },
    {
      id: 'quick-command',
      icon: Command,
      label: 'Quick Command',
      action: () => console.log('Quick Command opened'),
      color: 'bg-[color:var(--brand-2)] hover:bg-[color:var(--brand-2)]/90'
    },
    {
      id: 'system-magic',
      icon: Sparkles,
      label: 'System Magic',
      action: () => console.log('System Magic activated'),
      color: 'bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)]'
    }
  ];

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="min-h-screen bg-[color:var(--bg-app)] text-[color:var(--fg)] transition-colors duration-300">
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
            <div className="sticky top-20 z-30 bg-[color:var(--bg-app)]/90 backdrop-blur-xl border-b border-[color:var(--bg-surface-rgba)] shadow-sm">
              <div className="px-8 py-6">
                <Breadcrumbs className="text-sm font-medium text-[color:var(--fg-muted)]" />
              </div>
            </div>

            {/* Page Content with Enhanced Styling - Proper spacing without overlap */}
            <div className="p-6">
              <div className="opacity-0 animate-pulse" style={{ animation: 'fadeIn 0.3s ease-in-out forwards' }}>
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Enhanced Floating Action Button with MCP-V2 Design */}
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
                <span className="text-sm font-medium text-[color:var(--fg)] bg-[color:var(--bg-surface-rgba)] backdrop-blur-sm px-3 py-1 rounded-full border border-[color:var(--bg-surface-rgba)] shadow-[color:var(--shadow-soft)]">
                  {action.label}
                </span>
                <button
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-[color:var(--shadow-soft)] hover:shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center`}
                >
                  <action.icon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Main FAB */}
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[color:var(--brand-1)] to-[color:var(--brand-2)] hover:from-[color:var(--brand-1)]/90 hover:to-[color:var(--brand-2)]/90 text-white rounded-full shadow-[color:var(--shadow-soft)] hover:shadow-lg transition-all duration-200 transform hover:scale-110 z-50 flex items-center justify-center"
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
            className="w-12 h-12 bg-[color:var(--bg-surface-rgba)] backdrop-blur-sm border border-[color:var(--bg-surface-rgba)] text-[color:var(--fg)] rounded-full shadow-[color:var(--shadow-soft)] hover:shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-[color:var(--brand-1)]" />
            )}
          </button>
        </div>

        {/* Enhanced Loading States */}
        <div className="fixed inset-0 bg-[color:var(--bg-app)]/80 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300" id="global-loading">
          <div className="text-center">
            <div className="animate-spin rounded-full border-2 border-[color:var(--bg-surface-rgba)] border-t-[color:var(--brand-1)] h-12 w-12 mx-auto mb-4"></div>
            <p className="text-[color:var(--fg)] font-medium">Loading...</p>
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