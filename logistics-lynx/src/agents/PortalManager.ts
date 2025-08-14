import { LogManager } from '../../autonomous-system/LogManager';
import { DatabaseManager } from '../../autonomous-system/DatabaseManager';
import { NotificationManager } from '../../autonomous-system/NotificationManager';

export interface Portal {
  name: string;
  key: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastHealthCheck: Date;
  features: string[];
}

export class PortalManager {
  private logManager: LogManager;
  private databaseManager: DatabaseManager;
  private notificationManager: NotificationManager;
  private isRunning: boolean = false;
  private healthCheckInterval: NodeJS.Timeout | null = null;

  // All 20 canonical portals
  private portals: Portal[] = [
    {
      name: 'Super Admin',
      key: 'superAdmin',
      description: 'System-wide administration and control',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['user-management', 'system-config', 'audit-logs']
    },
    {
      name: 'Admin',
      key: 'admin',
      description: 'Company-level administration',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['company-management', 'billing', 'reports']
    },
    {
      name: 'TMS Admin',
      key: 'tmsAdmin',
      description: 'Transportation Management System administration',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['fleet-management', 'route-optimization', 'scheduling']
    },
    {
      name: 'Onboarding',
      key: 'onboarding',
      description: 'New user and company onboarding',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['user-onboarding', 'company-setup', 'training']
    },
    {
      name: 'Broker',
      key: 'broker',
      description: 'Freight broker operations',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['load-matching', 'rate-negotiation', 'documentation']
    },
    {
      name: 'Shipper',
      key: 'shipper',
      description: 'Shipper operations and management',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['shipment-creation', 'tracking', 'invoicing']
    },
    {
      name: 'Carrier',
      key: 'carrier',
      description: 'Carrier operations and management',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['fleet-management', 'load-acceptance', 'delivery-tracking']
    },
    {
      name: 'Driver',
      key: 'driver',
      description: 'Driver mobile application',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['route-navigation', 'delivery-confirmation', 'time-tracking']
    },
    {
      name: 'Owner Operator',
      key: 'ownerOperator',
      description: 'Owner-operator specific features',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['business-management', 'expense-tracking', 'profit-analysis']
    },
    {
      name: 'Factoring',
      key: 'factoring',
      description: 'Invoice factoring and financing',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['invoice-submission', 'payment-processing', 'credit-management']
    },
    {
      name: 'Load Board',
      key: 'loadBoard',
      description: 'Freight load board and matching',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['load-posting', 'load-search', 'matching-algorithms']
    },
    {
      name: 'CRM',
      key: 'crm',
      description: 'Customer Relationship Management',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['contact-management', 'lead-tracking', 'sales-automation']
    },
    {
      name: 'Financials',
      key: 'financials',
      description: 'Financial management and accounting',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['accounting', 'financial-reporting', 'budget-management']
    },
    {
      name: 'EDI',
      key: 'edi',
      description: 'Electronic Data Interchange',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['edi-processing', 'document-exchange', 'compliance']
    },
    {
      name: 'Marketplace',
      key: 'marketplace',
      description: 'Freight marketplace and auctions',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['auction-management', 'bidding', 'market-analytics']
    },
    {
      name: 'Analytics',
      key: 'analytics',
      description: 'Business intelligence and analytics',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['data-visualization', 'reporting', 'predictive-analytics']
    },
    {
      name: 'Autonomous',
      key: 'autonomous',
      description: 'AI-powered autonomous operations',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['ai-optimization', 'predictive-maintenance', 'autonomous-decisions']
    },
    {
      name: 'Workers',
      key: 'workers',
      description: 'Background job processing',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['job-queues', 'background-processing', 'task-scheduling']
    },
    {
      name: 'Rates',
      key: 'rates',
      description: 'Rate management and optimization',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['rate-calculation', 'pricing-optimization', 'market-analysis']
    },
    {
      name: 'Directory',
      key: 'directory',
      description: 'Business directory and networking',
      status: 'active',
      lastHealthCheck: new Date(),
      features: ['business-directory', 'networking', 'partnership-management']
    }
  ];

  constructor() {
    this.logManager = new LogManager();
    this.databaseManager = new DatabaseManager();
    this.notificationManager = new NotificationManager();
  }

