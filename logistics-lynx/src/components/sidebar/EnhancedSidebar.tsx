import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Briefcase, 
  Users, 
  Banknote, 
  FileText, 
  Zap, 
  Settings, 
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Clock,
  TrendingUp,
  Brain,
  Sun,
  Moon,
  User,
  LogOut,
  Bell,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/components/theme-provider';

// Enhanced Sidebar Item Interface
interface EnhancedSidebarItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    count: number;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  aiInsights?: {
    isRecommended?: boolean;
    recommendation?: string;
    frequency?: number;
    isContextual?: boolean;
  };
  subItems?: EnhancedSidebarItem[];
  isExternal?: boolean;
  isDisabled?: boolean;
}

// Sidebar Section Interface
interface SidebarSection {
  id: string;
  title: string;
  items: EnhancedSidebarItem[];
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

// Enhanced Sidebar Props
interface EnhancedSidebarProps {
  className?: string;
  defaultCollapsed?: boolean;
  showSearch?: boolean;
  showFavorites?: boolean;
  showRecent?: boolean;
  showThemeToggle?: boolean;
  showUserProfile?: boolean;
  sections: SidebarSection[];
  onItemClick?: (item: EnhancedSidebarItem) => void;
  onToggleCollapse?: (collapsed: boolean) => void;
}

// Custom Hook for Sidebar State
const useSidebarToggle = (defaultCollapsed = false) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const addToFavorites = useCallback((itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const addToRecent = useCallback((itemId: string) => {
    setRecentItems(prev => {
      const filtered = prev.filter(id => id !== itemId);
      return [itemId, ...filtered.slice(0, 4)]; // Keep last 5 items
    });
  }, []);

  return {
    collapsed,
    searchQuery,
    favorites,
    recentItems,
    toggleCollapse,
    setSearchQuery,
    addToFavorites,
    addToRecent
  };
};

// Enhanced Sidebar Item Component
const EnhancedSidebarItem: React.FC<{
  item: EnhancedSidebarItem;
  collapsed: boolean;
  isActive: boolean;
  isFavorite: boolean;
  onItemClick: (item: EnhancedSidebarItem) => void;
  onToggleFavorite: (itemId: string) => void;
  depth?: number;
}> = ({ 
  item, 
  collapsed, 
  isActive, 
  isFavorite, 
  onItemClick, 
  onToggleFavorite, 
  depth = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick(item);
    }
  };

  const itemContent = (
    <div
      className={cn(
        "enhanced-sidebar-item text-foreground",
        isActive && "active",
        depth > 0 && "ml-4",
        item.isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <item.icon className={cn(
        "h-4 w-4 shrink-0 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
      )} />
      
      {!collapsed && (
        <>
          <span className="truncate font-medium text-sm flex-1 text-foreground">
            {item.title}
          </span>
          
          <div className="flex items-center gap-1 ml-2">
            {/* AI Insights */}
            {item.aiInsights?.isRecommended && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-info text-info-foreground">
                    <Brain className="h-3 w-3" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-foreground">{item.aiInsights.recommendation}</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {item.aiInsights?.frequency && item.aiInsights.frequency > 5 && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="h-5 px-1.5 text-xs">
                    <TrendingUp className="h-3 w-3" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-foreground">Used {item.aiInsights.frequency} times recently</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {/* Badge */}
            {item.badge && (
              <Badge 
                variant={item.badge.variant || 'default'} 
                className="h-5 px-1.5 text-xs"
              >
                {item.badge.count}
              </Badge>
            )}
            
            {/* Favorite Toggle */}
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                >
                  <Star className={cn(
                    "h-3 w-3",
                    isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-foreground">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Expand/Collapse for sub-items */}
            {hasSubItems && (
              <ChevronRight className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                isExpanded && "rotate-90"
              )} />
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            {item.isExternal ? (
              <a href={item.path} target="_blank" rel="noopener noreferrer">
                {itemContent}
              </a>
            ) : (
              <Link to={item.path}>
                {itemContent}
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-foreground">{item.title}</p>
            {item.badge && (
              <p className="text-xs text-muted-foreground">
                {item.badge.count} items
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      ) : (
        <>
          {item.isExternal ? (
            <a href={item.path} target="_blank" rel="noopener noreferrer">
              {itemContent}
            </a>
          ) : (
            itemContent
          )}
          
          {/* Sub-items */}
          {hasSubItems && isExpanded && !collapsed && (
            <div className="space-y-1 pt-1 pl-2 border-l-2 border-border/30 ml-4 transition-all duration-300 ease-in-out">
              {item.subItems?.map((subItem) => (
                <EnhancedSidebarItem
                  key={subItem.id}
                  item={subItem}
                  collapsed={collapsed}
                  isActive={false} // You might want to check this based on current route
                  isFavorite={false} // You might want to check this from favorites state
                  onItemClick={onItemClick}
                  onToggleFavorite={onToggleFavorite}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Enhanced Sidebar Component
export const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  className,
  defaultCollapsed = false,
  showSearch = true,
  showFavorites = true,
  showRecent = true,
  showThemeToggle = true,
  showUserProfile = true,
  sections,
  onItemClick,
  onToggleCollapse
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  const {
    collapsed,
    searchQuery,
    favorites,
    recentItems,
    toggleCollapse,
    setSearchQuery,
    addToFavorites,
    addToRecent
  } = useSidebarToggle(defaultCollapsed);

  // Filter sections based on search query
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  // Handle item click
  const handleItemClick = (item: EnhancedSidebarItem) => {
    addToRecent(item.id);
    onItemClick?.(item);
  };

  // Handle theme toggle
  const handleThemeToggle = (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Effect to sync with external toggle
  useEffect(() => {
    onToggleCollapse?.(collapsed);
  }, [collapsed, onToggleCollapse]);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "enhanced-sidebar bg-background text-foreground",
          collapsed && "collapsed",
          "md:block", // Hidden on mobile by default
          className
        )}
      >
        {/* Header */}
        <div className="enhanced-sidebar-header">
          <div className="enhanced-sidebar-logo">
            <div className="enhanced-sidebar-logo-icon">
              <Activity className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">
                  LogiPortal
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {user?.role?.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <Toggle
            pressed={!collapsed}
            onPressedChange={toggleCollapse}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 rounded-lg"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Toggle>
        </div>

        {/* Search */}
        {showSearch && !collapsed && (
          <div className="enhanced-sidebar-search">
            <div className="enhanced-sidebar-search-input">
              <Search className="enhanced-sidebar-search-icon" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/30 text-foreground"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="enhanced-sidebar-nav">
          {/* Favorites Section */}
          {showFavorites && favorites.length > 0 && !collapsed && (
            <div className="space-y-2">
              <h3 className="enhanced-sidebar-section-title text-muted-foreground">
                Favorites
              </h3>
              <div className="space-y-1">
                {favorites.slice(0, 3).map(favoriteId => {
                  const item = sections.flatMap(s => s.items).find(i => i.id === favoriteId);
                  if (!item) return null;
                  
                  return (
                    <EnhancedSidebarItem
                      key={item.id}
                      item={item}
                      collapsed={collapsed}
                      isActive={location.pathname === item.path}
                      isFavorite={true}
                      onItemClick={handleItemClick}
                      onToggleFavorite={addToFavorites}
                    />
                  );
                })}
              </div>
              <Separator />
            </div>
          )}

          {/* Recent Section */}
          {showRecent && recentItems.length > 0 && !collapsed && (
            <div className="space-y-2">
              <h3 className="enhanced-sidebar-section-title text-muted-foreground">
                Recent
              </h3>
              <div className="space-y-1">
                {recentItems.slice(0, 3).map(recentId => {
                  const item = sections.flatMap(s => s.items).find(i => i.id === recentId);
                  if (!item) return null;
                  
                  return (
                    <EnhancedSidebarItem
                      key={item.id}
                      item={item}
                      collapsed={collapsed}
                      isActive={location.pathname === item.path}
                      isFavorite={favorites.includes(item.id)}
                      onItemClick={handleItemClick}
                      onToggleFavorite={addToFavorites}
                    />
                  );
                })}
              </div>
              <Separator />
            </div>
          )}

          {/* Main Sections */}
          {filteredSections.map((section) => (
            <div key={section.id} className="enhanced-sidebar-section">
              {!collapsed && (
                <h3 className="enhanced-sidebar-section-title text-muted-foreground">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <EnhancedSidebarItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                    isActive={location.pathname === item.path}
                    isFavorite={favorites.includes(item.id)}
                    onItemClick={handleItemClick}
                    onToggleFavorite={addToFavorites}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="enhanced-sidebar-footer">
          {/* Theme Toggle */}
          {showThemeToggle && (
            <div className={cn(
              "enhanced-sidebar-theme-toggle",
              collapsed && "justify-center"
            )}>
              {!collapsed && (
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Theme</span>
                </div>
              )}
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={handleThemeToggle}
                className="ml-auto"
              />
              {collapsed && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Moon className="h-4 w-4 text-slate-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-foreground">Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}

          {/* User Profile */}
          {showUserProfile && (
            <div className={cn(
              "enhanced-sidebar-user-profile",
              collapsed && "justify-center"
            )}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="enhanced-sidebar-user-info">
                  <p className="enhanced-sidebar-user-name text-foreground">{user?.name}</p>
                  <p className="enhanced-sidebar-user-email text-muted-foreground">{user?.email}</p>
                </div>
              )}
              {!collapsed && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default EnhancedSidebar;
