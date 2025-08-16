/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

export const SimpleTestAgent = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [lastChange, setLastChange] = useState('');

  useEffect(() => {
    // Start working immediately
    setIsWorking(true);
    
    // Apply first change after 1 second
    setTimeout(() => {
      setChangeCount(1);
      setLastChange('Applied red background to body');
      
      // Actually apply the change
      const style = document.createElement('style');
      style.textContent = 'body { background: linear-gradient(45deg, #ff0000, #ff6b6b) !important; }';
      style.id = 'test-agent-style-1';
      document.head.appendChild(style);
      
      // Remove after 5 seconds
      setTimeout(() => {
        const existingStyle = document.getElementById('test-agent-style-1');
        if (existingStyle) existingStyle.remove();
      }, 5000);
    }, 1000);

    // Apply second change after 3 seconds
    setTimeout(() => {
      setChangeCount(2);
      setLastChange('Applied blue glow to buttons');
      
      const style = document.createElement('style');
      style.textContent = 'button { box-shadow: 0 0 20px #0066ff !important; transform: scale(1.1) !important; }';
      style.id = 'test-agent-style-2';
      document.head.appendChild(style);
      
      setTimeout(() => {
        const existingStyle = document.getElementById('test-agent-style-2');
        if (existingStyle) existingStyle.remove();
      }, 5000);
    }, 3000);

    // Apply third change after 5 seconds
    setTimeout(() => {
      setChangeCount(3);
      setLastChange('Applied green border to cards');
      
      const style = document.createElement('style');
      style.textContent = '.card { border: 3px solid #00ff00 !important; animation: pulse 1s infinite !important; }';
      style.id = 'test-agent-style-3';
      document.head.appendChild(style);
      
      setTimeout(() => {
        const existingStyle = document.getElementById('test-agent-style-3');
        if (existingStyle) existingStyle.remove();
      }, 5000);
    }, 5000);

  }, []);

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Brain className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">🧪 SIMPLE TEST AGENT - WORKING!</span>
              </div>
              <Badge variant="default" className="bg-green-600">
                {isWorking ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Test Results - Autonomous Agent Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{changeCount}</div>
              <div className="text-sm text-blue-800">Changes Applied</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-sm text-green-800">Agent Working</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
              <div className="text-sm text-yellow-800">Watch for Changes</div>
            </div>
          </div>

          {lastChange && (
            <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <div className="font-medium text-blue-800">Last Change:</div>
              <div className="text-sm text-blue-700">{lastChange}</div>
            </div>
          )}

          <div className="text-center p-4 bg-red-100 border-2 border-red-300 rounded-lg animate-pulse">
            <div className="font-bold text-red-800">🚨 WATCH YOUR WEBSITE!</div>
            <div className="text-sm text-red-700">
              You should see: Red background → Blue button glow → Green card borders
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