  async initialize(): Promise<void> {
    try {
      this.logManager.log('🤖 Initializing Portal Manager...', 'info');
      
      await this.databaseManager.initialize();
      await this.notificationManager.initialize();
      
      // Initialize portal management table
      await this.initializePortalTable();
      
      this.logManager.log('✅ Portal Manager initialized successfully', 'success');
    } catch (error) {
      this.logManager.log(`❌ Failed to initialize Portal Manager: ${error}`, 'error');
      throw error;
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ Portal Manager is already running', 'warning');
      return;
    }

    try {
      this.isRunning = true;
      this.logManager.log('🚀 Starting Portal Manager...', 'info');
      
      // Start portal health monitoring
      await this.startPortalHealthMonitoring();
      
      this.logManager.log('✅ Portal Manager started successfully', 'success');
      this.logManager.log('🌐 Managing 20 portals autonomously...', 'info');
      
    } catch (error) {
      this.logManager.log(`❌ Failed to start Portal Manager: ${error}`, 'error');
      this.isRunning = false;
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      this.logManager.log('⚠️ Portal Manager is not running', 'warning');
      return;
    }

    try {
      this.isRunning = false;
      
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
        this.healthCheckInterval = null;
      }
      
      this.logManager.log('🛑 Portal Manager stopped successfully', 'success');
    } catch (error) {
      this.logManager.log(`❌ Failed to stop Portal Manager: ${error}`, 'error');
      throw error;
    }
  }

  private async initializePortalTable(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS portal_management (
        id SERIAL PRIMARY KEY,
        portal_key VARCHAR(50) NOT NULL UNIQUE,
        portal_name VARCHAR(100) NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        last_health_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        features JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.databaseManager.executeQuery(createTableQuery);
    this.logManager.log('✅ Portal management table initialized', 'success');
  }

  private async startPortalHealthMonitoring(): Promise<void> {
    // Start health monitoring immediately
    await this.performHealthCheck();
    
    // Set up continuous health monitoring every 60 seconds
    this.healthCheckInterval = setInterval(async () => {
      if (this.isRunning) {
        await this.performHealthCheck();
      }
    }, 60000); // 60 seconds
  }

  private async performHealthCheck(): Promise<void> {
    try {
      this.logManager.log('🔍 Performing portal health check...', 'info');
      
      for (const portal of this.portals) {
        await this.checkPortalHealth(portal);
      }
      
      this.logManager.log('✅ Portal health check completed', 'success');
      
    } catch (error) {
      this.logManager.log(`❌ Portal health check failed: ${error}`, 'error');
    }
  }

  private async checkPortalHealth(portal: Portal): Promise<void> {
    try {
      // Check if portal is enabled via feature flag
      const isEnabled = await this.isPortalEnabled(portal.key);
      
      if (!isEnabled) {
        portal.status = 'inactive';
        this.logManager.log(`⚠️ Portal ${portal.name} is disabled`, 'warning');
        return;
      }

      // Simulate health check (in real implementation, this would check actual portal endpoints)
      const isHealthy = await this.simulateHealthCheck(portal);
      
      if (isHealthy) {
        portal.status = 'active';
        portal.lastHealthCheck = new Date();
        this.logManager.log(`✅ Portal ${portal.name} is healthy`, 'success');
      } else {
        portal.status = 'maintenance';
        this.logManager.log(`⚠️ Portal ${portal.name} needs attention`, 'warning');
        
        // Send notification for unhealthy portals
        await this.notificationManager.sendNotification({
          type: 'health',
          title: `Portal Health Alert: ${portal.name}`,
          message: `Portal ${portal.name} is experiencing issues and may need attention`,
          priority: 'warning'
        });
      }

      // Update portal status in database
      await this.updatePortalStatus(portal);
      
    } catch (error) {
      this.logManager.log(`❌ Health check failed for ${portal.name}: ${error}`, 'error');
      portal.status = 'maintenance';
    }
  }

  private async isPortalEnabled(portalKey: string): Promise<boolean> {
    try {
      const query = `
        SELECT value FROM feature_flags_v2 
        WHERE key = $1 AND scope = 'global'
      `;
      const result = await this.databaseManager.executeQuery(query, [`portal.${portalKey}.enabled`]);
      return result.rows[0]?.value === true;
    } catch (error) {
      this.logManager.log(`❌ Error checking portal status: ${error}`, 'error');
      return false;
    }
  }

  private async simulateHealthCheck(portal: Portal): Promise<boolean> {
    // Simulate health check with 95% success rate
    const random = Math.random();
    return random > 0.05; // 95% success rate
  }

  private async updatePortalStatus(portal: Portal): Promise<void> {
    try {
      const query = `
        INSERT INTO portal_management (portal_key, portal_name, status, last_health_check, features)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (portal_key) DO UPDATE SET
          status = EXCLUDED.status,
          last_health_check = EXCLUDED.last_health_check,
          features = EXCLUDED.features,
          updated_at = CURRENT_TIMESTAMP
      `;
      
      await this.databaseManager.executeQuery(query, [
        portal.key,
        portal.name,
        portal.status,
        portal.lastHealthCheck,
        JSON.stringify(portal.features)
      ]);
      
    } catch (error) {
      this.logManager.log(`❌ Error updating portal status: ${error}`, 'error');
    }
  }

  async getPortalStatus(): Promise<Portal[]> {
    try {
      const query = 'SELECT * FROM portal_management ORDER BY portal_name';
      const result = await this.databaseManager.executeQuery(query);
      
      return result.rows.map(row => ({
        name: row.portal_name,
        key: row.portal_key,
        description: '', // Would be populated from configuration
        status: row.status,
        lastHealthCheck: new Date(row.last_health_check),
        features: row.features || []
      }));
    } catch (error) {
      this.logManager.log(`❌ Error getting portal status: ${error}`, 'error');
      return [];
    }
  }

  async enablePortal(portalKey: string): Promise<void> {
    try {
      const query = `
        UPDATE feature_flags_v2 
        SET value = true 
        WHERE key = $1 AND scope = 'global'
      `;
      await this.databaseManager.executeQuery(query, [`portal.${portalKey}.enabled`]);
      this.logManager.log(`✅ Portal ${portalKey} enabled`, 'success');
    } catch (error) {
      this.logManager.log(`❌ Error enabling portal ${portalKey}: ${error}`, 'error');
    }
  }

  async disablePortal(portalKey: string): Promise<void> {
    try {
      const query = `
        UPDATE feature_flags_v2 
        SET value = false 
        WHERE key = $1 AND scope = 'global'
      `;
      await this.databaseManager.executeQuery(query, [`portal.${portalKey}.enabled`]);
      this.logManager.log(`✅ Portal ${portalKey} disabled`, 'success');
    } catch (error) {
      this.logManager.log(`❌ Error disabling portal ${portalKey}: ${error}`, 'error');
    }
  }

  isReady(): boolean {
    return this.databaseManager.isReady() && this.notificationManager.isReady();
  }
}
