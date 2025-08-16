/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MarginAnalysis {
  buyRate: number;
  sellRate: number;
  margin: number;
  marginPercentage: number;
  profitabilityLevel: 'high' | 'moderate' | 'low';
  recommendation: string;
}

export interface MarketIntelligence {
  marketAverage: number;
  competitivePosition: 'above' | 'at' | 'below';
  marketTrend: 'increasing' | 'stable' | 'decreasing';
  seasonalFactor: number;
}

export const calculateMargin = (sellRate: number, buyRate: number): MarginAnalysis => {
  const margin = sellRate - buyRate;
  const marginPercentage = buyRate > 0 ? (margin / buyRate) * 100 : 0;
  
  let profitabilityLevel: 'high' | 'moderate' | 'low' = 'low';
  let recommendation = '';
  
  if (marginPercentage >= 20) {
    profitabilityLevel = 'high';
    recommendation = 'Excellent profit margin. Consider maintaining this rate.';
  } else if (marginPercentage >= 10) {
    profitabilityLevel = 'moderate';
    recommendation = 'Acceptable margin. Monitor market conditions for optimization.';
  } else {
    profitabilityLevel = 'low';
    recommendation = 'Low margin. Consider rate adjustment or cost reduction.';
  }
  
  return {
    buyRate,
    sellRate,
    margin,
    marginPercentage,
    profitabilityLevel,
    recommendation
  };
};

export const generateMarketIntelligence = (quoteAmount: number, loadType: string, route: string): MarketIntelligence => {
  // Simulate market intelligence data
  const baseMarketAverage = quoteAmount * (0.95 + Math.random() * 0.1);
  const seasonalFactors = {
    'Dry Van': 1.0,
    'Refrigerated': 1.15,
    'Flatbed': 1.1
  };
  
  const seasonalFactor = seasonalFactors[loadType as keyof typeof seasonalFactors] || 1.0;
  const marketAverage = baseMarketAverage * seasonalFactor;
  
  let competitivePosition: 'above' | 'at' | 'below' = 'at';
  if (quoteAmount > marketAverage * 1.05) competitivePosition = 'above';
  else if (quoteAmount < marketAverage * 0.95) competitivePosition = 'below';
  
  const trends = ['increasing', 'stable', 'decreasing'] as const;
  const marketTrend = trends[Math.floor(Math.random() * trends.length)];
  
  return {
    marketAverage,
    competitivePosition,
    marketTrend,
    seasonalFactor
  };
};

export const generateAIRecommendations = (margin: MarginAnalysis, market: MarketIntelligence): string[] => {
  const recommendations: string[] = [];
  
  if (margin.profitabilityLevel === 'low') {
    recommendations.push('Consider increasing sell rate by 5-10% to improve margin');
    recommendations.push('Analyze route efficiency to reduce operational costs');
  }
  
  if (market.competitivePosition === 'below') {
    recommendations.push('Quote is below market average - opportunity to increase rate');
  } else if (market.competitivePosition === 'above') {
    recommendations.push('Quote is above market average - monitor for competitive pressure');
  }
  
  if (market.marketTrend === 'increasing') {
    recommendations.push('Market trend is positive - consider premium pricing');
  } else if (market.marketTrend === 'decreasing') {
    recommendations.push('Market trend is declining - focus on cost efficiency');
  }
  
  return recommendations;
};
