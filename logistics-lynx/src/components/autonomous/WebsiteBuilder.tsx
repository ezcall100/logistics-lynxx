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
  RotateCcw,
  Truck,
  Route,
  Package,
  Users,
  BarChart3
} from 'lucide-react';
import { websiteBuilderService } from '@/services/websiteBuilderService';

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
  type: 'home' | 'about' | 'tms-software' | 'features' | 'pricing' | 'contact' | 'blog' | 'solutions' | 'resources' | 'support' | 'careers' | 'demo' | 'api' | 'integrations';
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
    pagesBuilt: 5,
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
    { type: 'about', name: 'About Trans Bot AI', icon: Users },
    { type: 'tms-software', name: 'TMS Software', icon: Truck },
    { type: 'features', name: 'TMS Features', icon: Settings },
    { type: 'pricing', name: 'Pricing Plans', icon: Code },
    { type: 'contact', name: 'Contact Us', icon: Eye },
    { type: 'blog', name: 'TMS Blog', icon: FileText },
    { type: 'solutions', name: 'Industry Solutions', icon: Route },
    { type: 'resources', name: 'Resources', icon: FileText },
    { type: 'support', name: 'Support', icon: Settings },
    { type: 'careers', name: 'Careers', icon: Users },
    { type: 'demo', name: 'Request Demo', icon: Play },
    { type: 'api', name: 'API Documentation', icon: Code },
    { type: 'integrations', name: 'Integrations', icon: Package }
  ];

  const generateContent = (pageType: string) => {
    const contentTemplates = {
      home: `Trans Bot AI - Leading TMS Software Company. We build intelligent Transportation Management Systems that revolutionize logistics operations. Our autonomous AI-powered platform ensures 24/7 optimization, real-time tracking, and seamless fleet management for modern transportation companies.`,
      about: `Trans Bot AI is a pioneering software company specializing in Transportation Management Systems (TMS). Founded with a vision to revolutionize logistics through AI, we serve over 1,000+ transportation companies worldwide with our cutting-edge autonomous TMS platform.`,
      'tms-software': `Our flagship TMS software combines artificial intelligence with advanced logistics management. Features include autonomous route optimization, real-time fleet tracking, intelligent load matching, automated dispatching, and comprehensive analytics for transportation companies.`,
      features: `Discover our comprehensive TMS features: Autonomous Route Optimization, Real-time Fleet Tracking, Intelligent Load Matching, Automated Dispatching, Driver Management, Fuel Optimization, Compliance Monitoring, and Advanced Analytics. Each feature is designed for maximum efficiency.`,
      pricing: `Choose from our flexible TMS pricing plans designed to scale with your transportation business. All plans include full access to our autonomous TMS system, 24/7 support, real-time updates, and comprehensive training for your team.`,
      contact: `Get in touch with our TMS experts. We're here to help you implement our autonomous Transportation Management System that drives your logistics operations forward. Contact us for a personalized TMS consultation.`,
      blog: `Stay updated with the latest insights in TMS technology, logistics trends, and transportation best practices. Our expert team shares valuable knowledge to help transportation companies succeed with autonomous systems.`,
      solutions: `Explore our tailored TMS solutions for various transportation industries. From trucking companies to logistics providers, our autonomous systems adapt to your specific transportation needs and operational requirements.`,
      resources: `Access our comprehensive TMS resource library including documentation, tutorials, case studies, and best practices to maximize your Transportation Management System's potential and optimize your logistics operations.`,
      support: `Get the TMS support you need with our dedicated team. We provide 24/7 assistance, comprehensive TMS documentation, and personalized training to ensure your transportation management success.`,
      careers: `Join our team of TMS innovators and help shape the future of transportation technology. We offer competitive benefits, growth opportunities, and a collaborative work environment for software professionals.`,
      demo: `Experience our autonomous TMS software in action. Request a personalized demo to see how our Transportation Management System can optimize your logistics operations, reduce costs, and improve efficiency.`,
      api: `Integrate our TMS software with your existing systems through our comprehensive API. Access real-time data, automate operations, and build custom solutions that work seamlessly with our autonomous transportation platform.`,
      integrations: `Connect our TMS software with your favorite tools and platforms. We offer integrations with ERP systems, accounting software, GPS tracking devices, fuel cards, and more to streamline your transportation operations.`
    };
    return contentTemplates[pageType as keyof typeof contentTemplates] || contentTemplates.home;
  };

  const createNewPage = () => {
    const pageType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
    const newPage: PageBuild = {
      id: Date.now().toString(),
      pageName: pageType.name,
      status: 'building',
      progress: 0,
      startTime: new Date(),
      content: generateContent(pageType.type),
      seoScore: Math.floor(Math.random() * 30) + 70,
      imageCount: Math.floor(Math.random() * 5) + 1,
      wordCount: Math.floor(Math.random() * 200) + 100,
      type: pageType.type as any
    };

    setPageBuilds(prev => [newPage, ...prev.slice(0, 19)]); // Keep last 20 builds
    return newPage;
  };

  const updatePageProgress = (pageId: string, progress: number) => {
    setPageBuilds(prev => prev.map(page =>
      page.id === pageId
        ? { ...page, progress, status: progress >= 100 ? 'completed' : 'building' }
        : page
    ));
  };

  useEffect(() => {
    if (!isRunning) return;

    // Create new pages every 3-8 seconds
    const createInterval = setInterval(() => {
      if (isRunning) {
        const newPage = createNewPage();

        // Simulate progress updates
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 20 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            updatePageProgress(newPage.id, progress);
          } else {
            updatePageProgress(newPage.id, progress);
          }
        }, 500);
      }
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(createInterval);
  }, [isRunning, pageBuilds.length]);

  // Listen for real-time events from the service
  useEffect(() => {
    const unsubscribe = websiteBuilderService.onEvent((event) => {
      if (event.type === 'page_build_started') {
        const pageType = pageTypes.find(pt => pt.type === event.pageType);
        if (pageType) {
          const newPage: PageBuild = {
            id: event.pageId,
            pageName: pageType.name,
            status: 'building',
            progress: 0,
            startTime: new Date(event.timestamp),
            content: generateContent(event.pageType),
            seoScore: Math.floor(Math.random() * 30) + 70,
            imageCount: Math.floor(Math.random() * 5) + 1,
            wordCount: Math.floor(Math.random() * 200) + 100,
            type: event.pageType as any
          };
          setPageBuilds(prev => [newPage, ...prev.slice(0, 19)]);
        }
      } else if (event.type === 'page_build_completed') {
        setPageBuilds(prev => prev.map(page =>
          page.id === event.pageId
            ? {
                ...page,
                status: 'completed',
                progress: 100,
                endTime: new Date(event.timestamp),
                seoScore: event.seoScore,
                wordCount: event.wordCount
              }
            : page
        ));
      }
    });

    return unsubscribe;
  }, []);

  // Update stats based on page builds
  useEffect(() => {
    const completedPages = pageBuilds.filter(p => p.status === 'completed');
    const buildingPages = pageBuilds.filter(p => p.status === 'building');

    const avgBuildTime = completedPages.length > 0
      ? completedPages.reduce((sum, page) => {
          const duration = page.endTime ? page.endTime.getTime() - page.startTime.getTime() : 0;
          return sum + duration;
        }, 0) / completedPages.length
      : 0;

    const avgSeoScore = completedPages.length > 0
      ? completedPages.reduce((sum, page) => sum + page.seoScore, 0) / completedPages.length
      : 0;

    const totalWords = completedPages.reduce((sum, page) => sum + page.wordCount, 0);
    const totalImages = completedPages.reduce((sum, page) => sum + page.imageCount, 0);

    setStats({
      totalPages: 50,
      pagesBuilt: completedPages.length,
      pagesInProgress: buildingPages.length,
      averageBuildTime: avgBuildTime,
      seoScore: avgSeoScore,
      totalWords,
      totalImages
    });
  }, [pageBuilds]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'building': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
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
          <Truck className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Trans Bot AI - TMS Website Builder</h2>
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
                <p className="text-sm font-medium">TMS Pages Built</p>
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
                <p className="text-2xl font-bold">{formatDuration(stats.averageBuildTime)}</p>
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
                <p className="text-sm font-medium">TMS Images</p>
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
            <span>Live TMS Website Building</span>
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
          <span className="text-sm">Trans Bot AI TMS Website Building</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Real-time TMS Content Generation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm">TMS Software SEO Optimization</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span className="text-sm">50-Page TMS Website</span>
        </div>
      </div>
    </div>
  );
}
