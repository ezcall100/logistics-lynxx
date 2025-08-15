import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Construction, 
  Settings, 
  Users, 
  BarChart3, 
  Activity,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PortalScaffoldProps {
  title: string;
  portalKey?: string;
  description?: string;
  features?: string[];
}

export default function PortalScaffold({ 
  title, 
  portalKey, 
  description = "This portal is provisioned and protected. Build out features here.",
  features = []
}: PortalScaffoldProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/portal-selection')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portals
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-amber-500" />
              <h1 className="text-2xl font-bold">{title}</h1>
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                Scaffold
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portal Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Portal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
                
                {portalKey && (
                  <div>
                    <h3 className="font-semibold mb-2">Portal Key</h3>
                    <code className="bg-muted px-2 py-1 rounded text-sm">{portalKey}</code>
                  </div>
                )}

                {features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Planned Features</h3>
                    <ul className="space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="h-3 w-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Development Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Development Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Portal scaffold created</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Authentication configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Role-based access control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Feature implementation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/portal-selection')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Portal Selection
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/autonomous')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Autonomous AI
                </Button>
              </CardContent>
            </Card>

            {/* Autonomous Agent Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Autonomous Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">250 agents active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Portal monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Feature development</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            This portal is part of the LogiPortal TMS system. 
            Autonomous agents are continuously working to enhance this portal.
          </p>
        </div>
      </div>
    </div>
  );
}
