/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  UserPlus,
  FileText,
  Settings,
  Bell,
  Activity,
  Cpu,
  Shield,
  Database,
  Network,
  HelpCircle,
  Search,
  Zap,
  Sparkles,
  Crown,
  Globe,
  Truck,
  BarChart3,
  Ticket,
  DollarSign,
  Brain,
  Users,
  ChevronUp,
  X,
  Command,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SuperAdminFABProps {
  className?: string;
}

const SuperAdminFAB: React.FC<SuperAdminFABProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(8);
  const [systemAlerts] = useState(3);

  const quickActions = [
    {
      label: 'Add User',
      icon: UserPlus,
      description: 'Create new user account',
      action: () => navigate('/super-admin/users/add'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Create Report',
      icon: FileText,
      description: 'Generate new report',
      action: () => navigate('/super-admin/reports/create'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      label: 'System Health',
      icon: Activity,
      description: 'Check system status',
      action: () => navigate('/super-admin/health'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'AI Agents',
      icon: Cpu,
      description: 'Manage AI agents',
      action: () => navigate('/super-admin/ai-dashboard'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const systemActions = [
    {
      label: 'Database Admin',
      icon: Database,
      action: () => navigate('/super-admin/database'),
      color: 'text-blue-600'
    },
    {
      label: 'Network Config',
      icon: Network,
      action: () => navigate('/super-admin/network'),
      color: 'text-green-600'
    },
    {
      label: 'Security Center',
      icon: Shield,
      action: () => navigate('/super-admin/security'),
      color: 'text-red-600'
    },
    {
      label: 'MCP Control',
      icon: Command,
      action: () => navigate('/super-admin/mcp-control'),
      color: 'text-purple-600'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'System Update Complete',
      message: 'All systems updated to latest version',
      time: '2 min ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'New User Registration',
      message: 'John Doe requested admin access',
      time: '5 min ago',
      type: 'info',
      icon: UserPlus
    },
    {
      id: 3,
      title: 'High CPU Usage Alert',
      message: 'Server CPU usage at 85%',
      time: '10 min ago',
      type: 'warning',
      icon: AlertTriangle
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {/* Search Dialog */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 w-96"
          >
            <Card className="shadow-2xl border-border/50 bg-card/95 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Global Search
                </CardTitle>
                <CardDescription>
                  Search across all portals, users, and systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for users, reports, settings..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <Command className="h-3 w-3" />
                    K
                  </kbd>
                </div>
                
                {searchQuery && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Quick Results</p>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add new user
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <FileText className="h-4 w-4" />
                        Create report
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        System settings
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main FAB Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-4"
          >
            {/* Quick Actions */}
            <Card className="w-80 shadow-2xl border-border/50 bg-card/95 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Fast access to common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className="h-auto p-3 flex flex-col gap-2 hover:bg-primary/10"
                    >
                      <action.icon className="h-5 w-5" />
                      <div className="text-left">
                        <p className="text-sm font-medium">{action.label}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="w-80 shadow-2xl border-border/50 bg-card/95 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-green-500" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Real-time system monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">All Systems Operational</span>
                  </div>
                  <Badge variant="outline" className="text-xs">99.9%</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {systemActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="ghost"
                      size="sm"
                      onClick={action.action}
                      className="justify-start gap-2 hover:bg-primary/10"
                    >
                      <action.icon className={cn("h-4 w-4", action.color)} />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="w-80 shadow-2xl border-border/50 bg-card/95 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Recent Notifications
                  {notifications > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {notifications}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Latest system alerts and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <notification.icon className={cn(
                        "h-4 w-4 mt-0.5",
                        notification.type === 'success' && "text-green-500",
                        notification.type === 'warning' && "text-yellow-500",
                        notification.type === 'info' && "text-blue-500"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl border-0 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="text-primary font-semibold flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Super Admin Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsSearchOpen(!isSearchOpen)} className="gap-3">
                <Search className="h-4 w-4" />
                Global Search
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/super-admin/users/add')} className="gap-3">
                <UserPlus className="h-4 w-4" />
                Add User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/super-admin/reports/create')} className="gap-3">
                <FileText className="h-4 w-4" />
                Create Report
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-border/50" />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/super-admin/health')} className="gap-3">
                <Activity className="h-4 w-4" />
                System Health
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/super-admin/ai-dashboard')} className="gap-3">
                <Brain className="h-4 w-4" />
                AI Dashboard
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-border/50" />
            
            <DropdownMenuItem onClick={() => navigate('/super-admin/help')} className="gap-3">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification Badge */}
        {(notifications > 0 || systemAlerts > 0) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2"
          >
            <Badge 
              variant="destructive" 
              className="h-6 w-6 flex items-center justify-center p-0 text-xs animate-pulse shadow-lg"
            >
              {notifications + systemAlerts}
            </Badge>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SuperAdminFAB;
