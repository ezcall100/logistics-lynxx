-- 01_roles_seed.sql (idempotent)
-- If you use a roles lookup table, keep it; otherwise this is a no-op.
create table if not exists public.roles (
  key text primary key,
  description text
);

insert into public.roles(key, description) values
  ('super_admin','Full platform control'),
  ('owner','Tenant owner'),
  ('admin','Tenant admin'),
  ('manager','Ops manager'),
  ('ops','Operations'),
  ('pricing','Pricing & rates'),
  ('finance_admin','Finance & AP/AR'),
  ('broker_admin','Broker admin'),
  ('broker_user','Broker user'),
  ('shipper_admin','Shipper admin'),
  ('shipper_user','Shipper user'),
  ('carrier_admin','Carrier admin'),
  ('carrier_user','Carrier user'),
  ('driver','Mobile driver'),
  ('owner_operator','Independent operator'),
  ('analyst','Analytics / BI'),
  ('sre','Site reliability')
on conflict (key) do nothing;
