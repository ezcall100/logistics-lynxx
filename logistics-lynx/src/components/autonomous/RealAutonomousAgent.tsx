import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Code, 
  Palette, 
  Sparkles, 
  Eye, 
  Settings,
  Zap,
  Brain,
  Wrench,
  Target
} from 'lucide-react';

interface RealChange {
  id: string;
  type: 'css_modification' | 'dom_manipulation' | 'style_injection' | 'animation_add';
  title: string;
  description: string;
  timestamp: Date;
  applied: boolean;
  cssRules?: string[];
  domChanges?: string[];
}

export const RealAutonomousAgent = () => {
  const [realChanges, setRealChanges] = useState<RealChange[]>([]);
  const [changeCounter, setChangeCounter] = useState(0);
  const [lastChangeTime, setLastChangeTime] = useState(new Date());
  const [isActive, setIsActive] = useState(true);

  // Real CSS modifications that will actually be applied
  const realCSSModifications = [
    {
      type: 'css_modification' as const,
      title: 'Enhanced Button Animations',
      description: 'Adding real hover effects and transitions to all buttons',
      cssRules: [
        'button { transition: all 0.3s ease; transform: scale(1); }',
        'button:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }',
        'button:active { transform: scale(0.98); }'
      ]
    },
    {
      type: 'style_injection' as const,
      title: 'Gradient Background Effects',
      description: 'Applying real gradient backgrounds to cards and containers',
      cssRules: [
        '.card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }',
        '.card:hover { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }'
      ]
    },
    {
      type: 'animation_add' as const,
      title: 'Pulse Animation System',
      description: 'Adding real pulse animations to important elements',
      cssRules: [
        '@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }',
        '.pulse-animation { animation: pulse 2s infinite; }'
      ]
    },
    {
      type: 'dom_manipulation' as const,
      title: 'Dynamic Color Scheme',
      description: 'Changing the actual color scheme of the website',
      cssRules: [
        ':root { --primary: #ff6b6b; --secondary: #4ecdc4; --accent: #45b7d1; }',
        'body { background: linear-gradient(45deg, var(--primary), var(--secondary)); }'
      ]
    },
    {
      type: 'css_modification' as const,
      title: 'Enhanced Typography',
      description: 'Improving text readability and styling',
      cssRules: [
        'h1, h2, h3 { font-weight: 700; letter-spacing: -0.025em; }',
        'p { line-height: 1.7; color: #374151; }',
        'a { text-decoration: none; border-bottom: 2px solid transparent; }',
        'a:hover { border-bottom-color: currentColor; }'
      ]
    },
    {
      type: 'style_injection' as const,
      title: 'Glass Morphism Effects',
      description: 'Adding modern glass morphism styling',
      cssRules: [
        '.glass-effect { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }',
        '.glass-effect:hover { background: rgba(255, 255, 255, 0.2); }'
      ]
    }
  ];

  // Function to actually apply CSS changes to the document
  const applyRealCSSChange = (cssRules: string[]) => {
    const styleId = `autonomous-agent-style-${Date.now()}`;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = cssRules.join('\n');
    document.head.appendChild(styleElement);
    
    // Remove the style after 10 seconds to show the change was temporary
    setTimeout(() => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    }, 10000);
  };

  // Function to apply DOM manipulations
  const applyDOMChanges = (change: RealChange) => {
    switch (change.type) {
      case 'dom_manipulation':
        // Add a temporary highlight effect to the body
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.filter = 'brightness(1.1) saturate(1.2)';
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 2000);
        break;
      
      case 'animation_add':
        // Add pulse animation to the main container
        const mainContainer = document.querySelector('main') || document.body;
        mainContainer.classList.add('pulse-animation');
        setTimeout(() => {
          mainContainer.classList.remove('pulse-animation');
        }, 3000);
        break;
    }
  };

  // Generate and apply real changes
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      setLastChangeTime(now);
      setChangeCounter(prev => prev + 1);

      // Select a random modification
      const modification = realCSSModifications[Math.floor(Math.random() * realCSSModifications.length)];
      
      const newChange: RealChange = {
        id: `real-change-${Date.now()}`,
        type: modification.type,
        title: modification.title,
        description: modification.description,
        timestamp: now,
        applied: true,
        cssRules: modification.cssRules,
        domChanges: modification.domChanges
      };

      // Actually apply the change
      if (modification.cssRules) {
        applyRealCSSChange(modification.cssRules);
      }
      applyDOMChanges(newChange);

      setRealChanges(prev => [newChange, ...prev.slice(0, 9)]);
    }, 8000); // Apply changes every 8 seconds

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getChangeIcon = (type: RealChange['type']) => {
    switch (type) {
      case 'css_modification': return <Code className="h-4 w-4 text-blue-500" />;
      case 'dom_manipulation': return <Wrench className="h-4 w-4 text-green-500" />;
      case 'style_injection': return <Palette className="h-4 w-4 text-purple-500" />;
      case 'animation_add': return <Sparkles className="h-4 w-4 text-pink-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Real Agent Status */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Brain className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">🤖 REAL Autonomous Agent - Making ACTUAL Changes</span>
              </div>
              <Badge variant="default" className="bg-green-600">
                {isActive ? 'ACTIVE' : 'PAUSED'}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-800">
                Last Real Change: {formatTime(lastChangeTime)}
              </div>
              <div className="text-sm text-green-600">
                Real Change #{changeCounter}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-red-500" />
              <div>
                <div className="text-sm font-medium">Real Changes Applied</div>
                <div className="text-lg font-bold">{realChanges.filter(c => c.applied).length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">Agent Status</div>
                <div className="text-lg font-bold">{isActive ? 'Active' : 'Paused'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-500" />
              <div>
                <div className="text-sm font-medium">CSS Rules Applied</div>
                <div className="text-lg font-bold">{realChanges.reduce((acc, change) => acc + (change.cssRules?.length || 0), 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real Changes Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Real Changes Applied to Your Website
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {realChanges.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <p>Initializing real autonomous agent...</p>
              <p className="text-sm">This agent will make ACTUAL changes to your website!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realChanges.map((change) => (
                <div
                  key={change.id}
                  className="p-3 rounded-lg border border-green-200 bg-green-50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getChangeIcon(change.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-green-800">{change.title}</span>
                          <Badge variant="outline" className="text-xs bg-green-100">
                            {change.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">{change.description}</p>
                        {change.cssRules && (
                          <div className="mt-2 p-2 bg-white rounded border">
                            <div className="text-xs font-mono text-gray-600">
                              {change.cssRules.map((rule, index) => (
                                <div key={index} className="mb-1">{rule}</div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {formatTime(change.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Code className="h-3 w-3" />
                            Applied to DOM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsActive(!isActive)}
          variant={isActive ? "destructive" : "default"}
          className="flex-1"
        >
          {isActive ? 'Pause Agent' : 'Resume Agent'}
        </Button>
        <Button 
          onClick={() => {
            setRealChanges([]);
            setChangeCounter(0);
          }}
          variant="outline"
        >
          Clear History
        </Button>
      </div>
    </div>
  );
};
