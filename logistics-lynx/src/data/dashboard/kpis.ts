export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  color: string;
  role?: string;
}

export interface RoleKpis {
  [role: string]: KpiData[];
}

export const mockKpis: RoleKpis = {
  super_admin: [
    {
      id: 'total-shipments',
      title: 'Total Shipments',
      value: '1,247',
      description: 'Active shipments across all carriers',
      icon: '📦',
      trend: 'up',
      change: '+12%',
      changeType: 'increase',
      color: 'blue'
    },
    {
      id: 'revenue-mtd',
      title: 'Revenue MTD',
      value: '$2.4M',
      description: 'Monthly revenue to date',
      icon: '💰',
      trend: 'up',
      change: '+8%',
      changeType: 'increase',
      color: 'green'
    },
    {
      id: 'active-carriers',
      title: 'Active Carriers',
      value: '89',
      description: 'Carriers with active loads',
      icon: '🚛',
      trend: 'up',
      change: '+5%',
      changeType: 'increase',
      color: 'purple'
    },
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.9%',
      description: 'Overall system uptime',
      icon: '🟢',
      trend: 'stable',
      change: '0%',
      changeType: 'neutral',
      color: 'emerald'
    },
    {
      id: 'on-time-delivery',
      title: 'On-Time Delivery',
      value: '94.2%',
      description: 'Deliveries completed on time',
      icon: '⏰',
      trend: 'up',
      change: '+2.1%',
      changeType: 'increase',
      color: 'orange'
    },
    {
      id: 'open-issues',
      title: 'Open Issues',
      value: '3',
      description: 'Critical issues requiring attention',
      icon: '⚠️',
      trend: 'down',
      change: '-2',
      changeType: 'decrease',
      color: 'red'
    }
  ],
  carrier_admin: [
    {
      id: 'fleet-utilization',
      title: 'Fleet Utilization',
      value: '87%',
      description: 'Active trucks in fleet',
      icon: '🚛',
      trend: 'up',
      change: '+3%',
      changeType: 'increase',
      color: 'blue'
    },
    {
      id: 'revenue-mtd',
      title: 'Revenue MTD',
      value: '$456K',
      description: 'Monthly revenue to date',
      icon: '💰',
      trend: 'up',
      change: '+15%',
      changeType: 'increase',
      color: 'green'
    },
    {
      id: 'active-drivers',
      title: 'Active Drivers',
      value: '23',
      description: 'Drivers on duty',
      icon: '👨‍💼',
      trend: 'stable',
      change: '0',
      changeType: 'neutral',
      color: 'purple'
    },
    {
      id: 'avg-delivery-time',
      title: 'Avg Delivery Time',
      value: '2.1 days',
      description: 'Average delivery duration',
      icon: '⏱️',
      trend: 'down',
      change: '-0.3 days',
      changeType: 'decrease',
      color: 'orange'
    }
  ],
  freight_broker_admin: [
    {
      id: 'active-loads',
      title: 'Active Loads',
      value: '156',
      description: 'Loads currently being brokered',
      icon: '📦',
      trend: 'up',
      change: '+8%',
      changeType: 'increase',
      color: 'blue'
    },
    {
      id: 'revenue-mtd',
      title: 'Revenue MTD',
      value: '$892K',
      description: 'Monthly revenue to date',
      icon: '💰',
      trend: 'up',
      change: '+12%',
      changeType: 'increase',
      color: 'green'
    },
    {
      id: 'carrier-partners',
      title: 'Carrier Partners',
      value: '67',
      description: 'Active carrier relationships',
      icon: '🤝',
      trend: 'up',
      change: '+3',
      changeType: 'increase',
      color: 'purple'
    },
    {
      id: 'load-fill-rate',
      title: 'Load Fill Rate',
      value: '96.8%',
      description: 'Percentage of loads filled',
      icon: '📊',
      trend: 'up',
      change: '+1.2%',
      changeType: 'increase',
      color: 'emerald'
    }
  ],
  shipper_admin: [
    {
      id: 'total-shipments',
      title: 'Total Shipments',
      value: '89',
      description: 'Shipments this month',
      icon: '📦',
      trend: 'up',
      change: '+15%',
      changeType: 'increase',
      color: 'blue'
    },
    {
      id: 'spend-mtd',
      title: 'Spend MTD',
      value: '$234K',
      description: 'Monthly shipping spend',
      icon: '💸',
      trend: 'down',
      change: '-5%',
      changeType: 'decrease',
      color: 'green'
    },
    {
      id: 'on-time-delivery',
      title: 'On-Time Delivery',
      value: '97.3%',
      description: 'Deliveries on schedule',
      icon: '⏰',
      trend: 'up',
      change: '+1.8%',
      changeType: 'increase',
      color: 'orange'
    },
    {
      id: 'avg-cost-per-mile',
      title: 'Avg Cost/Mile',
      value: '$2.34',
      description: 'Average shipping cost per mile',
      icon: '📊',
      trend: 'down',
      change: '-0.12',
      changeType: 'decrease',
      color: 'emerald'
    }
  ],
  driver: [
    {
      id: 'completed-loads',
      title: 'Completed Loads',
      value: '12',
      description: 'Loads completed this month',
      icon: '✅',
      trend: 'up',
      change: '+2',
      changeType: 'increase',
      color: 'blue'
    },
    {
      id: 'earnings-mtd',
      title: 'Earnings MTD',
      value: '$3,456',
      description: 'Monthly earnings to date',
      icon: '💰',
      trend: 'up',
      change: '+8%',
      changeType: 'increase',
      color: 'green'
    },
    {
      id: 'miles-driven',
      title: 'Miles Driven',
      value: '2,847',
      description: 'Miles driven this month',
      icon: '🛣️',
      trend: 'up',
      change: '+156',
      changeType: 'increase',
      color: 'purple'
    },
    {
      id: 'safety-score',
      title: 'Safety Score',
      value: '98.5',
      description: 'Current safety rating',
      icon: '🛡️',
      trend: 'up',
      change: '+0.5',
      changeType: 'increase',
      color: 'emerald'
    }
  ]
};

// Default to super_admin if role not found
export const getKpisForRole = (role: string): KpiData[] => {
  return mockKpis[role] || mockKpis.super_admin;
};
