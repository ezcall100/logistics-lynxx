import React, { useState } from 'react';
import {
  ResponsiveCard,
  EnhancedButton,
  ResponsiveTable,
  ResponsiveTableHeader,
  ResponsiveTableRow,
  ResponsiveTableCell,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Input,
  Alert,
  AlertTitle,
  AlertDescription
} from '../../../components/ui';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator', status: 'inactive', lastLogin: '2024-01-10' },
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active',
      lastLogin: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'user' });
    setIsAddUserOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">👥 User Management</h1>
        <EnhancedButton onClick={() => setIsAddUserOpen(true)}>
          ➕ Add User
        </EnhancedButton>
      </div>

      <ResponsiveCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Users</h2>
          <ResponsiveTable>
            <ResponsiveTableHeader>
              <ResponsiveTableRow>
                <ResponsiveTableCell>Name</ResponsiveTableCell>
                <ResponsiveTableCell>Email</ResponsiveTableCell>
                <ResponsiveTableCell>Role</ResponsiveTableCell>
                <ResponsiveTableCell>Status</ResponsiveTableCell>
                <ResponsiveTableCell>Last Login</ResponsiveTableCell>
                <ResponsiveTableCell>Actions</ResponsiveTableCell>
              </ResponsiveTableRow>
            </ResponsiveTableHeader>
            <tbody>
              {users.map((user) => (
                <ResponsiveTableRow key={user.id}>
                  <ResponsiveTableCell>{user.name}</ResponsiveTableCell>
                  <ResponsiveTableCell>{user.email}</ResponsiveTableCell>
                  <ResponsiveTableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </ResponsiveTableCell>
                  <ResponsiveTableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </ResponsiveTableCell>
                  <ResponsiveTableCell>{user.lastLogin}</ResponsiveTableCell>
                  <ResponsiveTableCell>
                    <div className="flex gap-2">
                      <EnhancedButton size="sm" variant="outline">Edit</EnhancedButton>
                      <EnhancedButton size="sm" variant="danger">Delete</EnhancedButton>
                    </div>
                  </ResponsiveTableCell>
                </ResponsiveTableRow>
              ))}
            </tbody>
          </ResponsiveTable>
        </div>
      </ResponsiveCard>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <EnhancedButton variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </EnhancedButton>
            <EnhancedButton onClick={handleAddUser}>
              Add User
            </EnhancedButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
