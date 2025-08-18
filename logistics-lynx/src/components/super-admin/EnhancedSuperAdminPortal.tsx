import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

// Import basic UI components that we know exist
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

// Import all Super Admin pages
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import SystemAdminPage from './pages/SystemAdminPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import SystemMonitoringPage from './pages/SystemMonitoringPage';
import PortalManagementPage from './pages/PortalManagementPage';
import ReportsPage from './pages/ReportsPage';
import GlobalSettingsPage from './pages/GlobalSettingsPage';

// Modern SVG Icons
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Ban: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 00-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Api: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Folder: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Save: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Door: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  Fire: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Knobs: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Logout: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
};

const EnhancedSuperAdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'user-management']);
  
  // Fixed dark mode with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('super-admin-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('super-admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Navigation structure with modern SVG icons
  const navigationItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Icons.Dashboard,
      path: '/super-admin',
      description: 'System overview and key metrics'
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Icons.Users,
      path: '/super-admin/user-management',
      description: 'Manage users, roles, and permissions',
      subItems: [
        { title: 'All Users', path: '/super-admin/user-management/all-users', icon: Icons.Users },
        { title: 'Active Users', path: '/super-admin/user-management/active-users', icon: Icons.Check },
        { title: 'Pending Users', path: '/super-admin/user-management/pending-users', icon: Icons.Clock },
        { title: 'Suspended Users', path: '/super-admin/user-management/suspended-users', icon: Icons.Ban },
        { title: 'Role Management', path: '/super-admin/user-management/role-management', icon: Icons.Shield },
        { title: 'Permissions', path: '/super-admin/user-management/permissions', icon: Icons.Lock },
        { title: 'User Groups', path: '/super-admin/user-management/user-groups', icon: Icons.Building }
      ]
    },
    {
      id: 'system-admin',
      title: 'System Admin',
      icon: Icons.Settings,
      path: '/super-admin/system-admin',
      description: 'System configuration and administration',
      subItems: [
        { title: 'Database Management', path: '/super-admin/system-admin/database', icon: Icons.Database },
        { title: 'API Management', path: '/super-admin/system-admin/api', icon: Icons.Api },
        { title: 'Network Settings', path: '/super-admin/system-admin/network', icon: Icons.Globe },
        { title: 'File Management', path: '/super-admin/system-admin/files', icon: Icons.Folder },
        { title: 'Backup & Restore', path: '/super-admin/system-admin/backup', icon: Icons.Save },
        { title: 'System Updates', path: '/super-admin/system-admin/updates', icon: Icons.Refresh }
      ]
    },
    {
      id: 'security-center',
      title: 'Security Center',
      icon: Icons.Shield,
      path: '/super-admin/security-center',
      description: 'Security monitoring and controls',
      subItems: [
        { title: 'Security Audit', path: '/super-admin/security-center/audit', icon: Icons.Search },
        { title: 'Access Control', path: '/super-admin/security-center/access-control', icon: Icons.Door },
        { title: 'Encryption', path: '/super-admin/security-center/encryption', icon: Icons.Lock },
        { title: 'Firewall', path: '/super-admin/security-center/firewall', icon: Icons.Fire },
        { title: 'MFA Settings', path: '/super-admin/security-center/mfa', icon: Icons.Phone },
        { title: 'IP Whitelist', path: '/super-admin/security-center/ip-whitelist', icon: Icons.Globe }
      ]
    },
    {
      id: 'system-monitoring',
      title: 'System Monitoring',
      icon: Icons.Chart,
      path: '/super-admin/system-monitoring',
      description: 'Real-time system monitoring and alerts'
    },
    {
      id: 'portal-management',
      title: 'Portal Management',
      icon: Icons.Building,
      path: '/super-admin/portal-management',
      description: 'Manage all system portals and access'
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: Icons.Analytics,
      path: '/super-admin/reports',
      description: 'Comprehensive reporting and analytics'
    },
    {
      id: 'global-settings',
      title: 'Global Settings',
      icon: Icons.Knobs,
      path: '/super-admin/global-settings',
      description: 'Global system configuration'
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  useEffect(() => {
    // Auto-expand the current section
    const currentPath = location.pathname;
    const currentGroup = navigationItems.find(item => 
      currentPath.startsWith(item.path)
    );
    
    if (currentGroup && !expandedGroups.includes(currentGroup.id)) {
      setExpandedGroups(prev => [...prev, currentGroup.id]);
    }
  }, [location.pathname, expandedGroups, navigationItems]);

  return (
    <TooltipProvider>
      <div className={`flex h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'dark bg-slate-900 text-slate-100' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900'
      }`}>
        {/* Enhanced Sidebar */}
        <motion.div
          initial={{ width: 280 }}
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className={`${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } shadow-2xl flex flex-col border-r transition-all duration-500`}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className={`p-4 border-b ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          } flex-shrink-0`}>
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Super Admin</h1>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Command Center</p>
                </div>
              </motion.div>
              
              {/* Enhanced Toggle Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    } transition-all duration-300 rounded-lg p-2`}
                  >
                    <motion.div
                      animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {sidebarCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleGroup(item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                            expandedGroups.includes(item.id)
                              ? isDarkMode 
                                ? 'bg-slate-700 text-white shadow-lg' 
                                : 'bg-slate-100 text-slate-900 shadow-lg'
                              : isDarkMode
                                ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon />
                            {!sidebarCollapsed && (
                              <span className="font-medium">{item.title}</span>
                            )}
                          </div>
                          {!sidebarCollapsed && (
                            <motion.div
                              animate={{ rotate: expandedGroups.includes(item.id) ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Icons.ChevronDown />
                            </motion.div>
                          )}
                        </button>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                    
                    <AnimatePresence>
                      {expandedGroups.includes(item.id) && !sidebarCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-8 mt-2 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <Tooltip key={subItem.path}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => navigate(subItem.path)}
                                  className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-300 ${
                                    location.pathname === subItem.path
                                      ? 'bg-blue-600 text-white shadow-md'
                                      : isDarkMode
                                        ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                  }`}
                                >
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{subItem.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? isDarkMode 
                              ? 'bg-slate-700 text-white shadow-lg' 
                              : 'bg-slate-100 text-slate-900 shadow-lg'
                            : isDarkMode
                              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <item.icon />
                        {!sidebarCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </button>
                    </TooltipTrigger>
                    {sidebarCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </div>
            ))}
          </nav>

          {/* Enhanced System Status Footer */}
          {!sidebarCollapsed && (
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            } flex-shrink-0`}>
              <div className="text-center">
                <p className={`text-xs ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>System Status</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-400 text-sm font-medium">Operational</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <header className={`shadow-lg border-b transition-all duration-500 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-100' 
              : 'bg-white border-slate-200 text-slate-900'
          } flex-shrink-0`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {navigationItems.find(item => location.pathname.startsWith(item.path))?.title || 'Super Admin Portal'}
                </h2>
                <Badge variant="secondary" className={`${
                  isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                } font-medium`}>
                  Enhanced UI
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Theme Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`${
                        isDarkMode 
                          ? 'text-slate-300 hover:bg-slate-700' 
                          : 'text-slate-600 hover:bg-slate-100'
                      } transition-all duration-300 rounded-lg p-2`}
                    >
                      <motion.div
                        animate={{ rotate: isDarkMode ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Enhanced User Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className={`relative h-10 w-10 rounded-full transition-all duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-slate-700' 
                        : 'hover:bg-slate-100'
                    }`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end" forceMount>
                    <div className="flex items-center justify-start gap-3 p-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatars/super-admin.png" alt="Super Admin" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">SA</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-semibold leading-none">Super Administrator</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          system@logistics-lynx.com
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-1 p-2">
                      <Button variant="ghost" className="justify-start hover:bg-slate-100 dark:hover:bg-slate-700">
                        <Icons.User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button variant="ghost" className="justify-start hover:bg-slate-100 dark:hover:bg-slate-700">
                        <Icons.Settings className="w-4 h-4 mr-2" />
                        System Preferences
                      </Button>
                      <Separator />
                      <Button variant="ghost" className="justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Icons.Logout className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/user-management/*" element={<UserManagementPage />} />
                  <Route path="/system-admin/*" element={<SystemAdminPage />} />
                  <Route path="/security-center/*" element={<SecurityCenterPage />} />
                  <Route path="/system-monitoring" element={<SystemMonitoringPage />} />
                  <Route path="/portal-management" element={<PortalManagementPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/global-settings" element={<GlobalSettingsPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EnhancedSuperAdminPortal;
