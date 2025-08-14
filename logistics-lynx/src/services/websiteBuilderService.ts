// Mock Website Builder Service for Real-time Autonomous Operations
// This simulates the autonomous agents building the website in real-time

interface WebsiteBuilderStatus {
  operational: boolean;
  paused: boolean;
  pagesBuilt: number;
  pagesInProgress: number;
  avgBuildMs: number;
  avgSeoScore: number;
  lastBuildAt?: string;
  uptime: number;
}

interface WebsiteBuilderMetrics {
  pagesBuilt: number;
  pagesInProgress: number;
  avgBuildMs: number;
  avgSeoScore: number;
  totalWords: number;
  totalImages: number;
  eventsLast60s: number;
  buildsLast2m: number;
}

interface BuildRequest {
  type: string;
  priority?: number;
  seed?: string;
}

class MockWebsiteBuilderService {
  private isPaused: boolean = false;
  private pagesBuilt: number = 5; // Start with demo pages
  private pagesInProgress: number = 0;
  private startTime: Date = new Date();
  private buildQueue: any[] = [];
  private isRunning: boolean = true;
  private eventListeners: ((event: any) => void)[] = [];

  constructor() {
    this.startAutonomousBuilding();
  }

  private startAutonomousBuilding() {
    // Simulate autonomous agents building pages every 3-8 seconds
    setInterval(() => {
      if (!this.isPaused && this.isRunning) {
        this.buildRandomPage();
      }
    }, Math.random() * 5000 + 3000); // 3-8 seconds

    // Simulate progress updates every 1-2 seconds
    setInterval(() => {
      if (!this.isPaused && this.isRunning) {
        this.updateProgress();
      }
    }, Math.random() * 1000 + 1000); // 1-2 seconds
  }

  private buildRandomPage() {
    const pageTypes = [
      'home', 'about', 'tms-software', 'features', 'pricing', 'contact',
      'blog', 'solutions', 'resources', 'support', 'careers', 'demo', 'api', 'integrations'
    ];
    
    const randomType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
    const priority = Math.floor(Math.random() * 10) + 1;
    const seed = `auto-${Date.now()}`;

    this.buildPage({ type: randomType, priority, seed });
  }

  private updateProgress() {
    // Simulate progress updates for pages in progress
    if (this.pagesInProgress > 0) {
      this.pagesInProgress = Math.max(0, this.pagesInProgress - 1);
      this.pagesBuilt += 1;
      
      this.emitEvent({
        type: 'progress_update',
        timestamp: new Date().toISOString(),
        pagesBuilt: this.pagesBuilt,
        pagesInProgress: this.pagesInProgress
      });
    }
  }

  private emitEvent(event: any) {
    this.eventListeners.forEach(listener => listener(event));
  }

  async getStatus(): Promise<WebsiteBuilderStatus> {
    const avgBuildMs = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
    const avgSeoScore = Math.floor(Math.random() * 20) + 80; // 80-100

    return {
      operational: true,
      paused: this.isPaused,
      pagesBuilt: this.pagesBuilt,
      pagesInProgress: this.pagesInProgress,
      avgBuildMs,
      avgSeoScore,
      lastBuildAt: new Date().toISOString(),
      uptime: Date.now() - this.startTime.getTime()
    };
  }

  async getMetrics(): Promise<WebsiteBuilderMetrics> {
    const avgBuildMs = Math.floor(Math.random() * 2000) + 1000;
    const avgSeoScore = Math.floor(Math.random() * 20) + 80;
    const totalWords = this.pagesBuilt * (Math.floor(Math.random() * 200) + 100);
    const totalImages = this.pagesBuilt * (Math.floor(Math.random() * 5) + 1);
    const eventsLast60s = Math.floor(Math.random() * 30) + 10;
    const buildsLast2m = Math.floor(Math.random() * 10) + 5;

    return {
      pagesBuilt: this.pagesBuilt,
      pagesInProgress: this.pagesInProgress,
      avgBuildMs,
      avgSeoScore,
      totalWords,
      totalImages,
      eventsLast60s,
      buildsLast2m
    };
  }

  async pause(): Promise<{ success: boolean; message: string }> {
    this.isPaused = true;
    this.emitEvent({
      type: 'builder_paused',
      timestamp: new Date().toISOString(),
      message: 'Website builder paused by user'
    });
    return { success: true, message: 'Website builder paused successfully' };
  }

  async resume(): Promise<{ success: boolean; message: string }> {
    this.isPaused = false;
    this.emitEvent({
      type: 'builder_resumed',
      timestamp: new Date().toISOString(),
      message: 'Website builder resumed by user'
    });
    return { success: true, message: 'Website builder resumed successfully' };
  }

  async buildPage(request: BuildRequest): Promise<{ success: boolean; pageId?: string; message: string }> {
    if (this.isPaused) {
      return { success: false, message: 'Builder is paused' };
    }

    this.pagesInProgress += 1;
    const pageId = `page-${Date.now()}`;

    this.emitEvent({
      type: 'page_build_started',
      timestamp: new Date().toISOString(),
      pageId,
      pageType: request.type,
      priority: request.priority,
      seed: request.seed
    });

    // Simulate build process
    setTimeout(() => {
      this.pagesInProgress = Math.max(0, this.pagesInProgress - 1);
      this.pagesBuilt += 1;

      this.emitEvent({
        type: 'page_build_completed',
        timestamp: new Date().toISOString(),
        pageId,
        pageType: request.type,
        seoScore: Math.floor(Math.random() * 20) + 80,
        wordCount: Math.floor(Math.random() * 200) + 100,
        buildMs: Math.floor(Math.random() * 3000) + 1000
      });
    }, Math.random() * 3000 + 2000); // 2-5 seconds

    return { 
      success: true, 
      pageId, 
      message: `Started building ${request.type} page` 
    };
  }

  onEvent(listener: (event: any) => void) {
    this.eventListeners.push(listener);
    return () => {
      const index = this.eventListeners.indexOf(listener);
      if (index > -1) {
        this.eventListeners.splice(index, 1);
      }
    };
  }

  stop() {
    this.isRunning = false;
  }
}

// Create singleton instance
export const websiteBuilderService = new MockWebsiteBuilderService();

// Export types for use in components
export type { WebsiteBuilderStatus, WebsiteBuilderMetrics, BuildRequest };
