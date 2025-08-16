/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Package, Truck, Ship, Plane, Train, Activity, MapPin, BarChart3, FileText, Settings, Bell, Search, Plus, ChevronRight, Container, Anchor, Car, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ShipmentsDashboard from '@/components/shipments/ShipmentsDashboard';
import TruckloadTransport from '@/components/shipments/TruckloadTransport';
import LTLTransport from '@/components/shipments/LTLTransport';
import IntermodalTransport from '@/components/shipments/IntermodalTransport';
import DrayageTransport from '@/components/shipments/DrayageTransport';
import AutoTransport from '@/components/shipments/AutoTransport';
import GroundTransport from '@/components/shipments/GroundTransport';
import OceanFreight from '@/components/shipments/OceanFreight';
import AirFreight from '@/components/shipments/AirFreight';
import RailFreight from '@/components/shipments/RailFreight';
import ActiveShipments from '@/components/shipments/ActiveShipments';
import ShipmentTracking from '@/components/shipments/ShipmentTracking';
import ShipmentAnalytics from '@/components/shipments/ShipmentAnalytics';
import ShipmentDocuments from '@/components/shipments/ShipmentDocuments';
import ShipmentSettings from '@/components/shipments/ShipmentSettings';

interface TabItem {
  id: string;
  title: string;
  icon: React.ComponentType<unknown>;
  path: string;
  description: string;
  badge?: string;
  color: string;
}

const transportModes: TabItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Activity,
    path: '/carrier-admin/shipments-management',
    description: 'Overview & KPIs',
    badge: 'Hot',
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'truckload',
    title: 'Truckload (TL)',
    icon: Truck,
    path: '/carrier-admin/shipments-management/truckload',
    description: 'Full Truckload Freight',
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'ltl',
    title: 'LTL',
    icon: Boxes,
    path: '/carrier-admin/shipments-management/ltl',
    description: 'Less Than Truckload',
    color: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'intermodal',
    title: 'Intermodal',
    icon: Container,
    path: '/carrier-admin/shipments-management/intermodal',
    description: 'Rail + Drayage',
    color: 'text-teal-600 bg-teal-50 border-teal-200'
  },
  {
    id: 'drayage',
    title: 'Drayage',
    icon: Anchor,
    path: '/carrier-admin/shipments-management/drayage',
    description: 'Port & Terminal',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    id: 'auto',
    title: 'Auto Transport',
    icon: Car,
    path: '/carrier-admin/shipments-management/auto',
    description: 'Vehicle Shipping',
    color: 'text-red-600 bg-red-50 border-red-200'
  },
  {
    id: 'ocean',
    title: 'Ocean',
    icon: Ship,
    path: '/carrier-admin/shipments-management/ocean',
    description: 'International Shipping',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
  },
  {
    id: 'air',
    title: 'Air',
    icon: Plane,
    path: '/carrier-admin/shipments-management/air',
    description: 'Express Air Cargo',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'rail',
    title: 'Rail',
    icon: Train,
    path: '/carrier-admin/shipments-management/rail',
    description: 'Cost-Effective Rail',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  }
];

const quickActions: TabItem[] = [
  {
    id: 'active',
    title: 'Active',
    icon: Package,
    path: '/carrier-admin/shipments-management/active',
    description: 'Current Shipments',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    id: 'tracking',
    title: 'Tracking',
    icon: MapPin,
    path: '/carrier-admin/shipments-management/tracking',
    description: 'Live Monitoring',
    color: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    path: '/carrier-admin/shipments-management/analytics',
    description: 'Reports & Insights',
    color: 'text-pink-600 bg-pink-50 border-pink-200'
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    path: '/carrier-admin/shipments-management/documents',
    description: 'BOL, POD, Invoices',
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  }
];

const ShipmentsManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTab = () => {
    const allTabs = [...transportModes, ...quickActions];
    return allTabs.find(tab => 
      currentPath === tab.path || 
      (tab.path !== '/carrier-admin/shipments-management' && currentPath.startsWith(tab.path))
    ) || transportModes[0];
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Modern Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Title and Breadcrumb */}
          <div className="mb-4">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span>Carrier Admin</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>Shipments Hub</span>
              {activeTab.id !== 'dashboard' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="text-foreground font-medium">{activeTab.title}</span>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
                  <div className={cn("p-3 rounded-xl border", activeTab.color)}>
                    {React.createElement(activeTab.icon, { className: "h-7 w-7" })}
                  </div>
                  <div>
                    <span>Shipments Hub</span>
                    {activeTab.id !== 'dashboard' && (
                      <span className="text-xl text-muted-foreground ml-2">/ {activeTab.title}</span>
                    )}
                  </div>
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  {activeTab.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
              </div>
            </div>
          </div>

          {/* Transportation Mode Tabs */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Transportation Modes</h3>
              <div className="flex flex-wrap gap-2">
                {transportModes.map((mode) => {
                  const isActive = currentPath === mode.path || 
                    (mode.path !== '/carrier-admin/shipments-management' && currentPath.startsWith(mode.path));
                  
                  return (
                    <button
                      key={mode.id}
                      onClick={() => navigate(mode.path)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-md group",
                        isActive 
                          ? `${mode.color} shadow-sm ring-1 ring-current/20` 
                          : "bg-white/50 border-border/50 hover:bg-white/80 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <mode.icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "" : "group-hover:text-primary"
                      )} />
                      <div className="text-left">
                        <div className="font-medium text-sm">{mode.title}</div>
                        <div className="text-xs opacity-75">{mode.description}</div>
                      </div>
                      {mode.badge && (
                        <Badge variant="secondary" className="text-xs">{mode.badge}</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Access</h3>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => {
                  const isActive = currentPath === action.path;
                  
                  return (
                    <button
                      key={action.id}
                      onClick={() => navigate(action.path)}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 group",
                        isActive 
                          ? `${action.color} shadow-sm font-medium` 
                          : "bg-white/50 border-border/50 hover:bg-white/80 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <action.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "" : "group-hover:text-primary"
                      )} />
                      <span className="text-sm">{action.title}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={() => navigate('/carrier-admin/shipments-management/settings')}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 group",
                    currentPath === '/carrier-admin/shipments-management/settings'
                      ? "text-gray-600 bg-gray-50 border-gray-200 shadow-sm font-medium"
                      : "bg-white/50 border-border/50 hover:bg-white/80 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<ShipmentsDashboard />} />
          <Route path="/truckload" element={<TruckloadTransport />} />
          <Route path="/ltl" element={<LTLTransport />} />
          <Route path="/intermodal" element={<IntermodalTransport />} />
          <Route path="/drayage" element={<DrayageTransport />} />
          <Route path="/auto" element={<AutoTransport />} />
          <Route path="/ground" element={<GroundTransport />} />
          <Route path="/ocean" element={<OceanFreight />} />
          <Route path="/air" element={<AirFreight />} />
          <Route path="/rail" element={<RailFreight />} />
          <Route path="/active" element={<ActiveShipments />} />
          <Route path="/tracking" element={<ShipmentTracking />} />
          <Route path="/analytics" element={<ShipmentAnalytics />} />
          <Route path="/documents" element={<ShipmentDocuments />} />
          <Route path="/settings" element={<ShipmentSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default ShipmentsManagementPage;