/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/settings/UsersPage.tsx
import React, { useMemo, useState } from 'react';
import { Plus, Search, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { mockUsers } from '@/data/mockData';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;         // e.g., "Admin", "Dispatcher"
  department?: string;  // e.g., "Operations"
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string | number | Date | null; // ISO/date-like
};

const df = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

function initials(first = '', last = '') {
  const f = first.trim()[0]?.toUpperCase() ?? '';
  const l = last.trim()[0]?.toUpperCase() ?? '';
  return (f + l) || 'U';
}

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers as User[]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.firstName, u.lastName, u.email]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [users, searchTerm]);

  // Simple stats (memoized)
  const totalUsers = users.length;
  const activeUsers = useMemo(() => users.filter((u) => u.status === 'active').length, [users]);
  const adminUsers = useMemo(() => users.filter((u) => u.role?.toLowerCase().includes('admin')).length, [users]);
  const recentLogins = useMemo(() => users.filter((u) => !!u.lastLogin).length, [users]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their access</p>
        </div>
        <Button onClick={() => console.log('Add user')}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users by name or email…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          aria-label="Search users"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Logins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentLogins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>Users Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users found{searchTerm ? ` for “${searchTerm}”` : ''}.
                  </TableCell>
                </TableRow>
              )}

              {filteredUsers.map((user) => {
                const lastLogin =
                  user.lastLogin ? df.format(new Date(user.lastLogin)) : 'Never';

                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {initials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1 font-medium">
                            <UserIcon className="h-4 w-4" />
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.phone || '—'}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="break-all">{user.email}</TableCell>

                    <TableCell>
                      <Badge variant="outline">{user.role || '—'}</Badge>
                    </TableCell>

                    <TableCell>{user.department || '—'}</TableCell>

                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm">{lastLogin}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
