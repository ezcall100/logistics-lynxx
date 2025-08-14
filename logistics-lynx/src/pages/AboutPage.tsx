import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Brain, Target, Users, Award, Globe, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            About Trans Bot AI
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Revolutionizing Transportation with AI
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to transform the transportation industry through cutting-edge artificial intelligence
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Trans Bot AI was founded with a simple yet powerful vision: to make transportation 
                more efficient, sustainable, and intelligent through the power of artificial intelligence.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every mile traveled should be optimized, every route should be 
                intelligent, and every decision should be data-driven. Our AI-powered platform 
                helps companies reduce costs, improve efficiency, and make better decisions.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Optimizing every mile, every day
                </span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span>500+ companies trust our platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-green-500" />
                  <span>Operations in 25+ countries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span>10M+ miles optimized</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-purple-500" />
                  <span>50,000+ users worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Innovation</CardTitle>
                <CardDescription>
                  We constantly push the boundaries of what's possible with AI and technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Excellence</CardTitle>
                <CardDescription>
                  We strive for excellence in every feature, every update, and every interaction
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Customer Success</CardTitle>
                <CardDescription>
                  Our success is measured by the success of our customers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Sustainability</CardTitle>
                <CardDescription>
                  We're committed to making transportation more sustainable and eco-friendly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Speed</CardTitle>
                <CardDescription>
                  We move fast to deliver value to our customers quickly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Quality</CardTitle>
                <CardDescription>
                  We maintain the highest standards of quality in everything we build
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the brilliant minds behind Trans Bot AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle>AI Engineers</CardTitle>
                <CardDescription>
                  World-class machine learning experts building the future of transportation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Data Scientists</CardTitle>
                <CardDescription>
                  Transforming raw data into actionable insights for better decisions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle>Industry Experts</CardTitle>
                <CardDescription>
                  Transportation professionals with decades of real-world experience
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
