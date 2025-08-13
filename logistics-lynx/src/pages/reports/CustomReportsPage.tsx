import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, BarChart3, TrendingUp, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomReportsPage = () => {
  const reportMetrics = [
    { title: "Total Reports", value: "24", change: "+6", icon: BarChart3, trend: "up" },
    { title: "Active Reports", value: "18", change: "+3", icon: TrendingUp, trend: "up" },
    { title: "Scheduled Reports", value: "12", change: "+2", icon: Calendar, trend: "up" },
    { title: "Shared Reports", value: "8", change: "+1", icon: Settings, trend: "up" }
  ];

  const customReports = [
    { id: "CR-001", name: "Weekly Fleet Performance", description: "Combined vehicle and driver performance metrics", type: "Scheduled", frequency: "Weekly", last_run: "2024-01-15", status: "Active", created_by: "Admin", shared: true },
    { id: "CR-002", name: "Monthly Revenue Analysis", description: "Customer revenue breakdown with trends", type: "On-demand", frequency: "Monthly", last_run: "2024-01-01", status: "Active", created_by: "Manager", shared: false },
    { id: "CR-003", name: "Safety Incident Dashboard", description: "Comprehensive safety metrics and trends", type: "Real-time", frequency: "Live", last_run: "2024-01-16", status: "Active", created_by: "Safety Officer", shared: true },
    { id: "CR-004", name: "Fuel Efficiency Trends", description: "Fuel consumption analysis by route and driver", type: "Scheduled", frequency: "Bi-weekly", last_run: "2024-01-10", status: "Paused", created_by: "Fleet Manager", shared: false },
    { id: "CR-005", name: "Customer Satisfaction Report", description: "Customer feedback and delivery performance", type: "Manual", frequency: "Quarterly", last_run: "2024-01-05", status: "Draft", created_by: "Customer Success", shared: true }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Custom Reports</h1>
          <p className="text-muted-foreground mt-1">Create and manage personalized business reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Manage Templates
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
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

      {/* Custom Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Custom Reports</CardTitle>
          <CardDescription>Manage and view your personalized business reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Report ID</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Description</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Frequency</th>
                  <th className="text-left p-3 font-medium">Last Run</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Created By</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{report.id}</td>
                    <td className="p-3 font-medium">{report.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{report.description}</td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {report.type}
                      </Badge>
                    </td>
                    <td className="p-3">{report.frequency}</td>
                    <td className="p-3">{report.last_run}</td>
                    <td className="p-3">
                      <Badge variant={
                        report.status === 'Active' ? 'default' : 
                        report.status === 'Paused' ? 'secondary' : 'outline'
                      }>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="p-3">{report.created_by}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileDown className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
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

export default CustomReportsPage;