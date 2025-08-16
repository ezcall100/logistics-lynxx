/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, BookOpen, Calendar, Users, Star, Plus, Play, Award, TrendingUp, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'compliance' | 'skills' | 'leadership' | 'technology';
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  format: 'online' | 'in-person' | 'hybrid';
  enrolledCount: number;
  maxCapacity: number;
  rating: number;
  isRequired: boolean;
  status: 'active' | 'draft' | 'archived';
  startDate: string;
  endDate: string;
}

interface EmployeeTraining {
  id: string;
  employeeName: string;
  department: string;
  role: string;
  programsCompleted: number;
  programsInProgress: number;
  certificationsEarned: number;
  totalHours: number;
  lastActivity: string;
  complianceStatus: 'compliant' | 'due_soon' | 'overdue';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: string;
  validityPeriod: number; // in months
  requiredFor: string[];
  employeesWithCert: number;
  expiringCount: number;
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: '1',
    title: 'DOT Compliance & Safety Regulations',
    description: 'Comprehensive training on Department of Transportation regulations and safety protocols for freight operations.',
    category: 'compliance',
    duration: 8,
    difficulty: 'intermediate',
    instructor: 'Sarah Wilson',
    format: 'hybrid',
    enrolledCount: 45,
    maxCapacity: 50,
    rating: 4.8,
    isRequired: true,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-02-15'
  },
  {
    id: '2',
    title: 'Customer Service Excellence',
    description: 'Advanced customer service techniques and communication skills for freight brokers.',
    category: 'skills',
    duration: 6,
    difficulty: 'beginner',
    instructor: 'Mike Johnson',
    format: 'online',
    enrolledCount: 32,
    maxCapacity: 40,
    rating: 4.6,
    isRequired: false,
    status: 'active',
    startDate: '2024-02-10',
    endDate: '2024-02-24'
  },
  {
    id: '3',
    title: 'Leadership Development Program',
    description: 'Comprehensive leadership training for supervisors and managers.',
    category: 'leadership',
    duration: 16,
    difficulty: 'advanced',
    instructor: 'Dr. Lisa Chen',
    format: 'in-person',
    enrolledCount: 12,
    maxCapacity: 15,
    rating: 4.9,
    isRequired: false,
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-04-15'
  },
  {
    id: '4',
    title: 'TMS Software Training',
    description: 'Hands-on training for our Transportation Management System.',
    category: 'technology',
    duration: 4,
    difficulty: 'beginner',
    instructor: 'Alex Kumar',
    format: 'online',
    enrolledCount: 78,
    maxCapacity: 100,
    rating: 4.7,
    isRequired: true,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-01-29'
  }
];

const employeeTraining: EmployeeTraining[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    department: 'Operations',
    role: 'Operations Manager',
    programsCompleted: 8,
    programsInProgress: 2,
    certificationsEarned: 5,
    totalHours: 64,
    lastActivity: '2024-01-15',
    complianceStatus: 'compliant'
  },
  {
    id: '2',
    employeeName: 'Mike Rodriguez',
    department: 'Sales',
    role: 'Sales Director',
    programsCompleted: 6,
    programsInProgress: 1,
    certificationsEarned: 3,
    totalHours: 48,
    lastActivity: '2024-01-12',
    complianceStatus: 'compliant'
  },
  {
    id: '3',
    employeeName: 'Lisa Chen',
    department: 'Customer Service',
    role: 'CS Manager',
    programsCompleted: 4,
    programsInProgress: 3,
    certificationsEarned: 2,
    totalHours: 36,
    lastActivity: '2024-01-10',
    complianceStatus: 'due_soon'
  },
  {
    id: '4',
    employeeName: 'David Thompson',
    department: 'Dispatch',
    role: 'Dispatcher',
    programsCompleted: 3,
    programsInProgress: 1,
    certificationsEarned: 1,
    totalHours: 24,
    lastActivity: '2024-01-08',
    complianceStatus: 'overdue'
  }
];

const certifications: Certification[] = [
  {
    id: '1',
    name: 'Freight Broker License',
    issuer: 'FMCSA',
    category: 'Compliance',
    validityPeriod: 24,
    requiredFor: ['Broker', 'Sales Agent'],
    employeesWithCert: 35,
    expiringCount: 3
  },
  {
    id: '2',
    name: 'Hazmat Certification',
    issuer: 'DOT',
    category: 'Safety',
    validityPeriod: 12,
    requiredFor: ['Operations', 'Dispatch'],
    employeesWithCert: 28,
    expiringCount: 5
  },
  {
    id: '3',
    name: 'TMS Expert Certification',
    issuer: 'Internal',
    category: 'Technology',
    validityPeriod: 36,
    requiredFor: ['All Departments'],
    employeesWithCert: 67,
    expiringCount: 2
  }
];

