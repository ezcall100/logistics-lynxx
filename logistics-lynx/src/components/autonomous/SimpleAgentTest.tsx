import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  Activity,
  Play,
  Settings
} from 'lucide-react';

export const SimpleAgentTest = () => {
  const [isActive, setIsActive] = useState(false);
  const [changes, setChanges] = useState(0);

  const startAgents = () => {
    console.log('🚀 Starting Simple Agent Test...');
    setIsActive(true);
    setChanges(0);
    
    // Apply visual change immediately
    const style = document.createElement('style');
    style.textContent = `
      body { 
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important; 
        transition: all 0.5s ease !important;
      }
    `;
    style.id = 'simple-agent-test';
    document.head.appendChild(style);
    
    // Start counting changes
    const interval = setInterval(() => {
      setChanges(prev => prev + 1);
      
      // Apply different visual effects
      const effects = [
        `button { 
          box-shadow: 0 0 20px #0066ff !important; 
          transform: scale(1.05) !important;
        }`,
        `.card { 
          border: 3px solid #00ff00 !important; 
          animation: pulse 1s infinite !important;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }`,
        `h1, h2, h3 { 
          color: #ff6b6b !important; 
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1) !important;
        }`
      ];
      
      const effectStyle = document.createElement('style');
      effectStyle.textContent = effects[changes % effects.length];
      effectStyle.id = `effect-${changes}`;
      document.head.appendChild(effectStyle);
      
      // Remove effect after 2 seconds
      setTimeout(() => {
        const existingEffect = document.getElementById(`effect-${changes}`);
        if (existingEffect) existingEffect.remove();
      }, 2000);
      
    }, 3000);
    
    // Cleanup after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      const existingStyle = document.getElementById('simple-agent-test');
      if (existingStyle) existingStyle.remove();
      setIsActive(false);
    }, 30000);
  };

  return (
    <div className="space-y-4">
      {/* Master Control */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-800">🤖 SIMPLE AUTONOMOUS AGENT TEST</span>
              </div>
              <Badge variant="default" className={`${isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                {isActive ? 'RUNNING' : 'STOPPED'}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-800">
                Total Changes: {changes}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Control Button */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            {!isActive ? (
              <Button 
                onClick={startAgents}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                START SIMPLE AGENT TEST
              </Button>
            ) : (
              <div className="text-center p-4 bg-green-100 border-2 border-green-300 rounded-lg animate-pulse">
                <div className="font-bold text-green-800">🚀 AGENTS RUNNING!</div>
                <div className="text-sm text-green-700 mt-2">
                  Watch your website transform! Changes: {changes}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600 mt-2">
              {!isActive 
                ? 'Click to start simple autonomous agent test'
                : 'Agents are applying visual changes every 3 seconds'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Agent Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-sm">Visual Agent</span>
                  {isActive ? <Activity className="h-4 w-4 text-green-500 animate-spin" /> : <CheckCircle className="h-4 w-4 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs opacity-80">Applies visual effects to website</p>
                <div className="text-xs mt-2">
                  Status: {isActive ? 'Working' : 'Standby'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-sm">Style Agent</span>
                  {isActive ? <Activity className="h-4 w-4 text-blue-500 animate-spin" /> : <CheckCircle className="h-4 w-4 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs opacity-80">Applies dynamic styling</p>
                <div className="text-xs mt-2">
                  Status: {isActive ? 'Working' : 'Standby'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-sm">Monitor Agent</span>
                  {isActive ? <Activity className="h-4 w-4 text-purple-500 animate-spin" /> : <CheckCircle className="h-4 w-4 text-gray-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs opacity-80">Monitors system activity</p>
                <div className="text-xs mt-2">
                  Status: {isActive ? 'Working' : 'Standby'}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
