
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RoleIndicator from './RoleIndicator';
import SearchSection from './header/SearchSection';
import NotificationButton from './header/NotificationButton';
import LanguageSelector from './header/LanguageSelector';
import SettingsDropdown from './header/SettingsDropdown';
import UserProfileDropdown from './header/UserProfileDropdown';

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile = false }) => {
  const [notifications] = useState(5);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-9 w-9 text-foreground hover:bg-accent/70 shrink-0 rounded-xl transition-all duration-200 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden lg:flex h-9 w-9 text-foreground hover:bg-accent/70 shrink-0 rounded-xl transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <SearchSection isMobile={isMobile} />
      </div>

      <div className="flex items-center gap-2 lg:gap-3 shrink-0">
        {/* Role Indicator - Hidden on mobile */}
        <div className="hidden lg:block">
          <RoleIndicator />
        </div>
        
        <LanguageSelector />
        
        <NotificationButton count={notifications} />

        <SettingsDropdown />

        <Separator orientation="vertical" className="h-6" />

        <UserProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
