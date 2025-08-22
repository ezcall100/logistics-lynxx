import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, Bot, Mail, Plus, X, Settings, 
  HelpCircle, FileText, Users, Calendar, Zap, Shield,
  Video, Headphones, MessageSquare, Send, Download,
  Upload, Share2, Bookmark, Star, AlertTriangle, Search
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FABAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  action: () => void;
  category: 'communication' | 'assistance' | 'tools' | 'support';
  priority: 'high' | 'medium' | 'low';
}

interface FloatingActionButtonProps {
  userRole?: string;
  userEntitlements?: string[];
  isAdmin?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  userRole = 'admin',
  userEntitlements = [],
  isAdmin = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fabRef = useRef<HTMLDivElement>(null);

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // FAB Actions Configuration
  const fabActions: FABAction[] = [
    // Communication Actions
    {
      id: 'call',
      label: 'Call Support',
             icon: <Phone size={20} className="text-green-500" />,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Direct phone call to technical support team',
      action: () => handleCallSupport(),
      category: 'communication',
      priority: 'high'
    },
    {
      id: 'video-call',
      label: 'Video Call',
             icon: <Video size={20} className="text-blue-500" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Start a video conference with support team',
      action: () => handleVideoCall(),
      category: 'communication',
      priority: 'medium'
    },
    {
      id: 'chat',
      label: 'Live Chat',
             icon: <MessageCircle size={20} className="text-purple-500" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Real-time chat with customer support',
      action: () => handleLiveChat(),
      category: 'communication',
      priority: 'high'
    },
    {
      id: 'email',
      label: 'Send Email',
             icon: <Mail size={20} className="text-orange-500" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Compose and send support email',
      action: () => handleSendEmail(),
      category: 'communication',
      priority: 'medium'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
             icon: <Bot size={20} className="text-indigo-500" />,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Get instant help from AI assistant',
      action: () => handleAIAssistant(),
      category: 'assistance',
      priority: 'high'
    },
    {
      id: 'help-desk',
      label: 'Help Desk',
             icon: <HelpCircle size={20} className="text-teal-500" />,
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'Access help desk and knowledge base',
      action: () => handleHelpDesk(),
      category: 'assistance',
      priority: 'medium'
    },
    {
      id: 'documentation',
      label: 'Documentation',
             icon: <FileText size={20} className="text-gray-500" />,
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Access system documentation and guides',
      action: () => handleDocumentation(),
      category: 'assistance',
      priority: 'medium'
    },
    {
      id: 'team-collaboration',
      label: 'Team Chat',
             icon: <Users size={20} className="text-pink-500" />,
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'Collaborate with team members',
      action: () => handleTeamCollaboration(),
      category: 'communication',
      priority: 'medium'
    },
    {
      id: 'schedule-meeting',
      label: 'Schedule Meeting',
             icon: <Calendar size={20} className="text-yellow-500" />,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Schedule a meeting with support team',
      action: () => handleScheduleMeeting(),
      category: 'communication',
      priority: 'low'
    },
    {
      id: 'quick-actions',
      label: 'Quick Actions',
             icon: <Zap size={20} className="text-red-500" />,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Access frequently used actions',
      action: () => handleQuickActions(),
      category: 'tools',
      priority: 'high'
    },
    {
      id: 'security-support',
      label: 'Security Support',
             icon: <Shield size={20} className="text-emerald-500" />,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Get security-related assistance',
      action: () => handleSecuritySupport(),
      category: 'support',
      priority: 'high'
    },
    {
      id: 'voice-support',
      label: 'Voice Support',
             icon: <Headphones size={20} className="text-cyan-500" />,
      color: 'bg-cyan-500 hover:bg-cyan-600',
      description: 'Voice-activated support system',
      action: () => handleVoiceSupport(),
      category: 'assistance',
      priority: 'low'
    },
    {
      id: 'feedback',
      label: 'Send Feedback',
             icon: <MessageSquare size={20} className="text-amber-500" />,
      color: 'bg-amber-500 hover:bg-amber-600',
      description: 'Submit feedback and suggestions',
      action: () => handleSendFeedback(),
      category: 'communication',
      priority: 'low'
    },
    {
      id: 'export-data',
      label: 'Export Data',
             icon: <Download size={20} className="text-lime-500" />,
      color: 'bg-lime-500 hover:bg-lime-600',
      description: 'Export system data and reports',
      action: () => handleExportData(),
      category: 'tools',
      priority: 'medium'
    },
    {
      id: 'import-data',
      label: 'Import Data',
             icon: <Upload size={20} className="text-slate-500" />,
      color: 'bg-slate-500 hover:bg-slate-600',
      description: 'Import data from external sources',
      action: () => handleImportData(),
      category: 'tools',
      priority: 'medium'
    },
    {
      id: 'share-system',
      label: 'Share System',
      icon: <Share2 size={20} />,
      color: 'bg-violet-500 hover:bg-violet-600',
      description: 'Share system access with team members',
      action: () => handleShareSystem(),
      category: 'tools',
      priority: 'low'
    },
    {
      id: 'bookmark-page',
      label: 'Bookmark Page',
      icon: <Bookmark size={20} />,
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Bookmark current page for quick access',
      action: () => handleBookmarkPage(),
      category: 'tools',
      priority: 'low'
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Star size={20} />,
      color: 'bg-yellow-400 hover:bg-yellow-500',
      description: 'Access your favorite features',
      action: () => handleFavorites(),
      category: 'tools',
      priority: 'low'
    },
    {
      id: 'emergency-support',
      label: 'Emergency Support',
      icon: <AlertTriangle size={20} />,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Emergency support for critical issues',
      action: () => handleEmergencySupport(),
      category: 'support',
      priority: 'high'
    },
    {
      id: 'settings',
      label: 'Quick Settings',
      icon: <Settings size={20} />,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Quick access to system settings',
      action: () => handleQuickSettings(),
      category: 'tools',
      priority: 'medium'
    }
  ];

