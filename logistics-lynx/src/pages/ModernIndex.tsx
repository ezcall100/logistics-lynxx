import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Command, 
  Truck, 
  Building2, 
  Package, 
  Users, 
  Car, 
  Brain,
  Sparkles,
  Activity,
  ArrowRight,
  Globe,
  Zap,
  Star,
  Gauge,
  Target,
  Shield,
  BarChart3,
  TrendingUp,
  Clock
} from 'lucide-react';

const ModernIndex = () => {
  const { isAuthenticated, isLoading, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while determining auth state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="glass-ultra flex flex-col items-center gap-8 p-12 rounded-3xl shadow-premium max-w-md mx-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 h-20 w-20 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 animate-pulse"></div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Loading Autonomous TMS
            </h3>
            <p className="text-muted-foreground font-medium text-lg">Initializing your AI-powered workspace...</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce"></div>
              <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const portals = [
    {
      id: 'super_admin',
      title: 'Super Admin Portal',
      description: 'Global command center with AI-powered oversight across all portals and autonomous agent management',
      icon: Command,
      route: '/super-admin',
      bgGradient: 'from-purple-500 to-violet-500',
      bgLight: 'from-purple-50 to-violet-50',
      textColor: 'text-purple-600',
      features: ['AI Agent Management', 'Global Analytics', 'System Health Monitoring', 'User Administration'],
      stats: { agents: '170', uptime: '99.8%', portals: '6/6', tasks: '2.8K' },
      highlights: ['24/7 Autonomous Operation', 'Real-time Monitoring', 'Predictive Analytics']
    },
    {
      id: 'carrier_admin',
      title: 'Carrier Admin Portal',
      description: 'Comprehensive fleet management and operations with intelligent dispatch and driver coordination',
      icon: Truck,
      route: '/carrier-admin',
      bgGradient: 'from-blue-500 to-cyan-500',
      bgLight: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-600',
      features: ['Fleet Management', 'Load Operations', 'Driver Tracking', 'ELD Compliance'],
      stats: { trucks: '127', drivers: '89', loads: '47', utilization: '94.5%' },
      highlights: ['Real-time Tracking', 'Fuel Optimization', 'Maintenance Alerts']
    },
    {
      id: 'freight_broker_admin',
      title: 'Broker Admin Portal',
      description: 'Smart load matching and rate optimization platform with AI-powered freight coordination',
      icon: Building2,
      route: '/broker-admin',
      bgGradient: 'from-emerald-500 to-green-500',
      bgLight: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-600',
      features: ['Load Board', 'Rate Management', 'Carrier Network', 'Margin Analysis'],
      stats: { loads: '89', margin: '15.8%', matches: '96.7%', revenue: '$67K' },
      highlights: ['AI Rate Optimization', 'Automated Matching', 'Market Intelligence']
    },
    {
      id: 'shipper_admin',
      title: 'Shipper Admin Portal',
      description: 'Streamlined logistics and shipment tracking dashboard with cost optimization and performance analytics',
      icon: Package,
      route: '/shipper-admin',
      bgGradient: 'from-orange-500 to-amber-500',
      bgLight: 'from-orange-50 to-amber-50',
      textColor: 'text-orange-600',
      features: ['Shipment Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
      stats: { shipments: '156', ontime: '98.2%', savings: '$8.9K', score: '4.9/5' },
      highlights: ['Cost Optimization', 'Performance Tracking', 'Customer Satisfaction']
    },
    {
      id: 'carrier_driver',
      title: 'Driver Portal',
      description: 'Personalized driving command center with HOS tracking, route optimization, and safety monitoring',
      icon: Users,
      route: '/driver',
      bgGradient: 'from-pink-500 to-rose-500',
      bgLight: 'from-pink-50 to-rose-50',
      textColor: 'text-pink-600',
      features: ['Hours of Service', 'Route Planning', 'Load Details', 'Safety Score'],
      stats: { hours: '7.5/11', miles: '387', score: '98%', mpg: '8.9' },
      highlights: ['HOS Compliance', 'Route Optimization', 'Safety Monitoring']
    },
    {
      id: 'owner_operator',
      title: 'Owner Operator Portal',
      description: 'Independent trucking business management hub with revenue tracking and profit optimization',
      icon: Car,
      route: '/owner-operator',
      bgGradient: 'from-violet-500 to-purple-500',
      bgLight: 'from-violet-50 to-purple-50',
      textColor: 'text-violet-600',
      features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis'],
      stats: { revenue: '$4.75K', margin: '23.4%', efficiency: '94.8%', costs: '$892' },
      highlights: ['Business Intelligence', 'Profit Optimization', 'Financial Analytics']
    }
  ];

  const handlePortalSelect = (portalId: string, route: string) => {
    setSelectedRole(portalId as unknown);
    navigate(route);
  };

  const globalStats = [
    { label: 'AI Agents Active', value: '170', icon: Brain, color: 'text-purple-600' },
    { label: 'System Uptime', value: '99.8%', icon: Activity, color: 'text-emerald-600' },
    { label: 'Daily Tasks', value: '2.8K', icon: Target, color: 'text-blue-600' },
    { label: 'Success Rate', value: '98.5%', icon: Star, color: 'text-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <div className="glass-ultra border-b border-border/30">
        <div className="container mx-auto px-6 py-16 lg:py-20">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-20 w-20 lg:h-24 lg:w-24 bg-gradient-to-br from-primary to-primary-deep rounded-3xl flex items-center justify-center shadow-premium relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <Brain className="h-10 w-10 lg:h-12 lg:w-12 text-white relative z-10" />
                <div className="absolute -top-2 -right-2 h-6 w-6 lg:h-8 lg:w-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Autonomous TMS
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground font-medium mt-2">
                  AI-Powered Transportation Management System
                </p>
              </div>
            </div>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of logistics with 170 AI agents working 24/7 to optimize your transportation operations across all portals.
            </p>
            
            {/* Global Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
              {globalStats.map((stat, index) => (
                <div key={index} className="glass-subtle p-4 lg:p-6 rounded-2xl border border-border/20 text-center">
                  <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl lg:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-6">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Fully Autonomous
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm">
                <Activity className="h-4 w-4 mr-2" />
                Real-time Processing
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 text-sm">
                <Globe className="h-4 w-4 mr-2" />
                6 Portals Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Select Your Portal
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto">
            Choose your role-specific portal to access tailored tools and insights powered by autonomous AI agents working around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            const isCurrentRole = selectedRole === portal.id;
            
            return (
              <Card 
                key={portal.id} 
                className={`glass-subtle border-border/30 hover:glass-ultra transition-all duration-300 group cursor-pointer overflow-hidden ${
                  isCurrentRole ? 'ring-2 ring-primary shadow-premium' : 'hover:shadow-premium hover:-translate-y-2'
                }`}
                onClick={() => handlePortalSelect(portal.id, portal.route)}
              >
                <CardHeader className={`bg-gradient-to-br ${portal.bgLight} border-b border-border/20 p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-14 w-14 bg-gradient-to-br ${portal.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    {isCurrentRole && (
                      <Badge className="bg-primary text-primary-foreground">
                        Current
                      </Badge>
                    )}
                  </div>
                  <CardTitle className={`text-xl lg:text-2xl ${portal.textColor} group-hover:text-foreground transition-colors`}>
                    {portal.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {portal.description}
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {portal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Live Stats */}
                  <div className={`glass-subtle p-4 rounded-xl border border-border/20`}>
                    <h4 className="font-semibold text-foreground mb-3">Live Metrics:</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {Object.entries(portal.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-bold text-foreground text-base">{value}</p>
                          <p className="text-muted-foreground capitalize text-xs">{key.replace('_', ' ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {portal.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${portal.bgGradient} hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-white font-semibold py-3`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePortalSelect(portal.id, portal.route);
                    }}
                  >
                    Access Portal
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-ultra p-8 rounded-3xl border border-border/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience Autonomous Logistics?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of logistics professionals leveraging AI-powered automation for smarter, faster, and more efficient operations.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="bg-white/60 border-border/40 hover:bg-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Demo
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary-deep text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernIndex;