/* eslint-disable @typescript-eslint/no-explicit-any */
import { getKpisForRole, KpiData } from '../data/dashboard/kpis';
import { getPerformanceData, PerformanceFilters, PerformanceMetric } from '../data/dashboard/performance';
import { getActivityData, ActivityItem } from '../data/dashboard/activity';
import { getSystemHealth, SystemHealth } from '../data/dashboard/health';
import { getPortalsByRole, PortalData } from '../data/dashboard/portals';

export interface DashboardData {
  kpis: KpiData[];
  performance: PerformanceMetric | undefined;
  activity: ActivityItem[];
  health: SystemHealth;
  portals: PortalData[];
}

export interface DashboardFilters {
  role: string;
  performanceRange?: '7d' | '30d' | '90d';
  performanceMetric?: string;
  activityLimit?: number;
}

/**
 * Main dashboard service that aggregates all dashboard data
 */
export class DashboardService {
  private static instance: DashboardService;
  private realtimeInterval: NodeJS.Timeout | null = null;

  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  /**
   * Get all dashboard data for a specific role
   */
  async getDashboardData(filters: DashboardFilters): Promise<DashboardData> {
    const { role, performanceRange = '30d', performanceMetric = 'revenue', activityLimit = 10 } = filters;

    const [kpis, performance, activity, health, portals] = await Promise.all([
      this.getKpis(role),
      this.getPerformance({ range: performanceRange, metric: performanceMetric }),
      this.getActivity(activityLimit),
      this.getHealth(),
      this.getPortals(role)
    ]);

    return {
      kpis,
      performance,
      activity,
      health,
      portals
    };
  }

  /**
   * Get KPIs for a specific role
   */
  async getKpis(role: string): Promise<KpiData[]> {
    return getKpisForRole(role);
  }

  /**
   * Get performance data with filters
   */
  async getPerformance(filters: PerformanceFilters): Promise<PerformanceMetric | undefined> {
    return getPerformanceData(filters);
  }

  /**
   * Get activity data
   */
  async getActivity(limit: number = 10): Promise<ActivityItem[]> {
    return getActivityData(limit);
  }

  /**
   * Get system health data
   */
  async getHealth(): Promise<SystemHealth> {
    return getSystemHealth();
  }

  /**
   * Get portals accessible to a specific role
   */
  async getPortals(role: string): Promise<PortalData[]> {
    return getPortalsByRole(role);
  }

  /**
   * Start real-time updates for KPIs
   */
  startRealtimeUpdates(callback: (data: Partial<DashboardData>) => void, interval: number = 30000): void {
    if (this.realtimeInterval) {
      this.stopRealtimeUpdates();
    }

    this.realtimeInterval = setInterval(async () => {
      try {
        // Update KPIs with slight variations to simulate real-time data
        const kpis = await this.getKpis('super_admin');
        const updatedKpis = kpis.map(kpi => ({
          ...kpi,
          value: this.simulateRealtimeValue(kpi.value, kpi.trend)
        }));

        callback({ kpis: updatedKpis });
      } catch (error) {
        console.error('Error updating real-time data:', error);
      }
    }, interval);
  }

  /**
   * Stop real-time updates
   */
  stopRealtimeUpdates(): void {
    if (this.realtimeInterval) {
      clearInterval(this.realtimeInterval);
      this.realtimeInterval = null;
    }
  }

  /**
   * Simulate real-time value changes
   */
  private simulateRealtimeValue(value: string | number, trend: 'up' | 'down' | 'stable'): string | number {
    if (typeof value === 'string') {
      // Handle string values like "$2.4M", "1,247", etc.
      const numericValue = parseFloat(value.replace(/[$,%]/g, ''));
      if (isNaN(numericValue)) return value;

      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const newValue = numericValue * (1 + variation);

      if (value.includes('$')) {
        return `$${(newValue / 1000000).toFixed(1)}M`;
      } else if (value.includes('%')) {
        return `${newValue.toFixed(1)}%`;
      } else {
        return Math.round(newValue).toLocaleString();
      }
    } else {
      // Handle numeric values
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      return Math.round(value * (1 + variation));
    }
  }

