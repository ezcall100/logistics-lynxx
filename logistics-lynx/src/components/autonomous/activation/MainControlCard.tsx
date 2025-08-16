/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Power, Zap, TestTube, Infinity as LucideInfinity } from 'lucide-react';

interface ActivationStatus {
  isActive: boolean;
  isPersistent: boolean;
  isAutoActivated: boolean;
}

interface MainControlCardProps {
  activationStatus: ActivationStatus;
  onActivate: () => void;
  onDeactivate: () => void;
  onTest: () => void;
}

export const MainControlCard: React.FC<MainControlCardProps> = ({
  activationStatus,
  onActivate,
  onDeactivate,
  onTest
}) => {
  return (
    <Card className={`border-2 ${activationStatus.isActive ? 'border-green-500 bg-green-50/50' : 'border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Power className={`h-6 w-6 ${activationStatus.isActive ? 'text-green-600' : 'text-gray-500'}`} />
            24/7 Persistent Autonomous System Control
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={activationStatus.isActive ? 'default' : 'secondary'} className="text-lg px-4 py-2">
              {activationStatus.isActive ? 'ACTIVE 24/7' : 'STANDBY'}
            </Badge>
            {activationStatus.isPersistent && (
              <Badge variant="outline" className="text-sm px-3 py-1 border-green-500 text-green-700">
                <LucideInfinity className="h-3 w-3 mr-1" />
                PERSISTENT
              </Badge>
            )}
            {activationStatus.isAutoActivated && (
              <Badge variant="outline" className="text-sm px-3 py-1 border-blue-500 text-blue-700">
                <Zap className="h-3 w-3 mr-1" />
                AUTO
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {!activationStatus.isActive ? (
            <Button onClick={onActivate} size="lg" className="flex-1">
              <Zap className="mr-2 h-5 w-5" />
              Manual Activate (Auto-Activation Available)
            </Button>
          ) : (
            <Button onClick={onDeactivate} size="lg" variant="destructive" className="flex-1">
              <Power className="mr-2 h-5 w-5" />
              Stop Auto-Running System
            </Button>
          )}
          
          <Button onClick={onTest} variant="outline" size="lg" disabled={!activationStatus.isActive}>
            <TestTube className="mr-2 h-4 w-4" />
            Run Tests Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
