import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, TrendingUp, Clock, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ComplianceReportsPage = () => {
  const complianceMetrics = [
    { title: "Overall Compliance", value: "98.5%", change: "+1.2%", icon: ShieldCheck, trend: "up" },
    { title: "Active Violations", value: "2", change: "-3", icon: AlertTriangle, trend: "down" },
    { title: "HOS Compliance", value: "99.1%", change: "+0.8%", icon: Clock, trend: "up" },
    { title: "Expiring Documents", value: "5", change: "+2", icon: Calendar, trend: "up" }
  ];

  const complianceData = [
    { id: "CP-001", type: "DOT Inspection", entity: "VH-001", requirement: "Annual Inspection", status: "Compliant", due_date: "2024-12-15", last_check: "2024-01-15", priority: "Low" },
    { id: "CP-002", type: "Driver License", entity: "John Smith", requirement: "CDL Renewal", status: "Expiring Soon", due_date: "2024-03-20", last_check: "2024-01-10", priority: "High" },
    { id: "CP-003", type: "Insurance", entity: "Fleet Policy", requirement: "Liability Coverage", status: "Compliant", due_date: "2024-08-30", last_check: "2024-01-12", priority: "Medium" },
    { id: "CP-004", type: "Drug Testing", entity: "Maria Garcia", requirement: "Random Test", status: "Overdue", due_date: "2024-01-05", last_check: "2023-12-20", priority: "Critical" },
    { id: "CP-005", type: "Vehicle Registration", entity: "VH-003", requirement: "State Registration", status: "Compliant", due_date: "2024-06-15", last_check: "2024-01-08", priority: "Low" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance Reports</h1>
          <p className="text-muted-foreground mt-1">Regulatory compliance tracking and monitoring</p>
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
        {complianceMetrics.map((metric, index) => (
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

      {/* Compliance Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status Details</CardTitle>
          <CardDescription>Current compliance status and upcoming requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Compliance ID</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Entity</th>
                  <th className="text-left p-3 font-medium">Requirement</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Due Date</th>
                  <th className="text-left p-3 font-medium">Last Check</th>
                  <th className="text-left p-3 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {complianceData.map((compliance) => (
                  <tr key={compliance.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{compliance.id}</td>
                    <td className="p-3">{compliance.type}</td>
                    <td className="p-3">{compliance.entity}</td>
                    <td className="p-3">{compliance.requirement}</td>
                    <td className="p-3">
                      <Badge variant={
                        compliance.status === 'Compliant' ? 'default' : 
                        compliance.status === 'Expiring Soon' ? 'secondary' : 'destructive'
                      }>
                        {compliance.status}
                      </Badge>
                    </td>
                    <td className="p-3">{compliance.due_date}</td>
                    <td className="p-3">{compliance.last_check}</td>
                    <td className="p-3">
                      <Badge variant={
                        compliance.priority === 'Critical' ? 'destructive' : 
                        compliance.priority === 'High' ? 'secondary' : 'outline'
                      }>
                        {compliance.priority}
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

export default ComplianceReportsPage;