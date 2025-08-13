import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Award, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';

const BusinessTrainingPage = () => {
  const trainingData = {
    courses: [
      {
        title: 'Financial Management for Owner-Operators',
        description: 'Learn to manage cash flow, budgeting, and financial planning',
        duration: '4 hours',
        level: 'Intermediate',
        progress: 75,
        status: 'in-progress'
      },
      {
        title: 'Customer Relationship Management',
        description: 'Build lasting relationships with shippers and brokers',
        duration: '3 hours',
        level: 'Beginner',
        progress: 100,
        status: 'completed'
      },
      {
        title: 'Route Optimization Strategies',
        description: 'Maximize efficiency and reduce operational costs',
        duration: '2.5 hours',
        level: 'Advanced',
        progress: 0,
        status: 'not-started'
      }
    ],
    achievements: [
      { title: 'Business Basics', earned: true, date: '2024-01-10' },
      { title: 'Safety Champion', earned: true, date: '2024-01-08' },
      { title: 'Financial Guru', earned: false, date: null },
      { title: 'Technology Expert', earned: false, date: null }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'not-started': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Business Training</h1>
        <p className="text-muted-foreground">Enhance your business skills and knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Hours Trained</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Certifications</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Skill Level</p>
                <p className="text-2xl font-bold">Advanced</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Available Courses
            </CardTitle>
            <CardDescription>Business training courses for owner-operators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainingData.courses.map((course, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{course.title}</h4>
                  <Badge className={`${getLevelColor(course.level)} border-0`}>
                    {course.level}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status.replace('-', ' ')}
                  </Badge>
                </div>

                {course.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button 
                  size="sm" 
                  className="w-full"
                  variant={course.status === 'completed' ? 'outline' : 'default'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {course.status === 'completed' ? 'Review' : 
                   course.status === 'in-progress' ? 'Continue' : 'Start Course'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements & Certifications
            </CardTitle>
            <CardDescription>Your earned badges and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainingData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {achievement.earned ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-muted-foreground">Earned {achievement.date}</p>
                    )}
                  </div>
                </div>
                {achievement.earned && (
                  <Award className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
            <CardDescription>Recommended course sequence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Business Fundamentals
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Financial Management
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Customer Relations
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Advanced Strategies
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Groups</CardTitle>
            <CardDescription>Connect with other owner-operators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Financial Management Group</h4>
              <p className="text-sm text-muted-foreground">12 members</p>
              <Button size="sm" className="mt-2">Join</Button>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">New Owner-Operators</h4>
              <p className="text-sm text-muted-foreground">8 members</p>
              <Button size="sm" className="mt-2">Join</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Additional learning materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Training Library
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Mentorship Program
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Industry Webinars
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessTrainingPage;