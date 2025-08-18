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
    { name: 'AI Dashboard', icon: '🤖', path: '/autonomous/dashboard' },
    { 
      name: 'Agent Management', 
      icon: '👥', 
      submenu: [
        { name: 'Active Agents', path: '/autonomous/agents', icon: '🤖' },
        { name: 'Agent Performance', path: '/autonomous/performance', icon: '📊' },
        { name: 'Agent Logs', path: '/autonomous/logs', icon: '📋' }
      ]
    },
    { 
      name: 'System Monitoring', 
      icon: '📊', 
      submenu: [
        { name: 'Real-time Metrics', path: '/autonomous/metrics', icon: '📊' },
        { name: 'System Health', path: '/autonomous/health', icon: '❤️' },
        { name: 'Alert Management', path: '/autonomous/alerts', icon: '🔔' }
      ]
    },
    { 
      name: 'Development', 
      icon: '💻', 
      submenu: [
        { name: 'Code Changes', path: '/autonomous/code', icon: '💻' },
        { name: 'Deployments', path: '/autonomous/deployments', icon: '🚀' },
        { name: 'Testing', path: '/autonomous/testing', icon: '🧪' }
      ]
    },
    { name: 'Configuration', icon: '⚙️', path: '/autonomous/config' }
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
