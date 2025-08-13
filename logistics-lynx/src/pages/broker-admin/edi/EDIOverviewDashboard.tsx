import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  FileText, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap,
  ArrowUpDown,
  Truck,
  RefreshCw
} from 'lucide-react';

const EDIOverviewDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const kpiData = [
    {
      title: "Total EDI Volume",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: FileText,
      description: "This month"
    },
    {
      title: "Success Rate", 
      value: "98.7%",
      change: "+0.8%",
      trend: "up",
      icon: CheckCircle,
      description: "Last 30 days"
    },
    {
      title: "Active Partners",
      value: "156",
      change: "+5",
      trend: "up", 
      icon: Users,
      description: "Trading partners"
    },
    {
      title: "Failed Transactions",
      value: "37",
      change: "-23%",
      trend: "down",
      icon: AlertTriangle,
      description: "Pending resolution"
    }
  ];

  const transactionTypes = [
    { type: "EDI 204", name: "Load Tender", count: 1247, success: 99.2, icon: Truck },
    { type: "EDI 210", name: "Freight Invoice", count: 892, success: 98.9, icon: FileText },
    { type: "EDI 214", name: "Status Updates", count: 2156, success: 99.7, icon: Activity },
    { type: "EDI 990", name: "Load Response", count: 1198, success: 97.8, icon: ArrowUpDown },
    { type: "EDI 997", name: "Acknowledgment", count: 3421, success: 99.9, icon: CheckCircle }
  ];

  const recentActivity = [
    { time: "10:45 AM", type: "EDI 204", partner: "ABC Logistics", status: "success", message: "Load tender processed" },
    { time: "10:43 AM", type: "EDI 997", partner: "FastTruck Inc", status: "success", message: "Acknowledgment received" },
    { time: "10:41 AM", type: "EDI 210", partner: "MegaHaul Corp", status: "error", message: "Invalid invoice format" },
    { time: "10:39 AM", type: "EDI 214", partner: "QuickShip LLC", status: "success", message: "Delivery confirmed" },
    { time: "10:37 AM", type: "EDI 990", partner: "TruckMaster", status: "pending", message: "Awaiting response" }
  ];

  const alertItems = [
    { severity: "high", message: "3 critical EDI mapping errors detected", time: "5 min ago" },
    { severity: "medium", message: "Partner ABC Logistics: Connection timeout", time: "12 min ago" },
    { severity: "low", message: "EDI 997 acknowledgment delay from 2 partners", time: "25 min ago" }
  ];

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Overview Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of Electronic Data Interchange operations
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`text-${kpi.trend === 'up' ? 'green' : 'red'}-600`}>
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transaction Types Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Transaction Types Performance
            </CardTitle>
            <CardDescription>Success rates by EDI transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactionTypes.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <transaction.icon className="h-8 w-8 p-2 bg-primary/10 text-primary rounded" />
                    <div>
                      <div className="font-medium">{transaction.type}</div>
                      <div className="text-sm text-muted-foreground">{transaction.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.count.toLocaleString()}</div>
                    <Badge variant={transaction.success >= 99 ? "default" : transaction.success >= 97 ? "secondary" : "destructive"}>
                      {transaction.success}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
            <CardDescription>Recent issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertItems.map((alert, index) => (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent EDI Activity
          </CardTitle>
          <CardDescription>Live transaction monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="text-sm text-muted-foreground min-w-[70px]">
                  {activity.time}
                </div>
                <Badge variant="outline">{activity.type}</Badge>
                <div className="flex-1">
                  <div className="font-medium">{activity.partner}</div>
                  <div className="text-sm text-muted-foreground">{activity.message}</div>
                </div>
                <Badge variant={
                  activity.status === 'success' ? 'default' : 
                  activity.status === 'error' ? 'destructive' : 'secondary'
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EDIOverviewDashboard;