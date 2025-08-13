import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, TrendingUp, DollarSign, BarChart3, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FuelReportsPage = () => {
  const fuelMetrics = [
    { title: "Total Fuel Cost", value: "$28,450", change: "+$2,150", icon: DollarSign, trend: "up" },
    { title: "Avg Cost/Gallon", value: "$3.89", change: "+$0.12", icon: Fuel, trend: "up" },
    { title: "Fleet MPG", value: "6.8", change: "+0.3", icon: BarChart3, trend: "up" },
    { title: "Fuel Efficiency", value: "92.5%", change: "+1.8%", icon: TrendingUp, trend: "up" }
  ];

  const fuelData = [
    { id: "FL-001", vehicle: "VH-001", driver: "John Smith", location: "Pilot Flying J - Chicago", gallons: 125.5, cost: "$487.45", mpg: "6.9", date: "2024-01-15" },
    { id: "FL-002", vehicle: "VH-002", driver: "Maria Garcia", location: "Love's - Dallas", gallons: 132.8, cost: "$516.79", mpg: "6.7", date: "2024-01-14" },
    { id: "FL-003", vehicle: "VH-003", driver: "David Johnson", location: "TA Travel Center - Atlanta", gallons: 128.2, cost: "$498.58", mpg: "7.1", date: "2024-01-13" },
    { id: "FL-004", vehicle: "VH-004", driver: "Sarah Wilson", location: "Shell - Phoenix", gallons: 119.7, cost: "$465.43", mpg: "6.8", date: "2024-01-12" },
    { id: "FL-005", vehicle: "VH-005", driver: "Mike Brown", location: "Speedway - Memphis", gallons: 135.3, cost: "$526.42", mpg: "6.5", date: "2024-01-11" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fuel Reports</h1>
          <p className="text-muted-foreground mt-1">Fuel consumption and cost analysis</p>
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
        {fuelMetrics.map((metric, index) => (
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

      {/* Fuel Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fuel Transaction Details</CardTitle>
          <CardDescription>Recent fuel purchases and efficiency metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Transaction ID</th>
                  <th className="text-left p-3 font-medium">Vehicle</th>
                  <th className="text-left p-3 font-medium">Driver</th>
                  <th className="text-left p-3 font-medium">Location</th>
                  <th className="text-left p-3 font-medium">Gallons</th>
                  <th className="text-left p-3 font-medium">Total Cost</th>
                  <th className="text-left p-3 font-medium">MPG</th>
                  <th className="text-left p-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {fuelData.map((fuel) => (
                  <tr key={fuel.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{fuel.id}</td>
                    <td className="p-3">{fuel.vehicle}</td>
                    <td className="p-3">{fuel.driver}</td>
                    <td className="p-3">{fuel.location}</td>
                    <td className="p-3">{fuel.gallons} gal</td>
                    <td className="p-3 font-semibold text-red-600">{fuel.cost}</td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {fuel.mpg}
                      </Badge>
                    </td>
                    <td className="p-3">{fuel.date}</td>
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

export default FuelReportsPage;