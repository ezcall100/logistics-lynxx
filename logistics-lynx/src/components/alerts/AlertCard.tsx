
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Alert } from '@/types/alerts';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  onDismiss?: (alertId: string) => void;
  compact?: boolean;
}

const AlertCard = ({ 
  alert, 
  onAcknowledge, 
  onResolve, 
  onDismiss, 
  compact = false 
}: AlertCardProps) => {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'acknowledged': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'dismissed': return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={`${compact ? 'p-3' : ''} transition-all hover:shadow-md`}>
      <CardHeader className={`${compact ? 'pb-2' : 'pb-3'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getStatusIcon(alert.status)}
            <h4 className={`font-semibold ${compact ? 'text-sm' : 'text-base'} truncate`}>
              {alert.title}
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
              {alert.severity}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {alert.category.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={compact ? 'pt-0' : ''}>
        <p className={`text-muted-foreground mb-3 ${compact ? 'text-sm' : ''}`}>
          {alert.message}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {new Date(alert.timestamp).toLocaleString()}
          </span>
          
          {alert.status === 'active' && (
            <div className="flex flex-wrap gap-2">
              {onAcknowledge && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onAcknowledge(alert.id)}
                  className="text-xs"
                >
                  Acknowledge
                </Button>
              )}
              {onResolve && (
                <Button 
                  size="sm" 
                  onClick={() => onResolve(alert.id)}
                  className="text-xs"
                >
                  Resolve
                </Button>
              )}
              {onDismiss && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onDismiss(alert.id)}
                  className="text-xs"
                >
                  Dismiss
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