  /**
   * Execute a quick action
   */
  async executeQuickAction(action: string, portalId: string): Promise<{ success: boolean; message: string }> {
    // Simulate action execution
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const actions: Record<string, string> = {
      create_load: 'Load created successfully',
      find_carriers: 'Carrier search completed',
      view_reports: 'Reports generated',
      dispatch_load: 'Load dispatched to driver',
      manage_fleet: 'Fleet management accessed',
      driver_schedule: 'Driver schedule updated',
      view_loads: 'Loads retrieved',
      update_status: 'Status updated',
      check_in: 'Check-in completed',
      create_shipment: 'Shipment created',
      track_shipments: 'Tracking data retrieved',
      get_quote: 'Quote generated',
      manage_users: 'User management accessed',
      system_settings: 'Settings updated',
      view_logs: 'Logs retrieved',
      create_user: 'User created successfully',
      system_overview: 'System overview generated',
      security_settings: 'Security settings updated',
      post_load: 'Load posted successfully to the board',
      find_loads: 'Load search completed',
      bid_on_load: 'Bid submitted successfully',
      generate_report: 'Report generated',
      view_dashboard: 'Dashboard accessed',
      export_data: 'Data exported',
      ai_insights: 'AI insights generated',
      optimize_routes: 'Routes optimized',
      predict_demand: 'Demand prediction completed',
      process_invoice: 'Invoice processed',
      view_finances: 'Financial data retrieved',
      manage_clients: 'Client management accessed',
      view_contracts: 'Contracts retrieved',
      financial_reports: 'Financial reports generated',
      manage_expenses: 'Expenses updated successfully',
      add_contact: 'Contact added successfully',
      view_opportunities: 'Opportunities retrieved',
      generate_leads: 'Lead generation completed',
      customer_analytics: 'Customer analytics generated',
      create_invoice: 'Invoice created successfully',
      process_payment: 'Payment processed successfully',
      view_financial_reports: 'Financial reports generated',
      send_document: 'EDI document sent successfully',
      receive_document: 'EDI document received and processed',
      view_transactions: 'EDI transactions retrieved',
      manage_partners: 'EDI partners updated successfully',
      browse_services: 'Services retrieved successfully',
      list_service: 'Service listed successfully',
      place_order: 'Order placed successfully',
      manage_listings: 'Listings updated successfully',
      view_packets: 'Onboarding packets retrieved successfully',
      upload_documents: 'Documents uploaded successfully',
      sign_agreements: 'Agreements signed successfully',
                  track_compliance: 'Compliance status updated successfully',
            configure_dashboards: 'Dashboard configuration updated successfully',
            view_analytics: 'Analytics data retrieved successfully'
    };

    const message = actions[action] || 'Action completed successfully';
    
    return {
      success: Math.random() > 0.1, // 90% success rate
      message
    };
  }

  /**
   * Get activity details for a specific activity
   */
  async getActivityDetails(activityId: string): Promise<ActivityItem | null> {
    const activities = await this.getActivity(50);
    return activities.find(activity => activity.id === activityId) || null;
  }

  /**
   * Run a system health check
   */
  async runHealthCheck(): Promise<{ success: boolean; latency: number; message: string }> {
    const startTime = Date.now();
    
    // Simulate health check
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const latency = Date.now() - startTime;
    const success = latency < 500;
    
    return {
      success,
      latency,
      message: success ? 'Health check passed' : 'Health check failed - high latency detected'
    };
  }
}

// Export singleton instance
export const dashboardService = DashboardService.getInstance();

// Export individual functions for backward compatibility
export const getKpis = (role: string) => dashboardService.getKpis(role);
export const getPerformance = (filters: PerformanceFilters) => dashboardService.getPerformance(filters);
export const getActivity = (limit: number) => dashboardService.getActivity(limit);
export const getHealth = () => dashboardService.getHealth();
export const getPortals = (role: string) => dashboardService.getPortals(role);
export const executeQuickAction = (action: string, portalId: string) => dashboardService.executeQuickAction(action, portalId);
export const getActivityDetails = (activityId: string) => dashboardService.getActivityDetails(activityId);
export const runHealthCheck = () => dashboardService.runHealthCheck();
export const startRealtimeUpdates = (callback: (data: Partial<DashboardData>) => void, interval?: number) => 
  dashboardService.startRealtimeUpdates(callback, interval);
export const stopRealtimeUpdates = () => dashboardService.stopRealtimeUpdates();
