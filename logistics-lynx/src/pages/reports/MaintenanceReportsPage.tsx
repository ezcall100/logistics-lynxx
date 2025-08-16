/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, TrendingUp, Calendar, AlertTriangle, Clock, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MaintenanceReportsPage = () => {
  const maintenanceMetrics = [
    { title: "Total Maintenance Cost", value: "$12,450", change: "-8%", icon: Wrench, trend: "down" },
    { title: "Avg Cost per Vehicle", value: "$2,490", change: "-$120", icon: TrendingUp, trend: "down" },
    { title: "Scheduled Maintenance", value: "95%", change: "+3%", icon: Calendar, trend: "up" },
    { title: "Emergency Repairs", value: "5", change: "-2", icon: AlertTriangle, trend: "down" }
  ];

  const maintenanceData = [
    { id: "MN-001", vehicle: "VH-001", type: "Scheduled", service: "Oil Change & Filter", cost: "$285", shop: "Pete's Auto Service", date: "2024-01-15", next_due: "2024-04-15", status: "Completed" },
    { id: "MN-002", vehicle: "VH-003", type: "Emergency", service: "Brake Repair", cost: "$1,250", shop: "Heavy Duty Repairs", date: "2024-01-12", next_due: "N/A", status: "Completed" },
    { id: "MN-003", vehicle: "VH-002", type: "Scheduled", service: "Tire Rotation", cost: "$120", shop: "Tire Pro", date: "2024-01-10", next_due: "2024-07-10", status: "Completed" },
    { id: "MN-004", vehicle: "VH-004", type: "Scheduled", service: "DOT Inspection", cost: "$95", shop: "State Inspection", date: "2024-01-08", next_due: "2025-01-08", status: "Completed" },
    { id: "MN-005", vehicle: "VH-005", type: "Preventive", service: "Transmission Service", cost: "$450", shop: "Transmission Experts", date: "2024-01-18", next_due: "2024-07-18", status: "Scheduled" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Reports</h1>
          <p className="text-muted-foreground mt-1">Vehicle maintenance tracking and cost analysis</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FileDown className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {maintenanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs">
                <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change} from last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Record Details</CardTitle>
          <CardDescription>Recent maintenance activities and scheduling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Record ID</th>
                  <th className="text-left p-3 font-medium">Vehicle</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Service</th>
                  <th className="text-left p-3 font-medium">Cost</th>
                  <th className="text-left p-3 font-medium">Shop</th>
                  <th className="text-left p-3 font-medium">Service Date</th>
                  <th className="text-left p-3 font-medium">Next Due</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceData.map((maintenance) => (
                  <tr key={maintenance.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{maintenance.id}</td>
                    <td className="p-3">{maintenance.vehicle}</td>
                    <td className="p-3">
                      <Badge variant={
                        maintenance.type === 'Emergency' ? 'destructive' : 
                        maintenance.type === 'Scheduled' ? 'default' : 'secondary'
                      }>
                        {maintenance.type}
                      </Badge>
                    </td>
                    <td className="p-3">{maintenance.service}</td>
                    <td className="p-3 font-semibold text-red-600">{maintenance.cost}</td>
                    <td className="p-3">{maintenance.shop}</td>
                    <td className="p-3">{maintenance.date}</td>
                    <td className="p-3">{maintenance.next_due}</td>
                    <td className="p-3">
                      <Badge variant={maintenance.status === 'Completed' ? 'default' : 'secondary'}>
                        {maintenance.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceReportsPage;