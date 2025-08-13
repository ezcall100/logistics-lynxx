
export interface CRMCompany {
  id: string;
  name: string;
  industry?: string;
  company_size?: string; // Changed from literal union to string for flexibility
  website?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  social_media?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  annual_revenue?: number;
  employee_count?: number;
  description?: string;
  tags?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMContact {
  id: string;
  company_id?: string;
  company?: CRMCompany;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  job_title?: string;
  department?: string;
  linkedin_url?: string;
  photo_url?: string;
  notes?: string;
  tags?: string[];
  contact_source?: string; // Changed from literal union to string
  contact_status?: string; // Changed from literal union to string
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMLead {
  id: string;
  contact_id?: string;
  contact?: CRMContact;
  company_id?: string;
  company?: CRMCompany;
  title: string;
  description?: string;
  lead_source?: string; // Changed from literal union to string
  lead_status?: string; // Changed from literal union to string
  lead_score?: number;
  estimated_value?: number;
  estimated_close_date?: string;
  assigned_to?: string;
  priority?: string; // Changed from literal union to string
  next_action?: string;
  next_action_date?: string;
  converted_to_opportunity?: boolean;
  opportunity_id?: string;
  ai_insights?: unknown;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMOpportunity {
  id: string;
  lead_id?: string;
  lead?: CRMLead;
  contact_id?: string;
  contact?: CRMContact;
  company_id?: string;
  company?: CRMCompany;
  name: string;
  description?: string;
  stage?: string; // Changed from literal union to string
  value: number;
  probability?: number;
  expected_close_date?: string;
  actual_close_date?: string;
  sales_cycle_days?: number;
  assigned_to?: string;
  products_services?: string[];
  competitors?: string[];
  next_steps?: string;
  close_reason?: string;
  ai_predictions?: unknown;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMProject {
  id: string;
  opportunity_id?: string;
  opportunity?: CRMOpportunity;
  company_id?: string;
  company?: CRMCompany;
  contact_id?: string;
  contact?: CRMContact;
  name: string;
  description?: string;
  project_type?: string; // Changed from literal union to string
  status?: string; // Changed from literal union to string
  priority?: string; // Changed from literal union to string
  start_date?: string;
  end_date?: string;
  budget?: number;
  actual_cost?: number;
  progress_percentage?: number;
  project_manager?: string;
  team_members?: string[];
  milestones?: unknown[];
  deliverables?: string[];
  risks?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMCalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_type?: string; // Changed from literal union to string
  start_time: string;
  end_time: string;
  all_day?: boolean;
  location?: string;
  meeting_link?: string;
  contact_id?: string;
  contact?: CRMContact;
  company_id?: string;
  company?: CRMCompany;
  lead_id?: string;
  lead?: CRMLead;
  opportunity_id?: string;
  opportunity?: CRMOpportunity;
  project_id?: string;
  project?: CRMProject;
  attendees?: string[];
  status?: string; // Changed from literal union to string
  reminder_minutes?: number;
  recurrence_rule?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMEmail {
  id: string;
  contact_id?: string;
  contact?: CRMContact;
  company_id?: string;
  company?: CRMCompany;
  lead_id?: string;
  lead?: CRMLead;
  opportunity_id?: string;
  opportunity?: CRMOpportunity;
  project_id?: string;
  project?: CRMProject;
  thread_id?: string;
  subject: string;
  body: string;
  email_type?: string; // Changed from literal union to string
  status?: string; // Changed from literal union to string
  sent_at?: string;
  opened_at?: string;
  replied_at?: string;
  attachments?: unknown[];
  template_used?: string;
  ai_generated?: boolean;
  ai_sentiment?: string; // Changed from literal union to string
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMActivity {
  id: string;
  contact_id?: string;
  contact?: CRMContact;
  company_id?: string;
  company?: CRMCompany;
  lead_id?: string;
  lead?: CRMLead;
  opportunity_id?: string;
  opportunity?: CRMOpportunity;
  project_id?: string;
  project?: CRMProject;
  activity_type: string; // Changed from literal union to string
  subject: string;
  description?: string;
  status?: string; // Changed from literal union to string
  duration_minutes?: number;
  outcome?: string; // Changed from literal union to string
  next_action?: string;
  next_action_date?: string;
  ai_insights?: unknown;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
