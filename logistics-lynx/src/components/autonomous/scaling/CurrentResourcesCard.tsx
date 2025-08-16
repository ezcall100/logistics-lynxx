/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, MemoryStick, HardDrive, Wifi, DollarSign } from 'lucide-react';
import { ResourceMetrics } from '@/hooks/useResourceManager';

interface CurrentResourcesCardProps {
  currentResources: ResourceMetrics;
}

const CurrentResourcesCard = ({ currentResources }: CurrentResourcesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Resources</CardTitle>
        <CardDescription>Real-time resource allocation and costs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span className="text-sm font-medium">CPU Cores</span>
            </div>
            <span className="font-bold">{currentResources.cpu_cores}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MemoryStick className="h-4 w-4" />
              <span className="text-sm font-medium">Memory</span>
            </div>
            <span className="font-bold">{currentResources.memory_gb} GB</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span className="text-sm font-medium">Storage</span>
            </div>
            <span className="font-bold">{currentResources.storage_gb} GB</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span className="text-sm font-medium">Bandwidth</span>
            </div>
            <span className="font-bold">{currentResources.network_bandwidth} Mbps</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Cost/Hour</span>
            </div>
            <span className="font-bold text-lg">${currentResources.cost_per_hour}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentResourcesCard;
