import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, CircuitBoard, Shield, Server, Network, Zap, Activity, 
  CheckCircle, Clock, TrendingUp, Users, Globe, Database,
  ArrowRight, Play, Settings, Eye, Lock, Key, Cpu,
  HardDrive, Wifi, BarChart3, AlertTriangle, Info,
  Target, Award, Trophy, Star, Rocket, Sparkles,
  Gauge, ShieldCheck, Fingerprint, Smartphone, Monitor,
  MessageSquare, Mail, Phone, HelpCircle, Lightbulb,
  Code, Terminal, Command, TerminalSquare, GitBranch,
  Database as DatabaseIcon, Server as ServerIcon,
  Monitor as MonitorIcon, Smartphone as SmartphoneIcon,
  Search, ExternalLink, Copy, BookOpen, Video, Download,
  User, Calendar, MapPin, Clock as ClockIcon,
  XCircle, AlertCircle, Info as InfoIcon, Star as StarIcon
} from 'lucide-react';

const MCPSupportPage = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    category: 'general',
    message: ''
  });

  const supportCategories = {
    contact: [
      {
        title: 'Live Chat Support',
        description: 'Get instant help from our support team',
        icon: MessageSquare,
        color: 'blue',
        availability: '24/7',
        responseTime: '< 2 minutes',
        features: ['Real-time chat', 'Screen sharing', 'File uploads']
      },
      {
        title: 'Email Support',
        description: 'Send us a detailed message for complex issues',
        icon: Mail,
        color: 'emerald',
        availability: '24/7',
        responseTime: '< 4 hours',
        features: ['Detailed responses', 'Attachments', 'Ticket tracking']
      },
      {
        title: 'Phone Support',
        description: 'Speak directly with our technical experts',
        icon: Phone,
        color: 'purple',
        availability: '9 AM - 6 PM EST',
        responseTime: 'Immediate',
        features: ['Direct conversation', 'Remote assistance', 'Follow-up calls']
      }
    ],
    resources: [
      {
        title: 'Knowledge Base',
        description: 'Searchable database of articles and solutions',
        icon: BookOpen,
        color: 'blue',
        articles: '500+',
        categories: '25',
        features: ['Searchable content', 'Step-by-step guides', 'Video tutorials']
      },
      {
        title: 'Video Tutorials',
        description: 'Visual guides for common tasks and features',
        icon: Video,
        color: 'emerald',
        videos: '100+',
        duration: '2-15 min',
        features: ['HD quality', 'Closed captions', 'Downloadable']
      },
      {
        title: 'Community Forum',
        description: 'Connect with other MCP users and experts',
        icon: Users,
        color: 'purple',
        members: '10,000+',
        topics: '5,000+',
        features: ['Peer support', 'Expert moderation', 'Best practices']
      }
    ],
    selfHelp: [
      {
        title: 'Troubleshooting Guide',
        description: 'Common issues and their solutions',
        icon: HelpCircle,
        color: 'orange',
        issues: '200+',
        successRate: '95%',
        features: ['Interactive wizard', 'Symptom checker', 'Quick fixes']
      },
      {
        title: 'System Diagnostics',
        description: 'Automated system health checks and fixes',
        icon: Activity,
        color: 'emerald',
        checks: '50+',
        autoFix: '80%',
        features: ['Automated scans', 'Self-healing', 'Health reports']
      },
      {
        title: 'Configuration Wizard',
        description: 'Guided setup and configuration assistance',
        icon: Settings,
        color: 'blue',
        wizards: '15+',
        steps: '3-10',
        features: ['Step-by-step', 'Validation', 'Auto-save']
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support form submitted:', supportForm);
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
                  <HelpCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  MCP Support
                </h1>
                <p className="text-xl text-blue-100 mt-2">
                  Expert Help When You Need It Most
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-emerald-400">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-400">&lt; 2min</div>
                <div className="text-sm text-blue-100">Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-400">98%</div>
                <div className="text-sm text-blue-100">Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-blue-100">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto space-y-12">
        {/* Support Options */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <span>Support Options</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choose the support option that best fits your needs and urgency level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="contact" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="resources" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="selfHelp" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Self Help
                </TabsTrigger>
              </TabsList>

              {Object.entries(supportCategories).map(([category, options]) => (
                <TabsContent key={category} value={category} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {options.map((option, index) => (
                      <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`p-3 rounded-lg ${getColorClasses(option.color)}`}>
                              <option.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-slate-900">
                                {option.title}
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                {option.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-600">Availability</span>
                            <Badge className="bg-emerald-100 text-emerald-800">
                              {option.availability}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-600">Response Time</span>
                            <Badge className="bg-blue-100 text-blue-800">
                              {option.responseTime}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {option.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                <span className="text-slate-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Get Started
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Mail className="w-8 h-8 text-blue-600" />
              <span>Contact Support</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Send us a detailed message and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <Input
                    type="text"
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input
                    type="email"
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <Input
                    type="text"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Priority</label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm({...supportForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  value={supportForm.category}
                  onChange={(e) => setSupportForm({...supportForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <Textarea
                  value={supportForm.message}
                  onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Team */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <Users className="w-8 h-8 text-emerald-600" />
              <span>Our Support Team</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Meet the experts who are here to help you succeed with MCP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sarah Johnson</h3>
                <p className="text-sm text-slate-600 mb-3">Senior Support Engineer</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">Specializes in system integration and troubleshooting</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Michael Chen</h3>
                <p className="text-sm text-slate-600 mb-3">Technical Support Specialist</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">Expert in API integration and performance optimization</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Emily Rodriguez</h3>
                <p className="text-sm text-slate-600 mb-3">Customer Success Manager</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">Focused on customer onboarding and feature adoption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Statistics */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-3">
              <BarChart3 className="w-8 h-8 text-slate-600" />
              <span>Support Statistics</span>
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Our commitment to providing exceptional support service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Response Time</h3>
                  <ClockIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">&lt; 2 min</div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Average live chat</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Customer Satisfaction</h3>
                  <StarIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Based on 10,000+ reviews</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Resolution Rate</h3>
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>First contact resolution</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Support Hours</h3>
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Round-the-clock support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Help?</h3>
              <p className="text-blue-100 mb-6">
                Our support team is standing by to assist you with any questions or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPSupportPage;
