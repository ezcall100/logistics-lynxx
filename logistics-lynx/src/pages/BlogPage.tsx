import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Search, Calendar, User, ArrowRight, 
  Tag, BookOpen, TrendingUp, Lightbulb 
} from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Transportation Management",
      excerpt: "Discover how artificial intelligence is revolutionizing the transportation industry and what it means for your business operations.",
      author: "Sarah Johnson",
      date: "December 15, 2024",
      category: "AI & Technology",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "10 Ways AI Route Optimization Saves Money",
      excerpt: "Learn the specific strategies that AI-powered route optimization uses to reduce costs and improve efficiency.",
      author: "Michael Chen",
      date: "December 12, 2024",
      category: "Cost Optimization",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Real-time Tracking: Beyond GPS",
      excerpt: "Explore the advanced technologies that make real-time tracking more than just location monitoring.",
      author: "Emily Rodriguez",
      date: "December 10, 2024",
      category: "Technology",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Predictive Analytics in Fleet Management",
      excerpt: "How machine learning algorithms predict maintenance needs and optimize fleet performance.",
      author: "David Kim",
      date: "December 8, 2024",
      category: "Analytics",
      readTime: "7 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Safety First: AI-Powered Driver Monitoring",
      excerpt: "Understanding how AI helps prevent accidents and improve driver safety through behavioral analysis.",
      author: "Lisa Thompson",
      date: "December 5, 2024",
      category: "Safety",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Global Operations: Managing Multi-Country Fleets",
      excerpt: "Best practices for managing transportation operations across different countries and regulations.",
      author: "James Wilson",
      date: "December 3, 2024",
      category: "Global Operations",
      readTime: "8 min read",
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    "All Posts",
    "AI & Technology",
    "Cost Optimization",
    "Analytics",
    "Safety",
    "Global Operations",
    "Case Studies"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Trans Bot AI Blog
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Insights & Updates
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay informed about the latest trends in AI-powered transportation management
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
                placeholder="Search articles..." 
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === "All Posts" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-50"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our latest insights on AI-powered transportation
            </p>
          </div>
          
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <Lightbulb className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Featured</h3>
                  <p className="text-blue-100">Latest insights</p>
                </div>
              </div>
              <div className="p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">AI & Technology</Badge>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  The Future of AI in Transportation Management
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Discover how artificial intelligence is revolutionizing the transportation industry and what it means for your business operations. From predictive analytics to autonomous vehicles, explore the cutting-edge technologies shaping the future of logistics.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Sarah Johnson</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">December 15, 2024</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends and insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights on AI-powered transportation management delivered to your inbox
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

      {/* Popular Topics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most-read content categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI & Technology</CardTitle>
                <CardDescription>
                  15 articles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Tag className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>
                  12 articles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Case Studies</CardTitle>
                <CardDescription>
                  8 articles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  20 articles
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Trans Bot AI to optimize their transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
