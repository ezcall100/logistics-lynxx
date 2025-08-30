import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Truck, 
  BarChart3, 
  Users, 
  Route, 
  Wrench, 
  Home,
  Bell,
  Search,
  User,
  LogOut,
  Mail,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Package,
  MapPin,
  Building,
  CreditCard,
  Receipt,
  Calculator,
  Database,
  Globe,
  ShoppingCart,
  FileBarChart
} from 'lucide-react';

const CarrierPortal: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/carrier/dashboard',
      icon: Home,
      submenu: []
    },
    {
      name: 'CRM',
      icon: Users,
      submenu: [
        { name: 'Overview', href: '/carrier/crm/overview' },
        { name: 'Email', href: '/carrier/crm/email' },
        { name: 'Leads', href: '/carrier/crm/leads' },
        { name: 'Contacts', href: '/carrier/crm/contacts' },
        { name: 'Projects', href: '/carrier/crm/projects' },
        { name: 'Calendar', href: '/carrier/crm/calendar' },
        { name: 'Opportunities', href: '/carrier/crm/opportunities' }
      ]
    },
    {
      name: 'Quote',
      icon: FileText,
      submenu: [
        { name: 'All Quotes', href: '/carrier/quote/all' },
        { name: 'New Quote', href: '/carrier/quote/new' }
      ]
    },
    {
      name: 'Shipments',
      icon: Package,
      submenu: [
        { name: 'All Shipments', href: '/carrier/shipments/all' },
        { name: 'New Shipment', href: '/carrier/shipments/new' },
        { name: 'Assigned', href: '/carrier/shipments/assigned' },
        { name: 'Pending', href: '/carrier/shipments/pending' },
        { name: 'In Transit', href: '/carrier/shipments/in-transit' },
        { name: 'Delivered', href: '/carrier/shipments/delivered' }
      ]
    },
    {
      name: 'Load Board',
      icon: Truck,
      submenu: [
        { name: 'Find Loads', href: '/carrier/loadboard/find' },
        { name: 'Search Loads', href: '/carrier/loadboard/search' },
        { name: 'Post Truck', href: '/carrier/loadboard/post-truck' },
        { name: 'My Loads', href: '/carrier/loadboard/my-loads' }
      ]
    },
    {
      name: 'Networks',
      icon: Globe,
      submenu: [
        { name: 'Customers', href: '/carrier/networks/customers' },
        { name: 'Vendors', href: '/carrier/networks/vendors' },
        { name: 'Terminals', href: '/carrier/networks/terminals' },
        { name: 'Locations', href: '/carrier/networks/locations' }
      ]
    },
    {
      name: 'Assets',
      icon: Building,
      submenu: [
        { name: 'Units', href: '/carrier/assets/units' },
        { name: 'Trucks', href: '/carrier/assets/trucks' },
        { name: 'Trailers', href: '/carrier/assets/trailers' },
        { name: 'Fleet Tracker', href: '/carrier/assets/fleet-tracker' },
        { name: 'Compliance', href: '/carrier/assets/compliance' },
        { name: 'Fuel Audit', href: '/carrier/assets/fuel-audit' }
      ]
    },
    {
      name: 'Workers',
      icon: Users,
      submenu: [
        { name: 'Executives', href: '/carrier/workers/executives' },
        { name: 'Employees', href: '/carrier/workers/employees' },
        { name: 'Agents', href: '/carrier/workers/agents' }
      ]
    },
    {
      name: 'Documents',
      icon: FileText,
      submenu: [
        { name: 'All Documents', href: '/carrier/documents/all' },
        { name: 'Upload', href: '/carrier/documents/upload' },
        { name: 'Setup', href: '/carrier/documents/setup' }
      ]
    },
    {
      name: 'Rates',
      icon: DollarSign,
      submenu: [
        { name: 'Buy Rate', href: '/carrier/rates/buy-rate' },
        { name: 'Sell Rate', href: '/carrier/rates/sell-rate' }
      ]
    },
    {
      name: 'Financials',
      icon: Calculator,
      submenu: [
        { name: 'Sales & Payments', href: '/carrier/financials/sales' },
        { name: 'Purchases', href: '/carrier/financials/purchases' },
        { name: 'Accounting', href: '/carrier/financials/accounting' },
        { name: 'Payroll', href: '/carrier/financials/payroll' }
      ]
    },
    {
      name: 'API Dashboard',
      icon: Database,
      submenu: [
        { name: 'API Keys', href: '/carrier/api/keys' },
        { name: 'API Logs', href: '/carrier/api/logs' },
        { name: 'API Errors', href: '/carrier/api/errors' }
      ]
    },
    {
      name: 'EDI Dashboard',
      icon: Receipt,
      submenu: [
        { name: 'EDI Matching', href: '/carrier/edi/matching' },
        { name: 'EDI Setup', href: '/carrier/edi/setup' },
        { name: 'Partners List', href: '/carrier/edi/partners' },
        { name: 'Failed', href: '/carrier/edi/failed' }
      ]
    },
    {
      name: 'Marketplace',
      icon: ShoppingCart,
      submenu: [
        { name: 'All', href: '/carrier/marketplace/all' },
        { name: 'Accounting', href: '/carrier/marketplace/accounting' },
        { name: 'Carrier Compliance', href: '/carrier/marketplace/compliance' },
        { name: 'API', href: '/carrier/marketplace/api' },
        { name: 'EDI', href: '/carrier/marketplace/edi' },
        { name: 'ELDs', href: '/carrier/marketplace/elds' },
        { name: 'Factoring', href: '/carrier/marketplace/factoring' },
        { name: 'Fuel Cards', href: '/carrier/marketplace/fuel-cards' },
        { name: 'Load Board', href: '/carrier/marketplace/load-board' },
        { name: 'Mileage', href: '/carrier/marketplace/mileage' },
        { name: 'Payments', href: '/carrier/marketplace/payments' },
        { name: 'Tolls', href: '/carrier/marketplace/tolls' },
        { name: 'Visibility', href: '/carrier/marketplace/visibility' }
      ]
    },
    {
      name: 'Reports',
      icon: FileBarChart,
      submenu: [
        { name: 'Financial', href: '/carrier/reports/financial' },
        { name: 'Receivable', href: '/carrier/reports/receivable' },
        { name: 'Payable', href: '/carrier/reports/payable' },
        { name: 'Banking', href: '/carrier/reports/banking' },
        { name: 'Payroll', href: '/carrier/reports/payroll' },
        { name: 'Sales', href: '/carrier/reports/sales' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors md:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Carrier Portal</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Carrier Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Carrier Portal</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                  <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:inset-0 overflow-y-auto`}>
            <div className="flex flex-col h-full">
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isExpanded = expandedMenus.includes(item.name.toLowerCase().replace(/\s+/g, '-'));
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isActive = location.pathname === item.href;

                    return (
                      <div key={item.name}>
                        {hasSubmenu ? (
                          <button
                            onClick={() => toggleMenu(item.name.toLowerCase().replace(/\s+/g, '-'))}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </div>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        )}

                        {/* Submenu */}
                        {hasSubmenu && isExpanded && (
                          <div className="ml-8 mt-2 space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                  location.pathname === subItem.href
                                    ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Icons */}
              <div className="border-t border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-around">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CarrierPortal;
