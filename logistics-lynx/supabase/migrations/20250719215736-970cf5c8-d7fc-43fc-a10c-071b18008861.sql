-- Fix the final remaining policies - Part 4 (Final batch)
-- Complete all remaining tables with unoptimized auth calls

-- Terminals
DROP POLICY IF EXISTS "Authorized users can view terminals" ON public.terminals;
CREATE POLICY "Authorized users can view terminals" ON public.terminals
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'driver'::app_role)
  )
);

-- Tickets
DROP POLICY IF EXISTS "Authorized users can manage tickets" ON public.tickets;
CREATE POLICY "Authorized users can manage tickets" ON public.tickets
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'shipper_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Tracking events
DROP POLICY IF EXISTS "Authorized users can view tracking events" ON public.tracking_events;
CREATE POLICY "Authorized users can view tracking events" ON public.tracking_events
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

-- Units
DROP POLICY IF EXISTS "Admins can manage units" ON public.units;
DROP POLICY IF EXISTS "Drivers can view assigned units" ON public.units;

CREATE POLICY "Admins can manage units" ON public.units
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

CREATE POLICY "Drivers can view assigned units" ON public.units
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND 
  has_role((SELECT auth.uid()), 'driver'::app_role) AND 
  (current_driver_id = (SELECT auth.uid()))
);

-- User analytics - fix the remaining unoptimized policy
DROP POLICY IF EXISTS "Authenticated users can insert own analytics" ON public.user_analytics;
CREATE POLICY "Authenticated users can insert own analytics" ON public.user_analytics
FOR INSERT TO authenticated
WITH CHECK (
  public.is_authenticated_user() AND 
  ((user_id = (SELECT auth.uid())) OR (auth.role() = 'service_role'::text))
);

-- User sessions - fix the remaining unoptimized policies
DROP POLICY IF EXISTS "System can manage sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can view own sessions" ON public.user_sessions;

CREATE POLICY "System can manage sessions" ON public.user_sessions
FOR ALL TO authenticated
USING (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role))
WITH CHECK (public.is_authenticated_user() AND has_role((SELECT auth.uid()), 'super_admin'::app_role));

CREATE POLICY "Users can view own sessions" ON public.user_sessions
FOR SELECT TO authenticated
USING (
  public.is_authenticated_user() AND 
  ((user_id = (SELECT auth.uid())) OR has_role((SELECT auth.uid()), 'super_admin'::app_role))
);

-- Vehicles
DROP POLICY IF EXISTS "Admins can manage vehicles" ON public.vehicles;
CREATE POLICY "Admins can manage vehicles" ON public.vehicles
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'carrier_admin'::app_role)
  )
);

-- Vendors
DROP POLICY IF EXISTS "Authorized users can manage vendors" ON public.vendors;
CREATE POLICY "Authorized users can manage vendors" ON public.vendors
FOR ALL TO authenticated
USING (
  public.is_authenticated_user() AND (
    has_role((SELECT auth.uid()), 'super_admin'::app_role) OR
    has_role((SELECT auth.uid()), 'freight_broker_admin'::app_role)
  )
);