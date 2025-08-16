/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Brain,
  Activity,
  Zap,
  Globe,
  Pin,
  PinOff,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
interface EnhancedModernSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const EnhancedModernSidebar: React.FC<EnhancedModernSidebarProps> = ({ 
  isCollapsed,
  onToggle 
}) => {
  const { selectedRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedItems, setPinnedItems] = useState<string[]>(['dashboard']);
  const [openGroups, setOpenGroups] = useState<string[]>(['main']);

  // Simplified menu structure for quick fix
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, href: '/dashboard' },
    { id: 'shipments', label: 'Shipments', icon: Brain, href: '/shipments' },
    { id: 'analytics', label: 'Analytics', icon: Zap, href: '/analytics' }
  ];

  const getRoleConfig = () => {
    const configs = {
      super_admin: { 
        color: 'from-purple-500 to-violet-500', 
        badge: 'Super Admin',
        bgColor: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Brain
      },
      carrier_admin: { 
        color: 'from-blue-500 to-cyan-500', 
        badge: 'Carrier Admin',
        bgColor: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: Activity
      },
      freight_broker_admin: { 
        color: 'from-emerald-500 to-green-500', 
        badge: 'Broker Admin',
        bgColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: Zap
      },
      shipper_admin: { 
        color: 'from-orange-500 to-amber-500', 
        badge: 'Shipper Admin',
        bgColor: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: Globe
      },
      carrier_driver: { 
        color: 'from-pink-500 to-rose-500', 
        badge: 'Driver',
        bgColor: 'bg-pink-100 text-pink-700 border-pink-200',
        icon: Activity
      },
      owner_operator: { 
        color: 'from-violet-500 to-purple-500', 
        badge: 'Owner Operator',
        bgColor: 'bg-violet-100 text-violet-700 border-violet-200',
        icon: Sparkles
      }
    };
    return configs[selectedRole] || configs.super_admin;
  };

  const roleConfig = getRoleConfig();
  const RoleIcon = roleConfig.icon;

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const togglePin = (itemId: string) => {
    setPinnedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMenuItem = (item: unknown, level = 0) => {
    const IconComponent = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openGroups.includes(item.id);
    const isPinned = pinnedItems.includes(item.id);
    const isActive = item.href === window.location.pathname;

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleGroup(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-12 px-4 font-medium transition-all duration-300 group",
                "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground hover:shadow-md",
                level > 0 && "ml-4 h-10",
                isCollapsed && "justify-center px-2"
              )}
            >
              <div className="flex items-center w-full gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300",
                  "bg-gradient-to-br from-sidebar-accent to-sidebar-accent/80",
                  "group-hover:scale-110 group-hover:shadow-lg"
                )}>
                  <IconComponent className="h-4 w-4 text-sidebar-accent-foreground" />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left font-semibold">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {isPinned && <Pin className="h-3 w-3 text-primary" />}
                      {hasChildren && (
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )} />
                      )}
                    </div>
                  </>
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          {hasChildren && !isCollapsed && (
            <CollapsibleContent className="space-y-1 overflow-hidden">
              <div className="ml-6 border-l-2 border-sidebar-border/30 pl-4 py-2 space-y-1">
                {item.children.map((child: unknown) => renderMenuItem(child, level + 1))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <div key={item.id} className="relative group">
        <Button
          variant="ghost"
          asChild
          className={cn(
            "w-full justify-start h-12 px-4 font-medium transition-all duration-300",
            "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground hover:shadow-md hover:scale-[1.02]",
            level > 0 && "ml-4 h-10",
            isCollapsed && "justify-center px-2",
            isActive && "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-r-4 border-primary shadow-lg"
          )}
        >
          <a href={item.href || '#'} className="flex items-center w-full gap-3">
            <div className={cn(
              "h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-300",
              isActive 
                ? `bg-gradient-to-br ${roleConfig.color} shadow-lg` 
                : "bg-gradient-to-br from-sidebar-accent to-sidebar-accent/80",
              "group-hover:scale-110 group-hover:shadow-lg"
            )}>
              <IconComponent className={cn(
                "h-4 w-4",
                isActive ? "text-white" : "text-sidebar-accent-foreground"
              )} />
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left font-semibold">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      togglePin(item.id);
                    }}
                  >
                    {isPinned ? (
                      <PinOff className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Pin className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </>
            )}
          </a>
        </Button>
        
        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
            {item.label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-t rotate-45" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "h-full glass-ultra border-r border-sidebar-border shadow-premium transition-all duration-500 ease-out flex flex-col",
      isCollapsed ? "w-20" : "w-80"
    )}>
      {/* Enhanced Header */}
      <div className="p-6 space-y-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <div className={cn(
            "h-12 w-12 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center transition-all duration-300",
            roleConfig.color
          )}>
            <RoleIcon className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-bold text-sidebar-foreground">
                TMS Portal
              </h2>
              <Badge variant="outline" className={`text-xs font-medium ${roleConfig.bgColor}`}>
                <Sparkles className="h-3 w-3 mr-1" />
                {roleConfig.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* AI Status */}
        {!isCollapsed && (
          <div className="glass-subtle p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                <Brain className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-sidebar-foreground">AI System</div>
                <div className="text-xs text-muted-foreground">250 Agents Active</div>
              </div>
              <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Health</span>
                <span className="font-medium text-emerald-600">99.8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full w-[99.8%] transition-all duration-300" />
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        {!isCollapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 glass-subtle border-sidebar-border focus:glass-ultra transition-all duration-300"
            />
          </div>
        )}
      </div>

      <Separator className="mx-6" />

      {/* Menu Items */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {/* Pinned Items */}
          {!isCollapsed && pinnedItems.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 px-2">
                <Pin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Pinned
                </span>
              </div>
              <div className="space-y-1">
                {filteredMenuItems
                  .filter(item => pinnedItems.includes(item.id))
                  .map(item => renderMenuItem(item))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* All Menu Items */}
          <div className="space-y-1">
            {filteredMenuItems.map(item => renderMenuItem(item))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-6 space-y-4">
          <Separator />
          <div className="glass-subtle p-4 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">System Status</div>
                <div className="text-xs text-emerald-600">All systems operational</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="font-bold text-foreground">99.8%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-foreground">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedModernSidebar;