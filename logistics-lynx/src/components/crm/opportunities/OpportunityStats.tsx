/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp } from 'lucide-react';
import { CRMStatsCard } from '../shared/CRMStatsCard';
import type { CRMOpportunity } from '@/types/crm';

interface OpportunityStatsProps {
  opportunities: CRMOpportunity[];
}

export const OpportunityStats: React.FC<OpportunityStatsProps> = ({ opportunities }) => {
  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
  const activeOpportunities = opportunities.filter(o => !['closed_won', 'closed_lost'].includes(o.stage || ''));
  const activeValue = activeOpportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
  const avgDealSize = opportunities.length > 0 ? totalValue / opportunities.length : 0;
  const winRate = opportunities.length > 0 
    ? (opportunities.filter(o => o.stage === 'closed_won').length / opportunities.length) * 100 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <CRMStatsCard
        title="Total Pipeline"
        value={`$${totalValue.toLocaleString()}`}
        description={`${opportunities.length} opportunities`}
        icon={DollarSign}
      />
      <CRMStatsCard
        title="Active Pipeline"
        value={`$${activeValue.toLocaleString()}`}
        description={`${activeOpportunities.length} active deals`}
        icon={TrendingUp}
        iconColor="text-green-600"
      />
      <CRMStatsCard
        title="Avg Deal Size"
        value={`$${Math.round(avgDealSize).toLocaleString()}`}
        description="Per opportunity"
        icon={DollarSign}
      />
      <CRMStatsCard
        title="Win Rate"
        value={`${winRate.toFixed(1)}%`}
        icon={TrendingUp}
      >
        <Progress value={winRate} className="mt-2" />
      </CRMStatsCard>
    </div>
  );
};
