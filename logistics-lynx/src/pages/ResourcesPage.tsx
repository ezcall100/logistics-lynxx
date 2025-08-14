import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  FileText, Video, BookOpen, Download, Search, 
  Calendar, User, ArrowRight, Play, File, 
  TrendingUp, Lightbulb, Award, Globe 
} from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "AI in Transportation: A Complete Guide",
      type: "Whitepaper",
      category: "AI & Technology",
      description: "Comprehensive guide to implementing AI in transportation management",
      author: "Dr. Sarah Johnson",
      date: "December 2024",
      downloadCount: "2,847",
      fileSize: "2.3 MB",
      icon: FileText,
      featured: true
    },
    {
      id: 2,
      title: "Route Optimization Best Practices",
      type: "Guide",
      category: "Operations",
      description: "Learn the best practices for implementing AI-powered route optimization",
      author: "Michael Chen",
      date: "November 2024",
      downloadCount: "1,923",
      fileSize: "1.8 MB",
      icon: BookOpen
    },
    {
      id: 3,
      title: "Trans Bot AI Platform Demo",
      type: "Video",
      category: "Product",
      description: "See Trans Bot AI in action with real-world examples",
      author: "Product Team",
      date: "December 2024",
      duration: "15 min",
      viewCount: "5,234",
      icon: Video
    },
    {
      id: 4,
      title: "Cost Optimization Strategies",
      type: "Case Study",
      category: "ROI",
      description: "How companies are reducing costs by 25% with AI optimization",
      author: "Analytics Team",
      date: "November 2024",
      downloadCount: "1,456",
      fileSize: "3.1 MB",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "API Integration Guide",
      type: "Technical",
      category: "Development",
      description: "Complete guide to integrating Trans Bot AI APIs",
      author: "Developer Relations",
      date: "December 2024",
      downloadCount: "892",
      fileSize: "1.2 MB",
      icon: File
    },
    {
      id: 6,
      title: "Safety Management Webinar",
      type: "Webinar",
      category: "Safety",
      description: "Best practices for AI-powered safety management",
      author: "Safety Team",
      date: "November 2024",
      duration: "45 min",
      viewCount: "3,567",
      icon: Play
    }
  ];

  const categories = [
    "All Resources",
    "AI & Technology",
    "Operations",
    "Product",
    "ROI",
    "Development",
    "Safety",
    "Compliance"
  ];

  const upcomingEvents = [
    {
      title: "AI Transportation Summit 2025",
      date: "January 15, 2025",
      time: "9:00 AM EST",
      type: "Conference",
      description: "Join industry leaders to discuss the future of AI in transportation"
    },
    {
      title: "Trans Bot AI User Conference",
      date: "February 8, 2025",
      time: "1:00 PM EST",
      type: "Virtual Event",
      description: "Connect with other users and learn advanced features"
    },
    {
      title: "API Workshop",
      date: "January 22, 2025",
      time: "3:00 PM EST",
      type: "Workshop",
      description: "Hands-on workshop for developers integrating our APIs"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Resources & Learning
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Knowledge Hub
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Access whitepapers, guides, videos, and insights to help you succeed with AI-powered transportation
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === "All Resources" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-50"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Resource
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and comprehensive guide
            </p>
          </div>
          
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <Award className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Featured</h3>
                  <p className="text-blue-100">Most downloaded</p>
                </div>
              </div>
              <div className="p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">AI & Technology</Badge>
                  <span className="text-sm text-gray-500">Whitepaper</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  AI in Transportation: A Complete Guide
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  This comprehensive guide covers everything you need to know about implementing AI in transportation management, from basic concepts to advanced optimization strategies.
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Dr. Sarah Johnson</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">December 2024</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{resources[0].downloadCount} downloads</div>
                    <div className="text-sm text-gray-500">{resources[0].fileSize}</div>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Whitepaper
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete library of educational content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.slice(1).map((resource) => (
              <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{resource.type}</span>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{resource.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {resource.downloadCount && `${resource.downloadCount} downloads`}
                      {resource.viewCount && `${resource.viewCount} views`}
                    </div>
                    <Button variant="outline" size="sm">
                      {resource.type === 'Video' || resource.type === 'Webinar' ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our live events and webinars to learn from experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{event.time}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get notified when we publish new resources, host events, or release product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Access our resources and start optimizing your transportation operations today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
