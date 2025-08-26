import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Truck,
  Globe,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { EnhancedIcon, IconSets } from '../ui/EnhancedIcon';
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
  sidebarOpen = true,
  isDarkMode = false,
  user
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const quickActions = [
    { name: 'New Load', icon: 'Truck', action: () => navigate('/super-admin/dashboard') },
    { name: 'Analytics', icon: 'BarChart3', action: () => navigate('/super-admin/analytics/business') },
    { name: 'Settings', icon: 'Settings', action: () => navigate('/super-admin/settings') },
    { name: 'Support', icon: 'HelpCircle', action: () => navigate('/super-admin/business/support') }
  ];

  return (
    <header className={`
      border-b sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300
      ${isDarkMode 
        ? 'bg-slate-800/95 border-slate-700' 
        : 'bg-white/95 border-slate-200'
      }
    `}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <button
              onClick={onSidebarToggle}
              className={`
                p-2 rounded-lg transition-all duration-200 group
                ${isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-slate-100 hover:bg-slate-200'
                }
              `}
            >
              <Menu className={`
                h-5 w-5 transition-colors duration-200
                ${isDarkMode 
                  ? 'text-slate-400 group-hover:text-slate-200' 
                  : 'text-slate-600 group-hover:text-slate-800'
                }
              `} />
            </button>

                         {/* Logo */}
             <Link to="/super-admin/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <Truck className={`
                  h-8 w-8 transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-indigo-400 group-hover:text-indigo-300' 
                    : 'text-indigo-600 group-hover:text-indigo-700'
                  }
                `} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className={`
                  text-xl font-bold transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-slate-100 group-hover:text-indigo-400' 
                    : 'text-slate-900 group-hover:text-indigo-600'
                  }
                `}>
                  Trans Bot AI
                </span>
                <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  TMS Platform
                </div>
              </div>
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className={`
                  absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                `} />
                <input
                  type="text"
                  placeholder="Search loads, carriers, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                    transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500'
                    }
                  `}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <kbd className={`
                    px-2 py-1 text-xs font-semibold rounded
                    ${isDarkMode 
                      ? 'text-slate-400 bg-slate-700 border border-slate-600' 
                      : 'text-slate-500 bg-slate-100 border border-slate-300'
                    }
                  `}>⌘</kbd>
                  <kbd className={`
                    px-2 py-1 text-xs font-semibold rounded
                    ${isDarkMode 
                      ? 'text-slate-400 bg-slate-700 border border-slate-600' 
                      : 'text-slate-500 bg-slate-100 border border-slate-300'
                    }
                  `}>K</kbd>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.action}
                  className={`
                    p-2 rounded-lg transition-all duration-200 group
                    ${isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600' 
                      : 'bg-slate-100 hover:bg-slate-200'
                    }
                  `}
                  title={action.name}
                >
                  <EnhancedIcon
                    name={action.icon}
                    size={18}
                    className={`
                      transition-colors duration-200
                      ${isDarkMode 
                        ? 'text-slate-400 group-hover:text-indigo-400' 
                        : 'text-slate-600 group-hover:text-indigo-600'
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className={`
                p-2 rounded-lg transition-all duration-200 group relative
                ${isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-slate-100 hover:bg-slate-200'
                }
              `}>
                <Bell className={`
                  h-5 w-5 transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-slate-400 group-hover:text-slate-200' 
                    : 'text-slate-600 group-hover:text-slate-800'
                  }
                `} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* Theme Toggle - Removed duplicate, using layout-level toggle */}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`
                  flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 group
                  ${isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600' 
                    : 'bg-slate-100 hover:bg-slate-200'
                  }
                `}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {user?.name || 'User'}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {user?.role || 'Admin'}
                  </div>
                </div>
                <ChevronDown className={`
                  h-4 w-4 transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-slate-400 group-hover:text-slate-300' 
                    : 'text-slate-500 group-hover:text-slate-600'
                  }
                `} />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <div className={`
                  absolute right-0 mt-2 w-64 rounded-lg shadow-lg border py-2 z-50 transition-colors duration-200
                  ${isDarkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-slate-200'
                  }
                `}>
                  <div className={`
                    px-4 py-3 border-b transition-colors duration-200
                    ${isDarkMode 
                      ? 'border-slate-700' 
                      : 'border-slate-200'
                    }
                  `}>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {user?.name || 'User'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  
                  <div className="py-2">
                                         <button 
                       onClick={() => {
                         navigate('/super-admin/settings/profile');
                         setIsUserDropdownOpen(false);
                       }}
                       className={`
                         w-full px-4 py-2 text-left text-sm flex items-center space-x-3 transition-colors duration-200
                         ${isDarkMode 
                           ? 'text-slate-300 hover:bg-slate-700' 
                           : 'text-slate-700 hover:bg-slate-100'
                         }
                       `}>
                       <User className="h-4 w-4" />
                       <span>Profile</span>
                     </button>
                                         <button 
                       onClick={() => {
                         navigate('/super-admin/settings');
                         setIsUserDropdownOpen(false);
                       }}
                       className={`
                         w-full px-4 py-2 text-left text-sm flex items-center space-x-3 transition-colors duration-200
                         ${isDarkMode 
                           ? 'text-slate-300 hover:bg-slate-700' 
                           : 'text-slate-700 hover:bg-slate-100'
                         }
                       `}>
                       <Settings className="h-4 w-4" />
                       <span>Settings</span>
                     </button>
                                         <button 
                       onClick={() => {
                         navigate('/super-admin/settings/security');
                         setIsUserDropdownOpen(false);
                       }}
                       className={`
                         w-full px-4 py-2 text-left text-sm flex items-center space-x-3 transition-colors duration-200
                         ${isDarkMode 
                           ? 'text-slate-300 hover:bg-slate-700' 
                           : 'text-slate-700 hover:bg-slate-100'
                         }
                       `}>
                       <Shield className="h-4 w-4" />
                       <span>Security</span>
                     </button>
                  </div>
                  
                  <div className={`
                    border-t py-2 transition-colors duration-200
                    ${isDarkMode 
                      ? 'border-slate-700' 
                      : 'border-slate-200'
                    }
                  `}>
                    <button 
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className={`
                        w-full px-4 py-2 text-left text-sm flex items-center space-x-3 transition-colors duration-200
                        ${isDarkMode 
                          ? 'text-rose-400 hover:bg-rose-900/20' 
                          : 'text-rose-600 hover:bg-rose-50'
                        }
                      `}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-all duration-200
                ${isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-slate-100 hover:bg-slate-200'
                }
              `}
            >
              {isMenuOpen ? (
                <X className={`
                  h-5 w-5 transition-colors duration-200
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
                `} />
              ) : (
                <Menu className={`
                  h-5 w-5 transition-colors duration-200
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
                `} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className={`
            lg:hidden py-4 border-t transition-colors duration-200
            ${isDarkMode 
              ? 'border-slate-700' 
              : 'border-slate-200'
            }
          `}>
            <form onSubmit={handleSearch} className="relative">
              <Search className={`
                absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4
                ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
              `} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  transition-colors duration-200
                  ${isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500'
                  }
                `}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`
            lg:hidden py-4 border-t transition-colors duration-200
            ${isDarkMode 
              ? 'border-slate-700' 
              : 'border-slate-200'
            }
          `}>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.action}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-colors duration-200
                    ${isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <EnhancedIcon name={action.icon} size={18} />
                  <span>{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
