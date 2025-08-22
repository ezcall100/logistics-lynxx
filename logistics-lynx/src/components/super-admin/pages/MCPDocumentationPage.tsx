import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, CircuitBoard, Shield, Server, Network, Zap, Activity, 
  CheckCircle, Clock, TrendingUp, Users, Globe, Database,
  ArrowRight, Play, Settings, Eye, Lock, Key, Cpu,
  HardDrive, Wifi, BarChart3, AlertTriangle, Info,
  Target, Award, Trophy, Star, Rocket, Sparkles,
  Gauge, ShieldCheck, Fingerprint, Smartphone, Monitor,
  BookOpen, FileText, Video, Download, Search,
  ExternalLink, Copy, HelpCircle, Lightbulb, Link, Cloud,
  Code, Terminal, Command, TerminalSquare, GitBranch,
  Database as DatabaseIcon, Server as ServerIcon,
  Monitor as MonitorIcon, Smartphone as SmartphoneIcon,
  MessageSquare, Mail, Search as SearchIcon, Bug
} from 'lucide-react';

const MCPDocumentationPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const documentationSections = {
    'getting-started': [
      {
        title: 'Quick Start Guide',
        description: 'Get up and running with MCP in under 10 minutes',
        icon: Rocket,
        color: 'blue',
        difficulty: 'Beginner',
        timeToRead: '5 min',
        tags: ['setup', 'installation', 'basics']
      },
      {
        title: 'Installation Guide',
        description: 'Step-by-step installation instructions for all platforms',
        icon: Download,
        color: 'emerald',
        difficulty: 'Beginner',
        timeToRead: '10 min',
        tags: ['installation', 'setup', 'configuration']
      },
      {
        title: 'First Configuration',
        description: 'Configure your MCP for optimal performance',
        icon: Settings,
        color: 'purple',
        difficulty: 'Beginner',
        timeToRead: '15 min',
        tags: ['configuration', 'setup', 'optimization']
      }
    ],
    'user-guide': [
      {
        title: 'Dashboard Overview',
        description: 'Understanding the MCP control center interface',
        icon: Monitor,
        color: 'blue',
        difficulty: 'Beginner',
        timeToRead: '8 min',
        tags: ['dashboard', 'interface', 'overview']
      },
      {
        title: 'Agent Management',
        description: 'How to manage and control autonomous agents',
        icon: Users,
        color: 'emerald',
        difficulty: 'Intermediate',
        timeToRead: '12 min',
        tags: ['agents', 'management', 'control']
      },
      {
        title: 'Alert Configuration',
        description: 'Setting up and customizing alert systems',
        icon: AlertTriangle,
        color: 'orange',
        difficulty: 'Intermediate',
        timeToRead: '10 min',
        tags: ['alerts', 'notifications', 'configuration']
      },
      {
        title: 'Security Settings',
        description: 'Configuring security policies and access controls',
        icon: Shield,
        color: 'red',
        difficulty: 'Advanced',
        timeToRead: '20 min',
        tags: ['security', 'access-control', 'policies']
      }
    ],
    'api-reference': [
      {
        title: 'REST API Reference',
        description: 'Complete API documentation with examples',
        icon: Code,
        color: 'blue',
        difficulty: 'Advanced',
        timeToRead: '30 min',
        tags: ['api', 'rest', 'endpoints']
      },
      {
        title: 'WebSocket API',
        description: 'Real-time communication API documentation',
        icon: Wifi,
        color: 'purple',
        difficulty: 'Advanced',
        timeToRead: '25 min',
        tags: ['websocket', 'realtime', 'api']
      },
      {
        title: 'SDK Documentation',
        description: 'Client libraries and SDKs for various languages',
        icon: GitBranch,
        color: 'emerald',
        difficulty: 'Intermediate',
        timeToRead: '20 min',
        tags: ['sdk', 'libraries', 'clients']
      }
    ],
    'integrations': [
      {
        title: 'Cloud Provider Setup',
        description: 'Integrating with AWS, Azure, and GCP',
        icon: Cloud,
        color: 'blue',
        difficulty: 'Intermediate',
        timeToRead: '15 min',
        tags: ['cloud', 'aws', 'azure', 'gcp']
      },
      {
        title: 'Database Connections',
        description: 'Connecting to various database systems',
        icon: DatabaseIcon,
        color: 'emerald',
        difficulty: 'Intermediate',
        timeToRead: '12 min',
        tags: ['database', 'mysql', 'postgresql', 'mongodb']
      },
      {
        title: 'CI/CD Integration',
        description: 'Integrating with Jenkins, GitLab, and GitHub',
        icon: GitBranch,
        color: 'purple',
        difficulty: 'Intermediate',
        timeToRead: '18 min',
        tags: ['cicd', 'jenkins', 'gitlab', 'github']
      }
    ],
    'troubleshooting': [
      {
        title: 'Common Issues',
        description: 'Solutions to frequently encountered problems',
        icon: HelpCircle,
        color: 'orange',
        difficulty: 'Beginner',
        timeToRead: '10 min',
        tags: ['troubleshooting', 'issues', 'problems']
      },
      {
        title: 'Performance Optimization',
        description: 'Tips for optimizing MCP performance',
        icon: Gauge,
        color: 'emerald',
        difficulty: 'Advanced',
        timeToRead: '25 min',
        tags: ['performance', 'optimization', 'tuning']
      },
      {
        title: 'Debugging Guide',
        description: 'Advanced debugging techniques and tools',
        icon: Bug,
        color: 'red',
        difficulty: 'Advanced',
        timeToRead: '30 min',
        tags: ['debugging', 'troubleshooting', 'advanced']
      }
    ],
    'examples': [
      {
        title: 'Basic Workflows',
        description: 'Common workflow examples and templates',
        icon: FileText,
        color: 'blue',
        difficulty: 'Beginner',
        timeToRead: '15 min',
        tags: ['workflows', 'examples', 'templates']
      },
      {
        title: 'Advanced Scenarios',
        description: 'Complex integration and automation scenarios',
        icon: Lightbulb,
        color: 'purple',
        difficulty: 'Advanced',
        timeToRead: '45 min',
        tags: ['advanced', 'scenarios', 'automation']
      },
      {
        title: 'Best Practices',
        description: 'Recommended practices for optimal MCP usage',
        icon: Award,
        color: 'emerald',
        difficulty: 'Intermediate',
        timeToRead: '20 min',
        tags: ['best-practices', 'recommendations', 'guidelines']
      }
    ]
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      amber: 'bg-amber-100 text-amber-600 border-amber-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  MCP Documentation
                </h1>
                <p className="text-xl text-blue-100 mt-2">
                  Complete Guide to Mastering Your Master Control Program
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-emerald-400">50+</div>
                <div className="text-sm text-blue-100">Guides</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <div className="text-sm text-blue-100">Examples</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">6</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        {/* Search Section */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Find What You Need</h2>
              <p className="text-slate-600 mb-6">
                Search through our comprehensive documentation to find answers, guides, and examples.
              </p>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Categories */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span>Documentation Library</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore our comprehensive documentation organized by category and difficulty level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="getting-started" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Rocket className="w-4 h-4 mr-2" />
                  Getting Started
                </TabsTrigger>
                <TabsTrigger value="user-guide" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  User Guide
                </TabsTrigger>
                <TabsTrigger value="api-reference" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Code className="w-4 h-4 mr-2" />
                  API Reference
                </TabsTrigger>
                <TabsTrigger value="integrations" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Link className="w-4 h-4 mr-2" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="troubleshooting" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Troubleshooting
                </TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Examples
                </TabsTrigger>
              </TabsList>

              {Object.entries(documentationSections).map(([category, sections]) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sections.map((section, index) => (
                      <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`p-3 rounded-lg ${getColorClasses(section.color)}`}>
                                <section.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">
                                  {section.title}
                                </CardTitle>
                                <CardDescription className="text-slate-600">
                                  {section.description}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge className={getDifficultyColor(section.difficulty)}>
                                {section.difficulty}
                              </Badge>
                              <span className="text-sm text-slate-500">•</span>
                              <span className="text-sm text-slate-500">{section.timeToRead}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {section.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Resources */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <span>Quick Resources</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Essential resources to help you get the most out of MCP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Video Tutorials</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Step-by-step video guides for visual learners.
                </p>
                <Button size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-emerald-100">
                    <Download className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Download PDF</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Complete documentation in PDF format.
                </p>
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Community Forum</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Connect with other MCP users and experts.
                </p>
                <Button size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Forum
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-orange-100">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Support Center</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Get help from our support team.
                </p>
                <Button size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Statistics */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              <span>Documentation Statistics</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Our comprehensive documentation coverage and usage statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Total Pages</h3>
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                <Progress value={95} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Comprehensive coverage</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Code Examples</h3>
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
                <Progress value={88} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Practical examples</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Languages</h3>
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <Progress value={100} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Multi-language support</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Last Updated</h3>
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">2 days</div>
                <Progress value={100} className="h-2 mb-2" />
                <p className="text-xs text-slate-500">Regularly updated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
              <p className="text-blue-100 mb-6">
                Can't find what you're looking for? Our support team is here to help you succeed with MCP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPDocumentationPage;
