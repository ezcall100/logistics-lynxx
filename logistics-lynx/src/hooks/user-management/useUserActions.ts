/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import type { User } from '@/types/user';

export const useUserActions = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const openCreateDialog = () => setIsCreateDialogOpen(true);
  const closeCreateDialog = () => setIsCreateDialogOpen(false);

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const openDeleteDialog = (user: User) => setUserToDelete(user);
  const closeDeleteDialog = () => setUserToDelete(null);

  return {
    // Create dialog
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
    
    // Edit dialog
    isEditDialogOpen,
    editingUser,
    openEditDialog,
    closeEditDialog,
    
    // Delete dialog
    userToDelete,
    openDeleteDialog,
    closeDeleteDialog,
  };
};

export default useUserActions;