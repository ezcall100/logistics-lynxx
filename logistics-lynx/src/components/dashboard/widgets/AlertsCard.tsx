import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, XCircle, Bell } from "lucide-react";

interface AlertItem {
  id: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;
  message: string;
  timestamp: string;
  acknowledged?: boolean;
  source?: string;
}

interface AlertsCardProps {
  title: string;
  alerts: AlertItem[];
  isLoading?: boolean;
}

export function AlertsCard({ title, alerts, isLoading = false }: AlertsCardProps) {
  const getSeverityIcon = (severity: AlertItem["severity"]) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: AlertItem["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-l-red-500 bg-red-50";
      case "high":
        return "border-l-orange-500 bg-orange-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getSeverityBadge = (severity: AlertItem["severity"]) => {
    const colors = {
      critical: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
      info: "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[severity]}>{severity.toUpperCase()}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const criticalAlerts = unacknowledgedAlerts.filter(alert => alert.severity === "critical");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground font-medium">{title}</div>
        {unacknowledgedAlerts.length > 0 && (
          <Badge variant="destructive" className="text-xs">
            {unacknowledgedAlerts.length} active
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No alerts</p>
          </div>
        ) : (
          alerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 p-3 rounded-r-lg ${getSeverityColor(alert.severity)} ${
                alert.acknowledged ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      {alert.source && (
                        <>
                          <span>•</span>
                          <span>{alert.source}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {criticalAlerts.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <XCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              {criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} require immediate attention
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
