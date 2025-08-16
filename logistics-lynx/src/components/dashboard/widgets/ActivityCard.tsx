/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Activity } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  user?: string;
  timestamp: string;
  details?: string;
}

interface ActivityCardProps {
  title: string;
  activities: ActivityItem[];
  isLoading?: boolean;
}

export function ActivityCard({ title, activities, isLoading = false }: ActivityCardProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "warning":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case "error":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return "border-l-green-500";
      case "warning":
        return "border-l-yellow-500";
      case "error":
        return "border-l-red-500";
      default:
        return "border-l-blue-500";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground font-medium">{title}</div>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`border-l-4 pl-3 py-2 ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getActivityIcon(activity.type)}
                  <span className="text-sm font-medium">{activity.message}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(activity.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
              
              {activity.user && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <User className="h-3 w-3" />
                  <span>{activity.user}</span>
                </div>
              )}
              
              {activity.details && (
                <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
