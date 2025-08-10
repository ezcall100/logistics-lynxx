import { createClient } from '@supabase/supabase-js';

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

export class TMSDecisionAgent {
  private supabase: any;
  private context: DecisionContext;
  private decisionHistory: DecisionResult[] = [];
  private learningRate: number = 0.1;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    this.context = {
      shipmentHistory: [],
      carrierPerformance: {},
      costData: {},
      customerPreferences: {},
      systemMetrics: {}
    };

    this.initializeContext();
  }

  public async makeDecision(input: DecisionInput): Promise<DecisionResult> {
    console.log(`Making decision for ${input.type} with priority ${input.priority}`);

    try {
      // Update context with latest data
      await this.updateContext(input);

      // Analyze the input data
      const analysis = await this.analyzeData(input);

      // Generate decision options
      const options = await this.generateOptions(input, analysis);

      // Select the best option
      const decision = await this.selectBestOption(options, input);

      // Log the decision
      await this.logDecision(input, decision);

      // Update learning model
      await this.updateLearningModel(input, decision);

      return decision;
    } catch (error) {
      console.error('Error making decision:', error);
      
      // Return a safe fallback decision
      return {
        action: 'escalate_to_human',
        confidence: 0.0,
        reasoning: `Decision failed: ${error}`,
        estimatedImpact: 'medium',
        requiresHumanReview: true
      };
    }
  }

  private async initializeContext(): Promise<void> {
    try {
      // Load historical data for context
      const { data: shipments } = await this.supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      const { data: carriers } = await this.supabase
        .from('carriers')
        .select('*');

      const { data: customers } = await this.supabase
        .from('customers')
        .select('*');

      this.context.shipmentHistory = shipments || [];
      this.context.carrierPerformance = this.buildCarrierPerformance(carriers || []);
      this.context.customerPreferences = this.buildCustomerPreferences(customers || []);

      console.log('Decision agent context initialized');
    } catch (error) {
      console.error('Error initializing context:', error);
    }
  }

  private async updateContext(input: DecisionInput): Promise<void> {
    // Update context based on input type
    switch (input.type) {
      case 'shipment':
        await this.updateShipmentContext(input.data);
        break;
      case 'customer_service':
        await this.updateCustomerServiceContext(input.data);
        break;
      case 'financial':
        await this.updateFinancialContext(input.data);
        break;
      case 'analytics':
        await this.updateAnalyticsContext(input.data);
        break;
    }
  }

  private async analyzeData(input: DecisionInput): Promise<any> {
    const analysis = {
      riskLevel: this.calculateRiskLevel(input),
      costImpact: this.calculateCostImpact(input),
      timeSensitivity: this.calculateTimeSensitivity(input),
      complexity: this.calculateComplexity(input),
      historicalPatterns: await this.findHistoricalPatterns(input)
    };

    return analysis;
  }

  private async generateOptions(input: DecisionInput, analysis: any): Promise<DecisionResult[]> {
    const options: DecisionResult[] = [];

    switch (input.type) {
      case 'shipment':
        options.push(...await this.generateShipmentOptions(input, analysis));
        break;
      case 'customer_service':
        options.push(...await this.generateCustomerServiceOptions(input, analysis));
        break;
      case 'financial':
        options.push(...await this.generateFinancialOptions(input, analysis));
        break;
      case 'analytics':
        options.push(...await this.generateAnalyticsOptions(input, analysis));
        break;
    }

    return options;
  }

  private async selectBestOption(options: DecisionResult[], input: DecisionInput): Promise<DecisionResult> {
    if (options.length === 0) {
      return {
        action: 'escalate_to_human',
        confidence: 0.0,
        reasoning: 'No valid options generated',
        estimatedImpact: 'medium',
        requiresHumanReview: true
      };
    }

    // Score each option
    const scoredOptions = options.map(option => ({
      ...option,
      score: this.calculateOptionScore(option, input)
    }));

    // Sort by score (highest first)
    scoredOptions.sort((a, b) => b.score - a.score);

    const bestOption = scoredOptions[0];

    // Adjust confidence based on priority and risk
    const adjustedConfidence = this.adjustConfidence(bestOption.confidence, input.priority);

    return {
      ...bestOption,
      confidence: adjustedConfidence,
      requiresHumanReview: adjustedConfidence < 0.7 || input.priority === 'critical'
    };
  }

  private calculateRiskLevel(input: DecisionInput): 'low' | 'medium' | 'high' {
    // Implement risk calculation logic
    if (input.priority === 'critical') return 'high';
    if (input.priority === 'high') return 'medium';
    return 'low';
  }

  private calculateCostImpact(input: DecisionInput): 'low' | 'medium' | 'high' {
    // Implement cost impact calculation
    return 'medium';
  }

  private calculateTimeSensitivity(input: DecisionInput): 'low' | 'medium' | 'high' {
    // Implement time sensitivity calculation
    if (input.priority === 'critical') return 'high';
    if (input.priority === 'high') return 'medium';
    return 'low';
  }

  private calculateComplexity(input: DecisionInput): 'low' | 'medium' | 'high' {
    // Implement complexity calculation
    return 'medium';
  }

  private async findHistoricalPatterns(input: DecisionInput): Promise<any[]> {
    // Implement historical pattern analysis
    return [];
  }

  private async generateShipmentOptions(input: DecisionInput, analysis: any): Promise<DecisionResult[]> {
    const options: DecisionResult[] = [];

    // Auto-assign carrier
    options.push({
      action: 'auto_assign_carrier',
      confidence: 0.8,
      reasoning: 'Automatically assign best available carrier based on performance and cost',
      estimatedImpact: 'medium',
      requiresHumanReview: false
    });

    // Optimize route
    options.push({
      action: 'optimize_route',
      confidence: 0.7,
      reasoning: 'Calculate optimal route to minimize cost and delivery time',
      estimatedImpact: 'medium',
      requiresHumanReview: false
    });

    // Escalate to human
    options.push({
      action: 'escalate_to_human',
      confidence: 0.3,
      reasoning: 'Complex shipment requiring human review',
      estimatedImpact: 'high',
      requiresHumanReview: true
    });

    return options;
  }

  private async generateCustomerServiceOptions(input: DecisionInput, analysis: any): Promise<DecisionResult[]> {
    const options: DecisionResult[] = [];

    // Auto-respond
    options.push({
      action: 'auto_respond',
      confidence: 0.6,
      reasoning: 'Generate automated response based on inquiry type',
      estimatedImpact: 'low',
      requiresHumanReview: false
    });

    // Escalate to human
    options.push({
      action: 'escalate_to_human',
      confidence: 0.4,
      reasoning: 'Complex customer inquiry requiring human attention',
      estimatedImpact: 'medium',
      requiresHumanReview: true
    });

    return options;
  }

  private async generateFinancialOptions(input: DecisionInput, analysis: any): Promise<DecisionResult[]> {
    const options: DecisionResult[] = [];

    // Auto-approve
    options.push({
      action: 'auto_approve',
      confidence: 0.5,
      reasoning: 'Standard financial transaction within approved limits',
      estimatedImpact: 'medium',
      requiresHumanReview: false
    });

    // Flag for review
    options.push({
      action: 'flag_for_review',
      confidence: 0.7,
      reasoning: 'Transaction requires manual review due to amount or pattern',
      estimatedImpact: 'high',
      requiresHumanReview: true
    });

    return options;
  }

  private async generateAnalyticsOptions(input: DecisionInput, analysis: any): Promise<DecisionResult[]> {
    const options: DecisionResult[] = [];

    // Generate report
    options.push({
      action: 'generate_report',
      confidence: 0.9,
      reasoning: 'Generate automated analytics report',
      estimatedImpact: 'low',
      requiresHumanReview: false
    });

    // Send alert
    options.push({
      action: 'send_alert',
      confidence: 0.6,
      reasoning: 'Send alert for significant findings',
      estimatedImpact: 'medium',
      requiresHumanReview: false
    });

    return options;
  }

  private calculateOptionScore(option: DecisionResult, input: DecisionInput): number {
    let score = option.confidence;

    // Adjust score based on priority
    if (input.priority === 'critical') score *= 1.2;
    if (input.priority === 'high') score *= 1.1;

    // Penalize human review for high-volume operations
    if (option.requiresHumanReview && input.type === 'shipment') {
      score *= 0.8;
    }

    return score;
  }

  private adjustConfidence(confidence: number, priority: string): number {
    // Adjust confidence based on priority
    if (priority === 'critical') return Math.min(confidence * 0.9, 0.95);
    if (priority === 'high') return Math.min(confidence * 0.95, 0.9);
    return confidence;
  }

  private buildCarrierPerformance(carriers: any[]): Record<string, any> {
    const performance: Record<string, any> = {};
    
    carriers.forEach(carrier => {
      performance[carrier.id] = {
        onTimeDelivery: carrier.on_time_delivery_rate || 0.8,
        costPerMile: carrier.cost_per_mile || 2.5,
        rating: carrier.rating || 4.0,
        availability: carrier.availability || 0.9
      };
    });

    return performance;
  }

  private buildCustomerPreferences(customers: any[]): Record<string, any> {
    const preferences: Record<string, any> = {};
    
    customers.forEach(customer => {
      preferences[customer.id] = {
        preferredCarriers: customer.preferred_carriers || [],
        deliveryPreferences: customer.delivery_preferences || {},
        communicationPreferences: customer.communication_preferences || {}
      };
    });

    return preferences;
  }

  private async updateShipmentContext(data: any): Promise<void> {
    // Update shipment-related context
    if (data.shipment_id) {
      this.context.shipmentHistory.unshift(data);
      if (this.context.shipmentHistory.length > 100) {
        this.context.shipmentHistory.pop();
      }
    }
  }

  private async updateCustomerServiceContext(data: any): Promise<void> {
    // Update customer service context
  }

  private async updateFinancialContext(data: any): Promise<void> {
    // Update financial context
  }

  private async updateAnalyticsContext(data: any): Promise<void> {
    // Update analytics context
  }

  private async logDecision(input: DecisionInput, decision: DecisionResult): Promise<void> {
    await this.supabase
      .from('ai_decisions')
      .insert({
        decision_type: input.type,
        priority: input.priority,
        action: decision.action,
        confidence: decision.confidence,
        reasoning: decision.reasoning,
        estimated_impact: decision.estimatedImpact,
        requires_human_review: decision.requiresHumanReview,
        metadata: decision.metadata,
        timestamp: new Date().toISOString()
      });
  }

  private async updateLearningModel(input: DecisionInput, decision: DecisionResult): Promise<void> {
    // Store decision for learning
    this.decisionHistory.push(decision);
    
    // Keep only recent decisions
    if (this.decisionHistory.length > 1000) {
      this.decisionHistory = this.decisionHistory.slice(-500);
    }

    // Update learning rate based on performance
    await this.adjustLearningRate();
  }

  private async adjustLearningRate(): Promise<void> {
    // Implement adaptive learning rate adjustment
    const recentDecisions = this.decisionHistory.slice(-100);
    const avgConfidence = recentDecisions.reduce((sum, d) => sum + d.confidence, 0) / recentDecisions.length;
    
    if (avgConfidence > 0.8) {
      this.learningRate *= 0.95; // Reduce learning rate if performing well
    } else if (avgConfidence < 0.6) {
      this.learningRate *= 1.05; // Increase learning rate if performing poorly
    }
  }

  public getDecisionHistory(): DecisionResult[] {
    return [...this.decisionHistory];
  }

  public getContext(): DecisionContext {
    return { ...this.context };
  }
}
