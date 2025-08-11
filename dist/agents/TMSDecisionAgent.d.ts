interface DecisionInput {
    type: 'shipment' | 'customer_service' | 'financial' | 'analytics';
    data: any;
    priority: 'low' | 'medium' | 'high' | 'critical';
}
interface DecisionResult {
    action: string;
    confidence: number;
    reasoning: string;
    estimatedImpact: 'low' | 'medium' | 'high';
    requiresHumanReview: boolean;
    metadata?: Record<string, any>;
}
interface DecisionContext {
    shipmentHistory: any[];
    carrierPerformance: Record<string, any>;
    costData: Record<string, any>;
    customerPreferences: Record<string, any>;
    systemMetrics: Record<string, any>;
}
export declare class TMSDecisionAgent {
    private supabase;
    private context;
    private decisionHistory;
    private learningRate;
    constructor();
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    makeDecision(input: DecisionInput): Promise<DecisionResult>;
    private initializeContext;
    private updateContext;
    private analyzeData;
    private generateOptions;
    private selectBestOption;
    private calculateRiskLevel;
    private calculateCostImpact;
    private calculateTimeSensitivity;
    private calculateComplexity;
    private findHistoricalPatterns;
    private generateShipmentOptions;
    private generateCustomerServiceOptions;
    private generateFinancialOptions;
    private generateAnalyticsOptions;
    private calculateOptionScore;
    private adjustConfidence;
    private buildCarrierPerformance;
    private buildCustomerPreferences;
    private updateShipmentContext;
    private updateCustomerServiceContext;
    private updateFinancialContext;
    private updateAnalyticsContext;
    private logDecision;
    private updateLearningModel;
    private adjustLearningRate;
    getDecisionHistory(): DecisionResult[];
    getContext(): DecisionContext;
}
export {};
//# sourceMappingURL=TMSDecisionAgent.d.ts.map