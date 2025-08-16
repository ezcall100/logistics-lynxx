/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MarginAnalysis } from './utils/marginAnalysis';

interface MarginAnalysisCardProps {
  marginData: MarginAnalysis;
}

export const MarginAnalysisCard: React.FC<MarginAnalysisCardProps> = ({
  marginData
}) => {
  const getProfitabilityBadge = () => {
    const variants = {
      high: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800',
    };
    
    const labels = {
      high: 'High Profit',
      moderate: 'Moderate Profit',
      low: 'Low Profit',
    };
    
    return (
      <Badge className={variants[marginData.profitabilityLevel]}>
        {labels[marginData.profitabilityLevel]}
      </Badge>
    );
  };

  const getProgressColor = () => {
    switch (marginData.profitabilityLevel) {
      case 'high': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Margin Analysis</CardTitle>
          {getProfitabilityBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Sell Rate</div>
            <div className="text-xl font-bold text-green-600">
              ${marginData.sellRate.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Buy Rate</div>
            <div className="text-xl font-bold text-red-600">
              ${marginData.buyRate.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-2">Profit Margin</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                ${marginData.margin.toLocaleString()}
              </span>
              <span className="text-lg font-semibold">
                {marginData.marginPercentage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={Math.min(marginData.marginPercentage, 30)} 
              max={30}
              className="h-2"
            />
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground mb-1">AI Recommendation</div>
          <div className="text-sm">{marginData.recommendation}</div>
        </div>
      </CardContent>
    </Card>
  );
};
