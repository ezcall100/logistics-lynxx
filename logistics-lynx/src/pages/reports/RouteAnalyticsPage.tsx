/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Route, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RouteAnalyticsPage = () => {
  const routeMetrics = [
    { title: "Route Efficiency", value: "94.2%", change: "+2.1%", icon: Route, trend: "up" },
    { title: "Avg Miles/Day", value: "487", change: "+23", icon: MapPin, trend: "up" },
    { title: "On-Time Delivery", value: "96.8%", change: "+1.5%", icon: Clock, trend: "up" },
    { title: "Fuel per Mile", value: "$0.68", change: "-$0.04", icon: TrendingUp, trend: "down" }
  ];

  const routeData = [
    { id: "RT-001", origin: "Chicago, IL", destination: "Atlanta, GA", distance: 716, duration: "11h 30m", efficiency: "95%", fuel_cost: "$486", status: "Completed" },
    { id: "RT-002", origin: "Los Angeles, CA", destination: "Phoenix, AZ", distance: 372, duration: "5h 45m", efficiency: "92%", fuel_cost: "$253", status: "Active" },
    { id: "RT-003", origin: "Dallas, TX", destination: "Houston, TX", distance: 239, duration: "3h 50m", efficiency: "97%", fuel_cost: "$162", status: "Completed" },
    { id: "RT-004", origin: "Miami, FL", destination: "Orlando, FL", distance: 235, duration: "3h 45m", efficiency: "93%", fuel_cost: "$159", status: "Planned" },
    { id: "RT-005", origin: "Seattle, WA", destination: "Portland, OR", distance: 173, duration: "2h 55m", efficiency: "96%", fuel_cost: "$117", status: "Active" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Route Analytics</h1>
          <p className="text-muted-foreground mt-1">Route optimization and performance insights</p>
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
        {routeMetrics.map((metric, index) => (
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

      {/* Route Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Performance Details</CardTitle>
          <CardDescription>Detailed analysis of route efficiency and costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Route ID</th>
                  <th className="text-left p-3 font-medium">Origin</th>
                  <th className="text-left p-3 font-medium">Destination</th>
                  <th className="text-left p-3 font-medium">Distance</th>
                  <th className="text-left p-3 font-medium">Duration</th>
                  <th className="text-left p-3 font-medium">Efficiency</th>
                  <th className="text-left p-3 font-medium">Fuel Cost</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {routeData.map((route) => (
                  <tr key={route.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{route.id}</td>
                    <td className="p-3">{route.origin}</td>
                    <td className="p-3">{route.destination}</td>
                    <td className="p-3">{route.distance} mi</td>
                    <td className="p-3">{route.duration}</td>
                    <td className="p-3">{route.efficiency}</td>
                    <td className="p-3">{route.fuel_cost}</td>
                    <td className="p-3">
                      <Badge variant={
                        route.status === 'Completed' ? 'default' : 
                        route.status === 'Active' ? 'secondary' : 'outline'
                      }>
                        {route.status}
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

export default RouteAnalyticsPage;