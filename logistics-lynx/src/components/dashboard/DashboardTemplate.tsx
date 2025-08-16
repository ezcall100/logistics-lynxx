import React, { useState, useEffect } from "react";
import DashboardShell, { Cell } from "./DashboardShell";
import { KpiCard } from "./widgets/KpiCard";
import { TimeseriesCard } from "./widgets/TimeseriesCard";
import { TableCard } from "./widgets/TableCard";
import { ActivityCard } from "./widgets/ActivityCard";
import { AlertsCard } from "./widgets/AlertsCard";
import { getDashboardByPortalKey, type PortalDashboard } from "@/portals/dashboard.registry";
import { useToast } from "@/hooks/use-toast";

interface DashboardTemplateProps {
  portalKey: string;
}

// Mock data generators for demonstration
const generateMockData = (query: string) => {
  const mockData: Record<string, any> = {
    // KPI data
    "obs.uptime.30d": { value: "99.8%", delta: "+0.2%", deltaType: "positive" },
    "autonomous.agents.active": { value: 5, delta: "+2", deltaType: "positive" },
    "auth.users.active": { value: 1247, delta: "+23", deltaType: "positive" },
    "ops.incidents.open": { value: 3, delta: "-1", deltaType: "positive" },
    "broker.funnel.q2b": { value: "78%", delta: "+5%", deltaType: "positive" },
    "broker.loads.active": { value: 156, delta: "+12", deltaType: "positive" },
    "broker.revenue.monthly": { value: "$2.4M", delta: "+8%", deltaType: "positive" },
    "broker.carriers.active": { value: 89, delta: "+3", deltaType: "positive" },
    
    // Timeseries data
    "obs.p95.portal": [
      { name: "Mon", value: 1200 }, { name: "Tue", value: 1100 }, { name: "Wed", value: 1300 },
      { name: "Thu", value: 1000 }, { name: "Fri", value: 1400 }, { name: "Sat", value: 900 },
      { name: "Sun", value: 800 }
    ],
    "broker.loads.timeseries": [
      { name: "00:00", value: 45 }, { name: "04:00", value: 32 }, { name: "08:00", value: 78 },
      { name: "12:00", value: 92 }, { name: "16:00", value: 85 }, { name: "20:00", value: 67 }
    ],
    
    // Table data
    "ops.incidents.recent": [
      { ts: "2024-01-15 14:30", severity: "high", portal: "broker", status: "resolved" },
      { ts: "2024-01-15 12:15", severity: "medium", portal: "carrier", status: "investigating" },
      { ts: "2024-01-15 10:45", severity: "low", portal: "shipper", status: "resolved" }
    ],
    "broker.carriers.top": [
      { name: "ABC Transport", score: 98, onTime: "96%" },
      { name: "XYZ Logistics", score: 95, onTime: "94%" },
      { name: "Fast Freight Co", score: 92, onTime: "91%" }
    ],
    
    // Activity data
    "admin.activity.recent": [
      { id: "1", type: "info", message: "System backup completed", user: "admin", timestamp: "2024-01-15T15:30:00Z" },
      { id: "2", type: "success", message: "New user registered", user: "system", timestamp: "2024-01-15T15:25:00Z" },
      { id: "3", type: "warning", message: "High memory usage detected", user: "monitor", timestamp: "2024-01-15T15:20:00Z" }
    ],
    "broker.activity.recent": [
      { id: "1", type: "success", message: "Load assigned to carrier", user: "broker1", timestamp: "2024-01-15T15:30:00Z" },
      { id: "2", type: "info", message: "Quote generated", user: "broker2", timestamp: "2024-01-15T15:25:00Z" },
      { id: "3", type: "success", message: "Payment processed", user: "system", timestamp: "2024-01-15T15:20:00Z" }
    ],
    
    // Alerts data
    "ops.alerts.open": [
      { id: "1", severity: "critical", title: "Database connection timeout", message: "Primary DB connection failed", timestamp: "2024-01-15T15:30:00Z", source: "database" },
      { id: "2", severity: "high", title: "High CPU usage", message: "Server CPU usage at 95%", timestamp: "2024-01-15T15:25:00Z", source: "monitoring" },
      { id: "3", severity: "medium", title: "API rate limit warning", message: "Approaching rate limit threshold", timestamp: "2024-01-15T15:20:00Z", source: "api" }
    ],
    "broker.alerts.open": [
      { id: "1", severity: "high", title: "Carrier assignment failed", message: "Unable to assign load to preferred carrier", timestamp: "2024-01-15T15:30:00Z", source: "broker" },
      { id: "2", severity: "medium", title: "Payment processing delay", message: "Payment taking longer than usual", timestamp: "2024-01-15T15:25:00Z", source: "payment" }
    ]
  };
  
  return mockData[query] || { value: "N/A", delta: "0%", deltaType: "neutral" };
};

export function DashboardTemplate({ portalKey }: DashboardTemplateProps) {
  const [dashboard, setDashboard] = useState<PortalDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const dashboardConfig = getDashboardByPortalKey(portalKey);
    if (dashboardConfig) {
      setDashboard(dashboardConfig);
    } else {
      toast({
        title: "Dashboard Not Found",
        description: `No dashboard configuration found for portal: ${portalKey}`,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  }, [portalKey, toast]);

  if (isLoading) {
    return (
      <DashboardShell title="Loading Dashboard..." portalKey={portalKey}>
        <div className="col-span-12 flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!dashboard) {
    return (
      <DashboardShell title="Dashboard Not Found" portalKey={portalKey}>
        <div className="col-span-12 flex items-center justify-center py-12">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Dashboard Not Found</h2>
            <p className="text-muted-foreground">No dashboard configuration found for portal: {portalKey}</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const renderWidget = (widget: any) => {
    const data = generateMockData(widget.query || "");
    
    switch (widget.kind) {
      case "kpi":
        return (
          <KpiCard
            title={widget.title}
            value={data.value}
            delta={data.delta}
            deltaType={data.deltaType}
          />
        );
        
      case "timeseries":
        return (
          <TimeseriesCard
            title={widget.title}
            data={data}
          />
        );
        
      case "table":
        return (
          <TableCard
            title={widget.title}
            data={data}
            columns={widget.columns || []}
          />
        );
        
      case "activity":
        return (
          <ActivityCard
            title={widget.title}
            activities={data}
          />
        );
        
      case "alerts":
        return (
          <AlertsCard
            title={widget.title}
            alerts={data}
          />
        );
        
      default:
        return <div>Unknown widget type: {widget.kind}</div>;
    }
  };

  return (
    <DashboardShell title={`${portalKey.charAt(0).toUpperCase() + portalKey.slice(1)} Dashboard`} portalKey={portalKey}>
      {dashboard.widgets.map((widget) => (
        <Cell key={widget.id} span={widget.span}>
          {renderWidget(widget)}
        </Cell>
      ))}
    </DashboardShell>
  );
}
