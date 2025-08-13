
-- Create CRM tables for the Autonomous AI Relationships system

-- Companies/Organizations table (enhanced for CRM)
CREATE TABLE IF NOT EXISTS public.crm_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT, -- 'startup', 'small', 'medium', 'large', 'enterprise'
  website TEXT,
  phone TEXT,
  email TEXT,
  address JSONB, -- {street, city, state, zip, country}
  social_media JSONB, -- {linkedin, twitter, facebook}
  annual_revenue DECIMAL,
  employee_count INTEGER,
  description TEXT,
  tags TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contacts table
CREATE TABLE public.crm_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  mobile TEXT,
  job_title TEXT,
  department TEXT,
  linkedin_url TEXT,
  photo_url TEXT,
  notes TEXT,
  tags TEXT[],
  contact_source TEXT, -- 'website', 'referral', 'cold_outreach', 'event', 'social_media'
  contact_status TEXT DEFAULT 'active', -- 'active', 'inactive', 'do_not_contact'
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Leads table
CREATE TABLE public.crm_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  lead_source TEXT, -- 'website', 'referral', 'advertisement', 'social_media', 'cold_call'
  lead_status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  lead_score INTEGER DEFAULT 0, -- 0-100 scoring system
  estimated_value DECIMAL,
  estimated_close_date DATE,
  assigned_to UUID REFERENCES auth.users(id),
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  next_action TEXT,
  next_action_date TIMESTAMP WITH TIME ZONE,
  converted_to_opportunity BOOLEAN DEFAULT false,
  opportunity_id UUID, -- Will reference opportunities table
  ai_insights JSONB, -- AI-generated insights and recommendations
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Opportunities table
CREATE TABLE public.crm_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  stage TEXT DEFAULT 'prospecting', -- 'prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  value DECIMAL NOT NULL,
  probability INTEGER DEFAULT 50, -- 0-100 percentage
  expected_close_date DATE,
  actual_close_date DATE,
  sales_cycle_days INTEGER,
  assigned_to UUID REFERENCES auth.users(id),
  products_services TEXT[],
  competitors TEXT[],
  next_steps TEXT,
  close_reason TEXT, -- For closed opportunities
  ai_predictions JSONB, -- AI-generated predictions and recommendations
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE public.crm_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.crm_opportunities(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  project_type TEXT, -- 'logistics', 'consulting', 'implementation', 'support'
  status TEXT DEFAULT 'planning', -- 'planning', 'in_progress', 'on_hold', 'completed', 'cancelled'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  start_date DATE,
  end_date DATE,
  budget DECIMAL,
  actual_cost DECIMAL,
  progress_percentage INTEGER DEFAULT 0,
  project_manager UUID REFERENCES auth.users(id),
  team_members UUID[],
  milestones JSONB, -- Array of milestone objects
  deliverables TEXT[],
  risks TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Calendar/Events table
CREATE TABLE public.crm_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'meeting', -- 'meeting', 'call', 'demo', 'follow_up', 'deadline', 'reminder'
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT false,
  location TEXT,
  meeting_link TEXT, -- For virtual meetings
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  opportunity_id UUID REFERENCES public.crm_opportunities(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.crm_projects(id) ON DELETE SET NULL,
  attendees UUID[], -- Array of user IDs
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'rescheduled'
  reminder_minutes INTEGER DEFAULT 15,
  recurrence_rule TEXT, -- RRULE for recurring events
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Email communications table
CREATE TABLE public.crm_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  opportunity_id UUID REFERENCES public.crm_opportunities(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.crm_projects(id) ON DELETE SET NULL,
  thread_id TEXT, -- For grouping email conversations
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  email_type TEXT DEFAULT 'outbound', -- 'inbound', 'outbound', 'automated'
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'delivered', 'opened', 'replied', 'bounced'
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB, -- Array of attachment metadata
  template_used TEXT,
  ai_generated BOOLEAN DEFAULT false,
  ai_sentiment TEXT, -- 'positive', 'neutral', 'negative'
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activities/Interactions table
CREATE TABLE public.crm_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.crm_companies(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  opportunity_id UUID REFERENCES public.crm_opportunities(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.crm_projects(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note', 'task', 'document'
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'completed', -- 'planned', 'completed', 'cancelled'
  duration_minutes INTEGER,
  outcome TEXT, -- 'positive', 'neutral', 'negative', 'no_answer'
  next_action TEXT,
  next_action_date TIMESTAMP WITH TIME ZONE,
  ai_insights JSONB, -- AI-generated insights from the activity
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key for lead to opportunity conversion
ALTER TABLE public.crm_leads 
ADD CONSTRAINT fk_leads_opportunity 
FOREIGN KEY (opportunity_id) REFERENCES public.crm_opportunities(id);

-- Create indexes for performance
CREATE INDEX idx_crm_companies_name ON public.crm_companies(name);
CREATE INDEX idx_crm_companies_industry ON public.crm_companies(industry);
CREATE INDEX idx_crm_companies_created_by ON public.crm_companies(created_by);

CREATE INDEX idx_crm_contacts_email ON public.crm_contacts(email);
CREATE INDEX idx_crm_contacts_company_id ON public.crm_contacts(company_id);
CREATE INDEX idx_crm_contacts_created_by ON public.crm_contacts(created_by);

CREATE INDEX idx_crm_leads_status ON public.crm_leads(lead_status);
CREATE INDEX idx_crm_leads_assigned_to ON public.crm_leads(assigned_to);
CREATE INDEX idx_crm_leads_company_id ON public.crm_leads(company_id);

CREATE INDEX idx_crm_opportunities_stage ON public.crm_opportunities(stage);
CREATE INDEX idx_crm_opportunities_assigned_to ON public.crm_opportunities(assigned_to);
CREATE INDEX idx_crm_opportunities_expected_close_date ON public.crm_opportunities(expected_close_date);

CREATE INDEX idx_crm_projects_status ON public.crm_projects(status);
CREATE INDEX idx_crm_projects_project_manager ON public.crm_projects(project_manager);
CREATE INDEX idx_crm_projects_company_id ON public.crm_projects(company_id);

CREATE INDEX idx_crm_calendar_start_time ON public.crm_calendar(start_time);
CREATE INDEX idx_crm_calendar_created_by ON public.crm_calendar(created_by);
CREATE INDEX idx_crm_calendar_contact_id ON public.crm_calendar(contact_id);

CREATE INDEX idx_crm_emails_contact_id ON public.crm_emails(contact_id);
CREATE INDEX idx_crm_emails_thread_id ON public.crm_emails(thread_id);
CREATE INDEX idx_crm_emails_status ON public.crm_emails(status);

CREATE INDEX idx_crm_activities_contact_id ON public.crm_activities(contact_id);
CREATE INDEX idx_crm_activities_activity_type ON public.crm_activities(activity_type);
CREATE INDEX idx_crm_activities_created_at ON public.crm_activities(created_at);

-- Enable Row Level Security
ALTER TABLE public.crm_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (users can access data they created or are assigned to)
CREATE POLICY "Users can manage their CRM companies" ON public.crm_companies
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Users can manage their CRM contacts" ON public.crm_contacts
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Users can manage their CRM leads" ON public.crm_leads
  FOR ALL USING (created_by = auth.uid() OR assigned_to = auth.uid());

CREATE POLICY "Users can manage their CRM opportunities" ON public.crm_opportunities
  FOR ALL USING (created_by = auth.uid() OR assigned_to = auth.uid());

CREATE POLICY "Users can manage their CRM projects" ON public.crm_projects
  FOR ALL USING (created_by = auth.uid() OR project_manager = auth.uid() OR auth.uid() = ANY(team_members));

CREATE POLICY "Users can manage their CRM calendar" ON public.crm_calendar
  FOR ALL USING (created_by = auth.uid() OR auth.uid() = ANY(attendees));

CREATE POLICY "Users can manage their CRM emails" ON public.crm_emails
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Users can manage their CRM activities" ON public.crm_activities
  FOR ALL USING (created_by = auth.uid());

-- Enable realtime for live updates
ALTER TABLE public.crm_companies REPLICA IDENTITY FULL;
ALTER TABLE public.crm_contacts REPLICA IDENTITY FULL;
ALTER TABLE public.crm_leads REPLICA IDENTITY FULL;
ALTER TABLE public.crm_opportunities REPLICA IDENTITY FULL;
ALTER TABLE public.crm_projects REPLICA IDENTITY FULL;
ALTER TABLE public.crm_calendar REPLICA IDENTITY FULL;
ALTER TABLE public.crm_emails REPLICA IDENTITY FULL;
ALTER TABLE public.crm_activities REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_companies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_opportunities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_calendar;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_emails;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_activities;

-- Insert sample data for testing
INSERT INTO public.crm_companies (name, industry, company_size, website, email, phone, description) VALUES
('TechLogistics Corp', 'Transportation & Logistics', 'medium', 'https://techlogistics.com', 'info@techlogistics.com', '+1-555-0123', 'Leading logistics technology company specializing in AI-driven supply chain optimization'),
('Global Freight Solutions', 'Freight & Shipping', 'large', 'https://globalfreight.com', 'contact@globalfreight.com', '+1-555-0456', 'International freight forwarding and logistics services'),
('StartupShip', 'E-commerce Logistics', 'startup', 'https://startupship.com', 'hello@startupship.com', '+1-555-0789', 'Innovative last-mile delivery solutions for e-commerce businesses');

INSERT INTO public.crm_contacts (company_id, first_name, last_name, email, phone, job_title, department) VALUES
((SELECT id FROM public.crm_companies WHERE name = 'TechLogistics Corp'), 'John', 'Smith', 'john.smith@techlogistics.com', '+1-555-1234', 'VP of Operations', 'Operations'),
((SELECT id FROM public.crm_companies WHERE name = 'Global Freight Solutions'), 'Sarah', 'Johnson', 'sarah.johnson@globalfreight.com', '+1-555-2345', 'Director of Technology', 'IT'),
((SELECT id FROM public.crm_companies WHERE name = 'StartupShip'), 'Mike', 'Chen', 'mike.chen@startupship.com', '+1-555-3456', 'Founder & CEO', 'Executive');

INSERT INTO public.crm_leads (contact_id, company_id, title, description, lead_source, lead_status, estimated_value, lead_score) VALUES
((SELECT id FROM public.crm_contacts WHERE email = 'john.smith@techlogistics.com'), (SELECT id FROM public.crm_companies WHERE name = 'TechLogistics Corp'), 'Route Optimization Software Implementation', 'Interested in implementing AI-powered route optimization for their fleet of 500+ vehicles', 'website', 'qualified', 250000, 85),
((SELECT id FROM public.crm_contacts WHERE email = 'sarah.johnson@globalfreight.com'), (SELECT id FROM public.crm_companies WHERE name = 'Global Freight Solutions'), 'International Tracking System Upgrade', 'Looking to upgrade their international shipment tracking capabilities', 'referral', 'proposal', 180000, 75),
((SELECT id FROM public.crm_contacts WHERE email = 'mike.chen@startupship.com'), (SELECT id FROM public.crm_companies WHERE name = 'StartupShip'), 'Last-Mile Delivery Platform', 'Need a comprehensive platform for managing last-mile deliveries', 'cold_outreach', 'contacted', 95000, 60);
