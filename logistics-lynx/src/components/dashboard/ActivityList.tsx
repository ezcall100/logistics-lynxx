/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { ActivityItem } from '../../data/dashboard/activity';

export interface ActivityListProps {
  activities: ActivityItem[];
  onActivityClick?: (activity: ActivityItem) => void;
  className?: string;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'success':
      return '✅';
    case 'info':
      return 'ℹ️';
    case 'warning':
      return '⚠️';
    case 'error':
      return '❌';
    case 'system':
      return '🔧';
    default:
      return '📋';
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'system':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}d ago`;
  }
};

const ActivityDetails: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <span className="text-2xl" role="img" aria-label={`${activity.type} activity`}>
          {getActivityIcon(activity.type)}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{activity.title}</h3>
          <p className="text-gray-600 mt-1">{activity.description}</p>
        </div>
        <Badge className={getActivityColor(activity.type)}>
          {activity.type}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        {activity.user && (
          <div>
            <span className="font-medium text-gray-700">User:</span>
            <span className="ml-2 text-gray-600">{activity.user}</span>
          </div>
        )}
        {activity.portal && (
          <div>
            <span className="font-medium text-gray-700">Portal:</span>
            <span className="ml-2 text-gray-600">{activity.portal}</span>
          </div>
        )}
        {activity.action && (
          <div>
            <span className="font-medium text-gray-700">Action:</span>
            <span className="ml-2 text-gray-600">{activity.action}</span>
          </div>
        )}
        <div>
          <span className="font-medium text-gray-700">Time:</span>
          <span className="ml-2 text-gray-600">
            {new Date(activity.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Details:</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {JSON.stringify(activity.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onActivityClick,
  className
}) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const handleActivityClick = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    onActivityClick?.(activity);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleActivityClick(activity)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleActivityClick(activity);
                    }
                  }}
                >
                  <span className="text-lg mt-0.5" role="img" aria-label={`${activity.type} activity`}>
                    {getActivityIcon(activity.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 truncate">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      {activity.portal && (
                        <Badge variant="outline" className="text-xs">
                          {activity.portal}
                        </Badge>
                      )}
                      {activity.user && (
                        <Badge variant="outline" className="text-xs">
                          {activity.user}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
