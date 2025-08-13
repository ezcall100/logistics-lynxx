
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, AlertCircle, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: 'package' | 'truck' | 'alert' | 'clock';
}

interface ActivityFeedProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
}

const iconMap = {
  package: Package,
  truck: Truck,
  alert: AlertCircle,
  clock: Clock,
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  title, 
  activities, 
  className 
}) => {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10 backdrop-blur-sm group overflow-hidden",
      className
    )}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          ) : (
            activities.map((activity, index) => {
              const IconComponent = iconMap[activity.icon];
              
              return (
                <div 
                  key={activity.id} 
                  className={cn(
                    "relative flex gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-accent/40 hover:shadow-sm group/item",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100/50 dark:from-primary/20 dark:to-blue-900/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200 shadow-sm">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold leading-tight text-foreground group-hover/item:text-primary transition-colors duration-200">
                        {activity.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className="text-xs shrink-0 bg-background/50 border-border/60 text-muted-foreground hover:bg-accent/50 transition-colors duration-200"
                      >
                        {activity.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  
                  {/* Enhanced connection line */}
                  {index !== activities.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-6 bg-gradient-to-b from-border/50 to-transparent" />
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {activities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/60">
            <button className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors duration-200 w-full text-center p-2 rounded-lg hover:bg-primary/5">
              View all activity
            </button>
          </div>
        )}
      </CardContent>
      
      {/* Enhanced decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 via-blue-500/5 to-transparent rounded-bl-3xl opacity-60" />
    </Card>
  );
};

export default ActivityFeed;
