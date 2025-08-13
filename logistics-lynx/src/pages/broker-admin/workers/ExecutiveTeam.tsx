import React, { useState } from 'react';
import { 
  UserCheck, 
  Crown, 
  Building2, 
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Users,
  Target,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ExecutiveTeam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock executive data
  const executives = [
    {
      id: 1,
      name: 'Robert Chen',
      title: 'Chief Executive Officer',
      department: 'Executive',
      email: 'robert.chen@freightbroker.com',
      phone: '(555) 001-1001',
      location: 'New York, NY',
      joinDate: '2019-01-15',
      salary: 280000,
      bonus: 150000,
      reports: 156,
      experience: '15 years',
      education: 'MBA - Harvard Business School',
      achievements: ['Led 300% company growth', 'Industry Leader Award 2023'],
      avatar: '/avatars/robert-chen.jpg'
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      title: 'Chief Operating Officer',
      department: 'Operations',
      email: 'sarah.mitchell@freightbroker.com',
      phone: '(555) 001-1002',
      location: 'Chicago, IL',
      joinDate: '2020-03-10',
      salary: 220000,
      bonus: 85000,
      reports: 89,
      experience: '12 years',
      education: 'MS - Supply Chain Management',
      achievements: ['Reduced operational costs by 25%', 'Excellence in Operations 2023'],
      avatar: '/avatars/sarah-mitchell.jpg'
    },
    {
      id: 3,
      name: 'David Thompson',
      title: 'Chief Financial Officer',
      department: 'Finance',
      email: 'david.thompson@freightbroker.com',
      phone: '(555) 001-1003',
      location: 'New York, NY',
      joinDate: '2020-08-01',
      salary: 200000,
      bonus: 75000,
      reports: 18,
      experience: '14 years',
      education: 'CPA, MBA - Wharton',
      achievements: ['Improved profit margins by 18%', 'CFO of the Year 2022'],
      avatar: '/avatars/david-thompson.jpg'
    },
    {
      id: 4,
      name: 'Jennifer Rodriguez',
      title: 'Chief Technology Officer',
      department: 'Technology',
      email: 'jennifer.rodriguez@freightbroker.com',
      phone: '(555) 001-1004',
      location: 'Austin, TX',
      joinDate: '2021-02-15',
      salary: 210000,
      bonus: 80000,
      reports: 32,
      experience: '11 years',
      education: 'MS - Computer Science',
      achievements: ['Launched AI-powered routing system', 'Tech Innovation Award 2023'],
      avatar: '/avatars/jennifer-rodriguez.jpg'
    },
    {
      id: 5,
      name: 'Michael Anderson',
      title: 'VP of Sales',
      department: 'Sales',
      email: 'michael.anderson@freightbroker.com',
      phone: '(555) 001-1005',
      location: 'Dallas, TX',
      joinDate: '2019-11-20',
      salary: 180000,
      bonus: 120000,
      reports: 53,
      experience: '13 years',
      education: 'MBA - Sales & Marketing',
      achievements: ['Generated $50M in new business', 'Sales Leader Award 2023'],
      avatar: '/avatars/michael-anderson.jpg'
    },
    {
      id: 6,
      name: 'Lisa Park',
      title: 'VP of Customer Success',
      department: 'Customer Success',
      email: 'lisa.park@freightbroker.com',
      phone: '(555) 001-1006',
      location: 'Los Angeles, CA',
      joinDate: '2020-06-01',
      salary: 160000,
      bonus: 60000,
      reports: 28,
      experience: '9 years',
      education: 'MBA - Customer Relations',
      achievements: ['Achieved 98% customer retention', 'Customer Excellence Award 2023'],
      avatar: '/avatars/lisa-park.jpg'
    }
  ];

  const filteredExecutives = executives.filter(exec =>
    exec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exec.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCompensation = executives.reduce((sum, exec) => sum + exec.salary + exec.bonus, 0);
  const totalReports = executives.reduce((sum, exec) => sum + exec.reports, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Crown className="w-8 h-8 text-primary" />
            Executive Team
          </h1>
          <p className="text-muted-foreground mt-2">
            Leadership team managing {totalReports.toLocaleString()} employees
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Executive Dashboard
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Executive
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Executive</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="title">Executive Title</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">Chief Executive Officer</SelectItem>
                      <SelectItem value="coo">Chief Operating Officer</SelectItem>
                      <SelectItem value="cfo">Chief Financial Officer</SelectItem>
                      <SelectItem value="cto">Chief Technology Officer</SelectItem>
                      <SelectItem value="vp-sales">VP of Sales</SelectItem>
                      <SelectItem value="vp-ops">VP of Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="executive@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="salary">Base Salary</Label>
                  <Input id="salary" type="number" placeholder="200000" />
                </div>
                <div>
                  <Label htmlFor="bonus">Annual Bonus</Label>
                  <Input id="bonus" type="number" placeholder="75000" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" placeholder="MBA - Harvard Business School" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea id="achievements" placeholder="List major achievements..." />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Executive
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executive Count</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executives.length}</div>
            <p className="text-xs text-muted-foreground">Leadership positions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Compensation</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCompensation / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Annual executive compensation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Direct Reports</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">Employees under executives</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">Years of experience</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search executives by name, title, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Executive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExecutives.map((executive) => (
          <Card key={executive.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={executive.avatar} alt={executive.name} />
                    <AvatarFallback className="text-lg">
                      {executive.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{executive.name}</h3>
                    <p className="text-muted-foreground">{executive.title}</p>
                    <Badge variant="outline" className="mt-1">
                      {executive.department}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {executive.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {executive.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {executive.location}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Performance</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {executive.reports} Direct Reports
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${(executive.salary + executive.bonus).toLocaleString()} Total Comp
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {executive.experience} Experience
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Education</p>
                <p className="text-sm">{executive.education}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Key Achievements</p>
                <div className="space-y-1">
                  {executive.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Award className="w-3 h-3 text-yellow-500" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveTeam;