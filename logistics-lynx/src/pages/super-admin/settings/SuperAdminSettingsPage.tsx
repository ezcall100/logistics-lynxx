import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Building, CreditCard, Calculator, FileText, Folder, Plug, Crown, Shield } from 'lucide-react';

// Import all setting components
import GeneralSettings from './components/GeneralSettings';
import UserManagement from './components/UserManagement';
import CompanySettings from './components/CompanySettings';
import PayrollSettings from './components/PayrollSettings';
import AccountingSettings from './components/AccountingSettings';
import TemplatesAndDocuments from './components/TemplatesAndDocuments';
import DocumentSettings from './components/DocumentSettings';
import ApiAndEdiSettings from './components/ApiAndEdiSettings';
const SuperAdminSettingsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('general');

  // Handle URL tab parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && settingsSections.some(section => section.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  const settingsSections = [{
    id: 'general',
    label: 'General',
    icon: Settings,
    description: 'Core platform configuration',
    component: GeneralSettings
  }, {
    id: 'users',
    label: 'User Management',
    icon: Users,
    description: 'Manage users, roles & permissions',
    component: UserManagement
  }, {
    id: 'company',
    label: 'Company',
    icon: Building,
    description: 'Legal entity & locations',
    component: CompanySettings
  }, {
    id: 'payroll',
    label: 'Payroll',
    icon: CreditCard,
    description: 'Employee compensation & benefits',
    component: PayrollSettings,
    badge: 'Enhanced'
  }, {
    id: 'accounting',
    label: 'Accounting',
    icon: Calculator,
    description: 'Financial settings & tax config',
    component: AccountingSettings
  }, {
    id: 'templates',
    label: 'Templates',
    icon: FileText,
    description: 'Document templates & contracts',
    component: TemplatesAndDocuments
  }, {
    id: 'documents',
    label: 'Document Settings',
    icon: Folder,
    description: 'Storage policies & access control',
    component: DocumentSettings
  }, {
    id: 'api',
    label: 'API & EDI',
    icon: Plug,
    description: 'Integrations & data exchange',
    component: ApiAndEdiSettings
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Super Admin Settings
              </h1>
              <p className="text-muted-foreground">
                Complete system configuration for Trans Bot AI
              </p>
            </div>
          </div>
        </div>

        {/* Settings Interface */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Sticky Tab Header */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b">
              <CardHeader className="pb-4">
                
                
                {/* Active Tab Description */}
                <div className="mt-4">
                  {settingsSections.map(section => activeTab === section.id ? <div key={section.id} className="flex items-center gap-3">
                        <section.icon className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-xl">{section.label} Settings</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div> : null)}
                </div>
              </CardHeader>
            </div>

            {/* Tab Content */}
            <CardContent className="p-6">
              {settingsSections.map(section => {
              const ComponentToRender = section.component;
              return <TabsContent key={section.id} value={section.id} className="mt-0 space-y-6">
                    <ComponentToRender />
                  </TabsContent>;
            })}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>;
};
export default SuperAdminSettingsPage;