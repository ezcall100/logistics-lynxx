-- Fix remaining public role policies and optimize auth calls - Part 3 (Final)
-- Complete the remaining tables with public roles

-- Locations
DROP POLICY IF EXISTS "Authorized users can view locations" ON public.locations;
CREATE POLICY "Authorized users can view locations" ON public.locations
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

-- Marketplace services
DROP POLICY IF EXISTS "Admins can manage marketplace services" ON public.marketplace_services;
CREATE POLICY "Admins can manage marketplace services" ON public.marketplace_services
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

-- Payments
DROP POLICY IF EXISTS "Authorized users can manage payments" ON public.payments;
CREATE POLICY "Authorized users can manage payments" ON public.payments
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

-- Payroll
DROP POLICY IF EXISTS "Admins can manage payroll" ON public.payroll;
DROP POLICY IF EXISTS "Employees can view own payroll" ON public.payroll;

CREATE POLICY "Admins can manage payroll" ON public.payroll
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

CREATE POLICY "Employees can view own payroll" ON public.payroll
FOR SELECT TO authenticated
USING (public.is_authenticated_user() AND (employee_id = (SELECT auth.uid())));

-- Quotes
DROP POLICY IF EXISTS "Authorized users can manage quotes" ON public.quotes;
CREATE POLICY "Authorized users can manage quotes" ON public.quotes
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

-- Shipment documents
DROP POLICY IF EXISTS "Authorized users can insert shipment documents" ON public.shipment_documents;
DROP POLICY IF EXISTS "Authorized users can view shipment documents" ON public.shipment_documents;

CREATE POLICY "Authorized users can insert shipment documents" ON public.shipment_documents
FOR INSERT TO authenticated
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);

CREATE POLICY "Authorized users can view shipment documents" ON public.shipment_documents
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role)
  )
);

-- Shipment status history
DROP POLICY IF EXISTS "Authorized users can insert shipment status history" ON public.shipment_status_history;
DROP POLICY IF EXISTS "Authorized users can view shipment status history" ON public.shipment_status_history;

CREATE POLICY "Authorized users can insert shipment status history" ON public.shipment_status_history
FOR INSERT TO authenticated
WITH CHECK (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

CREATE POLICY "Authorized users can view shipment status history" ON public.shipment_status_history
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

-- Shipments
DROP POLICY IF EXISTS "Authorized users can manage shipments" ON public.shipments;
CREATE POLICY "Authorized users can manage shipments" ON public.shipments
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);