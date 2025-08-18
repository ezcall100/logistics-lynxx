import { DashboardData } from './ModernDashboard';

// Sample data for different portal types
export const sampleDashboardData: Record<string, DashboardData> = {
  carrier: {
    metrics: [
      { title: 'Active Vehicles', value: '24', change: 12, icon: '🚛', color: '#3b82f6' },
      { title: 'Active Drivers', value: '18', change: 8, icon: '👤', color: '#10b981' },
      { title: 'Active Loads', value: '12', change: -3, icon: '📦', color: '#f59e0b' },
      { title: 'Revenue (MTD)', value: '$45,231', change: 23, icon: '💰', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success' as const, title: 'Load #1234 delivered successfully', time: '2 minutes ago' },
      { type: 'warning' as const, title: 'Vehicle #567 needs maintenance', time: '15 minutes ago' },
      { type: 'success' as const, title: 'New driver John Smith onboarded', time: '1 hour ago' },
      { type: 'success' as const, title: 'Route optimization completed', time: '2 hours ago' }
    ],
    quickActions: [
      { icon: '➕', label: 'Add Vehicle', variant: 'outline' as const },
      { icon: '👤', label: 'Add Driver', variant: 'outline' as const },
      { icon: '📦', label: 'Assign Load', variant: 'outline' as const },
      { icon: '🗺️', label: 'Plan Route', variant: 'outline' as const }
    ],
    systemStatus: [
      { name: 'Fleet Management', status: 'online' as const, description: 'All systems operational' },
      { name: 'GPS Tracking', status: 'online' as const, description: 'Real-time tracking active' },
      { name: 'Documentation', status: 'warning' as const, description: '3 documents pending review' },
      { name: 'Maintenance', status: 'error' as const, description: '2 vehicles due for service' }
    ]
  },
  
  broker: {
    metrics: [
      { title: 'Available Loads', value: '156', change: 15, icon: '📋', color: '#10b981' },
      { title: 'Active Carriers', value: '89', change: 7, icon: '🚛', color: '#3b82f6' },
      { title: 'Match Rate', value: '96.7%', change: 2.1, icon: '🎯', color: '#f59e0b' },
      { title: 'Revenue (MTD)', value: '$67,890', change: 18, icon: '💰', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success' as const, title: 'Load matched with carrier ABC Trucking', time: '5 minutes ago' },
      { type: 'success' as const, title: 'Rate negotiation completed for Load #5678', time: '20 minutes ago' },
      { type: 'warning' as const, title: 'Carrier XYZ needs documentation update', time: '1 hour ago' },
      { type: 'success' as const, title: 'New shipper account created', time: '2 hours ago' }
    ],
    quickActions: [
      { icon: '📋', label: 'Post Load', variant: 'outline' as const },
      { icon: '🚛', label: 'Add Carrier', variant: 'outline' as const },
      { icon: '💰', label: 'Set Rates', variant: 'outline' as const },
      { icon: '📊', label: 'View Analytics', variant: 'outline' as const }
    ],
    systemStatus: [
      { name: 'Load Board', status: 'online' as const, description: 'All loads visible' },
      { name: 'Carrier Network', status: 'online' as const, description: '89 active carriers' },
      { name: 'Rate Engine', status: 'online' as const, description: 'Real-time pricing active' },
      { name: 'Documentation', status: 'warning' as const, description: '5 carriers need updates' }
    ]
  },
  
  autonomous: {
    metrics: [
      { title: 'Active Agents', value: '250+', change: 5, icon: '🤖', color: '#6366f1' },
      { title: 'Success Rate', value: '98.5%', change: 0.3, icon: '✅', color: '#10b981' },
      { title: 'Response Time', value: '~150ms', change: -12, icon: '⚡', color: '#f59e0b' },
      { title: 'Code Changes', value: '47', change: 23, icon: '💻', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success' as const, title: 'Agent #123 completed code review', time: '1 minute ago' },
      { type: 'success' as const, title: 'Deployment to staging successful', time: '5 minutes ago' },
      { type: 'success' as const, title: 'Performance optimization completed', time: '15 minutes ago' },
      { type: 'warning' as const, title: 'Agent #456 needs attention', time: '30 minutes ago' }
    ],
    quickActions: [
      { icon: '🤖', label: 'Add Agent', variant: 'outline' as const },
      { icon: '📊', label: 'View Metrics', variant: 'outline' as const },
      { icon: '⚙️', label: 'Configure', variant: 'outline' as const },
      { icon: '📝', label: 'View Logs', variant: 'outline' as const }
    ],
    systemStatus: [
      { name: 'AI Engine', status: 'online' as const, description: 'All agents operational' },
      { name: 'Code Repository', status: 'online' as const, description: 'Git sync active' },
      { name: 'Deployment Pipeline', status: 'online' as const, description: 'CI/CD running' },
      { name: 'Monitoring', status: 'warning' as const, description: 'High memory usage' }
    ]
  }
};
