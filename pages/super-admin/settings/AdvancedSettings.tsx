import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Code } from 'lucide-react';
import { executeFabAction } from '../../../components/FabActions';

interface AdvancedSettingsProps {}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleFabAction = async (action: string, params?: any) => {
    try {
      const result = await executeFabAction(action as any, params);
      if (result.success) {
        console.log('FAB action successful:', result.message);
      }
    } catch (error) {
      console.error('FAB action failed:', error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Advanced Settings
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleFabAction('quickAction', { action: 'refresh', page: 'settings-advanced' })}
            >
              Refresh
            </Button>
            <Button 
              variant="default"
              onClick={() => handleFabAction('assistant', 'Help me with Advanced Settings')}
            >
              AI Assistant
            </Button>
          </div>
        </div>
        <p className="text-gray-600">
          Developer options, debug settings, experimental features
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Developer options, debug settings, experimental features</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Content Section */}
              <div className="text-center py-8">
                <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Advanced Settings
                </h3>
                <p className="text-gray-600 mt-2">
                  Developer options, debug settings, experimental features
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Developer Options</Badge>
                  <Badge variant="outline">Debug Settings</Badge>
                  <Badge variant="outline">Experimental Features</Badge>
                </div>
              </div>

              {/* FAB Integration Section */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('dispatch', { type: 'settings-advanced_action', payload: { action: 'configure' } })}
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('assistant', 'Help me understand Advanced Settings')}
                  >
                    <Bot className="h-5 w-5 mb-1" />
                    AI Help
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('quickAction', { action: 'export', page: 'settings-advanced' })}
                  >
                    <Download className="h-5 w-5 mb-1" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Settings Section for Settings Pages */}
              
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Settings Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Auto-save</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Backup</span>
                    <Button variant="outline" size="sm">Schedule</Button>
                  </div>
                </div>
              </div>
              

              {/* Profile Section for Profile Pages */}
              

              {/* FAB Section for FAB Pages */}
              
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSettings;
