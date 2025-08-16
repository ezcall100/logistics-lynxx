/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Brain, TestTube, MessageSquare, Shield, Zap } from 'lucide-react';

interface CurrentOperationsCardProps {
  isActive: boolean;
  isAutoActivated: boolean;
}

export const CurrentOperationsCard: React.FC<CurrentOperationsCardProps> = ({ isActive, isAutoActivated }) => {
  if (!isActive) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Persistent 24/7 Operations Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-500" />
              Autonomous Agents (Session Independent)
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Running 24/7</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-purple-500" />
              Continuous Testing (Auto-Schedule)
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-600">Every Hour</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              GPT Auto-Assistance (No Human Needed)
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-orange-600">Standby</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Persistent Operation (Logout-Proof)
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Protected</span>
            </div>
          </div>

          {isAutoActivated && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                Auto-Activation (Zero-Touch Startup)
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600">Enabled</span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground mb-2">
            System automatically operates 24/7 regardless of admin sessions:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>• ✅ Quote Comparison Features</div>
            <div>• ✅ AI Recommendations Accuracy</div>
            <div>• ✅ Role-Based Dashboard Functions</div>
            <div>• ✅ Margin Analysis Calculations</div>
            <div>• ✅ PDF Export Generation</div>
            <div>• ✅ System Performance Metrics</div>
            <div>• ✅ User Experience Optimization</div>
            <div>• ✅ Session-Independent Operations</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
