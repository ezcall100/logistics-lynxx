/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Brain, Activity, Zap, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AutonomousHeader = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-3 rounded-full">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Autonomous TMS
            </h1>
            <p className="text-sm sm:text-xl text-muted-foreground mt-1 sm:mt-2 truncate">
              AI-Powered Transportation Management System
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 px-2 sm:px-3 py-1 text-xs sm:text-sm">
          <Activity className="h-3 w-3 mr-1" />
          System Active
        </Badge>
        <Badge variant="outline" className="border-blue-200 text-blue-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">
          <Zap className="h-3 w-3 mr-1" />
          Auto-Learning
        </Badge>
        <Badge variant="outline" className="border-purple-200 text-purple-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">
          <Shield className="h-3 w-3 mr-1" />
          Self-Healing
        </Badge>
      </div>
    </div>
  );
};

export default AutonomousHeader;
