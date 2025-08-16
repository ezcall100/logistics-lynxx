/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
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
import type { UserFormData } from './user-forms/UserFormSchema';

interface CreateUserResult {
  success: boolean;
  error?: string;
}

interface UserCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => Promise<CreateUserResult>;
}

export const UserCreateDialog = ({ open, onOpenChange, onSubmit }: UserCreateDialogProps) => {
  const { form, transformFormData } = useUserForm();

  const handleSubmit = async (data: UserFormData) => {
    const userData = transformFormData(data);
    const result = await onSubmit(userData);
    
    if (result.success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
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
                {form.formState.isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
