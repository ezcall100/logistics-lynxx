/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Phone, 
  MessageCircle, 
  FileText, 
  Share2, 
  Mail,
  Plus,
  X
} from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const communicationTools = [
    { icon: Phone, label: 'Call', color: 'bg-green-600 hover:bg-green-700' },
    { icon: MessageCircle, label: 'Chat', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: FileText, label: 'Notes', color: 'bg-amber-600 hover:bg-amber-700' },
    { icon: Share2, label: 'Social', color: 'bg-purple-600 hover:bg-purple-700' },
    { icon: Mail, label: 'Email', color: 'bg-red-600 hover:bg-red-700' }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Communication Tools */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {communicationTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.label}
                className="p-0 shadow-lg border border-neutral-200/60 bg-white/95 backdrop-blur-sm animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className={`h-14 w-14 ${tool.color} text-white hover:scale-110 transition-all duration-200 shadow-lg`}
                  title={tool.label}
                >
                  <Icon className="h-6 w-6" />
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        size="lg"
        className={`
          h-16 w-16 rounded-full shadow-xl
          ${isOpen 
            ? 'bg-red-600 hover:bg-red-700 rotate-45' 
            : 'bg-blue-600 hover:bg-blue-700'
          }
          text-white transition-all duration-300 hover:scale-110
          border-4 border-white/20
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};