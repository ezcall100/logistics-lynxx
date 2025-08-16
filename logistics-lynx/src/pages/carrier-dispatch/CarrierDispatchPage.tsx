/* eslint-disable @typescript-eslint/no-explicit-any */
import UltraModernLayout from '@/components/layout/UltraModernLayout';
import { DispatchDashboard } from '@/components/carrier-dispatch/DispatchDashboard';

export default function CarrierDispatchPage() {
  return (
    <UltraModernLayout>
      <DispatchDashboard />
    </UltraModernLayout>
  );
}