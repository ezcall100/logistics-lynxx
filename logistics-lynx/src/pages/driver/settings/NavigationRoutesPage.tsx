import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Map, Route } from 'lucide-react';

const NavigationRoutesPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Navigation & Routes</h1>
        <p className="text-muted-foreground">GPS settings & route preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="w-5 h-5" />
              <span>GPS Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure GPS accuracy, voice guidance, and navigation preferences.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="w-5 h-5" />
              <span>Route Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set preferences for truck routes, toll avoidance, and route optimization.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavigationRoutesPage;