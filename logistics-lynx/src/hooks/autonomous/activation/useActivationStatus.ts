/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

export interface ActivationStatus {
  isActive: boolean;
  startTime: string | null;
  totalCycles: number;
  lastTestingCycle: string | null;
  gptConsultations: number;
  isPersistent: boolean;
  isAutoActivated: boolean;
}

export const useActivationStatus = () => {
  const [activationStatus, setActivationStatus] = useState<ActivationStatus>({
    isActive: false,
    startTime: null,
    totalCycles: 0,
    lastTestingCycle: null,
    gptConsultations: 0,
    isPersistent: false,
    isAutoActivated: false
  });

  // Load persistent status from localStorage
  useEffect(() => {
    const loadPersistentStatus = () => {
      try {
        const persistentStatus = localStorage.getItem('tms_autonomous_24_7_status');
        if (persistentStatus) {
          const status = JSON.parse(persistentStatus);
          setActivationStatus(status);
        }
      } catch (error) {
        console.error('Error loading persistent status:', error);
      }
    };

    loadPersistentStatus();
  }, []);

  // Save status to localStorage whenever it changes
  useEffect(() => {
    if (activationStatus.isActive && activationStatus.isPersistent) {
      localStorage.setItem('tms_autonomous_24_7_status', JSON.stringify(activationStatus));
    }
  }, [activationStatus]);

  return { activationStatus, setActivationStatus };
};

export default useActivationStatus;