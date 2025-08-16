/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import { CARRIER_ADMIN_MENU } from "@/lib/menus/carrier-admin-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  // Extends HTMLAttributes for standard HTML element props
  children?: React.ReactNode;
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { user, logout, selectedRole } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Auto-expand Workers submenu when on workers pages
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/workers')) {
      setExpandedItems(prev => 
        prev.includes('Workers') ? prev : [...prev, 'Workers']
      );
    }
  }, [location.pathname]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = CARRIER_ADMIN_MENU.items;

  return (
    <aside
      className={cn(
        "fixed top-0 z-50 flex h-full shrink-0 flex-col border-r bg-secondary/50 backdrop-blur-sm transition-all duration-300 overflow-hidden",
        sidebarOpen ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      <div className="flex h-[4rem] items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          Autonomous TMS
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? "←" : "→"}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-2 h-full max-h-screen overflow-auto">{/* Ensure full height for all menu items */}
        <div className="space-y-2">
          <div className="space-y-1">
          <h3 className="font-medium tracking-tight">
            {sidebarOpen ? "Navigation" : "Menu"}
          </h3>
          {menuItems.map((item) => {
            console.log('Processing menu item:', item.title, 'hasSubMenu:', !!item.subMenu);
            if (item.title === 'Workers' && item.subMenu) {
              console.log('Workers submenu length:', item.subMenu.length);
              console.log('Workers submenu items:', item.subMenu.map(sub => sub.title));
            }
            if (item.subMenu) {
              const isExpanded = expandedItems.includes(item.title);
              const hasActiveChild = item.subMenu.some(subItem => isActive(subItem.path));
              
              return (
                <Collapsible
                  key={item.title}
                  open={isExpanded}
                  onOpenChange={() => toggleExpanded(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start space-x-2 text-sm font-medium",
                        hasActiveChild && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  {sidebarOpen && (
                    <CollapsibleContent className="ml-4 space-y-1 pb-4 min-h-fit">
                      {item.subMenu.map((subItem, index) => {
                        console.log(`Rendering Workers submenu item ${index + 1}:`, subItem.title, 'Path:', subItem.path);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              "group flex w-full items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              isActive(subItem.path) && "bg-accent text-accent-foreground"
                            )}
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.title}</span>
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              );
            } else {
              return (
                <Link
                  key={item.path || item.title}
                  to={item.path || "/"}
                  className={cn(
                    "group flex w-full items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    item.path && isActive(item.path) && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              );
            }
          })}
        </div>
        <Separator />
        <div className="space-y-1">
          <h3 className="font-medium tracking-tight">
            {sidebarOpen ? "Account" : "User"}
          </h3>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedRole || user?.role}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <Button variant="outline" size="sm" className="w-full" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
