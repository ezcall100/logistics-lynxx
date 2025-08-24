import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, X, Search, Phone, MessageCircle, Video, Mail, Users, FileText, Settings, HelpCircle, Zap, Shield, BarChart3, Truck, Package, DollarSign, Bell, Star, Heart, Cpu, Database, Server, Code, Rocket, Monitor, Globe, Building, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Lock, Eye, Key, Archive, GitBranch, TestTube, Bug, BookOpen, Terminal, Wifi, ShieldCheck, FileCheck, AlertCircle, Cog, HardDrive, Network, Cloud, Palette, Layers, Box, Folder, File, Image, Video as VideoIcon, Music, Download, Upload, RefreshCw, RotateCcw, Play, Pause, Volume2, VolumeX, Mic, MicOff, Camera, CameraOff, Phone as PhoneIcon, PhoneOff, MessageSquare, Inbox, Send, Reply, Forward, Archive as ArchiveIcon, Trash2, Edit, Copy, Save, Minus, Check as CheckIcon, Info, ExternalLink, Link, Unlink, Unlock, EyeOff, UserCheck, UserX, UserPlus, UserMinus, UserCog, Building2, Store, ShoppingCart, CreditCard, Wallet, PiggyBank, Coins, Banknote, Receipt, Calculator, Percent, Divide, Equal, AtSign
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface ActionItem {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
  href?: string;
}

