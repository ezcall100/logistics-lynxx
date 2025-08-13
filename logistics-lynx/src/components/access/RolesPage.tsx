// src/pages/settings/RolesPage.tsx
import React, { useMemo, useState, FormEvent } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

import { mockRoles } from '@/data/mockData';

type Role = {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive: boolean;
  isSystemRole?: boolean;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles as Role[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Add Role form state
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleActive, setNewRoleActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredRoles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((r) => r.name.toLowerCase().includes(q));
  }, [roles, searchTerm]);

  const totalRoles = roles.length;
  const activeRoles = useMemo(() => roles.filter((r) => r.isActive).length, [roles]);
  const systemRoles = useMemo(() => roles.filter((r) => r.isSystemRole).length, [roles]);

  function resetForm() {
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRoleActive(true);
    setFormError(null);
  }

  function handleAddRoleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = newRoleName.trim();

    if (!name) {
      setFormError('Role name is required.');
      return;
    }
    if (roles.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
      setFormError('A role with this name already exists.');
      return;
    }

    const newRole: Role = {
      id: crypto.randomUUID(),
      name,
      description: newRoleDesc.trim(),
      permissions: [],
      isActive: newRoleActive,
      isSystemRole: false,
    };

    setRoles((prev) => [newRole, ...prev]);
    setIsAddDialogOpen(false);
    resetForm();
  }

  // Stubs for future actions
  function handleView(role: Role) {
    // todo: navigate to role detail or open side panel
    console.log('view', role.id);
  }
  function handleEdit(role: Role) {
    // todo: open edit dialog
    console.log('edit', role.id);
  }
  function handleDelete(role: Role) {
    // Optional: confirm dialog
    setRoles((prev) => prev.filter((r) => r.id !== role.id));
  }

  return (
    <div className="space-y-6">
      {/* Header + Add Role */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles &amp; Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={(o) => { setIsAddDialogOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleAddRoleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Operations Coordinator"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-desc">Description</Label>
                <Textarea
                  id="role-desc"
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Manages daily operations and coordinates shipments"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch id="role-active" checked={newRoleActive} onCheckedChange={setNewRoleActive} />
                <Label htmlFor="role-active">Active</Label>
              </div>

              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Role</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          aria-label="Search roles"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRoles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRoles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">System Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemRoles}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[160px]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRoles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No roles found{searchTerm ? ` for “${searchTerm}”` : ''}.
                  </TableCell>
                </TableRow>
              )}

              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {role.name}
                      {role.isSystemRole && <Badge variant="secondary">System</Badge>}
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[460px] truncate" title={role.description}>
                    {role.description || '—'}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{role.permissions.length} permissions</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant={role.isActive ? 'default' : 'secondary'}>
                      {role.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleView(role)} aria-label="View role">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(role)} aria-label="Edit role">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!role.isSystemRole && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(role)}
                          aria-label="Delete role"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
