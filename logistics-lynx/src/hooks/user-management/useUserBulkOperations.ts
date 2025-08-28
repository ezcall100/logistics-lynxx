/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserBulkOperations = () => {
  const { toast } = useToast();

  const bulkDeleteUsers = async (userIds: string[]) => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      const deletePromises = profiles.map(profile => 
        supabase.auth.admin.deleteUser(profile.user_id)
      );

      await Promise.all(deletePromises);

      toast({
        title: 'Success',
        description: `${userIds.length} users have been deleted successfully`,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error bulk deleting users:', error);
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to delete users',
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  const bulkUpdateStatus = async (userIds: string[], status: 'active' | 'inactive' | 'pending') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status, updated_at: new Date().toISOString() })
        .in('id', userIds);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `${userIds.length} users status updated to ${status}`,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error bulk updating users:', error);
      toast({
        title: 'Error',
        description: errorMessage || 'Failed to update users',
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  return {
    bulkDeleteUsers,
    bulkUpdateStatus,
  };
};

export default useUserBulkOperations;