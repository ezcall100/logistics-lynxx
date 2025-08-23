import React from 'react';
import { CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ActivityItem {
  id: string | number;
  user: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info' | 'error';
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  description?: string;
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  title = "Recent Activity",
  description = "Latest system activities and user actions",
  className
}) => {
  const getStatusIcon = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.user}</p>
                <p className="text-sm text-muted-foreground">{item.action}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
