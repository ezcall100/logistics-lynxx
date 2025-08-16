/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAlerts } from '@/hooks/useAlerts';

interface NotificationButtonProps {
  count?: number;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ count: propCount }) => {
  const { alerts, getAlertStats } = useAlerts();
  const [alertCount, setAlertCount] = useState(propCount || 0);

  useEffect(() => {
    const stats = getAlertStats();
    setAlertCount(propCount !== undefined ? propCount : stats.active);
  }, [alerts, propCount, getAlertStats]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 text-foreground hover:bg-accent/70 rounded-xl transition-all duration-200"
    >
      <Bell className="h-4 w-4" />
      {alertCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse shadow-lg"
        >
          {alertCount > 9 ? '9+' : alertCount}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationButton;
