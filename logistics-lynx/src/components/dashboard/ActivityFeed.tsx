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
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error" />;
      case 'info':
        return <Info className="h-5 w-5 text-info" />;
      default:
        return <Info className="h-5 w-5 text-text-muted" />;
    }
  };

  return (
    <div className={cn("bg-card border border-border rounded-2xl shadow-sm", className)}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="text-sm text-text-muted mt-1">{description}</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-surface transition-colors border border-transparent hover:border-border"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text">{item.user}</p>
                <p className="text-sm text-text-muted">{item.action}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1">
                <Clock className="h-3 w-3 text-text-muted" />
                <p className="text-xs text-text-muted">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
