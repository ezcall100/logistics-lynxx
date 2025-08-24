import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  User, 
  Shield, 
  Database, 
  Server, 
  Bell, 
  HelpCircle, 
  MessageSquare, 
  Download, 
  Upload, 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Save, 
  Send, 
  Archive, 
  RotateCcw, 
  Copy, 
  Share, 
  ExternalLink, 
  Phone, 
  Video, 
  Camera, 
  Image, 
  File, 
  Folder, 
  Grid, 
  List, 
  Columns, 
  Maximize, 
  Minimize, 
  Move, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Type, 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Unlink, 
  Code, 
  Quote, 
  Hash, 
  AtSign, 
  Percent, 
  Minus, 
  Divide, 
  Equal, 
  Infinity, 
  Pi, 
  Sigma, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Octagon, 
  Star, 
  Heart, 
  Zap, 
  Droplets, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Wind, 
  Thermometer, 
  Gauge, 
  Timer, 
  Navigation, 
  Compass, 
  Map, 
  Layers, 
  Grid3X3, 
  Rows, 
  Sidebar, 
  SidebarClose, 
  SidebarOpen, 
  PanelLeft, 
  PanelRight, 
  PanelTop, 
  PanelBottom, 
  Layout, 
  LayoutGrid, 
  LayoutList, 
  LayoutTemplate, 
  LayoutDashboard,
  Building,
  CreditCard,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon
} from 'lucide-react';
import { stableStyles } from './EnhancedUIComponents';

interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  tooltip?: string;
}

