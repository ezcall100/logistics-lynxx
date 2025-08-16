/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp } from 'lucide-react';
import { CRMStatsCard } from '../shared/CRMStatsCard';
import type { CRMLead } from '@/types/crm';

interface LeadStatsProps {
  leads: CRMLead[];
}

export const LeadStats: React.FC<LeadStatsProps> = ({ leads }) => {
  const totalValue = leads.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);
  const avgLeadScore = leads.length > 0 
    ? leads.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / leads.length 
    : 0;
  const activeLeads = leads.filter(l => !['closed_won', 'closed_lost'].includes(l.lead_status || '')).length;
  const conversionRate = leads.length > 0 
    ? (leads.filter(l => l.converted_to_opportunity).length / leads.length) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <CRMStatsCard
        title="Total Leads"
        value={leads.length}
        description={`$${totalValue.toLocaleString()} potential value`}
        icon={Target}
      />
      <CRMStatsCard
        title="Active Leads"
        value={activeLeads}
        description="In pipeline"
        icon={TrendingUp}
        iconColor="text-green-600"
      />
      <CRMStatsCard
        title="Avg Lead Score"
        value={avgLeadScore.toFixed(0)}
        icon={Target}
      >
        <Progress value={avgLeadScore} className="mt-2" />
      </CRMStatsCard>
      <CRMStatsCard
        title="Conversion Rate"
        value={`${conversionRate.toFixed(1)}%`}
        description="Leads to opportunities"
        icon={TrendingUp}
      />
    </div>
  );
};
