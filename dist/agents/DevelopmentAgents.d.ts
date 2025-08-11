interface BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
}
export declare class ResearchAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    analyzeMarketTrends(): Promise<any>;
    researchTechnologies(): Promise<any>;
    analyzeCompetitors(): Promise<any>;
}
export declare class FrontendAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    createComponent(componentType: string, props: any): Promise<string>;
    buildDashboard(): Promise<any>;
    optimizePerformance(): Promise<any>;
}
export declare class BackendAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    createAPIEndpoint(endpoint: string, method: string): Promise<string>;
    designDatabaseSchema(): Promise<any>;
    implementBusinessLogic(): Promise<any>;
}
export declare class DatabaseAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    optimizeQueries(): Promise<any>;
    createMigration(version: string): Promise<string>;
    backupDatabase(): Promise<any>;
}
export declare class TestingAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    runUnitTests(): Promise<any>;
    runIntegrationTests(): Promise<any>;
    runE2ETests(): Promise<any>;
}
export declare class DeploymentAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    deployToEnvironment(environment: string): Promise<any>;
    setupInfrastructure(): Promise<any>;
    monitorSystem(): Promise<any>;
}
export declare class UIUXAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    createWireframes(): Promise<any>;
    createDesignSystem(): Promise<any>;
    conductUserResearch(): Promise<any>;
}
export declare class PortalAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    createUserRoles(): Promise<any>;
    createDashboard(userRole: string): Promise<any>;
    managePermissions(): Promise<any>;
}
export declare class APIAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    designAPI(): Promise<any>;
    integrateThirdParty(service: string): Promise<any>;
    generateDocumentation(): Promise<string>;
}
export declare class SecurityAgent implements BaseAgent {
    name: string;
    type: string;
    capabilities: string[];
    isActive: boolean;
    lastActivity: Date;
    performance: number;
    performSecurityAudit(): Promise<any>;
    scanVulnerabilities(): Promise<any>;
    implementEncryption(): Promise<any>;
}
export declare class DevelopmentAgents {
    private agents;
    private supabase;
    constructor();
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    getAgents(): BaseAgent[];
    getActiveAgents(): BaseAgent[];
}
export {};
//# sourceMappingURL=DevelopmentAgents.d.ts.map