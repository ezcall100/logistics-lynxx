import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Volume2, Smartphone } from 'lucide-react';

const NotificationsPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Alerts, sounds & push notifications</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Alert Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure which alerts you want to receive and when.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Sound & Vibration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Customize notification sounds, vibration patterns, and volume levels.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;