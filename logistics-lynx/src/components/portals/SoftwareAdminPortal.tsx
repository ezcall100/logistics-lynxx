import React, { useState } from 'react';
import FloatingActionButton from '../admin/FloatingActionButton';

export default function SoftwareAdminPortal() {
  console.log('SoftwareAdminPortal component loaded successfully!');
  
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['overview']));
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleGroup = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar */}
      <aside className="w-72 border-r bg-gradient-to-b from-slate-50 to-slate-100 p-4 space-y-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">⚙️</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">Software Admin</span>
        </div>
        
        <nav className="space-y-2">
          {/* Overview */}
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors">
              <span>📊</span>
              <span>Overview</span>
            </a>
          </div>

          {/* Relationships */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('relationships')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span>Relationships</span>
              </div>
              <span className={`transition-transform ${expandedGroups.has('relationships') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('relationships') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📧</span>
                  <span className="ml-2">Email</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🎯</span>
                  <span className="ml-2">Leads</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>👤</span>
                  <span className="ml-2">Contacts</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📁</span>
                  <span className="ml-2">Projects</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📅</span>
                  <span className="ml-2">Calendar</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>💼</span>
                  <span className="ml-2">Opportunities</span>
                </a>
              </div>
            )}
          </div>

          {/* Service Desk */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('desk')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🛟</span>
                <span>Service Desk</span>
              </div>
              <span className={`transition-transform ${expandedGroups.has('desk') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('desk') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📋</span>
                  <span className="ml-2">All Tickets</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-100 text-blue-800 rounded-full">156</span>
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>👤</span>
                  <span className="ml-2">Assigned</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-green-100 text-green-800 rounded-full">89</span>
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>❓</span>
                  <span className="ml-2">Unassigned</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-orange-100 text-orange-800 rounded-full">67</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🚨</span>
                  <span className="ml-2">Incidents</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📝</span>
                  <span className="ml-2">Service Requests</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🔄</span>
                  <span className="ml-2">Changes</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>⚠️</span>
                  <span className="ml-2">Problems</span>
                </a>
              </div>
            )}
          </div>

          {/* Networks */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('networks')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span>Networks</span>
          </div>
              <span className={`transition-transform ${expandedGroups.has('networks') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('networks') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🏢</span>
                  <span className="ml-2">Customers</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🏭</span>
                  <span className="ml-2">Vendors</span>
                </a>
          </div>
            )}
        </div>

          {/* Workforce */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('workforce')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>👷</span>
                <span>Workforce</span>
              </div>
              <span className={`transition-transform ${expandedGroups.has('workforce') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('workforce') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>👔</span>
                  <span className="ml-2">Executives</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>👥</span>
                  <span className="ml-2">Employees</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🚗</span>
                  <span className="ml-2">Drivers</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🤖</span>
                  <span className="ml-2">Agents</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>⏰</span>
                  <span className="ml-2">Scheduling & Timesheets</span>
                </a>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('docs')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span>Documents</span>
              </div>
              <span className={`transition-transform ${expandedGroups.has('docs') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('docs') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📁</span>
                  <span className="ml-2">All Documents</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📤</span>
                  <span className="ml-2">Upload</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📋</span>
                  <span className="ml-2">Templates & Setup</span>
                </a>
              </div>
            )}
          </div>

          {/* Financials */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('fin')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span>Financials</span>
          </div>
              <span className={`transition-transform ${expandedGroups.has('fin') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('fin') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>💳</span>
                  <span className="ml-2">Sales & Payments</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🛒</span>
                  <span className="ml-2">Purchases</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📊</span>
                  <span className="ml-2">Accounting</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>💵</span>
                  <span className="ml-2">Payroll</span>
                </a>
          </div>
            )}
        </div>

          {/* Integrations & API */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('api')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🔌</span>
                <span>Integrations & API</span>
        </div>
              <span className={`transition-transform ${expandedGroups.has('api') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('api') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🔑</span>
                  <span className="ml-2">API Keys</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📝</span>
                  <span className="ml-2">API Logs</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>❌</span>
                  <span className="ml-2">API Errors</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📡</span>
                  <span className="ml-2">EDI Partners & Flows</span>
                </a>
        </div>
            )}
        </div>

          {/* Marketplace */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('market')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🛒</span>
                <span>Marketplace</span>
                    </div>
              <span className={`transition-transform ${expandedGroups.has('market') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('market') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📦</span>
                  <span className="ml-2">All</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📊</span>
                  <span className="ml-2">Accounting</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>✅</span>
                  <span className="ml-2">Carrier Compliance</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🔌</span>
                  <span className="ml-2">API</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📡</span>
                  <span className="ml-2">EDI</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📱</span>
                  <span className="ml-2">ELDs</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>💳</span>
                  <span className="ml-2">Factoring</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>⛽</span>
                  <span className="ml-2">Fuel Cards</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📋</span>
                  <span className="ml-2">Load Board</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🛣️</span>
                  <span className="ml-2">Mileage</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>💸</span>
                  <span className="ml-2">Payments</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🛣️</span>
                  <span className="ml-2">Tolls</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>👁️</span>
                  <span className="ml-2">Visibility</span>
                </a>
                    </div>
            )}
                  </div>

          {/* Reports */}
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors">
              <span>📊</span>
              <span>Reports</span>
            </a>
                    </div>

          {/* Autonomous Agents */}
          <div className="space-y-1">
            <button
              onClick={() => toggleGroup('autonomous')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span>Autonomous Agents</span>
              </div>
              <span className={`transition-transform ${expandedGroups.has('autonomous') ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedGroups.has('autonomous') && (
              <div className="ml-6 space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🤖</span>
                  <span className="ml-2">Agent Management</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>📊</span>
                  <span className="ml-2">System Monitoring</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>🔧</span>
                  <span className="ml-2">Development</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
                  <span>⚙️</span>
                  <span className="ml-2">Configuration</span>
                </a>
                    </div>
            )}
                  </div>
        </nav>

        {/* Bottom Rail */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex gap-2">
              <a href="/learn" className="hover:text-slate-700">Learn</a>
              <a href="/help" className="hover:text-slate-700">Help</a>
                    </div>
            <button className="hover:text-slate-700">🌓</button>
                    </div>
                  </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              <span className="text-sm font-medium">Trans Bot AI</span>
              <span className="text-slate-400">▼</span>
                    </div>
                  </div>

          <div className="flex items-center gap-3">
            {/* Command Palette */}
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
              <span>🔍</span>
              <span>Search...</span>
              <kbd className="text-xs bg-slate-200 px-1 rounded">⌘K</kbd>
            </button>

            {/* Quick Add */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <span>➕</span>
                <span>Quick Add</span>
              </button>
              {showQuickAdd && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Lead</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Contact</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Opportunity</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Ticket</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Invoice</a>
                  <a href="#" className="block px-3 py-2 text-sm hover:bg-slate-50">Load</a>
                </div>
              )}
              </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">⚙️</span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
              <span className="text-lg">👤</span>
              <span className="text-sm">Admin</span>
            </button>
                    </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome to Software Admin</h1>
            <p className="text-blue-100">Full autonomous agent authority enabled. System running at peak performance.</p>
                    </div>

          {/* System Health Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">System Status</p>
                  <p className="text-lg font-semibold text-green-600">Healthy</p>
                </div>
              </div>
                    </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-lg">📊</span>
                    </div>
                <div>
                  <p className="text-sm text-slate-600">Uptime</p>
                  <p className="text-lg font-semibold text-blue-600">99.9%</p>
                  </div>
                    </div>
                    </div>
                    
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Agents</p>
                  <p className="text-lg font-semibold text-purple-600">250+</p>
                </div>
              </div>
                    </div>
                    
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-orange-600 text-lg">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Alerts</p>
                  <p className="text-lg font-semibold text-orange-600">3</p>
                </div>
                    </div>
                  </div>
              </div>

              {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                  <p className="text-sm font-medium">New support ticket created</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                      </div>
                    </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Autonomous agent completed task</p>
                  <p className="text-xs text-slate-500">5 minutes ago</p>
                </div>
            </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System backup completed</p>
                  <p className="text-xs text-slate-500">15 minutes ago</p>
                  </div>
            </div>
                  </div>
            </div>

          {/* Autonomous Agent Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Autonomous Agent Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <span className="text-3xl">📈</span>
                <p className="text-2xl font-bold text-green-600">250+</p>
                <p className="text-sm text-green-700">Active Agents</p>
                  </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <span className="text-3xl">⚡</span>
                <p className="text-2xl font-bold text-blue-600">98.5%</p>
                <p className="text-sm text-blue-700">Success Rate</p>
            </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <span className="text-3xl">📊</span>
                <p className="text-2xl font-bold text-purple-600">~150ms</p>
                <p className="text-sm text-purple-700">Response Time</p>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        userRole="admin"
        userEntitlements={['admin.core', 'crm.core', 'tickets.core', 'networks.core', 'workforce.core', 'docs.core', 'financials.core', 'payroll.core', 'api.core', 'marketplace.core', 'reports.core', 'edi.x12']}
        isAdmin={true}
      />
            </div>
  );
}
