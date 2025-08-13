import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  BookOpen, 
  Sun, 
  Moon,
  MessageCircle,
  Phone,
  FileText,
  Mail
} from 'lucide-react';
import { useTheme } from 'next-themes';

export const BottomNavigation: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const bottomActions = [
    { icon: BookOpen, label: 'Learn', action: () => {} },
    { icon: HelpCircle, label: 'Help', action: () => {} },
    { 
      icon: theme === 'dark' ? Sun : Moon, 
      label: theme === 'dark' ? 'Light' : 'Dark', 
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  ];

  const communicationActions = [
    { icon: Phone, label: 'Call', color: 'text-green-600' },
    { icon: MessageCircle, label: 'Chat', color: 'text-blue-600' },
    { icon: FileText, label: 'Notes', color: 'text-amber-600' },
    { icon: Mail, label: 'Email', color: 'text-red-600' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-neutral-200/60 z-40">
      <div className="px-4 py-3">
        {/* Communication Tools Row */}
        <div className="flex justify-around items-center mb-3 pb-3 border-b border-neutral-100">
          {communicationActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-3"
              >
                <Icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-xs font-medium text-neutral-600">{action.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Bottom Actions Row */}
        <div className="flex justify-around items-center">
          {bottomActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-4"
                onClick={action.action}
              >
                <Icon className="h-5 w-5 text-neutral-600" />
                <span className="text-xs font-medium text-neutral-600">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};