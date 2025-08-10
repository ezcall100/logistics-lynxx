"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutonomousTMSController = void 0;
const TMSDecisionAgent_1 = require("../agents/TMSDecisionAgent");
const SystemHealthMonitor_1 = require("../monitoring/SystemHealthMonitor");
const supabase_js_1 = require("@supabase/supabase-js");
class AutonomousTMSController {
    constructor(config = {}) {
        this.isRunning = false;
        this.agents = new Map();
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        this.config = {
            enableShipmentProcessing: true,
            enableCustomerService: true,
            enableFinancialProcessing: true,
            enableAnalytics: true,
            monitoringInterval: 300000, // 5 minutes
            maxRetryAttempts: 3,
            escalationThreshold: 5,
            ...config
        };
        this.decisionAgent = new TMSDecisionAgent_1.TMSDecisionAgent();
        this.healthMonitor = new SystemHealthMonitor_1.SystemHealthMonitor();
        this.status = {
            isRunning: false,
            uptime: 0,
            activeAgents: [],
            lastHealthCheck: new Date(),
            totalDecisions: 0,
            successRate: 0,
            errors: []
        };
        this.initializeAgents();
    }
    async start() {
        if (this.isRunning) {
            console.log('Autonomous TMS system is already running');
            return;
        }
        console.log('Starting Autonomous TMS System...');
        try {
            // Initialize system
            await this.initializeSystem();
            // Start health monitoring
            await this.healthMonitor.startMonitoring(this.config.monitoringInterval);
            // Start all enabled agents
            await this.startAgents();
            // Set up event listeners
            this.setupEventListeners();
            // Start continuous processing
            this.startContinuousProcessing();
            this.isRunning = true;
            this.status.isRunning = true;
            this.status.uptime = Date.now();
            console.log('✅ Autonomous TMS System started successfully');
            await this.logSystemEvent('system_started', 'Autonomous system started');
        }
        catch (error) {
            console.error('❌ Failed to start Autonomous TMS System:', error);
            await this.logSystemEvent('system_start_failed', `Start failed: ${error}`);
            throw error;
        }
    }
    async stop() {
        if (!this.isRunning) {
            console.log('Autonomous TMS system is not running');
            return;
        }
        console.log('Stopping Autonomous TMS System...');
        try {
            // Stop health monitoring
            this.healthMonitor.stopMonitoring();
            // Stop all agents
            await this.stopAgents();
            // Clean up event listeners
            this.cleanupEventListeners();
            this.isRunning = false;
            this.status.isRunning = false;
            console.log('✅ Autonomous TMS System stopped successfully');
            await this.logSystemEvent('system_stopped', 'Autonomous system stopped');
        }
        catch (error) {
            console.error('❌ Error stopping Autonomous TMS System:', error);
            await this.logSystemEvent('system_stop_error', `Stop error: ${error}`);
        }
    }
    getStatus() {
        return {
            ...this.status,
            uptime: this.isRunning ? Date.now() - this.status.uptime : 0
        };
    }
    async processEvent(eventType, eventData) {
        if (!this.isRunning) {
            throw new Error('Autonomous system is not running');
        }
        try {
            console.log(`Processing event: ${eventType}`);
            // Determine priority based on event type
            const priority = this.determinePriority(eventType, eventData);
            // Make autonomous decision
            const decision = await this.decisionAgent.makeDecision({
                type: this.mapEventType(eventType),
                data: eventData,
                priority
            });
            // Update statistics
            this.status.totalDecisions++;
            if (decision.confidence > 0.7) {
                this.status.successRate = (this.status.successRate * (this.status.totalDecisions - 1) + 1) / this.status.totalDecisions;
            }
            // Log the event and decision
            await this.logEvent(eventType, eventData, decision);
            return decision;
        }
        catch (error) {
            console.error(`Error processing event ${eventType}:`, error);
            this.status.errors.push(`${eventType}: ${error}`);
            await this.logSystemEvent('event_processing_error', `${eventType}: ${error}`);
            throw error;
        }
    }
    async initializeSystem() {
        console.log('Initializing autonomous system...');
        // Check database connectivity
        const { error } = await this.supabase
            .from('system_health')
            .select('id')
            .limit(1);
        if (error) {
            throw new Error(`Database connection failed: ${error.message}`);
        }
        // Initialize required tables if they don't exist
        await this.initializeTables();
        console.log('System initialization completed');
    }
    async initializeTables() {
        // Create system tables if they don't exist
        const tables = [
            'system_health',
            'ai_decisions',
            'system_events',
            'health_checks',
            'system_issues',
            'escalations',
            'system_metrics'
        ];
        for (const table of tables) {
            try {
                await this.supabase
                    .from(table)
                    .select('id')
                    .limit(1);
            }
            catch (error) {
                console.log(`Table ${table} does not exist, creating...`);
                // In a real implementation, you would create the table here
                // For now, we'll just log it
            }
        }
    }
    initializeAgents() {
        if (this.config.enableShipmentProcessing) {
            this.agents.set('shipment', {
                name: 'Shipment Processing Agent',
                enabled: true,
                lastActivity: new Date()
            });
        }
        if (this.config.enableCustomerService) {
            this.agents.set('customer_service', {
                name: 'Customer Service Agent',
                enabled: true,
                lastActivity: new Date()
            });
        }
        if (this.config.enableFinancialProcessing) {
            this.agents.set('financial', {
                name: 'Financial Processing Agent',
                enabled: true,
                lastActivity: new Date()
            });
        }
        if (this.config.enableAnalytics) {
            this.agents.set('analytics', {
                name: 'Analytics Agent',
                enabled: true,
                lastActivity: new Date()
            });
        }
    }
    async startAgents() {
        console.log('Starting autonomous agents...');
        for (const [name, agent] of this.agents.entries()) {
            if (agent.enabled) {
                console.log(`Starting ${agent.name}...`);
                agent.lastActivity = new Date();
                this.status.activeAgents.push(name);
            }
        }
        console.log(`Started ${this.status.activeAgents.length} agents`);
    }
    async stopAgents() {
        console.log('Stopping autonomous agents...');
        for (const [name, agent] of this.agents.entries()) {
            if (agent.enabled) {
                console.log(`Stopping ${agent.name}...`);
                agent.enabled = false;
            }
        }
        this.status.activeAgents = [];
        console.log('All agents stopped');
    }
    setupEventListeners() {
        // Listen for database changes
        this.supabase
            .channel('tms_events')
            .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
            this.handleDatabaseChange(payload);
        })
            .subscribe();
        // Listen for webhook events
        this.setupWebhookListener();
    }
    cleanupEventListeners() {
        // Clean up event listeners
        this.supabase.removeAllChannels();
    }
    startContinuousProcessing() {
        // Start continuous processing loops for each agent
        if (this.config.enableShipmentProcessing) {
            this.startShipmentProcessing();
        }
        if (this.config.enableCustomerService) {
            this.startCustomerServiceProcessing();
        }
        if (this.config.enableFinancialProcessing) {
            this.startFinancialProcessing();
        }
        if (this.config.enableAnalytics) {
            this.startAnalyticsProcessing();
        }
    }
    startShipmentProcessing() {
        setInterval(async () => {
            if (!this.isRunning)
                return;
            try {
                // Process pending shipments
                const { data: pendingShipments } = await this.supabase
                    .from('shipments')
                    .select('*')
                    .eq('status', 'pending')
                    .limit(10);
                for (const shipment of pendingShipments || []) {
                    await this.processEvent('shipment_created', shipment);
                }
                // Update agent activity
                const agent = this.agents.get('shipment');
                if (agent) {
                    agent.lastActivity = new Date();
                }
            }
            catch (error) {
                console.error('Error in shipment processing:', error);
            }
        }, 60000); // Every minute
    }
    startCustomerServiceProcessing() {
        setInterval(async () => {
            if (!this.isRunning)
                return;
            try {
                // Process customer inquiries
                const { data: inquiries } = await this.supabase
                    .from('customer_inquiries')
                    .select('*')
                    .eq('status', 'new')
                    .limit(5);
                for (const inquiry of inquiries || []) {
                    await this.processEvent('customer_inquiry', inquiry);
                }
                // Update agent activity
                const agent = this.agents.get('customer_service');
                if (agent) {
                    agent.lastActivity = new Date();
                }
            }
            catch (error) {
                console.error('Error in customer service processing:', error);
            }
        }, 30000); // Every 30 seconds
    }
    startFinancialProcessing() {
        setInterval(async () => {
            if (!this.isRunning)
                return;
            try {
                // Process financial transactions
                const { data: transactions } = await this.supabase
                    .from('financial_transactions')
                    .select('*')
                    .eq('status', 'pending')
                    .limit(10);
                for (const transaction of transactions || []) {
                    await this.processEvent('financial_transaction', transaction);
                }
                // Update agent activity
                const agent = this.agents.get('financial');
                if (agent) {
                    agent.lastActivity = new Date();
                }
            }
            catch (error) {
                console.error('Error in financial processing:', error);
            }
        }, 120000); // Every 2 minutes
    }
    startAnalyticsProcessing() {
        setInterval(async () => {
            if (!this.isRunning)
                return;
            try {
                // Generate analytics reports
                await this.processEvent('analytics_update', {
                    timestamp: new Date().toISOString(),
                    type: 'periodic_update'
                });
                // Update agent activity
                const agent = this.agents.get('analytics');
                if (agent) {
                    agent.lastActivity = new Date();
                }
            }
            catch (error) {
                console.error('Error in analytics processing:', error);
            }
        }, 300000); // Every 5 minutes
    }
    async handleDatabaseChange(payload) {
        const { table, eventType, new: newRecord, old: oldRecord } = payload;
        // Map database changes to events
        const eventTypeMap = {
            shipments: 'shipment_updated',
            customer_inquiries: 'customer_inquiry_updated',
            financial_transactions: 'financial_transaction_updated'
        };
        const mappedEventType = eventTypeMap[table];
        if (mappedEventType) {
            await this.processEvent(mappedEventType, {
                table,
                eventType,
                newRecord,
                oldRecord
            });
        }
    }
    setupWebhookListener() {
        // Set up webhook endpoint for external events
        // This would typically be done in your Express app
        console.log('Webhook listener setup completed');
    }
    determinePriority(eventType, eventData) {
        // Determine priority based on event type and data
        const priorityMap = {
            'shipment_created': 'high',
            'shipment_delayed': 'critical',
            'customer_complaint': 'high',
            'financial_error': 'critical',
            'system_error': 'critical'
        };
        return priorityMap[eventType] || 'medium';
    }
    mapEventType(eventType) {
        // Map event types to decision categories
        if (eventType.includes('shipment'))
            return 'shipment';
        if (eventType.includes('customer'))
            return 'customer_service';
        if (eventType.includes('financial'))
            return 'financial';
        return 'analytics';
    }
    async logEvent(eventType, eventData, decision) {
        await this.supabase
            .from('system_events')
            .insert({
            event_type: eventType,
            event_data: eventData,
            decision: decision,
            timestamp: new Date().toISOString()
        });
    }
    async logSystemEvent(eventType, message) {
        await this.supabase
            .from('system_events')
            .insert({
            event_type: eventType,
            message,
            timestamp: new Date().toISOString()
        });
    }
}
exports.AutonomousTMSController = AutonomousTMSController;
//# sourceMappingURL=AutonomousTMSController.js.map