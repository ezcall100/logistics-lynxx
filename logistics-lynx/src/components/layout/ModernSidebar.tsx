import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { LayoutDashboard, BarChart3, Package, Truck, Building2, DollarSign, Users, Settings, Brain, Activity, Globe, Bell, ChevronRight, Target, FileText, Shield, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
const ModernSidebar = () => {
  const {
    state
  } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const {
    selectedRole
  } = useAuth();
  const getNavigationItems = () => {
    const commonItems = [{
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      badge: 'Live'
    }, {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
      badge: 'AI'
    }];
    const roleSpecificItems = {
      super_admin: [{
        title: 'System Health',
        url: '/autonomous-system',
        icon: Activity
      }, {
        title: 'Agent Control',
        url: '/autonomous-agents',
        icon: Brain
      }, {
        title: 'User Management',
        url: '/users',
        icon: Users
      }, {
        title: 'Global Settings',
        url: '/settings',
        icon: Settings
      }],
      carrier_admin: [{
        title: 'Fleet Management',
        url: '/assets',
        icon: Truck
      }, {
        title: 'Load Management',
        url: '/loads',
        icon: Package
      }, {
        title: 'Driver Portal',
        url: '/workers',
        icon: Users
      }, {
        title: 'Carrier Dispatch',
        url: '/carrier-dispatch',
        icon: Target
      }],
      freight_broker_admin: [{
        title: 'Load Board',
        url: '/loadboard',
        icon: Target
      }, {
        title: 'Carrier Network',
        url: '/networks',
        icon: Building2
      }, {
        title: 'Rate Management',
        url: '/quotes',
        icon: DollarSign
      }, {
        title: 'CRM',
        url: '/crm',
        icon: MessageSquare
      }],
      // shipper_admin: Removed to prevent conflicts with ShipperSidebar component
      // shipper_admin uses dedicated ShipperSidebar component with SHIPPER_ADMIN_MENU
      carrier_driver: [{
        title: 'My Loads',
        url: '/loads',
        icon: Package
      }, {
        title: 'Hours of Service',
        url: '/workers',
        icon: Calendar
      }, {
        title: 'Safety Score',
        url: '/analytics',
        icon: Shield
      }, {
        title: 'Messages',
        url: '/crm',
        icon: MessageSquare
      }],
      owner_operator: [{
        title: 'Business Analytics',
        url: '/analytics',
        icon: BarChart3
      }, {
        title: 'Load Board',
        url: '/loadboard',
        icon: Target
      }, {
        title: 'Financials',
        url: '/financials',
        icon: DollarSign
      }, {
        title: 'Performance',
        url: '/analytics',
        icon: Activity
      }]
    };
    const financialItems = [{
      title: 'Financial Overview',
      url: '/financials',
      icon: DollarSign
    }, {
      title: 'Sales & Revenue',
      url: '/financials/sales',
      icon: BarChart3
    }, {
      title: 'Expenses',
      url: '/financials/expenses',
      icon: FileText
    }, {
      title: 'Banking',
      url: '/financials/banking',
      icon: Building2
    }];
    return {
      main: [...commonItems, ...(roleSpecificItems[selectedRole as keyof typeof roleSpecificItems] || [])],
      financial: financialItems,
      system: [{
        title: 'API Management',
        url: '/api',
        icon: Globe
      }, {
        title: 'Alerts',
        url: '/alerts',
        icon: Bell
      }, {
        title: 'Settings',
        url: '/settings',
        icon: Settings
      }]
    };
  };
  const navigation = getNavigationItems();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-background/80 backdrop-blur-sm">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group relative"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                      {(item as unknown).badge && (
                        <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                          {(item as unknown).badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Financial Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Financial
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.financial.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* System Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.system.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default ModernSidebar;