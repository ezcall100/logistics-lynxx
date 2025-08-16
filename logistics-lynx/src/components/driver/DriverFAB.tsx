/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDriverActions } from "./actions/DriverActions";

interface DriverFABProps {
  onAIAssistantToggle?: () => void;
}

export default function DriverFAB({ onAIAssistantToggle }: DriverFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { driverActions } = useDriverActions();

  const toggleFAB = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    console.log('🟣 Driver FAB toggled:', newState);
  };

  const handleActionClick = (actionId: string, handler: () => void) => {
    console.log(`🔘 Driver Action: ${actionId}`);
    
    if (actionId === 'ai-assistant') {
      onAIAssistantToggle?.();
    } else {
      handler();
    }
    
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Action Grid */}
      {isOpen && (
        <div className="mb-4 animate-fade-in">
          <Card className="p-4 shadow-2xl border bg-background/95 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-3 w-80">
              {driverActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className={cn(
                      "h-16 flex flex-col gap-1 text-white transition-all duration-200",
                      "hover:scale-105 shadow-lg",
                      action.color
                    )}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                    onClick={() => handleActionClick(action.id, action.handler)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        size="lg"
        className={cn(
          "h-16 w-16 rounded-full shadow-xl transition-all duration-300",
          "bg-gradient-to-r from-primary to-primary/80",
          "hover:scale-110 border-4 border-white/20",
          isOpen && "rotate-45"
        )}
        onClick={toggleFAB}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Plus className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>
    </div>
  );
}