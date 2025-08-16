/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingUp, Users, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SafetyReportsPage = () => {
  const safetyMetrics = [
    { title: "Safety Score", value: "97.8%", change: "+1.2%", icon: Shield, trend: "up" },
    { title: "Incidents", value: "3", change: "-2", icon: AlertTriangle, trend: "down" },
    { title: "DOT Violations", value: "0", change: "0", icon: Users, trend: "neutral" },
    { title: "Driver Training Hours", value: "152", change: "+24", icon: TrendingUp, trend: "up" }
  ];

  const safetyData = [
    { id: "SF-001", driver: "John Smith", vehicle: "VH-001", incident_type: "Minor Accident", severity: "Low", date: "2024-01-10", status: "Resolved", action_taken: "Additional training" },
    { id: "SF-002", driver: "Maria Garcia", vehicle: "VH-003", incident_type: "Speeding", severity: "Medium", date: "2024-01-08", status: "Under Review", action_taken: "Coaching session" },
    { id: "SF-003", driver: "David Johnson", vehicle: "VH-005", incident_type: "Hard Braking", severity: "Low", date: "2024-01-12", status: "Resolved", action_taken: "Defensive driving course" },
    { id: "SF-004", driver: "Sarah Wilson", vehicle: "VH-002", incident_type: "Late Delivery", severity: "Low", date: "2024-01-14", status: "Resolved", action_taken: "Route optimization" },
    { id: "SF-005", driver: "Mike Brown", vehicle: "VH-004", incident_type: "Inspection Violation", severity: "High", date: "2024-01-15", status: "Active", action_taken: "Vehicle maintenance" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Safety Reports</h1>
          <p className="text-muted-foreground mt-1">Fleet safety metrics and incident tracking</p>
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
        {safetyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs">
                <TrendingUp className={`h-3 w-3 mr-1 ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`} />
                <span className={
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }>
                  {metric.change} from last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Safety Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Incident Details</CardTitle>
          <CardDescription>Recent safety incidents and corrective actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Incident ID</th>
                  <th className="text-left p-3 font-medium">Driver</th>
                  <th className="text-left p-3 font-medium">Vehicle</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Severity</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {safetyData.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{incident.id}</td>
                    <td className="p-3">{incident.driver}</td>
                    <td className="p-3">{incident.vehicle}</td>
                    <td className="p-3">{incident.incident_type}</td>
                    <td className="p-3">
                      <Badge variant={
                        incident.severity === 'High' ? 'destructive' : 
                        incident.severity === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="p-3">{incident.date}</td>
                    <td className="p-3">
                      <Badge variant={incident.status === 'Resolved' ? 'default' : 'secondary'}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="p-3">{incident.action_taken}</td>
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

export default SafetyReportsPage;