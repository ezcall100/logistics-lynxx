
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  className 
}) => {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] border-0 bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10 backdrop-blur-sm group",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground truncate pr-2">
          {title}
        </CardTitle>
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100/50 dark:from-primary/20 dark:to-blue-900/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {value}
          </div>
          {change && (
            <div className="flex items-center gap-1">
              <Badge 
                variant={change.isPositive ? "default" : "destructive"}
                className={cn(
                  "flex items-center gap-1 text-xs px-2 py-1 rounded-lg shadow-sm transition-all duration-200",
                  change.isPositive 
                    ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400" 
                    : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {change.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="truncate max-w-[120px] sm:max-w-none font-medium">
                  {change.value}
                </span>
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 via-blue-500/5 to-transparent rounded-bl-3xl opacity-60" />
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-xl" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </Card>
  );
};

export default StatCard;
