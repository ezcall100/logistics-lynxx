/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'system';
  user?: string;
  portal?: string;
  action?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export const getActivityData = (limit: number = 10): ActivityItem[] => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      title: 'New shipment created',
      description: 'Load #1234 assigned to carrier ABC Trucking',
      type: 'success',
      user: 'John Smith',
      portal: 'Broker Portal',
      action: 'Create Load',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      metadata: {
        loadId: '1234',
        carrier: 'ABC Trucking',
        origin: 'Los Angeles, CA',
        destination: 'New York, NY'
      }
    },
    {
      id: '2',
      title: 'Carrier assigned',
      description: 'Carrier XYZ Logistics assigned to Load #1230',
      type: 'info',
      user: 'Sarah Johnson',
      portal: 'Broker Portal',
      action: 'Assign Carrier',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      metadata: {
        loadId: '1230',
        carrier: 'XYZ Logistics',
        rate: '$2,450'
      }
    },
    {
      id: '3',
      title: 'Load delivered successfully',
      description: 'Load #1228 delivered on time to destination',
      type: 'success',
      user: 'Mike Wilson',
      portal: 'Driver Portal',
      action: 'Complete Delivery',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      metadata: {
        loadId: '1228',
        deliveryTime: '2.3 days',
        customerRating: '5/5'
      }
    },
    {
      id: '4',
      title: 'Payment processed',
      description: 'Invoice #INV-2024-001 paid successfully',
      type: 'success',
      user: 'System',
      portal: 'Factoring Portal',
      action: 'Process Payment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      metadata: {
        invoiceId: 'INV-2024-001',
        amount: '$3,250',
        method: 'ACH'
      }
    },
    {
      id: '5',
      title: 'System maintenance scheduled',
      description: 'Database maintenance scheduled for 2:00 AM EST',
      type: 'warning',
      user: 'System Admin',
      portal: 'Admin Portal',
      action: 'Schedule Maintenance',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      metadata: {
        duration: '30 minutes',
        affectedServices: ['API', 'Database']
      }
    },
    {
      id: '6',
      title: 'New user registered',
      description: 'Driver account created for Jane Doe',
      type: 'info',
      user: 'HR Manager',
      portal: 'Admin Portal',
      action: 'Create User',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      metadata: {
        userId: 'USR-2024-001',
        role: 'Driver',
        email: 'jane.doe@company.com'
      }
    },
    {
      id: '7',
      title: 'Route optimization completed',
      description: 'AI optimized route for 15 loads, saving 2.3 hours',
      type: 'success',
      user: 'AI System',
      portal: 'Autonomous Portal',
      action: 'Optimize Routes',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      metadata: {
        loadsOptimized: 15,
        timeSaved: '2.3 hours',
        fuelSaved: '45 gallons'
      }
    },
    {
      id: '8',
      title: 'High API latency detected',
      description: 'API response time increased to 2.3 seconds',
      type: 'warning',
      user: 'System',
      portal: 'System Health',
      action: 'Monitor Performance',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      metadata: {
        currentLatency: '2.3s',
        threshold: '1.5s',
        endpoint: '/api/shipments'
      }
    },
    {
      id: '9',
      title: 'Analytics report generated',
      description: 'Monthly performance report generated and sent',
      type: 'info',
      user: 'Analytics System',
      portal: 'Analytics Portal',
      action: 'Generate Report',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      metadata: {
        reportType: 'Monthly Performance',
        recipients: 15,
        dataPoints: 1247
      }
    },
    {
      id: '10',
      title: 'Carrier application approved',
      description: 'New carrier application approved for Fast Freight Inc',
      type: 'success',
      user: 'Carrier Manager',
      portal: 'Admin Portal',
      action: 'Approve Application',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        carrierName: 'Fast Freight Inc',
        applicationId: 'APP-2024-001',
        fleetSize: 25
      }
    },
    {
      id: '11',
      title: 'Fuel price alert',
      description: 'Fuel prices increased by 8% in Northeast region',
      type: 'warning',
      user: 'Market Analysis',
      portal: 'Analytics Portal',
      action: 'Price Alert',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      metadata: {
        region: 'Northeast',
        priceIncrease: '8%',
        affectedRoutes: 45
      }
    },
    {
      id: '12',
      title: 'Customer feedback received',
      description: '5-star rating received for delivery service',
      type: 'success',
      user: 'Customer',
      portal: 'Shipper Portal',
      action: 'Submit Feedback',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      metadata: {
        rating: '5/5',
        loadId: '1225',
        comments: 'Excellent service, on time delivery'
      }
    }
  ];

  return activities.slice(0, limit);
};

export const getActivityByType = (type: ActivityItem['type']): ActivityItem[] => {
  return getActivityData().filter(item => item.type === type);
};

export const getActivityByPortal = (portal: string): ActivityItem[] => {
  return getActivityData().filter(item => item.portal === portal);
};