const TrainingDevelopment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [newProgram, setNewProgram] = useState<Partial<TrainingProgram>>({});
  const { toast } = useToast();

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProgram = () => {
    const program: TrainingProgram = {
      id: Date.now().toString(),
      title: newProgram.title || '',
      description: newProgram.description || '',
      category: newProgram.category || 'skills',
      duration: newProgram.duration || 0,
      difficulty: newProgram.difficulty || 'beginner',
      instructor: newProgram.instructor || '',
      format: newProgram.format || 'online',
      enrolledCount: 0,
      maxCapacity: newProgram.maxCapacity || 20,
      rating: 0,
      isRequired: newProgram.isRequired || false,
      status: 'draft',
      startDate: newProgram.startDate || '',
      endDate: newProgram.endDate || ''
    };
    
    toast({
      title: "Training Program Added",
      description: "New training program has been successfully created."
    });
    setNewProgram({});
    setIsAddProgramOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return <Award className="h-4 w-4" />;
      case 'compliance': return <BookOpen className="h-4 w-4" />;
      case 'skills': return <Target className="h-4 w-4" />;
      case 'leadership': return <Users className="h-4 w-4" />;
      case 'technology': return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'bg-red-500';
      case 'compliance': return 'bg-blue-500';
      case 'skills': return 'bg-green-500';
      case 'leadership': return 'bg-purple-500';
      case 'technology': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplianceStatus = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge className="bg-green-500">Compliant</Badge>;
      case 'due_soon': return <Badge className="bg-yellow-500">Due Soon</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const totalEmployeesInTraining = employeeTraining.length;
  const avgCompletionRate = employeeTraining.reduce((sum, emp) => sum + emp.programsCompleted, 0) / totalEmployeesInTraining;
  const totalTrainingHours = employeeTraining.reduce((sum, emp) => sum + emp.totalHours, 0);
  const complianceRate = (employeeTraining.filter(emp => emp.complianceStatus === 'compliant').length / totalEmployeesInTraining) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-muted-foreground">Manage employee training programs, certifications, and skill development</p>
        </div>
        
        <Dialog open={isAddProgramOpen} onOpenChange={setIsAddProgramOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Training Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Training Program</DialogTitle>
              <DialogDescription>Add a new training program for employees</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Program Title</Label>
                <Input
                  id="title"
                  value={newProgram.title || ''}
                  onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                  placeholder="Enter program title"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProgram.description || ''}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  placeholder="Program description and objectives"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newProgram.category} onValueChange={(value) => setNewProgram({ ...newProgram, category: value as unknown })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="skills">Skills</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select value={newProgram.difficulty} onValueChange={(value) => setNewProgram({ ...newProgram, difficulty: value as unknown })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newProgram.duration || ''}
                  onChange={(e) => setNewProgram({ ...newProgram, duration: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  value={newProgram.maxCapacity || ''}
                  onChange={(e) => setNewProgram({ ...newProgram, maxCapacity: parseInt(e.target.value) })}
                  placeholder="20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newProgram.instructor || ''}
                  onChange={(e) => setNewProgram({ ...newProgram, instructor: e.target.value })}
                  placeholder="Instructor name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={newProgram.format} onValueChange={(value) => setNewProgram({ ...newProgram, format: value as unknown })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProgramOpen(false)}>Cancel</Button>
              <Button onClick={handleAddProgram}>Create Program</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingPrograms.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Training programs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Training Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrainingHours}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceRate.toFixed(0)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% this quarter
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionRate.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Programs per employee</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="programs">Training Programs</TabsTrigger>
          <TabsTrigger value="employees">Employee Progress</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="skills">Skills</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Training Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(program.category)}
                      <div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {program.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getCategoryColor(program.category)}>
                        {program.category}
                      </Badge>
                      {program.isRequired && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="text-sm font-medium">{program.duration} hours</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Instructor:</span>
                      <span className="text-sm font-medium">{program.instructor}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span className="text-sm font-medium">{program.format}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Difficulty:</span>
                      <Badge variant="outline">{program.difficulty}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{program.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Enrollment</span>
                      <span className="text-sm font-medium">
                        {program.enrolledCount}/{program.maxCapacity}
                      </span>
                    </div>
                    <Progress 
                      value={(program.enrolledCount / program.maxCapacity) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      Enroll
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="space-y-4">
            {employeeTraining.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{employee.employeeName}</h3>
                          <p className="text-muted-foreground">{employee.role} • {employee.department}</p>
                        </div>
                        {getComplianceStatus(employee.complianceStatus)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-muted-foreground">Completed</span>
                          </div>
                          <span className="text-2xl font-bold">{employee.programsCompleted}</span>
                          <p className="text-xs text-muted-foreground">Programs</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-muted-foreground">In Progress</span>
                          </div>
                          <span className="text-2xl font-bold">{employee.programsInProgress}</span>
                          <p className="text-xs text-muted-foreground">Programs</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-muted-foreground">Certifications</span>
                          </div>
                          <span className="text-2xl font-bold">{employee.certificationsEarned}</span>
                          <p className="text-xs text-muted-foreground">Earned</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-muted-foreground">Total Hours</span>
                          </div>
                          <span className="text-2xl font-bold">{employee.totalHours}</span>
                          <p className="text-xs text-muted-foreground">Training hours</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Last Activity: {new Date(employee.lastActivity).toLocaleDateString()}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription>{cert.issuer} • {cert.category}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Validity Period:</span>
                      <span className="text-sm font-medium">{cert.validityPeriod} months</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employees with Cert:</span>
                      <span className="text-sm font-medium">{cert.employeesWithCert}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expiring Soon:</span>
                      <span className="text-sm font-medium text-yellow-600">{cert.expiringCount}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Required For:</span>
                    <div className="flex flex-wrap gap-1">
                      {cert.requiredFor.map((role, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Certification
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Completion by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Operations</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Sales</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm">92%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Customer Service</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm">78%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Dispatch</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <span className="text-sm">73%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Training Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Compliance</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Skills Development</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Safety</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Technology</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Leadership</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingDevelopment;