import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '../ui/collapsible';
import { 
  ChevronDown, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  HelpCircle, 
  BookOpen,
  LayoutDashboard,
  Users,
  FileText,
  Truck,
  Network,
  Building,
  Briefcase,
  DollarSign,
  Code,
  Database,
  ShoppingCart,
  BarChart3,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Target,
  Package,
  Route,
  Globe,
  Wrench,
  Fuel,
  Shield,
  CreditCard,
  Calculator,
  Receipt,
  Banknote,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Menu,
  Key,
  Handshake
} from 'lucide-react';

const BrokerPortal = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubmenu, setActiveSubmenu] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'New load posted', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Quote expiring soon', time: '5 min ago' },
    { id: 3, type: 'success', message: 'Shipment delivered successfully', time: '10 min ago' }
  ]);

  // Menu structure for Broker Admin Dashboard
  const menuStructure = {
    dashboard: {
      icon: LayoutDashboard,
      label: 'Dashboard',
      submenus: []
    },
    relationships: {
      icon: Users,
      label: 'Relationships',
      submenus: [
        { label: 'Overview', icon: BarChart3 },
        { label: 'Email', icon: Mail },
        { label: 'Leads', icon: Target },
        { label: 'Contacts', icon: Phone },
        { label: 'Projects', icon: Briefcase },
        { label: 'Calendar', icon: Calendar },
        { label: 'Opportunities', icon: Target }
      ]
    },
    quote: {
      icon: FileText,
      label: 'Quote',
      submenus: [
        { label: 'All Quote', icon: FileText },
        { label: 'New Quote', icon: Plus }
      ]
    },
    shipments: {
      icon: Package,
      label: 'Shipments',
      submenus: [
        { label: 'All Shipments', icon: Package },
        { label: 'New', icon: Plus },
        { label: 'Assigned', icon: CheckCircle },
        { label: 'Pending', icon: Clock },
        { label: 'In Transit', icon: Route },
        { label: 'Delivered', icon: CheckCircle }
      ]
    },
    loadBoard: {
      icon: Truck,
      label: 'Load Board',
      submenus: [
        { label: 'Post Loads', icon: Plus },
        { label: 'Search Loads', icon: Search },
        { label: 'Book Loads', icon: CheckCircle }
      ]
    },
    networks: {
      icon: Network,
      label: 'Networks',
      submenus: [
        { label: 'Customers', icon: Users },
        { label: 'Vendors', icon: Building },
        { label: 'Terminals', icon: MapPin },
        { label: 'Locations', icon: MapPin }
      ]
    },
    workers: {
      icon: Users,
      label: 'Workers',
      submenus: [
        { label: 'Executive', icon: User },
        { label: 'Employee', icon: Users },
        { label: 'Agents', icon: Briefcase }
      ]
    },
    documents: {
      icon: FileText,
      label: 'Documents',
      submenus: [
        { label: 'All Documents', icon: FileText },
        { label: 'Upload', icon: Upload },
        { label: 'Setup', icon: Settings }
      ]
    },
    rates: {
      icon: DollarSign,
      label: 'Rates',
      submenus: [
        { label: 'Buy Rate', icon: DollarSign },
        { label: 'Sell Rate', icon: Calculator }
      ]
    },
    financials: {
      icon: DollarSign,
      label: 'Financials',
      submenus: [
        { label: 'Sales & Payments', icon: Receipt, subSubmenus: [
          { label: 'Invoices', icon: FileText },
          { label: 'Recurring Invoices', icon: Clock },
          { label: 'Customer Statements', icon: FileText },
          { label: 'Products & Services', icon: Package }
        ]},
        { label: 'Purchases', icon: ShoppingCart, subSubmenus: [
          { label: 'Bills', icon: Receipt },
          { label: 'Vendors', icon: Building },
          { label: 'Products & Services', icon: Package }
        ]},
        { label: 'Accounting', icon: Banknote, subSubmenus: [
          { label: 'Transactions', icon: DollarSign },
          { label: 'Reconciliation', icon: CheckCircle },
          { label: 'Chart of Accounts', icon: BarChart3 }
        ]},
        { label: 'Payroll', icon: CreditCard, subSubmenus: [
          { label: 'Run Payroll', icon: DollarSign },
          { label: 'Employees', icon: Users },
          { label: 'Timesheets', icon: Clock },
          { label: 'Payroll Transactions', icon: DollarSign },
          { label: 'Taxes', icon: Receipt },
          { label: 'Tax Forms', icon: FileText }
        ]}
      ]
    },
    apiDashboard: {
      icon: Code,
      label: 'API Dashboard',
      submenus: [
        { label: 'API Keys', icon: Key },
        { label: 'API Logs', icon: FileText },
        { label: 'API Errors', icon: AlertCircle }
      ]
    },
    ediDashboard: {
      icon: Database,
      label: 'EDI Dashboard',
      submenus: [
        { label: 'EDI Matching', icon: CheckCircle, subSubmenus: [
          { label: 'EDI 210', icon: FileText },
          { label: 'EDI 214', icon: FileText }
        ]},
        { label: 'EDI Setup', icon: Settings },
        { label: 'Partners List', icon: Users },
        { label: 'Failed', icon: XCircle, subSubmenus: [
          { label: 'Tender', icon: FileText },
          { label: 'Invoices', icon: Receipt }
        ]}
      ]
    },
    marketPlace: {
      icon: ShoppingCart,
      label: 'Market Place',
      submenus: [
        { label: 'All', icon: ShoppingCart },
        { label: 'Accounting', icon: Calculator },
        { label: 'Carrier Compliance', icon: Shield },
        { label: 'API', icon: Code },
        { label: 'EDI', icon: Database },
        { label: 'ELDs', icon: Truck },
        { label: 'Factoring', icon: DollarSign },
        { label: 'Fuel Cards', icon: CreditCard },
        { label: 'Load Board', icon: Package },
        { label: 'Mileage', icon: Route },
        { label: 'Payments', icon: DollarSign },
        { label: 'Tolls', icon: Receipt },
        { label: 'Visibility', icon: Eye }
      ]
    },
    reports: {
      icon: BarChart3,
      label: 'Reports',
      submenus: [
        { label: 'Financial', icon: DollarSign },
        { label: 'Receivable', icon: Receipt },
        { label: 'Payable', icon: Banknote },
        { label: 'Banking', icon: Building },
        { label: 'Payroll', icon: CreditCard },
        { label: 'Sales', icon: BarChart3 }
      ]
    }
  };

  const settingsMenu = [
    { label: 'User Management', icon: Users },
    { label: 'General Settings', icon: Settings },
    { label: 'Company Settings', icon: Building },
    { label: 'Payroll Settings', icon: CreditCard },
    { label: 'Account Settings', icon: User },
    { label: 'Template & Documents', icon: FileText },
    { label: 'My Subscription', icon: CreditCard }
  ];

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleMenuClick = (menuKey: string) => {
    setActiveMenu(menuKey);
    setActiveSubmenu('');
  };

  const handleSubmenuClick = (submenuKey: string) => {
    setActiveSubmenu(submenuKey);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Handshake className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Broker Admin</h1>
                <p className="text-sm text-slate-600">Freight Brokerage Management</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-green-500"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-slate-500">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {settingsMenu.map((item) => (
                  <DropdownMenuItem key={item.label}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/02.png" alt="User" />
                    <AvatarFallback>BA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Broker Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      broker@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white/80 backdrop-blur-md border-r border-slate-200/50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } min-h-screen sticky top-20`}>
          <nav className="p-4 space-y-2">
            {Object.entries(menuStructure).map(([key, menu]) => (
              <div key={key}>
                {menu.submenus.length === 0 ? (
                  <Button
                    variant={activeMenu === key ? "default" : "ghost"}
                    className={`w-full justify-start ${activeMenu === key ? 'bg-green-500 text-white' : ''}`}
                    onClick={() => handleMenuClick(key)}
                  >
                    <menu.icon className="mr-2 h-4 w-4" />
                    {sidebarOpen && menu.label}
                  </Button>
                ) : (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={activeMenu === key ? "default" : "ghost"}
                        className={`w-full justify-between ${activeMenu === key ? 'bg-green-500 text-white' : ''}`}
                        onClick={() => handleMenuClick(key)}
                      >
                        <div className="flex items-center">
                          <menu.icon className="mr-2 h-4 w-4" />
                          {sidebarOpen && menu.label}
                        </div>
                        {sidebarOpen && <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    {sidebarOpen && (
                      <CollapsibleContent className="ml-6 mt-2 space-y-1">
                        {menu.submenus.map((submenu, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className={`w-full justify-start text-sm ${
                              activeSubmenu === submenu.label ? 'bg-green-100 text-green-700' : ''
                            }`}
                            onClick={() => handleSubmenuClick(submenu.label)}
                          >
                            <submenu.icon className="mr-2 h-4 w-4" />
                            {submenu.label}
                          </Button>
                        ))}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Icons */}
          {sidebarOpen && (
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Learn
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                {isDarkMode ? 'Light' : 'Dark'} Mode
              </Button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Content */}
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  Welcome back, Broker Admin! 🤝
                </h2>
                <p className="text-slate-600">
                  Manage your freight brokerage operations and customer relationships efficiently.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
                    <Package className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">89</div>
                    <p className="text-xs text-slate-600">
                      +15 from last week
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Carriers</CardTitle>
                    <Truck className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">156</div>
                    <p className="text-xs text-slate-600">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">$67,890</div>
                    <p className="text-xs text-slate-600">
                      +25.3% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                    <Users className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-900">4.8/5</div>
                    <p className="text-xs text-slate-600">
                      Excellent rating
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'New load posted', time: '2 minutes ago', type: 'load' },
                      { action: 'Carrier assigned to shipment', time: '1 hour ago', type: 'assignment' },
                      { action: 'Quote accepted', time: '3 hours ago', type: 'quote' },
                      { action: 'Shipment delivered', time: '5 hours ago', type: 'delivery' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-xs text-slate-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrokerPortal;