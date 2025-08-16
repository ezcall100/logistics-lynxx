/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bell, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QuoteAlert {
  id: string;
  type: 'margin_warning' | 'rate_opportunity' | 'expiry_warning' | 'market_change';
  title: string;
  message: string;
  quoteId: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  dismissed?: boolean;
}

interface QuoteNotificationsProps {
  quotes: unknown[];
  onAlertAction?: (alert: QuoteAlert) => void;
}

export const QuoteNotifications: React.FC<QuoteNotificationsProps> = ({
  quotes,
  onAlertAction
}) => {
  const [alerts, setAlerts] = useState<QuoteAlert[]>([]);
  const { toast } = useToast();

  const generateAlerts = (quotes: unknown[]): QuoteAlert[] => {
    const newAlerts: QuoteAlert[] = [];
    
    quotes.forEach(quote => {
      // Check for expiring quotes (within 24 hours)
      const expiryDate = new Date(quote.expiryDate);
      const now = new Date();
      const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      if (hoursUntilExpiry > 0 && hoursUntilExpiry <= 24) {
        newAlerts.push({
          id: `expiry-${quote.id}`,
          type: 'expiry_warning',
          title: 'Quote Expiring Soon',
          message: `Quote ${quote.quoteNumber} expires in ${Math.round(hoursUntilExpiry)} hours`,
          quoteId: quote.id,
          severity: hoursUntilExpiry <= 6 ? 'high' : 'medium',
          timestamp: new Date().toISOString()
        });
      }

      // Check for low AI confidence
      if (quote.aiConfidence < 70) {
        newAlerts.push({
          id: `confidence-${quote.id}`,
          type: 'margin_warning',
          title: 'Low AI Confidence',
          message: `Quote ${quote.quoteNumber} has low AI confidence (${quote.aiConfidence}%)`,
          quoteId: quote.id,
          severity: quote.aiConfidence < 50 ? 'high' : 'medium',
          timestamp: new Date().toISOString()
        });
      }

      // Check for high-value opportunities (above market rate)
      const marketAverage = quote.amount * 0.95; // Simulate market data
      if (quote.amount > marketAverage * 1.1) {
        newAlerts.push({
          id: `opportunity-${quote.id}`,
          type: 'rate_opportunity',
          title: 'High-Value Opportunity',
          message: `Quote ${quote.quoteNumber} is ${Math.round(((quote.amount / marketAverage) - 1) * 100)}% above market`,
          quoteId: quote.id,
          severity: 'low',
          timestamp: new Date().toISOString()
        });
      }
    });

    return newAlerts;
  };

  useEffect(() => {
    const newAlerts = generateAlerts(quotes);
    setAlerts(prev => {
      const existingIds = new Set(prev.map(a => a.id));
      const uniqueNewAlerts = newAlerts.filter(alert => !existingIds.has(alert.id));
      
      // Show toast for new high-severity alerts
      uniqueNewAlerts.forEach(alert => {
        if (alert.severity === 'high') {
          toast({
            title: alert.title,
            description: alert.message,
            variant: "destructive",
          });
        }
      });
      
      return [...prev.filter(a => !a.dismissed), ...uniqueNewAlerts];
    });
  }, [quotes, toast]);

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const getAlertIcon = (type: QuoteAlert['type']) => {
    switch (type) {
      case 'margin_warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'rate_opportunity':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'expiry_warning':
        return <Bell className="h-4 w-4 text-red-600" />;
      case 'market_change':
        return <TrendingDown className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeverityBadge = (severity: QuoteAlert['severity']) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    
    return (
      <Badge className={variants[severity]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  if (activeAlerts.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Quote Alerts ({activeAlerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeAlerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{alert.title}</h4>
                {getSeverityBadge(alert.severity)}
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                >
                  Dismiss
                </Button>
                {onAlertAction && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAlertAction(alert)}
                  >
                    View Quote
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {activeAlerts.length > 5 && (
          <p className="text-sm text-muted-foreground text-center">
            and {activeAlerts.length - 5} more alerts...
          </p>
        )}
      </CardContent>
    </Card>
  );
};
