/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketIntelligence } from './utils/marginAnalysis';

interface MarketIntelligenceCardProps {
  marketData: MarketIntelligence;
  currentRate: number;
}

export const MarketIntelligenceCard: React.FC<MarketIntelligenceCardProps> = ({
  marketData,
  currentRate
}) => {
  const getTrendIcon = () => {
    switch (marketData.marketTrend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionBadge = () => {
    const variants = {
      above: 'bg-green-100 text-green-800',
      at: 'bg-yellow-100 text-yellow-800',
      below: 'bg-red-100 text-red-800',
    };
    
    const labels = {
      above: 'Above Market',
      at: 'At Market',
      below: 'Below Market',
    };
    
    return (
      <Badge className={variants[marketData.competitivePosition]}>
        {labels[marketData.competitivePosition]}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Market Intelligence
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Market Average</div>
            <div className="text-2xl font-bold text-blue-600">
              ${marketData.marketAverage.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Your Rate</div>
            <div className="text-2xl font-bold">
              ${currentRate.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Position</div>
            {getPositionBadge()}
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Market Trend</div>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className="text-sm capitalize">{marketData.marketTrend}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Seasonal Factor</div>
          <div className="text-sm">
            {marketData.seasonalFactor > 1 
              ? `+${((marketData.seasonalFactor - 1) * 100).toFixed(1)}% above baseline`
              : marketData.seasonalFactor < 1
              ? `-${((1 - marketData.seasonalFactor) * 100).toFixed(1)}% below baseline`
              : 'At seasonal baseline'
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
