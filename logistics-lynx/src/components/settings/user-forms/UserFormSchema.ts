
import * as z from 'zod';

export const userFormSchema = z.record(z.string(), z.unknown()).and(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['super_admin', 'shipper_admin', 'freight_broker_admin', 'carrier_admin', 'carrier_driver', 'owner_operator']),
  status: z.enum(['active', 'inactive', 'pending']),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;
