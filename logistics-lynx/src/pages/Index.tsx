/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ModernIndex from './ModernIndex';
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
  Zap
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: Auth state check', { isAuthenticated, isLoading });
    
    // Only redirect to login if user is not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log('Index: User not authenticated, redirecting to login');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while determining auth state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="glass-ultra flex flex-col items-center gap-6 p-12 rounded-3xl shadow-premium max-w-md mx-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 animate-pulse"></div>
          </div>
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Loading TMS Portal
            </h3>
            <p className="text-muted-foreground font-medium">Initializing your autonomous workspace...</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, don't show anything (will redirect to login)
  if (!isAuthenticated) {
    return null;
  }

  const portals = [
    {
      id: 'super_admin',
      title: 'Super Admin Portal',
      description: 'Global command center with AI-powered oversight across all portals',
      icon: Command,
      route: '/super-admin',
      bgGradient: 'from-purple-500 to-violet-500',
      bgLight: 'from-purple-50 to-violet-50',
      textColor: 'text-purple-600',
      features: ['AI Agent Management', 'Global Analytics', 'System Health', 'User Administration'],
      stats: { agents: '250', uptime: '99.8%', portals: '6/6' }
    },
    {
      id: 'carrier_admin',
      title: 'Carrier Admin Portal',
      description: 'Fleet management and operations with intelligent dispatch',
      icon: Truck,
      route: '/carrier-admin',
      bgGradient: 'from-blue-500 to-cyan-500',
      bgLight: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-600',
      features: ['Fleet Management', 'Load Operations', 'Driver Tracking', 'ELD Compliance'],
      stats: { trucks: '127', drivers: '89', loads: '47' }
    },
    {
      id: 'freight_broker_admin',
      title: 'Broker Admin Portal',
      description: 'Smart load matching and rate optimization platform',
      icon: Building2,
      route: '/broker-admin',
      bgGradient: 'from-emerald-500 to-green-500',
      bgLight: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-600',
      features: ['Load Board', 'Rate Management', 'Carrier Network', 'Margin Analysis'],
      stats: { loads: '89', margin: '15.8%', matches: '96.7%' }
    },
    {
      id: 'shipper_admin',
      title: 'Shipper Admin Portal',
      description: 'Streamlined logistics and shipment tracking dashboard',
      icon: Package,
      route: '/shipper-admin',
      bgGradient: 'from-orange-500 to-amber-500',
      bgLight: 'from-orange-50 to-amber-50',
      textColor: 'text-orange-600',
      features: ['Shipment Tracking', 'Cost Analysis', 'Performance Reports', 'Carrier Rating'],
      stats: { shipments: '156', ontime: '98.2%', savings: '$8,950' }
    },
    {
      id: 'carrier_driver',
      title: 'Driver Portal',
      description: 'Personalized driving command center with HOS tracking',
      icon: Users,
      route: '/driver',
      bgGradient: 'from-pink-500 to-rose-500',
      bgLight: 'from-pink-50 to-rose-50',
      textColor: 'text-pink-600',
      features: ['Hours of Service', 'Route Planning', 'Load Details', 'Safety Score'],
      stats: { hours: '7.5/11', miles: '387', score: '98%' }
    },
    {
      id: 'owner_operator',
      title: 'Owner Operator Portal',
      description: 'Independent trucking business management hub',
      icon: Car,
      route: '/owner-operator',
      bgGradient: 'from-violet-500 to-purple-500',
      bgLight: 'from-violet-50 to-purple-50',
      textColor: 'text-violet-600',
      features: ['Revenue Tracking', 'Expense Management', 'Load Efficiency', 'Profit Analysis'],
      stats: { revenue: '$4,750', margin: '23.4%', efficiency: '94.8%' }
    }
  ];

  const handlePortalSelect = (portalId: string, route: string) => {
    setSelectedRole(portalId as unknown);
    navigate(route);
  };

  return <ModernIndex />;
};

export default Index;
