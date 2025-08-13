import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  MessageSquare, 
  Navigation, 
  FileText, 
  Wrench,
  Plus,
  X,
  AlertTriangle,
  Headphones,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  variant: 'emergency' | 'communication' | 'navigation' | 'assistance' | 'logging';
  urgent?: boolean;
}

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fabActions: FABAction[] = [
    {
      id: 'emergency',
      label: 'Emergency Call',
      icon: Phone,
      action: () => {
        // Simulate emergency call
        window.open('tel:911', '_self');
      },
      variant: 'emergency',
      urgent: true
    },
    {
      id: 'dispatch',
      label: 'Dispatch Chat',
      icon: MessageSquare,
      action: () => {
        // Navigate to dispatch chat
        window.location.href = '/owner-operator/communication/dispatch';
      },
      variant: 'communication'
    },
    {
      id: 'navigation',
      label: 'Navigation Help',
      icon: Navigation,
      action: () => {
        // Open navigation assistance
        window.location.href = '/owner-operator/routes/active';
      },
      variant: 'navigation'
    },
    {
      id: 'trip-log',
      label: 'Quick Trip Update',
      icon: FileText,
      action: () => {
        // Quick trip log update
        window.location.href = '/owner-operator/documents/reports';
      },
      variant: 'logging'
    },
    {
      id: 'roadside',
      label: 'Roadside Assistance',
      icon: Wrench,
      action: () => {
        // Contact roadside assistance
        window.open('tel:1-800-ROADSIDE', '_self');
      },
      variant: 'assistance'
    },
    {
      id: 'support',
      label: 'Support Hotline',
      icon: Headphones,
      action: () => {
        // Contact support
        window.open('tel:1-800-SUPPORT', '_self');
      },
      variant: 'communication'
    }
  ];

  const getVariantStyles = (variant: string, urgent?: boolean) => {
    const baseStyles = "transition-all duration-200 hover:scale-110 active:scale-95";
    
    switch (variant) {
      case 'emergency':
        return `${baseStyles} bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 ${urgent ? 'animate-pulse' : ''}`;
      case 'communication':
        return `${baseStyles} bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25`;
      case 'navigation':
        return `${baseStyles} bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25`;
      case 'assistance':
        return `${baseStyles} bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25`;
      case 'logging':
        return `${baseStyles} bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25`;
      default:
        return `${baseStyles} bg-primary hover:bg-primary/90 text-primary-foreground`;
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Buttons */}
        <div className={cn(
          "flex flex-col gap-3 mb-4 transition-all duration-300 ease-in-out",
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {fabActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <Tooltip key={action.id}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    onClick={action.action}
                    className={cn(
                      "h-12 w-12 rounded-full p-0 shadow-lg backdrop-blur-sm",
                      getVariantStyles(action.variant, action.urgent),
                      "animate-fade-in"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <ActionIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="mr-2">
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Main FAB Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              onClick={toggleExpanded}
              className={cn(
                "h-16 w-16 rounded-full p-0 shadow-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95",
                isExpanded && "rotate-45"
              )}
            >
              {isExpanded ? (
                <X className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mr-2">
            <p>{isExpanded ? 'Close Quick Actions' : 'Quick Actions'}</p>
          </TooltipContent>
        </Tooltip>

        {/* Emergency Indicator */}
        <div className="absolute -top-2 -right-2">
          <div className="h-4 w-4 bg-red-500 rounded-full animate-ping opacity-75" />
          <div className="absolute top-0 h-4 w-4 bg-red-500 rounded-full" />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingActionButton;