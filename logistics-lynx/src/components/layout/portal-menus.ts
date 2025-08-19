// Portal-specific menu configurations
export const portalMenus = {
  carrier: [
    { name: 'Dashboard', icon: '📊', path: '/carrier/dashboard' },
    { 
      name: 'Fleet Management', 
      icon: '🚛', 
      submenu: [
        { name: 'Vehicles', path: '/carrier/vehicles', icon: '🚛' },
        { name: 'Drivers', path: '/carrier/drivers', icon: '👥' },
        { name: 'Maintenance', path: '/carrier/maintenance', icon: '🔧' }
      ]
    },
    { 
      name: 'Load Management', 
      icon: '📦', 
      submenu: [
        { name: 'Available Loads', path: '/carrier/loads', icon: '📦' },
        { name: 'Active Loads', path: '/carrier/active-loads', icon: '📦' },
        { name: 'Completed Loads', path: '/carrier/completed-loads', icon: '✅' }
      ]
    },
    { name: 'Route Optimization', icon: '🗺️', path: '/carrier/routes' },
    { name: 'Reports', icon: '📈', path: '/carrier/reports' },
    { name: 'Settings', icon: '⚙️', path: '/carrier/settings' }
  ],
  
  broker: [
    { name: 'Dashboard', icon: '📊', path: '/broker/dashboard' },
    { 
      name: 'Load Board', 
      icon: '📋', 
      submenu: [
        { name: 'Available Loads', path: '/broker/loads', icon: '📦' },
        { name: 'Post Load', path: '/broker/post-load', icon: '➕' },
        { name: 'Load History', path: '/broker/load-history', icon: '📅' }
      ]
    },
    { 
      name: 'Carrier Network', 
      icon: '🚛', 
      submenu: [
        { name: 'Carriers', path: '/broker/carriers', icon: '🚛' },
        { name: 'Add Carrier', path: '/broker/add-carrier', icon: '➕' },
        { name: 'Carrier Ratings', path: '/broker/carrier-ratings', icon: '⭐' }
      ]
    },
    { name: 'Rate Management', icon: '💰', path: '/broker/rates' },
    { name: 'Analytics', icon: '📈', path: '/broker/analytics' },
    { name: 'Settings', icon: '⚙️', path: '/broker/settings' }
  ],
  
  autonomous: [
    { name: 'Autonomous System', icon: '🤖', path: '/autonomous' },
    { name: 'Agent Dashboard', icon: '🤖', path: '/autonomous/agent-dashboard' },
    { name: 'Performance Monitor', icon: '📊', path: '/autonomous/performance-monitor' },
    { name: 'Learning Models', icon: '🧠', path: '/autonomous/learning-models' },
    { name: 'Decision Logs', icon: '📝', path: '/autonomous/decision-logs' },
    { name: 'Auto Scaling', icon: '⚡', path: '/autonomous/auto-scaling' }
  ],
  
  analytics: [
    { name: 'Overview', icon: '📊', path: '/analytics/overview' },
    { 
      name: 'Performance', 
      icon: '📈', 
      submenu: [
        { name: 'Business Metrics', path: '/analytics/business', icon: '📊' },
        { name: 'Operational KPIs', path: '/analytics/operational', icon: '📈' },
        { name: 'Financial Reports', path: '/analytics/financial', icon: '💰' }
      ]
    },
    { 
      name: 'Data Insights', 
      icon: '🔍', 
      submenu: [
        { name: 'Trend Analysis', path: '/analytics/trends', icon: '📈' },
        { name: 'Predictive Analytics', path: '/analytics/predictive', icon: '🔮' },
        { name: 'Custom Reports', path: '/analytics/custom', icon: '📋' }
      ]
    },
    { name: 'Export', icon: '📤', path: '/analytics/export' }
  ]
};
