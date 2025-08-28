/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

export interface ResourceMetrics {
  cpu_cores: number;
  memory_gb: number;
  storage_gb: number;
  network_bandwidth: number;
  cost_per_hour: number;
}

export const useResourceManager = () => {
  const [currentResources, setCurrentResources] = useState<ResourceMetrics>({
    cpu_cores: 8,
    memory_gb: 32,
    storage_gb: 1000,
    network_bandwidth: 100,
    cost_per_hour: 2.50
  });

  const calculateOptimalResources = (predictedLoad: number): ResourceMetrics => {
    const baseResources = {
      cpu_cores: 4,
      memory_gb: 16,
      storage_gb: 500,
      network_bandwidth: 50,
      cost_per_hour: 1.25
    };
    
    const scaleFactor = Math.max(0.5, Math.min(3.0, predictedLoad * 2));
    
    return {
      cpu_cores: Math.ceil(baseResources.cpu_cores * scaleFactor),
      memory_gb: Math.ceil(baseResources.memory_gb * scaleFactor),
      storage_gb: Math.ceil(baseResources.storage_gb * scaleFactor),
      network_bandwidth: Math.ceil(baseResources.network_bandwidth * scaleFactor),
      cost_per_hour: Number((baseResources.cost_per_hour * scaleFactor).toFixed(2))
    };
  };

  return {
    currentResources,
    setCurrentResources,
    calculateOptimalResources
  };
};

export default useResourceManager;