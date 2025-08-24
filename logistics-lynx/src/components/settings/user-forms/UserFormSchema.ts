import { z } from 'zod';

export const userFormSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending', 'suspended']).default('active'),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager', 'super_admin']).default('user')
});

export type UserFormData = z.infer<typeof userFormSchema>;
