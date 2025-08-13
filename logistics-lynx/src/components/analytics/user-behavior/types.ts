
export interface NavigationPattern {
  timestamp: string;
  pageViews: number;
  uniqueViews: number;
}

export interface FeatureUsage {
  name: string;
  usage: number;
}

export interface SessionMetrics {
  activeUsers: number;
  userGrowth: number;
  avgSessionDuration: number;
  sessionTrend: string;
  totalInteractions: number;
  interactionIncrease: number;
  avgPageViews: number;
  navigationDepth: string;
}

export interface HeatmapItem {
  feature: string;
  interactions: number;
  intensity: number;
}

export interface CommonPath {
  route: string;
  frequency: number;
}

export interface DropoffPoint {
  page: string;
  dropoffRate: number;
}

export interface SessionTimelineItem {
  hour: string;
  sessions: number;
}

export interface UserBehaviorData {
  navigationPatterns: NavigationPattern[];
  featureUsage: FeatureUsage[];
  sessionMetrics: SessionMetrics;
  heatmapData: HeatmapItem[];
  commonPaths: CommonPath[];
  dropoffPoints: DropoffPoint[];
  sessionTimeline: SessionTimelineItem[];
}
