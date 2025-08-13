
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EnhancedStatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  index: number;
}

const EnhancedStatsCard: React.FC<EnhancedStatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color, 
  trend,
  index 
}) => {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-500 ease-out",
      "hover:scale-105 hover:shadow-2xl hover:shadow-primary/10",
      "bg-gradient-to-br from-background/95 via-background/90 to-background/85",
      "border border-border/50 hover:border-primary/30",
      "backdrop-blur-xl",
      "animate-fade-in"
    )} style={{ animationDelay: `${index * 150}ms` }}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated background pattern */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {title}
          </p>
          {trend && (
            <Badge variant="secondary" className={cn(
              "text-xs px-2 py-0.5 transition-all duration-300",
              trend.direction === 'up' && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
              trend.direction === 'down' && "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
              trend.direction === 'neutral' && "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            )}>
              {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {trend.value}
            </Badge>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300",
          "bg-gradient-to-br from-background/80 to-muted/20",
          "group-hover:scale-110 group-hover:rotate-3",
          "border border-border/30 group-hover:border-primary/40",
          "shadow-lg group-hover:shadow-xl"
        )}>
          <Icon className={cn("h-6 w-6 transition-colors duration-300", color)} />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="space-y-2">
          <div className={cn(
            "text-3xl font-bold transition-all duration-300",
            "group-hover:text-primary group-hover:scale-105 origin-left"
          )}>
            {value}
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </p>
          
          {/* Animated progress bar */}
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden mt-4">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
                "transform origin-left scale-x-0 group-hover:scale-x-100"
              )}
              style={{ animationDelay: `${(index * 200) + 500}ms` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedStatsCard;
