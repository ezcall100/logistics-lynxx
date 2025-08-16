/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Truck, Package, MapPin, DollarSign, Clock, AlertTriangle, TrendingUp, Users } from 'lucide-react';

const ShipmentsDashboard = () => {
  const kpiData = [
    {
      title: "Active Shipments",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Truck,
      color: "text-blue-600"
    },
    {
      title: "Total Revenue",
      value: "$1.2M",
      change: "+8.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "On-Time Delivery",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Clock,
      color: "text-emerald-600"
    },
    {
      title: "Total Loads",
      value: "1,834",
      change: "+15%",
      trend: "up",
      icon: Package,
      color: "text-purple-600"
    }
  ];

  const recentShipments = [
    {
      id: "SH-2024-001",
      origin: "Los Angeles, CA",
      destination: "Miami, FL",
      carrier: "Express Logistics",
      status: "In Transit",
      eta: "2024-01-25",
      value: "$45,200"
    },
    {
      id: "SH-2024-002",
      origin: "Chicago, IL",
      destination: "Seattle, WA",
      carrier: "Swift Transport",
      status: "Delivered",
      eta: "2024-01-23",
      value: "$32,800"
    },
    {
      id: "SH-2024-003",
      origin: "Dallas, TX",
      destination: "Boston, MA",
      carrier: "National Freight",
      status: "Pending",
      eta: "2024-01-26",
      value: "$28,500"
    },
    {
      id: "SH-2024-004",
      origin: "Phoenix, AZ",
      destination: "Atlanta, GA",
      carrier: "Prime Carriers",
      status: "Loading",
      eta: "2024-01-27",
      value: "$38,900"
    }
  ];

  const transportModes = [
    { mode: "Ground", count: 156, percentage: 63, color: "bg-blue-500" },
    { mode: "Ocean", count: 45, percentage: 18, color: "bg-cyan-500" },
    { mode: "Air", count: 32, percentage: 13, color: "bg-indigo-500" },
    { mode: "Rail", count: 14, percentage: 6, color: "bg-green-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Loading': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-muted/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shipments Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage all your shipments in real-time</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Track Shipment
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Package className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{kpi.change}</span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Shipments */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Recent Shipments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="font-semibold">{shipment.id}</div>
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {shipment.origin} → {shipment.destination}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Carrier: {shipment.carrier} | ETA: {shipment.eta}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{shipment.value}</div>
                    <Button size="sm" variant="ghost" className="mt-1">
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transport Modes */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transport Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transportModes.map((transport) => (
                <div key={transport.mode} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{transport.mode}</span>
                    <span className="text-sm text-muted-foreground">{transport.count}</span>
                  </div>
                  <Progress value={transport.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">{transport.percentage}% of total</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-800">Delayed Shipment</div>
                <div className="text-xs text-red-600">SH-2024-005 is 2 hours behind schedule</div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Documentation Missing</div>
                <div className="text-xs text-yellow-600">3 shipments need BOL updates</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Route Optimization</div>
                <div className="text-xs text-blue-600">New efficient route available for Dallas-Miami</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsDashboard;