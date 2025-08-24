export interface CRMActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user_id: string;
  related_id?: string;
}

export interface CRMCompany {
  id: string;
  name: string;
  industry: string;
  size: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_id?: string;
  position?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMEmail {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  sent_at: string;
  status: string;
}

export interface CRMCalendarEvent {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  attendees?: string[];
  created_at: string;
}

export interface CRMLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface CRMOpportunity {
  id: string;
  title: string;
  description?: string;
  value: number;
  stage: string;
  probability: number;
  expected_close_date: string;
  company_id?: string;
  contact_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CRMProject {
  id: string;
  name: string;
  description?: string;
  status: string;
  start_date: string;
  end_date?: string;
  budget?: number;
  company_id?: string;
  created_at: string;
  updated_at: string;
}
