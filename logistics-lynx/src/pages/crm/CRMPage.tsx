/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CRMDashboard from '@/components/crm/CRMDashboard';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react';

const CRMPage = () => {
  const { selectedRole, isAuthenticated } = useAuth();

  // Check if user has CRM access based on role
  const hasCRMAccess = () => {
    const crmRoles = ['super_admin', 'freight_broker_admin', 'shipper_admin', 'carrier_admin'];
    return crmRoles.includes(selectedRole);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
          <Card className="p-8 max-w-md mx-auto text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">Please log in to access the CRM system.</p>
            <Button>
              Log In
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!hasCRMAccess()) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
          <Card className="p-8 max-w-md mx-auto text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-600" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground mb-4">
              Your current role ({selectedRole.replace('_', ' ')}) does not have access to the CRM system.
            </p>
            <Button variant="outline">
              Contact Administrator
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <CRMDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default CRMPage;
