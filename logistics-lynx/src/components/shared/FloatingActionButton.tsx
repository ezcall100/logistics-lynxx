
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FLOATING_ACTION_MENU } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 animate-scale-in">
          <div className="flex flex-col space-y-2">
            {FLOATING_ACTION_MENU.map((item, index) => (
              <Button
                key={item.title}
                size="icon"
                className={cn(
                  "glass h-12 w-12 rounded-full shadow-lg transition-all hover:bg-primary hover:text-primary-foreground",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms`, opacity: 1 }}
                onClick={() => {
                  // Handle navigation or action
                  console.log(`Clicked on ${item.title}`);
                  toggleMenu();
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Button
        size="icon"
        className={cn(
          "glass h-14 w-14 rounded-full shadow-lg transition-transform",
          isOpen && "rotate-45"
        )}
        onClick={toggleMenu}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Open actions</span>
      </Button>
    </div>
  );
};

export default FloatingActionButton;
