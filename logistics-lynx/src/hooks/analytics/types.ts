
export interface RealAnalyticsData {
  aiLearning: AILearningData | null;
  userBehavior: UserBehaviorData | null;
  roleMetrics: RoleMetricsData | null;
  systemHealth: SystemHealthData | null;
}

export interface AILearningData {
  learningTrends: Array<{
    timestamp: string;
    accuracy: number;
    confidence: number;
  }>;
  adaptationMetrics: {
    overallProgress: number;
    patternRecognition: number;
    adaptationSpeed: number;
    currentAccuracy: number;
    bestAccuracy: number;
    averageAccuracy: number;
    improvement: number;
  };
  predictionAccuracy: Array<{
    type: string;
    accuracy: number;
    avgConfidence: number;
    count: number;
  }>;
  decisionTypes: Array<{
    type: string;
    accuracy: number;
    avgConfidence: number;
    count: number;
  }>;
  recentInsights: Array<{
    title: string;
    description: string;
    type: string;
    confidence: number;
    timestamp: string;
  }>;
}

export interface UserBehaviorData {
  navigationPatterns: Array<{
    timestamp: string;
    hour: number;
    pageViews: number;
    uniqueViews: number;
  }>;
  sessionMetrics: {
    activeUsers: number;
    userGrowth: number;
    avgSessionDuration: number;
    sessionTrend: string;
    totalInteractions: number;
    interactionIncrease: number;
    avgPageViews: number;
    navigationDepth: string;
  };
  featureUsage: Array<{
    name: string;
    usage: number;
  }>;
  heatmapData: Array<{
    feature: string;
    interactions: number;
    intensity: number;
  }>;
  commonPaths: Array<{
    route: string;
    frequency: number;
  }>;
  dropoffPoints: Array<{
    page: string;
    dropoffRate: number;
  }>;
  sessionTimeline: Array<{
    hour: string;
    sessions: number;
  }>;
}

export interface SystemHealthData {
  uptime: number;
  avgResponseTime: number;
  errorRate: number;
  activeUsers: number;
  performance: Array<{
    timestamp: string;
    cpu: number;
    memory: number;
    network: number;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: string;
    timestamp: string;
  }>;
}

export interface RoleMetricsData {
  rolePerformance: Array<{
    role: string;
    efficiency: number;
    satisfaction: number;
    usage: number;
  }>;
  roleSpecificMetrics: {
    super_admin: {
      systemHealth: number;
      userManagement: number;
      platformMetrics: number;
    };
    carrier_admin: {
      fleetsManaged: number;
      driversCoordinated: number;
      routesOptimized: number;
    };
    freight_broker_admin: {
      loadsMatched: number;
      profitMargin: number;
      customerSatisfaction: number;
    };
  };
}
