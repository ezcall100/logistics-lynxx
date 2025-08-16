import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react';

interface FunnelMetrics {
  roi_submissions: number;
  trials_created: number;
  paid_conversions: number;
  roi_to_trial_rate: number;
  trial_to_paid_rate: number;
  overall_conversion_rate: number;
}

interface UTMPerformance {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  submissions: number;
  trials: number;
  paid: number;
  trial_rate: number;
  conversion_rate: number;
  avg_monthly_impact: number;
}

export const ROIFunnelDashboard: React.FC = () => {
  const [funnelMetrics, setFunnelMetrics] = useState<FunnelMetrics | null>(null);
  const [utmPerformance, setUtmPerformance] = useState<UTMPerformance[]>([]);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFunnelData();
  }, [timeframe, fetchFunnelData]);

  const fetchFunnelData = async () => {
    setLoading(true);
    try {
      // Fetch funnel metrics
      const funnelResponse = await fetch(`/api/roi-funnel?timeframe=${timeframe}`);
      const funnelData = await funnelResponse.json();
      setFunnelMetrics(funnelData);

      // Fetch UTM performance
      const utmResponse = await fetch(`/api/utm-performance?timeframe=${timeframe}`);
      const utmData = await utmResponse.json();
      setUtmPerformance(utmData);
    } catch (error) {
      console.error('Error fetching funnel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 25) return 'text-green-600';
    if (rate >= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConversionBadge = (rate: number) => {
    if (rate >= 25) return <Badge variant="default" className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 15) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge variant="destructive">Needs Work</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">ROI Funnel Analytics</h2>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period as string)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ROI Funnel Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Track conversions from ROI calculator to paid customers
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(period as string)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Funnel Metrics */}
      {funnelMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{funnelMetrics.roi_submissions}</div>
              <p className="text-xs text-muted-foreground">
                Last {timeframe}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trials Created</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{funnelMetrics.trials_created}</div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${getConversionColor(funnelMetrics.roi_to_trial_rate)}`}>
                  {funnelMetrics.roi_to_trial_rate}%
                </span>
                {getConversionBadge(funnelMetrics.roi_to_trial_rate)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Conversions</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{funnelMetrics.paid_conversions}</div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${getConversionColor(funnelMetrics.overall_conversion_rate)}`}>
                  {funnelMetrics.overall_conversion_rate}%
                </span>
                {getConversionBadge(funnelMetrics.overall_conversion_rate)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Funnel Visualization */}
      {funnelMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Funnel Conversion Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {funnelMetrics.roi_submissions}
                </div>
                <div className="text-sm text-muted-foreground">ROI Submissions</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {funnelMetrics.trials_created}
                </div>
                <div className="text-sm text-muted-foreground">
                  Trials ({funnelMetrics.roi_to_trial_rate}%)
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {funnelMetrics.paid_conversions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Paid ({funnelMetrics.overall_conversion_rate}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* UTM Performance */}
      {utmPerformance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>UTM Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Source</th>
                    <th className="text-left py-2">Medium</th>
                    <th className="text-left py-2">Campaign</th>
                    <th className="text-right py-2">Submissions</th>
                    <th className="text-right py-2">Trial Rate</th>
                    <th className="text-right py-2">Conv. Rate</th>
                    <th className="text-right py-2">Avg Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {utmPerformance.map((utm, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{utm.utm_source}</td>
                      <td className="py-2">{utm.utm_medium}</td>
                      <td className="py-2">{utm.utm_campaign}</td>
                      <td className="text-right py-2">{utm.submissions}</td>
                      <td className="text-right py-2">
                        <span className={getConversionColor(utm.trial_rate)}>
                          {utm.trial_rate}%
                        </span>
                      </td>
                      <td className="text-right py-2">
                        <span className={getConversionColor(utm.conversion_rate)}>
                          {utm.conversion_rate}%
                        </span>
                      </td>
                      <td className="text-right py-2">
                        ${Math.round(utm.avg_monthly_impact).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Funnel Review
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Export Funnel Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
