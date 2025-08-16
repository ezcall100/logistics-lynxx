/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagementTab from '@/components/settings/UserManagementTab';
import GeneralSettingsTab from '@/components/settings/GeneralSettingsTab';
import CompanySettingsTab from '@/components/settings/CompanySettingsTab';
import PayrollSettingsTab from '@/components/settings/PayrollSettingsTab';
import TemplatesDocumentsTab from '@/components/settings/TemplatesDocumentsTab';
import { Settings, Users, Building2, DollarSign, FileText } from 'lucide-react';

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (currentPath.includes('/settings/user-management')) return 'user-management';
    if (currentPath.includes('/settings/company')) return 'company';
    if (currentPath.includes('/settings/payroll')) return 'payroll';
    if (currentPath.includes('/settings/templates')) return 'templates';
    return 'general';
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case 'general':
        navigate('/settings');
        break;
      case 'user-management':
        navigate('/settings/user-management');
        break;
      case 'company':
        navigate('/settings/company');
        break;
      case 'payroll':
        navigate('/settings/payroll');
        break;
      case 'templates':
        navigate('/settings/templates');
        break;
      default:
        navigate('/settings');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Autonomous Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage system configuration, user access, and organizational settings
            </p>
          </div>
        </div>

        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="user-management" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Payroll</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <GeneralSettingsTab />
          </TabsContent>

          <TabsContent value="user-management" className="space-y-6">
            <UserManagementTab />
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <CompanySettingsTab />
          </TabsContent>

          <TabsContent value="payroll" className="space-y-6">
            <PayrollSettingsTab />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <TemplatesDocumentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
