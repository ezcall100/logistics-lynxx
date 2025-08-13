
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, UserFormData } from '@/components/settings/user-forms/UserFormSchema';
import type { User } from '@/types/user';

export const useUserForm = (user?: User | null) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'carrier_driver',
      status: user?.status || 'active',
      company: user?.company || '',
      city: user?.location?.city || '',
      state: user?.location?.state || '',
      country: user?.location?.country || '',
    },
  });

  const transformFormData = (data: UserFormData, userId?: string) => {
    return {
      ...(userId && { id: userId }),
      ...data,
      location: data.city || data.state || data.country ? {
        city: data.city,
        state: data.state,
        country: data.country,
      } : undefined,
    };
  };

  return {
    form,
    transformFormData,
  };
};
