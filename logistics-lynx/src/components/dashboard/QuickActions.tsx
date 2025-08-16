/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Building2, 
  Package, 
  Target, 
  BarChart3, 
  Users,
  Truck,
  Settings,
  PhoneCall,
  Wrench
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function QuickActions() {
  const navigate = useNavigate();
  const { selectedRole } = useAuth();

  // Role-specific quick actions
  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'Get Rate',
        description: 'Get instant freight quotes',
        icon: DollarSign,
        color: 'bg-blue-500 hover:bg-blue-600',
        onClick: () => navigate('/rates?intent=new-quote')
      },
      {
        title: 'Find Partner',
        description: 'Search carrier directory',
        icon: Building2,
        color: 'bg-emerald-500 hover:bg-emerald-600',
        onClick: () => navigate('/directory?intent=search')
      }
    ];

    const roleActions = {
      super_admin: [
        {
          title: 'Create Shipment',
          description: 'New shipment order',
          icon: Package,
          color: 'bg-purple-500 hover:bg-purple-600',
          onClick: () => navigate('/shipments/new')
        },
        {
          title: 'User Management',
          description: 'Manage system users',
          icon: Users,
          color: 'bg-orange-500 hover:bg-orange-600',
          onClick: () => navigate('/settings')
        }
      ],
      carrier_admin: [
        {
          title: 'Create Load',
          description: 'Post new load',
          icon: Package,
          color: 'bg-blue-500 hover:bg-blue-600',
          onClick: () => navigate('/loadboard/new')
        },
        {
          title: 'Fleet Management',
          description: 'Manage vehicles',
          icon: Truck,
          color: 'bg-green-500 hover:bg-green-600',
          onClick: () => navigate('/assets')
        }
      ],
      freight_broker_admin: [
        {
          title: 'Post Load',
          description: 'Create load posting',
          icon: Target,
          color: 'bg-green-500 hover:bg-green-600',
          onClick: () => navigate('/loadboard/post')
        },
        {
          title: 'Find Carriers',
          description: 'Search carrier network',
          icon: Users,
          color: 'bg-blue-500 hover:bg-blue-600',
          onClick: () => navigate('/networks?tab=carriers')
        }
      ],
      shipper_admin: [
        {
          title: 'Book Shipment',
          description: 'Create new shipment',
          icon: Package,
          color: 'bg-orange-500 hover:bg-orange-600',
          onClick: () => navigate('/shipments/new')
        },
        {
          title: 'Track Delivery',
          description: 'Real-time tracking',
          icon: Target,
          color: 'bg-purple-500 hover:bg-purple-600',
          onClick: () => navigate('/shipments/tracking')
        }
      ],
      carrier_driver: [
        {
          title: 'My Routes',
          description: 'View assigned routes',
          icon: Target,
          color: 'bg-blue-500 hover:bg-blue-600',
          onClick: () => navigate('/driver/routes')
        },
        {
          title: 'Vehicle Status',
          description: 'Check vehicle health',
          icon: Truck,
          color: 'bg-green-500 hover:bg-green-600',
          onClick: () => navigate('/driver/vehicle')
        }
      ],
      owner_operator: [
        {
          title: 'Find Loads',
          description: 'Browse available loads',
          icon: Target,
          color: 'bg-blue-500 hover:bg-blue-600',
          onClick: () => navigate('/loadboard')
        },
        {
          title: 'Financial Review',
          description: 'View earnings',
          icon: DollarSign,
          color: 'bg-green-500 hover:bg-green-600',
          onClick: () => navigate('/financials')
        }
      ]
    };

    return [...baseActions, ...(roleActions[selectedRole] || [])];
  };

  const quickActions = getQuickActions();

  return (
    <Card className="bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-md border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          AI-powered shortcuts for efficient workflow management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={action.onClick}
            >
              <div className={`h-8 w-8 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
