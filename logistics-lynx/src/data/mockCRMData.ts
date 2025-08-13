
import type { 
  CRMCompany, 
  CRMContact, 
  CRMLead, 
  CRMOpportunity, 
  CRMProject, 
  CRMCalendarEvent, 
  CRMEmail, 
  CRMActivity 
} from '@/types/crm';

// Mock Companies
export const mockCompanies: CRMCompany[] = [
  {
    id: 'comp-1',
    name: 'TechFlow Solutions',
    industry: 'Technology',
    company_size: '50-200',
    website: 'https://techflow.com',
    phone: '+1 (555) 123-4567',
    email: 'contact@techflow.com',
    address: {
      street: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    social_media: {
      linkedin: 'https://linkedin.com/company/techflow',
      twitter: 'https://twitter.com/techflow'
    },
    annual_revenue: 5000000,
    employee_count: 125,
    description: 'Leading software development company specializing in enterprise solutions',
    tags: ['technology', 'enterprise', 'saas'],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-15T14:30:00Z'
  },
  {
    id: 'comp-2',
    name: 'Global Logistics Corp',
    industry: 'Logistics',
    company_size: '200-1000',
    website: 'https://globallogistics.com',
    phone: '+1 (555) 987-6543',
    email: 'info@globallogistics.com',
    address: {
      street: '456 Commerce Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    annual_revenue: 25000000,
    employee_count: 450,
    description: 'International logistics and supply chain management company',
    tags: ['logistics', 'supply-chain', 'international'],
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-06-10T11:45:00Z'
  },
  {
    id: 'comp-3',
    name: 'FinanceFirst Bank',
    industry: 'Financial Services',
    company_size: '1000+',
    website: 'https://financefirst.com',
    phone: '+1 (555) 456-7890',
    email: 'corporate@financefirst.com',
    address: {
      street: '789 Wall Street',
      city: 'New York',
      state: 'NY',
      zip: '10005',
      country: 'USA'
    },
    annual_revenue: 150000000,
    employee_count: 2500,
    description: 'Regional bank providing comprehensive financial services',
    tags: ['banking', 'finance', 'loans'],
    created_at: '2024-01-05T08:30:00Z',
    updated_at: '2024-06-12T16:20:00Z'
  }
];

// Mock Contacts
export const mockContacts: CRMContact[] = [
  {
    id: 'contact-1',
    company_id: 'comp-1',
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@techflow.com',
    phone: '+1 (555) 123-4567',
    mobile: '+1 (555) 123-4568',
    job_title: 'Chief Technology Officer',
    department: 'Engineering',
    linkedin_url: 'https://linkedin.com/in/sarahjohnson',
    notes: 'Key decision maker for technology purchases. Prefers technical deep dives.',
    tags: ['decision-maker', 'technical', 'c-level'],
    contact_source: 'referral',
    contact_status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-06-15T14:45:00Z'
  },
  {
    id: 'contact-2',
    company_id: 'comp-2',
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@globallogistics.com',
    phone: '+1 (555) 987-6543',
    mobile: '+1 (555) 987-6544',
    job_title: 'Operations Director',
    department: 'Operations',
    linkedin_url: 'https://linkedin.com/in/michaelchen',
    notes: 'Focused on operational efficiency and cost reduction initiatives.',
    tags: ['operations', 'cost-conscious', 'director'],
    contact_source: 'cold_outreach',
    contact_status: 'active',
    created_at: '2024-02-20T09:45:00Z',
    updated_at: '2024-06-10T12:00:00Z'
  },
  {
    id: 'contact-3',
    company_id: 'comp-3',
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.rodriguez@financefirst.com',
    phone: '+1 (555) 456-7890',
    mobile: '+1 (555) 456-7891',
    job_title: 'VP of Digital Banking',
    department: 'Digital Innovation',
    linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
    notes: 'Champion of digital transformation initiatives. Very responsive to emails.',
    tags: ['digital', 'innovation', 'vp'],
    contact_source: 'event',
    contact_status: 'active',
    created_at: '2024-01-05T08:45:00Z',
    updated_at: '2024-06-12T16:35:00Z'
  }
];

// Mock Leads
export const mockLeads: CRMLead[] = [
  {
    id: 'lead-1',
    contact_id: 'contact-1',
    company_id: 'comp-1',
    title: 'Enterprise Software Modernization',
    description: 'TechFlow is looking to modernize their legacy systems with cloud-native solutions',
    lead_source: 'website',
    lead_status: 'qualified',
    lead_score: 85,
    estimated_value: 250000,
    estimated_close_date: '2024-09-15',
    priority: 'high',
    next_action: 'Schedule technical demo',
    next_action_date: '2024-06-25T14:00:00Z',
    converted_to_opportunity: true,
    opportunity_id: 'opp-1',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-15T15:00:00Z'
  },
  {
    id: 'lead-2',
    contact_id: 'contact-2',
    company_id: 'comp-2',
    title: 'Supply Chain Analytics Platform',
    description: 'Global Logistics needs better visibility into their supply chain operations',
    lead_source: 'referral',
    lead_status: 'contacted',
    lead_score: 72,
    estimated_value: 180000,
    estimated_close_date: '2024-08-30',
    priority: 'medium',
    next_action: 'Send proposal draft',
    next_action_date: '2024-06-22T11:00:00Z',
    converted_to_opportunity: false,
    created_at: '2024-06-05T09:30:00Z',
    updated_at: '2024-06-12T13:20:00Z'
  },
  {
    id: 'lead-3',
    contact_id: 'contact-3',
    company_id: 'comp-3',
    title: 'Digital Banking Platform',
    description: 'FinanceFirst wants to launch a new mobile banking experience',
    lead_source: 'event',
    lead_status: 'negotiation',
    lead_score: 91,
    estimated_value: 450000,
    estimated_close_date: '2024-07-20',
    priority: 'urgent',
    next_action: 'Contract review meeting',
    next_action_date: '2024-06-20T15:30:00Z',
    converted_to_opportunity: true,
    opportunity_id: 'opp-2',
    created_at: '2024-05-20T14:15:00Z',
    updated_at: '2024-06-14T10:45:00Z'
  }
];

// Mock Opportunities
export const mockOpportunities: CRMOpportunity[] = [
  {
    id: 'opp-1',
    lead_id: 'lead-1',
    contact_id: 'contact-1',
    company_id: 'comp-1',
    name: 'TechFlow Enterprise Modernization',
    description: 'Complete digital transformation including cloud migration and system integration',
    stage: 'proposal',
    value: 250000,
    probability: 75,
    expected_close_date: '2024-09-15',
    sales_cycle_days: 120,
    products_services: ['Cloud Migration', 'System Integration', 'Training'],
    competitors: ['Microsoft', 'AWS'],
    next_steps: 'Present final proposal to executive team',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-15T15:00:00Z'
  },
  {
    id: 'opp-2',
    lead_id: 'lead-3',
    contact_id: 'contact-3',
    company_id: 'comp-3',
    name: 'FinanceFirst Digital Banking',
    description: 'New mobile banking platform with advanced security features',
    stage: 'negotiation',
    value: 450000,
    probability: 85,
    expected_close_date: '2024-07-20',
    sales_cycle_days: 90,
    products_services: ['Mobile App Development', 'Security Integration', 'API Development'],
    competitors: ['Fintech Solutions Inc', 'BankTech Pro'],
    next_steps: 'Finalize contract terms and pricing',
    created_at: '2024-05-20T14:15:00Z',
    updated_at: '2024-06-14T10:45:00Z'
  },
  {
    id: 'opp-3',
    contact_id: 'contact-2',
    company_id: 'comp-2',
    name: 'Global Logistics Analytics',
    description: 'Real-time supply chain visibility and analytics platform',
    stage: 'qualification',
    value: 180000,
    probability: 60,
    expected_close_date: '2024-08-30',
    sales_cycle_days: 150,
    products_services: ['Analytics Platform', 'Dashboard Development', 'Data Integration'],
    competitors: ['LogiTech Solutions', 'SupplyChain Pro'],
    next_steps: 'Conduct technical discovery session',
    created_at: '2024-06-05T09:30:00Z',
    updated_at: '2024-06-12T13:20:00Z'
  }
];

// Mock Projects
export const mockProjects: CRMProject[] = [
  {
    id: 'proj-1',
    opportunity_id: 'opp-1',
    company_id: 'comp-1',
    contact_id: 'contact-1',
    name: 'TechFlow Cloud Migration Phase 1',
    description: 'Initial phase of cloud migration focusing on core applications',
    project_type: 'implementation',
    status: 'in_progress',
    priority: 'high',
    start_date: '2024-06-01',
    end_date: '2024-08-31',
    budget: 125000,
    actual_cost: 45000,
    progress_percentage: 35,
    team_members: ['john.doe@company.com', 'jane.smith@company.com'],
    deliverables: ['Migration Plan', 'Security Assessment', 'Core App Migration'],
    risks: ['Timeline constraints', 'Legacy system dependencies'],
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2024-06-15T15:00:00Z'
  },
  {
    id: 'proj-2',
    opportunity_id: 'opp-2',
    company_id: 'comp-3',
    contact_id: 'contact-3',
    name: 'FinanceFirst Mobile App Development',
    description: 'Complete mobile banking application with security features',
    project_type: 'development',
    status: 'planning',
    priority: 'urgent',
    start_date: '2024-07-01',
    end_date: '2024-12-15',
    budget: 225000,
    actual_cost: 0,
    progress_percentage: 5,
    team_members: ['lead.dev@company.com', 'ui.designer@company.com', 'security.expert@company.com'],
    deliverables: ['iOS App', 'Android App', 'API Backend', 'Security Implementation'],
    risks: ['Regulatory compliance', 'Security requirements'],
    created_at: '2024-05-20T14:15:00Z',
    updated_at: '2024-06-14T10:45:00Z'
  }
];

// Mock Calendar Events
export const mockEvents: CRMCalendarEvent[] = [
  {
    id: 'event-1',
    title: 'TechFlow Discovery Call',
    description: 'Initial discovery call to understand current infrastructure and pain points',
    event_type: 'meeting',
    start_time: '2024-06-25T14:00:00Z',
    end_time: '2024-06-25T15:00:00Z',
    all_day: false,
    location: 'Virtual - Zoom',
    meeting_link: 'https://zoom.us/j/123456789',
    contact_id: 'contact-1',
    company_id: 'comp-1',
    lead_id: 'lead-1',
    attendees: ['sarah.johnson@techflow.com', 'sales@company.com'],
    status: 'scheduled',
    reminder_minutes: 15,
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2024-06-15T10:00:00Z'
  },
  {
    id: 'event-2',
    title: 'FinanceFirst Contract Review',
    description: 'Final contract review and negotiation meeting',
    event_type: 'meeting',
    start_time: '2024-06-20T15:30:00Z',
    end_time: '2024-06-20T16:30:00Z',
    all_day: false,
    location: 'FinanceFirst HQ - Conference Room A',
    contact_id: 'contact-3',
    company_id: 'comp-3',
    opportunity_id: 'opp-2',
    attendees: ['emily.rodriguez@financefirst.com', 'legal@financefirst.com', 'sales@company.com'],
    status: 'scheduled',
    reminder_minutes: 30,
    created_at: '2024-06-14T09:00:00Z',
    updated_at: '2024-06-14T09:00:00Z'
  },
  {
    id: 'event-3',
    title: 'Global Logistics Demo',
    description: 'Product demonstration of analytics platform capabilities',
    event_type: 'demo',
    start_time: '2024-06-22T11:00:00Z',
    end_time: '2024-06-22T12:00:00Z',
    all_day: false,
    location: 'Virtual - Teams',
    meeting_link: 'https://teams.microsoft.com/l/meetup-join/123',
    contact_id: 'contact-2',
    company_id: 'comp-2',
    lead_id: 'lead-2',
    attendees: ['michael.chen@globallogistics.com', 'demo@company.com'],
    status: 'scheduled',
    reminder_minutes: 15,
    created_at: '2024-06-12T14:00:00Z',
    updated_at: '2024-06-12T14:00:00Z'
  }
];

// Mock Emails
export const mockEmails: CRMEmail[] = [
  {
    id: 'email-1',
    contact_id: 'contact-1',
    company_id: 'comp-1',
    lead_id: 'lead-1',
    subject: 'Re: Enterprise Modernization Discussion',
    body: 'Hi Sarah,\n\nThank you for taking the time to discuss your modernization needs. Based on our conversation, I\'ve prepared a preliminary proposal that addresses your key requirements...',
    email_type: 'outbound',
    status: 'sent',
    sent_at: '2024-06-15T09:30:00Z',
    opened_at: '2024-06-15T10:15:00Z',
    ai_sentiment: 'positive',
    created_at: '2024-06-15T09:30:00Z',
    updated_at: '2024-06-15T10:15:00Z'
  },
  {
    id: 'email-2',
    contact_id: 'contact-3',
    company_id: 'comp-3',
    opportunity_id: 'opp-2',
    subject: 'Contract Terms - Final Review',
    body: 'Hi Emily,\n\nI\'ve reviewed the contract amendments and everything looks good from our side. The updated terms regarding the security requirements are acceptable...',
    email_type: 'outbound',
    status: 'sent',
    sent_at: '2024-06-14T16:45:00Z',
    opened_at: '2024-06-14T17:20:00Z',
    replied_at: '2024-06-14T18:05:00Z',
    ai_sentiment: 'positive',
    created_at: '2024-06-14T16:45:00Z',
    updated_at: '2024-06-14T18:05:00Z'
  },
  {
    id: 'email-3',
    contact_id: 'contact-2',
    company_id: 'comp-2',
    lead_id: 'lead-2',
    subject: 'Follow-up: Analytics Platform Demo',
    body: 'Hi Michael,\n\nI wanted to follow up on our analytics platform demo. I hope you found the real-time visibility features compelling...',
    email_type: 'outbound',
    status: 'sent',
    sent_at: '2024-06-12T14:30:00Z',
    opened_at: '2024-06-12T15:45:00Z',
    ai_sentiment: 'neutral',
    created_at: '2024-06-12T14:30:00Z',
    updated_at: '2024-06-12T15:45:00Z'
  }
];

// Mock Activities
export const mockActivities: CRMActivity[] = [
  {
    id: 'activity-1',
    contact_id: 'contact-1',
    company_id: 'comp-1',
    lead_id: 'lead-1',
    activity_type: 'call',
    subject: 'Discovery Call - Infrastructure Assessment',
    description: 'Conducted detailed discovery call to understand current infrastructure, pain points, and modernization goals',
    status: 'completed',
    duration_minutes: 45,
    outcome: 'positive',
    next_action: 'Prepare technical proposal',
    next_action_date: '2024-06-18T10:00:00Z',
    created_at: '2024-06-15T14:00:00Z',
    updated_at: '2024-06-15T15:00:00Z'
  },
  {
    id: 'activity-2',
    contact_id: 'contact-3',
    company_id: 'comp-3',
    opportunity_id: 'opp-2',
    activity_type: 'meeting',
    subject: 'Contract Negotiation Session',
    description: 'In-person meeting to discuss contract terms, pricing, and project timeline',
    status: 'completed',
    duration_minutes: 90,
    outcome: 'positive',
    next_action: 'Send updated contract',
    next_action_date: '2024-06-19T09:00:00Z',
    created_at: '2024-06-14T15:30:00Z',
    updated_at: '2024-06-14T17:00:00Z'
  },
  {
    id: 'activity-3',
    contact_id: 'contact-2',
    company_id: 'comp-2',
    lead_id: 'lead-2',
    activity_type: 'demo',
    subject: 'Analytics Platform Demonstration',
    description: 'Comprehensive demo of supply chain analytics capabilities and ROI projections',
    status: 'completed',
    duration_minutes: 60,
    outcome: 'neutral',
    next_action: 'Follow up with ROI calculations',
    next_action_date: '2024-06-21T14:00:00Z',
    created_at: '2024-06-12T11:00:00Z',
    updated_at: '2024-06-12T12:00:00Z'
  }
];

// Add relationships to data
export const enrichedContacts = mockContacts.map(contact => ({
  ...contact,
  company: mockCompanies.find(company => company.id === contact.company_id)
}));

export const enrichedLeads = mockLeads.map(lead => ({
  ...lead,
  contact: mockContacts.find(contact => contact.id === lead.contact_id),
  company: mockCompanies.find(company => company.id === lead.company_id)
}));

export const enrichedOpportunities = mockOpportunities.map(opportunity => ({
  ...opportunity,
  contact: mockContacts.find(contact => contact.id === opportunity.contact_id),
  company: mockCompanies.find(company => company.id === opportunity.company_id),
  lead: mockLeads.find(lead => lead.id === opportunity.lead_id)
}));

export const enrichedProjects = mockProjects.map(project => ({
  ...project,
  contact: mockContacts.find(contact => contact.id === project.contact_id),
  company: mockCompanies.find(company => company.id === project.company_id),
  opportunity: mockOpportunities.find(opp => opp.id === project.opportunity_id)
}));

export const enrichedEvents = mockEvents.map(event => ({
  ...event,
  contact: mockContacts.find(contact => contact.id === event.contact_id),
  company: mockCompanies.find(company => company.id === event.company_id),
  lead: mockLeads.find(lead => lead.id === event.lead_id),
  opportunity: mockOpportunities.find(opp => opp.id === event.opportunity_id),
  project: mockProjects.find(project => project.id === event.project_id)
}));

export const enrichedEmails = mockEmails.map(email => ({
  ...email,
  contact: mockContacts.find(contact => contact.id === email.contact_id),
  company: mockCompanies.find(company => company.id === email.company_id),
  lead: mockLeads.find(lead => lead.id === email.lead_id),
  opportunity: mockOpportunities.find(opp => opp.id === email.opportunity_id),
  project: mockProjects.find(project => project.id === email.project_id)
}));

export const enrichedActivities = mockActivities.map(activity => ({
  ...activity,
  contact: mockContacts.find(contact => contact.id === activity.contact_id),
  company: mockCompanies.find(company => company.id === activity.company_id),
  lead: mockLeads.find(lead => lead.id === activity.lead_id),
  opportunity: mockOpportunities.find(opp => opp.id === activity.opportunity_id),
  project: mockProjects.find(project => project.id === activity.project_id)
}));
