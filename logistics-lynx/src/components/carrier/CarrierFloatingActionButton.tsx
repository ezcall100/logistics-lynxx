import React, { useState } from 'react';
import { Phone, MessageCircle, Navigation, FileText, Wrench, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CarrierFloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAB = () => setIsOpen(!isOpen);

  const fabActions = [
    {
      icon: Phone,
      label: 'Emergency Call',
      color: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      onClick: () => {
        window.open('tel:911', '_self');
      }
    },
    {
      icon: MessageCircle,
      label: 'Dispatch Chat',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      onClick: () => {
        console.log('Opening dispatch chat...');
      }
    },
    {
      icon: Navigation,
      label: 'Navigation Help',
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      onClick: () => {
        console.log('Opening navigation help...');
      }
    },
    {
      icon: FileText,
      label: 'Trip Log Updates',
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      onClick: () => {
        console.log('Opening trip log...');
      }
    },
    {
      icon: Wrench,
      label: 'Roadside Assistance',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      onClick: () => {
        console.log('Calling roadside assistance...');
      }
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Buttons */}
        <div className={cn(
          "flex flex-col-reverse items-end space-y-reverse space-y-3 mb-4 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {fabActions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl",
                    action.color,
                    "text-white border-2 border-white/30 backdrop-blur-sm"
                  )}
                  onClick={action.onClick}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="mr-2 bg-background/95 backdrop-blur-md">
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main FAB Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={toggleFAB}
              className={cn(
                "h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl",
                "bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary/80 hover:to-primary/90",
                "text-primary-foreground border-2 border-white/30 backdrop-blur-md",
                isOpen && "rotate-45"
              )}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mr-2">
            <p>{isOpen ? 'Close Actions' : 'Quick Actions'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CarrierFloatingActionButton;