import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Building2, 
  Users, 
  Package, 
  Car, 
  Settings,
  BarChart3,
  Activity,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  DollarSign,
  ClipboardList,
  ShoppingCart,
  TrendingUp,
  BookOpen,
  Briefcase,
  Database
} from 'lucide-react';
import { PORTALS, getPortalsByRole } from '@/portals/registry';

const PortalSelection = () => {
  const { selectedRole, user } = useAuth();
  const navigate = useNavigate();

  // Filter portals by user role
  const allowedPortals = selectedRole ? getPortalsByRole(selectedRole) : PORTALS;

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    Settings: <Settings className="h-8 w-8" />,
    Shield: <Shield className="h-8 w-8" />,
    Truck: <Truck className="h-8 w-8" />,
    Building2: <Building2 className="h-8 w-8" />,
    Users: <Users className="h-8 w-8" />,
    Package: <Package className="h-8 w-8" />,
    Car: <Car className="h-8 w-8" />,
    BarChart3: <BarChart3 className="h-8 w-8" />,
    Activity: <Activity className="h-8 w-8" />,
    DollarSign: <DollarSign className="h-8 w-8" />,
    ClipboardList: <ClipboardList className="h-8 w-8" />,
    ShoppingCart: <ShoppingCart className="h-8 w-8" />,
    TrendingUp: <TrendingUp className="h-8 w-8" />,
    BookOpen: <BookOpen className="h-8 w-8" />,
    Briefcase: <Briefcase className="h-8 w-8" />,
    Database: <Database className="h-8 w-8" />
  };

  const handlePortalSelect = (portal: any) => {
    console.log(`Navigating to ${portal.title} at ${portal.path}`);
    navigate(portal.path);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="text-yellow-600">Maintenance</Badge>;
      case 'beta':
        return <Badge variant="outline" className="text-blue-600">Beta</Badge>;
      default:
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Portal Selection
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome back! Choose the portal that best fits your role and responsibilities.
          </p>
          {user && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Authenticated as {user.email}
              </span>
            </div>
          )}
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {allowedPortals.map((portal) => (
            <Card 
              key={portal.key} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => handlePortalSelect(portal)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${portal.color} text-white`}>
                    {iconMap[portal.icon] || <Settings className="h-8 w-8" />}
                  </div>
                  {getStatusBadge(portal.status)}
                </div>
                <CardTitle className="text-xl font-bold mt-4 group-hover:text-primary transition-colors">
                  {portal.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {portal.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm text-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {portal.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <Zap className="h-3 w-3 text-primary" />
                        {feature}
                      </li>
                    ))}
                    {portal.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{portal.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  variant="outline"
                >
                  <span>Access Portal</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 p-4 bg-card/50 rounded-lg border">
            <span className="text-sm text-muted-foreground">Quick Actions:</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Autonomous Agent Status */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-800">Autonomous Agents Active</span>
          </div>
          <p className="text-sm text-green-700">
            All 250 autonomous agents are running and monitoring system health. 
            Your portals are being continuously optimized and enhanced.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalSelection;
