-- Demo Users Setup Script for TransBot AI
-- Run this in Supabase SQL Editor

-- Create demo users with transbotai.com domain
-- Note: In production, you would use Supabase Auth API to create users
-- This is for demonstration purposes

-- Insert demo users into auth.users (if using Supabase Auth)
-- You may need to create these users through the Supabase Dashboard or Auth API

-- Update user metadata for role assignment
-- This should be done after users are created through Supabase Auth

-- Example: Update user metadata for role assignment
-- (Run these after creating users through Supabase Auth API)

-- Super Admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"super_admin"'
) 
WHERE email = 'admin@transbotai.com';

-- Carrier Admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"carrier_admin"'
) 
WHERE email = 'carrier@transbotai.com';

-- Broker Admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"freight_broker_admin"'
) 
WHERE email = 'broker@transbotai.com';

-- Shipper Admin
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"shipper_admin"'
) 
WHERE email = 'shipper@transbotai.com';

-- Driver
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"carrier_driver"'
) 
WHERE email = 'driver@transbotai.com';

-- Owner Operator
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"owner_operator"'
) 
WHERE email = 'owner@transbotai.com';

-- Create RLS policies for role-based access
-- Carrier Portal Access
CREATE POLICY "carrier_portal_access" ON public.carrier_data
FOR ALL USING (
  auth.jwt() ->> 'role' IN ('carrier_admin', 'super_admin')
);

-- Broker Portal Access
CREATE POLICY "broker_portal_access" ON public.broker_data
FOR ALL USING (
  auth.jwt() ->> 'role' IN ('freight_broker_admin', 'super_admin')
);

-- Shipper Portal Access
CREATE POLICY "shipper_portal_access" ON public.shipper_data
FOR ALL USING (
  auth.jwt() ->> 'role' IN ('shipper_admin', 'super_admin')
);

-- Driver Portal Access
CREATE POLICY "driver_portal_access" ON public.driver_data
FOR ALL USING (
  auth.jwt() ->> 'role' IN ('carrier_driver', 'super_admin')
);

-- Owner Operator Portal Access
CREATE POLICY "owner_operator_portal_access" ON public.owner_operator_data
FOR ALL USING (
  auth.jwt() ->> 'role' IN ('owner_operator', 'super_admin')
);

-- Demo user credentials for testing:
-- admin@transbotai.com / demo-password (Super Admin)
-- carrier@transbotai.com / demo-password (Carrier Admin)
-- broker@transbotai.com / demo-password (Broker Admin)
-- shipper@transbotai.com / demo-password (Shipper Admin)
-- driver@transbotai.com / demo-password (Driver)
-- owner@transbotai.com / demo-password (Owner Operator)
