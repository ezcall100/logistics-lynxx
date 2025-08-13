import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Fuel, Wrench, TrendingUp, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehicleReportsPage = () => {
  const vehicleMetrics = [
    { title: "Fleet Utilization", value: "87%", change: "+5%", icon: Truck, trend: "up" },
    { title: "Fuel Efficiency", value: "6.8 MPG", change: "+0.3", icon: Fuel, trend: "up" },
    { title: "Maintenance Cost", value: "$8,450", change: "-12%", icon: Wrench, trend: "down" },
    { title: "Vehicle Downtime", value: "3.2%", change: "-1.1%", icon: Calendar, trend: "down" }
  ];

  const vehicleData = [
    { id: "VH-001", type: "Tractor", make: "Peterbilt", model: "579", year: 2022, mileage: 125000, status: "Active", utilization: "92%" },
    { id: "VH-002", type: "Trailer", make: "Great Dane", model: "Freedom", year: 2021, mileage: 89000, status: "Active", utilization: "88%" },
    { id: "VH-003", type: "Tractor", make: "Kenworth", model: "T680", year: 2023, mileage: 45000, status: "Maintenance", utilization: "0%" },
    { id: "VH-004", type: "Trailer", make: "Wabash", model: "DuraPlate", year: 2020, mileage: 156000, status: "Active", utilization: "95%" },
    { id: "VH-005", type: "Tractor", make: "Freightliner", model: "Cascadia", year: 2022, mileage: 98000, status: "Active", utilization: "85%" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Reports</h1>
          <p className="text-muted-foreground mt-1">Fleet performance and vehicle analytics</p>
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
        {vehicleMetrics.map((metric, index) => (
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

      {/* Vehicle Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Performance Details</CardTitle>
          <CardDescription>Detailed breakdown of vehicle metrics and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Vehicle ID</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Make/Model</th>
                  <th className="text-left p-3 font-medium">Year</th>
                  <th className="text-left p-3 font-medium">Mileage</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{vehicle.id}</td>
                    <td className="p-3">{vehicle.type}</td>
                    <td className="p-3">{vehicle.make} {vehicle.model}</td>
                    <td className="p-3">{vehicle.year}</td>
                    <td className="p-3">{vehicle.mileage.toLocaleString()} mi</td>
                    <td className="p-3">
                      <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>
                        {vehicle.status}
                      </Badge>
                    </td>
                    <td className="p-3">{vehicle.utilization}</td>
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

export default VehicleReportsPage;