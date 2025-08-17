import React, { ReactNode, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Lock, Upgrade, Zap } from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  fallback?: ReactNode;
  children: ReactNode;
  showUpgradeCTA?: boolean;
  planTier?: string;
  addon?: string;
}

interface UpgradeCTAProps {
  feature: string;
  planTier?: string;
  addon?: string;
}

const UpgradeCTA: React.FC<UpgradeCTAProps> = ({ feature, planTier, addon }) => {
  const getFeatureDisplayName = (featureKey: string) => {
    const featureNames: Record<string, string> = {
      'loads.ocean': 'Ocean Freight',
      'loads.air': 'Air Freight',
      'loads.intermodal': 'Intermodal',
      'analytics.advanced': 'Advanced Analytics',
      'autonomous.ai': 'Autonomous AI',
      'edi.x12': 'EDI X12 Integration',
      'edi.edifact': 'EDI EDIFACT Integration',
      'load.bulk': 'Bulk Load Operations',
      'rate.bulk': 'Bulk Rate Operations',
      'analytics.export': 'Analytics Export',
      'invoice.export': 'Invoice Export',
      'payment.export': 'Payment Export'
    };
    return featureNames[featureKey] || featureKey.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getPlanDisplayName = (plan?: string) => {
    const planNames: Record<string, string> = {
      'pro': 'Pro',
      'enterprise': 'Enterprise'
    };
    return planNames[plan || ''] || plan || 'Upgraded';
  };

  return (
    <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Lock className="h-6 w-6 text-gray-600" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {getFeatureDisplayName(feature)} Not Available
        </CardTitle>
        <CardDescription className="text-gray-600">
          This feature requires a {getPlanDisplayName(planTier)} plan
          {addon && ` with ${addon} add-on`}.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">
            <Zap className="mr-1 h-3 w-3" />
            Premium Feature
          </Badge>
        </div>
        <Button className="w-full" onClick={() => window.open('/pricing', '_blank')}>
          <Upgrade className="mr-2 h-4 w-4" />
          Upgrade Plan
        </Button>
        <p className="mt-2 text-xs text-gray-500">
          Contact sales for custom enterprise plans
        </p>
      </CardContent>
    </Card>
  );
};

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  fallback,
  children,
  showUpgradeCTA = true,
  planTier,
  addon
}) => {
  const [hasEntitlement, setHasEntitlement] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkEntitlement = async () => {
      try {
        // Get current user and org
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setHasEntitlement(false);
          setLoading(false);
          return;
        }

        // Get user's org membership
        const { data: membership } = await supabase
          .from('org_memberships')
          .select('org_id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (!membership?.org_id) {
          setHasEntitlement(false);
          setLoading(false);
          return;
        }

        setOrgId(membership.org_id);

        // Check entitlement
        const { data: hasEntitlement } = await supabase.rpc('has_entitlement', {
          p_org_id: membership.org_id,
          p_feature: feature
        });

        setHasEntitlement(hasEntitlement || false);
      } catch (error) {
        console.error('Error checking entitlement:', error);
        setHasEntitlement(false);
      } finally {
        setLoading(false);
      }
    };

    checkEntitlement();
  }, [feature, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!hasEntitlement) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (showUpgradeCTA) {
      return <UpgradeCTA feature={feature} planTier={planTier} addon={addon} />;
    }
    
    return null;
  }

  return <>{children}</>;
};

// Convenience components for common features
export const OceanFreightGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="loads.ocean" planTier="enterprise" addon="ocean" fallback={fallback}>
    {children}
  </FeatureGate>
);

export const AirFreightGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="loads.air" planTier="enterprise" addon="air" fallback={fallback}>
    {children}
  </FeatureGate>
);

export const AdvancedAnalyticsGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="analytics.advanced" planTier="enterprise" fallback={fallback}>
    {children}
  </FeatureGate>
);

export const AutonomousAIGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="autonomous.ai" planTier="enterprise" fallback={fallback}>
    {children}
  </FeatureGate>
);

export const BulkOperationsGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="load.bulk" planTier="pro" fallback={fallback}>
    {children}
  </FeatureGate>
);

export const ExportGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <FeatureGate feature="analytics.export" planTier="pro" fallback={fallback}>
    {children}
  </FeatureGate>
);
