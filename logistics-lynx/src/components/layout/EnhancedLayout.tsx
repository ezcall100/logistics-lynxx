import React, { useState, useEffect, createContext, useContext } from 'react';
import { EnhancedHeader } from './EnhancedHeader';
import { EnhancedSidebar } from './EnhancedSidebar';

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
  };
}

export const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({
  children,
  user
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
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

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`
        min-h-screen flex transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-900 text-slate-100' 
          : 'bg-slate-50 text-slate-900'
        }
      `}>
        {/* Enhanced Sidebar */}
        <EnhancedSidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          user={user}
          isDarkMode={isDarkMode}
        />

        {/* Overlay for mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Main Content Area */}
        <div className={`
          flex-1 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
        `}>
          {/* Enhanced Header */}
          <EnhancedHeader
            onSidebarToggle={toggleSidebar}
            sidebarOpen={sidebarOpen}
            user={user}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
          />

          {/* Page Content */}
          <main className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Floating Action Button for Quick Actions */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col space-y-3">
            {/* Quick Actions FAB */}
            <div className="flex flex-col space-y-2">
              <button
                className={`
                  w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                  flex items-center justify-center group
                  ${isDarkMode 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                `}
                title="Quick Actions"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              
              {/* Notification FAB */}
              <button
                className={`
                  w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                  flex items-center justify-center group relative
                  ${isDarkMode 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  }
                `}
                title="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
                <span className={`
                  absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center 
                  text-xs animate-pulse
                  ${isDarkMode 
                    ? 'bg-amber-400 text-slate-900' 
                    : 'bg-yellow-400 text-black'
                  }
                `}>
                  3
                </span>
              </button>

              {/* Help FAB */}
              <button
                className={`
                  w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                  flex items-center justify-center group
                  ${isDarkMode 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                  }
                `}
                title="Help & Support"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Helper */}
        <div className="fixed bottom-4 left-4 z-40">
          <div className={`
            rounded-lg shadow-lg border p-3 opacity-0 hover:opacity-100 transition-opacity duration-300
            ${isDarkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
            }
          `}>
            <div className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-center space-x-2">
                <kbd className={`
                  px-1.5 py-0.5 text-xs font-semibold rounded
                  ${isDarkMode 
                    ? 'text-slate-200 bg-slate-700 border border-slate-600' 
                    : 'text-slate-800 bg-slate-100 border border-slate-300'
                  }
                `}>⌘</kbd>
                <kbd className={`
                  px-1.5 py-0.5 text-xs font-semibold rounded
                  ${isDarkMode 
                    ? 'text-slate-200 bg-slate-700 border border-slate-600' 
                    : 'text-slate-800 bg-slate-100 border border-slate-300'
                  }
                `}>K</kbd>
                <span>Search</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className={`
                  px-1.5 py-0.5 text-xs font-semibold rounded
                  ${isDarkMode 
                    ? 'text-slate-200 bg-slate-700 border border-slate-600' 
                    : 'text-slate-800 bg-slate-100 border border-slate-300'
                  }
                `}>⌘</kbd>
                <kbd className={`
                  px-1.5 py-0.5 text-xs font-semibold rounded
                  ${isDarkMode 
                    ? 'text-slate-200 bg-slate-700 border border-slate-600' 
                    : 'text-slate-800 bg-slate-100 border border-slate-300'
                  }
                `}>/</kbd>
                <span>Toggle Sidebar</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="fixed top-4 right-4 z-40">
          <div className={`
            flex items-center space-x-2 rounded-lg shadow-lg border px-3 py-2
            ${isDarkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
            }
          `}>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              System Online
            </span>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

// Export individual components for flexibility
export { EnhancedHeader } from './EnhancedHeader';
export { EnhancedSidebar } from './EnhancedSidebar';
