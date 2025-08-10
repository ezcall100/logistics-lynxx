export declare class SystemHealthMonitor {
    private supabase;
    private checkInterval;
    private isRunning;
    private alertThresholds;
    constructor();
    startMonitoring(intervalMs?: number): Promise<void>;
    stopMonitoring(): void;
    private runHealthChecks;
    private handleIssues;
    private attemptRecovery;
    private recoverDatabase;
    private restartAPI;
    private restartWorkflow;
    private optimizePerformance;
    private generalRecovery;
    private logHealthCheckResults;
    private logIssue;
    private sendAlert;
    private updateSystemMetrics;
    private calculateSeverity;
    private calculateAverageResponseTime;
    private calculateErrorRate;
    private getActiveConnections;
    private getCPUUsage;
    private reconnectDatabase;
    private cleanupDatabaseConnections;
    private checkAPIHealth;
    private triggerAPIRestart;
    private checkWorkflowHealth;
    private restartSpecificWorkflow;
    private optimizeMemoryUsage;
    private optimizeCPUUsage;
    private escalateToHuman;
    private sendEmailAlert;
    private sendSlackAlert;
    private sendWebhookAlert;
}
//# sourceMappingURL=SystemHealthMonitor.d.ts.map