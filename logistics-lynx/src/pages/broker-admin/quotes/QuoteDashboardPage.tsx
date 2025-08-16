/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Plus,
  FileText,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const QuoteDashboardPage = () => {
  const stats = [
    {
      title: "Active Quotes",
      value: "147",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+5%",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Avg Quote Value",
      value: "$2,850",
      change: "+8%",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Response Time",
      value: "2.3h",
      change: "-15%",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "New Quote",
      description: "Create a new freight quote",
      icon: Plus,
      link: "/broker-admin/quotes/new",
      color: "bg-blue-500"
    },
    {
      title: "Quick Quote",
      description: "Generate instant quotes",
      icon: Zap,
      link: "/broker-admin/quotes/quick",
      color: "bg-emerald-500"
    },
    {
      title: "All Quotes",
      description: "View and manage all quotes",
      icon: FileText,
      link: "/broker-admin/quotes/all",
      color: "bg-purple-500"
    },
    {
      title: "Analytics",
      description: "Quote performance insights",
      icon: TrendingUp,
      link: "/broker-admin/quotes/analytics/performance",
      color: "bg-orange-500"
    }
  ];

  const recentQuotes = [
    {
      id: "QT-2024-156",
      customer: "Walmart Distribution",
      route: "LA, CA → Phoenix, AZ",
      amount: "$2,850",
      status: "pending",
      time: "2 hours ago"
    },
    {
      id: "QT-2024-157",
      customer: "Amazon Logistics",
      route: "Chicago, IL → Dallas, TX",
      amount: "$3,200",
      status: "approved",
      time: "4 hours ago"
    },
    {
      id: "QT-2024-158",
      customer: "Home Depot Supply",
      route: "Atlanta, GA → Miami, FL",
      amount: "$1,950",
      status: "expired",
      time: "6 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quote Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your freight quotes
          </p>
        </div>
        <Button asChild>
          <Link to="/broker-admin/quotes/new">
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used quote operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-24 flex-col space-y-2"
              >
                <Link to={action.link}>
                  <div className={`p-2 rounded-md ${action.color}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
          <CardDescription>
            Latest quote activity and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuotes.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-semibold">{quote.id}</div>
                  <div className="text-sm text-muted-foreground">{quote.customer}</div>
                  <div className="text-sm">{quote.route}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold">{quote.amount}</div>
                  <Badge className={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{quote.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/broker-admin/quotes/all">
                View All Quotes
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteDashboardPage;