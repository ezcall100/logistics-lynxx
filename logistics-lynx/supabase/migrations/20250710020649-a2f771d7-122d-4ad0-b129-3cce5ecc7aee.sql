-- Comprehensive security fixes

-- 1. Create proper role system
CREATE TYPE public.app_role AS ENUM (
    'super_admin',
    'carrier_admin', 
    'freight_broker_admin',
    'shipper_admin',
    'driver',
    'owner_operator'
);

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- 5. Fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 6. Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- 7. Update all tables to require authentication and proper role-based access

-- Agent tables
DROP POLICY IF EXISTS "Authenticated users can manage agent health checks" ON public.agent_health_checks;
CREATE POLICY "Admins can manage agent health checks" ON public.agent_health_checks
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Allow insert access to agent memory" ON public.agent_memory;
DROP POLICY IF EXISTS "Allow read access to agent memory" ON public.agent_memory;
CREATE POLICY "System can manage agent memory" ON public.agent_memory
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can manage agent status logs" ON public.agent_status_logs;
CREATE POLICY "Admins can manage agent status logs" ON public.agent_status_logs
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- AI tables
DROP POLICY IF EXISTS "Authenticated users can manage AI confidence logs" ON public.ai_confidence_logs;
CREATE POLICY "Admins can manage AI confidence logs" ON public.ai_confidence_logs
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Authenticated users can manage AI decisions" ON public.ai_decisions;
CREATE POLICY "Admins can manage AI decisions" ON public.ai_decisions
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Autonomous agent configs
DROP POLICY IF EXISTS "Allow insert access to agent configs" ON public.autonomous_agent_configs;
DROP POLICY IF EXISTS "Allow read access to agent configs" ON public.autonomous_agent_configs;
DROP POLICY IF EXISTS "Allow update access to agent configs" ON public.autonomous_agent_configs;
CREATE POLICY "Admins can manage agent configs" ON public.autonomous_agent_configs
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Companies - accessible by relevant admin roles
DROP POLICY IF EXISTS "Authenticated users can manage companies" ON public.companies;
CREATE POLICY "Admins can manage companies" ON public.companies
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin') OR 
  public.has_role(auth.uid(), 'freight_broker_admin') OR 
  public.has_role(auth.uid(), 'shipper_admin')
);

-- Drivers - accessible by relevant admin roles
DROP POLICY IF EXISTS "Authenticated users can manage drivers" ON public.drivers;
CREATE POLICY "Admins and drivers can manage drivers" ON public.drivers
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin') OR 
  public.has_role(auth.uid(), 'driver')
);

-- Vehicles - accessible by relevant admin roles
DROP POLICY IF EXISTS "Authenticated users can manage vehicles" ON public.vehicles;
CREATE POLICY "Admins can manage vehicles" ON public.vehicles
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin')
);

-- Shipments - accessible by relevant roles
DROP POLICY IF EXISTS "Authenticated users can manage shipments" ON public.shipments;
CREATE POLICY "Authorized users can manage shipments" ON public.shipments
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin') OR 
  public.has_role(auth.uid(), 'freight_broker_admin') OR 
  public.has_role(auth.uid(), 'shipper_admin') OR
  public.has_role(auth.uid(), 'driver')
);

-- Routes - accessible by relevant roles
DROP POLICY IF EXISTS "Authenticated users can manage routes" ON public.routes;
CREATE POLICY "Authorized users can manage routes" ON public.routes
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin') OR 
  public.has_role(auth.uid(), 'driver')
);

-- Tracking events
DROP POLICY IF EXISTS "Authenticated users can manage tracking events" ON public.tracking_events;
CREATE POLICY "Authorized users can manage tracking events" ON public.tracking_events
FOR ALL TO authenticated
USING (
  public.has_role(auth.uid(), 'super_admin') OR 
  public.has_role(auth.uid(), 'carrier_admin') OR 
  public.has_role(auth.uid(), 'freight_broker_admin') OR 
  public.has_role(auth.uid(), 'shipper_admin') OR
  public.has_role(auth.uid(), 'driver')
);

-- Task completions
DROP POLICY IF EXISTS "Authenticated users can manage task completions" ON public.task_completions;
CREATE POLICY "Admins can manage task completions" ON public.task_completions
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Update profiles table to work with new role system
DROP POLICY IF EXISTS "Super admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all profiles" ON public.profiles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- 8. Create trigger for updating user_roles timestamp
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Insert default super admin role for existing users (optional)
-- This can be customized based on your needs
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'
FROM auth.users
WHERE email LIKE '%admin%'
ON CONFLICT (user_id, role) DO NOTHING;