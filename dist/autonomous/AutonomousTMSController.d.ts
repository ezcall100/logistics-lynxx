interface AutonomousConfig {
    enableShipmentProcessing: boolean;
    enableCustomerService: boolean;
    enableFinancialProcessing: boolean;
    enableAnalytics: boolean;
    monitoringInterval: number;
    maxRetryAttempts: number;
    escalationThreshold: number;
}
interface SystemStatus {
    isRunning: boolean;
    uptime: number;
    activeAgents: string[];
    lastHealthCheck: Date;
    totalDecisions: number;
    successRate: number;
    errors: string[];
}
export declare class AutonomousTMSController {
    private supabase;
    private decisionAgent;
    private healthMonitor;
    private config;
    private status;
    private isRunning;
    private agents;
    constructor(config?: Partial<AutonomousConfig>);
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    getStatus(): SystemStatus;
    processEvent(eventType: string, eventData: any): Promise<any>;
    private initializeSystem;
    private initializeTables;
    private initializeAgents;
    private startAgents;
    private stopAgents;
    private setupEventListeners;
    private cleanupEventListeners;
    private startContinuousProcessing;
    private startShipmentProcessing;
    private startCustomerServiceProcessing;
    private startFinancialProcessing;
    private startAnalyticsProcessing;
    private handleDatabaseChange;
    private setupWebhookListener;
    private determinePriority;
    private mapEventType;
    private logEvent;
    private logSystemEvent;
}
export {};
//# sourceMappingURL=AutonomousTMSController.d.ts.map