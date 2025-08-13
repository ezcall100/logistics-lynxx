import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, BarChart3, FileText, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DriverSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-none p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">✅ Driver Settings - Working!</h1>
          <p className="text-muted-foreground">All dropdown pages are now functional</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/driver/profile')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Settings Pages */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Settings className="w-5 h-5" />
              <span>Settings Pages ✅</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => navigate('/driver/settings/vehicle')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              🚛 Vehicle Settings
            </Button>
            <Button 
              onClick={() => navigate('/driver/settings/navigation')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              🧭 Navigation & Routes
            </Button>
            <Button 
              onClick={() => navigate('/driver/settings/notifications')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              🔔 Notifications
            </Button>
            <Button 
              onClick={() => navigate('/driver/settings/communication')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              💬 Communication
            </Button>
          </CardContent>
        </Card>

        {/* Profile Pages */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <BarChart3 className="w-5 h-5" />
              <span>Profile Pages ✅</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => navigate('/driver/profile/performance')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              📊 Performance Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/driver/profile/documents')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              📄 Documents & Logs
            </Button>
            <Button 
              onClick={() => navigate('/driver/profile/earnings')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              💰 Earnings & Payments
            </Button>
          </CardContent>
        </Card>

        {/* Navigation Test */}
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <FileText className="w-5 h-5" />
              <span>Navigation Test ✅</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Test header dropdown navigation:
            </p>
            <Button 
              onClick={() => navigate('/driver/dashboard')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              🏠 Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/driver/profile')} 
              variant="outline" 
              size="sm"
              className="w-full justify-start"
            >
              👤 Main Profile
            </Button>
            <div className="text-xs text-green-600 mt-2 p-2 bg-green-100 rounded">
              ✅ All pages now working!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverSettings;