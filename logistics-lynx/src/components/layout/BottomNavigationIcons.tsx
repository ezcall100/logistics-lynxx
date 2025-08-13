import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const BottomNavigationIcons = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const icons = [
    {
      icon: BookOpen,
      label: 'Learn',
      onClick: () => console.log('Learn clicked'),
    },
    {
      icon: HelpCircle,
      label: 'Help',
      onClick: () => console.log('Help clicked'),
    },
    {
      icon: theme === 'dark' ? Sun : Moon,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      onClick: handleThemeToggle,
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
        {icons.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 glass backdrop-blur-md border-white/20 hover:bg-white/10 transition-all duration-200 hover:scale-110"
                onClick={item.onClick}
              >
                <item.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="glass backdrop-blur-xl border-white/20">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default BottomNavigationIcons;