// Lead Scoring System
// Phase 6: Automated Lead Qualification

export interface LeadScoreInputs {
  monthlyImpactUSD: number;
  paybackDays: number;
  intentSignals: {
    bulkJobs?: number;
    quotes?: number;
    views?: number;
    plan?: 'starter' | 'pro' | 'enterprise';
  };
}

export interface LeadScore {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  routing: 'ae' | 'sdr' | 'nurture';
  sla: string;
  reasoning: string[];
}

// Score 0–100
export function scoreLead(inputs: LeadScoreInputs): LeadScore {
  const { monthlyImpactUSD, paybackDays, intentSignals } = inputs;
  
  // Impact score: up to 60 points based on monthly impact
  const impact = Math.min(60, Math.log10(Math.max(1, monthlyImpactUSD)) * 20);
  
  // Payback score: 0-20 points (faster payback = higher score)
  const payback = paybackDays ? Math.max(0, 20 - Math.min(20, paybackDays/2)) : 0;
  
  // Intent score: 0-20 points based on engagement signals
  const intent = Math.min(20, 
    (intentSignals.bulkJobs ?? 0) * 5 + 
    (intentSignals.quotes ?? 0) * 2 + 
    (intentSignals.views ?? 0) * 1
  );
  
  // Plan bonus: Enterprise gets +5 points
  const planBonus = intentSignals.plan === 'enterprise' ? 5 : 0;
  
  const totalScore = Math.round(impact + payback + intent + planBonus);
  
  // Determine tier and routing
  let tier: 'hot' | 'warm' | 'cold';
  let routing: 'ae' | 'sdr' | 'nurture';
  let sla: string;
  const reasoning: string[] = [];
  
  if (totalScore >= 70) {
    tier = 'hot';
    routing = 'ae';
    sla = '2 hours';
    reasoning.push(`High impact: $${monthlyImpactUSD.toLocaleString()}/month`);
    if (paybackDays && paybackDays <= 30) reasoning.push(`Fast payback: ${paybackDays} days`);
  } else if (totalScore >= 40) {
    tier = 'warm';
    routing = 'sdr';
    sla = '24 hours';
    reasoning.push(`Moderate impact: $${monthlyImpactUSD.toLocaleString()}/month`);
  } else {
    tier = 'cold';
    routing = 'nurture';
    sla = '72 hours';
    reasoning.push(`Low impact: $${monthlyImpactUSD.toLocaleString()}/month`);
  }
  
  return {
    score: totalScore,
    tier,
    routing,
    sla,
    reasoning
  };
}

// Batch scoring for multiple leads
export function scoreLeadsBatch(leads: LeadScoreInputs[]): LeadScore[] {
  return leads.map(scoreLead);
}

// Get routing recommendations
export function getRoutingRecommendations(score: LeadScore) {
  const recommendations = {
    ae: {
      actions: ['Immediate outreach', 'POV discussion', 'Executive intro'],
      tools: ['Calendar booking', 'POV playbook', 'ROI calculator']
    },
    sdr: {
      actions: ['Qualification call', 'Demo scheduling', 'Use case discovery'],
      tools: ['Call script', 'Demo environment', 'Case studies']
    },
    nurture: {
      actions: ['Email sequence', 'Content sharing', 'Webinar invites'],
      tools: ['Email templates', 'Resource library', 'Event calendar']
    }
  };
  
  return recommendations[score.routing];
}

// Export for use in edge functions and components
export default {
  scoreLead,
  scoreLeadsBatch,
  getRoutingRecommendations
};
