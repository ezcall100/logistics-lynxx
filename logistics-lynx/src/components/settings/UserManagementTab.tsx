/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { UserCreateDialog } from './UserCreateDialog';
import { UserEditDialog } from './UserEditDialog';
import { UserTableHeader } from './user-table/UserTableHeader';
import { UserTableRow } from './user-table/UserTableRow';
import { UserStatsCards } from './user-management/UserStatsCards';
import { UserSearchAndFilters } from './user-management/UserSearchAndFilters';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useUserActions } from '@/hooks/user-management/useUserActions';
import type { User } from '@/types/user';

const UserManagementTab = () => {
  const {
    users,
    loading,
    selectedUsers,
    setSelectedUsers,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    bulkUpdateStatus,
  } = useUserManagement();

  const {
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    isEditDialogOpen,
    editingUser,
    openEditDialog,
    closeEditDialog,
    userToDelete,
    openDeleteDialog,
    closeDeleteDialog,
  } = useUserActions();

  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    await deleteUser(userToDelete.id);
    closeDeleteDialog();
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkDelete = async () => {
    await bulkDeleteUsers(selectedUsers);
  };

  const handleBulkStatusUpdate = async (status: 'active' | 'inactive' | 'pending') => {
    await bulkUpdateStatus(selectedUsers, status);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <UserStatsCards users={users} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management & Access Control</CardTitle>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UserSearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCount={selectedUsers.length}
            onBulkDelete={handleBulkDelete}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            disabled={loading}
          />

          <div className="rounded-md border">
            <Table>
              <UserTableHeader
                selectedCount={selectedUsers.length}
                totalCount={filteredUsers.length}
                onSelectAll={handleSelectAll}
              />
              <TableBody>
                {loading ? (
                  <tr>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading users...
                    </TableCell>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <TableCell colSpan={7} className="text-center py-8">
                      No users found
                    </TableCell>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      isSelected={selectedUsers.includes(user.id)}
                      onSelect={(checked) => handleSelectUser(user.id, checked)}
                      onEdit={() => openEditDialog(user)}
                      onDelete={() => openDeleteDialog(user)}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UserCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={closeCreateDialog}
        onSubmit={createUser}
      />

      <UserEditDialog
        open={isEditDialogOpen}
        onOpenChange={closeEditDialog}
        user={editingUser}
        onSubmit={updateUser}
      />

      <AlertDialog open={!!userToDelete} onOpenChange={closeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {userToDelete?.name} and all associated data. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagementTab;
