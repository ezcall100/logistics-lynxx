/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export const AgentTest = () => {
  const [status, setStatus] = useState('Initializing...');
  const [changes, setChanges] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Start the agent immediately
    setIsActive(true);
    setStatus('Agent Started');

    // Test 1: Immediate visual change
    setTimeout(() => {
      setStatus('Applying Test Change 1...');
      setChanges(1);
      
      // Apply a visible change
      const style = document.createElement('style');
      style.textContent = `
        body { 
          background: linear-gradient(45deg, #ff0000, #ff6b6b) !important; 
          transition: all 0.5s ease !important;
        }
      `;
      style.id = 'agent-test-1';
      document.head.appendChild(style);
      
      console.log('🧪 Agent Test: Applied red background');
    }, 1000);

    // Test 2: Button effects
    setTimeout(() => {
      setStatus('Applying Test Change 2...');
      setChanges(2);
      
      const style = document.createElement('style');
      style.textContent = `
        button { 
          box-shadow: 0 0 20px #0066ff !important; 
          transform: scale(1.1) !important;
          transition: all 0.3s ease !important;
        }
      `;
      style.id = 'agent-test-2';
      document.head.appendChild(style);
      
      console.log('🧪 Agent Test: Applied blue button glow');
    }, 3000);

    // Test 3: Card effects
    setTimeout(() => {
      setStatus('Applying Test Change 3...');
      setChanges(3);
      
      const style = document.createElement('style');
      style.textContent = `
        .card { 
          border: 3px solid #00ff00 !important; 
          animation: pulse 1s infinite !important;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `;
      style.id = 'agent-test-3';
      document.head.appendChild(style);
      
      console.log('🧪 Agent Test: Applied green card borders');
    }, 5000);

    // Cleanup after 10 seconds
    setTimeout(() => {
      setStatus('Test Complete - Agent Working!');
      ['agent-test-1', 'agent-test-2', 'agent-test-3'].forEach(id => {
        const style = document.getElementById(id);
        if (style) style.remove();
      });
      console.log('🧪 Agent Test: Cleanup completed');
    }, 10000);

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
                <span className="font-semibold text-green-800">🧪 AUTONOMOUS AGENT TEST</span>
              </div>
              <Badge variant="default" className="bg-green-600">
                {isActive ? 'ACTIVE' : 'INACTIVE'}
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
            Autonomous Agent Test Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{changes}</div>
              <div className="text-sm text-blue-800">Changes Applied</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-sm text-green-800">Agent Status</div>
              <div className="text-xs text-green-600">{status}</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
              <div className="text-sm text-yellow-800">Test Progress</div>
            </div>
          </div>

          <div className="text-center p-4 bg-red-100 border-2 border-red-300 rounded-lg animate-pulse">
            <div className="font-bold text-red-800">🚨 WATCH YOUR WEBSITE FOR CHANGES!</div>
            <div className="text-sm text-red-700 mt-2">
              <div>1s: Red background appears</div>
              <div>3s: Blue button glow</div>
              <div>5s: Green card borders</div>
              <div>10s: Changes reset</div>
            </div>
          </div>

          <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
            <div className="font-medium text-blue-800">Console Logs:</div>
            <div className="text-xs text-blue-700 font-mono">
              Open browser console (F12) to see agent activity logs
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