  // Filter actions based on category and search
  const filteredActions = fabActions.filter(action => {
    const matchesCategory = activeCategory === 'all' || action.category === activeCategory;
    const matchesSearch = action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Action Handlers
  const handleCallSupport = () => {
    console.log('🚀 Initiating call to support team...');
    // Implementation: Open phone dialer or initiate VoIP call
    window.open('tel:+1-800-SUPPORT', '_blank');
    setIsOpen(false);
  };

  const handleVideoCall = () => {
    console.log('🚀 Starting video call...');
    // Implementation: Integrate with video conferencing service
    window.open('https://meet.google.com', '_blank');
    setIsOpen(false);
  };

  const handleLiveChat = () => {
    console.log('🚀 Opening live chat...');
    // Implementation: Open chat widget or redirect to chat system
    window.open('/admin/chat', '_blank');
    setIsOpen(false);
  };

  const handleSendEmail = () => {
    console.log('🚀 Opening email composer...');
    // Implementation: Open email client or web-based email
    window.open('mailto:support@company.com?subject=Admin Portal Support', '_blank');
    setIsOpen(false);
  };

  const handleAIAssistant = () => {
    console.log('🚀 Launching AI Assistant...');
    // Implementation: Open AI chat interface
    window.open('/admin/ai-assistant', '_blank');
    setIsOpen(false);
  };

  const handleHelpDesk = () => {
    console.log('🚀 Opening help desk...');
    // Implementation: Redirect to help desk system
    window.open('/admin/help-desk', '_blank');
    setIsOpen(false);
  };

  const handleDocumentation = () => {
    console.log('🚀 Opening documentation...');
    // Implementation: Open documentation portal
    window.open('/admin/docs', '_blank');
    setIsOpen(false);
  };

  const handleTeamCollaboration = () => {
    console.log('🚀 Opening team collaboration...');
    // Implementation: Open team chat or collaboration tool
    window.open('/admin/team-chat', '_blank');
    setIsOpen(false);
  };

  const handleScheduleMeeting = () => {
    console.log('🚀 Opening meeting scheduler...');
    // Implementation: Open calendar/scheduling tool
    window.open('/admin/schedule', '_blank');
    setIsOpen(false);
  };

  const handleQuickActions = () => {
    console.log('🚀 Opening quick actions panel...');
    // Implementation: Show quick actions modal
    alert('Quick Actions Panel - Coming Soon!');
    setIsOpen(false);
  };

  const handleSecuritySupport = () => {
    console.log('🚀 Opening security support...');
    // Implementation: Open security support interface
    window.open('/admin/security-support', '_blank');
    setIsOpen(false);
  };

  const handleVoiceSupport = () => {
    console.log('🚀 Activating voice support...');
    // Implementation: Activate voice recognition
    alert('Voice Support - Coming Soon!');
    setIsOpen(false);
  };

  const handleSendFeedback = () => {
    console.log('🚀 Opening feedback form...');
    // Implementation: Open feedback form
    window.open('/admin/feedback', '_blank');
    setIsOpen(false);
  };

  const handleExportData = () => {
    console.log('🚀 Opening export dialog...');
    // Implementation: Open export options
    alert('Export Data - Coming Soon!');
    setIsOpen(false);
  };

  const handleImportData = () => {
    console.log('🚀 Opening import dialog...');
    // Implementation: Open import options
    alert('Import Data - Coming Soon!');
    setIsOpen(false);
  };

  const handleShareSystem = () => {
    console.log('🚀 Opening share dialog...');
    // Implementation: Open sharing options
    alert('Share System - Coming Soon!');
    setIsOpen(false);
  };

  const handleBookmarkPage = () => {
    console.log('🚀 Bookmarking current page...');
    // Implementation: Add to bookmarks
    alert('Page bookmarked successfully!');
    setIsOpen(false);
  };

  const handleFavorites = () => {
    console.log('🚀 Opening favorites...');
    // Implementation: Show favorites panel
    alert('Favorites - Coming Soon!');
    setIsOpen(false);
  };

  const handleEmergencySupport = () => {
    console.log('🚀 Initiating emergency support...');
    // Implementation: Emergency support protocol
    window.open('tel:+1-800-EMERGENCY', '_blank');
    setIsOpen(false);
  };

  const handleQuickSettings = () => {
    console.log('🚀 Opening quick settings...');
    // Implementation: Open settings panel
    window.open('/admin/settings', '_blank');
    setIsOpen(false);
  };

  const categories = [
    { id: 'all', label: 'All', color: 'bg-gray-500' },
    { id: 'communication', label: 'Communication', color: 'bg-blue-500' },
    { id: 'assistance', label: 'Assistance', color: 'bg-green-500' },
    { id: 'tools', label: 'Tools', color: 'bg-purple-500' },
    { id: 'support', label: 'Support', color: 'bg-red-500' }
  ];

  return (
    <TooltipProvider>
      <div ref={fabRef} className="fixed bottom-6 right-6 z-[9999]">
        {/* Main FAB Button with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Quick Actions Menu"
              className="fab-button w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
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
                             <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
                             <Plus size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg border-0">
          <p className="font-medium">Quick Actions</p>
          <p className="text-xs opacity-75 mt-1">Access tools and support instantly</p>
        </TooltipContent>
      </Tooltip>

      {/* FAB Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="fab-menu absolute bottom-20 right-0 w-96 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-600/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">Quick Actions</h3>
                <p className="text-sm opacity-90">Access tools and support instantly</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300/50 dark:border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/80 dark:bg-slate-800/80 text-gray-900 dark:text-slate-100 backdrop-blur-sm"
                />
                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
              </div>
            </div>

            {/* Category Filters */}
            <div className="p-4 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCategory === category.id
                        ? `${category.color} text-white shadow-lg scale-105`
                        : 'bg-gray-100/80 dark:bg-slate-700/80 text-gray-600 dark:text-slate-300 hover:bg-gray-200/80 dark:hover:bg-slate-600/80 hover:scale-105'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredActions.length > 0 ? (
                <div className="p-4 space-y-3">
                  {filteredActions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={action.action}
                      className="w-full flex items-center p-4 rounded-xl hover:bg-gray-50/80 dark:hover:bg-slate-700/80 transition-all duration-200 group border border-transparent hover:border-gray-200/50 dark:hover:border-slate-600/50"
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 dark:text-slate-100 text-base">{action.label}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">{action.description}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        action.priority === 'high' ? 'bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        action.priority === 'medium' ? 'bg-yellow-100/80 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100/80 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {action.priority}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-slate-400">
                  <div className="w-16 h-16 bg-gray-100/80 dark:bg-slate-700/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="opacity-50" />
                  </div>
                  <p className="font-medium text-lg mb-2">No actions found</p>
                  <p className="text-sm opacity-75">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/30 dark:from-slate-900/80 dark:to-slate-800/30 border-t border-gray-200/50 dark:border-slate-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-slate-400 font-medium">{filteredActions.length} actions available</span>
                <span className="px-3 py-1 bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">Role: {userRole}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </TooltipProvider>
  );
};

export default FloatingActionButton;
