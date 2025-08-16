/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface DeprecatedRouteProps {
  from: string;
  to: string;
}

export const DeprecatedRoute: React.FC<DeprecatedRouteProps> = ({ from, to }) => {
  // Set document title and meta tags for 410 status
  React.useEffect(() => {
    document.title = '410 Gone - Portal Decommissioned';
    // Add meta tag to indicate this is a 410 response
    const meta = document.createElement('meta');
    meta.name = 'http-equiv';
    meta.content = '410';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
            <Badge variant="destructive" className="text-sm">410</Badge>
          </div>
          <CardTitle className="text-xl">Portal Decommissioned</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              The route <code className="bg-muted px-2 py-1 rounded text-sm">{from}</code> has been retired.
            </p>
            <p className="text-sm text-muted-foreground">
              Please use the new canonical path instead.
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Location:</span>
              <code className="text-sm bg-background px-2 py-1 rounded">{to}</code>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={() => window.location.href = to}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to New Portal
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>X-Portal-Status: decommissioned</p>
            <p>X-New-Path: {to}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeprecatedRoute;
