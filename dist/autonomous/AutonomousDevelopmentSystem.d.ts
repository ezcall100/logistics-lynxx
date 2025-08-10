interface DevelopmentTask {
    id: string;
    type: 'research' | 'frontend' | 'backend' | 'database' | 'testing' | 'deployment' | 'uiux' | 'portal' | 'api' | 'security';
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    description: string;
    requirements: any;
    assignedAgent: string;
    createdAt: Date;
    updatedAt: Date;
    estimatedDuration: number;
    actualDuration?: number;
    dependencies: string[];
    output?: any;
    errors?: string[];
}
interface AutonomousConfig {
    enableResearch: boolean;
    enableFrontend: boolean;
    enableBackend: boolean;
    enableDatabase: boolean;
    enableTesting: boolean;
    enableDeployment: boolean;
    enableUIUX: boolean;
    enablePortal: boolean;
    enableAPI: boolean;
    enableSecurity: boolean;
    monitoringInterval: number;
    maxConcurrentTasks: number;
    autoDeploy: boolean;
    qualityThreshold: number;
}
interface DevelopmentMetrics {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    averageTaskDuration: number;
    codeQuality: number;
    testCoverage: number;
    deploymentSuccess: number;
    securityScore: number;
    lastDeployment: Date;
    activeAgents: string[];
}
export declare class AutonomousDevelopmentSystem {
    private supabase;
    private decisionAgent;
    private healthMonitor;
    private config;
    private metrics;
    private isRunning;
    private activeTasks;
    private agents;
    private taskQueue;
    constructor(config?: Partial<AutonomousConfig>);
    start(): Promise<void>;
    stop(): Promise<void>;
    getMetrics(): DevelopmentMetrics;
    addTask(task: Omit<DevelopmentTask, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string>;
    private initializeSystem;
    private initializeDevelopmentTables;
    private initializeAgents;
    private startDevelopmentAgents;
    private stopDevelopmentAgents;
    private initializeTaskQueue;
    private startContinuousDevelopment;
    private processTaskQueue;
    private canStartTask;
    private startTask;
    private processTask;
    private processTaskByType;
    private completeTask;
    private failTask;
    private triggerDependentTasks;
    private updateMetrics;
    private checkQualityGates;
    private handleDeployments;
    private shouldDeploy;
    private calculateCodeQuality;
    private calculateTestCoverage;
    private calculateDeploymentSuccess;
    private calculateSecurityScore;
    private logTask;
    private logSystemEvent;
}
export {};
//# sourceMappingURL=AutonomousDevelopmentSystem.d.ts.map