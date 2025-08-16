/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Server, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw,
  Activity
} from 'lucide-react';
import { getMultiRegionManager, getRegionRoutingConfig } from '@/lib/feature-flags';

interface RegionHealthStatus {
  activeRegion: string;
  regions: {
    [key: string]: {
      healthy: boolean;
      lastCheck: Date | null;
    };
  };
}

export function MultiRegionHealthMonitor() {
  const [healthStatus, setHealthStatus] = useState<RegionHealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const refreshHealthStatus = async () => {
    setIsLoading(true);
    try {
      const manager = getMultiRegionManager();
      const status = manager.getHealthStatus();
      setHealthStatus(status);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to refresh health status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performManualFailover = async (targetRegionId: string) => {
    setIsLoading(true);
    try {
      const manager = getMultiRegionManager();
      await manager.manualFailover(targetRegionId);
      await refreshHealthStatus();
    } catch (error) {
      console.error('Manual failover failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshHealthStatus();
    
    // Refresh every 30 seconds
    const interval = setInterval(refreshHealthStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (!healthStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Multi-Region Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading health status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const regions = Object.entries(healthStatus.regions);
  const hasUnhealthyRegions = regions.some(([_, status]) => !status.healthy);
  const allRegionsUnhealthy = regions.every(([_, status]) => !status.healthy);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Multi-Region Health
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshHealthStatus}
            disabled={isLoading}
            className="ml-auto"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {allRegionsUnhealthy && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              All regions are currently unhealthy. System may be experiencing issues.
            </AlertDescription>
          </Alert>
        )}

        {hasUnhealthyRegions && !allRegionsUnhealthy && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Some regions are unhealthy. Automatic failover may occur.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          {regions.map(([regionId, status]) => {
            const isActive = regionId === healthStatus.activeRegion;
            const isHealthy = status.healthy;
            
            return (
              <div
                key={regionId}
                className={`p-4 rounded-lg border ${
                  isActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {isHealthy ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium capitalize">{regionId} Region</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {isActive && (
                        <Badge variant="default" className="bg-primary">
                          Active
                        </Badge>
                      )}
                      <Badge variant={isHealthy ? "secondary" : "destructive"}>
                        {isHealthy ? "Healthy" : "Unhealthy"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {status.lastCheck && (
                      <span className="text-sm text-muted-foreground">
                        Last check: {new Date(status.lastCheck).toLocaleTimeString()}
                      </span>
                    )}
                    
                    {!isActive && isHealthy && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => performManualFailover(regionId)}
                        disabled={isLoading}
                      >
                        <Activity className="h-4 w-4 mr-1" />
                        Failover
                      </Button>
                    )}
                  </div>
                </div>

                {!isHealthy && (
                  <div className="mt-2 text-sm text-red-600">
                    Region is not responding to health checks
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Health Check Configuration</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Check Interval:</span>
              <span className="ml-2">30 seconds</span>
            </div>
            <div>
              <span className="text-muted-foreground">Failover Threshold:</span>
              <span className="ml-2">3 consecutive failures</span>
            </div>
            <div>
              <span className="text-muted-foreground">Timeout:</span>
              <span className="ml-2">5 seconds</span>
            </div>
            <div>
              <span className="text-muted-foreground">Auto-failover:</span>
              <span className="ml-2">Enabled</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
