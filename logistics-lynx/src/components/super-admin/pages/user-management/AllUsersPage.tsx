import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Checkbox } from '../../../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../../ui/alert-dialog';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  lastLogin: string;
  createdAt: string;
  department: string;
  avatar?: string;
}

const AllUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15 10:30 AM',
      createdAt: '2023-06-15',
      department: 'IT'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2024-01-15 09:15 AM',
      createdAt: '2023-08-20',
      department: 'Sales'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'User',
      status: 'pending',
      lastLogin: 'Never',
      createdAt: '2024-01-10',
      department: 'Marketing'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-01-15 11:45 AM',
      createdAt: '2023-01-10',
      department: 'Executive'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'User',
      status: 'suspended',
      lastLogin: '2024-01-10 02:30 PM',
      createdAt: '2023-11-05',
      department: 'HR'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'pending'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleViewUser = (user: User) => {
    setCurrentUser(user);
    setShowViewDialog(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setShowEditDialog(true);
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (currentUser) {
      setUsers(prev => prev.filter(u => u.id !== currentUser.id));
      setIsDeleteDialogOpen(false);
      setCurrentUser(null);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status as 'active' | 'pending' | 'suspended' | 'inactive',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      department: newUser.department
    };
    
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: '', department: '', status: 'pending' });
    setShowAddDialog(false);
  };

  const handleSaveUserEdit = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id ? currentUser : user
    ));
    setShowEditDialog(false);
    setCurrentUser(null);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus as 'active' | 'pending' | 'suspended' | 'inactive' } : user
    ));
  };

  const handleDeleteUsers = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Super Admin">Super Admin</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {selectedUsers.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteUsers}>
              <span className="mr-2">🗑️</span>
              Delete ({selectedUsers.length})
            </Button>
          )}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <span className="mr-2">➕</span>
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users Table */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-800">
                <TableHead className="w-12 text-slate-900 dark:text-slate-100">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">User</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Role</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Status</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Department</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Last Login</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Created</TableHead>
                <TableHead className="text-right text-slate-900 dark:text-slate-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-300">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-slate-100">
                    <Badge variant="outline" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-slate-100">
                    <Select value={user.status} onValueChange={(value) => handleStatusChange(user.id, value)}>
                      <SelectTrigger className="w-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-slate-100">{user.department}</TableCell>
                  <TableCell className="text-slate-900 dark:text-slate-100">{user.lastLogin}</TableCell>
                  <TableCell className="text-slate-900 dark:text-slate-100">{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-purple-600">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-600">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <p className="text-sm text-gray-600">{currentUser.role}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(currentUser.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm text-gray-600">{currentUser.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm text-gray-600">{currentUser.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm text-gray-600">{currentUser.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">Role</Label>
                <Select value={currentUser.role} onValueChange={(value) => setCurrentUser(prev => prev ? { ...prev, role: value } : null)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right">Department</Label>
                <Input
                  id="edit-department"
                  value={currentUser.department}
                  onChange={(e) => setCurrentUser(prev => prev ? { ...prev, department: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select value={currentUser.status} onValueChange={(value) => setCurrentUser(prev => prev ? { ...prev, status: value as 'active' | 'pending' | 'suspended' | 'inactive' } : null)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveUserEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{currentUser?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllUsersPage;
