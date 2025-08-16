/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play } from 'lucide-react';

interface AutoActivationBannerProps {
  isAutoActivated: boolean;
}

export const AutoActivationBanner: React.FC<AutoActivationBannerProps> = ({ isAutoActivated }) => {
  if (!isAutoActivated) return null;

  return (
    <Card className="border-2 border-green-500 bg-green-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Auto-Activated: Zero-Touch 24/7 Operation
          </CardTitle>
          <Badge variant="default" className="text-lg px-4 py-2 bg-green-600">
            AUTO-RUNNING 24/7
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="h-5 w-5 text-green-700" />
            <span className="font-semibold text-green-800">Fully Autonomous - No Human Touch Required</span>
          </div>
          <p className="text-green-700 text-sm">
            ✅ System auto-started on application load<br/>
            ✅ Runs continuously without unknown manual intervention<br/>
            ✅ Survives all interruptions (logout, restart, refresh)<br/>
            ✅ True "set-and-forget" autonomous operation
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
