
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, Activity, ExternalLink, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const EnhancedPortalOverview: React.FC = () => {
  const navigate = useNavigate();

  const portalData = [
    { 
      name: 'Super Admin', 
      users: 12, 
      status: 'Active', 
      route: '/super-admin',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      bgGradient: 'from-purple-500/10 to-violet-500/10',
      borderColor: 'border-purple-200 dark:border-purple-800',
      icon: Shield,
      description: 'System administration and oversight',
      lastActivity: '2 min ago',
      activeFeatures: ['User Management', 'System Health', 'Analytics']
    },
    { 
      name: 'Carrier Admin', 
      users: 342, 
      status: 'Active', 
      route: '/carrier-admin',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: Users,
      description: 'Carrier operations and fleet management',
      lastActivity: '5 min ago',
      activeFeatures: ['Fleet Tracking', 'Driver Management', 'Route Planning']
    },
    { 
      name: 'Broker Admin', 
      users: 156, 
      status: 'Active', 
      route: '/broker-admin',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: Activity,
      description: 'Freight brokerage and load matching',
      lastActivity: '1 min ago',
      activeFeatures: ['Load Board', 'Rate Management', 'Customer Relations']
    },
    { 
      name: 'Shipper Admin', 
      users: 289, 
      status: 'Active', 
      route: '/shipper-admin',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      bgGradient: 'from-orange-500/10 to-amber-500/10',
      borderColor: 'border-orange-200 dark:border-orange-800',
      icon: Shield,
      description: 'Shipping operations and logistics',
      lastActivity: '3 min ago',
      activeFeatures: ['Shipment Tracking', 'Inventory', 'Scheduling']
    },
    { 
      name: 'Driver Portal', 
      users: 1847, 
      status: 'Active', 
      route: '/driver',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400',
      bgGradient: 'from-pink-500/10 to-rose-500/10',
      borderColor: 'border-pink-200 dark:border-pink-800',
      icon: Users,
      description: 'Driver dashboard and trip management',
      lastActivity: 'Just now',
      activeFeatures: ['Trip Logs', 'Navigation', 'Communication']
    },
    { 
      name: 'Owner Operator', 
      users: 201, 
      status: 'Active', 
      route: '/owner-operator',
      color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
      bgGradient: 'from-violet-500/10 to-purple-500/10',
      borderColor: 'border-violet-200 dark:border-violet-800',
      icon: Activity,
      description: 'Independent operator business tools',
      lastActivity: '4 min ago',
      activeFeatures: ['Business Analytics', 'Expense Tracking', 'Contracts']
    }
  ];

  const handlePortalAccess = (route: string) => {
    navigate(route);
  };

  return (
    <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Portal Management Dashboard
        </CardTitle>
        <CardDescription>
          Comprehensive overview and control of all TMS portal systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalData.map((portal, index) => (
            <div 
              key={portal.name}
              className={cn(
                "group relative overflow-hidden rounded-xl border transition-all duration-500",
                "hover:shadow-2xl hover:scale-105",
                "bg-gradient-to-br from-background/95 to-background/80",
                portal.borderColor,
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity duration-500",
                portal.bgGradient
              )} />
              
              {/* Content */}
              <div className="relative p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg bg-gradient-to-br transition-transform duration-300",
                      "group-hover:scale-110 group-hover:rotate-3",
                      portal.bgGradient
                    )}>
                      <portal.icon className="h-5 w-5 text-current" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                        {portal.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn(portal.color, "shadow-sm")}>
                    {portal.status}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-3 border-t border-border/50">
                  <div>
                    <div className="text-2xl font-bold">{portal.users.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Last Activity</div>
                    <div className="text-xs text-muted-foreground">{portal.lastActivity}</div>
                  </div>
                </div>

                {/* Active Features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Features</div>
                  <div className="flex flex-wrap gap-1">
                    {portal.activeFeatures.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <Button 
                    size="sm" 
                    className="flex-1 group-hover:scale-105 transition-transform duration-200"
                    onClick={() => handlePortalAccess(portal.route)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Access Portal
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="group-hover:scale-105 transition-transform duration-200"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ 
                     background: `linear-gradient(90deg, transparent, ${portal.color.includes('purple') ? 'rgb(147, 51, 234)' : 
                                                                      portal.color.includes('blue') ? 'rgb(59, 130, 246)' :
                                                                      portal.color.includes('green') ? 'rgb(34, 197, 94)' :
                                                                      portal.color.includes('orange') ? 'rgb(249, 115, 22)' :
                                                                      portal.color.includes('pink') ? 'rgb(236, 72, 153)' :
                                                                      'rgb(139, 92, 246)'}/0.2, transparent)` 
                   }} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPortalOverview;
