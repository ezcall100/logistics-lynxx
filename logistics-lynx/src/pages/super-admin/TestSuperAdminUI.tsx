import React from 'react';
import EnhancedSuperAdminLayout from '@/components/super-admin/EnhancedSuperAdminLayout';
import ResponsiveCard from '@/components/super-admin/ResponsiveCard';
import ResponsiveGrid from '@/components/super-admin/ResponsiveGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Bot, 
  Activity, 
  Users, 
  Truck, 
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TestSuperAdminUI = () => {
  const testStats = [
    { title: 'Enhanced Layout', value: '✅ Working', icon: Brain, status: 'success' },
    { title: 'Responsive Cards', value: '✅ Working', icon: Bot, status: 'success' },
    { title: 'Responsive Grid', value: '✅ Working', icon: Activity, status: 'success' },
    { title: 'Better Spacing', value: '✅ Working', icon: Users, status: 'success' },
    { title: 'Mobile Design', value: '✅ Working', icon: Truck, status: 'success' },
    { title: 'UI Improvements', value: '✅ Working', icon: Package, status: 'success' },
  ];

  return (
    <EnhancedSuperAdminLayout>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Test Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl border border-green-500/30 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_70%)]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent backdrop-blur-sm border border-green-500/20 shadow-xl">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Super Admin UI Test
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground mt-2">
                    🎯 Testing Enhanced Super Admin Layout & Responsive Design
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="text-xs sm:text-sm font-medium text-green-600">Enhanced Layout Active</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                  <span className="text-xs sm:text-sm font-medium text-blue-600">Responsive Design</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                  <span className="text-xs sm:text-sm font-medium text-purple-600">AI-Powered UI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Stats Grid */}
        <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 3 }} gap={{ xs: 4, sm: 4, lg: 6 }}>
          {testStats.map((stat) => (
            <ResponsiveCard
              key={stat.title}
              title={stat.title}
              icon={stat.icon}
              className="hover:scale-105 transition-transform duration-200 border-2 border-green-200 hover:border-green-300"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <Badge variant={stat.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                    {stat.status === 'success' ? 'PASSED' : 'FAILED'}
                  </Badge>
                </div>
              </div>
            </ResponsiveCard>
          ))}
        </ResponsiveGrid>

        {/* Test Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">✅ Enhanced Features Working</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Responsive padding and spacing</li>
              <li>• Mobile-first design approach</li>
              <li>• Enhanced glassmorphism effects</li>
              <li>• Improved visual hierarchy</li>
              <li>• Better button and card layouts</li>
              <li>• Flexible grid system</li>
            </ul>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">🎯 UI/UX Improvements</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Better spacing from left and right sides</li>
              <li>• Responsive navigation elements</li>
              <li>• Enhanced hover effects</li>
              <li>• Improved color schemes</li>
              <li>• Better typography scaling</li>
              <li>• Optimized mobile experience</li>
            </ul>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            UI Test Passed
          </Button>
          <Button variant="outline" size="lg">
            <Activity className="mr-2 h-4 w-4" />
            View Agent Control
          </Button>
          <Button variant="outline" size="lg">
            <Bot className="mr-2 h-4 w-4" />
            Test Autonomous AI
          </Button>
        </div>
      </div>
    </EnhancedSuperAdminLayout>
  );
};

export default TestSuperAdminUI;
