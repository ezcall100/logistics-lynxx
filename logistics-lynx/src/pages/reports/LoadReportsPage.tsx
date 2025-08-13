import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, Clock, DollarSign, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoadReportsPage = () => {
  const loadMetrics = [
    { title: "Total Loads", value: "1,247", change: "+89", icon: Package, trend: "up" },
    { title: "Avg Revenue/Load", value: "$2,485", change: "+$145", icon: DollarSign, trend: "up" },
    { title: "On-Time Delivery", value: "96.8%", change: "+1.2%", icon: Clock, trend: "up" },
    { title: "Load Completion Rate", value: "98.5%", change: "+0.8%", icon: TrendingUp, trend: "up" }
  ];

  const loadData = [
    { id: "LD-2024-001", customer: "Walmart Inc.", origin: "Chicago, IL", destination: "Memphis, TN", weight: "45,000 lbs", revenue: "$2,850", status: "Delivered", delivery_date: "2024-01-15" },
    { id: "LD-2024-002", customer: "Amazon", origin: "Los Angeles, CA", destination: "Las Vegas, NV", weight: "38,500 lbs", revenue: "$1,950", status: "In Transit", delivery_date: "2024-01-16" },
    { id: "LD-2024-003", customer: "Target Corp", origin: "Dallas, TX", destination: "Austin, TX", weight: "42,200 lbs", revenue: "$1,650", status: "Delivered", delivery_date: "2024-01-14" },
    { id: "LD-2024-004", customer: "Home Depot", origin: "Atlanta, GA", destination: "Jacksonville, FL", weight: "47,800 lbs", revenue: "$2,100", status: "Loading", delivery_date: "2024-01-17" },
    { id: "LD-2024-005", customer: "Costco", origin: "Seattle, WA", destination: "Portland, OR", weight: "41,000 lbs", revenue: "$1,750", status: "Scheduled", delivery_date: "2024-01-18" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Load Reports</h1>
          <p className="text-muted-foreground mt-1">Load performance and revenue analytics</p>
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
        {loadMetrics.map((metric, index) => (
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

      {/* Load Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Load Performance Details</CardTitle>
          <CardDescription>Detailed breakdown of load metrics and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Load ID</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Origin</th>
                  <th className="text-left p-3 font-medium">Destination</th>
                  <th className="text-left p-3 font-medium">Weight</th>
                  <th className="text-left p-3 font-medium">Revenue</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {loadData.map((load) => (
                  <tr key={load.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{load.id}</td>
                    <td className="p-3">{load.customer}</td>
                    <td className="p-3">{load.origin}</td>
                    <td className="p-3">{load.destination}</td>
                    <td className="p-3">{load.weight}</td>
                    <td className="p-3 font-semibold text-green-600">{load.revenue}</td>
                    <td className="p-3">
                      <Badge variant={
                        load.status === 'Delivered' ? 'default' : 
                        load.status === 'In Transit' ? 'secondary' : 
                        load.status === 'Loading' ? 'destructive' : 'outline'
                      }>
                        {load.status}
                      </Badge>
                    </td>
                    <td className="p-3">{load.delivery_date}</td>
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

export default LoadReportsPage;