import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
interface AuditItem {
  id: string;
  title: string;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  description: string;
  lastChecked: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const SecurityAudit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [auditItems, setAuditItems] = useState<AuditItem[]>([]);

  useEffect(() => {
    // Simulate loading audit data
    const loadAuditData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuditItems([
        {
          id: '1',
          title: 'SSL Certificate Validation',
          status: 'passed',
          description: 'All SSL certificates are valid and properly configured',
          lastChecked: '2024-01-15 10:30:00',
          severity: 'high'
        },
        {
          id: '2',
          title: 'Password Policy Compliance',
          status: 'warning',
          description: 'Some users have weak passwords that need to be updated',
          lastChecked: '2024-01-15 09:15:00',
          severity: 'medium'
        },
        {
          id: '3',
          title: 'Database Encryption',
          status: 'passed',
          description: 'All sensitive data is properly encrypted at rest',
          lastChecked: '2024-01-15 08:45:00',
          severity: 'critical'
        },
        {
          id: '4',
          title: 'API Rate Limiting',
          status: 'failed',
          description: 'Rate limiting is not properly configured for some endpoints',
          lastChecked: '2024-01-15 07:20:00',
          severity: 'high'
        },
        {
          id: '5',
          title: 'Access Log Monitoring',
          status: 'pending',
          description: 'Access logs are being analyzed for suspicious activity',
          lastChecked: '2024-01-15 06:00:00',
          severity: 'medium'
        }
      ]);
      
      setIsLoading(false);
    };

    loadAuditData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: 'success',
      failed: 'danger',
      warning: 'default',
      pending: 'default'
    } as const;

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${variants[status as keyof typeof variants] || variants.warning}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Audit</h1>
          <p className="text-gray-600">Comprehensive security assessment and monitoring</p>
        </div>
        <ResponsiveCard>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading security audit data...</span>
          </div>
        </ResponsiveCard>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Audit</h1>
        <p className="text-gray-600">Comprehensive security assessment and monitoring</p>
      </div>

      <div className="grid gap-6">
        {/* Audit Summary */}
        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Summary</h2>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Run New Audit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {auditItems.filter(item => item.status === 'passed').length}
              </div>
              <div className="text-sm text-green-600">Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {auditItems.filter(item => item.status === 'failed').length}
              </div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {auditItems.filter(item => item.status === 'warning').length}
              </div>
              <div className="text-sm text-yellow-600">Warnings</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {auditItems.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-sm text-blue-600">Pending</div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Audit Items */}
        <ResponsiveCard>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Checks</h2>
          <div className="space-y-4">
            {auditItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        {getStatusBadge(item.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(item.severity)}`}>
                          {item.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-xs text-gray-500">Last checked: {item.lastChecked}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {item.status === 'failed' && (
                      <Button size="sm" variant="outline">
                        Fix Issue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default SecurityAudit;