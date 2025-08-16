/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Package, Calendar, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomerReportsPage = () => {
  const customerMetrics = [
    { title: "Total Customers", value: "247", change: "+18", icon: Users, trend: "up" },
    { title: "Customer Revenue", value: "$485,250", change: "+12.5%", icon: DollarSign, trend: "up" },
    { title: "Active Customers", value: "198", change: "+12", icon: TrendingUp, trend: "up" },
    { title: "Avg Revenue/Customer", value: "$1,964", change: "+$89", icon: Package, trend: "up" }
  ];

  const customerData = [
    { id: "CU-001", name: "Walmart Inc.", contact: "John Anderson", phone: "(555) 123-4567", loads: 45, revenue: "$112,500", last_load: "2024-01-15", status: "Active", rating: "5 stars" },
    { id: "CU-002", name: "Amazon Logistics", contact: "Sarah Chen", phone: "(555) 234-5678", loads: 38, revenue: "$95,000", last_load: "2024-01-14", status: "Active", rating: "4 stars" },
    { id: "CU-003", name: "Target Corporation", contact: "Mike Johnson", phone: "(555) 345-6789", loads: 32, revenue: "$80,000", last_load: "2024-01-12", status: "Active", rating: "5 stars" },
    { id: "CU-004", name: "Home Depot", contact: "Lisa Davis", phone: "(555) 456-7890", loads: 28, revenue: "$70,000", last_load: "2024-01-10", status: "Active", rating: "4 stars" },
    { id: "CU-005", name: "Costco Wholesale", contact: "Robert Wilson", phone: "(555) 567-8901", loads: 22, revenue: "$55,000", last_load: "2024-01-08", status: "Inactive", rating: "3 stars" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Reports</h1>
          <p className="text-muted-foreground mt-1">Customer analytics and relationship insights</p>
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
        {customerMetrics.map((metric, index) => (
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

      {/* Customer Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Performance Details</CardTitle>
          <CardDescription>Customer activity and revenue breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Customer ID</th>
                  <th className="text-left p-3 font-medium">Company Name</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium">Phone</th>
                  <th className="text-left p-3 font-medium">Total Loads</th>
                  <th className="text-left p-3 font-medium">Revenue</th>
                  <th className="text-left p-3 font-medium">Last Load</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-mono">{customer.id}</td>
                    <td className="p-3 font-medium">{customer.name}</td>
                    <td className="p-3">{customer.contact}</td>
                    <td className="p-3">{customer.phone}</td>
                    <td className="p-3">{customer.loads}</td>
                    <td className="p-3 font-semibold text-green-600">{customer.revenue}</td>
                    <td className="p-3">{customer.last_load}</td>
                    <td className="p-3">
                      <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">
                        {customer.rating}
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

export default CustomerReportsPage;