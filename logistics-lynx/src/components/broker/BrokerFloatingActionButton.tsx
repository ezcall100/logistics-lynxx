import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MessageCircle, Navigation, BookOpen, Wrench, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const BrokerFloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const brokerTools = [
    { icon: Phone, label: 'Emergency Call', color: 'text-red-500' },
    { icon: MessageCircle, label: 'Dispatch Chat', color: 'text-blue-500' },
    { icon: Navigation, label: 'Route Planning', color: 'text-green-500' },
    { icon: BookOpen, label: 'Load Updates', color: 'text-purple-500' },
    { icon: Wrench, label: 'Carrier Support', color: 'text-orange-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Tools */}
      {isOpen && (
        <Card className="mb-4 p-4 bg-card/95 backdrop-blur-xl border-white/20 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {brokerTools.map((tool, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="justify-start hover:bg-white/10 transition-all duration-200"
              >
                <tool.icon className={cn("h-4 w-4 mr-3", tool.color)} />
                <span className="text-sm">{tool.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Main FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Plus className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>
    </div>
  );
};

export default BrokerFloatingActionButton;