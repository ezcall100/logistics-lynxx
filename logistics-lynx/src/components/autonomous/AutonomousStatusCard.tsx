
import React from 'react';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AutonomousStatusCard = () => {
  return (
    <Card className="w-full sm:max-w-md sm:ml-auto bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">
          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          AI System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-muted-foreground">Performance</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Optimal</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-muted-foreground">Learning Rate</span>
          <span className="text-xs sm:text-sm font-medium">98.5%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-muted-foreground">Uptime</span>
          <span className="text-xs sm:text-sm font-medium">99.9%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousStatusCard;
