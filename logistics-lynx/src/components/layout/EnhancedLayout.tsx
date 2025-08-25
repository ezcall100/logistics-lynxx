import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  } | undefined;
}

export const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({
  children,
  user
}) => {
  const navigate = useNavigate();
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
          onThemeToggle={toggleTheme}
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
          />

          {/* Page Content */}
          <main className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

                {/* Floating Action Button - Collapsible Menu */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col space-y-3">
            {/* Sub FABs - Only visible when main FAB is open */}
            {fabOpen && (
              <>
                {/* AI Agent */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group relative
                    ${isDarkMode 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }
                  `}
                  title="AI Agent Assistant"
                  onClick={() => {
                    console.log('AI Agent clicked');
                    navigate('/mcp');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className={`
                    absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center 
                    text-xs font-bold animate-pulse
                    ${isDarkMode 
                      ? 'bg-emerald-400 text-slate-900' 
                      : 'bg-emerald-400 text-white'
                    }
                  `}>
                    AI
                  </span>
                </button>
                
                {/* Phone Call */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group
                    ${isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                  `}
                  title="Phone Call"
                  onClick={() => {
                    console.log('Phone Call clicked');
                    window.open('tel:+1234567890', '_self');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>

                {/* Message */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group
                    ${isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                    }
                  `}
                  title="Send Message"
                  onClick={() => {
                    console.log('Message clicked');
                    navigate('/business/support');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>

                {/* Email */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group
                    ${isDarkMode 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }
                  `}
                  title="Send Email"
                  onClick={() => {
                    console.log('Email clicked');
                    window.open('mailto:support@logisticslynx.com?subject=TMS Support Request', '_self');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>

                {/* Quick Actions */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group
                    ${isDarkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }
                  `}
                  title="Quick Actions"
                  onClick={() => {
                    console.log('Quick Actions clicked');
                    navigate('/dashboard');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>

                {/* Emergency Support */}
                <button
                  className={`
                    w-11 h-11 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                    flex items-center justify-center group
                    ${isDarkMode 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }
                  `}
                  title="Emergency Support"
                  onClick={() => {
                    console.log('Emergency Support clicked');
                    navigate('/business/support');
                    setFabOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Main FAB - Toggle Button */}
            <button
              className={`
                w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                flex items-center justify-center group relative
                ${isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
                }
              `}
              title={fabOpen ? "Close Menu" : "Open Quick Actions"}
              onClick={() => {
                console.log('Main FAB clicked, toggling menu');
                setFabOpen(!fabOpen);
              }}
            >
              <svg 
                className={`w-7 h-7 transition-transform duration-200 ${fabOpen ? 'rotate-45' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
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
