import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

class WebsiteBuilderAPI {
  private isPaused: boolean = false;
  private buildCount: number = 0;
  private startTime: Date = new Date();

  async getStatus(): Promise<WebsiteBuilderStatus> {
    try {
      // Check emergency stop
      const { data: emergencyStop } = await supabase
        .from('feature_flags_v2')
        .select('value')
        .eq('key', 'autonomy.emergencyStop')
        .eq('scope', 'global')
        .single();

      if (emergencyStop?.value === true) {
        return {
          operational: false,
          paused: true,
          pagesBuilt: 0,
          pagesInProgress: 0,
          avgBuildMs: 0,
          avgSeoScore: 0,
          uptime: 0
        };
      }

      // Get recent stats from database
      const { data: pages } = await supabase
        .from('website_pages')
        .select('build_ms, seo_score, build_finished_at, status')
        .gte('build_started_at', new Date(Date.now() - 2 * 60 * 1000).toISOString());

      const completedPages = pages?.filter(p => p.status === 'done') || [];
      const inProgressPages = pages?.filter(p => p.status === 'building') || [];

      const avgBuildMs = completedPages.length > 0 
        ? Math.round(completedPages.reduce((sum, p) => sum + (p.build_ms || 0), 0) / completedPages.length)
        : 0;

      const avgSeoScore = completedPages.length > 0
        ? Math.round(completedPages.reduce((sum, p) => sum + (p.seo_score || 0), 0) / completedPages.length)
        : 0;

      const lastBuild = completedPages.sort((a, b) => 
        new Date(b.build_finished_at!).getTime() - new Date(a.build_finished_at!).getTime()
      )[0];

      return {
        operational: true,
        paused: this.isPaused,
        pagesBuilt: completedPages.length,
        pagesInProgress: inProgressPages.length,
        avgBuildMs,
        avgSeoScore,
        lastBuildAt: lastBuild?.build_finished_at,
        uptime: Date.now() - this.startTime.getTime()
      };
    } catch (error) {
      console.error('Error getting status:', error);
      return {
        operational: false,
        paused: true,
        pagesBuilt: 0,
        pagesInProgress: 0,
        avgBuildMs: 0,
        avgSeoScore: 0,
        uptime: 0
      };
    }
  }

  async getMetrics(): Promise<WebsiteBuilderMetrics> {
    try {
      // Get pages built in last 2 minutes
      const { data: pages } = await supabase
        .from('website_pages')
        .select('build_ms, seo_score, word_count, image_count, status')
        .gte('build_started_at', new Date(Date.now() - 2 * 60 * 1000).toISOString());

      const completedPages = pages?.filter(p => p.status === 'done') || [];
      const inProgressPages = pages?.filter(p => p.status === 'building') || [];

      const avgBuildMs = completedPages.length > 0 
        ? Math.round(completedPages.reduce((sum, p) => sum + (p.build_ms || 0), 0) / completedPages.length)
        : 0;

      const avgSeoScore = completedPages.length > 0
        ? Math.round(completedPages.reduce((sum, p) => sum + (p.seo_score || 0), 0) / completedPages.length)
        : 0;

      const totalWords = completedPages.reduce((sum, p) => sum + (p.word_count || 0), 0);
      const totalImages = completedPages.reduce((sum, p) => sum + (p.image_count || 0), 0);

      // Get events in last 60 seconds
      const { data: events } = await supabase
        .from('website_builder_logs')
        .select('id')
        .gte('ts', new Date(Date.now() - 60 * 1000).toISOString());

      const buildsLast2m = completedPages.length;

      return {
        pagesBuilt: completedPages.length,
        pagesInProgress: inProgressPages.length,
        avgBuildMs,
        avgSeoScore,
        totalWords,
        totalImages,
        eventsLast60s: events?.length || 0,
        buildsLast2m
      };
    } catch (error) {
      console.error('Error getting metrics:', error);
      return {
        pagesBuilt: 0,
        pagesInProgress: 0,
        avgBuildMs: 0,
        avgSeoScore: 0,
        totalWords: 0,
        totalImages: 0,
        eventsLast60s: 0,
        buildsLast2m: 0
      };
    }
  }

  async pause(): Promise<{ success: boolean; message: string }> {
    try {
      this.isPaused = true;
      
      // Log the pause event
      await supabase
        .from('website_builder_logs')
        .insert({
          level: 'info',
          msg: 'Website builder paused by user',
          meta: { action: 'pause', timestamp: new Date().toISOString() }
        });

      return { success: true, message: 'Website builder paused successfully' };
    } catch (error) {
      console.error('Error pausing builder:', error);
      return { success: false, message: 'Failed to pause builder' };
    }
  }

  async resume(): Promise<{ success: boolean; message: string }> {
    try {
      this.isPaused = false;
      
      // Log the resume event
      await supabase
        .from('website_builder_logs')
        .insert({
          level: 'info',
          msg: 'Website builder resumed by user',
          meta: { action: 'resume', timestamp: new Date().toISOString() }
        });

      return { success: true, message: 'Website builder resumed successfully' };
    } catch (error) {
      console.error('Error resuming builder:', error);
      return { success: false, message: 'Failed to resume builder' };
    }
  }

  async buildPage(request: BuildRequest): Promise<{ success: boolean; pageId?: string; message: string }> {
    try {
      if (this.isPaused) {
        return { success: false, message: 'Builder is paused' };
      }

      // Check emergency stop
      const { data: emergencyStop } = await supabase
        .from('feature_flags_v2')
        .select('value')
        .eq('key', 'autonomy.emergencyStop')
        .eq('scope', 'global')
        .single();

      if (emergencyStop?.value === true) {
        return { success: false, message: 'Emergency stop is active' };
      }

      // Create page record
      const { data: page, error } = await supabase
        .from('website_pages')
        .insert({
          slug: `${request.type.toLowerCase()}-${Date.now()}`,
          page_type: request.type.toLowerCase(),
          title: `${request.type} Page`,
          status: 'building',
          meta: { priority: request.priority, seed: request.seed }
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log build start
      await supabase
        .from('website_builder_logs')
        .insert({
          page_id: page.id,
          level: 'info',
          msg: `Started building ${request.type} page`,
          meta: { page_type: request.type, priority: request.priority, seed: request.seed }
        });

      // Simulate build process (in real implementation, this would be async)
      setTimeout(async () => {
        const seoScore = Math.floor(Math.random() * 30) + 70;
        const wordCount = Math.floor(Math.random() * 200) + 100;
        const imageCount = Math.floor(Math.random() * 5) + 1;
        const buildMs = Math.floor(Math.random() * 3000) + 1000;

        await supabase
          .from('website_pages')
          .update({
            status: 'done',
            seo_score: seoScore,
            word_count: wordCount,
            image_count: imageCount,
            build_finished_at: new Date().toISOString()
          })
          .eq('id', page.id);

        await supabase
          .from('website_builder_logs')
          .insert({
            page_id: page.id,
            level: 'info',
            msg: `Completed building ${request.type} page`,
            meta: { seo_score: seoScore, word_count: wordCount, build_ms: buildMs }
          });
      }, 2000);

      return { success: true, pageId: page.id, message: `Started building ${request.type} page` };
    } catch (error) {
      console.error('Error building page:', error);
      return { success: false, message: 'Failed to build page' };
    }
  }
}

export const websiteBuilderAPI = new WebsiteBuilderAPI();
