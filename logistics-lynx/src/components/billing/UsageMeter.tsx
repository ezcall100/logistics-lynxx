/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  Zap,
  Info,
  ExternalLink
} from 'lucide-react';

interface UsageMetric {
  feature: string;
  used: number;
  limit: number;
  unit: string;
  percentage: number;
  isOverage: boolean;
  isNearLimit: boolean;
}

interface UsageMeterProps {
  companyId: string;
  subscriptionTier: 'starter' | 'pro' | 'enterprise';
}

export function UsageMeter({ companyId, subscriptionTier }: UsageMeterProps) {
  const [usageMetrics, setUsageMetrics] = useState<UsageMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  // Mock usage data - replace with actual API call
  const mockUsageData = useMemo<UsageMetric[]>(() => [
    {
      feature: 'quotes',
      used: 8500,
      limit: 10000,
      unit: 'quotes/month',
      percentage: 85,
      isOverage: false,
      isNearLimit: true
    },
    {
      feature: 'bulk_jobs',
      used: 120,
      limit: 100,
      unit: 'jobs/day',
      percentage: 120,
      isOverage: true,
      isNearLimit: false
    },
    {
      feature: 'directory_invites',
      used: 45,
      limit: 50,
      unit: 'invites/month',
      percentage: 90,
      isOverage: false,
      isNearLimit: true
    }
  ], []);

  useEffect(() => {
    const fetchUsageData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/usage/${companyId}`);
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsageMetrics(mockUsageData);
      } catch (error) {
        console.error('Failed to fetch usage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageData();
  }, [companyId, mockUsageData]);

  const hasOverage = usageMetrics.some(metric => metric.isOverage);
  const hasNearLimit = usageMetrics.some(metric => metric.isNearLimit && !metric.isOverage);

  const getProgressColor = (percentage: number, isOverage: boolean) => {
    if (isOverage) return 'bg-red-500';
    if (percentage >= 90) return 'bg-yellow-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getTierLimits = () => {
    switch (subscriptionTier) {
      case 'starter':
        return {
          quotes: '10,000',
          bulk_jobs: '100',
          directory_invites: '50',
          price: '$99/month'
        };
      case 'pro':
        return {
          quotes: '50,000',
          bulk_jobs: '500',
          directory_invites: '200',
          price: '$299/month'
        };
      case 'enterprise':
        return {
          quotes: 'Unlimited',
          bulk_jobs: 'Unlimited',
          directory_invites: 'Unlimited',
          price: 'Custom'
        };
      default:
        return {
          quotes: '10,000',
          bulk_jobs: '100',
          directory_invites: '50',
          price: '$99/month'
        };
    }
  };

  const handleRequestIncrease = () => {
    setShowUpgradeDialog(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Usage Meter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Loading usage data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Usage Meter
            <Badge variant="outline" className="ml-auto">
              {subscriptionTier.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasOverage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You have exceeded usage limits. Additional charges may apply.
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-destructive underline"
                  onClick={handleRequestIncrease}
                >
                  Request limit increase
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {hasNearLimit && !hasOverage && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You're approaching usage limits. Consider upgrading your plan.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {usageMetrics.map((metric) => (
              <div key={metric.feature} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">
                      {metric.feature.replace('_', ' ')}
                    </span>
                    {metric.isOverage && (
                      <Badge variant="destructive" className="text-xs">
                        OVERAGE
                      </Badge>
                    )}
                    {metric.isNearLimit && !metric.isOverage && (
                      <Badge variant="secondary" className="text-xs">
                        NEAR LIMIT
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.used.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={Math.min(metric.percentage, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{metric.percentage}% used</span>
                    {metric.isOverage && (
                      <span className="text-red-600 font-medium">
                        +{((metric.used - metric.limit) / metric.limit * 100).toFixed(1)}% overage
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Current plan: {subscriptionTier.toUpperCase()}
                </span>
              </div>
              
              {subscriptionTier !== 'enterprise' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRequestIncrease}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Upgrade Your Plan
            </DialogTitle>
            <DialogDescription>
              Choose a plan that better fits your usage needs and unlock additional features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid gap-4">
              {['starter', 'pro', 'enterprise'].map((tier) => {
                const limits = getTierLimits();
                const isCurrentTier = tier === subscriptionTier;
                const isRecommended = tier === 'pro' && subscriptionTier === 'starter';
                
                return (
                  <div
                    key={tier}
                    className={`p-4 rounded-lg border ${
                      isCurrentTier 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50 cursor-pointer'
                    }`}
                    onClick={() => !isCurrentTier && handleUpgrade(tier)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{tier}</span>
                        {isCurrentTier && (
                          <Badge variant="secondary">Current</Badge>
                        )}
                        {isRecommended && (
                          <Badge variant="default" className="bg-green-600">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <span className="font-semibold">{limits.price}</span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>• {limits.quotes} quotes/month</div>
                      <div>• {limits.bulk_jobs} bulk jobs/day</div>
                      <div>• {limits.directory_invites} directory invites/month</div>
                      {tier === 'pro' && (
                        <div>• Priority support</div>
                      )}
                      {tier === 'enterprise' && (
                        <div>• Custom limits & dedicated support</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowUpgradeDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => handleContactSales()}
                className="flex-1"
              >
                Contact Sales
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Helper functions
const handleUpgrade = (tier: string) => {
  // TODO: Implement upgrade flow
  console.log(`Upgrading to ${tier} tier`);
  window.open(`/billing/upgrade?tier=${tier}`, '_blank');
};

const handleContactSales = () => {
  // TODO: Implement contact sales flow
  console.log('Contacting sales');
  window.open('mailto:sales@transbotai.com?subject=Plan%20Upgrade%20Inquiry', '_blank');
};
