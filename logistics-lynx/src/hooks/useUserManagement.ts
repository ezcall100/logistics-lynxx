
import { useState, useCallback } from 'react';
import { useUserData } from './user-management/useUserData';
import { useUserOperations } from './user-management/useUserOperations';
import { useUserBulkOperations } from './user-management/useUserBulkOperations';
import type { UserFormData } from '@/components/settings/user-forms/UserFormSchema';
import type { UserStatus } from '@/types/user';

interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: UserStatus;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const useUserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const { users, loading, refetch } = useUserData();
  const { createUser: createUserOp, updateUser: updateUserOp, deleteUser: deleteUserOp } = useUserOperations();
  const { bulkDeleteUsers: bulkDeleteOp, bulkUpdateStatus: bulkUpdateStatusOp } = useUserBulkOperations();

  const createUser = useCallback(async (userData: UserFormData) => {
    // Ensure required fields are present and properly typed
    const createData: CreateUserData = {
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone,
      role: userData.role || 'carrier_driver',
      status: (userData.status as UserStatus) || 'active',
      company: userData.company,
      city: userData.city,
      state: userData.state,
      country: userData.country,
    };
    
    const result = await createUserOp(createData);
    if (result.success) {
      refetch();
    }
    return result;
  }, [createUserOp, refetch]);

  const updateUser = useCallback(async (userData: UserFormData & { id: string }) => {
    const result = await updateUserOp(userData);
    if (result.success) {
      refetch();
    }
    return result;
  }, [updateUserOp, refetch]);

  const deleteUser = useCallback(async (userId: string) => {
    const result = await deleteUserOp(userId);
    if (result.success) {
      refetch();
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
    return result;
  }, [deleteUserOp, refetch]);

  const bulkDeleteUsers = useCallback(async (userIds: string[]) => {
    const result = await bulkDeleteOp(userIds);
    if (result.success) {
      refetch();
      setSelectedUsers([]);
    }
    return result;
  }, [bulkDeleteOp, refetch]);

  const bulkUpdateStatus = useCallback(async (userIds: string[], status: 'active' | 'inactive' | 'pending') => {
    const result = await bulkUpdateStatusOp(userIds, status);
    if (result.success) {
      refetch();
      setSelectedUsers([]);
    }
    return result;
  }, [bulkUpdateStatusOp, refetch]);

  return {
    users,
    loading,
    selectedUsers,
    setSelectedUsers,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    bulkUpdateStatus,
  };
};
