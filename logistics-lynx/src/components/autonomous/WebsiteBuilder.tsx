import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Globe, 
  Code, 
  Image, 
  Search, 
  Settings,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface PageBuild {
  id: string;
  pageName: string;
  status: 'building' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: Date;
  endTime?: Date;
  content: string;
  seoScore: number;
  imageCount: number;
  wordCount: number;
  type: 'home' | 'about' | 'features' | 'pricing' | 'contact' | 'blog' | 'solutions' | 'resources' | 'support' | 'careers';
}

interface WebsiteStats {
  totalPages: number;
  pagesBuilt: number;
  pagesInProgress: number;
  averageBuildTime: number;
  seoScore: number;
  totalWords: number;
  totalImages: number;
}

export default function WebsiteBuilder() {
  const [pageBuilds, setPageBuilds] = useState<PageBuild[]>([]);
  const [stats, setStats] = useState<WebsiteStats>({
    totalPages: 50,
    pagesBuilt: 0,
    pagesInProgress: 0,
    averageBuildTime: 0,
    seoScore: 0,
    totalWords: 0,
    totalImages: 0
  });
  const [isRunning, setIsRunning] = useState(true);
  const [showDetails, setShowDetails] = useState(true);

  const pageTypes = [
    { type: 'home', name: 'Home Page', icon: Globe },
    { type: 'about', name: 'About Us', icon: FileText },
    { type: 'features', name: 'Features', icon: Settings },
    { type: 'pricing', name: 'Pricing', icon: Code },
    { type: 'contact', name: 'Contact', icon: Eye },
    { type: 'blog', name: 'Blog', icon: FileText },
    { type: 'solutions', name: 'Solutions', icon: Search },
    { type: 'resources', name: 'Resources', icon: FileText },
    { type: 'support', name: 'Support', icon: Settings },
    { type: 'careers', name: 'Careers', icon: Eye }
  ];

  const generateContent = (pageType: string) => {
    const contentTemplates = {
      home: `Welcome to our innovative platform. We provide cutting-edge solutions for modern businesses. Our autonomous system ensures 24/7 operation with real-time updates and self-healing capabilities.`,
      about: `Founded with a vision to revolutionize autonomous operations, our company leads the industry in AI-powered solutions. We serve over 1,000+ clients worldwide with our advanced technology.`,
      features: `Discover our comprehensive feature set including real-time monitoring, autonomous operations, self-healing systems, and advanced analytics. Each feature is designed for maximum efficiency.`,
      pricing: `Choose from our flexible pricing plans designed to scale with your business. All plans include full access to our autonomous system, 24/7 support, and real-time updates.`,
      contact: `Get in touch with our team of experts. We're here to help you implement autonomous solutions that drive your business forward. Contact us for a personalized consultation.`,
      blog: `Stay updated with the latest insights in autonomous technology, industry trends, and best practices. Our expert team shares valuable knowledge to help you succeed.`,
      solutions: `Explore our tailored solutions for various industries. From logistics to healthcare, our autonomous systems adapt to your specific needs and requirements.`,
      resources: `Access our comprehensive resource library including documentation, tutorials, case studies, and best practices to maximize your autonomous system's potential.`,
      support: `Get the support you need with our dedicated team. We provide 24/7 assistance, comprehensive documentation, and personalized training to ensure your success.`,
      careers: `Join our team of innovators and help shape the future of autonomous technology. We offer competitive benefits, growth opportunities, and a collaborative work environment.`
    };
    return contentTemplates[pageType as keyof typeof contentTemplates] || contentTemplates.home;
  };

  const createNewPage = () => {
    const pageType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
    const content = generateContent(pageType.type);
    const wordCount = content.split(' ').length;
    
    const newPage: PageBuild = {
      id: Date.now().toString(),
      pageName: pageType.name,
      status: 'building',
      progress: 0,
      startTime: new Date(),
      content,
      seoScore: Math.floor(Math.random() * 30) + 70, // 70-100
      imageCount: Math.floor(Math.random() * 5) + 1,
      wordCount,
      type: pageType.type as any
    };

    setPageBuilds(prev => [newPage, ...prev.slice(0, 19)]); // Keep last 20 builds
    return newPage;
  };

  const updatePageProgress = (pageId: string, progress: number) => {
    setPageBuilds(prev => prev.map(page => {
      if (page.id === pageId) {
        const newProgress = Math.min(100, progress);
        const isCompleted = newProgress >= 100;
        
        return {
          ...page,
          progress: newProgress,
          status: isCompleted ? 'completed' : 'building',
          endTime: isCompleted ? new Date() : undefined
        };
      }
      return page;
    }));
  };

  useEffect(() => {
    if (!isRunning) return;

    // Create new pages every 3-8 seconds
    const createInterval = setInterval(() => {
      if (pageBuilds.length < 20) {
        const newPage = createNewPage();
        
        // Simulate building progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 15 + 5; // 5-20% per update
          updatePageProgress(newPage.id, progress);
          
          if (progress >= 100) {
            clearInterval(progressInterval);
          }
        }, 500 + Math.random() * 1000); // 0.5-1.5 seconds between updates
      }
    }, 3000 + Math.random() * 5000);

    // Update stats every 2 seconds
    const statsInterval = setInterval(() => {
      const completedPages = pageBuilds.filter(p => p.status === 'completed');
      const inProgressPages = pageBuilds.filter(p => p.status === 'building');
      
      const totalBuildTime = completedPages.reduce((sum, page) => {
        if (page.endTime && page.startTime) {
          return sum + (page.endTime.getTime() - page.startTime.getTime());
        }
        return sum;
      }, 0);
      
      const avgBuildTime = completedPages.length > 0 ? totalBuildTime / completedPages.length / 1000 : 0;
      const avgSeoScore = completedPages.length > 0 ? 
        completedPages.reduce((sum, page) => sum + page.seoScore, 0) / completedPages.length : 0;
      const totalWords = completedPages.reduce((sum, page) => sum + page.wordCount, 0);
      const totalImages = completedPages.reduce((sum, page) => sum + page.imageCount, 0);

      setStats({
        totalPages: 50,
        pagesBuilt: completedPages.length,
        pagesInProgress: inProgressPages.length,
        averageBuildTime: avgBuildTime,
        seoScore: avgSeoScore,
        totalWords,
        totalImages
      });
    }, 2000);

    return () => {
      clearInterval(createInterval);
      clearInterval(statsInterval);
    };
  }, [isRunning, pageBuilds.length]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'building': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'queued': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    const pageType = pageTypes.find(pt => pt.type === type);
    return pageType ? <pageType.icon className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Autonomous Website Builder</h2>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? "Building" : "Paused"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Pause" : "Resume"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>

      {/* Website Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Pages Built</p>
                <p className="text-2xl font-bold">{stats.pagesBuilt}/50</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Avg Build Time</p>
                <p className="text-2xl font-bold">{stats.averageBuildTime.toFixed(1)}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">SEO Score</p>
                <p className="text-2xl font-bold">{stats.seoScore.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Total Images</p>
                <p className="text-2xl font-bold">{stats.totalImages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Page Building */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Live Page Building</span>
            <Badge variant="outline">{pageBuilds.filter(p => p.status === 'building').length} building</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {pageBuilds.map((page) => (
                <div
                  key={page.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(page.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">{page.pageName}</span>
                      <Badge 
                        variant="outline" 
                        className={`w-2 h-2 p-0 ${getStatusColor(page.status)}`}
                      />
                      {page.status === 'building' && (
                        <Badge variant="secondary" className="text-xs">
                          Building...
                        </Badge>
                      )}
                      {page.status === 'completed' && (
                        <Badge variant="default" className="bg-green-500 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <Progress value={page.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {page.progress.toFixed(0)}% complete
                      </p>
                    </div>

                    {showDetails && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {page.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>SEO: {page.seoScore}%</span>
                          <span>Words: {page.wordCount}</span>
                          <span>Images: {page.imageCount}</span>
                          <span>Started: {page.startTime.toLocaleTimeString()}</span>
                          {page.endTime && (
                            <span>Duration: {formatDuration(page.endTime.getTime() - page.startTime.getTime())}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Real-time Activity Indicators */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Autonomous Page Building</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Real-time Content Generation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm">SEO Optimization</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span className="text-sm">50-Page Website</span>
        </div>
      </div>
    </div>
  );
}