const actions: ActionItem[] = [
  // Quick Actions
  { id: '1', label: 'Add User', description: 'Create new user account', icon: UserPlus, category: 'users', priority: 'high', color: 'bg-gradient-to-br from-blue-500 to-purple-500', href: '#/super-admin/users' },
  { id: '2', label: 'Send Invite', description: 'Invite new team member', icon: Mail, category: 'users', priority: 'high', color: 'bg-gradient-to-br from-green-500 to-blue-500', href: '#/super-admin/invites' },
  { id: '3', label: 'System Alert', description: 'View system alerts', icon: AlertTriangle, category: 'monitoring', priority: 'high', color: 'bg-gradient-to-br from-red-500 to-orange-500', href: '#/super-admin/alerts' },
  { id: '4', label: 'Security Check', description: 'Run security audit', icon: Shield, category: 'security', priority: 'high', color: 'bg-gradient-to-br from-purple-500 to-pink-500', href: '#/super-admin/security' },
  
  // Analytics
  { id: '5', label: 'View Analytics', description: 'Open analytics dashboard', icon: BarChart3, category: 'analytics', priority: 'medium', color: 'bg-gradient-to-br from-indigo-500 to-purple-500', href: '#/super-admin/analytics' },
  { id: '6', label: 'Performance Report', description: 'Generate performance report', icon: Activity, category: 'analytics', priority: 'medium', color: 'bg-gradient-to-br from-blue-500 to-cyan-500', href: '#/super-admin/performance' },
  { id: '7', label: 'User Analytics', description: 'View user statistics', icon: Users, category: 'analytics', priority: 'medium', color: 'bg-gradient-to-br from-green-500 to-emerald-500', href: '#/super-admin/user-analytics' },
  { id: '8', label: 'Revenue Report', description: 'Generate revenue report', icon: DollarSign, category: 'analytics', priority: 'medium', color: 'bg-gradient-to-br from-yellow-500 to-orange-500', href: '#/super-admin/revenue' },
  
  // System Management
  { id: '9', label: 'Database Backup', description: 'Create database backup', icon: Database, category: 'system', priority: 'high', color: 'bg-gradient-to-br from-blue-500 to-indigo-500', href: '#/super-admin/backup' },
  { id: '10', label: 'Server Status', description: 'Check server health', icon: Server, category: 'system', priority: 'high', color: 'bg-gradient-to-br from-green-500 to-teal-500', href: '#/super-admin/server' },
  { id: '11', label: 'API Management', description: 'Manage API endpoints', icon: Code, category: 'system', priority: 'medium', color: 'bg-gradient-to-br from-purple-500 to-violet-500', href: '#/super-admin/api' },
  { id: '12', label: 'Deploy Update', description: 'Deploy system update', icon: Rocket, category: 'system', priority: 'high', color: 'bg-gradient-to-br from-orange-500 to-red-500', href: '#/super-admin/deployment' },
  
  // Security
  { id: '13', label: 'Access Logs', description: 'View access logs', icon: Eye, category: 'security', priority: 'medium', color: 'bg-gradient-to-br from-gray-500 to-slate-500', href: '#/super-admin/access-logs' },
  { id: '14', label: 'Security Audit', description: 'Run security audit', icon: ShieldCheck, category: 'security', priority: 'high', color: 'bg-gradient-to-br from-emerald-500 to-green-500', href: '#/super-admin/security-audit' },
  { id: '15', label: 'User Permissions', description: 'Manage permissions', icon: Lock, category: 'security', priority: 'medium', color: 'bg-gradient-to-br from-red-500 to-pink-500', href: '#/super-admin/permissions' },
  { id: '16', label: 'Compliance Check', description: 'Check compliance status', icon: FileCheck, category: 'security', priority: 'medium', color: 'bg-gradient-to-br from-blue-500 to-sky-500', href: '#/super-admin/compliance' },
  
  // Monitoring
  { id: '17', label: 'System Monitor', description: 'Open system monitor', icon: Monitor, category: 'monitoring', priority: 'medium', color: 'bg-gradient-to-br from-cyan-500 to-blue-500', href: '#/super-admin/monitoring' },
  { id: '18', label: 'Error Tracking', description: 'View error logs', icon: Bug, category: 'monitoring', priority: 'high', color: 'bg-gradient-to-br from-red-500 to-rose-500', href: '#/super-admin/errors' },
  { id: '19', label: 'Network Status', description: 'Check network health', icon: Network, category: 'monitoring', priority: 'medium', color: 'bg-gradient-to-br from-indigo-500 to-blue-500', href: '#/super-admin/network' },
  { id: '20', label: 'Health Check', description: 'Run health check', icon: Heart, category: 'monitoring', priority: 'high', color: 'bg-gradient-to-br from-pink-500 to-rose-500', href: '#/super-admin/health' },
  
  // Development
  { id: '21', label: 'Code Repository', description: 'Open code repository', icon: GitBranch, category: 'development', priority: 'medium', color: 'bg-gradient-to-br from-orange-500 to-amber-500', href: '#/super-admin/repo' },
  { id: '22', label: 'Testing Suite', description: 'Run tests', icon: TestTube, category: 'development', priority: 'medium', color: 'bg-gradient-to-br from-purple-500 to-fuchsia-500', href: '#/super-admin/testing' },
  { id: '23', label: 'Dev Documentation', description: 'View documentation', icon: BookOpen, category: 'development', priority: 'low', color: 'bg-gradient-to-br from-slate-500 to-gray-500', href: '#/super-admin/dev-docs' },
  { id: '24', label: 'Release Management', description: 'Manage releases', icon: Terminal, category: 'development', priority: 'medium', color: 'bg-gradient-to-br from-green-500 to-lime-500', href: '#/super-admin/releases' }
];

const categories = [
  { id: 'all', label: 'All', icon: Plus },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'system', label: 'System', icon: Server },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  { id: 'development', label: 'Development', icon: Code }
];

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || action.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleActionClick = (action: ActionItem) => {
    if (action.href) {
      window.location.href = action.href;
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
      </motion.button>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-80 max-h-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-white/50 focus:bg-white focus:border-blue-300"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="p-4 border-b border-white/20 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0' 
                        : 'bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white'
                    }`}
                  >
                    <category.icon className="h-4 w-4 mr-1" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredActions.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  No actions found
                </div>
              ) : (
                <div className="p-2">
                  {filteredActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleActionClick(action)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 text-left group"
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.label}</p>
                        <p className="text-xs text-gray-500 capitalize">{action.description}</p>
                      </div>
                      {action.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs bg-gradient-to-r from-red-500 to-pink-500">
                          High
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/20 bg-gradient-to-r from-gray-50 to-blue-50">
              <p className="text-xs text-gray-500 text-center">
                {filteredActions.length} actions available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
