import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Settings, 
  Users, 
  Shield, 
  Activity, 
  Brain, 
  Server, 
  AlertTriangle,
  Zap,
  BarChart3,
  Cpu,
  Network,
  FileText,
  DollarSign,
  Store,
  Bot,
  Key,
  HelpCircle,
  BookOpen,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

const SuperAdminFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleFAB = () => setIsOpen(!isOpen);

  const fabActions: FABAction[] = [
    {
      id: 'system-admin',
      label: 'System Admin',
      icon: Settings,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        console.log('🛠️ System Admin clicked');
        // Navigate to system admin
      }
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => {
        console.log('👥 User Management clicked');
        // Navigate to user management
      }
    },
    {
      id: 'security',
      label: 'Security Center',
      icon: Shield,
      color: 'bg-red-500 hover:bg-red-600',
      onClick: () => {
        console.log('🛡️ Security Center clicked');
        // Navigate to security center
      }
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {
        console.log('📊 Analytics clicked');
        // Navigate to analytics
      }
    },
    {
      id: 'mcp-control',
      label: 'MCP Control',
      icon: Brain,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => {
        console.log('🧠 MCP Control clicked');
        // Navigate to MCP control
      }
    },
    {
      id: 'system-health',
      label: 'System Health',
      icon: Activity,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => {
        console.log('💓 System Health clicked');
        // Navigate to system health
      }
    },
    {
      id: 'ai-agents',
      label: 'AI Agents',
      icon: Bot,
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => {
        console.log('🤖 AI Agents clicked');
        // Navigate to AI agents
      }
    },
    {
      id: 'api-keys',
      label: 'API Keys',
      icon: Key,
      color: 'bg-cyan-500 hover:bg-cyan-600',
      onClick: () => {
        console.log('🔑 API Keys clicked');
        // Navigate to API keys
      }
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: Store,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      onClick: () => {
        console.log('🏪 Marketplace clicked');
        // Navigate to marketplace
      }
    },
    {
      id: 'financials',
      label: 'Financials',
      icon: DollarSign,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: () => {
        console.log('💰 Financials clicked');
        // Navigate to financials
      }
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      color: 'bg-slate-500 hover:bg-slate-600',
      onClick: () => {
        console.log('📄 Documents clicked');
        // Navigate to documents
      }
    },
    {
      id: 'networks',
      label: 'Networks',
      icon: Network,
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => {
        console.log('🌐 Networks clicked');
        // Navigate to networks
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* FAB Actions */}
      {isOpen && (
        <div className="mb-4 space-y-2">
          {fabActions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center justify-end"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-10 px-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:scale-110",
                  action.color,
                  "animate-in slide-in-from-right-2 fade-in-0"
                )}
                onClick={action.onClick}
                title={action.label}
              >
                <action.icon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Theme Toggle */}
      {isOpen && (
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20 bg-slate-600 hover:bg-slate-700 text-white transition-all duration-300 hover:scale-110 animate-in slide-in-from-right-2 fade-in-0"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 mr-2" />
            ) : (
              <Moon className="h-4 w-4 mr-2" />
            )}
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </span>
          </Button>
        </div>
      )}

      {/* Help & Documentation */}
      {isOpen && (
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 rounded-full shadow-lg backdrop-blur-sm border border-white/20 bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:scale-110 animate-in slide-in-from-right-2 fade-in-0"
            onClick={() => {
              console.log('❓ Help clicked');
              // Open help documentation
            }}
            title="Help & Documentation"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Help</span>
          </Button>
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl backdrop-blur-sm border-2 border-white/20 transition-all duration-300 hover:scale-110",
          isOpen 
            ? "bg-gradient-to-br from-red-500 to-red-600 rotate-45" 
            : "bg-gradient-to-br from-blue-500 to-purple-600"
        )}
        onClick={toggleFAB}
        title={isOpen ? "Close Quick Actions" : "Open Quick Actions"}
      >
        <Plus className={cn(
          "h-6 w-6 text-white transition-transform duration-300",
          isOpen && "rotate-45"
        )} />
      </Button>

      {/* Status Indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
    </div>
  );
};

export default SuperAdminFAB;
