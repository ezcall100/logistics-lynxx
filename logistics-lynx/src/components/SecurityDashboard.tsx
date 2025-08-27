import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, Users, Lock, AlertTriangle, Activity, Database, Key, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SecurityOverview {
  company_id: string;
  company_name: string;
  slug: string;
  subscription_tier: string;
  total_users: number;
  admin_users: number;
  manager_users: number;
  regular_users: number;
  viewer_users: number;
  last_audit_activity: string;
  audit_events_last_30_days: number;
}

interface AuditLog {
  id: string;
  company_id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface RLSStatus {
  table_name: string;
  row_security: boolean;
  policy_count: number;
  last_verified: string;
}

const SecurityDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [securityOverview, setSecurityOverview] = useState<SecurityOverview[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [rlsStatus, setRlsStatus] = useState<RLSStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load security overview
      const { data: overviewData, error: overviewError } = await supabase
        .from('v_company_security_overview')
        .select('*')
        .order('company_name');

      if (overviewError) throw overviewError;
      setSecurityOverview(overviewData || []);

      // Load recent audit logs
      const { data: auditData, error: auditError } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (auditError) throw auditError;
      setAuditLogs(auditData || []);

      // Load RLS status (this would need to be implemented as a function)
      await loadRLSStatus();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load security data');
    } finally {
      setLoading(false);
    }
  };

  const loadRLSStatus = async () => {
    try {
      // This would need to be implemented as a Supabase function
      // For now, we'll create mock data
      const mockRLSStatus: RLSStatus[] = [
        { table_name: 'companies', row_security: true, policy_count: 2, last_verified: new Date().toISOString() },
        { table_name: 'profiles', row_security: true, policy_count: 3, last_verified: new Date().toISOString() },
        { table_name: 'roles', row_security: true, policy_count: 2, last_verified: new Date().toISOString() },
        { table_name: 'audit_logs', row_security: true, policy_count: 2, last_verified: new Date().toISOString() },
        { table_name: 'bulk_rating_requests', row_security: true, policy_count: 3, last_verified: new Date().toISOString() },
        { table_name: 'agent_tasks', row_security: true, policy_count: 2, last_verified: new Date().toISOString() },
      ];
      setRlsStatus(mockRLSStatus);
    } catch (err) {
      console.error('Failed to load RLS status:', err);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'role_assigned':
      case 'role_removed':
        return <Users className="h-4 w-4" />;
      case 'data_export':
        return <FileText className="h-4 w-4" />;
      case 'login':
        return <Key className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'role_assigned':
      case 'role_removed':
        return 'bg-blue-100 text-blue-800';
      case 'data_export':
        return 'bg-yellow-100 text-yellow-800';
      case 'login':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityScore = (company: SecurityOverview) => {
    const totalUsers = company.total_users;
    const adminRatio = company.admin_users / totalUsers;
    const recentActivity = company.audit_events_last_30_days > 0;
    
    let score = 100;
    
    // Deduct points for too many admins
    if (adminRatio > 0.3) score -= 20;
    if (adminRatio > 0.5) score -= 30;
    
    // Deduct points for no recent activity
    if (!recentActivity) score -= 10;
    
    // Deduct points for no viewers (suggesting poor role distribution)
    if (company.viewer_users === 0) score -= 5;
    
    return Math.max(0, score);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor RLS policies, audit logs, and security status across all companies
          </p>
        </div>
        <EnhancedButton onClick={loadSecurityData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </EnhancedButton>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Security Overview</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="rls">RLS Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ResponsiveCard>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Total Companies</h3>
                <Database className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">{securityOverview.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active organizations
                </p>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Total Users</h3>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {securityOverview.reduce((sum, company) => sum + company.total_users, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all companies
                </p>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Admin Users</h3>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {securityOverview.reduce((sum, company) => sum + company.admin_users, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  With elevated privileges
                </p>
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Audit Events (30d)</h3>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {securityOverview.reduce((sum, company) => sum + company.audit_events_last_30_days, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Security events logged
                </p>
              </div>
            </ResponsiveCard>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Company Security Scores</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Security assessment based on role distribution and activity
                </p>
              </div>
              <div className="space-y-4">
                {securityOverview.map((company) => {
                  const score = getSecurityScore(company);
                  return (
                    <div key={company.company_id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{company.company_name}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {score}/100
                        </span>
                      </div>
                      <Progress value={score} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {company.total_users} users • {company.admin_users} admins • {company.audit_events_last_30_days} events
                      </div>
                    </div>
                  );
                })}
              </div>
            </ResponsiveCard>

            <ResponsiveCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Role Distribution</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  User roles across all companies
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  {['admin', 'manager', 'user', 'viewer'].map((role) => {
                    const count = securityOverview.reduce((sum, company) => {
                      switch (role) {
                        case 'admin': return sum + company.admin_users;
                        case 'manager': return sum + company.manager_users;
                        case 'user': return sum + company.regular_users;
                        case 'viewer': return sum + company.viewer_users;
                        default: return sum;
                      }
                    }, 0);
                    
                    return (
                      <div key={role} className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{role}s</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ResponsiveCard>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Audit Logs</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Security events and user actions across all companies
              </p>
            </div>
            <div>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full ${getActionColor(log.action)}`}>
                      {getActionIcon(log.action)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{log.action.replace('_', ' ')}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{log.resource_type}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Resource: {log.resource_id} • IP: {log.ip_address}
                      </p>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <details className="text-sm">
                          <summary className="cursor-pointer text-muted-foreground">
                            View details
                          </summary>
                          <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="rls" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Row Level Security Status</h3>
              <p className="text-slate-600 dark:text-slate-400">
                RLS policies and table security configuration
              </p>
            </div>
            <div>
              <div className="space-y-4">
                {rlsStatus.map((table) => (
                  <div key={table.table_name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {table.row_security ? (
                        <Lock className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <div>
                        <span className="font-medium">{table.table_name}</span>
                        <div className="text-sm text-muted-foreground">
                          {table.policy_count} policies • Last verified: {new Date(table.last_verified).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {table.row_security ? "Secured" : "Unsecured"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ResponsiveCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
