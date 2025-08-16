/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types/user';

interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  company?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}

export const useUserOperations = () => {
  const { toast } = useToast();

  const createUser = async (userData: CreateUserData) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: 'TempPassword123!',
        email_confirm: true,
        user_metadata: {
          name: userData.name,
        },
      });

      if (authError) throw authError;

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          status: userData.status,
          company: userData.company,
          location: userData.location,
          login_id: userData.email,
        })
        .eq('user_id', authData.user.id);

      if (profileError) throw profileError;

      toast({
        title: 'Success',
        description: `User ${userData.name} has been created successfully`,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to create user',
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  const updateUser = async (userData: UpdateUserData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          status: userData.status,
          company: userData.company,
          location: userData.location,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userData.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'User has been updated successfully',
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to update user',
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, name')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.admin.deleteUser(profile.user_id);

      if (authError) throw authError;

      toast({
        title: 'Success',
        description: `User ${profile.name} has been deleted successfully`,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to delete user',
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};
