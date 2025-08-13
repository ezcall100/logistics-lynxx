import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actions?: React.ReactNode;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  description,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  icon: Icon,
  actions
}) => {
  return (
    <Card className={cn(
      "bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300",
      className
    )}>
      {(title || Icon || actions) && (
        <CardHeader className={cn("pb-3 sm:pb-4", headerClassName)}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {Icon && (
                <Icon className="h-5 w-5 text-primary flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                {title && (
                  <CardTitle className="text-base sm:text-lg font-semibold text-foreground truncate">
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex-shrink-0">
                {actions}
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;
