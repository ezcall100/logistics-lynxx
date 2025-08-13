import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, TrendingUp, Building2, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
  status: 'active' | 'inactive';
  location: string;
  costCenter: string;
}

const initialDepartments: Department[] = [
  {
    id: '1',
    name: 'Operations',
    description: 'Manages freight operations, load planning, and carrier coordination',
    manager: 'Sarah Johnson',
    employeeCount: 25,
    budget: 750000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'OP-001'
  },
  {
    id: '2',
    name: 'Sales & Business Development',
    description: 'Customer acquisition, relationship management, and revenue growth',
    manager: 'Mike Rodriguez',
    employeeCount: 18,
    budget: 850000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'SL-001'
  },
  {
    id: '3',
    name: 'Customer Service',
    description: 'Customer support, issue resolution, and account management',
    manager: 'Lisa Chen',
    employeeCount: 12,
    budget: 420000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'CS-001'
  },
  {
    id: '4',
    name: 'Dispatch & Logistics',
    description: 'Load dispatching, route optimization, and carrier communications',
    manager: 'David Thompson',
    employeeCount: 20,
    budget: 580000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'DL-001'
  },
  {
    id: '5',
    name: 'Finance & Accounting',
    description: 'Financial planning, accounting, billing, and collections',
    manager: 'Jennifer Adams',
    employeeCount: 8,
    budget: 380000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'FN-001'
  },
  {
    id: '6',
    name: 'Information Technology',
    description: 'Technology infrastructure, software development, and system maintenance',
    manager: 'Alex Kumar',
    employeeCount: 6,
    budget: 450000,
    status: 'active',
    location: 'Main Office',
    costCenter: 'IT-001'
  }
];

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});
  const { toast } = useToast();

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name || '',
      description: newDepartment.description || '',
      manager: newDepartment.manager || '',
      employeeCount: newDepartment.employeeCount || 0,
      budget: newDepartment.budget || 0,
      status: newDepartment.status || 'active',
      location: newDepartment.location || '',
      costCenter: newDepartment.costCenter || ''
    };
    
    setDepartments([...departments, department]);
    setNewDepartment({});
    setIsAddDialogOpen(false);
    toast({
      title: "Department Added",
      description: "New department has been successfully created."
    });
  };

  const handleEditDepartment = () => {
    if (selectedDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === selectedDepartment.id ? selectedDepartment : dept
      ));
      setIsEditDialogOpen(false);
      setSelectedDepartment(null);
      toast({
        title: "Department Updated",
        description: "Department has been successfully updated."
      });
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: "Department Deleted",
      description: "Department has been successfully deleted."
    });
  };

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Department Management</h1>
          <p className="text-muted-foreground">Manage organizational departments and structure</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department in your organization</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  value={newDepartment.name || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  placeholder="e.g., Operations"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manager">Department Manager</Label>
                <Input
                  id="manager"
                  value={newDepartment.manager || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, manager: e.target.value })}
                  placeholder="Manager name"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDepartment.description || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  placeholder="Department description and responsibilities"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newDepartment.location || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, location: e.target.value })}
                  placeholder="Office location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="costCenter">Cost Center</Label>
                <Input
                  id="costCenter"
                  value={newDepartment.costCenter || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, costCenter: e.target.value })}
                  placeholder="e.g., OP-001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={newDepartment.employeeCount || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, employeeCount: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Annual Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newDepartment.budget || ''}
                  onChange={(e) => setNewDepartment({ ...newDepartment, budget: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDepartment}>Add Department</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
            <Badge variant="default" className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.filter(d => d.status === 'active').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {department.description}
                  </CardDescription>
                </div>
                <Badge variant={department.status === 'active' ? 'default' : 'secondary'}>
                  {department.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Manager:</span>
                  <span className="text-sm font-medium">{department.manager}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Employees:</span>
                  <span className="text-sm font-medium">{department.employeeCount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Budget:</span>
                  <span className="text-sm font-medium">${(department.budget / 1000).toFixed(0)}K</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium">{department.location}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cost Center:</span>
                  <span className="text-sm font-medium">{department.costCenter}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDepartment(department);
                    setIsEditDialogOpen(true);
                  }}
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteDepartment(department.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update department information</DialogDescription>
          </DialogHeader>
          
          {selectedDepartment && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Department Name</Label>
                <Input
                  id="edit-name"
                  value={selectedDepartment.name}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-manager">Department Manager</Label>
                <Input
                  id="edit-manager"
                  value={selectedDepartment.manager}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, manager: e.target.value })}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedDepartment.description}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedDepartment.location}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, location: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-costCenter">Cost Center</Label>
                <Input
                  id="edit-costCenter"
                  value={selectedDepartment.costCenter}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, costCenter: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-employeeCount">Employee Count</Label>
                <Input
                  id="edit-employeeCount"
                  type="number"
                  value={selectedDepartment.employeeCount}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, employeeCount: parseInt(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-budget">Annual Budget</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={selectedDepartment.budget}
                  onChange={(e) => setSelectedDepartment({ ...selectedDepartment, budget: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditDepartment}>Update Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;