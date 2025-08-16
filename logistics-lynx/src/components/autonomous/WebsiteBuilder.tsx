/* eslint-disable @typescript-eslint/no-explicit-any */
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
  BarChart3,
  RefreshCw
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
  const [isConnected, setIsConnected] = useState(false);

  const pageTypes = useMemo(() => [
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
  ], []);

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

  // Initialize service and listen for events
  useEffect(() => {
    console.log('🏗️ WebsiteBuilder component initializing...');
    
    // Ensure service is running
    websiteBuilderService.restart();
    setIsConnected(true);

    const unsubscribe = websiteBuilderService.onEvent((event) => {
      console.log('📡 WebsiteBuilder received event:', event.type);
      
      if (event.type === 'service_started' || event.type === 'service_status') {
        setIsConnected(true);
        setIsRunning(true);
      } else if (event.type === 'page_build_started') {
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
            type: event.pageType as string
          };
          setPageBuilds(prev => [newPage, ...prev.slice(0, 19)]); // Keep last 20 pages
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
      } else if (event.type === 'builder_paused') {
        setIsRunning(false);
      } else if (event.type === 'builder_resumed') {
        setIsRunning(true);
      }
    });

    // Update stats periodically
    const statsInterval = setInterval(async () => {
      try {
        const status = await websiteBuilderService.getStatus();
        const metrics = await websiteBuilderService.getMetrics();
        
        setStats({
          totalPages: 50,
          pagesBuilt: status.pagesBuilt,
          pagesInProgress: status.pagesInProgress,
          averageBuildTime: status.avgBuildMs,
          seoScore: status.avgSeoScore,
          totalWords: metrics.totalWords,
          totalImages: metrics.totalImages
        });
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(statsInterval);
    };
  }, [pageTypes]);

  const handlePauseResume = async () => {
    try {
      if (isRunning) {
        await websiteBuilderService.pause();
      } else {
        await websiteBuilderService.resume();
      }
    } catch (error) {
      console.error('Error toggling pause/resume:', error);
    }
  };

  const handleRestart = () => {
    websiteBuilderService.restart();
    setPageBuilds([]);
    setIsConnected(true);
    setIsRunning(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'building': return 'border-blue-500 bg-blue-50';
      case 'failed': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    const pageType = pageTypes.find(pt => pt.type === type);
    return pageType ? React.createElement(pageType.icon, { className: 'w-4 h-4' }) : <FileText className="w-4 h-4" />;
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
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePauseResume}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Pause" : "Resume"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
          >
            <RefreshCw className="w-4 h-4" />
            Restart
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
              {pageBuilds.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Waiting for autonomous agents to start building...</p>
                  <p className="text-sm">The website builder will begin automatically</p>
                </div>
              ) : (
                pageBuilds.map((page) => (
                  <div
                    key={page.id}
                    className={`flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${getStatusColor(page.status)}`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(page.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm">{page.pageName}</span>
                        <Badge
                          variant="outline"
                          className={`w-2 h-2 p-0 ${page.status === 'completed' ? 'bg-green-500' : page.status === 'building' ? 'bg-blue-500' : 'bg-gray-500'}`}
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
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Real-time Activity Indicators */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="text-sm">Trans Bot AI TMS Website Building</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-blue-500' : 'bg-yellow-500'} animate-pulse`}></div>
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
