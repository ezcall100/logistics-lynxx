import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  Building2, 
  Truck, 
  Package,
  UserCheck,
  Settings
} from 'lucide-react';

interface PortalStatus {
  name: string;
  role: string;
  completionPercentage: number;
  missingFeatures: string[];
  implementedFeatures: string[];
  criticalIssues: string[];
  priority: 'high' | 'medium' | 'low';
}

export const PortalAnalysis = () => {
  const [portalStatuses, setPortalStatuses] = useState<PortalStatus[]>([]);
  const [selectedPortal, setSelectedPortal] = useState<string>('');

  useEffect(() => {
    // Initialize portal analysis data
    const initialStatuses: PortalStatus[] = [
      {
        name: 'Super Admin Dashboard',
        role: 'super_admin',
        completionPercentage: 85,
        missingFeatures: [
          'User Management CRUD operations',
          'Company Settings management',
          'Payroll Settings integration',
          'Template & Document management',
          'API Keys management interface',
          'System health monitoring dashboard'
        ],
        implementedFeatures: [
          'Dashboard overview',
          'CRM system',
          'Networks management',
          'Workers management',
          'Financials overview',
          'API Dashboard basic view',
          'Marketplace integration',
          'Reports system'
        ],
        criticalIssues: [
          'Missing user creation/editing forms',
          'No company settings persistence',
          'API keys not manageable via UI'
        ],
        priority: 'high'
      },
      {
        name: 'Carrier Admin Dashboard',
        role: 'carrier_admin',
        completionPercentage: 70,
        missingFeatures: [
          'Fleet management CRUD operations',
          'Driver assignment system',
          'Vehicle tracking integration',
          'Compliance monitoring',
          'Fuel audit implementation',
          'EDI integration forms',
          'Quote generation system'
        ],
        implementedFeatures: [
          'Dashboard overview',
          'Basic shipments view',
          'Load board access',
          'Assets overview',
          'Networks basic view',
          'Documents upload',
          'Reports generation'
        ],
        criticalIssues: [
          'Driver assignment not functional',
          'Fleet tracking data not connected',
          'Compliance forms incomplete'
        ],
        priority: 'high'
      },
      {
        name: 'Broker Admin Dashboard',
        role: 'freight_broker_admin',
        completionPercentage: 75,
        missingFeatures: [
          'Load matching algorithm implementation',
          'Margin analysis tools',
          'Customer relationship automation',
          'Quote comparison system',
          'EDI matching interface',
          'Partner management system'
        ],
        implementedFeatures: [
          'Dashboard overview',
          'Quotes basic management',
          'Shipments tracking',
          'Load board posting',
          'Networks management',
          'Documents handling',
          'Basic financials'
        ],
        criticalIssues: [
          'Load matching not automated',
          'Margin calculations missing',
          'Partner EDI not integrated'
        ],
        priority: 'high'
      },
      {
        name: 'Shipper Admin Dashboard',
        role: 'shipper_admin',
        completionPercentage: 80,
        missingFeatures: [
          'Shipment creation wizard',
          'Carrier selection automation',
          'Cost forecasting tools',
          'Delivery tracking integration',
          'Invoice management system'
        ],
        implementedFeatures: [
          'Dashboard overview',
          'Shipments basic view',
          'Load board posting',
          'Networks management',
          'Documents upload',
          'Basic quotes system',
          'Reports access'
        ],
        criticalIssues: [
          'Shipment wizard incomplete',
          'Carrier selection manual only',
          'Cost forecasting missing'
        ],
        priority: 'medium'
      },
      {
        name: 'Driver Dashboard',
        role: 'carrier_driver',
        completionPercentage: 60,
        missingFeatures: [
          'Route optimization system',
          'Hours of service tracking',
          'Mobile-responsive design',
          'Communication system',
          'Document photo upload',
          'Dispatch integration',
          'GPS tracking integration'
        ],
        implementedFeatures: [
          'Basic dashboard',
          'Shipments view',
          'Assets overview',
          'Documents access',
          'Reports view'
        ],
        criticalIssues: [
          'Mobile experience poor',
          'HOS tracking not implemented',
          'Real-time communication missing'
        ],
        priority: 'high'
      },
      {
        name: 'Owner Operator Dashboard',
        role: 'owner_operator',
        completionPercentage: 65,
        missingFeatures: [
          'Financial management tools',
          'Expense tracking system',
          'Load negotiation interface',
          'Maintenance scheduling',
          'Market analytics dashboard',
          'Invoice generation'
        ],
        implementedFeatures: [
          'Basic dashboard',
          'Shipments overview',
          'Assets management',
          'Load board access',
          'Documents handling'
        ],
        criticalIssues: [
          'Financial tools missing',
          'Expense tracking not functional',
          'Market analytics not implemented'
        ],
        priority: 'medium'
      }
    ];

    setPortalStatuses(initialStatuses);
    setSelectedPortal(initialStatuses[0].role);
  }, []);

  const getOverallCompletion = () => {
    if (portalStatuses.length === 0) return 0;
    return Math.round(
      portalStatuses.reduce((sum, portal) => sum + portal.completionPercentage, 0) / 
      portalStatuses.length
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPortalIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Settings;
      case 'carrier_admin': return Truck;
      case 'freight_broker_admin': return Building2;
      case 'shipper_admin': return Package;
      case 'carrier_driver': return UserCheck;
      case 'owner_operator': return Users;
      default: return Settings;
    }
  };

  const selectedPortalData = portalStatuses.find(p => p.role === selectedPortal);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Portal Completion Analysis</h2>
          <p className="text-muted-foreground">
            Autonomous agent analysis of all TMS portals
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{getOverallCompletion()}%</div>
          <div className="text-sm text-muted-foreground">Overall Complete</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            System-Wide Completion Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={getOverallCompletion()} className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {portalStatuses.filter(p => p.completionPercentage >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">Near Complete (80%+)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {portalStatuses.filter(p => p.completionPercentage >= 60 && p.completionPercentage < 80).length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress (60-80%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {portalStatuses.filter(p => p.completionPercentage < 60).length}
                </div>
                <div className="text-sm text-muted-foreground">Needs Work (&lt;60%)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portalStatuses.map((portal) => {
          const Icon = getPortalIcon(portal.role);
          return (
            <Card 
              key={portal.role}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedPortal === portal.role ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPortal(portal.role)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5" />
                  <Badge className={getPriorityColor(portal.priority)}>
                    {portal.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{portal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span>{portal.completionPercentage}%</span>
                    </div>
                    <Progress value={portal.completionPercentage} />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Missing Features</span>
                    <span className="text-red-600">{portal.missingFeatures.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Critical Issues</span>
                    <span className="text-orange-600">{portal.criticalIssues.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Portal Analysis */}
      {selectedPortalData && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedPortalData.name} - Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="missing" className="space-y-4">
              <TabsList>
                <TabsTrigger value="missing">Missing Features</TabsTrigger>
                <TabsTrigger value="implemented">Implemented</TabsTrigger>
                <TabsTrigger value="issues">Critical Issues</TabsTrigger>
              </TabsList>

              <TabsContent value="missing" className="space-y-3">
                {selectedPortalData.missingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="implemented" className="space-y-3">
                {selectedPortalData.implementedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="issues" className="space-y-3">
                {selectedPortalData.criticalIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>{issue}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