interface FloatingActionButtonProps {
  mode: 'light' | 'dark';
  actions: FABAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  autoHide?: boolean;
  context?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  mode,
  actions,
  position = 'bottom-right',
  variant = 'primary',
  size = 'md',
  showLabels = false,
  autoHide = false,
  context = 'general'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide functionality
  useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      if (scrollDelta > 10) {
        // Scrolling down - hide FAB
        setIsVisible(false);
      } else if (scrollDelta < -10) {
        // Scrolling up - show FAB
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide, lastScrollY]);

  // Context-aware actions
  const getContextActions = () => {
    switch (context) {
      case 'user-management':
        return [
          { id: 'add-user', label: 'Add User', icon: User, action: () => console.log('Add User') },
          { id: 'bulk-import', label: 'Bulk Import', icon: Upload, action: () => console.log('Bulk Import') },
          { id: 'export-users', label: 'Export Users', icon: Download, action: () => console.log('Export Users') },
          { id: 'user-reports', label: 'User Reports', icon: File, action: () => console.log('User Reports') }
        ];
      case 'security':
        return [
          { id: 'security-scan', label: 'Security Scan', icon: Shield, action: () => console.log('Security Scan') },
          { id: 'audit-logs', label: 'Audit Logs', icon: Eye, action: () => console.log('Audit Logs') },
          { id: 'backup', label: 'Backup', icon: Archive, action: () => console.log('Backup') },
          { id: 'restore', label: 'Restore', icon: RotateCcw, action: () => console.log('Restore') }
        ];
      case 'analytics':
        return [
          { id: 'generate-report', label: 'Generate Report', icon: File, action: () => console.log('Generate Report') },
          { id: 'export-data', label: 'Export Data', icon: Download, action: () => console.log('Export Data') },
          { id: 'create-chart', label: 'Create Chart', icon: Grid, action: () => console.log('Create Chart') },
          { id: 'schedule-report', label: 'Schedule Report', icon: Timer, action: () => console.log('Schedule Report') }
        ];
      case 'system-settings':
        return [
          { id: 'backup-system', label: 'Backup System', icon: Archive, action: () => console.log('Backup System') },
          { id: 'system-test', label: 'System Test', icon: Server, action: () => console.log('System Test') },
          { id: 'update-system', label: 'Update System', icon: RefreshCw, action: () => console.log('Update System') },
          { id: 'system-logs', label: 'System Logs', icon: File, action: () => console.log('System Logs') }
        ];
      case 'mcp-control':
        return [
          { id: 'start-agents', label: 'Start Agents', icon: Zap, action: () => console.log('Start Agents') },
          { id: 'stop-agents', label: 'Stop Agents', icon: Zap, action: () => console.log('Stop Agents') },
          { id: 'train-models', label: 'Train Models', icon: Database, action: () => console.log('Train Models') },
          { id: 'deploy-models', label: 'Deploy Models', icon: Server, action: () => console.log('Deploy Models') }
        ];
      default:
        return actions;
    }
  };

  const contextActions = getContextActions();
  const finalActions = actions.length > 0 ? actions : contextActions;

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-14 h-14';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const getActionVariantClasses = (actionVariant?: string) => {
    switch (actionVariant) {
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const handleMainButtonClick = () => {
    if (finalActions.length === 1) {
      // If only one action, execute it directly
      finalActions[0].action();
    } else {
      // Toggle FAB menu
      setIsOpen(!isOpen);
    }
  };

  const handleActionClick = (action: FABAction) => {
    action.action();
    setIsOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Main FAB Button */}
      <button
        onClick={handleMainButtonClick}
        className={`
          ${getSizeClasses()} 
          ${getVariantClasses()}
          rounded-full 
          shadow-lg 
          flex 
          items-center 
          justify-center 
          text-white 
          transition-all 
          duration-300 
          ease-in-out 
          transform 
          hover:scale-110 
          focus:outline-none 
          focus:ring-4 
          focus:ring-blue-300 
          focus:ring-opacity-50
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label="Floating Action Button"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Action Buttons */}
      {finalActions.length > 1 && (
        <div className={`absolute ${position.includes('right') ? 'right-0' : 'left-0'} bottom-0 space-y-3 transition-all duration-300 ease-in-out`}>
          {finalActions.map((action, index) => (
            <div
              key={action.id}
              className={`
                transform transition-all duration-300 ease-in-out
                ${isOpen 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-4 opacity-0 scale-75 pointer-events-none'
                }
                transition-delay-${index * 100}
              `}
            >
              <button
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                className={`
                  w-12 h-12 
                  ${getActionVariantClasses(action.variant)}
                  rounded-full 
                  shadow-lg 
                  flex 
                  items-center 
                  justify-center 
                  text-white 
                  transition-all 
                  duration-200 
                  ease-in-out 
                  transform 
                  hover:scale-110 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-white 
                  focus:ring-opacity-50
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                `}
                aria-label={action.label}
                title={action.tooltip || action.label}
              >
                <action.icon className="w-5 h-5" />
              </button>
              
              {/* Action Label */}
              {showLabels && (
                <div className={`
                  absolute ${position.includes('right') ? 'right-16' : 'left-16'} top-1/2 transform -translate-y-1/2
                  bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none
                `}>
                  {action.label}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && finalActions.length > 1 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Context-specific FAB components
export const UserManagementFAB: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => (
  <FloatingActionButton
    mode={mode}
    actions={[]}
    context="user-management"
    variant="primary"
    showLabels={true}
    autoHide={true}
  />
);

export const SecurityFAB: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => (
  <FloatingActionButton
    mode={mode}
    actions={[]}
    context="security"
    variant="danger"
    showLabels={true}
    autoHide={true}
  />
);

export const AnalyticsFAB: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => (
  <FloatingActionButton
    mode={mode}
    actions={[]}
    context="analytics"
    variant="success"
    showLabels={true}
    autoHide={true}
  />
);

export const SystemSettingsFAB: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => (
  <FloatingActionButton
    mode={mode}
    actions={[]}
    context="system-settings"
    variant="warning"
    showLabels={true}
    autoHide={true}
  />
);

export const MCPControlFAB: React.FC<{ mode: 'light' | 'dark' }> = ({ mode }) => (
  <FloatingActionButton
    mode={mode}
    actions={[]}
    context="mcp-control"
    variant="primary"
    showLabels={true}
    autoHide={true}
  />
);

// Custom FAB with specific actions
export const CustomFAB: React.FC<{
  mode: 'light' | 'dark';
  actions: FABAction[];
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  autoHide?: boolean;
}> = ({ mode, actions, variant, position, size, showLabels, autoHide }) => (
  <FloatingActionButton
    mode={mode}
    actions={actions}
    variant={variant}
    position={position}
    size={size}
    showLabels={showLabels}
    autoHide={autoHide}
  />
);

export default FloatingActionButton;
