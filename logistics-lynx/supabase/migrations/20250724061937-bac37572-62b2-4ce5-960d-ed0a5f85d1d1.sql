-- CRM Database Schema with Role-Based Access
-- Create comprehensive CRM tables with proper RLS policies for different admin roles

-- First, ensure we have the app_role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM ('super_admin', 'shipper_admin', 'broker_admin', 'carrier_admin', 'driver', 'owner_operator');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CRM Companies Table (Enhanced for all admin roles)
CREATE TABLE IF NOT EXISTS public.crm_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address JSONB,
  social_media JSONB,
  annual_revenue NUMERIC,
  employee_count INTEGER,
  description TEXT,
  tags TEXT[],
  company_type TEXT CHECK (company_type IN ('shipper', 'carrier', 'broker', 'vendor', 'customer')),
  created_by UUID REFERENCES auth.users(id),
  assigned_to_role app_role,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Contacts Table (Role-based access)
CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  job_title TEXT,
  department TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  linkedin_url TEXT,
  photo_url TEXT,
  notes TEXT,
  tags TEXT[],
  contact_status TEXT DEFAULT 'active',
  contact_source TEXT,
  company_id UUID REFERENCES public.crm_companies(id),
  created_by UUID REFERENCES auth.users(id),
  assigned_to_role app_role,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Leads Table (Role-based tracking)
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  lead_status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  lead_source TEXT,
  estimated_value NUMERIC,
  estimated_close_date DATE,
  lead_score INTEGER DEFAULT 0,
  description TEXT,
  next_action TEXT,
  next_action_date TIMESTAMP WITH TIME ZONE,
  converted_to_opportunity BOOLEAN DEFAULT false,
  opportunity_id UUID,
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  assigned_to UUID REFERENCES auth.users(id),
  assigned_to_role app_role,
  ai_insights JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Opportunities Table (Sales pipeline by role)
CREATE TABLE IF NOT EXISTS public.crm_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  stage TEXT DEFAULT 'prospecting',
  value NUMERIC NOT NULL,
  probability INTEGER DEFAULT 50,
  expected_close_date DATE,
  actual_close_date DATE,
  description TEXT,
  next_steps TEXT,
  close_reason TEXT,
  products_services TEXT[],
  competitors TEXT[],
  sales_cycle_days INTEGER,
  lead_id UUID REFERENCES public.crm_leads(id),
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  assigned_to UUID REFERENCES auth.users(id),
  assigned_to_role app_role,
  ai_predictions JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Projects Table (Role-based project management)
CREATE TABLE IF NOT EXISTS public.crm_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  project_type TEXT,
  status TEXT DEFAULT 'planning',
  priority TEXT DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  budget NUMERIC,
  progress_percentage INTEGER DEFAULT 0,
  deliverables TEXT[],
  milestones JSONB,
  risks TEXT[],
  team_members UUID[],
  project_manager UUID REFERENCES auth.users(id),
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  opportunity_id UUID REFERENCES public.crm_opportunities(id),
  assigned_to_role app_role,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Activities Table (Track all CRM activities by role)
CREATE TABLE IF NOT EXISTS public.crm_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'completed',
  outcome TEXT,
  next_action TEXT,
  next_action_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  lead_id UUID REFERENCES public.crm_leads(id),
  opportunity_id UUID REFERENCES public.crm_opportunities(id),
  project_id UUID REFERENCES public.crm_projects(id),
  assigned_to_role app_role,
  ai_insights JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Calendar Table (Role-based calendar management)
CREATE TABLE IF NOT EXISTS public.crm_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT false,
  event_type TEXT DEFAULT 'meeting',
  status TEXT DEFAULT 'scheduled',
  location TEXT,
  meeting_link TEXT,
  reminder_minutes INTEGER DEFAULT 15,
  attendees UUID[],
  recurrence_rule TEXT,
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  lead_id UUID REFERENCES public.crm_leads(id),
  opportunity_id UUID REFERENCES public.crm_opportunities(id),
  project_id UUID REFERENCES public.crm_projects(id),
  assigned_to_role app_role,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- CRM Emails Table (Email communications by role)
CREATE TABLE IF NOT EXISTS public.crm_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  email_type TEXT DEFAULT 'outbound',
  status TEXT DEFAULT 'draft',
  thread_id TEXT,
  template_used TEXT,
  ai_generated BOOLEAN DEFAULT false,
  ai_sentiment TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB,
  contact_id UUID REFERENCES public.crm_contacts(id),
  company_id UUID REFERENCES public.crm_companies(id),
  lead_id UUID REFERENCES public.crm_leads(id),
  opportunity_id UUID REFERENCES public.crm_opportunities(id),
  project_id UUID REFERENCES public.crm_projects(id),
  assigned_to_role app_role,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all CRM tables
ALTER TABLE public.crm_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_emails ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Super Admin (Full Access)
CREATE POLICY "Super admins can manage all CRM companies" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM contacts" ON public.crm_contacts
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM leads" ON public.crm_leads
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM opportunities" ON public.crm_opportunities
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM projects" ON public.crm_projects
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM activities" ON public.crm_activities
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM calendar" ON public.crm_calendar
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can manage all CRM emails" ON public.crm_emails
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Role-specific access policies for other admin types
-- Shipper Admin - Can access shipper-related CRM data
CREATE POLICY "Shipper admins can access shipper CRM data" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'shipper_admin'
  ) AND (assigned_to_role = 'shipper_admin' OR company_type = 'shipper')
);

-- Broker Admin - Can access broker-related CRM data  
CREATE POLICY "Broker admins can access broker CRM data" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'broker_admin'
  ) AND (assigned_to_role = 'broker_admin' OR company_type = 'broker')
);

-- Carrier Admin - Can access carrier-related CRM data
CREATE POLICY "Carrier admins can access carrier CRM data" ON public.crm_companies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'carrier_admin'
  ) AND (assigned_to_role = 'carrier_admin' OR company_type = 'carrier')
);

-- Apply similar role-based policies to other CRM tables
-- (This pattern applies to contacts, leads, opportunities, etc.)

-- Create updated_at triggers for all CRM tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_crm_companies_updated_at BEFORE UPDATE ON public.crm_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON public.crm_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON public.crm_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_opportunities_updated_at BEFORE UPDATE ON public.crm_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_projects_updated_at BEFORE UPDATE ON public.crm_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_activities_updated_at BEFORE UPDATE ON public.crm_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_calendar_updated_at BEFORE UPDATE ON public.crm_calendar FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_emails_updated_at BEFORE UPDATE ON public.crm_emails FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();