-- 03_portal_role_matrix.sql
-- Portal → Role matrix (concise)
-- This defines which roles can access which portals

-- Super Admin: super_admin
-- Admin / TMS Admin / Onboarding: owner, admin, manager
-- Broker: broker_admin, broker_user, owner, admin
-- Shipper: shipper_admin, shipper_user, owner, admin
-- Carrier: carrier_admin, carrier_user, owner, admin
-- Driver: driver, carrier_admin, owner, admin
-- Owner Operator: owner_operator, owner, admin
-- Factoring / Financials: finance_admin, owner, admin
-- Load Board: broker_admin, carrier_user, owner, admin
-- CRM: sales, owner, admin (if sales not present, map to manager)
-- EDI: edi_admin, owner, admin
-- Marketplace: owner, admin, manager
-- Analytics: owner, admin, manager, analyst
-- Autonomous: owner, admin, sre
-- Workers: ops, owner, admin
-- Rates: pricing, broker_admin, owner, admin
-- Directory: owner, admin, manager, ops

-- Create portal access matrix table
create table if not exists public.portal_role_matrix (
  portal_key text not null,
  role_key text not null,
  created_at timestamp with time zone default now(),
  primary key (portal_key, role_key)
);

-- Insert portal role mappings
insert into public.portal_role_matrix(portal_key, role_key) values
  -- Super Admin Portal
  ('superAdmin', 'super_admin'),
  
  -- Admin Portals
  ('admin', 'owner'), ('admin', 'admin'), ('admin', 'manager'),
  ('tmsAdmin', 'owner'), ('tmsAdmin', 'admin'), ('tmsAdmin', 'manager'),
  ('onboarding', 'owner'), ('onboarding', 'admin'), ('onboarding', 'manager'),
  
  -- Broker Portal
  ('broker', 'broker_admin'), ('broker', 'broker_user'), ('broker', 'owner'), ('broker', 'admin'),
  
  -- Shipper Portal
  ('shipper', 'shipper_admin'), ('shipper', 'shipper_user'), ('shipper', 'owner'), ('shipper', 'admin'),
  
  -- Carrier Portal
  ('carrier', 'carrier_admin'), ('carrier', 'carrier_user'), ('carrier', 'owner'), ('carrier', 'admin'),
  
  -- Driver Portal
  ('driver', 'driver'), ('driver', 'carrier_admin'), ('driver', 'owner'), ('driver', 'admin'),
  
  -- Owner Operator Portal
  ('ownerOperator', 'owner_operator'), ('ownerOperator', 'owner'), ('ownerOperator', 'admin'),
  
  -- Factoring Portal
  ('factoring', 'finance_admin'), ('factoring', 'owner'), ('factoring', 'admin'),
  
  -- Load Board Portal
  ('loadBoard', 'broker_admin'), ('loadBoard', 'carrier_user'), ('loadBoard', 'owner'), ('loadBoard', 'admin'),
  
  -- CRM Portal
  ('crm', 'manager'), ('crm', 'owner'), ('crm', 'admin'),
  
  -- Financials Portal
  ('financials', 'finance_admin'), ('financials', 'owner'), ('financials', 'admin'),
  
  -- EDI Portal
  ('edi', 'owner'), ('edi', 'admin'),
  
  -- Marketplace Portal
  ('marketplace', 'owner'), ('marketplace', 'admin'), ('marketplace', 'manager'),
  
  -- Analytics Portal
  ('analytics', 'owner'), ('analytics', 'admin'), ('analytics', 'manager'), ('analytics', 'analyst'),
  
  -- Autonomous Portal
  ('autonomous', 'owner'), ('autonomous', 'admin'), ('autonomous', 'sre'),
  
  -- Workers Portal
  ('workers', 'ops'), ('workers', 'owner'), ('workers', 'admin'),
  
  -- Rates Portal
  ('rates', 'pricing'), ('rates', 'broker_admin'), ('rates', 'owner'), ('rates', 'admin'),
  
  -- Directory Portal
  ('directory', 'owner'), ('directory', 'admin'), ('directory', 'manager'), ('directory', 'ops')
on conflict (portal_key, role_key) do nothing;
