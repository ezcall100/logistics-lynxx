import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  HelpCircle,
  Home,
  BarChart3,
  Truck,
  Package,
  MapPin,
  Calendar,
  Shield,
  Database,
  Globe,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  Workflow,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  MoreHorizontal
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/components/theme-provider';

// Enhanced Sidebar Item Interface
interface EnterpriseSidebarItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    count: number;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  isExternal?: boolean;
  isDisabled?: boolean;
  isNew?: boolean;
  isBeta?: boolean;
  subItems?: EnterpriseSidebarItem[];
  permissions?: string[];
}

// Sidebar Section Interface
interface EnterpriseSidebarSection {
  id: string;
  title: string;
  items: EnterpriseSidebarItem[];
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// Enterprise Sidebar Props
interface EnterpriseSidebarProps {
  className?: string;
  defaultCollapsed?: boolean;
  showSearch?: boolean;
  showFavorites?: boolean;
  showRecent?: boolean;
  showThemeToggle?: boolean;
  showUserProfile?: boolean;
  sections: EnterpriseSidebarSection[];
  onItemClick?: (item: EnterpriseSidebarItem) => void;
  onToggleCollapse?: (collapsed: boolean) => void;
}

// Custom Hook for Sidebar State
const useEnterpriseSidebarToggle = (defaultCollapsed = false) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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
      return [itemId, ...filtered.slice(0, 4)];
    });
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  return {
    collapsed,
    searchQuery,
    setSearchQuery,
    favorites,
    recentItems,
    expandedSections,
    toggleCollapse,
    addToFavorites,
    addToRecent,
    toggleSection
  };
};

// Enterprise Sidebar Item Component
const EnterpriseSidebarItem: React.FC<{
  item: EnterpriseSidebarItem;
  collapsed: boolean;
  isActive: boolean;
  onItemClick: (item: EnterpriseSidebarItem) => void;
  onAddToFavorites: (itemId: string) => void;
  isFavorite: boolean;
}> = ({ item, collapsed, isActive, onItemClick, onAddToFavorites, isFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onItemClick(item);
    if (!item.isExternal) {
      navigate(item.path);
    }
  };

  const itemContent = (
    <div
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary text-primary-foreground shadow-sm",
        item.isDisabled && "opacity-50 cursor-not-allowed",
        collapsed && "justify-center px-2"
      )}
      onClick={handleClick}
    >
      <item.icon className={cn(
        "h-4 w-4 flex-shrink-0",
        isActive && "text-primary-foreground"
      )} />
      
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.title}</span>
          
          <div className="flex items-center gap-1">
            {item.isNew && (
              <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                NEW
              </Badge>
            )}
            {item.isBeta && (
              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                BETA
              </Badge>
            )}
            {item.badge && (
              <Badge variant={item.badge.variant || 'secondary'} className="text-xs px-1 py-0 h-4">
                {item.badge.count}
              </Badge>
            )}
            {item.subItems && item.subItems.length > 0 && (
              <ChevronRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </>
      )}
    </div>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {itemContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">{item.title}</p>
              {item.isNew && <Badge variant="secondary" className="text-xs">NEW</Badge>}
              {item.isBeta && <Badge variant="outline" className="text-xs">BETA</Badge>}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return itemContent;
};

// Enterprise Sidebar Section Component
const EnterpriseSidebarSection: React.FC<{
  section: EnterpriseSidebarSection;
  collapsed: boolean;
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
  onItemClick: (item: EnterpriseSidebarItem) => void;
  onAddToFavorites: (itemId: string) => void;
  favorites: string[];
}> = ({ section, collapsed, isExpanded, onToggle, onItemClick, onAddToFavorites, favorites }) => {
  const location = useLocation();

  if (collapsed) {
    return (
      <div className="space-y-1">
        {section.items.map((item) => (
          <EnterpriseSidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={location.pathname === item.path}
            onItemClick={onItemClick}
            onAddToFavorites={onAddToFavorites}
            isFavorite={favorites.includes(item.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {section.isCollapsible ? (
        <Collapsible open={isExpanded} onOpenChange={() => onToggle(section.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between px-3 py-2 h-auto font-medium text-sm",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {section.icon && <section.icon className="h-4 w-4" />}
                <span>{section.title}</span>
              </div>
              <ChevronRight className={cn(
                "h-3 w-3 transition-transform duration-200",
                isExpanded && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4">
            {section.items.map((item) => (
              <EnterpriseSidebarItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                isActive={location.pathname === item.path}
                onItemClick={onItemClick}
                onAddToFavorites={onAddToFavorites}
                isFavorite={favorites.includes(item.id)}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          {section.title && (
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
          )}
          {section.items.map((item) => (
            <EnterpriseSidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={location.pathname === item.path}
              onItemClick={onItemClick}
              onAddToFavorites={onAddToFavorites}
              isFavorite={favorites.includes(item.id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

// Main Enterprise Sidebar Component
export const EnterpriseSidebar: React.FC<EnterpriseSidebarProps> = ({
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
  const {
    collapsed,
    searchQuery,
    setSearchQuery,
    favorites,
    recentItems,
    expandedSections,
    toggleCollapse,
    addToFavorites,
    addToRecent,
    toggleSection
  } = useEnterpriseSidebarToggle(defaultCollapsed);

  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;

    return sections.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }, [sections, searchQuery]);

  // Handle item click
  const handleItemClick = useCallback((item: EnterpriseSidebarItem) => {
    addToRecent(item.id);
    onItemClick?.(item);
  }, [addToRecent, onItemClick]);

  // Notify parent of collapse state change
  useEffect(() => {
    onToggleCollapse?.(collapsed);
  }, [collapsed, onToggleCollapse]);

  return (
    <aside
      className={cn(
        "bg-background border-r border-border h-screen transition-all duration-300 ease-in-out",
        "flex flex-col overflow-hidden",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">TMS Admin</span>
          </div>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="h-8 w-8 p-0"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {collapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Search */}
      {showSearch && !collapsed && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <EnterpriseSidebarSection
              key={section.id}
              section={section}
              collapsed={collapsed}
              isExpanded={expandedSections.has(section.id)}
              onToggle={toggleSection}
              onItemClick={handleItemClick}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-4">
        {/* Theme Toggle */}
        {showThemeToggle && (
          <div className="flex items-center justify-between">
            {!collapsed && <span className="text-sm text-muted-foreground">Theme</span>}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* User Profile */}
        {showUserProfile && user && (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </aside>
  );
};

export default EnterpriseSidebar;
