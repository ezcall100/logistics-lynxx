/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UserBasicFields, UserContactFields, UserRoleFields, UserLocationFields } from './user-forms/UserFormFields';
import { useUserForm } from '@/hooks/user-management/useUserForm';
import type { User } from '@/types/user';
import type { UserFormData } from './user-forms/UserFormSchema';

interface UpdateUserResult {
  success: boolean;
  error?: string;
}

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSubmit: (data: UserFormData & { id: string }) => Promise<UpdateUserResult>;
}

export const UserEditDialog = ({ open, onOpenChange, user, onSubmit }: UserEditDialogProps) => {
  const { form, transformFormData } = useUserForm(user);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        company: user.company || '',
        city: user.location?.city || '',
        state: user.location?.state || '',
        country: user.location?.country || '',
      });
    }
  }, [user, form]);

  const handleSubmit = async (data: UserFormData) => {
    if (!user) return;

    const userData = transformFormData(data, user.id);
    const result = await onSubmit(userData);
    
    if (result.success) {
      onOpenChange(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User: {user.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <UserBasicFields form={form} />
            <UserContactFields form={form} />
            <UserRoleFields form={form} />
            <UserLocationFields form={form} />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Updating...' : 'Update User'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
